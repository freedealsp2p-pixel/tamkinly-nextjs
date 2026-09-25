import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { applySecurity, AUTH_RATE_LIMIT } from '@/lib/security';

// Reset password with token
// SECURITY: Uses bcrypt (cost=12) instead of legacy SHA256.
// Legacy SHA256 passwords still in DB will be auto-migrated to bcrypt on next login via auth.ts.
export async function POST(request: NextRequest) {
  try {
  // Security: CSRF + rate limit
  const securityBlocked = await applySecurity(request, AUTH_RATE_LIMIT);
  if (securityBlocked) return securityBlocked;


    const { token, email, newPassword } = await request.json();

    if (!token || !email || !newPassword) {
      return NextResponse.json(
        { error: 'Token, email, and new password are required' },
        { status: 400 }
      );
    }

    // Validate password length
    if (typeof newPassword !== 'string' || newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Reject excessively long passwords (DoS protection for bcrypt)
    if (newPassword.length > 256) {
      return NextResponse.json(
        { error: 'Password is too long (max 256 characters)' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Find the reset token
    const resetToken = await db.passwordResetToken.findFirst({
      where: {
        token,
        email: normalizedEmail,
      },
    });

    // Validate the reset token exists
    if (!resetToken) {
      return NextResponse.json(
        { error: 'Invalid reset token' },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (resetToken.expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Reset token has expired' },
        { status: 400 }
      );
    }

    // Check if token has already been used
    if (resetToken.usedAt) {
      return NextResponse.json(
        { error: 'Reset token has already been used' },
        { status: 400 }
      );
    }

    // Find the user
    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Hash the new password with bcrypt (replaces legacy SHA256)
    const hashedPassword = await hashPassword(newPassword);

    // Update user's password and mark token as used in a transaction
    await db.$transaction([
      db.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      }),
      db.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Password has been reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
