/**
 * Google Analytics 4 Integration - Type-Safe Event Tracking
 * Privacy-first approach with GDPR compliance
 */

// GA Measurement ID from environment
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Window interface extension for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Check if GA is available and consent given
const isGAAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for consent
  const consent = localStorage.getItem('cookie-consent');
  if (consent !== 'accepted') return false;
  
  // Check if gtag is loaded
  return typeof window.gtag === 'function';
};

// Event categories for organization
export type EventCategory =
  | 'engagement'
  | 'conversion'
  | 'app_usage'
  | 'navigation'
  | 'authentication'
  | 'error';

// Standard event names following GA4 conventions
export type EventName =
  // Page & Navigation
  | 'page_view'
  | 'scroll'
  | 'click'
  // Quiz & Worksheets
  | 'quiz_start'
  | 'quiz_complete'
  | 'worksheet_start'
  | 'worksheet_complete'
  // Products & Purchases
  | 'purchase'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'view_item'
  | 'view_item_list'
  // App Usage
  | 'habit_check_in'
  | 'journal_entry'
  | 'goal_created'
  | 'goal_completed'
  | 'mood_logged'
  | 'reflection_saved'
  // CTA & Engagement
  | 'cta_click'
  | 'newsletter_signup'
  | 'download'
  | 'share'
  // Authentication
  | 'sign_up'
  | 'login'
  | 'logout'
  // Errors
  | 'error';

// Event parameters interface
export interface EventParams {
  // Common parameters
  page_title?: string;
  page_location?: string;
  page_path?: string;
  
  // Content parameters
  content_type?: string;
  content_id?: string;
  content_name?: string;
  
  // Quiz/Worksheet parameters
  quiz_name?: string;
  worksheet_name?: string;
  score?: number;
  total_questions?: number;
  time_spent?: number;
  
  // Product parameters
  item_id?: string;
  item_name?: string;
  item_category?: string;
  price?: number;
  quantity?: number;
  currency?: string;
  value?: number;
  transaction_id?: string;
  
  // App usage parameters
  habit_name?: string;
  streak_days?: number;
  entry_type?: string;
  mood_score?: number;
  
  // CTA parameters
  cta_name?: string;
  cta_location?: string;
  button_text?: string;
  
  // Error parameters
  error_type?: string;
  error_message?: string;
  
  // Custom parameters
  [key: string]: string | number | boolean | undefined;
}

// Purchase event specific parameters
export interface PurchaseEventParams {
  transaction_id: string;
  value: number;
  currency: string;
  items: Array<{
    item_id: string;
    item_name: string;
    item_category?: string;
    price: number;
    quantity: number;
  }>;
  coupon?: string;
  shipping?: number;
  tax?: number;
}

/**
 * Initialize gtag with consent mode (GDPR compliant)
 */
export const initializeGA = (): void => {
  if (typeof window === 'undefined') return;
  if (!GA_MEASUREMENT_ID) {
    console.warn('GA Measurement ID not configured');
    return;
  }

  // Set default consent to denied (GDPR requirement)
  window.gtag?.('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    wait_for_update: 500,
  });
};

/**
 * Update consent when user accepts cookies
 */
export const grantConsent = (): void => {
  if (typeof window === 'undefined') return;
  
  window.gtag?.('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'denied', // Keep ad storage denied for privacy
  });
  
  // Store consent in localStorage
  localStorage.setItem('cookie-consent', 'accepted');
  localStorage.setItem('cookie-consent-date', new Date().toISOString());
};

/**
 * Revoke consent when user declines or withdraws
 */
export const revokeConsent = (): void => {
  if (typeof window === 'undefined') return;
  
  window.gtag?.('consent', 'update', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
  });
  
  localStorage.setItem('cookie-consent', 'declined');
  localStorage.setItem('cookie-consent-date', new Date().toISOString());
};

/**
 * Check if user has given consent
 */
export const hasConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie-consent') === 'accepted';
};

/**
 * Check if consent banner should be shown
 */
export const shouldShowConsentBanner = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie-consent') === null;
};

/**
 * Track a custom event with type-safe parameters
 */
