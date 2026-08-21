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
  return metadataByLocale[locale];
}

/**
 * Therapeutic (immersive) layout for the Trigger Mapping interactive tool.
 *
 * Wraps the page in RecoveryShell with sectionType='therapeutic', which
 * renders the RecoveryHeader and auto-mounts a floating TherapeuticExit
 * (exit arrow + confirmation dialog) at the bottom-right of the viewport.
 *
 * Backed by: TRC Framework Section ج(ز) Worksheet Type 1
 * TRC Framework Section ب(2) Regulation Stage
 */
export default function TriggerMappingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoveryShell sectionType="therapeutic">{children}</RecoveryShell>;
}
