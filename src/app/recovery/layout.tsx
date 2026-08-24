import type { Metadata } from 'next';
import { RecoveryShell } from '@/components/recovery/system';

const SITE_URL = 'https://tamkinly.com';

import { getLocale } from '@/lib/get-locale';
import { generatePageMetadataFromConfig } from '@/lib/seo-pages';
// @ts-nocheck

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('recovery', locale);
}

export default function RecoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoveryShell>{children}</RecoveryShell>;
}
