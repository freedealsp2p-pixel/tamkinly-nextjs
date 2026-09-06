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
  en: { title: "Thought Reframing Tool | Tamkinly", description: "A cognitive tool for reframing trauma-related thoughts." },
  ar: { title: "\u0625\u0639\u0627\u062f\u0629 \u0635\u064a\u0627\u063a\u0629 \u0627\u0644\u0623\u0641\u0643\u0627\u0631 | Tamkinly", description: "\u0623\u062f\u0627\u0629 \u0645\u0639\u0631\u0641\u064a\u0629 \u0644\u0625\u0639\u0627\u062f\u0629 \u0635\u064a\u0627\u063a\u0629 \u0627\u0644\u0623\u0641\u0643\u0627\u0631 \u0627\u0644\u0645\u0631\u062a\u0628\u0637\u0629 \u0628\u0627\u0644\u0635\u062f\u0645\u0629." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/thought-reframing' : 'https://tamkinly.com/recovery/trc/thought-reframing';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/thought-reframing',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/thought-reframing',
        'x-default': 'https://tamkinly.com/recovery/trc/thought-reframing',
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

export default function ThoughtreframingLayout({ children }: { children: React.ReactNode }) {
  return <RecoveryShell>{children}</RecoveryShell>;
}



