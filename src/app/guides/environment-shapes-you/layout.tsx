import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Environment Shapes You: Personal Environment Audit Guide',
  description: 'Your physical, digital, and social environment shapes your identity more than you think. Learn how to design an environment that automatically supports your new identity. Free guide.',
  keywords: [
    'environment shapes identity',
    'environmental audit',
    'environment design',
    'behavioral architecture',
    'identity environment',
    'habit environment',
    'personal environment guide',
    'BJ Fogg tiny habits',
  ],
  alternates: {
    canonical: 'https://tamkinly.com/guides/environment-shapes-you',
  },
  openGraph: {
    title: 'Your Environment Shapes You: Personal Environment Audit Guide',
    description: 'Your physical, digital, and social environment shapes your identity more than you think. Learn how to design an environment that supports your new identity.',
    url: 'https://tamkinly.com/guides/environment-shapes-you',
    siteName: 'Tamkinly',
    type: 'article',
    publishedTime: '2026-02-15',
    authors: ['Abdallah Chouaf'],
    images: [
      {
        url: 'https://tamkinly.com/guides/environment-shapes-you/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Your Environment Shapes You Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Environment Shapes You: Personal Environment Audit Guide',
    description: 'Your physical, digital, and social environment shapes your identity more than you think. Learn how to design an environment that supports your new identity.',
    site: '@tamkinly',
    images: ['https://tamkinly.com/guides/environment-shapes-you/opengraph-image'],
  },
  other: {
    'DC.description': 'Your physical, digital, and social environment shapes your identity more than you think. Learn how to design an environment that supports your new identity.',
    'DC.subject': 'environment shapes identity, environmental audit, environment design',
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
