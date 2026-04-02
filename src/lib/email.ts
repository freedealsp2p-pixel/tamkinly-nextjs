// ============================================
// EMAIL CLIENT - Resend SDK Integration
// Tamkinly Identity Transformation Platform
// ============================================

import { Resend } from 'resend';

// ============================================
// TYPES
// ============================================

export interface EmailAddress {
  email: string;
  name?: string;
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  tags?: Record<string, string>;
}

export interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// ============================================
// CONFIGURATION
// ============================================

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DEFAULT_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@tamkinly.com';
const DEFAULT_FROM_NAME = 'Tamkinly';

// ============================================
// RESEND CLIENT
// ============================================

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured. Please add it to your environment variables.');
    }
    resendClient = new Resend(RESEND_API_KEY);
  }
  return resendClient;
}

// ============================================
// EMAIL SENDING FUNCTIONS
// ============================================

/**
 * Send an email using Resend
 */
export async function sendEmail(options: EmailOptions): Promise<SendResult> {
  try {
    const resend = getResendClient();
    
    const from = options.from || `${DEFAULT_FROM_NAME} <${DEFAULT_FROM_EMAIL}>`;
    const to = Array.isArray(options.to) ? options.to : [options.to];
    
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
      tags: options.tags ? Object.entries(options.tags).map(([name, value]) => ({ name, value })) : undefined,
    });

    if (error) {
      console.error('Email send error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email',
      };
    }

    return {
      success: true,
      messageId: data?.id,
    };
  } catch (error) {
    console.error('Email send exception:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send a welcome email to a new user
 */
export async function sendWelcomeEmail(
  email: string,
  name: string,
  options?: { accessKey?: string }
): Promise<SendResult> {
  const { generateWelcomeEmail } = await import('./email-templates');
  const { html, text } = generateWelcomeEmail(name, options?.accessKey);

  return sendEmail({
    to: email,
    subject: 'Welcome to Tamkinly - Your Transformation Journey Begins',
    html,
    text,
    tags: { type: 'welcome', source: 'registration' },
  });
}

/**
 * Send a daily reminder email
 */
export async function sendDailyReminderEmail(
  email: string,
  name: string,
  data: {
    habits?: Array<{ name: string; completed: boolean }>;
    reflectionPrompt?: string;
    streakDays?: number;
  }
): Promise<SendResult> {
  const { generateDailyReminderEmail } = await import('./email-templates');
  const { html, text } = generateDailyReminderEmail(name, data);

  return sendEmail({
    to: email,
    subject: 'Your Daily Check-in | Tamkinly',
    html,
    text,
    tags: { type: 'daily_reminder', source: 'automation' },
  });
}

/**
 * Send a weekly summary email
 */
export async function sendWeeklySummaryEmail(
  email: string,
  name: string,
  data: {
    habitsCompleted: number;
    totalHabits: number;
    reflectionsCompleted: number;
    streakDays: number;
    achievements: string[];
    progressChange?: number;
  }
): Promise<SendResult> {
  const { generateWeeklySummaryEmail } = await import('./email-templates');
  const { html, text } = generateWeeklySummaryEmail(name, data);

  return sendEmail({
    to: email,
    subject: 'Your Weekly Progress Report | Tamkinly',
    html,
    text,
    tags: { type: 'weekly_summary', source: 'automation' },
  });
}

/**
 * Send a custom email from email sequences
 */
export async function sendSequenceEmail(
  email: string,
  subject: string,
  htmlContent: string,
  textContent?: string
): Promise<SendResult> {
  return sendEmail({
    to: email,
    subject,
    html: htmlContent,
    text: textContent,
    tags: { type: 'sequence', source: 'automation' },
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Check if Resend is configured
 */
export function isEmailConfigured(): boolean {
  return Boolean(RESEND_API_KEY);
}

/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format email with name
 */
export function formatEmailAddress(email: string, name?: string): string {
  return name ? `${name} <${email}>` : email;
}
