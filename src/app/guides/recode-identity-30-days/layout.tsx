import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Recode Your Identity in 30 Days | Step-by-Step Guide',
  description: 'A practical step-by-step guide to transforming your identity from the inside out. Based on neuroscience research showing 21-30 days for new neural pathways. Free guide with exercises.',
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
    canonical: 'https://tamkinly.com/guides/recode-identity-30-days',
  },
  openGraph: {
    title: 'How to Recode Your Identity in 30 Days',
    description: 'A practical step-by-step guide to transforming your identity from the inside out. Based on neuroscience research showing 21-30 days for new neural pathways.',
    url: 'https://tamkinly.com/guides/recode-identity-30-days',
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

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
