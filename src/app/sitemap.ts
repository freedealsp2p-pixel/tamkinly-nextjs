import { MetadataRoute } from 'next';
import { SEO_SITE_CONFIG } from '@/lib/seo-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_SITE_CONFIG.url;

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/apps`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/quiz`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/methodology`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  // App pages
  const appPages = [
    'identity-gap-quiz',
    'values-clarification',
    'daily-reflection',
    'trial-planner',
    'executive-manual',
    'daily-planner',
    'identity-baseline',
    'environmental-audit',
    'decision-analysis',
    'evidence-tracking',
    'progress-dashboard',
    'emotion-regulation',
    'ai-identity-coach',
    'goal-system',
    'habit-tracker',
    'journal-system',
    'identity-recode-system',
    'worksheets',
  ].map((slug) => ({
    url: `${baseUrl}/apps/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...appPages];
}
