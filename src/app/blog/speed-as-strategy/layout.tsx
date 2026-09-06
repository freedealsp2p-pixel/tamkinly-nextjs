import type { Metadata } from 'next';
import { generateBlogArticleMetadata, getBlogArticleBySlug } from '@/lib/blog-articles';
import { getLocale } from '@/lib/get-locale';
import { BlogArticleJsonLd } from '@/components/seo/JsonLd';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return generateBlogArticleMetadata('speed-as-strategy', locale);
}

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const article = getBlogArticleBySlug('speed-as-strategy');

  return (
    <>
      {article && (
        <BlogArticleJsonLd
          headline={article.title}
          description={article.description}
          slug={article.slug}
          datePublished={article.datePublished}
          dateModified={article.dateModified}
          author={article.author}
          keywords={article.keywords}
        />
      )}
      {children}
    </>
  );
}
