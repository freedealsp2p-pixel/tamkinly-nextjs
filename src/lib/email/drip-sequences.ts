// ============================================
// DRIP SEQUENCES - Email Automation Definitions (NEW MODEL 2025)
// Tamkinly Identity Transformation Platform
// ============================================
// 9 sequences for the new 3-tier monthly subscription model:
//   1. LEAD_NURTURE — Quiz completers → BASIC conversion
//   2. BASIC_ONBOARDING — BASIC purchase → activation + upsell to PREMIUM
//   3. PREMIUM_ONBOARDING — PREMIUM purchase → 30-day journey + upsell to MASTERY
//   4. MASTERY_ONBOARDING — MASTERY purchase → VIP activation + retention
//   5. ABANDONED_CART_1H — Cart abandoned (1 hour)
//   6. ABANDONED_CART_24H — Cart abandoned (24 hours)
//   7. RE_ENGAGEMENT — Inactive users (14 days)
//   8. UPSELL_BASIC_TO_PREMIUM — Day 5 of BASIC journey
//   9. UPSELL_PREMIUM_TO_MASTERY — Day 21 of PREMIUM journey
// ============================================

// ============================================
// TYPES
// ============================================

export type SequenceTier = 'free' | 'basic' | 'premium' | 'mastery';

export interface DripStep {
  /** Step number within the sequence (1-based) */
  stepNumber: number;
  /** Hours after the previous step (0 = immediate) */
  delayHours: number;
  /** Email subject line */
  subject: string;
  /** Email subject line in Arabic */
  subjectAr: string;
  /** Preheader text */
  preheader: string;
  /** Preheader text in Arabic */
  preheaderAr: string;
  /** Template function name from email-templates.ts */
  templateName: string;
  /** Primary CTA text */
  primaryCta: string;
  /** Primary CTA URL (relative or absolute) */
  primaryUrl: string;
  /** Tags for tracking */
  tags: string[];
  /** Rendered HTML content (optional override used by the queue) */
  content?: string;
}

export interface DripSequence {
  /** Unique identifier for this sequence */
  id: string;
  /** Human-readable name */
  name: string;
  /** Description of the sequence */
  description: string;
  /** Which tier this sequence is for */
  tier: SequenceTier;
  /** What triggers this sequence */
  trigger: string;
  /** Whether this sequence is active */
  isActive: boolean;
  /** Steps in the sequence, ordered by stepNumber */
  steps: DripStep[];
}

// ============================================
// BASE URL
// ============================================

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tamkinly.com';

// ============================================
// SEQUENCE 1: LEAD_NURTURE (Quiz completers → BASIC)
// ============================================
// Trigger: User completes quiz and provides email
// Goal: Convert lead → BASIC subscriber
// ============================================

const LEAD_NURTURE_SEQUENCE: DripSequence = {
  id: 'lead_nurture_sequence',
  name: 'Lead Nurture — Quiz to BASIC',
  description: 'Nurture quiz completers from results to first BASIC subscription',
  tier: 'free',
  trigger: 'LEAD_NURTURE',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0, // Immediate
      subject: 'Your Identity Gap Score is ready 🎯',
      subjectAr: 'درجة فجوة هويتك جاهزة 🎯',
      preheader: 'See your results and personalized roadmap',
      preheaderAr: 'شاهد نتائجك وخارطة الطريق الشخصية',
      templateName: 'quizResults',
      primaryCta: 'See My Full Results',
      primaryUrl: `${BASE_URL}/quiz/results`,
      tags: ['lead', 'quiz', 'results', 'free'],
    },
    {
      stepNumber: 2,
      delayHours: 48, // Day 2
      subject: 'What your Identity Gap Score really means 📊',
      subjectAr: 'ماذا تعني درجة فجوة هويتك حقاً 📊',
      preheader: '3 key insights + a 5-minute exercise',
      preheaderAr: '3 رؤى رئيسية + تمرين 5 دقائق',
      templateName: 'day3FollowUp',
      primaryCta: 'Start the Free Exercise',
      primaryUrl: `${BASE_URL}/apps/values-clarification`,
      tags: ['lead', 'day2', 'insights', 'free'],
    },
    {
      stepNumber: 3,
      delayHours: 72, // Day 4 (2 days after step 2)
      subject: 'The #1 reason people stay stuck (and how to fix it)',
      subjectAr: 'السبب الأول لبقاء الناس عالقين (وكيف تصلحه)',
      preheader: 'It is not about discipline. It is about identity.',
      preheaderAr: 'الأمر لا يتعلق بالانضباط. بل بالهوية.',
      templateName: 'day7FollowUp',
      primaryCta: 'Read the Full Guide',
      primaryUrl: `${BASE_URL}/blog/identity-gap-assessment`,
      tags: ['lead', 'day4', 'education', 'free'],
    },
    {
      stepNumber: 4,
      delayHours: 72, // Day 7 (3 days after step 3)
      subject: 'Ready to start your 7-day transformation? ($7/mo) ⬆️',
      subjectAr: 'مستعد لبدء تحولك لـ 7 أيام؟ ($7/شهر) ⬆️',
      preheader: 'Your Basic subscription unlocks the 7-Day System',
      preheaderAr: 'اشتراكك الأساسي يفتح نظام 7 أيام',
      templateName: 'day14FollowUp',
      primaryCta: 'Start Basic — $7/mo',
      primaryUrl: `${BASE_URL}/products/basic`,
      tags: ['lead', 'day7', 'offer', 'basic', 'upsell'],
    },
    {
      stepNumber: 5,
      delayHours: 168, // Day 14 (7 days after step 4)
      subject: 'How Sarah closed her Identity Gap in 30 days ✨',
      subjectAr: 'كيف سدّت سارة فجوة هويتها في 30 يوماً ✨',
      preheader: 'Real story + why Basic is the perfect start',
      preheaderAr: 'قصة حقيقية + لماذا الأساسي بداية مثالية',
      templateName: 'day14FollowUp',
      primaryCta: 'Start Your Journey — $7/mo',
      primaryUrl: `${BASE_URL}/products/basic`,
      tags: ['lead', 'day14', 'testimonial', 'basic', 'upsell'],
    },
    {
      stepNumber: 6,
      delayHours: 168, // Day 21 (7 days after step 5)
      subject: 'Last chance: 7-Day System at $7/mo 🕐',
      subjectAr: 'فرصة أخيرة: نظام 7 أيام بـ $7/شهر 🕐',
      preheader: 'Your quiz results expire soon. Take action.',
      preheaderAr: 'نتائج اختبارك تنتهي قريباً. اتخذ إجراءً.',
      templateName: 'reEngagement',
      primaryCta: 'Unlock Basic Now',
      primaryUrl: `${BASE_URL}/products/basic`,
      tags: ['lead', 'day21', 'urgency', 'basic', 'upsell'],
    },
  ],
};

