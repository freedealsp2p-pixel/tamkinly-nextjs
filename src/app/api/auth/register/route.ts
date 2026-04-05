/**
 * User Registration API
 * Handles new user signup
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await db.user.create({
      data: {
        email: email.toLowerCase(),
        name: name || email.split('@')[0],
        password: hashedPassword,
        role: 'CUSTOMER',
      },
    });

    // Create initial progress record
    await db.userProgress.create({
      data: {
        userId: user.id,
        currentDay: 1,
        currentPhase: 'AWARENESS',
      },
    });

    // Create transformation journey
    await db.transformationJourney.create({
      data: {
        userId: user.id,
        currentDay: 1,
        currentPhase: 'AWARENESS',
        accessTier: 'FREE',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
