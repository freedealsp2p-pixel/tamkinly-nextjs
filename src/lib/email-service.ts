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
      subject = locale === 'ar' ? 'مرحباً بك في VIP! باقة الإتقان جاهزة! 👑' : 'Welcome to VIP! Your Mastery Subscription is Ready! 👑';
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
// PAYMENT RECEIVED EMAIL (no token - sent at checkout)
// Token is sent separately after payment confirmation
// ============================================

export async function sendPaymentReceivedEmail(
  options: { to: string; name: string; productName: string; orderNumber: string; locale?: string }
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  const locale = options.locale || 'en';
  
  const htmlContent = locale === 'ar' 
    ? `<div dir="rtl" style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; background: #F6F8FA; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0F1C2E, #1F6F78); border-radius: 16px; padding: 40px; text-align: center;">
          <h1 style="color: #3DD4B0; margin-bottom: 10px;">تم استلام دفعتك!</h1>
          <p style="color: #ffffff; font-size: 18px;">شكراً لك ${options.name} 🎉</p>
        </div>
        <div style="background: white; border-radius: 12px; padding: 30px; margin-top: 20px;">
          <h2 style="color: #0F1C2E;">تفاصيل الطلب</h2>
          <p style="color: #8A94A6;">المنتج: <strong style="color: #0F1C2E;">${options.productName}</strong></p>
          <p style="color: #8A94A6;">رقم الطلب: <strong style="color: #0F1C2E;">${options.orderNumber}</strong></p>
          <div style="background: #F8EEEF; border-left: 4px solid #B88A8E; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <p style="color: #0F1C2E; margin: 0;">⏳ <strong>رمز الوصول الخاص بك قيد التجهيز</strong></p>
            <p style="color: #8A94A6; margin-top: 8px;">بعد تأكيد الدفع، سيتم إرسال رمز الوصول الشخصي إلى هذا البريد الإلكتروني. الرمز مرتبط ببريدك ولا يمكن لغيرك استخدامه.</p>
          </div>
          <p style="color: #8A94A6; font-size: 14px;">عادة ما يتم التأكيد خلال بضع دقائق. تحقق من بريدك الوارد قريباً!</p>
        </div>
        <div style="text-align: center; padding: 20px; color: #8A94A6; font-size: 12px;">
          <p>تمكنلي - منصة تحويل الهوية</p>
        </div>
      </div>`
    : `<div style="font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 600px; margin: 0 auto; background: #F6F8FA; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0F1C2E, #1F6F78); border-radius: 16px; padding: 40px; text-align: center;">
          <h1 style="color: #3DD4B0; margin-bottom: 10px;">Payment Received!</h1>
          <p style="color: #ffffff; font-size: 18px;">Thank you ${options.name} 🎉</p>
        </div>
        <div style="background: white; border-radius: 12px; padding: 30px; margin-top: 20px;">
          <h2 style="color: #0F1C2E;">Order Details</h2>
          <p style="color: #8A94A6;">Product: <strong style="color: #0F1C2E;">${options.productName}</strong></p>
          <p style="color: #8A94A6;">Order: <strong style="color: #0F1C2E;">${options.orderNumber}</strong></p>
          <div style="background: #F8EEEF; border-left: 4px solid #B88A8E; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <p style="color: #0F1C2E; margin: 0;">⏳ <strong>Your access token is being prepared</strong></p>
            <p style="color: #8A94A6; margin-top: 8px;">After payment confirmation, your personal access token will be sent to this email. The token is linked to your email and cannot be used by anyone else.</p>
          </div>
          <p style="color: #8A94A6; font-size: 14px;">Confirmation usually takes a few minutes. Check your inbox soon!</p>
        </div>
        <div style="text-align: center; padding: 20px; color: #8A94A6; font-size: 12px;">
          <p>Tamkinly - Identity Transformation Platform</p>
        </div>
      </div>`;

  const subject = locale === 'ar' 
    ? 'تم استلام دفعتك - رمز الوصول قيد التجهيز ⏳'
    : 'Payment Received - Your Access Token is Coming Soon ⏳';

  if (provider === 'brevo') {
    return BrevoClient.emails.send({
      to: [{ email: options.to, name: options.name }],
      sender: {
        name: 'Tamkinly',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com',
      },
      subject,
      htmlContent,
      tags: ['payment-received'],
    });
  }
  
  console.log(`[EMAIL FALLBACK] Payment received email to ${options.to}`);
  return { success: true };
}


// ============================================
// ORDER RECEIVED EMAIL (Pending Payment)
// ============================================

export interface OrderReceivedEmailOptions {
  to: string;
  name: string;
  orderNumber: string;
  productName: string;
  amount: number;
  locale?: 'en' | 'ar';
}

