/**
 * SEO Page Metadata Configuration for Tamkinly
 * Centralized metadata for all pages with unique titles, descriptions, and URLs
 * Supports both English and Arabic content
 */

import type { Metadata } from 'next';

// ============================================
// TYPES
// ============================================

export interface PageMetadataConfig {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  path: string;
  keywords: string[];
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

// ============================================
// SITE CONFIGURATION
// ============================================

export const SEO_SITE_CONFIG = {
  name: 'Tamkinly',
  nameAr: 'تمكينلي',
  url: 'https://tamkinly.com',
  defaultImage: '/og-image.png',
  twitterHandle: '@tamkinly',
  author: 'Tamkinly',
} as const;

// ============================================
// PAGE METADATA CONFIGURATION
// ============================================

export const PAGE_METADATA: Record<string, PageMetadataConfig> = {
  home: {
    title: 'Tamkinly | Return to Your Center - Identity Transformation Tools',
    titleAr: 'تمكينلي | عد إلى مركزك - أدوات تحويل الهوية',
    description: 'Discover your identity gap with our free 3-minute assessment. Evidence-based tools for identity transformation, habit formation, and personal development. Start your journey today.',
    descriptionAr: 'اكتشف فجوة هويتك مع تقييمنا المجاني في 3 دقائق. أدوات مبنية على الأدلة لتحويل الهوية وتكوين العادات والتطوير الشخصي. ابدأ رحلتك اليوم.',
    path: '/',
    keywords: [
      'identity transformation',
      'self-development',
      'habit tracker',
      'personal growth',
      'identity assessment',
      'تحويل الهوية',
      'التطوير الذاتي',
      'تقييم الهوية',
    ],
  },
  products: {
    title: 'Products & Pricing | Identity Transformation Tools',
    titleAr: 'المنتجات والأسعار | أدوات تحويل الهوية - تمكينلي',
    description: 'Start free with powerful identity tools, then upgrade as you grow. Transparent pricing for identity transformation products. Free tier available with no credit card required.',
    descriptionAr: 'ابدأ مجاناً مع أدوات هوية قوية، ثم قم بالترقية مع نموك. أسعار شفافة لمنتجات تحويل الهوية. طبقة مجانية متاحة بدون الحاجة لبطاقة ائتمان.',
    path: '/products',
    keywords: [
      'identity transformation pricing',
      'personal development products',
      'habit tracker pricing',
      'digital planner',
      'أسعار تحويل الهوية',
      'أدوات التطوير الشخصي',
      'مخطط رقمي',
    ],
  },
  apps: {
    title: 'Interactive Apps | Transformation Tools',
    titleAr: 'التطبيقات التفاعلية | أدوات التحول - تمكينلي',
    description: 'Access powerful transformation tools including Identity Gap Assessment, Values Clarification, Daily Reflection, and AI Identity Coach. Start free, upgrade anytime.',
    descriptionAr: 'الوصول إلى أدوات تحويل قوية بما في ذلك تقييم فجوة الهوية، توضيح القيم، التأمل اليومي، ومدرب الهوية بالذكاء الاصطناعي. ابدأ مجاناً، قم بالترقية في أي وقت.',
    path: '/apps',
    keywords: [
      'identity apps',
      'self-development tools',
      'habit tracker app',
      'AI coaching',
      'transformation tools',
      'تطبيقات الهوية',
      'أدوات التطوير الذاتي',
      'مدرب ذكاء اصطناعي',
    ],
  },
  quiz: {
    title: 'Identity Gap Quiz | Free 3-Minute Assessment',
    titleAr: 'اختبار فجوة الهوية | تقييم مجاني 3 دقائق - تمكينلي',
    description: 'Take our free 3-minute identity gap assessment. Discover what\'s holding you back from becoming the person you know you can be. Get instant personalized results.',
    descriptionAr: 'قم بتقييم فجوة الهوية المجاني لدينا في 3 دقائق. اكتشف ما يعيقك عن أن تصبح الشخص الذي تعرف أنه يمكنك أن تكون. احصل على نتائج شخصية فورية.',
    path: '/quiz',
    keywords: [
      'identity gap quiz',
      'free identity assessment',
      'personality test',
      'self-discovery',
      'اختبار فجوة الهوية',
      'تقييم الهوية المجاني',
      'اختبار الشخصية',
    ],
  },
  about: {
    title: 'About Tamkinly | Our Mission & Philosophy',
    titleAr: 'عن تمكينلي | مهمتنا وفلسفتنا - تمكينلي',
    description: 'Tamkinly is a space to rebuild the human from within. Learn about our evidence-based approach to identity transformation and personal development.',
    descriptionAr: 'تمكينلي هي مساحة لإعادة بناء الإنسان من الداخل. تعرف على نهجنا المبني على الأدلة لتحويل الهوية والتطوير الشخصي.',
    path: '/about',
    keywords: [
      'about tamkinly',
      'identity transformation mission',
      'personal development philosophy',
      'عن تمكينلي',
      'مهمة تحويل الهوية',
      'فلسفة التطوير الشخصي',
    ],
  },
  contact: {
    title: 'Contact Us | Get Support',
    titleAr: 'تواصل معنا | احصل على الدعم - تمكينلي',
    description: 'Contact Tamkinly for support, questions, or partnership inquiries. We typically respond within 24-48 hours. Email us at hello@tamkinly.com.',
    descriptionAr: 'تواصل مع تمكينلي للدعم أو الأسئلة أو استفسارات الشراكة. نرد عادة خلال 24-48 ساعة. راسلنا على hello@tamkinly.com.',
    path: '/contact',
    keywords: [
      'contact tamkinly',
      'support',
      'customer service',
      'تواصل مع تمكينلي',
      'الدعم',
      'خدمة العملاء',
    ],
  },
  blog: {
    title: 'Blog | Research-Backed Insights',
    titleAr: 'المدونة | رؤى مبنية على الأبحاث - تمكينلي',
    description: 'Research-backed insights, practical frameworks, and transformation tools. Articles on identity transformation, habit formation, and personal development.',
    descriptionAr: 'رؤى مبنية على الأبحاث، أطر عملية، وأدوات تحويل. مقالات عن تحويل الهوية، تكوين العادات، والتطوير الشخصي.',
    path: '/blog',
    keywords: [
      'identity blog',
      'personal development articles',
      'habit formation research',
      'self-improvement tips',
      'مدونة الهوية',
      'مقالات التطوير الشخصي',
      'نصائح تحسين الذات',
    ],
  },
  methodology: {
    title: 'Methodology | Evidence-Based Transformation',
    titleAr: 'المنهجية | تحويل مبني على الأدلة - تمكينلي',
    description: 'Our methodology combines neuroscience, psychology, and practical frameworks for lasting identity transformation. Based on Atomic Habits, Self-Authorship, and CBT research.',
    descriptionAr: 'تجمع منهجيتنا بين العلوم العصبية وعلم النفس والأطر العملية لتحويل هوية دائم. مبنية على أبحاث العادات الذرية وتأليف الذات والعلاج السلوكي المعرفي.',
    path: '/methodology',
    keywords: [
      'transformation methodology',
      'identity science',
      'evidence-based self-development',
      'atomic habits',
      'منهجية التحول',
      'علم الهوية',
      'العادات الذرية',
    ],
  },
  faq: {
    title: 'FAQ | Frequently Asked Questions',
    titleAr: 'الأسئلة الشائعة | الأسئلة المتكررة - تمكينلي',
    description: 'Find answers to common questions about Tamkinly products, pricing, and methodology. Get help with your transformation journey.',
    descriptionAr: 'اعثر على إجابات للأسئلة الشائعة حول منتجات تمكينلي والأسعار والمنهجية. احصل على المساعدة في رحلة تحولك.',
    path: '/faq',
    keywords: [
      'tamkinly faq',
      'help',
      'questions answered',
      'product support',
      'أسئلة تمكينلي',
      'مساعدة',
      'دعم المنتجات',
    ],
  },
  privacy: {
    title: 'Privacy Policy | Your Data Protection',
    titleAr: 'سياسة الخصوصية | حماية بياناتك - تمكينلي',
    description: 'Learn how Tamkinly protects your privacy and handles your data. We are committed to transparency and security in all our practices.',
    descriptionAr: 'تعرف على كيفية حماية تمكينلي لخصوصيتك والتعامل مع بياناتك. نحن ملتزمون بالشفافية والأمان في جميع ممارساتنا.',
    path: '/privacy',
    keywords: [
      'privacy policy',
      'data protection',
      'GDPR compliance',
      'سياسة الخصوصية',
      'حماية البيانات',
      'الامتثال',
    ],
  },
  terms: {
    title: 'Terms of Service | Usage Agreement',
    titleAr: 'شروط الخدمة | اتفاقية الاستخدام - تمكينلي',
    description: 'Read our terms of service and usage agreement. Understand your rights and responsibilities when using Tamkinly products and services.',
    descriptionAr: 'اقرأ شروط الخدمة واتفاقية الاستخدام الخاصة بنا. افهم حقوقك ومسؤولياتك عند استخدام منتجات وخدمات تمكينلي.',
    path: '/terms',
    keywords: [
      'terms of service',
      'usage agreement',
      'legal terms',
      'شروط الخدمة',
      'اتفاقية الاستخدام',
      'الشروط القانونية',
    ],
  },
  refund: {
    title: 'Refund Policy | 30-Day Money Back Guarantee',
    titleAr: 'سياسة الاسترداد | ضمان استرداد الأموال 30 يوماً - تمكينلي',
    description: 'We offer a 30-day money-back guarantee on all products. If you\'re not satisfied, contact us for a full refund—no questions asked.',
    descriptionAr: 'نقدم ضمان استرداد الأموال لمدة 30 يوماً على جميع المنتجات. إذا لم تكن راضياً، تواصل معنا للحصول على استرداد كامل - بدون أسئلة.',
    path: '/refund',
    keywords: [
      'refund policy',
      'money back guarantee',
      'return policy',
      'سياسة الاسترداد',
      'ضمان استرداد الأموال',
      'سياسة الإرجاع',
    ],
  },
  cart: {
    title: 'Shopping Cart | Complete Your Purchase',
    titleAr: 'سلة التسوق | أكمل عملية الشراء - تمكينلي',
    description: 'Review your selected products and complete your purchase. Secure checkout with multiple payment options available.',
    descriptionAr: 'راجع منتجاتك المختارة وأكمل عملية الشراء. دفع آمن مع خيارات دفع متعددة متاحة.',
    path: '/cart',
    keywords: [
      'shopping cart',
      'checkout',
      'secure payment',
      'سلة التسوق',
      'الدفع',
      'الدفع الآمن',
    ],
    noIndex: true, // Cart pages shouldn't be indexed
  },
  account: {
    title: 'My Account | Manage Your Profile',
    titleAr: 'حسابي | إدارة ملفك الشخصي - تمكينلي',
    description: 'Access your Tamkinly account to manage your profile, view purchases, and track your transformation progress.',
    descriptionAr: 'الوصول إلى حساب تمكينلي الخاص بك لإدارة ملفك الشخصي، ومشاهدة المشتريات، وتتبع تقدم تحولك.',
    path: '/account',
    keywords: [
      'my account',
      'profile management',
      'purchase history',
      'حسابي',
      'إدارة الملف الشخصي',
      'سجل المشتريات',
    ],
    noIndex: true, // Account pages shouldn't be indexed
  },
  resources: {
    title: 'Free Resources | Transformation Tools & Guides',
    titleAr: 'موارد مجانية | أدوات وإرشادات التحول - تمكينلي',
    description: 'Access free identity transformation resources including assessments, guides, and research-backed articles. Start your journey without any cost.',
    descriptionAr: 'الوصول إلى موارد تحويل الهوية المجانية بما في ذلك التقييمات والأدلة والمقالات المبنية على الأبحاث. ابدأ رحلتك بدون أي تكلفة.',
    path: '/resources',
    keywords: [
      'free resources',
      'identity guides',
      'transformation tools',
      'research articles',
      'موارد مجانية',
      'أدلة الهوية',
      'أدوات التحول',
    ],
  },
};

// ============================================
// METADATA GENERATOR
// ============================================

/**
 * Generate comprehensive page metadata with unique canonical URLs and OpenGraph data
 */
export function generatePageMetadataFromConfig(pageKey: keyof typeof PAGE_METADATA): Metadata {
  const config = PAGE_METADATA[pageKey];
  if (!config) {
    console.warn(`Page metadata not found for key: ${pageKey}`);
    return {};
  }

  const fullUrl = `${SEO_SITE_CONFIG.url}${config.path}`;
  const imageUrl = config.image 
    ? `${SEO_SITE_CONFIG.url}${config.image}` 
    : `${SEO_SITE_CONFIG.url}${SEO_SITE_CONFIG.defaultImage}`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    
    // Canonical URL with correct path
    // Using x-default only - Arabic content not yet available at separate URLs
    alternates: {
      canonical: fullUrl,
    },
    
    // Open Graph with correct URL
    openGraph: {
      title: config.title,
      description: config.description,
      url: fullUrl, // Correct URL for each page
      siteName: SEO_SITE_CONFIG.name,
      locale: 'en_US',
      type: config.type || 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      site: SEO_SITE_CONFIG.twitterHandle,
      creator: SEO_SITE_CONFIG.twitterHandle,
      images: [imageUrl],
    },
    
    // Robots configuration
    robots: config.noIndex 
      ? { index: false, follow: false }
      : {
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
      'application-name': SEO_SITE_CONFIG.name,
    },
  };
}

