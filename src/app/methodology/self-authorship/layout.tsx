import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

// Restored page: /methodology/self-authorship (recovery 2026-10-16 — route was
// lost in the rebuild; content from official site messages + live capture).
const BASE = 'https://tamkinly.com';
const PATH = '/methodology/self-authorship';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr
    ? 'تأليف الذات — منهجية تمكينلي'
    : 'Self-Authorship — Tamkinly Methodology';
  const description = isAr
    ? 'الانتقال من التأثير الخارجي إلى الصوت الداخلي—تصميم من تصبح عليه بوعي. المفهوم الرابع في منهجية إعادة ترميز الهوية، مستند إلى نظرية تأليف الذات لروبرت كيغان.'
    : 'Moving from external influence to internal voice—consciously designing who you become. The fourth concept of the Identity Recode methodology, grounded in Robert Kegan\u2019s Self-Authorship Theory.';

  return {
    title,
    description,
    alternates: {
      canonical: isAr ? `${BASE}/ar${PATH}` : `${BASE}${PATH}`,
      languages: {
        'en-US': `${BASE}${PATH}`,
        'ar-SA': `${BASE}/ar${PATH}`,
        'x-default': `${BASE}${PATH}`,
      },
    },
    openGraph: {
      title,
      description,
      url: isAr ? `${BASE}/ar${PATH}` : `${BASE}${PATH}`,
      siteName: isAr ? 'تمكينلي' : 'Tamkinly',
      locale: isAr ? 'ar_SA' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_SA',
      type: 'website',
      images: [{ url: `${BASE}/methodology/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default function SelfAuthorshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
