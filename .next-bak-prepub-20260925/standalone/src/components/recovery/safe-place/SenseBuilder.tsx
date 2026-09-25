'use client';

import { Eye, Ear, Hand, Wind, Coffee } from 'lucide-react';
import type { SenseStep } from '@/lib/recovery/safe-place/types';
import { SENSE_ORDER } from '@/lib/recovery/safe-place/types';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface SenseBuilderProps {
  currentSense: SenseStep;
  senseValues: Record<SenseStep, string>;
  onInputChange: (sense: SenseStep, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ICON_MAP: Record<SenseStep, React.ComponentType<{ className?: string }>> = {
  sight: Eye,
  sound: Ear,
  touch: Hand,
  smell: Wind,
  taste: Coffee,
};

export function SenseBuilder({
  currentSense,
  senseValues,
  onInputChange,
  onNext,
  onPrev,
}: SenseBuilderProps) {
  const { direction } = useLocale();
  const t = useTranslations('recoveryAssets.safe-place');
  const currentIndex = SENSE_ORDER.indexOf(currentSense);
  const IconComponent = ICON_MAP[currentSense];
  const value = senseValues[currentSense];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === SENSE_ORDER.length - 1;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-md w-full space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2">
          {SENSE_ORDER.map((sense, idx) => (
            <div
              key={sense}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-[#1F6F78]'
                  : idx < currentIndex
                  ? 'w-4 bg-[#3DD4B0]'
                  : 'w-4 bg-[#0F1C2E]/10'
              }`}
            />
          ))}
        </div>

        {/* Step Counter */}
        <p className="text-center text-sm text-[#0F1C2E]/50">
          {currentIndex + 1} / {SENSE_ORDER.length}
        </p>

        {/* Sense Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#1F6F78]/10 flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-[#1F6F78]" />
          </div>
        </div>

        {/* Sense Label */}
        <h2 className="text-2xl font-semibold text-[#0F1C2E] text-center">
          {t(`senseBuilder.senses.${currentSense}.label`)}
        </h2>

        {/* Text Input */}
        <div className="space-y-2">
          <textarea
            value={value}
            onChange={(e) => onInputChange(currentSense, e.target.value)}
            placeholder={t(`senseBuilder.senses.${currentSense}.placeholder`)}
            maxLength={300}
            rows={3}
            className="w-full rounded-xl border border-[#0F1C2E]/10 p-4 text-[#0F1C2E] bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30 placeholder:text-[#0F1C2E]/30 leading-relaxed"
            dir={direction}
          />
          <p className="text-xs text-[#0F1C2E]/40 text-left">
            {value.length} / 300
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {!isFirst && (
            <button
              onClick={onPrev}
              className="flex-1 px-4 py-3 rounded-xl bg-transparent border border-[#0F1C2E]/10 text-[#0F1C2E]/70 font-medium hover:bg-[#0F1C2E]/5 transition-colors duration-200"
            >
              {t('senseBuilder.prev')}
            </button>
          )}
          <button
            onClick={onNext}
            className="flex-1 px-4 py-3 rounded-xl bg-[#1F6F78] text-white font-semibold hover:bg-[#1a5e66] transition-colors duration-200 active:scale-[0.98]"
          >
            {isLast ? t('senseBuilder.finish') : t('senseBuilder.next')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SenseBuilder;
