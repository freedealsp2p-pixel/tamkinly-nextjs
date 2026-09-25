'use client';

import React, { useState, useCallback } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Repeat, 
  Zap, 
  Brain, 
  Target, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Calendar,
  FileText,
  Star
} from "lucide-react";
import { useTranslations, useLocale } from "@/components/providers/LocaleProvider";

// Types
type Goal = 'habits' | 'productivity' | 'identity' | 'focus';
type TimeInvestment = '5-10min' | '15-30min' | '30plus';
type Challenge = 'startingHabits' | 'stayingConsistent' | 'knowingWhoIAm' | 'managingTime';

interface WizardAnswers {
  goal: Goal | null;
  time: TimeInvestment | null;
  challenge: Challenge | null;
}

interface ProductRecommendation {
  productKey: string;
  altProductKey: string;
  price: string;
  isFree: boolean;
  ctaKey: string;
  href: string;
}

// Product mapping logic
function getRecommendation(answers: WizardAnswers): ProductRecommendation {
  const { goal, time, challenge } = answers;

  // Goal=Habits + Time=5-10min -> Habit Tracker (FREE)
  if (goal === 'habits' && time === '5-10min') {
    return {
      productKey: 'habitTracker',
      altProductKey: 'dailyPlanner',
      price: '$0',
      isFree: true,
      ctaKey: 'ctaFree',
      href: '/apps',
    };
  }

  // Goal=Habits + Time=15-30min or 30+ -> Daily Planner (BASIC)
  if (goal === 'habits' && (time === '15-30min' || time === '30plus')) {
    return {
      productKey: 'dailyPlanner',
      altProductKey: 'habitTracker',
      price: '$7',
      isFree: false,
      ctaKey: 'ctaGetStarted',
      href: '/products/basic',
    };
  }

  // Goal=Productivity + any -> Goal System (BASIC)
  if (goal === 'productivity') {
    return {
      productKey: 'goalSystem',
      altProductKey: 'dailyPlanner',
      price: '$7',
      isFree: false,
      ctaKey: 'ctaGetStarted',
      href: '/products/basic',
    };
  }

  // Goal=Identity + Challenge=Knowing who I am -> Identity Baseline (BASIC)
  if (goal === 'identity' && challenge === 'knowingWhoIAm') {
    return {
      productKey: 'identityBaseline',
      altProductKey: 'aiCoach',
      price: '$7',
      isFree: false,
      ctaKey: 'ctaGetStarted',
      href: '/products/basic',
    };
  }

  // Goal=Identity + other -> AI Identity Coach (MASTERY)
  if (goal === 'identity') {
    return {
      productKey: 'aiCoach',
      altProductKey: 'identityBaseline',
      price: '$27',
      isFree: false,
      ctaKey: 'ctaGetStarted',
      href: '/products/mastery',
    };
  }

  // Goal=Focus + any -> Goal System (BASIC)
  if (goal === 'focus') {
    return {
      productKey: 'goalSystem',
      altProductKey: 'dailyPlanner',
      price: '$7',
      isFree: false,
      ctaKey: 'ctaGetStarted',
      href: '/products/basic',
    };
  }

  // Default fallback -> Quiz Assessment
  return {
    productKey: 'quiz',
    altProductKey: 'habitTracker',
    price: '$0',
    isFree: true,
    ctaKey: 'ctaFree',
    href: '/quiz',
  };
}

// Icon mapping for product results
const productIcons: Record<string, React.ElementType> = {
  habitTracker: Repeat,
  dailyPlanner: Calendar,
  goalSystem: Target,
  identityBaseline: FileText,
  aiCoach: Brain,
  quiz: Sparkles,
};
// Questions for the wizard - keys match the translation file structure
const questions = [
  {
    titleKey: 'question1',
    field: 'goal' as const,
    options: [
      { key: 'habits' as const, labelKey: 'options.habits', icon: Repeat },
      { key: 'productivity' as const, labelKey: 'options.productivity', icon: Zap },
      { key: 'identity' as const, labelKey: 'options.identity', icon: Brain },
      { key: 'focus' as const, labelKey: 'options.focus', icon: Target },
    ],
  },
  {
    titleKey: 'question2',
    field: 'time' as const,
    options: [
      { key: '5-10min' as const, labelKey: 'timeOptions.5-10min', icon: Clock },
      { key: '15-30min' as const, labelKey: 'timeOptions.15-30min', icon: Clock },
      { key: '30plus' as const, labelKey: 'timeOptions.30plus', icon: Calendar },
    ],
  },
  {
    titleKey: 'question3',
    field: 'challenge' as const,
    options: [
      { key: 'startingHabits' as const, labelKey: 'challengeOptions.startingHabits', icon: RotateCcw },
      { key: 'stayingConsistent' as const, labelKey: 'challengeOptions.stayingConsistent', icon: CheckCircle2 },
      { key: 'knowingWhoIAm' as const, labelKey: 'challengeOptions.knowingWhoIAm', icon: Star },
      { key: 'managingTime' as const, labelKey: 'challengeOptions.managingTime', icon: Clock },
    ],
  },
];

