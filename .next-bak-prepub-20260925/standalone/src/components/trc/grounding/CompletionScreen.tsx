"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/lib/trc/grounding/types';
import { getTranslations } from '@/lib/trc/grounding/translations';
import EnhancedSuggestedNextStep from '@/components/recovery/system/EnhancedSuggestedNextStep';

interface CompletionScreenProps {
  locale: Locale;
}

export default function CompletionScreen({ locale }: CompletionScreenProps) {
  const t = getTranslations(locale);
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#3DD4B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6 leading-tight">
          {t.completionTitle}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto"
        >
          {t.completionBody}
        </motion.p>

        {/* Suggested next step — A52 Breathing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-6 max-w-md mx-auto"
        >
          <p className="text-sm text-slate-500 mb-3">
            {locale === 'ar'
              ? '\u0623\u062d\u0633\u0646\u062a! \u062c\u0631\u0628 \u0622\u0646 \u062a\u0646\u0641\u0633 A52 \u0643\u062e\u0637\u0648\u0629 \u062a\u0627\u0644\u064a\u0629'
              : 'Well done! Try A52 Breathing next'}
          </p>
          <EnhancedSuggestedNextStep
            program="trc"
            currentStepId="grounding"
            override={{
              stepId: 'a52-breathing',
              route: '/recovery/trc/a52',
              labelEn: 'A52 Breathing',
              labelAr: '\u062a\u0646\u0641\u0633 A52',
              descriptionEn: 'A guided breathing pattern to continue settling your nervous system.',
              descriptionAr: '\u0646\u0645\u0637 \u062a\u0646\u0641\u0633 \u0645\u0648\u062c\u0651\u0647 \u0644\u0645\u0633\u0627\u0639\u062f\u0629 \u062c\u0647\u0627\u0632\u0643 \u0627\u0644\u0639\u0635\u0628\u064a \u0639\u0644\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631.',
              reasonEn: 'A guided breathing pattern to continue settling your nervous system.',
              reasonAr: '\u0646\u0645\u0637 \u062a\u0646\u0641\u0633 \u0645\u0648\u062c\u0651\u0647 \u0644\u0645\u0633\u0627\u0639\u062f\u0629 \u062c\u0647\u0627\u0632\u0643 \u0627\u0644\u0639\u0635\u0628\u064a \u0639\u0644\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631.',
              isPrimary: true,
              isAvailable: true,
              stage: 'safety',
            }}
          />
        </motion.div>

        {/* Primary CTA: go to A52 Breathing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-4"
        >
          <button
            onClick={() => router.push('/recovery/trc/a52')}
            className="px-8 py-4 bg-[#1F6F78] text-white font-medium rounded-2xl hover:bg-[#1a5e66] transition-colors text-lg"
          >
            {t.completionCTA1}
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-slate-400 mb-6"
        >
          {t.completionCTA1Desc}
        </motion.p>

        {/* Secondary: return to TRC hub */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="space-y-3"
        >
          <button
            onClick={() => router.push('/recovery/trc')}
            className="px-6 py-3 bg-slate-100 text-[#0F1C2E] font-medium rounded-xl hover:bg-slate-200 transition-colors text-base"
          >
            {t.completionCTA2}
          </button>

          {/* Link to Grounding Guide — supporting content */}
          <a
            href="/recovery/trc/grounding-guide"
            className="inline-flex items-center gap-2 text-[#1F6F78] hover:text-[#1a5e66] text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.04.255-2.916.714A8.97 8.97 0 003 8.25c0 1.855.637 3.568 1.706 4.923L12 21.75l7.294-8.577A8.97 8.97 0 0021 8.25a8.97 8.97 0 00-3-4.786A8.967 8.967 0 0018 3.75c-1.052 0-2.04.255-2.916.714A8.967 8.967 0 0012 6.042z" />
            </svg>
            {locale === 'ar' ? 'اقرأ دليل التأريض: لماذا يعمل وكيف تستخدمه' : 'Read the Grounding Guide: Why it works and how to use it'}
          </a>

          {/* Link to Printable Companion */}
          <a
            href="/recovery/trc/grounding/printable"
            className="inline-flex items-center gap-2 text-[#1F6F78] hover:text-[#1a5e66] text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 2.72a.75.75 0 00-1.06 1.06L10.94 9a.75.75 0 001.06 0L17.34 3.78a.75.75 0 00-1.06-1.06L12 7.44 6.72 2.72zM2.72 6.72a.75.75 0 001.06 1.06L9 2.72a.75.75 0 00-1.06-1.06L2.72 6.72zM2.72 17.28a.75.75 0 011.06-1.06L12 11.56l8.22 4.66a.75.75 0 11-.44 1.38L12 13.44l-7.78 4.16a.75.75 0 01-1.06-1.06l.56-.56zM6.72 21.28a.75.75 0 00-1.06 1.06L12 17.44l6.34 4.9a.75.75 0 101.06-1.06L12 15.44l-5.28 5.84z" />
            </svg>
            {locale === 'ar' ? 'النسخة القابلة للطباعة' : 'Printable Companion'}
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
