'use client';

import { useReducer, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  TherapeuticShell, ProtocolHero, ProtocolStepCard, ProtocolCompletion,
} from '@/components/therapeutic';
import { createProtocolReducer } from '@/components/therapeutic/types';
import { ALTERNATIVE_CODE_META, ALTERNATIVE_CODE_STEPS } from '@/lib/therapeutic-protocols/alternative-code';

const TK = 'therapeuticProtocols.alternativeCode';
const { initialState, reducer } = createProtocolReducer(ALTERNATIVE_CODE_STEPS.length);

export default function AlternativeCodeClient() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const step = ALTERNATIVE_CODE_STEPS[state.currentStep];
  const progress = state.phase === 'active'
    ? ((state.currentStep + 1) / ALTERNATIVE_CODE_STEPS.length) * 100
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
    { label: 'Alternative Code' },
  ];

  return (
    <TherapeuticShell sectionType={state.phase === 'active' ? 'therapeutic' : 'standard'}>
      {state.phase === 'entry' && (
        <ProtocolHero
          translationKey={TK}
          stepCount={ALTERNATIVE_CODE_META.totalSteps}
          durationLabel="15 min"
          breadcrumbs={breadcrumbs}
          accentColor={ALTERNATIVE_CODE_META.accentColor}
          onStart={handleStart}
          learnMoreTargetId="mechanism-section"
        />
      )}

      {state.phase === 'active' && (
        <ProtocolStepCard
          translationKey={TK}
          step={step}
          stepIndex={state.currentStep}
          totalSteps={ALTERNATIVE_CODE_STEPS.length}
          progress={progress}
          accentColor={ALTERNATIVE_CODE_META.accentColor}
          onNext={handleNext}
          onPrev={handlePrev}
          onRestart={handleRestart}
        />
      )}

      {state.phase === 'completion' && (
        <ProtocolCompletion
          translationKey={TK}
          accentColor={ALTERNATIVE_CODE_META.accentColor}
          suggestedNext={[
            { label: 'The Temporal Decoupling', href: '/apps/therapeutic-protocols/temporal-decoupling' },
            { label: 'The White Mirror', href: '/apps/therapeutic-protocols/white-mirror' },
          ]}
          onRepeat={handleRestart}
        />
      )}
    </TherapeuticShell>
  );
}
