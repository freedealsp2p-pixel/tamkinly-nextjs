import { Metadata } from 'next';
import { headers } from 'next/headers';
import { RecoveryShell } from '@/components/recovery/system';


async function getLocale(): Promise<'en' | 'ar'> {
  try {
    const headersList = await headers();
    const urlLocale = headersList.get('x-locale');
    if (urlLocale === 'ar') return 'ar';
  } catch {}
  return 'en';
}

const metadataByLocale = {
  en: { title: "5-2 Breathing Exercise | Tamkinly", description: "A therapeutic breathing technique for rapid self-regulation during acute stress." },
  ar: { title: "\u062a\u0645\u0631\u064a\u0646 \u0627\u0644\u062a\u0646\u0641\u0651\u0633 5-2 | Tamkinly", description: "\u062a\u0642\u0646\u064a\u0629 \u062a\u0646\u0641\u0651\u0633 \u0639\u0644\u0627\u062c\u064a\u0629 \u0644\u0644\u062a\u0646\u0638\u064a\u0645 \u0627\u0644\u0630\u0627\u062a\u064a \u0627\u0644\u0633\u0631\u064a\u0639 \u062e\u0644\u0627\u0644 \u0627\u0644\u062a\u0648\u062a\u0631 \u0627\u0644\u062d\u0627\u062f." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/a52' : 'https://tamkinly.com/recovery/trc/a52';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/a52',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/a52',
        'x-default': 'https://tamkinly.com/recovery/trc/a52',
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [{ url: 'https://tamkinly.com/og-image.webp', width: 1200, height: 630, alt: 'Tamkinly' }],
    },
    twitter: {
      card: 'summary',
      title: m.title,
      description: m.description,
    },
  };
}

export default function A52Layout({ children }: { children: React.ReactNode }) {
  return <RecoveryShell>{children}</RecoveryShell>;
}



