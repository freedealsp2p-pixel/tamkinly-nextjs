'use client';

import { ReactNode } from 'react';
import arMessages from '@/../messages/ar.json';
import { LocaleCore } from './LocaleCore';

// Arabic-only messages bundle. Loaded only for AR requests —
// see LocaleProvider.tsx (dispatcher) and LocaleCore.tsx (shared logic).

interface LocaleProviderArProps {
  children: ReactNode;
  initialLocale?: 'en' | 'ar';
  urlBased?: boolean;
}

export default function LocaleProviderAr({ children, initialLocale = 'en', urlBased = false }: LocaleProviderArProps) {
  return (
    <LocaleCore
      messages={arMessages as unknown as Record<string, unknown>}
      initialLocale={initialLocale}
      urlBased={urlBased}
    >
      {children}
    </LocaleCore>
  );
}
