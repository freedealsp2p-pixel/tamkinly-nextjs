import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Verify access code
export async function POST(request: NextRequest) {
  try {
    const { code, email } = await request.json();

    if (!code || !email) {
      return NextResponse.json(
        { error: 'Code and email are required' },
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

    // Check if email matches
    if (access.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        { error: 'Email does not match the purchase record' },
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
      success: true,
      message: 'Access granted',
      productId: access.productId,
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

    if (!email && !code) {
      return NextResponse.json({ hasAccess: false });
    }

    // If both code and email are provided, verify they match together
    if (code && email) {
      const access = await db.appAccess.findUnique({
        where: { code: code.toUpperCase() },
      });

      if (!access) {
        return NextResponse.json({ hasAccess: false });
      }

      // Verify email matches
      if (access.email.toLowerCase() !== email.toLowerCase()) {
        return NextResponse.json({ hasAccess: false });
      }

      // Check expiration
      if (access.expiresAt && new Date() > access.expiresAt) {
        return NextResponse.json({ hasAccess: false });
      }

      return NextResponse.json({
        hasAccess: true,
        productId: access.productId,
      });
    }

    // Fallback: search by code only or email only
    const where = code
      ? { code: code.toUpperCase() }
      : { email: email?.toLowerCase(), isUsed: true };

    const access = await db.appAccess.findFirst({
      where,
    });

    if (!access) {
      return NextResponse.json({ hasAccess: false });
    }

    // Check expiration
    if (access.expiresAt && new Date() > access.expiresAt) {
      return NextResponse.json({ hasAccess: false });
    }

    return NextResponse.json({
      hasAccess: true,
      productId: access.productId,
    });
  } catch (error) {
    console.error('Access check error:', error);
    return NextResponse.json({ hasAccess: false });
  }
}
