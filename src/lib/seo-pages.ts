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
  defaultImage: '/opengraph-image',
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
    description: 'Discover your identity gap with our free 3-minute assessment. Evidence-based tools for identity transformation, identity recode, and personal growth.',
    descriptionAr: 'اكتشف فجوة هويتك مع تقييمنا المجاني في 3 دقائق. أدوات مبنية على الأدلة لتحويل الهوية وتكوين العادات والتطوير الشخصي. ابدأ رحلتك اليوم.',
    path: '/',
    keywords: [
      'identity transformation',
      'identity gap',
      'identity recode',
      'self-authorship',
      'values clarification',
      'تحويل الهوية',
      'فجوة الهوية',
      'تقييم الهوية',
    ],
  },
  products: {
    title: 'Products & Pricing | Tamkinly — Return to Your Center',
    titleAr: 'المنتجات والأسعار | تمكينلي — عد إلى مركزك',
    description: 'Start free with powerful identity tools, then upgrade as you grow. Transparent pricing for identity transformation products. No credit card required.',
    descriptionAr: 'ابدأ مجاناً مع أدوات هوية قوية، ثم قم بالترقية مع نموك. أسعار شفافة لمنتجات تحويل الهوية. طبقة مجانية متاحة بدون الحاجة لبطاقة ائتمان.',
    path: '/products',
    keywords: [
      'identity transformation pricing',
      'personal development products',
      'identity planner pricing',
      'digital planner',
      'أسعار تحويل الهوية',
      'أدوات التطوير الشخصي',
      'مخطط رقمي',
    ],
  },
  apps: {
    title: 'Interactive Apps | Tamkinly — Return to Your Center',
    titleAr: 'التطبيقات التفاعلية | تمكينلي — عد إلى مركزك',
    description: 'Access powerful transformation tools including Identity Gap Assessment, Values Clarification, Daily Reflection, and AI Identity Coach. Start free, upgrade anytime.',
    descriptionAr: 'الوصول إلى أدوات تحويل قوية بما في ذلك تقييم فجوة الهوية، توضيح القيم، التأمل اليومي، ومدرب الهوية بالذكاء الاصطناعي. ابدأ مجاناً، قم بالترقية في أي وقت.',
    path: '/apps',
    keywords: [
      'identity apps',
      'self-development tools',
      'identity baseline app',
      'AI coaching',
      'transformation tools',
      'تطبيقات الهوية',
      'أدوات التطوير الذاتي',
      'مدرب ذكاء اصطناعي',
    ],
  },
  quiz: {
    title: 'Free Identity Gap Quiz | Tamkinly — Return to Your Center',
    titleAr: 'اختبار فجوة الهوية المجاني | تمكينلي — عد إلى مركزك',
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
  'free-tool': {
    title: 'Free Identity Gap Assessment | Tamkinly — Return to Your Center',
    titleAr: 'اكتشف فجوة هويتك مجاناً | تمكينلي — عد إلى مركزك',
    description: 'Our free 3-minute identity gap assessment. No credit card required — instant personalized results that show what is holding you back. Plus more free tools.',
    descriptionAr: 'تقييم فجوة الهوية المجاني في 3 دقائق. بدون بطاقة ائتمان — نتائج شخصية فورية تكشف ما يعيقك، مع المزيد من الأدوات المجانية.',
    path: '/free-tool',
    keywords: [
      'free identity tool',
      'free assessment',
      'identity gap quiz free',
      'free self-discovery tool',
      'أداة مجانية',
      'اختبار مجاني',
      'فجوة الهوية مجاناً',
      'أدوات التطوير المجانية',
    ],
  },
  about: {
    title: 'About Tamkinly — Mission & Philosophy | Return to Your Center',
    titleAr: 'عن تمكينلي — مهمتنا وفلسفتنا | عد إلى مركزك',
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
    title: 'Contact & Support | Tamkinly — Return to Your Center',
    titleAr: 'تواصل معنا والدعم | تمكينلي — عد إلى مركزك',
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
    title: 'Blog — Research-Backed Insights | Return to Your Center',
    titleAr: 'المدونة — رؤى مبنية على الأبحاث | تمكينلي — عد إلى مركزك',
    description: 'Research-backed insights, practical frameworks, and transformation tools. Articles on identity transformation, identity recode, and personal development.',
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
    title: 'Methodology | Tamkinly — Return to Your Center',
    titleAr: 'المنهجية | تمكينلي — عد إلى مركزك',
    description: 'Our methodology combines neuroscience, psychology, and practical frameworks for lasting identity transformation, grounded in CBT research.',
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
    title: 'FAQ | Tamkinly — Return to Your Center',
    titleAr: 'الأسئلة الشائعة | تمكينلي — عد إلى مركزك',
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
  recovery: {
    title: 'Recovery Hub | Tamkinly — Return to Your Center',
    titleAr: 'مركز التعافي | تمكينلي — عد إلى مركزك',
    description: 'Evidence-based recovery tools and programs. Choose your path — Trauma Recovery Center (TRC) or behavioral recovery journey. Free, private, and judgment-free.',
    descriptionAr: 'أدوات وبرامج تعافي قائمة على الأدلة. اختر مسارك — مركز التعافي من الصدمات (TRC) أو رحلة التعافي السلوكي. مجاني وخاص وبدون حكم.',
    path: '/recovery',
    keywords: [
      'recovery tools', 'trauma recovery', 'behavioral recovery',
      'grounding techniques', 'breathing exercises', 'body scan',
      'أدوات التعافي', 'التعافي من الصدمات', 'التعافي السلوكي',
      'تقنيات التأريض', 'تمارين التنفس', 'فحص الجسم',
    ],
  },
  'recovery-trc': {
    title: 'Trauma Recovery Center (TRC) | Tamkinly — Return to Your Center',
    titleAr: 'مركز التعافي من الصدمات (TRC) | تمكينلي — عد إلى مركزك',
    description: 'Evidence-based trauma recovery tools — grounding, breathing, body scan, safe place visualization, and therapeutic worksheets. Start your healing journey today.',
    descriptionAr: 'أدوات تعافي من الصدمات قائمة على الأدلة — التأريض، التنفس، فحص الجسم، تصور المكان الآمن، وأوراق العمل العلاجية. ابدأ رحلة الشفاء اليوم.',
    path: '/recovery/trc',
    keywords: [
      'trauma recovery center', 'TRC tools', 'grounding exercise',
      'breathing technique', 'body scan', 'safe place', 'trigger mapping',
      'safety plan', 'مركز تعافي الصدمات', 'أدوات TRC', 'تمرين التأريض',
      'تقنية التنفس', 'فحص الجسم', 'المكان الآمن', 'خريطة المحفزات',
    ],
  },
  'recovery-porn-recovery': {
    title: 'Recovery Journey | Tamkinly — Return to Your Center',
    titleAr: 'رحلة التعافي | تمكينلي — عد إلى مركزك',
    description: 'A free, evidence-based recovery journey. Understand the behavioral loop, build practical tools (HALT, Trigger Journal, Emergency Plan) — without self-blame.',
    descriptionAr: 'رحلة تعافي مجانية وقائمة على الأدلة. افهم الحلقة السلوكية، وابنِ أدوات عملية (HALT، يومية المحفزات، خطة الطوارئ)، وكن الشخص الذي تريد أن تكون — بدون لوم الذات.',
    path: '/recovery/porn-recovery',
    keywords: [
      'recovery journey', 'behavior change', 'compulsive behavior recovery',
      'HALT check', 'trigger journal', 'relapse recovery',
      'identity transformation', 'self-help tools', 'recovery framework',
      'رحلة التعافي', 'تغيير السلوك', 'التعافي من السلوك القهري',
    ],
  },
  guides: {
    title: 'Guides | Tamkinly — Return to Your Center',
    titleAr: 'الأدلة الإرشادية | تمكينلي — عد إلى مركزك',
    description: 'Step-by-step guides for identity transformation, habit formation, and personal development. Research-backed frameworks you can apply today.',
    descriptionAr: 'أدلة إرشادية خطوة بخطوة لتحويل الهوية وتكوين العادات والتطوير الشخصي. أطر مبنية على الأبحاث يمكنك تطبيقها اليوم.',
    path: '/guides',
    keywords: [
      'transformation guides', 'self-improvement guides', 'habit formation guide',
      'identity change framework', 'personal development steps',
      'أدلة التحول', 'أدلة تحسين الذات', 'دليل تكوين العادات',
    ],
  },
  privacy: {
    title: 'Privacy Policy | Tamkinly — Return to Your Center',
    titleAr: 'سياسة الخصوصية | تمكينلي — عد إلى مركزك',
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
    title: 'Terms of Service | Tamkinly — Return to Your Center',
    titleAr: 'شروط الخدمة | تمكينلي — عد إلى مركزك',
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
    title: 'Refund Policy — 30-Day Guarantee | Return to Your Center',
    titleAr: 'سياسة الاسترداد — ضمان 30 يوماً | عد إلى مركزك',
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
    title: 'Shopping Cart | Tamkinly — Return to Your Center',
    titleAr: 'سلة التسوق | تمكينلي — عد إلى مركزك',
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
    title: 'My Account | Tamkinly — Return to Your Center',
    titleAr: 'حسابي | تمكينلي — عد إلى مركزك',
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
    title: 'Free Resources | Tamkinly — Return to Your Center',
    titleAr: 'موارد مجانية | تمكينلي — عد إلى مركزك',
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
  checkout: {
    title: 'Secure Checkout | Tamkinly — Return to Your Center',
    titleAr: 'الدفع الآمن | تمكينلي — عد إلى مركزك',
    description: 'Complete your purchase securely. SSL-encrypted checkout for Tamkinly identity transformation products. Instant access after payment.',
    descriptionAr: 'أكمل عملية الشراء بأمان. دفع مشفر بتقنية SSL لمنتجات تحويل الهوية من تمكينلي. وصول فوري بعد الدفع.',
    path: '/checkout',
    keywords: ['checkout', 'secure payment', 'buy', 'purchase', 'الشراء', 'الدفع'],
    noIndex: true,
  },
  search: {
    title: 'Search | Tamkinly — Return to Your Center',
    titleAr: 'البحث | تمكينلي — عد إلى مركزك',
    description: 'Search Tamkinly for identity transformation tools, blog articles, apps, and resources. Find what you need to start your journey.',
    descriptionAr: 'ابحث في تمكينلي عن أدوات تحويل الهوية ومقالات المدونة والتطبيقات والموارد. اعثر على ما تحتاجه لبدء رحلتك.',
    path: '/search',
    keywords: ['search', 'find', 'tools', 'resources', 'البحث', 'أدوات'],
  },
  dashboard: {
    title: 'Dashboard | Tamkinly — Return to Your Center',
    titleAr: 'لوحة التحكم | تمكينلي — عد إلى مركزك',
    description: 'Track your identity transformation progress, manage your apps, and view your personalized insights.',
    descriptionAr: 'تتبع تقدم تحويل هويتك، وأدر تطبيقاتك، واعرض رؤاك المخصصة.',
    path: '/dashboard',
    keywords: ['dashboard', 'progress', 'tracking', 'لوحة التحكم', 'التقدم'],
    noIndex: true,
  },
  downloads: {
    title: 'Downloads | Tamkinly — Return to Your Center',
    titleAr: 'التنزيلات | تمكينلي — عد إلى مركزك',
    description: 'Access and download your purchased Tamkinly resources including worksheets, guides, and tools for identity transformation.',
    descriptionAr: 'الوصول وتنزيل موارد تمكينلي المشتراة بما في ذلك أوراق العمل والأدلة وأدوات تحويل الهوية.',
    path: '/downloads',
    keywords: ['downloads', 'resources', 'worksheets', 'PDF', 'التنزيلات', 'الموارد'],
    noIndex: true,
  },
};

// ============================================
// METADATA GENERATOR
// ============================================

/**
 * Generate comprehensive page metadata with unique canonical URLs and OpenGraph data
 */
export function generatePageMetadataFromConfig(pageKey: keyof typeof PAGE_METADATA, locale?: string): Metadata {
  const config = PAGE_METADATA[pageKey];
  if (!config) {
    console.warn(`Page metadata not found for key: ${pageKey}`);
    return {};
  }

  const isAr = locale === 'ar';
  const title = isAr ? config.titleAr : config.title;
  const description = isAr ? config.descriptionAr : config.description;
  const siteName = isAr ? SEO_SITE_CONFIG.nameAr : SEO_SITE_CONFIG.name;
  const basePath = isAr ? ('/ar' + config.path) : config.path;
  const fullUrl = `${SEO_SITE_CONFIG.url}${basePath}`;
  const imageUrl = config.image 
    ? `${SEO_SITE_CONFIG.url}${config.image}` 
    : `${SEO_SITE_CONFIG.url}${config.path === '/' ? '/opengraph-image' : config.path + '/opengraph-image'}`;

  return {
    title,
    description,
    keywords: config.keywords,
    
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': `${SEO_SITE_CONFIG.url}${config.path}`,
        'ar-SA': `${SEO_SITE_CONFIG.url}/ar${config.path}`,
        'x-default': `${SEO_SITE_CONFIG.url}${config.path}`,
      },
    },
    
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName,
      locale: isAr ? 'ar_SA' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_SA',
      type: config.type || 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      // Video SEO — approved identity reel in homepage hero (2026-11-06)
      ...(pageKey === 'home' ? { videos: [{ url: `${SEO_SITE_CONFIG.url}/videos/identity_reel.mp4`, width: 1920, height: 1080, type: 'video/mp4' }] } : {}),
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: SEO_SITE_CONFIG.twitterHandle,
      creator: SEO_SITE_CONFIG.twitterHandle,
      images: [imageUrl],
    },
    
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
    
    other: {
      'language': isAr ? 'ar' : 'en',
      'application-name': siteName,
      'DC.description': description,
      'DC.subject': config.keywords.slice(0, 3).join(', '),
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
export const CHECKOUT_METADATA = generatePageMetadataFromConfig('checkout');
export const SEARCH_METADATA = generatePageMetadataFromConfig('search');
export const DASHBOARD_METADATA = generatePageMetadataFromConfig('dashboard');
export const DOWNLOADS_METADATA = generatePageMetadataFromConfig('downloads');

// ============================================
// DYNAMIC METADATA GENERATORS
// ============================================

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
          url: image ? `${SEO_SITE_CONFIG.url}${image}` : `${SEO_SITE_CONFIG.url}/og-image.webp`,
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
          url: `${SEO_SITE_CONFIG.url}/og-image.webp`,
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