// ============================================
// SEQUENCE 2: BASIC_ONBOARDING (BASIC purchase → activation + upsell)
// ============================================
// Trigger: Webhook confirms $7 payment
// Goal: Activate user in 7 days + upsell to PREMIUM
// ============================================

const BASIC_ONBOARDING_SEQUENCE: DripSequence = {
  id: 'basic_onboarding_sequence',
  name: 'BASIC Onboarding — 7-Day Journey + Upsell',
  description: 'Guide BASIC subscribers through 7-day journey and convert to PREMIUM',
  tier: 'basic',
  trigger: 'BASIC_ONBOARDING',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0, // Immediate after purchase
      subject: 'Welcome to Basic! Your 7-Day System is ready 🎯',
      subjectAr: 'مرحباً بك في الأساسي! نظام 7 أيام جاهز 🎯',
      preheader: 'Your access code + 7-Day System PDF inside',
      preheaderAr: 'رمز وصولك + PDF نظام 7 أيام بالداخل',
      templateName: 'purchaseConfirmation',
      primaryCta: 'Access Your Apps',
      primaryUrl: `${BASE_URL}/apps`,
      tags: ['basic', 'welcome', 'onboarding', 'access'],
    },
    {
      stepNumber: 2,
      delayHours: 48, // Day 2
      subject: 'Day 1: Set your Identity Baseline 📝',
      subjectAr: 'اليوم 1: حدد خط أساس هويتك 📝',
      preheader: 'Start with awareness. This is where transformation begins.',
      preheaderAr: 'ابدأ بالوعي. هنا يبدأ التحول.',
      templateName: 'day3FollowUp',
      primaryCta: 'Open Trial Planner',
      primaryUrl: `${BASE_URL}/apps/trial-planner`,
      tags: ['basic', 'day1', 'activation', 'baseline'],
    },
    {
      stepNumber: 3,
      delayHours: 48, // Day 3 (2 days after step 2)
      subject: 'Day 3: The science of identity shift 🧠',
      subjectAr: 'اليوم 3: علم تحول الهوية 🧠',
      preheader: 'Why identity-based change is 3x more effective',
      preheaderAr: 'لماذا التحول القائم على الهوية أكثر فعالية بـ 3 مرات',
      templateName: 'day7FollowUp',
      primaryCta: 'Read the Research',
      primaryUrl: `${BASE_URL}/methodology`,
      tags: ['basic', 'day3', 'education', 'science'],
    },
    {
      stepNumber: 4,
      delayHours: 72, // Day 6 (3 days after step 3)
      subject: 'Day 5: Common pitfalls to avoid ⚠️',
      subjectAr: 'اليوم 5: أخطاء شائعة يجب تجنبها ⚠️',
      preheader: '3 mistakes that derail identity transformation',
      preheaderAr: '3 أخطاء تُفشل تحول الهوية',
      templateName: 'day3FollowUp',
      primaryCta: 'Avoid These Mistakes',
      primaryUrl: `${BASE_URL}/blog/stop-procrastinating-identity-shift`,
      tags: ['basic', 'day5', 'education', 'pitfalls'],
    },
    {
      stepNumber: 5,
      delayHours: 24, // Day 7 (1 day after step 4)
      subject: 'Day 7: Your progress + what\'s next ⬆️',
      subjectAr: 'اليوم 7: تقدمك + ما التالي ⬆️',
      preheader: 'You completed 7 days! Ready for the 30-day journey?',
      preheaderAr: 'أكملت 7 أيام! مستعد لرحلة 30 يوماً؟',
      templateName: 'day14FollowUp',
      primaryCta: 'Upgrade to Premium — $17/mo',
      primaryUrl: `${BASE_URL}/products/premium`,
      tags: ['basic', 'day7', 'milestone', 'upsell', 'premium'],
    },
    {
      stepNumber: 6,
      delayHours: 72, // Day 10 (3 days after step 5)
      subject: 'Why Premium is the natural next step 🚀',
      subjectAr: 'لماذا المميز هو الخطوة الطبيعية التالية 🚀',
      preheader: 'Unlock 10 more apps + 30-day structured journey',
      preheaderAr: 'افتح 10 تطبيقات إضافية + رحلة 30 يوماً منظمة',
      templateName: 'day14FollowUp',
      primaryCta: 'See What Premium Includes',
      primaryUrl: `${BASE_URL}/products/premium`,
      tags: ['basic', 'day10', 'upsell', 'premium'],
    },
    {
      stepNumber: 7,
      delayHours: 96, // Day 14 (4 days after step 6)
      subject: 'Special: First month Premium at $12 (save $5) 🎁',
      subjectAr: 'عرض خاص: أول شهر مميز بـ $12 (وفر $5) 🎁',
      preheader: 'Exclusive upgrade offer for Basic subscribers',
      preheaderAr: 'عرض ترقية حصري لمشتركي الأساسي',
      templateName: 'day14FollowUp',
      primaryCta: 'Claim Your Discount',
      primaryUrl: `${BASE_URL}/products/premium?offer=basic_upgrade`,
      tags: ['basic', 'day14', 'offer', 'upsell', 'premium', 'discount'],
    },
  ],
};

