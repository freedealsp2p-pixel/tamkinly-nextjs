import type { Metadata } from 'next';
import { ABOUT_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = ABOUT_METADATA;

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
