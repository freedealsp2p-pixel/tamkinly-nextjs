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
  description: string;
  category: string;
  readTime: string;
  featured: boolean;
  tier?: 'FREE' | 'BASIC' | 'BUNDLE';
  datePublished: string;
  dateModified: string;
  author: string;
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
    description: 'Research-backed assessment revealing the gap between who you are and who you want to become. Free 3-minute quiz with personalized insights.',
    category: 'FREE App',
    readTime: '8 min read',
    featured: true,
    tier: 'FREE',
    datePublished: '2024-10-01',
    dateModified: '2024-10-15',
    author: 'Tamkinly Team',
    keywords: ['identity gap', 'identity assessment', 'self-discovery', 'free quiz', 'personal growth'],
  },
  {
    slug: 'values-clarification-tool',
    title: 'Values Clarification Tool: Find What Truly Matters',
    description: 'Scientific method to discover your core values and align your life with what matters most. Based on ACT and positive psychology research.',
    category: 'FREE App',
    readTime: '7 min read',
    featured: false,
    tier: 'FREE',
    datePublished: '2024-10-05',
    dateModified: '2024-10-15',
    author: 'Tamkinly Team',
    keywords: ['values clarification', 'core values', 'ACT therapy', 'positive psychology', 'self-discovery'],
  },
  {
    slug: 'daily-reflection-practice',
    title: 'Daily Reflection Practice: The Science of Self-Transformation',
    description: 'Evidence-based journaling prompts that rewire neural pathways. 7 themes for consistent growth and identity evolution.',
    category: 'FREE App',
    readTime: '7 min read',
    featured: false,
    tier: 'FREE',
    datePublished: '2024-10-08',
    dateModified: '2024-10-15',
    author: 'Tamkinly Team',
    keywords: ['daily reflection', 'journaling', 'neural pathways', 'self-transformation', 'identity evolution'],
  },
  {
    slug: 'identity-recode-system-guide',
    title: 'Identity Recode System: Complete 30-Day Transformation',
    description: 'Full identity transformation system with 6 interconnected components. Includes worksheets, trackers, and structured progression.',
    category: 'BASIC App',
    readTime: '9 min read',
    featured: true,
    tier: 'BASIC',
    datePublished: '2024-10-10',
    dateModified: '2024-10-20',
    author: 'Tamkinly Team',
    keywords: ['identity recode', '30-day transformation', 'identity system', 'worksheets', 'transformation program'],
  },
  {
    slug: 'ai-identity-coach-guide',
    title: 'AI Identity Coach: Your Personal Transformation Guide',
    description: '24/7 AI coaching powered by identity science. Personalized guidance for discovery, habits, self-authorship, and emotional regulation.',
    category: 'BUNDLE App',
    readTime: '8 min read',
    featured: true,
    tier: 'BUNDLE',
    datePublished: '2024-10-12',
    dateModified: '2024-10-20',
    author: 'Tamkinly Team',
    keywords: ['AI coach', 'identity coaching', 'artificial intelligence', 'personal transformation', '24/7 coaching'],
  },
  
  // Worksheets
  {
    slug: 'who-am-i-worksheet',
    title: 'Who Am I Worksheet: The Complete Identity Exploration',
    description: 'Deep dive into self-concept clarity with research-backed questions. Explore personal, social, and possible selves dimensions.',
    category: 'Worksheet',
    readTime: '10 min read',
    featured: false,
    datePublished: '2024-09-15',
    dateModified: '2024-10-01',
    author: 'Tamkinly Team',
    keywords: ['who am i', 'identity worksheet', 'self-concept', 'identity exploration', 'personal identity'],
  },
  {
    slug: 'identity-based-habits-worksheet',
    title: 'Identity-Based Habits Worksheet: James Clear\'s Method',
    description: 'Transform behaviors by changing who you believe you are. The three layers of habit change that create lasting transformation.',
    category: 'Worksheet',
    readTime: '9 min read',
    featured: true,
    datePublished: '2024-09-18',
    dateModified: '2024-10-01',
    author: 'Tamkinly Team',
    keywords: ['identity-based habits', 'james clear', 'atomic habits', 'habit change', 'behavior transformation'],
  },
  {
    slug: 'self-authorship-worksheet',
    title: 'Self-Authorship Worksheet: Your Internal Voice Journey',
    description: 'Based on Baxter Magolda\'s research. Move from external formulas to internally-defined identity through structured reflection.',
    category: 'Worksheet',
    readTime: '8 min read',
    featured: false,
    datePublished: '2024-09-20',
    dateModified: '2024-10-01',
    author: 'Tamkinly Team',
    keywords: ['self-authorship', 'internal voice', 'baxter magolda', 'identity development', 'internal identity'],
  },
  {
    slug: 'identity-baseline-8d-worksheet',
    title: 'Identity Baseline 8D: Holistic Self-Assessment',
    description: 'Eight dimensions of identity: Physical, Intellectual, Emotional, Social, Occupational, Spiritual, Financial, Environmental.',
    category: 'Worksheet',
    readTime: '7 min read',
    featured: false,
    datePublished: '2024-09-22',
    dateModified: '2024-10-01',
    author: 'Tamkinly Team',
    keywords: ['identity baseline', '8 dimensions', 'self-assessment', 'holistic identity', 'life dimensions'],
  },
  {
    slug: 'environmental-audit-worksheet',
    title: 'Environmental Audit Worksheet: Design Your Growth Space',
    description: 'Your environment shapes your identity. Audit physical, social, and digital environments for transformation success.',
    category: 'Worksheet',
    readTime: '8 min read',
    featured: false,
    datePublished: '2024-09-25',
    dateModified: '2024-10-01',
    author: 'Tamkinly Team',
    keywords: ['environmental audit', 'environment design', 'growth space', 'digital environment', 'physical environment'],
  },
  {
    slug: 'erq-emotional-regulation-worksheet',
    title: 'ERQ Emotional Regulation: Master Your Inner World',
    description: 'Based on Gross & John\'s research. Cognitive reappraisal vs. suppression—the science of emotional intelligence.',
    category: 'Worksheet',
    readTime: '8 min read',
    featured: false,
    datePublished: '2024-09-28',
    dateModified: '2024-10-01',
    author: 'Tamkinly Team',
    keywords: ['ERQ', 'emotional regulation', 'cognitive reappraisal', 'emotional intelligence', 'gross john'],
  },
  
  // Philosophy Articles
  {
    slug: 'physics-of-momentum',
    title: 'The Physics of Momentum: Why 18 Minutes Changes Everything',
    description: 'Discover how the science of momentum and habit formation can transform your identity in just 18 minutes a day.',
    category: 'Identity Shift',
    readTime: '8 min read',
    featured: true,
    datePublished: '2024-10-15',
    dateModified: '2024-10-15',
    author: 'Tamkinly Team',
    keywords: ['momentum', '18 minutes', 'habit formation', 'identity transformation', 'consistency'],
  },
  {
    slug: 'magic-in-work-you-avoid',
    title: 'The Magic Is in the Work You Avoid',
    description: 'That uncomfortable task you keep putting off? It holds the key to your transformation.',
    category: 'Transformation',
    readTime: '6 min read',
    featured: false,
    datePublished: '2024-10-18',
    dateModified: '2024-10-18',
    author: 'Tamkinly Team',
    keywords: ['avoidance', 'transformation', 'comfort zone', 'growth work', 'personal development'],
  },
  {
    slug: 'identity-millionaire',
    title: 'The Identity Millionaire: Building Wealth Through Self-Transformation',
    description: 'True wealth starts with who you become, not what you acquire. The three stages of identity-based success.',
    category: 'Wealth & Identity',
    readTime: '9 min read',
    featured: true,
    datePublished: '2024-10-20',
    dateModified: '2024-10-20',
    author: 'Tamkinly Team',
    keywords: ['wealth', 'identity millionaire', 'success mindset', 'self-transformation', 'financial success'],
  },
  {
    slug: 'all-in-or-nothing',
    title: 'All In or Nothing: The Power of Full Commitment',
    description: 'Half-effort leaves you uncertain. Full commitment gives you clarity—even when you fail.',
    category: 'Commitment',
    readTime: '7 min read',
    featured: false,
    datePublished: '2024-10-22',
    dateModified: '2024-10-22',
    author: 'Tamkinly Team',
    keywords: ['commitment', 'all in', 'full dedication', 'clarity', 'decision making'],
  },
  {
    slug: 'five-steps-to-miracles',
    title: 'Five Steps to Miracles: A Framework for Identity Liberation',
    description: 'Surrender the old versions of yourself. Step into who you were meant to be.',
    category: 'Self-Liberation',
    readTime: '10 min read',
    featured: true,
    datePublished: '2024-10-25',
    dateModified: '2024-10-25',
    author: 'Tamkinly Team',
    keywords: ['miracles', 'identity liberation', 'transformation framework', 'self-surrender', 'personal rebirth'],
  },
  {
    slug: 'inversion-thinking',
    title: 'Inversion Thinking: How to Win by Avoiding Failure',
    description: 'Charlie Munger\'s counterintuitive approach to success: ask how to lose, then don\'t do that.',
    category: 'Strategy',
    readTime: '8 min read',
    featured: false,
    datePublished: '2024-10-28',
    dateModified: '2024-10-28',
    author: 'Tamkinly Team',
    keywords: ['inversion thinking', 'charlie munger', 'strategic thinking', 'problem solving', 'success strategy'],
  },
  {
    slug: 'speed-as-strategy',
    title: 'Speed as Strategy: The Execution Edge',
    description: 'The gap between idea and reality is where power lives. Execute faster than everyone else.',
    category: 'Execution',
    readTime: '7 min read',
    featured: false,
    datePublished: '2024-11-01',
    dateModified: '2024-11-01',
    author: 'Tamkinly Team',
    keywords: ['speed', 'execution', 'strategy', 'implementation', 'action taking'],
  },
  {
    slug: 'ten-minute-block-system',
    title: 'The 10-Minute Block System: Breaking Through Every Obstacle',
    description: 'From paralysis to progress in just 10 minutes. A practical system for overcoming resistance.',
    category: 'Productivity',
    readTime: '9 min read',
    featured: false,
    datePublished: '2024-11-05',
    dateModified: '2024-11-05',
    author: 'Tamkinly Team',
    keywords: ['10 minute block', 'productivity system', 'overcoming resistance', 'time blocking', 'progress'],
  },
  {
    slug: 'work-on-yourself',
    title: 'Work on Yourself: The Psycho-Cybernetics of Identity',
    description: 'Your self-image controls everything. Change the inner image, change everything.',
    category: 'Self-Image',
    readTime: '10 min read',
    featured: true,
    datePublished: '2024-11-08',
    dateModified: '2024-11-08',
    author: 'Tamkinly Team',
    keywords: ['psycho-cybernetics', 'self-image', 'maxwell maltz', 'inner image', 'identity change'],
  },
  {
    slug: 'becoming-exceptional',
    title: 'Becoming Exceptional: Why Ordinary Can Never Build Legacy',
    description: 'You cannot be exceptional while living an ordinary life. The courage to embrace what makes you different.',
    category: 'Excellence',
    readTime: '8 min read',
    featured: false,
    datePublished: '2024-11-12',
    dateModified: '2024-11-12',
    author: 'Tamkinly Team',
    keywords: ['exceptional', 'excellence', 'legacy', 'extraordinary life', 'personal greatness'],
  },
  {
    slug: 'dopamine-reset',
    title: 'The 24-Hour Dopamine Reset: Reclaiming Your Focus',
    description: 'Reset your motivation system in just one day and rediscover natural drive.',
    category: 'Mental Clarity',
    readTime: '12 min read',
    featured: true,
    datePublished: '2024-11-15',
    dateModified: '2024-11-15',
    author: 'Tamkinly Team',
    keywords: ['dopamine reset', 'mental clarity', 'focus', 'motivation', 'brain reset'],
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
    : 'https://tamkinly.com/og-image.png';
  
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
