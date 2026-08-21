import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'About Tamkinly | Tamkinly';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'About Tamkinly',
    subtitle: 'A space to rebuild the human from within. Our mission and evidence-based approach to identity transformation.',
    accentColor: '#3DD4B0',
    icon: '✦',
  });
}
