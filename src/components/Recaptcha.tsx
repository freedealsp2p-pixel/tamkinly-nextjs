'use client';

import { Script } from 'next/script';
import { useCallback, useState } from 'react';

interface RecaptchaProps {
  onVerify: (token: string) => void;
  action?: string;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function Recaptcha({ onVerify, action = 'contact_form' }: RecaptchaProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const executeRecaptcha = useCallback(async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    if (!siteKey) {
      // If no site key is configured, skip reCAPTCHA (for development)
      onVerify('');
      return;
    }

    if (!isLoaded || !window.grecaptcha) {
      onVerify('');
      return;
    }

    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      onVerify(token);
    } catch (error) {
      console.error('reCAPTCHA execution error:', error);
      onVerify('');
    }
  }, [isLoaded, onVerify, action]);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="afterInteractive"
        onLoad={() => setIsLoaded(true)}
      />
      <input type="hidden" name="recaptchaAction" value={action} />
    </>
  );
}

// Re-export verifyRecaptcha from server-side module for backward compatibility
// API routes should import from '@/lib/recaptcha' directly
export { verifyRecaptcha } from '@/lib/recaptcha';
