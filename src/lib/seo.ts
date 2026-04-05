/**
 * SEO Configuration and Helpers for Tamkinly
 * Centralized SEO management for Next.js 16 Metadata API
 * Optimized for both English and Arabic audiences
 */

import type { Metadata } from 'next';

// ============================================
// SITE CONFIGURATION
// ============================================

export const SITE_CONFIG = {
  name: 'Tamkinly | تمكينلي',
  nameAr: 'تمكينلي',
  nameEn: 'Tamkinly',
  description: 'A space to rebuild the human from within. Without pressure. Without self-judgment. Without temporary motivation. Digital products for identity transformation and personal development.',
  descriptionAr: 'مساحة لإعادة بناء الإنسان من الداخل. بدون ضغط. بدون حكم على الذات. بدون تحفيز مؤقت. منتجات رقمية لتحويل الهوية والتطوير الشخصي.',
  url: 'https://tamkinly.com',
  ogImage: '/og-image.png',
  twitterHandle: '@tamkinly',
  author: 'Tamkinly',
  language: 'en',
  locale: 'en_US',
  localeAr: 'ar_SA',
} as const;

// ============================================
// TARGET KEYWORDS - Bilingual SEO
// ============================================

export const KEYWORDS = {
  // Primary keywords (high search volume, high relevance)
  primary: [
    // English
    'identity transformation',
    'self-development',
    'habit tracker',
    'personal growth',
    'identity reconstruction',
    'self-improvement',
    'mindset coaching',
    // Arabic equivalents
    'تحويل الهوية',
    'التطوير الذاتي',
    'تتبع العادات',
    'النمو الشخصي',
    'بناء الهوية',
    'التطوير الشخصي',
  ],
  
  // Secondary keywords (medium search volume, specific)
  secondary: [
    // English
    'digital planner',
    'transformation tools',
    'identity assessment',
    'values clarification',
    'daily reflection',
    'behavioral change',
    'atomic habits',
    'self-authorship',
    'identity gap',
    'emotional regulation',
    'decision making',
    'goal setting',
    'habit formation',
    // Arabic equivalents
    'مخطط رقمي',
    'أدوات التحول',
    'تقييم الهوية',
    'توضيح القيم',
    'التأمل اليومي',
    'تغيير السلوك',
    'العادات الذرية',
    'تأليف الذات',
    'فجوة الهوية',
    'التنظيم العاطفي',
    'صنع القرار',
    'تحديد الأهداف',
    'تكوين العادات',
  ],
  
  // Long-tail keywords (specific, high conversion)
  longTail: [
    // English
    'free identity assessment',
    'identity gap quiz',
    'how to change your identity',
    'habit tracker for personal growth',
    'values clarification tool',
    'daily reflection prompts',
    'identity transformation system',
    'self-development tools',
    'AI identity coach',
    'identity-based habits',
    'who am I worksheet',
    'self-authorship worksheet',
    'environmental audit template',
    'emotion regulation questionnaire',
    'decision journal template',
    // Arabic equivalents
    'تقييم الهوية المجاني',
    'اختبار فجوة الهوية',
    'كيف تغير هويتك',
    'متتبع عادات للنمو الشخصي',
    'أداة توضيح القيم',
    'أسئلة التأمل اليومي',
    'نظام تحويل الهوية',
    'أدوات التطوير الذاتي',
    'مدرب هوية بالذكاء الاصطناعي',
    'العادات المبنية على الهوية',
    'ورقة عمل من أنا',
    'ورقة عمل تأليف الذات',
    'قالب التدقيق البيئي',
    'استبيان التنظيم العاطفي',
    'قالب يوميات القرارات',
  ],
  
  // High-intent commercial keywords
  commercial: [
    'identity transformation course',
    'personal development products',
    'habit tracker app',
    'self-improvement tools',
    'digital transformation planner',
    'mindset coaching program',
    'دورة تحويل الهوية',
    'منتجات التطوير الشخصي',
    'تطبيق تتبع العادات',
    'أدوات تحسين الذات',
  ],
  
  // Location-based keywords (global reach)
  locationBased: [
    'online self-development',
    'digital identity tools',
    'virtual coaching platform',
    'remote personal growth',
    'تطوير ذاتي أونلاين',
    'أدوات هوية رقمية',
  ],
} as const;

