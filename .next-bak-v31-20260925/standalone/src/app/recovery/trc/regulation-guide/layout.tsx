import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr ? 'دليل التنظيم: فهم نافذة التحمل وكيفية توسيعها' : 'Regulation Guide: Understanding the Window of Tolerance';
  const description = isAr ? 'تعرّف على نافذة التحمل، وكيف تدفعك الضغوطات خارجها، وطرق عملية لتوسيع قدرتك على التنظيم العاطفي.' : 'Learn about the Window of Tolerance, how stress pushes you out of it, and practical ways to widen your capacity for emotional regulation.';
  const enUrl = 'https://tamkinly.com/recovery/trc/regulation-guide';
  const arUrl = 'https://tamkinly.com/ar/recovery/trc/regulation-guide';
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
