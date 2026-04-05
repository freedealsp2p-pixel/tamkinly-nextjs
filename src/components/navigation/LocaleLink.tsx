'use client';

import { forwardRef, type ComponentProps } from 'react';
import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';

type LinkProps = ComponentProps<typeof Link>;

/**
 * Locale-aware Link component that automatically handles locale prefixes.
 * 
 * With `localePrefix: 'as-needed'`:
 * - English (default): no prefix (/, /products, /about)
 * - Arabic: /ar prefix (/ar, /ar/products, /ar/about)
 */
export const LocaleLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, ...props }, ref) => {
    const { locale } = useLocale();
    
    // Skip locale prefix for external links, anchors, or API routes
    const hrefString = typeof href === 'string' ? href : href.pathname || '';
    
    // Don't modify external links, anchors, or API routes
    if (
      hrefString.startsWith('http') ||
      hrefString.startsWith('#') ||
      hrefString.startsWith('/api') ||
      hrefString.startsWith('/_next')
    ) {
      return <Link ref={ref} href={href} {...props} />;
    }
    
    // For Arabic, prepend /ar to the path
    if (locale === 'ar') {
      const localizedHref = typeof href === 'string'
        ? href === '/' ? '/ar' : `/ar${href.startsWith('/') ? '' : '/'}${href}`
        : {
            ...href,
            pathname: href.pathname === '/' ? '/ar' : `/ar${href.pathname}`,
          };
      
      return <Link ref={ref} href={localizedHref} {...props} />;
    }
    
    // For English (default locale), use the path as is
    return <Link ref={ref} href={href} {...props} />;
  }
);

LocaleLink.displayName = 'LocaleLink';

export default LocaleLink;
