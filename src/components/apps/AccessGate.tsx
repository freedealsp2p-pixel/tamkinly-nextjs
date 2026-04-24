'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Key, Mail, ArrowRight, Loader2, CheckCircle2, XCircle, AlertTriangle, Shield } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from '@/components/providers/LocaleProvider';

type Tier = 'FREE' | 'TRIAL' | 'BASIC' | 'PREMIUM' | 'BUNDLE';

interface AccessGateProps {
  onAccessGranted: () => void;
  requiredTier?: Tier;
}

const TIER_HIERARCHY: Record<Tier, number> = {
  FREE: 0,
  TRIAL: 1,
  BASIC: 2,
  PREMIUM: 3,
  BUNDLE: 4,
};

function tierMeetsRequirement(userTier: Tier, requiredTier: Tier): boolean {
  return TIER_HIERARCHY[userTier] >= TIER_HIERARCHY[requiredTier];
}

const AccessGate: React.FC<AccessGateProps> = ({ onAccessGranted, requiredTier }) => {
  const t = useTranslations('accessGate');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/access/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Check if the returned tier meets the required tier
        if (requiredTier && data.tier) {
          const userTier = data.tier as Tier;
          if (!tierMeetsRequirement(userTier, requiredTier)) {
            setError(t('tierError', { tier: data.tier, required: requiredTier }));
            return;
          }
        }

        setSuccess(true);
        // Store access in localStorage
        localStorage.setItem('tamkinly_access_email', email);
        localStorage.setItem('tamkinly_access_code', code.toUpperCase());
        if (data.tier) {
          localStorage.setItem('tamkinly_access_tier', data.tier);
        }
        
        setTimeout(() => {
          onAccessGranted();
        }, 1500);
      } else {
        setError(data.error || t('verifyFailed'));
      }
    } catch {
      setError(t('networkError'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#3DD4B0]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F1C2E] mb-2">{t('accessGranted')}</h2>
            <p className="text-[#8A94A6]">{t('loadingTools')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center p-4">
      <Card className="max-w-md w-full border-0 shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 rounded-full bg-[#0F1C2E] flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[#3DD4B0]" />
          </div>
          <CardTitle className="text-2xl text-[#0F1C2E]">{t('unlockTitle')}</CardTitle>
          <CardDescription className="text-[#8A94A6]">
            {t('unlockDescription')}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t('purchaseEmail')}
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
            </div>

            {/* Access Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                <Key className="w-4 h-4" />
                {t('accessCode')}
              </label>
              <Input
                type="text"
                placeholder="TMLY-XXXX-XXXX"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                required
                className="border-[#1F6F78]/20 focus:border-[#3DD4B0] uppercase font-mono tracking-wider"
                maxLength={13}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                <XCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !email || code.length < 13}
              className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t('verifying')}
                </>
              ) : (
                <>
                  {t('unlockApps')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1F6F78]/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#8A94A6]">{t('noCode')}</span>
            </div>
          </div>

          {/* Purchase CTA */}
          <div className="text-center space-y-3">
            <p className="text-sm text-[#8A94A6]">
              {t('getBundleText')}
            </p>
            <Link href="/products">
              <Button variant="outline" className="w-full border-[#0F1C2E] text-[#0F1C2E] hover:bg-[#0F1C2E] hover:text-white">
                {t('getBundle')}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessGate;
