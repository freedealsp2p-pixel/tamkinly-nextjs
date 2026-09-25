import { Metadata } from 'next';
import { headers } from 'next/headers';
import CrisisBar from '@/components/recovery/system/CrisisBar';

export const dynamic = 'force-dynamic';

async function getLocale(): Promise<'en' | 'ar'> {
  try {
    const headersList = await headers();
    const urlLocale = headersList.get('x-locale');
    if (urlLocale === 'ar') return 'ar';
  } catch {}
  return 'en';
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const basePath = isAr ? 'https://tamkinly.com/ar/recovery/trc' : 'https://tamkinly.com/recovery/trc';
  return {
    title: isAr ? 'مركز التعافي من الصدمات (TRC) | Tamkinly' : 'Trauma Recovery Center (TRC) | Tamkinly',
    description: isAr
      ? 'أدوات قائمة على الأدلة للتعافي من الصدمات: تمارين تأريض وتنفّس ومسح للجسد ويوميات للمعالجة — خطوات عملية آمنة خطوة بخطوة نحو التعافي.'
      : 'Evidence-based trauma recovery tools — grounding, breathing, body scan, and more.',
    robots: { index: true, follow: true },
    alternates: {
      canonical: basePath,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc',
        'x-default': 'https://tamkinly.com/recovery/trc',
      },
    },
    openGraph: {
      title: isAr ? 'مركز التعافي من الصدمات (TRC) | Tamkinly' : 'Trauma Recovery Center (TRC) | Tamkinly',
      description: isAr
        ? 'أدوات قائمة على الأدلة للتعافي من الصدمات: تمارين تأريض وتنفّس ومسح للجسد ويوميات للمعالجة — خطوات عملية آمنة خطوة بخطوة نحو التعافي.'
        : 'Evidence-based trauma recovery tools — grounding, breathing, body scan, and more.',
      url: basePath,
      siteName: 'Tamkinly',
      locale: isAr ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [{ url: 'https://tamkinly.com/og-image.webp', width: 1200, height: 630, alt: 'Tamkinly' }],
    },
  };
}

export default function TrcLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CrisisBar />
    </>
  );
}
