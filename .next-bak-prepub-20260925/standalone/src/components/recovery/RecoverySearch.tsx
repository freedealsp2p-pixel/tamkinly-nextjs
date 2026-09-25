'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X, ExternalLink } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { searchRecoveryContent, type RecoverySearchItem } from '@/lib/recovery-search';

const MAX_RESULTS = 12;

const SUGGESTIONS = {
  ar: ['تأريض', 'تنفس', 'المحفزات', 'العار', 'خطة الأمان', 'الهوية', 'يوميات', 'الصدمة الثانوية'],
  en: ['grounding', 'breathing', 'triggers', 'shame', 'safety plan', 'identity', 'journal', 'relapse'],
} as const;

const PROGRAM_BADGE = {
  trc: { ar: 'صدمات', en: 'Trauma', color: '#1F6F78', bg: '#F0F7F7' },
  pr: { ar: 'أنماط قهرية', en: 'Compulsive Patterns', color: '#0F766E', bg: '#F0FDF9' },
  guide: { ar: 'دليل', en: 'Guide', color: '#6B7280', bg: '#F3F4F6' },
} as const;

function ResultRow({ item, locale }: { item: RecoverySearchItem; locale: string }) {
  const isAr = locale === 'ar';
  const title = isAr ? item.titleAr : item.titleEn;
  const desc = isAr ? item.descAr : item.descEn;
  const stage = isAr ? item.stageLabelAr : item.stageLabelEn;
  const badge = PROGRAM_BADGE[item.program];

  return (
    <Link
      href={item.href}
      className="group flex items-start gap-3 rounded-lg p-3 transition-all hover:shadow-sm"
      style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }}
    >
      <div className="mt-0.5 flex-1 min-w-0">
        <span className="block text-sm font-medium truncate" style={{ color: '#0F1C2E' }}>
          {title}
        </span>
        <span className="mt-1 block text-xs leading-relaxed" style={{ color: '#374151' }}>
          {desc}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
          <span
            className="rounded-full px-2 py-0.5"
            style={{ backgroundColor: badge.bg, color: badge.color }}
          >
            {isAr ? badge.ar : badge.en}
          </span>
          {stage && (
            <span>
              {stage}
            </span>
          )}
          {item.minutes != null && (
            <span aria-hidden="true">•</span>
          )}
          {item.minutes != null && (
            <span>
              ~{item.minutes} {isAr ? 'دقيقة' : 'min'}
            </span>
          )}
        </span>
      </div>
      <ExternalLink
        className="mt-1 h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ color: '#1F6F78' }}
        aria-hidden="true"
      />
    </Link>
  );
}

export default function RecoverySearch() {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const [query, setQuery] = useState('');

  const results = useMemo(() => searchRecoveryContent(query, locale === 'ar' ? 'ar' : 'en'), [query, locale]);
  const hasQuery = query.trim().length > 0;
  const shown = results.slice(0, MAX_RESULTS);
  const hidden = results.length - shown.length;

  const inputId = 'recovery-search-input';
  const resultsId = 'recovery-search-results';
  const hintId = 'recovery-search-hint';

  return (
    <section className="py-12 px-4" style={{ backgroundColor: '#F0F7F7' }} dir={direction}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <Search className="w-5 h-5" style={{ color: '#1F6F78' }} aria-hidden="true" />
          <h2 className="text-xl font-bold" style={{ color: '#0F1C2E' }}>
            {isAr ? 'ابحث في مقالات وأدوات التعافي' : 'Search Recovery Articles & Tools'}
          </h2>
        </div>
        <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
          {isAr
            ? 'اكتب كلمة واحدة أو أكثر — مثل: تأريض، تنفس، المحفزات، العار، خطة الأمان، الهوية.'
            : 'Type one or more words — e.g. grounding, breathing, triggers, shame, safety plan, identity.'}
        </p>

        <label htmlFor={inputId} className="sr-only">
          {isAr ? 'ابحث في مقالات وأدوات التعافي' : 'Search recovery articles and tools'}
        </label>
        <div className="relative">
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setQuery('');
            }}
            placeholder={isAr ? 'اكتب هنا…' : 'Type here…'}
            aria-describedby={hintId}
            aria-controls={resultsId}
            className="w-full rounded-xl border bg-white py-3 text-sm outline-none transition-colors focus:border-[#1F6F78]"
            style={{
              borderColor: '#E5E7EB',
              color: '#0F1C2E',
              paddingInlineStart: '2.75rem',
              paddingInlineEnd: '2.75rem',
            }}
          />
          <span
            className="pointer-events-none absolute top-1/2 -translate-y-1/2"
            style={{ insetInlineStart: '1rem' }}
            aria-hidden="true"
          >
            <Search className="w-4 h-4" style={{ color: '#9CA3AF' }} />
          </span>
          {hasQuery && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label={isAr ? 'مسح البحث' : 'Clear search'}
              className="absolute top-1/2 -translate-y-1/2 rounded-full p-1 transition-colors hover:bg-gray-100"
              style={{ insetInlineEnd: '0.75rem' }}
            >
              <X className="w-4 h-4" style={{ color: '#6B7280' }} aria-hidden="true" />
            </button>
          )}
        </div>
        <p id={hintId} className="sr-only">
          {isAr ? 'نتائج البحث تظهر أسفل هذا الحقل مباشرة' : 'Search results appear directly below this field'}
        </p>

        <div id={resultsId} aria-live="polite" className="mt-5">
          {!hasQuery && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs" style={{ color: '#6B7280' }}>
                {isAr ? 'اقتراحات:' : 'Suggestions:'}
              </span>
              {SUGGESTIONS[isAr ? 'ar' : 'en'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-full border bg-white px-3 py-1 text-xs transition-colors hover:border-[#1F6F78]"
                  style={{ borderColor: '#E5E7EB', color: '#1F6F78' }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {hasQuery && results.length > 0 && (
            <>
              <p className="text-xs mb-3" style={{ color: '#6B7280' }}>
                {isAr
                  ? `تم العثور على ${results.length} نتيجة${hidden > 0 ? ` (تُعرض أول ${shown.length})` : ''}`
                  : `Found ${results.length} result${results.length === 1 ? '' : 's'}${hidden > 0 ? ` (showing first ${shown.length})` : ''}`}
              </p>
              <div className="space-y-2">
                {shown.map((item) => (
                  <ResultRow key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </>
          )}

          {hasQuery && results.length === 0 && (
            <div className="rounded-xl bg-white p-6 text-center" style={{ border: '1px solid #E5E7EB' }}>
              <p className="text-sm mb-1" style={{ color: '#0F1C2E' }}>
                {isAr ? 'لا توجد نتائج مطابقة' : 'No matching results'}
              </p>
              <p className="text-xs" style={{ color: '#6B7280' }}>
                {isAr
                  ? 'جرّب كلمة أقصر أو أعم — مثل: تنفس، أمان، هدوء.'
                  : 'Try a shorter or broader word — e.g. breathing, safety, calm.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
