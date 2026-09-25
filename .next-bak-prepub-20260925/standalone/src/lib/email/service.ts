// Email Service for Tamkinly
// Handles email queueing, sending, and tracking

import { db } from '@/lib/db';
import { getSequenceByTrigger, resolveTrigger, type DripSequence } from './drip-sequences';
import EmailTemplates from '../email-templates';

// Email template variables
export interface EmailVariables {
  name?: string;
  email: string;
  access_code?: string;
  products_link?: string;
  apps_link?: string;
  free_apps_link?: string;
  support_link?: string;
  login_link?: string;
  reset_link?: string;
  verify_link?: string;
  checkout_link?: string;
  cart_items?: string;
  ticket_id?: string;
  ticket_subject?: string;
  ticket_date?: string;
  ticket_link?: string;
  response_time?: string;
  resolution_summary?: string;
  feedback_link?: string;
  offer_name?: string;
  offer_description?: string;
  offer_code?: string;
  offer_link?: string;
  discount_amount?: string;
  expiry_date?: string;
  applicable_products?: string;
  birthday_link?: string;
  // New variables for drip sequences
  quiz_type?: string;
  quiz_score?: string;
  quiz_insights?: string;
  milestone_day?: string;
  inactive_days?: string;
  current_tier?: string;
  product_name?: string;
  product_tier?: string;
  locale?: string;
  [key: string]: string | undefined;
}

// Replace template variables
export function replaceVariables(content: string, variables: EmailVariables): string {
  let result = content;
  
  Object.entries(variables).forEach(([key, value]) => {
    if (value !== undefined) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, value);
    }
  });
  
  // Replace common links with defaults
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tamkinly.com';
  
  result = result.replace(/{{products_link}}/g, `${baseUrl}/products`);
  result = result.replace(/{{apps_link}}/g, `${baseUrl}/apps`);
  result = result.replace(/{{free_apps_link}}/g, `${baseUrl}/apps`);
  result = result.replace(/{{support_link}}/g, `${baseUrl}/contact`);
  result = result.replace(/{{login_link}}/g, `${baseUrl}/login`);
  
  return result;
}

// ============================================
// GENERATE HTML FROM DRIP STEP
// ============================================

function generateHtmlFromTemplate(
  templateName: string,
  variables: EmailVariables
): string {
  const locale = (variables.locale as 'en' | 'ar') || 'en';
  const name = variables.name || 'Friend';
  const accessKey = variables.access_code || '';
  const productName = variables.product_name || '';

  switch (templateName) {
    case 'welcome':
      return EmailTemplates.welcome(name, locale);

    case 'purchaseConfirmation':
      return EmailTemplates.purchaseConfirmation(
        name,
        accessKey,
        productName,
        (variables.product_tier as 'trial' | 'basic' | 'premium' | 'bundle') || 'basic',
        locale
      );

    case 'trialPurchase':
      return EmailTemplates.trialPurchase(name, accessKey, locale);

    case 'plannerPurchase':
      return EmailTemplates.plannerPurchase(name, accessKey, locale);

    case 'premiumPurchase':
      return EmailTemplates.premiumPurchase(name, accessKey, locale);

    case 'bundlePurchase':
      return EmailTemplates.bundlePurchase(name, accessKey, locale);

    case 'day3FollowUp':
      return EmailTemplates.day3FollowUp(name, locale);

    case 'day7FollowUp':
      return EmailTemplates.day7FollowUp(name, locale);

    case 'day14FollowUp':
      return EmailTemplates.day14FollowUp(name, variables.current_tier || 'basic', locale);

    case 'abandonedCart1h':
      return EmailTemplates.abandonedCart1h(name, variables.cart_items || '', locale);

    case 'abandonedCart24h':
      return EmailTemplates.abandonedCart24h(name, variables.cart_items || '', locale);

    case 'quizResults':
      return EmailTemplates.quizResults(
        name,
        variables.quiz_type || 'identity_gap',
        parseInt(variables.quiz_score || '50'),
        variables.quiz_insights ? variables.quiz_insights.split(';') : [],
        locale
      );

    case 'identityMilestone':
      return EmailTemplates.identityMilestone(
        name,
        parseInt(variables.milestone_day || '7') as 7 | 14 | 21 | 30,
        locale
      );

    case 'reEngagement':
      return EmailTemplates.reEngagement(
        name,
        parseInt(variables.inactive_days || '7'),
        locale
      );

    default:
      return EmailTemplates.welcome(name, locale);
  }
}

