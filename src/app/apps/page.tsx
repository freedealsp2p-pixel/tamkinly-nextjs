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

// Access Tier Colors - High contrast for readability
const tierColors: Record<string, { bg: string; text: string; border: string }> = {
  FREE: { bg: 'bg-[#3DD4B0]/20', text: 'text-[#2BC49E]', border: 'border-[#3DD4B0]/50' },
  TRIAL: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  BASIC: { bg: 'bg-[#1F6F78]/20', text: 'text-[#1F6F78]', border: 'border-[#1F6F78]/50' },
  PREMIUM: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  BUNDLE: { bg: 'bg-[#0F1C2E]', text: 'text-[#3DD4B0]', border: 'border-[#3DD4B0]' }
};

// App data
const appsData = [
  {
    slug: 'identity-gap-quiz',
    name: 'Identity Gap Assessment',
    description: 'Discover the gap between who you are and who you want to become. This 3-minute assessment reveals your dominant growth area.',
    icon: Brain,
    color: '#3DD4B0',
    category: 'Assessment',
    tier: 'FREE',
    featured: true,
    freeApp: true,
    duration: '3 min'
  },
  {
    slug: 'values-clarification',
    name: 'Values Clarification Tool',
    description: 'Free interactive tool to identify your top 5 core values. Understand what truly drives your decisions.',
    icon: Heart,
    color: '#E57373',
    category: 'Assessment',
    tier: 'FREE',
    featured: false,
    freeApp: true,
    duration: '5 min'
  },
  {
    slug: 'daily-reflection',
    name: 'Daily Reflection Prompt',
    description: 'Get a free daily identity-focused reflection prompt to build self-awareness. No account required.',
    icon: Sun,
    color: '#FFB74D',
    category: 'Tracking',
    tier: 'FREE',
    featured: false,
    freeApp: true,
    duration: 'Daily'
  },
  {
    slug: 'trial-planner',
    name: '7-Day Trial Planner',
    description: 'Experience the full Identity Recode system for 7 days with guided daily prompts and evidence tracking.',
    icon: Calendar,
    color: '#1F6F78',
    category: 'Planning',
    tier: 'TRIAL',
    featured: false,
    freeApp: false,
    duration: '7 days'
  },
  {
    slug: 'executive-manual',
    name: 'Executive Manual',
    description: 'Complete implementation framework with 6 core protocols for identity transformation.',
    icon: BookOpen,
    color: '#1F6F78',
    category: 'Worksheet',
    tier: 'BASIC',
    featured: true,
    freeApp: false,
    duration: 'PDF'
  },
  {
    slug: 'daily-planner',
    name: '30-Day Identity Planner',
    description: 'Interactive 30-day planner with identity prompts, non-negotiable actions, and evidence tracking.',
    icon: Calendar,
    color: '#3DD4B0',
    category: 'Planning',
    tier: 'BASIC',
    featured: true,
    freeApp: false,
    duration: '30 days'
  },
  {
    slug: 'identity-baseline',
    name: 'Identity Baseline Worksheet',
    description: 'Comprehensive assessment of your identity across 8 key dimensions with personalized insights.',
    icon: User,
    color: '#3DD4B0',
    category: 'Worksheet',
    tier: 'BASIC',
    featured: false,
    freeApp: false,
    duration: '15 min'
  },
  {
    slug: 'environmental-audit',
    name: 'Environmental Audit',
    description: 'Analyze how your physical, digital, and social environment supports or hinders your goals.',
    icon: Home,
    color: '#1F6F78',
    category: 'Worksheet',
    tier: 'BASIC',
    featured: false,
    freeApp: false,
    duration: '10 min'
  },
  {
    slug: 'decision-analysis',
    name: 'Decision Pattern Analysis',
    description: 'Track and analyze your decisions to identify patterns, biases, and improve decision quality.',
    icon: TrendingUp,
    color: '#64B5F6',
    category: 'Analytics',
    tier: 'PREMIUM',
    featured: false,
    freeApp: false,
    duration: 'Ongoing'
  },
  {
    slug: 'evidence-tracking',
    name: 'Evidence Tracking System',
    description: 'Log and track behavioral evidence that supports your identity transformation.',
    icon: BarChart3,
    color: '#FFB74D',
    category: 'Tracking',
    tier: 'PREMIUM',
    featured: false,
    freeApp: false,
    duration: 'Daily'
  },
  {
    slug: 'progress-dashboard',
    name: 'Progress Dashboard',
    description: 'Advanced analytics dashboard tracking your transformation metrics and milestones.',
    icon: BarChart3,
    color: '#8A94A6',
    category: 'Analytics',
    tier: 'PREMIUM',
    featured: false,
    freeApp: false,
    duration: 'Always'
  },
  {
    slug: 'emotion-regulation',
    name: 'Emotion Regulation (ERQ)',
    description: 'Assess your emotional regulation strategies based on the validated ERQ questionnaire.',
    icon: Heart,
    color: '#E57373',
    category: 'Worksheet',
    tier: 'BUNDLE',
    featured: false,
    freeApp: false,
    duration: '10 min'
  },
  {
    slug: 'ai-identity-coach',
    name: 'AI Identity Coach',
    description: 'Get personalized coaching insights and recommendations powered by AI. Your 24/7 transformation companion.',
    icon: Sparkles,
    color: '#3DD4B0',
    category: 'Coaching',
    tier: 'BUNDLE',
    featured: true,
    freeApp: false,
    duration: 'Unlimited',
    comingSoon: true
  },
  {
    slug: 'community-access',
    name: 'Transformation Community',
    description: 'Connect with others on the same journey. Share wins, get support, and stay accountable.',
    icon: Users,
    color: '#1F6F78',
    category: 'Community',
    tier: 'BUNDLE',
    featured: false,
    freeApp: false,
    duration: 'Unlimited'
  },
  {
    slug: 'priority-support',
    name: 'Priority Support',
    description: 'Get priority access to our support team with guaranteed 24-hour response time.',
    icon: Headphones,
    color: '#0F1C2E',
    category: 'Coaching',
    tier: 'BUNDLE',
    featured: false,
    freeApp: false,
    duration: 'Unlimited'
  }
];

