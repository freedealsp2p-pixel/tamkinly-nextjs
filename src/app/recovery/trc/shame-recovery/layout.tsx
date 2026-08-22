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
  en: { title: "Shame Recovery Tool | Tamkinly", description: "An interactive tool for understanding and separating shame after trauma from your identity." },
  ar: { title: "\u0627\u0644\u062a\u0639\u0627\u0641\u064a \u0645\u0646 \u0627\u0644\u0639\u0627\u0631 | Tamkinly", description: "\u0623\u062f\u0627\u0629 \u062a\u0641\u0627\u0639\u0644\u064a\u0629 \u0644\u0641\u0647\u0645 \u0627\u0644\u0639\u0627\u0631 \u0628\u0639\u062f \u0627\u0644\u0635\u062f\u0645\u0629 \u0648\u0641\u0635\u0644\u0647 \u0639\u0646 \u0647\u0648\u064a\u062a\u0643." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/shame-recovery' : 'https://tamkinly.com/recovery/trc/shame-recovery';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/shame-recovery',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/shame-recovery',
        'x-default': 'https://tamkinly.com/recovery/trc/shame-recovery',
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

export default function ShamerecoveryLayout({ children }: { children: React.ReactNode }) {
  return <RecoveryShell>{children}</RecoveryShell>;
}



