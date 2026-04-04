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
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateSoftwareAppSchema,
  generateProductSchema,
  generateFAQSchema,
  generateHowToSchema,
  generateCourseSchema,
} from '@/lib/seo';

/**
 * Default schemas for the home page
 * Includes Organization, WebSite, and enhanced metadata
 */
export function DefaultJsonLd() {
  return (
    <JsonLd
      data={[
        generateOrganizationSchema(),
        generateWebSiteSchema(),
        // Speakable specification for voice search
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Tamkinly - Identity Transformation Tools',
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
        generateOrganizationSchema(),
        articleSchema,
        breadcrumbSchema,
      ]}
    />
  );
}

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
}: AppPageJsonLdProps) {
  const appSchema = generateSoftwareAppSchema({
    name,
    nameAr,
    description,
    url: `/apps/${slug}`,
    category,
    features,
    offers: {
      price: isFree ? 0 : 29,
      currency: 'USD',
    },
    aggregateRating: {
      ratingValue: 4.8,
      reviewCount: 150,
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
        generateOrganizationSchema(),
        appSchema,
        breadcrumbSchema,
      ]}
    />
  );
}

/**
 * Product Page JSON-LD Props
 */
interface ProductPageJsonLdProps {
  name: string;
  nameAr?: string;
  description: string;
  price: number;
  currency?: string;
  slug: string;
  features?: string[];
  tier?: string;
}

/**
 * Product Page schemas - for pricing/product pages
 */
export function ProductPageJsonLd({
  name,
  nameAr,
  description,
  price,
  currency = 'USD',
  slug,
  features,
  tier,
}: ProductPageJsonLdProps) {
  const productSchema = generateProductSchema({
    name,
    nameAr,
    description,
    price,
    currency,
    url: `/products#${slug}`,
    category: 'Digital Product',
    features,
    tier,
  });

  return (
    <JsonLd
      data={[
        generateOrganizationSchema(),
        productSchema,
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
        generateOrganizationSchema(),
        faqSchema,
      ]}
    />
  );
}

/**
 * How-To Guide JSON-LD Props
 */
interface HowToPageJsonLdProps {
  name: string;
  nameAr?: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  totalTime?: string;
}

/**
 * How-To Guide schemas
 */
export function HowToPageJsonLd({
  name,
  nameAr,
  description,
  steps,
  totalTime,
}: HowToPageJsonLdProps) {
  const howToSchema = generateHowToSchema({
    name,
    nameAr,
    description,
    steps,
    totalTime,
  });

  return (
    <JsonLd
      data={[
        generateOrganizationSchema(),
        howToSchema,
      ]}
    />
  );
}

/**
 * Course Page JSON-LD Props
 */
interface CoursePageJsonLdProps {
  name: string;
  nameAr?: string;
  description: string;
  slug: string;
  educationalLevel?: string;
  timeRequired?: string;
}

/**
 * Course Page schemas
 */
export function CoursePageJsonLd({
  name,
  nameAr,
  description,
  slug,
  educationalLevel,
  timeRequired,
}: CoursePageJsonLdProps) {
  const courseSchema = generateCourseSchema({
    name,
    nameAr,
    description,
    url: `/courses/${slug}`,
    educationalLevel,
    timeRequired,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Courses', url: '/courses' },
    { name, url: `/courses/${slug}` },
  ]);

  return (
    <JsonLd
      data={[
        generateOrganizationSchema(),
        courseSchema,
        breadcrumbSchema,
      ]}
    />
  );
}

/**
 * Breadcrumb only JSON-LD
 */
interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const breadcrumbSchema = generateBreadcrumbSchema(items);

  return <JsonLd data={[breadcrumbSchema]} />;
}

/**
 * Local Business JSON-LD (for contact/about pages)
 */
export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={[
        {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Tamkinly',
          description: 'Digital products for identity transformation and personal development',
          url: 'https://tamkinly.com',
          telephone: '+1-555-123-4567',
          email: 'hello@tamkinly.com',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'Global',
          },
          geo: {
            '@type': 'GeoCoordinates',
          },
          openingHours: 'Mo-Fr 09:00-17:00',
          priceRange: '$$',
          currenciesAccepted: 'USD',
          paymentAccepted: 'Credit Card, PayPal',
          areaServed: 'Worldwide',
        },
      ]}
    />
  );
}

/**
 * Video Object JSON-LD (for video content)
 */
interface VideoJsonLdProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl?: string;
  embedUrl?: string;
}

export function VideoJsonLd({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
}: VideoJsonLdProps) {
  return (
    <JsonLd
      data={[
        {
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name,
          description,
          thumbnailUrl,
          uploadDate,
          duration,
          contentUrl,
          embedUrl,
          publisher: {
            '@type': 'Organization',
            name: 'Tamkinly',
            logo: {
              '@type': 'ImageObject',
              url: 'https://tamkinly.com/logo.png',
            },
          },
        },
      ]}
    />
  );
}
