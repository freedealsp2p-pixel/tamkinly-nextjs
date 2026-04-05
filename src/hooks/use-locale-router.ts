'use client';

import { useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';

/**
 * A locale-aware router hook that automatically handles locale prefixes.
 * Use this instead of useRouter for navigation that should respect the current locale.
 */
export function useLocaleRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useLocale();

  /**
   * Push a path with the current locale prefix
   */
  const push = useCallback((path: string) => {
    // Skip locale prefix for external links, anchors, or API routes
    if (
      path.startsWith('http') ||
      path.startsWith('#') ||
      path.startsWith('/api') ||
      path.startsWith('/_next')
    ) {
      router.push(path);
      return;
    }

    // For Arabic, prepend /ar to the path
    if (locale === 'ar') {
      const localizedPath = path === '/' ? '/ar' : `/ar${path.startsWith('/') ? '' : '/'}${path}`;
      router.push(localizedPath);
      return;
    }

    // For English (default locale), use the path as is
    router.push(path);
  }, [router, locale]);

  /**
   * Replace a path with the current locale prefix
   */
  const replace = useCallback((path: string) => {
    // Skip locale prefix for external links, anchors, or API routes
    if (
      path.startsWith('http') ||
      path.startsWith('#') ||
      path.startsWith('/api') ||
      path.startsWith('/_next')
    ) {
      router.replace(path);
      return;
    }

    // For Arabic, prepend /ar to the path
    if (locale === 'ar') {
      const localizedPath = path === '/' ? '/ar' : `/ar${path.startsWith('/') ? '' : '/'}${path}`;
      router.replace(localizedPath);
      return;
    }

    // For English (default locale), use the path as is
    router.replace(path);
  }, [router, locale]);

  /**
   * Get the current path without the locale prefix
   */
  const getPathWithoutLocale = useCallback(() => {
    return pathname.replace(/^\/(en|ar)/, '') || '/';
  }, [pathname]);

  return {
    push,
    replace,
    back: router.back,
    forward: router.forward,
    refresh: router.refresh,
    pathname,
    getPathWithoutLocale,
    locale,
  };
}
