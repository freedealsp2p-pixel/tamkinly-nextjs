"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Locale, BodyResponse } from '@/lib/trc/trigger-mapping/types';
import { BODY_RESPONSES } from '@/lib/trc/trigger-mapping/types';
import { getTranslations } from '@/lib/trc/trigger-mapping/translations';

interface BodyResponseStepProps {
  locale: Locale;
  currentResponses: BodyResponse[];
  currentNotes: string;
  onUpdate: (updates: { bodyResponses?: BodyResponse[]; bodyResponseNotes?: string }) => void;
  onNext: () => void;
  onSkip: () => void;
}

export default function BodyResponseStep({
  locale,
  currentResponses,
  currentNotes,
  onUpdate,
  onNext,
  onSkip,
}: BodyResponseStepProps) {
  const t = getTranslations(locale);
  const [selected, setSelected] = useState<Set<BodyResponse>>(new Set(currentResponses));
  const [notes, setNotes] = useState(currentNotes);

  const toggle = (resp: BodyResponse) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(resp)) next.delete(resp);
      else next.add(resp);
      onUpdate({ bodyResponses: Array.from(next.has(resp) ? next : (prev.has(resp) ? (next.delete(resp), next) : (next.add(resp), next))) });
      return next.has(resp) ? new Set([...prev, resp]) : new Set([...prev].filter(r => r !== resp));
    });
  };

  // Simpler toggle
  const handleToggle = (resp: BodyResponse) => {
    const newSet = new Set(selected);
    if (newSet.has(resp)) newSet.delete(resp);
    else newSet.add(resp);
    setSelected(newSet);
    onUpdate({ bodyResponses: Array.from(newSet) });
  };

  const handleNotesChange = (val: string) => {
    setNotes(val);
    onUpdate({ bodyResponseNotes: val });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E] mb-3 leading-tight">
          {t.bodyStepTitle}
        </h2>
        <p className="text-slate-500 mb-8">{t.bodyStepSubtitle}</p>

        {/* Body response checkboxes */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#0F1C2E] mb-3">
            {t.bodyResponseLabel}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BODY_RESPONSES.map((resp) => {
              const respT = t.bodyResponses[resp];
              const isChecked = selected.has(resp);
              return (
                <button
                  key={resp}
                  type="button"
                  onClick={() => handleToggle(resp)}
                  className={[
                    'flex items-start gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-left',
                    isChecked
                      ? 'border-[#1F6F78] bg-[#1F6F78]/5'
                      : 'border-slate-200 bg-white hover:border-[#1F6F78]/30',
                  ].join(' ')}
                >
                  <div className={[
                    'mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
                    isChecked ? 'border-[#1F6F78] bg-[#1F6F78]' : 'border-slate-300',
                  ].join(' ')}>
                    {isChecked && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className={isChecked ? 'text-[#1F6F78] font-medium' : 'text-[#0F1C2E] font-medium'}>
                      {respT.label}
                    </span>
                    <span className="block text-xs text-slate-500 mt-0.5">{respT.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="mb-10">
          <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
            {t.bodyNotesLabel}
          </label>
          <textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder={t.bodyNotesPlaceholder}
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#0F1C2E] placeholder:text-slate-400 focus:border-[#1F6F78] focus:ring-1 focus:ring-[#1F6F78] transition-colors resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onNext}
            className="flex-1 px-6 py-3.5 bg-[#1F6F78] text-white font-medium rounded-xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200"
          >
            {t.bodyNextButton}
          </button>
          <button
            onClick={onSkip}
            className="flex-1 px-6 py-3.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all duration-200"
          >
            {t.bodySkipButton}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

