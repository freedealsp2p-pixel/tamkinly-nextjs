import type { Metadata } from 'next';
import { ACCOUNT_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = ACCOUNT_METADATA;

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
