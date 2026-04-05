import type { Metadata } from 'next';
import { generateAppPageMetadata } from '@/lib/app-pages';

export const metadata: Metadata = generateAppPageMetadata('priority-support');

export default function AppPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
