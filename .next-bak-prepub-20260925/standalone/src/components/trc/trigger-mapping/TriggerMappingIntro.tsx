"use client";

import { motion } from 'framer-motion';
import type { Locale } from '@/lib/trc/trigger-mapping/types';
import { getTranslations } from '@/lib/trc/trigger-mapping/translations';

interface TriggerMappingIntroProps {
  locale: Locale;
  onConsent: () => void;
}

export default function TriggerMappingIntro({ locale, onConsent }: TriggerMappingIntroProps) {
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-[#1F6F78]/10 flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-[#1F6F78]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.592c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87l1.054.527c.35.176.78.166 1.12-.04l1.09-.642c.33-.196.75-.196 1.08 0l1.09.642c.34.206.77.216 1.12.04l1.054-.527c.332-.184.582-.496.645-.87l.213-1.281c.09-.542.56-.94 1.11-.94h2.592c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87l1.054.527c.35.176.78.166 1.12-.04l1.09-.642c.33-.196.75-.196 1.08 0l1.09.642c.34.206.77.216 1.12.04l1.054-.527c.332-.184.582-.496.645-.87l.213-1.281c.09-.542.56-.94 1.11-.94h2.592c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87l1.054.527c.35.176.78.166 1.12-.04l1.09-.642c.33-.196.75-.196 1.08 0l1.09.642c.34.206.77.216 1.12.04l1.054-.527c.332-.184.582-.496.645-.87l.213-1.281c.09-.542.56-.94 1.11-.94h2.592c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87l1.054.527c.35.176.78.166 1.12-.04l1.09-.642c.33-.196.75-.196 1.08 0l1.09.642c.34.206.77.216 1.12.04l1.054-.527c.332-.184.582-.496.645-.87l.213-1.281c.09-.542.56-.94 1.11-.94h2.592" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6 leading-tight">
          {t.introTitle}
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          {t.introDescription}
        </p>

        {/* Methodology box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gradient-to-br from-[#1F6F78]/5 to-[#3DD4B0]/5 border border-[#1F6F78]/10 rounded-2xl p-6 md:p-8 mb-6"
        >
          <p className="text-slate-700 leading-relaxed">
            {t.introMethodology}
          </p>
        </motion.div>

        {/* What it does / does not do */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="space-y-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <div className="mt-1.5 w-2 h-2 rounded-full bg-[#3DD4B0] shrink-0" />
            <p className="text-slate-600 leading-relaxed">{t.introWhatItDoes}</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1.5 w-2 h-2 rounded-full bg-[#E8685A] shrink-0" />
            <p className="text-slate-600 leading-relaxed">{t.introWhatItDoesNot}</p>
          </div>
        </motion.div>

        {/* Important note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-[#1F6F78]/5 border border-[#1F6F78]/10 rounded-xl p-4 mb-4"
        >
          <p className="text-[#0F1C2E] font-medium text-sm leading-relaxed">
            {t.introNoEventDescription}
          </p>
        </motion.div>

        {/* Contraindication */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-[#E8685A]/5 border border-[#E8685A]/15 rounded-xl p-4 mb-8"
        >
          <p className="text-[#0F1C2E]/80 text-sm leading-relaxed">
            {t.introContraindication}
          </p>
        </motion.div>

        {/* Consent button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <button
            onClick={onConsent}
            className="w-full md:w-auto px-8 py-4 bg-[#1F6F78] text-white text-lg font-medium rounded-2xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#1F6F78]/20"
          >
            {t.beginButton}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

