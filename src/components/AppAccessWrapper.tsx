'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Lock,
  Key,
  Mail,
  Shield,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

// ─── Tier Hierarchy & Product Mapping ────────────────────────────────────────

const TIER_HIERARCHY: Record<string, number> = {
  FREE: 0,
  BASIC: 1,
  PREMIUM: 2,
  MASTERY: 3,
};

const TIER_PRODUCTS: Record<string, { slug: string; price: number; nameEn: string; nameAr: string }> = {
  BASIC: { slug: 'basic', price: 7, nameEn: 'Basic (Monthly)', nameAr: 'أساسي (شهري)' },
  PREMIUM: { slug: 'premium', price: 17, nameEn: 'Premium (Monthly)', nameAr: 'مميز (شهري)' },
  MASTERY: { slug: 'mastery', price: 27, nameEn: 'Mastery (Monthly)', nameAr: 'إتقان (شهري)' },
};

// ─── Localized Strings ───────────────────────────────────────────────────────

const STRINGS = {
  en: {
    accessRequired: 'Access Required',
    enterCredentials: 'Enter your access token and email to unlock this app.',
    accessToken: 'Access Token',
    enterToken: 'Enter your access token',
    emailAddress: 'Email Address',
    enterEmail: 'Enter the email used at purchase',
    verify: 'Verify Access',
    verifying: 'Verifying...',
    orGetAccess: "Don't have an access token?",
    getAccessNow: 'Get Access Now',
    previewOnly: 'Preview Mode',
    previewHint: 'Sign in to interact with this app',
    errorInvalidToken: 'Invalid access token. Please check and try again.',
    errorEmailMismatch: 'This email does not match the token. Use the email from your purchase.',
    errorPaymentPending: 'Payment is still being processed. Please try again shortly.',
    errorNetwork: 'Unable to verify access. Please check your connection and try again.',
    accessGranted: 'Access Granted',
    requiredTier: 'Required Tier',
    features: 'What you get',
    unlockFull: 'Unlock the full experience',
    fromPrice: 'from',
    perMonth: '/month',
  },
  ar: {
    accessRequired: 'يتطلب الوصول',
    enterCredentials: 'أدخل رمز الوصول وبريدك الإلكتروني لفتح هذا التطبيق.',
    accessToken: 'رمز الوصول',
    enterToken: 'أدخل رمز الوصول الخاص بك',
    emailAddress: 'البريد الإلكتروني',
    enterEmail: 'أدخل البريد الإلكتروني المستخدم عند الشراء',
    verify: 'تحقق من الوصول',
    verifying: 'جارٍ التحقق...',
    orGetAccess: 'ليس لديك رمز وصول؟',
    getAccessNow: 'احصل على الوصول الآن',
    previewOnly: 'وضع المعاينة',
    previewHint: 'سجّل الدخول للتفاعل مع هذا التطبيق',
    errorInvalidToken: 'رمز الوصول غير صالح.',
    errorEmailMismatch: 'هذا البريد لا يتطابق مع الرمز.',
    errorPaymentPending: 'لا يزال الدفع قيد المعالجة.',
    errorNetwork: 'تعذر التحقق من الوصول.',
    accessGranted: 'تم منح الوصول',
    requiredTier: 'المستوى المطلوب',
    features: 'ما ستحصل عليه',
    unlockFull: 'افتح التجربة الكاملة',
    fromPrice: 'ابدأ من',
    perMonth: '/شهر',
  },
} as const;

type LocaleKey = keyof typeof STRINGS.en;

// ─── Component ──────────────────────────────────────────────────────────────

interface AppAccessWrapperProps {
  tier: string;
  appSlug: string;
  appTitle: string;
  appTitleAr: string;
  appDescription: string;
  appDescriptionAr: string;
  children: React.ReactNode;
}

export function AppAccessWrapper({
  tier,
  appSlug,
  appTitle,
  appTitleAr,
  appDescription,
  appDescriptionAr,
  children,
}: AppAccessWrapperProps) {
  const { locale } = useLocale();
  const isArabic = locale === 'ar';
  const s = STRINGS[locale] || STRINGS.en;
  const title = isArabic ? appTitleAr : appTitle;
  const description = isArabic ? appDescriptionAr : appDescription;

  const [accessCode, setAccessCode] = useState('');
  const [email, setEmail] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [granted, setGranted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const requiredTier = tier || 'BASIC';
  const product = TIER_PRODUCTS[requiredTier];

  const handleVerify = useCallback(async () => {
    if (!accessCode.trim() || !email.trim()) return;
    setVerifying(true);
    setError('');
    try {
      const res = await fetch('/api/access/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: accessCode.trim(), email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setGranted(true);
      } else {
        setError(data.error || s.errorInvalidToken);
      }
    } catch {
      setError(s.errorNetwork);
    } finally {
      setVerifying(false);
    }
  }, [accessCode, email, s]);

  if (granted) {
    return <>{children}</>;
  }

  return (
    <Card className="border-[#3DD4B0]/20 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-xl bg-[#1F6F78]/10">
            <Lock className="w-6 h-6 text-[#1F6F78]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#0F1C2E] mb-1">{s.accessRequired}</h3>
            <p className="text-sm text-[#8A94A6]">{s.enterCredentials}</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="relative">
            <label className="block text-sm font-medium text-[#0F1C2E] mb-1.5">{s.accessToken}</label>
            <div className="relative">
              <Key className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-[#8A94A6]" />
              <Input
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder={s.enterToken}
                type={showPassword ? 'text' : 'password'}
                className="ps-10 pe-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-[#8A94A6] hover:text-[#0F1C2E]"
                aria-label={showPassword ? 'Hide token' : 'Show token'}
              >
                <Eye className="size-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-[#0F1C2E] mb-1.5">{s.emailAddress}</label>
            <div className="relative">
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-[#8A94A6]" />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={s.enterEmail}
                type="email"
                className="ps-10"
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleVerify}
          disabled={verifying || !accessCode.trim() || !email.trim()}
          className="w-full bg-[#1F6F78] hover:bg-[#175E66] text-white h-11 font-semibold mb-6"
        >
          {verifying ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin me-2" />
              {s.verifying}
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 me-2" />
              {s.verify}
            </>
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-[#8A94A6] mb-3">{s.orGetAccess}</p>
          <Link href={`/products/${product?.slug || 'basic'}`}>
            <Button variant="outline" className="border-[#3DD4B0] text-[#1F6F78] hover:bg-[#3DD4B0]/10">
              {s.getAccessNow}
              <ArrowRight className={`w-4 h-4 ${isArabic ? 'me-2 rotate-180' : 'ms-2'}`} />
            </Button>
          </Link>
        </div>

        {product && (
          <div className="mt-6 p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <p className="text-sm font-semibold text-[#0F1C2E] mb-1">
              {s.requiredTier}: <Badge variant="secondary">{requiredTier}</Badge>
            </p>
            <p className="text-xs text-[#8A94A6]">
              {s.fromPrice} ${product.price}{s.perMonth} — {product.nameEn}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
