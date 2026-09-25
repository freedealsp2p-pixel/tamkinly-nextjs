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
    description: 'Start free with powerful identity tools. Flexible monthly plans from $7/mo. Cancel anytime.',
    tags: ['Free Tier', 'Monthly Plans', 'Cancel Anytime'],
    accentColor: '#1F6F78',
  });
}
