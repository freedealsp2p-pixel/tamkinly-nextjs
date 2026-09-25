"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '@/lib/trc/grounding/types';
import { getTranslations } from '@/lib/trc/grounding/translations';

interface ExitButtonProps {
  locale: Locale;
}

export default function ExitButton({ locale }: ExitButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const t = getTranslations(locale);

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="fixed top-20 left-4 z-50 rounded-full px-4 py-2 text-sm font-medium
          text-slate-500 bg-white/80 backdrop-blur-sm border border-slate-200
          hover:bg-white hover:text-slate-700 hover:border-slate-300
          transition-all duration-200 shadow-sm"
        aria-label={t.exitButton}
      >
        {t.exitButton}
      </button>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-[#0F1C2E] mb-3">
                {t.exitConfirmTitle}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                {t.exitConfirmBody}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#1F6F78] text-white font-medium
                    hover:bg-[#1a5e66] transition-colors"
                >
                  {t.exitConfirmStay}
                </button>
                <button
                  onClick={() => router.push('/recovery/trc')}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium
                    hover:bg-slate-200 transition-colors"
                >
                  {t.exitConfirmLeave}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
