import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

// Generate a unique referral code
function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'TMLY-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Determine reward tier based on referral count
function getRewardTier(count: number): { tier: number; reward: string; nextTierAt: number | null } {
  if (count >= 10) return { tier: 3, reward: 'PREMIUM_BUNDLE', nextTierAt: null };
  if (count >= 4) return { tier: 2, reward: 'BASIC_ACCESS', nextTierAt: 10 };
  if (count >= 1) return { tier: 1, reward: 'TRIAL_EXTENSION', nextTierAt: 4 };
  return { tier: 0, reward: 'TRIAL_EXTENSION', nextTierAt: 1 };
}

// Create a notification for the referrer
async function createReferralNotification(referrerId: string, type: string, referredEmail: string) {
  const notifications: Record<string, { title: string; titleAr: string; message: string; messageAr: string; actionUrl: string }> = {
    REFERRAL_SUCCESS: {
      title: 'New Referral!',
      titleAr: 'إحالة جديدة!',
      message: `${referredEmail} signed up using your referral link.`,
      messageAr: `${referredEmail} سجّل باستخدام رابط الإحالة الخاص بك.`,
      actionUrl: '/referral',
    },
    REWARD_EARNED: {
      title: 'Reward Earned!',
      titleAr: 'مكافأة مكتسبة!',
      message: `You earned a reward for referring ${referredEmail}.`,
      messageAr: `كسبت مكافأة لإحالتك ${referredEmail}.`,
      actionUrl: '/referral',
    },
    REWARD_TIER_UP: {
      title: 'Tier Upgrade!',
      titleAr: 'ترقية المستوى!',
      message: `Congratulations! You've reached a new reward tier.`,
      messageAr: `تهانينا! لقد وصلت إلى مستوى مكافآت جديد.`,
      actionUrl: '/referral',
    },
  };

  const notif = notifications[type];
  if (!notif) return;

  await db.notification.create({
    data: {
      userId: referrerId,
      type,
      title: notif.title,
      titleAr: notif.titleAr,
      message: notif.message,
      messageAr: notif.messageAr,
      actionUrl: notif.actionUrl,
    },
  });
}

// GET /api/referral - Get user's referral info
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let referral = await db.referral.findFirst({
      where: { referrerId: user.id },
    });

    if (!referral) {
      referral = await db.referral.create({
        data: {
          code: generateReferralCode(),
          referrerId: user.id,
        },
      });
    }

    // Get all referrals by this user
    const allReferrals = await db.referral.findMany({
      where: { referrerId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    const completedReferrals = allReferrals.filter(r => r.status === 'COMPLETED');
    const totalReferrals = completedReferrals.length;
    const rewardsEarned = completedReferrals.filter(r => r.rewardClaimed).length;

    const tierInfo = getRewardTier(totalReferrals);

    // Recent referrals for activity feed
    const recentReferrals = allReferrals.slice(0, 10).map(r => ({
      id: r.id,
      referredEmail: r.referredEmail ? maskEmail(r.referredEmail) : null,
      status: r.status,
      reward: r.reward,
      rewardClaimed: r.rewardClaimed,
      createdAt: r.createdAt.toISOString(),
      usedAt: r.usedAt?.toISOString() || null,
    }));

    return NextResponse.json({
      code: referral.code,
      link: (process.env.NEXT_PUBLIC_BASE_URL || 'https://tamkinly.com') + '/ref/' + referral.code,
      totalReferrals,
      rewardsEarned,
      currentTier: tierInfo.tier,
      nextTierAt: tierInfo.nextTierAt,
      recentReferrals,
    });
  } catch (error) {
    console.error('Referral GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Mask email for privacy
function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (!domain) return '---';
  const masked = local.length > 2 ? local[0] + '***' + local[local.length - 1] : local[0] + '***';
  return masked + '@' + domain;
}

// POST /api/referral - Use a referral code
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: 'Referral code is required' }, { status: 400 });
    }

    const referral = await db.referral.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!referral) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 });
    }

    if (referral.status === 'COMPLETED') {
      return NextResponse.json({ valid: true, alreadyUsed: true, message: 'Code already used' });
    }

    // Get current user (the person using the code)
    const user = await getCurrentUser();

    // Update referral status
    const previousReferrals = await db.referral.count({
      where: { referrerId: referral.referrerId, status: 'COMPLETED' },
    });

    const newCount = previousReferrals + 1;
    const tierInfo = getRewardTier(newCount);
    const previousTierInfo = getRewardTier(previousReferrals);

    await db.referral.update({
      where: { id: referral.id },
      data: {
        status: user ? 'COMPLETED' : 'REGISTERED',
        usedAt: new Date(),
        referredId: user?.id || null,
        referredEmail: user?.email || null,
        reward: tierInfo.reward,
      },
    });

    // Create notification for referrer
    await createReferralNotification(
      referral.referrerId,
      'REFERRAL_SUCCESS',
      user?.email || 'someone'
    );

    // Check if tier upgraded
    if (tierInfo.tier > previousTierInfo.tier) {
      await createReferralNotification(
        referral.referrerId,
        'REWARD_TIER_UP',
        user?.email || 'someone'
      );
    }

    // Also create reward notification
    await createReferralNotification(
      referral.referrerId,
      'REWARD_EARNED',
      user?.email || 'someone'
    );

    return NextResponse.json({
      valid: true,
      alreadyUsed: false,
      reward: tierInfo.reward,
      message: 'Referral code applied! You get free trial access.',
    });
  } catch (error) {
    console.error('Referral POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/referral - Claim a reward
export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { referralId } = await request.json();
    if (!referralId) {
      return NextResponse.json({ error: 'Referral ID is required' }, { status: 400 });
    }

    const referral = await db.referral.findUnique({
      where: { id: referralId },
    });

    if (!referral || referral.referrerId !== user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    if (referral.rewardClaimed) {
      return NextResponse.json({ error: 'Reward already claimed' }, { status: 400 });
    }

    await db.referral.update({
      where: { id: referralId },
      data: { rewardClaimed: true },
    });

    return NextResponse.json({ success: true, reward: referral.reward });
  } catch (error) {
    console.error('Referral PATCH error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

