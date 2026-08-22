/**
 * Dynamic Blog Article Page
 * Uses generateMetadata for SEO-optimized metadata per article
 * Enables Google to index all 22+ blog articles with unique metadata
 *
 * Server component handles SEO (generateMetadata, generateStaticParams)
 * Client component (BlogArticleContentClient) handles bilingual rendering
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getBlogArticleBySlug,
  getAllBlogArticleSlugs,
} from '@/lib/blog-articles';
import { BlogArticleContentClient } from './BlogArticleContentClient';

// ============================================
// DYNAMIC METADATA GENERATION
// ============================================

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Tamkinly Blog',
      description: 'The requested article could not be found.',
    };
  }

  const fullUrl = `https://tamkinly.com/blog/${article.slug}`;
  const imageUrl = article.image
    ? `https://tamkinly.com${article.image}`
    : 'https://tamkinly.com/og-image.webp';

  return {
    title: `${article.title} | Tamkinly Blog`,
    description: article.description,
    keywords: article.keywords,

    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': fullUrl,
        'ar-SA': `https://tamkinly.com/ar/blog/${slug}`,
        'x-default': fullUrl,
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
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
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

// ============================================
// STATIC PARAMS GENERATION
// ============================================

export async function generateStaticParams() {
  return getAllBlogArticleSlugs().map((slug) => ({
    slug,
  }));
}

// ============================================
// PAGE COMPONENT (SERVER)
// ============================================

export default async function BlogArticlePage({ params }: PageParams) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <BlogArticleContentClient article={article} />;
}

