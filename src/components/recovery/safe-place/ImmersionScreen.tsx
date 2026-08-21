'use client';

import { useEffect, useState, useCallback } from 'react';
import type { SenseStep } from '@/lib/recovery/safe-place/types';
import { SENSE_ORDER } from '@/lib/recovery/safe-place/types';
import { IMMERSION_DURATION_MS, STORAGE_KEY } from '@/lib/recovery/safe-place/constants';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface ImmersionScreenProps {
  senses: Record<SenseStep, string>;
  onFinish: () => void;
}

export function ImmersionScreen({ senses, onFinish }: ImmersionScreenProps) {
  const { direction } = useLocale();
  const t = useTranslations('recoveryAssets.safe-place');
  const [elapsed, setElapsed] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale'>('inhale');

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 100;
        if (next >= IMMERSION_DURATION_MS) {
          clearInterval(interval);
          return IMMERSION_DURATION_MS;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Breathing prompt alternation (4s inhale, 4s exhale)
  useEffect(() => {
    const breathInterval = setInterval(() => {
      setBreathPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
    }, 4000);
    return () => clearInterval(breathInterval);
  }, []);

  // Save to localStorage
  const saveToStorage = useCallback(() => {
    try {
      const data = {
        senses,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, [senses]);

  // Auto-complete when timer finishes
  useEffect(() => {
    if (elapsed >= IMMERSION_DURATION_MS) {
      saveToStorage();
      // Small delay before transitioning
      const timeout = setTimeout(onFinish, 1000);
      return () => clearTimeout(timeout);
    }
  }, [elapsed, onFinish, saveToStorage]);

  const progress = Math.min((elapsed / IMMERSION_DURATION_MS) * 100, 100);
  const remainingSeconds = Math.max(0, Math.ceil((IMMERSION_DURATION_MS - elapsed) / 1000));

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      dir={direction}
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient"
        style={{
          background: `linear-gradient(135deg, #1F6F78, #2A9D8F, #3DD4B0, #2A9D8F, #1F6F78)`,
          backgroundSize: '300% 300%',
          animation: 'gradientShift 8s ease infinite',
        }}
      />
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 max-w-md w-full space-y-6">
        {/* Main Message */}
        <h2 className="text-2xl font-semibold text-white text-center">
          {t('immersion.title')}
        </h2>

        {/* Breathing Prompt */}
        <div className="text-center">
          <p className="text-white/80 text-lg">
            {breathPhase === 'inhale' ? t('immersion.inhale') : t('immersion.exhale')}
          </p>
        </div>

        {/* Senses Description */}
        <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
          {SENSE_ORDER.map((sense) => {
            const value = senses[sense];
            if (!value.trim()) return null;
            return (
              <div key={sense} className="space-y-1">
                <p className="text-white/60 text-xs font-medium">
                  {t(`senseBuilder.senses.${sense}.label`)}
                </p>
                <p className="text-white/90 text-sm leading-relaxed">
                  {value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/80 rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/50 text-xs text-center">
            {remainingSeconds > 0 ? t('immersion.secondsRemaining', { seconds: remainingSeconds }) : t('immersion.completed')}
          </p>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => {
            saveToStorage();
            onFinish();
          }}
          className="block mx-auto text-white/40 text-sm hover:text-white/60 transition-colors duration-200"
        >
          {t('immersion.skip')}
        </button>
      </div>
    </div>
  );
}

export default ImmersionScreen;
