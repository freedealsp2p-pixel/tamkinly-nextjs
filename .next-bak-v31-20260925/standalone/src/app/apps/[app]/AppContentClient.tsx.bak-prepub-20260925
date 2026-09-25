'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Clock,
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
  Shield,
  Star,
  Target,
  Lightbulb,
  Eye,
  Lock,
} from 'lucide-react';
import { AppPage } from '@/lib/app-pages';
import { AccessCheckResult } from '@/lib/access-guard';
import { AppAccessWrapper } from '@/components/AppAccessWrapper';
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
  Shield,
  Star,
  Target,
  Lightbulb,
  Eye,
  Clock,
};

// ============================================
// TIER CONFIG
// ============================================

const tierColors: Record<string, { bg: string; text: string; border: string }> = {
  FREE: { bg: 'bg-[#3DD4B0]/20', text: 'text-[#2BC49E]', border: 'border-[#3DD4B0]/50' },
  BASIC: { bg: 'bg-[#e6f3f4]', text: 'text-[#2A8A94]', border: 'border-[#cde7e9]' },
  PREMIUM: { bg: 'bg-[#1F6F78]/20', text: 'text-[#1F6F78]', border: 'border-[#1F6F78]/50' },
  MASTERY: { bg: 'bg-[#0F1C2E]', text: 'text-[#3DD4B0]', border: 'border-[#3DD4B0]' },
};

const tierPrices: Record<string, { price: number; productSlug: string; nameEn: string; nameAr: string }> = {
  FREE: { price: 0, productSlug: '', nameEn: 'Free Forever', nameAr: 'مجاني للأبد' },
  BASIC: { price: 7, productSlug: 'basic', nameEn: 'Basic (Monthly)', nameAr: 'أساسي (شهري)' },
  PREMIUM: { price: 17, productSlug: 'premium', nameEn: 'Premium (Monthly)', nameAr: 'مميز (شهري)' },
  MASTERY: { price: 27, productSlug: 'mastery', nameEn: 'Mastery (Monthly)', nameAr: 'إتقان (شهري)' },
};

// ============================================
// TESTIMONIALS
// ============================================

const testimonials = [
  {
    nameEn: 'Sarah M.',
    nameAr: 'سارة م.',
    roleEn: 'Teacher',
    roleAr: 'معلمة',
    textEn: 'I finally understand why I kept falling back to old habits. The identity-based approach changed everything — I\'m not just doing things differently, I\'m becoming someone different.',
    textAr: 'أخيراً فهمت لماذا كنت أعود للعادات القديمة. النهج المبني على الهوية غيّر كل شيء — أنا لا أفعل الأشياء بشكل مختلف فقط، أنا أصبح شخصاً مختلفاً.',
    stars: 5,
  },
  {
    nameEn: 'Ahmad K.',
    nameAr: 'أحمد خ.',
    roleEn: 'Entrepreneur',
    roleAr: 'رائد أعمال',
    textEn: 'The baseline assessment gave me clarity I never had before. In 30 days, my identity clarity score went from 3 to 8. Real, measurable change.',
    textAr: 'تقييم خط الأساس منحني وضوحاً لم أحصل عليه من قبل. في 30 يوماً، ارتفعت درجة وضوح هويتي من 3 إلى 8. تغير حقيقي وقابل للقياس.',
    stars: 5,
  },
  {
    nameEn: 'Lina R.',
    nameAr: 'لينا ر.',
    roleEn: 'Designer',
    roleAr: 'مصممة',
    textEn: 'I\'ve tried every productivity app out there. Tamkinly is different — it doesn\'t just track what you do, it transforms who you are. The daily planner is a game-changer.',
    textAr: 'جربت كل تطبيقات الإنتاجية. تمكينلي مختلف — لا يتتبع ما تفعله فقط، بل يحوّل من أنت. المخطط اليومي يغير قواعد اللعبة.',
    stars: 5,
  },
];

// ============================================
// HOW IT WORKS STEPS
// ============================================

