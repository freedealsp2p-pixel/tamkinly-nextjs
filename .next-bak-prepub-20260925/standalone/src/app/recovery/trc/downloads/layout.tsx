import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr ? 'تحميلات TRC | تمكينلي' : 'TRC Downloads | Tamkinly';
  const description = isAr ? 'حمّل المجموعة الكاملة من أوراق عمل TRC: خطة السلامة، خرائط المحفزات، بطاقات التأريض والمزيد — موارد تعافٍ مجانية للطباعة.' : 'Download the complete set of TRC worksheets: safety plan, trigger mapping, grounding cards, and more — free printable recovery resources.';
  const enUrl = 'https://tamkinly.com/recovery/trc/downloads';
  const arUrl = 'https://tamkinly.com/ar/recovery/trc/downloads';
  return {
    title,
    description,
    alternates: {
      canonical: isAr ? arUrl : enUrl,
      languages: {
        'en-US': enUrl,
        'ar-SA': arUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: isAr ? arUrl : enUrl,
      siteName: 'Tamkinly',
      type: 'website',
      locale: isAr ? 'ar_SA' : 'en_US',
      images: [{ url: 'https://tamkinly.com/og-image.webp', width: 1200, height: 630, alt: 'Tamkinly' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: ['https://tamkinly.com/og-image.webp'],
    },
  };
}

export default function TrcPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
