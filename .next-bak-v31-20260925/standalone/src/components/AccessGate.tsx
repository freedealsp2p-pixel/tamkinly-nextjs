'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

// Access tier hierarchy
const TIER_HIERARCHY = {
  FREE: 0,
  BASIC: 1,
  PREMIUM: 2,
  MASTERY: 3,
};

// Map app slugs to required tiers
const APP_TIERS: Record<string, string> = {
  'identity-gap-quiz': 'FREE',
  'values-clarification': 'FREE',
  'daily-reflection': 'FREE',
  'trial-planner': 'FREE',
  'executive-manual': 'BASIC',
  'daily-planner': 'BASIC',
  'identity-baseline': 'BASIC',
  'environmental-audit': 'BASIC',
  'decision-analysis': 'PREMIUM',
  'evidence-tracking': 'PREMIUM',
  'progress-dashboard': 'PREMIUM',
  'emotion-regulation': 'MASTERY',
  'ai-identity-coach': 'MASTERY',
  'community-access': 'MASTERY',
  'priority-support': 'MASTERY',
  'goal-system': 'BASIC',
  'habit-tracker': 'BASIC',
  'journal-system': 'BASIC',
  'worksheets': 'BASIC',
  'identity-recode-system': 'BASIC',
};

// Products that grant each tier
const TIER_PRODUCTS: Record<string, { slug: string; price: number }> = {
  BASIC: { slug: 'basic', price: 7 },
  PREMIUM: { slug: 'premium', price: 17 },
  MASTERY: { slug: 'mastery', price: 27 },
};

interface AccessGateProps {
  appSlug: string;
  children: React.ReactNode;
}

export function AccessGate({ appSlug, children }: AccessGateProps) {
  const { data: session, status } = useSession();
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const [accessCode, setAccessCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [codeError, setCodeError] = useState('');
  
  const requiredTier = APP_TIERS[appSlug] || 'FREE';
  const requiredTierLevel = TIER_HIERARCHY[requiredTier] || 0;
  
  // If app is free, no gate needed
  if (requiredTier === 'FREE') {
    return <>{children}</>;
  }
  
  // While session is loading, show content (avoid flash of gate)
  if (status === 'loading') {
    return <>{children}</>;
  }
  
  // Check if user has sufficient access
  const userTier = (session?.user as any)?.accessTier || 'FREE';
  const userTierLevel = TIER_HIERARCHY[userTier] || 0;
  
  if (userTierLevel >= requiredTierLevel) {
    return <>{children}</>;
  }
  
  // Check localStorage for verified access codes
  if (typeof window !== 'undefined') {
    try {
      const storedAccess = localStorage.getItem('tamkinly_access');
      if (storedAccess) {
        const access = JSON.parse(storedAccess);
        const storedTierLevel = TIER_HIERARCHY[access.tier] || 0;
        if (storedTierLevel >= requiredTierLevel) {
          return <>{children}</>;
        }
      }
    } catch {}
  }
  
  // Show access gate
  const handleVerifyCode = async () => {
    if (!accessCode.trim()) return;
    setVerifying(true);
    setCodeError('');
    
    try {
      const response = await fetch('/api/access/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode.trim() }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.valid) {
        // Store access in localStorage
        localStorage.setItem('tamkinly_access', JSON.stringify({
          tier: data.tier || 'BASIC',
          code: accessCode.trim(),
          verifiedAt: new Date().toISOString(),
        }));
        // Reload to re-render with new access
        window.location.reload();
      } else {
        setCodeError(data.error || getText('Invalid access code', 'رمز الوصول غير صالح'));
      }
    } catch (err) {
      setCodeError(getText('Verification failed. Please try again.', 'فشل التحقق. يرجى المحاولة مرة أخرى.'));
    } finally {
      setVerifying(false);
    }
  };
  
  const tierProduct = TIER_PRODUCTS[requiredTier];
  
  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Card className="border-2 border-[#3DD4B0]/30 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#3DD4B0]" />
            </div>
            <CardTitle className="text-2xl">{getText('Access Required', 'الوصول مطلوب')}</CardTitle>
            <CardDescription className="text-base">
              {getText(
                `This app requires the ${requiredTier} package or higher`,
                `يتطلب هذا التطبيق باقة ${requiredTier} أو أعلى`
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Access Code Input */}
            <div>
              <label className="text-sm font-medium text-[#0F1C2E] mb-2 block">
                {getText('Have an access code?', 'لديك رمز وصول؟')}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  placeholder="TMLY-XXXX-XXXX"
                  className="flex-1 px-4 py-2 border border-[#1F6F78]/20 rounded-lg focus:border-[#3DD4B0] focus:outline-none font-mono"
                />
                <Button 
                  onClick={handleVerifyCode}
                  disabled={verifying || !accessCode.trim()}
                  className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]"
                >
                  {verifying ? '...' : getText('Verify', 'تحقق')}
                </Button>
              </div>
              {codeError && <p className="text-sm text-[#FC6D26] mt-1">{codeError}</p>}
            </div>
            
            {/* Or Purchase */}
            <div className="text-center">
              <p className="text-sm text-[#8A94A6] mb-3">{getText('Or get access now:', 'أو احصل على الوصول الآن:')}</p>
              {tierProduct && (
                <Link href={`/products/${tierProduct.slug}`}>
                  <Button className="w-full h-14 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold text-lg">
                    {getText(`Get ${requiredTier} Access - $${tierProduct.price}`, `احصل على وصول ${requiredTier} - $${tierProduct.price}`)}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Trust */}
            <div className="flex items-center justify-center gap-4 text-sm text-[#8A94A6]">
              <div className="flex items-center gap-1"><Shield className="w-4 h-4 text-[#3DD4B0]" /><span>{getText('Secure', 'آمن')}</span></div>
              <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-[#3DD4B0]" /><span>{getText('Instant Access', 'وصول فوري')}</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

