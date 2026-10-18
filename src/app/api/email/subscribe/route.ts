import { NextRequest, NextResponse } from 'next/server';
import { subscribeEmail, triggerEmailSequence } from '@/lib/email/service';
import { applySecurity, API_RATE_LIMIT } from '@/lib/security';

// Subscribe to email list
export async function POST(request: NextRequest) {
  try {
  // Security: rate limiting
  const securityBlocked = await applySecurity(request, API_RATE_LIMIT);
  if (securityBlocked) return securityBlocked;

    const body = await request.json().catch(() => ({} as Record<string, unknown>));
    const email = (body as Record<string, unknown>).email as string;
    const name = (body as Record<string, unknown>).name as string | undefined;
    const source = (body as Record<string, unknown>).source as string | undefined;

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

    // AUD-1 (2026-10-18, founder order): the language this visitor uses on the
    // site governs every email we send them. Subscriber has no account, so we
    // capture the interface language at subscribe time and persist it.
    const rawLocale = (body as Record<string, unknown>).locale;
    const locale = rawLocale === 'en' || rawLocale === 'ar' ? rawLocale : 'ar';

    // Subscribe the email
    const subscription = await subscribeEmail(email, name, source, locale);

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

