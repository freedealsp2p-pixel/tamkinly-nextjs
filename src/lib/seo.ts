/**
 * SEO Configuration and Helpers for Tamkinly
 * Centralized SEO management for Next.js 16 Metadata API
 */

import type { Metadata } from 'next';

// ============================================
// SITE CONFIGURATION
// ============================================

export const SITE_CONFIG = {
  name: 'Tamkinly',
  description: 'A space to rebuild the human from within. Without pressure. Without self-judgment. Without temporary motivation. Digital products for identity transformation and personal development.',
  url: 'https://tamkinly.com',
  ogImage: '/og-image.png',
  twitterHandle: '@tamkinly',
  author: 'Tamkinly',
  language: 'en',
  locale: 'en_US',
} as const;

// ============================================
// TARGET KEYWORDS
// ============================================

export const KEYWORDS = {
  primary: [
    'identity transformation',
    'self-development',
    'habit tracker',
    'personal growth',
    'identity reconstruction',
  ],
  secondary: [
    'digital planner',
    'mindset coaching',
    'transformation tools',
    'self-improvement',
    'identity assessment',
    'values clarification',
    'daily reflection',
    'behavioral change',
    'atomic habits',
    'self-authorship',
  ],
  longTail: [
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
  ],
} as const;

// ============================================
// METADATA GENERATORS
// ============================================

interface PageMetadata {
  title: string;
  description: string;
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
 * Generate comprehensive page metadata
 */
export function generatePageMetadata({
  title,
  description,
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
  const fullTitle = title === SITE_CONFIG.name ? title : `${title} | ${SITE_CONFIG.name}`;
  
  const allKeywords = [...KEYWORDS.primary, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: author || SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    
    // Canonical URL
    alternates: {
      canonical: url,
    },
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: type === 'article' ? 'article' : 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
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
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      images: [image],
    },
    
    // Additional meta
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
  };
}

// ============================================
// JSON-LD SCHEMA GENERATORS
// ============================================

/**
 * Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    sameAs: [
      'https://twitter.com/tamkinly',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
  };
}

/**
 * WebSite Schema with SearchAction
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Product Schema for pricing tiers
 */
interface ProductSchemaData {
  name: string;
  description: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  category?: string;
  image?: string;
  url: string;
  tier?: string;
}

export function generateProductSchema({
  name,
  description,
  price,
  currency = 'USD',
  availability = 'InStock',
  category = 'Digital Product',
  image,
  url,
}: ProductSchemaData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image ? `${SITE_CONFIG.url}${image}` : undefined,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    category,
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: `${SITE_CONFIG.url}${url}`,
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
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
}

export function generateSoftwareAppSchema({
  name,
  description,
  url,
  category,
  operatingSystem = 'Web Browser',
  offers,
  aggregateRating,
}: AppSchemaData) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${SITE_CONFIG.url}${url}`,
    applicationCategory: category,
    operatingSystem,
    offers: {
      '@type': 'Offer',
      price: offers?.price ?? 0,
      priceCurrency: offers?.currency ?? 'USD',
    },
  };

  if (aggregateRating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
    };
  }

  return schema;
}

/**
 * Article Schema for Blog Posts
 */
interface ArticleSchemaData {
  headline: string;
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
      name: SITE_CONFIG.name,
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
  };
}

/**
 * BreadcrumbList Schema
 */
interface BreadcrumbItem {
  name: string;
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
  answer: string;
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
  description: 'Discover your identity gap with our free 3-minute assessment. Evidence-based tools for identity transformation, habit formation, and personal development. Start your journey today.',
  path: '/',
  keywords: [...KEYWORDS.primary, ...KEYWORDS.secondary.slice(0, 5)],
});

export const PRODUCTS_METADATA: Metadata = generatePageMetadata({
  title: 'Products & Pricing | Identity Transformation Tools',
  description: 'Start free with powerful identity tools, then upgrade as you grow. Transparent pricing for identity transformation products. Free tier available with no credit card required.',
  path: '/products',
  keywords: ['identity transformation pricing', 'personal development tools', 'habit tracker pricing'],
});

export const APPS_METADATA: Metadata = generatePageMetadata({
  title: 'Interactive Apps | Transformation Tools',
  description: 'Access powerful transformation tools including Identity Gap Assessment, Values Clarification, Daily Reflection, and AI Identity Coach. Start free, upgrade anytime.',
  path: '/apps',
  keywords: ['identity apps', 'self-development tools', 'habit tracker app', 'AI coaching'],
});

export const BLOG_METADATA: Metadata = generatePageMetadata({
  title: 'Blog | Research-Backed Insights',
  description: 'Research-backed insights, practical frameworks, and transformation tools. Articles on identity transformation, habit formation, and personal development.',
  path: '/blog',
  keywords: ['identity blog', 'personal development articles', 'habit formation research'],
});

export const ABOUT_METADATA: Metadata = generatePageMetadata({
  title: 'About Tamkinly | Our Mission',
  description: 'Tamkinly is a space to rebuild the human from within. Learn about our evidence-based approach to identity transformation and personal development.',
  path: '/about',
  keywords: ['about tamkinly', 'identity transformation mission', 'personal development philosophy'],
});

export const METHODOLOGY_METADATA: Metadata = generatePageMetadata({
  title: 'Methodology | Evidence-Based Transformation',
  description: 'Our methodology combines neuroscience, psychology, and practical frameworks for lasting identity transformation. Based on Atomic Habits, Self-Authorship, and CBT research.',
  path: '/methodology',
  keywords: ['transformation methodology', 'identity science', 'evidence-based self-development'],
});

export const RESOURCES_METADATA: Metadata = generatePageMetadata({
  title: 'Resources | Free Transformation Tools',
  description: 'Free resources for identity transformation including worksheets, assessments, and guides. Research-backed content for personal development.',
  path: '/resources',
  keywords: ['free resources', 'identity worksheets', 'self-development guides'],
});

export const CONTACT_METADATA: Metadata = generatePageMetadata({
  title: 'Contact Us | Get Support',
  description: 'Contact Tamkinly for support, questions, or partnership inquiries. We typically respond within 24 hours.',
  path: '/contact',
  keywords: ['contact tamkinly', 'support', 'customer service'],
});

export const FAQ_METADATA: Metadata = generatePageMetadata({
  title: 'FAQ | Frequently Asked Questions',
  description: 'Find answers to common questions about Tamkinly products, pricing, and methodology. Get help with your transformation journey.',
  path: '/faq',
  keywords: ['tamkinly faq', 'help', 'questions answered'],
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
