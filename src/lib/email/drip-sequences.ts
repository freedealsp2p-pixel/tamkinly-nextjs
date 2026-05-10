// ============================================
// DRIP SEQUENCES - Email Automation Definitions
// Tamkinly Identity Transformation Platform
// ============================================
// Defines all drip sequences with timing, templates, and content
// Used by the email trigger system to queue the right emails
// ============================================

// ============================================
// TYPES
// ============================================

export type SequenceTier = 'free' | 'trial' | 'basic' | 'premium' | 'bundle';

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
// FREE SUBSCRIBER SEQUENCE
// Welcome → Day 3 tips → Day 7 quiz → Day 14 trial offer → Day 21 basic offer
// ============================================

const FREE_SUBSCRIBER_SEQUENCE: DripSequence = {
  id: 'free_subscriber_sequence',
  name: 'Free Subscriber Onboarding',
  description: 'Nurture free subscribers from welcome to first purchase',
  tier: 'free',
  trigger: 'FREE_SUBSCRIBER_SEQUENCE',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'Welcome to Tamkinly! 🎯',
      subjectAr: 'مرحباً بك في تمكنلي! 🎯',
      preheader: 'Your transformation journey starts now',
      preheaderAr: 'رحلة التحول تبدأ الآن',
      templateName: 'welcome',
      primaryCta: 'Explore Our Products',
      primaryUrl: `${BASE_URL}/shop/`,
      tags: ['welcome', 'free', 'onboarding'],
    },
    {
      stepNumber: 2,
      delayHours: 72, // Day 3
      subject: "How's your identity journey? 🌱",
      subjectAr: 'كيف رحلتك؟ 🌱',
      preheader: 'Three days into transformation — key insights inside',
      preheaderAr: 'ثلاثة أيام من التحول - رؤى مهمة بالداخل',
      templateName: 'day3FollowUp',
      primaryCta: 'Continue Your Journey',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['followup', 'day3', 'free'],
    },
    {
      stepNumber: 3,
      delayHours: 96, // Day 7 (4 days after step 2)
      subject: "You're building momentum! 🚀",
      subjectAr: 'أنت تبني الزخم! 🚀',
      preheader: 'One full week of transformation — see your progress',
      preheaderAr: 'أسبوع كامل من التحول - شاهد تقدمك',
      templateName: 'day7FollowUp',
      primaryCta: 'Take the Free Quiz',
      primaryUrl: `${BASE_URL}/apps/identity-gap`,
      tags: ['followup', 'day7', 'quiz', 'free'],
    },
    {
      stepNumber: 4,
      delayHours: 168, // Day 14 (7 days after step 3)
      subject: 'Ready to go deeper? Try the 7-Day System ⬆️',
      subjectAr: 'مستعد للعمق أكثر؟ جرّب نظام الـ 7 أيام ⬆️',
      preheader: 'Special trial offer for active subscribers',
      preheaderAr: 'عرض تجريبي خاص للمشتركين النشطين',
      templateName: 'day14FollowUp',
      primaryCta: 'Start Your Trial - $9',
      primaryUrl: `${BASE_URL}/shop/trial`,
      tags: ['offer', 'day14', 'trial', 'upsell'],
    },
    {
      stepNumber: 5,
      delayHours: 168, // Day 21 (7 days after step 4)
      subject: 'Your identity deserves the full planner 📋',
      subjectAr: 'هويتك تستحق المخطط الكامل 📋',
      preheader: 'Unlock the complete Identity Recode Planner',
      preheaderAr: 'افتح مخطط إعادة صياغة الهوية الكامل',
      templateName: 'day14FollowUp',
      primaryCta: 'Get the Planner - $27',
      primaryUrl: `${BASE_URL}/shop/planner`,
      tags: ['offer', 'day21', 'basic', 'upsell'],
    },
  ],
};

// ============================================
// TRIAL SEQUENCE
// Purchase confirm → Day 2 welcome → Day 5 tips → Day 7 trial ending → Day 10 upgrade
// ============================================

