// ============================================
// UNIFIED EMAIL SERVICE
// Uses Brevo for Transactional Emails
// Tamkinly Identity Transformation Platform
// ============================================

import BrevoClient, { BREVO_TEMPLATES } from './brevo';
import EmailTemplates from './email-templates';

export type EmailProvider = 'brevo' | 'fallback';
export type ProductType = 'trial' | 'planner' | 'premium' | 'bundle';

export interface PurchaseEmailOptions {
  to: string;
  name: string;
  productName: string;
  productType: ProductType;
  accessKey: string;
}

export interface WelcomeEmailOptions {
  to: string;
  name: string;
  accessKey?: string;
}

export interface FollowUpEmailOptions {
  to: string;
  name: string;
  day: 3 | 7 | 14;
  productType: ProductType | 'general';
}

export interface ResetEmailOptions {
  to: string;
  name: string;
  resetLink: string;
}

export interface VerifyEmailOptions {
  to: string;
  name: string;
  verifyLink: string;
}

export interface SupportEmailOptions {
  to: string;
  name: string;
  ticketId: string;
  subject: string;
}

// ============================================
// PROVIDER DETECTION
// ============================================

export function getActiveProvider(): EmailProvider {
  if (BrevoClient.account.isConfigured()) {
    return 'brevo';
  }
  return 'fallback';
}

export function isEmailServiceConfigured(): boolean {
  return BrevoClient.account.isConfigured();
}

// ============================================
// MAIN EMAIL FUNCTIONS
// ============================================

/**
 * Send purchase confirmation email with HTML content
 * Includes access key and download links
 */
export async function sendPurchaseConfirmationEmail(
  options: PurchaseEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  // Generate HTML based on product type
  let htmlContent: string;
  let subject: string;
  
  switch (options.productType) {
    case 'trial':
      htmlContent = EmailTemplates.trialPurchase(options.name, options.accessKey);
      subject = 'Your 7-Day Identity System is Ready! 🎯';
      break;
    case 'planner':
      htmlContent = EmailTemplates.plannerPurchase(options.name, options.accessKey);
      subject = 'Your Identity Recode Planner is Ready! 📋';
      break;
    case 'premium':
      htmlContent = EmailTemplates.premiumPurchase(options.name, options.accessKey);
      subject = 'Your Premium Transformation Package is Ready! 🌟';
      break;
    case 'bundle':
      htmlContent = EmailTemplates.bundlePurchase(options.name, options.accessKey);
      subject = 'Welcome to VIP! Your Complete Bundle is Ready! 👑';
      break;
    default:
      htmlContent = EmailTemplates.plannerPurchase(options.name, options.accessKey);
      subject = `Your ${options.productName} is Ready!`;
  }
  
  if (provider === 'brevo') {
    // Send directly with HTML content (not using stored templates)
    return BrevoClient.emails.send({
      to: [{ email: options.to, name: options.name }],
      sender: {
        name: 'Tamkinly',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com',
      },
      subject,
      htmlContent,
      tags: ['purchase', options.productType],
    });
  }
  
  // Fallback - log
  console.log(`[EMAIL FALLBACK] Would send purchase email to ${options.to}`);
  console.log(`[EMAIL FALLBACK] Access Key: ${options.accessKey}`);
  console.log(`[EMAIL FALLBACK] Product: ${options.productName}`);
  return { success: true };
}

/**
 * Send welcome email (for general subscribers)
 */
export async function sendWelcomeEmail(
  options: WelcomeEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  const htmlContent = EmailTemplates.welcome(options.name);
  const subject = 'Welcome to Tamkinly! 🎯';
  
  if (provider === 'brevo') {
    return BrevoClient.emails.send({
      to: [{ email: options.to, name: options.name }],
      sender: {
        name: 'Tamkinly',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com',
      },
      subject,
      htmlContent,
      tags: ['welcome'],
    });
  }
  
  console.log(`[EMAIL FALLBACK] Would send welcome email to ${options.to}`);
  return { success: true };
}

/**
 * Send follow-up email based on days since purchase
 */
export async function sendFollowUpEmail(
  options: FollowUpEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  if (provider === 'brevo') {
    return BrevoClient.emails.sendFollowUp(
      options.to,
      options.name,
      options.day,
      options.productType
    );
  }
  
  console.log(`[EMAIL FALLBACK] Would send ${options.day}-day follow-up to ${options.to}`);
  return { success: true };
}

/**
 * Send abandoned cart email
 */
export async function sendAbandonedCartEmail(
  to: string,
  name: string,
  hoursAgo: 1 | 24 = 1
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  if (provider === 'brevo') {
    return BrevoClient.emails.sendAbandonedCart(to, name, hoursAgo);
  }
  
  console.log(`[EMAIL FALLBACK] Would send abandoned cart email to ${to}`);
  return { success: true };
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  options: ResetEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  if (provider === 'brevo') {
    return BrevoClient.emails.sendPasswordReset(
      options.to,
      options.name,
      options.resetLink
    );
  }
  
  console.log(`[EMAIL FALLBACK] Would send password reset to ${options.to}`);
  return { success: true };
}

