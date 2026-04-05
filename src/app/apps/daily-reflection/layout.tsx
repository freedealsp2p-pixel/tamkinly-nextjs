import type { Metadata } from 'next';
import { generateAppPageMetadata } from '@/lib/app-pages';

export const metadata: Metadata = generateAppPageMetadata('daily-reflection');

export default function AppPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
