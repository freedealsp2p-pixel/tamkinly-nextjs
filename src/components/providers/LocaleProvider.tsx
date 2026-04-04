'use client';

import { createContext, useContext, useEffect, ReactNode, useCallback, useMemo, useState } from 'react';
import enMessages from '@/../messages/en.json';
import arMessages from '@/../messages/ar.json';

type Messages = typeof enMessages;
type Locale = 'en' | 'ar';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  direction: 'ltr' | 'rtl';
  isHydrated: boolean;
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

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Start with 'en' for SSR, then sync with localStorage after hydration
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration - read from localStorage after mount
  useEffect(() => {
    const stored = localStorage.getItem('locale');
    const initialLocale: Locale = (stored === 'ar' || stored === 'en') ? stored : 'en';
    setLocaleState(initialLocale);
    setIsHydrated(true);

    // Set initial document attributes
    document.documentElement.lang = initialLocale;
    document.documentElement.dir = initialLocale === 'ar' ? 'rtl' : 'ltr';
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'locale' && e.newValue) {
        const newLocale: Locale = (e.newValue === 'ar' || e.newValue === 'en') ? e.newValue : 'en';
        setLocaleState(newLocale);
        document.documentElement.lang = newLocale;
        document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem('locale', newLocale);
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';

    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('localechange', { detail: { locale: newLocale } }));
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
    isHydrated,
  }), [locale, setLocale, t, direction, isHydrated]);

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