// ============================================
// METADATA GENERATORS
// ============================================

interface PageMetadata {
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

/**
 * Generate comprehensive page metadata with bilingual support
 */
export function generatePageMetadata({
  title,
  titleAr,
  description,
  descriptionAr,
  path,
  image = SITE_CONFIG.ogImage,
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
}: PageMetadata): Metadata {
  const url = `${SITE_CONFIG.url}${path}`;
  const fullTitle = title === SITE_CONFIG.nameEn ? title : `${title} | ${SITE_CONFIG.nameEn}`;
  const fullTitleAr = titleAr ? `${titleAr} | ${SITE_CONFIG.nameAr}` : fullTitle;
  
  const allKeywords = [...KEYWORDS.primary, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: author || SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    
    // Canonical URL - Arabic content not yet available at separate URLs
    alternates: {
      canonical: url,
    },
    
    // Open Graph - Full configuration
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.nameEn,
      locale: SITE_CONFIG.locale,
      type: type === 'article' ? 'article' : 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
        {
          url: '/og-image-square.png',
          width: 800,
          height: 800,
          alt: `${title} - ${SITE_CONFIG.nameEn}`,
        },
      ],
      ...(type === 'article' && {
        articles: {
          publishedTime,
          modifiedTime,
          authors: [author || SITE_CONFIG.author],
          tags: keywords,
          section,
        },
      }),
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      images: [image],
    },
    
    // Robots configuration
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Additional metadata
    other: {
      'language': 'en, ar',
      'geo.region': 'Global',
      'geo.placename': 'Online',
    },
  };
}

// ============================================
// JSON-LD SCHEMA GENERATORS
// ============================================

/**
 * Organization Schema with enhanced data
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.nameEn,
    alternateName: SITE_CONFIG.nameAr,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    sameAs: [
      'https://twitter.com/tamkinly',
      'https://instagram.com/tamkinly',
      'https://linkedin.com/company/tamkinly',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
      email: 'hello@tamkinly.com',
    },
    foundingDate: '2024',
    areaServed: 'Worldwide',
    knowsAbout: [
      'Identity Transformation',
      'Personal Development',
      'Habit Formation',
      'Self-Improvement',
    ],
  };
}

/**
 * WebSite Schema with SearchAction
 * Fixed: Using direct URL string instead of EntryPoint for better compatibility
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.nameEn,
    alternateName: SITE_CONFIG.nameAr,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    inLanguage: ['en', 'ar'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Product Schema for pricing tiers
 */
interface ProductSchemaData {
  name: string;
  nameAr?: string;
  description: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  category?: string;
  image?: string;
  url: string;
  tier?: string;
  features?: string[];
}

export function generateProductSchema({
  name,
  nameAr,
  description,
  price,
  currency = 'USD',
  availability = 'InStock',
  category = 'Digital Product',
  image,
  url,
  features,
}: ProductSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    alternateName: nameAr,
    description,
    image: image ? `${SITE_CONFIG.url}${image}` : undefined,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.nameEn,
    },
    category,
    features: features || undefined,
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: `${SITE_CONFIG.url}${url}`,
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.nameEn,
      },
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  };
}

/**
 * Software Application Schema for Apps
 */
