import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { AccessTier } from '@prisma/client';
import { verifyAdminPassword } from '@/lib/admin-auth';

// Batch generate access codes (admin only)
export async function POST(request: NextRequest) {
  try {
    const { count, tier = 'BASIC', prefix, password } = await request.json();

    // Require admin authentication
    if (!verifyAdminPassword(password || '')) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    // Validate count
    const numCodes = Math.min(Math.max(parseInt(count) || 1, 1), 200);
    
    // Map tier to product ID
    const tierToProductId: Record<string, string> = {
      'FREE': 'free',
      'BASIC': 'trial',
      'BASIC': 'planner',
      'PREMIUM': 'premium',
      'MASTERY': 'bundle',
    };

    const codes: string[] = [];

    for (let i = 0; i < numCodes; i++) {
      const code = generateAccessCode();
      
      // Set expiration for trial
      let expiresAt: Date | undefined;
      if (tier === 'BASIC') {
        expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
      }

      await db.appAccess.create({
        data: {
          code,
          email: `${prefix || 'batch'}-${i + 1}@tamkinly.com`,
          customerName: prefix ? `${prefix} Customer ${i + 1}` : null,
          productId: tierToProductId[tier] || tier.toLowerCase(),
          productName: tier === 'FREE' ? 'Free Access' : 
            tier === 'BASIC' ? 'Basic (Monthly)' : 
            tier === 'BASIC' ? 'Identity Recode Planner' : 
            tier === 'PREMIUM' ? 'Premium (Monthly)' : 'Mastery (Monthly)',
          tier: tier as AccessTier,
          isActive: true,
          isUsed: false,
          expiresAt,
        },
      });

      codes.push(code);
    }

    return NextResponse.json({
      success: true,
      count: codes.length,
      codes,
      tier,
      message: `Generated ${codes.length} ${tier} access codes`,
    });
  } catch (error) {
    console.error('Batch generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate batch codes' },
      { status: 500 }
    );
  }
}

// Generate random access code like: TMLY-XXXX-XXXX-XXXX
function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `TMLY-${segment()}-${segment()}`;
}
