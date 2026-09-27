import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

const SITE_URL = 'https://tamkinly.com';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = isAr
    ? 'تقنية الجملة المبتورة | تمرين مجاني — تمكينلي'
    : 'The Truncated Sentence Technique | Free Exercise — Tamkinly';
  const description = isAr
    ? 'تمرين مجاني كامل: اكتب الجملة السلبية عن نفسك، اطمس وسطها بشريط أسود، ثم عِش طقس الورقة والماء عبر ثلاث ليالٍ مع مؤقت ٧٢ ساعة وتذكير بالبريد ومفكرة تحول من ٩ أيام.'
    : 'A completely free exercise: write the negative sentence about yourself, blank out its middle with black tape, then live the paper-and-water ritual across three nights with a 72-hour timer, email reminder and a 9-day transformation journal.';

  return {
    title,
    description,
    alternates: {
      canonical: isAr
        ? `${SITE_URL}/ar/apps/therapeutic-protocols/truncated-sentence`
        : `${SITE_URL}/apps/therapeutic-protocols/truncated-sentence`,
      languages: {
        'en-US': `${SITE_URL}/apps/therapeutic-protocols/truncated-sentence`,
        'ar-SA': `${SITE_URL}/ar/apps/therapeutic-protocols/truncated-sentence`,
        'x-default': `${SITE_URL}/apps/therapeutic-protocols/truncated-sentence`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/apps/therapeutic-protocols/truncated-sentence`,
      siteName: 'Tamkinly',
      type: 'website',
      locale: isAr ? 'ar_AR' : 'en_US',
      images: [{ url: 'https://tamkinly.com/og-image.webp', width: 1200, height: 630, alt: title }],
    },
  };
}

export default function TruncatedSentenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
