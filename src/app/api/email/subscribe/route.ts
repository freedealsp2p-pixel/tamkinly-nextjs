import { NextRequest, NextResponse } from 'next/server';
import { subscribeEmail, triggerEmailSequence } from '@/lib/email/service';

// Subscribe to email list
export async function POST(request: NextRequest) {
  try {
    const { email, name, source } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Subscribe the email
    const subscription = await subscribeEmail(email, name, source);

    // Trigger welcome sequence
    await triggerEmailSequence('NEW_SUBSCRIBER', {
      email,
      name: name || 'Friend'
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed',
      subscribedAt: subscription.subscribedAt
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
