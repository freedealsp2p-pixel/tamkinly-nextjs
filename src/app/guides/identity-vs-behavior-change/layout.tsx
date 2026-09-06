import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const enUrl = 'https://tamkinly.com/guides/identity-vs-behavior-change';
  const arUrl = 'https://tamkinly.com/ar/guides/identity-vs-behavior-change';
  return {
  title: 'Identity vs Behavior Change: Why Willpower Fails',
  description: 'The hidden reason most self-improvement efforts don\'t last — and the identity-first approach that creates permanent transformation.',
  keywords: [
    'identity vs behavior change',
    'willpower fails',
    'identity transformation',
    'self-improvement',
    'identity-first approach',
    'james clear identity',
    'habit change',
    'personal transformation guide',
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
    title: 'Identity vs Behavior Change: Why Willpower Always Fails',
    description: 'The hidden reason most self-improvement efforts don\'t last — and the identity-first approach that creates permanent transformation.',
    url: isAr ? arUrl : enUrl,
    siteName: 'Tamkinly',
    type: 'article',
    publishedTime: '2026-02-15',
    modifiedTime: '2026-02-20',
    authors: ['Abdallah Chouaf'],
    images: [
      {
        url: 'https://tamkinly.com/guides/identity-vs-behavior-change/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Identity vs Behavior Change Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Identity vs Behavior Change: Why Willpower Always Fails',
    description: 'The hidden reason most self-improvement efforts don\'t last — and the identity-first approach that creates permanent transformation.',
    site: '@tamkinly',
    images: ['https://tamkinly.com/guides/identity-vs-behavior-change/opengraph-image'],
  },
  other: {
    'DC.description': 'The hidden reason most self-improvement efforts don\'t last — and the identity-first approach that creates permanent transformation.',
    'DC.subject': 'identity vs behavior, willpower fails, identity transformation',
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
