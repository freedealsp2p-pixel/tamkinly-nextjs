/**
 * Dynamic Blog Article Page
 * Supports both hardcoded articles (from blog-articles.ts) and DB articles (from admin CMS)
 */

import { Metadata } from 'next';
import { headers } from 'next/headers';
import { ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import {
  getBlogArticleBySlug,
  smartPageTitle,
  getAllBlogArticleSlugs,
  BLOG_CATEGORIES,
} from '@/lib/blog-articles';
import { BlogArticleContentClient } from './BlogArticleContentClient';
import { DBArticleContentClient } from '@/components/blog/DBArticleContentClient';

interface PageParams {
  params: Promise<{ slug: string }>;
}

/** Map an article's sub-category name to its parent category slug */
function getCategorySlugForArticle(category: string): string | null {
  const parent = BLOG_CATEGORIES.find(cat =>
    cat.subCategories.some(sub => sub === category)
  );
  return parent ? parent.slug : null;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const isAr = locale === 'ar';

  // Check DB first (admin-created articles)
  try {
    const dbArticle = await db.article.findFirst({
      where: { slug, status: 'PUBLISHED' },
    });
    if (dbArticle) {
      const title = dbArticle.metaTitle || dbArticle.title;
      const desc = dbArticle.metaDescription || dbArticle.excerpt || '';
      const baseUrl = isAr ? `https://tamkinly.com/ar/blog/${slug}` : `https://tamkinly.com/blog/${slug}`;
      const otherUrl = isAr ? `https://tamkinly.com/blog/${slug}` : `https://tamkinly.com/ar/blog/${slug}`;
      return {
        title: smartPageTitle(title, ' | Tamkinly'),
        description: desc,
        alternates: {
          canonical: baseUrl,
          languages: {
            'en-US': `https://tamkinly.com/blog/${slug}`,
            'ar-SA': `https://tamkinly.com/ar/blog/${slug}`,
            'x-default': `https://tamkinly.com/blog/${slug}`,
          },
        },
        openGraph: {
          title,
          description: desc,
          url: baseUrl,
          siteName: 'Tamkinly',
          type: 'article',
          locale: isAr ? 'ar_SA' : 'en_US',
          publishedTime: dbArticle.publishedAt?.toISOString(),
          images: dbArticle.featuredImage
            ? [{ url: `https://tamkinly.com${dbArticle.featuredImage}`, width: 1200, height: 630, alt: title }]
            : undefined,
        },
      };
    }
  } catch {}

  // Fallback to hardcoded articles
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const enUrl = `https://tamkinly.com/blog/${slug}`;
  const arUrl = `https://tamkinly.com/ar/blog/${slug}`;
  const fullUrl = isAr ? arUrl : enUrl;
  const imageUrl = article.image
    ? `https://tamkinly.com${article.image}`
    : 'https://tamkinly.com/og-image.webp';

  return {
    title: smartPageTitle(article.title, ' | Tamkinly Blog'),
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': enUrl,
        'ar-SA': arUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      type: 'article',
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [article.author],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      site: '@tamkinly',
      images: [imageUrl],
    },
    other: {
      'article:published_time': article.datePublished,
      'article:modified_time': article.dateModified,
      'article:author': article.author,
      'article:section': article.category,
    },
  };
}

export async function generateStaticParams() {
  return getAllBlogArticleSlugs().map((slug) => ({ slug }));
}

export default async function BlogArticlePage({ params }: PageParams) {
  const { slug } = await params;
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const isAr = locale === 'ar';

  // Check DB first (admin-created articles) - locale-aware
  try {
    const dbArticle = await db.article.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: {
        categories: { select: { id: true, name: true, nameAr: true, slug: true } },
        topics: { select: { id: true, name: true, nameAr: true, slug: true } },
        linkedArticle: { select: { id: true, slug: true, language: true, title: true } },
      },
    });
    if (dbArticle) {
      const rels = await db.contentRelationship.findMany({
        where: { sourceType: 'ARTICLE', sourceId: dbArticle.id },
        orderBy: { sortOrder: 'asc' },
      });
      const firstCat = dbArticle.categories[0];
      const blogLabel = isAr ? 'المدونة' : 'Blog';
      const blogHref = isAr ? '/ar/blog' : '/blog';
      return (
        <>
          <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-slate-500 py-4">
              <li className="flex items-center gap-1.5">
                <a href={blogHref} className="hover:text-teal-600 transition-colors">{blogLabel}</a>
                <ChevronRight className={`h-3.5 w-3.5 ${isAr ? 'rotate-180' : ''}`} />
              </li>
              {firstCat && (
                <li className="flex items-center gap-1.5">
                  <a href={`/blog/category/${firstCat.slug}`} className="hover:text-teal-600 transition-colors">{isAr && firstCat.nameAr ? firstCat.nameAr : firstCat.name}</a>
                  <ChevronRight className={`h-3.5 w-3.5 ${isAr ? 'rotate-180' : ''}`} />
                </li>
              )}
              <li className="text-slate-900 font-medium truncate max-w-[300px] sm:max-w-[500px]">{dbArticle.title}</li>
            </ol>
          </nav>
          <DBArticleContentClient
            article={{
              ...dbArticle,
              publishedAt: dbArticle.publishedAt?.toISOString() ?? null,
            }}
            relationships={rels}
          />
        </>
      );
    }
  } catch {}

  // Fallback to hardcoded articles
  const article = getBlogArticleBySlug(slug);
  if (!article) { notFound(); }
  const categorySlug = getCategorySlugForArticle(article.category);
  return (
    <>
      <nav className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-sm text-slate-500 py-4">
          <li className="flex items-center gap-1.5">
            <a href="/blog" className="hover:text-teal-600 transition-colors">Blog</a>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          {categorySlug && (
            <li className="flex items-center gap-1.5">
              <a href={`/blog/category/${categorySlug}`} className="hover:text-teal-600 transition-colors">{article.category}</a>
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
          )}
          <li className="text-slate-900 font-medium truncate max-w-[300px] sm:max-w-[500px]">{article.title}</li>
        </ol>
      </nav>
      <BlogArticleContentClient article={article} />
    </>
  );
}
