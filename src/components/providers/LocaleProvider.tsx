'use client';

import { createContext, useContext, useEffect, ReactNode, useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
  urlBased?: boolean;
}

export function LocaleProvider({ children, initialLocale = 'en', urlBased = false }: LocaleProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Start with the initial locale from URL (server-provided)
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isHydrated, setIsHydrated] = useState(false);

  // Sync locale state when initialLocale changes (e.g., after server-side cookie update)
  useEffect(() => {
    setLocaleState(initialLocale);
    document.documentElement.lang = initialLocale;
    document.documentElement.dir = initialLocale === 'ar' ? 'rtl' : 'ltr';
  }, [initialLocale]);

  // Handle hydration - sync with localStorage after mount (for non-URL based mode)
  useEffect(() => {
    // Use microtask to avoid synchronous setState warning
    const timeoutId = setTimeout(() => {
      // Set initial document attributes based on current locale
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';

      if (urlBased) {
        // For URL-based mode, just mark as hydrated
        setIsHydrated(true);
        return;
      }

      // For non-URL based mode, read from localStorage
      const stored = localStorage.getItem('locale');
      const storedLocale: Locale = (stored === 'ar' || stored === 'en') ? stored : 'en';
      
      setLocaleState(storedLocale);
      setIsHydrated(true);

      // Update document attributes
      document.documentElement.lang = storedLocale;
      document.documentElement.dir = storedLocale === 'ar' ? 'rtl' : 'ltr';
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []); // Only run once on mount

  // Listen for storage changes from other tabs (for non-URL based mode)
  useEffect(() => {
    if (urlBased) return;

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
  }, [urlBased]);

  const setLocale = useCallback((newLocale: Locale) => {
    // Always update localStorage and cookie
    localStorage.setItem('locale', newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${365 * 24 * 60 * 60};samesite=lax`;

    // Update document attributes immediately
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';

    if (urlBased) {
      // For URL-based mode, use simple page reload instead of path navigation
      // This avoids the 'Something Went Wrong' error from invalid /ar routes
      setLocaleState(newLocale);
      // Small delay to ensure cookie is set before reload
      setTimeout(() => window.location.reload(), 50);
    } else {
      // For non-URL based mode, update state immediately
      setLocaleState(newLocale);
      window.dispatchEvent(new CustomEvent('localechange', { detail: { locale: newLocale } }));
    }
  }, [urlBased]);

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
  
  const translate = useCallback((key: string, params?: Record<string, string | number>): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    let result = t(fullKey);
    // Replace {param} placeholders with actual values
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue));
      });
    }
    return result;
  }, [t, namespace]);
  
  return translate;
}
