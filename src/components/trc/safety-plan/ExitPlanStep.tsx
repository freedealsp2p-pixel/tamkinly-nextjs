"use client";

import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import type { Locale } from '@/lib/trc/safety-plan/types';
import { getTranslations } from '@/lib/trc/safety-plan/translations';

interface ExitPlanStepProps {
  locale: Locale;
  exitPlan: {
    stopSignal: string;
    firstAction: string;
    groundingChoice: string;
    contactPerson: string;
    safeDestination: string;
  };
  onUpdate: (updates: Partial<{
    stopSignal: string;
    firstAction: string;
    groundingChoice: string;
    contactPerson: string;
    safeDestination: string;
  }>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ExitPlanStep({ locale, exitPlan, onUpdate, onNext, onBack }: ExitPlanStepProps) {
  const t = getTranslations(locale);
  const isRtl = locale === 'ar';

  const fields = [
    { key: 'stopSignal' as const, label: t.exitStopSignalLabel, placeholder: t.exitStopSignalPlaceholder },
    { key: 'firstAction' as const, label: t.exitFirstActionLabel, placeholder: t.exitFirstActionPlaceholder },
    { key: 'groundingChoice' as const, label: t.exitGroundingLabel, placeholder: t.exitGroundingPlaceholder },
    { key: 'contactPerson' as const, label: t.exitContactLabel, placeholder: t.exitContactPlaceholder },
    { key: 'safeDestination' as const, label: t.exitDestinationLabel, placeholder: t.exitDestinationPlaceholder },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#E8685A]/10 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-[#E8685A]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E]">{t.exitTitle}</h2>
        </div>
        <p className="text-slate-600 mb-8">{t.exitSubtitle}</p>

        {/* Fields */}
        <div className="space-y-5 mb-8">
          {fields.map((field, idx) => (
            <div key={field.key}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#1F6F78]/10 text-[#1F6F78] text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <label className="text-sm font-semibold text-slate-700">{field.label}</label>
              </div>
              <input
                type="text"
                value={exitPlan[field.key]}
                onChange={e => onUpdate({ [field.key]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl border border-[#1F6F78]/20 bg-[#F0F7F7] text-[#0F1C2E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30 text-sm"
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button onClick={onBack} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
            {t.backLabel}
          </button>
          <button onClick={onNext} className="flex-1 px-6 py-3 bg-[#1F6F78] text-white font-medium rounded-xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200">
            {t.exitNextButton}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
