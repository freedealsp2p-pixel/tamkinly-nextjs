"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/trc/trigger-mapping/types';
import { getTranslations } from '@/lib/trc/trigger-mapping/translations';

interface WhatHelpedStepProps {
  locale: Locale;
  currentWhatHelped: string;
  currentWouldHelpNextTime: string;
  onUpdate: (updates: { whatHelped?: string; wouldHelpNextTime?: string }) => void;
  onNext: () => void;
  onSkip: () => void;
}

export default function WhatHelpedStep({
  locale,
  currentWhatHelped,
  currentWouldHelpNextTime,
  onUpdate,
  onNext,
  onSkip,
}: WhatHelpedStepProps) {
  const t = getTranslations(locale);
  const [whatHelped, setWhatHelped] = useState(currentWhatHelped);
  const [wouldHelpNextTime, setWouldHelpNextTime] = useState(currentWouldHelpNextTime);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E] mb-3 leading-tight">
          {t.helpedStepTitle}
        </h2>
        <p className="text-slate-500 mb-8">{t.helpedStepSubtitle}</p>

        {/* What helped */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
            {t.whatHelpedLabel}
          </label>
          <textarea
            value={whatHelped}
            onChange={(e) => { setWhatHelped(e.target.value); onUpdate({ whatHelped: e.target.value }); }}
            placeholder={t.whatHelpedPlaceholder}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#0F1C2E] placeholder:text-slate-400 focus:border-[#1F6F78] focus:ring-1 focus:ring-[#1F6F78] transition-colors resize-none"
          />
        </div>

        {/* Would help next time */}
        <div className="mb-10">
          <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
            {t.wouldHelpNextTimeLabel}
          </label>
          <textarea
            value={wouldHelpNextTime}
            onChange={(e) => { setWouldHelpNextTime(e.target.value); onUpdate({ wouldHelpNextTime: e.target.value }); }}
            placeholder={t.wouldHelpNextTimePlaceholder}
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
            {t.helpedNextButton}
          </button>
          <button
            onClick={onSkip}
            className="flex-1 px-6 py-3.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all duration-200"
          >
            {t.helpedSkipButton}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

