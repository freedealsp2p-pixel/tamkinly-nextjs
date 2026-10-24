// Email Service for Tamkinly
// Handles email queueing, sending, and tracking

import { db } from '@/lib/db';
import { getSequenceByTrigger, resolveTrigger, type DripSequence } from './drip-sequences';
import EmailTemplates from '../email-templates';
import { BrevoEmails, SEQ_TEMPLATES, seqTemplateId, BREVO_SEQ_SENDER, type SeqTemplateKey } from '@/lib/brevo';

const BREVO_SEQ_SENDER_REF = BREVO_SEQ_SENDER;

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
// ============================================
// ACCESS CODE DELIVERY EMAIL (2026-09-27)
// Unified code-delivery promise: email is the single channel. Bilingual.
// hasCodes=false -> payment confirmed, code being prepared (<=24h).
// ============================================
export function accessCodeDeliveryHtml(name: string, codes: string[], orderNumber: string, hasCodes: boolean): string {
  const codesHtml = codes.map(
    (c) => '<div style="font-size:26px;font-weight:bold;letter-spacing:3px;background:#F5F9F8;border:1px solid #D8E6E4;border-radius:12px;padding:14px;text-align:center;margin:10px 0;font-family:Courier New,monospace;color:#0F1C2E;">' + c + '</div>'
  ).join('');
  const arBody = hasCodes
    ? '<p style="color:#475569;line-height:1.8;margin:0 0 12px;">تم تأكيد دفعك بنجاح — شكراً لك. هذا رمز وصولك، ويفتح منتجك فوراً:</p>' + codesHtml +
      '<p style="color:#475569;line-height:1.8;">طريقة الاستخدام: افتح <a href="https://tamkinly.com/apps" style="color:#1F6F78;">صفحة التطبيقات</a>، أدخل الرمز عند مطالبة الوصول، وسيُفعَّل منتجك فوراً. احتفظ بالرمز في مكان آمن.</p>' +
      '<p style="color:#475569;line-height:1.8;margin:0 0 12px;">دليل الاستخدام الكامل — الأوضاع الثلاث + الإيقاع اليومي: <a href="https://tamkinly.com/guides" style="color:#1F6F78;">tamkinly.com/guides</a> — وملفاتك القابلة للتنزيل كلها: <a href="https://tamkinly.com/downloads" style="color:#1F6F78;">tamkinly.com/downloads</a>.</p>'
    : '<p style="color:#475569;line-height:1.8;margin:0 0 12px;">تم تأكيد دفعك بنجاح — فريقنا يجهّز رمز وصولك الآن وسيصلك على هذا البريد خلال 24 ساعة كحد أقصى.</p>' +
      '<p style="color:#475569;line-height:1.8;">رقم طلبك: <strong>' + orderNumber + '</strong> — تابع حالته في أي وقت من صفحة <a href="https://tamkinly.com/order-status?order=' + orderNumber + '" style="color:#1F6F78;">حالة الطلب</a>.</p>';
  const enBody = hasCodes
    ? '<p style="color:#475569;line-height:1.8;margin:0 0 12px;">Your payment has been confirmed — thank you! Here is your access code; it unlocks your product instantly:</p>' + codesHtml +
      '<p style="color:#475569;line-height:1.8;">How to use: open the <a href="https://tamkinly.com/apps" style="color:#1F6F78;">Apps page</a>, enter the code when asked for access, and your product activates immediately. Keep this code somewhere safe.</p>' +
      '<p style="color:#475569;line-height:1.8;margin:0 0 12px;">Full usage guide — the three modes + the daily rhythm: <a href="https://tamkinly.com/guides" style="color:#1F6F78;">tamkinly.com/guides</a> — and all your downloadable files: <a href="https://tamkinly.com/downloads" style="color:#1F6F78;">tamkinly.com/downloads</a>.</p>'
    : '<p style="color:#475569;line-height:1.8;margin:0 0 12px;">Your payment has been confirmed — we are preparing your access code now and will email it within 24 hours at the latest.</p>' +
      '<p style="color:#475569;line-height:1.8;">Your order number: <strong>' + orderNumber + '</strong> — track its status anytime on the <a href="https://tamkinly.com/order-status?order=' + orderNumber + '" style="color:#1F6F78;">Order Status</a> page.</p>';
  const arSection = '<div dir="rtl" style="text-align:right;"><h2 style="color:#0F1C2E;font-size:20px;margin:0 0 12px;">مرحباً ' + name + '،</h2>' + arBody + '</div>';
  const enSection = '<div dir="ltr" style="text-align:left;border-top:1px solid #E2E8F0;margin-top:22px;padding-top:22px;"><h2 style="color:#0F1C2E;font-size:20px;margin:0 0 12px;">Hello ' + name + ',</h2>' + enBody + '</div>';
  return (
    '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>' +
    '<body style="margin:0;padding:0;background-color:#F6F8FA;font-family:Segoe UI,Tahoma,Arial,sans-serif;">' +
    '<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #E2E8F0;">' +
    '<div style="background:linear-gradient(135deg,#0F1C2E 0%,#1F6F78 100%);padding:32px 30px;text-align:center;">' +
    '<h1 style="color:#3DD4B0;margin:0;font-size:24px;">تمكينلي · Tamkinly</h1>' +
    (hasCodes
      ? '<p style="color:#ffffff;margin:8px 0 0;font-size:14px;">رمز الوصول الخاص بك · Your Access Code</p>'
      : '<p style="color:#ffffff;margin:8px 0 0;font-size:14px;">تم تأكيد الدفع · Payment Confirmed</p>') +
    '</div>' +
    '<div style="padding:30px;">' + arSection + enSection + '</div>' +
    '<div style="background:#0F1C2E;padding:18px 30px;text-align:center;">' +
    '<p style="color:#8A94A6;font-size:12px;margin:0;">© 2026 Tamkinly — <a href="https://tamkinly.com/privacy" style="color:#3DD4B0;text-decoration:none;">Privacy</a> · <a href="https://tamkinly.com/contact" style="color:#3DD4B0;text-decoration:none;">Support</a></p>' +
    '</div></div></body></html>'
  );
}

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


