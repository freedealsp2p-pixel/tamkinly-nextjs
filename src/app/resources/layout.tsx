import type { Metadata } from 'next';
import { RESOURCES_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = RESOURCES_METADATA;

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
