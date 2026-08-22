import { Metadata } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

async function getLocale(): Promise<'en' | 'ar'> {
  try {
    const headersList = await headers();
    const urlLocale = headersList.get('x-locale');
    if (urlLocale === 'ar') return 'ar';
  } catch {}
  return 'en';
}

const metadataByLocale = {
  en: { title: "What Trauma Does to the Body | Tamkinly", description: "Psychoeducational content explaining how trauma affects brain structure, the nervous system, and the body." },
  ar: { title: "\u0645\u0627\u0630\u0627 \u062a\u0641\u0639\u0644 \u0627\u0644\u0635\u062f\u0645\u0629 \u0628\u0627\u0644\u062c\u0633\u062f | Tamkinly", description: "\u0645\u062d\u062a\u0648\u0649 \u062a\u0639\u0644\u064a\u0645\u064a \u0646\u0641\u0633\u064a \u064a\u0634\u0631\u062d \u0643\u064a\u0641 \u062a\u0624\u062b\u0631 \u0627\u0644\u0635\u062f\u0645\u0629 \u0639\u0644\u0649 \u0628\u0646\u064a\u0629 \u0627\u0644\u062f\u0645\u0627\u063a \u0648\u0627\u0644\u062c\u0647\u0627\u0632 \u0627\u0644\u0639\u0635\u0628\u064a \u0648\u0627\u0644\u062c\u0633\u062f." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/what-trauma-does-to-the-body' : 'https://tamkinly.com/recovery/trc/what-trauma-does-to-the-body';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/what-trauma-does-to-the-body',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/what-trauma-does-to-the-body',
        'x-default': 'https://tamkinly.com/recovery/trc/what-trauma-does-to-the-body',
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

export default function WhattraumadoestothebodyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



