import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Free Resources | Tamkinly';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Free Resources',
    subtitle: 'Guides, worksheets, and tools for identity transformation. Start your journey with free resources.',
    accentColor: '#1F6F78',
    icon: '↓',
  });
}
