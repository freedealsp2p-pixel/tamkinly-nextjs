'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Clock,
  Lock,
  Sparkles,
  Brain,
  Heart,
  Sun,
  Calendar,
  User,
  Home,
  TrendingUp,
  BarChart3,
  Users,
  Headphones,
  BookOpen,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { AppPage } from '@/lib/app-pages';
import { useLocale } from '@/components/providers/LocaleProvider';

// ============================================
// ICON MAPPING
// ============================================

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Heart,
  Sun,
  Calendar,
  User,
  Home,
  TrendingUp,
  BarChart3,
  Users,
  Headphones,
  BookOpen,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
};

// ============================================
// TIER COLORS
// ============================================

const tierColors: Record<string, { bg: string; text: string; border: string }> = {
  FREE: { bg: 'bg-[#3DD4B0]/20', text: 'text-[#2BC49E]', border: 'border-[#3DD4B0]/50' },
  TRIAL: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  BASIC: { bg: 'bg-[#1F6F78]/20', text: 'text-[#1F6F78]', border: 'border-[#1F6F78]/50' },
  PREMIUM: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  BUNDLE: { bg: 'bg-[#0F1C2E]', text: 'text-[#3DD4B0]', border: 'border-[#3DD4B0]' },
};

// ============================================
// CLIENT COMPONENT
// ============================================

export function AppContentClient({ appData }: { appData: AppPage }) {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => (locale === 'ar' ? ar : en);

  const isFree = appData.tier === 'FREE';
  const tierStyle = tierColors[appData.tier] || tierColors.FREE;
  const Icon = iconMap[appData.category] || Sparkles;

  // Localized data from app-pages
  const localTitle = getText(appData.title, appData.titleAr);
  const localDescription = getText(appData.description, appData.descriptionAr);
  const localCategory = getText(appData.category, appData.categoryAr);

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-8 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            {getText('← Back to Apps', '→ العودة للتطبيقات')}
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-14 h-14 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
              <Icon className="w-7 h-7 text-[#3DD4B0]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold">{localTitle}</h1>
                <Badge className={`${tierStyle.bg} ${tierStyle.text} ${tierStyle.border}`}>
                  {appData.tier}
                </Badge>
              </div>
              <p className="text-slate-400 text-sm">{localCategory}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Card */}
        <Card className="bg-white mb-8">
          <CardContent className="p-8">
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              {localDescription}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                <span>
                  {isFree
                    ? getText('Free Forever', 'مجاني للأبد')
                    : getText(`${appData.tier} Package`, `حزمة ${appData.tier}`)}
                </span>
              </div>
              <Badge variant="outline" className="text-[#1F6F78] border-[#1F6F78]/30">
                {localCategory}
              </Badge>
            </div>

            {/* Action Button */}
            {isFree ? (
              <Link href={`/quiz`}>
                <Button className="w-full sm:w-auto bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold">
                  {getText('Start Free Assessment', 'ابدأ التقييم المجاني')}
                  <ArrowRight className={`w-4 h-4 ${locale === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
            ) : (
              <Link href="/products">
                <Button className="w-full sm:w-auto bg-[#0F1C2E] text-white hover:bg-[#1F6F78] px-8 h-12 font-semibold">
                  <Lock className={`w-4 h-4 ${locale === 'ar' ? 'ml-2' : 'mr-2'}`} />
                  {getText(`Unlock with ${appData.tier} Package`, `افتح مع حزمة ${appData.tier}`)}
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[#3DD4B0]" />
                </div>
                <h3 className="font-semibold text-[#0F1C2E]">
                  {getText('Evidence-Based', 'مبني على الأدلة')}
                </h3>
              </div>
              <p className="text-sm text-slate-600">
                {getText(
                  'Built on research-backed methodologies from psychology and neuroscience.',
                  'مبني على منهجيات مدعومة بالأبحاث من علم النفس والعلوم العصبية.'
                )}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#1F6F78]/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#1F6F78]" />
                </div>
                <h3 className="font-semibold text-[#0F1C2E]">
                  {getText('Quick Implementation', 'تنفيذ سريع')}
                </h3>
              </div>
              <p className="text-sm text-slate-600">
                {getText(
                  'Designed for busy people. Most exercises take just 5-15 minutes.',
                  'مصمم للأشخاص المشغولين. معظم التمارين تستغرق 5-15 دقيقة فقط.'
                )}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#3DD4B0]" />
                </div>
                <h3 className="font-semibold text-[#0F1C2E]">
                  {getText('Progress Tracking', 'تتبع التقدم')}
                </h3>
              </div>
              <p className="text-sm text-slate-600">
                {getText(
                  'Track your transformation journey with built-in metrics and insights.',
                  'تتبع رحلة تحولك مع مقاييس ورؤى مدمجة.'
                )}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#1F6F78]/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#1F6F78]" />
                </div>
                <h3 className="font-semibold text-[#0F1C2E]">
                  {getText('Community Support', 'دعم المجتمع')}
                </h3>
              </div>
              <p className="text-sm text-slate-600">
                {getText(
                  'Join thousands of others on their transformation journey.',
                  'انضم لآلاف الآخرين في رحلة تحولهم.'
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-[#1F6F78] to-[#0F1C2E] border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              {isFree
                ? getText('Ready to Get Started?', 'مستعد للبدء؟')
                : getText('Unlock Your Full Potential', 'أطلق إمكاناتك الكاملة')}
            </h2>
            <p className="text-slate-200 mb-6 max-w-xl mx-auto">
              {isFree
                ? getText(
                    'This free tool is just the beginning. Explore our complete transformation system.',
                    'هذه الأداة المجانية هي مجرد البداية. استكشف نظام التحول الكامل لدينا.'
                  )
                : getText(
                    'Get access to this tool and all others with our transformation packages.',
                    'احصل على الوصول لهذه الأداة وجميع الأدوات الأخرى مع حزم التحول لدينا.'
                  )}
            </p>
            <Link href="/products">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold">
                {getText('View All Packages', 'عرض جميع الحزم')}
                <ArrowRight className={`w-4 h-4 ${locale === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
