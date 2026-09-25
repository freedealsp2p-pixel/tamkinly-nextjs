'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
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
// Phase type — complete EFT flow
// ──────────────────────────────────────────────────────────────
type Phase =
  | 'entry'
  | 'dissociation-screen'
  | 'safety'
  | 'preparation'
  | 'setup-phrase'
  | 'tapping-sequence'
  | 'reassessment'
  | 'grounding-reset'
  | 'completion';

// ──────────────────────────────────────────────────────────────
// Tapping points definition
// ──────────────────────────────────────────────────────────────
const TAPPING_POINTS = [
  { code: 'KC', nameEn: 'Karate chop point', nameAr: 'نقطة ضربة الكاراتيه', icon: '◉' },
  { code: 'EB', nameEn: 'Beginning of eyebrow', nameAr: '\u0628\u062f\u0627\u064a\u0629 \u0627\u0644\u062d\u0627\u062c\u0628', icon: '\u25C9' },
  { code: 'SE', nameEn: 'Side of eye', nameAr: '\u062c\u0627\u0646\u0628 \u0627\u0644\u0639\u064a\u0646', icon: '\u25C9' },
  { code: 'UE', nameEn: 'Under eye', nameAr: '\u062a\u062d\u062a \u0627\u0644\u0639\u064a\u0646', icon: '\u25C9' },
  { code: 'UN', nameEn: 'Under nose', nameAr: '\u062a\u062d\u062a \u0627\u0644\u0623\u0646\u0641', icon: '\u25C9' },
  { code: 'CH', nameEn: 'Chin', nameAr: '\u0627\u0644\u0630\u0642\u0646', icon: '\u25C9' },
  { code: 'CB', nameEn: 'Collarbone', nameAr: '\u0639\u0638\u0645\u0629 \u0627\u0644\u062a\u0631\u0642\u0648\u0629', icon: '\u25C9' },
  { code: 'UA', nameEn: 'Under arm', nameAr: '\u062a\u062d\u062a \u0627\u0644\u0625\u0628\u0637', icon: '\u25C9' },
  { code: 'TH', nameEn: 'Top of head', nameAr: '\u0642\u0645\u0629 \u0627\u0644\u0631\u0623\u0633', icon: '\u25C9' },
] as const;

const MAX_ROUNDS = 3;

// ──────────────────────────────────────────────────────────────
// Local storage helpers
// ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'tamkinly_trc_eft_tapping_data';
const COMPLETION_KEY = 'tamkinly_trc_eft_done';

