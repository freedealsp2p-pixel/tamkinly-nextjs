import { NextRequest, NextResponse } from 'next/server';
import { triggerEmailSequence, EmailVariables } from '@/lib/email/service';

// Trigger an email sequence
// This endpoint is used by the system to trigger email sequences
// It should be protected in production

export async function POST(request: NextRequest) {
  try {
    const { trigger, variables } = await request.json() as {
      trigger: string;
      variables: EmailVariables;
    };

    if (!trigger || !variables?.email) {
      return NextResponse.json(
        { error: 'Trigger and email are required' },
        { status: 400 }
      );
    }

    // Validate trigger
    const validTriggers = [
      'NEW_SUBSCRIBER',
      'TRIAL_PURCHASE',
      'PLANNER_PURCHASE',
      'PREMIUM_PURCHASE',
      'BUNDLE_PURCHASE',
      'TRIAL_DAY_3',
      'TRIAL_DAY_7',
      'PLANNER_DAY_3',
      'PLANNER_DAY_7',
      'PLANNER_DAY_14',
      'PREMIUM_DAY_3',
      'PREMIUM_DAY_7',
      'PREMIUM_DAY_14',
      'BUNDLE_DAY_3',
      'BUNDLE_DAY_7',
      'BUNDLE_DAY_14',
      'CART_ABANDONED_1H',
      'CART_ABANDONED_24H',
      'ACCOUNT_CREATED',
      'PASSWORD_RESET',
      'EMAIL_VERIFICATION',
      'SUPPORT_TICKET',
      'SUPPORT_RESOLVED',
      'SPECIAL_OFFER',
      'BIRTHDAY'
    ];

    if (!validTriggers.includes(trigger)) {
      return NextResponse.json(
        { error: `Invalid trigger: ${trigger}` },
        { status: 400 }
      );
    }

    // Trigger the sequence
    const result = await triggerEmailSequence(trigger, variables);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    console.error('Email trigger error:', error);
    return NextResponse.json(
      { error: 'Failed to trigger email sequence' },
      { status: 500 }
    );
  }
}
