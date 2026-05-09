import { MetadataRoute } from 'next';
import { SEO_SITE_CONFIG } from '@/lib/seo-pages';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/auth/', '/admin/', '/cart/', '/checkout/'],
      },
    ],
    sitemap: `${SEO_SITE_CONFIG.url}/sitemap.xml`,
  };
}
