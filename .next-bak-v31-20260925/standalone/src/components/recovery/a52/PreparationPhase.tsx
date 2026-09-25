'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface PreparationPhaseProps {
  onComplete: () => void;
}

export function PreparationPhase({ onComplete }: PreparationPhaseProps) {
  const { direction } = useLocale();
  const t = useTranslations('recoveryAssets.a52');
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }
    const timer = setTimeout(() => setCount(count - 1), 2500);
    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F9F8]" dir={direction}>
      {/* Instruction */}
      <p className="text-lg text-[#0F1C2E]/70 mb-8">
        {t('preparation.instruction')}
      </p>

      {/* Countdown */}
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-7xl font-light text-[#1F6F78]"
        >
          {count}
        </motion.div>
      </AnimatePresence>

      {/* Rest-state circle preview */}
      <div className="mt-8 w-20 h-20 rounded-full bg-[#1F6F78]/20" />
    </div>
  );
}

export default PreparationPhase;
