import type { Metadata } from 'next';
import { getLocale } from '@/lib/get-locale';
import { smartPageTitle } from '@/lib/blog-articles';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isAr = locale === 'ar';
  const title = 'تحقيق الأهداف: لماذا لا تحقق أهدافك والطريقة التي تعمل فعلاً';
  const description = 'اكتشف لماذا تفشل الطرق التقليدية لتحقيق الأهداف وكيف يعمل نهج الهوية المتوافقة. الدليل الشامل لتحقيق أهدافك من خلال تحول الهوية لا المثابرة.';
  const enUrl = 'https://tamkinly.com/blog/ar-tahqeeq-alahdaf';
  const arUrl = 'https://tamkinly.com/ar/blog/ar-tahqeeq-alahdaf';
  return {
    title: smartPageTitle(title, ' | Tamkinly Blog'),
    description,
    keywords: ['تحقيق الأهداف', 'كيف أحقق أهدافي', 'تحديد الأهداف الشخصية', 'خطة لتحقيق الأهداف', 'goal achievement Arabic', 'أهداف شخصية'],
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
      publishedTime: '2026-03-15',
      modifiedTime: '2026-03-15',
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
      'article:published_time': '2026-03-15',
      'article:modified_time': '2026-03-15',
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
