'use client';

import { useReducer, useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { a52Reducer, initialState } from '@/lib/recovery/a52/reducer';
import EntryScreen from '@/components/recovery/a52/EntryScreen';
import BridgeScreen from '@/components/recovery/a52/BridgeScreen';
import PreparationPhase from '@/components/recovery/a52/PreparationPhase';
import BreathingPhase from '@/components/recovery/a52/BreathingPhase';
import CompletionScreen from '@/components/recovery/a52/CompletionScreen';
import { RecoveryBreadcrumb, MedicalDisclaimer, SafetyResponse, TherapeuticExit, DistressCheckIn } from '@/components/recovery/system';
import { useTranslations } from '@/components/providers/LocaleProvider';
import { useTrcState } from '@/hooks/useRecoveryState';

export default function A52Page() {
  const router = useRouter();
  const [state, dispatch] = useReducer(a52Reducer, initialState);
  const t = useTranslations('recoveryAssets');
  const { markStepStarted, markStepCompleted } = useTrcState();

  // Distress check-in: show after cycle 3 (midway through 6 cycles)
  const [showComfortCheck, setShowComfortCheck] = useState(false);
  const [checkInShown, setCheckInShown] = useState(false);

  // Track journey state on mount
  useEffect(() => {
    markStepStarted('a52-breathing');
  }, [markStepStarted]);

  // Track completion when reaching completion phase
  useEffect(() => {
    if (state.phase === 'completion') {
      markStepCompleted('a52-breathing');
    }
  }, [state.phase, markStepCompleted]);

  const showBreadcrumb = state.phase === 'entry' || state.phase === 'bridge' || state.phase === 'completion';

  const handleGoBack = useCallback(() => {
    router.push('/recovery/trc');
  }, [router]);

  const handlePhaseComplete = useCallback(() => {
    dispatch({ type: 'BREATH_PHASE_COMPLETE' });
  }, []);

  const handleCycleComplete = useCallback(() => {
    dispatch({ type: 'CYCLE_COMPLETE' });
    // Show comfort check after cycle 3 (first time only)
    if (state.cycle === 3 && !checkInShown) {
      setShowComfortCheck(true);
      setCheckInShown(true);
    }
  }, [state.cycle, checkInShown]);

  const handleAllCyclesComplete = useCallback(() => {
    dispatch({ type: 'ALL_CYCLES_COMPLETE' });
  }, []);

  const handleComfortContinue = useCallback(() => {
    setShowComfortCheck(false);
  }, []);

  const handleComfortStop = useCallback(() => {
    setShowComfortCheck(false);
    dispatch({ type: 'EARLY_EXIT', cycle: state.cycle });
  }, [state.cycle]);

  const handleComfortGrounding = useCallback(() => {
    setShowComfortCheck(false);
    router.push('/recovery/trc/grounding');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F5F9F8] relative">
      {showBreadcrumb && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <RecoveryBreadcrumb
            items={[
              { label: t('breadcrumb.recoveryCenter'), href: '/recovery' },
              { label: t('breadcrumb.trcRecovery'), href: '/recovery/trc' },
              { label: t('breadcrumb.a52') },
            ]}
          />
        </div>
      )}

      <MedicalDisclaimer />

      <AnimatePresence mode="wait">
        {state.phase === 'entry' && (
          <EntryScreen
            key="entry"
            onStart={() => dispatch({ type: 'START_BRIDGE' })}
          />
        )}

        {state.phase === 'bridge' && (
          <BridgeScreen
            key="bridge"
            onProceed={() => dispatch({ type: 'PROCEED_TO_PREPARATION' })}
            onGoBack={handleGoBack}
          />
        )}

        {state.phase === 'preparation' && (
          <PreparationPhase
            key="preparation"
            onComplete={() => dispatch({ type: 'PREPARATION_DONE' })}
          />
        )}

        {state.phase === 'breathing' && state.breathSubPhase && (
          <BreathingPhase
            key={"breathing-" + state.cycle + "-" + state.breathSubPhase}
            cycle={state.cycle}
            breathSubPhase={state.breathSubPhase}
            isPaused={state.isPaused}
            sessionProgress={state.sessionProgress}
            onPhaseComplete={handlePhaseComplete}
            onCycleComplete={handleCycleComplete}
            onAllCyclesComplete={handleAllCyclesComplete}
          />
        )}

        {state.phase === 'completion' && (
          <CompletionScreen
            key="completion"
            completedCycles={state.earlyExitCycle}
            reflectionText={state.reflectionText}
            onReflectionChange={(text) => dispatch({ type: 'SET_REFLECTION', text })}
            onRepeat={() => dispatch({ type: 'REPEAT_EXERCISE' })}
          />
        )}
      </AnimatePresence>

      {/* Comfort check-in after cycle 3 */}
      <DistressCheckIn
        type="comfort"
        visible={showComfortCheck}
        questionAr="هل تشعر بالراحة؟"
        questionEn="Are you feeling comfortable?"
        customOptions={[
          { labelAr: 'نعم، أكمل', labelEn: 'Yes, continue', action: 'continue' },
          { labelAr: 'أشعر بدوار', labelEn: 'I feel lightheaded', action: 'pause' },
          { labelAr: 'أريد التوقف', labelEn: 'I want to stop', action: 'stop' },
        ]}
        onContinue={handleComfortContinue}
        onPause={handleComfortContinue}
        onStop={handleComfortStop}
        onGrounding={handleComfortGrounding}
      />

      <SafetyResponse program="trc" assetId="a52" />
      <TherapeuticExit fallbackHref="/recovery/trc" className="!bottom-20" />
    </div>
  );
}
