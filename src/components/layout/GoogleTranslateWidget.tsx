'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, Check } from 'lucide-react';

// Extend Window interface for Google Translate
declare global {
  interface Window {
    google?: {
      translate: {
        TranslateElement: new (config: {
          pageLanguage: string;
          includedLanguages?: string;
          layout?: unknown;
          autoDisplay?: boolean;
        }, element?: string | HTMLElement | null) => void;
        TranslateElementInterface?: {
          InlineLayout?: {
            SIMPLE: unknown;
          };
        };
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'zh-CN', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

// Get initial translation state from URL hash
function getInitialTranslationState(): { lang: string; isTranslated: boolean } {
  if (typeof window === 'undefined') return { lang: 'en', isTranslated: false };
  
  const hash = window.location.hash;
  if (hash.includes('googtrans')) {
    const match = hash.match(/googtrans\/(\/en)?\/(\w+)/);
    if (match && match[2]) {
      return { lang: match[2], isTranslated: true };
    }
  }
  return { lang: 'en', isTranslated: false };
}

/**
 * Google Translate Widget Component
 * Provides full page translation using Google Translate API
 */
export function GoogleTranslateWidget() {
  // Use lazy initializer for translation state
  const initialState = useMemo(() => getInitialTranslationState(), []);
  const [currentLang, setCurrentLang] = useState(initialState.lang);
  const [isTranslated, setIsTranslated] = useState(initialState.isTranslated);

  // Load Google Translate script
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);

      window.googleTranslateElementInit = () => {
        if (window.google?.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: languages.map(l => l.code).join(','),
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      };
    }
  }, []);

  const resetTranslation = useCallback(() => {
    window.location.href = window.location.pathname;
  }, []);

  const translateTo = useCallback((langCode: string) => {
    if (langCode === 'en') {
      resetTranslation();
      return;
    }

    // Set translation using Google Translate
    const googleTranslateElement = document.getElementById('google_translate_element');
    if (googleTranslateElement) {
      const select = googleTranslateElement.querySelector('select') as HTMLSelectElement | null;
      if (select) {
        select.value = '/en/' + langCode;
        select.dispatchEvent(new Event('change'));
      }
    }

    setCurrentLang(langCode);
    setIsTranslated(true);
  }, [resetTranslation]);

  const currentLanguage = useMemo(() => 
    languages.find(l => l.code === currentLang), [currentLang]
  );

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden" aria-hidden="true"></div>
      
      {/* Custom Language Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`gap-1.5 text-sm ${isTranslated ? 'text-accent' : 'text-slate-600'} hover:text-primary`}
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
              {isTranslated ? currentLanguage?.nativeName : 'Translate'}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 max-h-80 overflow-y-auto">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => translateTo(lang.code)}
              className={`flex items-center justify-between ${currentLang === lang.code ? 'bg-accent/10' : ''}`}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">{lang.nativeName}</span>
                <span className="text-xs text-slate-400">{lang.name}</span>
              </span>
              {currentLang === lang.code && (
                <Check className="h-4 w-4 text-accent" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
