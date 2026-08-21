'use client';

import { useReducer, useCallback, useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { safePlaceReducer, initialState } from '@/lib/recovery/safe-place/reducer';
import type { SenseStep } from '@/lib/recovery/safe-place/types';
import EntryScreen from '@/components/recovery/safe-place/EntryScreen';
import BridgeScreen from '@/components/recovery/safe-place/BridgeScreen';
import SenseBuilder from '@/components/recovery/safe-place/SenseBuilder';
import ImmersionScreen from '@/components/recovery/safe-place/ImmersionScreen';
import CompletionScreen from '@/components/recovery/safe-place/CompletionScreen';
import { RecoveryBreadcrumb, MedicalDisclaimer, SafetyResponse, TherapeuticExit, DistressCheckIn } from '@/components/recovery/system';
import { useTranslations } from '@/components/providers/LocaleProvider';
import { useTrcState } from '@/hooks/useRecoveryState';

export default function SafePlacePage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(safePlaceReducer, initialState);
  const t = useTranslations('recoveryAssets');
  const { markStepStarted, markStepCompleted } = useTrcState();

  // Distress check-in: show after 30 seconds of immersion
  const [showComfortCheck, setShowComfortCheck] = useState(false);
  const [checkInShown, setCheckInShown] = useState(false);
  const immersionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Track journey state on mount
  useEffect(() => {
    markStepStarted('safe-place');
  }, [markStepStarted]);

  // Track completion when reaching completion phase
  useEffect(() => {
    if (state.phase === 'completion') {
      markStepCompleted('safe-place');
    }
  }, [state.phase, markStepCompleted]);

  // Show comfort check 30 seconds into immersion phase
  useEffect(() => {
    if (state.phase === 'immersion' && !checkInShown) {
      immersionTimerRef.current = setTimeout(() => {
        setShowComfortCheck(true);
        setCheckInShown(true);
      }, 30000); // 30 seconds
    }
    return () => {
      if (immersionTimerRef.current) {
        clearTimeout(immersionTimerRef.current);
      }
    };
  }, [state.phase, checkInShown]);

  const showBreadcrumb =
    state.phase === 'entry' || state.phase === 'bridge' || state.phase === 'completion';

  const handleGoBack = useCallback(() => {
    router.push('/recovery/trc');
  }, [router]);

  const handleSenseInput = useCallback((sense: SenseStep, value: string) => {
    dispatch({ type: 'SET_SENSE_INPUT', sense, value });
  }, []);

  const handleFinishImmersion = useCallback(() => {
    dispatch({ type: 'FINISH_IMMERSION' });
  }, []);

  const handleComfortContinue = useCallback(() => {
    setShowComfortCheck(false);
  }, []);

  const handleComfortStop = useCallback(() => {
    setShowComfortCheck(false);
    router.push('/recovery/trc');
  }, [router]);

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
              { label: t('breadcrumb.safePlace') },
            ]}
          />
        </div>
      )}

      <MedicalDisclaimer program="trc" />

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
            onProceed={() => dispatch({ type: 'PROCEED' })}
            onGoBack={handleGoBack}
          />
        )}

        {state.phase === 'building' && (
          <SenseBuilder
            key={"building-" + state.currentSense}
            currentSense={state.currentSense}
            senseValues={state.senses}
            onInputChange={handleSenseInput}
            onNext={() => dispatch({ type: 'NEXT_SENSE' })}
            onPrev={() => dispatch({ type: 'PREV_SENSE' })}
          />
        )}

        {state.phase === 'immersion' && (
          <ImmersionScreen
            key="immersion"
            senses={state.senses}
            onFinish={handleFinishImmersion}
          />
        )}

        {state.phase === 'completion' && (
          <CompletionScreen
            key="completion"
            onRepeat={() => dispatch({ type: 'REPEAT' })}
          />
        )}
      </AnimatePresence>

      {/* Comfort check-in after 30 seconds of immersion */}
      <DistressCheckIn
        type="comfort"
        visible={showComfortCheck}
        questionAr="هل مكانك الآمن واضح؟"
        questionEn="Is your safe place clear?"
        customOptions={[
          { labelAr: 'نعم', labelEn: 'Yes', action: 'continue' },
          { labelAr: 'إنه يتلاشى', labelEn: "It's fading", action: 'grounding' },
          { labelAr: 'أريد التوقف', labelEn: 'I want to stop', action: 'stop' },
        ]}
        onContinue={handleComfortContinue}
        onPause={handleComfortContinue}
        onStop={handleComfortStop}
        onGrounding={handleComfortGrounding}
      />

      <SafetyResponse program="trc" assetId="safe-place" />
      <TherapeuticExit fallbackHref="/recovery/trc" className="!bottom-20" />
    </div>
  );
}
