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
  en: { title: "TRC Worksheets | Tamkinly", description: "Interactive therapeutic worksheets for trauma recovery \u2014 safety plan, trigger mapping, and more." },
  ar: { title: "\u0623\u0648\u0631\u0627\u0642 \u0639\u0645\u0644 TRC | Tamkinly", description: "\u0623\u0648\u0631\u0627\u0642 \u0639\u0645\u0644 \u0639\u0644\u0627\u062c\u064a\u0629 \u062a\u0641\u0627\u0639\u0644\u064a\u0629 \u0644\u0644\u062a\u0639\u0627\u0641\u064a \u0645\u0646 \u0627\u0644\u0635\u062f\u0645\u0627\u062a." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/worksheets' : 'https://tamkinly.com/recovery/trc/worksheets';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        en: 'https://tamkinly.com/recovery/trc/worksheets',
        ar: 'https://tamkinly.com/ar/recovery/trc/worksheets',
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

export default function WorksheetsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
