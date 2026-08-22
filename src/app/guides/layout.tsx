import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides | Deep Transformation Resources',
  description: 'In-depth guides for identity transformation, habit change, and personal growth. Research-backed frameworks to help you become who you want to be.',
  keywords: [
    'identity transformation guides',
    'behavior change guide',
    'personal growth resources',
    'self-improvement guides',
    'identity shift framework',
  ],
  alternates: {
    canonical: 'https://tamkinly.com/guides',
    languages: {
      'en-US': 'https://tamkinly.com/guides',
      'ar-SA': 'https://tamkinly.com/ar/guides',
      'x-default': 'https://tamkinly.com/guides',
    },
  },
  openGraph: {
    title: 'Guides | Deep Transformation Resources',
    description: 'In-depth guides for identity transformation, habit change, and personal growth.',
    url: 'https://tamkinly.com/guides',
    siteName: 'Tamkinly',
    type: 'website',
    images: [
      {
        url: 'https://tamkinly.com/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Tamkinly Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides | Deep Transformation Resources',
    description: 'In-depth guides for identity transformation, habit change, and personal growth.',
    site: '@tamkinly',
    images: ['https://tamkinly.com/og-image.webp'],
  },
  other: {
    'DC.description': 'In-depth guides for identity transformation, habit change, and personal growth. Research-backed frameworks to help you become who you want to be.',
    'DC.subject': 'identity transformation guides, behavior change, personal growth',
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