// Get email sequence by trigger
export async function getEmailSequence(trigger: string) {
  // First, try the drip sequences registry
  const dripSequence = getSequenceByTrigger(trigger);
  if (dripSequence) {
    // Convert DripSequence to the format expected by the database
    return {
      id: dripSequence.id,
      name: dripSequence.name,
      trigger: dripSequence.trigger,
      isActive: dripSequence.isActive,
      steps: dripSequence.steps.map(step => ({
        id: `${dripSequence.id}-step-${step.stepNumber}`,
        sequenceId: dripSequence.id,
        stepNumber: step.stepNumber,
        delayHours: step.delayHours,
        subject: step.subject,
        preheader: step.preheader,
        content: step.subjectAr, // Store Arabic subject as content hint
        templateName: step.templateName,
        primaryCta: step.primaryCta,
        primaryUrl: step.primaryUrl,
        openRate: 0,
        clickRate: 0,
      })),
    };
  }

  // Fall back to database lookup
  return db.emailSequence.findFirst({
    where: {
      trigger,
      isActive: true
    },
    include: {
      steps: {
        orderBy: { stepNumber: 'asc' }
      }
    }
  });
}

// Queue an email for sending
export async function queueEmail(params: {
  email: string;
  name?: string;
  subject: string;
  content: string;
  sequenceId?: string;
  stepNumber?: number;
  templateName?: string;
  scheduledAt?: Date;
}) {
  return db.emailQueue.create({
    data: {
      email: params.email.toLowerCase(),
      name: params.name,
      subject: params.subject,
      content: params.content,
      sequenceId: params.sequenceId,
      stepNumber: params.stepNumber,
      templateName: params.templateName,
      scheduledAt: params.scheduledAt || new Date(),
      status: 'PENDING'
    }
  });
}

// Trigger email sequence for a user
export async function triggerEmailSequence(
  trigger: string,
  variables: EmailVariables
): Promise<{ success: boolean; message: string; queuedEmails?: number }> {
  try {
    const resolvedTrigger = resolveTrigger(trigger);
    const sequence = getSequenceByTrigger(resolvedTrigger);
    
    if (!sequence) {
      return { success: false, message: `No active sequence found for trigger: ${trigger}` };
    }
    
    let queuedCount = 0;
    
    for (const step of sequence.steps) {
      const scheduledAt = new Date();
      scheduledAt.setHours(scheduledAt.getHours() + step.delayHours);
      
      const personalizedSubject = replaceVariables(step.subject, variables);
      const personalizedContent = replaceVariables((step as any).content || '', variables);
      
      await queueEmail({
        email: variables.email,
        name: variables.name,
        subject: personalizedSubject,
        content: personalizedContent,
        sequenceId: sequence.id,
        stepNumber: step.stepNumber,
        templateName: step.templateName || undefined,
        scheduledAt
      });
      
      queuedCount++;
    }
    
    // Update subscription progress if exists
    await db.emailSubscription.upsert({
      where: { email: variables.email.toLowerCase() },
      create: {
        email: variables.email.toLowerCase(),
        name: variables.name,
        status: 'ACTIVE',
        source: trigger,
        currentSequenceId: sequence.id,
        currentStepNumber: 1
      },
      update: {
        currentSequenceId: sequence.id,
        currentStepNumber: 1
      }
    });
    
    return { 
      success: true, 
      message: `Triggered sequence "${sequence.name}" for ${variables.email}`,
      queuedEmails: queuedCount
    };
  } catch (error) {
    console.error('Error triggering email sequence:', error);
    return { success: false, message: 'Failed to trigger email sequence' };
  }
}

