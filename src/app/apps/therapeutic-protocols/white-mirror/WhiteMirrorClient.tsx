'use client';

import { useReducer, useCallback, useEffect, useState } from 'react';
import {
  TherapeuticShell, ExperienceWelcome, ProtocolStepCard, ProtocolCompletion,
  WhiteMirrorGate,
} from '@/components/therapeutic';
import {
  createProtocolReducer, loadPersistedProgress, persistProgress,
  clearPersistedProgress,
} from '@/components/therapeutic/types';
import { WHITE_MIRROR_META, WHITE_MIRROR_STEPS } from '@/lib/therapeutic-protocols/white-mirror';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/components/providers/LocaleProvider';

const SLUG = 'white-mirror';
const TK = 'therapeuticProtocols.whiteMirror';
const { initialState, reducer } = createProtocolReducer(WHITE_MIRROR_STEPS.length);

/**
 * White Mirror — the strongest safety-first premium experience.
 *
 * Journey: welcome -> explicit SAFETY GATE -> (acceptance moves directly
 * into the first step) -> guided session -> grounded closure. The gate
 * occurs before any active participation; declining prevents the protocol
 * from starting. Visually restrained and spacious throughout.
 *
 * The source structure — SAFETY GATE -> ABSTRACTION -> VOID -> ALTERNATIVE
 * VOICE -> ANCHOR -> CLOSURE — is preserved untouched.
 */
export default function WhiteMirrorClient() {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [restored, setRestored] = useState(false);
  const ts = useTranslations('therapeuticProtocols.shared');

  const totalSteps = WHITE_MIRROR_STEPS.length;
  const step = WHITE_MIRROR_STEPS[state.currentStep];
  const progress = state.phase === 'active'
    ? ((state.currentStep + 1) / totalSteps) * 100
    : 0;

  // Resume: restore saved position (device only) on mount. The safety gate
  // was already accepted in the original session — resuming an active
  // session keeps that acceptance (the gate is part of the same experience).
  useEffect(() => {
    const saved = loadPersistedProgress(SLUG);
    if (saved) {
      if (saved.phase === 'active' && saved.currentStep < totalSteps) {
        dispatch({ type: 'START' });
        for (let i = 0; i < saved.currentStep; i++) {
          dispatch({ type: 'NEXT_STEP' });
        }
      } else if (saved.phase === 'preparation') {
        dispatch({ type: 'TO_PREPARATION' });
      }
    }
    setRestored(true);
  }, [totalSteps]);

  // Persist position for resume; clear on completion.
  useEffect(() => {
    if (!restored) return;
    if (state.phase === 'completion') {
      clearPersistedProgress(SLUG);
    } else if (state.phase === 'active' || state.phase === 'preparation') {
      persistProgress(SLUG, { phase: state.phase, currentStep: state.currentStep });
    }
  }, [state.phase, state.currentStep, restored]);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBegin = useCallback(() => {
    dispatch({ type: 'OPEN_GATE' });
    scrollTop();
  }, [scrollTop]);

  // Acceptance moves directly into the first step.
  const handleAccept = useCallback(() => {
    dispatch({ type: 'START' });
    scrollTop();
  }, [scrollTop]);

  // Declining must prevent the protocol from starting.
  const handleDecline = useCallback(() => {
    dispatch({ type: 'BACK_TO_WELCOME' });
    router.push('/apps/therapeutic-protocols');
  }, [router]);

  const handleNext = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
    scrollTop();
  }, [scrollTop]);

  const handlePrev = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
    scrollTop();
  }, [scrollTop]);

  const handleRestart = useCallback(() => {
    // Restart is an explicit choice — it always re-enters through the gate.
    dispatch({ type: 'RESTART' });
    scrollTop();
  }, [scrollTop]);

  const handlePause = useCallback(() => dispatch({ type: 'PAUSE' }), []);
  const handleResume = useCallback(() => dispatch({ type: 'RESUME' }), []);

  const breadcrumbs = [
    { label: 'Tamkinly', href: '/' },
    { label: '/apps', href: '/apps' },
    { label: 'Therapeutic Protocols', href: '/apps/therapeutic-protocols' },
    { label: 'White Mirror' },
  ];

  return (
    <TherapeuticShell
      sectionType={state.phase === 'active' ? 'therapeutic' : 'standard'}
      exitProps={{ label: ts('session.leaveExperience') }}
    >
      {state.phase === 'welcome' && (
        <ExperienceWelcome
          translationKey={TK}
          meta={WHITE_MIRROR_META}
          steps={WHITE_MIRROR_STEPS}
          breadcrumbs={breadcrumbs}
          accentColor={WHITE_MIRROR_META.accentColor}
          onBegin={handleBegin}
        />
      )}

      {state.phase === 'safety-gate' && (
        <WhiteMirrorGate onAccept={handleAccept} onDecline={handleDecline} />
      )}

      {state.phase === 'active' && (
        <ProtocolStepCard
          translationKey={TK}
          step={step}
          stepIndex={state.currentStep}
          totalSteps={totalSteps}
          progress={progress}
          accentColor={WHITE_MIRROR_META.accentColor}
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
          accentColor={WHITE_MIRROR_META.accentColor}
          suggestedNext={[
            { label: 'The Temporal Decoupling', href: '/apps/therapeutic-protocols/temporal-decoupling' },
            { label: 'The Alternative Code', href: '/apps/therapeutic-protocols/alternative-code' },
          ]}
          onRepeat={handleRestart}
        />
      )}
    </TherapeuticShell>
  );
}
