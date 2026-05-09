'use client';

import { AccessGate } from '@/components/AccessGate';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Star,
  Target,
  Brain,
  Sparkles
} from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function TrialPlannerPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const trialFeatures = [
    getText('7-day guided transformation journey', 'رحلة تحول موجّهة لـ 7 أيام'),
    getText('Daily identity prompts tailored to your goals', 'محفزات هوية يومية مصمّمة حسب أهدافك'),
    getText('Evidence tracking to measure progress', 'تتبع الأدلة لقياس التقدم'),
    getText('Progress dashboard with visual insights', 'لوحة تقدم مع رؤى بصرية'),
    getText('Full access to core Identity Recode system', 'وصول كامل لنظام إعادة برمجة الهوية الأساسي'),
    getText('Upgrade credit towards any package', 'رصيد ترقية لأي باقة'),
  ];

  return (
      <AccessGate appSlug="trial-planner">
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-amber-100 text-amber-800">{getText('TRIAL', 'تجربة')}</Badge>
                <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0]">$7</Badge>
              </div>
              <h1 className="text-3xl font-bold text-white">{getText('7-Day Trial Planner', 'مخطط تجربة 7 أيام')}</h1>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <CardContent className="p-8 text-center">
              <Lock className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                {getText('Unlock Your 7-Day Trial', 'افتح تجربتك لـ 7 أيام')}
              </h2>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                {getText(
                  'Experience the full Identity Recode system for 7 days. Test the methodology before committing to the full program.',
                  'اختبر نظام إعادة برمجة الهوية بالكامل لمدة 7 أيام. جرّب المنهجية قبل الالتزام بالبرنامج الكامل.'
                )}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto mb-8">
                {trialFeatures.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/checkout?product=trial">
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-14 text-lg font-semibold">
                    <Sparkles className="w-5 h-5 mr-2" />
                    {getText('Start 7-Day Trial - $7', 'ابدأ تجربة 7 أيام - $7')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14">
                    {getText('View All Packages', 'عرض جميع الباقات')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-[#0F1C2E] mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#3DD4B0]" />
                {getText("What You'll Experience in 7 Days", 'ما ستختبره في 7 أيام')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">{getText('Day 1-2', 'اليوم 1-2')}</h3>
                  <p className="text-sm text-slate-600">{getText('Establish your identity baseline and set clear transformation goals', 'حدّد خط أساس هويتك واضبط أهداف تحول واضحة')}</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">{getText('Day 3-5', 'اليوم 3-5')}</h3>
                  <p className="text-sm text-slate-600">{getText('Practice daily identity prompts and track behavioral evidence', 'تدرّب على محفزات الهوية اليومية وتتبع الأدلة السلوكية')}</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">{getText('Day 6-7', 'اليوم 6-7')}</h3>
                  <p className="text-sm text-slate-600">{getText('Review progress and decide on your transformation path', 'راجع تقدمك وقرر مسار تحوّلك')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-slate-300">
            <p className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
              {getText('30-day money-back guarantee • Instant access • Cancel anytime', 'ضمان استرداد 30 يوماً • وصول فوري • إلغاء في أي وقت')}
            </p>
          </div>
        </div>
      </div>
    </div>
  </AccessGate>
    );
}
