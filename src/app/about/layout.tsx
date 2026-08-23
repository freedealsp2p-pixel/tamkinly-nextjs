import type { Metadata } from 'next';
import { ABOUT_METADATA } from '@/lib/seo-pages';
import { getLocale } from '@/lib/get-locale';

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('about', locale);
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