/**
 * Send email verification
 */
export async function sendEmailVerificationEmail(
  options: VerifyEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  if (provider === 'brevo') {
    return BrevoClient.emails.sendEmailVerification(
      options.to,
      options.name,
      options.verifyLink
    );
  }
  
  console.log(`[EMAIL FALLBACK] Would send email verification to ${options.to}`);
  return { success: true };
}

/**
 * Send account created confirmation
 */
export async function sendAccountCreatedEmail(
  to: string,
  name: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  if (provider === 'brevo') {
    return BrevoClient.emails.sendAccountCreated(to, name);
  }
  
  console.log(`[EMAIL FALLBACK] Would send account created email to ${to}`);
  return { success: true };
}

/**
 * Send support ticket received confirmation
 */
export async function sendSupportReceivedEmail(
  options: SupportEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  if (provider === 'brevo') {
    return BrevoClient.emails.sendSupportReceived(
      options.to,
      options.name,
      options.ticketId,
      options.subject
    );
  }
  
  console.log(`[EMAIL FALLBACK] Would send support received email to ${options.to}`);
  return { success: true };
}

/**
 * Send support resolved email
 */
export async function sendSupportResolvedEmail(
  to: string,
  name: string,
  ticketId: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  if (provider === 'brevo') {
    return BrevoClient.emails.sendSupportResolved(to, name, ticketId);
  }
  
  console.log(`[EMAIL FALLBACK] Would send support resolved email to ${to}`);
  return { success: true };
}

/**
 * Send special offer email
 */
export async function sendSpecialOfferEmail(
  to: string,
  name: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  if (provider === 'brevo') {
    return BrevoClient.emails.sendSpecialOffer(to, name);
  }
  
  console.log(`[EMAIL FALLBACK] Would send special offer email to ${to}`);
  return { success: true };
}

/**
 * Send birthday offer email
 */
export async function sendBirthdayOfferEmail(
  to: string,
  name: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  if (provider === 'brevo') {
    return BrevoClient.emails.sendBirthdayOffer(to, name);
  }
  
  console.log(`[EMAIL FALLBACK] Would send birthday offer email to ${to}`);
  return { success: true };
}

// ============================================
// CONTACT MANAGEMENT
// ============================================

/**
 * Store contact in Brevo for future emails
 */
export async function storeContact(
  email: string,
  name: string,
  options?: {
    type?: ProductType;
    accessKey?: string;
    quizScore?: number;
  }
): Promise<{ success: boolean; error?: string }> {
  if (!BrevoClient.account.isConfigured()) {
    return { success: true };
  }
  
  const result = await BrevoClient.contacts.upsert({
    email,
    attributes: {
      NAME: name,
      FIRSTNAME: name.split(' ')[0],
      CUSTOMER_TYPE: options?.type,
      ACCESS_KEY: options?.accessKey,
      QUIZ_SCORE: options?.quizScore,
      LAST_ACTIVITY: new Date().toISOString().split('T')[0],
      PURCHASE_DATE: new Date().toISOString().split('T')[0],
    },
    updateEnabled: true,
  });
  
  return { success: result.success, error: result.error };
}

// Legacy function name for backward compatibility
export const addContactToList = storeContact;

// ============================================
// GENERIC EMAIL SEND
// ============================================

export async function sendEmail(options: {
  to: string;
  name?: string;
  subject: string;
  htmlContent: string;
  tags?: string[];
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  
  if (provider === 'brevo') {
    return BrevoClient.emails.send({
      to: [{ email: options.to, name: options.name }],
      sender: {
        name: 'Tamkinly',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com',
      },
      subject: options.subject,
      htmlContent: options.htmlContent,
      tags: options.tags,
    });
  }
  
  console.log(`[EMAIL FALLBACK] Would send email to ${options.to}: ${options.subject}`);
  return { success: true };
}

// ============================================
// EXPORT DEFAULT
// ============================================

const EmailService = {
  sendPurchaseConfirmationEmail,
  sendWelcomeEmail,
  sendFollowUpEmail,
  sendAbandonedCartEmail,
  sendPasswordResetEmail,
  sendEmailVerificationEmail,
  sendAccountCreatedEmail,
  sendSupportReceivedEmail,
  sendSupportResolvedEmail,
  sendSpecialOfferEmail,
  sendBirthdayOfferEmail,
  storeContact,
  addContactToList,
  sendEmail,
  getActiveProvider,
  isEmailServiceConfigured,
  TEMPLATES: BREVO_TEMPLATES,
};

export default EmailService;
