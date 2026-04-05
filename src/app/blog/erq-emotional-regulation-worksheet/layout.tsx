import type { Metadata } from 'next';
import { generateBlogArticleMetadata } from '@/lib/blog-articles';

export const metadata: Metadata = generateBlogArticleMetadata('erq-emotional-regulation-worksheet');

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
