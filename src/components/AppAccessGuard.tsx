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

const TIER_PRODUCTS: Record<string, { slug: string; price: number; nameEn: string; nameAr: string }> = {
  TRIAL: { slug: 'trial', price: 7, nameEn: 'Trial Access', nameAr: 'وصول تجريبي' },
  BASIC: { slug: 'planner', price: 17, nameEn: 'Basic Package', nameAr: 'الباقة الأساسية' },
  PREMIUM: { slug: 'premium', price: 27, nameEn: 'Premium Package', nameAr: 'الباقة المميزة' },
  BUNDLE: { slug: 'bundle', price: 47, nameEn: 'Full Bundle', nameAr: 'الباقة الشاملة' },
};

const TIER_FEATURES: Record<string, { en: string[]; ar: string[] }> = {
  TRIAL: {
    en: ['7-day identity planner trial', 'Basic self-assessment', 'Community preview access'],
    ar: ['تجربة مخطط الهوية لمدة 7 أيام', 'التقييم الذاتي الأساسي', 'معاينة الوصول للمجتمع'],
  },
  BASIC: {
    en: ['30-day identity planner', 'Identity baseline assessment', 'Environment audit tool', 'Habit tracker & goal system'],
    ar: ['مخطط الهوية لـ 30 يوماً', 'تقييم خط أساس الهوية', 'أداة تدقيق البيئة', 'متتبع العادات ونظام الأهداف'],
  },
  PREMIUM: {
    en: ['Everything in Basic', 'Decision pattern analysis', 'Evidence tracking system', 'Progress dashboard'],
    ar: ['كل ما في الباقة الأساسية', 'تحليل أنماط القرار', 'نظام تتبع الأدلة', 'لوحة تتبع التقدم'],
  },
  BUNDLE: {
    en: ['Everything in Premium', 'AI Identity Coach', 'Emotion regulation toolkit', 'Community access', 'Priority support'],
    ar: ['كل ما في الباقة المميزة', 'مدرب الهوية بالذكاء الاصطناعي', 'أدوات تنظيم المشاعر', 'الوصول للمجتمع', 'الدعم ذو الأولوية'],
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
    
    try {
      // Check localStorage for verified access
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
      
      // Check session via API
      fetch('/api/auth/me').then(res => res.json()).then(data => {
        if (data?.user?.accessTier) {
          const userTierLevel = TIER_HIERARCHY[data.user.accessTier] || 0;
          if (userTierLevel >= requiredTierLevel) {
            setHasAccess(true);
          }
        }
      }).catch(() => {
        // Session check failed, no access
      }).finally(() => {
        setIsChecking(false);
      });
    } catch {
      setIsChecking(false);
    }
  }, [appSlug, requiredTier, requiredTierLevel]);
  
  // If app is free, no gate needed
  if (requiredTier === 'FREE' || !appSlug) {
    return <>{children}</>;
  }
  
  // While checking access, show loading
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#3DD4B0] animate-spin" />
      </div>
    );
  }
  
  // If user has access, show content
  if (hasAccess) {
    return <>{children}</>;
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
        localStorage.setItem('tamkinly_access', JSON.stringify({
          tier: data.tier || 'BASIC',
          code: accessCode.trim(),
          verifiedAt: new Date().toISOString(),
        }));
        setHasAccess(true);
      } else {
        setCodeError(data.error || getText('Invalid access code', 'رمز الوصول غير صالح'));
      }
    } catch {
      setCodeError(getText('Verification failed. Please try again.', 'فشل التحقق. يرجى المحاولة مرة أخرى.'));
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
            <CardTitle className="text-2xl">{getText('Access Required', 'الوصول مطلوب')}</CardTitle>
            <CardDescription className="text-base">
              {getText(
                'This app requires the ' + requiredTier + ' package or higher',
                'يتطلب هذا التطبيق باقة ' + requiredTier + ' أو أعلى'
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
                {getText('Have an access code?', 'لديك رمز وصول؟')}
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
                  {verifying ? '...' : getText('Verify', 'تحقق')}
                </Button>
              </div>
              {codeError && <p className="text-sm text-[#FC6D26] mt-1">{codeError}</p>}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-[#8A94A6] mb-3">{getText('Or get access now:', 'أو احصل على الوصول الآن:')}</p>
              {tierProduct && (
                <Link href={'/products/' + tierProduct.slug}>
                  <Button className="w-full h-14 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold text-lg">
                    {getText(
                      'Get ' + tierProduct.nameEn + ' - $' + tierProduct.price,
                      'احصل على ' + tierProduct.nameAr + ' - $' + tierProduct.price
                    )}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
            
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
