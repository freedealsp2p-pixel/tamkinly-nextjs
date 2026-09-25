import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Your Environment Shapes You | Tamkinly Guide';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Your Environment Shapes You',
    subtitle: 'How to design an environment that automatically supports your new identity.',
    accentColor: '#1F6F78',
    icon: '🌿',
  });
}
