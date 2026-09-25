'use client';

import { useReducer, useCallback, useEffect, useState } from 'react';
import { useTranslations } from '@/components/providers/LocaleProvider';
import {
  TherapeuticShell, ExperienceWelcome, PreparationScreen,
  ProtocolStepCard, ProtocolCompletion, NameDecoder,
} from '@/components/therapeutic';
import {
  createProtocolReducer, loadPersistedProgress, persistProgress,
  clearPersistedProgress, scrollToTop,
} from '@/components/therapeutic/types';
import { ALTERNATIVE_CODE_META, ALTERNATIVE_CODE_STEPS } from '@/lib/therapeutic-protocols/alternative-code';

const SLUG = 'alternative-code';
const TK = 'therapeuticProtocols.alternativeCode';
const { initialState, reducer } = createProtocolReducer(ALTERNATIVE_CODE_STEPS.length);

/**
 * Alternative Code — the most interactive of the three premium experiences.
 *
 * The Name Decoder stays central to the source's letter-based interaction:
 *   INPUT -> DECODE -> CREATE ALTERNATIVE ASSOCIATIONS -> BUILD ALTERNATIVE
 *   WORLD -> IMMERSION -> INTEGRATION.
 *
 * Privacy: the entered name lives only in component state for the duration
 * of the session. It is never sent to the backend, analytics, or storage.
 * Only the step position (never the name or words) is saved locally so the
 * session can be resumed.
 */
export default function AlternativeCodeClient() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [restored, setRestored] = useState(false);
  const ts = useTranslations('therapeuticProtocols.shared');
  const tpp = useTranslations('therapeuticProtocols.protocols');

  // Name Decoder state — memory only, never persisted.
  const [name, setName] = useState('');
  const [words, setWords] = useState<Record<number, string>>({});

  const totalSteps = ALTERNATIVE_CODE_STEPS.length;
  const step = ALTERNATIVE_CODE_STEPS[state.currentStep];
  const progress = state.phase === 'active'
    ? ((state.currentStep + 1) / totalSteps) * 100
    : 0;

  // Resume: restore saved position (device only, never the name) on mount.
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

  const handleNameChange = useCallback((value: string) => {
    setName(value);
    setWords({}); // letters changed -> previous associations reset
  }, []);

  const handleWordChange = useCallback((index: number, word: string) => {
    setWords((prev) => ({ ...prev, [index]: word }));
  }, []);

  /**
   * Name Decoder placement, following the source protocol:
   *   Step 1 (Decoding the Cipher): type the name, watch it become bare letters.
   *   Step 2 (Crafting the New World): give each letter a new word.
   * The source allows writing on paper instead — continuing never requires input.
   */
  const renderStepExtra = useCallback((stepData: typeof step, stepIndex: number) => {
    if (stepIndex === 0) {
      return <NameDecoder mode="decode" name={name} onNameChange={handleNameChange} words={words} onWordChange={handleWordChange} accentColor={ALTERNATIVE_CODE_META.accentColor} />;
    }
    if (stepIndex === 1) {
      return <NameDecoder mode="build" name={name} onNameChange={handleNameChange} words={words} onWordChange={handleWordChange} accentColor={ALTERNATIVE_CODE_META.accentColor} />;
    }
    // Steps 3-5 are guided immersion — text and audio carry the experience.
    void stepData;
    return null;
  }, [name, words, handleNameChange, handleWordChange]);

  const breadcrumbs = [
    { label: ts('breadcrumbs.home'), href: '/' },
    { label: ts('breadcrumbs.apps'), href: '/apps' },
    { label: ts('breadcrumbs.protocols'), href: '/apps/therapeutic-protocols' },
    { label: tpp('alternative-code.title') },
  ];

  return (
    <TherapeuticShell
      sectionType={state.phase === 'active' ? 'therapeutic' : 'standard'}
      exitProps={{ label: ts('session.leaveExperience') }}
    >
      {state.phase === 'welcome' && (
        <ExperienceWelcome
          translationKey={TK}
          meta={ALTERNATIVE_CODE_META}
          steps={ALTERNATIVE_CODE_STEPS}
          breadcrumbs={breadcrumbs}
          accentColor={ALTERNATIVE_CODE_META.accentColor}
          onBegin={handleBegin}
        />
      )}

      {state.phase === 'preparation' && (
        <PreparationScreen
          accentColor={ALTERNATIVE_CODE_META.accentColor}
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
          accentColor={ALTERNATIVE_CODE_META.accentColor}
          onNext={handleNext}
          onPrev={handlePrev}
          onRestart={handleRestart}
          onPause={handlePause}
          isPaused={state.isPaused}
          onResume={handleResume}
          renderStepExtra={renderStepExtra}
        />
      )}

      {state.phase === 'completion' && (
        <ProtocolCompletion
          translationKey={TK}
          accentColor={ALTERNATIVE_CODE_META.accentColor}
          suggestedNext={[
            { label: tpp('temporal-decoupling.title'), href: '/apps/therapeutic-protocols/temporal-decoupling' },
            { label: tpp('white-mirror.title'), href: '/apps/therapeutic-protocols/white-mirror' },
          ]}
          onRepeat={handleRestart}
        />
      )}
    </TherapeuticShell>
  );
}
