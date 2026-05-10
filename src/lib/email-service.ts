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
  locale?: 'en' | 'ar';
}

export interface WelcomeEmailOptions {
  to: string;
  name: string;
  accessKey?: string;
  locale?: 'en' | 'ar';
}

export interface FollowUpEmailOptions {
  to: string;
  name: string;
  day: 3 | 7 | 14;
  productType: ProductType | 'general';
  currentTier?: string;
  locale?: 'en' | 'ar';
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

export interface QuizResultsEmailOptions {
  to: string;
  name: string;
  quizType: string;
  score: number;
  insights?: string[];
  locale?: 'en' | 'ar';
}

export interface IdentityMilestoneEmailOptions {
  to: string;
  name: string;
  day: 7 | 14 | 21 | 30;
  locale?: 'en' | 'ar';
}

export interface ReEngagementEmailOptions {
  to: string;
  name: string;
  inactiveDays?: number;
  locale?: 'en' | 'ar';
}

export interface AbandonedCartEmailOptions {
  to: string;
  name: string;
  hoursAgo: 1 | 24;
  cartItems?: string;
  locale?: 'en' | 'ar';
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
  const locale = options.locale || 'en';
  
  // Generate HTML based on product type using new templates
  const tierMap: Record<ProductType, 'trial' | 'basic' | 'premium' | 'bundle'> = {
    trial: 'trial',
    planner: 'basic',
    premium: 'premium',
    bundle: 'bundle',
  };

  let htmlContent: string;
  let subject: string;
  
  switch (options.productType) {
    case 'trial':
      htmlContent = EmailTemplates.trialPurchase(options.name, options.accessKey, locale);
      subject = locale === 'ar' ? 'نظام الهوية لمدة 7 أيام جاهز! 🎯' : 'Your 7-Day Identity System is Ready! 🎯';
      break;
    case 'planner':
      htmlContent = EmailTemplates.plannerPurchase(options.name, options.accessKey, locale);
      subject = locale === 'ar' ? 'مخطط إعادة صياغة الهوية جاهز! 📋' : 'Your Identity Recode Planner is Ready! 📋';
      break;
    case 'premium':
      htmlContent = EmailTemplates.premiumPurchase(options.name, options.accessKey, locale);
      subject = locale === 'ar' ? 'باقة التحول المتقدمة جاهزة! 🌟' : 'Your Premium Transformation Package is Ready! 🌟';
      break;
    case 'bundle':
      htmlContent = EmailTemplates.bundlePurchase(options.name, options.accessKey, locale);
      subject = locale === 'ar' ? 'مرحباً بك في VIP! باقتك الشاملة جاهزة! 👑' : 'Welcome to VIP! Your Complete Bundle is Ready! 👑';
      break;
    default:
      htmlContent = EmailTemplates.purchaseConfirmation(options.name, options.accessKey, options.productName, tierMap[options.productType] || 'basic', locale);
      subject = `Your ${options.productName} is Ready!`;
  }
  
