import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';
import { smartPageTitle } from '@/lib/blog-articles';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'How to Stop Procrastinating: The Identity Shift That Changes Everything';
  const description = 'Procrastination is not a time management problem — it is an identity problem. Learn why identity-based approaches work when everything else fails.';
  const enUrl = 'https://tamkinly.com/blog/stop-procrastinating-identity-shift';
  const arUrl = 'https://tamkinly.com/ar/blog/stop-procrastinating-identity-shift';
  return {
    title: smartPageTitle(title, ' | Tamkinly Blog'),
    description,
    keywords: ['how to stop procrastinating', 'stop procrastinating', 'identity shift', 'overcome procrastination', 'procrastination solution', 'identity-based change', 'procrastination identity'],
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
      publishedTime: '2026-03-20',
      modifiedTime: '2026-03-20',
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
      'article:published_time': '2026-03-20',
      'article:modified_time': '2026-03-20',
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
