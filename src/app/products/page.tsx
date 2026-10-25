'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Zap, 
  Download,
  Star,
  Clock,
  FileText,
  Heart,
  Sparkles,
  Monitor,
  BookOpen,
  Calendar,
  Award,
  ExternalLink,
  Loader2,
  Target,
  Users,
  TrendingUp,
  Lock,
  Brain,
  Headphones,
  Sun,
  User,
  Home,
  GitBranch,
  BarChart3,
  ShoppingCart,
  Check,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "@/lib/cart-client";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { useTranslations, useLocale } from "@/components/providers/LocaleProvider";

import ProductRecommender from "@/components/products/ProductRecommender";

// Product URLs mapping — PRICING MODEL V2 (2026-10-21): one-time payments + legacy aliases
// 'premium' = Identity Recode Planner $9.99; 'mastery' = Mastery $27; 'basic' legacy → planner page
const PRODUCT_URLS: Record<string, string> = {
  'basic': '/products/premium',
  'premium': '/products/premium',
  'mastery': '/products/mastery',
  // Legacy aliases (redirect to new pages)
  'trial': '/products/premium',
  'planner': '/products/premium',
  'bundle': '/products/mastery',
};

// App icons mapping
const appIcons: Record<string, React.ElementType> = {
  'Brain': Brain,
  'Heart': Heart,
  'Sun': Sun,
  'Calendar': Calendar,
  'User': User,
  'Home': Home,
  'GitBranch': GitBranch,
  'TrendingUp': TrendingUp,
  'BarChart3': BarChart3,
  'Sparkles': Sparkles,
  'Users': Users,
  'Headphones': Headphones,
  'BookOpen': BookOpen,
  'FileText': FileText,
};

