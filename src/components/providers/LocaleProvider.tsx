'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import enMessages from '@/../messages/en.json';
import arMessages from '@/../messages/ar.json';

type Messages = typeof enMessages;
type Locale = 'en' | 'ar';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  direction: 'ltr' | 'rtl';
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const messages: Record<Locale, Messages> = {
  en: enMessages,
  ar: arMessages,
};

// Helper to get nested value from object using dot notation
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let result: unknown = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path; // Return the key if not found
    }
  }
  
  return typeof result === 'string' ? result : path;
}

// Get initial locale from localStorage
function getInitialLocale(): Locale {
  // Default for SSR
  if (typeof window === 'undefined') return 'en';
  
  const saved = localStorage.getItem('locale');
  if (saved === 'ar' || saved === 'en') {
    return saved;
  }
  return 'en';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Use lazy initializer to get locale from localStorage once on mount
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  
  // Update document attributes when locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);
  
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  }, []);
  
  const t = useCallback((key: string): string => {
    return getNestedValue(messages[locale] as unknown as Record<string, unknown>, key);
  }, [locale]);
  
  const direction = useMemo((): 'ltr' | 'rtl' => locale === 'ar' ? 'rtl' : 'ltr', [locale]);
  
  const contextValue = useMemo(() => ({
    locale,
    setLocale,
    t,
    direction,
  }), [locale, setLocale, t, direction]);
  
  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

export function useTranslations(namespace?: string) {
  const { t } = useLocale();
  
  const translate = useCallback((key: string): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return t(fullKey);
  }, [t, namespace]);
  
  return translate;
}
