import type { Metadata } from 'next';
import { FAQ_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = FAQ_METADATA;

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
