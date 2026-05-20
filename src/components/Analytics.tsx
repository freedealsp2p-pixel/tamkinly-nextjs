'use client';

import Script from 'next/script';
import { useEffect, useCallback, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { GA_MEASUREMENT_ID, grantConsent, hasConsent, trackPageView, initScrollDepthTracking } from '@/lib/analytics';

/**
 * Inner component that uses useSearchParams
 */
function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  const handleRouteChange = useCallback(() => {
    if (hasConsent()) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    handleRouteChange();
    // Initialize scroll depth tracking on route change
    initScrollDepthTracking();
  }, [handleRouteChange]);

  // Listen for consent changes
  useEffect(() => {
    const handleConsentChange = (event: CustomEvent) => {
      if (event.detail?.consent === 'accepted') {
        grantConsent();
      }
    };

    window.addEventListener('consent-change', handleConsentChange as EventListener);
    return () => {
      window.removeEventListener('consent-change', handleConsentChange as EventListener);
    };
  }, []);

  // Don't render if no GA ID configured
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  // Don't render scripts until consent is given
  // This is a privacy-first approach
  const consentGiven = hasConsent();

  if (!consentGiven) {
    // Render consent initialization script only
    return (
      <Script
        id="ga-consent-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'wait_for_update': 500
            });
          `,
        }}
      />
    );
  }

  // User has consented - load full GA
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Grant consent since user has accepted
            gtag('consent', 'update', {
              'analytics_storage': 'granted',
              'ad_storage': 'denied'
            });
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Google Analytics 4 Component
 * Only loads analytics scripts after user consent
 * GDPR compliant with privacy-first approach
 */
export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}

/**
 * Hook to track page views manually
 * Use this for SPAs or custom page tracking
 */
function usePageTrackingInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (hasConsent()) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(url);
    }
  }, [pathname, searchParams]);
}

export function usePageTracking() {
  // This hook should be used inside a Suspense boundary
  return usePageTrackingInner();
}

export default Analytics;
