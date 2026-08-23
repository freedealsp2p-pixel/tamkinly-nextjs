import type { Metadata } from 'next';
import { DOWNLOADS_METADATA } from '@/lib/seo-pages';
import { getLocale } from '@/lib/get-locale';

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('downloads', locale);
}

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
