'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  CheckCircle2, 
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
  FileText,
  Target,
  Zap,
  Shield,
  Clock,
  Star,
  Wrench
} from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateSoftwareAppSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';

// Access Tier Colors - High contrast for readability
const tierColors: Record<string, { bg: string; text: string; border: string }> = {
  FREE: { bg: 'bg-[#3DD4B0]/20', text: 'text-[#2BC49E]', border: 'border-[#3DD4B0]/50' },
  TRIAL: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  BASIC: { bg: 'bg-[#1F6F78]/20', text: 'text-[#1F6F78]', border: 'border-[#1F6F78]/50' },
  PREMIUM: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  BUNDLE: { bg: 'bg-[#0F1C2E]', text: 'text-[#3DD4B0]', border: 'border-[#3DD4B0]' }
};

// App icons mapping
const appIconMap: Record<string, React.ElementType> = {
  'identity-gap-quiz': Brain,
  'values-clarification': Heart,
  'daily-reflection': Sun,
  'trial-planner': Calendar,
  'executive-manual': BookOpen,
  'daily-planner': Calendar,
  'identity-baseline': User,
  'environmental-audit': Home,
  'decision-analysis': TrendingUp,
  'evidence-tracking': BarChart3,
  'progress-dashboard': BarChart3,
  'emotion-regulation': Heart,
  'ai-identity-coach': Sparkles,
  'community-access': Users,
  'priority-support': Headphones,
};

// App data (non-translatable fields only)
const appsData = [
  { slug: 'identity-gap-quiz', icon: Brain, color: '#3DD4B0', tier: 'FREE', featured: true, freeApp: true, duration: '3 min', comingSoon: false, appKey: 'identityGapQuiz' },
  { slug: 'values-clarification', icon: Heart, color: '#E57373', tier: 'FREE', featured: false, freeApp: true, duration: '5 min', comingSoon: false, appKey: 'valuesClarification' },
  { slug: 'daily-reflection', icon: Sun, color: '#FFB74D', tier: 'FREE', featured: false, freeApp: true, duration: 'Daily', comingSoon: false, appKey: 'dailyReflection' },
  { slug: 'trial-planner', icon: Calendar, color: '#1F6F78', tier: 'TRIAL', featured: false, freeApp: false, duration: '7 days', comingSoon: false, appKey: 'trialPlanner' },
  { slug: 'executive-manual', icon: BookOpen, color: '#1F6F78', tier: 'BASIC', featured: true, freeApp: false, duration: 'PDF', comingSoon: false, appKey: 'executiveManual' },
  { slug: 'daily-planner', icon: Calendar, color: '#3DD4B0', tier: 'BASIC', featured: true, freeApp: false, duration: '30 days', comingSoon: false, appKey: 'dailyPlanner' },
  { slug: 'identity-baseline', icon: User, color: '#3DD4B0', tier: 'BASIC', featured: false, freeApp: false, duration: '15 min', comingSoon: false, appKey: 'identityBaseline' },
  { slug: 'environmental-audit', icon: Home, color: '#1F6F78', tier: 'BASIC', featured: false, freeApp: false, duration: '10 min', comingSoon: false, appKey: 'environmentalAudit' },
  { slug: 'decision-analysis', icon: TrendingUp, color: '#64B5F6', tier: 'PREMIUM', featured: false, freeApp: false, duration: 'Ongoing', comingSoon: false, appKey: 'decisionAnalysis' },
  { slug: 'evidence-tracking', icon: BarChart3, color: '#FFB74D', tier: 'PREMIUM', featured: false, freeApp: false, duration: 'Daily', comingSoon: false, appKey: 'evidenceTracking' },
  { slug: 'progress-dashboard', icon: BarChart3, color: '#8A94A6', tier: 'PREMIUM', featured: false, freeApp: false, duration: 'Always', comingSoon: false, appKey: 'progressDashboard' },
  { slug: 'emotion-regulation', icon: Heart, color: '#E57373', tier: 'BUNDLE', featured: false, freeApp: false, duration: '10 min', comingSoon: false, appKey: 'emotionRegulation' },
  { slug: 'ai-identity-coach', icon: Sparkles, color: '#3DD4B0', tier: 'BUNDLE', featured: true, freeApp: false, duration: 'Unlimited', comingSoon: true, appKey: 'aiIdentityCoach' },
  { slug: 'community-access', icon: Users, color: '#1F6F78', tier: 'BUNDLE', featured: false, freeApp: false, duration: 'Unlimited', comingSoon: false, appKey: 'communityAccess' },
  { slug: 'priority-support', icon: Headphones, color: '#0F1C2E', tier: 'BUNDLE', featured: false, freeApp: false, duration: 'Unlimited', comingSoon: false, appKey: 'prioritySupport' },
];

