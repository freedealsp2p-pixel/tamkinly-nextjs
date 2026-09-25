// ============================================
// ROBOTS.TXT - Programmatically Generated
// ============================================
// Allows all search engines + AI crawlers (GPTBot, Claude, Perplexity, etc.)
// Disallows only sensitive paths (admin, auth, cart, checkout, search)
// References dynamic sitemap
// ============================================

import { MetadataRoute } from 'next';
import { SEO_SITE_CONFIG } from '@/lib/seo-pages';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO_SITE_CONFIG.url;

  // Sensitive paths - blocked for ALL bots
  const sensitivePaths = [
    '/api/',
    '/auth/',
    '/admin/',
    '/cart/',
    '/checkout/',
    '/account/',
    '/dashboard/',
    '/search/',
    '/payment/',
    '/ref/',
    '/referral/',
    // '/recovery/',  // UNBLOCKED: recovery pages should be indexed
  ];

  return {
    rules: [
      // ============================================
      // Default rule: allow everything except sensitive paths
      // ============================================
      {
        userAgent: '*',
        allow: '/',
        disallow: sensitivePaths,
        crawlDelay: 1,
      },

      // ============================================
      // AI Crawlers - explicitly allowed for content training & LLM search
      // ============================================
      // OpenAI / ChatGPT
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/', '/account/', '/checkout/', '/cart/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/', '/account/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/'],
      },
      // Google AI
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/', '/account/'],
      },
      // Anthropic / Claude
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/', '/account/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/', '/account/'],
      },
      // Perplexity
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/', '/account/'],
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/'],
      },
      // Common Crawl (used by many LLMs)
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/', '/account/'],
      },
      // Meta AI
      {
        userAgent: 'Meta-ExternalAgent',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/'],
      },
      // Bytespider (Baidu / Chinese search)
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/'],
      },
      // Yandex (Russian search)
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/', '/account/'],
      },
      // Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/', '/account/'],
      },
      // Apple
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/'],
      },
      // Applebot-Extended (Apple Intelligence)
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/'],
      },
      // Cohere
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/'],
      },
      // Amazon (for Alexa + Bedrock training)
      {
        userAgent: 'Amazonbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/auth/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
