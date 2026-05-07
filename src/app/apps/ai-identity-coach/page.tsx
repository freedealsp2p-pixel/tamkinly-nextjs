'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Clock,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function AIIdentityCoachPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            {getText('← Back to Apps', '← العودة للتطبيقات')}
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center relative">
              <Sparkles className="w-5 h-5 text-[#3DD4B0]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#0F1C2E] text-[#3DD4B0] border border-[#3DD4B0]/50">{getText('BUNDLE', 'الباقة الشاملة')}</Badge>
                <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/50">
                  <Wrench className="w-3 h-3 mr-1" />
                  {getText('Under Development', 'قيد التطوير')}
                </Badge>
              </div>
              <h1 className="text-xl font-bold">{getText('AI Identity Coach', 'مدرب الهوية الذكي')}</h1>
              <p className="text-slate-400 text-sm">{getText('Your 24/7 transformation companion', 'رفيق تحوّلك على مدار الساعة')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Main Coming Soon Card */}
        <Card className="bg-white mb-8 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-amber-500 via-[#3DD4B0] to-[#1F6F78]" />
          <CardContent className="p-8 lg:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-500/10 text-amber-500 mb-6">
              <Wrench className="w-10 h-10" />
            </div>
            
            <Badge className="bg-amber-500/20 text-amber-600 border border-amber-500/30 mb-4">
              {getText('Coming Soon', 'قريباً')}
            </Badge>
            
            <h2 className="font-serif text-3xl font-bold text-[#0F1C2E] mb-4">
              {getText('AI Identity Coach is Under Development', 'مدرب الهوية الذكي قيد التطوير')}
            </h2>
            
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
              {getText(
                "We're working hard to bring you an intelligent coaching experience powered by evidence-based psychology frameworks. This feature will be available soon for BUNDLE package subscribers.",
                'نعمل بجد لتقديم تجربة تدريب ذكية مدعومة بأطر نفسية مبنية على الأدلة. ستكون هذه الميزة متاحة قريباً لمشتركي الباقة الشاملة.'
              )}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apps">
                <Button size="lg" variant="outline" className="px-8">
                  {getText('Explore Other Apps', 'استكشف تطبيقات أخرى')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8">
                  {getText('View BUNDLE Package', 'عرض الباقة الشاملة')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* What to Expect */}
        <Card className="bg-white mb-8">
          <CardContent className="p-6 lg:p-8">
            <h3 className="font-serif text-xl font-bold text-[#0F1C2E] mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#3DD4B0]" />
              {getText('What to Expect', 'ما يمكنك توقعه')}
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: getText('Identity Discovery', 'اكتشاف الهوية'), desc: getText('Guided conversations to explore who you are and who you want to become', 'محادثات موجّهة لاستكشاف هويتك ومن تريد أن تصبح') },
                { title: getText('Habit Formation', 'بناء العادات'), desc: getText('Identity-based habit strategies backed by behavioral science', 'استراتيجيات عادات مبنية على الهوية مدعومة بالعلم السلوكي') },
                { title: getText('Self-Authorship', 'تأليف الذات'), desc: getText('Develop your internal voice and move beyond external formulas', 'طوّر صوتك الداخلي وتجاوز الصيغ الخارجية') },
                { title: getText('Emotion Regulation', 'تنظيم المشاعر'), desc: getText('Learn cognitive reappraisal and emotional intelligence techniques', 'تعلّم إعادة التقييم المعرفي وتقنيات الذكاء العاطفي') },
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#0F1C2E] text-sm">{feature.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Get Notified */}
        <Card className="bg-gradient-to-r from-[#1F6F78] to-[#0F1C2E] border-0">
          <CardContent className="p-6 lg:p-8 text-center">
            <Mail className="w-8 h-8 text-[#3DD4B0] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {getText("Get Notified When It's Ready", 'احصل على إشعار عندما يكون جاهزاً')}
            </h3>
            <p className="text-slate-300 mb-4 max-w-md mx-auto">
              {getText(
                "Subscribe to our newsletter to be the first to know when AI Identity Coach launches.",
                'اشترك في نشرتنا الإخبارية لتكون أول من يعلم عند إطلاق مدرب الهوية الذكي.'
              )}
            </p>
            <Link href="/contact">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                {getText('Contact Us for Updates', 'تواصل معنا للتحديثات')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Estimated Timeline */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
            <Clock className="w-4 h-4" />
            <span>{getText('Expected launch: Q1 2025', 'الإطلاق المتوقع: الربع الأول 2025')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
