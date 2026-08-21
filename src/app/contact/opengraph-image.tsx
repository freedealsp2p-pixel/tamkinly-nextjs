import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Contact Us | Tamkinly';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Contact Us',
    subtitle: 'Get support, ask questions, or explore partnerships. We typically respond within 24-48 hours.',
    accentColor: '#2A8A94',
    icon: '✉',
  });
}
