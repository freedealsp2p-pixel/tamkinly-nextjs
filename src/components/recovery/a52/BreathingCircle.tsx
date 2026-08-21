'use client';

import { motion } from 'framer-motion';
import { VISUAL } from '@/lib/recovery/a52/constants';
import type { BreathSubPhase } from '@/lib/recovery/a52/types';
import { useTranslations } from '@/components/providers/LocaleProvider';

interface BreathingCircleProps {
  breathSubPhase: BreathSubPhase | null;
  secondsRemaining: number;
  cycleNumber: number;
  totalCycles: number;
  reducedMotion: boolean;
}

export function BreathingCircle({
  breathSubPhase,
  secondsRemaining,
  cycleNumber,
  totalCycles,
  reducedMotion,
}: BreathingCircleProps) {
  const t = useTranslations('recoveryAssets.a52');

  // Determine scale based on sub-phase
  const scale = breathSubPhase === 'inhale' ? VISUAL.SCALE_PEAK 
    : breathSubPhase === 'exhale' ? VISUAL.SCALE_REST 
    : VISUAL.SCALE_REST;
  
  // Determine color based on sub-phase
  const color = breathSubPhase === 'inhale' ? VISUAL.COLOR_PEAK : VISUAL.COLOR_REST;
  
  // Determine animation duration
  const duration = breathSubPhase === 'inhale' ? 5 
    : breathSubPhase === 'exhale' ? 2 
    : 0;

  // Phase label
  const phaseLabel = breathSubPhase === 'inhale' ? t('breathing.inhale') : breathSubPhase === 'exhale' ? t('breathing.exhale') : '';

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: 280,
          height: 280,
          boxShadow: '0 20px 60px rgba(31, 111, 120, 0.3)',
        }}
        animate={reducedMotion ? {} : {
          scale: scale,
          backgroundColor: color,
          filter: breathSubPhase === 'inhale' 
            ? 'drop-shadow(0 0 30px rgba(61, 212, 176, 0.4))' 
            : 'drop-shadow(0 0 10px rgba(31, 111, 120, 0.2))',
        }}
        transition={reducedMotion ? {} : {
          duration: duration,
          ease: VISUAL.BREATHING_EASING as unknown as number[],
        }}
      >
        {/* Central seconds counter */}
        <div className="flex flex-col items-center text-white">
          <span className="text-6xl font-light tabular-nums">
            {Math.ceil(secondsRemaining)}
          </span>
          {phaseLabel && (
            <span className="text-xl font-medium opacity-85 mt-1">
              {phaseLabel}
            </span>
          )}
        </div>

        {/* SVG Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 280 280">
          <circle
            cx="140" cy="140" r="135"
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity="0.2"
          />
          <circle
            cx="140" cy="140" r="135"
            fill="none"
            stroke="white"
            strokeWidth="3"
            opacity="0.6"
            strokeDasharray={`${2 * Math.PI * 135}`}
            strokeDashoffset={`${2 * Math.PI * 135 * (1 - getPhaseProgress(breathSubPhase, secondsRemaining))}`}
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Cycle counter below circle */}
      <div className="mt-6 text-center">
        <p className="text-lg text-[#0F1C2E] font-medium">
          {t('breathing.cycleCount', { current: cycleNumber, total: totalCycles })}
        </p>
        <p className="text-sm text-[#0F1C2E]/60 mt-1">
          {t('breathing.followCircle')}
        </p>
      </div>
    </div>
  );
}

function getPhaseProgress(subPhase: BreathSubPhase | null, secondsRemaining: number): number {
  if (subPhase === 'inhale') return 1 - (secondsRemaining / 5);
  if (subPhase === 'exhale') return 1 - (secondsRemaining / 2);
  if (subPhase === 'pause') return 1 - (secondsRemaining / 1);
  return 0;
}

export default BreathingCircle;
