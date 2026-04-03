// ============================================
// TAMKINLY ACCESS CONTROL SYSTEM
// ============================================
// This file defines which apps and features are available
// to customers based on their purchase tier.
// ============================================

// ============================================
// TIER DEFINITIONS - Based on Product Pricing
// ============================================
export const TIERS = {
  FREE: {
    name: 'Free',
    nameAr: 'مجاني',
    price: 0,
    priceDisplay: 'Free',
    description: 'Lead Magnets - Start your journey',
    descriptionAr: 'محتوى مجاني - ابدأ رحلتك',
    duration: null, // Permanent
    codePrefix: null, // No code needed for free
  },
  TRIAL: {
    name: 'Trial',
    nameAr: 'تجريبي',
    price: 7,
    priceDisplay: '$7',
    description: '7-Day Trial - Experience the full system',
    descriptionAr: 'تجربة 7 أيام - جرب النظام الكامل',
    duration: 7, // Days
    codePrefix: 'TMLY-TRIAL',
  },
  PLANNER: {
    name: 'Identity Recode Planner',
    nameAr: 'مخطط إعادة برمجة الهوية',
    price: 17,
    priceDisplay: '$17',
    description: 'Core transformation tools + Recode System',
    descriptionAr: 'أدوات التحول الأساسية + نظام إعادة البرمجة',
    duration: null, // Permanent
    codePrefix: 'TMLY-PLANNER',
  },
  PREMIUM: {
    name: 'Premium Transformation',
    nameAr: 'التحول المميز',
    price: 27,
    priceDisplay: '$27',
    description: 'Full app suite except AI Coach',
    descriptionAr: 'جميع التطبيقات عدا المدرب الذكي',
    duration: null, // Permanent
    codePrefix: 'TMLY-PREMIUM',
  },
  BUNDLE: {
    name: 'Complete Bundle',
    nameAr: 'الحزمة الكاملة',
    price: 47,
    priceDisplay: '$47',
    description: 'Everything included + AI Identity Coach',
    descriptionAr: 'كل شيء مشمول + المدرب الذكي للهوية',
    duration: null, // Permanent
    codePrefix: 'TMLY-BUNDLE',
  },
} as const;

export type TierKey = keyof typeof TIERS;