  if (provider === 'brevo') {
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
  const locale = options.locale || 'en';
  
  const htmlContent = EmailTemplates.welcome(options.name, locale);
  const subject = locale === 'ar' ? 'مرحباً بك في تمكنلي! 🎯' : 'Welcome to Tamkinly! 🎯';
  
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
 * Uses the new branded templates
 */
export async function sendFollowUpEmail(
  options: FollowUpEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  const locale = options.locale || 'en';
  
  let htmlContent: string;
  let subject: string;
  
  switch (options.day) {
    case 3:
      htmlContent = EmailTemplates.day3FollowUp(options.name, locale);
      subject = locale === 'ar' ? 'كيف رحلتك؟ 🌱' : "How's Your Identity Journey? 🌱";
      break;
    case 7:
      htmlContent = EmailTemplates.day7FollowUp(options.name, locale);
      subject = locale === 'ar' ? 'أنت تبني الزخم! 🚀' : "You're Building Momentum! 🚀";
      break;
    case 14:
      htmlContent = EmailTemplates.day14FollowUp(options.name, options.currentTier || 'basic', locale);
      subject = locale === 'ar' ? 'مستعد للمستوى التالي? ⬆️' : 'Ready for the Next Level? ⬆️';
      break;
    default:
      htmlContent = EmailTemplates.day3FollowUp(options.name, locale);
      subject = `Day ${options.day} Update from Tamkinly`;
  }
  
  if (provider === 'brevo') {
    // Try using Brevo template first, fall back to custom HTML
    try {
      return await BrevoClient.emails.sendFollowUp(
        options.to,
        options.name,
        options.day,
        options.productType
      );
    } catch {
      // Fall back to custom HTML
      return BrevoClient.emails.send({
        to: [{ email: options.to, name: options.name }],
        sender: {
          name: 'Tamkinly',
          email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com',
        },
        subject,
        htmlContent,
        tags: ['followup', `day${options.day}`, options.productType],
      });
    }
  }
  
  console.log(`[EMAIL FALLBACK] Would send ${options.day}-day follow-up to ${options.to}`);
  return { success: true };
}

/**
 * Send abandoned cart email using new branded templates
 */
export async function sendAbandonedCartEmail(
  options: AbandonedCartEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  const locale = options.locale || 'en';
  
  let htmlContent: string;
  let subject: string;
  
  if (options.hoursAgo === 1) {
    htmlContent = EmailTemplates.abandonedCart1h(options.name, options.cartItems || '', locale);
    subject = locale === 'ar' ? 'منتظرك! 🛒' : "You're Almost There! 🛒";
  } else {
    htmlContent = EmailTemplates.abandonedCart24h(options.name, options.cartItems || '', locale);
    subject = locale === 'ar' ? 'لا تؤجل تحولك 💫' : "Don't Put Your Transformation on Hold 💫";
  }
  
  if (provider === 'brevo') {
    return BrevoClient.emails.send({
      to: [{ email: options.to, name: options.name }],
      sender: {
        name: 'Tamkinly',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com',
      },
      subject,
      htmlContent,
      tags: ['abandoned_cart', `${options.hoursAgo}h`],
    });
  }
  
  console.log(`[EMAIL FALLBACK] Would send abandoned cart email to ${options.to}`);
  return { success: true };
}

// Legacy function signature for backward compatibility
export async function sendAbandonedCartEmailLegacy(
  to: string,
  name: string,
  hoursAgo: 1 | 24 = 1
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  return sendAbandonedCartEmail({ to, name, hoursAgo });
}

/**
 * Send quiz results email with personalized insights
 */
export async function sendQuizResultsEmail(
  options: QuizResultsEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  const locale = options.locale || 'en';
  
  const htmlContent = EmailTemplates.quizResults(
    options.name,
    options.quizType,
    options.score,
    options.insights,
    locale
  );
  const subject = locale === 'ar' ? 'نتائج تقييمك جاهزة! 📊' : 'Your Assessment Results Are In! 📊';
  
  if (provider === 'brevo') {
    return BrevoClient.emails.send({
      to: [{ email: options.to, name: options.name }],
      sender: {
        name: 'Tamkinly',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com',
      },
      subject,
      htmlContent,
      tags: ['quiz', 'results', options.quizType],
    });
  }
  
  console.log(`[EMAIL FALLBACK] Would send quiz results email to ${options.to}`);
  return { success: true };
}

/**
 * Send identity milestone email (day 7, 14, 21, 30)
 */
export async function sendIdentityMilestoneEmail(
  options: IdentityMilestoneEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  const locale = options.locale || 'en';
  
  const htmlContent = EmailTemplates.identityMilestone(options.name, options.day, locale);
  
  const subjects: Record<number, { en: string; ar: string }> = {
    7: { en: 'Week 1 Complete! 🌟', ar: 'الأسبوع الأول مكتمل! 🌟' },
    14: { en: 'Two Weeks Strong! 💪', ar: 'أسبوعان بقوة! 💪' },
    21: { en: 'Three Weeks In! 🔥', ar: 'ثلاثة أسابيع! 🔥' },
    30: { en: '30 Days! You Did It! 🏆', ar: '30 يوماً! لقد فعلتها! 🏆' },
  };
  
  const subjectData = subjects[options.day] || subjects[7];
  const subject = locale === 'ar' ? subjectData.ar : subjectData.en;
  
  if (provider === 'brevo') {
    return BrevoClient.emails.send({
      to: [{ email: options.to, name: options.name }],
      sender: {
        name: 'Tamkinly',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com',
      },
      subject,
      htmlContent,
      tags: ['milestone', `day${options.day}`],
    });
  }
  
  console.log(`[EMAIL FALLBACK] Would send day ${options.day} milestone email to ${options.to}`);
  return { success: true };
}

/**
 * Send re-engagement email for inactive users
 */
export async function sendReEngagementEmail(
  options: ReEngagementEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  const locale = options.locale || 'en';
  
  const htmlContent = EmailTemplates.reEngagement(options.name, options.inactiveDays || 7, locale);
  const subject = locale === 'ar' ? 'نفتقدك! 💙' : 'We Miss You! 💙';
  
  if (provider === 'brevo') {
    return BrevoClient.emails.send({
      to: [{ email: options.to, name: options.name }],
      sender: {
        name: 'Tamkinly',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com',
      },
      subject,
      htmlContent,
      tags: ['re_engagement', 'winback'],
    });
  }
  
  console.log(`[EMAIL FALLBACK] Would send re-engagement email to ${options.to}`);
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
    quizType?: string;
    locale?: 'en' | 'ar';
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
  sendAbandonedCartEmailLegacy,
  sendQuizResultsEmail,
  sendIdentityMilestoneEmail,
  sendReEngagementEmail,
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
