import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { AccessTier } from '@prisma/client';
import { verifyAdminPassword } from '@/lib/admin-auth';

// Generate access code (for admin only)
export async function POST(request: NextRequest) {
  try {
    const { email, customerName, productId, tier = 'BASIC', orderId, password } = await request.json();

    // Require admin authentication
    if (!verifyAdminPassword(password || '')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate unique code
    const code = generateAccessCode();

    // Determine tier from productId if not provided
    let accessTier: AccessTier = tier as AccessTier;
    if (productId && !tier) {
      accessTier = getTierFromProductId(productId);
    }

    // Set expiration for trial
    let expiresAt: Date | undefined;
    if (accessTier === 'TRIAL') {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7-day trial
    }

    // Create access record
    const access = await db.appAccess.create({
      data: {
        code,
        email: email.toLowerCase(),
        customerName,
        productId,
        tier: accessTier,
        orderId,
        expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      code: access.code,
      tier: access.tier,
      expiresAt: access.expiresAt,
      message: 'Access code generated successfully',
    });
  } catch (error) {
    console.error('Code generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate access code' },
      { status: 500 }
    );
  }
}

// Generate random access code like: TMLY-XXXX-XXXX
function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `TMLY-${segment()}-${segment()}`;
}

// Map productId to tier
function getTierFromProductId(productId: string): AccessTier {
  const tierMap: Record<string, AccessTier> = {
    'trial': 'TRIAL',
    'basic': 'BASIC',
    'premium': 'PREMIUM',
    'bundle': 'BUNDLE',
    'full': 'BUNDLE',
  };
  return tierMap[productId.toLowerCase()] || 'BASIC';
}
