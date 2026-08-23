import type { Metadata } from 'next';
import { ACCOUNT_METADATA } from '@/lib/seo-pages';
import { getLocale } from '@/lib/get-locale';

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('account', locale);
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
