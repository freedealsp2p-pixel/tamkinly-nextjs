'use client';

import { createContext, useContext, useEffect, ReactNode, useCallback, useMemo, useSyncExternalStore } from 'react';
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

// Subscribe to storage events (for cross-tab sync)
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

// Get stored locale from localStorage
function getStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('locale');
  return (stored === 'ar' || stored === 'en') ? stored : 'en';
}

// Server snapshot (always returns 'en' for SSR)
function getServerSnapshot(): Locale {
  return 'en';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Use useSyncExternalStore for localStorage sync (handles SSR hydration correctly)
  const storedLocale = useSyncExternalStore(subscribe, getStoredLocale, getServerSnapshot);
  
  // Update document attributes when locale changes
  useEffect(() => {
    document.documentElement.lang = storedLocale;
    document.documentElement.dir = storedLocale === 'ar' ? 'rtl' : 'ltr';
  }, [storedLocale]);
  
  const setLocale = useCallback((newLocale: Locale) => {
    localStorage.setItem('locale', newLocale);
    // Dispatch storage event to trigger re-render
    window.dispatchEvent(new StorageEvent('storage', { key: 'locale', newValue: newLocale }));
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
  }, []);
  
  const t = useCallback((key: string): string => {
    return getNestedValue(messages[storedLocale] as unknown as Record<string, unknown>, key);
  }, [storedLocale]);
  
  const direction = useMemo((): 'ltr' | 'rtl' => storedLocale === 'ar' ? 'rtl' : 'ltr', [storedLocale]);
  
  const contextValue = useMemo(() => ({
    locale: storedLocale,
    setLocale,
    t,
    direction,
  }), [storedLocale, setLocale, t, direction]);
  
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
