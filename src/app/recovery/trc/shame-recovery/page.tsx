'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import {
  RecoveryBreadcrumb,
  MedicalDisclaimer,
  SafetyResponse,
  TherapeuticExit,
  DistressCheckIn,
} from '@/components/recovery/system';
import EnhancedSuggestedNextStep from '@/components/recovery/system/EnhancedSuggestedNextStep';
import { useTrcState } from '@/hooks/useRecoveryState';

// ──────────────────────────────────────────────────────────────
// Phase type
// ──────────────────────────────────────────────────────────────
type Phase =
  | 'entry'
  | 'safety'
  | 'psychoeducation'
  | 'step1-identify'
  | 'step2-origin'
  | 'step3-fact-or-learned'
  | 'step4-compassion'
  | 'step5-truth'
  | 'completion';

// ──────────────────────────────────────────────────────────────
// Origin options
// ──────────────────────────────────────────────────────────────
type OriginOption = 'self' | 'others' | 'culture' | 'experience' | 'unsure';
type FactOrLearned = 'fact' | 'learned' | 'both';

// ──────────────────────────────────────────────────────────────
// Local storage helpers
// ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'tamkinly_trc_shame_recovery_data';

interface SavedData {
  shameMessage: string;
  origin: string;
  factOrLearned: string;
  compassionateResponse: string;
  completedAt?: string;
}

function loadSavedData(): SavedData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveData(data: SavedData) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently fail
  }
}

// ──────────────────────────────────────────────────────────────
// Animation variants
// ──────────────────────────────────────────────────────────────
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 },
};

// ──────────────────────────────────────────────────────────────
// Origin label helper
// ──────────────────────────────────────────────────────────────
function getOriginLabel(origin: OriginOption, t: (key: string) => string): string {
  const map: Record<OriginOption, string> = {
    self: t('guided.step2.optionSelf'),
    others: t('guided.step2.optionOthers'),
    culture: t('guided.step2.optionCulture'),
    experience: t('guided.step2.optionExperience'),
    unsure: t('guided.step2.optionUnsure'),
  };
  return map[origin] || origin;
}

function getFactOrLearnedLabel(val: FactOrLearned, t: (key: string) => string): string {
  const map: Record<FactOrLearned, string> = {
    fact: t('guided.step3.factLabel'),
    learned: t('guided.step3.learnedLabel'),
    both: t('guided.step3.bothLabel'),
  };
  return map[val] || val;
}

