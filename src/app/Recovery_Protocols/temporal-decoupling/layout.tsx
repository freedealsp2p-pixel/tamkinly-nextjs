import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

const SITE_URL = 'https://tamkinly.com';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr
    ? 'التفكيك الزمني  | تمكينلي — عد إلى مركزك'
    : 'Temporal Decoupling  | Tamkinly — Return to Your Center';
  const description = isAr
    ? 'بروتوكول موجّه لتفكيك الذكريات المؤلمة عبر سؤال بسيط: «كيف وصلت إلى هذه اللحظة؟» — 7 خطوات في 12 دقيقة.'
    : 'A guided protocol for decoupling painful memories through a single question: "How did I arrive at this moment?" — 7 steps in 12 minutes.';

  return {
    title,
    description,
    alternates: {
      canonical: isAr ? `${SITE_URL}/ar/Recovery_Protocols/temporal-decoupling` : `${SITE_URL}/Recovery_Protocols/temporal-decoupling`,
      languages: {
        'en-US': `${SITE_URL}/Recovery_Protocols/temporal-decoupling`,
        'ar-SA': `${SITE_URL}/ar/Recovery_Protocols/temporal-decoupling`,
        'x-default': `${SITE_URL}/Recovery_Protocols/temporal-decoupling`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/Recovery_Protocols/temporal-decoupling`,
      siteName: 'Tamkinly',
      type: 'website',
      locale: isAr ? 'ar_AR' : 'en_US',
      images: [{ url: 'https://tamkinly.com/og-image.webp', width: 1200, height: 630, alt: title }],
    },
  };
}

export default function TemporalDecouplingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
