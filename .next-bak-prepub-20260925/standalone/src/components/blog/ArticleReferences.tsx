'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { ARTICLE_REFERENCES } from '@/lib/article-references';
import { BookOpenCheck, ExternalLink } from 'lucide-react';

/**
 * Scientific References section for blog articles (E-E-A-T signal).
 * Renders a numbered list of verified academic sources per article slug.
 * Bilingual labels via locale. Returns null when no references exist.
 */
export function ArticleReferences({ slug }: { slug: string }) {
  const { locale } = useLocale();
  const refs = ARTICLE_REFERENCES[slug];
  if (!refs || refs.length === 0) return null;

  return (
    <section
      className="py-12 bg-slate-50 border-t border-slate-200"
      aria-label={locale === 'ar' ? 'المراجع العلمية' : 'Scientific References'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <BookOpenCheck className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold text-primary">
              {locale === 'ar' ? 'المراجع العلمية' : 'Scientific References'}
            </h2>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            {locale === 'ar'
              ? 'تستند أفكار هذا المقال إلى أبحاث علمية محكّمة ومصادر أكاديمية موثوقة:'
              : 'The ideas in this article are grounded in peer-reviewed research and trusted academic sources:'}
          </p>
          <ol className="space-y-4">
            {refs.map((ref, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs flex items-center justify-center font-semibold">
                  {i + 1}
                </span>
                <span className="text-slate-600 leading-relaxed">
                  {ref.title}{' '}
                  <em className="text-slate-500">{ref.source}</em>{' '}
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline inline-flex items-center gap-1"
                  >
                    {locale === 'ar' ? 'الرابط' : 'Link'}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
