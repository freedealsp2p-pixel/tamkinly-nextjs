'use client';

import { useReducer, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { bodyScanReducer, initialState } from '@/lib/recovery/body-scan/reducer';
import { BodyScanAction } from '@/lib/recovery/body-scan/types';
import EntryScreen from '@/components/recovery/body-scan/EntryScreen';
import BridgeScreen from '@/components/recovery/body-scan/BridgeScreen';
import ScanningPhase from '@/components/recovery/body-scan/ScanningPhase';
import IntegrationScreen from '@/components/recovery/body-scan/IntegrationScreen';
import CompletionScreen from '@/components/recovery/body-scan/CompletionScreen';
import { RecoveryBreadcrumb, MedicalDisclaimer, SafetyResponse, TherapeuticExit, DistressCheckIn } from '@/components/recovery/system';
import { useTranslations } from '@/components/providers/LocaleProvider';
import { useTrcState } from '@/hooks/useRecoveryState';

export default function BodyScanPage() {
  const router = useRouter();
  const [state, dispatch] = useReducer(bodyScanReducer, initialState);
  const t = useTranslations('recoveryAssets');
  const { markStepStarted, markStepCompleted } = useTrcState();

  // CRITICAL dissociation check: after scanning chest (index 3 — head/neck area comes after)
  // Body parts: feet(0), legs(1), abdomen(2), chest(3), arms(4), neck-face(5)
  const [showDissociationCheck, setShowDissociationCheck] = useState(false);
  const [dissociationCheckShown, setDissociationCheckShown] = useState(false);

  // Track journey state on mount
  useEffect(() => {
    markStepStarted('body-scan');
  }, [markStepStarted]);

  // Track completion when reaching completion phase
  useEffect(() => {
    if (state.phase === 'completion') {
      markStepCompleted('body-scan');
    }
  }, [state.phase, markStepCompleted]);

  const handleAction = (type: BodyScanAction['type'], payload?: Record<string, unknown>) => {
    if (payload) {
      dispatch({ type, ...payload } as BodyScanAction);
    } else {
      dispatch({ type } as BodyScanAction);
    }
  };

  // Intercept NEXT_PART to show dissociation check after chest (part index 3)
  const handleNextPart = useCallback(() => {
    if (state.currentPartIndex === 3 && !dissociationCheckShown) {
      setShowDissociationCheck(true);
      setDissociationCheckShown(true);
      return;
    }
    dispatch({ type: 'NEXT_PART' });
  }, [state.currentPartIndex, dissociationCheckShown]);

  const handleDissociationContinue = useCallback(() => {
    setShowDissociationCheck(false);
    dispatch({ type: 'NEXT_PART' }); // advance from chest to arms
  }, []);

  const handleDissociationStop = useCallback(() => {
    setShowDissociationCheck(false);
    router.push('/recovery/trc');
  }, [router]);

  const handleDissociationGrounding = useCallback(() => {
    setShowDissociationCheck(false);
    // IMMEDIATELY redirect to grounding — body scan can trigger dissociation
    router.push('/recovery/trc/grounding');
  }, [router]);

  const showBreadcrumb = state.phase === 'entry' || state.phase === 'bridge' || state.phase === 'completion';

  const renderPhase = () => {
    switch (state.phase) {
      case 'entry':
        return (
          <EntryScreen
            onStart={() => dispatch({ type: 'START_BRIDGE' })}
          />
        );

      case 'bridge':
        return (
          <BridgeScreen
            onProceed={() => dispatch({ type: 'PROCEED' })}
            onGoBack={() => dispatch({ type: 'GO_BACK' })}
          />
        );

      case 'scanning':
        return (
          <ScanningPhase
            currentPartIndex={state.currentPartIndex}
            sensation={state.sensations[state.currentPartIndex]?.sensation ?? null}
            isPaused={state.isPaused}
            onSetSensation={(sensation) => dispatch({ type: 'SET_SENSATION', sensation })}
            onNextPart={handleNextPart}
            onGoBack={() => dispatch({ type: 'GO_BACK' })}
            onSetPaused={(isPaused) => dispatch({ type: 'SET_PAUSED', isPaused })}
            onFinishScanning={() => dispatch({ type: 'FINISH_SCANNING' })}
          />
        );

      case 'integration':
        return (
          <IntegrationScreen
            sensations={state.sensations}
            onFinish={() => dispatch({ type: 'FINISH_INTEGRATION' })}
          />
        );

      case 'completion':
        return (
          <CompletionScreen
            onRepeat={() => dispatch({ type: 'REPEAT' })}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {showBreadcrumb && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <RecoveryBreadcrumb
            items={[
              { label: t('breadcrumb.recoveryCenter'), href: '/recovery' },
              { label: t('breadcrumb.trcRecovery'), href: '/recovery/trc' },
              { label: t('breadcrumb.bodyScan') },
            ]}
          />
        </div>
      )}

      <MedicalDisclaimer program="trc" />

      {renderPhase()}

      {/* CRITICAL: Dissociation check after scanning chest/shoulders */}
      <DistressCheckIn
        type="dissociation"
        visible={showDissociationCheck}
        onContinue={handleDissociationContinue}
        onStop={handleDissociationStop}
        onGrounding={handleDissociationGrounding}
      />

      <SafetyResponse program="trc" assetId="body-scan" />
      <TherapeuticExit fallbackHref="/recovery/trc" className="!bottom-20" />
    </>
  );
}
