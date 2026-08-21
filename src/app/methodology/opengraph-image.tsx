import { ImageResponse } from 'next/og';
import { generatePageImage } from '@/lib/og-image';

export const runtime = 'edge';
export const alt = 'Tamkinly Methodology - Evidence-Based Identity Transformation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generatePageImage({
    title: 'Our Methodology',
    subtitle: 'Evidence-Based Transformation',
    description: 'Combining neuroplasticity, self-authorship theory, and CBT frameworks for lasting identity change.',
    tags: ['Neuroplasticity', 'Self-Authorship', 'CBT Frameworks'],
    accentColor: '#1F6F78',
  });
}
