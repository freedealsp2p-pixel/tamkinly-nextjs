import type { Metadata } from 'next';
import { CHECKOUT_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = CHECKOUT_METADATA;

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
