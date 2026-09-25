import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Verify access code
export async function POST(request: NextRequest) {
  try {
    const { code, email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required to verify access code' },
        { status: 400 }
      );
    }

    if (!code) {
      return NextResponse.json(
        { error: 'Access code is required' },
        { status: 400 }
      );
    }

    // Find the access code
    const access = await db.appAccess.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!access) {
      return NextResponse.json(
        { error: 'Invalid access code' },
        { status: 404 }
      );
    }

    // SECURITY: Email MUST match the purchase record - token is personal
    if (access.email && access.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        { error: 'This access code is linked to a different email address. Use the email you purchased with.' },
        { status: 403 }
      );
    }

    // Check if expired
    if (access.expiresAt && new Date() > access.expiresAt) {
      return NextResponse.json(
        { error: 'Access code has expired' },
        { status: 403 }
      );
    }

    // SECURITY: Check if token is active (payment confirmed)
    if (!access.isActive) {
      return NextResponse.json(
        { error: 'Access code is not yet active. Payment confirmation is pending.' },
        { status: 403 }
      );
    }

    // Activate if not already used
    if (!access.isUsed) {
      await db.appAccess.update({
        where: { id: access.id },
        data: {
          isUsed: true,
          usedAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      valid: true,
      message: 'Access granted',
      productId: access.productId,
      tier: access.tier,
    });
  } catch (error) {
    console.error('Access verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Check if user has access
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');
    const code = request.nextUrl.searchParams.get('code');

    // PRIVACY: require BOTH code and email. Probing with an email alone must not
    // reveal whether an address holds premium access, and code-only lookups are
    // handled by POST /api/access/verify (which also requires the email pair).
    if (!email || !code) {
      return NextResponse.json({ hasAccess: false });
    }

    const access = await db.appAccess.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!access) {
      return NextResponse.json({ hasAccess: false });
    }

    // Verify email matches
    if (access.email && access.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ hasAccess: false });
    }

    // Check expiration
    if (access.expiresAt && new Date() > access.expiresAt) {
      return NextResponse.json({ hasAccess: false });
    }

    // Check if active (payment confirmed)
    if (!access.isActive) {
      return NextResponse.json({ hasAccess: false });
    }

    return NextResponse.json({
      hasAccess: true,
      productId: access.productId,
      tier: access.tier,
    });
  } catch (error) {
    console.error('Access check error:', error);
    return NextResponse.json({ hasAccess: false });
  }
}
