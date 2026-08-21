import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Refund Policy | Tamkinly';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Refund Policy',
    subtitle: 'Our satisfaction guarantee and refund policy. 30-day money-back guarantee on all products.',
    accentColor: '#8A94A6',
    icon: '↩',
  });
}
