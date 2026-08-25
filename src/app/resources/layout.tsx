import type { Metadata } from 'next';
import { generatePageMetadataFromConfig } from '@/lib/seo-pages';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('resources', locale);
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
