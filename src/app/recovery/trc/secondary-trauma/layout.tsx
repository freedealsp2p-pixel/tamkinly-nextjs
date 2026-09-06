import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr ? 'الصدمة الثانوية: عندما تتأثر بصرخة شخص آخر' : "Secondary Trauma: When You Are Affected by Another's Cry";
  const description = isAr ? 'الصدمة الثانوية تؤثر على الآباء والشركاء والمساعدين الذين يشهدون جراح الآخرين. تعرّف على العلامات وطريق التعافي.' : "Secondary Trauma (STS) affects parents, partners, and helpers who witness another person's wounds. Learn the signs and the path to recovery.";
  const enUrl = 'https://tamkinly.com/recovery/trc/secondary-trauma';
  const arUrl = 'https://tamkinly.com/ar/recovery/trc/secondary-trauma';
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
