import type { Metadata } from 'next';
import { REFUND_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = REFUND_METADATA;

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
