'use client';

import { useReducer, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TherapeuticShell,
  ProtocolHero,
  ProtocolStepCard,
  ProtocolCompletion,
  ProtocolSafetyWarning,
  ProtocolRelatedArticles,
} from '@/components/therapeutic';
import { RepetitionCounter } from '@/components/therapeutic/RepetitionCounter';
import { createProtocolReducer } from '@/components/therapeutic/types';
import { useLocale } from '@/components/providers/LocaleProvider';
import { WHITE_MIRROR_META, WHITE_MIRROR_STEPS } from '@/lib/therapeutic-protocols/white-mirror';
import type { ProtocolStep } from '@/components/therapeutic/types';

const TK = 'therapeuticProtocols.protocols.whiteMirror';
const { initialState, reducer } = createProtocolReducer(WHITE_MIRROR_STEPS.length);

export default function WhiteMirrorPage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const [safetyAccepted, setSafetyAccepted] = useState(false);

  const step = WHITE_MIRROR_STEPS[state.currentStep];
  const progress = state.phase === 'active'
    ? ((state.currentStep + 1) / WHITE_MIRROR_STEPS.length) * 100
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
    setSafetyAccepted(false);
    dispatch({ type: 'RESTART' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSafetyAccept = useCallback(() => {
    setSafetyAccepted(true);
  }, []);

  const handleSafetyDecline = useCallback(() => {
    router.push('/apps/therapeutic-protocols');
  }, [router]);

  const breadcrumbs = [
    { label: 'Tamkinly', href: '/' },
    { label: isAr ? 'التطبيقات' : 'Apps', href: '/apps' },
    { label: isAr ? 'البروتوكولات العلاجية' : 'Therapeutic Protocols', href: '/apps/therapeutic-protocols' },
    { label: isAr ? 'المرآة البيضاء' : 'White Mirror' },
  ];

  /** Render RepetitionCounter for step 2 (index 2) */
  const renderStepExtra = useCallback((
    currentStep: ProtocolStep,
    stepIndex: number,
  ) => {
    if (stepIndex === 2) {
      return (
        <div className="mt-6 mb-6">
          <RepetitionCounter
            totalReps={7}
            accentColor={WHITE_MIRROR_META.accentColor}
          />
        </div>
      );
    }
    return null;
  }, []);

  // White Mirror requires safety acceptance before entry
  if (state.phase === 'entry' && !safetyAccepted) {
    return (
      <TherapeuticShell sectionType='standard'>
        <ProtocolSafetyWarning
          translationKey={TK}
          onAccept={handleSafetyAccept}
          onDecline={handleSafetyDecline}
          dangerColor='#E8685A'
        />
      </TherapeuticShell>
    );
  }

  return (
    <TherapeuticShell sectionType={state.phase === 'active' ? 'therapeutic' : 'standard'}>
      {state.phase === 'entry' && (
        <>
          <ProtocolHero
            translationKey={TK}
            stepCount={WHITE_MIRROR_META.totalSteps}
            durationLabel={isAr ? '9 دقائق' : '9 min'}
            breadcrumbs={breadcrumbs}
            accentColor={WHITE_MIRROR_META.accentColor}
            onStart={handleStart}
          />
          <ProtocolRelatedArticles protocolSlug='white-mirror' accentColor={WHITE_MIRROR_META.accentColor} />
        </>
      )}

      {state.phase === 'active' && (
        <ProtocolStepCard
          translationKey={TK}
          step={step}
          stepIndex={state.currentStep}
          totalSteps={WHITE_MIRROR_STEPS.length}
          progress={progress}
          accentColor={WHITE_MIRROR_META.accentColor}
          onNext={handleNext}
          onPrev={handlePrev}
          onRestart={handleRestart}
          renderStepExtra={renderStepExtra}
        />
      )}

      {state.phase === 'completion' && (
        <>
          <ProtocolCompletion
            translationKey={TK}
            accentColor={WHITE_MIRROR_META.accentColor}
            suggestedNext={[
              { label: isAr ? 'التفكيك الزمني' : 'Temporal Decoupling', href: '/apps/therapeutic-protocols/temporal-decoupling' },
              { label: isAr ? 'الشفرة البديلة' : 'The Alternative Code', href: '/apps/therapeutic-protocols/alternative-code' },
            ]}
            onRepeat={handleRestart}
          />
          <ProtocolRelatedArticles protocolSlug='white-mirror' accentColor={WHITE_MIRROR_META.accentColor} />
        </>
      )}
    </TherapeuticShell>
  );
}
