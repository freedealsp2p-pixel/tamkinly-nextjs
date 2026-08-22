import { NextRequest, NextResponse } from 'next/server';
import { sendQueuedEmails } from '@/lib/email/service';

// Process queued emails
// This endpoint should be called by a cron job or scheduled task
// It should be protected with an API key in production

export async function POST(request: NextRequest) {
  try {
    // Check for API key in production
    const authHeader = request.headers.get('authorization');
    const apiKey = process.env.CRON_API_KEY;

    if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Send queued emails
    const result = await sendQueuedEmails();

    return NextResponse.json({
      success: true,
      ...result,
      processedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Email processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process emails' },
      { status: 500 }
    );
  }
}

// GET for easy cron testing (should be removed in production)
export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' },
      { status: 403 }
    );
  }

  try {
    const result = await sendQueuedEmails();

    return NextResponse.json({
      success: true,
      ...result,
      processedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Email processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process emails' },
      { status: 500 }
    );
  }
}
