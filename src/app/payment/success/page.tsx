'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Sparkles, ArrowRight, Mail, Copy, Check, Lock, Zap, Brain, Target, Users, Clock, Gift, Star, Shield } from 'lucide-react';
import { useTranslations } from "@/components/providers/LocaleProvider";

const TIER_INFO: Record<string, { nameEn: string; nameAr: string; price: number; color: string; icon: React.ReactNode; features: { en: string; ar: string }[] }> = {
  trial: {
    nameEn: 'Trial Access', nameAr: 'وصول تجريبي', price: 7, color: 'bg-[#e6f3f4] text-[#2A8A94] border-[#cde7e9]',
    icon: <Clock className="w-5 h-5" />,
    features: [
      { en: '7-day identity planner', ar: 'مخطط هوية لـ 7 أيام' },
      { en: 'Basic self-assessment', ar: 'التقييم الذاتي الأساسي' },
      { en: 'Community preview', ar: 'معاينة المجتمع' },
    ],
  },
  planner: {
    nameEn: 'Basic Package', nameAr: 'الباقة الأساسية', price: 17, color: 'bg-[#1F6F78]/20 text-[#1F6F78] border-[#1F6F78]/50',
    icon: <Target className="w-5 h-5" />,
    features: [
      { en: '30-day identity planner', ar: 'مخطط هوية لـ 30 يوماً' },
      { en: 'Identity baseline assessment', ar: 'تقييم خط أساس الهوية' },
      { en: 'Environment audit tool', ar: 'أداة تدقيق البيئة' },
      { en: 'Habit tracker & goal system', ar: 'متتبع العادات ونظام الأهداف' },
    ],
  },
  premium: {
    nameEn: 'Premium Package', nameAr: 'الباقة المميزة', price: 27, color: 'bg-purple-100 text-purple-800 border-purple-300',
    icon: <Brain className="w-5 h-5" />,
    features: [
      { en: 'Everything in Basic', ar: 'كل ما في الباقة الأساسية' },
      { en: 'Decision pattern analysis', ar: 'تحليل أنماط القرار' },
      { en: 'Evidence tracking system', ar: 'نظام تتبع الأدلة' },
      { en: 'Progress dashboard', ar: 'لوحة تتبع التقدم' },
    ],
  },
  bundle: {
    nameEn: 'Mastery (Monthly)', nameAr: 'إتقان (شهري)', price: 27, color: 'bg-[#0F1C2E] text-[#3DD4B0] border-[#3DD4B0]/50',
    icon: <Sparkles className="w-5 h-5" />,
    features: [
      { en: 'Everything in Premium', ar: 'كل ما في الباقة المميزة' },
      { en: 'AI Identity Coach', ar: 'مدرب الهوية بالذكاء الاصطناعي' },
      { en: 'Emotion regulation toolkit', ar: 'أدوات تنظيم المشاعر' },
      { en: 'Community access', ar: 'الوصول للمجتمع' },
      { en: 'Priority support', ar: 'الدعم ذو الأولوية' },
    ],
  },
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId');
  const tier = searchParams.get('tier') || 'planner';
  const accessCode = searchParams.get('accessCode') || searchParams.get('code') || '';
  const t = useTranslations("payment.success");
  const [copied, setCopied] = useState(false);
  const [locale, setLocale] = useState('en');
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tamkinly_locale');
      if (stored) setLocale(stored);
    } catch {}
  }, []);
  
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const tierInfo = TIER_INFO[tier] || TIER_INFO['planner'];
  const isRTL = locale === 'ar';
  
  const copyCode = () => {
    navigator.clipboard.writeText(accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-2xl mx-auto py-16 px-4">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-bounce-once">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-[#0F1C2E] mb-2">{getText('Payment Successful!', 'تم الدفع بنجاح!')}</h1>
          <p className="text-slate-600">{getText('Welcome to your identity transformation journey', 'مرحباً بك في رحلة تحول هويتك')}</p>
        </div>

        {/* Tier Badge */}
        <div className="flex justify-center mb-6">
          <Badge className={`text-sm px-4 py-1 ${tierInfo.color}`}>
            {tierInfo.icon}
            <span className="ml-2">{locale === 'ar' ? tierInfo.nameAr : tierInfo.nameEn} - ${tierInfo.price}</span>
          </Badge>
        </div>

        {/* Access Code Card - THE KEY FEATURE */}
        <Card className="border-2 border-[#3DD4B0] shadow-lg mb-6 bg-gradient-to-br from-white to-[#3DD4B0]/5">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-2">
                <Mail className="w-6 h-6 text-[#1F6F78]" />
              </div>
              <CardTitle className="text-lg">{getText('Access Token Sent by Email', 'رمز الوصول يرسل عبر البريد الإلكتروني')}</CardTitle>
              <CardDescription>{getText('Your personal access token will be sent to your email after payment confirmation', 'سيتم إرسال رمز الوصول الشخصي إلى بريدك الإلكتروني بعد تأكيد الدفع')}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-[#0F1C2E] rounded-lg p-4 mb-3">
                <p className="text-white font-medium flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-[#3DD4B0]" />
                  {getText('Check your email for your access token', 'تحقق من بريدك الإلكتروني لرمز الوصول')}
                </p>
              </div>
              <p className="text-xs text-slate-500 mb-2">
                {getText('The token is linked to your email and cannot be used by anyone else.', 'الرمز مرتبط ببريدك ولا يمكن لغيرك استخدامه.')}
              </p>
              <div className="flex items-center justify-center gap-2 text-[#1F6F78]">
                <Shield className="w-4 h-4" />
                <span className="text-xs">{getText('Personal & Secure', 'شخصي وآمن')}</span>
              </div>
            </CardContent>
          </Card>

        {/* What's Included */}
        <Card className="border border-slate-200 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{getText('What You Now Have Access To', 'ما لديك حق الوصول إليه الآن')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tierInfo.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0" />
                  <span className="text-slate-700">{locale === 'ar' ? feature.ar : feature.en}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Start Guide */}
        <Card className="border-2 border-[#1F6F78]/20 shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#3DD4B0]" />
              {getText('Quick Start Guide', 'دليل البدء السريع')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#1F6F78]">1</span>
                </div>
                <div>
                  <p className="font-medium text-[#0F1C2E]">{getText('Go to Apps Page', 'اذهب لصفحة التطبيقات')}</p>
                  <p className="text-sm text-slate-500">{getText('Visit tamkinly.com/apps to access your tools with your token and email', 'زر tamkinly.com/apps للوصول لأدواتك برمزك وبريدك')}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#1F6F78]">2</span>
                </div>
                <div>
                  <p className="font-medium text-[#0F1C2E]">{getText('Enter Your Access Code', 'أدخل رمز الوصول')}</p>
                  <p className="text-sm text-slate-500">{getText('When you open a paid app, enter your code to unlock it', 'عند فتح تطبيق مدفوع، أدخل رمزك لفتحه')}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#1F6F78]">3</span>
                </div>
                <div>
                  <p className="font-medium text-[#0F1C2E]">{getText('Start Your Journey', 'ابدأ رحلتك')}</p>
                  <p className="text-sm text-slate-500">{getText('Begin with the Identity Baseline Assessment', 'ابدأ بتقييم خط أساس الهوية')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-6">
            <div className="space-y-3 text-sm">
              {orderId && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{getText('Order ID', 'رقم الطلب')}</span>
                  <span className="font-mono">{orderId}</span>
                </div>
              )}
              {paymentId && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{getText('Payment ID', 'رقم الدفع')}</span>
                  <span className="font-mono">{paymentId}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{getText('Package', 'الباقة')}</span>
                <span className="font-medium">{locale === 'ar' ? tierInfo.nameAr : tierInfo.nameEn}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">{getText('Amount', 'المبلغ')}</span>
                <span className="font-bold text-[#0F1C2E]">${tierInfo.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link href="/apps" className="block">
            <Button className="w-full h-14 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold text-lg">
              {getText('Go to Your Apps', 'اذهب لتطبيقاتك')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/quiz" className="block">
            <Button variant="outline" className="w-full h-12 border-[#1F6F78] text-[#1F6F78] hover:bg-[#1F6F78]/10 font-semibold">
              {getText('Take the Free Identity Quiz', 'اخذ اختبار الهوية المجاني')}
            </Button>
          </Link>
        </div>

        {/* Email notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <Mail className="w-4 h-4" />
            <span>{getText('A confirmation email has been sent with your access details', 'تم إرسال بريد تأكيدي مع تفاصيل الوصول')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#3DD4B0] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
