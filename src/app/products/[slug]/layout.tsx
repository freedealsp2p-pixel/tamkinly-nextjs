/**
 * Product Detail Page Layout
 * Provides dynamic metadata for each product page
 */

import { Metadata } from 'next';

// Product metadata configuration
const productMetadata: Record<string, {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  keywords: string[];
}> = {
  'basic': {
    name: 'Basic (Monthly)',
    nameAr: 'أساسي (شهري)',
    description: 'Start your identity transformation journey with the core planning tool. Perfect for testing the methodology.',
    descriptionAr: 'ابدأ رحلة تحول هويتك بأداة التخطيط الأساسية. مثالي لتجربة المنهجية.',
    price: 7,
    keywords: ['basic plan', 'identity transformation', 'monthly subscription', 'self-development', 'tamkinly basic']
  },
  'trial': {
    name: '7-Day Identity Reset Trial',
    nameAr: 'تجربة إعادة ضبط الهوية لمدة 7 أيام',
    description: 'Experience the full Identity Recode system for 7 days. Test the methodology with daily identity prompts, evidence tracking, and progress dashboard. Perfect for exploring transformation.',
    descriptionAr: 'جرب نظام إعادة صياغة الهوية الكامل لمدة 7 أيام. اختبر المنهجية مع المطالبات اليومية وتتبع الأدلة ولوحة التقدم.',
    price: 7,
    keywords: ['identity reset', '7-day trial', 'identity transformation', 'self-development', 'personal growth', 'transformation trial']
  },
  'planner': {
    name: 'Identity Recode Planner',
    nameAr: 'مخطط إعادة صياغة الهوية',
    description: 'The complete 30-day identity transformation system with interactive apps, daily prompts, and PDF downloads. Rebuild your identity from the ground up.',
    descriptionAr: 'نظام تحول الهوية الكامل لمدة 30 يوم مع تطبيقات تفاعلية ومطالبات يومية وتحميلات PDF.',
    price: 17,
    keywords: ['identity planner', '30-day transformation', 'identity recode', 'personal development planner', 'habit transformation', 'identity journal']
  },
  'premium': {
    name: 'Premium (Monthly)',
    nameAr: 'مميز (شهري)',
    description: 'Comprehensive transformation with advanced analytics, decision tracking, and evidence collection tools. Data-driven identity transformation for committed individuals.',
    descriptionAr: 'تحول شامل مع تحليلات متقدمة وتتبع القرارات وأدوات جمع الأدلة.',
    price: 17,
    keywords: ['premium plan', 'advanced analytics', 'decision tracking', 'identity analytics', 'data-driven growth', 'transformation dashboard']
  },
  'mastery': {
    name: 'Mastery (Monthly)',
    nameAr: 'إتقان (شهري)',
    description: 'The ultimate identity transformation experience: All apps + AI coaching + community access + priority support.',
    descriptionAr: 'تجربة تحول الهوية المثالية: جميع التطبيقات + تدريب AI + وصول المجتمع + دعم ذو أولوية.',
    price: 27,
    keywords: ['mastery plan', 'complete transformation', 'AI coaching', 'identity mastery', 'full access', 'VIP support']
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
    return {
      title: 'Product Not Found | Tamkinly',
      description: 'The requested product could not be found.',
    };
  }

  const fullUrl = `https://tamkinly.com/products/${slug}`;

  return {
    title: `${product.name} | Tamkinly`,
    description: product.description,
    keywords: product.keywords,

    alternates: {
      canonical: fullUrl,
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
