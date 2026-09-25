"use client";

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import type { Locale } from '@/lib/trc/safety-plan/types';
import { getTranslations } from '@/lib/trc/safety-plan/translations';

interface SafetyPlanIntroProps {
  locale: Locale;
  onConsent: () => void;
}

export default function SafetyPlanIntro({ locale, onConsent }: SafetyPlanIntroProps) {
  const t = getTranslations(locale);
  const isRtl = locale === 'ar';

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-[#1F6F78]/10 flex items-center justify-center mb-6">
          <Shield className="w-6 h-6 text-[#1F6F78]" />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6 leading-tight">
          {t.introTitle}
        </h1>

        {/* Description */}
        <p className="text-lg text-slate-600 leading-relaxed mb-6">
          {t.introDescription}
        </p>

        {/* Key message box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gradient-to-br from-[#1F6F78]/5 to-[#3DD4B0]/5 border border-[#1F6F78]/10 rounded-2xl p-6 md:p-8 mb-6"
        >
          <p className="text-[#1F6F78] font-semibold text-lg leading-relaxed">
            {t.introKeyMessage}
          </p>
        </motion.div>

        {/* Come back note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-[#F0F7F7] border border-[#1F6F78]/10 rounded-xl p-4 mb-4"
        >
          <p className="text-slate-600 text-sm leading-relaxed">
            {t.introComeBack}
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

        {/* Framework note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-[#1F6F78]/5 border border-[#1F6F78]/10 rounded-xl p-4 mb-8"
        >
          <p className="text-[#0F1C2E]/80 text-sm leading-relaxed">
            {t.introFrameworkNote}
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
