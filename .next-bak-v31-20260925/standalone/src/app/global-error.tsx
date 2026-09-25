'use client';

import { useEffect, useState } from 'react';

function getLocaleFromCookie(): 'en' | 'ar' {
  if (typeof document === 'undefined') return 'en';
  try {
    const match = document.cookie.match(/NEXT_LOCALE=(en|ar)/);
    return (match && match[1] === 'ar') ? 'ar' : 'en';
  } catch {
    return 'en';
  }
}

const TEXTS = {
  en: {
    title: 'Something Went Wrong',
    message: 'A critical error occurred. Please try refreshing the page.',
    tryAgain: 'Try Again',
    goHome: 'Go Home',
  },
  ar: {
    title: 'حدث خطأ ما',
    message: 'حدث خطأ حرج. يرجى محاولة تحديث الصفحة.',
    tryAgain: 'حاول مرة أخرى',
    goHome: 'الرئيسية',
  },
} as const;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    setLocale(getLocaleFromCookie());
    console.error('Global error:', error);
  }, [error]);

  const t = TEXTS[locale];
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: '#F6F8FA',
          }}
        >
          <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0F1C2E', marginBottom: '12px' }}>
              {t.title}
            </h1>
            <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '32px' }}>
              {t.message}
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={reset}
                style={{
                  backgroundColor: '#0F1C2E',
                  color: 'white',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {t.tryAgain}
              </button>
              <a
                href={locale === 'ar' ? '/ar' : '/'}
                style={{
                  backgroundColor: 'transparent',
                  color: '#0F1C2E',
                  border: '1px solid #0F1C2E',
                  padding: '10px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {t.goHome}
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
