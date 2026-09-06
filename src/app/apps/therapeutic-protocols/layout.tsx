import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr ? 'البروتوكولات العلاجية | تمكينلي' : 'Therapeutic Protocols | Tamkinly';
  const description = isAr
    ? 'بروتوكولات علاجية موجّهة مبنية على علم النفس: فصل زمني، الشفرة البديلة، والمرآة البيضاء — أدوات عملية للتنظيم العاطفي والتخلص من السلوك القهري.'
    : 'Guided therapeutic protocols grounded in psychology: Temporal Decoupling, The Alternative Code, and The White Mirror — tools for emotional regulation.';
  const enUrl = 'https://tamkinly.com/apps/therapeutic-protocols';
  const arUrl = 'https://tamkinly.com/ar/apps/therapeutic-protocols';
  return {
    title,
    description,
    alternates: {
      canonical: isAr ? arUrl : enUrl,
      languages: {
        'en-US': enUrl,
        'ar-SA': arUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: isAr ? arUrl : enUrl,
      siteName: 'Tamkinly',
      type: 'website',
      locale: isAr ? 'ar_SA' : 'en_US',
      images: [{ url: 'https://tamkinly.com/og-image.webp', width: 1200, height: 630, alt: 'Tamkinly' }],
    },
    twitter: {
      card: 'summary',
      title,
      description,
      images: ['https://tamkinly.com/og-image.webp'],
    },
  };
}

export default function TherapeuticProtocolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
