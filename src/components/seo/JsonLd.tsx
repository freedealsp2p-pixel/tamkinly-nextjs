/**
 * JSON-LD Structured Data Component
 * Injects structured data into the page head for SEO
 * Supports multiple schemas for rich search results
 */

interface JsonLdProps {
  data: object | object[];
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLdData = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonLdData.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  );
}

// Pre-built schema combinations for common use cases
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateSoftwareAppSchema,
  generateFAQSchema,
} from '@/lib/seo';

/**
 * Default schemas for the home page
 * Includes Organization, WebSite, and enhanced metadata
 */
export function DefaultJsonLd({ locale }: { locale?: string }) {
  const isAr = locale === 'ar';
  return (
    <JsonLd
      data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Tamkinly',
          alternateName: isAr ? 'تمكينلي' : 'Tamkinly',
          description: isAr
            ? 'مساحة لإعادة بناء الإنسان من الداخل. بدون ضغط. بدون حكم على الذات. بدون تحفيز مؤقت. منتجات رقمية لتحويل الهوية والتطوير الشخصي.'
            : 'A space to rebuild the human from within. Without pressure. Without self-judgment. Without temporary motivation. Digital products for identity transformation and personal development.',
          url: 'https://tamkinly.com',
          logo: 'https://tamkinly.com/logo.webp',
          sameAs: [
            'https://instagram.com/tamkinly',
            'https://linkedin.com/company/tamkinly',
            'https://t.me/tamkinly',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['English', 'Arabic'],
            email: 'hello@tamkinly.com',
          },
          foundingDate: '2024',
          areaServed: 'Worldwide',
          knowsAbout: [
            isAr ? 'تحويل الهوية' : 'Identity Transformation',
            isAr ? 'التطوير الشخصي' : 'Personal Development',
            isAr ? 'تكوين العادات' : 'Habit Formation',
            isAr ? 'تحسين الذات' : 'Self-Improvement',
          ],
        },
        // Note: WebSite schema is rendered via <head> script in root layout.
        // Speakable specification for voice search
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: isAr ? 'تمكينلي - أدوات تحويل الهوية' : 'Tamkinly - Identity Transformation Tools',
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.hero-title', '.hero-subtitle', '.cta-button'],
          },
          potentialAction: {
            '@type': 'ReadAction',
            target: 'https://tamkinly.com',
          },
        },
      ]}
    />
  );
}

/**
 * Blog Article JSON-LD Props
 */
interface BlogArticleJsonLdProps {
  headline: string;
  headlineAr?: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
  image?: string;
  wordCount?: number;
}

/**
 * Blog Article schemas - reusable for all blog articles
 */
export function BlogArticleJsonLd({
  headline,
  headlineAr,
  description,
  slug,
  datePublished,
  dateModified,
  author,
  keywords,
  image,
  wordCount,
}: BlogArticleJsonLdProps) {
  const articleSchema = generateArticleSchema({
    headline,
    headlineAr,
    description,
    url: `/blog/${slug}`,
    datePublished,
    dateModified,
    author,
    keywords,
    image,
    wordCount,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: headline, url: `/blog/${slug}` },
  ]);

  return (
    <JsonLd
      data={[
        // Organization omitted - rendered by DefaultJsonLd in root layout
        articleSchema,
        breadcrumbSchema,
      ]}
    />
  );
}

/**
 * Real pricing model: each app's JSON-LD offer must reflect the actual
 * subscription tier price that unlocks it (FREE $0 / BASIC $7 / PREMIUM $17 / MASTERY $27).
 */
const APP_TIER_MONTHLY_PRICE: Record<string, number> = {
  FREE: 0,
  BASIC: 7,
  PREMIUM: 17,
  MASTERY: 27,
};

/**
 * App Page JSON-LD Props
 */
interface AppPageJsonLdProps {
  name: string;
  nameAr?: string;
  description: string;
  slug: string;
  category: string;
  features?: string[];
  isFree?: boolean;
  tier?: string;
}

/**
 * App Page schemas - reusable for all app pages
 */
export function AppPageJsonLd({
  name,
  nameAr,
  description,
  slug,
  category,
  features,
  isFree = true,
  tier,
}: AppPageJsonLdProps) {
  const appSchema = generateSoftwareAppSchema({
    name,
    nameAr,
    description,
    url: `/apps/${slug}`,
    category,
    features,
    offers: {
      price: tier
        ? (APP_TIER_MONTHLY_PRICE[tier] ?? (isFree ? 0 : 7))
        : (isFree ? 0 : 7),
      currency: 'USD',
    },

  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Apps', url: '/apps' },
    { name, url: `/apps/${slug}` },
  ]);

  return (
    <JsonLd
      data={[
        // Organization omitted - rendered by DefaultJsonLd in root layout
        appSchema,
        breadcrumbSchema,
      ]}
    />
  );
}

/**
 * FAQ Page JSON-LD Props
 */
interface FAQPageJsonLdProps {
  questions: Array<{
    question: string;
    questionAr?: string;
    answer: string;
    answerAr?: string;
  }>;
}

/**
 * FAQ Page schemas
 */
export function FAQPageJsonLd({ questions }: FAQPageJsonLdProps) {
  const faqSchema = generateFAQSchema(questions);

  return (
    <JsonLd
      data={[
        // Organization omitted - rendered by DefaultJsonLd in root layout
        faqSchema,
      ]}
    />
  );
}

