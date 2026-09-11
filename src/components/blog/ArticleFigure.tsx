'use client';

import Image from 'next/image';
import { useLocale } from '@/components/providers/LocaleProvider';

interface BilingualText {
  ar: string;
  en: string;
}

interface ArticleFigureProps {
  /** Path under /public, e.g. /uploads/articles/example.webp */
  src: string;
  /** Intrinsic pixel dimensions of the source image (CLS protection) */
  width: number;
  height: number;
  /** Accessibility + SEO description (localized) */
  alt: BilingualText;
  /** Visible human-readable image title — never the filename */
  title: BilingualText;
  /** Visible explanatory caption */
  caption: BilingualText;
  /** Above-the-fold images only */
  priority?: boolean;
}

/**
 * ArticleFigure — SEO-complete, accessible, bilingual article image.
 *
 * Semantic structure:
 * - <figure> + <figcaption> pairs the visual with its explanation
 * - alt text is localized and descriptive (never the filename)
 * - visible title + caption rendered inside figcaption
 * - next/image handles responsive sizing, WebP/AVIF optimization, lazy loading
 */
export function ArticleFigure({
  src,
  width,
  height,
  alt,
  title,
  caption,
  priority = false,
}: ArticleFigureProps) {
  const { locale, direction } = useLocale();
  const isAr = locale === 'ar';

  return (
    <figure className="my-10" dir={direction}>
      <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm">
        <Image
          src={src}
          alt={isAr ? alt.ar : alt.en}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 768px, 100vw"
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className="w-full h-auto"
        />
      </div>
      <figcaption className="mt-3 px-2 text-center text-sm text-slate-500 leading-relaxed">
        <span className="block font-semibold text-slate-600 mb-0.5">
          {isAr ? title.ar : title.en}
        </span>
        {isAr ? caption.ar : caption.en}
      </figcaption>
    </figure>
  );
}

export default ArticleFigure;
