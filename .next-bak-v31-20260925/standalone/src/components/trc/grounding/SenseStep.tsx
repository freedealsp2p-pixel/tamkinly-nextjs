"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale, SenseType, GroundingPhase } from '@/lib/trc/grounding/types';
import { getTranslations } from '@/lib/trc/grounding/translations';
import { SENSE_ORDER } from '@/lib/trc/grounding/types';

interface SenseStepProps {
  locale: Locale;
  phase: GroundingPhase;
  onNext: () => void;
  onPrev: () => void;
}

const SENSE_ICONS: Record<SenseType, React.ReactNode> = {
  sight: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  sound: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  ),
  touch: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3.026a1.575 1.575 0 01-.156.68l-1.357 3.13a1.575 1.575 0 00.958 2.1l.54.135a1.575 1.575 0 011.026 1.266l.1.643c.055.354.13.705.224 1.049l.998 3.644a1.575 1.575 0 001.54 1.2h.09a1.575 1.575 0 001.526-1.17l.998-3.644a6.839 6.839 0 00.224-1.049l.1-.643a1.575 1.575 0 011.026-1.266l.54-.135a1.575 1.575 0 00.958-2.1l-1.357-3.13a1.575 1.575 0 01-.156-.68V4.575a1.575 1.575 0 10-3.15 0v3.026" />
    </svg>
  ),
  smell: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  taste: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
    </svg>
  ),
};

export default function SenseStep({ locale, phase, onNext }: SenseStepProps) {
  const [showContinue, setShowContinue] = useState(false);
  const senseType = phase as SenseType;
  const senseIdx = SENSE_ORDER.indexOf(senseType);
  const t = getTranslations(locale);

  useEffect(() => {
    setShowContinue(false);
    const timer = setTimeout(() => setShowContinue(true), 3000);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={senseType}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-xl w-full text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-20 h-20 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto text-[#1F6F78] mb-6">
              {SENSE_ICONS[senseType]}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E] mb-4">
              {t.sensePrompt[senseType]}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-lg text-slate-600 leading-relaxed mb-10 max-w-lg mx-auto"
          >
            {t.senseGuidance[senseType]}
          </motion.p>

          <AnimatePresence>
            {showContinue && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={onNext}
                  className="px-8 py-3.5 bg-[#1F6F78] text-white font-medium rounded-2xl
                    hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200
                    shadow-lg shadow-[#1F6F78]/15 text-lg"
                >
                  {t.senseContinue}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
      >
        {SENSE_ORDER.map((sense, idx) => (
          <div
            key={sense}
            className={`rounded-full transition-all duration-500 ${
              idx < senseIdx
                ? 'w-2.5 h-2.5 bg-[#1F6F78]'
                : idx === senseIdx
                ? 'w-6 h-2.5 bg-[#1F6F78]'
                : 'w-2.5 h-2.5 bg-slate-200'
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
}
