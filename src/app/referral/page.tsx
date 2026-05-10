'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Copy, Check, Share2, Users, Star, ArrowRight } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function ReferralPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const isRTL = locale === 'ar';
  const [referralData, setReferralData] = useState<{ code: string; link: string; totalReferrals: number; rewardsEarned: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/referral')
      .then(res => res.json())
      .then(data => {
        if (data.code) setReferralData(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const copyLink = () => {
    if (referralData) {
      navigator.clipboard.writeText(referralData.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLink = () => {
    if (referralData && navigator.share) {
      navigator.share({
        title: 'Tamkinly - Identity Transformation',
        text: getText('Transform your identity with Tamkinly!', 'حوّل هويتك مع تمكنلي!'),
        url: referralData.link,
      });
    } else {
      copyLink();
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] text-white py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-6">
            <Gift className="w-8 h-8 text-[#3DD4B0]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{getText('Invite Friends, Earn Rewards', 'ادعُ أصدقاءك، اكسب مكافآت')}</h1>
          <p className="text-lg text-slate-300">{getText('Share Tamkinly with friends and both get free trial access!', 'شارك تمكنلي مع أصدقاءك واحصلا كلاكما على وصول تجريبي مجاني!')}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl py-12 px-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#3DD4B0] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : referralData ? (
          <>
            {/* Referral Code */}
            <Card className="border-2 border-[#3DD4B0]/30 shadow-lg mb-6">
              <CardHeader className="text-center">
                <CardTitle>{getText('Your Referral Code', 'رمز الإحالة الخاص بك')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-[#0F1C2E] rounded-lg p-4 mb-4 inline-block">
                  <span className="font-mono text-2xl text-[#3DD4B0] tracking-widest">{referralData.code}</span>
                </div>
                <div className="flex gap-2 justify-center">
                  <Button onClick={copyLink} variant="outline" className="border-[#1F6F78] text-[#1F6F78]">
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {getText('Copy Link', 'نسخ الرابط')}
                  </Button>
                  <Button onClick={shareLink} className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]">
                    <Share2 className="w-4 h-4 mr-2" />
                    {getText('Share', 'شارك')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-[#3DD4B0] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#0F1C2E]">{referralData.totalReferrals}</div>
                  <div className="text-sm text-slate-500">{getText('Referrals', 'إحالات')}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#0F1C2E]">{referralData.rewardsEarned}</div>
                  <div className="text-sm text-slate-500">{getText('Rewards Earned', 'مكافآت مكتسبة')}</div>
                </CardContent>
              </Card>
            </div>

            {/* How It Works */}
            <Card className="border border-slate-200 mb-6">
              <CardHeader>
                <CardTitle>{getText('How It Works', 'كيف يعمل')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#1F6F78]">1</span>
                  </div>
                  <p className="text-slate-600">{getText('Share your unique referral link with friends', 'شارك رابط الإحالة الفريد مع أصدقاءك')}</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#1F6F78]">2</span>
                  </div>
                  <p className="text-slate-600">{getText('They sign up and get free trial access', 'يسجلون ويحصلون على وصول تجريبي مجاني')}</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#1F6F78]">3</span>
                  </div>
                  <p className="text-slate-600">{getText('You earn rewards for every successful referral', 'تكسب مكافآت عن كل إحالة ناجحة')}</p>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-slate-500 mb-4">{getText('Sign in to get your referral code', 'سجل الدخول للحصول على رمز الإحالة')}</p>
              <a href="/auth/signin">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold">
                  {getText('Sign In', 'تسجيل الدخول')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
