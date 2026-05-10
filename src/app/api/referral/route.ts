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

    const stats = await db.referral.findMany({
      where: { referrerId: user.id, usedAt: { not: null } },
    });

    return NextResponse.json({
      code: referral.code,
      link: (process.env.NEXT_PUBLIC_BASE_URL || 'https://tamkinly.com') + '/ref/' + referral.code,
      totalReferrals: stats.length,
      rewardsEarned: stats.filter(r => r.rewardClaimed).length,
    });
  } catch (error) {
    console.error('Referral GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
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

    if (referral.usedAt) {
      return NextResponse.json({ valid: true, alreadyUsed: true, message: 'Code already used' });
    }

    // Mark as used
    await db.referral.update({
      where: { id: referral.id },
      data: {
        usedAt: new Date(),
        reward: 'TRIAL',
      },
    });

    return NextResponse.json({
      valid: true,
      alreadyUsed: false,
      reward: 'TRIAL',
      message: 'Referral code applied! You get free trial access.',
    });
  } catch (error) {
    console.error('Referral POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
