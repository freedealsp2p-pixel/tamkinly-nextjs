import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'خلاصة الأربعين: سبع ركائز ذهبية للتغيير نحو الأفضل';
  const description = 'عصارة أربعين سنة من العيش في سبع ركائز ذهبية للتغيير. مبادئ جوهرية عملية لو عرفتها مبكراً لاختصرت الكثير من عناء التخبط والأخطاء.';
  const enUrl = 'https://tamkinly.com/blog/ar-khulasat-al-arbaeen';
  const arUrl = 'https://tamkinly.com/ar/blog/ar-khulasat-al-arbaeen';
  return {
    title: title + ' | Tamkinly Blog',
    description,
    keywords: ['خلاصة الأربعين', 'التغيير نحو الأفضل', 'تطوير الذات', 'أهداف الحياة', 'الالتزام', 'التخطيط', 'العطاء', 'حكم الحياة'],
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
