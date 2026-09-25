import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';
import { generatePageMetadataFromConfig } from '@/lib/seo-pages';

export const dynamic = 'force-dynamic';

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
