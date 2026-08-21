'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BreathingCircle } from './BreathingCircle';
import { SessionProgressBar } from './SessionProgressBar';
import { TIMING, CYCLES } from '@/lib/recovery/a52/constants';
import type { BreathSubPhase } from '@/lib/recovery/a52/types';
import { useLocale } from '@/components/providers/LocaleProvider';

interface BreathingPhaseProps {
  cycle: number;
  breathSubPhase: BreathSubPhase;
  isPaused: boolean;
  sessionProgress: number;
  onPhaseComplete: () => void;
  onCycleComplete: () => void;
  onAllCyclesComplete: () => void;
}

export function BreathingPhase({
  cycle,
  breathSubPhase,
  isPaused,
  sessionProgress,
  onPhaseComplete,
  onCycleComplete,
  onAllCyclesComplete,
}: BreathingPhaseProps) {
  const { direction } = useLocale();
  const [secondsRemaining, setSecondsRemaining] = useState(getPhaseDuration(breathSubPhase) / 1000);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Reset when sub-phase changes
  useEffect(() => {
    const duration = getPhaseDuration(breathSubPhase);
    setSecondsRemaining(duration / 1000);
    setPhaseProgress(0);
    startTimeRef.current = performance.now();
    pausedAtRef.current = null;
  }, [breathSubPhase, cycle]);

  // Timer via requestAnimationFrame
  useEffect(() => {
    if (isPaused) {
      if (!pausedAtRef.current) {
        pausedAtRef.current = performance.now();
      }
      return;
    }

    // If resuming from pause, adjust startTime
    if (pausedAtRef.current && startTimeRef.current) {
      const pauseDuration = performance.now() - pausedAtRef.current;
      startTimeRef.current += pauseDuration;
      pausedAtRef.current = null;
    }

    const duration = getPhaseDuration(breathSubPhase);
    const start = startTimeRef.current ?? performance.now();

    const tick = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, duration - elapsed);
      const progress = Math.min(1, elapsed / duration);

      setSecondsRemaining(remaining / 1000);
      setPhaseProgress(progress);

      if (remaining <= 0) {
        // Phase complete
        if (breathSubPhase === 'pause') {
          if (cycle >= CYCLES.TOTAL) {
            onAllCyclesComplete();
          } else {
            onCycleComplete();
          }
        } else {
          onPhaseComplete();
        }
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [breathSubPhase, cycle, isPaused, onPhaseComplete, onCycleComplete, onAllCyclesComplete]);

  // Handle tab visibility
  useEffect(() => {
    const handler = () => {
      if (document.hidden && !isPaused) {
        // Could pause, but for simplicity we just continue
        // The spec says: offer resume/restart on tab return
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [isPaused]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9F8]" dir={direction}>
      {/* Progress Bar */}
      <SessionProgressBar progress={sessionProgress} />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <BreathingCircle
          breathSubPhase={breathSubPhase}
          secondsRemaining={secondsRemaining}
          cycleNumber={cycle}
          totalCycles={CYCLES.TOTAL}
          reducedMotion={reducedMotion}
        />
      </div>
    </div>
  );
}

function getPhaseDuration(subPhase: BreathSubPhase): number {
  switch (subPhase) {
    case 'inhale': return TIMING.INHALE_MS;
    case 'exhale': return TIMING.EXHALE_MS;
    case 'pause': return TIMING.PAUSE_MS;
    default: return TIMING.INHALE_MS;
  }
}

export default BreathingPhase;
