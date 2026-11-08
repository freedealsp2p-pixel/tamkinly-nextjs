'use client';

import Script from 'next/script';
import { useEffect, useCallback, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  GA_MEASUREMENT_ID,
  GOOGLE_TAG_ID,
  CONTENTSQUARE_ID,
  HOTJAR_ID,
  grantConsent,
  hasConsent,
  trackPageView,
  initScrollDepthTracking,
} from '@/lib/analytics';

/**
 * Google Analytics 4 + GT + Contentsquare + Hotjar Component
 * Only loads analytics scripts after user consent (GDPR compliant)
 * Privacy-first approach
 */

/**
 * P2 hardening (AUD-1, 2026-11-08): defer heavy UX analytics — Contentsquare
 * and Hotjar — until the first user interaction (pointerdown / keydown /
 * touchstart / scroll / wheel) or an 8-second idle fallback, whichever comes
 * first. The consent gate above still applies first; this only postpones the
 * network load so hydration and INP stay clean. Real-user tracking unaffected.
 */
function useAfterFirstInteraction(): boolean {
  const [interacted, setInteracted] = useState(false);
  useEffect(() => {
    if (interacted) return;
    const EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'];
    let timer = 0;
    const onFirst = () => {
      EVENTS.forEach((e) => window.removeEventListener(e, onFirst, { capture: true }));
      clearTimeout(timer);
      setInteracted(true);
    };
    EVENTS.forEach((e) => window.addEventListener(e, onFirst, { capture: true, passive: true }));
    timer = window.setTimeout(onFirst, 8000);
    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, onFirst, { capture: true }));
      clearTimeout(timer);
    };
  }, [interacted]);
  return interacted;
}

function AnalyticsInner() {
  const interacted = useAfterFirstInteraction();
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

  // If no GA ID configured, don't render anything
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  const consentGiven = hasConsent();

  // Before consent: only set default consent mode (GDPR requirement)
  if (!consentGiven) {
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

  // After consent: GA4 + GT load immediately; Contentsquare + Hotjar
  // additionally wait for first user interaction (P2 hardening, 2026-11-08)
  const gtagLoaderId = GOOGLE_TAG_ID || GA_MEASUREMENT_ID;

  return (
    <>
      {/* ===== Google Analytics 4 + Google Tag ===== */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagLoaderId}`}
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

            // Configure GA4 measurement
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });

            // Configure Google Tag (GT-xxxxx) if available
            ${GOOGLE_TAG_ID ? `gtag('config', '${GOOGLE_TAG_ID}');` : ''}
          `,
        }}
      />

      {/* ===== Contentsquare UX Analytics ===== */}
      {interacted && CONTENTSQUARE_ID && (
        <Script
          id="contentsquare-init"
          strategy="afterInteractive"
          src={`https://t.contentsquare.net/uxa/${CONTENTSQUARE_ID}.js`}
        />
      )}

      {/* ===== Hotjar Heatmaps & Recordings ===== */}
      {interacted && HOTJAR_ID && (
        <Script
          id="hotjar-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:'${HOTJAR_ID}',hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      )}
    </>
  );
}

/**
 * Main Analytics Component with Suspense boundary
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
  return usePageTrackingInner();
}

export default Analytics;
