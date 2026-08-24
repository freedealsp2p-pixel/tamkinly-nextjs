import type { Metadata } from 'next';
import { METHODOLOGY_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = METHODOLOGY_METADATA;

export default function MethodologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
