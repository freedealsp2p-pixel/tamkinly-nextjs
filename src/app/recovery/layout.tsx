import type { Metadata } from 'next';
import { RecoveryShell } from '@/components/recovery/system';

const SITE_URL = 'https://tamkinly.com';

export const metadata: Metadata = {
  title: 'Recovery Center | Tamkinly',
  description:
    'Specialized recovery paths for building a more stable foundation for change. Trauma-informed tools and evidence-based recovery frameworks.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${SITE_URL}/recovery`,
    languages: {
      'en-US': `${SITE_URL}/recovery`,
      'ar-SA': `${SITE_URL}/ar/recovery`,
      'x-default': `${SITE_URL}/recovery`,
    },
  },
  openGraph: {
    title: 'Recovery Center | Tamkinly',
    description:
      'Specialized recovery paths for building a more stable foundation for change. Trauma-informed tools and evidence-based recovery frameworks.',
    url: `${SITE_URL}/recovery`,
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    type: 'website',
  },
};

export default function RecoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoveryShell>{children}</RecoveryShell>;
}
