'use client';

import { useReducer, useCallback, useEffect, useState } from 'react';
import { useTranslations } from '@/components/providers/LocaleProvider';
import {
  TherapeuticShell, ExperienceWelcome, PreparationScreen,
  ProtocolStepCard, ProtocolCompletion,
} from '@/components/therapeutic';
import {
  createProtocolReducer, loadPersistedProgress, persistProgress,
  clearPersistedProgress, scrollToTop,
} from '@/components/therapeutic/types';
import { TEMPORAL_DECOUPLING_META, TEMPORAL_DECOUPLING_STEPS } from '@/lib/therapeutic-protocols/temporal-decoupling';

const SLUG = 'temporal-decoupling';
const TK = 'therapeuticProtocols.temporalDecoupling';
const { initialState, reducer } = createProtocolReducer(TEMPORAL_DECOUPLING_STEPS.length);

/**
 * Temporal Decoupling — premium guided experience.
 * Journey: welcome -> preparation -> guided session (pausable) -> completion.
 * The source protocol (7 steps, ~12 minutes) remains untouched.
 */
export default function TemporalDecouplingClient() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [restored, setRestored] = useState(false);
  const ts = useTranslations('therapeuticProtocols.shared');
  const tpp = useTranslations('therapeuticProtocols.protocols');

  const totalSteps = TEMPORAL_DECOUPLING_STEPS.length;
  const step = TEMPORAL_DECOUPLING_STEPS[state.currentStep];
  const progress = state.phase === 'active'
    ? ((state.currentStep + 1) / totalSteps) * 100
    : 0;

  // Resume: restore saved position (device only) once on mount.
  useEffect(() => {
    const saved = loadPersistedProgress(SLUG);
    if (saved) {
      if (saved.phase === 'active' && saved.currentStep < totalSteps) {
        dispatch({ type: 'START' });
        // START resets to step 0; advance to the saved step.
        // (dispatch batching keeps this a single visible state)
        for (let i = 0; i < saved.currentStep; i++) {
          dispatch({ type: 'NEXT_STEP' });
        }
      } else if (saved.phase === 'preparation') {
        dispatch({ type: 'TO_PREPARATION' });
      }
    }
    setRestored(true);
  }, [totalSteps]);

  // Persist position for resume; clear it once the experience completes.
  useEffect(() => {
    if (!restored) return;
    if (state.phase === 'completion') {
      clearPersistedProgress(SLUG);
    } else if (state.phase === 'active' || state.phase === 'preparation') {
      persistProgress(SLUG, { phase: state.phase, currentStep: state.currentStep });
    }
  }, [state.phase, state.currentStep, restored]);

  const scrollTop = useCallback(() => scrollToTop(), []);

  const handleBegin = useCallback(() => {
    dispatch({ type: 'TO_PREPARATION' });
    scrollTop();
  }, [scrollTop]);

  const handleStart = useCallback(() => {
    dispatch({ type: 'START' });
    scrollTop();
  }, [scrollTop]);

  const handleBackToWelcome = useCallback(() => {
    dispatch({ type: 'BACK_TO_WELCOME' });
    scrollTop();
  }, [scrollTop]);

  const handleNext = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
    scrollTop();
  }, [scrollTop]);

  const handlePrev = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
    scrollTop();
  }, [scrollTop]);

  const handleRestart = useCallback(() => {
    dispatch({ type: 'RESTART' });
    scrollTop();
  }, [scrollTop]);

  const handlePause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const handleResume = useCallback(() => dispatch({ type: 'RESUME' }), []);

  const breadcrumbs = [
    { label: ts('breadcrumbs.home'), href: '/' },
    { label: ts('breadcrumbs.apps'), href: '/apps' },
    { label: ts('breadcrumbs.protocols'), href: '/apps/therapeutic-protocols' },
    { label: tpp('temporal-decoupling.title') },
  ];

  return (
    <TherapeuticShell
      sectionType={state.phase === 'active' ? 'therapeutic' : 'standard'}
      exitProps={{ label: ts('session.leaveExperience') }}
    >
      {state.phase === 'welcome' && (
        <ExperienceWelcome
          translationKey={TK}
          meta={TEMPORAL_DECOUPLING_META}
          steps={TEMPORAL_DECOUPLING_STEPS}
          breadcrumbs={breadcrumbs}
          accentColor={TEMPORAL_DECOUPLING_META.accentColor}
          onBegin={handleBegin}
        />
      )}

      {state.phase === 'preparation' && (
        <PreparationScreen
          accentColor={TEMPORAL_DECOUPLING_META.accentColor}
          onStart={handleStart}
          onBack={handleBackToWelcome}
        />
      )}

      {state.phase === 'active' && (
        <ProtocolStepCard
          translationKey={TK}
          step={step}
          stepIndex={state.currentStep}
          totalSteps={totalSteps}
          progress={progress}
          accentColor={TEMPORAL_DECOUPLING_META.accentColor}
          onNext={handleNext}
          onPrev={handlePrev}
          onRestart={handleRestart}
          onPause={handlePause}
          isPaused={state.isPaused}
          onResume={handleResume}
        />
      )}

      {state.phase === 'completion' && (
        <ProtocolCompletion
          translationKey={TK}
          accentColor={TEMPORAL_DECOUPLING_META.accentColor}
          suggestedNext={[
            { label: tpp('alternative-code.title'), href: '/apps/therapeutic-protocols/alternative-code' },
            { label: tpp('white-mirror.title'), href: '/apps/therapeutic-protocols/white-mirror' },
          ]}
          onRepeat={handleRestart}
        />
      )}
    </TherapeuticShell>
  );
}