const TRIAL_SEQUENCE: DripSequence = {
  id: 'trial_sequence',
  name: 'Trial Customer Journey',
  description: 'Guide trial users through their 7-day experience and convert to paid',
  tier: 'trial',
  trigger: 'TRIAL_SEQUENCE',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'Your 7-Day Identity System is Ready! 🎯',
      subjectAr: 'نظام الهوية لمدة 7 أيام جاهز! 🎯',
      preheader: 'Access key and downloads inside',
      preheaderAr: 'مفتاح الوصول والتنزيلات بالداخل',
      templateName: 'purchaseConfirmation',
      primaryCta: 'Access Your Apps Now',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['purchase', 'trial', 'confirmation'],
    },
    {
      stepNumber: 2,
      delayHours: 48, // Day 2
      subject: 'Welcome to your transformation! Day 2 tips inside 🌟',
      subjectAr: 'مرحباً بتحولك! نصائح اليوم الثاني بالداخل 🌟',
      preheader: 'Getting the most from your 7-Day System',
      preheaderAr: 'كيف تحصل على أقصى استفادة من نظام الـ 7 أيام',
      templateName: 'day3FollowUp',
      primaryCta: 'Open Your Apps',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['onboarding', 'day2', 'trial'],
    },
    {
      stepNumber: 3,
      delayHours: 72, // Day 5 (3 days after step 2)
      subject: 'Day 5: Your identity is shifting! 💪',
      subjectAr: 'اليوم 5: هويتك تتغير! 💪',
      preheader: 'Keep the momentum going with these tips',
      preheaderAr: 'حافظ على الزخم بهذه النصائح',
      templateName: 'day7FollowUp',
      primaryCta: 'Continue Your Journey',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['followup', 'day5', 'trial'],
    },
    {
      stepNumber: 4,
      delayHours: 48, // Day 7 (2 days after step 3)
      subject: 'Your trial ends tomorrow — here\'s what\'s next ⏰',
      subjectAr: 'تنتهي فترتك التجريبية غداً - إليك ما يلي ⏰',
      preheader: 'Don\'t lose your progress — upgrade today',
      preheaderAr: 'لا تفقد تقدمك - ارتقِ اليوم',
      templateName: 'day14FollowUp',
      primaryCta: 'Upgrade to Basic - $27',
      primaryUrl: `${BASE_URL}/shop/planner`,
      tags: ['trial_ending', 'day7', 'upgrade', 'trial'],
    },
    {
      stepNumber: 5,
      delayHours: 72, // Day 10 (3 days after step 4)
      subject: 'Don\'t let your transformation fade 🌱',
      subjectAr: 'لا تدع تحولك يتلاشى 🌱',
      preheader: 'Your trial has ended — continue with the full planner',
      preheaderAr: 'انتهت فترتك التجريبية - تابع مع المخطط الكامل',
      templateName: 'reEngagement',
      primaryCta: 'Get the Full Planner',
      primaryUrl: `${BASE_URL}/shop/planner`,
      tags: ['post_trial', 'day10', 'upgrade', 'trial'],
    },
  ],
};

// ============================================
// BASIC SEQUENCE
// Purchase confirm → Day 2 welcome → Day 7 tips → Day 14 premium offer
// ============================================

const BASIC_SEQUENCE: DripSequence = {
  id: 'basic_sequence',
  name: 'Basic Customer Journey',
  description: 'Onboard basic customers and upsell to premium',
  tier: 'basic',
  trigger: 'BASIC_SEQUENCE',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'Your Identity Recode Planner is Ready! 📋',
      subjectAr: 'مخطط إعادة صياغة الهوية جاهز! 📋',
      preheader: 'Downloads and access key inside',
      preheaderAr: 'التنزيلات ومفتاح الوصول بالداخل',
      templateName: 'purchaseConfirmation',
      primaryCta: 'Access Your Apps Now',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['purchase', 'basic', 'confirmation'],
    },
    {
      stepNumber: 2,
      delayHours: 48, // Day 2
      subject: 'Day 2: Start with your Identity Gap Assessment 🎯',
      subjectAr: 'اليوم 2: ابدأ بتقييم فجوة الهوية 🎯',
      preheader: 'The best first step in your planner',
      preheaderAr: 'أفضل خطوة أولى في مخططك',
      templateName: 'day3FollowUp',
      primaryCta: 'Take the Assessment',
      primaryUrl: `${BASE_URL}/apps/identity-gap`,
      tags: ['onboarding', 'day2', 'basic'],
    },
    {
      stepNumber: 3,
      delayHours: 120, // Day 7 (5 days after step 2)
      subject: "You're building momentum! Week 1 insights 🚀",
      subjectAr: 'أنت تبني الزخم! رؤى الأسبوع الأول 🚀',
      preheader: 'See how far you\'ve come in just 7 days',
      preheaderAr: 'شاهد كم تقدمت في 7 أيام فقط',
      templateName: 'day7FollowUp',
      primaryCta: 'View Your Progress',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['followup', 'day7', 'basic'],
    },
    {
      stepNumber: 4,
      delayHours: 168, // Day 14 (7 days after step 3)
      subject: 'Ready for the next level? Premium awaits ⬆️',
      subjectAr: 'مستعد للمستوى التالي؟ الباقة المتقدمة بانتظارك ⬆️',
      preheader: 'Unlock advanced analytics and decision tracking',
      preheaderAr: 'افتح التحليلات المتقدمة وتتبع القرارات',
      templateName: 'day14FollowUp',
      primaryCta: 'Upgrade to Premium - $47',
      primaryUrl: `${BASE_URL}/shop/premium`,
      tags: ['offer', 'day14', 'premium', 'upsell'],
    },
  ],
};