const howItWorksSteps = [
  {
    stepEn: 'Assess',
    stepAr: 'قيّم',
    titleEn: 'Measure Your Current Identity',
    titleAr: 'قِس هويتك الحالية',
    descEn: 'Start with a scientific assessment of where you are now — your identity clarity, self-trust, and value alignment.',
    descAr: 'ابدأ بتقييم علمي لمكانك الآن — وضوح هويتك وثقتك بنفسك وتوافق قيمك.',
    icon: 'BarChart3',
  },
  {
    stepEn: 'Recode',
    stepAr: 'أعد البرمجة',
    titleEn: 'Rewire with Daily Practice',
    titleAr: 'أعد التشكيل بالممارسة اليومية',
    descEn: 'Use structured daily tools — planning, reflection, evidence tracking — to build new identity-consistent neural pathways.',
    descAr: 'استخدم الأدوات اليومية المنظمة — التخطيط والتأمل وتتبع الأدلة — لبناء مسارات عصبية جديدة متوافقة مع الهوية.',
    icon: 'Zap',
  },
  {
    stepEn: 'Transform',
    stepAr: 'تحوّل',
    titleEn: 'Become Who You Choose',
    titleAr: 'كن من تختار',
    descEn: 'Track evidence of your new identity until it becomes automatic. Your transformation is measurable and real.',
    descAr: 'تتبع أدلة هويتك الجديدة حتى تصبح تلقائية. تحولك قابل للقياس وحقيقي.',
    icon: 'TrendingUp',
  },
];

// ============================================
// CLIENT COMPONENT
// ============================================

