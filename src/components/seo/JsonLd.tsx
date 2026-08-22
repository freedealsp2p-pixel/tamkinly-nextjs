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

  });

  cd: 'Credit Card, PayPal',
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
              url: 'https://tamkinly.com/logo-icon.webp',
            },
          },
        },
      ]}
    />
  );
}