// ============================================
// PREMIUM SEQUENCE
// Purchase confirm → Day 2 welcome → Day 7 tips → Day 14 bundle offer
// ============================================

const PREMIUM_SEQUENCE: DripSequence = {
  id: 'premium_sequence',
  name: 'Premium Customer Journey',
  description: 'Onboard premium customers and upsell to bundle',
  tier: 'premium',
  trigger: 'PREMIUM_SEQUENCE',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'Your Premium Transformation Package is Ready! 🌟',
      subjectAr: 'باقة التحول المتقدمة جاهزة! 🌟',
      preheader: 'Full access to advanced tools and analytics',
      preheaderAr: 'وصول كامل للأدوات والتحليلات المتقدمة',
      templateName: 'purchaseConfirmation',
      primaryCta: 'Access Your Apps Now',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['purchase', 'premium', 'confirmation'],
    },
    {
      stepNumber: 2,
      delayHours: 48, // Day 2
      subject: 'Day 2: Dive into Decision Pattern Analysis 🔬',
      subjectAr: 'اليوم 2: انغمس في تحليل أنماط القرارات 🔬',
      preheader: 'Your premium tools are waiting',
      preheaderAr: 'أدواتك المتقدمة بانتظارك',
      templateName: 'day3FollowUp',
      primaryCta: 'Start Decision Analysis',
      primaryUrl: `${BASE_URL}/apps/decision-analysis`,
      tags: ['onboarding', 'day2', 'premium'],
    },
    {
      stepNumber: 3,
      delayHours: 120, // Day 7
      subject: "Week 1: You're uncovering powerful patterns! 🎯",
      subjectAr: 'الأسبوع 1: أنت تكشف أنماطاً قوية! 🎯',
      preheader: 'Your premium analytics show real progress',
      preheaderAr: 'تحليلاتك المتقدمة تُظهر تقدماً حقيقياً',
      templateName: 'day7FollowUp',
      primaryCta: 'View Your Dashboard',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['followup', 'day7', 'premium'],
    },
    {
      stepNumber: 4,
      delayHours: 168, // Day 14
      subject: 'Complete your transformation with the Bundle 👑',
      subjectAr: 'أكمل تحولك مع الباقة الشاملة 👑',
      preheader: 'Add AI coaching and community support',
      preheaderAr: 'أضف التدريب بالذكاء الاصطناعي ودعم المجتمع',
      templateName: 'day14FollowUp',
      primaryCta: 'Upgrade to Bundle - $67',
      primaryUrl: `${BASE_URL}/shop/bundle`,
      tags: ['offer', 'day14', 'bundle', 'upsell'],
    },
  ],
};

// ============================================
// BUNDLE SEQUENCE
// Purchase confirm → Day 2 VIP welcome → Day 7 coach tips → Day 14 community highlight
// ============================================

