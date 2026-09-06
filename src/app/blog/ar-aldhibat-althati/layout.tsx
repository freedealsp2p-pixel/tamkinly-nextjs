import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';
import { smartPageTitle } from '@/lib/blog-articles';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'الانضباط الذاتي: الحقيقة التي لا يخبرك بها أحد';
  const description = 'اكتشف الحقيقة عن الانضباط الذاتي. ليس عقاباً ولا كبتاً — بل أعلى أشكال حب الذات. كيف تعيد تعريف الانضباط من خلال تحول الهوية وليس الإرادة.';
  const enUrl = 'https://tamkinly.com/blog/ar-aldhibat-althati';
  const arUrl = 'https://tamkinly.com/ar/blog/ar-aldhibat-althati';
  return {
    title: smartPageTitle(title, ' | Tamkinly Blog'),
    description,
    keywords: ['الانضباط الذاتي', 'كيف أصبح منضبطاً', 'قوة الإرادة', 'self discipline Arabic', 'انضباط النفس', 'الالتزام الذاتي'],
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
      type: 'article',
      publishedTime: '2026-03-22',
      modifiedTime: '2026-03-22',
      authors: ['Abdallah Chouaf'],
      images: [{ url: 'https://tamkinly.com/og-image.webp', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://tamkinly.com/og-image.webp'],
    },
    other: {
      'article:published_time': '2026-03-22',
      'article:modified_time': '2026-03-22',
      'article:author': 'Abdallah Chouaf',
    },
  };
}

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
