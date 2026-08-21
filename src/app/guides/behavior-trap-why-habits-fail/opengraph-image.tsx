import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'The Behavior Trap | Tamkinly Guide';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'The Behavior Trap',
    subtitle: 'Why habits fail and how they succeed. Learn the identity-first approach to lasting change.',
    accentColor: '#C97B7B',
    icon: '⚠',
  });
}
