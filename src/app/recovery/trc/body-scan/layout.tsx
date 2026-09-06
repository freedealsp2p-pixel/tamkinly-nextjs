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
  ar: { title: "\u0645\u0633\u062d \u0627\u0644\u062c\u0633\u062f | Tamkinly", description: "تمرين تأملي موجّه لمسح الجسد وتحديد مناطق التوتر خطوة بخطوة — استعد تواصلك مع إحساسك الجسدي، وأفرِغ التوتر المتراكم بعمق وأمان." },
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
      images: [{ url: 'https://tamkinly.com/og-image.webp', width: 1200, height: 630, alt: 'Tamkinly' }],
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