// ============================================
// V3: SCHEDULE BREVO-TEMPLATE SEQUENCES (2026-09-30)
// Enqueues email_queue rows whose templateName = "brevo:<templateId>".
// The processor (sendQueuedEmails) detects the brevo: prefix and sends via
// the Brevo template API with the marketing sender (team@tamkinly.com).
// Idempotent: (email, sequenceId, stepNumber) existing rows are skipped.
// ============================================

export interface BrevoSeqStep {
  key: SeqTemplateKey;
  delayHours: number;
  subject?: string;
}

export async function scheduleBrevoSequence(params: {
  email: string;
  name?: string;
  sequenceId: string;
  locale?: string;
  createdAt?: Date;
  steps: BrevoSeqStep[];
}): Promise<number> {
  const email = params.email.toLowerCase();
  const base = params.createdAt || new Date();
  const locale = params.locale === 'en' ? 'en' : 'ar';
  let enqueued = 0;
  let idx = 0;
  for (const step of params.steps) {
    idx += 1;
    let tplId: number | null = null;
    try { tplId = seqTemplateId(step.key, locale); } catch { tplId = null; }
    if (!tplId) continue;
    const dupe = await db.emailQueue.findFirst({
      where: { email, sequenceId: params.sequenceId, stepNumber: idx }
    });
    if (dupe) continue;
    await db.emailQueue.create({
      data: {
        email,
        name: params.name || email.split('@')[0],
        sequenceId: params.sequenceId,
        stepNumber: idx,
        subject: step.subject
          || (locale === 'en'
            ? (SEQ_TEMPLATE_SUBJECTS_EN[step.key as string] || `Brevo template ${tplId}`)
            : (SEQ_TEMPLATE_SUBJECTS[step.key as string] || `Brevo template ${tplId}`)),
        content: '',
        templateName: `brevo:${tplId}`,
        scheduledAt: new Date(base.getTime() + step.delayHours * 3600 * 1000),
        status: 'PENDING'
      }
    });
    enqueued += 1;
  }
  return enqueued;
}

