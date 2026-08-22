import { Metadata } from 'next';
import { headers } from 'next/headers';

async function getLocale(): Promise<'en' | 'ar'> {
  try {
    const headersList = await headers();
    const urlLocale = headersList.get('x-locale');
    if (urlLocale === 'ar') return 'ar';
  } catch {}
  return 'en';
}

const metadataByLocale = {
  en: { title: 'Recovery Journey | Tamkinly', description: 'Track your progress through the porn recovery journey.' },
  ar: { title: 'رحلة التعافي | Tamkinly', description: 'تتبّع تقدّمك عبر رحلة التعافي.' },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/porn-recovery/journey' : 'https://tamkinly.com/recovery/porn-recovery/journey';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/porn-recovery/journey',
        'ar-SA': 'https://tamkinly.com/ar/recovery/porn-recovery/journey',
        'x-default': 'https://tamkinly.com/recovery/porn-recovery/journey',
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: m.title,
      description: m.description,
    },
  };
}

export default function PornRecoveryJourneyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



