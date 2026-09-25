"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Locale, TriggerCategory } from '@/lib/trc/trigger-mapping/types';
import { TRIGGER_CATEGORIES } from '@/lib/trc/trigger-mapping/types';
import { getTranslations } from '@/lib/trc/trigger-mapping/translations';

interface TriggerEntryStepProps {
  locale: Locale;
  currentDescription: string;
  currentCategory: TriggerCategory | null;
  onUpdate: (updates: { triggerDescription?: string; triggerCategory?: TriggerCategory | null }) => void;
  onNext: () => void;
  onStopHere: () => void;
}

export default function TriggerEntryStep({
  locale,
  currentDescription,
  currentCategory,
  onUpdate,
  onNext,
  onStopHere,
}: TriggerEntryStepProps) {
  const t = getTranslations(locale);
  const [description, setDescription] = useState(currentDescription);
  const [category, setCategory] = useState<TriggerCategory | null>(currentCategory);

  const handleCategorySelect = (cat: TriggerCategory) => {
    setCategory(prev => prev === cat ? null : cat);
    onUpdate({ triggerCategory: category === cat ? null : cat });
  };

  const handleDescriptionChange = (val: string) => {
    setDescription(val);
    onUpdate({ triggerDescription: val });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E] mb-3 leading-tight">
          {t.triggerStepTitle}
        </h2>
        <p className="text-slate-500 mb-8">{t.triggerStepSubtitle}</p>

        {/* Category Selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-[#0F1C2E] mb-3">
            {t.triggerCategoryLabel}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRIGGER_CATEGORIES.map((cat) => {
              const catT = t.triggerCategories[cat];
              const isSelected = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={[
                    'flex flex-col items-start px-4 py-3 rounded-xl border transition-all duration-200 text-left',
                    isSelected
                      ? 'border-[#1F6F78] bg-[#1F6F78]/5 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-[#1F6F78]/30 hover:bg-[#F0F7F7]',
                  ].join(' ')}
                >
                  <span className={isSelected ? 'text-[#1F6F78] font-semibold' : 'text-[#0F1C2E] font-medium'}>
                    {catT.label}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5">{catT.description}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Free-text description */}
        <div className="mb-10">
          <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
            {t.triggerDescriptionLabel}
          </label>
          <textarea
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder={t.triggerDescriptionPlaceholder}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#0F1C2E] placeholder:text-slate-400 focus:border-[#1F6F78] focus:ring-1 focus:ring-[#1F6F78] transition-colors resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onNext}
            className="flex-1 px-6 py-3.5 bg-[#1F6F78] text-white font-medium rounded-xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200"
          >
            {t.triggerNextButton}
          </button>
          <button
            onClick={onStopHere}
            className="flex-1 px-6 py-3.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all duration-200"
          >
            {t.triggerStopHere}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

