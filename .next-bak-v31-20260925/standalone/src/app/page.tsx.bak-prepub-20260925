'use client';

import { Suspense } from 'react';
import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Heart, 
  Brain, 
  CheckCircle2,
  Star,
  Shield,
  Zap,
  Clock,
  Lock,
  Users,
  TrendingUp,
  Play,
  User,
  Compass,
  Eye,
  Lightbulb,
  CircleDot,
  Layers,
  AlignCenter,
  ArrowUpRight
} from "lucide-react";
import { DefaultJsonLd } from "@/components/seo/JsonLd";
import { useLocale, useTranslations } from "@/components/providers/LocaleProvider";

// Dynamic imports for heavy interactive components (code-split for performance)
const DailyReflectionPreview = dynamic(
  () => import('@/components/apps/DailyReflectionPreview'),
  { ssr: false, loading: () => <div className="h-96 bg-[#F6F8FA] animate-pulse" /> }
);

const QuizPreviewWidget = dynamic(
  () => import('@/components/apps/QuizPreviewWidget'),
  { ssr: false, loading: () => <div className="h-80 bg-[#F6F8FA] animate-pulse" /> }
);

// ============================================
// HERO SECTION - QUIZ FOCUSED
// ============================================
function HeroSection() {
  const t = useTranslations();
  const tHome = useTranslations("homePage");
  const { direction } = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900">
      {/* Background Pattern & Effects - clipped to section bounds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(61, 212, 176, 0.15) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        {/* Animated gradient orbs - contained within overflow wrapper */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3DD4B0]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1F6F78]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="max-w-2xl text-center lg:text-left pt-12">
            {/* Badge */}
            <Badge className="mb-6 px-4 py-2 border-[#3DD4B0]/30 text-[#3DD4B0] bg-[#3DD4B0]/10 hover:bg-[#3DD4B0]/20 animate-pulse">
              <Brain className="w-3.5 h-3.5 mr-2" />
              {t("hero.badge")}
            </Badge>
            
            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              {t("hero.title")}
              <br />
              <span className="text-[#3DD4B0]">{t("hero.titleHighlight")}</span>
            </h1>
            
            {/* Subheadline - What happens next */}
            <p className="text-base text-slate-400 font-medium mb-3 tracking-wide">
              {t("hero.subheadline")}
            </p>
            {/* Supporting detail */}
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              {t("hero.subtitle")}&nbsp;<span className="text-white font-semibold">{t("hero.subtitleHighlight")}</span>
            </p>
            
            {/* Social Proof Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mb-10">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3DD4B0] to-[#1F6F78] flex items-center justify-center text-xs font-bold text-[#0F1C2E] border-2 border-[#0F1C2E]">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-white text-sm ml-2">
                  <span className="font-bold">2,847+</span> {t("hero.peopleAssessed")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="h-5 w-5 fill-[#3DD4B0] text-[#3DD4B0]" />
                ))}
                <span className="text-white text-sm ml-2">
                  <span className="font-bold" title={t("hero.accuracyTooltip")}>94%</span> {t("hero.accuracy")}
                </span>
              </div>
              <p className="text-slate-400/80 text-[11px] text-center lg:text-left max-w-md mt-2">
                {t("hero.accuracyNote")}
              </p>
            </div>
            
            {/* Primary CTA - Two side-by-side buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Link href="/products" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-[#1F6F78] text-white hover:bg-[#185c63] px-8 h-16 text-lg font-bold shadow-2xl shadow-[#1F6F78]/30 group transition-all duration-300 hover:scale-105 hover:shadow-[#1F6F78]/50"
                >
                  <Sparkles className={`${direction === 'rtl' ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                  {t("hero.ctaProducts")}
                </Button>
              </Link>
              <Link href="/quiz" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-16 text-lg font-bold shadow-2xl shadow-[#3DD4B0]/30 group transition-all duration-300 hover:scale-105 hover:shadow-[#3DD4B0]/50"
                >
                  <Play className={`${direction === 'rtl' ? 'ml-3' : 'mr-3'} h-5 w-6 group-hover:animate-pulse`} />
                  {t("hero.ctaAssessment")}
                  <ArrowRight className={`${direction === 'rtl' ? 'mr-3 rotate-180' : 'ml-3'} h-5 w-5 group-hover:translate-x-2 transition-transform`} />
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2 hover:text-[#3DD4B0] transition-colors cursor-default">
                <Lock className="h-4 w-4 text-[#3DD4B0]" />
                <span>{t("hero.trustPrivate")}</span>
              </div>
              <div className="flex items-center gap-2 hover:text-[#3DD4B0] transition-colors cursor-default">
                <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
                <span>{t("hero.trustNoEmail")}</span>
              </div>
              <div className="flex items-center gap-2 hover:text-[#3DD4B0] transition-colors cursor-default">
                <Zap className="h-4 w-4 text-[#3DD4B0]" />
                <span>{t("hero.trustInstant")}</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Hero Image */}
          <div className="hidden lg:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#3DD4B0]/20 border border-white/10">
              <Image
                src="/hero-image.webp"
                alt={tHome("heroImageAlt")}
                width={672}
                height={384}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1C2E]/50 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className={`absolute -bottom-4 ${direction === 'rtl' ? '-right-4' : '-left-4'} bg-white rounded-xl shadow-lg p-4 flex items-center gap-3`}>
              <div className="w-12 h-12 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-[#3DD4B0]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0F1C2E]">94%</p>
                <p className="text-xs text-slate-500">{t("hero.satisfaction")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F6F8FA"/>
        </svg>
      </div>
    </section>
  );
}

