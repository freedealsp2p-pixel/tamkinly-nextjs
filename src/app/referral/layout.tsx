import { Metadata } from 'next';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

async function getLocale(): Promise<'en' | 'ar'> {
  try {
    const headersList = await headers();
    const urlLocale = headersList.get('x-locale');
    if (urlLocale === 'ar') return 'ar';
  } catch {}
  return 'en';
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const basePath = isAr ? 'https://tamkinly.com/ar/referral' : 'https://tamkinly.com/referral';
  return {
    title: isAr ? 'برنامج الإحالة | ادعُ أصدقاك واحصل على مكافآت - تمكينلي' : 'Referral Program | Invite Friends & Earn Rewards - Tamkinly',
    description: isAr
      ? 'شارك تمكينلي مع أصدقائك واحصل على مكافآت. احصل على تمديدات مجانية ووصول للتطبيقات وحزم متميزة مقابل كل إحالة ناجحة.'
      : 'Share Tamkinly with friends and earn rewards. Get free trial extensions, app access, and premium bundles for every successful referral.',
    alternates: {
      canonical: basePath,
      languages: {
        'en-US': 'https://tamkinly.com/referral',
        'ar-SA': 'https://tamkinly.com/ar/referral',
        'x-default': 'https://tamkinly.com/referral',
      },
    },
    openGraph: {
      title: isAr ? 'برنامج إحالة تمكينلي - ادعُ أصدقائك واحصل على مكافآت' : 'Tamkinly Referral Program - Invite Friends, Earn Rewards',
      description: isAr
        ? 'شارك تمكينلي مع أصدقائك واحصل على مكافآت. أنت وأصدقاؤك يستفيدون!'
        : 'Share Tamkinly with friends and earn rewards. Both you and your friends benefit!',
      url: basePath,
      siteName: isAr ? 'تمكينلي' : 'Tamkinly',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: isAr ? 'برنامج إحالة تمكينلي - ادعُ أصدقائك واحصل على مكافآت' : 'Tamkinly Referral Program - Invite Friends, Earn Rewards',
      description: isAr
        ? 'شارك تمكينلي مع أصدقائك واحصل على مكافآت مقابل كل إحالة ناجحة.'
        : 'Share Tamkinly with friends and earn rewards for every successful referral.',
    },
  };
}

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return children;
}
