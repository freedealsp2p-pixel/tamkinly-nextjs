'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ArrowRight, Lock, CheckCircle2, MessageCircle, Calendar, Target, Heart, Star, Sparkles } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function CommunityAccessPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const features = [
    { icon: MessageCircle, titleEn: 'Private Community Forum', titleAr: 'منتدى المجتمع الخاص', descEn: 'Connect with like-minded individuals on the same transformation journey', descAr: 'تواصل مع أشخاص مماثلين في نفس رحلة التحول' },
    { icon: Calendar, titleEn: 'Weekly Challenges', titleAr: 'تحديات أسبوعية', descEn: 'Structured weekly challenges to keep you progressing', descAr: 'تحديات أسبوعية منظمة لإبقائك في تقدم مستمر' },
    { icon: Target, titleEn: 'Accountability Partners', titleAr: 'شركاء المساءلة', descEn: 'Get matched with accountability partners for mutual support', descAr: 'احصل على شركاء مساءلة للدعم المتبادل' },
    { icon: Star, titleEn: 'Live Q&A Sessions', titleAr: 'جلسات أسئلة وأجوبة مباشرة', descEn: 'Monthly live sessions with the founding team', descAr: 'جلسات مباشرة شهرية مع الفريق المؤسس' },
    { icon: Heart, titleEn: 'Share Your Wins', titleAr: 'شارك إنجازاتك', descEn: 'Celebrate your transformation milestones with the community', descAr: 'احتفل بإنجازاتك في التحول مع المجتمع' },
    { icon: Sparkles, titleEn: 'Exclusive Resources', titleAr: 'موارد حصرية', descEn: 'Access bonus worksheets, templates, and guides only available to members', descAr: 'الوصول إلى أوراق عمل وقوالب وأدلة إضافية متاحة فقط للأعضاء' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0] border border-[#3DD4B0]/50 mb-4">{getText('BUNDLE EXCLUSIVE', 'حصري للباقة الشاملة')}</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{getText('Transformation Community', 'مجتمع التحول')}</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">{getText('Join a supportive community of people committed to identity transformation. Share wins, get support, and stay accountable on your journey.', 'انضم إلى مجتمع داعم من الأشخاص الملتزمين بتحول الهوية. شارك إنجازاتك، احصل على الدعم، وابقَ ملتزماً في رحلتك.')}</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl py-12 px-4">
        {/* Access Required Card */}
        <Card className="border-2 border-[#3DD4B0]/30 shadow-lg mb-8">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#3DD4B0]" />
            </div>
            <CardTitle className="text-2xl">{getText('Access Required', 'الوصول مطلوب')}</CardTitle>
            <CardDescription className="text-base">{getText('The Transformation Community is included in the Complete Bundle ($47)', 'مجتمع التحول مضمّن في الباقة الشاملة ($47)')}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/products/bundle">
              <Button className="w-full h-14 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold text-lg">
                {getText('Get Complete Bundle - $47', 'احصل على الباقة الشاملة - $47')} <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-[#8A94A6] mt-3">{getText('One-time payment. Lifetime access.', 'دفعة واحدة. وصول مدى الحياة.')}</p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <h2 className="text-2xl font-bold text-[#0F1C2E] mb-6 text-center">{getText('What You Get', 'ما ستحصل عليه')}</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {features.map((feature, i) => (
            <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-[#3DD4B0]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F1C2E] mb-1">{getText(feature.titleEn, feature.titleAr)}</h3>
                    <p className="text-sm text-[#8A94A6]">{getText(feature.descEn, feature.descAr)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What Makes This Different */}
        <Card className="bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] text-white mb-8">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">{getText('Why This Community Is Different', 'لماذا هذا المجتمع مختلف')}</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{getText('Identity-Focused, Not Goal-Focused', 'يركز على الهوية، وليس الأهداف')}</p>
                  <p className="text-sm text-slate-300">{getText('Unlike typical productivity communities, we focus on becoming the person who naturally achieves goals.', 'على عكس مجتمعات الإنتاجية النموذجية، نركز على أن تصبح الشخص الذي يحقق الأهداف بشكل طبيعي.')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{getText('Evidence-Based Approach', 'نهج قائم على الأدلة')}</p>
                  <p className="text-sm text-slate-300">{getText('Our methods are grounded in psychology and identity science, not motivation hacks.', 'أساليبنا مبنية على علم النفس وعلم الهوية، وليس حيل التحفيز.')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{getText('Small & Intentional', 'صغير ومتعمّد')}</p>
                  <p className="text-sm text-slate-300">{getText('Quality over quantity. Every member is committed to real transformation.', 'الجودة أهم من الكمية. كل عضو ملتزم بتحول حقيقي.')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Link href="/products/bundle">
            <Button className="h-14 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold text-lg px-8">
              {getText('Join the Community', 'انضم إلى المجتمع')} <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-[#8A94A6] mt-3">{getText('Included in Complete Bundle ($47) with AI Coach + All Apps', 'مضمّن في الباقة الشاملة ($47) مع مدرب AI + جميع التطبيقات')}</p>
        </div>
      </div>
    </div>
  );
}