const BUNDLE_SEQUENCE: DripSequence = {
  id: 'bundle_sequence',
  name: 'Bundle VIP Journey',
  description: 'VIP onboarding with coaching and community engagement',
  tier: 'bundle',
  trigger: 'BUNDLE_SEQUENCE',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'Welcome to VIP! Your Complete Bundle is Ready! 👑',
      subjectAr: 'مرحباً بك في VIP! باقتك الشاملة جاهزة! 👑',
      preheader: 'Full access to everything Tamkinly offers',
      preheaderAr: 'وصول كامل لكل ما يقدمه تمكنلي',
      templateName: 'purchaseConfirmation',
      primaryCta: 'Access Your VIP Apps Now',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['purchase', 'bundle', 'vip', 'confirmation'],
    },
    {
      stepNumber: 2,
      delayHours: 48, // Day 2
      subject: 'VIP Day 2: Meet your AI Identity Coach 🤖',
      subjectAr: 'اليوم 2 VIP: تعرف على مدرب هويتك بالذكاء الاصطناعي 🤖',
      preheader: 'Your personal transformation coach is ready',
      preheaderAr: 'مدرب التحول الشخصي جاهز',
      templateName: 'day3FollowUp',
      primaryCta: 'Start Coaching Session',
      primaryUrl: `${BASE_URL}/apps/ai-coach`,
      tags: ['onboarding', 'day2', 'bundle', 'vip'],
    },
    {
      stepNumber: 3,
      delayHours: 120, // Day 7
      subject: 'VIP Week 1: Coach tips for deeper transformation 💎',
      subjectAr: 'الأسبوع 1 VIP: نصائح المدرب لتحول أعمق 💎',
      preheader: 'Exclusive coaching insights for VIP members',
      preheaderAr: 'رؤى تدريب حصرية لأعضاء VIP',
      templateName: 'day7FollowUp',
      primaryCta: 'Get Coach Recommendations',
      primaryUrl: `${BASE_URL}/apps/ai-coach`,
      tags: ['followup', 'day7', 'bundle', 'vip', 'coaching'],
    },
    {
      stepNumber: 4,
      delayHours: 168, // Day 14
      subject: 'VIP Spotlight: Community highlights & your progress 🌟',
      subjectAr: 'أضواء VIP: أبرز المجتمع وتقدمك 🌟',
      preheader: 'See how fellow VIPs are transforming',
      preheaderAr: 'شاهد كيف يتحول زملاؤك في VIP',
      templateName: 'day7FollowUp',
      primaryCta: 'Join the Community',
      primaryUrl: `${BASE_URL}/community/`,
      tags: ['followup', 'day14', 'bundle', 'vip', 'community'],
    },
  ],
};

// ============================================
// QUIZ COMPLETED SEQUENCE
// ============================================

const QUIZ_COMPLETED_SEQUENCE: DripSequence = {
  id: 'quiz_completed_sequence',
  name: 'Quiz Results Follow-up',
  description: 'Follow up after quiz completion with results and recommendations',
  tier: 'free',
  trigger: 'QUIZ_COMPLETED',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'Your Assessment Results Are In! 📊',
      subjectAr: 'نتائج تقييمك جاهزة! 📊',
      preheader: 'See your identity score and personalized insights',
      preheaderAr: 'شاهد درجة هويتك والرؤى المخصصة',
      templateName: 'quizResults',
      primaryCta: 'Start Working on Your Results',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['quiz', 'results', 'immediate'],
    },
    {
      stepNumber: 2,
      delayHours: 48, // 2 days later
      subject: 'Based on your results, we recommend... 💡',
      subjectAr: 'بناءً على نتائجك، نوصي بـ... 💡',
      preheader: 'Personalized recommendations for your journey',
      preheaderAr: 'توصيات مخصصة لرحلتك',
      templateName: 'day3FollowUp',
      primaryCta: 'See Recommendations',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['quiz', 'followup', 'recommendation'],
    },
    {
      stepNumber: 3,
      delayHours: 120, // 5 days later
      subject: 'Ready to take the next step? 🚀',
      subjectAr: 'مستعد للخطوة التالية؟ 🚀',
      preheader: 'Your quiz results pointed to a clear path forward',
      preheaderAr: 'نتائج تقييمك أشارت إلى مسار واضح',
      templateName: 'day14FollowUp',
      primaryCta: 'Explore Products',
      primaryUrl: `${BASE_URL}/shop/`,
      tags: ['quiz', 'upsell', 'offer'],
    },
  ],
};

// ============================================
// ABANDONED CART SEQUENCES
// ============================================

const ABANDONED_CART_1H_SEQUENCE: DripSequence = {
  id: 'abandoned_cart_1h_sequence',
  name: 'Abandoned Cart - 1 Hour',
  description: 'Gentle reminder 1 hour after cart abandonment',
  tier: 'free',
  trigger: 'ABANDONED_CART_1H',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: "You're Almost There! 🛒",
      subjectAr: 'منتظرك! 🛒',
      preheader: 'Your transformation is one step away',
      preheaderAr: 'رحلتك على بعد خطوة واحدة',
      templateName: 'abandonedCart1h',
      primaryCta: 'Complete Your Purchase',
      primaryUrl: `${BASE_URL}/checkout/`,
      tags: ['abandoned_cart', '1h', 'gentle'],
    },
  ],
};

