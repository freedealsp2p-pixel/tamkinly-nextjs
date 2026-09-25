import { blogFAQ } from '@/lib/blog-faq-data';
import { getLocale } from '@/lib/get-locale';

/**
 * Emits FAQPage JSON-LD for articles that have FAQ entries.
 * Async server component — resolves the active locale itself
 * (x-locale header set by middleware, then NEXT_LOCALE cookie).
 * Renders nothing when the slug has no FAQ data (safe for all layouts).
 */
export default async function FAQPageSchema({ slug }: { slug: string }) {
  const entries = blogFAQ[slug];
  if (!entries || entries.length === 0) return null;

  const locale = await getLocale();
  const lang = locale === 'ar' ? 'ar' : 'en';
  const faqs = entries.filter((e) => e.lang === lang && e.q && e.a);
  if (faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
