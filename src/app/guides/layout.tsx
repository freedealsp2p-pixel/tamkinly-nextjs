import type { Metadata } from 'next';

import { getLocale } from '@/lib/get-locale';
import { generatePageMetadataFromConfig } from '@/lib/seo-pages';
// @ts-nocheck

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('guides', locale);
}

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

