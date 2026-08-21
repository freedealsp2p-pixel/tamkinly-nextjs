import { ImageResponse } from 'next/og';
import { getBlogArticleBySlug } from '@/lib/blog-articles';
import { generateBlogArticleImage } from '@/lib/og-image';

export const runtime = 'edge';
export const alt = 'Tamkinly Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function BlogOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);
  return generateBlogArticleImage(article, 'Tamkinly Blog');
}