// ============================================
// APP DEFINITIONS - All Available Apps
// ============================================
export const APPS = {
  // FREE APPS - Available to everyone (Lead Magnets)
  IDENTITY_GAP_QUIZ: {
    slug: 'identity-gap-quiz',
    name: 'Identity Gap Assessment',
    nameAr: 'تقييم فجوة الهوية',
    description: '8-question assessment revealing the gap between who you are and who you want to become',
    descriptionAr: 'تقييم من 8 أسئلة يكشف الفجوة بين من أنت ومن تريد أن تكون',
    category: 'ASSESSMENT',
    minTier: 'FREE',
    isFreeApp: true,
    icon: 'Brain',
    color: '#3DD4B0',
  },
  VALUES_CLARIFICATION: {
    slug: 'values-clarification',
    name: 'Values Clarification Tool',
    nameAr: 'أداة توضيح القيم',
    description: 'Discover your core values and align your life with what matters most',
    descriptionAr: 'اكتشف قيمك الجوهرية واجعل حياتك متناغمة مع ما يهمك',
    category: 'ASSESSMENT',
    minTier: 'FREE',
    isFreeApp: true,
    icon: 'Heart',
    color: '#1F6F78',
  },
  DAILY_REFLECTION: {
    slug: 'daily-reflection',
    name: 'Daily Reflection Practice',
    nameAr: 'ممارسة التأمل اليومي',
    description: 'Daily prompts and journaling for consistent identity growth',
    descriptionAr: 'توجيهات يومية وكتابة يومية لنمو الهوية المستمر',
    category: 'PLANNING',
    minTier: 'FREE',
    isFreeApp: true,
    icon: 'BookOpen',
    color: '#3DD4B0',
  },
  
  // PLANNER APPS - Available from $17+
  WORKSHEETS: {
    slug: 'worksheets',
    name: 'Interactive Worksheets',
    nameAr: 'أوراق العمل التفاعلية',
    description: '6 research-backed worksheets: Who Am I, Identity-Based Habits, Self-Authorship, Identity Baseline 8D, Environmental Audit, ERQ',
    descriptionAr: '6 أوراق عمل مبنية على البحث: من أنا، عادات الهوية، تأليف الذات، خط الأساس 8D، تدقيق البيئة، ERQ',
    category: 'WORKSHEET',
    minTier: 'PLANNER',
    isFreeApp: false,
    icon: 'FileText',
    color: '#1F6F78',
  },
  IDENTITY_RECODE_SYSTEM: {
    slug: 'identity-recode-system',
    name: 'Identity Recode System',
    nameAr: 'نظام إعادة برمجة الهوية',
    description: 'Complete 30-day transformation journey with structured exercises and progress tracking',
    descriptionAr: 'رحلة تحول كاملة لمدة 30 يوم مع تمارين منظمة وتتبع التقدم',
    category: 'PLANNING',
    minTier: 'PLANNER',
    isFreeApp: false,
    icon: 'RefreshCw',
    color: '#3DD4B0',
  },
  
  // PREMIUM APPS - Available from $27+
  HABIT_TRACKER: {
    slug: 'habit-tracker',
    name: 'Identity Habit Tracker',
    nameAr: 'متتبع عادات الهوية',
    description: 'Track identity-based habits with streaks, reminders, and progress insights',
    descriptionAr: 'تتبع عادات الهوية مع السلاسل والتذكيرات ورؤى التقدم',
    category: 'TRACKING',
    minTier: 'PREMIUM',
    isFreeApp: false,
    icon: 'CheckCircle',
    color: '#1F6F78',
  },
  GOAL_SYSTEM: {
    slug: 'goal-system',
    name: 'Identity Goal System',
    nameAr: 'نظام أهداف الهوية',
    description: 'Set and track identity-aligned goals with milestones and progress visualization',
    descriptionAr: 'حدد وتتبع أهداف متناغمة مع هويتك مع المعالم وتصور التقدم',
    category: 'TRACKING',
    minTier: 'PREMIUM',
    isFreeApp: false,
    icon: 'Target',
    color: '#3DD4B0',
  },
  JOURNAL_SYSTEM: {
    slug: 'journal-system',
    name: 'Identity Journal',
    nameAr: 'مفكرة الهوية',
    description: 'Structured journaling with day-specific prompts for your 30-day journey',
    descriptionAr: 'كتابة منظمة مع توجيهات خاصة بكل يوم في رحلتك الـ 30 يوم',
    category: 'PLANNING',
    minTier: 'PREMIUM',
    isFreeApp: false,
    icon: 'BookOpen',
    color: '#1F6F78',
  },
  
  // BUNDLE EXCLUSIVE - Only $47
  AI_IDENTITY_COACH: {
    slug: 'ai-identity-coach',
    name: 'AI Identity Coach',
    nameAr: 'المدرب الذكي للهوية',
    description: '24/7 AI coaching for identity discovery, habit formation, self-authorship, and emotional regulation',
    descriptionAr: 'تدريب ذكي على مدار الساعة لاكتشاف الهوية وتكوين العادات وتأليف الذات وتنظيم المشاعر',
    category: 'COACHING',
    minTier: 'BUNDLE',
    isFreeApp: false,
    icon: 'Bot',
    color: '#3DD4B0',
    isExclusive: true,
  },
} as const;

