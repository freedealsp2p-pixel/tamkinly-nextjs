import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Identity Gap Quiz | Tamkinly';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Identity Gap Quiz',
    subtitle: 'Free 3-minute assessment. Discover what holds you back from becoming who you want to be.',
    accentColor: '#3DD4B0',
    icon: '◎',
  });
}
