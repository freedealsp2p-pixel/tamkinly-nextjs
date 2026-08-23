import type { Metadata } from 'next';
import { TERMS_METADATA } from '@/lib/seo-pages';
import { getLocale } from '@/lib/get-locale';

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('terms', locale);
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
