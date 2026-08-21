'use client';

import { useEffect, useRef, useState } from 'react';
import { BODY_PARTS, Sensation } from '@/lib/recovery/body-scan/types';
import { COLORS, INTEGRATION_BREATHING_MS } from '@/lib/recovery/body-scan/constants';
import { useTranslations } from '@/components/providers/LocaleProvider';

interface BodyPartResult {
  part: string;
  sensation: Sensation;
}

interface IntegrationScreenProps {
  sensations: BodyPartResult[];
  onFinish: () => void;
}

export default function IntegrationScreen({ sensations, onFinish }: IntegrationScreenProps) {
  const t = useTranslations('recoveryAssets.body-scan');
  const [breathingDone, setBreathingDone] = useState(false);
  const [breathProgress, setBreathProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / INTEGRATION_BREATHING_MS) * 100);
      setBreathProgress(pct);

      if (pct >= 100) {
        setBreathingDone(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function sensationLabel(s: Sensation): string {
    switch (s) {
      case 'tension': return t('integration.sensation.tension');
      case 'ease': return t('integration.sensation.ease');
      case 'neutral': return t('integration.sensation.neutral');
      default: return '—';
    }
  }

  function sensationColor(s: Sensation): string {
    switch (s) {
      case 'tension': return COLORS.tension;
      case 'ease': return COLORS.ease;
      case 'neutral': return COLORS.neutral;
      default: return COLORS.textMuted;
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-8" style={{ backgroundColor: COLORS.bgDark }}>
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.textPrimary }}>
        {t('integration.title')}
      </h2>

      {/* Body parts summary */}
      <div className="w-full max-w-md space-y-3 mb-8">
        {sensations.map((result, i) => {
          const bp = BODY_PARTS[i];
          return (
            <div
              key={result.part}
              className="flex items-center justify-between px-4 py-3 rounded-xl"
              style={{ backgroundColor: COLORS.bgCard, border: `1px solid ${COLORS.border}` }}
            >
              <span className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>
                {t(`scanning.bodyParts.${bp.id}.label`)}
              </span>
              <span
                className="text-sm px-3 py-1 rounded-full"
                style={{
                  backgroundColor: sensationColor(result.sensation) + '20',
                  color: sensationColor(result.sensation),
                }}
              >
                {sensationLabel(result.sensation)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Breathing pause */}
      {!breathingDone ? (
        <div className="w-full max-w-xs text-center mb-6">
          <p className="text-sm mb-3" style={{ color: COLORS.textSecondary }}>
            {t('integration.breathingInstruction')}
          </p>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.progressTrack }}>
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{ backgroundColor: COLORS.primary, width: `${breathProgress}%` }}
            />
          </div>
          <p className="text-xs mt-2" style={{ color: COLORS.textMuted }}>
            {t('integration.secondsRemaining', { seconds: Math.ceil((INTEGRATION_BREATHING_MS - (INTEGRATION_BREATHING_MS * breathProgress / 100)) / 1000) })}
          </p>
        </div>
      ) : (
        <p className="text-sm mb-6" style={{ color: COLORS.primary }}>
          {t('integration.thankYou')}
        </p>
      )}

      {/* Continue button */}
      <button
        onClick={onFinish}
        className="px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105"
        style={{ backgroundColor: COLORS.primary, color: '#fff' }}
      >
        {t('integration.continue')}
      </button>
    </div>
  );
}
