import type { Metadata } from 'next';
import { FAQ_METADATA } from '@/lib/seo-pages';
import { getLocale } from '@/lib/get-locale';

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('faq', locale);
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
