import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const base = buildMetadata('aiCoach');
  const enUrl = 'https://tamkinly.com/apps/ai-identity-coach';
  const arUrl = 'https://tamkinly.com/ar/apps/ai-identity-coach';
  return {
    ...base,
    alternates: {
      canonical: isAr ? arUrl : enUrl,
      languages: {
        'en-US': enUrl,
        'ar-SA': arUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      ...(base.openGraph || {}),
      url: isAr ? arUrl : enUrl,
      locale: isAr ? 'ar_SA' : 'en_US',
    },
  };
}

export default function AppPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
