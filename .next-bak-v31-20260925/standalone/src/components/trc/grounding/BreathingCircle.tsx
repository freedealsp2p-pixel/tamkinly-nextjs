"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Locale } from '@/lib/trc/grounding/types';
import { getTranslations } from '@/lib/trc/grounding/translations';

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

interface BreathingCircleProps {
  locale: Locale;
  onComplete: () => void;
}

export default function BreathingCircle({ locale, onComplete }: BreathingCircleProps) {
  const t = getTranslations(locale);
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('rest');
  const [cycles, setCycles] = useState(0);
  const [started, setStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const PHASE_DURATIONS: Record<BreathPhase, number> = {
    inhale: 5000,
    hold: 2000,
    exhale: 5000,
    rest: 1500,
  };

  const runCycle = useCallback(() => {
    setBreathPhase('inhale');
    timerRef.current = setTimeout(() => {
      setBreathPhase('hold');
      timerRef.current = setTimeout(() => {
        setBreathPhase('exhale');
        timerRef.current = setTimeout(() => {
          setBreathPhase('rest');
          timerRef.current = setTimeout(() => {
            setCycles(prev => {
              const next = prev + 1;
              if (next >= 3) {
                setBreathPhase('rest');
                return next;
              }
              runCycle();
              return next;
            });
          }, PHASE_DURATIONS.rest);
        }, PHASE_DURATIONS.exhale);
      }, PHASE_DURATIONS.hold);
    }, PHASE_DURATIONS.inhale);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleStart = () => {
    setStarted(true);
    runCycle();
  };

  const phaseLabel: Record<BreathPhase, string> = {
    inhale: t.breathingInhale,
    hold: t.breathingHold,
    exhale: t.breathingExhale,
    rest: t.breathingDone,
  };

  const scaleMap: Record<BreathPhase, number> = {
    inhale: 1.4,
    hold: 1.4,
    exhale: 0.85,
    rest: 1,
  };

  const durMap: Record<BreathPhase, number> = {
    inhale: 5,
    exhale: 5,
    hold: 2,
    rest: 1.5,
  };

  const isDone = cycles >= 3;
  const scale = scaleMap[breathPhase];
  const duration = started ? durMap[breathPhase] : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E] mb-4">
          {t.breathingTitle}
        </h2>

        <p className="text-slate-600 leading-relaxed mb-10">
          {t.breathingGuidance}
        </p>

        <div className="relative w-48 h-48 mx-auto mb-10">
          <motion.div
            animate={{ scale: started ? scale : 1 }}
            transition={{ duration, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(31,111,120,0.15) 0%, rgba(61,212,176,0.08) 70%, transparent 100%)',
              border: '2px solid rgba(31,111,120,0.2)',
            }}
          />
          <motion.div
            animate={{ scale: started ? scale : 1 }}
            transition={{ duration, ease: 'easeInOut' }}
            className="absolute inset-6 rounded-full bg-gradient-to-br from-[#1F6F78]/20 to-[#3DD4B0]/20"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              key={breathPhase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#1F6F78] font-medium text-lg"
            >
              {started ? phaseLabel[breathPhase] : ''}
            </motion.span>
          </div>
        </div>

        {!started ? (
          <button
            onClick={handleStart}
            className="px-8 py-3.5 bg-[#1F6F78] text-white font-medium rounded-2xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#1F6F78]/15 text-lg"
          >
            {t.startBreathing}
          </button>
        ) : isDone ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onComplete}
            className="px-8 py-3.5 bg-[#1F6F78] text-white font-medium rounded-2xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#1F6F78]/15 text-lg"
          >
            {t.nextButton}
          </motion.button>
        ) : null}
      </motion.div>
    </div>
  );
}
