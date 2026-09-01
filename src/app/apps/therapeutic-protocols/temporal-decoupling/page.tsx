'use client';

import { useReducer, useCallback } from 'react';
import { TherapeuticShell, ProtocolHero, ProtocolStepCard, ProtocolCompletion, ProtocolRelatedArticles } from '@/components/therapeutic';
import { createProtocolReducer } from '@/components/therapeutic/types';
import { useLocale } from '@/components/providers/LocaleProvider';
import { TEMPORAL_DECOUPLING_META, TEMPORAL_DECOUPLING_STEPS } from '@/lib/therapeutic-protocols/temporal-decoupling';

const TK = 'therapeuticProtocols.protocols.temporalDecoupling';
const { initialState, reducer } = createProtocolReducer(TEMPORAL_DECOUPLING_STEPS.length);

export default function TemporalDecouplingPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { locale } = useLocale();
  const isAr = locale === "ar";

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
    { label: isAr ? 'التطبيقات' : 'Apps', href: '/apps' },
    { label: isAr ? 'البروتوكولات العلاجية' : 'Therapeutic Protocols', href: '/apps/therapeutic-protocols' },
    { label: isAr ? 'التفكيك الزمني' : 'Temporal Decoupling' },
  ];

  return (
    <TherapeuticShell sectionType={state.phase === 'active' ? 'therapeutic' : 'standard'}>
      {state.phase === 'entry' && (
        <>
          <ProtocolHero
            translationKey={TK}
            stepCount={TEMPORAL_DECOUPLING_META.totalSteps}
            durationLabel={isAr ? "12 دقيقة" : "12 min"}
            breadcrumbs={breadcrumbs}
            accentColor={TEMPORAL_DECOUPLING_META.accentColor}
            onStart={handleStart}
            learnMoreTargetId="mechanism-section"
          />
          <ProtocolRelatedArticles protocolSlug='temporal-decoupling' accentColor={TEMPORAL_DECOUPLING_META.accentColor} />
        </>
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
        <>
          <ProtocolCompletion
            translationKey={TK}
            accentColor={TEMPORAL_DECOUPLING_META.accentColor}
            suggestedNext={[
              { label: isAr ? 'الشفرة البديلة' : 'The Alternative Code', href: '/apps/therapeutic-protocols/alternative-code' },
              { label: isAr ? 'المرآة البيضاء' : 'The White Mirror', href: '/apps/therapeutic-protocols/white-mirror' },
            ]}
            onRepeat={handleRestart}
          />
          <ProtocolRelatedArticles protocolSlug='temporal-decoupling' accentColor={TEMPORAL_DECOUPLING_META.accentColor} />
        </>
      )}
    </TherapeuticShell>
  );
}
