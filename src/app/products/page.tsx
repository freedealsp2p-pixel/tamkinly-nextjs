'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addToCart } from "@/lib/cart-client";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { useTranslations } from "@/components/providers/LocaleProvider";

// Product URLs mapping
const PRODUCT_URLS: Record<string, string> = {
  'trial': '/products/trial',
  'planner': '/products/planner',
  'premium': '/products/premium',
  'bundle': '/products/bundle',
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
          
          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
              <Users className="h-5 w-5 text-[#3DD4B0]" />
              <span className="text-white text-sm">
                <span className="font-bold">15</span> {t('heroAppsCount')}
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
              <span>{t('trustLifetimeAccess')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// App Access Matrix Section
function AppMatrixSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  // Build allApps using translations - access flags are not translatable
  const allApps = [
    { nameKey: '0', free: true, trial: true, basic: true, premium: true, bundle: true },
    { nameKey: '1', free: true, trial: true, basic: true, premium: true, bundle: true },
    { nameKey: '2', free: true, trial: true, basic: true, premium: true, bundle: true },
    { nameKey: '3', free: false, trial: true, basic: true, premium: true, bundle: true },
    { nameKey: '4', free: false, trial: false, basic: true, premium: true, bundle: true },
    { nameKey: '5', free: false, trial: false, basic: true, premium: true, bundle: true },
    { nameKey: '6', free: false, trial: false, basic: true, premium: true, bundle: true },
    { nameKey: '7', free: false, trial: false, basic: true, premium: true, bundle: true },
    { nameKey: '8', free: false, trial: false, basic: false, premium: true, bundle: true },
    { nameKey: '9', free: false, trial: false, basic: false, premium: true, bundle: true },
    { nameKey: '10', free: false, trial: false, basic: false, premium: true, bundle: true },
    { nameKey: '11', free: false, trial: false, basic: false, premium: false, bundle: true },
    { nameKey: '12', free: false, trial: false, basic: false, premium: false, bundle: true },
    { nameKey: '13', free: false, trial: false, basic: false, premium: false, bundle: true },
    { nameKey: '14', free: false, trial: false, basic: false, premium: false, bundle: true },
  ];

  // Product data for the matrix (non-translatable parts)
  const productsForMatrix = [
    { id: "free", tier: 'FREE', color: "#3DD4B0", price: 0, popular: false, nameKey: 'free' },
    { id: "trial", tier: 'TRIAL', color: "#1F6F78", price: 7, popular: false, nameKey: 'trial' },
    { id: "planner", tier: 'BASIC', color: "#3DD4B0", price: 17, popular: true, nameKey: 'planner' },
    { id: "premium", tier: 'PREMIUM', color: "#1F6F78", price: 27, popular: false, nameKey: 'premium' },
    { id: "bundle", tier: 'BUNDLE', color: "#0F1C2E", price: 47, popular: false, nameKey: 'bundle' },
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
                                       product.tier === 'TRIAL' ? app.trial :
                                       product.tier === 'BASIC' ? app.basic :
                                       product.tier === 'PREMIUM' ? app.premium :
                                       app.bundle;
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
                    <div className="text-[#3DD4B0] font-bold">{t('free')}</div>
                    <div className="text-sm text-slate-500">$0</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="text-slate-600 font-bold">{t('trial')}</div>
                    <div className="text-sm text-slate-500">$7</div>
                  </th>
                  <th className="text-center py-4 px-4 bg-[#3DD4B0]/5 border-2 border-[#3DD4B0] rounded-t-lg">
                    <div className="text-[#3DD4B0] font-bold">{t('basic')}</div>
                    <div className="text-sm text-slate-500">$17</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="text-[#1F6F78] font-bold">{t('premium')}</div>
                    <div className="text-sm text-slate-500">$27</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="text-[#0F1C2E] font-bold">{t('bundle')}</div>
                    <div className="text-sm text-slate-500">$47</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {allApps.map((app, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">{t(`matrixApps.${idx}`)}</td>
                    <td className="text-center py-3 px-4">
                      {app.free ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {app.trial ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="text-center py-3 px-4 bg-[#3DD4B0]/5">
                      {app.basic ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {app.premium ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {app.bundle ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// Product Card Component
function ProductCard({ product, t }: { 
  product: {
    id: string;
    nameKey: string;
    price: number;
    comparePrice: number;
    tier: string;
    icon: React.ElementType;
    popular: boolean;
    isBundle?: boolean;
    featured?: boolean;
  };
  t: ReturnType<typeof useTranslations>;
}) {
  const Icon = product.icon;
  const isFree = product.price === 0;
  const { toast } = useToast();
  
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
  let idx = 0;
  while (true) {
    try {
      const feature = t(`products.${product.nameKey}.features.${idx}`);
      if (feature === `products.${product.nameKey}.features.${idx}`) break; // key not found
      features.push(feature);
      idx++;
    } catch { break; }
  }
  
  idx = 0;
  while (true) {
    try {
      const highlight = t(`products.${product.nameKey}.highlights.${idx}`);
      if (highlight === `products.${product.nameKey}.highlights.${idx}`) break;
      highlights.push(highlight);
      idx++;
    } catch { break; }
  }
  
  return (
    <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white ${
      product.popular ? 'ring-2 ring-[#3DD4B0]' : ''
    } ${product.isBundle ? 'md:col-span-2 lg:col-span-1' : ''}`}>
      {/* Popular Badge */}
      {product.popular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-[#3DD4B0] text-[#0F1C2E] font-semibold">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {t('mostPopular')}
          </Badge>
        </div>
      )}
      
      {/* Bundle Badge */}
      {product.isBundle && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-[#0F1C2E] text-white font-semibold">
            <Monitor className="w-3 h-3 mr-1" />
            {t('bestValue')}
          </Badge>
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
        </div>
        
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          {isFree ? (
            <span className="text-4xl font-bold text-[#3DD4B0]">{t('free')}</span>
          ) : (
            <>
              <span className="text-4xl font-bold text-[#0F1C2E]">${product.price}</span>
              {product.comparePrice && (
                <span className="text-lg text-slate-400 line-through">${product.comparePrice}</span>
              )}
            </>
          )}
        </div>
        
        {/* Savings Badge */}
        {!isFree && product.comparePrice && product.comparePrice > product.price && (
          <Badge className="bg-green-100 text-green-700 mb-4">
            {t('save')} ${product.comparePrice - product.price}
          </Badge>
        )}
        
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
                {t('viewDetails')} - ${product.price}
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Products Grid Section
function ProductsSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  // Product data with non-translatable fields
  const products = [
    { id: "free", nameKey: "free", price: 0, comparePrice: 0, tier: "FREE", icon: Sparkles, color: "#3DD4B0", popular: false, isBundle: false },
    { id: "trial", nameKey: "trial", price: 7, comparePrice: 15, tier: "TRIAL", icon: Clock, featured: false, popular: false, isBundle: false },
    { id: "planner", nameKey: "planner", price: 17, comparePrice: 29, tier: "BASIC", icon: Calendar, featured: true, popular: true, isBundle: false },
    { id: "premium", nameKey: "premium", price: 27, comparePrice: 44, tier: "PREMIUM", icon: Award, featured: true, popular: false, isBundle: false },
    { id: "bundle", nameKey: "bundle", price: 47, comparePrice: 91, tier: "BUNDLE", icon: Monitor, featured: true, popular: false, isBundle: true },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F6F8FA]">
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              t={t}
            />
          ))}
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
            <span>{t('comingSoonPayment')}</span>
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
  let idx = 0;
  while (true) {
    const q = t(`faqs.${idx}.q`);
    const a = t(`faqs.${idx}.a`);
    // If the key returned is the same as the lookup key, it means it wasn't found
    if (q === `faqs.${idx}.q` || a === `faqs.${idx}.a`) break;
    faqs.push({ q, a });
    idx++;
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

  // Generate product schemas for SEO
  const productData = [
    { nameKey: "free", price: 0 },
    { nameKey: "trial", price: 7 },
    { nameKey: "planner", price: 17 },
    { nameKey: "premium", price: 27 },
    { nameKey: "bundle", price: 47 },
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
      <AppMatrixSection t={t} />
      <ProductsSection t={t} />
      <GuaranteeSection t={t} />
      <FAQSection t={t} />
      <CTASection t={t} />
    </>
  );
}
