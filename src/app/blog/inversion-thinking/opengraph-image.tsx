import { ImageResponse } from 'next/og';
import { getBlogArticleBySlug } from '@/lib/blog-articles';
import { generateBlogArticleImage } from '@/lib/og-image';

export const runtime = 'edge';
export const alt = 'Inversion Thinking | Tamkinly Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const article = getBlogArticleBySlug('inversion-thinking');
  return generateBlogArticleImage(article, 'Tamkinly Blog');
}