// ============================================
// WHAT YOU'LL DISCOVER SECTION
// ============================================
function DiscoverSection() {
  const t = useTranslations();
  
  const discoveries = [
    {
      icon: User,
      titleKey: "discover.identityClarity.title",
      descKey: "discover.identityClarity.description",
      color: "#3DD4B0"
    },
    {
      icon: Compass,
      titleKey: "discover.environmentalAlignment.title",
      descKey: "discover.environmentalAlignment.description",
      color: "#1F6F78"
    },
    {
      icon: Heart,
      titleKey: "discover.emotionalRegulation.title",
      descKey: "discover.emotionalRegulation.description",
      color: "#C97B7B"
    },
    {
      icon: Brain,
      titleKey: "discover.decisionQuality.title",
      descKey: "discover.decisionQuality.description",
      color: "#2A8A94"
    },
    {
      icon: TrendingUp,
      titleKey: "discover.progressMomentum.title",
      descKey: "discover.progressMomentum.description",
      color: "#2A8A94"
    },
    {
      icon: Target,
      titleKey: "discover.lifeAlignment.title",
      descKey: "discover.lifeAlignment.description",
      color: "#1F6F78"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            <Eye className="w-3.5 h-3.5 mr-1" />
            {t("discover.badge")}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] mb-6">
            {t("discover.title")}&nbsp;<span className="text-[#1F6F78]">{t("discover.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t("discover.subtitle")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discoveries.map((item, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white group"
            >
              <CardContent className="p-6 text-center">
                <div 
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon className="h-7 w-7" style={{ color: item.color }} />
                </div>
                <h3 className="font-semibold text-lg text-[#0F1C2E] mb-2">
                  {t(item.titleKey)}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t(item.descKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// HOW IT WORKS SECTION
// ============================================
function HowItWorksSection() {
  const t = useTranslations();
  
  const steps = [
    {
      numberKey: "howItWorks.step1.number",
      titleKey: "howItWorks.step1.title",
      descKey: "howItWorks.step1.description",
      icon: Brain,
      timeKey: "howItWorks.step1.time"
    },
    {
      numberKey: "howItWorks.step2.number",
      titleKey: "howItWorks.step2.title",
      descKey: "howItWorks.step2.description",
      icon: Sparkles,
      timeKey: "howItWorks.step2.time"
    },
    {
      numberKey: "howItWorks.step3.number",
      titleKey: "howItWorks.step3.title",
      descKey: "howItWorks.step3.description",
      icon: Target,
      timeKey: "howItWorks.step3.time"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            <Lightbulb className="w-3.5 h-3.5 mr-1" />
            {t("howItWorks.badge")}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] mb-6">
            {t("howItWorks.title")}&nbsp;<span className="text-[#3DD4B0]">{t("howItWorks.titleHighlight")}</span>
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#3DD4B0] via-[#1F6F78] to-[#3DD4B0]" />
            
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step Number Circle */}
                <div className="relative z-10 w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                  <step.icon className="w-12 h-12 text-[#3DD4B0]" />
                </div>
                
                {/* Step Number */}
                <div className="text-sm font-bold text-[#3DD4B0] mb-2">{t(step.numberKey)}</div>
                
                <h3 className="font-semibold text-xl text-[#0F1C2E] mb-3">
                  {t(step.titleKey)}
                </h3>
                <p className="text-slate-600 mb-3">
                  {t(step.descKey)}
                </p>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {t(step.timeKey)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VIDEO SECTION
// ============================================
function VideoSection() {
  const t = useTranslations();
  const tHome = useTranslations("homePage");

  return (
    <section className="py-20 lg:py-28 bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Play className="w-3.5 h-3.5 mr-1" />
              {t("video.badge")}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] mb-4">
              {t("video.title")}&nbsp;<span className="text-[#3DD4B0]">{t("video.titleHighlight")}</span>{t("video.titleEnd")}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t("video.subtitle")}
            </p>
          </div>
          
          {/* Video Player Placeholder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-[#3DD4B0]/20 border border-slate-200 bg-[#0F1C2E]">
            <Image
              src="/hero-image.webp"
              alt={tHome("heroImageAlt")}
              fill
              className="object-cover opacity-80"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Link href="/methodology" className="inline-block">
                <span className="w-20 h-20 rounded-full bg-[#3DD4B0] flex items-center justify-center shadow-lg hover:scale-110 transition-transform group">
                  <Play className="h-8 w-8 text-[#0F1C2E] ml-1 group-hover:scale-110 transition-transform" />
                </span>
              </Link>
            </div>
            {/* Duration Badge */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
              3:24
            </div>
          </div>
          
          {/* Video Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-slate-600">
              <Users className="h-5 w-5 text-[#3DD4B0]" />
              <span className="font-semibold">15,000+</span>
              <span>{t("video.views")}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Heart className="h-5 w-5 text-[#3DD4B0]" />
              <span className="font-semibold">2,400+</span>
              <span>{t("video.likes")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// TESTIMONIALS WITH REAL PHOTOS
// ============================================
function TestimonialsSection() {
  const t = useTranslations();
  
  const testimonials = [
    {
      nameKey: "testimonials.sarah.name",
      roleKey: "testimonials.sarah.role",
      locationKey: "testimonials.sarah.location",
      contentKey: "testimonials.sarah.content",
      resultKey: "testimonials.sarah.result",
      quoteKey: "testimonials.sarah.quote",
      image: "/testimonials/sarah.webp",
      rating: 5
    },
    {
      nameKey: "testimonials.james.name",
      roleKey: "testimonials.james.role",
      locationKey: "testimonials.james.location",
      contentKey: "testimonials.james.content",
      resultKey: "testimonials.james.result",
      quoteKey: "testimonials.james.quote",
      image: "/testimonials/james.webp",
      rating: 5
    },
    {
      nameKey: "testimonials.amira.name",
      roleKey: "testimonials.amira.role",
      locationKey: "testimonials.amira.location",
      contentKey: "testimonials.amira.content",
      resultKey: "testimonials.amira.result",
      quoteKey: "testimonials.amira.quote",
      image: "/testimonials/amira.webp",
      rating: 5
    },
    {
      nameKey: "testimonials.michael.name",
      roleKey: "testimonials.michael.role",
      locationKey: "testimonials.michael.location",
      contentKey: "testimonials.michael.content",
      resultKey: "testimonials.michael.result",
      quoteKey: "testimonials.michael.quote",
      image: "/testimonials/michael.webp",
      rating: 5
    },
    {
      nameKey: "testimonials.fatima.name",
      roleKey: "testimonials.fatima.role",
      locationKey: "testimonials.fatima.location",
      contentKey: "testimonials.fatima.content",
      resultKey: "testimonials.fatima.result",
      quoteKey: "testimonials.fatima.quote",
      image: "/testimonials/fatima.webp",
      rating: 5
    },
    {
      nameKey: "testimonials.david.name",
      roleKey: "testimonials.david.role",
      locationKey: "testimonials.david.location",
      contentKey: "testimonials.david.content",
      resultKey: "testimonials.david.result",
      quoteKey: "testimonials.david.quote",
      image: "/testimonials/david.webp",
      rating: 5
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            <Users className="w-3.5 h-3.5 mr-1" />
            {t("testimonials.badge")}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] mb-6">
            {t("testimonials.title")}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-sm bg-[#F6F8FA] hover:shadow-lg transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Quote at top */}
                <div className="mb-4">
                  <p className="text-[#3DD4B0] font-medium text-sm">"{t(testimonial.quoteKey)}"</p>
                </div>
                
                {/* Full testimonial */}
                <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                  "{t(testimonial.contentKey)}"
                </p>
                
                {/* Result Badge */}
                <Badge className="mb-4 bg-green-50 text-green-700 border border-green-200 text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {t(testimonial.resultKey)}
                </Badge>
                
                {/* Author with photo */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#3DD4B0]/20">
                    <Image 
                      src={testimonial.image}
                      alt={t(testimonial.nameKey)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-[#0F1C2E] text-sm">{t(testimonial.nameKey)}</p>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-xs text-slate-500">{t(testimonial.roleKey)}</p>
                    <p className="text-xs text-slate-400">{t(testimonial.locationKey)}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Trust indicator */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500">
            <Shield className="h-4 w-4 inline mr-1" />
            {t("testimonials.verified")}
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FINAL CTA SECTION
// ============================================
function CTASection() {
  const t = useTranslations();
  const tHome = useTranslations("homePage");
  const { direction } = useLocale();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] relative">
      {/* Background Pattern - contained within overflow wrapper */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(61, 212, 176, 0.15) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t("cta.title")}&nbsp;<span className="text-[#3DD4B0]">{t("cta.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            {t("cta.subtitle")}
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center px-6 py-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-bold text-[#3DD4B0]">2,847+</div>
              <div className="text-slate-400 text-sm">{t("cta.peopleAssessed")}</div>
            </div>
            <div className="text-center px-6 py-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-bold text-[#3DD4B0]">94%</div>
              <div className="text-slate-400 text-sm">{t("cta.accuracyRate")}</div>
            </div>
            <div className="text-center px-6 py-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-bold text-[#3DD4B0]">3 {t("cta.averageTime")}</div>
              <div className="text-slate-400 text-sm">{tHome("min")}</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <Button 
                size="lg" 
                className="bg-[#1F6F78] text-white hover:bg-[#185c63] px-10 h-14 text-lg font-semibold shadow-xl shadow-[#1F6F78]/30 transition-all duration-300 hover:scale-105 group"
              >
                <Sparkles className={`${direction === 'rtl' ? 'ml-3' : 'mr-3'} h-5 w-5`} />
                {t("cta.ctaProducts")}
              </Button>
            </Link>
            <Link href="/quiz">
              <Button 
                size="lg" 
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-10 h-14 text-lg font-semibold shadow-2xl shadow-[#3DD4B0]/30 transition-all duration-300 hover:scale-105 group"
              >
                <Play className={`${direction === 'rtl' ? 'ml-3' : 'mr-3'} h-5 w-5 group-hover:animate-pulse`} />
                {t("cta.ctaAssessment")}
                <ArrowRight className={`${direction === 'rtl' ? 'mr-3 rotate-180' : 'ml-3'} h-5 w-5 group-hover:translate-x-2 transition-transform`} />
              </Button>
            </Link>
          </div>
          
          {/* Final Trust */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#3DD4B0]" />
              <span>{t("hero.trustPrivate")}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
              <span>{t("hero.trustNoEmail")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#3DD4B0]" />
              <span>{t("hero.trustInstant")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Q7 — "THIS MIGHT BE FOR YOU" SECTION
// ============================================
function SelfIdentificationSection() {
  const t = useTranslations();
  const { direction } = useLocale();

  const scenarios = [
    {
      titleKey: "selfIdentification.scenario1Title",
      textKey: "selfIdentification.scenario1Text",
      bottomKey: "selfIdentification.scenario1Bottom",
      icon: CircleDot,
      color: "#3DD4B0"
    },
    {
      titleKey: "selfIdentification.scenario2Title",
      textKey: "selfIdentification.scenario2Text",
      bottomKey: null,
      icon: Brain,
      color: "#1F6F78"
    },
    {
      titleKey: "selfIdentification.scenario3Title",
      textKey: "selfIdentification.scenario3Text",
      bottomKey: "selfIdentification.scenario3Bottom",
      icon: Layers,
      color: "#2A8A94"
    },
    {
      titleKey: "selfIdentification.scenario4Title",
      textKey: "selfIdentification.scenario4Text",
      bottomKey: "selfIdentification.scenario4Bottom",
      icon: AlignCenter,
      color: "#2A8A94"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] mb-4">
            {t("selfIdentification.headline")}
          </h2>
          <p className="text-slate-600 leading-relaxed">
            {t("selfIdentification.intro")}
          </p>
          <p className="text-[#0F1C2E] font-medium mt-2">
            {t("selfIdentification.introLine2")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {scenarios.map((scenario, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-[#F6F8FA] group"
            >
              <CardContent className="p-6 md:p-8">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${scenario.color}15` }}
                >
                  <scenario.icon className="w-5 h-5" style={{ color: scenario.color }} />
                </div>
                
                <h3 className="font-semibold text-lg text-[#0F1C2E] mb-3">
                  {t(scenario.titleKey)}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {t(scenario.textKey)}
                </p>
                
                {scenario.bottomKey && (
                  <p className="text-[#0F1C2E] font-medium text-sm">
                    {t(scenario.bottomKey)}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Closing Lines */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-slate-500 text-sm leading-relaxed">
            {t("selfIdentification.closingLine")}
          </p>
          <p className="text-[#0F1C2E] font-medium mt-2">
            {t("selfIdentification.closingLine2")}
          </p>
          <Link href="/quiz" className="inline-block mt-6">
            <Button 
              variant="outline"
              className="border-[#3DD4B0] text-[#3DD4B0] hover:bg-[#3DD4B0] hover:text-[#0F1C2E] transition-all group"
            >
              {t("selfIdentification.ctaText")}
              <ArrowRight className={`${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4 group-hover:translate-x-1 transition-transform`} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// LAZY-LOADED SECTIONS (Below the Fold)
// ============================================

function DiscoverSectionLazy() {
  return (
    <Suspense fallback={<div className="py-20 lg:py-28 bg-[#F6F8FA]"><div className="container mx-auto px-4"><div className="animate-pulse space-y-6 max-w-3xl mx-auto"><div className="h-8 bg-slate-200 rounded w-1/3 mx-auto" /><div className="h-12 bg-slate-200 rounded w-2/3 mx-auto" /><div className="h-4 bg-slate-200 rounded w-full mx-auto" /></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">{[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-white rounded-xl shadow-sm" />)}</div></div></div>}>
      <DiscoverSection />
    </Suspense>
  );
}

function HowItWorksSectionLazy() {
  return (
    <Suspense fallback={<div className="py-20 lg:py-28 bg-white"><div className="container mx-auto px-4"><div className="animate-pulse space-y-6 max-w-3xl mx-auto"><div className="h-8 bg-slate-200 rounded w-1/3 mx-auto" /><div className="h-12 bg-slate-200 rounded w-2/3 mx-auto" /></div><div className="grid md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">{[...Array(3)].map((_, i) => <div key={i} className="flex flex-col items-center"><div className="w-32 h-32 bg-slate-200 rounded-full mb-4" /><div className="h-4 bg-slate-200 rounded w-24 mb-2" /><div className="h-3 bg-slate-200 rounded w-48" /></div>)}</div></div></div>}>
      <HowItWorksSection />
    </Suspense>
  );
}

function VideoSectionLazy() {
  return (
    <Suspense fallback={<div className="py-20 lg:py-28 bg-[#F6F8FA]"><div className="container mx-auto px-4 max-w-4xl"><div className="animate-pulse"><div className="h-8 bg-slate-200 rounded w-1/3 mx-auto mb-12" /><div className="aspect-video bg-slate-200 rounded-2xl" /></div></div></div>}>
      <VideoSection />
    </Suspense>
  );
}

function TestimonialsSectionLazy() {
  return (
    <Suspense fallback={<div className="py-20 lg:py-28 bg-white"><div className="container mx-auto px-4"><div className="animate-pulse space-y-6 max-w-3xl mx-auto mb-12"><div className="h-8 bg-slate-200 rounded w-1/3 mx-auto" /><div className="h-12 bg-slate-200 rounded w-2/3 mx-auto" /></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => <div key={i} className="h-64 bg-[#F6F8FA] rounded-xl" />)}</div></div></div>}>
      <TestimonialsSection />
    </Suspense>
  );
}

function CTASectionLazy() {
  return (
    <Suspense fallback={<div className="py-20 lg:py-28 bg-[#0F1C2E]"><div className="container mx-auto px-4"><div className="max-w-3xl mx-auto text-center"><div className="h-12 bg-slate-700 rounded w-2/3 mx-auto mb-6" /><div className="h-4 bg-slate-700 rounded w-full mx-auto mb-8" /><div className="h-16 w-64 bg-slate-700 rounded-xl mx-auto" /></div></div></div>}>
      <CTASection />
    </Suspense>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

// ============================================
// RECOVERY SECTION — Integration into Homepage
// ============================================
function RecoverySection() {
  const t = useTranslations("homePage");
  const { direction } = useLocale();

  return (
    <section className="py-20 lg:py-28 bg-white" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge className="mb-4 bg-[#1F6F78]/10 text-[#1F6F78] border-[#1F6F78]/20">
            <Heart className="w-3.5 h-3.5 mr-1.5" />
            {t("recoveryBadge")}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] mb-6">
            {t("recoveryTitle")}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t("recoverySubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Trauma Recovery Card */}
          <Link href="/recovery/trc" className="group">
            <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-[#F6F8FA] to-white">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 bg-[#1F6F78]/10 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7 text-[#1F6F78]" />
                </div>
                <h3 className="font-semibold text-xl text-[#0F1C2E] mb-3">
                  {t("recoveryTrauma")}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t("recoveryTraumaDesc")}
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Porn Recovery Card */}
          <Link href="/recovery/porn-recovery" className="group">
            <Card className="h-full border-0 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-[#F0FDF9] to-white">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 bg-[#3DD4B0]/10 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-7 w-7 text-[#3DD4B0]" />
                </div>
                <h3 className="font-semibold text-xl text-[#0F1C2E] mb-3">
                  {t("recoveryPorn")}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {t("recoveryPornDesc")}
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="text-center">
          <Link href="/recovery">
            <Button className="bg-[#1F6F78] text-white hover:bg-[#1F6F78]/90 font-semibold px-8 py-3 text-base shadow-sm hover:shadow-md transition-all">
              {t("recoveryCTA")}
              <ArrowRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>

      <HeroSection />
      <SelfIdentificationSection />
      <RecoverySection />
      <QuizPreviewWidget />
      <DiscoverSectionLazy />
      <HowItWorksSectionLazy />
      <DailyReflectionPreview />
      <VideoSectionLazy />
      <TestimonialsSectionLazy />
      <CTASectionLazy />

      {/* Promo Banner with Lazy Loading */}
    </>
  );
}
