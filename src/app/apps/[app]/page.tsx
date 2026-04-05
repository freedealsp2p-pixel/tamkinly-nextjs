/**
 * Dynamic App Page
 * Uses generateMetadata for SEO-optimized metadata per app
 * Enables Google to index all 20+ apps with unique metadata
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
  CheckCircle2
} from 'lucide-react';
import {
  APP_PAGES,
  getAppPageBySlug,
  getAllAppSlugs,
  AppPage
} from '@/lib/app-pages';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateSoftwareAppSchema, generateBreadcrumbSchema } from '@/lib/seo';

// ============================================
// DYNAMIC METADATA GENERATION
// ============================================

interface PageParams {
  params: Promise<{ app: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { app } = await params;
  const appData = getAppPageBySlug(app);

  if (!appData) {
    return {
      title: 'App Not Found | Tamkinly',
      description: 'The requested app could not be found.',
    };
  }

  const fullUrl = `https://tamkinly.com/apps/${appData.slug}`;
  const imageUrl = appData.image
    ? `https://tamkinly.com${appData.image}`
    : 'https://tamkinly.com/og-image.webp';

  const isFree = appData.tier === 'FREE';
  const tierDescription = isFree
    ? 'Free to use.'
    : `Available in ${appData.tier} package.`;

  return {
    title: `${appData.title} | Tamkinly`,
    description: `${appData.description} ${tierDescription}`,
    keywords: appData.keywords,

    alternates: {
      canonical: fullUrl,
    },

    openGraph: {
      title: appData.title,
      description: appData.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: appData.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: appData.title,
      description: appData.description,
      site: '@tamkinly',
      images: [imageUrl],
    },

    other: {
      'app:tier': appData.tier,
      'app:category': appData.category,
    },
  };
}

// ============================================
// STATIC PARAMS GENERATION
// ============================================

export async function generateStaticParams() {
  return getAllAppSlugs().map((slug) => ({
    app: slug,
  }));
}

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
  BUNDLE: { bg: 'bg-[#0F1C2E]', text: 'text-[#3DD4B0]', border: 'border-[#3DD4B0]' }
};

// ============================================
// APP CONTENT COMPONENT
// ============================================

function AppContent({ appData }: { appData: AppPage }) {
  const isFree = appData.tier === 'FREE';
  const tierStyle = tierColors[appData.tier] || tierColors.FREE;
  const Icon = iconMap[appData.category] || Sparkles;

  // Generate SoftwareApplication schema for SEO
  const appSchema = generateSoftwareAppSchema({
    name: appData.title,
    description: appData.description,
    url: `/apps/${appData.slug}`,
    category: appData.category,
    offers: {
      price: appData.tier === 'FREE' ? 0 : appData.tier === 'TRIAL' ? 7 : appData.tier === 'BASIC' ? 17 : appData.tier === 'PREMIUM' ? 27 : 47,
    },
    aggregateRating: isFree ? { ratingValue: 4.9, reviewCount: 127 } : undefined,
  });

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Apps', url: '/apps' },
    { name: appData.title, url: `/apps/${appData.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd data={[appSchema, breadcrumbSchema]} />

      <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
        {/* Header */}
        <div className="bg-[#0F1C2E] text-white py-8 px-4 border-b border-[#1F6F78]/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
              ← Back to Apps
            </Link>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-14 h-14 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                <Icon className="w-7 h-7 text-[#3DD4B0]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold">{appData.title}</h1>
                  <Badge className={`${tierStyle.bg} ${tierStyle.text} ${tierStyle.border}`}>
                    {appData.tier}
                  </Badge>
                </div>
                <p className="text-slate-400 text-sm">{appData.category}</p>
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
                {appData.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span>
                    {isFree ? 'Free Forever' : `${appData.tier} Package`}
                  </span>
                </div>
                <Badge variant="outline" className="text-[#1F6F78] border-[#1F6F78]/30">
                  {appData.category}
                </Badge>
              </div>

              {/* Action Button */}
              {isFree ? (
                <Link href={`/apps/${appData.slug}`}>
                  <Button className="w-full sm:w-auto bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold">
                    Start Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Link href="/products">
                  <Button className="w-full sm:w-auto bg-[#0F1C2E] text-white hover:bg-[#1F6F78] px-8 h-12 font-semibold">
                    <Lock className="w-4 h-4 mr-2" />
                    Unlock with {appData.tier} Package
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
                  <h3 className="font-semibold text-[#0F1C2E]">Evidence-Based</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Built on research-backed methodologies from psychology and neuroscience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1F6F78]/10 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E]">Quick Implementation</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Designed for busy people. Most exercises take just 5-15 minutes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#3DD4B0]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E]">Progress Tracking</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Track your transformation journey with built-in metrics and insights.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1F6F78]/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E]">Community Support</h3>
                </div>
                <p className="text-sm text-slate-600">
                  Join thousands of others on their transformation journey.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-[#1F6F78] to-[#0F1C2E] border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {isFree ? 'Ready to Get Started?' : 'Unlock Your Full Potential'}
              </h2>
              <p className="text-slate-200 mb-6 max-w-xl mx-auto">
                {isFree
                  ? 'This free tool is just the beginning. Explore our complete transformation system.'
                  : 'Get access to this tool and all others with our transformation packages.'}
              </p>
              <Link href="/products">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold">
                  View All Packages
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

// ============================================
// PAGE COMPONENT
// ============================================

export default async function AppPage({ params }: PageParams) {
  const { app } = await params;
  const appData = getAppPageBySlug(app);

  if (!appData) {
    notFound();
  }

  return <AppContent appData={appData} />;
}
