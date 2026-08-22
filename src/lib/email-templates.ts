// ============================================
// EMAIL TEMPLATES - HTML Content
// Tamkinly Identity Transformation Platform
// Brand Colors: #0F1C2E (dark), #1F6F78 (teal), #3DD4B0 (accent), #F6F8FA (light)
// Supports Arabic/English with RTL
// ============================================

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tamkinly.com';

// ============================================
// SHARED STYLES & HELPERS
// ============================================

const BRAND = {
  dark: '#0F1C2E',
  teal: '#1F6F78',
  accent: '#3DD4B0',
  light: '#F6F8FA',
  white: '#FFFFFF',
  text: '#333333',
  textLight: '#666666',
  textMuted: '#999999',
};

const baseStyles = `
  body { font-family: 'Segoe UI', Arial, sans-serif; background-color: ${BRAND.light}; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
  .container { max-width: 600px; margin: 0 auto; background-color: ${BRAND.white}; border-radius: 0; overflow: hidden; }
  .header { background: linear-gradient(135deg, ${BRAND.dark} 0%, #1a2d42 100%); padding: 40px 30px; text-align: center; }
  .header h1 { color: ${BRAND.white}; margin: 0; font-size: 26px; font-weight: 700; }
  .header .subtitle { color: ${BRAND.accent}; margin: 8px 0 0; font-size: 16px; font-weight: 400; }
  .content { padding: 40px 30px; }
  .content h2 { color: ${BRAND.dark}; font-size: 22px; margin-bottom: 16px; font-weight: 700; }
  .content p { color: ${BRAND.text}; line-height: 1.7; font-size: 15px; margin-bottom: 16px; }
  .content ul { color: ${BRAND.text}; line-height: 1.8; padding-left: 20px; }
  .content li { margin-bottom: 6px; }
  .button { display: inline-block; background: linear-gradient(135deg, ${BRAND.teal} 0%, ${BRAND.accent} 100%); color: ${BRAND.white}; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 16px 0; }
  .button:hover { opacity: 0.9; }
  .button-dark { background: linear-gradient(135deg, ${BRAND.dark} 0%, #1a2d42 100%); }
  .access-box { background: linear-gradient(135deg, ${BRAND.dark} 0%, #1a2d42 100%); border-radius: 12px; padding: 25px; margin: 24px 0; text-align: center; }
  .access-box h3 { color: ${BRAND.accent}; margin: 0 0 12px 0; font-size: 16px; font-weight: 600; }
  .access-box .code { color: ${BRAND.white}; font-size: 26px; font-weight: bold; letter-spacing: 3px; font-family: 'Courier New', monospace; }
  .access-box p { color: ${BRAND.textMuted}; font-size: 13px; margin-top: 12px; }
  .highlight-box { background: ${BRAND.light}; border-left: 4px solid ${BRAND.teal}; padding: 20px; margin: 24px 0; border-radius: 0 8px 8px 0; }
  .highlight-box h3 { color: ${BRAND.dark}; margin: 0 0 10px 0; font-size: 16px; }
  .highlight-box a { color: ${BRAND.teal}; font-weight: 600; }
  .apps-box { background: rgba(31,111,120,0.06); border: 2px solid ${BRAND.teal}; border-radius: 12px; padding: 20px; margin: 24px 0; }
  .apps-box h3 { color: ${BRAND.teal}; margin: 0 0 12px 0; font-size: 16px; }
  .apps-box ul { margin: 0; padding-left: 20px; color: ${BRAND.text}; }
  .apps-box li { margin-bottom: 6px; font-size: 14px; }
  .vip-badge { display: inline-block; background: ${BRAND.accent}; color: ${BRAND.dark}; padding: 4px 14px; border-radius: 20px; font-weight: bold; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
  .footer { background-color: ${BRAND.dark}; padding: 30px; text-align: center; }
  .footer p { color: ${BRAND.textMuted}; font-size: 12px; margin: 4px 0; }
  .footer a { color: ${BRAND.accent}; text-decoration: none; }
  .social-links { margin: 12px 0; }
  .social-links a { color: ${BRAND.textMuted}; text-decoration: none; margin: 0 8px; font-size: 12px; }
  .divider { border: none; border-top: 1px solid #e0e0e0; margin: 24px 0; }
  .tip-box { background: rgba(61,212,176,0.08); border-radius: 8px; padding: 16px; margin: 16px 0; }
  .tip-box strong { color: ${BRAND.teal}; }
  .stat-row { display: table; width: 100%; margin: 16px 0; }
  .stat-item { display: table-cell; text-align: center; padding: 12px; }
  .stat-number { font-size: 28px; font-weight: 700; color: ${BRAND.teal}; }
  .stat-label { font-size: 12px; color: ${BRAND.textLight}; text-transform: uppercase; letter-spacing: 1px; }
`;

const rtlOverrides = `
  [dir="rtl"] .highlight-box { border-left: none; border-right: 4px solid ${BRAND.teal}; border-radius: 8px 0 0 8px; }
  [dir="rtl"] .content ul { padding-left: 0; padding-right: 20px; }
  [dir="rtl"] .apps-box ul { padding-left: 0; padding-right: 20px; }
`;

function wrapEmail(dir: 'ltr' | 'rtl', bodyContent: string): string {
  return `<!DOCTYPE html>
<html dir="${dir}" lang="${dir === 'rtl' ? 'ar' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyles}${rtlOverrides}</style>
</head>
<body>
  <div class="container">
    ${bodyContent}
  </div>
</body>
</html>`;
}

