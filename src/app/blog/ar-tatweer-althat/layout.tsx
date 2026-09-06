import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'تطوير الذات: الدليل الشامل لتغيير حياتك من الداخل';
  const description = 'الدليل الشامل لتطوير الذات المبني على علم الهوية. اكتشف لماذا تفشل معظم محاولات التطوير وكيف تغير حياتك حقاً من الداخل عبر فهم الهوية وإعادة برمجتها.';
  const enUrl = 'https://tamkinly.com/blog/ar-tatweer-althat';
  const arUrl = 'https://tamkinly.com/ar/blog/ar-tatweer-althat';
  return {
    title: title + ' | Tamkinly Blog',
    description,
    keywords: ['تطوير الذات', 'كيف أطور نفسي', 'تغيير حياتي للأفضل', 'بناء شخصية قوية', 'أدوات تطوير الذات', 'self development Arabic', 'تطوير النفس'],
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
      publishedTime: '2026-03-01',
      modifiedTime: '2026-03-01',
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
      'article:published_time': '2026-03-01',
      'article:modified_time': '2026-03-01',
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
