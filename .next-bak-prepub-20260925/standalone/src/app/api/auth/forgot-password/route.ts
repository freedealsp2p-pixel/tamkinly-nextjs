import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { randomBytes } from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email-service';
import { applySecurity, PASSWORD_RESET_RATE_LIMIT } from '@/lib/security';

// Request password reset
export async function POST(request: NextRequest) {
  try {
  // Security: CSRF + rate limit
  const securityBlocked = await applySecurity(request, PASSWORD_RESET_RATE_LIMIT);
  if (securityBlocked) return securityBlocked;


    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    // Check if user exists with that email
    const user = await db.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      // Return success even if user doesn't exist for security
      // (don't reveal whether an email is registered)
      return NextResponse.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    // Generate a reset token (random 32 chars)
    const resetToken = randomBytes(16).toString('hex');

    // Set expiration to 1 hour from now
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    // Store the reset token in the database
    await db.passwordResetToken.create({
      data: {
        email: normalizedEmail,
        token: resetToken,
        expiresAt,
      },
    });

    // Send password reset email via Brevo
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tamkinly.com';
    const resetLink = `${baseUrl}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(normalizedEmail)}`;
    
    try {
      const emailResult = await sendPasswordResetEmail({
        to: normalizedEmail,
        name: user.name || user.email.split('@')[0],
        resetLink,
      });
      
      if (emailResult.success) {
        console.log(`Password reset email sent to: ${normalizedEmail}`);
      } else {
        console.error(`Failed to send password reset email: ${emailResult.error}`);
      }
    } catch (emailError) {
      console.error('Password reset email error:', emailError);
      // Don't reveal email errors to the user for security
    }

    // Always return success - don't reveal whether the email exists
    return NextResponse.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    );
  }
}


