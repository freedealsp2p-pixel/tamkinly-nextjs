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
  en: { title: "Trauma Journal | Tamkinly", description: "A safe and structured writing tool for processing traumatic experiences." },
  ar: { title: "\u064a\u0648\u0645\u064a\u0627\u062a \u0627\u0644\u062a\u0639\u0627\u0641\u064a | Tamkinly", description: "أداة كتابية آمنة ومنظمة لمعالجة التجارب الصادمة: اكتب بما تشعر بحرية، ورتّب أفكارك بأسئلة موجّهة، وراقب مسار تعافيك عبر الزمن." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const fullUrl = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/trauma-journal' : 'https://tamkinly.com/recovery/trc/trauma-journal';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/trauma-journal',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/trauma-journal',
        'x-default': 'https://tamkinly.com/recovery/trc/trauma-journal',
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

export default function TraumajournalLayout({ children }: { children: React.ReactNode }) {
  return <RecoveryShell>{children}</RecoveryShell>;
}



