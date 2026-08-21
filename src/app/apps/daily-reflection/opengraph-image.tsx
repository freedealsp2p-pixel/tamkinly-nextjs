import { createAppOgImage, APP_OG_SIZE } from '@/lib/app-og-image';

export const runtime = 'edge';
export const alt = 'Daily Reflection | Tamkinly';
export const size = APP_OG_SIZE;
export const contentType = 'image/png';

export default async function OgImage() {
  return createAppOgImage('daily-reflection');
}
