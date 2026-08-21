import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Frequently Asked Questions | Tamkinly';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers about our identity transformation tools, pricing, access codes, and more.',
    accentColor: '#3DD4B0',
    icon: '?',
  });
}
