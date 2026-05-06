'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/components/providers/LocaleProvider';

/**
 * Promo Banner Component with Lazy Loading
 * Delays appearance by 3 seconds to improve initial page load experience
 * Respects user's choice to dismiss
 */
export function PromoBanner() {
  // Initialize with false, will be updated after mount
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations();

  // Show banner after delay if not dismissed
  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem('promo-banner-dismissed');
    if (dismissed === 'true') {
      return;
    }

    // Delay banner appearance by 3 seconds for better UX
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    localStorage.setItem('promo-banner-dismissed', 'true');
  }, []);

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 start-4 end-4 md:start-auto md:end-4 md:w-80 z-[90] animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] text-white p-4 rounded-xl shadow-2xl border border-[#3DD4B0]/20 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-2 end-2 text-white/60 hover:text-white transition-colors"
          aria-label={t('common.dismiss')}
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex items-start gap-3 pe-6">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-[#3DD4B0]" />
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1">
              {t('common.saveBundle')}
            </h4>
            <p className="text-xs text-slate-300 mb-3">
              {t('common.promoDescription')}
            </p>
            <Link href="/products">
              <Button
                size="sm"
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] w-full"
              >
                {t('common.viewBundle')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
