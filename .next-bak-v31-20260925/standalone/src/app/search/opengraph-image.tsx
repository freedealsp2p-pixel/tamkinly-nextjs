import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Search Tamkinly | Tamkinly';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Search Tamkinly',
    subtitle: 'Find apps, guides, articles, and tools for your identity transformation journey.',
    accentColor: '#3DD4B0',
    icon: '⌕',
  });
}
