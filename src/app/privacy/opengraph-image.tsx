import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Privacy Policy | Tamkinly';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Privacy Policy',
    subtitle: 'How we protect your data and privacy at Tamkinly. Transparent and user-first.',
    accentColor: '#8A94A6',
    icon: '⛨',
  });
}
