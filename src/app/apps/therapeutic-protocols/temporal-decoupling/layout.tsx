import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

const SITE_URL = 'https://tamkinly.com';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr
    ? 'التفكيك الزمني | تمكينلي'
    : 'Temporal Decoupling | Tamkinly';
  const description = isAr
    ? 'بروتوكول إيحائي لتفكيك الذكريات المؤلمة عبر سؤال بسيط: «كيف وصلت إلى هذه اللحظة؟» — ٧ خطوات في ١٢ دقيقة.'
    : 'A hypnotic protocol for decoupling painful memories through a single question: "How did I arrive at this moment?" — 7 steps in 12 minutes.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/apps/therapeutic-protocols/temporal-decoupling`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/apps/therapeutic-protocols/temporal-decoupling`,
      siteName: 'Tamkinly',
      type: 'website',
      locale: isAr ? 'ar_AR' : 'en_US',
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
