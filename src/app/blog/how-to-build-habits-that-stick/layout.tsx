import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';
import { smartPageTitle } from '@/lib/blog-articles';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'How to Build Habits That Stick: The Science of Identity-Based Habit Formation';
  const description = 'Stop relying on willpower. Learn the science-backed identity-based approach to building habits that become automatic — not forced.';
  const enUrl = 'https://tamkinly.com/blog/how-to-build-habits-that-stick';
  const arUrl = 'https://tamkinly.com/ar/blog/how-to-build-habits-that-stick';
  return {
    title: smartPageTitle(title, ' | Tamkinly Blog'),
    description,
    keywords: ['build habits that stick', 'habit formation', 'identity-based habits', 'science of habits', 'how to build habits', 'lasting habits', 'habit loop'],
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
      publishedTime: '2026-03-05',
      modifiedTime: '2026-03-05',
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
      'article:published_time': '2026-03-05',
      'article:modified_time': '2026-03-05',
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
