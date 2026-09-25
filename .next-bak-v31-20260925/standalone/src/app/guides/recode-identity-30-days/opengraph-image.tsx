import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Recode Your Identity in 30 Days | Tamkinly Guide';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Recode Your Identity in 30 Days',
    subtitle: 'A practical step-by-step guide to transforming your identity from the inside out.',
    accentColor: '#3DD4B0',
    icon: '🔄',
  });
}
