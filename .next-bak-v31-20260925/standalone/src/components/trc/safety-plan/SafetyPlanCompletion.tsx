"use client";

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Locale } from '@/lib/trc/safety-plan/types';
import { getTranslations } from '@/lib/trc/safety-plan/translations';
import { SuggestedNextStep } from '@/components/recovery/system';

interface SafetyPlanCompletionProps {
  locale: Locale;
}

export default function SafetyPlanCompletion({ locale }: SafetyPlanCompletionProps) {
  const t = getTranslations(locale);
  const isRtl = locale === 'ar';
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-2xl w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#3DD4B0]" />
          </div>
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-[#0F1C2E] mb-6 leading-tight">
          {t.completionTitle}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-slate-600 leading-relaxed mb-6 max-w-xl mx-auto"
        >
          {t.completionBody}
        </motion.p>

        {/* Save reminder */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-slate-500 mb-10 max-w-md mx-auto"
        >
          {t.completionSaveReminder}
        </motion.p>

        {/* Next step suggestion — Regulation Toolkit */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-md mx-auto mb-6"
        >
          <SuggestedNextStep
            title={t.completionNextStepTitle}
            description={t.completionNextStepDesc}
            href="/recovery/trc"
            isPrimary
          />
        </motion.div>

        {/* Go home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <button
            onClick={() => router.push('/recovery/trc')}
            className="px-8 py-3 bg-slate-100 text-[#0F1C2E] font-medium rounded-xl hover:bg-slate-200 transition-colors text-base"
          >
            {t.completionGoHome}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
