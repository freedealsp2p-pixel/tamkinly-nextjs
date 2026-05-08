/**
 * Blog Articles Data Configuration
 * Centralized metadata for all blog articles
 * Enables unique SEO for each article
 */

import type { Metadata } from 'next';

// ============================================
// TYPES
// ============================================

export interface BlogArticle {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  readTime: string;
  readTimeAr: string;
  featured: boolean;
  tier?: 'FREE' | 'BASIC' | 'BUNDLE';
  datePublished: string;
  dateModified: string;
  author: string;
  authorAr: string;
  keywords: string[];
  image?: string;
}

// ============================================
// ALL BLOG ARTICLES
// ============================================

export const BLOG_ARTICLES: BlogArticle[] = [
  // App Guides
  {
    slug: 'identity-gap-assessment',
    title: 'The Identity Gap Assessment: Discover What\'s Holding You Back',
    titleAr: 'تقييم فجوة الهوية: اكتشف ما يعيقك',
    description: 'Research-backed assessment revealing the gap between who you are and who you want to become. Free 3-minute quiz with personalized insights.',
    descriptionAr: 'تقييم مدعوم بالبحث يكشف الفجوة بين من أنت ومن تريد أن تصبح. اختبار مجاني لمدة 3 دقائق مع رؤى مخصصة.',
    category: 'FREE App',
    categoryAr: 'تطبيق مجاني',
    readTime: '8 min read',
    readTimeAr: '٨ دقائق قراءة',
    featured: true,
    tier: 'FREE',
    datePublished: '2026-02-01',
    dateModified: '2026-02-03',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['identity gap', 'identity assessment', 'self-discovery', 'free quiz', 'personal growth'],
  },
  {
    slug: 'values-clarification-tool',
    title: 'Values Clarification Tool: Find What Truly Matters',
    titleAr: 'أداة توضيح القيم: اكتشف ما يهم حقاً',
    description: 'Scientific method to discover your core values and align your life with what matters most. Based on ACT and positive psychology research.',
    descriptionAr: 'طريقة علمية لاكتشاف قيمك الأساسية ومحاذاة حياتك مع ما يهم أكثر. مبنية على أبحاث ACT وعلم النفس الإيجابي.',
    category: 'FREE App',
    categoryAr: 'تطبيق مجاني',
    readTime: '7 min read',
    readTimeAr: '٧ دقائق قراءة',
    featured: false,
    tier: 'FREE',
    datePublished: '2026-02-07',
    dateModified: '2026-02-09',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['values clarification', 'core values', 'ACT therapy', 'positive psychology', 'self-discovery'],
  },
  {
    slug: 'daily-reflection-practice',
    title: 'Daily Reflection Practice: The Science of Self-Transformation',
    titleAr: 'ممارسة التأمل اليومي: علم التحول الذاتي',
    description: 'Evidence-based journaling prompts that rewire neural pathways. 7 themes for consistent growth and identity evolution.',
    descriptionAr: 'محاورات كتابية مدعومة بالأدلة تعيد تشكيل المسارات العصبية. ٧ محاور للنمو المستمر وتطور الهوية.',
    category: 'FREE App',
    categoryAr: 'تطبيق مجاني',
    readTime: '7 min read',
    readTimeAr: '٧ دقائق قراءة',
    featured: false,
    tier: 'FREE',
    datePublished: '2026-02-14',
    dateModified: '2026-02-16',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['daily reflection', 'journaling', 'neural pathways', 'self-transformation', 'identity evolution'],
  },
  {
    slug: 'identity-recode-system-guide',
    title: 'Identity Recode System: Complete 30-Day Transformation',
    titleAr: 'نظام إعادة صياغة الهوية: تحول كامل في ٣٠ يوماً',
    description: 'Full identity transformation system with 6 interconnected components. Includes worksheets, trackers, and structured progression.',
    descriptionAr: 'نظام تحول الهوية الكامل مع ٦ مكونات مترابطة. يتضمن أوراق عمل ومتتبعات وتقدماً منظماً.',
    category: 'BASIC App',
    categoryAr: 'تطبيق أساسي',
    readTime: '9 min read',
    readTimeAr: '٩ دقائق قراءة',
    featured: true,
    tier: 'BASIC',
    datePublished: '2026-02-22',
    dateModified: '2026-02-25',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['identity recode', '30-day transformation', 'identity system', 'worksheets', 'transformation program'],
  },
  {
    slug: 'ai-identity-coach-guide',
    title: 'AI Identity Coach: Your Personal Transformation Guide',
    titleAr: 'مدرب الهوية بالذكاء الاصطناعي: دليلك الشخصي للتحول',
    description: '24/7 AI coaching powered by identity science. Personalized guidance for discovery, habits, self-authorship, and emotional regulation.',
    descriptionAr: 'تدريب بالذكاء الاصطناعي على مدار الساعة مدعوم بعلم الهوية. إرشاد مخصص للاكتشاف والعادات وتأليف الذات والتنظيم العاطفي.',
    category: 'BUNDLE App',
    categoryAr: 'تطبيق الحزمة',
    readTime: '8 min read',
    readTimeAr: '٨ دقائق قراءة',
    featured: true,
    tier: 'BUNDLE',
    datePublished: '2026-03-02',
    dateModified: '2026-03-05',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['AI coach', 'identity coaching', 'artificial intelligence', 'personal transformation', '24/7 coaching'],
  },

  // Worksheets
  {
    slug: 'who-am-i-worksheet',
    title: 'Who Am I Worksheet: The Complete Identity Exploration',
    titleAr: 'ورقة عمل من أنا: الاستكشاف الكامل للهوية',
    description: 'Deep dive into self-concept clarity with research-backed questions. Explore personal, social, and possible selves dimensions.',
    descriptionAr: 'غوص عميق في وضوح المفهوم الذاتي مع أسئلة مدعومة بالبحث. استكشف أبعاد الذات الشخصية والاجتماعية والممكنة.',
    category: 'Worksheet',
    categoryAr: 'ورقة عمل',
    readTime: '10 min read',
    readTimeAr: '١٠ دقائق قراءة',
    featured: false,
    datePublished: '2026-03-10',
    dateModified: '2026-03-12',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['who am i', 'identity worksheet', 'self-concept', 'identity exploration', 'personal identity'],
  },
  {
    slug: 'identity-based-habits-worksheet',
    title: 'Identity-Based Habits Worksheet: James Clear\'s Method',
    titleAr: 'ورقة عمل العادات المبنية على الهوية: طريقة جيمس كلير',
    description: 'Transform behaviors by changing who you believe you are. The three layers of habit change that create lasting transformation.',
    descriptionAr: 'حوّل سلوكياتك بتغيير من تعتقد أنك عليه. الطبقات الثلاث لتغيير العادات التي تخلق تحولاً دائماً.',
    category: 'Worksheet',
    categoryAr: 'ورقة عمل',
    readTime: '9 min read',
    readTimeAr: '٩ دقائق قراءة',
    featured: true,
    datePublished: '2026-03-18',
    dateModified: '2026-03-20',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['identity-based habits', 'james clear', 'atomic habits', 'habit change', 'behavior transformation'],
  },
  {
    slug: 'self-authorship-worksheet',
    title: 'Self-Authorship Worksheet: Your Internal Voice Journey',
    titleAr: 'ورقة عمل تأليف الذات: رحلة صوتك الداخلي',
    description: 'Based on Baxter Magolda\'s research. Move from external formulas to internally-defined identity through structured reflection.',
    descriptionAr: 'مبني على أبحاث باكستر ماغولدا. انتقل من الصيغ الخارجية إلى الهوية المحددة داخلياً من خلال التأمل المنظم.',
    category: 'Worksheet',
    categoryAr: 'ورقة عمل',
    readTime: '8 min read',
    readTimeAr: '٨ دقائق قراءة',
    featured: false,
    datePublished: '2026-03-26',
    dateModified: '2026-03-28',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['self-authorship', 'internal voice', 'baxter magolda', 'identity development', 'internal identity'],
  },
  {
    slug: 'identity-baseline-8d-worksheet',
    title: 'Identity Baseline 8D: Holistic Self-Assessment',
    titleAr: 'خط الأساس 8D للهوية: تقييم ذاتي شامل',
    description: 'Eight dimensions of identity: Physical, Intellectual, Emotional, Social, Occupational, Spiritual, Financial, Environmental.',
    descriptionAr: 'ثمانية أبعاد للهوية: الجسدية، الفكرية، العاطفية، الاجتماعية، المهنية، الروحية، المالية، البيئية.',
    category: 'Worksheet',
    categoryAr: 'ورقة عمل',
    readTime: '7 min read',
    readTimeAr: '٧ دقائق قراءة',
    featured: false,
    datePublished: '2026-04-04',
    dateModified: '2026-04-06',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['identity baseline', '8 dimensions', 'self-assessment', 'holistic identity', 'life dimensions'],
  },
  {
    slug: 'environmental-audit-worksheet',
    title: 'Environmental Audit Worksheet: Design Your Growth Space',
    titleAr: 'ورقة عمل التدقيق البيئي: صمم مساحة نموك',
    description: 'Your environment shapes your identity. Audit physical, social, and digital environments for transformation success.',
    descriptionAr: 'بيئتك تشكل هويتك. راجع البيئات الجسدية والاجتماعية والرقمية لنجاح التحول.',
    category: 'Worksheet',
    categoryAr: 'ورقة عمل',
    readTime: '8 min read',
    readTimeAr: '٨ دقائق قراءة',
    featured: false,
    datePublished: '2026-04-11',
    dateModified: '2026-04-13',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['environmental audit', 'environment design', 'growth space', 'digital environment', 'physical environment'],
  },
  {
    slug: 'erq-emotional-regulation-worksheet',
    title: 'ERQ Emotional Regulation: Master Your Inner World',
    titleAr: 'التنظيم العاطفي ERQ: أتقن عالمك الداخلي',
    description: 'Based on Gross & John\'s research. Cognitive reappraisal vs. suppression—the science of emotional intelligence.',
    descriptionAr: 'مبني على أبحاث غروس وجون. إعادة التقييم المعرفي مقابل الكبت — علم الذكاء العاطفي.',
    category: 'Worksheet',
    categoryAr: 'ورقة عمل',
    readTime: '8 min read',
    readTimeAr: '٨ دقائق قراءة',
    featured: false,
    datePublished: '2026-04-19',
    dateModified: '2026-04-21',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['ERQ', 'emotional regulation', 'cognitive reappraisal', 'emotional intelligence', 'gross john'],
  },

  // Philosophy Articles
  {
    slug: 'physics-of-momentum',
    title: 'The Physics of Momentum: Why 18 Minutes Changes Everything',
    titleAr: 'فيزياء الزخم: لماذا تغير ١٨ دقيقة كل شيء',
    description: 'Discover how the science of momentum and habit formation can transform your identity in just 18 minutes a day.',
    descriptionAr: 'اكتشف كيف يمكن لعلم الزخم وتكوين العادات أن يحوّل هويتك في ١٨ دقيقة فقط يومياً.',
    category: 'Identity Shift',
    categoryAr: 'تحول الهوية',
    readTime: '8 min read',
    readTimeAr: '٨ دقائق قراءة',
    featured: true,
    datePublished: '2026-04-27',
    dateModified: '2026-04-29',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['momentum', '18 minutes', 'habit formation', 'identity transformation', 'consistency'],
  },
  {
    slug: 'magic-in-work-you-avoid',
    title: 'The Magic Is in the Work You Avoid',
    titleAr: 'السحر في العمل الذي تتجنبه',
    description: 'That uncomfortable task you keep putting off? It holds the key to your transformation.',
    descriptionAr: 'تلك المهمة غير المريحة التي تؤجلها دائماً؟ إنها تمتلك مفتاح تحولك.',
    category: 'Transformation',
    categoryAr: 'التحول',
    readTime: '6 min read',
    readTimeAr: '٦ دقائق قراءة',
    featured: false,
    datePublished: '2026-05-06',
    dateModified: '2026-05-08',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['avoidance', 'transformation', 'comfort zone', 'growth work', 'personal development'],
  },
  {
    slug: 'identity-millionaire',
    title: 'The Identity Millionaire: Building Wealth Through Self-Transformation',
    titleAr: 'المليونير الهوية: بناء الثروة من خلال التحول الذاتي',
    description: 'True wealth starts with who you become, not what you acquire. The three stages of identity-based success.',
    descriptionAr: 'الثروة الحقيقية تبدأ بمن تصبح، لا بما تكتسبه. المراحل الثلاث للنجاح المبني على الهوية.',
    category: 'Wealth & Identity',
    categoryAr: 'الثروة والهوية',
    readTime: '9 min read',
    readTimeAr: '٩ دقائق قراءة',
    featured: true,
    datePublished: '2026-05-15',
    dateModified: '2026-05-17',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['wealth', 'identity millionaire', 'success mindset', 'self-transformation', 'financial success'],
  },
  {
    slug: 'all-in-or-nothing',
    title: 'All In or Nothing: The Power of Full Commitment',
    titleAr: 'كل شيء أو لا شيء: قوة الالتزام الكامل',
    description: 'Half-effort leaves you uncertain. Full commitment gives you clarity—even when you fail.',
    descriptionAr: 'الجهد الناقف يتركك غير متأكد. الالتزام الكامل يمنحك الوضوح — حتى عندما تفشل.',
    category: 'Commitment',
    categoryAr: 'الالتزام',
    readTime: '7 min read',
    readTimeAr: '٧ دقائق قراءة',
    featured: false,
    datePublished: '2026-05-24',
    dateModified: '2026-05-26',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['commitment', 'all in', 'full dedication', 'clarity', 'decision making'],
  },
  {
    slug: 'five-steps-to-miracles',
    title: 'Five Steps to Miracles: A Framework for Identity Liberation',
    titleAr: 'خمس خطوات نحو المعجزات: إطار لتحرير الهوية',
    description: 'Surrender the old versions of yourself. Step into who you were meant to be.',
    descriptionAr: 'تخلى عن النسخ القديمة من نفسك. ادخل في من كنت مقدراً أن تكونه.',
    category: 'Self-Liberation',
    categoryAr: 'التحرر الذاتي',
    readTime: '10 min read',
    readTimeAr: '١٠ دقائق قراءة',
    featured: true,
    datePublished: '2026-06-03',
    dateModified: '2026-06-05',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['miracles', 'identity liberation', 'transformation framework', 'self-surrender', 'personal rebirth'],
  },
  {
    slug: 'inversion-thinking',
    title: 'Inversion Thinking: How to Win by Avoiding Failure',
    titleAr: 'التفكير العكسي: كيف تفوز بتجنب الفشل',
    description: 'Charlie Munger\'s counterintuitive approach to success: ask how to lose, then don\'t do that.',
    descriptionAr: 'نهج تشارلي منجر غير البديهي للنجاح: اسأل كيف تخسر، ثم لا تفعل ذلك.',
    category: 'Strategy',
    categoryAr: 'الاستراتيجية',
    readTime: '8 min read',
    readTimeAr: '٨ دقائق قراءة',
    featured: false,
    datePublished: '2026-06-12',
    dateModified: '2026-06-14',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['inversion thinking', 'charlie munger', 'strategic thinking', 'problem solving', 'success strategy'],
  },
  {
    slug: 'speed-as-strategy',
    title: 'Speed as Strategy: The Execution Edge',
    titleAr: 'السرعة كاستراتيجية: ميزة التنفيذ',
    description: 'The gap between idea and reality is where power lives. Execute faster than everyone else.',
    descriptionAr: 'الفجوة بين الفكرة والواقع هي حيث تعيش القوة. نفّذ أسرع من الجميع.',
    category: 'Execution',
    categoryAr: 'التنفيذ',
    readTime: '7 min read',
    readTimeAr: '٧ دقائق قراءة',
    featured: false,
    datePublished: '2026-06-21',
    dateModified: '2026-06-23',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['speed', 'execution', 'strategy', 'implementation', 'action taking'],
  },
  {
    slug: 'ten-minute-block-system',
    title: 'The 10-Minute Block System: Breaking Through Every Obstacle',
    titleAr: 'نظام الكتل العشر دقائق: اختراق كل عقبة',
    description: 'From paralysis to progress in just 10 minutes. A practical system for overcoming resistance.',
    descriptionAr: 'من الشلل إلى التقدم في ١٠ دقائق فقط. نظام عملي للتغلب على المقاومة.',
    category: 'Productivity',
    categoryAr: 'الإنتاجية',
    readTime: '9 min read',
    readTimeAr: '٩ دقائق قراءة',
    featured: false,
    datePublished: '2026-07-01',
    dateModified: '2026-07-03',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['10 minute block', 'productivity system', 'overcoming resistance', 'time blocking', 'progress'],
  },
  {
    slug: 'work-on-yourself',
    title: 'Work on Yourself: The Psycho-Cybernetics of Identity',
    titleAr: 'اعمل على نفسك: السايبرنيتيكا النفسية للهوية',
    description: 'Your self-image controls everything. Change the inner image, change everything.',
    descriptionAr: 'صورتك الذاتية تتحكم في كل شيء. غيّر الصورة الداخلية، غيّر كل شيء.',
    category: 'Self-Image',
    categoryAr: 'الصورة الذاتية',
    readTime: '10 min read',
    readTimeAr: '١٠ دقائق قراءة',
    featured: true,
    datePublished: '2026-07-10',
    dateModified: '2026-07-12',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['psycho-cybernetics', 'self-image', 'maxwell maltz', 'inner image', 'identity change'],
  },
  {
    slug: 'becoming-exceptional',
    title: 'Becoming Exceptional: Why Ordinary Can Never Build Legacy',
    titleAr: 'التحول لاستثنائي: لماذا لا يمكن للعادي بناء إرث',
    description: 'You cannot be exceptional while living an ordinary life. The courage to embrace what makes you different.',
    descriptionAr: 'لا يمكنك أن تكون استثنائياً بينما تعيش حياة عادية. الشجاعة لاحتضان ما يجعلك مختلفاً.',
    category: 'Excellence',
    categoryAr: 'التميز',
    readTime: '8 min read',
    readTimeAr: '٨ دقائق قراءة',
    featured: false,
    datePublished: '2026-07-19',
    dateModified: '2026-07-21',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['exceptional', 'excellence', 'legacy', 'extraordinary life', 'personal greatness'],
  },
  {
    slug: 'dopamine-reset',
    title: 'The 24-Hour Dopamine Reset: Reclaiming Your Focus',
    titleAr: 'إعادة ضبط الدوبامين في ٢٤ ساعة: استعد تركيزك',
    description: 'Reset your motivation system in just one day and rediscover natural drive.',
    descriptionAr: 'أعد ضبط نظام التحفيز في يوم واحد فقط واكتشف الدافع الطبيعي من جديد.',
    category: 'Mental Clarity',
    categoryAr: 'الوضوح الذهني',
    readTime: '12 min read',
    readTimeAr: '١٢ دقيقة قراءة',
    featured: true,
    datePublished: '2026-07-28',
    dateModified: '2026-07-30',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['dopamine reset', 'mental clarity', 'focus', 'motivation', 'brain reset'],
  },
  {
    slug: 'and-the-bamboo-kept-growing',
    title: 'And the Bamboo Kept Growing: Why Your Invisible Work Matters',
    titleAr: 'والخيزران استمر بالنمو: لماذا يهم عملك غير المرئي',
    description: 'The Chinese bamboo tree grows nothing for five years then explodes 90 feet in six weeks. Your identity transformation follows the same law. Here is why the work you cannot see is the work that changes everything.',
    descriptionAr: 'شجرة الخيزران الصينية لا تنمو شيئا لخمس سنوات ثم تنفجر 90 قدما في ستة أسابيع. تحول هويتك يتبع نفس القانون.',
    category: 'Identity Shift',
    categoryAr: 'تحول الهوية',
    readTime: '9 min read',
    readTimeAr: '٩ دقائق قراءة',
    featured: true,
    datePublished: '2026-05-09',
    dateModified: '2026-05-09',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['bamboo tree', 'patience', 'identity transformation', 'invisible work', 'roots before growth', 'consistency', 'delayed results'],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get article by slug
 */
export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find(article => article.slug === slug);
}

/**
 * Get all article slugs for static generation
 */
export function getAllBlogArticleSlugs(): string[] {
  return BLOG_ARTICLES.map(article => article.slug);
}

/**
 * Generate metadata for a blog article
 */
export function generateBlogArticleMetadata(slug: string): Metadata {
  const article = getBlogArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found | Tamkinly Blog',
      description: 'The requested article could not be found.',
    };
  }
  
  const fullUrl = `https://tamkinly.com/blog/${article.slug}`;
  const imageUrl = article.image 
    ? `https://tamkinly.com${article.image}` 
    : 'https://tamkinly.com/og-image.webp';
  
  return {
    title: `${article.title} | Tamkinly Blog`,
    description: article.description,
    keywords: article.keywords,
    
    alternates: {
      canonical: fullUrl,
    },
    
    openGraph: {
      title: article.title,
      description: article.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      type: 'article',
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      site: '@tamkinly',
      images: [imageUrl],
    },
    
    other: {
      'article:published_time': article.datePublished,
      'article:modified_time': article.dateModified,
      'article:author': article.author,
      'article:section': article.category,
    },
  };
}

