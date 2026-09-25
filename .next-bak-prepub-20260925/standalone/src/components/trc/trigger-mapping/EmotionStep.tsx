"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Locale, EmotionLabel } from '@/lib/trc/trigger-mapping/types';
import { EMOTION_LABELS } from '@/lib/trc/trigger-mapping/types';
import { getTranslations } from '@/lib/trc/trigger-mapping/translations';

interface EmotionStepProps {
  locale: Locale;
  currentEmotion: EmotionLabel | null;
  currentActivation: number;
  currentNotes: string;
  onUpdate: (updates: { primaryEmotion?: EmotionLabel | null; activationLevel?: number; emotionNotes?: string }) => void;
  onNext: () => void;
  onSkip: () => void;
}

function getActivationLabel(level: number, t: ReturnType<typeof getTranslations>): string {
  if (level <= 3) return t.activationLow;
  if (level <= 6) return t.activationMid;
  if (level <= 8) return t.activationHigh;
  return t.activationOverwhelmed;
}

function getActivationColor(level: number): string {
  if (level <= 3) return '#3DD4B0';
  if (level <= 6) return '#1F6F78';
  if (level <= 8) return '#E8A838';
  return '#E8685A';
}

export default function EmotionStep({
  locale,
  currentEmotion,
  currentActivation,
  currentNotes,
  onUpdate,
  onNext,
  onSkip,
}: EmotionStepProps) {
  const t = getTranslations(locale);
  const [emotion, setEmotion] = useState<EmotionLabel | null>(currentEmotion);
  const [activation, setActivation] = useState(currentActivation);
  const [notes, setNotes] = useState(currentNotes);

  const handleEmotionSelect = (em: EmotionLabel) => {
    const next = emotion === em ? null : em;
    setEmotion(next);
    onUpdate({ primaryEmotion: next });
  };

  const handleActivationChange = (val: number) => {
    setActivation(val);
    onUpdate({ activationLevel: val });
  };

  const handleNotesChange = (val: string) => {
    setNotes(val);
    onUpdate({ emotionNotes: val });
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
          {t.emotionStepTitle}
        </h2>
        <p className="text-slate-500 mb-8">{t.emotionStepSubtitle}</p>

        {/* Emotion selection */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-[#0F1C2E] mb-3">
            {t.emotionLabel}
          </label>
          <div className="flex flex-wrap gap-2">
            {EMOTION_LABELS.map((em) => {
              const isSelected = emotion === em;
              return (
                <button
                  key={em}
                  type="button"
                  onClick={() => handleEmotionSelect(em)}
                  className={[
                    'px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-200',
                    isSelected
                      ? 'border-[#1F6F78] bg-[#1F6F78] text-white'
                      : 'border-slate-200 bg-white text-[#0F1C2E] hover:border-[#1F6F78]/30',
                  ].join(' ')}
                >
                  {t.emotions[em]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Activation slider */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-[#0F1C2E] mb-3">
            {t.activationLabel}
          </label>
          <div className="bg-[#F0F7F7] rounded-xl p-5">
            <input
              type="range"
              min={1}
              max={10}
              value={activation}
              onChange={(e) => handleActivationChange(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#1F6F78]"
            />
            <div className="flex justify-between mt-2 text-xs text-slate-400">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getActivationColor(activation) }}
              />
              <span className="text-sm" style={{ color: getActivationColor(activation) }}>
                {activation} — {getActivationLabel(activation, t)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-10">
          <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
            {t.emotionNotesLabel}
          </label>
          <textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder={t.emotionNotesPlaceholder}
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
            {t.emotionNextButton}
          </button>
          <button
            onClick={onSkip}
            className="flex-1 px-6 py-3.5 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 active:scale-[0.98] transition-all duration-200"
          >
            {t.emotionSkipButton}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