export async function sendOrderReceivedEmail(
  options: OrderReceivedEmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const provider = getActiveProvider();
  const locale = options.locale || 'en';
  const isAr = locale === 'ar';
  const subject = isAr
    ? 'تم استلام طلبك - بانتظار تأكيد الدفع'
    : 'Order Received - Awaiting Payment Confirmation';

  const htmlContent = `
<!DOCTYPE html>
<html dir="${isAr ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #0F1C2E 0%, #1F6F78 100%); padding: 40px 30px; text-align: center; }
    .header h1 { color: #3DD4B0; margin: 0; font-size: 24px; }
    .header p { color: #ffffff; margin: 8px 0 0; font-size: 14px; }
    .content { padding: 30px; }
    .order-card { background: #F6F8FA; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .order-row { display: flex; justify-content: space-between; margin: 8px 0; }
    .order-label { color: #8A94A6; font-size: 14px; }
    .order-value { color: #0F1C2E; font-weight: 600; font-size: 14px; }
    .amount { color: #1F6F78; font-size: 24px; font-weight: 700; }
    .warning-box { background: #FFF8E1; border: 1px solid #FFD54F; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .warning-box p { color: #F57F17; font-size: 13px; margin: 0; }
    .footer { background-color: #0F1C2E; padding: 20px 30px; text-align: center; }
    .footer p { color: #8A94A6; font-size: 12px; margin: 4px 0; }
    .footer a { color: #3DD4B0; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${isAr ? 'تم استلام طلبك!' : 'Order Received!'}</h1>
      <p>${isAr ? 'شكراً لك، نحن بانتظار تأكيد الدفع' : 'Thank you, we are awaiting payment confirmation'}</p>
    </div>
    <div class="content">
      <p>${isAr ? 'مرحباً' : 'Hello'} ${options.name},</p>
      <p>${isAr ? 'لقد استلمنا طلبك بنجاح. بمجرد تأكيد دفعك، سيتم إرسال رمز الوصول الخاص بك إلى هذا البريد الإلكتروني.' : 'We have successfully received your order. Once your payment is confirmed, your access code will be sent to this email address.'}</p>
      <div class="order-card">
        <div class="order-row">
          <span class="order-label">${isAr ? 'رقم الطلب' : 'Order Number'}</span>
          <span class="order-value" style="font-family: monospace;">${options.orderNumber}</span>
        </div>
        <div class="order-row">
          <span class="order-label">${isAr ? 'المنتج' : 'Product'}</span>
          <span class="order-value">${options.productName}</span>
        </div>
        <div class="order-row">
          <span class="order-label">${isAr ? 'المبلغ' : 'Amount'}</span>
          <span class="amount">$${options.amount}</span>
        </div>
        <div class="order-row">
          <span class="order-label">${isAr ? 'الحالة' : 'Status'}</span>
          <span class="order-value" style="color: #F57F17;">${isAr ? 'بانتظار الدفع' : 'Awaiting Payment'}</span>
        </div>
      </div>
      <div class="warning-box">
        <p><strong>${isAr ? 'مهم:' : 'Important:'}</strong> ${isAr ? 'سيتم إرسال رمز الوصول فقط بعد التحقق من الدفع. عادةً ما يستغرق ذلك بضع دقائق للبطاقات، أو حتى 24 ساعة للتحويلات البنكية.' : 'Your access code will ONLY be sent after payment verification. This typically takes a few minutes for card payments, or up to 24 hours for bank transfers.'}</p>
      </div>
      <p>${isAr ? 'إذا كان لديك أي أسئلة، لا تتردد في' : 'If you have any questions, feel free to'} <a href="https://tamkinly.com/contact" style="color: #1F6F78;">${isAr ? 'التواصل معنا' : 'contact us'}</a>.</p>
    </div>
    <div class="footer">
      <p>&copy; 2026 Tamkinly. ${isAr ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.</p>
      <p><a href="https://tamkinly.com/privacy">${isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</a></p>
    </div>
  </div>
</body>
</html>`;

  if (provider === 'brevo') {
    return BrevoClient.emails.send({
      to: [{ email: options.to, name: options.name }],
      sender: {
        name: 'Tamkinly',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com',
      },
      subject,
      htmlContent,
      tags: ['order-received', 'pending'],
    });
  }

  console.log(`[EMAIL FALLBACK] Would send order received email to ${options.to}`);
  return { success: true };
}

// ============================================
// EXPORT DEFAULT
// ============================================

const EmailService = {
  sendPurchaseConfirmationEmail,
  sendPaymentReceivedEmail,
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
  sendOrderReceivedEmail,
  storeContact,
  addContactToList,
  sendEmail,
  getActiveProvider,
  isEmailServiceConfigured,
  TEMPLATES: BREVO_TEMPLATES,
};

export default EmailService;
