'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Heart, 
  Target, 
  Users, 
  Lightbulb,
  Compass,
  Scale
} from "lucide-react";
import { useTranslations, useLocale } from "@/components/providers/LocaleProvider";

// Hero Section
function HeroSection() {
  const t = useTranslations("about");
  const { locale } = useLocale();

  return (
    <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/10">
            {t("heroBadge")}
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("heroTitle")}{locale === 'ar' ? '' : '\u00A0'}<span className="text-accent">{t("heroTitleHighlight")}</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t("heroSubtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}

// Mission Section
function MissionSection() {
  const t = useTranslations("about");

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">
              {t("missionBadge")}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-6">
              {t("missionTitle")}
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                {t("missionP1")}
              </p>
              <p>
                {t("missionP2")}
              </p>
              <p>
                {t("missionP3")}
              </p>
            </div>
          </div>
          
          <div className="relative">
            <Card className="border-0 shadow-xl bg-accent/5">
              <CardContent className="p-8 lg:p-10">
                <div className="text-6xl text-accent/30 font-serif mb-4">&ldquo;</div>
                <blockquote className="font-serif text-2xl text-primary leading-relaxed mb-6">
                  {t("missionQuote")}
                </blockquote>
                <p className="text-sm text-slate-500">
                  {t("missionQuoteAttrib")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// Values Section
function ValuesSection() {
  const t = useTranslations("about");

  const values = [
    {
      icon: Heart,
      title: t("value1Title"),
      description: t("value1Desc")
    },
    {
      icon: Target,
      title: t("value2Title"),
      description: t("value2Desc")
    },
    {
      icon: Users,
      title: t("value3Title"),
      description: t("value3Desc")
    },
    {
      icon: Lightbulb,
      title: t("value4Title"),
      description: t("value4Desc")
    },
    {
      icon: Compass,
      title: t("value5Title"),
      description: t("value5Desc")
    },
    {
      icon: Scale,
      title: t("value6Title"),
      description: t("value6Desc")
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            {t("valuesBadge")}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            {t("valuesTitle")}
          </h2>
          <p className="text-slate-600">
            {t("valuesSubtitle")}
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, idx) => (
            <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// What Makes Us Different
function DifferentSection() {
  const t = useTranslations("about");

  const differences = [
    {
      title: t("diff1Title"),
      description: t("diff1Desc")
    },
    {
      title: t("diff2Title"),
      description: t("diff2Desc")
    },
    {
      title: t("diff3Title"),
      description: t("diff3Desc")
    },
    {
      title: t("diff4Title"),
      description: t("diff4Desc")
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {t("differentBadge")}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
              {t("differentTitle")}
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {differences.map((diff, idx) => (
              <Card key={idx} className="border-l-4 border-l-accent border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">{diff.title}</h3>
                  <p className="text-sm text-slate-600">{diff.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Founders Section — A Collective Born From Lived Experience
function FounderSection() {
  const t = useTranslations("about");

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {t("foundersBadge")}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
              {t("foundersTitle")}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t("foundersSubtitle")}
            </p>
          </div>
          
          <Card className="border-0 shadow-2xl bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Team Image Section */}
                <div className="lg:w-2/5 bg-gradient-to-br from-primary via-[#1F6F78] to-primary relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(61,212,176,0.2),transparent_50%)]" />
                  <div className="p-8 lg:p-10 flex flex-col items-center justify-center min-h-[400px] relative">
                    {/* Team Photo */}
                    <div className="relative w-full max-w-[320px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                      <Image 
                        src="/founders-team.webp" 
                        alt={t("foundersImageAlt")} 
                        width={672}
                        height={384}
                        className="w-full h-auto object-cover"
                        priority
                      />
                    </div>
                    
                    {/* Floating badge */}
                    <div className="mt-6 bg-white rounded-full px-5 py-2 shadow-lg border border-accent/20">
                      <span className="text-sm font-medium text-primary flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        {t("foundersLive")}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                  {/* Quote Icon */}
                  <div className="text-6xl text-accent/20 font-serif mb-4">&ldquo;</div>
                  
                  <blockquote className="text-slate-700 leading-relaxed mb-6 text-lg">
                    <p className="mb-4">
                      {t("foundersQuoteP1")}
                    </p>
                    <p className="mb-4">
                      {t("foundersQuoteP2")}
                    </p>
                    <p>
                      {t("foundersQuoteP3")}
                    </p>
                  </blockquote>
                  
                  {/* Founders Info */}
                  <div className="border-t border-slate-200 pt-6 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary text-xl">
                          {t("foundersName")}
                        </p>
                        <p className="text-[#1F6F78] font-medium">
                          {t("foundersRole")}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social proof */}
                  <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-100">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{t("stat1Value")}</p>
                      <p className="text-sm text-slate-500">{t("stat1Label")}</p>
                    </div>
                    <div className="w-px h-10 bg-slate-200" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{t("stat2Value")}</p>
                      <p className="text-sm text-slate-500">{t("stat2Label")}</p>
                    </div>
                    <div className="w-px h-10 bg-slate-200" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{t("stat3Value")}</p>
                      <p className="text-sm text-slate-500">{t("stat3Label")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const t = useTranslations("about");

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            {t("ctaTitleBefore")}
            <span className="text-accent">{t("ctaTitleHighlight")}</span>{t("ctaTitleAfter")}
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                {t("ctaExploreProducts")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/methodology">
              <Button variant="white" size="lg" className="px-8 font-semibold">
                {t("ctaOurMethodology")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <DifferentSection />
      <FounderSection />
      <CTASection />
    </>
  );
}