export default function ProductRecommender() {
  const t = useTranslations('productRecommender');
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<WizardAnswers>({ goal: null, time: null, challenge: null });
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');
  const [isAnimating, setIsAnimating] = useState(false);

  const recommendation = currentStep === 3 ? getRecommendation(answers) : null;

  const goToStep = useCallback((step: number) => {
    setIsAnimating(true);
    setSlideDirection(step > currentStep ? 'left' : 'right');
    setTimeout(() => { setCurrentStep(step); setIsAnimating(false); }, 150);
  }, [currentStep]);

  const handleSelect = useCallback((field: keyof WizardAnswers, value: string) => {
    const newAnswers = { ...answers, [field]: value };
    setAnswers(newAnswers);
    if (currentStep < 2) {
      goToStep(currentStep + 1);
    } else {
      goToStep(3);
    }
  }, [answers, currentStep, goToStep]);

  const handleRetake = useCallback(() => {
    setAnswers({ goal: null, time: null, challenge: null });
    goToStep(0);
  }, [goToStep]);

  return (
    <section className="py-16 bg-[#0F1C2E]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-2">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-12 sm:w-20 h-1 rounded-full transition-all duration-500 ${
                  currentStep >= step ? 'bg-[#3DD4B0]' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-2">{currentStep + 1}/3</p>
        </div>

        <div className="relative">
          <div className="bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
            {currentStep < 3 && questions[currentStep] && (
              <div className={`transition-all duration-300 ${isAnimating ? (slideDirection === 'left' ? 'opacity-0 -translate-x-8' : 'opacity-0 translate-x-8') : 'opacity-100 translate-x-0'}`}>
                {currentStep > 0 && (
                  <button onClick={() => goToStep(currentStep - 1)} className="mb-4 text-slate-400 hover:text-[#3DD4B0] transition-colors text-sm flex items-center gap-1 cursor-pointer">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    {t('back')}
                  </button>
                )}
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-8">{t(questions[currentStep].titleKey)}</h2>
                <div className="grid gap-3 sm:gap-4">
                  {questions[currentStep].options.map((option) => {
                    const Icon = option.icon;
                    const isSelected = answers[questions[currentStep].field] === option.key;
                    return (
                      <button
                        key={option.key}
                        onClick={() => handleSelect(questions[currentStep].field, option.key)}
                        className={`group w-full flex items-center gap-4 p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                          isSelected ? 'bg-[#3DD4B0]/15 border-[#3DD4B0]/50 text-white shadow-lg shadow-[#3DD4B0]/10' : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-md'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isSelected ? 'bg-[#3DD4B0] text-[#0F1C2E]' : 'bg-white/[0.08] text-slate-400 group-hover:text-[#3DD4B0]'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-base sm:text-lg font-medium">{t(option.labelKey)}</span>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] ml-auto flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {currentStep === 3 && recommendation && (
              <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="text-center mb-6">
                  <Sparkles className="w-12 h-12 text-[#3DD4B0] mx-auto mb-4" />
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">{t('result.title')}</h2>
                  <p className="text-slate-300">{t('resultTitle')}</p>
                </div>
                <div className="bg-white/[0.07] rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                      {(() => { const Ic = productIcons[recommendation.productKey] || Star; return <Ic className="w-6 h-6 text-[#3DD4B0]" />; })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{t(`products.${recommendation.productKey}.name`)}</h3>
                      <p className="text-[#3DD4B0] font-semibold">{recommendation.price}{recommendation.isFree ? '' : (isAr ? '/شهر' : '/mo')}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-4">{t(`products.${recommendation.productKey}.description`)}</p>
                  <Link href={recommendation.href}>
                    <Button className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold h-11">
                      {recommendation.isFree ? t('ctaFree') : t('ctaGetStarted')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04] border border-white/10">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{t(`products.${recommendation.altProductKey}.name`)}</p>
                    <p className="text-slate-400 text-xs mt-0.5 line-clamp-2">{t(`products.${recommendation.altProductKey}.description`)}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                </div>
                <button onClick={handleRetake} className="mt-6 w-full flex items-center justify-center gap-2 text-slate-400 hover:text-[#3DD4B0] transition-colors text-sm cursor-pointer">
                  <RotateCcw className="w-4 h-4" />
                  {t('result.retake')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
