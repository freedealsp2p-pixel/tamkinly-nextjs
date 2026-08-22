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
  en: { title: "Body Scan | Tamkinly", description: "A guided meditative exercise for scanning the body and identifying areas of tension." },
  ar: { title: "\u0645\u0633\u062d \u0627\u0644\u062c\u0633\u062f | Tamkinly", description: "\u062a\u0645\u0631\u064a\u0646 \u062a\u0623\u0645\u0644\u064a \u0645\u0648\u062c\u0651\u0647 \u0644\u0645\u0633\u062d \u0627\u0644\u062c\u0633\u062f \u0648\u062a\u062d\u062f\u064a\u062f \u0645\u0646\u0627\u0637\u0642 \u0627\u0644\u062a\u0648\u062a\u0631." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/body-scan' : 'https://tamkinly.com/recovery/trc/body-scan';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/body-scan',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/body-scan',
        'x-default': 'https://tamkinly.com/recovery/trc/body-scan',
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

export default function BodyscanLayout({ children }: { children: React.ReactNode }) {
  return <RecoveryShell>{children}</RecoveryShell>;
}



