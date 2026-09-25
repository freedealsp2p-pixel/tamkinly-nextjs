import type { Metadata } from 'next';
import { generatePageMetadataFromConfig } from '@/lib/seo-pages';

// Override blog-specific metadata
import { getLocale } from '@/lib/get-locale';

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('blog', locale);
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