const ABANDONED_CART_24H_SEQUENCE: DripSequence = {
  id: 'abandoned_cart_24h_sequence',
  name: 'Abandoned Cart - 24 Hours',
  description: 'Incentivized reminder 24 hours after cart abandonment',
  tier: 'free',
  trigger: 'ABANDONED_CART_24H',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: "Don't Put Your Transformation on Hold 💫",
      subjectAr: 'لا تؤجل تحولك 💫',
      preheader: 'Special bonus offer inside',
      preheaderAr: 'عرض مكافأة خاص بالداخل',
      templateName: 'abandonedCart24h',
      primaryCta: 'Complete Purchase & Claim Bonus',
      primaryUrl: `${BASE_URL}/checkout/`,
      tags: ['abandoned_cart', '24h', 'incentive'],
    },
  ],
};

// ============================================
// IDENTITY MILESTONE SEQUENCES
// ============================================

const IDENTITY_MILESTONE_SEQUENCES: DripSequence[] = [
  {
    id: 'identity_milestone_7',
    name: 'Identity Milestone - Day 7',
    description: 'Celebrate week 1 completion and encourage continuation',
    tier: 'trial',
    trigger: 'IDENTITY_MILESTONE_7',
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        delayHours: 0,
        subject: 'Week 1 Complete! 🌟',
        subjectAr: 'الأسبوع الأول مكتمل! 🌟',
        preheader: "You've built your foundation",
        preheaderAr: 'لقد بنيت أساسك',
        templateName: 'identityMilestone',
        primaryCta: 'View Your Progress',
        primaryUrl: `${BASE_URL}/apps/`,
        tags: ['milestone', 'day7', 'celebration'],
      },
    ],
  },
  {
    id: 'identity_milestone_14',
    name: 'Identity Milestone - Day 14',
    description: 'Mid-point celebration with upgrade nudge',
    tier: 'basic',
    trigger: 'IDENTITY_MILESTONE_14',
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        delayHours: 0,
        subject: 'Two Weeks Strong! 💪',
        subjectAr: 'أسبوعان بقوة! 💪',
        preheader: "You're in the active recoding phase",
        preheaderAr: 'أنت في مرحلة إعادة البرمجة الفعالة',
        templateName: 'identityMilestone',
        primaryCta: 'View Your Progress',
        primaryUrl: `${BASE_URL}/apps/`,
        tags: ['milestone', 'day14', 'celebration'],
      },
    ],
  },
  {
    id: 'identity_milestone_21',
    name: 'Identity Milestone - Day 21',
    description: 'The turning point - habits becoming automatic',
    tier: 'basic',
    trigger: 'IDENTITY_MILESTONE_21',
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        delayHours: 0,
        subject: 'Three Weeks In! 🔥',
        subjectAr: 'ثلاثة أسابيع! 🔥',
        preheader: 'The turning point',
        preheaderAr: 'نقطة التحول',
        templateName: 'identityMilestone',
        primaryCta: 'View Your Progress',
        primaryUrl: `${BASE_URL}/apps/`,
        tags: ['milestone', 'day21', 'turning_point'],
      },
    ],
  },
  {
    id: 'identity_milestone_30',
    name: 'Identity Milestone - Day 30',
    description: 'Journey completion celebration and next steps',
    tier: 'basic',
    trigger: 'IDENTITY_MILESTONE_30',
    isActive: true,
    steps: [
      {
        stepNumber: 1,
        delayHours: 0,
        subject: '30 Days! You Did It! 🏆',
        subjectAr: '30 يوماً! لقد فعلتها! 🏆',
        preheader: 'Transformation complete — what\'s next?',
        preheaderAr: 'التحول مكتمل - ما التالي؟',
        templateName: 'identityMilestone',
        primaryCta: 'View Your Final Results',
        primaryUrl: `${BASE_URL}/apps/`,
        tags: ['milestone', 'day30', 'completion', 'celebration'],
      },
    ],
  },
];

// ============================================
// RE-ENGAGEMENT SEQUENCE
// ============================================