export const SEQ_TEMPLATE_SUBJECTS: Record<string, string> = {
  'RECOVERY_TRC_01': 'حين ينعقلك الماضي، حواسُّك الخمس هي المخارج',
  'RECOVERY_TRC_02': 'زفيرٌ أطول من شهيقك: أقدم مفتاح إطفاء في جسدك',
  'RECOVERY_TRC_03': 'مكانٌ آمن لا يحتاج مفاتيح ولا أبواباً — تبنيه من داخلك',
  'RECOVERY_TRC_04': 'جسدك يتكلم طوال اليوم — هذه عشر دقائق لتسمعه',
  'RECOVERY_TRC_05': 'المحفزات لا تفاجئ من يعرف خريطتها',
  'RECOVERY_TRC_06': 'اكتب خطة أمانك في يوم صافٍ — ليقودك سطرٌ مكتوب في يوم عاصف',
  'RECOVERY_TRC_07': 'أي أداة لأي حالة؟ ورقة واحدة تربط حالتك بالأداة الصحيحة',
  'RECOVERY_TRC_08': 'قتال، هروب، تجمّد، ملاينة: لا شيء منها خطأ — كلها كانت إنقاذاً',
  'RECOVERY_TRC_09': 'غيّر سطراً واحداً في المثلث المعرفي — يتبعُه الباقي',
  'RECOVERY_TRC_10': 'العار يقول: أنت الخطأ — والورقة تسأله: من علمك هذا؟',
  'RECOVERY_TRC_11': 'اكتب حين تكون مستقراً — لا حين تكون غارقاً',
  'RECOVERY_TRC_12': 'أطراف أصابعك على خريطة الانزعاج: تقنية النقر بخمس خطوات',
  'RECOVERY_REC_01': 'الرغبة لا تصلك من السماء — تصلك من الجوع، والتعب، والوحدة',
  'RECOVERY_REC_02': 'حين تشعر بالرغبة، تكون معظم الحلقة قد دارت بالفعل',
  'RECOVERY_REC_03': 'لا تعتمد على أفضل نسخة منك — اعتمد على خطة كُتبت في يوم هادئ',
  'RECOVERY_REC_04': 'توقف أسبوعياً لقراءة الطريق — التعافي بلا مراجعة يُدار بالذاكرة الانتقائية',
  'RECOVERY_REC_05': 'نوباتك لها مواعيد وأنماط — والنمط المكتشف نصف المعركة',
  'RECOVERY_REC_06': 'الحلقة الدوارة تنكسر عند الحلقة الأضعف — هذه الورقة تريك أيها',
  'RECOVERY_REC_07': 'بعد الزلة يتكلم صوتان: ذنبٌ نافع وَعارٌ مدمر — تعلّم التفريق',
  'RECOVERY_REC_08': 'ما هو أصل مرحلتك في التعافي؟ الأداة الصحيحة تُختار بعد الجواب',
  'RECOVERY_REC_09': 'اقرأ الانتكاسة كما يقرأ المهندس جسراً انهار — تقريراً لا حكماً',
  'RECOVERY_REC_10': 'التعافي الحقيقي لا يبدأ بالتوقف عن سلوك — بل ببناء هوية لا تحتاجه',
  'RECOVERY_REC_11': 'مكتوبة الآن، وتصل بعد تسعين يوماً: رسالتك من نسختك المتعافية',
  'PROTO_TD': 'ذاكرتك تُعيد كتابة يومك كل يوم — هذا البروتوكول يمنحك القلم',
  'PROTO_AC': 'الاسم الذي يفتح فيك الباب القديم — يمكن أن يصبح مفتاحاً باباً جديداً',
  'PROTO_WM': 'كسر النمط في اللحظة نفسها التي يبدأ فيها — 4 خطوات في 9 دقائق',
  'PROTO_DAY_1': 'اليوم الأول: ابدأ صغيراً — عشر دقائق تفعل أكثر من ساعة',
  'PROTO_DAY_2': 'اليوم الثاني: التكرار يرسم الطريق العصبي — لا يرسمه الكمال',
  'PROTO_DAY_3': 'اليوم الثالث: المقاومة ستظهر اليوم — وهذا بالضبط ما يعني أنك تتحرك',
  'PROTO_DAY_4': 'اليوم الرابع: لا تقِس التقدم في منتصف الطريق',
  'PROTO_DAY_5': 'المنتصف: نظرة أولى على الأثر — وماذا لو لم تر شيئاً بعد',
  'PROTO_DAY_6': 'اليوم السادس: الاستمرارية أجمل من الكمال — والنقصان مقبول',
  'PROTO_DAY_7': 'أسبوع كامل: ما الذي تغيّر فعلاً؟ — أول قوس واضح في بياناتك',
  'PROTO_DAY_8': 'اليوم الثامن: همهمة «الأداء ممل» — وأنت على باب النتيجة',
  'PROTO_DAY_9': 'اليوم التاسع: أغلق القوس — ثم ابنِ أسبوعك المستقبلي',
  'APP_IDENTITY_BASELINE': 'قبل أي تحول: لقطة صادقة عن موقعك الحالي — 8 أبعاد في تقرير واحد',
  'APP_EXECUTIVE_MANUAL': 'دليلك التنفيذي وصل: خطة 30 يوماً من رد الفعل إلى الفعل المتعمد',
  'APP_DAILY_PLANNER': 'ابدأ يومك بسؤال أقوى من قائمة المهام: من أريد أن أكون اليوم؟',
  'APP_JOURNAL_SYSTEM': 'العقل يكرر ما لم يُكتب — والصفحة تفكّ الحلقة',
  'APP_GOAL_SYSTEM': 'معظم الأهداف تفشل في فحص واحد: لا تنتمي لمن تحاول أن تصبح',
  'APP_HABIT_TRACKER': 'كل عادة تصويت لهوية: شاهد أصواتك تتراكم على خريطة واحدة',
  'APP_DAILY_REFLECTION': 'خمس دقائق مسائية تكفي ليتحول يومك من خبر يمر إلى معلومة تُبنى',
  'APP_ENVIRONMENTAL_AUDIT': 'بيئتك تختار قبلك: مسح من ثلاث بيئات يكشف من يدفع فاتورة سلوكك',
  'APP_DECISION_ANALYSIS': 'قراراتك ليست صدفة متكررة — إنها نمط موقّع باسمك ويمكن قراءته',
  'APP_EVIDENCE_TRACKING': 'هويتك الجديدة لا تُناقَش — تُوثَّق: دليل واحد يومياً يغلق الجدل',
  'APP_PROGRESS_DASHBOARD': 'رقم واحد يجمع تحولك كله: لوحتك الموحدة جاهزة',
  'APP_IDENTITY_RECODE': 'النظام الكامل في مسار واحد: 30 يوماً تفكيك وتشييد بترتيب هندسي',
  'APP_WORKSHEETS': 'مكتبة أدوات التحول كاملة: املأ رقمياً أو اطبع — وعملك محفوظ تلقائياً',
  'APP_EMOTION_REGULATION': 'أي استراتيجية تستخدم مع مشاعرك: إعادة تقييم أم كبت؟ النتيجة تشرح كثيراً',
  'APP_COMMUNITY': 'التحول وحيداً ممكن — والتحول مع شركاء طريق أسرع وأدوم',
  'APP_PRIORITY_SUPPORT': 'حين تعلق في طريقك، هناك إجابة خلال 24 ساعة — بضمان',
  'APP_AI_COACH': 'مدرب يعرف أنماطك ويعمل 24 ساعة: احجز مكانك المبكر',
  'APP_VALUES': 'قبل أن تسأل: كيف أنجز؟ اسأل: لماذا أنجز أصلاً؟ — 30 قيمة وترتيب واحد',
  'APP_TRIAL_PLANNER': 'بداية تحول مجانية للأبد: بدون بطاقة، وبدون حد زمني',
  'APP_QUIZ': 'أنت لا تعرف فجوتك الحقيقية إلا بالأرقام: ثلاث دقائق تكشفها',
  'NUDGE_1': 'مفتاحك وصل — والباب يبقى باباً حتى يُفتح: 5 دقائق الآن؟',
  'NUDGE_3': 'ورقة مكتوبة تتفوق على نية لم تُكتب — أين ملفك الآن؟',
  'NUDGE_7': 'أسبوع انتهى: هل ملفك ما زال «في المخطط»؟ الإجابة الصادقة تفيد',
};

