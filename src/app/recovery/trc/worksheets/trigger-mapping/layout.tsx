import { Metadata } from 'next';
import { headers } from 'next/headers';
import { RecoveryShell } from '@/components/recovery/system';

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
  en: { title: 'Trigger Mapping Worksheet | Tamkinly', description: 'Interactive trigger mapping worksheet to identify your trauma triggers, patterns, and effective coping strategies.' },
  ar: { title: 'ورقة رسم خريطة المحفزات | Tamkinly', description: 'ورقة تفاعلية لرسم خريطة المحفزات لتحديد محفزات الصدمة وأنماطها واستراتيجيات التأقلم الفعالة.' },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const m = metadataByLocale[locale];
  const basePath = locale === 'ar' ? 'https://tamkinly.com/ar/recovery/trc/worksheets/trigger-mapping' : 'https://tamkinly.com/recovery/trc/worksheets/trigger-mapping';
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: basePath,
      languages: {
        'en-US': 'https://tamkinly.com/recovery/trc/worksheets/trigger-mapping',
        'ar-SA': 'https://tamkinly.com/ar/recovery/trc/worksheets/trigger-mapping',
        'x-default': 'https://tamkinly.com/recovery/trc/worksheets/trigger-mapping',
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

export default function TriggerMappingLayout({ children }: { children: React.ReactNode }) {
  return <RecoveryShell sectionType="therapeutic">{children}</RecoveryShell>;
}