function footerHtml(): string {
  return `<div class="footer">
  <p>&copy; 2025 Tamkinly. All rights reserved.</p>
  <p><a href="${BASE_URL}/privacy-policy/">Privacy Policy</a> &middot; <a href="${BASE_URL}/terms/">Terms</a></p>
  <div class="social-links">
    <a href="${BASE_URL}">Website</a> &middot; <a href="mailto:support@tamkinly.com">Support</a>
  </div>
</div>`;
}

// ============================================
// WELCOME EMAIL (General Subscriber)
// ============================================
export function getWelcomeEmailHtml(name: string, locale: 'en' | 'ar' = 'en'): string {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isAr = locale === 'ar';

  const body = `
    <div class="header">
      <h1>${isAr ? 'مرحباً بك في تمكنلي! 🎯' : 'Welcome to Tamkinly! 🎯'}</h1>
      <p class="subtitle">${isAr ? 'رحلة التحول تبدأ الآن' : 'Your transformation journey starts now'}</p>
    </div>
    <div class="content">
      <h2>${isAr ? 'شكراً لاشتراكك!' : "You're In! Thank You for Subscribing"}</h2>
      <p>${isAr ? `عزيزي/عزيزتي ${name}،` : `Dear ${name},`}</p>
      <p>${isAr
        ? 'مرحباً بك في مجتمع تمكنلي! لقد اتخذت الخطوة الأولى نحو تحويل هويتك وتحقيق أهدافك.'
        : "Welcome to the Tamkinly community! You've just taken the first step toward transforming your identity and achieving your goals."
      }</p>
      <p>${isAr ? 'كمشترك، ستتلقى:' : 'As a subscriber, you\'ll receive:'}</p>
      <ul>
        <li>${isAr ? 'رؤى أسبوعية حول التطوير الشخصي' : 'Weekly insights on personal development'}</li>
        <li>${isAr ? 'نصائح واستراتيجيات حصرية' : 'Exclusive tips and strategies'}</li>
        <li>${isAr ? 'وصول مبكر للمنتجات والعروض الجديدة' : 'Early access to new products and special offers'}</li>
        <li>${isAr ? 'تقييم مجاني للهوية' : 'Free identity assessment tools'}</li>
      </ul>
      <p style="text-align: center;">
        <a href="${BASE_URL}/shop/" class="button">${isAr ? 'استكشف منتجاتنا' : 'Explore Our Products'}</a>
      </p>
      <div class="tip-box">
        <strong>${isAr ? '💡 نصيحة:' : '💡 Pro Tip:'}</strong>
        ${isAr
          ? 'ابدأ بتقييم فجوة الهوية المجاني لمعرفة نقطة بدايتك.'
          : 'Start with the free Identity Gap Assessment to discover your starting point.'
        }
      </div>
      <p>${isAr ? 'هل أنت مستعد لبدء رحلة التحول؟' : 'Ready to start your transformation journey?'}</p>
    </div>
    ${footerHtml()}`;

  return wrapEmail(dir, body);
}