// AUD-1 (2026-10-18, approved fix 4): English labels for the email_queue table.
// The queue stores a human-readable subject PER LOCALE so daily ops reports stop
// showing an Arabic label for English sends. This is display metadata only —
// the recipient's actual subject lives inside the Brevo template itself.
export const SEQ_TEMPLATE_SUBJECTS_EN: Record<string, string> = {
  'RECOVERY_TRC_01': 'When the past corners you, your five senses are the exits',
  'RECOVERY_TRC_02': 'A longer exhale than inhale: the oldest off-switch in your body',
  'RECOVERY_TRC_03': 'A safe place needs no keys or doors — you build it from within',
  'RECOVERY_TRC_04': 'Your body speaks all day — here are ten minutes to hear it',
  'RECOVERY_TRC_05': 'Triggers never surprise someone who knows their map',
  'RECOVERY_TRC_06': 'Write your safety plan on a calm day — let one written line lead you on a stormy one',
  'RECOVERY_TRC_07': 'Which tool for which state? One page connects your state to the right tool',
  'RECOVERY_TRC_08': 'Fight, flight, freeze, fawn: none of them is broken — each one once saved you',
  'RECOVERY_TRC_09': 'Change one line in the cognitive triangle — the rest follows',
  'RECOVERY_TRC_10': 'Shame says: you are the mistake. The page asks: who taught you that?',
  'RECOVERY_TRC_11': 'Write while you are steady — not while you are drowning',
  'RECOVERY_TRC_12': 'Fingertips on the map of discomfort: five-step tapping',
  'RECOVERY_REC_01': 'Urges do not fall from the sky — they come from hunger, exhaustion, and loneliness',
  'RECOVERY_REC_02': 'By the time you feel the urge, most of the loop has already run',
  'RECOVERY_REC_03': 'Do not rely on your best self — rely on a plan written on a calm day',
  'RECOVERY_REC_04': 'Pause weekly to read the road — recovery without review runs on selective memory',
  'RECOVERY_REC_05': 'Your slips have schedules and patterns — a discovered pattern is half the battle',
  'RECOVERY_REC_06': 'The loop breaks at its weakest link — this page shows you which one',
  'RECOVERY_REC_07': 'After a slip two voices speak: useful guilt and destructive shame — learn to tell them apart',
  'RECOVERY_REC_08': 'What stage of recovery are you really in? Choose the tool after the answer',
  'RECOVERY_REC_09': 'Read a relapse the way an engineer reads a collapsed bridge — a report, not a verdict',
  'RECOVERY_REC_10': 'Real recovery does not start with stopping a behavior — it starts with an identity that does not need it',
  'RECOVERY_REC_11': 'Written today, delivered in ninety days: your letter from your recovered self',
  'PROTO_TD': 'Your memory rewrites your day every day — this protocol hands you the pen',
  'PROTO_AC': 'The name that opens an old door in you can become the key to a new one',
  'PROTO_WM': 'Break the pattern in the very moment it starts — 4 steps in 9 minutes',
  'PROTO_DAY_1': 'Day one: start small — ten minutes beats an hour',
  'PROTO_DAY_2': 'Day two: repetition draws the neural path — not perfection',
  'PROTO_DAY_3': 'Day three: resistance shows up today — that is exactly what progress feels like',
  'PROTO_DAY_4': 'Day four: never measure progress halfway',
  'PROTO_DAY_5': 'Midpoint: a first honest look at impact — and what if you see nothing yet',
  'PROTO_DAY_6': 'Day six: consistency beats perfection — falling short is allowed',
  'PROTO_DAY_7': 'A full week: what actually changed? — the first clear arc in your data',
  'PROTO_DAY_8': 'Day eight: the "this is boring" hum — and you are at the door of the payoff',
  'PROTO_DAY_9': 'Day nine: close the arc — then build your future week',
  'APP_IDENTITY_BASELINE': 'Before any transformation: an honest snapshot of where you stand — 8 dimensions, one report',
  'APP_EXECUTIVE_MANUAL': 'Your executive manual has arrived: a 30-day plan from reaction to deliberate action',
  'APP_DAILY_PLANNER': 'Start your day with a stronger question than a to-do list: who do I want to be today?',
  'APP_JOURNAL_SYSTEM': 'The mind repeats what is left unwritten — the page breaks the loop',
  'APP_GOAL_SYSTEM': 'Most goals fail one test: they do not belong to the person you are trying to become',
  'APP_HABIT_TRACKER': 'Every habit is a vote for an identity: watch your votes stack up on one map',
  'APP_DAILY_REFLECTION': 'Five evening minutes turn your day from something that happened into something you learned',
  'APP_ENVIRONMENTAL_AUDIT': 'Your environment votes for you: a three-space audit reveals who pays the bill for your behavior',
  'APP_DECISION_ANALYSIS': 'Your decisions are not random repetition — they are a pattern signed with your name, and it can be read',
  'APP_EVIDENCE_TRACKING': 'Your new identity is not argued — it is documented: one piece of evidence a day closes the debate',
  'APP_PROGRESS_DASHBOARD': 'One number for your whole transformation: your unified dashboard is ready',
  'APP_IDENTITY_RECODE': 'The complete system in one path: 30 days of deconstruction and rebuilding, in engineering order',
  'APP_WORKSHEETS': 'The full transformation library: fill digitally or print — your work saves automatically',
  'APP_EMOTION_REGULATION': 'Which strategy do you use with feelings: reappraisal or suppression? The answer explains a lot',
  'APP_COMMUNITY': 'Transformation alone is possible — with partners on the path it is faster and lasts longer',
  'APP_PRIORITY_SUPPORT': 'When you get stuck, there is an answer within 24 hours — guaranteed',
  'APP_AI_COACH': 'A coach who knows your patterns and works 24/7: reserve your early place',
  'APP_VALUES': 'Before asking "how do I get it done?" ask "why does it matter?" — 30 values, one ranking',
  'APP_TRIAL_PLANNER': 'A free start that stays free: no card, no time limit',
  'APP_QUIZ': 'You cannot see your real gap without numbers: three minutes reveal it',
  'NUDGE_1': 'Your key has arrived — a door stays a door until it is opened: 5 minutes now?',
  'NUDGE_3': 'A written page beats an unwritten intention — where is your file now?',
  'NUDGE_7': 'One week done: is your file still "planned"? The honest answer helps',
};

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
      
      // V3: Brevo-hosted template delivery (templateName format: "brevo:<id>")
      if (email.templateName && email.templateName.startsWith('brevo:')) {
        const tplId = parseInt(email.templateName.slice(6), 10);
        if (Number.isFinite(tplId) && tplId > 0) {
          try {
            const res = await BrevoEmails.sendTemplate(
              tplId,
              email.email,
              { NAME: email.name || 'Friend' },
              { name: email.name || undefined, sender: { ...BREVO_SEQ_SENDER_REF } }
            );
            if (res.success) {
              await db.emailQueue.update({
                where: { id: email.id },
                data: { status: 'SENT', sentAt: new Date() }
              });
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
              throw new Error(res.error || 'Brevo sendTemplate failed');
            }
          } catch (brevoErr) {
            console.error(`Brevo template send failed for ${email.email}:`, brevoErr);
            await db.emailQueue.update({
              where: { id: email.id },
              data: {
                status: 'FAILED',
                error: brevoErr instanceof Error ? brevoErr.message : 'Brevo error'
              }
            });
            failed++;
          }
          continue;
        }
      }
      
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
// locale (AUD-1, 2026-10-18 founder order): the site language the subscriber
// actually used ('ar' | 'en') — governs the language of every email to them.
export async function subscribeEmail(email: string, name?: string, source?: string, locale?: string) {
  const safeLocale = locale === 'en' || locale === 'ar' ? locale : 'ar';
  return db.emailSubscription.upsert({
    where: { email: email.toLowerCase() },
    create: {
      email: email.toLowerCase(),
      name,
      status: 'ACTIVE',
      source,
      locale: safeLocale
    },
    update: {
      status: 'ACTIVE',
      name,
      // keep the latest language they used on the site
      locale: safeLocale
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
