import { headers, cookies } from 'next/headers';

export async function getLocale(): Promise<'en' | 'ar'> {
  try {
    const h = await headers();
    if (h.get('x-locale') === 'ar') return 'ar';
  } catch {}
  try {
    const c = await cookies();
    if (c.get('NEXT_LOCALE')?.value === 'ar') return 'ar';
  } catch {}
  return 'en';
}
