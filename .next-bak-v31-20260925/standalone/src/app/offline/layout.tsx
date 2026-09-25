import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offline | Tamkinly',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: 'https://tamkinly.com/offline',
  },
  other: {
    'DC.description': 'Tamkinly offline page. You are currently offline.',
  },
};

export default function OfflineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
