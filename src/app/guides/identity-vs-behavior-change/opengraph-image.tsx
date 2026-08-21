import { createPageOgImage, PAGE_OG_SIZE } from '@/lib/page-og-image';

export const runtime = 'edge';
export const alt = 'Identity vs Behavior Change | Tamkinly Guide';
export const size = PAGE_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createPageOgImage({
    title: 'Identity vs Behavior Change',
    subtitle: 'Why willpower fails and the identity-first approach creates permanent transformation.',
    accentColor: '#2A8A94',
    icon: '🧠',
  });
}
