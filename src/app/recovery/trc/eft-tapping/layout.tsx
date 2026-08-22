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
  en: { title: "EFT Tapping Technique | Tamkinly", description: "A self-help tool for reducing the intensity of emotional responses through tapping on body points." },
  ar: { title: "\u062a\u0642\u0646\u064a\u0629 EFT \u0644\u0644\u0646\u0642\u0631 \u0627\u0644\u0639\u0635\u0628\u064a | Tamkinly", description: "\u0623\u062f\u0627\u0629 \u0630\u0627\u062a\u064a\u0629 \u0644\u0644\u062a\u062e\u0641\u064a\u0641 \u0645\u0646 \u0634\u062f\u0629 \u0627\u0644\u0627\u0633\u062a\u062c\u0627\u0628\u0627\u062a \u0627\u0644\u0639\u0627\u0637\u0641\u064a\u0629 \u0639\u0628\u0631 \u0627\u0644\u0646\u0642\u0631 \u0639\u0644\u0649 \u0646\u0642\u0627\u0637 \u0627\u0644\u062c\u0633\u062f." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/eft-tapping' : 'https://tamkinly.com/recovery/trc/eft-tapping';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/eft-tapping',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/eft-tapping',
        'x-default': 'https://tamkinly.com/recovery/trc/eft-tapping',
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

export default function EfttappingLayout({ children }: { children: React.ReactNode }) {
  return <RecoveryShell>{children}</RecoveryShell>;
}