interface SavedData {
  issue: string;
  sudsBefore: number;
  sudsAfter: number;
  roundsCompleted: number;
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
// SUDS scale component
// ──────────────────────────────────────────────────────────────
function SUDSScale({
  value,
  onChange,
  label,
}: {
  value: number | null;
  onChange: (v: number) => void;
  label: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <div className="flex items-center gap-1">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
              value === i
                ? 'bg-[#1F6F78] text-white scale-110 shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 px-1">
        <span>0 — No distress</span>
        <span>10 — Maximum distress</span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────────────────
export default function EftTappingPage() {
  const router = useRouter();
  const { locale, direction } = useLocale();
  const t = useTranslations('recoveryAssets.trcEftTapping');
  const { markStepStarted, markStepCompleted } = useTrcState();

  const isAr = locale === 'ar';

  // Phase state
  const [phase, setPhase] = useState<Phase>('entry');

  // Dissociation answer
  const [dissociationAnswer, setDissociationAnswer] = useState<'yes' | 'not-sure' | 'no' | null>(null);

  // EFT data
  const [issue, setIssue] = useState('');
  const [sudsBefore, setSudsBefore] = useState<number | null>(null);
  const [sudsAfter, setSudsAfter] = useState<number | null>(null);
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [showDistressCheck, setShowDistressCheck] = useState(false);

  // Resume from saved
  useEffect(() => {
    const saved = loadSavedData();
    if (saved) {
      setIssue(saved.issue || '');
    }
  }, []);

  // Track journey state on mount
  useEffect(() => {
    markStepStarted('eft-tapping');
  }, [markStepStarted]);

  // Track completion
  useEffect(() => {
    if (phase === 'completion') {
      markStepCompleted('eft-tapping');
      try {
        localStorage.setItem(COMPLETION_KEY, 'true');
      } catch {}
      saveData({
        issue,
        sudsBefore: sudsBefore ?? 0,
        sudsAfter: sudsAfter ?? 0,
        roundsCompleted: currentRound,
        completedAt: new Date().toISOString(),
      });
    }
  }, [phase, markStepCompleted, issue, sudsBefore, sudsAfter, currentRound]);

  // ── Handlers ──
  const handleBegin = useCallback(() => {
    setPhase('dissociation-screen');
  }, []);

  const handleDissociationYes = useCallback(() => {
    setDissociationAnswer('yes');
    setPhase('safety');
  }, []);

  const handleDissociationNotSure = useCallback(() => {
    setDissociationAnswer('not-sure');
    // Offer grounding first, then continue
  }, []);

  const handleDissociationNo = useCallback(() => {
    setDissociationAnswer('no');
    // STOP — redirect to grounding
  }, []);

  const handleProceedToSafety = useCallback(() => {
    setPhase('safety');
  }, []);

  const handleProceedToPreparation = useCallback(() => {
    setPhase('preparation');
  }, []);

  const handleProceedToSetupPhrase = useCallback(() => {
    if (!issue.trim() || sudsBefore === null) return;
    setPhase('setup-phrase');
  }, [issue, sudsBefore]);

  const handleProceedToTapping = useCallback(() => {
    setCurrentPointIndex(0);
    setPhase('tapping-sequence');
  }, []);

  const handleNextPoint = useCallback(() => {
    if (currentPointIndex < TAPPING_POINTS.length - 1) {
      setCurrentPointIndex(prev => prev + 1);
    } else {
      // Round complete — go to reassessment
      setPhase('reassessment');
    }
  }, [currentPointIndex]);

  const handleReassessmentComplete = useCallback(() => {
    if (sudsAfter === null) return;

    // STOP CRITERION: If intensity INCREASED
    if (sudsAfter > sudsBefore!) {
      // Redirect to grounding — this sometimes happens
      router.push('/recovery/trc/grounding');
      return;
    }

    // If decreased but still > 3 and rounds < max
    if (sudsAfter > 3 && currentRound < MAX_ROUNDS) {
      // Offer another round
      setShowDistressCheck(true);
      return;
    }

    // Otherwise, proceed to grounding reset
    setPhase('grounding-reset');
  }, [sudsAfter, sudsBefore, currentRound, router]);

  const handleAnotherRound = useCallback(() => {
    setShowDistressCheck(false);
    setCurrentRound(prev => prev + 1);
    setCurrentPointIndex(0);
    setPhase('tapping-sequence');
  }, []);

  const handleNoMoreRounds = useCallback(() => {
    setShowDistressCheck(false);
    setPhase('grounding-reset');
  }, []);

  const handleGroundingComplete = useCallback(() => {
    setPhase('completion');
  }, []);

  const handleStopToGrounding = useCallback(() => {
    router.push('/recovery/trc/grounding');
  }, [router]);

  const showBreadcrumb = phase === 'entry' || phase === 'safety' || phase === 'completion';

  const currentPoint = TAPPING_POINTS[currentPointIndex];

  // Setup phrase
  const setupPhraseAr = `\u062d\u062a\u0649 \u0648\u0625\u0646 \u0643\u0627\u0646 \u0644\u062f\u064a [\u0627\u0644\u0645\u0634\u0643\u0644\u0629]\u060c \u0641\u0623\u0646\u0627 \u0623\u062a\u0642\u0628\u0651\u0644 \u0646\u0641\u0633\u064a \u0628\u0639\u0645\u0642 \u0648\u0643\u0644\u064a\u0651\u0629.`;
  const setupPhraseEn = `Even though I have [${issue || 'this problem'}], I deeply and completely accept myself.`;
  const reminderPhrase = issue || 'this feeling';

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

      {/* Safety Response — always available */}
      <SafetyResponse program="trc" assetId="eft-tapping" />

      <AnimatePresence mode="wait">
        {/* ────────── ENTRY ────────── */}
        {phase === 'entry' && (
          <motion.div key="entry" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            {/* Clinical Review Badge */}
            <div className="mb-6 p-3 rounded-lg bg-amber-50 border border-amber-200 text-center">
              <p className="text-sm text-amber-800 font-medium">
                {isAr
                  ? '\u26a0\ufe0f \u0647\u0630\u0647 \u0627\u0644\u0623\u062f\u0627\u0629 \u062a\u062d\u062a\u0627\u062c \u0645\u0631\u0627\u062c\u0639\u0629 \u0633\u0631\u064a\u0631\u064a\u0629 \u0642\u0628\u0644 \u0627\u0644\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0627\u0644\u0639\u0627\u0645'
                  : '\u26a0\ufe0f This tool requires clinical review before general use'}
              </p>
              <p className="text-xs text-amber-600 mt-1">
                {isAr
                  ? '\u0647\u0630\u0647 \u0627\u0644\u0623\u062f\u0627\u0629 \u0628\u062d\u0627\u0644\u0629 clinical-review'
                  : 'Status: clinical-review'}
              </p>
            </div>

            <MedicalDisclaimer />

            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {t('entry.title')}
              </h1>
              <p className="text-lg text-gray-600 mb-1">
                {t('entry.titleEn')}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <p className="text-gray-700 mb-4 leading-relaxed">
                {t('entry.description')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <span className="text-sm text-gray-500">{t('entry.duration')}</span>
                <span className="text-sm text-gray-500">{t('entry.level')}</span>
              </div>

              <p className="text-xs text-gray-400 mb-4">{t('entry.safetyNotice')}</p>

              <button
                onClick={handleBegin}
                className="w-full py-3 px-6 rounded-lg bg-[#1F6F78] text-white font-semibold text-base hover:bg-[#17595f] transition-colors"
              >
                {t('entry.startButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ────────── DISSOCIATION SCREEN ────────── */}
        {phase === 'dissociation-screen' && (
          <motion.div key="dissociation" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-red-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {t('dissociation.title')}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t('dissociation.question')}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                {t('dissociation.questionEn')}
              </p>

              <div className="space-y-3">
                {/* Yes — continue */}
                <button
                  onClick={handleDissociationYes}
                  className="w-full py-3 px-6 rounded-lg bg-[#1F6F78] text-white font-semibold text-base hover:bg-[#17595f] transition-colors text-left"
                >
                  <span className="block">{t('dissociation.yes')}</span>
                  <span className="block text-xs opacity-80 mt-0.5">{t('dissociation.yesEn')}</span>
                </button>

                {/* Not sure — offer grounding first */}
                <button
                  onClick={handleDissociationNotSure}
                  className="w-full py-3 px-6 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-semibold text-base hover:bg-amber-100 transition-colors text-left"
                >
                  <span className="block">{t('dissociation.notSure')}</span>
                  <span className="block text-xs opacity-80 mt-0.5">{t('dissociation.notSureEn')}</span>
                </button>

                {/* No — STOP, redirect to grounding */}
                <button
                  onClick={handleDissociationNo}
                  className="w-full py-3 px-6 rounded-lg bg-red-50 border border-red-200 text-red-800 font-semibold text-base hover:bg-red-100 transition-colors text-left"
                >
                  <span className="block">{t('dissociation.no')}</span>
                  <span className="block text-xs opacity-80 mt-0.5">{t('dissociation.noEn')}</span>
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4">{t('dissociation.cannotSkip')}</p>
            </div>

            {/* Not sure — offer grounding */}
            {dissociationAnswer === 'not-sure' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-6">
                <p className="text-amber-800 mb-4">{t('dissociation.notSureGuidance')}</p>
                <div className="flex gap-3">
                  <button
                    onClick={handleStopToGrounding}
                    className="flex-1 py-2 px-4 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors"
                  >
                    {t('dissociation.goToGrounding')}
                  </button>
                  <button
                    onClick={handleProceedToSafety}
                    className="flex-1 py-2 px-4 rounded-lg bg-white border border-amber-300 text-amber-800 font-semibold hover:bg-amber-50 transition-colors"
                  >
                    {t('dissociation.continueAnyway')}
                  </button>
                </div>
              </motion.div>
            )}

            {/* No — redirect to grounding */}
            {dissociationAnswer === 'no' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 rounded-xl p-6 border border-red-200">
                <p className="text-red-800 mb-4">{t('dissociation.noGuidance')}</p>
                <button
                  onClick={handleStopToGrounding}
                  className="w-full py-3 px-6 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
                >
                  {t('dissociation.goToGrounding')}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ────────── SAFETY ────────── */}
        {phase === 'safety' && (
          <motion.div key="safety" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <MedicalDisclaimer />

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('safety.title')}
              </h2>

              <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
                <p className="text-sm text-amber-800">{t('safety.contraindication')}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{t('safety.youControlTitle')}</h3>
                  <p className="text-sm text-gray-600">{t('safety.youControlDescription')}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{t('safety.notTherapyTitle')}</h3>
                  <p className="text-sm text-gray-600">{t('safety.notTherapyDescription')}</p>
                </div>
              </div>

              <button
                onClick={handleProceedToPreparation}
                className="w-full py-3 px-6 rounded-lg bg-[#1F6F78] text-white font-semibold hover:bg-[#17595f] transition-colors"
              >
                {t('safety.proceedButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ────────── PREPARATION ────────── */}
        {phase === 'preparation' && (
          <motion.div key="preparation" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('preparation.title')}
              </h2>

              {/* Step 1: Identify the issue */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('preparation.issueLabel')}
                </label>
                <textarea
                  value={issue}
                  onChange={e => setIssue(e.target.value)}
                  placeholder={isAr ? t('preparation.issuePlaceholder') : t('preparation.issuePlaceholderEn')}
                  className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 resize-none focus:ring-2 focus:ring-[#1F6F78] focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Step 2: Rate intensity */}
              <div className="mb-6">
                <SUDSScale
                  value={sudsBefore}
                  onChange={setSudsBefore}
                  label={t('preparation.sudsLabel')}
                />
              </div>

              
              {/* EFT Tapping Points Diagram */}
              <div className="my-6 rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <div className="bg-[#1F6F78]/5 px-5 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-[#1F6F78]">
                    {t('preparation.pointsDiagramCaption', { defaultValue: 'نقاط التربيت في تقنية الحرية النفسية (EFT)' })}
                  </p>
                </div>
                <div className="p-4 flex justify-center">
                  <Image
                    src="/images/trc/eft-tapping-points.jpg"
                    alt={t('preparation.pointsDiagramAlt', { defaultValue: 'رسم توضيحي لنقاط التربيت التسع على الوجه والجسم والكف' })}
                    width={500}
                    height={650}
                    className="rounded-xl max-w-full h-auto"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-4">{t('preparation.sudsNote')}</p>

              <button
                onClick={handleProceedToSetupPhrase}
                disabled={!issue.trim() || sudsBefore === null}
                className="w-full py-3 px-6 rounded-lg bg-[#1F6F78] text-white font-semibold hover:bg-[#17595f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('preparation.nextButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ────────── SETUP PHRASE ────────── */}
        {phase === 'setup-phrase' && (
          <motion.div key="setup-phrase" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('setup.title')}
              </h2>

              <p className="text-sm text-gray-600 mb-4">{t('setup.description')}</p>

              {/* Setup phrase display */}
              <div className="mb-4 p-4 rounded-lg bg-[#1F6F78]/5 border border-[#1F6F78]/20">
                <p className="text-sm font-medium text-[#1F6F78] mb-2">{t('setup.phraseLabel')}</p>
                <p className="text-base text-gray-800 leading-relaxed mb-2" dir="rtl">
                  {setupPhraseAr.replace('[\u0627\u0644\u0645\u0634\u0643\u0644\u0629]', issue)}
                </p>
                <p className="text-sm text-gray-600" dir="ltr">
                  {setupPhraseEn}
                </p>
              </div>

              {/* Karate chop instruction */}
              <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
                <h3 className="font-semibold text-amber-800 mb-2">{t('setup.karateChopTitle')}</h3>
                <p className="text-sm text-amber-700">{t('setup.karateChopInstruction')}</p>
              </div>

              <button
                onClick={handleProceedToTapping}
                className="w-full py-3 px-6 rounded-lg bg-[#1F6F78] text-white font-semibold hover:bg-[#17595f] transition-colors"
              >
                {t('setup.startTappingButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ────────── TAPPING SEQUENCE ────────── */}
        {phase === 'tapping-sequence' && (
          <motion.div key="tapping-sequence" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              {/* Round indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  {t('tapping.roundLabel', { current: currentRound, max: MAX_ROUNDS })}
                </span>
                <span className="text-sm text-gray-500">
                  {t('tapping.pointLabel', { current: currentPointIndex + 1, total: TAPPING_POINTS.length })}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                <div
                  className="bg-[#1F6F78] h-2 rounded-full transition-all"
                  style={{ width: `${((currentPointIndex + 1) / TAPPING_POINTS.length) * 100}%` }}
                />
              </div>

              {/* Current point */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#1F6F78]/10 flex items-center justify-center mb-3">
                  <span className="text-3xl font-bold text-[#1F6F78]">{currentPoint.code}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {isAr ? currentPoint.nameAr : currentPoint.nameEn}
                </h3>
                <p className="text-sm text-gray-500">
                  {isAr ? currentPoint.nameEn : currentPoint.nameAr}
                </p>
              </div>

              {/* Tapping instruction */}
              <div className="mb-6 p-4 rounded-lg bg-[#1F6F78]/5 border border-[#1F6F78]/20">
                <p className="text-sm text-gray-700 mb-2">
                  {t('tapping.instruction')}
                </p>
                <p className="text-base font-medium text-gray-800 italic">
                  &ldquo;{reminderPhrase}&rdquo;
                </p>
              </div>

              {/* All points overview */}
              <div className="mb-6">
                <p className="text-xs text-gray-400 mb-2">{t('tapping.allPointsLabel')}</p>
                <div className="flex flex-wrap gap-1">
                  {TAPPING_POINTS.map((point, idx) => (
                    <span
                      key={point.code}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        idx === currentPointIndex
                          ? 'bg-[#1F6F78] text-white'
                          : idx < currentPointIndex
                          ? 'bg-[#1F6F78]/20 text-[#1F6F78]'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {point.code}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNextPoint}
                className="w-full py-3 px-6 rounded-lg bg-[#1F6F78] text-white font-semibold hover:bg-[#17595f] transition-colors"
              >
                {currentPointIndex < TAPPING_POINTS.length - 1
                  ? t('tapping.nextPointButton')
                  : t('tapping.roundCompleteButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ────────── REASSESSMENT ────────── */}
        {phase === 'reassessment' && (
          <motion.div key="reassessment" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('reassessment.title')}
              </h2>

              <p className="text-sm text-gray-600 mb-4">{t('reassessment.description')}</p>

              <SUDSScale
                value={sudsAfter}
                onChange={setSudsAfter}
                label={t('reassessment.sudsLabel')}
              />

              {sudsAfter !== null && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{t('reassessment.before')}</span>
                    <span className="font-semibold text-gray-800">{sudsBefore}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-500">{t('reassessment.after')}</span>
                    <span className="font-semibold text-gray-800">{sudsAfter}</span>
                  </div>
                  {sudsAfter > (sudsBefore ?? 0) && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{t('reassessment.increasedWarning')}</p>
                  )}
                  {sudsAfter <= (sudsBefore ?? 0) && (
                    <p className="mt-2 text-sm text-green-600 font-medium">{t('reassessment.decreasedNote')}</p>
                  )}
                </motion.div>
              )}

              <button
                onClick={handleReassessmentComplete}
                disabled={sudsAfter === null}
                className="w-full mt-6 py-3 px-6 rounded-lg bg-[#1F6F78] text-white font-semibold hover:bg-[#17595f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('reassessment.continueButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ────────── GROUNDING RESET ────────── */}
        {phase === 'grounding-reset' && (
          <motion.div key="grounding-reset" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('groundingReset.title')}
              </h2>

              <p className="text-sm text-gray-600 mb-6">{t('groundingReset.description')}</p>

              {/* Brief 5-4-3-2-1 (3 senses only) */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-lg bg-[#1F6F78]/5 border border-[#1F6F78]/20">
                  <h3 className="font-semibold text-[#1F6F78] mb-2">{t('groundingReset.sightTitle')}</h3>
                  <p className="text-sm text-gray-600">{t('groundingReset.sightInstruction')}</p>
                </div>
                <div className="p-4 rounded-lg bg-[#1F6F78]/5 border border-[#1F6F78]/20">
                  <h3 className="font-semibold text-[#1F6F78] mb-2">{t('groundingReset.touchTitle')}</h3>
                  <p className="text-sm text-gray-600">{t('groundingReset.touchInstruction')}</p>
                </div>
                <div className="p-4 rounded-lg bg-[#1F6F78]/5 border border-[#1F6F78]/20">
                  <h3 className="font-semibold text-[#1F6F78] mb-2">{t('groundingReset.soundTitle')}</h3>
                  <p className="text-sm text-gray-600">{t('groundingReset.soundInstruction')}</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-4">{t('groundingReset.note')}</p>

              <button
                onClick={handleGroundingComplete}
                className="w-full py-3 px-6 rounded-lg bg-[#1F6F78] text-white font-semibold hover:bg-[#17595f] transition-colors"
              >
                {t('groundingReset.completeButton')}
              </button>
            </div>
          </motion.div>
        )}

        {/* ────────── COMPLETION ────────── */}
        {phase === 'completion' && (
          <motion.div key="completion" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {t('completion.title')}
              </h2>

              {/* Summary */}
              <div className="mb-4 p-4 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">
                  {t('completion.workedOnLabel')} <span className="font-semibold text-gray-800">{issue}</span>
                </p>
                <p className="text-sm text-gray-600">
                  {t('completion.intensityLabel')} <span className="font-semibold text-gray-800">{sudsBefore}</span> → <span className="font-semibold text-gray-800">{sudsAfter}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {t('completion.roundsLabel')} <span className="font-semibold text-gray-800">{currentRound}</span>
                </p>
              </div>

              <p className="text-sm text-gray-600 mb-4">{t('completion.rememberNote')}</p>

              <p className="text-xs text-gray-400 mb-6">{t('completion.savedLocally')}</p>
            </div>

            {/* Next Step */}
            <div className="mt-6">
              <EnhancedSuggestedNextStep program="trc" currentStepId="eft-tapping" />
            </div>

            {/* Back to hub */}
            <div className="mt-4 text-center">
              <button
                onClick={() => router.push('/recovery/trc')}
                className="text-sm text-[#1F6F78] underline hover:no-underline"
              >
                {t('completion.backToHub')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Another round dialog */}
      <DistressCheckIn
        type="comfort"
        visible={showDistressCheck}
        questionAr={isAr ? t('reassessment.anotherRoundQuestion') : ''}
        questionEn={t('reassessment.anotherRoundQuestionEn') || t('reassessment.anotherRoundQuestion')}
        subtitleAr={isAr ? t('reassessment.anotherRoundSubtitle') : ''}
        subtitleEn={t('reassessment.anotherRoundSubtitleEn') || t('reassessment.anotherRoundSubtitle')}
        onContinue={handleAnotherRound}
        onPause={handleNoMoreRounds}
        onStop={handleNoMoreRounds}
        onGrounding={() => { setShowDistressCheck(false); router.push('/recovery/trc/grounding'); }}
      />

      <TherapeuticExit fallbackHref="/recovery/trc" className="!bottom-20" />
    </div>
  );
}

