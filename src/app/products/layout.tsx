import type { Metadata } from 'next';
import { PRODUCTS_METADATA } from '@/lib/seo-pages';
import { getLocale } from '@/lib/get-locale';

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('products', locale);
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
