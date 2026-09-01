'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

interface RelatedArticle {
  id: string;
  title: string;
  titleAr?: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  language: string;
  readTimeMinutes?: number | null;
  categories: { name: string; slug: string; nameAr?: string }[];
  relationshipLabel?: string | null;
}

interface ProtocolRelatedArticlesProps {
  protocolSlug: string;
  accentColor: string;
}

export function ProtocolRelatedArticles({ protocolSlug, accentColor }: ProtocolRelatedArticlesProps) {
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const [articles, setArticles] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/protocols/${protocolSlug}/related-articles`)
      .then(r => r.json())
      .then(data => {
        setArticles(Array.isArray(data) ? data : []);
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [protocolSlug]);

  if (loading) return null;
  if (articles.length === 0) return null;

  return (
    <section className='mt-12 max-w-3xl mx-auto px-4'>
      <div className='border-t border-slate-200 pt-10'>
        <h2 className='text-xl font-bold text-slate-900 mb-2 flex items-center gap-2'>
          <BookOpen size={20} style={{ color: accentColor }} />
          {isAr ? 'مقالات ذات صلة' : 'Related Articles'}
        </h2>
        <p className='text-sm text-slate-500 mb-6'>
          {isAr ? 'مقالات ترتبط بهذا البروتوكول العلاجي' : 'Articles connected to this therapeutic protocol'}
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {articles.map(article => {
            const title = isAr && article.titleAr ? article.titleAr : article.title;
            const excerpt = isAr && article.titleAr ? (article.excerpt || '').slice(0, 120) : (article.excerpt || '').slice(0, 120);
            const category = article.categories?.[0];
            const categoryName = isAr && category?.nameAr ? category.nameAr : category?.name;

            return (
              <a
                key={article.id}
                href={`/blog/${article.slug}`}
                className='group block rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-200 hover:border-slate-300 bg-white'
              >
                {article.featuredImage && (
                  <div className='h-32 bg-slate-100 overflow-hidden'>
                    <img
                      src={article.featuredImage}
                      alt={title}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                      loading='lazy'
                    />
                  </div>
                )}
                <div className='p-4'>
                  {categoryName && (
                    <span
                      className='inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2'
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {categoryName}
                    </span>
                  )}
                  <h3 className='text-sm font-semibold text-slate-900 group-hover:text-slate-700 line-clamp-2 mb-1'>
                    {title}
                  </h3>
                  {excerpt && (
                    <p className='text-xs text-slate-500 line-clamp-2 mb-2'>{excerpt}</p>
                  )}
                  <div className='flex items-center justify-between'>
                    {article.readTimeMinutes && (
                      <span className='flex items-center gap-1 text-xs text-slate-400'>
                        <Clock size={12} />
                        {article.readTimeMinutes} {isAr ? 'دقيقة' : 'min'}
                      </span>
                    )}
                    <span className='flex items-center gap-1 text-xs font-medium' style={{ color: accentColor }}>
                      {isAr ? 'اقرأ' : 'Read'}
                      <ArrowRight size={12} className='group-hover:translate-x-1 transition-transform' />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
