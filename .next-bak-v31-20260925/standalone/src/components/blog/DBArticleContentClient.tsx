'use client';

import Link from 'next/link';
import { simpleMd } from "@/lib/markdown";
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';


import { useLocale } from '@/components/providers/LocaleProvider';
import { JsonLd } from '@/components/seo/JsonLd';

interface DBArticle {
  id: string;
  title: string;
  slug: string;
  language: string;
  excerpt: string | null;
  body: string;
  featuredImage: string | null;
  imageCaption: string | null;
  publishedAt: string | null;
  readTimeMinutes: number | null;
  categories: { id: string; name: string; nameAr: string | null; slug: string }[];
  topics: { id: string; name: string; nameAr: string | null; slug: string }[];
  linkedArticle: { id: string; slug: string; language: string; title: string } | null;
}

interface RelatedContent {
  id: string;
  targetType: string;
  targetSlug: string;
  label: string | null;
  sortOrder: number;
}

export function DBArticleContentClient({ article, relationships }: { article: DBArticle; relationships: RelatedContent[] }) {
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const otherLang = article.linkedArticle;
  const langSwitchSlug = otherLang ? (isAr ? `/blog/${otherLang.slug}` : `/ar/blog/${otherLang.slug}`) : null;

  const protocols = relationships?.filter(r => r.targetType === 'THERAPEUTIC_PROTOCOL') || [];
  const tools = relationships?.filter(r => r.targetType === 'TOOL') || [];
  const relatedArticles = relationships?.filter(r => r.targetType === 'ARTICLE') || [];

  const readTime = article.readTimeMinutes
    ? (isAr ? `${article.readTimeMinutes} دقائق` : `${article.readTimeMinutes} min`)
    : (isAr ? '٥ دقائق' : '5 min');

  return (
    <>
    <JsonLd data={{
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || '',
    url: `https://tamkinly.com/blog/${article.slug}`,
    datePublished: article.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Tamkinly',
      url: 'https://tamkinly.com',
    },
    ...(article.featuredImage && {
      image: `https://tamkinly.com${article.featuredImage}`,
    }),
  }} />
  <article className="min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {article.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.categories.map(cat => (
                  <span key={cat.id} className="px-3 py-1 rounded-full text-xs font-medium bg-[#3DD4B0]/20 text-[#3DD4B0] border border-[#3DD4B0]/30">
                    {isAr && cat.nameAr ? cat.nameAr : cat.name}
                  </span>
                ))}
              </div>
            )}
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">{article.title}</h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{readTime}</span>
              {article.publishedAt && <span>{new Date(article.publishedAt).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
              {langSwitchSlug && (
                <Link href={langSwitchSlug} className="flex items-center gap-1 text-[#3DD4B0] hover:underline">
                  {isAr ? <ArrowLeft className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
                  {isAr ? 'English' : 'عربي'}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      {article.featuredImage && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="max-w-3xl mx-auto">
            <img src={article.featuredImage} alt={article.title} className="w-full rounded-2xl shadow-lg object-cover max-h-[400px]" />
            {article.imageCaption && <p className="text-xs text-slate-400 mt-2 text-center">{article.imageCaption}</p>}
          </div>
        </div>
      )}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {article.excerpt && <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">{article.excerpt}</p>}
            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-[#0F1C2E] prose-a:text-[#1F6F78] prose-strong:text-[#0F1C2E]">
              <div dangerouslySetInnerHTML={{__html: simpleMd(article.body)}} />
            </div>
            {article.topics.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-wrap gap-2">
                  {article.topics.map(topic => (
                    <span key={topic.id} className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
                      #{isAr && topic.nameAr ? topic.nameAr : topic.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {protocols.length > 0 && (
              <div className="mt-12 p-6 rounded-2xl bg-[#F5F9F8] border border-slate-100">
                <h3 className="text-lg font-semibold text-[#0F1C2E] mb-4">{isAr ? 'بروتوكولات علاجية' : 'Related Therapeutic Protocols'}</h3>
                <div className="space-y-3">
                  {protocols.map((rel, i) => (
                    <Link key={i} href={`/apps/therapeutic-protocols/${rel.targetSlug}`} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 hover:border-[#1F6F78]/30 transition-all">
                      <span className="font-medium text-[#0F1C2E]">{rel.label || rel.targetSlug}</span>
                      <ArrowRight className={`h-4 w-4 text-[#1F6F78] ${isAr ? 'rotate-180' : ''}`} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {tools.length > 0 && (
              <div className="mt-8 p-6 rounded-2xl bg-[#F5F9F8] border border-slate-100">
                <h3 className="text-lg font-semibold text-[#0F1C2E] mb-4">{isAr ? 'أدوات مرتبطة' : 'Related Tools'}</h3>
                <div className="space-y-3">
                  {tools.map(t => (
                    <Link key={t.id} href={`/apps/${t.targetSlug}`} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 hover:border-[#3DD4B0]/30 transition-all">
                      <span className="font-medium text-[#0F1C2E]">{t.label || t.targetSlug}</span>
                      <ArrowRight className={`h-4 w-4 text-[#3DD4B0] ${isAr ? 'rotate-180' : ''}`} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedArticles.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#0F1C2E] mb-4">{isAr ? 'استكشاف المزيد' : 'Continue Exploring'}</h3>
                <div className="space-y-3">
                  {relatedArticles.map(a => (
                    <Link key={a.id} href={`/blog/${a.targetSlug}`} className="block p-4 rounded-xl bg-white border border-slate-100 hover:border-[#1F6F78]/30 transition-all">
                      <span className="font-medium text-[#0F1C2E]">{a.label || a.targetSlug}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <Link href={isAr ? "/ar/blog" : "/blog"} className="text-sm text-[#1F6F78] hover:underline">
                {isAr ? '← العودة إلى المدونة' : '← Back to Blog'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
