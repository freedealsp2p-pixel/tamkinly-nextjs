/**
 * Dynamic Blog Article Page
 * Uses generateMetadata for SEO-optimized metadata per article
 * Enables Google to index all 22+ blog articles with unique metadata
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Clock, User, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';
import {
  BLOG_ARTICLES,
  getBlogArticleBySlug,
  getAllBlogArticleSlugs,
  BlogArticle
} from '@/lib/blog-articles';
import { BlogArticleJsonLd } from '@/components/seo/JsonLd';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';
import { ArticleNavigation } from '@/components/blog/ArticleNavigation';
import { ShareButtons } from '@/components/blog/ShareButtons';

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
// ARTICLE CONTENT COMPONENT
// ============================================

function ArticleContent({ article }: { article: BlogArticle }) {
  return (
    <ReadingProgressBar />
    <article className="min-h-screen">
      {/* JSON-LD Structured Data for SEO */}
      <BlogArticleJsonLd
        headline={article.title}
        description={article.description}
        slug={article.slug}
        datePublished={article.datePublished}
        dateModified={article.dateModified}
        author={article.author}
        keywords={article.keywords}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge
              variant="outline"
              className={`mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10 ${
                article.tier === 'FREE' ? 'border-green-400/50 text-green-400 bg-green-400/10' :
                article.tier === 'BASIC' ? 'border-blue-400/50 text-blue-400 bg-blue-400/10' :
                article.tier === 'BUNDLE' ? 'border-purple-400/50 text-purple-400 bg-purple-400/10' : ''
              }`}
            >
              {article.category}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {article.author}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Share Bar - Sticky on desktop */}
      <div className="sticky top-16 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {article.author}
              </span>
              <span className="hidden sm:inline">{article.datePublished}</span>
            </div>
            <ShareButtons
              url={`https://tamkinly.com/blog/${article.slug}`}
              title={article.title}
              description={article.description}
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              {article.description}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This article explores the science and principles behind {article.title.toLowerCase()}.
              Understanding these concepts can significantly accelerate your identity transformation journey.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Key Insights
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              At Tamkinly, we believe in evidence-based transformation. This article is part of our
              comprehensive approach to identity change, combining research-backed methodologies
              with practical, actionable frameworks.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Quick Implementation</h3>
                  <p className="text-sm text-slate-600">Apply these concepts in just minutes a day</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Evidence-Based</h3>
                  <p className="text-sm text-slate-600">Grounded in psychology and neuroscience</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Identity-Focused</h3>
                  <p className="text-sm text-slate-600">Designed for lasting transformation</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Transformation Framework
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Every article in the Tamkinly blog connects to our core transformation methodology.
              We focus on three key elements: awareness, action, and identity integration.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Application Steps</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span>Read and reflect on the key concepts presented</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span>Identify one specific area to apply in your life</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span>Use our tools to track your progress and evidence</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span>Integrate the new behavior into your identity</span>
                </li>
              </ol>
            </div>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">Moving Forward</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The journey of identity transformation is ongoing. Each article builds upon the last,
              creating a comprehensive framework for lasting change. We encourage you to explore
              related content and use our interactive tools to deepen your practice.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Ready to take the next step? Explore our apps and products designed to support
              your transformation journey with structured guidance and tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug={article.slug} />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Start Your Transformation Journey
            </h2>
            <p className="text-slate-300 mb-6">
              Get the tools and structure to apply these insights to your life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apps">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Try Free Apps
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="white" size="lg" className="px-8 font-semibold">
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

// ============================================
// PAGE COMPONENT
// ============================================

export default async function BlogArticlePage({ params }: PageParams) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleContent article={article} />;
}