export const trackEvent = (
  eventName: EventName,
  params?: EventParams
): void => {
  if (!isGAAvailable()) {
    console.debug('GA not available or consent not given, skipping event:', eventName);
    return;
  }

  try {
    window.gtag?.('event', eventName, {
      ...params,
      // Add timestamp for debugging
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

/**
 * Track page view - call on route changes
 */
export const trackPageView = (url: string, title?: string): void => {
  if (!isGAAvailable()) return;

  trackEvent('page_view', {
    page_path: url,
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : undefined,
  });
};

/**
 * Track quiz completion
 */
export const trackQuizCompletion = (
  quizName: string,
  score: number,
  totalQuestions: number,
  timeSpentSeconds?: number
): void => {
  trackEvent('quiz_complete', {
    quiz_name: quizName,
    score,
    total_questions: totalQuestions,
    time_spent: timeSpentSeconds,
    content_type: 'quiz',
  });
};

/**
 * Track product purchase
 */
export const trackPurchase = (params: PurchaseEventParams): void => {
  trackEvent('purchase', {
    transaction_id: params.transaction_id,
    value: params.value,
    currency: params.currency,
    items: params.items,
    coupon: params.coupon,
    shipping: params.shipping,
    tax: params.tax,
  });
};

/**
 * Track add to cart
 */
export const trackAddToCart = (
  itemId: string,
  itemName: string,
  price: number,
  quantity: number = 1,
  category?: string
): void => {
  trackEvent('add_to_cart', {
    item_id: itemId,
    item_name: itemName,
    price,
    quantity,
    item_category: category,
    currency: 'USD',
  });
};

/**
 * Track habit check-in
 */
export const trackHabitCheckIn = (
  habitName: string,
  streakDays?: number
): void => {
  trackEvent('habit_check_in', {
    habit_name: habitName,
    streak_days: streakDays,
    content_type: 'habit',
  });
};

/**
 * Track journal entry
 */
export const trackJournalEntry = (entryType: string): void => {
  trackEvent('journal_entry', {
    entry_type: entryType,
    content_type: 'journal',
  });
};

/**
 * Track goal creation
 */
export const trackGoalCreated = (goalName: string): void => {
  trackEvent('goal_created', {
    content_name: goalName,
    content_type: 'goal',
  });
};

/**
 * Track goal completion
 */
export const trackGoalCompleted = (goalName: string): void => {
  trackEvent('goal_completed', {
    content_name: goalName,
    content_type: 'goal',
  });
};

/**
 * Track mood logged
 */
export const trackMoodLogged = (moodScore: number): void => {
  trackEvent('mood_logged', {
    mood_score: moodScore,
    content_type: 'mood',
  });
};

/**
 * Track CTA click
 */
export const trackCTAClick = (
  ctaName: string,
  ctaLocation: string,
  buttonText?: string
): void => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    button_text: buttonText,
  });
};

/**
 * Track newsletter signup
 */
export const trackNewsletterSignup = (source: string): void => {
  trackEvent('newsletter_signup', {
    content_type: 'newsletter',
    content_name: source,
  });
};

/**
 * Track authentication events
 */
export const trackAuth = (
  action: 'sign_up' | 'login' | 'logout',
  method: string = 'credentials'
): void => {
  trackEvent(action, {
    method,
  });
};

/**
 * Track error events
 */
export const trackError = (
  errorType: string,
  errorMessage: string
): void => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
  });
};

/**
 * Track worksheet start
 */
export const trackWorksheetStart = (worksheetName: string): void => {
  trackEvent('worksheet_start', {
    worksheet_name: worksheetName,
    content_type: 'worksheet',
  });
};

/**
 * Track worksheet completion
 */
export const trackWorksheetCompletion = (
  worksheetName: string,
  timeSpentSeconds?: number
): void => {
  trackEvent('worksheet_complete', {
    worksheet_name: worksheetName,
    time_spent: timeSpentSeconds,
    content_type: 'worksheet',
  });
};

/**
 * Track share event
 */
export const trackShare = (
  contentType: string,
  contentId: string,
  method: string
): void => {
  trackEvent('share', {
    content_type: contentType,
    content_id: contentId,
    method,
  });
};

/**
 * Track download event
 */
export const trackDownload = (
  fileName: string,
  fileType: string
): void => {
  trackEvent('download', {
    content_name: fileName,
    content_type: fileType,
  });
};

// Scroll depth tracking
export const initScrollDepthTracking = (): void => {
  if (typeof window === 'undefined') return;
  
  const thresholds = [25, 50, 75, 90];
  const tracked = new Set<number>();
  
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
    
    thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackEvent('scroll', {
          percent_scrolled: threshold,
          page_path: window.location.pathname,
        });
      }
    });
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
};

// Export all tracking functions as a single object for convenience
export const analytics = {
  initialize: initializeGA,
  grantConsent,
  revokeConsent,
  hasConsent,
  shouldShowConsentBanner,
  trackEvent,
  trackPageView,
  trackQuizCompletion,
  trackPurchase,
  trackAddToCart,
  trackHabitCheckIn,
  trackJournalEntry,
  trackGoalCreated,
  trackGoalCompleted,
  trackMoodLogged,
  trackCTAClick,
  trackNewsletterSignup,
  trackAuth,
  trackError,
  trackWorksheetStart,
  trackWorksheetCompletion,
  trackShare,
  trackDownload,
};

export default analytics;
