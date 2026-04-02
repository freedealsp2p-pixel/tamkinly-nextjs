/**
 * JSON-LD Structured Data Component
 * Injects structured data into the page head for SEO
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
} from '@/lib/seo';

/**
 * Default schemas for the home page
 */
export function DefaultJsonLd() {
  return (
    <JsonLd
      data={[
        generateOrganizationSchema(),
        generateWebSiteSchema(),
      ]}
    />
  );
}

/**
 * Blog Article JSON-LD Props
 */
interface BlogArticleJsonLdProps {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  keywords?: string[];
  image?: string;
}

/**
 * Blog Article schemas - reusable for all blog articles
 */
export function BlogArticleJsonLd({
  headline,
  description,
  slug,
  datePublished,
  dateModified,
  author,
  keywords,
  image,
}: BlogArticleJsonLdProps) {
  const articleSchema = generateArticleSchema({
    headline,
    description,
    url: `/blog/${slug}`,
    datePublished,
    dateModified,
    author,
    keywords,
    image,
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
