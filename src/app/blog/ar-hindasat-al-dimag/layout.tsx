import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';
import { smartPageTitle } from '@/lib/blog-articles';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'هندسة الدماغ: دليل علمي وعملي لإعادة تشكيل حياتك';
  const description = 'اكتشف كيف تعيد برمجة دماغك عبر المرونة العصبية. دليل عملي من جزأين لخفض المقاومة الداخلية وتغيير الهوية وبناء عادات جديدة تدوم.';
  const enUrl = 'https://tamkinly.com/blog/ar-hindasat-al-dimag';
  const arUrl = 'https://tamkinly.com/ar/blog/ar-hindasat-al-dimag';
  return {
    title: smartPageTitle(title, ' | Tamkinly Blog'),
    description,
    keywords: ['هندسة الدماغ', 'المرونة العصبية', 'إعادة برمجة الدماغ', 'neuroplasticity', 'تغيير الهوية', 'بناء العادات', 'تطوير الذات'],
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
