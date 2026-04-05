import type { Metadata } from 'next';
import { generateBlogArticleMetadata } from '@/lib/blog-articles';

export const metadata: Metadata = generateBlogArticleMetadata('environmental-audit-worksheet');

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
