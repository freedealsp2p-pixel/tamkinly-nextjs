'use client';

import { ReactNode } from 'react';
import enMessages from '@/../messages/en.json';
import { LocaleCore } from './LocaleCore';

// English-only messages bundle. Loaded only for EN requests —
// see LocaleProvider.tsx (dispatcher) and LocaleCore.tsx (shared logic).

interface LocaleProviderEnProps {
  children: ReactNode;
  initialLocale?: 'en' | 'ar';
  urlBased?: boolean;
}

export default function LocaleProviderEn({ children, initialLocale = 'en', urlBased = false }: LocaleProviderEnProps) {
  return (
    <LocaleCore
      messages={enMessages as unknown as Record<string, unknown>}
      initialLocale={initialLocale}
      urlBased={urlBased}
    >
      {children}
    </LocaleCore>
  );
}
