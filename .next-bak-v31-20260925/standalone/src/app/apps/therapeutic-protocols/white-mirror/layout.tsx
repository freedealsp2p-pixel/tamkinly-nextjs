import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

const SITE_URL = 'https://tamkinly.com';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr
    ? 'المرآة البيضاء | تمكينلي'
    : 'The White Mirror | Tamkinly';
  const description = isAr
    ? 'أوقف عجلة الأفكار السلبية بقوة في لحظة الفراغ التام. بروتوكول كسر النمط الآمن — ٤ خطوات في ٩ دقائق.'
    : 'Forcefully halt the cycle of negative thoughts in a moment of complete void. Safe pattern interrupt protocol — 4 steps in 9 minutes.';

  return {
    title,
    description,
    alternates: {
      canonical: isAr ? `${SITE_URL}/ar/apps/therapeutic-protocols/white-mirror` : `${SITE_URL}/apps/therapeutic-protocols/white-mirror`,
      languages: {
        'en-US': `${SITE_URL}/apps/therapeutic-protocols/white-mirror`,
        'ar-SA': `${SITE_URL}/ar/apps/therapeutic-protocols/white-mirror`,
        'x-default': `${SITE_URL}/apps/therapeutic-protocols/white-mirror`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/apps/therapeutic-protocols/white-mirror`,
      siteName: 'Tamkinly',
      type: 'website',
      locale: isAr ? 'ar_AR' : 'en_US',
      images: [{ url: 'https://tamkinly.com/og-image.webp', width: 1200, height: 630, alt: title }],
    },
  };
}

export default function WhiteMirrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
