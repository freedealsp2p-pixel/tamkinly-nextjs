import type { Metadata } from 'next';
import { PAGE_METADATA } from '@/lib/seo-pages';
import { AppAccessGuard } from '@/components/AppAccessGuard';

export const metadata: Metadata = {
  title: PAGE_METADATA.apps.title,
  description: PAGE_METADATA.apps.description,
  keywords: PAGE_METADATA.apps.keywords,
  alternates: {
    canonical: 'https://tamkinly.com/apps',
    languages: {
      'en-US': 'https://tamkinly.com/apps',
      'ar-SA': 'https://tamkinly.com/ar/apps',
      'x-default': 'https://tamkinly.com/apps',
    },
  },
  openGraph: {
    title: PAGE_METADATA.apps.title,
    description: PAGE_METADATA.apps.description,
    url: 'https://tamkinly.com/apps',
    siteName: 'Tamkinly',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_METADATA.apps.title,
    description: PAGE_METADATA.apps.description,
  },
};

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppAccessGuard>
      {children}
    </AppAccessGuard>
  );
}