interface AppSchemaData {
  name: string;
  nameAr?: string;
  description: string;
  url: string;
  category: string;
  operatingSystem?: string;
  offers?: {
    price: number;
    currency?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  features?: string[];
}

export function generateSoftwareAppSchema({
  name,
  nameAr,
  description,
  url,
  category,
  operatingSystem = 'Web Browser',
  offers,
  aggregateRating,
  features,
}: AppSchemaData) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    alternateName: nameAr,
    description,
    url: `${SITE_CONFIG.url}${url}`,
    applicationCategory: category,
    operatingSystem,
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: offers?.price ?? 0,
      priceCurrency: offers?.currency ?? 'USD',
    },
    featureList: features?.join(', '),
  };

  if (aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

/**
 * Article Schema for Blog Posts
 */
interface ArticleSchemaData {
  headline: string;
  headlineAr?: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
  articleBody?: string;
  wordCount?: number;
}

export function generateArticleSchema({
  headline,
  headlineAr,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = SITE_CONFIG.author,
  keywords = [],
  articleBody,
  wordCount,
}: ArticleSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    alternativeHeadline: headlineAr,
    description,
    url: `${SITE_CONFIG.url}${url}`,
    image: image ? `${SITE_CONFIG.url}${image}` : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.nameEn,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}${url}`,
    },
    keywords: keywords.join(', '),
    articleBody,
    wordCount,
    inLanguage: ['en', 'ar'],
  };
}

/**
 * BreadcrumbList Schema
 */
interface BreadcrumbItem {
  name: string;
  nameAr?: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

/**
 * FAQ Schema for FAQ pages
 */
interface FAQItem {
  question: string;
  questionAr?: string;
  answer: string;
  answerAr?: string;
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Course Schema for educational content
 */
interface CourseSchemaData {
  name: string;
  nameAr?: string;
  description: string;
  url: string;
  provider?: string;
  educationalLevel?: string;
  timeRequired?: string;
}

export function generateCourseSchema({
  name,
  nameAr,
  description,
  url,
  provider = SITE_CONFIG.nameEn,
  educationalLevel = 'Beginner',
  timeRequired,
}: CourseSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    alternateName: nameAr,
    description,
    url: `${SITE_CONFIG.url}${url}`,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    educationalLevel,
    timeRequired,
    inLanguage: ['en', 'ar'],
  };
}

/**
 * HowTo Schema for guides and tutorials
 */
interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface HowToData {
  name: string;
  nameAr?: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
  estimatedCost?: string;
}

export function generateHowToSchema({
  name,
  nameAr,
  description,
  steps,
  totalTime,
  estimatedCost,
}: HowToData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    alternateName: nameAr,
    description,
    totalTime,
    estimatedCost: estimatedCost ? {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: estimatedCost,
    } : undefined,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}

/**
 * Combine multiple JSON-LD schemas
 */
export function combineSchemas(...schemas: object[]) {
  return schemas.filter(Boolean);
}

// ============================================
// PAGE-SPECIFIC METADATA EXPORTS
// ============================================

export const HOME_METADATA: Metadata = generatePageMetadata({
  title: 'Tamkinly | Return to Your Center',
  titleAr: 'تمكينلي | عد إلى مركزك',
  description: 'Discover your identity gap with our free 3-minute assessment. Evidence-based tools for identity transformation, habit formation, and personal development. Start your journey today.',
  descriptionAr: 'اكتشف فجوة هويتك مع تقييمنا المجاني في 3 دقائق. أدوات مبنية على الأدلة لتحويل الهوية وتكوين العادات والتطوير الشخصي. ابدأ رحلتك اليوم.',
  path: '/',
  keywords: [...KEYWORDS.primary, ...KEYWORDS.secondary.slice(0, 5)],
});

export const PRODUCTS_METADATA: Metadata = generatePageMetadata({
  title: 'Products & Pricing | Identity Transformation Tools',
  titleAr: 'المنتجات والأسعار | أدوات تحويل الهوية',
  description: 'Start free with powerful identity tools, then upgrade as you grow. Transparent pricing for identity transformation products. Free tier available with no credit card required.',
  descriptionAr: 'ابدأ مجاناً مع أدوات هوية قوية، ثم قم بالترقية مع نموك. أسعار شفافة لمنتجات تحويل الهوية. طبقة مجانية متاحة بدون الحاجة لبطاقة ائتمان.',
  path: '/products',
  keywords: ['identity transformation pricing', 'personal development tools', 'habit tracker pricing', 'أسعار تحويل الهوية', 'أدوات التطوير الشخصي'],
});

export const APPS_METADATA: Metadata = generatePageMetadata({
  title: 'Interactive Apps | Transformation Tools',
  titleAr: 'التطبيقات التفاعلية | أدوات التحول',
  description: 'Access powerful transformation tools including Identity Gap Assessment, Values Clarification, Daily Reflection, and AI Identity Coach. Start free, upgrade anytime.',
  descriptionAr: 'الوصول إلى أدوات تحويل قوية بما في ذلك تقييم فجوة الهوية، توضيح القيم، التأمل اليومي، ومدرب الهوية بالذكاء الاصطناعي. ابدأ مجاناً، قم بالترقية في أي وقت.',
  path: '/apps',
  keywords: ['identity apps', 'self-development tools', 'habit tracker app', 'AI coaching', 'تطبيقات الهوية', 'أدوات التطوير الذاتي'],
});

export const BLOG_METADATA: Metadata = generatePageMetadata({
  title: 'Blog | Research-Backed Insights',
  titleAr: 'المدونة | رؤى مبنية على الأبحاث',
  description: 'Research-backed insights, practical frameworks, and transformation tools. Articles on identity transformation, habit formation, and personal development.',
  descriptionAr: 'رؤى مبنية على الأبحاث، أطر عملية، وأدوات تحويل. مقالات عن تحويل الهوية، تكوين العادات، والتطوير الشخصي.',
  path: '/blog',
  keywords: ['identity blog', 'personal development articles', 'habit formation research', 'مدونة الهوية', 'مقالات التطوير الشخصي'],
});

export const ABOUT_METADATA: Metadata = generatePageMetadata({
  title: 'About Tamkinly | Our Mission',
  titleAr: 'عن تمكينلي | مهمتنا',
  description: 'Tamkinly is a space to rebuild the human from within. Learn about our evidence-based approach to identity transformation and personal development.',
  descriptionAr: 'تمكينلي هي مساحة لإعادة بناء الإنسان من الداخل. تعرف على نهجنا المبني على الأدلة لتحويل الهوية والتطوير الشخصي.',
  path: '/about',
  keywords: ['about tamkinly', 'identity transformation mission', 'personal development philosophy', 'عن تمكينلي', 'مهمة تحويل الهوية'],
});

export const METHODOLOGY_METADATA: Metadata = generatePageMetadata({
  title: 'Methodology | Evidence-Based Transformation',
  titleAr: 'المنهجية | تحويل مبنى على الأدلة',
  description: 'Our methodology combines neuroscience, psychology, and practical frameworks for lasting identity transformation. Based on Atomic Habits, Self-Authorship, and CBT research.',
  descriptionAr: 'تجمع منهجيتنا بين العلوم العصبية وعلم النفس والأطر العملية لتحويل هوية دائم. مبنية على أبحاث العادات الذرية وتأليف الذات والعلاج السلوكي المعرفي.',
  path: '/methodology',
  keywords: ['transformation methodology', 'identity science', 'evidence-based self-development', 'منهجية التحول', 'علم الهوية'],
});

export const RESOURCES_METADATA: Metadata = generatePageMetadata({
  title: 'Resources | Free Transformation Tools',
  titleAr: 'الموارد | أدوات تحويل مجانية',
  description: 'Free resources for identity transformation including worksheets, assessments, and guides. Research-backed content for personal development.',
  descriptionAr: 'موارد مجانية لتحويل الهوية بما في ذلك أوراق العمل والتقييمات والأدلة. محتوى مبنى على الأبحاث للتطوير الشخصي.',
  path: '/resources',
  keywords: ['free resources', 'identity worksheets', 'self-development guides', 'موارد مجانية', 'أوراق عمل الهوية'],
});

export const CONTACT_METADATA: Metadata = generatePageMetadata({
  title: 'Contact Us | Get Support',
  titleAr: 'تواصل معنا | احصل على الدعم',
  description: 'Contact Tamkinly for support, questions, or partnership inquiries. We typically respond within 24 hours.',
  descriptionAr: 'تواصل مع تمكينلي للدعم أو الأسئلة أو استفسارات الشراكة. نرد عادة خلال 24 ساعة.',
  path: '/contact',
  keywords: ['contact tamkinly', 'support', 'customer service', 'تواصل مع تمكينلي', 'الدعم'],
});

export const FAQ_METADATA: Metadata = generatePageMetadata({
  title: 'FAQ | Frequently Asked Questions',
  titleAr: 'الأسئلة الشائعة | الأسئلة المتكررة',
  description: 'Find answers to common questions about Tamkinly products, pricing, and methodology. Get help with your transformation journey.',
  descriptionAr: 'اعثر على إجابات للأسئلة الشائعة حول منتجات تمكينلي والأسعار والمنهجية. احصل على المساعدة في رحلة تحولك.',
  path: '/faq',
  keywords: ['tamkinly faq', 'help', 'questions answered', 'أسئلة تمكينلي', 'مساعدة'],
});

// ============================================
// JSON-LD SCRIPT COMPONENT HELPER
// ============================================

/**
 * Generate script tag content for JSON-LD
 */
export function generateJsonLdScript(schema: object) {
  return JSON.stringify(schema);
}
