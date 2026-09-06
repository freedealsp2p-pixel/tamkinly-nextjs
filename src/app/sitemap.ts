import { MetadataRoute } from 'next';
import { SEO_SITE_CONFIG } from '@/lib/seo-pages';
import { getAllBlogArticleSlugs } from '@/lib/blog-articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_SITE_CONFIG.url;
  const now = new Date();

  // Static pages - English
  const staticPagesEn = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/products/basic`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/products/premium`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/products/mastery`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${baseUrl}/apps`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/quiz`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/methodology`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/guides`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/recovery`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/recovery/trc`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/recovery/porn-recovery`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/recovery/porn-recovery/journey`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/recovery/porn-recovery/downloads`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  // Recovery TRC pages
  const recoveryTrcPages = [
    'grounding', 'safe-place', 'body-scan', 'a52', 'eft-tapping',
    'shame-recovery', 'thought-reframing', 'trauma-journal', 'journey',
    'regulation-toolkit', 'what-trauma-does-to-the-body', 'what-happens-during-trauma-responses',
    'grounding-guide', 'regulation-guide', 'secondary-trauma',
    'worksheets/safety-plan', 'worksheets/trigger-mapping', 'downloads',
  ].map((slug) => ({
    url: `${baseUrl}/recovery/trc/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Arabic versions of all static + recovery pages
  const arPages = [
    ...staticPagesEn,
    ...recoveryTrcPages,
  ].map((page) => ({
    ...page,
    url: page.url.replace(baseUrl, `${baseUrl}/ar`),
    priority: page.priority * 0.9,
  }));

  // Blog articles - English + Arabic
  const blogSlugs = getAllBlogArticleSlugs();
  const blogPages = blogSlugs.flatMap((slug) => [
    { url: `${baseUrl}/blog/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ar/blog/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.63 },
  ]);

  // Guide pages - English + Arabic
  const guideSlugs = [
    'recode-identity-30-days',
    'behavior-trap-why-habits-fail',
    'environment-shapes-you',
    'identity-vs-behavior-change',
  ];
  const guidePages = guideSlugs.flatMap((slug) => [
    { url: `${baseUrl}/guides/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/ar/guides/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.63 },
  ]);

  // App pages - English + Arabic
  const appSlugs = [
    'identity-gap-quiz', 'values-clarification', 'daily-reflection',
    'trial-planner', 'executive-manual', 'daily-planner', 'identity-baseline',
    'environmental-audit', 'decision-analysis', 'evidence-tracking',
    'progress-dashboard', 'emotion-regulation', 'ai-identity-coach',
    'goal-system', 'habit-tracker', 'journal-system', 'identity-recode-system',
    'worksheets', 'community-access', 'priority-support',
  ];
  const appPages = appSlugs.flatMap((slug) => [
    { url: `${baseUrl}/apps/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/ar/apps/${slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.54 },
  ]);

  // Premium Therapeutic Protocols - English + Arabic
  const therapeuticProtocolSlugs = [
    'temporal-decoupling',
    'alternative-code',
    'white-mirror',
  ];
  const therapeuticProtocolPages = [
    { url: `${baseUrl}/apps/therapeutic-protocols`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 },
    ...therapeuticProtocolSlugs.map((slug) => ({
      url: `${baseUrl}/apps/therapeutic-protocols/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
  const therapeuticProtocolPagesAr = therapeuticProtocolPages.map((page) => ({
    ...page,
    url: page.url.replace(baseUrl, `${baseUrl}/ar`),
    priority: page.priority * 0.9,
  }));

  return [
    ...staticPagesEn,
    ...recoveryTrcPages,
    ...arPages,
    ...blogPages,
    ...guidePages,
    ...appPages,
    ...therapeuticProtocolPages,
    ...therapeuticProtocolPagesAr,
  ];
}
