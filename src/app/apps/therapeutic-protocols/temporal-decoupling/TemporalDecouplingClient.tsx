'use client';

import { useReducer, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  TherapeuticShell, ProtocolHero, ProtocolStepCard, ProtocolCompletion,
} from '@/components/therapeutic';
import { createProtocolReducer } from '@/components/therapeutic/types';
import { TEMPORAL_DECOUPLING_META, TEMPORAL_DECOUPLING_STEPS } from '@/lib/therapeutic-protocols/temporal-decoupling';

const TK = 'therapeuticProtocols.temporalDecoupling';
const { initialState, reducer } = createProtocolReducer(TEMPORAL_DECOUPLING_STEPS.length);

export default function TemporalDecouplingClient() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const step = TEMPORAL_DECOUPLING_STEPS[state.currentStep];
  const progress = state.phase === 'active'
    ? ((state.currentStep + 1) / TEMPORAL_DECOUPLING_STEPS.length) * 100
    : 0;

  const handleStart = useCallback(() => {
    dispatch({ type: 'START' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNext = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePrev = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRestart = useCallback(() => {
    dispatch({ type: 'RESTART' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const breadcrumbs = [
    { label: 'Tamkinly', href: '/' },
    { label: '/apps', href: '/apps' },
    { label: 'Therapeutic Protocols', href: '/apps/therapeutic-protocols' },
    { label: 'Temporal Decoupling' },
  ];

  return (
    <TherapeuticShell sectionType={state.phase === 'active' ? 'therapeutic' : 'standard'}>
      {state.phase === 'entry' && (
        <ProtocolHero
          translationKey={TK}
          stepCount={TEMPORAL_DECOUPLING_META.totalSteps}
          durationLabel="12 min"
          breadcrumbs={breadcrumbs}
          accentColor={TEMPORAL_DECOUPLING_META.accentColor}
          onStart={handleStart}
          learnMoreTargetId="mechanism-section"
        />
      )}

      {state.phase === 'active' && (
        <ProtocolStepCard
          translationKey={TK}
          step={step}
          stepIndex={state.currentStep}
          totalSteps={TEMPORAL_DECOUPLING_STEPS.length}
          progress={progress}
          accentColor={TEMPORAL_DECOUPLING_META.accentColor}
          onNext={handleNext}
          onPrev={handlePrev}
          onRestart={handleRestart}
        />
      )}

      {state.phase === 'completion' && (
        <ProtocolCompletion
          translationKey={TK}
          accentColor={TEMPORAL_DECOUPLING_META.accentColor}
          suggestedNext={[
            { label: 'The Alternative Code', href: '/apps/therapeutic-protocols/alternative-code' },
            { label: 'The White Mirror', href: '/apps/therapeutic-protocols/white-mirror' },
          ]}
          onRepeat={handleRestart}
        />
      )}
    </TherapeuticShell>
  );
}
