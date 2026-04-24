'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';
import { grantConsent, revokeConsent, shouldShowConsentBanner } from '@/lib/analytics';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

/**
 * GDPR Compliant Cookie Consent Banner
 * - Shows only if user hasn't made a choice
 * - Stores consent preference in localStorage
 * - Allows user to change preference later
 * - Privacy-first approach: cookies only set after consent
 */
export function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if we should show the banner
    const showBanner = shouldShowConsentBanner();
    
    // Delay showing for better UX (don't show immediately on page load)
    if (showBanner) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = useCallback(() => {
    grantConsent();
    
    // Dispatch custom event for Analytics component to pick up
    window.dispatchEvent(new CustomEvent('consent-change', {
      detail: { consent: 'accepted' }
    }));
    
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
    
    onAccept?.();
  }, [onAccept]);

  const handleDecline = useCallback(() => {
    revokeConsent();
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('consent-change', {
      detail: { consent: 'declined' }
    }));
    
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
    
    onDecline?.();
  }, [onDecline]);

  const handleClose = useCallback(() => {
    // User closed without making a choice - treat as declined for GDPR compliance
    revokeConsent();
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-auto max-w-3xl">
        <div className="bg-[#0F1C2E] text-white rounded-xl shadow-2xl p-4 sm:p-6 border border-slate-700">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close cookie consent"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 hidden sm:block">
              <div className="w-12 h-12 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-[#3DD4B0]" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pr-8">
              <h3 className="text-lg font-semibold mb-2">
                We value your privacy
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We use cookies to analyze site traffic and improve your experience. 
                By clicking &quot;Accept&quot;, you consent to our use of analytics cookies. 
                You can decline non-essential cookies while still enjoying full access 
                to our content and features.{' '}
                <a
                  href="/privacy"
                  className="text-[#3DD4B0] hover:underline focus:outline-none focus:ring-2 focus:ring-[#3DD4B0] rounded"
                >
                  Learn more in our Privacy Policy
                </a>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="border-slate-500 text-white hover:bg-white/10 hover:text-white"
              >
                Decline
              </Button>
              <Button
                variant="accent"
                size="sm"
                onClick={handleAccept}
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
              >
                Accept Cookies
              </Button>
            </div>
          </div>

          {/* Additional info for transparency */}
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <p className="text-xs text-slate-400">
              <strong>What we track:</strong> Page views, feature usage, and conversions 
              to improve our products. We never sell your data or use it for targeted advertising.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to manage cookie consent state
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<'accepted' | 'declined' | null>(() => {
    // Initialize from localStorage synchronously (only runs on client)
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('cookie-consent');
    if (stored === 'accepted') return 'accepted';
    if (stored === 'declined') return 'declined';
    return null;
  });

  const accept = useCallback(() => {
    grantConsent();
    setConsent('accepted');
    window.dispatchEvent(new CustomEvent('consent-change', {
      detail: { consent: 'accepted' }
    }));
  }, []);

  const decline = useCallback(() => {
    revokeConsent();
    setConsent('declined');
    window.dispatchEvent(new CustomEvent('consent-change', {
      detail: { consent: 'declined' }
    }));
  }, []);

  return {
    consent,
    accept,
    decline,
    hasConsent: consent === 'accepted',
  };
}

export default CookieConsent;
