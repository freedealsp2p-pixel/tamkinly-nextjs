import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'Self Discipline Tips That Actually Work: The Science of Identity Recode';
  const description = 'Self discipline is not punishment or willpower — it is the highest form of self-love expressed through identity. Learn the science-backed approach to discipline that makes it automatic, not forced.';
  const enUrl = 'https://tamkinly.com/blog/self-discipline-science';
  const arUrl = 'https://tamkinly.com/ar/blog/self-discipline-science';
  return {
    title: title + ' | Tamkinly Blog',
    description,
    keywords: ['self discipline tips', 'self discipline', 'discipline science', 'identity recode', 'how to be disciplined', 'discipline framework', 'lasting discipline'],
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
      publishedTime: '2026-03-28',
      modifiedTime: '2026-03-28',
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
      'article:published_time': '2026-03-28',
      'article:modified_time': '2026-03-28',
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
