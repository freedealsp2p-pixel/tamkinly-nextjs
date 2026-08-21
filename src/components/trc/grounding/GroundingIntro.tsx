"use client";

import { motion } from 'framer-motion';
import type { Locale } from '@/lib/trc/grounding/types';
import { getTranslations } from '@/lib/trc/grounding/translations';

interface GroundingIntroProps {
  locale: Locale;
  onBegin: () => void;
}

export default function GroundingIntro({ locale, onBegin }: GroundingIntroProps) {
  const t = getTranslations(locale);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <div className="mb-10">
          <div className="w-12 h-12 rounded-2xl bg-[#1F6F78]/10 flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-[#1F6F78]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6 leading-tight">
            {t.introTitle}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8">
            {t.introBody}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-gradient-to-br from-[#1F6F78]/5 to-[#3DD4B0]/5 border border-[#1F6F78]/10
            rounded-2xl p-6 md:p-8 mb-10"
        >
          <p className="text-slate-700 leading-relaxed text-lg">
            {t.introBridge}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-4"
        >
          <button
            onClick={onBegin}
            className="w-full md:w-auto px-8 py-4 bg-[#1F6F78] text-white text-lg font-medium
              rounded-2xl hover:bg-[#1a5e66] active:scale-[0.98]
              transition-all duration-200 shadow-lg shadow-[#1F6F78]/20"
          >
            {t.beginButton}
          </button>
          <a
            href="/recovery/trc/grounding-guide"
            className="inline-flex items-center gap-2 text-[#1F6F78] hover:text-[#1a5e66] text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.04.255-2.916.714A8.97 8.97 0 003 8.25c0 1.855.637 3.568 1.706 4.923L12 21.75l7.294-8.577A8.97 8.97 0 0021 8.25a8.97 8.97 0 00-3-4.786A8.967 8.967 0 0018 3.75c-1.052 0-2.04.255-2.916.714A8.967 8.967 0 0012 6.042z" />
            </svg>
            {locale === 'ar' ? 'اقرأ دليل التأريض: لماذا يعمل وكيف تستخدمه' : 'Read the Grounding Guide: Why it works and how to use it'}
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
