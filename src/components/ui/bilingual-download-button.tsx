'use client';

import { Download, FileText, Globe } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getBilingualFile } from '@/lib/bilingual-files';

interface BilingualDownloadButtonProps {
  /** Key in BILINGUAL_FILES catalog (e.g. 'REC-01-HALT') */
  fileKey: string;
  /** Custom label override (otherwise uses file title) */
  label?: { ar: string; en: string };
  /** Variant: 'primary' (filled) | 'outline' | 'compact' */
  variant?: 'primary' | 'outline' | 'compact';
  /** Show file size? */
  showSize?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Unified bilingual download button.
 *
 * Behavior:
 * - Shows button for user's current language (primary)
 * - Shows small "other language" link below/beside
 * - Both open in new tab
 * - Tracks 'resource_download' analytics event
 * - If current language version unavailable, shows other language as primary
 * - If neither available, shows "Coming Soon" disabled
 */
export function BilingualDownloadButton({
  fileKey,
  label,
  variant = 'outline',
  showSize = false,
  className = '',
}: BilingualDownloadButtonProps) {
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const file = getBilingualFile(fileKey);

  if (!file) {
    return null;
  }

  const currentLangFile = file[isAr ? 'ar' : 'en'];
  const otherLangFile = file[isAr ? 'en' : 'ar'];
  const otherLangLabel = isAr ? 'English' : 'العربية';

  // Determine primary action
  const primaryAvailable = currentLangFile.available;
  const primaryHref = primaryAvailable ? currentLangFile.href : (otherLangFile.available ? otherLangFile.href : null);
  const primaryResourceId = primaryAvailable ? file.resourceId + (isAr ? '-AR' : '-EN') : (otherLangFile.available ? file.resourceId + (isAr ? '-EN' : '-AR') : null);
  const primaryLabel = label?.[isAr ? 'ar' : 'en'] || file.titleFallback?.[isAr ? 'ar' : 'en'] || fileKey;

  // If neither available — Coming Soon
  if (!primaryHref) {
    return (
      <button
        disabled
        className={`inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-6 text-sm font-medium text-slate-400 ${className}`}
        title={isAr ? 'سيتم توفير هذا الملف قريباً' : 'This worksheet will be available soon'}
      >
        <Download className="h-4 w-4" />
        {isAr ? 'قريباً' : 'Coming Soon'}
      </button>
    );
  }

  const handleDownload = (resourceId: string, lang: 'ar' | 'en') => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resource_download', {
        resource_id: resourceId,
        resource_title: file.titleFallback?.en || fileKey,
        resource_category: file.category,
        resource_language: lang,
        locale: isAr ? 'ar' : 'en',
      });
    }
  };

  // Variant styles
  const variantClass = {
    primary: 'bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    compact: 'border border-slate-200 bg-white hover:bg-slate-50 text-sm',
  }[variant];

  const showOtherLang = otherLangFile.available && primaryAvailable;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <a
        href={primaryHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleDownload(primaryResourceId!, primaryAvailable ? (isAr ? 'ar' : 'en') : (isAr ? 'en' : 'ar'))}
        className={`inline-flex h-11 items-center gap-2 rounded-md px-6 text-sm font-medium ring-offset-background transition-colors ${variantClass}`}
      >
        <Download className="h-4 w-4" />
        <span>{primaryLabel}</span>
        {showSize && (primaryAvailable ? currentLangFile.size : otherLangFile.size) && (
          <span className="text-xs opacity-70 ms-1">({primaryAvailable ? currentLangFile.size : otherLangFile.size})</span>
        )}
      </a>

      {showOtherLang && (
        <a
          href={otherLangFile.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleDownload(file.resourceId + (isAr ? '-EN' : '-AR'), isAr ? 'en' : 'ar')}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#1F6F78] transition-colors ms-1"
          title={isAr ? `تحميل باللغة الإنجليزية` : `Download in Arabic`}
        >
          <Globe className="h-3 w-3" />
          {isAr ? `تحميل النسخة الإنجليزية` : `Download Arabic version`}
        </a>
      )}
    </div>
  );
}
