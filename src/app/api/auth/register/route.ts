import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { registerUser } from '@/lib/auth-local';

// Rate limiting (simple in-memory, consider Redis for production)
const rateLimit = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute

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

// Register new user
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

    const { email, password, name } = await request.json();

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password with bcrypt (12 rounds)
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user locally
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        name: name?.trim() || null,
        password: hashedPassword,
        role: 'CUSTOMER',
      },
    });

    // Check if there are any access codes for this email (from purchases)
    const existingCodes = await db.appAccess.findMany({
      where: { email: email.toLowerCase() },
    });

    // Link existing access codes to the new user
    if (existingCodes.length > 0) {
      await db.appAccess.updateMany({
        where: { email: email.toLowerCase() },
        data: { userId: user.id },
      });
    }

    // Create user progress
    await db.userProgress.create({
      data: {
        userId: user.id,
      },
    }).catch(() => {
      // Ignore if already exists
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        hasAccess: existingCodes.length > 0,
        accessCodeCount: existingCodes.length,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}
