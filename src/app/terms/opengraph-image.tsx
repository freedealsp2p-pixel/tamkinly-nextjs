import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Terms of Service | Tamkinly';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Terms of Service',
    subtitle: 'Our terms of service and usage agreement for Tamkinly identity transformation platform.',
    accentColor: '#8A94A6',
    icon: '§',
  });
}