// ============================================
// PURCHASE CONFIRMATION EMAIL (with access code)
// ============================================
export function getPurchaseConfirmationHtml(
  name: string,
  accessKey: string,
  productName: string,
  tier: 'trial' | 'basic' | 'premium' | 'bundle' = 'basic',
  locale: 'en' | 'ar' = 'en'
): string {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isAr = locale === 'ar';

  const appsByTier: Record<string, { en: string[]; ar: string[] }> = {
    trial: {
      en: ['7-Day Guided Discipline Journey', 'Daily identity prompts', 'Evidence tracking basics', 'Progress dashboard', '7 Days System PDF (downloadable)'],
      ar: ['رحلة انضباط موجهة لمدة 7 أيام', 'مطالبات الهوية اليومية', 'أساسيات تتبع الأدلة', 'لوحة تتبع التقدم', 'PDF نظام 7 أيام (قابل للتحميل)', 'PDF عرض خاص (خصم الترقية)'],
    },
    basic: {
      en: ['Identity Gap Assessment', 'Values Clarification Tool', '30-Day Transformation Journey', 'Daily Planner & Tracker'],
      ar: ['تقييم فجوة الهوية', 'أداة توضيح القيم', 'رحلة تحول 30 يوماً', 'المخطط والمتابع اليومي'],
    },
    premium: {
      en: ['Identity Gap Assessment', 'Values Clarification Tool', '30-Day Transformation Journey', 'Daily Planner & Tracker', 'Decision Pattern Analysis', 'Evidence Tracking System', 'Progress Dashboard'],
      ar: ['تقييم فجوة الهوية', 'أداة توضيح القيم', 'رحلة تحول 30 يوماً', 'المخطط والمتابع اليومي', 'تحليل أنماط القرارات', 'نظام تتبع الأدلة', 'لوحة التقدم'],
    },
    bundle: {
      en: ['Identity Gap Assessment', 'Values Clarification Tool', '30-Day Transformation Journey', 'Daily Planner & Tracker', 'Decision Pattern Analysis', 'Evidence Tracking System', 'Progress Dashboard', 'AI Identity Coach', 'Transformation Community'],
      ar: ['تقييم فجوة الهوية', 'أداة توضيح القيم', 'رحلة تحول 30 يوماً', 'المخطط والمتابع اليومي', 'تحليل أنماط القرارات', 'نظام تتبع الأدلة', 'لوحة التقدم', 'مدرب الهوية بالذكاء الاصطناعي', 'مجتمع التحول'],
    },
  };

  const apps = appsByTier[tier] || appsByTier.basic;
  const appList = (isAr ? apps.ar : apps.en).map(a => `<li>${a}</li>`).join('');

  const isVip = tier === 'bundle';

  const body = `
    <div class="header">
      <h1>${isVip ? (isAr ? 'مرحباً بك في VIP! 👑' : 'Welcome to VIP! 👑') : (isAr ? 'شكراً لشرائك! 🙏' : 'Thank You for Your Purchase! 🙏')}</h1>
      ${isVip ? `<p class="subtitle"><span class="vip-badge">${isAr ? 'عضو الباقة الشاملة' : 'MASTERY MEMBER'}</span></p>` : ''}
    </div>
    <div class="content">
      <h2>${isAr ? `تم تأكيد طلبك: ${productName}` : `Your Order is Confirmed: ${productName}`}</h2>
      <p>${isAr ? `عزيزي/عزيزتي ${name}،` : `Dear ${name},`}</p>
      <p>${isAr
        ? 'شكراً لاختيارك تمكنلي! منتجك جاهز ويمكنك الوصول إليه الآن.'
        : 'Thank you for choosing Tamkinly! Your product is ready and you can access it now.'
      }</p>

      <div class="access-box">
        <h3>${isAr ? '🔑 مفتاح الوصول الخاص بك' : '🔑 Your Access Key'}</h3>
        <div class="code">${accessKey}</div>
        <p>${isAr ? 'استخدم هذا المفتاح للوصول إلى تطبيقاتك' : 'Use this key to access your apps below'}</p>
      </div>

      <div class="apps-box">
        <h3>${isAr ? '📱 التطبيقات المتاحة لك:' : '📱 Apps You Can Access:'}</h3>
        <ul>${appList}</ul>
      </div>
      ${(tier === 'mastery' || tier === 'bundle') ? `
      <div style="background: linear-gradient(135deg, #0F1C2E 0%, #1F6F78 100%); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center; border: 2px solid #3DD4B0;">
        <h3 style="color: #3DD4B0; margin: 0 0 8px 0; font-size: 16px;">${isAr ? '🎧 تواصل مباشر مع المؤسس' : '🎧 Direct Access to the Founder'}</h3>
        <p style="color: #ffffff; font-size: 13px; margin: 0 0 12px 0; line-height: 1.5;">${isAr ? 'بصفتك مشترك MASTERY، لديك وصول مباشر للمراسلة مع عبدالله، مؤسس Tamkinly.' : 'As a MASTERY subscriber, you have direct messaging access to Abdallah, founder of Tamkinly.'}</p>
        <a href="https://t.me/tribute/app?startapp=i42v" style="display: inline-block; background: #3DD4B0; color: #0F1C2E; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">${isAr ? '📨 مراسلة مباشرة' : '📨 Message Directly'}</a>
      </div>
      ` : ''}
      ${tier === 'trial' || tier === 'basic' ? `
      <div style="background: linear-gradient(135deg, ${BRAND.accent} 0%, #2BC49E 100%); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
        <h3 style="color: ${BRAND.dark}; margin: 0 0 12px 0; font-size: 16px;">${isAr ? '📥 ملفاتك القابلة للتحميل:' : '📥 Your Downloadable Files:'}</h3>
        <div style="background: white; border-radius: 8px; padding: 12px; margin: 8px 0;">
          <p style="margin: 0; color: ${BRAND.dark}; font-weight: 600;">${isAr ? '📘 نظام 7 أيام (PDF)' : '📘 7 Days System (PDF)'}</p>
          <a href="${BASE_URL}/7-Days-System.pdf" download style="display: inline-block; background: ${BRAND.teal}; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; margin-top: 6px;">${isAr ? 'تحميل' : 'Download'}</a>
        </div>

      </div>
      ` : ''}

      <div class="highlight-box">
        <h3>${isAr ? '📥 التنزيلات:' : '📥 Your Downloads:'}</h3>
        <p><a href="${BASE_URL}/my-account/downloads/">${isAr ? 'تنزيل ملفاتك' : 'Download Your Files'}</a></p>
      </div>

      <p style="text-align: center;">
        <a href="${BASE_URL}/apps/?code=${accessKey}" class="button">${isAr ? 'الوصول إلى تطبيقاتك الآن' : 'Access Your Apps Now'}</a>
      </p>

      <p>${isAr
        ? 'هل لديك أسئلة؟ رد على هذا البريد أو تواصل معنا على support@tamkinly.com'
        : 'Questions? Reply to this email or contact us at support@tamkinly.com'
      }</p>
    </div>
    ${footerHtml()}`;

  return wrapEmail(dir, body);
}

// ============================================
// BASIC PURCHASE EMAIL (7-Day System) - kept for backward compat
// ============================================
export function getTrialPurchaseEmailHtml(name: string, accessKey: string, locale: 'en' | 'ar' = 'en'): string {
  return getPurchaseConfirmationHtml(name, accessKey, '7-Day Identity System', 'trial', locale);
}

// ============================================
// PLANNER PURCHASE EMAIL (Main Product) - kept for backward compat
// ============================================
export function getPlannerPurchaseEmailHtml(name: string, accessKey: string, locale: 'en' | 'ar' = 'en'): string {
  return getPurchaseConfirmationHtml(name, accessKey, 'Identity Recode Planner', 'basic', locale);
}

