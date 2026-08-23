import type { Metadata } from 'next';
import { CART_METADATA } from '@/lib/seo-pages';
import { getLocale } from '@/lib/get-locale';

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('cart', locale);
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
