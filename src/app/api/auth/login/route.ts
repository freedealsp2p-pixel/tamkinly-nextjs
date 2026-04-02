import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Rate limiting (simple in-memory, consider Redis for production)
const rateLimit = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);
  
  if (!record) {
    rateLimit.set(ip, { count: 1, lastRequest: now });
    return true;
  }
  
  if (now - record.lastRequest > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, lastRequest: now });
    return true;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  record.lastRequest = now;
  return true;
}

// Login user
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        accessCodes: {
          where: { isActive: true },
        },
        progress: true,
      },
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if password is bcrypt hash or old SHA256 format
    let isValid = false;
    
    if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
      // New bcrypt format
      isValid = await bcrypt.compare(password, user.password);
    } else {
      // Old SHA256 format (for backward compatibility)
      const [salt, storedHash] = user.password.split(':');
      if (salt && storedHash) {
        const crypto = await import('crypto');
        const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
        isValid = hash === storedHash;
        
        // If valid, upgrade to bcrypt
        if (isValid) {
          const newHashedPassword = await bcrypt.hash(password, 12);
          await db.user.update({
            where: { id: user.id },
            data: { password: newHashedPassword },
          });
        }
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Get highest access tier
    const tiers = ['FREE', 'TRIAL', 'BASIC', 'PREMIUM', 'BUNDLE'];
    const userTiers = user.accessCodes.map(code => code.tier);
    const highestTier = userTiers.length > 0 
      ? tiers[Math.max(...userTiers.map(t => tiers.indexOf(t)))]
      : 'FREE';

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        accessTier: highestTier,
        accessCodes: user.accessCodes.map(code => ({
          code: code.code,
          tier: code.tier,
          productId: code.productId,
          isUsed: code.isUsed,
          createdAt: code.createdAt,
        })),
        progress: user.progress ? {
          currentDay: user.progress.currentDay,
          currentPhase: user.progress.currentPhase,
          identityScore: user.progress.identityScore,
          clarityScore: user.progress.clarityScore,
          alignmentScore: user.progress.alignmentScore,
          currentStreak: user.progress.currentStreak,
        } : null,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to login. Please try again.' },
      { status: 500 }
    );
  }
}
