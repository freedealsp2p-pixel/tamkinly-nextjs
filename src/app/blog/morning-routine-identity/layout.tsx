import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'Morning Routine for Self Improvement: Why Identity-Based Routines Actually Work';
  const description = 'Most morning routines fail because they are built on behavior, not identity. Learn why identity-based morning routines create lasting change and how to design one that becomes who you are.';
  const enUrl = 'https://tamkinly.com/blog/morning-routine-identity';
  const arUrl = 'https://tamkinly.com/ar/blog/morning-routine-identity';
  return {
    title: title + ' | Tamkinly Blog',
    description,
    keywords: ['morning routine for self improvement', 'morning routine', 'identity-based routine', 'self improvement morning', 'productive morning', 'morning habits', 'daily practice'],
    alternates: {
      canonical: isAr ? arUrl : enUrl,
      languages: {
        'en-US': enUrl,
        'ar-SA': arUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: isAr ? arUrl : enUrl,
      siteName: 'Tamkinly',
      type: 'article',
      publishedTime: '2026-03-12',
      modifiedTime: '2026-03-12',
      authors: ['Abdallah Chouaf'],
      images: [{ url: 'https://tamkinly.com/og-image.webp', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://tamkinly.com/og-image.webp'],
    },
    other: {
      'article:published_time': '2026-03-12',
      'article:modified_time': '2026-03-12',
      'article:author': 'Abdallah Chouaf',
    },
  };
}

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
