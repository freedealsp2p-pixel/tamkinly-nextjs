import type { Metadata } from 'next';
import { CART_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = CART_METADATA;

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
