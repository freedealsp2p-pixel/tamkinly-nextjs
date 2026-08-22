import { Metadata } from 'next';
import { headers } from 'next/headers';

// Force dynamic rendering so headers() works in generateMetadata for SEO
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
  en: { title: 'Safety Plan | Tamkinly', description: 'Create a personalized safety plan with warning signs, coping strategies, and support contacts to stay safe during crisis moments.' },
  ar: { title: 'خطة السلامة | Tamkinly', description: 'أنشئ خطة سلامة مخصصة مع علامات تحذير واستراتيجيات التأقلم وجهات الدعم للبقاء سالماً أثناء لحظات الأزمة.' },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const basePath = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/worksheets/safety-plan' : 'https://tamkinly.com/recovery/trc/worksheets/safety-plan';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: basePath,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/worksheets/safety-plan',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/worksheets/safety-plan',
        'x-default': 'https://tamkinly.com/recovery/trc/worksheets/safety-plan',
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: basePath,
      siteName: 'Tamkinly',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
  };
}

export default function SafetyPlanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
