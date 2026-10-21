/**
 * Product Detail Page Layout
 * Provides dynamic metadata for each product page
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from '@/lib/get-locale';

// Unknown slugs are rejected at the router level (real 404, no soft-404 streaming)
export const dynamicParams = false;

// Product metadata configuration
const productMetadata: Record<string, {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  keywords: string[];
}> = {
  // PRICING MODEL V2 (founder directive 2026-10-21): TWO paid packages only.
  // 'premium' = Identity Recode Planner ($9.99 one-time); 'mastery' = Mastery ($27 one-time).
  // 'basic'/'trial'/'planner' are legacy slugs that render the Planner page (old links keep converting).
  'basic': {
    name: 'Identity Recode Planner',
    nameAr: 'مخطط إعادة صياغة الهوية',
    description: 'The former Basic monthly plan is no longer sold — this page now shows the Identity Recode Planner: $9.99 one-time, lifetime access.',
    descriptionAr: 'لم تعد باقة الأساسية الشهرية متاحة — هذه الصفحة تعرض الآن مخطط إعادة صياغة الهوية: 9.99$ دفعة واحدة بوصول دائم.',
    price: 9.99,
    keywords: ['identity recode planner', 'identity transformation', 'one-time payment', 'self-development', 'tamkinly planner']
  },
  'trial': {
    name: 'Identity Recode Planner',
    nameAr: 'مخطط إعادة صياغة الهوية',
    description: 'The old 7-day trial is gone — the full Identity Recode Planner is now $9.99 one-time: daily identity prompts, evidence tracking, progress dashboard and every Planner app included.',
    descriptionAr: 'انتهت تجربة 7 أيام القديمة — مخطط إعادة صياغة الهوية الكامل الآن بـ 9.99$ دفعة واحدة: مطالبات هوية يومية وتتبع الأدلة ولوحة التقدم وكل تطبيقات المخطط.',
    price: 9.99,
    keywords: ['identity recode planner', 'identity reset', 'identity transformation', 'self-development', 'personal growth']
  },
  'planner': {
    name: 'The Planner — Identity Recode Planner',
    nameAr: 'المخطط — مخطط إعادة صياغة الهوية',
    description: 'Discover the identity you currently perform and the roles life forced on you, replace them with the identity you choose, reverse-engineer your goals and simulate the identity that already has them — practical apps and downloadable worksheets. $9.99 one-time.',
    descriptionAr: 'اكتشف الهوية التي تتقمصها اليوم والأدوار التي فرضتها عليك الحياة، واستبدلها بهوية الاختيار، وهندس أهدافك عكسياً، ومثّل الهوية التي تمتلك هدفك — تطبيقات عملية ومخططات قابلة للتنزيل. 9.99$ دفعة واحدة.',
    price: 9.99,
    keywords: ['identity planner', 'identity discovery', 'goal reverse engineering', 'identity recode', 'personal development planner', 'identity journal']
  },
  'premium': {
    name: 'The Planner — Identity Recode Planner',
    nameAr: 'المخطط — مخطط إعادة صياغة الهوية',
    description: 'Discover the identity you currently perform and the roles life forced on you, replace them with the identity you choose, reverse-engineer your goals and simulate the identity that already has them — practical apps and downloadable worksheets. $9.99 one-time, lifetime access.',
    descriptionAr: 'اكتشف الهوية التي تتقمصها اليوم والأدوار التي فرضتها عليك الحياة، واستبدلها بهوية الاختيار، وهندس أهدافك عكسياً، ومثّل الهوية التي تمتلك هدفك — تطبيقات عملية ومخططات قابلة للتنزيل. 9.99$ دفعة واحدة بوصول دائم.',
    price: 9.99,
    keywords: ['identity recode planner', 'identity discovery', 'identity transformation', 'one-time payment', 'worksheets', 'tamkinly planner']
  },
  'mastery': {
    name: 'Mastery',
    nameAr: 'الإتقان',
    description: 'Everything in The Planner plus the Mastery apps: AI Identity Coach, emotion regulation toolkit, transformation community and priority support. $27 one-time, lifetime access.',
    descriptionAr: 'كل ما في المخطط بالإضافة إلى تطبيقات الإتقان: مدرب الهوية AI، أدوات تنظيم المشاعر، مجتمع التحول ودعم ذو أولوية. 27$ دفعة واحدة بوصول دائم.',
    price: 27,
    keywords: ['mastery package', 'complete transformation', 'AI identity coach', 'identity mastery', 'full access', 'one-time payment']
  }
};

// Generate static params for all products
export function generateStaticParams() {
  return Object.keys(productMetadata).map(slug => ({ slug }));
}

// Generate metadata for each product
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productMetadata[slug];

  if (!product) {
    notFound();
  }

  const locale = await getLocale();
  const isAr = locale === 'ar';
  const fullUrl = isAr ? `https://tamkinly.com/ar/products/${slug}` : `https://tamkinly.com/products/${slug}`;
  const enUrl = `https://tamkinly.com/products/${slug}`;
  const arUrl = `https://tamkinly.com/ar/products/${slug}`;

  return {
    title: `${product.name} | Tamkinly`,
    description: product.description,
    keywords: product.keywords,

    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': enUrl,
        'ar-SA': arUrl,
        'x-default': enUrl,
      },
    },

    openGraph: {
      title: product.name,
      description: product.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      type: 'website',
      images: [
        {
          url: 'https://tamkinly.com/og-image.webp',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      site: '@tamkinly',
      images: ['https://tamkinly.com/og-image.webp'],
    },

    other: {
      'product:price:amount': product.price.toString(),
      'product:price:currency': 'USD',
      'product:availability': 'in stock',
      'product:brand': 'Tamkinly',
    },
  };
}

// Layout component
export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
