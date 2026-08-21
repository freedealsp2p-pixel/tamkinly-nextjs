'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Wind, Shield } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

/**
 * DistressCheckIn — Safety UX Component
 *
 * A gentle, non-intrusive check-in card for therapeutic exercises.
 * This is NOT gamification, NOT scoring, NOT diagnosis.
 * It is a SAFETY CHECK — "Are you okay to continue?"
 *
 * Check-in types:
 * - continue: "Would you like to continue?" (at exercise midpoint)
 * - comfort: "Are you comfortable enough to continue?" (after intense phases)
 * - stop: "Would you like to stop now?" (always available)
 * - grounding: "Would you like to return to grounding?" (when distress detected)
 * - dissociation: "Do you still feel connected to your body?" (body scan specific)
 * - reminder: Gentle text reminder (no options, dismissible)
 */

export type CheckInType = 'continue' | 'comfort' | 'stop' | 'grounding' | 'dissociation' | 'reminder';

export interface CheckInOption {
  labelAr: string;
  labelEn: string;
  action: 'continue' | 'pause' | 'stop' | 'grounding' | 'slow-down';
}

export interface DistressCheckInProps {
  /** Type of check-in to display */
  type: CheckInType;
  /** Called when user chooses to continue */
  onContinue?: () => void;
  /** Called when user needs a moment (pause) */
  onPause?: () => void;
  /** Called when user wants to stop */
  onStop?: () => void;
  /** Called when user wants grounding redirect */
  onGrounding?: () => void;
  /** Called when user wants to slow down (A52 lightheaded) */
  onSlowDown?: () => void;
  /** Custom Arabic question text (overrides default) */
  questionAr?: string;
  /** Custom English question text (overrides default) */
  questionEn?: string;
  /** Custom Arabic subtitle/description */
  subtitleAr?: string;
  /** Custom English subtitle/description */
  subtitleEn?: string;
  /** Custom options (overrides defaults for the type) */
  customOptions?: CheckInOption[];
  /** Whether the check-in is visible */
  visible: boolean;
  /** Callback when check-in is dismissed without action */
  onDismiss?: () => void;
  /** Additional CSS class */
  className?: string;
}

/* Default text for each check-in type */
const DEFAULT_TEXT: Record<CheckInType, { questionAr: string; questionEn: string; subtitleAr?: string; subtitleEn?: string }> = {
  continue: {
    questionAr: 'هل تريد المتابعة؟',
    questionEn: 'Would you like to continue?',
  },
  comfort: {
    questionAr: 'هل تشعر بالراحة الكافية للمتابعة؟',
    questionEn: 'Are you comfortable enough to continue?',
  },
  stop: {
    questionAr: 'هل تريد التوقف الآن؟',
    questionEn: 'Would you like to stop now?',
    subtitleAr: 'لا بأس بالتوقف. سلامتك أهم شيء.',
    subtitleEn: 'It is okay to stop. Your safety is the most important thing.',
  },
  grounding: {
    questionAr: 'هل تحتاج العودة إلى أداة التنظيم؟',
    questionEn: 'Would you like to return to grounding?',
    subtitleAr: 'العودة إلى التنظيم يمكن أن تساعد.',
    subtitleEn: 'Returning to grounding can help.',
  },
  dissociation: {
    questionAr: 'هل ما زلت تشعر باتصالك بجسدك؟',
    questionEn: 'Do you still feel connected to your body?',
    subtitleAr: 'من الطبيعي أن تشعر ببعض الانفصال. لا بأس.',
    subtitleEn: 'It is normal to feel some disconnection. That is okay.',
  },
  reminder: {
    questionAr: '',
    questionEn: '',
  },
};

/* Default options for each check-in type */
const DEFAULT_OPTIONS: Record<CheckInType, CheckInOption[]> = {
  continue: [
    { labelAr: 'نعم، المتابعة', labelEn: 'Yes, continue', action: 'continue' },
    { labelAr: 'أحتاج لحظة', labelEn: 'I need a moment', action: 'pause' },
    { labelAr: 'أريد التوقف', labelEn: 'I want to stop', action: 'stop' },
  ],
  comfort: [
    { labelAr: 'نعم، أشعر بالراحة', labelEn: 'Yes, I feel comfortable', action: 'continue' },
    { labelAr: 'أحتاج لحظة', labelEn: 'I need a moment', action: 'pause' },
    { labelAr: 'أريد التوقف', labelEn: 'I want to stop', action: 'stop' },
  ],
  stop: [
    { labelAr: 'المتابعة', labelEn: 'Continue', action: 'continue' },
    { labelAr: 'التوقف الآن', labelEn: 'Stop now', action: 'stop' },
    { labelAr: 'العودة إلى التنظيم', labelEn: 'Return to grounding', action: 'grounding' },
  ],
  grounding: [
    { labelAr: 'المتابعة هنا', labelEn: 'Continue here', action: 'continue' },
    { labelAr: 'نعم، العودة إلى التنظيم', labelEn: 'Yes, return to grounding', action: 'grounding' },
    { labelAr: 'أريد التوقف', labelEn: 'I want to stop', action: 'stop' },
  ],
  dissociation: [
    { labelAr: 'نعم، أشعر بالاتصال', labelEn: 'Yes, I feel connected', action: 'continue' },
    { labelAr: 'أشعر بانفصال', labelEn: 'I feel disconnected', action: 'grounding' },
    { labelAr: 'أريد التوقف', labelEn: 'I want to stop', action: 'stop' },
  ],
  reminder: [],
};

