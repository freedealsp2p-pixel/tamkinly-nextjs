'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ArrowRight, CheckCircle2, Shield, Loader2 } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

const TIER_HIERARCHY: Record<string, number> = {
  FREE: 0, TRIAL: 1, BASIC: 2, PREMIUM: 3, BUNDLE: 4,
};

const APP_TIERS: Record<string, string> = {
  'identity-gap-quiz': 'FREE',
  'values-clarification': 'FREE',
  'daily-reflection': 'FREE',
  'trial-planner': 'TRIAL',
  'executive-manual': 'BASIC',
  'daily-planner': 'BASIC',
  'identity-baseline': 'BASIC',
  'environmental-audit': 'BASIC',
  'decision-analysis': 'PREMIUM',
  'evidence-tracking': 'PREMIUM',
  'progress-dashboard': 'PREMIUM',
  'emotion-regulation': 'BUNDLE',
  'ai-identity-coach': 'BUNDLE',
  'community-access': 'BUNDLE',
  'priority-support': 'BUNDLE',
  'goal-system': 'BASIC',
  'habit-tracker': 'BASIC',
  'journal-system': 'BASIC',
  'worksheets': 'BASIC',
  'identity-recode-system': 'BASIC',
};

// Apps that handle their own access control (show landing page to all visitors)
const SELF_GATED_APPS = new Set(['ai-identity-coach']);

const TIER_PRODUCTS: Record<string, { slug: string; price: number; nameEn: string; nameAr: string }> = {
  TRIAL: { slug: 'trial', price: 7, nameEn: 'Trial Access', nameAr: '\u0648\u0635\u0648\u0644 \u062a\u062c\u0631\u064a\u0628\u064a' },
  BASIC: { slug: 'planner', price: 17, nameEn: 'Basic Package', nameAr: '\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629' },
  PREMIUM: { slug: 'premium', price: 27, nameEn: 'Premium Package', nameAr: '\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u0645\u064a\u0632\u0629' },
  BUNDLE: { slug: 'bundle', price: 47, nameEn: 'Full Bundle', nameAr: '\u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0634\u0627\u0645\u0644\u0629' },
};

const TIER_FEATURES: Record<string, { en: string[]; ar: string[] }> = {
  TRIAL: {
    en: ['7-day identity planner trial', 'Basic self-assessment', 'Community preview access'],
    ar: ['\u062a\u062c\u0631\u0628\u0629 \u0645\u062e\u0637\u0637 \u0627\u0644\u0647\u0648\u064a\u0629 \u0644\u0645\u062f\u0629 7 \u0623\u064a\u0627\u0645', '\u0627\u0644\u062a\u0642\u064a\u064a\u0645 \u0627\u0644\u0630\u0627\u062a\u064a \u0627\u0644\u0623\u0633\u0627\u0633\u064a', '\u0645\u0639\u0627\u064a\u0646\u0629 \u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0645\u062c\u062a\u0645\u0639'],
  },
  BASIC: {
    en: ['30-day identity planner', 'Identity baseline assessment', 'Environment audit tool', 'Habit tracker & goal system'],
    ar: ['\u0645\u062e\u0637\u0637 \u0627\u0644\u0647\u0648\u064a\u0629 \u0644\u0640 30 \u064a\u0648\u0645\u0627\u064b', '\u062a\u0642\u064a\u064a\u0645 \u062e\u0637 \u0623\u0633\u0627\u0633 \u0627\u0644\u0647\u0648\u064a\u0629', '\u0623\u062f\u0627\u0629 \u062a\u062f\u0642\u064a\u0642 \u0627\u0644\u0628\u064a\u0626\u0629', '\u0645\u062a\u062a\u0628\u0639 \u0627\u0644\u0639\u0627\u062f\u0627\u062a \u0648\u0646\u0638\u0627\u0645 \u0627\u0644\u0623\u0647\u062f\u0627\u0641'],
  },
  PREMIUM: {
    en: ['Everything in Basic', 'Decision pattern analysis', 'Evidence tracking system', 'Progress dashboard'],
    ar: ['\u0643\u0644 \u0645\u0627 \u0641\u064a \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629', '\u062a\u062d\u0644\u064a\u0644 \u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0642\u0631\u0627\u0631', '\u0646\u0638\u0627\u0645 \u062a\u062a\u0628\u0639 \u0627\u0644\u0623\u062f\u0644\u0629', '\u0644\u0648\u062d\u0629 \u062a\u062a\u0628\u0639 \u0627\u0644\u062a\u0642\u062f\u0645'],
  },
  BUNDLE: {
    en: ['Everything in Premium', 'AI Identity Coach', 'Emotion regulation toolkit', 'Community access', 'Priority support'],
    ar: ['\u0643\u0644 \u0645\u0627 \u0641\u064a \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0645\u0645\u064a\u0632\u0629', '\u0645\u062f\u0631\u0628 \u0627\u0644\u0647\u0648\u064a\u0629 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a', '\u0623\u062f\u0648\u0627\u062a \u062a\u0646\u0638\u064a\u0645 \u0627\u0644\u0645\u0634\u0627\u0639\u0631', '\u0627\u0644\u0648\u0635\u0648\u0644 \u0644\u0644\u0645\u062c\u062a\u0645\u0639', '\u0627\u0644\u062f\u0639\u0645 \u0630\u0648 \u0627\u0644\u0623\u0648\u0644\u0648\u064a\u0629'],
  },
};

