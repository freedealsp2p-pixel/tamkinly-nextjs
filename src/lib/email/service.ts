// Email Service for Tamkinly
// Handles email queueing, sending, and tracking

import { db } from '@/lib/db';

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

// Get email sequence by trigger
export async function getEmailSequence(trigger: string) {
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
    const sequence = await getEmailSequence(trigger);
    
    if (!sequence) {
      return { success: false, message: `No active sequence found for trigger: ${trigger}` };
    }
    
    let queuedCount = 0;
    
    for (const step of sequence.steps) {
      const scheduledAt = new Date();
      scheduledAt.setHours(scheduledAt.getHours() + step.delayHours);
      
      const personalizedSubject = replaceVariables(step.subject, variables);
      const personalizedContent = replaceVariables(step.content, variables);
      
      await queueEmail({
        email: variables.email,
        name: variables.name,
        subject: personalizedSubject,
        content: personalizedContent,
        sequenceId: sequence.id,
        stepNumber: step.stepNumber,
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
      
      // Here you would integrate with your email provider (Brevo, SendGrid, etc.)
      // For now, we'll simulate success
      
      // Simulate email sending
      const success = await sendEmailViaProvider(email.email, email.subject, email.content);
      
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
            type: getEmailType(email.sequenceId || ''),
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
  // This would be mapped from the actual sequence
  return 'WELCOME';
}

// Email provider integration (placeholder)
async function sendEmailViaProvider(
  to: string, 
  subject: string, 
  content: string
): Promise<boolean> {
  // Integration with Brevo, SendGrid, or other providers
  // For development, this returns true to simulate success
  
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 Email would be sent:');
    console.log(`   To: ${to}`);
    console.log(`   Subject: ${subject}`);
    return true;
  }
  
  // In production, integrate with actual provider
  // Example: Brevo API
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
        htmlContent: content.replace(/\n/g, '<br>').replace(/# (.*)/g, '<h1>$1</h1>')
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
