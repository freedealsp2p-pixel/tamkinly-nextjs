import type { Metadata } from 'next';
import { generateAppPageMetadata } from '@/lib/app-pages';

export const metadata: Metadata = generateAppPageMetadata('journal-system');

export default function AppPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
