import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';
import { smartPageTitle } from '@/lib/blog-articles';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'إدارة الوقت الحقيقية: ليس أكثر إنجازاً بل إنجاز الأهم';
  const description = 'اكتشف الحقيقة عن إدارة الوقت. ليست أكثر إنجازاً بل إنجاز الأهم. كيف تدار وقتك من خلال محاذاة الهوية لا تقنيات الإنتاجية.';
  const enUrl = 'https://tamkinly.com/blog/ar-idarat-alwaqt';
  const arUrl = 'https://tamkinly.com/ar/blog/ar-idarat-alwaqt';
  return {
    title: smartPageTitle(title, ' | Tamkinly Blog'),
    description,
    keywords: ['إدارة الوقت', 'تنظيم الوقت اليومي', 'التخلص من المماطلة', 'time management Arabic', 'إنتاجية', 'تنظيم الوقت'],
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
      publishedTime: '2026-03-29',
      modifiedTime: '2026-03-29',
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
      'article:published_time': '2026-03-29',
      'article:modified_time': '2026-03-29',
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
