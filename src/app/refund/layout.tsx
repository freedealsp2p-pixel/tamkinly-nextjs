import type { Metadata } from 'next';
import { REFUND_METADATA } from '@/lib/seo-pages';
import { getLocale } from '@/lib/get-locale';

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('refund', locale);
}

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
