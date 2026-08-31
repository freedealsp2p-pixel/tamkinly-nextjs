import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

const SITE_URL = 'https://tamkinly.com';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr
    ? 'الشفرة البديلة | تمكينلي'
    : 'The Alternative Code | Tamkinly';
  const description = isAr
    ? 'حوّل اسماً مؤلماً إلى شفرة لعالم جديد. بروتوكول إيحائي للاستبدال العصبي — ٥ خطوات في ١٥ دقيقة.'
    : 'Transform a painful name into a code for a new world. Hypnotic neural substitution protocol — 5 steps in 15 minutes.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/apps/therapeutic-protocols/alternative-code`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/apps/therapeutic-protocols/alternative-code`,
      siteName: 'Tamkinly',
      type: 'website',
      locale: isAr ? 'ar_AR' : 'en_US',
    },
  };
}

export default function AlternativeCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
