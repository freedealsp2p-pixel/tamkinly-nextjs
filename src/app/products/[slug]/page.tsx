'use client';

import React, { useState, use } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Shield, 
  Zap, 
  Download,
  Star,
  Clock,
  Calendar,
  Award,
  Monitor,
  Loader2,
  Check,
  Sparkles,
  ShoppingCart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslations, useLocale } from "@/components/providers/LocaleProvider";
import { addToCart } from "@/lib/cart-client";

// Product configuration with prices and icons only (translatable content comes from translations)
const productsConfig: Record<string, {
  id: string;
  slug: string;
  price: number;
  comparePrice: number;
  popular: boolean;
  icon: React.ElementType;
  color: string;
}> = {
  'trial': {
    id: "trial",
    slug: "trial",
    price: 7,
    comparePrice: 15,
    popular: false,
    icon: Clock,
    color: "#64B5F6"
  },
  'planner': {
    id: "planner",
    slug: "planner",
    price: 17,
    comparePrice: 29,
    popular: true,
    icon: Calendar,
    color: "#3DD4B0"
  },
  'premium': {
    id: "premium",
    slug: "premium",
    price: 27,
    comparePrice: 44,
    popular: false,
    icon: Award,
    color: "#1F6F78"
  },
  'bundle': {
    id: "bundle",
    slug: "bundle",
    price: 47,
    comparePrice: 91,
    popular: false,
    icon: Monitor,
    color: "#0F1C2E"
  }
};