// Tier order for priority
const tierOrder = ['BUNDLE', 'PREMIUM', 'BASIC', 'TRIAL', 'FREE'];

// Sort apps by tier
const sortedApps = [...appsData].sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier));

export default function AppsPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>('ALL');
  const t = useTranslations("appsPage");
  const { locale } = useLocale();

  // Get translated duration
  const getDuration = (duration: string) => {
    try {
      const translated = t(`durationLabels.${duration}`);
      if (translated && !translated.startsWith('durationLabels.')) return translated;
    } catch {}
    return duration;
  };

  // Filter apps based on selected tier
  const filteredApps = selectedTier === 'ALL' 
    ? appsData 
    : appsData.filter(app => app.tier === selectedTier);

  // Group apps by tier
  const appsByTier = {
    FREE: appsData.filter(app => app.tier === 'FREE'),
    TRIAL: appsData.filter(app => app.tier === 'TRIAL'),
    BASIC: appsData.filter(app => app.tier === 'BASIC'),
    PREMIUM: appsData.filter(app => app.tier === 'PREMIUM'),
    BUNDLE: appsData.filter(app => app.tier === 'BUNDLE'),
  };

  // Get tier stats
  const tierStats = {
    FREE: { count: appsByTier.FREE.length, label: t('tierLabels.FREE'), price: '$0' },
    TRIAL: { count: appsByTier.TRIAL.length, label: t('tierLabels.TRIAL'), price: '$7' },
    BASIC: { count: appsByTier.BASIC.length, label: t('tierLabels.BASIC'), price: '$17' },
    PREMIUM: { count: appsByTier.PREMIUM.length, label: t('tierLabels.PREMIUM'), price: '$27' },
    BUNDLE: { count: appsByTier.BUNDLE.length, label: t('tierLabels.BUNDLE'), price: '$47' },
  };

  // Generate SoftwareApplication schemas for SEO
  const appSchemas = appsData.map((app) =>
    generateSoftwareAppSchema({
      name: t(`apps.${app.appKey}.name`),
      description: t(`apps.${app.appKey}.description`),
      url: `/apps/${app.slug}`,
      category: t(`apps.${app.appKey}.category`),
      offers: {
        price: app.tier === 'FREE' ? 0 : app.tier === 'TRIAL' ? 7 : app.tier === 'BASIC' ? 17 : app.tier === 'PREMIUM' ? 27 : 47,
      },
      aggregateRating: app.featured ? { ratingValue: 4.9, reviewCount: 127 } : undefined,
    })
  );

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Apps', url: '/apps' },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd data={[...appSchemas, breadcrumbSchema]} />
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-8 px-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{t('headerTitle')}</h1>
              <p className="text-slate-300 text-sm">{t('headerSubtitle')}</p>
            </div>
            <Link href="/products">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                {t('viewPackages')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tier Filter */}
      <div className="bg-white border-b border-slate-200 sticky top-[64px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-3">
            <Button
              onClick={() => setSelectedTier('ALL')}
              className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
                selectedTier === 'ALL' 
                  ? 'bg-[#0F1C2E] text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t('allApps').replace('{count}', String(appsData.length))}
            </Button>
            {Object.entries(tierStats).map(([tier, stats]) => (
              <Button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                  selectedTier === tier 
                    ? 'bg-[#0F1C2E] text-white shadow-md' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {stats.label} ({stats.count}) - {stats.price}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#3DD4B0]/10 text-[#3DD4B0]">
            <Sparkles className="w-3.5 h-3.5 mr-1" />
            {t('heroBadge')}
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Free Apps Section */}
        {selectedTier === 'ALL' && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge className={`${tierColors.FREE.bg} ${tierColors.FREE.text} ${tierColors.FREE.border}`}>
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                {t('freeForever')}
              </Badge>
              <Link href="/products">
                <Button variant="link" className="text-[#3DD4B0]">
                  {t('startFree')} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {appsByTier.FREE.map((app) => (
                <AppCard key={app.slug} app={app} isLocked={false} t={t} />
              ))}
            </div>
          </div>
        )}

        {/* Other Tiers */}
        {Object.entries(appsByTier)
          .filter(([tier]) => tier !== 'FREE' && (selectedTier === 'ALL' || selectedTier === tier))
          .map(([tier, apps]) => (
            <div key={tier} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Badge className={`bg-[#0F1C2E] text-[#3DD4B0] border border-[#3DD4B0]/50`}>
                  {tierStats[tier as keyof typeof tierStats].label} Package - {tierStats[tier as keyof typeof tierStats].price}
                </Badge>
                <Link href="/products">
                  <Button variant="link" className="text-[#3DD4B0]">
                    {t('unlock')} <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {apps.map((app) => (
                  <AppCard key={app.slug} app={app} isLocked={true} t={t} />
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12">
        <Card className="bg-gradient-to-r from-[#1F6F78] to-[#0F1C2E] border-0">
          <CardContent className="p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              {t('ctaTitle')}
            </h2>
            <p className="text-slate-200 mb-6 max-w-xl mx-auto">
              {t('ctaSubtitle')}
            </p>
            <Link href="/products">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold">
                {t('viewPackages')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}

// App Card Component
function AppCard({ app, isLocked, t }: { 
  app: typeof appsData[0]; 
  isLocked: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  const Icon = app.icon;
  const tierStyle = tierColors[app.tier as keyof typeof tierColors];

  return (
    <Card className={`relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white ${
      app.featured ? 'ring-2 ring-[#3DD4B0]/50' : ''
    } ${app.comingSoon ? 'opacity-90' : ''}`}>
      {app.comingSoon && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-amber-500/20 text-amber-600 border border-amber-500/50 text-xs">
            <Wrench className="w-3 h-3 mr-1" />
            {t('comingSoon')}
          </Badge>
        </div>
      )}
      {!app.comingSoon && isLocked && (
        <div className="absolute top-4 right-4 z-10">
          <Lock className="w-5 h-5 text-slate-400" />
        </div>
      )}
      
      <CardContent className="p-6">
        {/* Icon */}
        <div 
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
          style={{ backgroundColor: `${app.color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color: app.color }} />
        </div>
        
        {/* Badge */}
        <Badge className={`${tierStyle.bg} ${tierStyle.text} mb-3`}>
          {t(`tierLabels.${app.tier}`)}
        </Badge>
        
        {/* Title */}
        <h3 className="font-semibold text-lg text-[#0F1C2E] mb-2">
          {t(`apps.${app.appKey}.name`)}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {t(`apps.${app.appKey}.description`)}
        </p>
        
        {/* Duration */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock className="w-3 h-3" />
          {getDuration(app.duration)}
        </div>
        
        {/* Action */}
        <div className="mt-4">
          {app.comingSoon ? (
            <Link href={`/apps/${app.slug}`}>
              <Button variant="outline" className="w-full" size="sm">
                <Wrench className="w-4 h-4 mr-2" />
                {t('viewDetails')}
              </Button>
            </Link>
          ) : app.freeApp ? (
            <Link href={app.slug === 'identity-gap-quiz' ? '/quiz' : `/apps/${app.slug}`}>
              <Button className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]" size="sm">
                {t('startFree')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : isLocked ? (
            <Link href={
              app.tier === 'TRIAL' ? '/products/trial' :
              app.tier === 'BASIC' ? '/products/planner' :
              app.tier === 'PREMIUM' ? '/products/premium' :
              app.tier === 'BUNDLE' ? '/products/bundle' :
              '/products'
            }>
              <Button className="w-full bg-[#0F1C2E] text-white hover:bg-[#1a2d47] shadow-md" size="sm">
                <Lock className="w-4 h-4 mr-2" />
                {t('openAccess')} - ${app.tier === 'TRIAL' ? '7' : app.tier === 'BASIC' ? '17' : app.tier === 'PREMIUM' ? '27' : '47'}
              </Button>
            </Link>
          ) : (
            <Link href={`/apps/${app.slug}`}>
              <Button className="w-full" size="sm" style={{ backgroundColor: app.color, color: 'white' }}>
                {t('openApp')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
