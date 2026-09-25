import type { Metadata } from 'next';
import { headers } from 'next/headers';
import RecoveryPage from "@/components/recovery/RecoveryPage";
import { MedicalDisclaimer } from '@/components/recovery/system';

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
  const basePath = isAr ? 'https://tamkinly.com/ar/recovery/porn-recovery' : 'https://tamkinly.com/recovery/porn-recovery';
  return {
    title: isAr ? 'رحلة التعافي | تمكينلي' : 'Recovery Journey | Tamkinly',
    description: isAr
      ? 'رحلة تعافي مجانية مبنية على الأدلة. افهم حلقة السلوك القهري، وابنِ أدوات عملية (HALT، سجل المحفزات، خطة الطوارئ)، وكن من تريد أن تكون — بدون لوم ذات.'
      : 'A free, evidence-based recovery journey. Understand the behavioral loop, build practical tools (HALT, Trigger Journal, Emergency Plan) — without self-blame.',
    keywords: isAr
      ? ['رحلة التعافي', 'تغيير السلوك', 'التعافي من السلوك القهري', 'فحص HALT', 'سجل المحفزات', 'التعافي من الانتكاس', 'تحويل الهوية', 'أدوات المساعدة الذاتية']
      : ['recovery journey', 'behavior change', 'compulsive behavior recovery', 'HALT check', 'trigger journal', 'relapse recovery', 'identity transformation', 'self-help tools', 'recovery framework'],
    alternates: {
      canonical: basePath,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/porn-recovery',
        'ar-SA': 'https://tamkinly.com/ar/recovery/porn-recovery',
        'x-default': 'https://tamkinly.com/recovery/porn-recovery',
      },
    },
    openGraph: {
      title: isAr ? 'رحلة التعافي — ابدأ بدون لوم ذات' : 'Recovery Journey — Begin Without Self-Blame',
      description: isAr
        ? 'افهم ما يحدث في عقلك، وابنِ أدوات عملية، وكن من تريد أن تكون.'
        : 'Understand what is happening inside your brain, build practical tools, and become who you want to be.',
      url: basePath,
      siteName: isAr ? 'تمكينلي' : 'Tamkinly',
      type: 'website',
      images: [{ url: 'https://tamkinly.com/og-image.webp', width: 1200, height: 630, alt: 'Tamkinly' }],
    },
    robots: { index: true, follow: true },
  };
}

export default function Page() {
  return (
    <>
      <MedicalDisclaimer />
      <RecoveryPage />
    </>
  );
}
