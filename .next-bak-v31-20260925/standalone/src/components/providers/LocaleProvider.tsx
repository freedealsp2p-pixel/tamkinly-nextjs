'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Locale hooks live in LocaleCore (shared by both locale bundles) —
// re-exported here so all existing imports keep working unchanged.
export { useLocale, useTranslations } from './LocaleCore';

// Performance split (2026-09-18): each locale ships as its own lazy chunk.
// The dispatcher renders only the bundle matching the server-provided
// initialLocale, so every visitor downloads roughly half of the previous
// combined messages chunk (~134KB gz → ~55-75KB gz per locale).
// Chunk-split is enforced by next/dynamic (server-side static imports of both
// bundles would make Turbopack colocate them into one chunk again).
// Behavior is unchanged: urlBased mode reloads with the NEXT_LOCALE cookie
// and the server picks the matching bundle on the next request.

const LocaleProviderEn = dynamic(() => import('./LocaleProviderEn'), { loading: () => null });
const LocaleProviderAr = dynamic(() => import('./LocaleProviderAr'), { loading: () => null });

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: 'en' | 'ar';
  urlBased?: boolean;
}

export function LocaleProvider({ children, initialLocale = 'en', urlBased = false }: LocaleProviderProps) {
  const Impl = initialLocale === 'ar' ? LocaleProviderAr : LocaleProviderEn;
  return (
    <Impl initialLocale={initialLocale} urlBased={urlBased}>
      {children}
    </Impl>
  );
}
