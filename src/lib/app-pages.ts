/**
 * App Pages Data Configuration
 * Centralized metadata for all app pages
 * Enables unique SEO for each app
 */

import type { Metadata } from 'next';

// ============================================
// TYPES
// ============================================

export interface AppPage {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  tier: 'FREE' | 'BASIC' | 'PREMIUM' | 'BUNDLE';
  category: string;
  categoryAr: string;
  keywords: string[];
  image?: string;
}

// ============================================
// ALL APP PAGES
// ============================================

export const APP_PAGES: AppPage[] = [
  {
    slug: 'identity-gap-quiz',
    title: 'Identity Gap Quiz | Free 3-Minute Assessment',
    titleAr: 'اختبار فجوة الهوية | تقييم مجاني في 3 دقائق',
    description: 'Discover the gap between who you are and who you want to become. Free research-backed assessment with instant personalized results.',
    descriptionAr: 'اكتشف الفجوة بين من أنت ومن تريد أن تصبح. تقييم مجاني مبني على الأبحاث مع نتائج شخصية فورية.',
    tier: 'FREE',
    category: 'Assessment',
    categoryAr: 'التقييم',
    keywords: ['identity gap quiz', 'free assessment', 'self-discovery', 'identity test', 'personal growth assessment'],
  },
  {
    slug: 'values-clarification',
    title: 'Values Clarification Tool | Discover Your Core Values',
    titleAr: 'أداة توضيح القيم | اكتشف قيمك الأساسية',
    description: 'Scientific method to identify and clarify your core values. Based on ACT and positive psychology research. Free tool.',
    descriptionAr: 'طريقة علمية لتحديد وتوضيح قيمك الأساسية. مبنية على أبحاث ACT وعلم النفس الإيجابي. أداة مجانية.',
    tier: 'FREE',
    category: 'Self-Discovery',
    categoryAr: 'الاكتشاف الذاتي',
    keywords: ['values clarification', 'core values', 'ACT therapy', 'values exercise', 'personal values'],
  },
  {
    slug: 'daily-reflection',
    title: 'Daily Reflection Practice | Evidence-Based Journaling',
    titleAr: 'ممارسة التأمل اليومي | كتابة يومية مبنية على الأدلة',
    description: 'Transform your identity through daily reflection. 7 themes with research-backed prompts that rewire neural pathways.',
    descriptionAr: 'حوّل هويتك من خلال التأمل اليومي. 7 مواضيع مع مطالبات مبنية على الأبحاث تعيد تشكيل المسارات العصبية.',
    tier: 'FREE',
    category: 'Journaling',
    categoryAr: 'الكتابة اليومية',
    keywords: ['daily reflection', 'journaling prompts', 'daily journal', 'reflection practice', 'mindfulness journaling'],
  },
  {
    slug: 'habit-tracker',
    title: 'Habit Tracker | Build Identity-Based Habits',
    titleAr: 'متتبع العادات | ابنِ عادات مبنية على الهوية',
    description: 'Track habits that align with your desired identity. Visual progress tracking and streak motivation. Free tool.',
    descriptionAr: 'تتبع العادات المتوافقة مع هويتك المستهدفة. تتبع مرئي للتقدم وتحفيز الاستمرارية. أداة مجانية.',
    tier: 'FREE',
    category: 'Productivity',
    categoryAr: 'الإنتاجية',
    keywords: ['identity-aligned habits', 'daily consistency', 'habit architecture', 'streak tracking', 'identity-based habits'],
  },
  {
    slug: 'goal-system',
    title: 'Goal System | Identity-Aligned Goal Setting',
    titleAr: 'نظام الأهداف | تحديد أهداف متوافقة مع الهوية',
    description: 'Set goals that match who you want to become. Break down aspirations into actionable steps with progress tracking.',
    descriptionAr: 'حدد أهدافاً تتوافق مع من تريد أن تصبح. قسّم تطلعاتك إلى خطوات عملية مع تتبع التقدم.',
    tier: 'FREE',
    category: 'Planning',
    categoryAr: 'التخطيط',
    keywords: ['goal setting', 'goal system', 'achievement planning', 'goal tracker', 'smart goals'],
  },
  {
    slug: 'identity-baseline',
    title: 'Identity Baseline Worksheet | Self-Concept Assessment',
    titleAr: 'ورقة عمل خط الأساس للهوية | تقييم المفهوم الذاتي',
    description: 'Measure your current self-concept clarity across 8 dimensions. Research-backed baseline for transformation tracking.',
    descriptionAr: 'قِس وضوح مفهومك الذاتي الحالي عبر 8 أبعاد. خط أساس مبني على الأبحاث لتتبع التحول.',
    tier: 'BASIC',
    category: 'Assessment',
    categoryAr: 'التقييم',
    keywords: ['identity baseline', 'self-concept', 'identity worksheet', 'baseline assessment', 'self-assessment'],
  },
  {
    slug: 'identity-recode-system',
    title: 'Identity Recode System | 30-Day Transformation Program',
    titleAr: 'نظام إعادة صياغة الهوية | برنامج تحول لمدة 30 يوماً',
    description: 'Complete identity transformation system with 6 interconnected components. Structured 30-day program with worksheets and trackers.',
    descriptionAr: 'نظام تحول هوية كامل مع 6 مكونات مترابطة. برنامج منظم لمدة 30 يوماً مع أوراق عمل وأدوات تتبع.',
    tier: 'BASIC',
    category: 'Transformation',
    categoryAr: 'التحول',
    keywords: ['identity recode', 'transformation program', '30-day challenge', 'identity change', 'personal transformation'],
  },
  {
    slug: 'environmental-audit',
    title: 'Environmental Audit | Design Your Growth Space',
    titleAr: 'التدقيق البيئي | صمّم مساحة نموك',
    description: 'Audit your physical, social, and digital environments. Align your surroundings with your transformation goals.',
    descriptionAr: 'دقّق بيئاتك المادية والاجتماعية والرقمية. وائم محيطك مع أهداف تحولك.',
    tier: 'BASIC',
    category: 'Environment',
    categoryAr: 'البيئة',
    keywords: ['environmental audit', 'environment design', 'growth environment', 'space optimization', 'environmental psychology'],
  },
  {
    slug: 'emotion-regulation',
    title: 'ERQ Emotion Regulation | Master Your Inner World',
    titleAr: 'التنظيم العاطفي ERQ | أتقن عالمك الداخلي',
    description: 'Based on Gross & John\'s ERQ research. Learn cognitive reappraisal vs. suppression for emotional intelligence.',
    descriptionAr: 'مبني على أبحاث Gross & John في ERQ. تعلم إعادة التقييم المعرفي مقابل الكبت للذكاء العاطفي.',
    tier: 'BASIC',
    category: 'Mental Health',
    categoryAr: 'الصحة النفسية',
    keywords: ['emotion regulation', 'ERQ', 'emotional intelligence', 'cognitive reappraisal', 'emotional control'],
  },
  {
    slug: 'decision-analysis',
    title: 'Decision Pattern Analysis | Better Choices Framework',
    titleAr: 'تحليل أنماط القرارات | إطار اختيارات أفضل',
    description: 'Analyze your decision-making patterns and identify cognitive biases. Make better choices aligned with your identity.',
    descriptionAr: 'حلّل أنماط اتخاذ قراراتك وحدد التحيزات المعرفية. اتخذ اختيارات أفضل متوافقة مع هويتك.',
    tier: 'BASIC',
    category: 'Decision Making',
    categoryAr: 'اتخاذ القرارات',
    keywords: ['decision analysis', 'decision making', 'cognitive biases', 'choice architecture', 'better decisions'],
  },
  {
    slug: 'evidence-tracking',
    title: 'Evidence Tracking System | Document Your Transformation',
    titleAr: 'نظام تتبع الأدلة | وثّق تحولك',
    description: 'Track evidence of your new identity. Capture moments that prove who you\'re becoming with this structured system.',
    descriptionAr: 'تتبع أدلة هويتك الجديدة. التقط اللحظات التي تثبت من تصبح بهذا النظام المنظم.',
    tier: 'BASIC',
    category: 'Progress Tracking',
    categoryAr: 'تتبع التقدم',
    keywords: ['evidence tracking', 'transformation evidence', 'progress documentation', 'identity proof', 'change tracking'],
  },
  {
    slug: 'daily-planner',
    title: 'Daily Planner | Identity-Based Time Management',
    titleAr: 'المخطط اليومي | إدارة الوقت المبنية على الهوية',
    description: 'Plan your day around who you want to become. Time blocking and priority setting aligned with your identity.',
    descriptionAr: 'خطط ليومك حول من تريد أن تصبح. تقسيم الوقت وتحديد الأولويات المتوافقة مع هويتك.',
    tier: 'BASIC',
    category: 'Planning',
    categoryAr: 'التخطيط',
    keywords: ['daily planner', 'time management', 'daily planning', 'time blocking', 'productivity planner'],
  },
  {
    slug: 'journal-system',
    title: 'Journal System | Structured Self-Reflection',
    titleAr: 'نظام الكتابة اليومية | التأمل الذاتي المنظم',
    description: 'Complete journaling system with templates for identity work, habit tracking, and transformation documentation.',
    descriptionAr: 'نظام كتابة يومية كامل مع قوالب لعمل الهوية وتتبع العادات وتوثيق التحول.',
    tier: 'BASIC',
    category: 'Journaling',
    categoryAr: 'الكتابة اليومية',
    keywords: ['journal system', 'journaling templates', 'self-reflection', 'identity journal', 'structured journaling'],
  },
  {
    slug: 'worksheets',
    title: 'Worksheets Library | Transformation Tools Collection',
    titleAr: 'مكتبة أوراق العمل | مجموعة أدوات التحول',
    description: 'Access all Tamkinly worksheets in one place. Identity exploration, habit building, and transformation exercises.',
    descriptionAr: 'الوصول إلى جميع أوراق عمل تمكينلي في مكان واحد. استكشاف الهوية وبناء العادات وتمارين التحول.',
    tier: 'BASIC',
    category: 'Worksheets',
    categoryAr: 'أوراق العمل',
    keywords: ['worksheets', 'transformation tools', 'self-improvement worksheets', 'identity exercises', 'personal development'],
  },
  {
    slug: 'ai-identity-coach',
    title: 'AI Identity Coach | Coming Soon',
    titleAr: 'مدرب الهوية بالذكاء الاصطناعي | دليل تحول شخصي على مدار الساعة',
    description: 'The Tamkinly AI Identity Coach is coming Q3 2026. Built on neuroplasticity and self-authorship. Join the waitlist for early access.',
    descriptionAr: 'تدريب مدعوم بالذكاء الاصطناعي لتحويل الهوية. إرشاد شخصي للاكتشاف والعادات والتنظيم العاطفي.',
    tier: 'BUNDLE',
    category: 'AI Coaching',
    categoryAr: 'التدريب بالذكاء الاصطناعي',
    keywords: ['AI coach', 'artificial intelligence coaching', 'identity coach', 'AI therapy', 'personal AI guide'],
  },
  {
    slug: 'progress-dashboard',
    title: 'Progress Dashboard | Unified Transformation Tracker',
    titleAr: 'لوحة تتبع التقدم | متتبع تحول موحد',
    description: 'Track your progress across all Tamkinly apps. Unified view of identity score, achievements, and transformation journey.',
    descriptionAr: 'تتبع تقدمك عبر جميع تطبيقات تمكينلي. عرض موحد لدرجة الهوية والإنجازات ورحلة التحول.',
    tier: 'BUNDLE',
    category: 'Dashboard',
    categoryAr: 'لوحة المتابعة',
    keywords: ['progress dashboard', 'transformation tracker', 'identity score', 'achievement tracking', 'progress monitoring'],
  },
  {
    slug: 'executive-manual',
    title: 'Executive Manual | Complete Transformation Guide',
    titleAr: 'الدليل التنفيذي | دليل التحول الكامل',
    description: 'Comprehensive guide for identity transformation. Step-by-step instructions for using all Tamkinly tools effectively.',
    descriptionAr: 'دليل شامل لتحويل الهوية. تعليمات خطوة بخطوة لاستخدام جميع أدوات تمكينلي بفعالية.',
    tier: 'BUNDLE',
    category: 'Guide',
    categoryAr: 'الدليل',
    keywords: ['executive manual', 'transformation guide', 'user guide', 'complete manual', 'transformation instructions'],
  },
  {
    slug: 'community-access',
    title: 'Community Access | Connect with Transformation Seekers',
    titleAr: 'الوصول للمجتمع | تواصل مع باحثي التحول',
    description: 'Join a community of people on their transformation journey. Share experiences, get support, and celebrate wins.',
    descriptionAr: 'انضم لمجتمع من الأشخاص في رحلة تحولهم. شارك التجارب واحصل على الدعم واحتفل بالإنجازات.',
    tier: 'BUNDLE',
    category: 'Community',
    categoryAr: 'المجتمع',
    keywords: ['community', 'transformation community', 'support group', 'accountability partner', 'growth community'],
  },
  {
    slug: 'priority-support',
    title: 'Priority Support | Personal Transformation Assistance',
    titleAr: 'الدعم ذو الأولوية | مساعدة شخصية للتحول',
    description: 'Get priority access to our transformation experts. Personal guidance and faster response times for your journey.',
    descriptionAr: 'احصل على وصول ذو أولوية لخبراء التحول لدينا. إرشاد شخصي وأوقات استجابة أسرع لرحلتك.',
    tier: 'BUNDLE',
    category: 'Support',
    categoryAr: 'الدعم',
    keywords: ['priority support', 'personal assistance', 'transformation help', 'expert guidance', 'premium support'],
  },
  {
    slug: 'trial-planner',
    title: 'Trial Planner | Free Transformation Starter',
    titleAr: 'مخطط التجربة | بداية تحول مجانية',
    description: 'Start your transformation journey with our free trial planner. Sample exercises from our premium tools.',
    descriptionAr: 'ابدأ رحلة تحولك مع مخطط التجربة المجاني لدينا. تمارين تجريبية من أدواتنا المتميزة.',
    tier: 'FREE',
    category: 'Planning',
    categoryAr: 'التخطيط',
    keywords: ['trial planner', 'free trial', 'transformation starter', 'free tools', 'beginner planning'],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get app page by slug
 */
export function getAppPageBySlug(slug: string): AppPage | undefined {
  return APP_PAGES.find(app => app.slug === slug);
}

/**
 * Get all app slugs for static generation
 */
export function getAllAppSlugs(): string[] {
  return APP_PAGES.map(app => app.slug);
}

/**
 * Generate metadata for an app page
 */
export function generateAppPageMetadata(slug: string): Metadata {
  const app = getAppPageBySlug(slug);
  
  if (!app) {
    return {
      title: 'App Not Found | Tamkinly',
      description: 'The requested app could not be found.',
    };
  }
  
  const fullUrl = `https://tamkinly.com/apps/${app.slug}`;
  const imageUrl = app.image 
    ? `https://tamkinly.com${app.image}` 
    : 'https://tamkinly.com/og-image.webp';
  
  const isFree = app.tier === 'FREE';
  const tierDescription = isFree 
    ? 'Free to use.' 
    : `Available in ${app.tier} package.`;
  
  return {
    title: app.title,
    description: `${app.description} ${tierDescription}`,
    keywords: app.keywords,
    
    alternates: {
      canonical: fullUrl,
    },
    
    openGraph: {
      title: app.title,
      description: app.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: app.title,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: app.title,
      description: app.description,
      site: '@tamkinly',
      images: [imageUrl],
    },
    
    other: {
      'app:tier': app.tier,
      'app:category': app.category,
    },
  };
}

/**
 * Get apps by tier
 */
export function getAppsByTier(tier: 'FREE' | 'BASIC' | 'PREMIUM' | 'BUNDLE'): AppPage[] {
  return APP_PAGES.filter(app => app.tier === tier);
}

/**
 * Get apps by category
 */
export function getAppsByCategory(category: string): AppPage[] {
  return APP_PAGES.filter(app => 
    app.category.toLowerCase().includes(category.toLowerCase())
  );
}