/**
 * Get featured articles
 */
export function getFeaturedArticles(): BlogArticle[] {
  return BLOG_ARTICLES.filter(article => article.featured);
}

/**
 * Get articles by category
 */
export function getArticlesByCategory(category: string): BlogArticle[] {
  return BLOG_ARTICLES.filter(article => 
    article.category.toLowerCase().includes(category.toLowerCase())
  );
}

/**
 * Get articles by tier
 */
export function getArticlesByTier(tier: 'FREE' | 'BASIC' | 'BUNDLE'): BlogArticle[] {
  return BLOG_ARTICLES.filter(article => article.tier === tier);
}

// ============================================
// BLOG CATEGORIES
// ============================================

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  descriptionAr: string;
  subCategories: string[];
  icon: string;
  color: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'app-guides',
    name: 'App Guides',
    description: 'Comprehensive guides for Tamkinly\'s identity transformation tools. Learn how to use each app effectively for maximum personal growth.',
    descriptionAr: 'أدلة شاملة لأدوات تحويل الهوية في تمكنلي. تعلم كيفية استخدام كل تطبيق بفعالية لأقصى نمو شخصي.',
    subCategories: ['FREE App', 'BASIC App', 'BUNDLE App'],
    icon: 'Smartphone',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    slug: 'worksheets',
    name: 'Worksheets',
    description: 'Research-backed worksheets for deep self-exploration. Printable tools based on psychology and identity science.',
    descriptionAr: 'أوراق عمل مدعومة بالبحث للاستكشاف الذاتي العميق. أدوات قابلة للطباعة مبنية على علم النفس وعلم الهوية.',
    subCategories: ['Worksheet'],
    icon: 'FileText',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    slug: 'identity-transformation',
    name: 'Identity & Transformation',
    description: 'Deep dives into identity shift, personal transformation, and self-liberation. Science-backed insights for becoming who you want to be.',
    descriptionAr: 'استكشافات عميقة في تحول الهوية والتحول الشخصي والتحرر الذاتي. رؤى مدعومة بالعلم لتصبح من تريد.',
    subCategories: ['Identity Shift', 'Transformation', 'Self-Liberation'],
    icon: 'Sparkles',
    color: 'from-purple-500 to-violet-600',
  },
  {
    slug: 'mindset-strategy',
    name: 'Mindset & Strategy',
    description: 'Strategic thinking, commitment frameworks, and wealth-building through identity. Practical strategies for exceptional living.',
    descriptionAr: 'التفكير الاستراتيجي وأطر الالتزام وبناء الثروة من خلال الهوية. استراتيجيات عملية لحياة استثنائية.',
    subCategories: ['Wealth & Identity', 'Commitment', 'Strategy', 'Execution'],
    icon: 'Brain',
    color: 'from-amber-500 to-orange-600',
  },
  {
    slug: 'productivity-growth',
    name: 'Productivity & Growth',
    description: 'Productivity systems, mental clarity techniques, and excellence frameworks. Practical tools for daily improvement.',
    descriptionAr: 'أنظمة الإنتاجية وتقنيات الوضوح الذهني وأطر التميز. أدوات عملية للتحسن اليومي.',
    subCategories: ['Productivity', 'Excellence', 'Mental Clarity'],
    icon: 'TrendingUp',
    color: 'from-rose-500 to-pink-600',
  },
];

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find(cat => cat.slug === slug);
}

/**
 * Get all category slugs for static generation
 */
export function getAllCategorySlugs(): string[] {
  return BLOG_CATEGORIES.map(cat => cat.slug);
}

/**
 * Get articles for a category (matching sub-categories)
 */
export function getArticlesForCategory(categorySlug: string): BlogArticle[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  return BLOG_ARTICLES.filter(article =>
    category.subCategories.some(sub => article.category === sub)
  );
}
