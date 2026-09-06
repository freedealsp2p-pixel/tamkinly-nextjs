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
  en: { title: "Regulation Toolkit | Tamkinly", description: "Evidence-based regulation techniques and tools to manage emotional arousal." },
  ar: { title: "\u0645\u062c\u0645\u0648\u0639\u0629 \u0623\u062f\u0648\u0627\u062a \u0627\u0644\u062a\u0646\u0638\u064a\u0645 | Tamkinly", description: "\u0645\u062c\u0645\u0648\u0639\u0629 \u0645\u0646 \u062a\u0642\u0646\u064a\u0627\u062a \u0648\u0623\u062f\u0648\u0627\u062a \u0627\u0644\u062a\u0646\u0638\u064a\u0645 \u0627\u0644\u0645\u0628\u0646\u064a\u0629 \u0639\u0644\u0649 \u0627\u0644\u0623\u062f\u0644\u0629 \u0644\u0645\u0633\u0627\u0639\u062f\u062a\u0643 \u0639\u0644\u0649 \u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0627\u0633\u062a\u062b\u0627\u0631\u0629 \u0627\u0644\u0639\u0627\u0637\u0641\u064a\u0629." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/regulation-toolkit' : 'https://tamkinly.com/recovery/trc/regulation-toolkit';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/regulation-toolkit',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/regulation-toolkit',
        'x-default': 'https://tamkinly.com/recovery/trc/regulation-toolkit',
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

export default function RegulationtoolkitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



