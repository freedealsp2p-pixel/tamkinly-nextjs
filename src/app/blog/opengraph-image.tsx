import { ImageResponse } from 'next/og';
import { generatePageImage } from '@/lib/og-image';

export const runtime = 'edge';
export const alt = 'Tamkinly Blog - Research-Backed Identity Insights';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return generatePageImage({
    title: 'Tamkinly Blog',
    subtitle: 'Research-Backed Insights',
    description: 'Science-based articles on identity transformation, self-authorship, and lasting change.',
    tags: ['Free Access', 'Expert Authors', 'Practical Frameworks'],
    accentColor: '#3DD4B0',
  });
}
