'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  Anchor, CheckCircle2, Circle, Compass, Eye, Flame, HelpCircle, Mic,
  Pause, Play, Puzzle, RotateCcw, Sunrise, VenetianMask, Wand2, type LucideIcon,
} from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import type { ProtocolStep } from './types';
import { StepAudio } from './StepAudio';

/** Source-declared step icons — calm visual identity, one per step */
const STEP_ICONS: Record<string, LucideIcon> = {
  eye: Eye,
  pause: Pause,
  'help-circle': HelpCircle,
  'rotate-ccw': RotateCcw,
  sunrise: Sunrise,
  anchor: Anchor,
  puzzle: Puzzle,
  'wand-2': Wand2,
  compass: Compass,
  flame: Flame,
  'check-circle': CheckCircle2,
  mask: VenetianMask,
  circle: Circle,
  mic: Mic,
};

interface ProtocolStepCardProps {
  /** Translation key prefix for this protocol (per-protocol labels) */
  translationKey: string;
  /** Current step data — from the authoritative protocol source */
  step: ProtocolStep;
  /** Current step index (0-based) */
  stepIndex: number;
  /** Total number of steps */
  totalSteps: number;
  /** Subtle progress fraction (0-100) — orientation only */
  progress: number;
  /** Primary accent color */
  accentColor?: string;
  /** Next handler */
  onNext: () => void;
  /** Previous handler */
  onPrev: () => void;
  /** Restart handler — reached only via explicit user choice */
  onRestart: () => void;
  /** Pause handler */
  onPause: () => void;
  /** Whether the session is currently paused */
  isPaused: boolean;
  /** Resume handler */
  onResume: () => void;
  /** Optional extra content renderer for specific steps (e.g. Name Decoder) */
  renderStepExtra?: (step: ProtocolStep, stepIndex: number) => React.ReactNode;
  /** Complete handler (last step) */
  onComplete?: () => void;
}

/**
 * ProtocolStepCard — the guided session screen.
 *
 * Screen hierarchy (kept visually dominant, low distraction):
 *   step identifier -> step title -> current guidance (intro + instructions)
 *   -> current interaction (renderStepExtra) -> optional audio
 *   -> optional reflection -> primary continue control.
 *
 * Progress is orientation only: "Step X of N" + a subtle bar. No scores,
 * percentages as achievement, streaks, or gamified elements.
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
  onPause,
  isPaused,
  onResume,
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
  const ts = useTranslations('therapeuticProtocols.shared');

  // Source-driven narration: intro -> instructions -> hypnotic cue.
  const audioSegments = useMemo(
    () => [intro, ...instructions, cue],
    [intro, instructions, cue]
  );

  const StepIcon = STEP_ICONS[step.icon] ?? Circle;

  // Accessibility: when the paused overlay opens (role="dialog", aria-modal),
  // move keyboard focus to its primary action. Restores nothing on close —
  // the overlay unmounts and focus returns to the document flow naturally.
  const resumeButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (isPaused) {
      resumeButtonRef.current?.focus();
    }
  }, [isPaused]);

  return (
    <div className="min-h-screen flex flex-col bg-white" dir={direction}>
      {/* Header: step identifier + subtle orientation */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl">
          <div className="flex items-center justify-between py-3 text-sm">
            <span className="text-[#0F1C2E]/55 font-medium">
              {ts('session.stepOf', { n: stepIndex + 1, total: totalSteps })}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[#0F1C2E]/40">{durationLabel}</span>
              <button
                type="button"
                onClick={onPause}
                disabled={isPaused}
                aria-label={ts('session.pause')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-[#0F1C2E]/60 hover:bg-slate-50 hover:text-[#0F1C2E] transition-colors disabled:opacity-40"
              >
                <Pause className="w-3.5 h-3.5" />
                {ts('session.pause')}
              </button>
            </div>
          </div>
          {/* Subtle step indicator */}
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
      <div className="flex-1 container mx-auto px-4 sm:px-6 py-10 max-w-2xl">
        {/* Step icon — calm visual identity */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
          style={{ backgroundColor: `${accentColor}10` }}
          aria-hidden="true"
        >
          <StepIcon className="w-6 h-6" style={{ color: accentColor }} />
        </div>

        {/* Step Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E] mb-3">{title}</h1>

        {/* Current guidance — intro */}
        <p className="text-[#0F1C2E]/70 leading-[1.9] text-base mb-8">
          {intro}
        </p>

        {/* Instructions — numbered, from source */}
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

        {/* Interactive Step Content (e.g. Name Decoder) */}
        {renderStepExtra && renderStepExtra(step, stepIndex)}

        {/* Optional audio — source-derived narration */}
        <div className="mt-8">
          <StepAudio segments={audioSegments} accentColor={accentColor} paused={isPaused} />
        </div>

        {/* Hypnotic Cue — visually distinct, from source */}
        <div
          className="rounded-2xl p-5 mt-8"
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

        {/* Optional Reflection — connected to the current step, no entry forced */}
        <div className="rounded-2xl bg-[#F5F9F8] p-5 mt-6">
          <p className="text-xs font-medium text-[#1F6F78] uppercase tracking-wider mb-2">
            {ts('session.reflectionOptional')}
          </p>
          <p className="text-[#0F1C2E]/70 leading-[1.9] text-base">
            {reflection}
          </p>
        </div>

        {/* Navigation — primary continue control, restart only by explicit choice */}
        <nav className="flex items-center gap-3 mt-10 pt-5 border-t border-slate-100" aria-label={isAr ? 'التنقل بين الخطوات' : 'Step navigation'}>
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
              {/* On the first step "restart" actually returns to the overview —
                  label it accordingly instead of implying the step resets. */}
              {ts('preparation.back')}
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

      {/* Paused overlay — calm, never implies failure */}
      {isPaused && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/92 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label={ts('session.pausedTitle')}
        >
          <div className="max-w-sm w-full text-center space-y-6">
            <div className="flex justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}10` }}
              >
                <Play className="w-7 h-7" style={{ color: accentColor }} />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#0F1C2E]">
                {ts('session.pausedTitle')}
              </h2>
              <p className="text-sm text-[#0F1C2E]/55 leading-relaxed">
                {ts('session.pausedBody')}
              </p>
            </div>
            <div className="space-y-3">
              <button
                ref={resumeButtonRef}
                onClick={onResume}
                className="w-full px-6 py-3.5 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
                style={{ backgroundColor: accentColor }}
              >
                {ts('session.resume')}
              </button>
              <p className="text-xs text-[#0F1C2E]/35">
                {ts('session.leaveHint')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProtocolStepCard;
