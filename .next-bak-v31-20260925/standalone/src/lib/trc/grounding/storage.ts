"use client";

const STORAGE_KEY = 'trc-grounding-locale';
type Locale = 'en' | 'ar';

export function saveLocale(locale: Locale): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // localStorage unavailable
  }
}

export function loadLocale(): Locale | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'ar') return saved;
  } catch {
    // localStorage unavailable
  }
  return null;
}
