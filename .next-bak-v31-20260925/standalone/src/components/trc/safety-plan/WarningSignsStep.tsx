"use client";

import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import type { Locale } from '@/lib/trc/safety-plan/types';
import { getTranslations } from '@/lib/trc/safety-plan/translations';

interface WarningSignsStepProps {
  locale: Locale;
  physical: string[];
  emotional: string[];
  behavioral: string[];
  custom: string;
  onUpdateCategory: (category: 'physical' | 'emotional' | 'behavioral', items: string[]) => void;
  onUpdateCustom: (custom: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function WarningSignsStep({
  locale, physical, emotional, behavioral, custom,
  onUpdateCategory, onUpdateCustom, onNext, onBack,
}: WarningSignsStepProps) {
  const t = getTranslations(locale);
  const isRtl = locale === 'ar';

  const toggleItem = (category: 'physical' | 'emotional' | 'behavioral', item: string) => {
    const current = category === 'physical' ? physical : category === 'emotional' ? emotional : behavioral;
    const next = current.includes(item) ? current.filter(i => i !== item) : [...current, item];
    onUpdateCategory(category, next);
  };

  const renderChips = (category: 'physical' | 'emotional' | 'behavioral', items: string[], selected: string[]) => (
    <div className="flex flex-wrap gap-2">
      {items.map(item => {
        const isSelected = selected.includes(item);
        return (
          <button
            key={item}
            onClick={() => toggleItem(category, item)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              isSelected
                ? 'bg-[#1F6F78] text-white shadow-sm'
                : 'bg-[#F0F7F7] text-slate-600 hover:bg-[#1F6F78]/10 border border-[#1F6F78]/10'
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );

  const physicalKeys = Object.keys(t.warningPhysical);
  const emotionalKeys = Object.keys(t.warningEmotional);
  const behavioralKeys = Object.keys(t.warningBehavioral);

  const physicalLabels = physicalKeys.map(k => t.warningPhysical[k]);
  const emotionalLabels = emotionalKeys.map(k => t.warningEmotional[k]);
  const behavioralLabels = behavioralKeys.map(k => t.warningBehavioral[k]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#E8685A]/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-[#E8685A]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E]">{t.warningTitle}</h2>
        </div>
        <p className="text-slate-600 mb-8 ml-13">{t.warningSubtitle}</p>

        {/* Physical */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#1F6F78] uppercase tracking-wide mb-3">{t.warningPhysicalLabel}</h3>
          {renderChips('physical', physicalLabels, physical.map(k => t.warningPhysical[k]))}
        </div>

        {/* Emotional */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#1F6F78] uppercase tracking-wide mb-3">{t.warningEmotionalLabel}</h3>
          {renderChips('emotional', emotionalLabels, emotional.map(k => t.warningEmotional[k]))}
        </div>

        {/* Behavioral */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#1F6F78] uppercase tracking-wide mb-3">{t.warningBehavioralLabel}</h3>
          {renderChips('behavioral', behavioralLabels, behavioral.map(k => t.warningBehavioral[k]))}
        </div>

        {/* Custom */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-slate-700 block mb-2">{t.warningCustomLabel}</label>
          <textarea
            value={custom}
            onChange={e => onUpdateCustom(e.target.value)}
            placeholder={t.warningCustomPlaceholder}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-[#1F6F78]/20 bg-[#F0F7F7] text-[#0F1C2E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30 resize-none"
          />
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            {t.backLabel}
          </button>
          <button
            onClick={onNext}
            className="flex-1 px-6 py-3 bg-[#1F6F78] text-white font-medium rounded-xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200"
          >
            {t.warningNextButton}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
