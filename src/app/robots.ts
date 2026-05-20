import { MetadataRoute } from 'next';
import { SEO_SITE_CONFIG } from '@/lib/seo-pages';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/auth/', '/admin/', '/cart/', '/checkout/', '/account/', '/search/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Google-Extended',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'CCBot',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SEO_SITE_CONFIG.url}/sitemap.xml`,
    host: SEO_SITE_CONFIG.url,
  };
}
