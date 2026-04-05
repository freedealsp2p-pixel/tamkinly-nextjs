/**
 * Product Metadata Generator
 * Generates SEO metadata for product pages
 */

import { Metadata } from 'next';

// Product metadata configuration
const productMetadataConfig: Record<string, {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  keywords: string[];
}> = {
  trial: {
    name: '7-Day Trial | Identity Transformation - Tamkinly',
    nameAr: 'تجربة 7 أيام | تحويل الهوية - تمكينلي',
    description: 'Experience the full Identity Recode system for 7 days. Perfect for testing the methodology before committing. Start your transformation journey today.',
    descriptionAr: 'جرب نظام إعادة صياغة الهوية الكامل لمدة 7 أيام. مثالي لتجربة المنهجية قبل الالتزام. ابدأ رحلة تحولك اليوم.',
    keywords: ['7-day trial', 'identity transformation', 'personal development trial', 'تجربة 7 أيام', 'تحويل الهوية'],
  },
  planner: {
    name: 'Identity Recode Planner | 30-Day Transformation System - Tamkinly',
    nameAr: 'مخطط إعادة صياغة الهوية | نظام تحول 30 يوم - تمكينلي',
    description: 'The complete 30-day identity transformation system with interactive apps and PDF downloads. Evidence-based methodology for lasting change.',
    descriptionAr: 'نظام تحول الهوية الكامل لمدة 30 يوم مع تطبيقات تفاعلية وتحميلات PDF. منهجية مبنية على الأدلة للتغيير الدائم.',
    keywords: ['identity planner', '30-day transformation', 'digital planner', 'self-development', 'مخطط الهوية', 'تحول 30 يوم'],
  },
  premium: {
    name: 'Premium Transformation | Advanced Identity Tools - Tamkinly',
    nameAr: 'التحول المتميز | أدوات هوية متقدمة - تمكينلي',
    description: 'Everything in Planner plus advanced analytics and decision tracking tools. Data-driven transformation for committed individuals.',
    descriptionAr: 'كل ما في المخطط بالإضافة إلى التحليلات المتقدمة وأدوات تتبع القرارات. تحول مبني على البيانات للأفراد الملتزمين.',
    keywords: ['premium transformation', 'identity analytics', 'decision tracking', 'تحول متميز', 'تحليلات الهوية'],
  },
  bundle: {
    name: 'Complete Bundle | All Products + AI Coach - Tamkinly',
    nameAr: 'الباقة الكاملة | جميع المنتجات + مدرب AI - تمكينلي',
    description: 'The ultimate package: All apps + AI coaching + community access + priority support. Best value for complete transformation.',
    descriptionAr: 'الحزمة النهائية: جميع التطبيقات + تدريب AI + وصول للمجتمع + دعم ذو أولوية. أفضل قيمة للتحول الكامل.',
    keywords: ['complete bundle', 'AI coach', 'transformation community', 'باقة كاملة', 'مدرب AI'],
  },
};

/**
 * Generate metadata for a product page
 */
export function generateProductMetadata(slug: string): Metadata {
  const config = productMetadataConfig[slug];
  
  if (!config) {
    return {
      title: 'Product Not Found | Tamkinly',
      description: 'The requested product could not be found.',
    };
  }
  
  const url = `https://tamkinly.com/products/${slug}`;
  
  return {
    title: config.name,
    description: config.description,
    keywords: config.keywords,
    
    alternates: {
      canonical: url,
      languages: {
        'x-default': url,
        'en': url,
      },
    },
    
    openGraph: {
      title: config.name,
      description: config.description,
      url,
      siteName: 'Tamkinly',
      type: 'product',
      images: [
        {
          url: 'https://tamkinly.com/og-image.png',
          width: 1200,
          height: 630,
          alt: config.name,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: config.name,
      description: config.description,
      site: '@tamkinly',
      images: ['https://tamkinly.com/og-image.png'],
    },
    
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Get all product slugs for static generation
 */
export function getAllProductSlugs(): string[] {
  return Object.keys(productMetadataConfig);
}
