import { ImageResponse } from 'next/og';
import { getBlogArticleBySlug } from '@/lib/blog-articles';
import { generateBlogArticleImage } from '@/lib/og-image';

export const runtime = 'edge';
export const alt = 'Who Am I Worksheet | Tamkinly Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const article = getBlogArticleBySlug('who-am-i-worksheet');
  return generateBlogArticleImage(article, 'Tamkinly Blog');
}