// ──────────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────────
export default function ShameRecoveryPage() {
  const router = useRouter();
  const { locale, direction } = useLocale();
  const t = useTranslations('recoveryAssets.trcShameRecovery');
  const { markStepStarted, markStepCompleted } = useTrcState();

  const isAr = locale === 'ar';

  // Phase state
  const [phase, setPhase] = useState<Phase>('entry');

  // Form data
  const [shameMessage, setShameMessage] = useState('');
  const [origin, setOrigin] = useState<OriginOption | ''>('');
  const [factOrLearned, setFactOrLearned] = useState<FactOrLearned | ''>('');
  const [compassionateResponse, setCompassionateResponse] = useState('');

  // Distress check-in
  const [showDistressCheck, setShowDistressCheck] = useState(false);
  const [distressCheckShown, setDistressCheckShown] = useState(false);

  // Resume from saved data
  useEffect(() => {
    const saved = loadSavedData();
    if (saved && saved.completedAt) {
      setShameMessage(saved.shameMessage || '');
      setOrigin((saved.origin as OriginOption) || '');
      setFactOrLearned((saved.factOrLearned as FactOrLearned) || '');
      setCompassionateResponse(saved.compassionateResponse || '');
    }
  }, []);

  // Track journey state on mount
  useEffect(() => {
    markStepStarted('shame-recovery');
  }, [markStepStarted]);

  // Track completion
  useEffect(() => {
    if (phase === 'completion') {
      markStepCompleted('shame-recovery');
      saveData({
        shameMessage,
        origin,
        factOrLearned,
        compassionateResponse,
        completedAt: new Date().toISOString(),
      });
      try {
        localStorage.setItem('tamkinly_trc_shame_recovery_done', 'true');
      } catch {}
    }
  }, [phase, markStepCompleted, shameMessage, origin, factOrLearned, compassionateResponse]);

  // Show distress check-in when entering origin step (tracing origins can be activating)
  useEffect(() => {
    if (phase === 'step2-origin' && !distressCheckShown) {
      setShowDistressCheck(true);
      setDistressCheckShown(true);
    }
  }, [phase, distressCheckShown]);

  // ── Handlers ──
  const handleStart = useCallback(() => {
    setPhase('safety');
  }, []);

  const handleProceedToPsychoeducation = useCallback(() => {
    setPhase('psychoeducation');
  }, []);

  const handleProceedToGuided = useCallback(() => {
    setPhase('step1-identify');
  }, []);

  const handleNextStep1 = useCallback(() => {
    setPhase('step2-origin');
  }, []);

  const handleNextStep2 = useCallback(() => {
    setPhase('step3-fact-or-learned');
  }, []);

  const handleNextStep3 = useCallback(() => {
    setPhase('step4-compassion');
  }, []);

  const handleNextStep4 = useCallback(() => {
    setPhase('step5-truth');
  }, []);

  const handleComplete = useCallback(() => {
    setPhase('completion');
  }, []);

  const handleStopHere = useCallback(() => {
    saveData({
      shameMessage,
      origin,
      factOrLearned,
      compassionateResponse,
    });
    setPhase('completion');
  }, [shameMessage, origin, factOrLearned, compassionateResponse]);

  const handleDistressContinue = useCallback(() => {
    setShowDistressCheck(false);
  }, []);

  const handleDistressStop = useCallback(() => {
    setShowDistressCheck(false);
    router.push('/recovery/trc');
  }, [router]);

  const handleDistressGrounding = useCallback(() => {
    setShowDistressCheck(false);
    router.push('/recovery/trc/grounding');
  }, []);

  const showBreadcrumb = phase === 'entry' || phase === 'safety' || phase === 'completion';

  // ── Step counter helper ──
  const stepPhases: Phase[] = ['step1-identify', 'step2-origin', 'step3-fact-or-learned', 'step4-compassion', 'step5-truth'];
  const currentStepIndex = stepPhases.indexOf(phase);
  const totalSteps = stepPhases.length;

  return (
    <div className="min-h-screen bg-[#F5F9F8] relative" dir={direction}>
      {/* Breadcrumb */}
      {showBreadcrumb && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <RecoveryBreadcrumb
            items={[
              { label: t('breadcrumb.recovery'), href: '/recovery' },
              { label: t('breadcrumb.trc'), href: '/recovery/trc' },
              { label: t('breadcrumb.current') },
            ]}
          />
        </div>
      )}

      {/* Medical Disclaimer — shown at entry */}
      {phase === 'entry' && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <MedicalDisclaimer />
        </div>
      )}

      {/* Safety Response — always available */}
      <SafetyResponse program="trc" assetId="shame-recovery" />

      {/* Distress Check-In */}
      <DistressCheckIn
        type="comfort"
        visible={showDistressCheck}
        questionAr={t('distressCheck.question')}
        questionEn={t('distressCheck.questionEn')}
        subtitleAr={t('distressCheck.subtitle')}
        subtitleEn={t('distressCheck.subtitleEn')}
        onContinue={handleDistressContinue}
        onStop={handleDistressStop}
        onGrounding={handleDistressGrounding}
        onDismiss={handleDistressContinue}
      />

      <AnimatePresence mode="wait">
        {/* ═══ ENTRY PHASE ═══ */}
        {phase === 'entry' && (
          <motion.div key="entry" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E] mb-4">
                {t('entry.title')}
              </h1>

              {/* Description */}
              <p className="text-base leading-relaxed text-[#0F1C2E]/80 mb-6">
                {t('entry.description')}
              </p>

              {/* What it is */}
              <div className="rounded-xl border border-[#1F6F78]/20 bg-white p-5 mb-6">
                <h2 className="text-lg font-semibold text-[#1F6F78] mb-3">
                  {t('entry.whatIsTitle')}
                </h2>
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80 mb-3">
                  {t('entry.whatIsDescription')}
                </p>
                <p className="text-sm leading-relaxed text-[#0F1C2E]/70">
                  {t('entry.whatIsNote')}
                </p>
              </div>

              {/* Info badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1F6F78]/10 text-[#1F6F78]">
                  {t('entry.duration')}
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-[#3DD4B0]/20 text-[#0F1C2E]/70">
                  {t('entry.level')}
                </span>
              </div>

              {/* Start button */}
              <button
                type="button"
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {t('entry.startButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══ SAFETY / ELIGIBILITY PHASE ═══ */}
        {phase === 'safety' && (
          <motion.div key="safety" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-[#0F1C2E] mb-4">
                {t('safety.title')}
              </h2>

              {/* Contraindication warning */}
              <div className="rounded-xl border border-[#E8685A]/30 bg-[#E8685A]/5 p-5 mb-6">
                <p className="text-sm leading-relaxed text-[#0F1C2E]/90 font-medium">
                  {t('safety.contraindication')}
                </p>
              </div>

              {/* Safety info */}
              <div className="rounded-xl border border-[#1F6F78]/20 bg-white p-5 mb-6">
                <h3 className="text-base font-semibold text-[#1F6F78] mb-2">
                  {t('safety.youControlTitle')}
                </h3>
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80 mb-4">
                  {t('safety.youControlDescription')}
                </p>
                <h3 className="text-base font-semibold text-[#1F6F78] mb-2">
                  {t('safety.notTherapyTitle')}
                </h3>
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                  {t('safety.notTherapyDescription')}
                </p>
              </div>

              {/* TherapeuticExit */}
              <TherapeuticExit />

              {/* Proceed button */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleProceedToPsychoeducation}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {t('safety.proceedButton')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ PSYCHOEDUCATION PHASE ═══ */}
        {phase === 'psychoeducation' && (
          <motion.div key="psychoeducation" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-[#0F1C2E] mb-6">
                {t('psychoeducation.title')}
              </h2>

              {/* Section 1: What is shame after trauma? */}
              <div className="rounded-xl border border-[#1F6F78]/20 bg-white p-6 mb-5">
                <h3 className="text-base font-semibold text-[#1F6F78] mb-3">
                  {t('psychoeducation.section1Title')}
                </h3>
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                  {t('psychoeducation.section1Description')}
                </p>
              </div>

              {/* Section 2: Types of shame */}
              <div className="rounded-xl border border-[#3DD4B0]/30 bg-[#3DD4B0]/5 p-6 mb-5">
                <h3 className="text-base font-semibold text-[#0F1C2E] mb-4">
                  {t('psychoeducation.section2Title')}
                </h3>

                {/* Type 1: Self-blame */}
                <div className="mb-4 pb-4 border-b border-[#0F1C2E]/10 last:border-0 last:pb-0 last:mb-0">
                  <h4 className="text-sm font-semibold text-[#1F6F78] mb-1">
                    {t('psychoeducation.type1Title')}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                    {t('psychoeducation.type1Description')}
                  </p>
                </div>

                {/* Type 2: Internalized stigma */}
                <div className="mb-4 pb-4 border-b border-[#0F1C2E]/10">
                  <h4 className="text-sm font-semibold text-[#1F6F78] mb-1">
                    {t('psychoeducation.type2Title')}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                    {t('psychoeducation.type2Description')}
                  </p>
                </div>

                {/* Type 3: Cultural/religious shame */}
                <div className="mb-4 pb-4 border-b border-[#0F1C2E]/10">
                  <h4 className="text-sm font-semibold text-[#1F6F78] mb-1">
                    {t('psychoeducation.type3Title')}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                    {t('psychoeducation.type3Description')}
                  </p>
                </div>

                {/* Type 4: Internalized victim-blaming */}
                <div>
                  <h4 className="text-sm font-semibold text-[#1F6F78] mb-1">
                    {t('psychoeducation.type4Title')}
                  </h4>
                  <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                    {t('psychoeducation.type4Description')}
                  </p>
                </div>
              </div>

              {/* Section 3: Why shame persists */}
              <div className="rounded-xl border border-[#1F6F78]/20 bg-white p-6 mb-5">
                <h3 className="text-base font-semibold text-[#1F6F78] mb-3">
                  {t('psychoeducation.section3Title')}
                </h3>
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                  {t('psychoeducation.section3Description')}
                </p>
              </div>

              {/* Section 4: Shame ≠ Guilt */}
              <div className="rounded-xl border border-[#C97B7B]/30 bg-[#C97B7B]/5 p-6 mb-5">
                <h3 className="text-base font-semibold text-[#0F1C2E] mb-3">
                  {t('psychoeducation.section4Title')}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 mt-1 w-6 h-6 rounded-full bg-[#3DD4B0]/30 flex items-center justify-center text-xs font-bold text-[#1F6F78]">✓</span>
                    <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                      {t('psychoeducation.section4Guilt')}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 mt-1 w-6 h-6 rounded-full bg-[#E8685A]/30 flex items-center justify-center text-xs font-bold text-[#E8685A]">✗</span>
                    <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                      {t('psychoeducation.section4Shame')}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[#0F1C2E]/70 mt-3">
                  {t('psychoeducation.section4Note')}
                </p>
              </div>

              {/* Important note */}
              <div className="rounded-xl border border-[#1F6F78]/10 bg-[#1F6F78]/5 p-4 mb-8">
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80 italic">
                  {t('psychoeducation.section5Note')}
                </p>
              </div>

              {/* Proceed button */}
              <button
                type="button"
                onClick={handleProceedToGuided}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {t('psychoeducation.proceedButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══ GUIDED EXERCISE — Step 1: Identify shame message ═══ */}
        {phase === 'step1-identify' && (
          <motion.div key="step1" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              {/* Step label */}
              <p className="text-sm font-medium text-[#1F6F78] mb-3">
                {t('guided.stepLabel').replace('{current}', '1').replace('{total}', String(totalSteps))}
              </p>

              <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">
                {t('guided.step1.title')}
              </h2>
              <p className="text-sm leading-relaxed text-[#0F1C2E]/70 mb-4">
                {t('guided.step1.subtitle')}
              </p>

              {/* Examples (suggestions, NOT pre-filled) */}
              <div className="rounded-xl border border-[#3DD4B0]/30 bg-[#3DD4B0]/5 p-4 mb-5">
                <p className="text-xs font-medium text-[#0F1C2E]/60 mb-2">
                  {t('guided.step1.examplesTitle')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[t('guided.step1.example1'), t('guided.step1.example2'), t('guided.step1.example3')].map((ex, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg text-xs bg-white border border-[#0F1C2E]/10 text-[#0F1C2E]/70">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>

              {/* Text area */}
              <textarea
                value={shameMessage}
                onChange={(e) => setShameMessage(e.target.value)}
                placeholder={t('guided.step1.placeholder')}
                className="w-full min-h-[120px] px-4 py-3 rounded-xl border border-[#0F1C2E]/15 bg-white text-[#0F1C2E] placeholder:text-[#0F1C2E]/30 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30 focus:border-[#1F6F78] resize-y text-sm leading-relaxed"
                dir={direction}
              />

              {/* Next button */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleNextStep1}
                  disabled={!shameMessage.trim()}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('guided.next')}
                </button>
                <button
                  type="button"
                  onClick={handleStopHere}
                  className="px-6 py-3 rounded-xl text-[#0F1C2E]/70 font-medium bg-white border border-[#0F1C2E]/15 hover:bg-[#0F1C2E]/5 transition-all duration-200 text-sm"
                >
                  {t('guided.stopHere')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ GUIDED EXERCISE — Step 2: Trace the origin ═══ */}
        {phase === 'step2-origin' && (
          <motion.div key="step2" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              {/* Step label */}
              <p className="text-sm font-medium text-[#1F6F78] mb-3">
                {t('guided.stepLabel').replace('{current}', '2').replace('{total}', String(totalSteps))}
              </p>

              <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">
                {t('guided.step2.title')}
              </h2>
              <p className="text-sm leading-relaxed text-[#0F1C2E]/70 mb-5">
                {t('guided.step2.subtitle')}
              </p>

              {/* Origin options */}
              <div className="space-y-3 mb-5">
                {([
                  { value: 'self' as OriginOption, key: 'optionSelf' },
                  { value: 'others' as OriginOption, key: 'optionOthers' },
                  { value: 'culture' as OriginOption, key: 'optionCulture' },
                  { value: 'experience' as OriginOption, key: 'optionExperience' },
                  { value: 'unsure' as OriginOption, key: 'optionUnsure' },
                ]).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setOrigin(opt.value)}
                    className={`w-full text-start px-5 py-4 rounded-xl border transition-all duration-200 text-sm leading-relaxed ${
                      origin === opt.value
                        ? 'border-[#1F6F78] bg-[#1F6F78]/10 text-[#1F6F78] font-medium'
                        : 'border-[#0F1C2E]/10 bg-white text-[#0F1C2E]/80 hover:border-[#1F6F78]/30 hover:bg-[#1F6F78]/5'
                    }`}
                    dir={direction}
                  >
                    {t(`guided.step2.${opt.key}`)}
                  </button>
                ))}
              </div>

              {/* Unsure note */}
              {origin === 'unsure' && (
                <div className="rounded-xl border border-[#1F6F78]/10 bg-[#1F6F78]/5 p-4 mb-5">
                  <p className="text-sm leading-relaxed text-[#0F1C2E]/80 italic">
                    {t('guided.step2.unsureNote')}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleNextStep2}
                  disabled={!origin}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('guided.next')}
                </button>
                <button
                  type="button"
                  onClick={handleStopHere}
                  className="px-6 py-3 rounded-xl text-[#0F1C2E]/70 font-medium bg-white border border-[#0F1C2E]/15 hover:bg-[#0F1C2E]/5 transition-all duration-200 text-sm"
                >
                  {t('guided.stopHere')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ GUIDED EXERCISE — Step 3: Fact or learned response ═══ */}
        {phase === 'step3-fact-or-learned' && (
          <motion.div key="step3" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              {/* Step label */}
              <p className="text-sm font-medium text-[#1F6F78] mb-3">
                {t('guided.stepLabel').replace('{current}', '3').replace('{total}', String(totalSteps))}
              </p>

              <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">
                {t('guided.step3.title')}
              </h2>
              <p className="text-sm leading-relaxed text-[#0F1C2E]/70 mb-2">
                {t('guided.step3.subtitle')}
              </p>

              {/* Gentle note */}
              <div className="rounded-xl border border-[#3DD4B0]/30 bg-[#3DD4B0]/5 p-4 mb-5">
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                  {t('guided.step3.gentleNote')}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-5">
                {([
                  { value: 'fact' as FactOrLearned, key: 'factLabel' },
                  { value: 'learned' as FactOrLearned, key: 'learnedLabel' },
                  { value: 'both' as FactOrLearned, key: 'bothLabel' },
                ]).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFactOrLearned(opt.value)}
                    className={`w-full text-start px-5 py-4 rounded-xl border transition-all duration-200 text-sm leading-relaxed ${
                      factOrLearned === opt.value
                        ? 'border-[#1F6F78] bg-[#1F6F78]/10 text-[#1F6F78] font-medium'
                        : 'border-[#0F1C2E]/10 bg-white text-[#0F1C2E]/80 hover:border-[#1F6F78]/30 hover:bg-[#1F6F78]/5'
                    }`}
                    dir={direction}
                  >
                    {t(`guided.step3.${opt.key}`)}
                  </button>
                ))}
              </div>

              {/* Reflection note when "learned" is selected */}
              {(factOrLearned === 'learned' || factOrLearned === 'both') && (
                <div className="rounded-xl border border-[#1F6F78]/10 bg-[#1F6F78]/5 p-4 mb-5">
                  <p className="text-sm leading-relaxed text-[#0F1C2E]/80 italic">
                    {t('guided.step3.reflectionNote')}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleNextStep3}
                  disabled={!factOrLearned}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('guided.next')}
                </button>
                <button
                  type="button"
                  onClick={handleStopHere}
                  className="px-6 py-3 rounded-xl text-[#0F1C2E]/70 font-medium bg-white border border-[#0F1C2E]/15 hover:bg-[#0F1C2E]/5 transition-all duration-200 text-sm"
                >
                  {t('guided.stopHere')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ GUIDED EXERCISE — Step 4: Compassionate response ═══ */}
        {phase === 'step4-compassion' && (
          <motion.div key="step4" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              {/* Step label */}
              <p className="text-sm font-medium text-[#1F6F78] mb-3">
                {t('guided.stepLabel').replace('{current}', '4').replace('{total}', String(totalSteps))}
              </p>

              <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">
                {t('guided.step4.title')}
              </h2>
              <p className="text-sm leading-relaxed text-[#0F1C2E]/70 mb-5">
                {t('guided.step4.subtitle')}
              </p>

              {/* Text area */}
              <textarea
                value={compassionateResponse}
                onChange={(e) => setCompassionateResponse(e.target.value)}
                placeholder={t('guided.step4.placeholder')}
                className="w-full min-h-[140px] px-4 py-3 rounded-xl border border-[#0F1C2E]/15 bg-white text-[#0F1C2E] placeholder:text-[#0F1C2E]/30 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30 focus:border-[#1F6F78] resize-y text-sm leading-relaxed"
                dir={direction}
              />

              {/* Navigation */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleNextStep4}
                  disabled={!compassionateResponse.trim()}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('guided.next')}
                </button>
                <button
                  type="button"
                  onClick={handleStopHere}
                  className="px-6 py-3 rounded-xl text-[#0F1C2E]/70 font-medium bg-white border border-[#0F1C2E]/15 hover:bg-[#0F1C2E]/5 transition-all duration-200 text-sm"
                >
                  {t('guided.stopHere')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ GUIDED EXERCISE — Step 5: Choose your truth ═══ */}
        {phase === 'step5-truth' && (
          <motion.div key="step5" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              {/* Step label */}
              <p className="text-sm font-medium text-[#1F6F78] mb-3">
                {t('guided.stepLabel').replace('{current}', '5').replace('{total}', String(totalSteps))}
              </p>

              <h2 className="text-xl font-bold text-[#0F1C2E] mb-5">
                {t('guided.step5.title')}
              </h2>

              {/* Side by side: shame message vs compassionate response */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Shame message */}
                <div className="rounded-xl border border-[#E8685A]/30 bg-[#E8685A]/5 p-5">
                  <p className="text-xs font-semibold text-[#E8685A] mb-2">
                    {t('guided.step5.shameLabel')}
                  </p>
                  <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                    {shameMessage}
                  </p>
                </div>

                {/* Compassionate response */}
                <div className="rounded-xl border border-[#3DD4B0]/30 bg-[#3DD4B0]/5 p-5">
                  <p className="text-xs font-semibold text-[#1F6F78] mb-2">
                    {t('guided.step5.compassionLabel')}
                  </p>
                  <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                    {compassionateResponse}
                  </p>
                </div>
              </div>

              {/* Important note */}
              <div className="rounded-xl border border-[#1F6F78]/10 bg-[#1F6F78]/5 p-4 mb-4">
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                  {t('guided.step5.note')}
                </p>
              </div>

              {/* Can stop note */}
              <div className="rounded-xl border border-[#0F1C2E]/5 bg-[#0F1C2E]/3 p-4 mb-6">
                <p className="text-sm leading-relaxed text-[#0F1C2E]/60 italic">
                  {t('guided.step5.canStopNote')}
                </p>
              </div>

              {/* Complete button */}
              <button
                type="button"
                onClick={handleComplete}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {t('guided.completeButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══ COMPLETION PHASE ═══ */}
        {phase === 'completion' && (
          <motion.div key="completion" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-[#0F1C2E] mb-6">
                {t('completion.title')}
              </h2>

              {/* Summary */}
              <div className="rounded-xl border border-[#1F6F78]/20 bg-white p-6 mb-6">
                {shameMessage && (
                  <div className="mb-4 pb-4 border-b border-[#0F1C2E]/10">
                    <p className="text-xs font-semibold text-[#1F6F78] mb-1">
                      {t('completion.namedLabel')}
                    </p>
                    <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                      {shameMessage}
                    </p>
                  </div>
                )}

                {origin && (
                  <div className="mb-4 pb-4 border-b border-[#0F1C2E]/10">
                    <p className="text-xs font-semibold text-[#1F6F78] mb-1">
                      {t('completion.originLabel')}
                    </p>
                    <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                      {getOriginLabel(origin as OriginOption, t)}
                    </p>
                  </div>
                )}

                {compassionateResponse && (
                  <div className="mb-4 pb-4 border-b border-[#0F1C2E]/10">
                    <p className="text-xs font-semibold text-[#1F6F78] mb-1">
                      {t('completion.offeredLabel')}
                    </p>
                    <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                      {compassionateResponse}
                    </p>
                  </div>
                )}

                {/* "It was not your fault" - explicit anti victim-blaming */}
                <div className="rounded-lg bg-[#1F6F78]/10 p-4 mb-0">
                  <p className="text-base font-semibold text-[#1F6F78] text-center">
                    {t('completion.notYourFault')}
                  </p>
                </div>
              </div>

              {/* Key message */}
              <div className="rounded-xl border border-[#3DD4B0]/30 bg-[#3DD4B0]/5 p-5 mb-6">
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                  {t('completion.keyMessage')}
                </p>
              </div>

              {/* Saved locally note */}
              <p className="text-xs text-[#0F1C2E]/40 mb-8">
                {t('completion.savedLocally')}
              </p>

              {/* Suggested Next Step → Trauma Journal */}
              <EnhancedSuggestedNextStep
                currentStepId="shame-recovery"
                program="trc"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
