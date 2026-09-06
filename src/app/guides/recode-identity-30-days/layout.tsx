import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const enUrl = 'https://tamkinly.com/guides/recode-identity-30-days';
  const arUrl = 'https://tamkinly.com/ar/guides/recode-identity-30-days';
  return {
  title: 'How to Recode Your Identity in 30 Days | Step-by-Step Guide',
  description: 'A practical step-by-step guide to transforming your identity from the inside out, based on neuroscience research on building new neural pathways.',
  keywords: [
    'recode identity',
    'identity transformation 30 days',
    'identity change guide',
    '30 day transformation',
    'neuroplasticity identity',
    'identity shift framework',
    'self-transformation plan',
    'identity recode system',
  ],
  alternates: {
    canonical: isAr ? arUrl : enUrl,
    languages: {
      'en-US': enUrl,
      'ar-SA': arUrl,
      'x-default': enUrl,
    },
  },
  openGraph: {
    title: 'How to Recode Your Identity in 30 Days',
    description: 'A practical step-by-step guide to transforming your identity from the inside out, grounded in neuroscience research on neural pathways.',
    url: isAr ? arUrl : enUrl,
    siteName: 'Tamkinly',
    type: 'article',
    publishedTime: '2026-02-15',
    authors: ['Abdallah Chouaf'],
    images: [
      {
        url: 'https://tamkinly.com/guides/recode-identity-30-days/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'How to Recode Your Identity in 30 Days Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Recode Your Identity in 30 Days',
    description: 'A practical step-by-step guide to transforming your identity from the inside out. Based on neuroscience research.',
    site: '@tamkinly',
    images: ['https://tamkinly.com/guides/recode-identity-30-days/opengraph-image'],
  },
  other: {
    'DC.description': 'A practical step-by-step guide to transforming your identity from the inside out. Based on neuroscience research showing 21-30 days for new neural pathways.',
    'DC.subject': 'recode identity, 30 day transformation, identity change',
  },
  };
}

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
