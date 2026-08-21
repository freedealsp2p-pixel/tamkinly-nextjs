"use client";

import { useReducer, useEffect, useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { triggerMappingReducer, initialState } from '@/lib/trc/trigger-mapping/reducer';
import { loadEntries, saveEntries, loadCurrentEntry, saveCurrentEntry, clearCurrentEntry } from '@/lib/trc/trigger-mapping/storage';
import type { Locale, MappingPhase, TriggerCategory, BodyResponse, EmotionLabel, TriggerEntry } from '@/lib/trc/trigger-mapping/types';
import TriggerMappingIntro from '@/components/trc/trigger-mapping/TriggerMappingIntro';
import TriggerEntryStep from '@/components/trc/trigger-mapping/TriggerEntryStep';
import BodyResponseStep from '@/components/trc/trigger-mapping/BodyResponseStep';
import EmotionStep from '@/components/trc/trigger-mapping/EmotionStep';
import ImpulseStep from '@/components/trc/trigger-mapping/ImpulseStep';
import WhatHelpedStep from '@/components/trc/trigger-mapping/WhatHelpedStep';
import TriggerReview from '@/components/trc/trigger-mapping/TriggerReview';
import TriggerCompletion from '@/components/trc/trigger-mapping/TriggerCompletion';
import { RecoveryBreadcrumb, MedicalDisclaimer, SafetyResponse, TherapeuticExit, DistressCheckIn } from '@/components/recovery/system';
import { useTrcState } from '@/hooks/useRecoveryState';

export default function TriggerMappingPage() {
  const { locale: appLocale } = useLocale();
  const tNav = useTranslations('recoveryNav');
  const tTrc = useTranslations('recoveryHub.trc');
  const [state, dispatch] = useReducer(triggerMappingReducer, initialState);
  const locale: Locale = state.locale;
  const { markStepStarted, markStepCompleted } = useTrcState();
  const router = useRouter();

  // Safety check-in states
  const [showReminder, setShowReminder] = useState(false);
  const [reminderDismissed, setReminderDismissed] = useState(false);
  const [showComfortCheck, setShowComfortCheck] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const savedEntries = loadEntries();
    const savedCurrent = loadCurrentEntry();
    const resolvedLocale = (appLocale === 'ar' || appLocale === 'en') ? appLocale : 'en';
    
    dispatch({ type: 'SET_LOCALE', locale: resolvedLocale as Locale });
    if (savedEntries.length > 0) {
      dispatch({ type: 'SET_ENTRIES', entries: savedEntries });
    }
    if (savedCurrent && Object.keys(savedCurrent).length > 0) {
      dispatch({ type: 'UPDATE_CURRENT_ENTRY', updates: savedCurrent });
    }
  }, [appLocale]);

  // Track journey state on mount
  useEffect(() => {
    markStepStarted('trigger-mapping');
  }, [markStepStarted]);

  // Track completion when reaching completion phase
  useEffect(() => {
    if (state.phase === 'completion') {
      markStepCompleted('trigger-mapping');
    }
  }, [state.phase, markStepCompleted]);

  // Show reminder when transitioning to emotion step
  useEffect(() => {
    if (state.phase === 'emotion' && !reminderDismissed) {
      setShowReminder(true);
    }
  }, [state.phase, reminderDismissed]);

  // Show comfort check after completing what-helped step (before review)
  useEffect(() => {
    if (state.phase === 'review') {
      setShowComfortCheck(true);
    }
  }, [state.phase]);

  // Persist entries when they change
  useEffect(() => {
    if (state.entries.length > 0) {
      saveEntries(state.entries);
    }
  }, [state.entries]);

  // Persist current entry in progress
  useEffect(() => {
    if (Object.keys(state.currentEntry).length > 0) {
      saveCurrentEntry(state.currentEntry);
    }
  }, [state.currentEntry]);

  // Mark completion in localStorage
  const markCompletion = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('tamkinly_trc_trigger_mapping_done', 'true');
      } catch {}
    }
  }, []);

  const handleConsent = useCallback(() => {
    dispatch({ type: 'CONSENT' });
  }, []);

  const handleUpdateCurrent = useCallback((updates: Partial<TriggerEntry>) => {
    dispatch({ type: 'UPDATE_CURRENT_ENTRY', updates });
  }, []);

  const handlePhaseTransition = useCallback((phase: MappingPhase) => {
    dispatch({ type: 'SET_PHASE', phase });
  }, []);

  const handleSaveAndContinue = useCallback(() => {
    dispatch({ type: 'SAVE_AND_CONTINUE' });
    clearCurrentEntry();
  }, []);

  const handleStopHere = useCallback(() => {
    dispatch({ type: 'STOP_HERE' });
    clearCurrentEntry();
    markCompletion();
  }, []);

  const handleDeleteEntry = useCallback((id: string) => {
    dispatch({ type: 'DELETE_ENTRY', id });
  }, []);

  const handleAddAnother = useCallback(() => {
    dispatch({ type: 'SET_PHASE', phase: 'trigger-entry' });
  }, []);

  const handleDone = useCallback(() => {
    dispatch({ type: 'SET_PHASE', phase: 'completion' });
    markCompletion();
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
  }, []);

  const showBreadcrumb = state.phase === 'intro' || state.phase === 'completion' || state.phase === 'review';

  return (
    <div className="min-h-screen bg-white relative" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {showBreadcrumb && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <RecoveryBreadcrumb
            items={[
              { label: tNav('title'), href: '/recovery' },
              { label: tNav('trc'), href: '/recovery/trc' },
              { label: locale === 'ar' ? 'خريطة المحفزات' : 'Trigger Mapping' },
            ]}
          />
        </div>
      )}

      {state.phase === 'intro' && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <MedicalDisclaimer />
        </div>
      )}

      <AnimatePresence mode="wait">
        {state.phase === 'intro' && (
          <TriggerMappingIntro
            key="intro"
            locale={locale}
            onConsent={handleConsent}
          />
        )}

        {state.phase === 'trigger-entry' && (
          <TriggerEntryStep
            key="trigger-entry"
            locale={locale}
            currentDescription={state.currentEntry.triggerDescription || ''}
            currentCategory={state.currentEntry.triggerCategory || null}
            onUpdate={handleUpdateCurrent}
            onNext={() => handlePhaseTransition('body-response')}
            onStopHere={handleStopHere}
          />
        )}

        {state.phase === 'body-response' && (
          <BodyResponseStep
            key="body-response"
            locale={locale}
            currentResponses={state.currentEntry.bodyResponses || []}
            currentNotes={state.currentEntry.bodyResponseNotes || ''}
            onUpdate={handleUpdateCurrent}
            onNext={() => handlePhaseTransition('emotion')}
            onSkip={() => handlePhaseTransition('emotion')}
          />
        )}

        {state.phase === 'emotion' && (
          <div key="emotion-wrapper">
            {/* Gentle reminder before emotion step */}
            <DistressCheckIn
              type="reminder"
              visible={showReminder && !reminderDismissed}
              questionAr="تذكر أنك لا تحتاج كتابة كل شيء."
              questionEn="Remember you don't need to write everything."
              onDismiss={() => { setShowReminder(false); setReminderDismissed(true); }}
            />
            <EmotionStep
              locale={locale}
              currentEmotion={state.currentEntry.primaryEmotion || null}
              currentActivation={state.currentEntry.activationLevel || 1}
              currentNotes={state.currentEntry.emotionNotes || ''}
              onUpdate={handleUpdateCurrent}
              onNext={() => handlePhaseTransition('impulse')}
              onSkip={() => handlePhaseTransition('impulse')}
            />
          </div>
        )}

        {state.phase === 'impulse' && (
          <ImpulseStep
            key="impulse"
            locale={locale}
            currentImpulse={state.currentEntry.impulse || ''}
            currentActualResponse={state.currentEntry.actualResponse || ''}
            onUpdate={handleUpdateCurrent}
            onNext={() => handlePhaseTransition('what-helped')}
            onSkip={() => handlePhaseTransition('what-helped')}
          />
        )}

        {state.phase === 'what-helped' && (
          <WhatHelpedStep
            key="what-helped"
            locale={locale}
            currentWhatHelped={state.currentEntry.whatHelped || ''}
            currentWouldHelpNextTime={state.currentEntry.wouldHelpNextTime || ''}
            onUpdate={handleUpdateCurrent}
            onNext={handleSaveAndContinue}
            onSkip={handleSaveAndContinue}
          />
        )}

        {state.phase === 'review' && (
          <TriggerReview
            key="review"
            locale={locale}
            entries={state.entries}
            onDeleteEntry={handleDeleteEntry}
            onAddAnother={handleAddAnother}
            onDone={handleDone}
          />
        )}

        {state.phase === 'completion' && (
          <TriggerCompletion
            key="completion"
            locale={locale}
            entriesCount={state.entries.length}
          />
        )}
      </AnimatePresence>

      {/* Comfort check-in after completing the form */}
      <DistressCheckIn
        type="comfort"
        visible={showComfortCheck}
        onContinue={handleComfortContinue}
        onPause={handleComfortContinue}
        onStop={handleComfortStop}
        onGrounding={handleComfortGrounding}
      />

      {/* Safety Response floating button */}
      <SafetyResponse assetId="trc-trigger-mapping" program="trc" />
      <TherapeuticExit fallbackHref="/recovery/trc" className="!bottom-20" />
    </div>
  );
}