// ============================================
// SEQUENCE 3: PREMIUM_ONBOARDING (PREMIUM purchase → 30-day journey + upsell)
// ============================================
// Trigger: Webhook confirms $17 payment
// Goal: Complete 30-day journey + upsell to MASTERY
// ============================================

const PREMIUM_ONBOARDING_SEQUENCE: DripSequence = {
  id: 'premium_onboarding_sequence',
  name: 'PREMIUM Onboarding — 30-Day Journey + Upsell',
  description: 'Guide PREMIUM subscribers through 30-day journey and convert to MASTERY',
  tier: 'premium',
  trigger: 'PREMIUM_ONBOARDING',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0, // Immediate
      subject: 'Welcome to Premium! Your 30-day journey begins 🌟',
      subjectAr: 'مرحباً بك في المميز! رحلة 30 يوماً تبدأ 🌟',
      preheader: '11 apps unlocked + 4-phase transformation roadmap',
      preheaderAr: '11 تطبيقاً مفتوحة + خارطة تحول 4 مراحل',
      templateName: 'purchaseConfirmation',
      primaryCta: 'Access Your Apps',
      primaryUrl: `${BASE_URL}/apps`,
      tags: ['premium', 'welcome', 'onboarding', 'access'],
    },
    {
      stepNumber: 2,
      delayHours: 72, // Day 3
      subject: 'Phase 1: Discover — Your baseline 📊',
      subjectAr: 'المرحلة 1: اكتشاف — خط أساسك 📊',
      preheader: 'Days 1-7: Identity audit + values excavation',
      preheaderAr: 'أيام 1-7: تدقيق الهوية + تنقيب القيم',
      templateName: 'day3FollowUp',
      primaryCta: 'Start Phase 1',
      primaryUrl: `${BASE_URL}/apps/identity-baseline`,
      tags: ['premium', 'phase1', 'discover', 'day3'],
    },
    {
      stepNumber: 3,
      delayHours: 96, // Day 7 (4 days after step 2)
      subject: 'Phase 1 complete! What\'s next 🎉',
      subjectAr: 'المرحلة 1 مكتملة! ما التالي 🎉',
      preheader: 'You discovered your identity gaps. Now deconstruct.',
      preheaderAr: 'اكتشفت فجوات هويتك. الآن فككها.',
      templateName: 'day7FollowUp',
      primaryCta: 'Begin Phase 2',
      primaryUrl: `${BASE_URL}/apps/identity-recode-system`,
      tags: ['premium', 'milestone', 'phase2', 'day7'],
    },
    {
      stepNumber: 4,
      delayHours: 168, // Day 14 (7 days after step 3)
      subject: 'Phase 2-3: Deconstruct & Reconstruct 🔄',
      subjectAr: 'المرحلة 2-3: تفكيك وإعادة بناء 🔄',
      preheader: 'Days 8-21: Release borrowed identities + build authentic self',
      preheaderAr: 'أيام 8-21: تحرير الهويات المستعارة + بناء الذات الأصيلة',
      templateName: 'day14FollowUp',
      primaryCta: 'Continue Your Journey',
      primaryUrl: `${BASE_URL}/apps/journal-system`,
      tags: ['premium', 'phase2', 'phase3', 'day14'],
    },
    {
      stepNumber: 5,
      delayHours: 168, // Day 21 (7 days after step 4)
      subject: 'Phase 4: Integrate + Meet your AI Coach 🤖',
      subjectAr: 'المرحلة 4: دمج + تعرف على مدربك الذكي 🤖',
      preheader: 'Days 22-30: Make it automatic + discover MASTERY tools',
      preheaderAr: 'أيام 22-30: اجعله تلقائياً + اكتشف أدوات الإتقان',
      templateName: 'day14FollowUp',
      primaryCta: 'Discover MASTERY',
      primaryUrl: `${BASE_URL}/products/mastery`,
      tags: ['premium', 'phase4', 'integrate', 'day21', 'upsell', 'mastery'],
    },
    {
      stepNumber: 6,
      delayHours: 168, // Day 28 (7 days after step 5)
      subject: 'Almost done! Share your wins 🏆',
      subjectAr: 'اقتربت من النهاية! شارك إنجازاتك 🏆',
      preheader: '30-day journey almost complete. Celebrate + plan next.',
      preheaderAr: 'رحلة 30 يوماً شبه مكتملة. احتفل + خطط للتالي.',
      templateName: 'identityMilestone',
      primaryCta: 'See Your Progress',
      primaryUrl: `${BASE_URL}/apps/progress-dashboard`,
      tags: ['premium', 'milestone', 'day28', 'celebration'],
    },
    {
      stepNumber: 7,
      delayHours: 48, // Day 30 (2 days after step 6)
      subject: 'Day 30: What\'s next? Master-level tools await 🎓',
      subjectAr: 'اليوم 30: ما التالي؟ أدوات مستوى الإتقان بانتظارك 🎓',
      preheader: 'AI Coach + Community + Emotion Regulation + Priority Support',
      preheaderAr: 'مدرب ذكي + مجتمع + تنظيم المشاعر + دعم أولوية',
      templateName: 'day14FollowUp',
      primaryCta: 'Upgrade to MASTERY — $27/mo',
      primaryUrl: `${BASE_URL}/products/mastery`,
      tags: ['premium', 'day30', 'milestone', 'upsell', 'mastery'],
    },
  ],
};

