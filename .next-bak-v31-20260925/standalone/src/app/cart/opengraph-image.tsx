import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Your Cart | Tamkinly';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Your Cart',
    subtitle: 'Review your selected identity transformation tools and proceed to checkout.',
    accentColor: '#2A8A94',
    icon: '⛊',
  });
}
