'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { Pause, Play, SkipForward } from 'lucide-react';
import { BODY_PARTS, Sensation } from '@/lib/recovery/body-scan/types';
import { COLORS, BODY_REGIONS } from '@/lib/recovery/body-scan/constants';
import { useTranslations } from '@/components/providers/LocaleProvider';

interface ScanningPhaseProps {
  currentPartIndex: number;
  sensation: Sensation;
  isPaused: boolean;
  onSetSensation: (sensation: Sensation) => void;
  onNextPart: () => void;
  onGoBack: () => void;
  onSetPaused: (isPaused: boolean) => void;
  onFinishScanning: () => void;
}

/* ── Sensation Button ─────────────────────────────────────── */

function SensationButton({
  label,
  selected,
  color,
  onClick,
}: {
  label: string;
  selected: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200"
      style={{
        backgroundColor: selected ? color + '30' : COLORS.bgCard,
        color: selected ? color : COLORS.textSecondary,
        border: `2px solid ${selected ? color : COLORS.border}`,
        transform: selected ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {label}
    </button>
  );
}

/* ── Body Outline SVG ─────────────────────────────────────── */

function BodyOutlineSVG({ highlightPart }: { highlightPart: string }) {
  const region = BODY_REGIONS[highlightPart];

  const partColor = COLORS.primary;
  const dimColor = COLORS.textMuted;

  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className="w-48 h-64 mx-auto" aria-label="Body outline">
      {/* Head */}
      <ellipse
        cx="50" cy="10" rx="9" ry="10"
        fill="none"
        stroke={highlightPart === 'neck-face' ? partColor : dimColor}
        strokeWidth={highlightPart === 'neck-face' ? 1.2 : 0.8}
      />
      {/* Neck */}
      <rect
        x="46" y="19" width="8" height="6"
        fill="none"
        stroke={highlightPart === 'neck-face' ? partColor : dimColor}
        strokeWidth={highlightPart === 'neck-face' ? 1.2 : 0.8}
      />
      {/* Torso */}
      <path
        d="M36 25 L64 25 L62 52 L38 52 Z"
        fill="none"
        stroke={['chest', 'abdomen'].includes(highlightPart) ? partColor : dimColor}
        strokeWidth={['chest', 'abdomen'].includes(highlightPart) ? 1.2 : 0.8}
      />
      {/* Left arm */}
      <path
        d="M36 27 L20 42 L18 52"
        fill="none"
        stroke={highlightPart === 'arms' ? partColor : dimColor}
        strokeWidth={highlightPart === 'arms' ? 1.2 : 0.8}
        strokeLinecap="round"
      />
      {/* Right arm */}
      <path
        d="M64 27 L80 42 L82 52"
        fill="none"
        stroke={highlightPart === 'arms' ? partColor : dimColor}
        strokeWidth={highlightPart === 'arms' ? 1.2 : 0.8}
        strokeLinecap="round"
      />
      {/* Hips */}
      <path
        d="M38 52 L62 52 L60 58 L40 58 Z"
        fill="none"
        stroke={highlightPart === 'abdomen' ? partColor : dimColor}
        strokeWidth={highlightPart === 'abdomen' ? 1.2 : 0.8}
      />
      {/* Left leg */}
      <path
        d="M40 58 L42 82 L40 92"
        fill="none"
        stroke={['legs', 'feet'].includes(highlightPart) ? partColor : dimColor}
        strokeWidth={['legs', 'feet'].includes(highlightPart) ? 1.2 : 0.8}
        strokeLinecap="round"
      />
      {/* Right leg */}
      <path
        d="M60 58 L58 82 L60 92"
        fill="none"
        stroke={['legs', 'feet'].includes(highlightPart) ? partColor : dimColor}
        strokeWidth={['legs', 'feet'].includes(highlightPart) ? 1.2 : 0.8}
        strokeLinecap="round"
      />

      {/* Highlight glow overlay */}
      {region && (
        <rect
          x={region.x * 100}
          y={region.y * 100}
          width={region.width * 100}
          height={region.height * 100}
          fill={COLORS.primary}
          opacity="0.15"
          rx="3"
          ry="3"
        />
      )}
    </svg>
  );
}

/* ── Timer Bar with real animation ────────────────────────── */

function TimerBarWithState({
  durationMs,
  isPaused,
  onComplete,
  t,
}: {
  durationMs: number;
  isPaused: boolean;
  onComplete: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}) {
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(Math.ceil(durationMs / 1000));
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);
  const totalPausedMsRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const completedRef = useRef(false);

  const tick = useCallback(() => {
    if (completedRef.current) return;

    const now = Date.now();
    const elapsed = now - startTimeRef.current - totalPausedMsRef.current;
    const pct = Math.min(100, (elapsed / durationMs) * 100);
    setProgress(pct);
    setRemaining(Math.max(0, Math.ceil((durationMs - elapsed) / 1000)));

    if (pct >= 100 && !completedRef.current) {
      completedRef.current = true;
      onComplete();
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [durationMs, onComplete]);

  useEffect(() => {
    if (isPaused) {
      cancelAnimationFrame(rafRef.current);
      pausedAtRef.current = Date.now();
      return;
    }

    if (pausedAtRef.current > 0) {
      totalPausedMsRef.current += Date.now() - pausedAtRef.current;
      pausedAtRef.current = 0;
    }

    if (startTimeRef.current === 0) {
      startTimeRef.current = Date.now();
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused, tick]);

  // Reset when duration changes (new body part)
  useEffect(() => {
    startTimeRef.current = Date.now();
    totalPausedMsRef.current = 0;
    pausedAtRef.current = 0;
    completedRef.current = false;
    setProgress(0);
    setRemaining(Math.ceil(durationMs / 1000));
  }, [durationMs]);

  return (
    <div className="w-full max-w-xs">
      <div className="flex justify-between text-xs mb-1" style={{ color: COLORS.textMuted }}>
        <span>{t('scanning.progress')}</span>
        <span>{t('scanning.secondsRemaining', { seconds: remaining })}</span>
      </div>
      <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.progressTrack }}>
        <div
          className="h-full rounded-full"
          style={{ backgroundColor: COLORS.progressFill, width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>
    </div>
  );
}

/* ── Main Scanning Phase ──────────────────────────────────── */

export default function ScanningPhase({
  currentPartIndex,
  sensation,
  isPaused,
  onSetSensation,
  onNextPart,
  onGoBack,
  onSetPaused,
  onFinishScanning,
}: ScanningPhaseProps) {
  const t = useTranslations('recoveryAssets.body-scan');
  const bodyPart = BODY_PARTS[currentPartIndex];
  const totalParts = BODY_PARTS.length;

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-8" style={{ backgroundColor: COLORS.bgDark }}>
      {/* Progress indicator dots */}
      <div className="flex items-center gap-2 mb-6">
        {BODY_PARTS.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                i < currentPartIndex
                  ? COLORS.primary
                  : i === currentPartIndex
                    ? COLORS.primaryLight
                    : COLORS.border,
              transform: i === currentPartIndex ? 'scale(1.4)' : 'scale(1)',
            }}
          />
        ))}
        <span className="text-xs mr-2" style={{ color: COLORS.textMuted }}>
          {currentPartIndex + 1}/{totalParts}
        </span>
      </div>

      {/* Body part name */}
      <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.textPrimary }}>
        {t(`scanning.bodyParts.${bodyPart.id}.label`)}
      </h2>

      {/* Body outline SVG */}
      <div className="my-4">
        <BodyOutlineSVG highlightPart={bodyPart.id} />
      </div>

      {/* Instruction */}
      <p className="text-base leading-relaxed max-w-md text-center mb-6" style={{ color: COLORS.textSecondary }}>
        {t(`scanning.bodyParts.${bodyPart.id}.instruction`)}
      </p>

      {/* Timer bar */}
      <TimerBarWithState
        durationMs={bodyPart.durationMs}
        isPaused={isPaused}
        onComplete={onNextPart}
        t={t}
      />

      {/* Sensation buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6 mt-4">
        <SensationButton
          label={t('scanning.sensation.tension')}
          selected={sensation === 'tension'}
          color={COLORS.tension}
          onClick={() => onSetSensation('tension')}
        />
        <SensationButton
          label={t('scanning.sensation.ease')}
          selected={sensation === 'ease'}
          color={COLORS.ease}
          onClick={() => onSetSensation('ease')}
        />
        <SensationButton
          label={t('scanning.sensation.neutral')}
          selected={sensation === 'neutral'}
          color={COLORS.neutral}
          onClick={() => onSetSensation('neutral')}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={onGoBack}
          className="px-4 py-2 rounded-lg text-sm transition-all"
          style={{
            backgroundColor: COLORS.bgCard,
            color: COLORS.textSecondary,
            border: `1px solid ${COLORS.border}`,
            opacity: currentPartIndex === 0 ? 0.4 : 1,
          }}
          disabled={currentPartIndex === 0}
        >
          {t('scanning.goBack')}
        </button>

        <button
          onClick={() => onSetPaused(!isPaused)}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
          style={{ backgroundColor: COLORS.primary + '30', color: COLORS.primary }}
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>

        <button
          onClick={onNextPart}
          className="px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-1"
          style={{ backgroundColor: COLORS.bgCard, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }}
        >
          {t('scanning.skip')} <SkipForward size={14} />
        </button>
      </div>
    </div>
  );
}