// ============================================
// SEQUENCE 4: MASTERY_ONBOARDING (MASTERY purchase → VIP activation + retention)
// ============================================
// Trigger: Webhook confirms $27 payment
// Goal: Long-term retention + advocacy
// ============================================

const MASTERY_ONBOARDING_SEQUENCE: DripSequence = {
  id: 'mastery_onboarding_sequence',
  name: 'MASTERY Onboarding — VIP Journey',
  description: 'VIP onboarding with AI Coach, Community, and advanced tools',
  tier: 'mastery',
  trigger: 'MASTERY_ONBOARDING',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0, // Immediate
      subject: 'Welcome to MASTERY! You\'re VIP now 👑',
      subjectAr: 'مرحباً بك في الإتقان! أنت VIP الآن 👑',
      preheader: 'Everything unlocked + AI Coach + Community + Priority Support',
      preheaderAr: 'كل شيء مفتوح + مدرب ذكي + مجتمع + دعم أولوية',
      templateName: 'purchaseConfirmation',
      primaryCta: 'Access Everything',
      primaryUrl: `${BASE_URL}/apps`,
      tags: ['mastery', 'vip', 'welcome', 'onboarding'],
    },
    {
      stepNumber: 2,
      delayHours: 48, // Day 2
      subject: 'Meet your AI Identity Coach 🤖',
      subjectAr: 'تعرف على مدرب هويتك الذكي 🤖',
      preheader: '24/7 personalized coaching powered by AI + neuroscience',
      preheaderAr: 'تدريب شخصي 24/7 مدعوم بالذكاء الاصطناعي والعلوم العصبية',
      templateName: 'day3FollowUp',
      primaryCta: 'Start Coaching Session',
      primaryUrl: `${BASE_URL}/apps/ai-identity-coach`,
      tags: ['mastery', 'day2', 'ai-coach', 'activation'],
    },
    {
      stepNumber: 3,
      delayHours: 72, // Day 5 (3 days after step 2)
      subject: 'Community spotlight: Your transformation family 👥',
      subjectAr: 'ضوء على المجتمع: عائلة تحولك 👥',
      preheader: 'Connect, share, and grow with people on the same journey',
      preheaderAr: 'تواصل وشارك وانمُ مع أشخاص في نفس الرحلة',
      templateName: 'day7FollowUp',
      primaryCta: 'Join the Community',
      primaryUrl: `${BASE_URL}/apps/community-access`,
      tags: ['mastery', 'day5', 'community', 'engagement'],
    },
    {
      stepNumber: 4,
      delayHours: 120, // Day 10 (5 days after step 3)
      subject: 'Advanced: Emotion Regulation toolkit 💙',
      subjectAr: 'متقدم: أدوات تنظيم المشاعر 💙',
      preheader: 'ERQ-based techniques for emotional intelligence',
      preheaderAr: 'تقنيات مبنية على ERQ للذكاء العاطفي',
      templateName: 'day3FollowUp',
      primaryCta: 'Open Emotion Regulation',
      primaryUrl: `${BASE_URL}/apps/emotion-regulation`,
      tags: ['mastery', 'day10', 'advanced', 'emotion'],
    },
    {
      stepNumber: 5,
      delayHours: 96, // Day 14 (4 days after step 4)
      subject: 'Priority Support — how to use it 🎧',
      subjectAr: 'الدعم ذو الأولوية — كيف تستخدمه 🎧',
      preheader: 'Personal guidance from transformation experts',
      preheaderAr: 'إرشاد شخصي من خبراء التحول',
      templateName: 'day14FollowUp',
      primaryCta: 'Contact Priority Support',
      primaryUrl: `${BASE_URL}/apps/priority-support`,
      tags: ['mastery', 'day14', 'support', 'vip'],
    },
    {
      stepNumber: 6,
      delayHours: 168, // Day 21 (7 days after step 5)
      subject: 'MASTERY milestones: Track your evolution 📈',
      subjectAr: 'إنجازات الإتقان: تتبع تطورك 📈',
      preheader: 'See how far you\'ve come across all 15 tools',
      preheaderAr: 'شاهد كم تقدمت عبر كل الأدوات الـ 15',
      templateName: 'identityMilestone',
      primaryCta: 'View Your Dashboard',
      primaryUrl: `${BASE_URL}/apps/progress-dashboard`,
      tags: ['mastery', 'day21', 'milestones', 'retention'],
    },
    {
      stepNumber: 7,
      delayHours: 216, // Day 30 (9 days after step 6)
      subject: 'You\'re a Master now — share your story ✨',
      subjectAr: 'أنت الآن مُتقن — شارك قصتك ✨',
      preheader: 'Inspire others + earn referral rewards',
      preheaderAr: 'ألهم الآخرين + اكسب مكافآت الإحالة',
      templateName: 'reEngagement',
      primaryCta: 'Share Your Story',
      primaryUrl: `${BASE_URL}/referral`,
      tags: ['mastery', 'day30', 'advocacy', 'referral'],
    },
  ],
};

