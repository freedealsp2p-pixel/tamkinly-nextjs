"use client";

import { useReducer, useEffect, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { groundingReducer, initialState } from '@/lib/trc/grounding/reducer';
import { loadLocale, saveLocale } from '@/lib/trc/grounding/storage';
import type { GroundingPhase, Locale } from '@/lib/trc/grounding/types';
import GroundingIntro from '@/components/trc/grounding/GroundingIntro';
import SenseStep from '@/components/trc/grounding/SenseStep';
import BreathingCircle from '@/components/trc/grounding/BreathingCircle';
import CompletionScreen from '@/components/trc/grounding/CompletionScreen';
import { RecoveryBreadcrumb, MedicalDisclaimer, SafetyResponse, TherapeuticExit, DistressCheckIn } from '@/components/recovery/system';
import { useTrcState } from '@/hooks/useRecoveryState';


export default function GroundingPage() {
  const { locale: appLocale } = useLocale();
  const tNav = useTranslations('recoveryNav');
  const tTrc = useTranslations('recoveryHub.trc');
  const [state, dispatch] = useReducer(groundingReducer, initialState);
  const locale: Locale = state.locale;
  const { markStepStarted, markStepCompleted } = useTrcState();
  const router = useRouter();

  // Distress check-in: show after the 3rd sense (touch) completes and user advances
  const [showComfortCheck, setShowComfortCheck] = useState(false);

  useEffect(() => {
    const saved = loadLocale();
    const resolvedLocale = (saved || appLocale) as Locale;
    dispatch({ type: 'SET_LOCALE', locale: resolvedLocale });
  }, [appLocale]);

  useEffect(() => {
    saveLocale(state.locale);
  }, [state.locale]);

  // Track journey state on mount
  useEffect(() => {
    markStepStarted('grounding');
  }, [markStepStarted]);

  // Track completion when reaching completion phase
  useEffect(() => {
    if (state.phase === 'completion') {
      markStepCompleted('grounding');
    }
  }, [state.phase, markStepCompleted]);

  const handleNextSense = () => {
    // After touch (3rd sense), show comfort check before advancing to smell
    if (state.phase === 'touch') {
      setShowComfortCheck(true);
      return;
    }
    dispatch({ type: 'NEXT_SENSE' });
  };

  const isSensePhase = (phase: GroundingPhase): boolean => {
    return ['sight', 'sound', 'touch', 'smell', 'taste'].includes(phase);
  };

  const showBreadcrumb = state.phase === 'intro' || state.phase === 'completion';

  const handleComfortContinue = useCallback(() => {
    setShowComfortCheck(false);
    dispatch({ type: 'NEXT_SENSE' }); // advance from touch to smell
  }, []);

  const handleComfortStop = useCallback(() => {
    setShowComfortCheck(false);
    router.push('/recovery/trc');
  }, [router]);

  const handleComfortGrounding = useCallback(() => {
    setShowComfortCheck(false);
    // Already in grounding — reset to intro
    dispatch({ type: 'SET_PHASE', phase: 'intro' });
  }, []);

  return (
    <div className="min-h-screen bg-white relative" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {showBreadcrumb && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <RecoveryBreadcrumb
            items={[
              { label: tNav('title'), href: '/recovery' },
              { label: tNav('trc'), href: '/recovery/trc' },
              { label: tTrc('grounding.title') },
            ]}
          />
        </div>
      )}

      <MedicalDisclaimer />

      <AnimatePresence mode="wait">
        {state.phase === 'intro' && (
          <GroundingIntro
            key="intro"
            locale={locale}
            onBegin={() => dispatch({ type: 'SET_PHASE', phase: 'sight' })}
          />
        )}

        {isSensePhase(state.phase) && (
          <SenseStep
            key={state.phase}
            locale={locale}
            phase={state.phase}
            onNext={handleNextSense}
            onPrev={() => dispatch({ type: 'PREV_SENSE' })}
          />
        )}

        {state.phase === 'breathing' && (
          <BreathingCircle
            key="breathing"
            locale={locale}
            onComplete={() => dispatch({ type: 'SET_PHASE', phase: 'completion' })}
          />
        )}

        {state.phase === 'completion' && (
          <CompletionScreen
            key="completion"
            locale={locale}
          />
        )}
      </AnimatePresence>

      {/* Comfort check-in after 3rd sense (touch) */}
      <DistressCheckIn
        type="comfort"
        visible={showComfortCheck}
        onContinue={handleComfortContinue}
        onPause={handleComfortContinue}
        onStop={handleComfortStop}
        onGrounding={handleComfortGrounding}
      />

      <SafetyResponse assetId="grounding-54321" program="trc" />
      <TherapeuticExit fallbackHref="/recovery/trc" className="!bottom-20" />
    </div>
  );
}
