import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Checkout | Tamkinly';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Checkout',
    subtitle: 'Complete your purchase and get instant access to identity transformation tools.',
    accentColor: '#1F6F78',
    icon: '✓',
  });
}
