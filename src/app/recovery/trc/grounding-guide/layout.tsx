import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr ? 'دليل التأريض: لماذا يعمل وكيف تستخدمه' : 'Grounding Guide: Why It Works and How to Use It';
  const description = isAr ? 'افهم الأساس العصبي لتقنية التأريض 5-4-3-2-1 وكيف تستخدمها لتهدئة جهازك العصبي خلال اللحظات الصعبة.' : 'Understand the neuroscience behind the 5-4-3-2-1 grounding technique and how to use it to calm your nervous system during distressing moments.';
  const enUrl = 'https://tamkinly.com/recovery/trc/grounding-guide';
  const arUrl = 'https://tamkinly.com/ar/recovery/trc/grounding-guide';
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
