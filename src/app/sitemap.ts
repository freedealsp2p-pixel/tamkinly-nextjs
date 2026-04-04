import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

// Last modified dates for content tracking (ISO 8601 format)
const LAST_MODIFIED = {
  // Static pages
  home: '2025-01-15',
  about: '2025-01-10',
  products: '2025-01-15',
  apps: '2025-01-15',
  resources: '2025-01-12',
  methodology: '2025-01-08',
  contact: '2025-01-01',
  faq: '2025-01-10',
  privacy: '2025-01-01',
  terms: '2025-01-01',
  refund: '2025-01-01',
  
  // Apps - updated when features change
  'identity-gap-quiz': '2025-01-15',
  'values-clarification': '2025-01-12',
  'daily-reflection': '2025-01-12',
  'identity-recode-system': '2025-01-15',
  'ai-identity-coach': '2025-01-15',
  'habit-tracker': '2025-01-14',
  'goal-system': '2025-01-14',
  'journal-system': '2025-01-13',
  'progress-dashboard': '2025-01-14',
  'identity-baseline': '2025-01-11',
  'environmental-audit': '2025-01-11',
  'decision-analysis': '2025-01-11',
  'evidence-tracking': '2025-01-11',
  'emotion-regulation': '2025-01-11',
  'worksheets': '2025-01-10',
  
  // Blog articles - sorted by most recent first
  'identity-gap-assessment': '2025-01-15',
  'ai-identity-coach-guide': '2025-01-15',
  'identity-recode-system-guide': '2025-01-14',
  'daily-reflection-practice': '2025-01-13',
  'values-clarification-tool': '2025-01-12',
  'who-am-i-worksheet': '2025-01-10',
  'identity-based-habits-worksheet': '2025-01-10',
  'self-authorship-worksheet': '2025-01-10',
  'identity-baseline-8d-worksheet': '2025-01-09',
  'environmental-audit-worksheet': '2025-01-09',
  'erq-emotional-regulation-worksheet': '2025-01-09',
  'physics-of-momentum': '2025-01-05',
  'magic-in-work-you-avoid': '2025-01-04',
  'identity-millionaire': '2025-01-03',
  'all-in-or-nothing': '2025-01-02',
  'five-steps-to-miracles': '2025-01-01',
  'inversion-thinking': '2024-12-30',
  'speed-as-strategy': '2024-12-28',
  'ten-minute-block-system': '2024-12-25',
  'work-on-yourself': '2024-12-20',
  'becoming-exceptional': '2024-12-15',
  'dopamine-reset': '2024-12-10',
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
      alternates: {
        languages: ['en', 'ar'],
      },
    },
    {
      url: `${baseUrl}/products`,
      lastModified: LAST_MODIFIED.products,
      changeFrequency: CHANGE_FREQ.products,
      priority: PRIORITIES.products,
      alternates: {
        languages: ['en', 'ar'],
      },
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: LAST_MODIFIED.apps,
      changeFrequency: CHANGE_FREQ.apps,
      priority: PRIORITIES.apps,
      alternates: {
        languages: ['en', 'ar'],
      },
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: CHANGE_FREQ.blog,
      priority: PRIORITIES.blog,
      alternates: {
        languages: ['en', 'ar'],
      },
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: LAST_MODIFIED['identity-gap-quiz'],
      changeFrequency: CHANGE_FREQ.apps,
      priority: 0.9,
      alternates: {
        languages: ['en', 'ar'],
      },
    },
  ]
  
  // Secondary pages
  const secondaryPages = [
    { path: '/about', lastModified: LAST_MODIFIED.about },
    { path: '/methodology', lastModified: LAST_MODIFIED.methodology },
    { path: '/resources', lastModified: LAST_MODIFIED.resources },
    { path: '/faq', lastModified: LAST_MODIFIED.faq },
    { path: '/contact', lastModified: LAST_MODIFIED.contact },
  ].map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: page.lastModified,
    changeFrequency: CHANGE_FREQ.other,
    priority: PRIORITIES.about,
    alternates: {
      languages: ['en', 'ar'],
    },
  }))
  
  // App pages - comprehensive list
  const appPages = [
    { slug: 'identity-gap-quiz', lastModified: LAST_MODIFIED['identity-gap-quiz'], priority: 0.85 },
    { slug: 'values-clarification', lastModified: LAST_MODIFIED['values-clarification'], priority: 0.8 },
    { slug: 'daily-reflection', lastModified: LAST_MODIFIED['daily-reflection'], priority: 0.8 },
    { slug: 'habit-tracker', lastModified: LAST_MODIFIED['habit-tracker'], priority: 0.8 },
    { slug: 'goal-system', lastModified: LAST_MODIFIED['goal-system'], priority: 0.8 },
    { slug: 'journal-system', lastModified: LAST_MODIFIED['journal-system'], priority: 0.75 },
    { slug: 'progress-dashboard', lastModified: LAST_MODIFIED['progress-dashboard'], priority: 0.75 },
    { slug: 'identity-recode-system', lastModified: LAST_MODIFIED['identity-recode-system'], priority: 0.85 },
    { slug: 'ai-identity-coach', lastModified: LAST_MODIFIED['ai-identity-coach'], priority: 0.85 },
    { slug: 'identity-baseline', lastModified: LAST_MODIFIED['identity-baseline'], priority: 0.75 },
    { slug: 'environmental-audit', lastModified: LAST_MODIFIED['environmental-audit'], priority: 0.75 },
    { slug: 'decision-analysis', lastModified: LAST_MODIFIED['decision-analysis'], priority: 0.75 },
    { slug: 'evidence-tracking', lastModified: LAST_MODIFIED['evidence-tracking'], priority: 0.75 },
    { slug: 'emotion-regulation', lastModified: LAST_MODIFIED['emotion-regulation'], priority: 0.75 },
    { slug: 'worksheets', lastModified: LAST_MODIFIED.worksheets, priority: 0.8 },
  ].map(app => ({
    url: `${baseUrl}/apps/${app.slug}`,
    lastModified: app.lastModified,
    changeFrequency: CHANGE_FREQ.apps,
    priority: app.priority,
    alternates: {
      languages: ['en', 'ar'],
    },
  }))
  
  // Blog articles - comprehensive list
  const blogSlugs = [
    // App guides (higher priority)
    { slug: 'identity-gap-assessment', priority: 0.8 },
    { slug: 'values-clarification-tool', priority: 0.75 },
    { slug: 'daily-reflection-practice', priority: 0.75 },
    { slug: 'identity-recode-system-guide', priority: 0.8 },
    { slug: 'ai-identity-coach-guide', priority: 0.8 },
    // Worksheet guides
    { slug: 'who-am-i-worksheet', priority: 0.7 },
    { slug: 'identity-based-habits-worksheet', priority: 0.7 },
    { slug: 'self-authorship-worksheet', priority: 0.7 },
    { slug: 'identity-baseline-8d-worksheet', priority: 0.7 },
    { slug: 'environmental-audit-worksheet', priority: 0.7 },
    { slug: 'erq-emotional-regulation-worksheet', priority: 0.7 },
    // Philosophy articles
    { slug: 'physics-of-momentum', priority: 0.65 },
    { slug: 'magic-in-work-you-avoid', priority: 0.65 },
    { slug: 'identity-millionaire', priority: 0.65 },
    { slug: 'all-in-or-nothing', priority: 0.65 },
    { slug: 'five-steps-to-miracles', priority: 0.65 },
    { slug: 'inversion-thinking', priority: 0.65 },
    { slug: 'speed-as-strategy', priority: 0.65 },
    { slug: 'ten-minute-block-system', priority: 0.65 },
    { slug: 'work-on-yourself', priority: 0.65 },
    { slug: 'becoming-exceptional', priority: 0.65 },
    { slug: 'dopamine-reset', priority: 0.65 },
  ]
  
  const blogPages = blogSlugs.map(item => ({
    url: `${baseUrl}/blog/${item.slug}`,
    lastModified: LAST_MODIFIED[item.slug as keyof typeof LAST_MODIFIED] || new Date().toISOString().split('T')[0],
    changeFrequency: CHANGE_FREQ.blogArticles,
    priority: item.priority,
    alternates: {
      languages: ['en', 'ar'],
    },
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
  
  // Guides pages
  const guidesPages = [
    { slug: 'identity-vs-behavior-change', lastModified: '2025-01-10' },
  ].map(guide => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.lastModified,
    changeFrequency: CHANGE_FREQ.blogArticles,
    priority: 0.7,
  }))
  
  // Combine all pages
  return [
    ...corePages,
    ...secondaryPages,
    ...appPages,
    ...blogPages,
    ...legalPages,
    ...guidesPages,
  ]
}
