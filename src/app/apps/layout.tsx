import type { Metadata } from 'next';
import { generatePageMetadataFromConfig } from '@/lib/seo-pages';
import { AppAccessGuard } from '@/components/AppAccessGuard';

import { getLocale } from '@/lib/get-locale';
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('apps', locale);
}

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppAccessGuard>
      {children}
    </AppAccessGuard>
  );
}

