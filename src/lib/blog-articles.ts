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
  tier?: 'FREE' | 'BASIC' | 'MASTERY';
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
    category: 'MASTERY App',
    categoryAr: 'تطبيق الحزمة',
    readTime: '8 min read',
    readTimeAr: '٨ دقائق قراءة',
    featured: true,
    tier: 'MASTERY',
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
    keywords: ['identity-based habits', 'james clear', 'identity-based transformation', 'habit change', 'behavior transformation'],
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
    titleAr: 'مليونير الهوية: بناء الثروة من خلال التحول الذاتي',
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
    description: 'The Chinese bamboo tree grows nothing for five years, then explodes 90 feet in six weeks. Your identity transformation follows the same law of invisible growth.',
    descriptionAr: 'شجرة الخيزران الصينية لا تنمو شيئاً لخمس سنوات ثم تنفجر ٩٠ قدماً في ستة أسابيع. تحول هويتك يتبع نفس القانون.',
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
  {
    slug: 'automatic-change',
    title: 'Automatic Change: How to Outsmart Your Brain and Make Positive Habits Stick',
    titleAr: 'التغيير التلقائي: كيف تجعل عاداتك الإيجابية تلقائية',
    description: 'Your brain is a prediction engine. The real secret to automatic change is understanding the predictive language of your nervous system — not willpower.',
    descriptionAr: 'دماغك محرك تنبؤ. المماطلة ليست كسلا. الإرادة ليست الجواب. السر الحقيقي في فهم اللغة التنبؤية لجهازك العصبي.',
    category: 'Identity Shift',
    categoryAr: 'تحول الهوية',
    readTime: '10 min read',
    readTimeAr: '١٠ دقائق قراءة',
    featured: true,
    datePublished: '2026-05-09',
    dateModified: '2026-05-09',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['automatic change', 'prediction error', 'habits', 'neuroplasticity', 'basal ganglia', 'procrastination'],
  },
  {
    slug: 'physics-of-consciousness',
    title: 'The Physics of Consciousness: How Repetition Rewrites Your Identity',
    titleAr: 'فيزياء الوعي: كيف يعيد التكرار كتابة هويتك',
    description: 'Reality happens within you. Your brain uses repetition to pave the neural pathways that define your identity — shift from victim to engineer.',
    descriptionAr: 'الواقع لا يحدث لك. يحدث داخلك. دماغك يستخدم التكرار لرصف المسارات العصبية التي تحدد هويتك.',
    category: 'Identity Shift',
    categoryAr: 'تحول الهوية',
    readTime: '11 min read',
    readTimeAr: '١١ دقيقة قراءة',
    featured: false,
    datePublished: '2026-05-09',
    dateModified: '2026-05-09',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['consciousness', 'neuroplasticity', 'repetition', 'identity reconstruction', 'metacognition'],
  },
  {
    slug: 'redefining-discipline',
    title: 'Redefining Discipline: The Highest Form of Self-Love',
    titleAr: 'إعادة تعريف الانضباط: أعلى أشكال حب الذات',
    description: 'Discipline is not punishment. It is not a cage. It is the highest form of self-love. The six pillars of growth and the path from effort to automatic identity.',
    descriptionAr: 'الانضباط ليس عقابا. ليس قفصا. هو أعلى أشكال حب الذات. الأعمدة الستة للنمو والطريق من الجهد إلى الهوية التلقائية.',
    category: 'Commitment',
    categoryAr: 'الالتزام',
    readTime: '10 min read',
    readTimeAr: '١٠ دقائق قراءة',
    featured: true,
    datePublished: '2026-05-09',
    dateModified: '2026-05-09',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['discipline', 'self-love', 'habits', 'identity', 'six pillars', 'consistency'],
  },
  {
    slug: 'vagus-nerve-breathing',
    title: 'The Vagus Nerve Protocol: How 4-2-8-2 Breathing Rewires Your Stress Response',
    titleAr: 'بروتوكول العصب المبهم: تنفس 4-2-8-2 ضد التوتر',
    description: 'The Vagus Nerve is your master safety switch. The 4-2-8-2 breathing technique uses biomechanics to send immediate neural signals demanding calm.',
    descriptionAr: 'العصب المبهم هو مفتاح الأمان الرئيسي الذي يحكم الانتقال من القتال أو الهرب إلى الراحة والهضم.',
    category: 'Mental Clarity',
    categoryAr: 'الوضوح الذهني',
    readTime: '10 min read',
    readTimeAr: '١٠ دقائق قراءة',
    featured: false,
    datePublished: '2026-05-09',
    dateModified: '2026-05-09',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['vagus nerve', '4-2-8-2 breathing', 'stress response', 'parasympathetic', 'HRV'],
  },

  // High-Volume SEO Articles
  {
    slug: 'how-to-build-habits-that-stick',
    title: 'How to Build Habits That Stick: The Science of Identity-Based Habit Formation',
    titleAr: 'كيف تبني عادات تستمر: علم تكوين العادات المبنية على الهوية',
    description: 'Stop relying on willpower. Learn the science-backed identity-based approach to building habits that become automatic — not forced.',
    descriptionAr: 'توقف عن الاعتماد على الإرادة. تعلم النهج المبني على الهوية المدعوم بالعلم لبناء عادات تصبح تلقائية — ليست مفروضة. مبني على أبحاث المرونة العصبية وإطار العادات المبنية على الهوية.',
    category: 'Habit Formation',
    categoryAr: 'تكوين العادات',
    readTime: '11 min read',
    readTimeAr: '١١ دقيقة قراءة',
    featured: true,
    datePublished: '2026-03-05',
    dateModified: '2026-03-05',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['build habits that stick', 'habit formation', 'identity-based habits', 'science of habits', 'how to build habits', 'lasting habits', 'habit loop'],
  },
  {
    slug: 'morning-routine-identity',
    title: 'Morning Routine for Self Improvement: Why Identity-Based Routines Actually Work',
    titleAr: 'روتين الصباح المبني على الهوية: لماذا يعمل فعلاً',
    description: 'Most morning routines fail because they are built on behavior, not identity. Learn why identity-based routines create lasting change.',
    descriptionAr: 'معظم الروتينات الصباحية تفشل لأنها مبنية على السلوك، لا الهوية. تعرف لماذا تخلق الروتينات الصباحية المبنية على الهوية تغييراً دائماً وكيف تصمم واحدة تصبح من أنت.',
    category: 'Daily Practice',
    categoryAr: 'الممارسة اليومية',
    readTime: '10 min read',
    readTimeAr: '١٠ دقائق قراءة',
    featured: false,
    datePublished: '2026-03-12',
    dateModified: '2026-03-12',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['morning routine for self improvement', 'morning routine', 'identity-based routine', 'self improvement morning', 'productive morning', 'morning habits', 'daily practice'],
  },
  {
    slug: 'stop-procrastinating-identity-shift',
    title: 'How to Stop Procrastinating: The Identity Shift That Changes Everything',
    titleAr: 'كيف تتوقف عن المماطلة: تحول الهوية الذي يغير كل شيء',
    description: 'Procrastination is not a time management problem — it is an identity problem. Learn why identity-based approaches work when everything else fails.',
    descriptionAr: 'المماطلة ليست مشكلة إدارة وقت — إنها مشكلة هوية. تعرف لماذا تعمل النهج المبنية على الهوية للتغلب على المماطلة عندما تفشل كل شيء آخر.',
    category: 'Identity Shift',
    categoryAr: 'تحول الهوية',
    readTime: '12 min read',
    readTimeAr: '١٢ دقيقة قراءة',
    featured: true,
    datePublished: '2026-03-20',
    dateModified: '2026-03-20',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['how to stop procrastinating', 'stop procrastinating', 'identity shift', 'overcome procrastination', 'procrastination solution', 'identity-based change', 'procrastination identity'],
  },
  {
    slug: 'self-discipline-science',
    title: 'Self-Discipline Tips That Actually Work: The Science of Identity Recode',
    titleAr: 'نصائح الانضباط الذاتي التي تعمل فعلاً: علم إعادة صياغة الهوية',
    description: 'Self discipline is not punishment or willpower — it is the highest form of self-love, made automatic through identity-based systems.',
    descriptionAr: 'الانضباط الذاتي ليس عقاباً أو إرادة — إنه أعلى أشكال حب الذات المعبر عنها من خلال الهوية. تعلم النهج المدعوم بالعلم للانضباط الذي يجعله تلقائياً، غير مفروض.',
    category: 'Commitment',
    categoryAr: 'الالتزام',
    readTime: '10 min read',
    readTimeAr: '١٠ دقائق قراءة',
    featured: false,
    datePublished: '2026-03-28',
    dateModified: '2026-03-28',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['self-discipline tips', 'self-discipline', 'discipline science', 'identity recode', 'how to be disciplined', 'discipline framework', 'lasting discipline'],
  },
  {
    slug: 'goal-setting-framework',
    title: 'Goal Setting Framework: Identity-Aligned Goals That Actually Work',
    titleAr: 'إطار تحديد الأهداف: أهداف متوافقة مع الهوية تعمل فعلاً',
    description: 'SMART goals and OKRs fail because they ignore identity. Learn the identity-aligned goal setting framework that creates goals you actually achieve.',
    descriptionAr: 'أهداف SMART وOKRs تفشل لأنها تتجاهل الهوية. تعلم إطار تحديد الأهداف المتوافقة مع الهوية الذي يخلق أهدافاً تحققها فعلاً — لأنها تعبيرات عمن تصبح.',
    category: 'Execution',
    categoryAr: 'التنفيذ',
    readTime: '11 min read',
    readTimeAr: '١١ دقيقة قراءة',
    featured: true,
    datePublished: '2026-04-05',
    dateModified: '2026-04-05',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['goal setting framework', 'identity-aligned goals', 'goal setting', 'how to set goals', 'goal achievement', 'identity goals', 'effective goal setting'],
  },

  // Arabic SEO Articles
  {
    slug: 'ar-tatweer-althat',
    title: 'Self Development: The Complete Guide to Changing Your Life from Within',
    titleAr: 'تطوير الذات: الدليل الشامل لتغيير حياتك من الداخل',
    description: 'The complete guide to identity-based self development: why most self-improvement attempts fail, and how to change your life from within.',
    descriptionAr: 'الدليل الشامل لتطوير الذات المبني على علم الهوية. اكتشف لماذا تفشل معظم محاولات التطوير وكيف تغير حياتك حقاً من الداخل عبر فهم الهوية وإعادة برمجتها.',
    category: 'تطوير الذات',
    categoryAr: 'تطوير الذات',
    readTime: '12 min read',
    readTimeAr: '١٢ دقيقة قراءة',
    featured: true,
    datePublished: '2026-03-01',
    dateModified: '2026-03-01',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['تطوير الذات', 'كيف أطور نفسي', 'تغيير حياتي للأفضل', 'بناء شخصية قوية', 'أدوات تطوير الذات', 'self development Arabic', 'تطوير النفس'],
  },
  {
    slug: 'ar-binaa-al3aadat',
    title: 'Building Habits: The Scientific Guide to Lasting Habits',
    titleAr: 'بناء العادات: الدليل العلمي لعادات راسخة تدوم',
    description: 'The scientific guide to building lasting habits: why new habits fail, and how to build identity-based habits instead of relying on willpower.',
    descriptionAr: 'الدليل العلمي لبناء عادات تدوم. اكتشف لماذا تفشل العادات الجديدة وكيف تبني عادات تعتمد على الهوية وليس الإرادة. مبني على أحدث أبحاث علم الأعصاب والسلوك.',
    category: 'بناء العادات',
    categoryAr: 'بناء العادات',
    readTime: '13 min read',
    readTimeAr: '١٣ دقيقة قراءة',
    featured: true,
    datePublished: '2026-03-08',
    dateModified: '2026-03-08',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['بناء العادات', 'كيف أكوّن عادة جديدة', 'التخلص من العادات السيئة', 'عادات الصباح', 'الاستمرارية في العادات', 'building habits Arabic', 'عادات يومية'],
  },
  {
    slug: 'ar-tahqeeq-alahdaf',
    title: "Goal Achievement: Why You Don't Achieve Your Goals and the Method That Works",
    titleAr: 'تحقيق الأهداف: لماذا لا تحقق أهدافك والطريقة التي تعمل فعلاً',
    description: 'Discover why traditional goal-setting fails, and how identity transformation — not persistence — is the real path to achieving your goals.',
    descriptionAr: 'اكتشف لماذا تفشل الطرق التقليدية لتحقيق الأهداف وكيف يعمل نهج الهوية المتوافقة. الدليل الشامل لتحقيق أهدافك من خلال تحول الهوية لا المثابرة.',
    category: 'تحقيق الأهداف',
    categoryAr: 'تحقيق الأهداف',
    readTime: '14 min read',
    readTimeAr: '١٤ دقيقة قراءة',
    featured: true,
    datePublished: '2026-03-15',
    dateModified: '2026-03-15',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['تحقيق الأهداف', 'كيف أحقق أهدافي', 'تحديد الأهداف الشخصية', 'خطة لتحقيق الأهداف', 'goal achievement Arabic', 'أهداف شخصية'],
  },
  {
    slug: 'ar-aldhibat-althati',
    title: "Self-Discipline: The Truth Nobody Tells You",
    titleAr: 'الانضباط الذاتي: الحقيقة التي لا يخبرك بها أحد',
    description: "Discover the truth about self-discipline. It's not punishment or suppression - it's the highest form of self-love. How to redefine discipline through identity transformation, not willpower.",
    descriptionAr: 'اكتشف الحقيقة عن الانضباط الذاتي. ليس عقاباً ولا كبتاً — بل أعلى أشكال حب الذات. كيف تعيد تعريف الانضباط من خلال تحول الهوية وليس الإرادة.',
    category: 'الانضباط',
    categoryAr: 'الانضباط',
    readTime: '13 min read',
    readTimeAr: '١٣ دقيقة قراءة',
    featured: true,
    datePublished: '2026-03-22',
    dateModified: '2026-03-22',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['الانضباط الذاتي', 'كيف أصبح منضبطاً', 'قوة الإرادة', 'self-discipline Arabic', 'انضباط النفس', 'الالتزام الذاتي'],
  },
  {
    slug: 'ar-idarat-alwaqt',
    title: 'Real Time Management: Not Doing More, But Doing What Matters',
    titleAr: 'إدارة الوقت الحقيقية: ليس أكثر إنجازاً بل إنجاز الأهم',
    description: "Discover the truth about time management. It's not about doing more but doing what matters. How to manage your time through identity alignment, not productivity hacks.",
    descriptionAr: 'اكتشف الحقيقة عن إدارة الوقت. ليست أكثر إنجازاً بل إنجاز الأهم. كيف تدار وقتك من خلال محاذاة الهوية لا تقنيات الإنتاجية.',
    category: 'إدارة الوقت',
    categoryAr: 'إدارة الوقت',
    readTime: '12 min read',
    readTimeAr: '١٢ دقيقة قراءة',
    featured: true,
    datePublished: '2026-03-29',
    dateModified: '2026-03-29',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['إدارة الوقت', 'تنظيم الوقت اليومي', 'التخلص من المماطلة', 'time management Arabic', 'إنتاجية', 'تنظيم الوقت'],
  },

  // ============================================
  // NEW ARTICLES — July 2026
  // ============================================
  {
    slug: 'ar-hindasat-al-dimag',
    title: 'Brain Engineering: A Scientific Guide to Reshaping Your Life',
    titleAr: 'هندسة الدماغ: دليل علمي وعملي لإعادة تشكيل حياتك',
    description: 'Rewire your brain through neuroplasticity: a practical two-part guide to lowering internal resistance and building lasting habits.',
    descriptionAr: 'اكتشف كيف تعيد برمجة دماغك عبر المرونة العصبية. دليل عملي من جزأين لخفض المقاومة الداخلية وتغيير الهوية وبناء عادات جديدة تدوم.',
    category: 'Brain Science',
    categoryAr: 'علوم الدماغ',
    readTime: '12 min read',
    readTimeAr: '١٢ دقيقة قراءة',
    featured: true,
    tier: 'BASIC',
    datePublished: '2026-07-12',
    dateModified: '2026-07-12',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['brain engineering', 'neuroplasticity', 'rewiring brain', 'identity change', 'habit formation', 'self development Arabic', 'هندسة الدماغ'],
  },
  {
    slug: 'ar-karizma-al-tatheer',
    title: 'Charisma of Influence: How to Become the Person Everyone Loves',
    titleAr: 'كاريزما التأثير: كيف تصبح الشخص الذي يعشق الجميع التواجد حوله؟',
    description: 'Charisma is not innate — it is a set of learnable behaviors. Four scientific secrets for building presence and magnetic influence in your relationships.',
    descriptionAr: 'الكاريزما ليست موهبة تولد معك، بل مجموعة سلوكيات يمكن تعلمها. أربعة أسرار علمية لبناء طاقة الحضور والتأثير الجاذب في علاقاتك.',
    category: 'Relationships & Influence',
    categoryAr: 'العلاقات والتأثير',
    readTime: '10 min read',
    readTimeAr: '١٠ دقيقة قراءة',
    featured: false,
    tier: 'MASTERY',
    datePublished: '2026-07-12',
    dateModified: '2026-07-12',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['charisma', 'influence', 'social magnetism', 'relationships', 'presence', 'charisma Arabic', 'كاريزما'],
  },
  {
    slug: 'ar-khulasat-al-arbaeen',
    title: 'Forty-Year Summary: Seven Golden Pillars for Positive Change',
    titleAr: 'خلاصة الأربعين: سبع ركائز ذهبية للتغيير نحو الأفضل',
    description: 'The essence of forty years of living in seven golden pillars of change. Core practical principles that would have saved decades of confusion and error.',
    descriptionAr: 'عصارة أربعين سنة من العيش في سبع ركائز ذهبية للتغيير. مبادئ جوهرية عملية لو عرفتها مبكراً لاختصرت الكثير من عناء التخبط والأخطاء.',
    category: 'Life Wisdom',
    categoryAr: 'حكم الحياة',
    readTime: '15 min read',
    readTimeAr: '١٥ دقيقة قراءة',
    featured: true,
    tier: 'MASTERY',
    datePublished: '2026-07-12',
    dateModified: '2026-07-12',
    author: 'Abdallah Chouaf',
    authorAr: 'عبدالله الشواف',
    keywords: ['life lessons', 'change', 'self improvement', 'commitment', 'planning', 'giving', 'forty years wisdom', 'خلاصة الأربعين'],
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
const TITLE_MAX = 65;

export function smartPageTitle(text: string, suffix: string, max: number = TITLE_MAX): string {
  const full = `${text}${suffix}`;
  if (full.length <= max) return full;
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const sp = cut.lastIndexOf(' ');
  return (sp > 30 ? cut.slice(0, sp) : cut) + '\u2026';
}

export function generateBlogArticleMetadata(slug: string, locale: string = 'en'): Metadata {
  const isAr = locale === 'ar';
  const article = getBlogArticleBySlug(slug);
  
  if (!article) {
    return {
      title: isAr ? 'المقال غير موجود | تمكنلي' : 'Article Not Found | Tamkinly Blog',
      description: isAr ? 'المقال المطلوب غير متاح حالياً.' : 'The requested article could not be found.',
    };
  }
  
  // Locale-aware bilingual metadata: serve Arabic title/description on /ar/* paths
  const title = isAr ? (article.titleAr || article.title) : article.title;
  const description = isAr ? (article.descriptionAr || article.description) : article.description;
  const suffix = isAr ? ' | تمكنلي' : ' | Tamkinly';
  
  const enUrl = `https://tamkinly.com/blog/${article.slug}`;
  const arUrl = `https://tamkinly.com/ar/blog/${article.slug}`;
  const fullUrl = isAr ? arUrl : enUrl;
  const imageUrl = article.image 
    ? `https://tamkinly.com${article.image}` 
    : 'https://tamkinly.com/og-image.webp';
  
  return {
    title: smartPageTitle(title, suffix),
    description,
    keywords: article.keywords,
    
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': enUrl,
        'ar-SA': arUrl,
        'x-default': enUrl,
      },
    },
    
    openGraph: {
      title,
      description,
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
          alt: title,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
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
export function getArticlesByTier(tier: 'FREE' | 'BASIC' | 'MASTERY'): BlogArticle[] {
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
    subCategories: ['FREE App', 'BASIC App', 'MASTERY App'],
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
    color: 'from-[#1F6F78] to-[#2A8A94]',
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
