import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Behavior Trap: Why Habits Fail and How They Succeed',
  description: 'Most people focus on changing behavior while ignoring identity. Learn why behavioral change alone fails and how to build a new identity that supports your goals. Free guide.',
  keywords: [
    'behavior trap',
    'why habits fail',
    'behavioral change fails',
    'identity-based habits',
    'willpower myth',
    'habit formation',
    'behavior identity gap',
    'lasting change guide',
  ],
  alternates: {
    canonical: 'https://tamkinly.com/guides/behavior-trap-why-habits-fail',
  },
  openGraph: {
    title: 'The Behavior Trap: Why Habits Fail and How They Succeed',
    description: 'Most people focus on changing behavior while ignoring identity. Learn why behavioral change alone fails and how to build a new identity that supports your goals.',
    url: 'https://tamkinly.com/guides/behavior-trap-why-habits-fail',
    siteName: 'Tamkinly',
    type: 'article',
    publishedTime: '2026-02-15',
    authors: ['Abdallah Chouaf'],
    images: [
      {
        url: 'https://tamkinly.com/guides/behavior-trap-why-habits-fail/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'The Behavior Trap: Why Habits Fail Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Behavior Trap: Why Habits Fail and How They Succeed',
    description: 'Most people focus on changing behavior while ignoring identity. Learn why behavioral change alone fails and how to build a new identity that supports your goals.',
    site: '@tamkinly',
    images: ['https://tamkinly.com/guides/behavior-trap-why-habits-fail/opengraph-image'],
  },
  other: {
    'DC.description': 'Most people focus on changing behavior while ignoring identity. Learn why behavioral change alone fails and how to build a new identity that supports your goals.',
    'DC.subject': 'behavior trap, why habits fail, identity-based habits',
  },
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