// ============================================
// CONVENIENCE EXPORTS FOR EACH PAGE
// ============================================

export const HOME_METADATA = generatePageMetadataFromConfig('home');
export const PRODUCTS_METADATA = generatePageMetadataFromConfig('products');
export const APPS_METADATA = generatePageMetadataFromConfig('apps');
export const QUIZ_METADATA = generatePageMetadataFromConfig('quiz');
export const ABOUT_METADATA = generatePageMetadataFromConfig('about');
export const CONTACT_METADATA = generatePageMetadataFromConfig('contact');
export const BLOG_METADATA = generatePageMetadataFromConfig('blog');
export const METHODOLOGY_METADATA = generatePageMetadataFromConfig('methodology');
export const FAQ_METADATA = generatePageMetadataFromConfig('faq');
export const PRIVACY_METADATA = generatePageMetadataFromConfig('privacy');
export const TERMS_METADATA = generatePageMetadataFromConfig('terms');
export const REFUND_METADATA = generatePageMetadataFromConfig('refund');
export const CART_METADATA = generatePageMetadataFromConfig('cart');
export const ACCOUNT_METADATA = generatePageMetadataFromConfig('account');
export const RESOURCES_METADATA = generatePageMetadataFromConfig('resources');

// ============================================
// DYNAMIC METADATA GENERATORS
// ============================================

