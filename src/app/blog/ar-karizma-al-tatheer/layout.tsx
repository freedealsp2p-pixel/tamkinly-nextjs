import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'كاريزما التأثير: كيف تصبح الشخص الذي يعشق الجميع التواجد حوله؟';
  const description = 'الكاريزما ليست موهبة تولد معك، بل مجموعة سلوكيات يمكن تعلمها. أربعة أسرار علمية لبناء طاقة الحضور والتأثير الجاذب في علاقاتك.';
  const enUrl = 'https://tamkinly.com/blog/ar-karizma-al-tatheer';
  const arUrl = 'https://tamkinly.com/ar/blog/ar-karizma-al-tatheer';
  return {
    title: title + ' | Tamkinly Blog',
    description,
    keywords: ['كاريزما', 'التأثير', 'الجاذبية الاجتماعية', 'charisma', 'بناء العلاقات', 'الحضور', 'التأثير الإيجابي'],
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
      publishedTime: '2026-07-12',
      modifiedTime: '2026-07-12',
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
      'article:published_time': '2026-07-12',
      'article:modified_time': '2026-07-12',
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