const RE_ENGAGEMENT_SEQUENCE: DripSequence = {
  id: 're_engagement_sequence',
  name: 'Re-Engagement (Inactive 7+ Days)',
  description: 'Win back inactive users with gentle reminders and offers',
  tier: 'free',
  trigger: 'RE_ENGAGEMENT',
  isActive: true,
  steps: [
    {
      stepNumber: 1,
      delayHours: 0,
      subject: 'We Miss You! 💙',
      subjectAr: 'نفتقدك! 💙',
      preheader: 'Your journey still matters',
      preheaderAr: 'رحلتك لا تزال مهمة',
      templateName: 'reEngagement',
      primaryCta: 'Return to Your Journey',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['re_engagement', 'winback', 'gentle'],
    },
    {
      stepNumber: 2,
      delayHours: 72, // 3 days later
      subject: 'Your progress is still waiting for you 🌱',
      subjectAr: 'تقدمك لا يزال بانتظارك 🌱',
      preheader: '3 easy steps to get back on track',
      preheaderAr: '3 خطوات سهلة للعودة للمسار',
      templateName: 'reEngagement',
      primaryCta: 'Quick Start',
      primaryUrl: `${BASE_URL}/apps/`,
      tags: ['re_engagement', 'winback', 'followup'],
    },
    {
      stepNumber: 3,
      delayHours: 168, // 7 days later
      subject: 'Last chance: Special offer to continue your journey 🎁',
      subjectAr: 'فرصة أخيرة: عرض خاص لمواصلة رحلتك 🎁',
      preheader: 'Exclusive discount to come back',
      preheaderAr: 'خصم حصري للعودة',
      templateName: 'day14FollowUp',
      primaryCta: 'Claim Your Offer',
      primaryUrl: `${BASE_URL}/shop/`,
      tags: ['re_engagement', 'winback', 'offer', 'final'],
    },
  ],
};

// ============================================
// SEQUENCE REGISTRY
// ============================================

/**
 * All available drip sequences
 */
export const ALL_SEQUENCES: DripSequence[] = [
  FREE_SUBSCRIBER_SEQUENCE,
  TRIAL_SEQUENCE,
  BASIC_SEQUENCE,
  PREMIUM_SEQUENCE,
  BUNDLE_SEQUENCE,
  QUIZ_COMPLETED_SEQUENCE,
  ABANDONED_CART_1H_SEQUENCE,
  ABANDONED_CART_24H_SEQUENCE,
  ...IDENTITY_MILESTONE_SEQUENCES,
  RE_ENGAGEMENT_SEQUENCE,
];

/**
 * Get a sequence by its trigger name
 */
export function getSequenceByTrigger(trigger: string): DripSequence | undefined {
  return ALL_SEQUENCES.find(s => s.trigger === trigger);
}

/**
 * Get a sequence by its ID
 */
export function getSequenceById(id: string): DripSequence | undefined {
  return ALL_SEQUENCES.find(s => s.id === id);
}

/**
 * Get all sequences for a specific tier
 */
export function getSequencesByTier(tier: SequenceTier): DripSequence[] {
  return ALL_SEQUENCES.filter(s => s.tier === tier);
}

/**
 * Get all active sequences
 */
export function getActiveSequences(): DripSequence[] {
  return ALL_SEQUENCES.filter(s => s.isActive);
}

/**
 * Get a summary of all sequences (for admin/debugging)
 */
export function getSequencesSummary(): Array<{
  id: string;
  name: string;
  tier: string;
  trigger: string;
  stepsCount: number;
  totalDurationHours: number;
  isActive: boolean;
}> {
  return ALL_SEQUENCES.map(s => ({
    id: s.id,
    name: s.name,
    tier: s.tier,
    trigger: s.trigger,
    stepsCount: s.steps.length,
    totalDurationHours: s.steps.reduce((sum, step) => sum + step.delayHours, 0),
    isActive: s.isActive,
  }));
}

// ============================================
// EXPORT DEFAULT
// ============================================

const DripSequences = {
  ALL_SEQUENCES,
  getSequenceByTrigger,
  getSequenceById,
  getSequencesByTier,
  getActiveSequences,
  getSequencesSummary,
  // Individual sequences for direct import
  FREE_SUBSCRIBER_SEQUENCE,
  TRIAL_SEQUENCE,
  BASIC_SEQUENCE,
  PREMIUM_SEQUENCE,
  BUNDLE_SEQUENCE,
  QUIZ_COMPLETED_SEQUENCE,
  ABANDONED_CART_1H_SEQUENCE,
  ABANDONED_CART_24H_SEQUENCE,
  IDENTITY_MILESTONE_SEQUENCES,
  RE_ENGAGEMENT_SEQUENCE,
};

export default DripSequences;
