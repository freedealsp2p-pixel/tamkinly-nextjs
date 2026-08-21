import { Metadata } from 'next';
import { headers } from 'next/headers';
import { RecoveryShell } from '@/components/recovery/system';


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
  en: { title: "5-4-3-2-1 Grounding | Tamkinly", description: "Interactive 5-4-3-2-1 sensory grounding exercise to help you stay present during distressing moments." },
  ar: { title: "\u0627\u0644\u062a\u0623\u0631\u064a\u0636 5-4-3-2-1 | Tamkinly", description: "\u062a\u0645\u0631\u064a\u0646 \u062a\u0623\u0631\u064a\u0636 \u062d\u0633\u064a \u062a\u0641\u0627\u0639\u0644\u064a 5-4-3-2-1 \u0644\u0645\u0633\u0627\u0639\u062f\u062a\u0643 \u0639\u0644\u0649 \u0627\u0644\u0628\u0642\u0627\u0621 \u0641\u064a \u0627\u0644\u0644\u062d\u0638\u0629 \u0623\u062b\u0646\u0627\u0621 \u0627\u0644\u0623\u0648\u0642\u0627\u062a \u0627\u0644\u0645\u0632\u0639\u062c\u0629." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/grounding' : 'https://tamkinly.com/recovery/trc/grounding';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        en: 'https://tamkinly.com/recovery/trc/grounding',
        ar: 'https://tamkinly.com/ar/recovery/trc/grounding',
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

export default function GroundingLayout({ children }: { children: React.ReactNode }) {
  return <RecoveryShell>{children}</RecoveryShell>;
}
