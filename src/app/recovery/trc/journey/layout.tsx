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
  en: { title: "TRC Journey \u2014 Your Recovery Path | Tamkinly", description: "Track your progress through the Trauma Recovery Components toolkit." },
  ar: { title: "\u0631\u062d\u0644\u0629 TRC \u2014 \u0645\u0633\u0627\u0631 \u062a\u0639\u0627\u0641\u064a\u0643 | Tamkinly", description: "\u062a\u062a\u0628\u0651\u0639 \u062a\u0642\u062f\u0651\u0645\u0643 \u0639\u0628\u0631 \u0645\u062c\u0645\u0648\u0639\u0629 \u0623\u062f\u0648\u0627\u062a \u0627\u0644\u062a\u0639\u0627\u0641\u064a \u0645\u0646 \u0627\u0644\u0635\u062f\u0645\u0627\u062a." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/journey' : 'https://tamkinly.com/recovery/trc/journey';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/journey',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/journey',
        'x-default': 'https://tamkinly.com/recovery/trc/journey',
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

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



