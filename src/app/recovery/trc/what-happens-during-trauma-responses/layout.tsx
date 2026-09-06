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
  en: { title: "Trauma Response Patterns | Tamkinly", description: "Understand what happens during trauma responses \u2014 fight, flight, freeze, and fawn." },
  ar: { title: "\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0627\u0633\u062a\u062c\u0627\u0628\u0629 \u0644\u0644\u0635\u062f\u0645\u0629 | Tamkinly", description: "\u0627\u0641\u0647\u0645 \u0645\u0627\u0630\u0627 \u064a\u062d\u062f\u062b \u0623\u062b\u0646\u0627\u0621 \u0627\u0644\u0627\u0633\u062a\u062c\u0627\u0628\u0627\u062a \u0644\u0644\u0635\u062f\u0645\u0629 \u2014 \u0627\u0644\u0642\u062a\u0627\u0644\u060c \u0627\u0644\u0647\u0631\u0628\u060c \u0627\u0644\u062a\u062c\u0645\u062f\u060c \u0648\u0627\u0644\u0645\u0644\u0627\u064a\u0646\u0629." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/what-happens-during-trauma-responses' : 'https://tamkinly.com/recovery/trc/what-happens-during-trauma-responses';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/what-happens-during-trauma-responses',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/what-happens-during-trauma-responses',
        'x-default': 'https://tamkinly.com/recovery/trc/what-happens-during-trauma-responses',
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

export default function WhathappensduringtraumaresponsesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}



