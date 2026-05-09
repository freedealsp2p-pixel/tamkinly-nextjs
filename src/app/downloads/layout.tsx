import type { Metadata } from 'next';
import { DOWNLOADS_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = DOWNLOADS_METADATA;

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