// ============================================
// SEQUENCE 5: ABANDONED_CART_1H
// ============================================
const ABANDONED_CART_1H_SEQUENCE: DripSequence = {
  id: 'abandoned_cart_1h_sequence',
  name: 'Abandoned Cart — 1 Hour',
  description: 'Gentle reminder 1 hour after cart abandonment',
  tier: 'free',
  trigger: 'ABANDONED_CART_1H',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 1, // 1 hour after abandonment
      subject: 'Forgot something? 🛒',
      subjectAr: 'نسيت شيئاً؟ 🛒',
      preheader: 'Your transformation journey is waiting',
      preheaderAr: 'رحلة تحولك بانتظارك',
      templateName: 'abandonedCart1h',
      primaryCta: 'Complete Your Purchase',
      primaryUrl: `${BASE_URL}/checkout`,
      tags: ['cart', 'abandoned', '1h', 'recovery'],
    },
  ],
};

// ============================================
// SEQUENCE 6: ABANDONED_CART_24H
// ============================================
const ABANDONED_CART_24H_SEQUENCE: DripSequence = {
  id: 'abandoned_cart_24h_sequence',
  name: 'Abandoned Cart — 24 Hours',
  description: 'Incentivized reminder 24 hours after cart abandonment',
  tier: 'free',
  trigger: 'ABANDONED_CART_24H',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 24, // 24 hours after abandonment
      subject: 'Still thinking? Here\'s $5 off your first month 🎁',
      subjectAr: 'ما زلت تفكر؟ إليك $5 خصم على أول شهر 🎁',
      preheader: 'FAQ + testimonial + special discount',
      preheaderAr: 'أسئلة شائعة + شهادة + خصم خاص',
      templateName: 'abandonedCart24h',
      primaryCta: 'Claim Discount + Checkout',
      primaryUrl: `${BASE_URL}/checkout?discount=welcome5`,
      tags: ['cart', 'abandoned', '24h', 'recovery', 'discount'],
    },
  ],
};

// ============================================
// SEQUENCE 7: RE_ENGAGEMENT (Inactive 14 days)
// ============================================
const RE_ENGAGEMENT_SEQUENCE: DripSequence = {
  id: 're_engagement_sequence',
  name: 'Re-Engagement — Inactive Users',
  description: 'Win back users inactive for 14+ days',
  tier: 'free',
  trigger: 'RE_ENGAGEMENT',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'We miss you! 💙',
      subjectAr: 'نحن نفتقدك! 💙',
      preheader: 'Pick up where you left off',
      preheaderAr: 'أكمل من حيث توقفت',
      templateName: 'reEngagement',
      primaryCta: 'Return to Your Journey',
      primaryUrl: `${BASE_URL}/apps`,
      tags: ['reengagement', 'winback', 'inactive'],
    },
    {
      stepNumber: 2,
      delayHours: 72, // Day 3
      subject: 'Quick win you can do in 5 minutes ⚡',
      subjectAr: 'إنجاز سريع يمكنك فعله في 5 دقائق ⚡',
      preheader: 'A small action that restarts momentum',
      preheaderAr: 'فعل صغير يعيد الزخم',
      templateName: 'day3FollowUp',
      primaryCta: 'Do This 5-Minute Exercise',
      primaryUrl: `${BASE_URL}/apps/daily-reflection`,
      tags: ['reengagement', 'day3', 'quick-win'],
    },
    {
      stepNumber: 3,
      delayHours: 96, // Day 7 (4 days after step 2)
      subject: 'If you cancel, here\'s what you\'ll miss 📋',
      subjectAr: 'إذا ألغيت، هذا ما ستفوته 📋',
      preheader: 'Your progress + milestones + future tools',
      preheaderAr: 'تقدمك + إنجازاتك + أدواتك المستقبلية',
      templateName: 'reEngagement',
      primaryCta: 'Keep My Subscription',
      primaryUrl: `${BASE_URL}/apps`,
      tags: ['reengagement', 'day7', 'retention', 'fomo'],
    },
  ],
};