export function AppContentClient({ appData, serverAccessResult }: { appData: AppPage; serverAccessResult?: AccessCheckResult }) {
  const { locale } = useLocale();
  const isArabic = locale === 'ar';
  const getText = (en: string, ar: string) => (isArabic ? ar : en);
  const dir = isArabic ? 'rtl' : 'ltr';

  const isFree = appData.tier === 'FREE';
  const isMastery = appData.tier === 'MASTERY';
  const tierStyle = tierColors[appData.tier] || tierColors.FREE;
  const tierInfo = tierPrices[appData.tier] || tierPrices.FREE;
  const Icon = iconMap[appData.category] || Sparkles;

  // Localized data from app-pages
  const localTitle = getText(appData.title, appData.titleAr);
  const localDescription = getText(appData.description, appData.descriptionAr);
  const localCategory = getText(appData.category, appData.categoryAr);
  const localValueProp = appData.valuePropEn
    ? getText(appData.valuePropEn, appData.valuePropAr || appData.valuePropEn)
    : localDescription;
  const localMethodology = appData.methodologyEn
    ? getText(appData.methodologyEn, appData.methodologyAr || appData.methodologyEn)
    : null;

  // Features from app data
  const features = appData.features || [];

  // ── P0-4: Server-side access gate (authoritative) ──────────────────────
  // If the server says no access, the client MUST respect it.
  // The AppAccessWrapper still handles UX (code entry) but the server
  // result determines whether content is actually rendered.
  const serverAccessDenied = serverAccessResult && !serverAccessResult.hasAccess;

  // ── P0-4: Server-side access denied UI ──────────────────────────────
  // If the server-side check says no access, show the upgrade/purchase UI
  // instead of the app content. This CANNOT be bypassed by client-side JS.
  if (serverAccessDenied) {
    return (
      <div dir={dir} className="min-h-screen bg-[#F6F8FA]">
        {/* Hero section still shows for SEO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#3DD4B0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1F6F78]/10 rounded-full blur-3xl" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <Link
              href="/apps"
              className="inline-flex items-center gap-1.5 text-[#3DD4B0]/80 hover:text-[#3DD4B0] text-sm mb-8 transition-colors"
            >
              <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
              {getText('Back to All Apps', 'العودة لجميع التطبيقات')}
            </Link>

            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3DD4B0]/10 mb-6">
                <Lock className="w-8 h-8 text-[#3DD4B0]" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {localTitle}
              </h1>

              <Badge className={`${tierStyle.bg} ${tierStyle.text} ${tierStyle.border} px-3 py-1 text-sm font-medium mb-6`}>
                {getText(`${appData.tier} Package`, `حزمة ${appData.tier}`)}
              </Badge>

              <p className="text-white/70 text-lg mb-8">
                {localDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Access denied section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-lg mx-auto text-center">
            <Card className="border-2 border-red-100 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mb-4">
                  <Shield className="w-7 h-7 text-red-500" />
                </div>

                <h2 className="text-2xl font-bold text-[#0F1C2E] mb-2">
                  {getText('Access Required', 'يتطلب الوصول')}
                </h2>

                <p className="text-gray-600 mb-6">
                  {serverAccessResult?.reason || getText(
                    'This app requires a paid subscription. Sign in or upgrade to access.',
                    'هذا التطبيق يتطلب اشتراكاً مدفوعاً. سجّل الدخول أو قم بالترقية للوصول.'
                  )}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/account">
                    <Button className="bg-[#0F1C2E] hover:bg-[#0F1C2E]/90 text-white px-6 py-3">
                      {getText('Sign In', 'تسجيل الدخول')}
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button className="bg-[#3DD4B0] hover:bg-[#3DD4B0]/90 text-[#0F1C2E] px-6 py-3">
                      {getText('Upgrade Now', 'ترقية الآن')}
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    {getText(
                      `Required: ${appData.tier} plan (${tierInfo.price > 0 ? '$' + tierInfo.price : 'Free'})`,
                      `مطلوب: خطة ${appData.tier} (${tierInfo.price > 0 ? '$' + tierInfo.price : 'مجاني'})`
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  // ── P0-4: Server-side access denied UI ──────────────────────────────
  // If the server-side check says no access, show the upgrade/purchase UI
  // instead of the app content. This CANNOT be bypassed by client-side JS.
  if (serverAccessDenied) {
    return (
      <div dir={dir} className="min-h-screen bg-[#F6F8FA]">
        {/* Hero section still shows for SEO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#3DD4B0]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1F6F78]/10 rounded-full blur-3xl" />

          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
            <Link
              href="/apps"
              className="inline-flex items-center gap-1.5 text-[#3DD4B0]/80 hover:text-[#3DD4B0] text-sm mb-8 transition-colors"
            >
              <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
              {getText('Back to All Apps', 'العودة لجميع التطبيقات')}
            </Link>

            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3DD4B0]/10 mb-6">
                <Lock className="w-8 h-8 text-[#3DD4B0]" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {localTitle}
              </h1>

              <Badge className={`${tierStyle.bg} ${tierStyle.text} ${tierStyle.border} px-3 py-1 text-sm font-medium mb-6`}>
                {getText(`${appData.tier} Package`, `حزمة ${appData.tier}`)}
              </Badge>

              <p className="text-white/70 text-lg mb-8">
                {localDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Access denied section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-lg mx-auto text-center">
            <Card className="border-2 border-red-100 bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mb-4">
                  <Shield className="w-7 h-7 text-red-500" />
                </div>

                <h2 className="text-2xl font-bold text-[#0F1C2E] mb-2">
                  {getText('Access Required', 'يتطلب الوصول')}
                </h2>

                <p className="text-gray-600 mb-6">
                  {serverAccessResult?.reason || getText(
                    'This app requires a paid subscription. Sign in or upgrade to access.',
                    'هذا التطبيق يتطلب اشتراكاً مدفوعاً. سجّل الدخول أو قم بالترقية للوصول.'
                  )}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/account">
                    <Button className="bg-[#0F1C2E] hover:bg-[#0F1C2E]/90 text-white px-6 py-3">
                      {getText('Sign In', 'تسجيل الدخول')}
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button className="bg-[#3DD4B0] hover:bg-[#3DD4B0]/90 text-[#0F1C2E] px-6 py-3">
                      {getText('Upgrade Now', 'ترقية الآن')}
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    {getText(
                      `Required: ${appData.tier} plan (${tierInfo.price > 0 ? '$' + tierInfo.price : 'Free'})`,
                      `مطلوب: خطة ${appData.tier} (${tierInfo.price > 0 ? '$' + tierInfo.price : 'مجاني'})`
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div dir={dir} className="min-h-screen bg-[#F6F8FA]">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" />
        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#3DD4B0]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1F6F78]/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Back link */}
          <Link
            href="/apps"
            className="inline-flex items-center gap-1.5 text-[#3DD4B0]/80 hover:text-[#3DD4B0] text-sm mb-8 transition-colors"
          >
            <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
            {getText('Back to All Apps', 'العودة لجميع التطبيقات')}
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Value proposition */}
            <div>
              {/* Tier badge */}
              <div className="flex items-center gap-3 mb-6">
                <Badge className={`${tierStyle.bg} ${tierStyle.text} ${tierStyle.border} px-3 py-1 text-sm font-medium`}>
                  {appData.tier === 'FREE'
                    ? getText('Free Forever', 'مجاني للأبد')
                    : getText(`${appData.tier} Package`, `حزمة ${appData.tier}`)}
                </Badge>
                {!isFree && tierInfo.price > 0 && (
                  <Badge className="bg-white/10 text-white border-white/20 px-3 py-1 text-sm">
                    ${tierInfo.price}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {localTitle.split(' | ')[0]}
              </h1>

              {/* Value proposition */}
              <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                {localValueProp}
              </p>

              {/* Category + time tags */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-[#7AEEE0] text-sm">
                  <Icon className="w-4 h-4" />
                  <span>{localCategory}</span>
                </div>
                <div className="flex items-center gap-2 text-[#7AEEE0]/70 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>
                    {isFree
                      ? getText('No time limit', 'بدون حد زمني')
                      : getText('5-15 min/day', '5-15 دقيقة/يوم')}
                  </span>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {isFree ? (
                  <>
                    <Link href={`/apps/${appData.slug}`}>
                      <Button
                        className="w-full sm:w-auto bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold text-base"
                      >
                        {getText('Start Free', 'ابدأ مجاناً')}
                        <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                      </Button>
                    </Link>
                    <Link href="/products">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 h-12 font-medium text-base"
                      >
                        {getText('View All Packages', 'عرض جميع الحزم')}
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href={`/products/${tierInfo.productSlug}`}>
                      <Button
                        className="w-full sm:w-auto bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold text-base"
                      >
                        {getText(`Get Access — $${tierInfo.price}`, `احصل على الوصول — $${tierInfo.price}`)}
                        <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                      </Button>
                    </Link>
                    <Link href="/apps">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 h-12 font-medium text-base"
                      >
                        {getText('Try Free Apps First', 'جرب التطبيقات المجانية أولاً')}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Right: App preview card */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#3DD4B0]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {localTitle.split(' | ')[0]}
                    </h3>
                    <p className="text-slate-400 text-sm">{localCategory}</p>
                  </div>
                </div>

                {/* Feature list preview */}
                <div className="space-y-3 mb-6">
                  {features.slice(0, 4).map((f, i) => {
                    const FeatureIcon = iconMap[f.icon] || CheckCircle2;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#1F6F78]/30 flex items-center justify-center shrink-0 mt-0.5">
                          <FeatureIcon className="w-4 h-4 text-[#7AEEE0]" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">
                            {getText(f.titleEn, f.titleAr)}
                          </p>
                          <p className="text-slate-400 text-xs">
                            {getText(f.descriptionEn, f.descriptionAr)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Price tag for paid */}
                {!isFree && tierInfo.price > 0 && (
                  <div className="flex items-center justify-between p-4 bg-[#0F1C2E]/50 rounded-xl border border-white/10">
                    <div>
                      <p className="text-slate-400 text-xs">
                        {getText('Included in', 'مضمّن في')}
                      </p>
                      <p className="text-white font-semibold">
                        {getText(tierInfo.nameEn, tierInfo.nameAr)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#3DD4B0]">${tierInfo.price}</p>
                      <p className="text-slate-400 text-xs">{getText('monthly', 'شهري')}</p>
                    </div>
                  </div>
                )}

                {/* Free badge */}
                {isFree && (
                  <div className="flex items-center justify-center p-4 bg-[#3DD4B0]/10 rounded-xl border border-[#3DD4B0]/20">
                    <Sparkles className="w-5 h-5 text-[#3DD4B0] mr-2" />
                    <span className="text-[#3DD4B0] font-semibold">
                      {getText('100% Free — No Credit Card Required', 'مجاني 100% — بدون بطاقة ائتمان')}
                    </span>
                  </div>
                )}
              </div>

              {/* Floating decoration */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#3DD4B0]/10 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURES SECTION
          ============================================ */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="bg-[#3DD4B0]/10 text-[#1F6F78] border-[#1F6F78]/20 mb-4">
              {getText('What You Get', 'ما ستحصل عليه')}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E] mb-3">
              {getText('Powerful Features', 'ميزات قوية')}
            </h2>
            <p className="text-[#8A94A6] max-w-lg mx-auto">
              {getText(
                'Every feature is designed to move you closer to the person you want to become.',
                'كل ميزة مصممة لاقترابك من الشخص الذي تريد أن تصبحه.'
              )}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const FeatureIcon = iconMap[f.icon] || Sparkles;
              const colorSet = i % 2 === 0
                ? { bg: 'bg-[#3DD4B0]/10', icon: 'text-[#3DD4B0]', accent: 'bg-[#3DD4B0]' }
                : { bg: 'bg-[#1F6F78]/10', icon: 'text-[#1F6F78]', accent: 'bg-[#1F6F78]' };
              return (
                <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl ${colorSet.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <FeatureIcon className={`w-6 h-6 ${colorSet.icon}`} />
                    </div>
                    <h3 className="font-semibold text-[#0F1C2E] mb-2">
                      {getText(f.titleEn, f.titleAr)}
                    </h3>
                    <p className="text-sm text-[#8A94A6] leading-relaxed">
                      {getText(f.descriptionEn, f.descriptionAr)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          HOW IT WORKS SECTION
          ============================================ */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#F6F8FA] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-14">
            <Badge className="bg-[#1F6F78]/10 text-[#1F6F78] border-[#1F6F78]/20 mb-4">
              {getText('How It Works', 'كيف يعمل')}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E] mb-3">
              {getText('3 Steps to Transformation', '3 خطوات للتحول')}
            </h2>
            <p className="text-[#8A94A6] max-w-lg mx-auto">
              {getText(
                'A proven process backed by psychology and neuroscience research.',
                'عملية مثبتة مدعومة بأبحاث علم النفس والعلوم العصبية.'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, i) => {
              const StepIcon = iconMap[step.icon] || Sparkles;
              return (
                <div key={i} className="relative text-center">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1F6F78] text-white text-sm font-bold mb-4">
                    {i + 1}
                  </div>
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4">
                    <StepIcon className="w-8 h-8 text-[#1F6F78]" />
                  </div>
                  {/* Label */}
                  <Badge variant="outline" className="text-[#3DD4B0] border-[#3DD4B0]/30 mb-3">
                    {getText(step.stepEn, step.stepAr)}
                  </Badge>
                  {/* Title */}
                  <h3 className="font-semibold text-[#0F1C2E] mb-2 text-lg">
                    {getText(step.titleEn, step.titleAr)}
                  </h3>
                  {/* Description */}
                  <p className="text-sm text-[#8A94A6] leading-relaxed">
                    {getText(step.descEn, step.descAr)}
                  </p>

                  {/* Connector line */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#3DD4B0]/40 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================
          WHY THIS WORKS / METHODOLOGY SECTION
          ============================================ */}
      {localMethodology && (
        <section className="py-16 sm:py-20 bg-[#0F1C2E]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-[#3DD4B0]/30 mb-4">
                  {getText('Why This Works', 'لماذا يعمل هذا')}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  {getText('Grounded in Science', 'مبني على العلم')}
                </h2>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {localMethodology}
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    getText('Peer-Reviewed', 'مراجع من الأقران'),
                    getText('Evidence-Based', 'مبني على الأدلة'),
                    getText('Clinically Validated', 'معتمد سريرياً'),
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#1F6F78]/20 text-[#7AEEE0] text-xs font-medium rounded-full border border-[#1F6F78]/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '50+', labelEn: 'Years of Research', labelAr: 'عاماً من الأبحاث' },
                  { num: '3x', labelEn: 'More Effective', labelAr: 'أكثر فعالية' },
                  { num: '82', labelEn: 'Cultures Validated', labelAr: 'ثقافة معتمدة' },
                  { num: '65%', labelEn: 'Higher Success Rate', labelAr: 'معدل نجاح أعلى' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center"
                  >
                    <p className="text-2xl font-bold text-[#3DD4B0] mb-1">{stat.num}</p>
                    <p className="text-slate-400 text-xs">
                      {getText(stat.labelEn, stat.labelAr)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          SOCIAL PROOF / TESTIMONIALS
          ============================================ */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="bg-[#C97B7B]/10 text-[#C97B7B] border-[#C97B7B]/20 mb-4">
              {getText('Real Results', 'نتائج حقيقية')}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E] mb-3">
              {getText('What People Are Saying', 'ماذا يقول الناس')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-[#3DD4B0] text-[#3DD4B0]" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-sm text-[#0F1C2E] leading-relaxed mb-6">
                    &ldquo;{getText(t.textEn, t.textAr)}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1F6F78]/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#1F6F78]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F1C2E]">
                        {getText(t.nameEn, t.nameAr)}
                      </p>
                      <p className="text-xs text-[#8A94A6]">
                        {getText(t.roleEn, t.roleAr)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          ACCESS GATE / APP CONTENT (for paid apps)
          ============================================ */}
      {!isFree && (
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <AppAccessWrapper
              tier={appData.tier}
              appSlug={appData.slug}
              appTitle={appData.title}
              appTitleAr={appData.titleAr}
              appDescription={appData.description}
              appDescriptionAr={appData.descriptionAr}
            >
              <div className="p-6 bg-white rounded-xl border border-[#3DD4B0]/20">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#3DD4B0]" />
                  <h3 className="text-lg font-semibold text-[#0F1C2E]">
                    {getText('Interactive Tool Unlocked', 'أداة تفاعلية مفتوحة')}
                  </h3>
                </div>
                <p className="text-sm text-[#8A94A6] mb-4">
                  {getText(
                    'You now have full access to this tool. Your progress is saved automatically.',
                    'لديك الآن وصول كامل لهذه الأداة. يتم حفظ تقدمك تلقائياً.'
                  )}
                </p>
                <Link href={`/apps/${appData.slug}`}>
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-6 h-10 font-semibold">
                    {getText('Launch Tool', 'فتح الأداة')}
                    <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </Link>
              </div>
            </AppAccessWrapper>
          </div>
        </section>
      )}

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F1C2E] via-[#1F6F78] to-[#2A8A94]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3DD4B0]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#7AEEE0]/10 rounded-full blur-3xl" />

            <div className="relative p-8 sm:p-12 text-center">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-[#3DD4B0]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {isFree
                  ? getText('Ready to Start Your Journey?', 'مستعد لبدء رحلتك؟')
                  : getText('Unlock Your Full Potential', 'أطلق إمكاناتك الكاملة')}
              </h2>

              <p className="text-slate-200 mb-8 max-w-xl mx-auto leading-relaxed">
                {isFree
                  ? getText(
                      'This free tool is your first step. Experience the Tamkinly approach to identity transformation — no commitment required.',
                      'هذه الأداة المجانية هي خطوتك الأولى. جرب نهج تمكينلي لتحويل الهوية — بدون أي التزام.'
                    )
                  : getText(
                      `Get full access to this tool plus everything else in the ${tierInfo.nameEn}. Start your transformation today.`,
                      `احصل على وصول كامل لهذه الأداة وكل شيء آخر في ${tierInfo.nameAr}. ابدأ تحولك اليوم.`
                    )}
              </p>

              {/* What you get (paid) */}
              {!isFree && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  {features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-[#7AEEE0] text-sm">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{getText(f.titleEn, f.titleAr)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {isFree ? (
                  <Link href={`/apps/${appData.slug}`}>
                    <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold text-base">
                      {getText('Start Free Now', 'ابدأ مجاناً الآن')}
                      <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/products/${tierInfo.productSlug}`}>
                    <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold text-base">
                      {getText(`Get Access — $${tierInfo.price}`, `احصل على الوصول — $${tierInfo.price}`)}
                      <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </Button>
                  </Link>
                )}
                <Link href="/products">
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 h-12 font-medium text-base"
                  >
                    {getText('Compare All Packages', 'قارن جميع الحزم')}
                  </Button>
                </Link>
              </div>

              {/* Money back guarantee (paid) */}
              {!isFree && (
                <div className="mt-6 flex items-center justify-center gap-2 text-white/50 text-xs">
                  <Shield className="w-3.5 h-3.5" />
                  <span>
                    {getText(
                      '30-day money-back guarantee — no questions asked',
                      'ضمان استرداد 30 يوماً — بدون أسئلة'
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER SPACER
          ============================================ */}
      <div className="h-8" />
    </div>
  );
}