export function AppAccessGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  
  const [accessCode, setAccessCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  
  const appSlug = pathname?.split('/apps/')[1]?.split('/')[0] || '';
  const requiredTier = APP_TIERS[appSlug] || 'FREE';
  const requiredTierLevel = TIER_HIERARCHY[requiredTier] || 0;
  
  // Check access on mount
  useEffect(() => {
    if (requiredTier === 'FREE' || !appSlug) {
      setHasAccess(true);
      setIsChecking(false);
      return;
    }
    
    // Self-gated apps handle their own access control
    if (SELF_GATED_APPS.has(appSlug)) {
      setHasAccess(true);
      setIsChecking(false);
      return;
    }
    
    try {
      const storedAccess = localStorage.getItem('tamkinly_access');
      if (storedAccess) {
        const access = JSON.parse(storedAccess);
        const storedTierLevel = TIER_HIERARCHY[access.tier] || 0;
        if (storedTierLevel >= requiredTierLevel) {
          setHasAccess(true);
          setIsChecking(false);
          return;
        }
      }
      
      fetch('/api/auth/me').then(res => res.json()).then(data => {
        if (data?.user?.accessTier) {
          const userTierLevel = TIER_HIERARCHY[data.user.accessTier] || 0;
          if (userTierLevel >= requiredTierLevel) {
            setHasAccess(true);
          }
        }
      }).catch(() => {}).finally(() => {
        setIsChecking(false);
      });
    } catch {
      setIsChecking(false);
    }
  }, [appSlug, requiredTier, requiredTierLevel]);
  
  if (requiredTier === 'FREE' || !appSlug || SELF_GATED_APPS.has(appSlug)) {
    return <>{children}</>;
  }
  
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#3DD4B0] animate-spin" />
      </div>
    );
  }
  
  if (hasAccess) {
    return <>{children}</>;
  }
  
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
        localStorage.setItem('tamkinly_access', JSON.stringify({
          tier: data.tier || 'BASIC',
          code: accessCode.trim(),
          verifiedAt: new Date().toISOString(),
        }));
        setHasAccess(true);
      } else {
        setCodeError(data.error || getText('Invalid access code', '\u0631\u0645\u0632 \u0627\u0644\u0648\u0635\u0648\u0644 \u063a\u064a\u0631 \u0635\u0627\u0644\u062d'));
      }
    } catch {
      setCodeError(getText('Verification failed. Please try again.', '\u0641\u0634\u0644 \u0627\u0644\u062a\u062d\u0642\u0642. \u064a\u0631\u062c\u0649 \u0627\u0644\u0645\u062d\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062e\u0631\u0649.'));
    } finally {
      setVerifying(false);
    }
  };
  
  const tierProduct = TIER_PRODUCTS[requiredTier];
  const features = TIER_FEATURES[requiredTier];
  
  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Card className="border-2 border-[#3DD4B0]/30 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#3DD4B0]" />
            </div>
            <CardTitle className="text-2xl">{getText('Access Required', '\u0627\u0644\u0648\u0635\u0648\u0644 \u0645\u0637\u0644\u0648\u0628')}</CardTitle>
            <CardDescription className="text-base">
              {getText(
                'This app requires the ' + requiredTier + ' package or higher',
                '\u064a\u062a\u0637\u0644\u0628 \u0647\u0630\u0627 \u0627\u0644\u062a\u0637\u0628\u064a\u0642 \u0628\u0627\u0642\u0629 ' + requiredTier + ' \u0623\u0648 \u0623\u0639\u0644\u0649'
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {features && (
              <div className="space-y-2 mb-4">
                {features[locale === 'ar' ? 'ar' : 'en'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-[#0F1C2E] mb-2 block">
                {getText('Have an access code?', '\u0644\u062f\u064a\u0643 \u0631\u0645\u0632 \u0648\u0635\u0648\u0644\u061f')}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  placeholder="TMLY-XXXX-XXXX"
                  className="flex-1 px-4 py-2 border border-[#1F6F78]/20 rounded-lg focus:border-[#3DD4B0] focus:outline-none font-mono"
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyCode()}
                />
                <Button 
                  onClick={handleVerifyCode}
                  disabled={verifying || !accessCode.trim()}
                  className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]"
                >
                  {verifying ? '...' : getText('Verify', '\u062a\u062d\u0642\u0642')}
                </Button>
              </div>
              {codeError && <p className="text-sm text-[#FC6D26] mt-1">{codeError}</p>}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-[#8A94A6] mb-3">{getText('Or get access now:', '\u0623\u0648 \u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0622\u0646:')}</p>
              {tierProduct && (
                <Link href={'/products/' + tierProduct.slug}>
                  <Button className="w-full h-14 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold text-lg">
                    {getText(
                      'Get ' + tierProduct.nameEn + ' - $' + tierProduct.price,
                      '\u0627\u062d\u0635\u0644 \u0639\u0644\u0649 ' + tierProduct.nameAr + ' - $' + tierProduct.price
                    )}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
            
            <div className="flex items-center justify-center gap-4 text-sm text-[#8A94A6]">
              <div className="flex items-center gap-1"><Shield className="w-4 h-4 text-[#3DD4B0]" /><span>{getText('Secure', '\u0622\u0645\u0646')}</span></div>
              <div className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-[#3DD4B0]" /><span>{getText('Instant Access', '\u0648\u0635\u0648\u0644 \u0641\u0648\u0631\u064a')}</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
