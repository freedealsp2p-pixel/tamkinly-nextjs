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
  | 'preparation'
  | 'step1-identify'
  | 'step2-feeling'
  | 'step3-evidence'
  | 'step4-compassion'
  | 'step5-reframe'
  | 'completion';

// ──────────────────────────────────────────────────────────────
// Emotion options (NOT diagnosis — descriptive labels)
// ──────────────────────────────────────────────────────────────
const EMOTIONS_AR = ['خوف', 'ذنب', 'عار', 'غضب', 'حزن', 'تبلّد', 'ارتباك'] as const;
const EMOTIONS_EN = ['fear', 'guilt', 'shame', 'anger', 'sadness', 'numbness', 'confusion'] as const;

// ──────────────────────────────────────────────────────────────
// Local storage helpers
// ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'tamkinly_trc_thought_reframing_data';

interface SavedData {
  originalThought: string;
  emotion: string;
  evidenceFor: string;
  evidenceAgainst: string;
  compassionateResponse: string;
  alternativeThought: string;
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
// Component
// ──────────────────────────────────────────────────────────────
export default function ThoughtReframingPage() {
  const router = useRouter();
  const { locale, direction } = useLocale();
  const t = useTranslations('recoveryAssets.trcThoughtReframing');
  const { markStepStarted, markStepCompleted } = useTrcState();

  const isAr = locale === 'ar';

  // Phase state
  const [phase, setPhase] = useState<Phase>('entry');

  // Form data
  const [originalThought, setOriginalThought] = useState('');
  const [emotion, setEmotion] = useState('');
  const [evidenceFor, setEvidenceFor] = useState('');
  const [evidenceAgainst, setEvidenceAgainst] = useState('');
  const [compassionateResponse, setCompassionateResponse] = useState('');
  const [alternativeThought, setAlternativeThought] = useState('');

  // Distress check-in
  const [showDistressCheck, setShowDistressCheck] = useState(false);
  const [distressCheckShown, setDistressCheckShown] = useState(false);

  // Resume from saved data
  useEffect(() => {
    const saved = loadSavedData();
    if (saved && saved.completedAt) {
      // Allow resuming to review, but start fresh for new sessions
      setOriginalThought(saved.originalThought || '');
      setEmotion(saved.emotion || '');
      setEvidenceFor(saved.evidenceFor || '');
      setEvidenceAgainst(saved.evidenceAgainst || '');
      setCompassionateResponse(saved.compassionateResponse || '');
      setAlternativeThought(saved.alternativeThought || '');
    }
  }, []);

  // Track journey state on mount
  useEffect(() => {
    markStepStarted('thought-reframing');
  }, [markStepStarted]);

  // Track completion
  useEffect(() => {
    if (phase === 'completion') {
      markStepCompleted('thought-reframing');
      // Save to localStorage
      saveData({
        originalThought,
        emotion,
        evidenceFor,
        evidenceAgainst,
        compassionateResponse,
        alternativeThought,
        completedAt: new Date().toISOString(),
      });
      // Also mark completion key
      try {
        localStorage.setItem('tamkinly_trc_thought_reframing_done', 'true');
      } catch {}
    }
  }, [phase, markStepCompleted, originalThought, emotion, evidenceFor, evidenceAgainst, compassionateResponse, alternativeThought]);

  // Show distress check-in when entering evidence step
  useEffect(() => {
    if (phase === 'step3-evidence' && !distressCheckShown) {
      setShowDistressCheck(true);
      setDistressCheckShown(true);
    }
  }, [phase, distressCheckShown]);

  // ── Handlers ──
  const handleStart = useCallback(() => {
    setPhase('safety');
  }, []);

  const handleProceedToPreparation = useCallback(() => {
    setPhase('preparation');
  }, []);

  const handleStartGuided = useCallback(() => {
    setPhase('step1-identify');
  }, []);

  const handleNextStep1 = useCallback(() => {
    setPhase('step2-feeling');
  }, []);

  const handleNextStep2 = useCallback(() => {
    setPhase('step3-evidence');
  }, []);

  const handleNextStep3 = useCallback(() => {
    setPhase('step4-compassion');
  }, []);

  const handleNextStep4 = useCallback(() => {
    // Use compassionate response as the alternative thought if not manually set
    if (!alternativeThought && compassionateResponse) {
      setAlternativeThought(compassionateResponse);
    }
    setPhase('step5-reframe');
  }, []);

  const handleComplete = useCallback(() => {
    setPhase('completion');
  }, []);

  const handleStopHere = useCallback(() => {
    // Save whatever they have so far
    saveData({
      originalThought,
      emotion,
      evidenceFor,
      evidenceAgainst,
      compassionateResponse,
      alternativeThought,
    });
    setPhase('completion');
  }, [originalThought, emotion, evidenceFor, evidenceAgainst, compassionateResponse, alternativeThought]);

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

  // ── Emotion labels ──
  const emotionLabels = isAr ? EMOTIONS_AR : EMOTIONS_EN;

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
      <SafetyResponse program="trc" assetId="trc-thought-reframing" />

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

              {/* Proceed button */}
              <button
                type="button"
                onClick={handleProceedToPreparation}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {t('safety.proceedButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══ PREPARATION PHASE ═══ */}
        {phase === 'preparation' && (
          <motion.div key="preparation" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-[#0F1C2E] mb-6">
                {t('preparation.title')}
              </h2>

              {/* Cognitive Triangle */}
              <div className="rounded-xl border border-[#1F6F78]/20 bg-white p-6 mb-6">
                <h3 className="text-base font-semibold text-[#1F6F78] mb-4">
                  {t('preparation.cognitiveTriangleTitle')}
                </h3>

                {/* Visual: Thoughts → Feelings → Behaviors */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4">
                  {[
                    { key: 'thoughts', color: '#1F6F78' },
                    { key: 'feelings', color: '#3DD4B0' },
                    { key: 'behaviors', color: '#C97B7B' },
                  ].map((item, i) => (
                    <div key={item.key} className="flex items-center gap-3 sm:gap-6">
                      <div
                        className="rounded-xl px-5 py-3 text-center font-semibold text-white"
                        style={{ backgroundColor: item.color }}
                      >
                        {t(`preparation.${item.key}`)}
                      </div>
                      {i < 2 && (
                        <span className="text-[#0F1C2E]/40 text-2xl sm:block hidden">→</span>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-[#0F1C2E]/80 mt-4">
                  {t('preparation.cognitiveTriangleExplanation')}
                </p>
              </div>

              {/* Example */}
              <div className="rounded-xl border border-[#3DD4B0]/30 bg-[#3DD4B0]/5 p-5 mb-6">
                <h3 className="text-base font-semibold text-[#0F1C2E] mb-2">
                  {t('preparation.exampleTitle')}
                </h3>
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80 mb-2">
                  {t('preparation.exampleThought')}
                </p>
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80 mb-2">
                  {t('preparation.exampleFeeling')}
                </p>
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80">
                  {t('preparation.exampleBehavior')}
                </p>
              </div>

              {/* Goal statement */}
              <div className="rounded-xl border border-[#1F6F78]/20 bg-white p-5 mb-8">
                <p className="text-sm leading-relaxed text-[#0F1C2E]/90 font-medium italic">
                  {t('preparation.goalStatement')}
                </p>
              </div>

              <button
                type="button"
                onClick={handleStartGuided}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {t('preparation.startButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ═══ STEP 1: IDENTIFY THE THOUGHT ═══ */}
        {phase === 'step1-identify' && (
          <motion.div key="step1" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              {/* Step indicator */}
              <p className="text-xs font-medium text-[#1F6F78] mb-2">
                {t('guided.stepLabel', { current: 1, total: 5 })}
              </p>

              <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">
                {t('guided.step1.title')}
              </h2>
              <p className="text-sm text-[#0F1C2E]/70 mb-6">
                {t('guided.step1.subtitle')}
              </p>

              <textarea
                value={originalThought}
                onChange={(e) => setOriginalThought(e.target.value)}
                placeholder={t('guided.step1.placeholder')}
                rows={4}
                className="w-full rounded-xl border border-[#1F6F78]/20 bg-white px-4 py-3 text-sm text-[#0F1C2E] placeholder:text-[#0F1C2E]/30 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/40 resize-none"
              />

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleNextStep1}
                  disabled={!originalThought.trim()}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t('guided.next')}
                </button>
                <button
                  type="button"
                  onClick={handleStopHere}
                  className="px-6 py-3 rounded-xl text-[#0F1C2E]/60 font-medium border border-[#0F1C2E]/10 hover:border-[#0F1C2E]/20 transition-all"
                >
                  {t('guided.stopHere')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ STEP 2: NOTICE THE FEELING ═══ */}
        {phase === 'step2-feeling' && (
          <motion.div key="step2" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs font-medium text-[#1F6F78] mb-2">
                {t('guided.stepLabel', { current: 2, total: 5 })}
              </p>

              <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">
                {t('guided.step2.title')}
              </h2>
              <p className="text-sm text-[#0F1C2E]/70 mb-6">
                {t('guided.step2.subtitle')}
              </p>

              {/* Emotion selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {emotionLabels.map((label, i) => {
                  const isSelected = emotion === (isAr ? EMOTIONS_AR[i] : EMOTIONS_EN[i]);
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setEmotion(isAr ? EMOTIONS_AR[i] : EMOTIONS_EN[i])}
                      className={[
                        'rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                        'border',
                        isSelected
                          ? 'border-[#1F6F78] bg-[#1F6F78]/10 text-[#1F6F78]'
                          : 'border-[#0F1C2E]/10 bg-white text-[#0F1C2E]/70 hover:border-[#1F6F78]/30',
                      ].join(' ')}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleNextStep2}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md"
                >
                  {t('guided.next')}
                </button>
                <button
                  type="button"
                  onClick={handleStopHere}
                  className="px-6 py-3 rounded-xl text-[#0F1C2E]/60 font-medium border border-[#0F1C2E]/10 hover:border-[#0F1C2E]/20 transition-all"
                >
                  {t('guided.stopHere')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ STEP 3: EXAMINE THE EVIDENCE ═══ */}
        {phase === 'step3-evidence' && (
          <motion.div key="step3" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs font-medium text-[#1F6F78] mb-2">
                {t('guided.stepLabel', { current: 3, total: 5 })}
              </p>

              <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">
                {t('guided.step3.title')}
              </h2>
              <p className="text-sm text-[#0F1C2E]/70 mb-6">
                {t('guided.step3.subtitle')}
              </p>

              {/* Two-column evidence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Supports */}
                <div className="rounded-xl border border-[#E8685A]/20 bg-white p-4">
                  <h3 className="text-sm font-semibold text-[#E8685A] mb-2">
                    {t('guided.step3.supportsTitle')}
                  </h3>
                  <textarea
                    value={evidenceFor}
                    onChange={(e) => setEvidenceFor(e.target.value)}
                    placeholder={t('guided.step3.supportsPlaceholder')}
                    rows={4}
                    className="w-full rounded-lg border border-[#0F1C2E]/5 bg-[#F5F9F8] px-3 py-2 text-sm text-[#0F1C2E] placeholder:text-[#0F1C2E]/25 focus:outline-none focus:ring-1 focus:ring-[#E8685A]/30 resize-none"
                  />
                </div>
                {/* Challenges */}
                <div className="rounded-xl border border-[#3DD4B0]/30 bg-white p-4">
                  <h3 className="text-sm font-semibold text-[#1F6F78] mb-2">
                    {t('guided.step3.challengesTitle')}
                  </h3>
                  <textarea
                    value={evidenceAgainst}
                    onChange={(e) => setEvidenceAgainst(e.target.value)}
                    placeholder={t('guided.step3.challengesPlaceholder')}
                    rows={4}
                    className="w-full rounded-lg border border-[#0F1C2E]/5 bg-[#F5F9F8] px-3 py-2 text-sm text-[#0F1C2E] placeholder:text-[#0F1C2E]/25 focus:outline-none focus:ring-1 focus:ring-[#1F6F78]/30 resize-none"
                  />
                </div>
              </div>

              <p className="text-xs text-[#0F1C2E]/50 mb-6 italic">
                {t('guided.step3.gentleNote')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleNextStep3}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md"
                >
                  {t('guided.next')}
                </button>
                <button
                  type="button"
                  onClick={handleStopHere}
                  className="px-6 py-3 rounded-xl text-[#0F1C2E]/60 font-medium border border-[#0F1C2E]/10 hover:border-[#0F1C2E]/20 transition-all"
                >
                  {t('guided.stopHere')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ STEP 4: COMPASSIONATE PERSPECTIVE ═══ */}
        {phase === 'step4-compassion' && (
          <motion.div key="step4" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs font-medium text-[#1F6F78] mb-2">
                {t('guided.stepLabel', { current: 4, total: 5 })}
              </p>

              <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">
                {t('guided.step4.title')}
              </h2>
              <p className="text-sm text-[#0F1C2E]/70 mb-6">
                {t('guided.step4.subtitle')}
              </p>

              <textarea
                value={compassionateResponse}
                onChange={(e) => setCompassionateResponse(e.target.value)}
                placeholder={t('guided.step4.placeholder')}
                rows={5}
                className="w-full rounded-xl border border-[#1F6F78]/20 bg-white px-4 py-3 text-sm text-[#0F1C2E] placeholder:text-[#0F1C2E]/30 focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/40 resize-none"
              />

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleNextStep4}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md"
                >
                  {t('guided.next')}
                </button>
                <button
                  type="button"
                  onClick={handleStopHere}
                  className="px-6 py-3 rounded-xl text-[#0F1C2E]/60 font-medium border border-[#0F1C2E]/10 hover:border-[#0F1C2E]/20 transition-all"
                >
                  {t('guided.stopHere')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ STEP 5: CHOOSE YOUR NEW FRAMING ═══ */}
        {phase === 'step5-reframe' && (
          <motion.div key="step5" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs font-medium text-[#1F6F78] mb-2">
                {t('guided.stepLabel', { current: 5, total: 5 })}
              </p>

              <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">
                {t('guided.step5.title')}
              </h2>
              <p className="text-sm text-[#0F1C2E]/70 mb-6">
                {t('guided.step5.subtitle')}
              </p>

              {/* Side-by-side: Original → Alternative */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Original thought */}
                <div className="rounded-xl border border-[#E8685A]/20 bg-[#E8685A]/5 p-4">
                  <h3 className="text-xs font-semibold text-[#E8685A] mb-2 uppercase tracking-wide">
                    {t('guided.step5.originalLabel')}
                  </h3>
                  <p className="text-sm text-[#0F1C2E]/90 leading-relaxed italic">
                    &ldquo;{originalThought}&rdquo;
                  </p>
                </div>
                {/* Alternative perspective */}
                <div className="rounded-xl border border-[#3DD4B0]/30 bg-[#3DD4B0]/5 p-4">
                  <h3 className="text-xs font-semibold text-[#1F6F78] mb-2 uppercase tracking-wide">
                    {t('guided.step5.alternativeLabel')}
                  </h3>
                  <textarea
                    value={alternativeThought || compassionateResponse}
                    onChange={(e) => setAlternativeThought(e.target.value)}
                    placeholder={t('guided.step5.alternativePlaceholder')}
                    rows={3}
                    className="w-full rounded-lg border border-[#1F6F78]/10 bg-white px-3 py-2 text-sm text-[#0F1C2E] placeholder:text-[#0F1C2E]/25 focus:outline-none focus:ring-1 focus:ring-[#1F6F78]/30 resize-none"
                  />
                </div>
              </div>

              {/* Important note */}
              <div className="rounded-xl border border-[#1F6F78]/20 bg-white p-4 mb-8">
                <p className="text-sm leading-relaxed text-[#0F1C2E]/80 italic">
                  {t('guided.step5.bothValidNote')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleComplete}
                  className="px-8 py-3 rounded-xl text-white font-semibold bg-[#1F6F78] hover:bg-[#1a5e66] transition-all duration-200 shadow-md"
                >
                  {t('guided.completeButton')}
                </button>
                <button
                  type="button"
                  onClick={handleStopHere}
                  className="px-6 py-3 rounded-xl text-[#0F1C2E]/60 font-medium border border-[#0F1C2E]/10 hover:border-[#0F1C2E]/20 transition-all"
                >
                  {t('guided.stopHere')}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ COMPLETION PHASE ═══ */}
        {phase === 'completion' && (
          <motion.div key="completion" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-[#0F1C2E] mb-4">
                {t('completion.title')}
              </h2>

              {/* Summary */}
              <div className="rounded-xl border border-[#1F6F78]/20 bg-white p-5 mb-6">
                {originalThought && (
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-[#1F6F78] uppercase tracking-wide">
                      {t('completion.exploredLabel')}
                    </span>
                    <p className="text-sm text-[#0F1C2E]/90 mt-1 italic">&ldquo;{originalThought}&rdquo;</p>
                  </div>
                )}
                {emotion && (
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-[#1F6F78] uppercase tracking-wide">
                      {t('completion.noticedLabel')}
                    </span>
                    <p className="text-sm text-[#0F1C2E]/90 mt-1">{emotion}</p>
                  </div>
                )}
                {(alternativeThought || compassionateResponse) && (
                  <div>
                    <span className="text-xs font-semibold text-[#1F6F78] uppercase tracking-wide">
                      {t('completion.consideredLabel')}
                    </span>
                    <p className="text-sm text-[#0F1C2E]/90 mt-1 italic">
                      &ldquo;{alternativeThought || compassionateResponse}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Key message */}
              <div className="rounded-xl border border-[#3DD4B0]/30 bg-[#3DD4B0]/5 p-5 mb-6">
                <p className="text-sm leading-relaxed text-[#0F1C2E]/90 font-medium">
                  {t('completion.keyMessage')}
                </p>
              </div>

              {/* Saved locally notice */}
              <p className="text-xs text-[#0F1C2E]/40 mb-6">
                {t('completion.savedLocally')}
              </p>

              {/* Enhanced Suggested Next Step */}
              <div className="mt-4">
                <EnhancedSuggestedNextStep program="trc" currentStepId="thought-reframing" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
