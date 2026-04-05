import type { Metadata } from 'next';
import { TERMS_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = TERMS_METADATA;

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
