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
  en: { title: "Safe Place Exercise | Tamkinly", description: "A guided imagery exercise for building a mental safe place." },
  ar: { title: "\u062a\u0645\u0631\u064a\u0646 \u0627\u0644\u0645\u0643\u0627\u0646 \u0627\u0644\u0622\u0645\u0646 | Tamkinly", description: "\u062a\u0645\u0631\u064a\u0646 \u062a\u062e\u064a\u0644\u064a \u0645\u0648\u062c\u0651\u0647 \u0644\u0628\u0646\u0627\u0621 \u0645\u0643\u0627\u0646 \u0622\u0645\u0646 \u0630\u0647\u0646\u064a." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/safe-place' : 'https://tamkinly.com/recovery/trc/safe-place';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/safe-place',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/safe-place',
        'x-default': 'https://tamkinly.com/recovery/trc/safe-place',
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

export default function SafeplaceLayout({ children }: { children: React.ReactNode }) {
  return <RecoveryShell>{children}</RecoveryShell>;
}



