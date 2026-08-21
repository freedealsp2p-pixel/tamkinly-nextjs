import type { Metadata } from 'next';
import { BLOG_METADATA, SEO_SITE_CONFIG } from '@/lib/seo-pages';

// Override blog-specific metadata
export const metadata: Metadata = {
  ...BLOG_METADATA,
  twitter: {
    card: 'summary_large_image',
    title: BLOG_METADATA.twitter?.title as string,
    description: BLOG_METADATA.twitter?.description as string,
    site: SEO_SITE_CONFIG.twitterHandle,
    creator: SEO_SITE_CONFIG.twitterHandle,
    images: [`${SEO_SITE_CONFIG.url}/blog/opengraph-image`],
  },
  other: {
    'language': 'en, ar',
    'application-name': SEO_SITE_CONFIG.name,
    'DC.description': 'Research-backed articles on identity transformation, self-authorship, and evidence-based personal development. New insights every week.',
    'DC.title': 'The Tamkinly Blog',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

