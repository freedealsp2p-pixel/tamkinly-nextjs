import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr ? 'تحميلات التعافي | تمكينلي' : 'Recovery Downloads | Tamkinly';
  const description = isAr
    ? 'حمّل أوراق العمل وأدوات التعافي: خرائط المحفزات، خطة السلامة، وممارسات يومية لدعم رحلة تعافيك.'
    : 'Download recovery worksheets and tools: trigger mapping, safety plan, and daily practices to support your recovery journey.';
  const enUrl = 'https://tamkinly.com/recovery/porn-recovery/downloads';
  const arUrl = 'https://tamkinly.com/ar/recovery/porn-recovery/downloads';
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

export default function PornRecoveryDownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