// ============================================
// SEQUENCE 8: UPSELL_BASIC_TO_PREMIUM
// ============================================
const UPSELL_BASIC_TO_PREMIUM_SEQUENCE: DripSequence = {
  id: 'upsell_basic_to_premium_sequence',
  name: 'Upsell — BASIC to PREMIUM',
  description: 'Convert BASIC subscribers to PREMIUM after 5 days',
  tier: 'basic',
  trigger: 'UPSELL_BASIC_TO_PREMIUM',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'You\'re ready for the 30-day journey 🚀',
      subjectAr: 'أنت مستعد لرحلة 30 يوماً 🚀',
      preheader: 'Basic gave you a taste. Premium transforms completely.',
      preheaderAr: 'الأساسي أعطاك لمحة. المميز يحول بالكامل.',
      templateName: 'day14FollowUp',
      primaryCta: 'See Premium Details',
      primaryUrl: `${BASE_URL}/products/premium`,
      tags: ['upsell', 'basic-to-premium', 'day5'],
    },
    {
      stepNumber: 2,
      delayHours: 48, // Day 2
      subject: 'BASIC vs PREMIUM: What\'s the difference? 📊',
      subjectAr: 'الأساسي vs المميز: ما الفرق؟ 📊',
      preheader: 'Side-by-side comparison of 1 app vs 11 apps',
      preheaderAr: 'مقارنة جنباً إلى جنب لتطبيق vs 11 تطبيقاً',
      templateName: 'day14FollowUp',
      primaryCta: 'Compare Plans',
      primaryUrl: `${BASE_URL}/products`,
      tags: ['upsell', 'basic-to-premium', 'comparison', 'day2'],
    },
    {
      stepNumber: 3,
      delayHours: 96, // Day 4 (2 days after step 2)
      subject: 'Limited: First month Premium at $12 (save $5) 🎁',
      subjectAr: 'محدود: أول شهر مميز بـ $12 (وفر $5) 🎁',
      preheader: 'Exclusive offer for Basic subscribers',
      preheaderAr: 'عرض حصري لمشتركي الأساسي',
      templateName: 'day14FollowUp',
      primaryCta: 'Claim Discount',
      primaryUrl: `${BASE_URL}/products/premium?offer=basic_upgrade`,
      tags: ['upsell', 'basic-to-premium', 'discount', 'day4', 'urgency'],
    },
  ],
};

// ============================================
// SEQUENCE 9: UPSELL_PREMIUM_TO_MASTERY
// ============================================
const UPSELL_PREMIUM_TO_MASTERY_SEQUENCE: DripSequence = {
  id: 'upsell_premium_to_mastery_sequence',
  name: 'Upsell — PREMIUM to MASTERY',
  description: 'Convert PREMIUM subscribers to MASTERY after 21 days',
  tier: 'premium',
  trigger: 'UPSELL_PREMIUM_TO_MASTERY',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'Meet your AI Identity Coach 🤖',
      subjectAr: 'تعرف على مدرب هويتك الذكي 🤖',
      preheader: '24/7 personalized guidance — only in MASTERY',
      preheaderAr: 'إرشاد شخصي 24/7 — فقط في الإتقان',
      templateName: 'day14FollowUp',
      primaryCta: 'Discover AI Coach',
      primaryUrl: `${BASE_URL}/apps/ai-identity-coach`,
      tags: ['upsell', 'premium-to-mastery', 'ai-coach', 'day21'],
    },
    {
      stepNumber: 2,
      delayHours: 48, // Day 2
      subject: 'Community success story: From Premium to MASTERY ✨',
      subjectAr: 'قصة نجاح من المجتمع: من المميز إلى الإتقان ✨',
      preheader: 'How joining the community accelerated transformation',
      preheaderAr: 'كيف سرّع الانضمام للمجتمع التحول',
      templateName: 'day7FollowUp',
      primaryCta: 'Read Success Story',
      primaryUrl: `${BASE_URL}/apps/community-access`,
      tags: ['upsell', 'premium-to-mastery', 'community', 'testimonial', 'day2'],
    },
    {
      stepNumber: 3,
      delayHours: 96, // Day 4 (2 days after step 2)
      subject: 'Upgrade to MASTERY — lock in your price 🔒',
      subjectAr: 'ترقية إلى الإتقان — احجز سعرك 🔒',
      preheader: 'AI Coach + Community + Emotion Regulation + Priority Support',
      preheaderAr: 'مدرب ذكي + مجتمع + تنظيم مشاعر + دعم أولوية',
      templateName: 'day14FollowUp',
      primaryCta: 'Upgrade to MASTERY — $27/mo',
      primaryUrl: `${BASE_URL}/products/mastery`,
      tags: ['upsell', 'premium-to-mastery', 'offer', 'day4', 'urgency'],
    },
  ],
};

// ============================================
// LEGACY SEQUENCES (kept for backward compatibility with existing subscribers)
// ============================================

const FREE_SUBSCRIBER_SEQUENCE: DripSequence = LEAD_NURTURE_SEQUENCE;
const TRIAL_SEQUENCE: DripSequence = BASIC_ONBOARDING_SEQUENCE;
const BASIC_SEQUENCE: DripSequence = PREMIUM_ONBOARDING_SEQUENCE;
const PREMIUM_SEQUENCE: DripSequence = MASTERY_ONBOARDING_SEQUENCE;
const BUNDLE_SEQUENCE: DripSequence = MASTERY_ONBOARDING_SEQUENCE;