// ============================================
// PREMIUM PURCHASE EMAIL - kept for backward compat
// ============================================
export function getPremiumPurchaseEmailHtml(name: string, accessKey: string, locale: 'en' | 'ar' = 'en'): string {
  return getPurchaseConfirmationHtml(name, accessKey, 'Premium Transformation Package', 'premium', locale);
}

// ============================================
// MASTERY PURCHASE EMAIL (VIP) - kept for backward compat
// ============================================
export function getBundlePurchaseEmailHtml(name: string, accessKey: string, locale: 'en' | 'ar' = 'en'): string {
  return getPurchaseConfirmationHtml(name, accessKey, 'Mastery (Monthly)', 'bundle', locale);
}

// ============================================
// DAY 3 FOLLOW-UP: "How's your identity journey?"
// ============================================
export function getDay3FollowUpHtml(name: string, locale: 'en' | 'ar' = 'en'): string {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isAr = locale === 'ar';

  const body = `
    <div class="header">
      <h1>${isAr ? 'كيف رحلتك؟ 🌱' : "How's Your Identity Journey? 🌱"}</h1>
      <p class="subtitle">${isAr ? 'ثلاثة أيام من التحول' : 'Three days into transformation'}</p>
    </div>
    <div class="content">
      <h2>${isAr ? `${name}، أنت في اليوم الثالث!` : `${name}, You're on Day 3!`}</h2>
      <p>${isAr
        ? 'مرت ثلاثة أيام منذ بدأت رحلتك مع تمكنلي. هذا هو الوقت الذي يبدأ فيه الكثيرون يشعرون بأولى علامات التغيير.'
        : "It's been three days since you started your Tamkinly journey. This is when many people start feeling the first signs of change."
      }</p>

      <div class="tip-box">
        <strong>${isAr ? '🔑 حقيقة عن التغيير:' : '🔑 Change Fact:'}</strong>
        ${isAr
          ? 'الأبحاث تظهر أن اليوم 3-5 هو عندما تبدأ أنماط التفكير الجديدة بالتشكل. أنت في اللحظة الحاسمة!'
          : 'Research shows days 3-5 are when new thought patterns start forming. You\'re at the pivotal moment!'
        }
      </div>

      <h3>${isAr ? 'نصائح لليوم الثالث:' : 'Day 3 Tips:'}</h3>
      <ul>
        <li>${isAr ? 'راجع قيمك الأساسية - هل لاحظت أي أنماط؟' : 'Review your core values — notice any patterns?'}</li>
        <li>${isAr ? 'سجّل لحظة واحدة شعرت فيها بالثقة اليوم' : 'Journal one moment you felt confident today'}</li>
        <li>${isAr ? 'أكمل تمرين فجوة الهوية إذا لم تفعل بعد' : 'Complete the Identity Gap exercise if you haven\'t yet'}</li>
      </ul>

      <p style="text-align: center;">
        <a href="${BASE_URL}/apps/" class="button">${isAr ? 'استمر في الرحلة' : 'Continue Your Journey'}</a>
      </p>

      <p>${isAr
        ? 'نحن هنا لدعمك في كل خطوة. رد على هذا البريد إذا كان لديك أي سؤال!'
        : "We're here to support you every step of the way. Reply to this email if you have any questions!"
      }</p>
    </div>
    ${footerHtml()}`;

  return wrapEmail(dir, body);
}

// ============================================
// DAY 7 FOLLOW-UP: "You're building momentum!"
// ============================================
export function getDay7FollowUpHtml(name: string, locale: 'en' | 'ar' = 'en'): string {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isAr = locale === 'ar';

  const body = `
    <div class="header">
      <h1>${isAr ? 'أنت تبني الزخم! 🚀' : "You're Building Momentum! 🚀"}</h1>
      <p class="subtitle">${isAr ? 'أسبوع كامل من التحول' : 'One full week of transformation'}</p>
    </div>
    <div class="content">
      <h2>${isAr ? `${name}، أسبوع كامل!` : `${name}, One Full Week!`}</h2>
      <p>${isAr
        ? 'لقد أكملت أسبوعاً كاملاً في رحلة تحويل الهوية. هذا إنجاز حقيقي يستحق الاحتفال!'
        : "You've completed a full week on your identity transformation journey. That's a real achievement worth celebrating!"
      }</p>

      <div class="stat-row">
        <div class="stat-item">
          <div class="stat-number">7</div>
          <div class="stat-label">${isAr ? 'أيام' : 'Days'}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">168</div>
          <div class="stat-label">${isAr ? 'ساعة' : 'Hours'}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">∞</div>
          <div class="stat-label">${isAr ? 'إمكانيات' : 'Possibilities'}</div>
        </div>
      </div>

      <div class="tip-box">
        <strong>${isAr ? '🎯 نصيحة الأسبوع:' : '🎯 Weekly Tip:'}</strong>
        ${isAr
          ? 'في نهاية الأسبوع الأول، خذ وقتاً لمراجعة تقدمك. ما الذي تغير في طريقة تفكيرك؟ ما الذي تريد التركيز عليه الأسبوع القادم؟'
          : 'At the end of week one, take time to review your progress. What has shifted in your thinking? What do you want to focus on next week?'
        }
      </div>

      <h3>${isAr ? 'حافظ على الزخم:' : 'Keep the Momentum Going:'}</h3>
      <ul>
        <li>${isAr ? 'أكمل تقييم الأسبوع الأول في التطبيق' : 'Complete the Week 1 assessment in the app'}</li>
        <li>${isAr ? 'حدد هدفاً واحداً للأسبوع القادم' : 'Set one goal for next week'}</li>
        <li>${isAr ? 'شارك رؤيتك مع مجتمع تمكنلي' : 'Share your insights with the Tamkinly community'}</li>
      </ul>

      <p style="text-align: center;">
        <a href="${BASE_URL}/apps/" class="button">${isAr ? 'شاهد تقدمك' : 'View Your Progress'}</a>
      </p>
    </div>
    ${footerHtml()}`;

  return wrapEmail(dir, body);
}

// ============================================
// DAY 14 FOLLOW-UP: "Ready for the next level?" (upgrade offer)
// ============================================
export function getDay14FollowUpHtml(name: string, currentTier: string = 'basic', locale: 'en' | 'ar' = 'en'): string {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isAr = locale === 'ar';

  const upgradeMap: Record<string, { en: string; ar: string; price: string }> = {
    trial: { en: 'Basic (Monthly)', ar: 'أساسي (شهري)', price: '$7/mo' },
    basic: { en: 'Premium (Monthly)', ar: 'مميز (شهري)', price: '$17/mo' },
    premium: { en: 'Mastery (Monthly)', ar: 'إتقان (شهري)', price: '$27/mo' },
  };

  const upgrade = upgradeMap[currentTier] || upgradeMap.basic;

  const body = `
    <div class="header">
      <h1>${isAr ? 'هل أنت مستعد للمستوى التالي? ⬆️' : 'Ready for the Next Level? ⬆️'}</h1>
      <p class="subtitle">${isAr ? 'أسبوعان من التحول المتواصل' : 'Two weeks of continuous transformation'}</p>
    </div>
    <div class="content">
      <h2>${isAr ? `${name}، لقد وصلت إلى الأسبوع الثاني!` : `${name}, You've Reached Week Two!`}</h2>
      <p>${isAr
        ? 'أسبوعان من العمل المتواصل على تحويل هويتك. لقد أثبتّ التزامك بالتغيير الحقيقي.'
        : "Two weeks of dedicated work on your identity transformation. You've proven your commitment to real change."
      }</p>

      <div class="tip-box">
        <strong>${isAr ? '📊 مكانك الآن:' : '📊 Where You Stand:'}</strong>
        ${isAr
          ? 'في الأسبوع الثاني، تبدأ التغييرات بالترسخ. لكن الأدوات المتقدمة يمكن أن تسرّع تقدمك بشكل كبير.'
          : 'By week two, changes start to solidify. But advanced tools can significantly accelerate your progress.'
        }
      </div>

      <div class="apps-box">
        <h3>${isAr ? `✨ ارتقِ إلى ${upgrade.ar}` : `✨ Upgrade to ${upgrade.en}`}</h3>
        <p>${isAr
          ? `احصل على أدوات تحليل أعمق وتتبع متقدم ودعم شخصي مع ${upgrade.ar} بسعر خاص ${upgrade.price}`
          : `Get deeper analysis tools, advanced tracking, and personal support with ${upgrade.en} at a special price of ${upgrade.price}`
        }</p>
        <ul>
          <li>${isAr ? 'تحليل أنماط القرارات' : 'Decision Pattern Analysis'}</li>
          <li>${isAr ? 'نظام تتبع الأدلة' : 'Evidence Tracking System'}</li>
          <li>${isAr ? 'لوحة تقدم شاملة' : 'Comprehensive Progress Dashboard'}</li>
        </ul>
      </div>

      <p style="text-align: center;">
        <a href="${BASE_URL}/shop/" class="button">${isAr ? `ارتقِ الآن - ${upgrade.price}` : `Upgrade Now - ${upgrade.price}`}</a>
      </p>

      <p>${isAr
        ? 'ملاحظة: هذا العرض الحصري متاح فقط لمشتركي تمكنلي النشطين.'
        : 'Note: This exclusive offer is only available to active Tamkinly subscribers.'
      }</p>
    </div>
    ${footerHtml()}`;

  return wrapEmail(dir, body);
}

// ============================================
// ABANDONED CART REMINDER (1 hour)
// ============================================
export function getAbandonedCart1hHtml(name: string, cartItems: string = '', locale: 'en' | 'ar' = 'en'): string {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isAr = locale === 'ar';

  const body = `
    <div class="header">
      <h1>${isAr ? 'منتظرك! 🛒' : "You're Almost There! 🛒"}</h1>
      <p class="subtitle">${isAr ? 'رحلتك على بعد خطوة واحدة' : 'Your journey is one step away'}</p>
    </div>
    <div class="content">
      <h2>${isAr ? `${name}، توقفنا عنك!` : `${name}, We Noticed You Left Something Behind`}</h2>
      <p>${isAr
        ? 'بدأت عملية الشراء لكنك لم تكملها. نحن نفهم - الحياة مشغولة! لكن رحلة التحول لا يجب أن تنتظر.'
        : "You started the checkout but didn't complete it. We get it — life gets busy! But your transformation journey shouldn't have to wait."
      }</p>

      ${cartItems ? `
      <div class="highlight-box">
        <h3>${isAr ? '📦 في سلتك:' : '📦 In Your Cart:'}</h3>
        <p>${cartItems}</p>
      </div>
      ` : ''}

      <div class="tip-box">
        <strong>${isAr ? '⏰ تذكير:' : '⏰ Reminder:'}</strong>
        ${isAr
          ? 'كل يوم تؤجله هو يوم آخر تعيش فيه بنمط الهوية القديم. ابدأ التغيير اليوم!'
          : 'Every day you delay is another day living with your old identity pattern. Start the change today!'
        }
      </div>

      <p style="text-align: center;">
        <a href="${BASE_URL}/checkout/" class="button">${isAr ? 'أكمل الشراء الآن' : 'Complete Your Purchase'}</a>
      </p>

      <p>${isAr
        ? 'هل لديك سؤال يمنعك من المتابعة؟ نحن هنا للمساعدة - رد على هذا البريد!'
        : 'Have a question holding you back? We\'re here to help — just reply to this email!'
      }</p>
    </div>
    ${footerHtml()}`;

  return wrapEmail(dir, body);
}

// ============================================
// ABANDONED CART REMINDER (24 hours)
// ============================================
export function getAbandonedCart24hHtml(name: string, cartItems: string = '', locale: 'en' | 'ar' = 'en'): string {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isAr = locale === 'ar';

  const body = `
    <div class="header">
      <h1>${isAr ? 'لا تؤجل تحولك 💫' : "Don't Put Your Transformation on Hold 💫"}</h1>
      <p class="subtitle">${isAr ? 'عرض خاص بانتظارك' : 'A special offer awaits you'}</p>
    </div>
    <div class="content">
      <h2>${isAr ? `${name}، ما زال بإمكانك البدء!` : `${name}, It's Not Too Late to Start!`}</h2>
      <p>${isAr
        ? 'مرت 24 ساعة منذ زرت متجرنا. نريد أن نتأكد من أنك لا تفوت الفرصة لبدء رحلة التحول.'
        : "It's been 24 hours since you visited our shop. We want to make sure you don't miss the opportunity to start your transformation."
      }</p>

      ${cartItems ? `
      <div class="highlight-box">
        <h3>${isAr ? '📦 ما زال في سلتك:' : '📦 Still in Your Cart:'}</h3>
        <p>${cartItems}</p>
      </div>
      ` : ''}

      <div class="apps-box">
        <h3>${isAr ? '🎁 عرض خاص لك' : '🎁 Special Offer Just for You'}</h3>
        <p>${isAr
          ? 'أكمل الشراء خلال 48 ساعة واحصل على دليل إضافي مجاني: "5 أنماط تفكير تدمر هويتك - وكيف تكسرها"'
          : 'Complete your purchase within 48 hours and get a free bonus guide: "5 Thinking Patterns That Destroy Your Identity — And How to Break Them"'
        }</p>
      </div>

      <p style="text-align: center;">
        <a href="${BASE_URL}/checkout/" class="button">${isAr ? 'أكمل الشراء واحصل على المكافأة' : 'Complete Purchase & Claim Bonus'}</a>
      </p>

      <p>${isAr
        ? 'هل تحتاج مساعدة في اختيار المنتج المناسب؟ تواصل معنا على support@tamkinly.com'
        : 'Need help choosing the right product? Reach out at support@tamkinly.com'
      }</p>
    </div>
    ${footerHtml()}`;

  return wrapEmail(dir, body);
}

// ============================================
// QUIZ RESULTS EMAIL with personalized insights
// ============================================
export function getQuizResultsHtml(
  name: string,
  quizType: string,
  score: number,
  insights: string[] = [],
  locale: 'en' | 'ar' = 'en'
): string {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isAr = locale === 'ar';

  const quizNames: Record<string, { en: string; ar: string }> = {
    identity_gap: { en: 'Identity Gap Assessment', ar: 'تقييم فجوة الهوية' },
    values_alignment: { en: 'Values Alignment', ar: 'توافق القيم' },
    self_authorship: { en: 'Self-Authorship Scale', ar: 'مقياس تأليف الذات' },
    locus_of_control: { en: 'Locus of Control', ar: 'مركز التحكم' },
    erq: { en: 'Emotion Regulation Questionnaire', ar: 'استبيان تنظيم المشاعر' },
    environmental_audit: { en: 'Environmental Audit', ar: 'تدقيق البيئة المحيطة' },
  };

  const quizName = quizNames[quizType] || { en: quizType, ar: quizType };
  const scoreColor = score >= 70 ? BRAND.teal : score >= 40 ? '#E6A817' : '#D64545';
  const scoreLabel = score >= 70
    ? (isAr ? 'ممتاز' : 'Excellent')
    : score >= 40
      ? (isAr ? 'جيد - مجال للنمو' : 'Good — Room for Growth')
      : (isAr ? 'يحتاج تحسين' : 'Needs Improvement');

  const insightsHtml = insights.length > 0
    ? insights.map(i => `<li>${i}</li>`).join('')
    : `<li>${isAr ? 'استمر في استخدام أدوات تمكنلي لتطوير نقاط قوتك' : 'Keep using Tamkinly tools to develop your strengths'}</li>`;

  const body = `
    <div class="header">
      <h1>${isAr ? 'نتائج تقييمك جاهزة! 📊' : 'Your Assessment Results Are In! 📊'}</h1>
      <p class="subtitle">${isAr ? quizName.ar : quizName.en}</p>
    </div>
    <div class="content">
      <h2>${isAr ? `${name}، إليك نتائجك` : `${name}, Here Are Your Results`}</h2>
      <p>${isAr
        ? `أكملت ${quizName.ar}! إليك نظرة شاملة على مكانك في رحلة تحويل الهوية.`
        : `You completed the ${quizName.en}! Here's a comprehensive look at where you stand in your identity transformation journey.`
      }</p>

      <div class="access-box">
        <h3>${isAr ? 'درجتك' : 'Your Score'}</h3>
        <div class="code" style="color: ${scoreColor};">${score}<span style="font-size: 16px; color: ${BRAND.textMuted};">/100</span></div>
        <p style="color: ${scoreColor};">${scoreLabel}</p>
      </div>

      <h3>${isAr ? '🔍 رؤى مخصصة لك:' : '🔍 Personalized Insights:'}</h3>
      <ul>${insightsHtml}</ul>

      <div class="tip-box">
        <strong>${isAr ? '💡 الخطوة التالية:' : '💡 Next Step:'}</strong>
        ${isAr
          ? 'استخدم أدواتنا التفاعلية لتحسين نقاطك الضعيفة وبناء نقاط قوتك.'
          : 'Use our interactive tools to improve your weak areas and build on your strengths.'
        }
      </div>

      <p style="text-align: center;">
        <a href="${BASE_URL}/apps/" class="button">${isAr ? 'ابدأ العمل على نتائجك' : 'Start Working on Your Results'}</a>
      </p>

      <p>${isAr
        ? 'هل تريد نتائج أكثر تفصيلاً؟ ارتقِ للحصول على تحليل متعمق وتوصيات مخصصة.'
        : 'Want more detailed results? Upgrade for in-depth analysis and personalized recommendations.'
      }</p>
      <p style="text-align: center;">
        <a href="${BASE_URL}/shop/" class="button button-dark">${isAr ? 'شاهد خيارات الارتقاء' : 'See Upgrade Options'}</a>
      </p>
    </div>
    ${footerHtml()}`;

  return wrapEmail(dir, body);
}

// ============================================
// IDENTITY MILESTONE EMAIL (day 7, 14, 21, 30)
// ============================================
export function getIdentityMilestoneHtml(
  name: string,
  day: 7 | 14 | 21 | 30,
  locale: 'en' | 'ar' = 'en'
): string {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isAr = locale === 'ar';

  const milestones: Record<number, {
    titleEn: string; titleAr: string;
    subtitleEn: string; subtitleAr: string;
    messageEn: string; messageAr: string;
    tipEn: string; tipAr: string;
  }> = {
    7: {
      titleEn: "Week 1 Complete! 🌟", titleAr: "الأسبوع الأول مكتمل! 🌟",
      subtitleEn: "You've built your foundation", subtitleAr: "لقد بنيت أساسك",
      messageEn: "You've completed the first phase of awareness. Your identity baseline is set and you're ready for active recoding.",
      messageAr: "أكملت المرحلة الأولى من الوعي. خط أساس هويتك محدد وأنت مستعد لإعادة البرمجة الفعالة.",
      tipEn: "Focus on one identity shift this week — consistency beats intensity.",
      tipAr: "ركز على تحول واحد في الهوية هذا الأسبوع — الاتساق يتفوق على الكثافة.",
    },
    14: {
      titleEn: "Two Weeks Strong! 💪", titleAr: "أسبوعان بقوة! 💪",
      subtitleEn: "You're in the active recoding phase", subtitleAr: "أنت في مرحلة إعادة البرمجة الفعالة",
      messageEn: "Halfway through the core transformation! Your neural pathways are rewiring and new identity patterns are taking hold.",
      messageAr: "في منتصف التحول الأساسي! مساراتك العصبية يعاد توصيلها وأنماط هوية جديدة تترسخ.",
      tipEn: "Notice moments when your new identity naturally emerges — that's real change.",
      tipAr: "لاحظ اللحظات التي تظهر فيها هويتك الجديدة بشكل طبيعي — هذا هو التغيير الحقيقي.",
    },
    21: {
      titleEn: "Three Weeks In! 🔥", titleAr: "ثلاثة أسابيع! 🔥",
      subtitleEn: "The turning point", subtitleAr: "نقطة التحول",
      messageEn: "Day 21 is the legendary turning point. Research shows this is when new habits start feeling automatic. Your new identity is becoming who you are.",
      messageAr: "اليوم 21 هو نقطة التحول الأسطورية. الأبحاث تظهر أن هذا هو الوقت الذي تبدأ العادات الجديدة بالشعور بالتلقائية. هويتك الجديدة تصبح أنت.",
      tipEn: "Write down three ways your thinking has changed since Day 1.",
      tipAr: "اكتب ثلاث طرق تغيرت فيها طريقة تفكيرك منذ اليوم الأول.",
    },
    30: {
      titleEn: "30 Days! You Did It! 🏆", titleAr: "30 يوماً! لقد فعلتها! 🏆",
      subtitleEn: "Transformation complete", subtitleAr: "التحول مكتمل",
      messageEn: "Congratulations! You've completed the full 30-day identity transformation journey. Your new identity patterns are now integrated into who you are.",
      messageAr: "تهانينا! أكملت رحلة تحويل الهوية الكاملة لمدة 30 يوماً. أنماط هويتك الجديدة أصبحت الآن جزءاً منك.",
      tipEn: "Take the Identity Gap Assessment again to measure your transformation. Share your results!",
      tipAr: "أعد تقييم فجوة الهوية لقياس تحولك. شارك نتائجك!",
    },
  };

  const m = milestones[day];

  const body = `
    <div class="header">
      <h1>${isAr ? m.titleAr : m.titleEn}</h1>
      <p class="subtitle">${isAr ? m.subtitleAr : m.subtitleEn}</p>
    </div>
    <div class="content">
      <h2>${isAr ? `${name}، اليوم ${day}!` : `${name}, Day ${day}!`}</h2>
      <p>${isAr ? m.messageAr : m.messageEn}</p>

      <div class="stat-row">
        <div class="stat-item">
          <div class="stat-number">${day}</div>
          <div class="stat-label">${isAr ? 'أيام' : 'Days'}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${day >= 14 ? '✓' : '→'}</div>
          <div class="stat-label">${isAr ? (day >= 14 ? 'تقدم رائع' : 'استمر') : (day >= 14 ? 'On Track' : 'Keep Going')}</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">${Math.round((day / 30) * 100)}%</div>
          <div class="stat-label">${isAr ? 'مكتمل' : 'Complete'}</div>
        </div>
      </div>

      <div class="tip-box">
        <strong>${isAr ? '💡 نصيحة اليوم:' : '💡 Day Tip:'}</strong>
        ${isAr ? m.tipAr : m.tipEn}
      </div>

      ${day === 30 ? `
      <div class="apps-box">
        <h3>${isAr ? '🏆 ما التالي؟' : '🏆 What\'s Next?'}</h3>
        <ul>
          <li>${isAr ? 'أعد التقييم لقياس تحولك' : 'Re-take assessments to measure your transformation'}</li>
          <li>${isAr ? 'شارك قصتك مع مجتمع تمكنلي' : 'Share your story with the Tamkinly community'}</li>
          <li>${isAr ? 'ارتقِ للحصول على أدوات متقدمة مستمرة' : 'Upgrade for continued advanced tools'}</li>
        </ul>
      </div>
      ` : ''}

      <p style="text-align: center;">
        <a href="${BASE_URL}/apps/" class="button">${isAr ? 'شاهد تقدمك' : 'View Your Progress'}</a>
      </p>
    </div>
    ${footerHtml()}`;

  return wrapEmail(dir, body);
}

// ============================================
// RE-ENGAGEMENT EMAIL (inactive 7+ days)
// ============================================
export function getReEngagementHtml(name: string, inactiveDays: number = 7, locale: 'en' | 'ar' = 'en'): string {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const isAr = locale === 'ar';

  const body = `
    <div class="header">
      <h1>${isAr ? 'نفتقدك! 💙' : 'We Miss You! 💙'}</h1>
      <p class="subtitle">${isAr ? 'رحلتك لا تزال مهمة' : 'Your journey still matters'}</p>
    </div>
    <div class="content">
      <h2>${isAr ? `${name}، أين أنت؟` : `${name}, Where Have You Been?`}</h2>
      <p>${isAr
        ? `لم نقم بزيارتك منذ ${inactiveDays} يوماً. نحن نفهم أن الحياة قد تكون مشغولة، لكن رحلة تحويل الهوية تستحق المتابعة.`
        : `We haven't seen you in ${inactiveDays} days. We understand life gets busy, but your identity transformation journey is worth continuing.`
      }</p>

      <div class="tip-box">
        <strong>${isAr ? '🔄 حقيقة مهمة:' : '🔄 Important Fact:'}</strong>
        ${isAr
          ? 'حتى التوقف القصير لا يمحو تقدمك. أنماطك الجديدة لا تزال محفوظة - تحتاج فقط لإعادة تفعيلها.'
          : 'Even a short break doesn\'t erase your progress. Your new patterns are still stored — you just need to reactivate them.'
        }
      </div>

      <h3>${isAr ? '3 خطوات سهلة للعودة:' : '3 Easy Steps to Get Back:'}</h3>
      <ul>
        <li>${isAr ? 'سجّل مشاعرك اليوم في دفتر اليوميات' : 'Journal your feelings today'}</li>
        <li>${isAr ? 'أكمل تمريناً واحداً من أي تطبيق' : 'Complete one exercise from any app'}</li>
        <li>${isAr ? 'حدد نية واحدة للأسبوع القادم' : 'Set one intention for next week'}</li>
      </ul>

      <p style="text-align: center;">
        <a href="${BASE_URL}/apps/" class="button">${isAr ? 'عد إلى رحلتك' : 'Return to Your Journey'}</a>
      </p>

      <p>${isAr
        ? 'لا تريد تلقي هذه التذكيرات؟ يمكنك <a href="${BASE_URL}/unsubscribe/" style="color: ' + BRAND.teal + ';">إلغاء الاشتراك</a> في أي وقت.'
        : 'Don\'t want these reminders? You can <a href="${BASE_URL}/unsubscribe/" style="color: ' + BRAND.teal + ';">unsubscribe</a> at any time.'
      }</p>
    </div>
    ${footerHtml()}`;

  return wrapEmail(dir, body);
}

// ============================================
// EXPORT
// ============================================
const EmailTemplates = {
  welcome: getWelcomeEmailHtml,
  trialPurchase: getTrialPurchaseEmailHtml,
  plannerPurchase: getPlannerPurchaseEmailHtml,
  premiumPurchase: getPremiumPurchaseEmailHtml,
  bundlePurchase: getBundlePurchaseEmailHtml,
  purchaseConfirmation: getPurchaseConfirmationHtml,
  day3FollowUp: getDay3FollowUpHtml,
  day7FollowUp: getDay7FollowUpHtml,
  day14FollowUp: getDay14FollowUpHtml,
  abandonedCart1h: getAbandonedCart1hHtml,
  abandonedCart24h: getAbandonedCart24hHtml,
  quizResults: getQuizResultsHtml,
  identityMilestone: getIdentityMilestoneHtml,
  reEngagement: getReEngagementHtml,
};

export default EmailTemplates;
