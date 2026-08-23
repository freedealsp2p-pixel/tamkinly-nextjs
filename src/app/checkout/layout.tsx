import type { Metadata } from 'next';
import { CHECKOUT_METADATA } from '@/lib/seo-pages';
import { getLocale } from '@/lib/get-locale';

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('checkout', locale);
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
