import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'Goal Setting Framework: Identity-Aligned Goals That Actually Work';
  const description = 'SMART goals and OKRs fail because they ignore identity. Learn the identity-aligned goal setting framework that creates goals you actually achieve — because they are expressions of who you are becoming, not obligations you force yourself to pursue.';
  const enUrl = 'https://tamkinly.com/blog/goal-setting-framework';
  const arUrl = 'https://tamkinly.com/ar/blog/goal-setting-framework';
  return {
    title: title + ' | Tamkinly Blog',
    description,
    keywords: ['goal setting framework', 'identity-aligned goals', 'goal setting', 'how to set goals', 'goal achievement', 'identity goals', 'effective goal setting'],
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
      publishedTime: '2026-04-05',
      modifiedTime: '2026-04-05',
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
      'article:published_time': '2026-04-05',
      'article:modified_time': '2026-04-05',
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
