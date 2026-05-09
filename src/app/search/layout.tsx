import type { Metadata } from 'next';
import { SEARCH_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = SEARCH_METADATA;

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
