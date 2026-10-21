import { ImageResponse } from 'next/og';
import { generatePageImage } from '@/lib/og-image';

export const runtime = 'edge';
export const alt = 'Tamkinly Products & Pricing - Identity Transformation Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generatePageImage({
    title: 'Products & Pricing',
    subtitle: 'Identity Transformation Tools',
    description: 'Start free with powerful identity tools. Unlock everything with one payment — $9.99, no subscription.',
    tags: ['Free Tier', 'One-Time Payment', 'Lifetime Access'],
    accentColor: '#1F6F78',
  });
}