const QUIZ_COMPLETED_SEQUENCE: DripSequence = {
  id: 'quiz_completed_sequence',
  name: 'Quiz Results Follow-up (Legacy)',
  description: 'Legacy alias for LEAD_NURTURE sequence',
  tier: 'free',
  trigger: 'QUIZ_COMPLETED',
  isActive: false, // Disabled — use LEAD_NURTURE instead
  steps: LEAD_NURTURE_SEQUENCE.steps,
};

// ============================================
// EXPORT ALL SEQUENCES
// ============================================


// ============================================
// WELCOME BILINGUAL HTML (2026-09-27)
// Single source for the NEW_SUBSCRIBER welcome email. Bilingual (AR + EN),
// brand-styled, self-contained. {{name}} / {{email}} get replaced by
// replaceVariables before queueing.
// ============================================
function welcomeBilingualHtml(name: string): string {
  const codeBox = (txt: string) =>
    '<div style="font-size:15px;font-weight:bold;background:#F5F9F8;border:1px solid #D8E6E4;border-radius:10px;padding:10px 14px;text-align:center;margin:8px 0;color:#0F1C2E;">' + txt + '</div>';
  const arSection =
    '<div dir="rtl" style="text-align:right;">' +
    '<h2 style="color:#0F1C2E;font-size:20px;margin:0 0 10px;">مرحباً ' + name + '،</h2>' +
    '<p style="color:#475569;line-height:1.8;margin:0 0 14px;">أهلاً بك في تمكينلي — مساحة لإعادة بناء الإنسان من الداخل، بلا ضغط وبلا حكم على الذات. لقد اتخذت الخطوة الأولى، وهذه هداياك المجانية للبداية:</p>' +
    codeBox('1) اختبار فجوة الهوية — تقييم مجاني في 3 دقائق يرسم خريطتك الشخصية عبر 6 أبعاد') +
    codeBox('2) تقنية الجملة المبتورة — بروتوكول علاجي كامل مجاناً (5 شاشات + متابعة 9 أيام)') +
    '<p style="text-align:center;margin:18px 0 6px;">' +
    '<a href="https://tamkinly.com/quiz" style="display:inline-block;background:#1F6F78;color:#ffffff;text-decoration:none;padding:12px 26px;border-radius:10px;font-weight:bold;margin:4px 3px;">ابدأ الاختبار المجاني</a>' +
    '<a href="https://tamkinly.com/apps/therapeutic-protocols/truncated-sentence" style="display:inline-block;background:#3DD4B0;color:#0F1C2E;text-decoration:none;padding:12px 26px;border-radius:10px;font-weight:bold;margin:4px 3px;">احصل على التقنية المجانية</a>' +
    '</p>' +
    '<p style="color:#64748B;font-size:13px;line-height:1.7;">ستصلك رسالة مدروسة أسبوعياً عن الهوية والعادات والتعافي. منتجاتنا الكاملة: الاشتراكات (أساسي 7$ / مميز 17$ / إتقان 27$ شهرياً) والبروتوكولات العلاجية الثلاثة — <a href="https://tamkinly.com/products" style="color:#1F6F78;">تصفح المنتجات</a>.</p>' +
    '</div>';
  const enSection =
    '<div dir="ltr" style="text-align:left;border-top:1px solid #E2E8F0;margin-top:22px;padding-top:22px;">' +
    '<h2 style="color:#0F1C2E;font-size:20px;margin:0 0 10px;">Welcome, ' + name + ',</h2>' +
    '<p style="color:#475569;line-height:1.8;margin:0 0 14px;">You have joined Tamkinly — a space to rebuild the human from the inside, without pressure and without self-judgment. Here are your free starting gifts:</p>' +
    codeBox('1) Identity Gap Quiz — a free 3-minute assessment that maps your identity across 6 dimensions') +
    codeBox('2) The Truncated Sentence Technique — a complete therapeutic protocol, free (5 screens + 9-day follow-up)') +
    '<p style="text-align:center;margin:18px 0 6px;">' +
    '<a href="https://tamkinly.com/quiz" style="display:inline-block;background:#1F6F78;color:#ffffff;text-decoration:none;padding:12px 26px;border-radius:10px;font-weight:bold;margin:4px 3px;">Take the free quiz</a>' +
    '<a href="https://tamkinly.com/apps/therapeutic-protocols/truncated-sentence" style="display:inline-block;background:#3DD4B0;color:#0F1C2E;text-decoration:none;padding:12px 26px;border-radius:10px;font-weight:bold;margin:4px 3px;">Claim the free technique</a>' +
    '</p>' +
    '<p style="color:#64748B;font-size:13px;line-height:1.7;">One thoughtful email a week on identity, habits, and recovery. Full catalog: subscriptions (Basic $7 / Premium $17 / Mastery $27 monthly) and three therapeutic protocols — <a href="https://tamkinly.com/products" style="color:#1F6F78;">browse products</a>.</p>' +
    '</div>';
  return (
    '<!DOCTYPE html><html><head><meta charset="UTF-8"></head>' +
    '<body style="margin:0;padding:0;background-color:#F6F8FA;font-family:Segoe UI,Tahoma,Arial,sans-serif;">' +
    '<div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #E2E8F0;">' +
    '<div style="background:linear-gradient(135deg,#0F1C2E 0%,#1F6F78 100%);padding:36px 30px;text-align:center;">' +
    '<h1 style="color:#3DD4B0;margin:0;font-size:26px;">تمكينلي · Tamkinly</h1>' +
    '<p style="color:#ffffff;margin:8px 0 0;font-size:14px;">عُد إلى مركزك · Return to Your Center</p>' +
    '</div>' +
    '<div style="padding:30px;">' + arSection + enSection + '</div>' +
    '<div style="background:#0F1C2E;padding:18px 30px;text-align:center;">' +
    '<p style="color:#8A94A6;font-size:12px;margin:0;">© 2026 Tamkinly — <a href="https://tamkinly.com/privacy" style="color:#3DD4B0;text-decoration:none;">Privacy</a></p>' +
    '</div></div></body></html>'
  );
}

