import { ImageResponse } from 'next/og';
import { getBlogArticleBySlug } from '@/lib/blog-articles';
import { generateBlogArticleImage } from '@/lib/og-image';

export const runtime = 'edge';
export const alt = 'Physics Of Momentum | Tamkinly Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const article = getBlogArticleBySlug('physics-of-momentum');
  return generateBlogArticleImage(article, 'Tamkinly Blog');
}
