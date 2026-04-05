import type { Metadata } from 'next';
import { BLOG_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = BLOG_METADATA;

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