// ============================================
// ACCESS MATRIX - Which apps each tier can access
// ============================================
export const TIER_ACCESS: Record<TierKey, string[]> = {
  FREE: [
    'identity-gap-quiz',
    'values-clarification', 
    'daily-reflection',
  ],
  TRIAL: [
    // 7-day access to everything (temporary)
    'identity-gap-quiz',
    'values-clarification',
    'daily-reflection',
    'worksheets',
    'identity-recode-system',
    'habit-tracker',
    'goal-system',
    'journal-system',
    // NO AI Coach for trial
  ],
  PLANNER: [
    'identity-gap-quiz',
    'values-clarification',
    'daily-reflection',
    'worksheets',
    'identity-recode-system',
    // NO habit-tracker, goal-system, journal-system, AI coach
  ],
  PREMIUM: [
    'identity-gap-quiz',
    'values-clarification',
    'daily-reflection',
    'worksheets',
    'identity-recode-system',
    'habit-tracker',
    'goal-system',
    'journal-system',
    // NO AI Coach
  ],
  BUNDLE: [
    // EVERYTHING
    'identity-gap-quiz',
    'values-clarification',
    'daily-reflection',
    'worksheets',
    'identity-recode-system',
    'habit-tracker',
    'goal-system',
    'journal-system',
    'ai-identity-coach',
  ],
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if a tier can access a specific app
 */
export function canAccessApp(tier: TierKey, appSlug: string): boolean {
  const allowedApps = TIER_ACCESS[tier] || [];
  return allowedApps.includes(appSlug);
}

/**
 * Get all apps accessible by a tier
 */
export function getAppsForTier(tier: TierKey) {
  const allowedSlugs = TIER_ACCESS[tier] || [];
  return Object.values(APPS).filter(app => allowedSlugs.includes(app.slug));
}

/**
 * Get the minimum tier required for an app
 */
export function getMinTierForApp(appSlug: string): TierKey {
  const app = Object.values(APPS).find(a => a.slug === appSlug);
  return (app?.minTier as TierKey) || 'BUNDLE';
}

/**
 * Get apps that require upgrade from current tier
 */
export function getUpgradeApps(currentTier: TierKey) {
  const tierOrder: TierKey[] = ['FREE', 'TRIAL', 'PLANNER', 'PREMIUM', 'BUNDLE'];
  const currentIndex = tierOrder.indexOf(currentTier);
  
  const upgradeApps: { app: typeof APPS[keyof typeof APPS]; requiredTier: TierKey }[] = [];
  
  Object.values(APPS).forEach(app => {
    if (!canAccessApp(currentTier, app.slug)) {
      upgradeApps.push({
        app,
        requiredTier: app.minTier as TierKey,
      });
    }
  });
  
  return upgradeApps;
}

/**
 * Generate access code based on tier
 */
export function generateAccessCode(tier: TierKey): string {
  const prefix = TIERS[tier].codePrefix;
  if (!prefix) return '';
  
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = [];
  
  for (let i = 0; i < 2; i++) {
    let segment = '';
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  
  return `${prefix}-${segments.join('-')}`;
}

/**
 * Parse access code to get tier
 */
export function parseAccessCode(code: string): TierKey | null {
  if (code.startsWith('TMLY-TRIAL')) return 'TRIAL';
  if (code.startsWith('TMLY-PLANNER')) return 'PLANNER';
  if (code.startsWith('TMLY-PREMIUM')) return 'PREMIUM';
  if (code.startsWith('TMLY-BUNDLE')) return 'BUNDLE';
  return null;
}

// ============================================
// PRODUCT TO TIER MAPPING (for WooCommerce)
// ============================================
export const PRODUCT_TIER_MAP: Record<string, TierKey> = {
  // Product slugs from WooCommerce → Tier
  'identity-recode-planner': 'PLANNER',
  'identity-recode-planner-pdf': 'PLANNER',
  'premium-transformation': 'PREMIUM',
  'premium-transformation-bundle': 'PREMIUM',
  'complete-bundle': 'BUNDLE',
  'transformation-bundle': 'BUNDLE',
  'all-access-pass': 'BUNDLE',
  'trial-access': 'TRIAL',
  '7-day-trial': 'TRIAL',
};

/**
 * Get tier from product slug (for WooCommerce webhook)
 */
export function getTierFromProduct(productSlug: string): TierKey {
  return PRODUCT_TIER_MAP[productSlug] || 'FREE';
}
