import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { getLocale } from '@/lib/get-locale';
import { BLOG_AUTHORS, getAuthorBySlug } from '@/lib/blog-authors';
import { BLOG_ARTICLES, type BlogArticle } from '@/lib/blog-articles';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};

  const locale = await getLocale();
  const isAr = locale === 'ar';
  const name = isAr ? author.nameAr : author.name;
  const bio = isAr ? author.bioAr : author.bio;
  const title = `${name}${isAr ? ' | تمكنلي' : ' | Tamkinly'}`;

  const enUrl = `https://tamkinly.com/blog/author/${author.slug}`;
  const arUrl = `https://tamkinly.com/ar/blog/author/${author.slug}`;
  const fullUrl = isAr ? arUrl : enUrl;

  return {
    title,
    description: bio,
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': enUrl,
        'ar-SA': arUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title,
      description: bio,
      url: fullUrl,
      siteName: 'Tamkinly',
      type: 'profile',
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

interface AuthorBodyProps {
  name: string;
  role: string;
  bio: string;
  initials: string;
  isAr: boolean;
  articles: BlogArticle[];
}

function AuthorHero({ name, role, bio, initials, isAr, articles }: AuthorBodyProps) {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-accent/20 border-2 border-accent/40 mx-auto mb-6 flex items-center justify-center">
            <span className="font-serif text-3xl font-bold text-accent">{initials}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-3 leading-tight">
            {name}
          </h1>
          <p className="text-accent text-lg mb-6">{role}</p>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">{bio}</p>
          <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {isAr
                ? `${articles.length} مقالة`
                : `${articles.length} ${articles.length === 1 ? 'article' : 'articles'}`}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {isAr ? 'يُراجع باستمرار' : 'Continuously reviewed'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleGrid({ isAr, articles }: { isAr: boolean; articles: BlogArticle[] }) {
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
            {isAr ? 'مقالات المؤلف' : 'Articles by this author'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={isAr ? `/ar/blog/${a.slug}` : `/blog/${a.slug}`}
                className="group block"
                dir={isAr ? 'rtl' : 'ltr'}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-slate-200">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Badge
                      variant="outline"
                      className="mb-3 w-fit border-accent/30 text-accent bg-accent/10"
                    >
                      {isAr ? a.categoryAr : a.category}
                    </Badge>
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {isAr ? a.titleAr : a.title}
                    </h3>
                    <p className="text-slate-600 mb-4 flex-1">
                      {isAr ? a.descriptionAr : a.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {isAr ? a.readTimeAr : a.readTime}
                      </span>
                      <span>{formatDate(a.datePublished)}</span>
                      <Arrow className="h-4 w-4 ms-auto text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const locale = await getLocale();
  const isAr = locale === 'ar';
  const articles = BLOG_ARTICLES.filter(
    (a) => a.author === author.name || a.authorAr === author.nameAr
  );

  const enUrl = `https://tamkinly.com/blog/author/${author.slug}`;
  const arUrl = `https://tamkinly.com/ar/blog/author/${author.slug}`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: isAr ? author.nameAr : author.name,
    alternateName: isAr ? author.name : author.nameAr,
    url: isAr ? arUrl : enUrl,
    description: isAr ? author.bioAr : author.bio,
    jobTitle: isAr ? author.roleAr : author.role,
    worksFor: {
      '@type': 'Organization',
      name: 'Tamkinly',
      url: 'https://tamkinly.com',
    },
    sameAs: author.sameAs,
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: isAr ? author.nameAr : author.name, url: `/blog/author/${author.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[personSchema, breadcrumbSchema]} />
      <article className="min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
        <AuthorHero
          name={isAr ? author.nameAr : author.name}
          role={isAr ? author.roleAr : author.role}
          bio={isAr ? author.bioAr : author.bio}
          initials={isAr ? author.initialsAr : author.initials}
          isAr={isAr}
          articles={articles}
        />
        <ArticleGrid isAr={isAr} articles={articles} />
      </article>
    </>
  );
}
