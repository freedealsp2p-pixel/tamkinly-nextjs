import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

// Last modified dates for content tracking
const LAST_MODIFIED = {
  // Static pages
  home: '2024-12-01',
  about: '2024-11-15',
  products: '2024-12-01',
  apps: '2024-12-01',
  resources: '2024-11-20',
  methodology: '2024-11-10',
  contact: '2024-10-01',
  faq: '2024-11-01',
  privacy: '2024-10-01',
  terms: '2024-10-01',
  refund: '2024-10-01',
  
  // Apps - updated when features change
  'identity-gap-quiz': '2024-12-01',
  'values-clarification': '2024-11-25',
  'daily-reflection': '2024-11-25',
  'identity-recode-system': '2024-12-01',
  'ai-identity-coach': '2024-12-01',
  worksheets: '2024-11-20',
  
  // Blog articles - sorted by most recent first
  'identity-gap-assessment': '2024-12-01',
  'ai-identity-coach-guide': '2024-12-01',
  'identity-recode-system-guide': '2024-11-28',
  'daily-reflection-practice': '2024-11-27',
  'values-clarification-tool': '2024-11-26',
  'who-am-i-worksheet': '2024-11-20',
  'identity-based-habits-worksheet': '2024-11-20',
  'self-authorship-worksheet': '2024-11-20',
  'identity-baseline-8d-worksheet': '2024-11-15',
  'environmental-audit-worksheet': '2024-11-15',
  'erq-emotional-regulation-worksheet': '2024-11-15',
  'physics-of-momentum': '2024-10-15',
  'magic-in-work-you-avoid': '2024-10-10',
  'identity-millionaire': '2024-10-05',
  'all-in-or-nothing': '2024-10-01',
  'five-steps-to-miracles': '2024-09-25',
  'inversion-thinking': '2024-09-20',
  'speed-as-strategy': '2024-09-15',
  'ten-minute-block-system': '2024-09-10',
  'work-on-yourself': '2024-09-05',
  'becoming-exceptional': '2024-09-01',
  'dopamine-reset': '2024-08-25',
}

// Page priority (0.0 - 1.0, higher = more important)
const PRIORITIES = {
  home: 1.0,
  products: 0.9,
  apps: 0.9,
  blog: 0.8,
  about: 0.7,
  methodology: 0.8,
  resources: 0.7,
  contact: 0.5,
  faq: 0.6,
  appsLanding: 0.8,
  blogArticles: 0.7,
  legal: 0.3,
}

// Change frequency hints
const CHANGE_FREQ = {
  home: 'weekly' as const,
  products: 'weekly' as const,
  apps: 'weekly' as const,
  blog: 'daily' as const,
  blogArticles: 'monthly' as const,
  legal: 'yearly' as const,
  other: 'monthly' as const,
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url
  
  // High-priority landing pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: LAST_MODIFIED.home,
      changeFrequency: CHANGE_FREQ.home,
      priority: PRIORITIES.home,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: LAST_MODIFIED.products,
      changeFrequency: CHANGE_FREQ.products,
      priority: PRIORITIES.products,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: LAST_MODIFIED.apps,
      changeFrequency: CHANGE_FREQ.apps,
      priority: PRIORITIES.apps,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: CHANGE_FREQ.blog,
      priority: PRIORITIES.blog,
    },
  ]
  
  // Secondary pages
  const secondaryPages = [
    { path: '/about', lastModified: LAST_MODIFIED.about },
    { path: '/methodology', lastModified: LAST_MODIFIED.methodology },
    { path: '/resources', lastModified: LAST_MODIFIED.resources },
    { path: '/quiz', lastModified: LAST_MODIFIED['identity-gap-quiz'] },
    { path: '/faq', lastModified: LAST_MODIFIED.faq },
    { path: '/contact', lastModified: LAST_MODIFIED.contact },
  ].map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: CHANGE_FREQ.other,
    priority: PRIORITIES.about,
  }))
  
  // App pages
  const appPages = [
    { slug: 'identity-gap-quiz', lastModified: LAST_MODIFIED['identity-gap-quiz'] },
    { slug: 'values-clarification', lastModified: LAST_MODIFIED['values-clarification'] },
    { slug: 'daily-reflection', lastModified: LAST_MODIFIED['daily-reflection'] },
    { slug: 'identity-recode-system', lastModified: LAST_MODIFIED['identity-recode-system'] },
    { slug: 'ai-identity-coach', lastModified: LAST_MODIFIED['ai-identity-coach'] },
    { slug: 'worksheets', lastModified: LAST_MODIFIED.worksheets },
  ].map(app => ({
    url: `${baseUrl}/apps/${app.slug}`,
    lastModified: app.lastModified,
    changeFrequency: CHANGE_FREQ.apps,
    priority: PRIORITIES.appsLanding,
  }))
  
  // Blog articles
  const blogSlugs = [
    // App guides (higher priority)
    'identity-gap-assessment',
    'values-clarification-tool',
    'daily-reflection-practice',
    'identity-recode-system-guide',
    'ai-identity-coach-guide',
    // Worksheet guides
    'who-am-i-worksheet',
    'identity-based-habits-worksheet',
    'self-authorship-worksheet',
    'identity-baseline-8d-worksheet',
    'environmental-audit-worksheet',
    'erq-emotional-regulation-worksheet',
    // Philosophy articles
    'physics-of-momentum',
    'magic-in-work-you-avoid',
    'identity-millionaire',
    'all-in-or-nothing',
    'five-steps-to-miracles',
    'inversion-thinking',
    'speed-as-strategy',
    'ten-minute-block-system',
    'work-on-yourself',
    'becoming-exceptional',
    'dopamine-reset',
  ]
  
  const blogPages = blogSlugs.map((slug, index) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: LAST_MODIFIED[slug as keyof typeof LAST_MODIFIED] || new Date().toISOString().split('T')[0],
    changeFrequency: CHANGE_FREQ.blogArticles,
    priority: index < 5 ? 0.75 : PRIORITIES.blogArticles, // App guides get slightly higher priority
  }))
  
  // Legal pages (low priority but included for completeness)
  const legalPages = [
    { path: '/privacy', lastModified: LAST_MODIFIED.privacy },
    { path: '/terms', lastModified: LAST_MODIFIED.terms },
    { path: '/refund', lastModified: LAST_MODIFIED.refund },
  ].map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: CHANGE_FREQ.legal,
    priority: PRIORITIES.legal,
  }))
  
  // Combine all pages
  return [
    ...corePages,
    ...secondaryPages,
    ...appPages,
    ...blogPages,
    ...legalPages,
  ]
}