// Product page component
export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const t = useTranslations();
  const { direction, locale } = useLocale();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const config = productsConfig[slug];
  
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FA]">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-[#0F1C2E] mb-4">{t('productDetail.productNotFound')}</h1>
            <p className="text-slate-600 mb-6">{t('productDetail.productNotFoundDesc')}</p>
            <Link href="/products">
              <Button>{t('productDetail.browseAllProducts')}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const Icon = config.icon;
  const productKey = `productDetail.products.${slug}` as const;
  
  // Get translated product data
  const name = t(`${productKey}.name`);
  const tier = t(`${productKey}.tier`);
  const description = t(`${productKey}.description`);
  const longDescription = t(`${productKey}.longDescription`);
  const cta = t(`${productKey}.cta`);
  
  // Get highlights based on product
  const getHighlights = () => {
    if (slug === 'trial') {
      return [
        t(`${productKey}.highlights.fullAccess`),
        t(`${productKey}.highlights.sevenDays`),
        t(`${productKey}.highlights.lowRisk`)
      ];
    } else if (slug === 'planner') {
      return [
        t(`${productKey}.highlights.mostPopular`),
        t(`${productKey}.highlights.printIncluded`),
        t(`${productKey}.highlights.thirtyDays`)
      ];
    } else if (slug === 'premium') {
      return [
        t(`${productKey}.highlights.bestValue`),
        t(`${productKey}.highlights.save`),
        t(`${productKey}.highlights.analytics`)
      ];
    } else if (slug === 'bundle') {
      return [
        t(`${productKey}.highlights.save`),
        t(`${productKey}.highlights.aiCoaching`),
        t(`${productKey}.highlights.vipAccess`)
      ];
    }
    return [];
  };

  // Get benefits based on product
  const getBenefits = () => {
    if (slug === 'trial') {
      return [
        { title: t(`${productKey}.benefits.testBeforeCommit.title`), description: t(`${productKey}.benefits.testBeforeCommit.description`) },
        { title: t(`${productKey}.benefits.seeResults.title`), description: t(`${productKey}.benefits.seeResults.description`) },
        { title: t(`${productKey}.benefits.fullSystem.title`), description: t(`${productKey}.benefits.fullSystem.description`) }
      ];
    } else if (slug === 'planner') {
      return [
        { title: t(`${productKey}.benefits.structured.title`), description: t(`${productKey}.benefits.structured.description`) },
        { title: t(`${productKey}.benefits.evidence.title`), description: t(`${productKey}.benefits.evidence.description`) },
        { title: t(`${productKey}.benefits.printDigital.title`), description: t(`${productKey}.benefits.printDigital.description`) }
      ];
    } else if (slug === 'premium') {
      return [
        { title: t(`${productKey}.benefits.dataDriven.title`), description: t(`${productKey}.benefits.dataDriven.description`) },
        { title: t(`${productKey}.benefits.patterns.title`), description: t(`${productKey}.benefits.patterns.description`) },
        { title: t(`${productKey}.benefits.evidence.title`), description: t(`${productKey}.benefits.evidence.description`) }
      ];
    } else if (slug === 'bundle') {
      return [
        { title: t(`${productKey}.benefits.complete.title`), description: t(`${productKey}.benefits.complete.description`) },
        { title: t(`${productKey}.benefits.aiGuidance.title`), description: t(`${productKey}.benefits.aiGuidance.description`) },
        { title: t(`${productKey}.benefits.community.title`), description: t(`${productKey}.benefits.community.description`) }
      ];
    }
    return [];
  };

  // Get features (array from translation)
  const getFeatures = (): string[] => {
    const features: string[] = [];
    for (let i = 0; i < 10; i++) {
      try {
        const feature = t(`${productKey}.features.${i}`);
        if (feature && !feature.includes('features.')) {
          features.push(feature);
        } else {
          break;
        }
      } catch {
        break;
      }
    }
    return features;
  };

  // Get apps based on product
  const getApps = () => {
    if (slug === 'trial') {
      return [
        { name: t(`${productKey}.apps.trialPlanner.name`), description: t(`${productKey}.apps.trialPlanner.description`) },
        { name: t(`${productKey}.apps.identityGap.name`), description: t(`${productKey}.apps.identityGap.description`) },
        { name: t(`${productKey}.apps.values.name`), description: t(`${productKey}.apps.values.description`) },
        { name: t(`${productKey}.apps.reflection.name`), description: t(`${productKey}.apps.reflection.description`) }
      ];
    } else if (slug === 'planner') {
      return [
        { name: t(`${productKey}.apps.manual.name`), description: t(`${productKey}.apps.manual.description`) },
        { name: t(`${productKey}.apps.dailyPlanner.name`), description: t(`${productKey}.apps.dailyPlanner.description`) },
        { name: t(`${productKey}.apps.baseline.name`), description: t(`${productKey}.apps.baseline.description`) },
        { name: t(`${productKey}.apps.audit.name`), description: t(`${productKey}.apps.audit.description`) }
      ];
    } else if (slug === 'premium') {
      return [
        { name: t(`${productKey}.apps.allPlanner.name`), description: t(`${productKey}.apps.allPlanner.description`) },
        { name: t(`${productKey}.apps.decision.name`), description: t(`${productKey}.apps.decision.description`) },
        { name: t(`${productKey}.apps.evidence.name`), description: t(`${productKey}.apps.evidence.description`) },
        { name: t(`${productKey}.apps.dashboard.name`), description: t(`${productKey}.apps.dashboard.description`) }
      ];
    } else if (slug === 'bundle') {
      return [
        { name: t(`${productKey}.apps.allPremium.name`), description: t(`${productKey}.apps.allPremium.description`) },
        { name: t(`${productKey}.apps.aiCoach.name`), description: t(`${productKey}.apps.aiCoach.description`) },
        { name: t(`${productKey}.apps.emotion.name`), description: t(`${productKey}.apps.emotion.description`) },
        { name: t(`${productKey}.apps.community.name`), description: t(`${productKey}.apps.community.description`) }
      ];
    }
    return [];
  };

  // Get includes based on product
  const getIncludes = () => {
    if (slug === 'trial') {
      return [
        { name: t(`${productKey}.includes.duration`), value: t(`${productKey}.includes.durationValue`) },
        { name: t(`${productKey}.includes.appsAccess`), value: t(`${productKey}.includes.appsValue`) },
        { name: t(`${productKey}.includes.pdfDownloads`), value: t(`${productKey}.includes.yes`) },
        { name: t(`${productKey}.includes.support`), value: t(`${productKey}.includes.email`) },
        { name: t(`${productKey}.includes.updates`), value: t(`${productKey}.includes.durationValue`) }
      ];
    } else if (slug === 'planner') {
      return [
        { name: t(`${productKey}.includes.duration`), value: t(`${productKey}.includes.durationValue`) },
        { name: t(`${productKey}.includes.appsAccess`), value: t(`${productKey}.includes.appsValue`) },
        { name: t(`${productKey}.includes.pdfDownloads`), value: t(`${productKey}.includes.all`) },
        { name: t(`${productKey}.includes.support`), value: t(`${productKey}.includes.email`) },
        { name: t(`${productKey}.includes.updates`), value: t(`${productKey}.includes.freeForever`) }
      ];
    } else if (slug === 'premium') {
      return [
        { name: t(`${productKey}.includes.duration`), value: t(`${productKey}.includes.durationValue`) },
        { name: t(`${productKey}.includes.appsAccess`), value: t(`${productKey}.includes.appsValue`) },
        { name: t(`${productKey}.includes.pdfDownloads`), value: t(`${productKey}.includes.all`) },
        { name: t(`${productKey}.includes.support`), value: t(`${productKey}.includes.priorityEmail`) },
        { name: t(`${productKey}.includes.updates`), value: t(`${productKey}.includes.freeForever`) },
        { name: t(`${productKey}.includes.analytics`), value: t(`${productKey}.includes.yes`) }
      ];
    } else if (slug === 'bundle') {
      return [
        { name: t(`${productKey}.includes.duration`), value: t(`${productKey}.includes.durationValue`) },
        { name: t(`${productKey}.includes.appsAccess`), value: t(`${productKey}.includes.appsValue`) },
        { name: t(`${productKey}.includes.pdfDownloads`), value: t(`${productKey}.includes.all`) },
        { name: t(`${productKey}.includes.support`), value: t(`${productKey}.includes.priority`) },
        { name: t(`${productKey}.includes.aiCoach`), value: t(`${productKey}.includes.unlimited`) },
        { name: t(`${productKey}.includes.community`), value: t(`${productKey}.includes.lifetimeAccess`) },
        { name: t(`${productKey}.includes.liveQA`), value: t(`${productKey}.includes.monthly`) }
      ];
    }
    return [];
  };

  // Get specifications based on product
  const getSpecifications = () => {
    if (slug === 'trial') {
      return [
        { name: t(`${productKey}.specs.format`), value: t(`${productKey}.specs.formatValue`) },
        { name: t(`${productKey}.specs.device`), value: t(`${productKey}.specs.deviceValue`) },
        { name: t(`${productKey}.specs.languages`), value: t(`${productKey}.specs.languagesValue`) },
        { name: t(`${productKey}.specs.access`), value: t(`${productKey}.specs.accessValue`) }
      ];
    } else if (slug === 'planner') {
      return [
        { name: t(`${productKey}.specs.format`), value: t(`${productKey}.specs.formatValue`) },
        { name: t(`${productKey}.specs.pages`), value: t(`${productKey}.specs.pagesValue`) },
        { name: t(`${productKey}.specs.device`), value: t(`${productKey}.specs.deviceValue`) },
        { name: t(`${productKey}.specs.languages`), value: t(`${productKey}.specs.languagesValue`) }
      ];
    } else if (slug === 'premium') {
      return [
        { name: t(`${productKey}.specs.format`), value: t(`${productKey}.specs.formatValue`) },
        { name: t(`${productKey}.specs.analytics`), value: t(`${productKey}.specs.analyticsValue`) },
        { name: t(`${productKey}.specs.export`), value: t(`${productKey}.specs.exportValue`) },
        { name: t(`${productKey}.specs.dashboard`), value: t(`${productKey}.specs.dashboardValue`) }
      ];
    } else if (slug === 'bundle') {
      return [
        { name: t(`${productKey}.specs.aiCoach`), value: t(`${productKey}.specs.aiCoachValue`) },
        { name: t(`${productKey}.specs.community`), value: t(`${productKey}.specs.communityValue`) },
        { name: t(`${productKey}.specs.supportHours`), value: t(`${productKey}.specs.supportHoursValue`) },
        { name: t(`${productKey}.specs.bonus`), value: t(`${productKey}.specs.bonusValue`) }
      ];
    }
    return [];
  };

  // Get FAQs (array from translation)
  const getFAQs = () => {
    const faqs: { q: string; a: string }[] = [];
    for (let i = 0; i < 10; i++) {
      try {
        const q = t(`${productKey}.faqs.${i}.q`);
        const a = t(`${productKey}.faqs.${i}.a`);
        if (q && a && !q.includes('faqs.') && !a.includes('faqs.')) {
          faqs.push({ q, a });
        } else {
          break;
        }
      } catch {
        break;
      }
    }
    return faqs;
  };

  // Get testimonials (array from translation)
  const getTestimonials = () => {
    const testimonials: { name: string; role: string; content: string }[] = [];
    for (let i = 0; i < 10; i++) {
      try {
        const name = t(`${productKey}.testimonials.${i}.name`);
        const role = t(`${productKey}.testimonials.${i}.role`);
        const content = t(`${productKey}.testimonials.${i}.content`);
        if (name && role && content && !name.includes('testimonials.')) {
          testimonials.push({ name, role, content });
        } else {
          break;
        }
      } catch {
        break;
      }
    }
    return testimonials;
  };
  
  const handleBuyNow = async () => {
    setIsProcessing(true);
    
    // Add to cart and redirect to checkout
    addToCart({
      id: `cart-${config.id}-${Date.now()}`,
      productId: config.id,
      name: name,
      price: config.price,
      comparePrice: config.comparePrice,
    });
    
    toast({
      title: t('productDetail.addedToCart'),
      description: t('productDetail.redirectToCheckout'),
    });

    // Redirect to checkout with product info
    setTimeout(() => {
      window.location.href = `/checkout?product=${config.id}`;
    }, 500);
  };

  const handleAddToCart = () => {
    addToCart({
      id: `cart-${config.id}-${Date.now()}`,
      productId: config.id,
      name: name,
      price: config.price,
      comparePrice: config.comparePrice,
    });
    
    const cartDesc = t('productDetail.addedToCartDesc');
    const displayName = name || config.id;
    
    toast({
      title: t('productDetail.addedToCart'),
      description: cartDesc.includes('{name}') ? cartDesc.replace('{name}', displayName) : cartDesc,
    });
  };

  const highlights = getHighlights();
  const benefits = getBenefits();
  const features = getFeatures();
  const apps = getApps();
  const includes = getIncludes();
  const specifications = getSpecifications();
  const faqs = getFAQs();
  const testimonials = getTestimonials();
  
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/products" className="inline-flex items-center text-sm text-slate-600 hover:text-[#3DD4B0] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('productDetail.backToProducts')}
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(61, 212, 176, 0.15) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Product Icon/Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Icon className="w-16 h-16 lg:w-20 lg:h-20 text-[#3DD4B0]" />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0] border border-[#3DD4B0]/30">
                    {tier}
                  </Badge>
                  {config.popular && (
                    <Badge className="bg-[#3DD4B0] text-[#0F1C2E]">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {t('productDetail.mostPopular')}
                    </Badge>
                  )}
                  {config.comparePrice > config.price && (
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                      {t('productDetail.save')} ${config.comparePrice - config.price}
                    </Badge>
                  )}
                </div>
                
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {name}
                </h1>
                
                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                  {description}
                </p>
                
                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl lg:text-5xl font-bold text-white">${config.price}</span>
                  {config.comparePrice > config.price && (
                    <span className="text-xl text-slate-400 line-through">${config.comparePrice}</span>
                  )}
                  <Badge variant="outline" className="text-slate-300 border-slate-600">
                    {t('productDetail.oneTimePayment')}
                  </Badge>
                </div>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {highlights.map((highlight, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-white/10 text-white border-white/20">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-[#3DD4B0]" />
                      {highlight}
                    </Badge>
                  ))}
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleBuyNow}
                    disabled={isProcessing}
                    className="h-14 px-8 text-lg font-semibold bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] shadow-xl"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t('productDetail.processing')}
                      </>
                    ) : (
                      <>
                        {cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={handleAddToCart}
                    variant="outline"
                    className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10"
                    size="lg"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {locale === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}
                  </Button>
                  <Link href="/apps">
                    <Button variant="outline" className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10">
                      {t('productDetail.tryFreeVersion')}
                    </Button>
                  </Link>
                </div>
                
                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#3DD4B0]" />
                    <span>{t('productDetail.dayGuarantee')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#3DD4B0]" />
                    <span>{t('productDetail.instantAccess')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#3DD4B0]" />
                    <span>{t('productDetail.lifetimeUpdates')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">
                      {t('productDetail.aboutProduct')}
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {longDescription}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Benefits */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-6">
                      {t('productDetail.keyBenefits')}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {benefits.map((benefit, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                            <Check className="w-5 h-5 text-[#3DD4B0]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#0F1C2E] mb-1">{benefit.title}</h3>
                            <p className="text-sm text-slate-600">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Features */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-6">
                      {t('productDetail.whatsIncluded')}
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Apps Included */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-6">
                      {t('productDetail.appsIncluded')}
                    </h2>
                    <div className="space-y-4">
                      {apps.map((app, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-[#3DD4B0]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#0F1C2E]">{app.name}</h3>
                            <p className="text-sm text-slate-600">{app.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Testimonials */}
                {testimonials.length > 0 && (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6 lg:p-8">
                      <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-6">
                        {t('productDetail.whatUsersSay')}
                      </h2>
                      <div className="space-y-6">
                        {testimonials.map((testimonial, idx) => (
                          <div key={idx} className="p-4 rounded-lg bg-slate-50 border-l-4 border-[#3DD4B0]">
                            <p className="text-slate-700 italic mb-3">&ldquo;{testimonial.content}&rdquo;</p>
                            <div>
                              <p className="font-semibold text-[#0F1C2E]">{testimonial.name}</p>
                              <p className="text-sm text-slate-500">{testimonial.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* FAQs */}
                {faqs.length > 0 && (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6 lg:p-8">
                      <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-6">
                        {t('productDetail.faq')}
                      </h2>
                      <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                          <div key={idx} className="p-4 rounded-lg bg-slate-50">
                            <h3 className="font-semibold text-[#0F1C2E] mb-2">{faq.q}</h3>
                            <p className="text-slate-600 text-sm">{faq.a}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Purchase Card - Sticky */}
                <div className="sticky top-24">
                  <Card className="border-2 border-[#3DD4B0]/20 shadow-lg">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="flex items-baseline justify-center gap-2 mb-2">
                          <span className="text-4xl font-bold text-[#0F1C2E]">${config.price}</span>
                          {config.comparePrice > config.price && (
                            <span className="text-lg text-slate-400 line-through">${config.comparePrice}</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500">{t('productDetail.oneTimePayment')} • {t('productDetail.lifetimeAccess')}</p>
                      </div>
                      
                      <Button 
                        onClick={handleBuyNow}
                        disabled={isProcessing}
                        className="w-full h-14 text-lg font-semibold bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                        size="lg"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            {t('productDetail.processing')}
                          </>
                        ) : (
                          <>
                            {cta}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                      
                      <Separator className="my-6" />
                      
                      {/* Includes */}
                      <div className="space-y-3">
                        {includes.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-slate-600">{item.name}</span>
                            <span className="font-medium text-[#0F1C2E]">{item.value}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Separator className="my-6" />
                      
                      {/* Guarantee */}
                      <div className="text-center">
                        <Shield className="w-10 h-10 text-[#3DD4B0] mx-auto mb-2" />
                        <p className="text-sm font-semibold text-[#0F1C2E] mb-1">{t('productDetail.dayGuarantee')}</p>
                        <p className="text-xs text-slate-500">{t('productDetail.noQuestionsAsked')}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Specifications */}
                  <Card className="border-0 shadow-sm mt-6">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-[#0F1C2E] mb-4">{t('productDetail.specifications')}</h3>
                      <div className="space-y-3">
                        {specifications.map((spec, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-slate-600">{spec.name}</span>
                            <span className="font-medium text-[#0F1C2E]">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {t('productDetail.readyToTransform')}
            </h2>
            <p className="text-slate-300 mb-6">
              {t('productDetail.joinThousands')}
            </p>
            <Button 
              onClick={handleBuyNow}
              disabled={isProcessing}
              className="h-14 px-10 text-lg font-semibold bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t('productDetail.processing')}
                </>
              ) : (
                <>
                  {cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
