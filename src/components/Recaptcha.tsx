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
      console.warn('reCAPTCHA site key not configured, skipping verification');
      onVerify('');
      return;
    }

    if (!isLoaded || !window.grecaptcha) {
      console.warn('reCAPTCHA not loaded yet');
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
      {/* Hidden field to trigger reCAPTCHA on form submit */}
      <input type="hidden" name="recaptchaAction" value={action} />
      {/* This component doesn't render anything visible */}
      {/* The parent form should call executeRecaptcha before submission */}
    </>
  );
}

// Server-side reCAPTCHA verification helper
export async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey || !token) {
    // If no secret key or token, skip verification (for development)
    console.warn('reCAPTCHA secret key not configured or no token provided, skipping verification');
    return { success: true, score: 1.0 };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    
    return {
      success: data.success === true,
      score: data.score ?? 0,
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, score: 0 };
  }
}
