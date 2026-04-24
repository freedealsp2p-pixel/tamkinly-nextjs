// ============================================
// SERVER-SIDE reCAPTCHA VERIFICATION
// Tamkinly Identity Transformation Platform
// ============================================
// This file contains ONLY server-side code (no 'use client').
// Used by API routes to verify reCAPTCHA tokens.
// ============================================

export interface RecaptchaVerifyResult {
  success: boolean;
  score: number;
}

/**
 * Verify a reCAPTCHA token server-side
 * Returns { success: true, score: 1.0 } if reCAPTCHA is not configured (dev mode)
 */
export async function verifyRecaptcha(token: string): Promise<RecaptchaVerifyResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // If no secret key or no token, skip verification (development mode)
  if (!secretKey || !token) {
    return { success: true, score: 1.0 };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();

    return {
      success: data.success === true,
      score: data.score ?? 0,
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    // On network error, allow through (don't block users because reCAPTCHA is down)
    return { success: true, score: 0.5 };
  }
}
