'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Copy, Check, Share2, Users, Star, ArrowRight, Trophy, ChevronRight, Clock, Mail, MessageCircle } from 'lucide-react';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';

interface ReferralData {
  code: string;
  link: string;
  totalReferrals: number;
  rewardsEarned: number;
  recentReferrals: Array<{
    id: string;
    referredEmail: string;
    status: string;
    reward: string | null;
    rewardClaimed: boolean;
    createdAt: string;
    usedAt: string | null;
  }>;
}

const REWARD_TIERS = [
  { min: 1, max: 3, reward: 'TRIAL_EXTENSION', icon: Gift },
  { min: 4, max: 9, reward: 'BASIC_ACCESS', icon: Star },
  { min: 10, max: Infinity, reward: 'PREMIUM_BUNDLE', icon: Trophy },
];

function getRewardTier(count: number) {
  if (count >= 10) return 2;
  if (count >= 4) return 1;
  if (count >= 1) return 0;
  return -1;
}

function getNextTierTarget(count: number) {
  if (count < 1) return 1;
  if (count < 4) return 4;
  if (count < 10) return 10;
  return null;
}

export default function ReferralPage() {
  const t = useTranslations('referralPage');
  const { locale } = useLocale();
  const isRTL = locale === 'ar';
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
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
        text: t('shareText'),
        url: referralData.link,
      });
    } else {
      copyLink();
    }
  };

  const shareViaWhatsApp = () => {
    if (referralData) {
      window.open(`https://wa.me/?text=${encodeURIComponent(t('shareText') + ' ' + referralData.link)}`, '_blank');
    }
  };

  const shareViaTwitter = () => {
    if (referralData) {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(t('shareText'))}&url=${encodeURIComponent(referralData.link)}`, '_blank');
    }
  };

  const shareViaEmail = () => {
    if (referralData) {
      window.location.href = `mailto:?subject=${encodeURIComponent(t('shareText'))}&body=${encodeURIComponent(t('shareText') + '\n\n' + referralData.link)}`;
    }
  };

  const currentTier = getRewardTier(referralData?.totalReferrals || 0);
  const nextTierTarget = getNextTierTarget(referralData?.totalReferrals || 0);

  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] text-white py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-6">
            <Gift className="w-8 h-8 text-[#3DD4B0]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t('title')}</h1>
          <p className="text-lg text-slate-300">{t('subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl py-12 px-4">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-[#3DD4B0] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : referralData ? (
          <>
            {/* Referral Code Card */}
            <Card className="border-2 border-[#3DD4B0]/30 shadow-lg mb-6">
              <CardHeader className="text-center">
                <CardTitle>{t('yourReferralCode')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-[#0F1C2E] rounded-lg p-4 mb-4 inline-block">
                  <span className="font-mono text-2xl text-[#3DD4B0] tracking-widest">{referralData.code}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-slate-500 mb-1">{t('referralLink')}</p>
                  <p className="text-sm font-mono text-[#0F1C2E] break-all">{referralData.link}</p>
                </div>
                <div className="flex gap-2 justify-center mb-3">
                  <Button onClick={copyLink} variant="outline" className="border-[#1F6F78] text-[#1F6F78]">
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? t('copiedToClipboard') : t('copyLink')}
                  </Button>
                  <Button onClick={shareLink} className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]">
                    <Share2 className="w-4 h-4 mr-2" />
                    {t('share')}
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-2 pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400">{t('orShareVia')}</span>
                  <Button onClick={shareViaWhatsApp} variant="ghost" size="icon" className="h-8 w-8" title={t('whatsapp')}>
                    <MessageCircle className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button onClick={shareViaTwitter} variant="ghost" size="icon" className="h-8 w-8" title={t('twitter')}>
                    <svg className="h-4 w-4 text-sky-500" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </Button>
                  <Button onClick={shareViaEmail} variant="ghost" size="icon" className="h-8 w-8" title={t('email')}>
                    <Mail className="h-4 w-4 text-slate-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-[#3DD4B0] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#0F1C2E]">{referralData.totalReferrals}</div>
                  <div className="text-sm text-slate-500">{t('referrals')}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-[#0F1C2E]">{referralData.rewardsEarned}</div>
                  <div className="text-sm text-slate-500">{t('rewardsEarned')}</div>
                </CardContent>
              </Card>
            </div>

            {/* Current Tier + Progress */}
            {currentTier >= 0 && (
              <Card className="border-0 shadow-sm mb-6 bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center">
                        {currentTier === 0 && <Gift className="w-5 h-5 text-[#3DD4B0]" />}
                        {currentTier === 1 && <Star className="w-5 h-5 text-[#3DD4B0]" />}
                        {currentTier === 2 && <Trophy className="w-5 h-5 text-[#3DD4B0]" />}
                      </div>
                      <div>
                        <p className="text-sm text-slate-300">{t('currentTier')}</p>
                        <p className="font-bold text-[#3DD4B0]">
                          {currentTier === 0 ? t('tier1Name') : currentTier === 1 ? t('tier2Name') : t('tier3Name')}
                        </p>
                      </div>
                    </div>
                    {nextTierTarget && (
                      <Badge variant="outline" className="border-[#3DD4B0]/50 text-[#3DD4B0]">
                        {t('nextReward').replace('{count}', String(nextTierTarget))}
                      </Badge>
                    )}
                  </div>
                  {nextTierTarget && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">
                          {t('progressToNext').replace('{current}', String(referralData.totalReferrals)).replace('{target}', String(nextTierTarget))}
                        </span>
                      </div>
                      <Progress value={(referralData.totalReferrals / nextTierTarget) * 100} className="h-2 bg-white/20" />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Reward Tiers */}
            <Card className="border border-slate-200 mb-6">
              <CardHeader>
                <CardTitle>{t('rewardTiers')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {REWARD_TIERS.map((tier, idx) => {
                  const isActive = currentTier >= idx;
                  const Icon = tier.icon;
                  return (
                    <div key={idx} className={`flex gap-4 p-4 rounded-lg ${isActive ? 'bg-[#3DD4B0]/10 border border-[#3DD4B0]/30' : 'bg-slate-50 opacity-70'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-[#3DD4B0]/20' : 'bg-slate-200'}`}>
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#1F6F78]' : 'text-slate-400'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#0F1C2E]">
                          {idx === 0 ? t('tier1Title') : idx === 1 ? t('tier2Title') : t('tier3Title')}
                        </p>
                        <p className="text-sm text-slate-600">
                          {idx === 0 ? t('tier1Desc') : idx === 1 ? t('tier2Desc') : t('tier3Desc')}
                        </p>
                      </div>
                      {isActive && <Check className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-1" />}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="border border-slate-200 mb-6">
              <CardHeader>
                <CardTitle>{t('howItWorks')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[t('step1'), t('step2'), t('step3')].map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-[#1F6F78]">{idx + 1}</span>
                    </div>
                    <p className="text-slate-600">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Referrals */}
            <Card className="border border-slate-200 mb-6">
              <CardHeader>
                <CardTitle>{t('recentActivity')}</CardTitle>
              </CardHeader>
              <CardContent>
                {referralData.recentReferrals && referralData.recentReferrals.length > 0 ? (
                  <div className="space-y-3">
                    {referralData.recentReferrals.slice(0, 5).map((ref) => (
                      <div key={ref.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            ref.status === 'COMPLETED' ? 'bg-[#3DD4B0]/20' : ref.status === 'REGISTERED' ? 'bg-amber-100' : 'bg-slate-200'
                          }`}>
                            {ref.status === 'COMPLETED' ? <Check className="w-4 h-4 text-[#3DD4B0]" /> : <Clock className="w-4 h-4 text-slate-400" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#0F1C2E]">{ref.referredEmail || '---'}</p>
                            <p className="text-xs text-slate-500">
                              {ref.status === 'COMPLETED' ? t('statusCompleted') : ref.status === 'REGISTERED' ? t('statusRegistered') : t('statusPending')}
                            </p>
                          </div>
                        </div>
                        {ref.reward && (
                          <Badge variant="outline" className="text-xs border-[#3DD4B0]/50 text-[#1F6F78]">
                            {ref.reward === 'TRIAL_EXTENSION' ? t('rewardTrialExtension') : ref.reward === 'BASIC_ACCESS' ? t('rewardBasicAccess') : t('rewardPremiumBundle')}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">{t('noReferralsYet')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-slate-500 mb-4">{t('signInToGetCode')}</p>
              <a href="/auth/signin">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold">
                  {t('signIn')}
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

