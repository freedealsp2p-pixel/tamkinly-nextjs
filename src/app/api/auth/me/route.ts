import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { db } from '@/lib/db';

// Get current user info
export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const fullUser = await db.user.findUnique({
      where: { id: user.id },
      include: {
        accessCodes: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
        },
        progress: true,
      },
    });

    if (!fullUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: fullUser.id,
        email: fullUser.email,
        name: fullUser.name,
        role: fullUser.role,
        accessTier: user.accessTier,
        createdAt: fullUser.createdAt,
        accessCodes: fullUser.accessCodes.map(code => ({
          id: code.id,
          code: code.code,
          tier: code.tier,
          productId: code.productId,
          isUsed: code.isUsed,
          usedAt: code.usedAt,
          createdAt: code.createdAt,
        })),
        progress: fullUser.progress ? {
          currentDay: fullUser.progress.currentDay,
          currentPhase: fullUser.progress.currentPhase,
          identityScore: fullUser.progress.identityScore,
          clarityScore: fullUser.progress.clarityScore,
          alignmentScore: fullUser.progress.alignmentScore,
          currentStreak: fullUser.progress.currentStreak,
        } : null,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user info' },
      { status: 500 }
    );
  }
}

// AUD-1 (2026-10-18, founder order): language-preference sync.
// Called by LocaleCore whenever a signed-in user switches the site language,
// so emails (sequences + transactional) always match the language they use.
export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json().catch(() => ({}));
    const locale = (body as Record<string, unknown>).locale === 'ar' ? 'ar' : 'en';
    await db.user.update({
      where: { id: user.id },
      data: { locale },
    });
    return NextResponse.json({ success: true, locale });
  } catch (error) {
    console.error('Locale sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync locale' },
      { status: 500 }
    );
  }
}
