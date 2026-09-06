import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'بناء العادات: الدليل العلمي لعادات تدوم مدى الحياة';
  const description = 'الدليل العلمي لبناء عادات تدوم. اكتشف لماذا تفشل العادات الجديدة وكيف تبني عادات تعتمد على الهوية وليس الإرادة. مبني على أحدث أبحاث علم الأعصاب والسلوك.';
  const enUrl = 'https://tamkinly.com/blog/ar-binaa-al3aadat';
  const arUrl = 'https://tamkinly.com/ar/blog/ar-binaa-al3aadat';
  return {
    title: title + ' | Tamkinly Blog',
    description,
    keywords: ['بناء العادات', 'كيف أكوّن عادة جديدة', 'التخلص من العادات السيئة', 'عادات الصباح', 'الاستمرارية في العادات', 'building habits Arabic', 'عادات يومية'],
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
      publishedTime: '2026-03-08',
      modifiedTime: '2026-03-08',
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
      'article:published_time': '2026-03-08',
      'article:modified_time': '2026-03-08',
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
