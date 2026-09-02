'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Lock, ArrowRight, CheckCircle2, Shield, Loader2, Key, Mail, Eye, X } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

const TIER_HIERARCHY: Record<string, number> = {
  FREE: 0, BASIC: 1, PREMIUM: 2, MASTERY: 3,
};

const APP_TIERS: Record<string, string> = {
  // FREE — Lead magnet apps
  'identity-gap-quiz': 'FREE',
  'values-clarification': 'FREE',
  'daily-reflection': 'FREE',
  'habit-tracker': 'FREE',
  // BASIC — 7-day discipline journey (was BASIC)
  'trial-planner': 'BASIC',
  // PREMIUM — 30-day journey + core apps (was BASIC)
  'executive-manual': 'PREMIUM',
  'daily-planner': 'PREMIUM',
  'identity-baseline': 'PREMIUM',
  'environmental-audit': 'PREMIUM',
  'goal-system': 'PREMIUM',
  'journal-system': 'PREMIUM',
  'worksheets': 'PREMIUM',
  'identity-recode-system': 'PREMIUM',
  'decision-analysis': 'PREMIUM',
  'evidence-tracking': 'PREMIUM',
  'progress-dashboard': 'PREMIUM',
  // MASTERY — Everything + AI Coach + Community (was MASTERY)
  'emotion-regulation': 'MASTERY',
  'ai-identity-coach': 'MASTERY',
  'community-access': 'MASTERY',
  'priority-support': 'MASTERY',
};

const SELF_GATED_APPS = new Set(['ai-identity-coach', 'therapeutic-protocols']);

const TIER_PRODUCTS: Record<string, { slug: string; price: number; nameEn: string; nameAr: string }> = {
  BASIC: { slug: 'basic', price: 7, nameEn: 'Basic (Monthly)', nameAr: 'أساسي (شهري)' },
  PREMIUM: { slug: 'premium', price: 17, nameEn: 'Premium (Monthly)', nameAr: 'مميز (شهري)' },
  MASTERY: { slug: 'mastery', price: 27, nameEn: 'Mastery (Monthly)', nameAr: 'إتقان (شهري)' },
};

export function AppAccessGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  
  const [accessCode, setAccessCode] = useState('');
  const [email, setEmail] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  
  const appSlug = pathname?.split('/apps/')[1]?.split('/')[0] || '';
  const requiredTier = APP_TIERS[appSlug] || 'FREE';
  const requiredTierLevel = TIER_HIERARCHY[requiredTier] || 0;

  const checkAccess = useCallback(() => {
    if (requiredTier === 'FREE' || !appSlug || SELF_GATED_APPS.has(appSlug)) {
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
    } catch {}
    
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
  }, [appSlug, requiredTier, requiredTierLevel]);
  
  useEffect(() => {
    checkAccess();
  }, [checkAccess]);
  
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
    if (!accessCode.trim() || !email.trim()) return;
    setVerifying(true);
    setCodeError('');
    
    try {
      const response = await fetch('/api/access/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode.trim().toUpperCase(), email: email.trim().toLowerCase() }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.valid) {
        localStorage.setItem('tamkinly_access', JSON.stringify({
          tier: data.tier || 'BASIC',  // NEW MODEL default
          code: accessCode.trim().toUpperCase(),
          email: email.trim().toLowerCase(),
          productId: data.productId,
          verifiedAt: new Date().toISOString(),
        }));
        setHasAccess(true);
      } else {
        if (data.error?.includes('not yet active') || data.error?.includes('pending')) {
          setCodeError(getText(
            'Payment confirmation is pending. Your token will be activated after payment is confirmed.',
            'Payment confirmation is pending. Your token will be activated after payment is confirmed.'
          ));
        } else if (data.error?.includes('different email') || data.error?.includes('does not match')) {
          setCodeError(getText(
            'This token is linked to a different email. Use the email you purchased with.',
            'This token is linked to a different email. Use the email you purchased with.'
          ));
        } else {
          setCodeError(data.error || getText('Invalid access code', 'Invalid access code'));
        }
      }
    } catch {
      setCodeError(getText('Verification failed. Please try again.', 'Verification failed. Please try again.'));
    } finally {
      setVerifying(false);
    }
  };
  
  const tierProduct = TIER_PRODUCTS[requiredTier];
  
  return (
    <div className="relative" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="filter blur-[6px] pointer-events-none select-none" aria-hidden="true">
        {children}
      </div>
      
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center">
                    <Eye className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0F1C2E]">{getText('Preview Mode', 'Preview Mode')}</h2>
                    <p className="text-sm text-slate-500">{getText('You can see this app but need access to use it', 'You can see this app but need access to use it')}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowOverlay(false)} 
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#B88A8E]" />
                <span className="text-sm font-medium text-[#B88A8E]">
                  {getText('Requires ' + requiredTier + ' package or higher', 'Requires ' + requiredTier + ' package or higher')}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="p-4 bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] rounded-xl border border-[#3DD4B0]/20 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center">
                    <Key className="w-5 h-5 text-[#3DD4B0]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{getText('Enter Your Access Token & Email', 'Enter Your Access Token & Email')}</h3>
                    <p className="text-slate-400 text-xs flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {getText('Your token is linked to your purchase email', 'Your token is linked to your purchase email')}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#3DD4B0] flex-shrink-0" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-10 px-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 text-sm focus:border-[#3DD4B0] focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-[#3DD4B0] flex-shrink-0" />
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      placeholder="TMLY-XXXX-XXXX-XXXX"
                      maxLength={24}
                      className="flex-1 h-10 px-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 font-mono text-center tracking-wider focus:border-[#3DD4B0] focus:outline-none"
                      onKeyDown={(e) => e.key === 'Enter' && handleVerifyCode()}
                    />
                  </div>
                  <Button 
                    onClick={handleVerifyCode}
                    disabled={verifying || !accessCode.trim() || !email.trim()}
                    className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-10 font-semibold"
                  >
                    {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : getText('Verify & Unlock', 'Verify & Unlock')}
                  </Button>
                </div>
                {codeError && <p className="text-[#B88A8E] text-xs mt-2 text-center">{codeError}</p>}
              </div>
              
              <div className="text-center pt-2">
                <p className="text-sm text-[#8A94A6] mb-3">{getText('Or get access now:', 'Or get access now:')}</p>
                {tierProduct && (
                  <Link href={'/products/' + tierProduct.slug}>
                    <Button className="w-full h-12 bg-[#0F1C2E] text-white hover:bg-[#1a2d47] font-semibold text-base">
                      {getText('Get ' + tierProduct.nameEn + ' - $' + tierProduct.price, 'Get ' + tierProduct.nameEn + ' - $' + tierProduct.price)}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
              
              <div className="flex items-center justify-center gap-4 text-xs text-[#8A94A6] mt-4">
                <div className="flex items-center gap-1"><Shield className="w-3 h-3 text-[#3DD4B0]" /><span>{getText('Secure', 'Secure')}</span></div>
                <div className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-[#3DD4B0]" /><span>{getText('Instant Access', 'Instant Access')}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!showOverlay && (
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={() => setShowOverlay(true)}
            className="bg-[#3DD4B0] text-[#0F1C2E] px-5 py-3 rounded-full shadow-lg hover:bg-[#2BC49E] flex items-center gap-2 font-semibold text-sm"
          >
            <Lock className="w-4 h-4" />
            {getText('Unlock This App', 'Unlock This App')}
          </button>
        </div>
      )}
    </div>
  );
}