export function DistressCheckIn({
  type,
  onContinue,
  onPause,
  onStop,
  onGrounding,
  onSlowDown,
  questionAr,
  questionEn,
  subtitleAr,
  subtitleEn,
  customOptions,
  visible,
  onDismiss,
  className,
}: DistressCheckInProps) {
  const router = useRouter();
  const { locale, direction } = useLocale();
  const [isPausing, setIsPausing] = useState(false);
  const [pauseCountdown, setPauseCountdown] = useState(0);
  const isAr = locale === 'ar';

  const text = DEFAULT_TEXT[type];
  const options = customOptions ?? DEFAULT_OPTIONS[type];

  const question = isAr ? (questionAr || text.questionAr) : (questionEn || text.questionEn);
  const subtitle = isAr ? (subtitleAr || text.subtitleAr) : (subtitleEn || text.subtitleEn);

  /* Pause timer: 5-second grounding breath pause */
  useEffect(() => {
    if (!isPausing || pauseCountdown <= 0) return;
    const timer = setTimeout(() => setPauseCountdown(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [isPausing, pauseCountdown]);

  useEffect(() => {
    if (isPausing && pauseCountdown === 0) {
      setIsPausing(false);
      onContinue?.();
    }
  }, [isPausing, pauseCountdown, onContinue]);

  const handleAction = useCallback((action: CheckInOption['action']) => {
    switch (action) {
      case 'continue':
        onContinue?.();
        break;
      case 'pause':
        setIsPausing(true);
        setPauseCountdown(5);
        onPause?.();
        break;
      case 'stop':
        onStop?.();
        break;
      case 'grounding':
        onGrounding?.();
        break;
      case 'slow-down':
        onSlowDown?.();
        break;
    }
  }, [onContinue, onPause, onStop, onGrounding, onSlowDown]);

  if (!visible) return null;

  /* Pause / Grounding Breath screen */
  if (isPausing) {
    return (
      <div
        className={[
          'fixed inset-0 z-50 flex items-center justify-center',
          'bg-white/95 backdrop-blur-sm',
        ].join(' ')}
        dir={direction}
      >
        <div className="text-center max-w-sm px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F0F7F7] flex items-center justify-center">
            <Wind className="w-10 h-10 text-[#1F6F78] animate-pulse" />
          </div>
          <p className="text-lg font-medium text-[#0F1C2E] mb-2">
            {isAr ? 'خذ نفسًا عميقًا...' : 'Take a deep breath...'}
          </p>
          <p className="text-3xl font-bold text-[#1F6F78] mb-2">{pauseCountdown}</p>
          <p className="text-sm text-[#0F1C2E]/60">
            {isAr ? 'سنتابع بعد قليل' : 'We will continue shortly'}
          </p>
        </div>
      </div>
    );
  }

  /* Reminder type: just text, no options */
  if (type === 'reminder') {
    return (
      <div
        className={[
          'rounded-2xl border border-[#1F6F78]/20 bg-[#F0F7F7]/60',
          'px-5 py-4 mb-4',
          className ?? '',
        ].join(' ')}
        dir={direction}
      >
        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-[#1F6F78] mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-[#0F1C2E]/80 leading-relaxed">
              {question}
            </p>
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="text-[#0F1C2E]/30 hover:text-[#0F1C2E]/60 transition-colors shrink-0"
              aria-label={isAr ? 'إغلاق' : 'Dismiss'}
            >
              ×
            </button>
          )}
        </div>
      </div>
    );
  }

  /* Main check-in card */
  return (
    <div
      className={[
        'rounded-2xl border border-[#1F6F78]/15 bg-white',
        'shadow-sm shadow-[#1F6F78]/5',
        'px-5 py-5 my-4',
        className ?? '',
      ].join(' ')}
      dir={direction}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#F0F7F7] flex items-center justify-center shrink-0">
          {type === 'dissociation' ? (
            <Shield className="w-4 h-4 text-[#1F6F78]" />
          ) : (
            <Heart className="w-4 h-4 text-[#1F6F78]" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-base font-medium text-[#0F1C2E] leading-snug">
            {question}
          </p>
          {subtitle && (
            <p className="text-xs text-[#0F1C2E]/50 mt-0.5 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2 mt-3">
        {options.map((option, idx) => {
          const isPrimary = idx === 0;
          const isDanger = option.action === 'stop';
          const isGroundingAction = option.action === 'grounding';

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleAction(option.action)}
              className={[
                'w-full flex items-center justify-center gap-2',
                'px-4 py-2.5 rounded-xl text-sm font-medium',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F78]/30 focus-visible:ring-offset-1',
                isPrimary
                  ? 'bg-[#1F6F78] text-white hover:bg-[#1a5e66]'
                  : isDanger
                    ? 'bg-white border border-[#E8685A]/30 text-[#E8685A] hover:bg-[#E8685A]/5'
                    : isGroundingAction
                      ? 'bg-white border border-[#1F6F78]/30 text-[#1F6F78] hover:bg-[#F0F7F7]'
                      : 'bg-[#F0F7F7] text-[#0F1C2E]/70 hover:bg-[#E5EDED]',
              ].join(' ')}
            >
              {isGroundingAction && <Wind className="w-4 h-4 shrink-0" />}
              <span>{isAr ? option.labelAr : option.labelEn}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DistressCheckIn;
