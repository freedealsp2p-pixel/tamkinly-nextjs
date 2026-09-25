// ============================================
// WELCOME EMAIL API ENDPOINT
// Tamkinly Identity Transformation Platform
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendWelcomeEmail, isValidEmail, isEmailConfigured } from '@/lib/email';
import { getAdminSession } from '@/lib/admin-auth-jwt';

// ============================================
// REQUEST VALIDATION
// ============================================

const WelcomeEmailSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  accessKey: z.string().optional(),
});

// ============================================
// POST /api/email/welcome
// Send a welcome email to a new user
// ============================================

export async function POST(request: NextRequest) {
  try {
  // Auth: require CRON_API_KEY or admin session
  const authHeader = request.headers.get('authorization');
  const cronKey = process.env.CRON_API_KEY;
  const session = await getAdminSession();
  
  if (!session) {
    if (!cronKey || authHeader !== `Bearer ${cronKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

    // Check if email is configured
    if (!isEmailConfigured()) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service is not configured. Please add RESEND_API_KEY to your environment variables.' 
        },
        { status: 503 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = WelcomeEmailSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { email, name, accessKey } = validationResult.data;

    // Additional email validation
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    // Send welcome email
    const result = await sendWelcomeEmail(email, name, { accessKey });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send welcome email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Welcome email sent successfully',
      messageId: result.messageId,
    });

  } catch (error) {
    console.error('Welcome email API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      },
      { status: 500 }
    );
  }
}

// ============================================
// OPTIONS /api/email/welcome
// CORS preflight support
// ============================================

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

