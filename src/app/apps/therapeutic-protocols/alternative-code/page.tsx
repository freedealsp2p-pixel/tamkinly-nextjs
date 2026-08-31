'use client';

import { useReducer, useCallback } from 'react';
import { TherapeuticShell, ProtocolHero, ProtocolStepCard, ProtocolCompletion } from '@/components/therapeutic';
import { NameDecoder } from '@/components/therapeutic/NameDecoder';
import { createProtocolReducer } from '@/components/therapeutic/types';
import { useLocale } from '@/components/providers/LocaleProvider';
import { ALTERNATIVE_CODE_META, ALTERNATIVE_CODE_STEPS } from '@/lib/therapeutic-protocols/alternative-code';
import type { ProtocolStep } from '@/components/therapeutic/types';

const TK = 'therapeuticProtocols.protocols.alternativeCode';
const { initialState, reducer } = createProtocolReducer(ALTERNATIVE_CODE_STEPS.length);

export default function AlternativeCodePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { locale } = useLocale();
  const isAr = locale === "ar";

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
    { label: isAr ? 'التطبيقات' : 'Apps', href: '/apps' },
    { label: isAr ? 'البروتوكولات العلاجية' : 'Therapeutic Protocols', href: '/apps/therapeutic-protocols' },
    { label: isAr ? 'الشفرة البديلة' : 'Alternative Code' },
  ];

  const renderStepExtra = useCallback((
    currentStep: ProtocolStep,
    stepIndex: number,
  ) => {
    if (stepIndex === 0 || stepIndex === 1) {
      return (
        <div className="mt-6 mb-6">
          <NameDecoder accentColor={ALTERNATIVE_CODE_META.accentColor} />
        </div>
      );
    }
    return null;
  }, []);

  return (
    <TherapeuticShell sectionType={state.phase === 'active' ? 'therapeutic' : 'standard'}>
      {state.phase === 'entry' && (
        <ProtocolHero
          translationKey={TK}
          stepCount={ALTERNATIVE_CODE_META.totalSteps}
          durationLabel={isAr ? "15 دقيقة" : "15 min"}
          breadcrumbs={breadcrumbs}
          accentColor={ALTERNATIVE_CODE_META.accentColor}
          onStart={handleStart}
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
          renderStepExtra={renderStepExtra}
        />
      )}

      {state.phase === 'completion' && (
        <ProtocolCompletion
          translationKey={TK}
          accentColor={ALTERNATIVE_CODE_META.accentColor}
          suggestedNext={[
            { label: isAr ? 'التفكيك الزمني' : 'Temporal Decoupling', href: '/apps/therapeutic-protocols/temporal-decoupling' },
            { label: isAr ? 'المرآة البيضاء' : 'The White Mirror', href: '/apps/therapeutic-protocols/white-mirror' },
          ]}
          onRepeat={handleRestart}
        />
      )}
    </TherapeuticShell>
  );
}
