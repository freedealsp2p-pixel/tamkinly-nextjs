'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Compass,
  Layers,
  RefreshCw,
  Target,
  Brain,
  Sparkles,
  CheckCircle2,
  Users,
  Clock,
  TrendingUp,
  Lightbulb,
  HelpCircle,
  Feather,
  ListChecks,
  ShieldCheck
} from "lucide-react";
import { useTranslations } from "@/components/providers/LocaleProvider";
import RecoveryPathways from '@/components/recovery/RecoveryPathways';

// ═══════════════════════════════════════════════════════════════
// HERO SECTION - Minimal & Calm
// ═══════════════════════════════════════════════════════════════

function HeroSection() {
  const t = useTranslations("methodologyPage");

  return (
    <section className="bg-[#0F1C2E] py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-6 bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 px-4 py-2">
            {t("heroBadge")}
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-[#8A94A6] leading-relaxed max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1: WHY - Why Does This Matter?
// ═══════════════════════════════════════════════════════════════

function WhySection() {
  const t = useTranslations("methodologyPage");

  const stats = [0, 1, 2].map((idx) => ({
    value: t(`whyStats.${idx}.value`),
    label: t(`whyStats.${idx}.label`)
  }));

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#3DD4B0] flex items-center justify-center text-[#0F1C2E] font-bold text-lg">
              1
            </div>
            <div>
              <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 mb-1">{t("whyBadge")}</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                {t("whyTitle")}
              </h2>
            </div>
          </div>

          {/* Main Question */}
          <div className="mb-12 p-6 bg-[#F6F8FA] rounded-2xl border-l-4 border-[#3DD4B0]">
            <p className="text-xl text-[#0F1C2E] leading-relaxed">
              <span className="font-semibold">{t("whyMainQuestionPrefix")}</span>{t("whyMainQuestion")}
            </p>
          </div>

          {/* The Problem */}
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#2B2E34] leading-relaxed">
              {t("whyP1Prefix")}<span className="font-semibold">{t("whyP1Highlight")}</span>{t("whyP1Suffix")}
            </p>
            
            <Card className="border-0 bg-[#0F1C2E]">
              <CardContent className="p-8">
                <p className="text-lg text-white leading-relaxed italic">
                  &ldquo;{t("whyQuote")}&rdquo;
                </p>
                <p className="text-sm text-[#8A94A6] mt-4">
                  {t("whyQuoteAttrib")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <Card key={idx} className="border border-gray-200 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-[#3DD4B0] mb-2">{stat.value}</div>
                  <div className="text-sm text-[#8A94A6]">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* The Insight */}
          <div className="space-y-4">
            <p className="text-lg text-[#2B2E34] leading-relaxed">
              {t("whyInsightP1Prefix")}
              <span className="font-semibold text-[#0F1C2E]">{t("whyInsightP1Highlight")}</span>
            </p>
            <p className="text-lg text-[#2B2E34] leading-relaxed">
              {t("whyInsightP2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2: WHAT - What Is This About?
// ═══════════════════════════════════════════════════════════════

function WhatSection() {
  const t = useTranslations("methodologyPage");

  const conceptIcons = [Brain, Target, Sparkles, Compass];
  const concepts = [0, 1, 2, 3].map((idx) => ({
    title: t(`concepts.${idx}.title`),
    description: t(`concepts.${idx}.description`),
    icon: conceptIcons[idx]
  }));

  return (
    <section className="py-20 lg:py-28 bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#1F6F78] flex items-center justify-center text-white font-bold text-lg">
              2
            </div>
            <div>
              <Badge className="bg-[#1F6F78]/10 text-[#1F6F78] border-0 mb-1">{t("whatBadge")}</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                {t("whatTitle")}
              </h2>
            </div>
          </div>

          {/* Main Definition */}
          <div className="mb-12 p-8 bg-white rounded-2xl shadow-sm">
            <p className="text-xl text-[#0F1C2E] leading-relaxed mb-6">
              {t("whatMainDef1")}<span className="font-semibold">{t("whatMainDefHighlight")}</span>{t("whatMainDef2")}
            </p>
            <p className="text-[#2B2E34] leading-relaxed">
              {t("whatMainDef3")}
            </p>
          </div>

          {/* Key Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {concepts.map((concept, idx) => (
              <Card key={idx} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0F1C2E] flex items-center justify-center flex-shrink-0">
                      <concept.icon className="w-5 h-5 text-[#3DD4B0]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-2">{concept.title}</h3>
                      <p className="text-sm text-[#8A94A6] leading-relaxed">{concept.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* The Core Shift */}
          <div className="mt-12 p-6 bg-[#0F1C2E] rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
              <div>
                <p className="text-[#8A94A6] text-sm mb-2">{t("coreShiftFrom")}</p>
                <p className="text-white text-lg font-medium">&ldquo;{t("coreShiftFromText")}&rdquo;</p>
              </div>
              <ArrowRight className="w-6 h-6 text-[#3DD4B0] rotate-90 md:rotate-0" />
              <div>
                <p className="text-[#8A94A6] text-sm mb-2">{t("coreShiftTo")}</p>
                <p className="text-[#3DD4B0] text-lg font-medium">&ldquo;{t("coreShiftToText")}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3: HOW - How Does It Work?
// ═══════════════════════════════════════════════════════════════

function HowSection() {
  const t = useTranslations("methodologyPage");

  const phaseIcons = [Compass, Layers, RefreshCw, Target];
  const phases = [0, 1, 2, 3].map((idx) => ({
    number: t(`phases.${idx}.number`),
    icon: phaseIcons[idx],
    title: t(`phases.${idx}.title`),
    subtitle: t(`phases.${idx}.subtitle`),
    description: t(`phases.${idx}.description`),
    activities: [0, 1, 2].map((aIdx) => t(`phases.${idx}.activities.${aIdx}`))
  }));

  const dailyStructureIcons = [Clock, Brain, TrendingUp];
  const dailyStructure = [0, 1, 2].map((idx) => ({
    icon: dailyStructureIcons[idx],
    title: t(`dailyStructure.${idx}.title`),
    description: t(`dailyStructure.${idx}.description`)
  }));

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#0F1C2E] flex items-center justify-center text-white font-bold text-lg">
              3
            </div>
            <div>
              <Badge className="bg-[#0F1C2E]/10 text-[#0F1C2E] border-0 mb-1">{t("howBadge")}</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                {t("howTitle")}
              </h2>
            </div>
          </div>

          {/* Timeline Header */}
          <div className="mb-8 p-6 bg-[#F6F8FA] rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#8A94A6]">{t("timelineHeader")}</span>
              <span className="text-sm font-medium text-[#0F1C2E]">{t("timelinePhases")}</span>
            </div>
            <Progress value={0} className="h-2 bg-gray-200" />
          </div>

          {/* Phases */}
          <div className="space-y-6">
            {phases.map((phase, idx) => (
              <Card key={idx} className="border border-gray-200 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-4">
                    {/* Phase Number */}
                    <div className="bg-[#0F1C2E] p-6 flex flex-col items-center justify-center text-center">
                      <span className="font-serif text-4xl font-bold text-[#3DD4B0]/30 mb-2">
                        {phase.number}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center mb-2">
                        <phase.icon className="h-5 w-5 text-[#3DD4B0]" />
                      </div>
                      <span className="text-xs text-[#8A94A6]">{phase.subtitle}</span>
                    </div>
                    
                    {/* Phase Content */}
                    <div className="lg:col-span-3 p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-xl text-[#0F1C2E]">{phase.title}</h3>
                      </div>
                      <p className="text-[#2B2E34] mb-4 leading-relaxed">{phase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.activities.map((activity, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-[#1F6F78]/30 text-[#1F6F78]">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Daily Structure */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {dailyStructure.map((item, idx) => (
              <Card key={idx} className="border border-gray-200">
                <CardContent className="p-5 text-center">
                  <item.icon className="w-6 h-6 text-[#3DD4B0] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#0F1C2E] mb-1">{item.title}</p>
                  <p className="text-xs text-[#8A94A6]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4: WHAT IF - What If You Applied This?
// ═══════════════════════════════════════════════════════════════

function WhatIfSection() {
  const t = useTranslations("methodologyPage");

  const scenarios = [0, 1, 2, 3].map((idx) => ({
    question: t(`scenarios.${idx}.question`),
    outcome: t(`scenarios.${idx}.outcome`)
  }));

  const questions = [0, 1, 2].map((idx) => t(`reflectionQuestions.${idx}`));

  return (
    <section className="py-20 lg:py-28 bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#3DD4B0] flex items-center justify-center text-[#0F1C2E] font-bold text-lg">
              4
            </div>
            <div>
              <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 mb-1">{t("whatIfBadge")}</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                {t("whatIfTitle")}
              </h2>
            </div>
          </div>

          {/* Scenarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {scenarios.map((scenario, idx) => (
              <Card key={idx} className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  <HelpCircle className="w-5 h-5 text-[#1F6F78] mb-3" />
                  <p className="font-medium text-[#0F1C2E] mb-3">{scenario.question}</p>
                  <p className="text-sm text-[#8A94A6] leading-relaxed">{scenario.outcome}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reflection Questions */}
          <Card className="border-2 border-[#3DD4B0] bg-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-[#3DD4B0]" />
                <h3 className="font-semibold text-xl text-[#0F1C2E]">{t("questionsForYou")}</h3>
              </div>
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-[#F6F8FA] rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-[#0F1C2E] text-white flex items-center justify-center text-sm flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-[#0F1C2E] font-medium">{q}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community */}
          <div className="mt-12 flex items-center justify-center gap-8 text-center flex-wrap">
            <div className="flex items-center gap-2 text-[#8A94A6]">
              <Users className="w-5 h-5" />
              <span className="text-sm">{t("communityEvidence")}</span>
            </div>
            <div className="flex items-center gap-2 text-[#8A94A6]">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm">{t("communityProtocol")}</span>
            </div>
            <div className="flex items-center gap-2 text-[#8A94A6]">
              <Clock className="w-5 h-5" />
              <span className="text-sm">{t("communitySelfPaced")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// PRE-LAUNCH SECTION - Dealing with the Psychological Weight
// ═══════════════════════════════════════════════════════════════

function PreLaunchSection() {
  const t = useTranslations("methodologyPage");

  const weightCards = [0, 1, 2, 3].map((idx) => ({
    title: t(`preLaunch.weightCards.${idx}.title`),
    description: t(`preLaunch.weightCards.${idx}.description`)
  }));

  const smallSteps = [0, 1, 2, 3].map((idx) => t(`preLaunch.smallSteps.${idx}`));

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#C97B7B]/10 text-[#C97B7B] border-0 px-4 py-2">
              <Feather className="w-3.5 h-3.5 mr-1.5" />
              {t("preLaunch.badge")}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] mb-6 leading-tight">
              {t("preLaunch.title")}
            </h2>
            <p className="text-lg text-[#2B2E34] leading-relaxed max-w-2xl mx-auto">
              {t("preLaunch.subtitle")}
            </p>
          </div>

          {/* The Pattern You Recognize */}
          <div className="mb-16 p-8 bg-white rounded-2xl shadow-sm border-l-4 border-[#C97B7B]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#C97B7B]/10 flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 text-[#C97B7B]" />
              </div>
              <h3 className="font-semibold text-xl text-[#0F1C2E]">
                {t("preLaunch.patternTitle")}
              </h3>
            </div>
            <p className="text-[#2B2E34] leading-relaxed text-lg">
              {t("preLaunch.patternText")}
            </p>
          </div>

          {/* Why Starting Feels Heavy — 4 cards */}
          <div className="mb-16">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1C2E] mb-8 text-center">
              {t("preLaunch.weightTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {weightCards.map((card, idx) => (
                <Card key={idx} className="border border-slate-200 bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="w-7 h-7 rounded-full bg-[#0F1C2E] text-[#3DD4B0] flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <h4 className="font-semibold text-[#0F1C2E] pt-0.5">{card.title}</h4>
                    </div>
                    <p className="text-sm text-[#2B2E34] leading-relaxed pl-10">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* The Reframe — large quote */}
          <div className="mb-16 p-8 lg:p-12 bg-[#0F1C2E] rounded-2xl text-center">
            <Lightbulb className="w-8 h-8 text-[#3DD4B0] mx-auto mb-4" />
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3DD4B0] mb-4">
              {t("preLaunch.reframeTitle")}
            </h3>
            <p className="text-lg sm:text-xl text-white leading-relaxed max-w-2xl mx-auto italic">
              {t("preLaunch.reframeText")}
            </p>
          </div>

          {/* The Smallest Possible Step */}
          <div className="mb-16 p-8 bg-white rounded-2xl shadow-sm border-2 border-[#3DD4B0]/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0">
                <ListChecks className="w-5 h-5 text-[#1F6F78]" />
              </div>
              <h3 className="font-semibold text-xl text-[#0F1C2E]">
                {t("preLaunch.smallStepTitle")}
              </h3>
            </div>
            <p className="text-[#2B2E34] mb-6 leading-relaxed">
              {t("preLaunch.smallStepIntro")}
            </p>
            <div className="space-y-3">
              {smallSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-[#F6F8FA] rounded-lg">
                  <span className="w-7 h-7 rounded-full bg-[#1F6F78] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-[#0F1C2E] pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Permission You Didn't Know You Needed */}
          <div className="mb-16 p-8 bg-[#1F6F78]/10 rounded-2xl border-l-4 border-[#1F6F78]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#1F6F78] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-xl text-[#0F1C2E]">
                {t("preLaunch.permissionTitle")}
              </h3>
            </div>
            <p className="text-[#2B2E34] leading-relaxed text-lg">
              {t("preLaunch.permissionText")}
            </p>
          </div>

          {/* If You've Read This Far — closing */}
          <div className="text-center p-8 border-t border-slate-200">
            <Sparkles className="w-6 h-6 text-[#3DD4B0] mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">
              {t("preLaunch.closingTitle")}
            </h3>
            <p className="text-[#2B2E34] leading-relaxed max-w-xl mx-auto">
              {t("preLaunch.closingText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Q8 — COMPARISON TABLE
// ═══════════════════════════════════════════════════════════════

function ComparisonSection() {
  const t = useTranslations("methodologyPage");

  const rows = [0, 1, 2, 3, 4, 5].map((idx) => ({
    feature: t(`comparison.rows.${idx}.feature`),
    tamkinly: t(`comparison.rows.${idx}.tamkinly`),
    habitApps: t(`comparison.rows.${idx}.habitApps`),
    books: t(`comparison.rows.${idx}.books`),
    coaching: t(`comparison.rows.${idx}.coaching`),
  }));

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#3DD4B0]/10 text-[#3DD4B0] border-0">
              {t("comparisonBadge")}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-4">
              {t("comparisonTitle")}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t("comparisonSubtitle")}
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-slate-50 text-sm font-semibold text-[#0F1C2E] rounded-tl-lg">
                    {t("comparisonFeature")}
                  </th>
                  <th className="p-4 bg-[#3DD4B0]/10 text-center rounded-t-lg border-b-2 border-[#3DD4B0]">
                    <div className="text-[#3DD4B0] font-bold text-sm">{t("comparisonColTamkinly")}</div>
                  </th>
                  <th className="p-4 bg-slate-50 text-center text-sm font-semibold text-slate-600">
                    {t("comparisonColHabitApps")}
                  </th>
                  <th className="p-4 bg-slate-50 text-center text-sm font-semibold text-slate-600">
                    {t("comparisonColBooks")}
                  </th>
                  <th className="p-4 bg-slate-50 text-center text-sm font-semibold text-slate-600 rounded-tr-lg">
                    {t("comparisonColCoaching")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-4 text-sm font-medium text-[#0F1C2E] border-b border-slate-100">
                      {row.feature}
                    </td>
                    <td className="p-4 text-center text-sm text-[#0F1C2E] font-medium border-b border-slate-100 bg-[#3DD4B0]/5">
                      {row.tamkinly}
                    </td>
                    <td className="p-4 text-center text-sm text-slate-500 border-b border-slate-100">
                      {row.habitApps}
                    </td>
                    <td className="p-4 text-center text-sm text-slate-500 border-b border-slate-100">
                      {row.books}
                    </td>
                    <td className="p-4 text-center text-sm text-slate-500 border-b border-slate-100">
                      {row.coaching}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View — Rows instead of columns */}
          <div className="md:hidden space-y-4">
            {rows.map((row, idx) => (
              <Card key={idx} className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <h4 className="font-semibold text-[#0F1C2E] mb-3">{row.feature}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#3DD4B0]/10">
                      <span className="text-xs font-semibold text-[#3DD4B0]">{t("comparisonColTamkinly")}</span>
                      <span className="text-sm text-[#0F1C2E] font-medium">{row.tamkinly}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                      <span className="text-xs text-slate-500">{t("comparisonColHabitApps")}</span>
                      <span className="text-sm text-slate-600">{row.habitApps}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                      <span className="text-xs text-slate-500">{t("comparisonColBooks")}</span>
                      <span className="text-sm text-slate-600">{row.books}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                      <span className="text-xs text-slate-500">{t("comparisonColCoaching")}</span>
                      <span className="text-sm text-slate-600">{row.coaching}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// Q9 — HONEST RESULTS SECTION
// ═══════════════════════════════════════════════════════════════

function HonestResultsSection() {
  const t = useTranslations("methodologyPage");

  const results = [0, 1, 2, 3].map((idx) => ({
    text: t(`honestResults.${idx}.text`),
  }));

  return (
    <section className="py-20 lg:py-28 bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-4">
              {t("honestResultsTitle")}
            </h2>
          </div>

          {/* Results — generous whitespace, no icons/numbers/checkmarks */}
          <div className="space-y-16">
            {results.map((result, idx) => (
              <div key={idx} className="text-center">
                <p className="text-lg sm:text-xl text-[#0F1C2E] leading-relaxed max-w-2xl mx-auto">
                  {result.text}
                </p>
              </div>
            ))}
          </div>

          {/* Honest Note */}
          <div className="mt-16 pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-500 text-sm leading-relaxed max-w-xl mx-auto italic">
              {t("honestResultsNote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CTA SECTION
// ═══════════════════════════════════════════════════════════════

function CTASection() {
  const t = useTranslations("methodologyPage");

  return (
    <section className="py-20 lg:py-28 bg-[#0F1C2E]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            {t("ctaTitle")}
          </h2>
          <p className="text-lg text-[#8A94A6] mb-8 leading-relaxed">
            {t("ctaSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-14 font-semibold">
                {t("ctaButton1")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/apps">
              <Button variant="white" size="lg" className="px-8 h-14 font-medium">
                {t("ctaButton2")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    
      <RecoveryPathways />
</section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function MethodologyPage() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <WhatSection />
      <HowSection />
      <WhatIfSection />
      <PreLaunchSection />
      <ComparisonSection />
      <HonestResultsSection />
      <CTASection />
    </>
  );
}
