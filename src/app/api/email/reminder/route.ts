// ============================================
// REMINDER EMAIL API ENDPOINT
// Tamkinly Identity Transformation Platform
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendDailyReminderEmail, sendWeeklySummaryEmail, isValidEmail, isEmailConfigured } from '@/lib/email';

// ============================================
// REQUEST VALIDATION
// ============================================

const HabitSchema = z.object({
  name: z.string().min(1, 'Habit name is required'),
  completed: z.boolean(),
});

const DailyReminderSchema = z.object({
  type: z.literal('daily'),
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  habits: z.array(HabitSchema).optional(),
  reflectionPrompt: z.string().optional(),
  streakDays: z.number().int().min(0).optional(),
});

const WeeklySummarySchema = z.object({
  type: z.literal('weekly'),
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  habitsCompleted: z.number().int().min(0),
  totalHabits: z.number().int().min(0),
  reflectionsCompleted: z.number().int().min(0),
  streakDays: z.number().int().min(0),
  achievements: z.array(z.string()).optional(),
  progressChange: z.number().optional(),
});

const ReminderRequestSchema = z.discriminatedUnion('type', [
  DailyReminderSchema,
  WeeklySummarySchema,
]);

// ============================================
// TYPE DEFINITIONS
// ============================================

type DailyReminderRequest = z.infer<typeof DailyReminderSchema>;
type WeeklySummaryRequest = z.infer<typeof WeeklySummarySchema>;

// ============================================
// POST /api/email/reminder
// Send daily reminder or weekly summary email
// ============================================

export async function POST(request: NextRequest) {
  try {
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
    const validationResult = ReminderRequestSchema.safeParse(body);

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

    const data = validationResult.data;

    // Additional email validation
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address format' },
        { status: 400 }
      );
    }

    // Route to appropriate email handler
    if (data.type === 'daily') {
      return await handleDailyReminder(data);
    } else {
      return await handleWeeklySummary(data);
    }

  } catch (error) {
    console.error('Reminder email API error:', error);
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
// DAILY REMINDER HANDLER
// ============================================

async function handleDailyReminder(data: DailyReminderRequest): Promise<NextResponse> {
  const result = await sendDailyReminderEmail(data.email, data.name, {
    habits: data.habits,
    reflectionPrompt: data.reflectionPrompt,
    streakDays: data.streakDays,
  });

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error || 'Failed to send daily reminder' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Daily reminder email sent successfully',
    messageId: result.messageId,
  });
}

// ============================================
// WEEKLY SUMMARY HANDLER
// ============================================

async function handleWeeklySummary(data: WeeklySummaryRequest): Promise<NextResponse> {
  const result = await sendWeeklySummaryEmail(data.email, data.name, {
    habitsCompleted: data.habitsCompleted,
    totalHabits: data.totalHabits,
    reflectionsCompleted: data.reflectionsCompleted,
    streakDays: data.streakDays,
    achievements: data.achievements || [],
    progressChange: data.progressChange,
  });

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error || 'Failed to send weekly summary' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Weekly summary email sent successfully',
    messageId: result.messageId,
  });
}

// ============================================
// OPTIONS /api/email/reminder
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