// ============================================
// SEQUENCE 0: WELCOME (NEW_SUBSCRIBER) — added 2026-09-27
// Fires for newsletter subscribers (quiz results / resources / footer /
// homepage) and for new account registrations. One bilingual step, immediate.
// templateName intentionally empty so the queued row sends its own content.
// ============================================
const WELCOME_NEW_SUBSCRIBER_SEQUENCE: DripSequence = {
  id: 'welcome_new_subscriber',
  name: 'Welcome — New Subscriber',
  description: 'Immediate bilingual welcome email with free gifts (Identity Gap Quiz + Truncated Sentence Technique).',
  tier: 'free',
  trigger: 'NEW_SUBSCRIBER',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'Welcome to Tamkinly · مرحباً بك في تمكينلي',
      subjectAr: 'مرحباً بك في تمكينلي · Welcome to Tamkinly',
      preheader: 'Your free identity tools are inside',
      preheaderAr: 'أدواتك الهوياتية المجانية في الداخل',
      templateName: '',
      primaryCta: 'Take the free quiz',
      primaryUrl: '/quiz',
      tags: ['welcome', 'new_subscriber'],
      content: welcomeBilingualHtml('{{name}}'),
    },
  ],
};

export const DRIP_SEQUENCES: DripSequence[] = [
  WELCOME_NEW_SUBSCRIBER_SEQUENCE,
  LEAD_NURTURE_SEQUENCE,
  BASIC_ONBOARDING_SEQUENCE,
  PREMIUM_ONBOARDING_SEQUENCE,
  MASTERY_ONBOARDING_SEQUENCE,
  ABANDONED_CART_1H_SEQUENCE,
  ABANDONED_CART_24H_SEQUENCE,
  RE_ENGAGEMENT_SEQUENCE,
  UPSELL_BASIC_TO_PREMIUM_SEQUENCE,
  UPSELL_PREMIUM_TO_MASTERY_SEQUENCE,
  // Legacy aliases (inactive)
  QUIZ_COMPLETED_SEQUENCE,
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getSequenceByTrigger(trigger: string): DripSequence | undefined {
  return DRIP_SEQUENCES.find((s) => s.trigger === trigger && s.isActive);
}

export function getSequenceById(id: string): DripSequence | undefined {
  return DRIP_SEQUENCES.find((s) => s.id === id);
}

export function getActiveSequences(): DripSequence[] {
  return DRIP_SEQUENCES.filter((s) => s.isActive);
}

export function getSequencesByTier(tier: SequenceTier): DripSequence[] {
  return DRIP_SEQUENCES.filter((s) => s.tier === tier && s.isActive);
}

// ============================================
// TRIGGER MAPPING (legacy → new)
// ============================================

export const TRIGGER_ALIASES: Record<string, string> = {
  // Legacy triggers → new triggers
  'FREE_SUBSCRIBER': 'LEAD_NURTURE',
  'TRIAL_PURCHASE': 'BASIC_ONBOARDING',
  'BASIC_PURCHASE': 'PREMIUM_ONBOARDING', // old BASIC = new PREMIUM
  'PLANNER_PURCHASE': 'PREMIUM_ONBOARDING',
  'PREMIUM_PURCHASE': 'MASTERY_ONBOARDING', // old PREMIUM merged into MASTERY
  'BUNDLE_PURCHASE': 'MASTERY_ONBOARDING',
  'QUIZ_COMPLETED': 'LEAD_NURTURE',
  // New triggers (identity mapping)
  'LEAD_NURTURE': 'LEAD_NURTURE',
  'BASIC_ONBOARDING': 'BASIC_ONBOARDING',
  'PREMIUM_ONBOARDING': 'PREMIUM_ONBOARDING',
  'MASTERY_ONBOARDING': 'MASTERY_ONBOARDING',
  'ABANDONED_CART_1H': 'ABANDONED_CART_1H',
  'ABANDONED_CART_24H': 'ABANDONED_CART_24H',
  'RE_ENGAGEMENT': 'RE_ENGAGEMENT',
  'UPSELL_BASIC_TO_PREMIUM': 'UPSELL_BASIC_TO_PREMIUM',
  'UPSELL_PREMIUM_TO_MASTERY': 'UPSELL_PREMIUM_TO_MASTERY',
};

export function resolveTrigger(trigger: string): string {
  return TRIGGER_ALIASES[trigger] || trigger;
}
