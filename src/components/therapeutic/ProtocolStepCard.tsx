'use client';

import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import type { ProtocolStep } from './types';

interface ProtocolStepCardProps {
  /** Translation key prefix for this protocol */
  translationKey: string;
  /** Current step data */
  step: ProtocolStep;
  /** Current step index (0-based) */
  stepIndex: number;
  /** Total number of steps */
  totalSteps: number;
  /** Progress percentage */
  progress: number;
  /** Primary accent color */
  accentColor?: string;
  /** Next handler */
  onNext: () => void;
  /** Previous handler */
  onPrev: () => void;
  /** Restart handler */
  onRestart: () => void;
  /** Optional extra content renderer for specific steps */
  renderStepExtra?: (step: ProtocolStep, stepIndex: number) => React.ReactNode;
  /** Complete handler (last step) */
  onComplete?: () => void;
}

/**
 * ProtocolStepCard — Renders a single guided protocol step.
 * Shows: intro, instructions (numbered), hypnotic cue, reflection prompt.
 * Progress bar at top. Navigation at bottom.
 */
export function ProtocolStepCard({
  translationKey,
  step,
  stepIndex,
  totalSteps,
  progress,
  accentColor = '#1F6F78',
  onNext,
  onPrev,
  onRestart,
  onComplete,
  renderStepExtra,
}: ProtocolStepCardProps) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const isLast = stepIndex === totalSteps - 1;
  const isFirst = stepIndex === 0;

  const title = isAr ? step.title.ar : step.title.en;
  const intro = isAr ? step.intro.ar : step.intro.en;
  const instructions = isAr
    ? step.instructions.map(i => i.ar)
    : step.instructions.map(i => i.en);
  const cue = isAr ? step.hypnotic_cue.ar : step.hypnotic_cue.en;
  const reflection = isAr ? step.reflection.ar : step.reflection.en;
  const durationLabel = isAr ? step.durationLabel.ar : step.durationLabel.en;

  const t = useTranslations(translationKey);

  return (
    <div className="min-h-screen flex flex-col" dir={direction}>
      {/* Progress Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between py-3 text-sm">
            <span className="text-[#0F1C2E]/50">
              {isAr
                ? `الخطوة ${stepIndex + 1} من ${totalSteps}`
                : `Step ${stepIndex + 1} of ${totalSteps}`}
            </span>
            <span className="text-[#0F1C2E]/40">{durationLabel}</span>
          </div>
          {/* Bar */}
          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                backgroundColor: accentColor,
              }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 container mx-auto px-4 sm:px-6 py-8 max-w-2xl">
        {/* Step Title */}
        <h2 className="text-2xl font-bold text-[#0F1C2E] mb-2">{title}</h2>

        {/* Intro */}
        <p className="text-[#0F1C2E]/70 leading-[1.9] text-base mb-8">
          {intro}
        </p>

        {/* Instructions — numbered list */}
        <ol className="space-y-4 mb-8" role="list">
          {instructions.map((instruction, idx) => (
            <li
              key={idx}
              className="flex gap-3"
            >
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold text-white mt-0.5"
                style={{ backgroundColor: accentColor }}
                aria-hidden="true"
              >
                {idx + 1}
              </span>
              <p className="text-[#0F1C2E]/80 leading-[1.9] text-base pt-0.5">
                {instruction}
              </p>
            </li>
          ))}
        </ol>

        {/* Interactive Step Content */}
        {renderStepExtra && renderStepExtra(step, stepIndex)}

        {/* Hypnotic Cue — visually distinct */}
        <div
          className="rounded-2xl p-5 mb-8"
          style={{
            backgroundColor: `${accentColor}08`,
            borderLeft: isAr ? 'none' : `3px solid ${accentColor}`,
            borderRight: isAr ? `3px solid ${accentColor}` : 'none',
          }}
        >
          <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: accentColor }}>
            {t('steps.cue')}
          </p>
          <p className="text-[#0F1C2E] leading-[1.9] text-base font-medium">
            {cue}
          </p>
        </div>

        {/* Reflection Prompt */}
        <div className="rounded-2xl bg-[#F5F9F8] p-5 mb-8">
          <p className="text-xs font-medium text-[#1F6F78] uppercase tracking-wider mb-2">
            {t('steps.reflection')}
          </p>
          <p className="text-[#0F1C2E]/70 leading-[1.9] text-base">
            {reflection}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-3 pt-4 border-t border-slate-100" aria-label={isAr ? 'التنقل بين الخطوات' : 'Step navigation'}>
          {!isFirst && (
            <button
              onClick={onPrev}
              className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F1C2E] font-medium hover:bg-slate-50 transition-colors duration-200 text-sm"
            >
              {t('steps.prev')}
            </button>
          )}
          {isFirst && (
            <button
              onClick={onRestart}
              className="flex-1 px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F1C2E]/60 font-medium hover:bg-slate-50 transition-colors duration-200 text-sm"
            >
              {t('steps.restart')}
            </button>
          )}
          {!isLast ? (
            <button
              onClick={onNext}
              className="flex-1 px-4 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg text-sm active:scale-[0.98]"
              style={{ backgroundColor: accentColor }}
            >
              {t('steps.next')}
            </button>
          ) : (
            <button
              onClick={onComplete || onNext}
              className="flex-1 px-4 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg text-sm active:scale-[0.98]"
              style={{ backgroundColor: accentColor }}
            >
              {t('steps.complete')}
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}

export default ProtocolStepCard;
