import { NextRequest, NextResponse } from 'next/server';
import { triggerEmailSequence, EmailVariables } from '@/lib/email/service';

// Trigger an email sequence
// This endpoint is used by the system to trigger email sequences
// It should be protected in production

// ============================================
// VALID TRIGGERS
// ============================================

const VALID_TRIGGERS = [
  // Onboarding
  'NEW_SUBSCRIBER',

  // Purchase triggers
  'TRIAL_PURCHASE',
  'PLANNER_PURCHASE',
  'PREMIUM_PURCHASE',
  'BUNDLE_PURCHASE',

  // Follow-up sequences (product-specific)
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

  // Abandoned cart
  'CART_ABANDONED_1H',
  'CART_ABANDONED_24H',

  // Account management
  'ACCOUNT_CREATED',
  'PASSWORD_RESET',
  'EMAIL_VERIFICATION',

  // Support
  'SUPPORT_TICKET',
  'SUPPORT_RESOLVED',

  // Special offers
  'SPECIAL_OFFER',
  'BIRTHDAY',

  // ============================================
  // NEW TRIGGERS
  // ============================================

  // Quiz completed - send personalized results
  'QUIZ_COMPLETED',

  // Abandoned cart with item details
  'ABANDONED_CART_1H',
  'ABANDONED_CART_24H',

  // Identity milestone celebrations
  'IDENTITY_MILESTONE_DAY_7',
  'IDENTITY_MILESTONE_DAY_14',
  'IDENTITY_MILESTONE_DAY_21',
  'IDENTITY_MILESTONE_DAY_30',

  // Re-engagement for inactive users
  'RE_ENGAGEMENT',

  // Drip sequence triggers
  'FREE_SUBSCRIBER_SEQUENCE',
  'TRIAL_SEQUENCE',
  'BASIC_SEQUENCE',
  'PREMIUM_SEQUENCE',
  'BUNDLE_SEQUENCE',
] as const;

type ValidTrigger = typeof VALID_TRIGGERS[number];

// ============================================
// TRIGGER → SEQUENCE MAPPING
// ============================================

const TRIGGER_SEQUENCE_MAP: Record<string, string> = {
  'QUIZ_COMPLETED': 'QUIZ_COMPLETED',
  'ABANDONED_CART_1H': 'ABANDONED_CART_1H',
  'ABANDONED_CART_24H': 'ABANDONED_CART_24H',
  'IDENTITY_MILESTONE_DAY_7': 'IDENTITY_MILESTONE_7',
  'IDENTITY_MILESTONE_DAY_14': 'IDENTITY_MILESTONE_14',
  'IDENTITY_MILESTONE_DAY_21': 'IDENTITY_MILESTONE_21',
  'IDENTITY_MILESTONE_DAY_30': 'IDENTITY_MILESTONE_30',
  'RE_ENGAGEMENT': 'RE_ENGAGEMENT',
  'FREE_SUBSCRIBER_SEQUENCE': 'FREE_SUBSCRIBER_SEQUENCE',
  'TRIAL_SEQUENCE': 'TRIAL_SEQUENCE',
  'BASIC_SEQUENCE': 'BASIC_SEQUENCE',
  'PREMIUM_SEQUENCE': 'PREMIUM_SEQUENCE',
  'BUNDLE_SEQUENCE': 'BUNDLE_SEQUENCE',
};

// ============================================
// POST HANDLER
// ============================================

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

    // Validate trigger (check both old and new trigger names)
    const allValidTriggers = [...VALID_TRIGGERS];
    if (!allValidTriggers.includes(trigger as ValidTrigger)) {
      return NextResponse.json(
        { 
          error: `Invalid trigger: ${trigger}`,
          validTriggers: allValidTriggers 
        },
        { status: 400 }
      );
    }

    // Validate required variables based on trigger type
    const validationError = validateTriggerVariables(trigger, variables);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // Map trigger to sequence name if needed
    const sequenceTrigger = TRIGGER_SEQUENCE_MAP[trigger] || trigger;

    // Trigger the sequence
    const result = await triggerEmailSequence(sequenceTrigger, variables);

    if (result.success) {
      return NextResponse.json({
        ...result,
        trigger,
        sequenceTrigger,
      });
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

// ============================================
// VARIABLE VALIDATION
// ============================================

function validateTriggerVariables(
  trigger: string,
  variables: EmailVariables
): string | null {
  // Quiz completed requires quiz type and score
  if (trigger === 'QUIZ_COMPLETED') {
    if (!variables.quiz_type) {
      return 'quiz_type is required for QUIZ_COMPLETED trigger';
    }
    if (variables.quiz_score === undefined) {
      return 'quiz_score is required for QUIZ_COMPLETED trigger';
    }
  }

  // Abandoned cart requires cart items
  if (trigger === 'ABANDONED_CART_1H' || trigger === 'ABANDONED_CART_24H') {
    // cart_items is optional but recommended
  }

  // Identity milestone requires day number
  if (trigger.startsWith('IDENTITY_MILESTONE_')) {
    if (!variables.name) {
      return 'name is required for IDENTITY_MILESTONE triggers';
    }
  }

  // Re-engagement requires inactive days
  if (trigger === 'RE_ENGAGEMENT') {
    if (!variables.name) {
      return 'name is required for RE_ENGAGEMENT trigger';
    }
  }

  // Purchase triggers require access code
  if (['TRIAL_PURCHASE', 'PLANNER_PURCHASE', 'PREMIUM_PURCHASE', 'BUNDLE_PURCHASE'].includes(trigger)) {
    if (!variables.access_code) {
      return 'access_code is required for purchase triggers';
    }
  }

  return null;
}

// ============================================
// GET HANDLER - List valid triggers
// ============================================

export async function GET() {
  return NextResponse.json({
    triggers: VALID_TRIGGERS,
    newTriggers: [
      'QUIZ_COMPLETED',
      'ABANDONED_CART_1H',
      'ABANDONED_CART_24H',
      'IDENTITY_MILESTONE_DAY_7',
      'IDENTITY_MILESTONE_DAY_14',
      'IDENTITY_MILESTONE_DAY_21',
      'IDENTITY_MILESTONE_DAY_30',
      'RE_ENGAGEMENT',
      'FREE_SUBSCRIBER_SEQUENCE',
      'TRIAL_SEQUENCE',
      'BASIC_SEQUENCE',
      'PREMIUM_SEQUENCE',
      'BUNDLE_SEQUENCE',
    ],
  });
}