// Hero Section
function HeroSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-16 lg:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(61, 212, 176, 0.15) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 border-[#3DD4B0]/30 text-[#3DD4B0] bg-[#3DD4B0]/10">
            <Zap className="w-3.5 h-3.5 mr-2" />
            {t('heroBadge')}
          </Badge>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('heroTitle')}
            <span className="text-[#3DD4B0]">{t('heroTitleHighlight')}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            {t('heroSubtitle')}
            <span className="text-white font-semibold">{t('heroSubtitleBold')}</span>
            {t('heroSubtitleEnd')}
          </p>

          {/* Default CTA — straight to the recommended plan */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link href="/products/premium">
              <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-14 font-semibold shadow-xl">
                {t('heroCtaPrimary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#plans">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 h-14 font-semibold bg-transparent">
                {t('heroCtaSecondary')}
              </Button>
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
              <Users className="h-5 w-5 text-[#3DD4B0]" />
              <span className="text-white text-sm">
                <span className="font-bold">20</span> {t('heroAppsCount')}
              </span>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#3DD4B0]" />
              <span>{t('trustMoneyBack')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-[#3DD4B0]" />
              <span>{t('trustInstantAccess')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#3DD4B0]" />
              <span>{t('trustCancelAnytime')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// App Access Matrix Section
function AppMatrixSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  // Build allApps using translations — the products comparison matrix (16 rows).
  // PLANNER ($9.99) unlocks everything the former BASIC + PREMIUM monthly plans had.
  // MASTERY ($27) unlocks everything (all 16 rows).
  // Row order MUST match translations `productsPage.matrixApps` index-for-index (0..15).
  // `free` = included in the FREE tier (open to everyone — /apps gate: tier FREE, no code).
  // Free tools stay accessible to Planner/Mastery buyers as well, hence premium/mastery true.
  // AUD-1 fix (founder directive 2026-10-25): labels and flags were misaligned — ERQ,
  // AI Coach, Community and Priority Support were shown as Planner-included, and the
  // FREE column rendered dashes for every row (Identity Gap Assessment not marked free).
  const allApps = [
    // FREE web apps (open to everyone)
    { nameKey: 'identity-gap-quiz', free: true, basic: false, premium: true, mastery: true },
    { nameKey: 'values-clarification', free: true, basic: false, premium: true, mastery: true },
    { nameKey: 'daily-reflection', free: true, basic: false, premium: true, mastery: true },
    // Included in Planner — the former BASIC app (7-Day Discipline Journey)
    { nameKey: 'trial-planner', free: false, basic: true, premium: true, mastery: true },
    // Included in Planner — the former PREMIUM core tools (7)
    { nameKey: 'executive-manual', free: false, basic: false, premium: true, mastery: true },
    { nameKey: 'daily-planner', free: false, basic: false, premium: true, mastery: true },
    { nameKey: 'identity-baseline', free: false, basic: false, premium: true, mastery: true },
    { nameKey: 'environmental-audit', free: false, basic: false, premium: true, mastery: true },
    { nameKey: 'decision-analysis', free: false, basic: false, premium: true, mastery: true },
    { nameKey: 'evidence-tracking', free: false, basic: false, premium: true, mastery: true },
    { nameKey: 'progress-dashboard', free: false, basic: false, premium: true, mastery: true },
    // MASTERY-only apps (4)
    { nameKey: 'emotion-regulation', free: false, basic: false, premium: false, mastery: true },
    { nameKey: 'ai-identity-coach', free: false, basic: false, premium: false, mastery: true },
    { nameKey: 'community-access', free: false, basic: false, premium: false, mastery: true },
    { nameKey: 'priority-support', free: false, basic: false, premium: false, mastery: true },
    // FREE — Habit Tracker (daily, open to everyone)
    { nameKey: 'habit-tracker', free: true, basic: false, premium: true, mastery: true },
  ];

  // Product data for the matrix — PRICING MODEL V2: one-time payments, rule of three
  // FREE shown separately as "Get started free" (not in main matrix to avoid choice paralysis)
  const productsForMatrix = [
    { id: "free", tier: 'FREE', color: "#3DD4B0", price: 0, popular: false, nameKey: 'free' },
    { id: "premium", tier: 'PREMIUM', color: "#3DD4B0", price: 9.99, popular: true, nameKey: 'premium' },
    { id: "mastery", tier: 'MASTERY', color: "#0F1C2E", price: 27, popular: false, nameKey: 'mastery' },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#3DD4B0]/10 text-[#3DD4B0]">
              <Monitor className="w-3 h-3 mr-1" />
              {t('matrixBadge')}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-4">
              {t('matrixTitle')}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('matrixSubtitle')}
            </p>
          </div>
          
          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {productsForMatrix.map((product) => (
              <Card key={product.id} className={`border-2 ${product.popular ? 'border-[#3DD4B0]' : 'border-slate-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[#0F1C2E]">{t(`products.${product.nameKey}.name`)}</h3>
                    <Badge style={{ backgroundColor: product.color, color: product.id === 'free' ? '#0F1C2E' : 'white' }}>
                      {product.price === 0 ? t('free') : `$${product.price}`}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {allApps.map((app, idx) => {
                      const hasAccess = product.tier === 'FREE' ? app.free :
                                        product.tier === 'BASIC' ? app.basic :
                                        product.tier === 'PREMIUM' ? app.premium :
                                        product.tier === 'MASTERY' ? app.mastery :
                                        false;
                      return (
                        <div key={idx} className={`flex items-center gap-2 text-sm ${hasAccess ? 'text-slate-700' : 'text-slate-300'}`}>
                          {hasAccess ? (
                            <CheckCircle2 className="w-4 h-4 text-[#3DD4B0]" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-300" />
                          )}
                          <span>{t(`matrixApps.${idx}`)}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-[#0F1C2E]">{t('matrixAppsTools')}</th>
                  <th className="text-center py-4 px-4">
                    <div className="text-[#3DD4B0] font-bold">{t('products.free.shortName')}</div>
                    <div className="text-sm text-slate-500">$0</div>
                  </th>
                  <th className="text-center py-4 px-4 bg-[#3DD4B0]/5 border-2 border-[#3DD4B0] rounded-t-lg">
                    <div className="text-[#3DD4B0] font-bold">{t('products.premium.shortName')}</div>
                    <div className="text-sm text-slate-500">$9.99 <span className="line-through">$17</span></div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="text-[#0F1C2E] font-bold">{t('products.mastery.shortName')}</div>
                    <div className="text-sm text-slate-500">$27</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {allApps.map((app, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">{t(`matrixApps.${idx}`)}</td>
                    <td className="text-center py-3 px-4 bg-[#3DD4B0]/5">
                      {app.free ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {app.premium ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {app.mastery ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Free-tier honesty note — always visible (mobile + desktop) */}
          <p className="text-sm text-slate-500 mt-6 text-center max-w-3xl mx-auto">
            {t('matrixFreeNote')}
          </p>
        </div>
      </div>
    </section>
  );
}

// Product Card Component
function ProductCard({ product, t, matched }: { 
  product: {
    id: string;
    nameKey: string;
    price: number;
    comparePrice: number;
    tier: string;
    icon: React.ElementType;
    popular: boolean;
    featured?: boolean;
    billingPeriod?: string;
    image?: string | null;
    tributeHref?: string | null;
  };
  t: ReturnType<typeof useTranslations>;
  matched?: boolean;
}) {
  const Icon = product.icon;
  const { locale } = useLocale();
  const per = product.billingPeriod === 'monthly' ? (locale === 'ar' ? '/شهر' : '/mo') : (locale === 'ar' ? 'دفعة واحدة' : ' one-time');
  const isFree = product.price === 0;
  const { toast } = useToast();
  const [guaranteeOpen, setGuaranteeOpen] = useState(false);
  
  const productName = t(`products.${product.nameKey}.name`);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: `cart-${product.id}-${Date.now()}`,
      productId: product.id,
      name: productName,
      price: product.price,
      comparePrice: product.comparePrice || undefined,
    });
    toast({
      title: t('addedToCart'),
      description: t('addedToCartDesc').replace('{name}', productName),
    });
  };

  // Get features and highlights from translations
  const features: string[] = [];
  const highlights: string[] = [];
  
  // We need to iterate over array indices in the translation
  // Iterate with a reasonable max count to avoid infinite loops
  // The translation function returns the full key path when not found (includes namespace)
  // So we detect not-found by checking if the result still contains the local key part
  for (let idx = 0; idx < 20; idx++) {
    const localKey = `products.${product.nameKey}.features.${idx}`;
    const feature = t(localKey);
    // If translation not found, t() returns the full key like "productsPage.products.free.features.999"
    // Check if the result is the not-found case (contains the local key but is not a real translation)
    if (!feature || feature.endsWith(localKey) || feature === localKey) break;
    features.push(feature);
  }
  
  for (let idx = 0; idx < 10; idx++) {
    const localKey = `products.${product.nameKey}.highlights.${idx}`;
    const highlight = t(localKey);
    if (!highlight || highlight.endsWith(localKey) || highlight === localKey) break;
    highlights.push(highlight);
  }
  
  return (
    <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white ${
      product.popular ? 'ring-2 ring-[#3DD4B0] shadow-xl lg:scale-[1.04] z-10 relative' : ''
    }`}>
      {/* Popular Badge — the single recommended plan */}
      {product.popular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-[#3DD4B0] text-[#0F1C2E] font-semibold">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {t('mostPopular')}
          </Badge>
        </div>
      )}

      {/* Matches-your-answer badge (two-step decision) */}
      {matched && !product.popular && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-[#1F6F78] text-white font-semibold">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            {t('matchesYou')}
          </Badge>
        </div>
      )}
      
      {/* Product cover (Task 71: founder-supplied, RN-2-gated) — rendered above the card body */}
      {product.image && (
        <div className="relative h-44 sm:h-48 overflow-hidden bg-[#0F1C2E]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={productName}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        </div>
      )}

      <CardContent className="p-6 lg:p-8">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-4">
          <Icon className="h-6 w-6" />
        </div>
        
        {/* Header */}
        <div className="mb-4">
          <Badge variant="outline" className="mb-3 text-xs">
            {t(`products.${product.nameKey}.shortName`)}
          </Badge>
          <h3 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-2">
            {productName}
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            {t(`products.${product.nameKey}.description`)}
          </p>
          <p className="text-xs font-medium text-[#1F6F78] mt-2 leading-relaxed">
            {t(`products.${product.nameKey}.bestFor`)}
          </p>
        </div>
        
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          {isFree ? (
            <span className="text-4xl font-bold text-[#3DD4B0]">{t('free')}</span>
          ) : (
            <>
              <span className="text-4xl font-bold text-[#0F1C2E]">${product.price}</span><span className="text-lg text-[#8A94A6]">{per}</span>
              {product.comparePrice ? (
                <span className="text-lg text-slate-400 line-through">${product.comparePrice}</span>
              ) : null}
            </>
          )}
        </div>
        
        {/* Savings Badge */}
        <div className="flex items-center gap-2 mb-4">
          {!isFree && product.comparePrice && product.comparePrice > product.price && (
            <Badge className="bg-green-100 text-green-700">
              {t('save')} ${Math.round((product.comparePrice - product.price) * 100) / 100}
            </Badge>
          )}
          {!isFree && (
            <button
              type="button"
              onClick={() => setGuaranteeOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#3DD4B0]/15 text-[#3DD4B0] hover:bg-[#3DD4B0]/25 transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              {t('guaranteeBadge')}
              <Info className="w-3 h-3 opacity-60" />
            </button>
          )}
        </div>

        {/* Guarantee Modal */}
        <Dialog open={guaranteeOpen} onOpenChange={setGuaranteeOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-[#0F1C2E]">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#3DD4B0]/15 text-[#3DD4B0]">
                  <Shield className="w-4 h-4" />
                </div>
                {t('guaranteeModalTitle')}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {t('guaranteeModalTitle')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-slate-600 leading-relaxed text-sm">
                {t('guaranteeModalBody')}
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3DD4B0] flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{t('guaranteeBullet1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3DD4B0] flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{t('guaranteeBullet2')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3DD4B0] flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{t('guaranteeBullet3')}</span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {highlights.map((highlight, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {highlight}
            </Badge>
          ))}
        </div>
        
        {/* Features */}
        <ul className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
              <span className="text-slate-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA */}
        {isFree ? (
          <Link href="/apps" className="block">
            <Button 
              className={`w-full h-12 font-semibold bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]`}
              size="lg"
            >
              {t('startFreeNow')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <div className="space-y-2">
            <Link href={PRODUCT_URLS[product.id] || '/products'} className="block">
              <Button 
                className={`w-full h-12 font-semibold ${product.popular 
                    ? 'bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]' 
                    : 'bg-[#0F1C2E] text-white hover:bg-[#1a2d47]'}`}
                size="lg"
              >
                {t('viewDetails')} - ${product.price}{product.billingPeriod === 'monthly' ? per : ''}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              onClick={handleAddToCart}
              variant="outline"
              className="w-full h-10 font-medium border-[#3DD4B0]/30 text-[#3DD4B0] hover:bg-[#3DD4B0]/10"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {t('addToCart')}
            </Button>
            {/* Task 71: direct Tribute payment — founder directive "direct bundle links in the products" */}
            {product.tributeHref && (
              <a
                href={product.tributeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs font-medium text-[#1F6F78] hover:text-[#3DD4B0] underline underline-offset-2 pt-1"
              >
                {locale === 'ar' ? 'أو ادفع مباشرة عبر Tribute ← فور الدفع يصلك رمز الوصول' : 'Or pay directly via Tribute — your access code arrives right after payment'}
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Products Grid Section
function ProductsSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  // Two-step decision state: which identity chip did the user pick?
  const [answer, setAnswer] = useState<string | null>(null);
  // Product data with non-translatable fields — PRICING MODEL V2: rule of three
  // (Free lead magnet + Planner $9.99 one-time + Mastery $27 one-time)
  const products = [
    // Task 71 (2026-10-25): founder covers wired into cards + direct Tribute pay links
    // (founder directive: direct bundle links live in the products — pay on Tribute,
    // then return for the access key; /api/tribute/redirect keeps env-override + logging).
    { id: "free", nameKey: "free", price: 0, comparePrice: 0, tier: "FREE", icon: Sparkles, popular: false, billingPeriod: "free", image: null as string | null, tributeHref: null as string | null },
    { id: "premium", nameKey: "premium", price: 9.99, comparePrice: 17, tier: "PREMIUM", icon: Calendar, popular: true, billingPeriod: "one-time", image: "/images/products/covers/tamkinly-planner-cover-2k.webp", tributeHref: "/api/tribute/redirect?tier=premium&amount=9.99" },
    { id: "mastery", nameKey: "mastery", price: 27, comparePrice: 0, tier: "MASTERY", icon: Award, popular: false, billingPeriod: "one-time", image: "/images/products/covers/tamkinly-mastery-cover-2k.webp", tributeHref: "/api/tribute/redirect?tier=mastery&amount=27" },
  ];

  return (
    <section id="plans" className="py-16 lg:py-24 bg-[#F6F8FA] scroll-mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-[#3DD4B0]/10 text-[#3DD4B0]">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            {t('valueLadderBadge')}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-4">
            {t('valueLadderTitle')}
          </h2>
          <p className="text-slate-600">
            {t('valueLadderSubtitle')}
          </p>
        </div>
        
        {/* Two-step decision: pick who you are, we highlight the plan */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 mb-10">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F1C2E] mb-1">
            {t('choosePathTitle')}
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            {t('choosePathSubtitle')}
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { id: 'premium', label: t('pathChipTransformer') },
              { id: 'mastery', label: t('pathChipAllIn') },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => {
                  setAnswer(chip.id);
                  if (typeof document !== 'undefined') {
                    const el = document.getElementById(`plan-${chip.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`text-sm rounded-xl border px-3 py-3 text-start transition-all duration-200 ${
                  answer === chip.id
                    ? 'border-[#1F6F78] ring-1 ring-[#1F6F78] bg-[#1F6F78]/5 text-[#0F1C2E] font-medium'
                    : 'border-slate-200 text-slate-600 hover:border-[#1F6F78]/40 hover:bg-[#1F6F78]/[0.03]'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <div key={product.id} id={`plan-${product.id}`} className={`scroll-mt-28 ${product.popular ? 'lg:-translate-y-3' : ''}`}>
              <ProductCard
                product={product}
                t={t}
                matched={answer === product.id}
              />
            </div>
          ))}
        </div>

        {/* Default CTA — one clear recommended path */}
        <div className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 text-center">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1C2E] mb-2">
            {t('startHereTitle')}
          </h3>
          <p className="text-slate-600 text-sm sm:text-base mb-5">
            {t('startHereBody')}
          </p>
          <Link href="/products/premium" className="inline-block">
            <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold shadow-lg">
              {t('startHereButton')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-xs text-slate-400 mt-3">{t('startHereSecondary')}</p>
        </div>
        
        {/* Payment Methods Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 mb-4">
            {t('secureCheckout')}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              {t('sslSecured')}
            </span>
            <span>|</span>
            <span>{t('paymentMethodsNote')}</span>
            <span>|</span>
            <span>{t('refundPolicy')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Guarantee Section
function GuaranteeSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-[#3DD4B0]/30 bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] shadow-lg">
            <CardContent className="p-8 lg:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3DD4B0]/20 text-[#3DD4B0] mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
                {t('guaranteeTitle')}
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                {t('guaranteeDesc')}
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
                  <span>{t('noQuestionsAsked')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
                  <span>{t('fullRefund')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
                  <span>{t('keepProduct')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  // Get FAQ items from translations
  const faqs: { q: string; a: string }[] = [];
  for (let idx = 0; idx < 20; idx++) {
    const localKeyQ = `faqs.${idx}.q`;
    const localKeyA = `faqs.${idx}.a`;
    const q = t(localKeyQ);
    const a = t(localKeyA);
    // If translation not found, t() returns the full key path (includes namespace)
    if (!q || !a || q.endsWith(localKeyQ) || a.endsWith(localKeyA)) break;
    faqs.push({ q, a });
  }

  return (
    <section className="py-16 lg:py-24 bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {t('faqBadge')}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E]">
              {t('faqTitle')}
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">{faq.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('ctaTitle')}
            <span className="text-[#3DD4B0]">{t('ctaTitleHighlight')}</span>
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            {t('ctaSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apps">
              <Button 
                size="lg" 
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-14 font-semibold shadow-xl"
              >
                {t('startFreeNow')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="white" size="lg" className="px-8 h-14 font-semibold">
                {t('takeFreeAssessment')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function ProductsPage() {
  const t = useTranslations("productsPage");

  // Generate product schemas for SEO — PRICING MODEL V2: TWO paid packages only
  // (Planner $9.99 one-time + Mastery $27 one-time; Free $0 lead magnet).
  const productData = [
    { nameKey: "free", price: 0 },
    { nameKey: "premium", price: 9.99 },
    { nameKey: "mastery", price: 27 },
  ];

  const productSchemas = productData.map((product) =>
    generateProductSchema({
      name: t(`products.${product.nameKey}.name`),
      description: t(`products.${product.nameKey}.description`),
      price: product.price,
      url: `/products`,
      category: 'Digital Product',
    })
  );

  // FAQ schema for pricing questions
  const faqSchema = generateFAQSchema([
    {
      question: t('faqs.0.q'),
      answer: t('faqs.0.a'),
    },
    {
      question: t('faqs.1.q'),
      answer: t('faqs.1.a'),
    },
    {
      question: t('faqs.3.q'),
      answer: t('faqs.3.a'),
    },
  ]);

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd data={[...productSchemas, faqSchema, breadcrumbSchema]} />
      
      <HeroSection t={t} />
      <ProductRecommender />
      <AppMatrixSection t={t} />
      <ProductsSection t={t} />
      <GuaranteeSection t={t} />
      <FAQSection t={t} />
      <CTASection t={t} />
    </>
  );
}


