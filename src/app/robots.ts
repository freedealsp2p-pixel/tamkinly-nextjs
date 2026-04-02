import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url
  
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/checkout/',
          '/account/',
          '/cart/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/checkout/',
          '/account/',
          '/cart/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Slackbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/checkout/',
          '/account/',
        ],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
      {
        userAgent: 'FacebookBot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
        ],
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/checkout/',
          '/account/',
          '/cart/',
          '/_next/',
          '/private/',
          '/*.json$',
          '/*.xml$',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