/**
 * Generate metadata for product detail pages
 */
export function generateProductMetadata(
  productName: string,
  productDescription: string,
  productSlug: string,
  price: number
): Metadata {
  const fullUrl = `${SEO_SITE_CONFIG.url}/products/${productSlug}`;
  const title = `${productName} | Identity Transformation - Tamkinly`;
  
  return {
    title,
    description: `${productDescription} Get instant access for $${price}. 30-day money-back guarantee.`,
    keywords: [...PAGE_METADATA.products.keywords, productName.toLowerCase()],
    
    alternates: {
      canonical: fullUrl,
    },
    
    openGraph: {
      title,
      description: productDescription,
      url: fullUrl,
      siteName: SEO_SITE_CONFIG.name,
      type: 'product',
      images: [
        {
          url: `${SEO_SITE_CONFIG.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: productName,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description: productDescription,
      site: SEO_SITE_CONFIG.twitterHandle,
    },
  };
}

/**
 * Generate metadata for blog post pages
 */
export function generateBlogPostMetadata(
  title: string,
  description: string,
  slug: string,
  publishedTime: string,
  modifiedTime?: string,
  image?: string
): Metadata {
  const fullUrl = `${SEO_SITE_CONFIG.url}/blog/${slug}`;
  
  return {
    title: `${title} | Tamkinly Blog`,
    description,
    keywords: [...PAGE_METADATA.blog.keywords, title.toLowerCase()],
    
    alternates: {
      canonical: fullUrl,
    },
    
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: SEO_SITE_CONFIG.name,
      type: 'article',
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      authors: [SEO_SITE_CONFIG.author],
      images: [
        {
          url: image ? `${SEO_SITE_CONFIG.url}${image}` : `${SEO_SITE_CONFIG.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: SEO_SITE_CONFIG.twitterHandle,
    },
  };
}

/**
 * Generate metadata for app pages
 */
export function generateAppMetadata(
  appName: string,
  appDescription: string,
  appSlug: string,
  tier: string
): Metadata {
  const fullUrl = `${SEO_SITE_CONFIG.url}/apps/${appSlug}`;
  const title = `${appName} | Transformation Tool - Tamkinly`;
  const isFree = tier === 'FREE';
  
  return {
    title,
    description: `${appDescription} ${isFree ? 'Free to use.' : `Available in ${tier} package.`}`,
    keywords: [...PAGE_METADATA.apps.keywords, appName.toLowerCase(), tier.toLowerCase()],
    
    alternates: {
      canonical: fullUrl,
    },
    
    openGraph: {
      title,
      description: appDescription,
      url: fullUrl,
      siteName: SEO_SITE_CONFIG.name,
      type: 'website',
      images: [
        {
          url: `${SEO_SITE_CONFIG.url}/og-image.png`,
          width: 1200,
          height: 630,
          alt: appName,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description: appDescription,
      site: SEO_SITE_CONFIG.twitterHandle,
    },
  };
}
