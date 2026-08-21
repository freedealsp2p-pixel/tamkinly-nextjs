"use client";

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import type { Locale, DistressStep } from '@/lib/trc/safety-plan/types';
import { DISTRESS_LEVELS } from '@/lib/trc/safety-plan/types';
import { getTranslations } from '@/lib/trc/safety-plan/translations';

interface DistressStepsStepProps {
  locale: Locale;
  steps: DistressStep[];
  onUpdate: (steps: DistressStep[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const LEVEL_COLORS: Record<string, string> = {
  mild: '#3DD4B0',
  moderate: '#1F6F78',
  high: '#E8685A',
  crisis: '#C53030',
};

const LEVEL_BG: Record<string, string> = {
  mild: '#3DD4B0/5',
  moderate: '#1F6F78/5',
  high: '#E8685A/5',
  crisis: '#C53030/5',
};

export default function DistressStepsStep({ locale, steps, onUpdate, onNext, onBack }: DistressStepsStepProps) {
  const t = getTranslations(locale);
  const isRtl = locale === 'ar';

  const levelLabels: Record<string, string> = {
    mild: t.distressMildLabel,
    moderate: t.distressModerateLabel,
    high: t.distressHighLabel,
    crisis: t.distressCrisisLabel,
  };

  const levelDefaults: Record<string, string> = {
    mild: t.distressMildDefault,
    moderate: t.distressModerateDefault,
    high: t.distressHighDefault,
    crisis: t.distressCrisisDefault,
  };

  const handleActionChange = (level: string, action: string) => {
    const updated = DISTRESS_LEVELS.map(l => ({
      level: l,
      action: l === level ? action : (steps.find(s => s.level === l)?.action || ''),
    }));
    onUpdate(updated);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-[#1F6F78]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E]">{t.distressTitle}</h2>
        </div>
        <p className="text-slate-600 mb-8">{t.distressSubtitle}</p>

        {/* Level cards */}
        <div className="space-y-4 mb-8">
          {DISTRESS_LEVELS.map(level => {
            const step = steps.find(s => s.level === level);
            const action = step?.action || '';
            const color = LEVEL_COLORS[level];
            const bgColor = LEVEL_BG[level];

            return (
              <div key={level} className={`bg-[${bgColor}] border border-[${color}]/20 rounded-2xl p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: color }} />
                  <h3 className="font-semibold text-sm" style={{ color }}>{levelLabels[level]}</h3>
                </div>
                <textarea
                  value={action}
                  onChange={e => handleActionChange(level, e.target.value)}
                  placeholder={levelDefaults[level]}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-[#0F1C2E] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/25 resize-none"
                />
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button onClick={onBack} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
            {t.backLabel}
          </button>
          <button onClick={onNext} className="flex-1 px-6 py-3 bg-[#1F6F78] text-white font-medium rounded-xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200">
            {t.distressNextButton}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
