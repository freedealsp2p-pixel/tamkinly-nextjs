import type { Metadata } from 'next';
import { PRODUCTS_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = PRODUCTS_METADATA;

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