// Send queued emails (for cron job or background process)
export async function sendQueuedEmails(): Promise<{ sent: number; failed: number }> {
  const now = new Date();
  
  const pendingEmails = await db.emailQueue.findMany({
    where: {
      status: 'PENDING',
      scheduledAt: { lte: now }
    },
    take: 50 // Process in batches
  });
  
  let sent = 0;
  let failed = 0;
  
  for (const email of pendingEmails) {
    try {
      // Mark as sending
      await db.emailQueue.update({
        where: { id: email.id },
        data: { status: 'SENDING' }
      });
      
      // Generate HTML from template name if available
      let htmlContent = email.content;
      if (email.templateName) {
        htmlContent = generateHtmlFromTemplate(email.templateName, {
          name: email.name || undefined,
          email: email.email,
        });
      }
      
      const success = await sendEmailViaProvider(email.email, email.subject, htmlContent);
      
      if (success) {
        await db.emailQueue.update({
          where: { id: email.id },
          data: {
            status: 'SENT',
            sentAt: new Date()
          }
        });
        
        // Log the email
        await db.emailLog.create({
          data: {
            email: email.email,
            type: getEmailType(email.sequenceId || '') as any,
            subject: email.subject,
            status: 'SENT'
          }
        });
        
        sent++;
      } else {
        throw new Error('Email provider returned failure');
      }
    } catch (error) {
      console.error(`Failed to send email to ${email.email}:`, error);
      
      await db.emailQueue.update({
        where: { id: email.id },
        data: {
          status: 'FAILED',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      });
      
      failed++;
    }
  }
  
  return { sent, failed };
}

// Get email type from sequence ID (simplified)
function getEmailType(sequenceId: string): string {
  // Map to valid EmailType enum values from Prisma schema:
  // ORDER_CONFIRMATION | ACCESS_KEY_DELIVERY | DAY_1_CHECKIN | DAY_7_MILESTONE |
  // DAY_21_TURNING_POINT | DAY_30_COMPLETION | WELCOME | PASSWORD_RESET |
  // LEAD_MAGNET | ABANDONED_CART | PRODUCT_LAUNCH | NEWSLETTER
  if (sequenceId.includes('abandoned')) return 'ABANDONED_CART';
  if (sequenceId.includes('re_engagement')) return 'NEWSLETTER';
  if (sequenceId.includes('lead_nurture') || sequenceId.includes('quiz')) return 'LEAD_MAGNET';
  if (sequenceId.includes('trial') || sequenceId.includes('basic_onboarding')) return 'WELCOME';
  if (sequenceId.includes('basic') || sequenceId.includes('planner')) return 'ACCESS_KEY_DELIVERY';
  if (sequenceId.includes('premium')) return 'DAY_1_CHECKIN';
  if (sequenceId.includes('bundle') || sequenceId.includes('mastery')) return 'DAY_7_MILESTONE';
  if (sequenceId.includes('milestone')) return 'DAY_7_MILESTONE';
  if (sequenceId.includes('upsell')) return 'PRODUCT_LAUNCH';
  return 'WELCOME';
}

// Email provider integration
async function sendEmailViaProvider(
  to: string, 
  subject: string, 
  content: string
): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 Email would be sent:');
    console.log(`   To: ${to}`);
    console.log(`   Subject: ${subject}`);
    return true;
  }
  
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  
  if (!BREVO_API_KEY) {
    console.warn('BREVO_API_KEY not configured, email not sent');
    return true; // Return true for testing
  }
  
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: 'Tamkinly',
          email: 'noreply@tamkinly.com'
        },
        to: [{ email: to }],
        subject,
        htmlContent: content.includes('<!DOCTYPE') ? content : content.replace(/\n/g, '<br>').replace(/# (.*)/g, '<h1>$1</h1>')
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Brevo API error:', error);
    return false;
  }
}

// Subscribe user to email list
export async function subscribeEmail(email: string, name?: string, source?: string) {
  return db.emailSubscription.upsert({
    where: { email: email.toLowerCase() },
    create: {
      email: email.toLowerCase(),
      name,
      status: 'ACTIVE',
      source
    },
    update: {
      status: 'ACTIVE',
      name
    }
  });
}

// Unsubscribe user
export async function unsubscribeEmail(email: string) {
  return db.emailSubscription.update({
    where: { email: email.toLowerCase() },
    data: {
      status: 'UNSUBSCRIBED',
      unsubscribedAt: new Date()
    }
  });
}

// Track email open
export async function trackEmailOpen(emailId: string) {
  return db.emailQueue.update({
    where: { id: emailId },
    data: { openedAt: new Date() }
  });
}

// Track email click
export async function trackEmailClick(emailId: string, url: string) {
  return db.emailQueue.update({
    where: { id: emailId },
    data: {
      clickedAt: new Date(),
      clickedUrl: url
    }
  });
}
