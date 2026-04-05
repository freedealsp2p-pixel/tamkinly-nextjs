import type { Metadata } from 'next';
import { APPS_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = APPS_METADATA;

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
