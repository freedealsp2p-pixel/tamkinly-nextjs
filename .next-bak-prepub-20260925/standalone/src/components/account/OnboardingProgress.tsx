"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, Mail, ChevronRight, Sparkles, Clock, Gift } from "lucide-react";
import { useTranslations, useLocale } from "@/components/providers/LocaleProvider";
import { ONBOARDING_EMAILS, getOnboardingProgress } from "@/lib/email-onboarding";

const STEP_ICONS = [Mail, Sparkles, Clock, Gift, ChevronRight];

export default function OnboardingProgress({ daysSincePurchase = 0 }: { daysSincePurchase?: number }) {
  const t = useTranslations();
  const { direction } = useLocale();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const progress = getOnboardingProgress(daysSincePurchase);

  const toggleStep = (day: number) => {
    setCompletedSteps(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div className="relative bg-gradient-to-br from-[#0F1C2E] via-[#162B42] to-[#1A3350] rounded-2xl p-6 sm:p-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3DD4B0]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#1F6F78]/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {direction === "rtl" ? "رحلة البدء" : "Your Onboarding Journey"}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {direction === "rtl"
                  ? `${progress.percentage}% مكتمل`
                  : `${progress.percentage}% complete`}
              </p>
            </div>
            <div className="text-3xl font-bold text-[#3DD4B0]">
              {progress.percentage}%
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1F6F78] to-[#3DD4B0] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {ONBOARDING_EMAILS.map((email, index) => {
              const isCompleted = completedSteps.includes(email.day) || email.day <= daysSincePurchase;
              const isCurrent = email.day === ONBOARDING_EMAILS.find(e => e.day > daysSincePurchase)?.day || (index === ONBOARDING_EMAILS.length - 1 && daysSincePurchase >= email.day);
              const Icon = STEP_ICONS[index] || Mail;

              return (
                <div
                  key={email.day}
                  className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "bg-[#3DD4B0]/10 border border-[#3DD4B0]/30"
                      : isCompleted
                      ? "bg-white/5 border border-white/10"
                      : "bg-white/[0.02] border border-white/5 opacity-50"
                  }`}
                  onClick={() => toggleStep(email.day)}
                >
                  {/* Step indicator */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? "bg-[#3DD4B0]/20"
                      : isCurrent
                      ? "bg-[#3DD4B0]/20 ring-2 ring-[#3DD4B0]/50"
                      : "bg-white/10"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
                    ) : (
                      <Icon className="w-5 h-5 text-slate-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        isCurrent
                          ? "bg-[#3DD4B0]/20 text-[#3DD4B0]"
                          : isCompleted
                          ? "bg-white/10 text-slate-400"
                          : "bg-white/5 text-slate-500"
                      }`}>
                        {direction === "rtl" ? `يوم ${email.day}` : `Day ${email.day}`}
                      </span>
                      {isCurrent && (
                        <span className="text-xs text-[#3DD4B0] animate-pulse">
                          {direction === "rtl" ? "حالي" : "Current"}
                        </span>
                      )}
                    </div>
                    <h4 className={`text-sm font-semibold ${isCompleted ? "text-white" : "text-slate-400"}`}>
                      {direction === "rtl" ? email.subjectAr : email.subjectEn}
                    </h4>
                  </div>

                  {/* Check action */}
                  {!isCompleted && isCurrent && (
                    <div className="flex-shrink-0">
                      <Circle className="w-5 h-5 text-[#3DD4B0]/50 hover:text-[#3DD4B0] transition-colors" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Current tip */}
          {progress.currentEmail && (
            <div className="mt-6 p-4 bg-[#3DD4B0]/10 border border-[#3DD4B0]/20 rounded-xl">
              <p className="text-sm text-[#3DD4B0] font-medium">
                {direction === "rtl" ? "💡 نصيحة اليوم:" : "💡 Today\'s tip:"}
              </p>
              <p className="text-sm text-slate-300 mt-1">
                {direction === "rtl"
                  ? progress.currentEmail.previewAr
                  : progress.currentEmail.previewEn}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