// Tier order for priority
const tierOrder = ['BUNDLE', 'PREMIUM', 'BASIC', 'TRIAL', 'FREE'];

// Sort apps by tier
const sortedApps = [...appsData].sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier));

export default function AppsPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>('ALL');

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
    FREE: { count: appsByTier.FREE.length, label: 'Free', price: '$0' },
    TRIAL: { count: appsByTier.TRIAL.length, label: 'Trial', price: '$7' },
    BASIC: { count: appsByTier.BASIC.length, label: 'Basic', price: '$17' },
    PREMIUM: { count: appsByTier.PREMIUM.length, label: 'Premium', price: '$27' },
    BUNDLE: { count: appsByTier.BUNDLE.length, label: 'Bundle', price: '$47' },
  };

  // Generate SoftwareApplication schemas for SEO
  const appSchemas = appsData.map((app) =>
    generateSoftwareAppSchema({
      name: app.name,
      description: app.description,
      url: `/apps/${app.slug}`,
      category: app.category,
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
              <h1 className="text-2xl font-bold">Tamkinly Apps</h1>
              <p className="text-slate-300 text-sm">Choose your transformation path</p>
            </div>
            <Link href="/products">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                View Packages
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
              All Apps ({appsData.length})
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
            Transformation Tools
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Start with Free, Upgrade Anytime
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Access powerful transformation tools based on your package. Start free and unlock more as you grow.
          </p>
        </div>

        {/* Free Apps Section */}
        {selectedTier === 'ALL' && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Badge className={`${tierColors.FREE.bg} ${tierColors.FREE.text} ${tierColors.FREE.border}`}>
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Free Forever - No Purchase Required
              </Badge>
              <Link href="/products">
                <Button variant="link" className="text-[#3DD4B0]">
                  Start Free <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {appsByTier.FREE.map((app) => (
                <AppCard key={app.slug} app={app} isLocked={false} />
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
                    Unlock <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {apps.map((app) => (
                  <AppCard key={app.slug} app={app} isLocked={true} />
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
              Ready to Unlock All Apps?
            </h2>
            <p className="text-slate-200 mb-6 max-w-xl mx-auto">
              Get the Complete Bundle for full access to all 15+ transformation tools, plus AI coaching and community.
            </p>
            <Link href="/products">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold">
                View Packages
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
function AppCard({ app, isLocked }: { app: typeof appsData[0] & { comingSoon?: boolean }; isLocked: boolean }) {
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
            Coming Soon
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
          {app.tier}
        </Badge>
        
        {/* Title */}
        <h3 className="font-semibold text-lg text-[#0F1C2E] mb-2">
          {app.name}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {app.description}
        </p>
        
        {/* Duration */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock className="w-3 h-3" />
          {app.duration}
        </div>
        
        {/* Action */}
        <div className="mt-4">
          {app.comingSoon ? (
            <Link href={`/apps/${app.slug}`}>
              <Button variant="outline" className="w-full" size="sm">
                <Wrench className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </Link>
          ) : app.freeApp ? (
            <Link href={`/apps/${app.slug}`}>
              <Button className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]" size="sm">
                Start Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : isLocked ? (
            <Link href="/products">
              <Button variant="secondary" className="w-full shadow-md" size="sm">
                <Lock className="w-4 h-4 mr-2" />
                Unlock Access
              </Button>
            </Link>
          ) : (
            <Link href={`/apps/${app.slug}`}>
              <Button className="w-full" size="sm" style={{ backgroundColor: app.color, color: 'white' }}>
                Open App
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
