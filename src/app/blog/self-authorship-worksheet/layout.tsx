import type { Metadata } from 'next';
import { generateBlogArticleMetadata, getBlogArticleBySlug } from '@/lib/blog-articles';
import { BlogArticleJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = generateBlogArticleMetadata('self-authorship-worksheet');

export default function BlogArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const article = getBlogArticleBySlug('self-authorship-worksheet');

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
