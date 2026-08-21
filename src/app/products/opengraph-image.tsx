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
    description: 'Start free with powerful identity tools. One-time payments. 30-day guarantee.',
    tags: ['Free Tier', 'No Subscriptions', '30-Day Guarantee'],
    accentColor: '#1F6F78',
  });
}
