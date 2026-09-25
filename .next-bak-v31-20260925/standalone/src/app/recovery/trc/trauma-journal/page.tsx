'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
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
import { PenLine, Clock, Pause, ShieldCheck, ChevronLeft, ChevronRight, Heart, Eye, Trash2, AlertTriangle } from 'lucide-react';

// ──────────────────────────────────────────────────────────────
// Phase type
// ──────────────────────────────────────────────────────────────
type Phase =
  | 'entry'
  | 'safety'
  | 'promptSelection'
  | 'writing'
  | 'safetyCheck'
  | 'closingRitual'
  | 'completion';

// ──────────────────────────────────────────────────────────────
// Prompt type
// ──────────────────────────────────────────────────────────────
type PromptId = 'checkin' | 'reflection' | 'observation' | 'safe-moment' | 'remember' | 'free';

// ──────────────────────────────────────────────────────────────
// Local storage helpers
// ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'tamkinly_trc_trauma_journal_entries';
const AUTOSAVE_KEY = 'tamkinly_trc_trauma_journal_autosave';

interface JournalEntry {
  date: string;
  prompt: PromptId;
  content: string;
  duration: number; // seconds
}

function loadEntries(): JournalEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: JournalEntry[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Silently fail
  }
}

function loadAutosave(): { prompt: PromptId; content: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveAutosave(data: { prompt: PromptId; content: string }) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data));
  } catch {}
}

function clearAutosave() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AUTOSAVE_KEY);
  } catch {}
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
export default function TraumaJournalPage() {
  const router = useRouter();
  const { locale, direction } = useLocale();
  const t = useTranslations('recoveryAssets.trcTraumaJournal');
  const { markStepStarted, markStepCompleted } = useTrcState();

  const isAr = locale === 'ar';

  // Phase state
  const [phase, setPhase] = useState<Phase>('entry');

  // Writing state
  const [selectedPrompt, setSelectedPrompt] = useState<PromptId | null>(null);
  const [content, setContent] = useState('');
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Safety check state
  const [showDistressCheck, setShowDistressCheck] = useState(false);
  const [distressCheckShown, setDistressCheckShown] = useState(false);
  const [distressResponse, setDistressResponse] = useState<'better' | 'activated' | 'grounding' | null>(null);

  // Closing ritual state
  const [breathingDone, setBreathingDone] = useState(false);
  const [orientDone, setOrientDone] = useState(false);
  const [nextActivity, setNextActivity] = useState('');

  // Previous entries
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Auto-save timer
  const autosaveTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Track journey state on mount
  useEffect(() => {
    markStepStarted('trauma-journal');
    setEntries(loadEntries());

    // Check for autosaved content
    const autosaved = loadAutosave();
    if (autosaved) {
      setSelectedPrompt(autosaved.prompt);
      setContent(autosaved.content);
    }
  }, [markStepStarted]);

  // Start timers when writing phase begins
  useEffect(() => {
    if (phase === 'writing' && !isPaused) {
      if (startTime === 0) {
        setStartTime(Date.now());
      }

      // Elapsed timer
      elapsedTimerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);

      // Auto-save every 30 seconds
      autosaveTimerRef.current = setInterval(() => {
        if (selectedPrompt && content) {
          saveAutosave({ prompt: selectedPrompt, content });
        }
      }, 30000);

      return () => {
        if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
        if (autosaveTimerRef.current) clearInterval(autosaveTimerRef.current);
      };
    } else {
      if (elapsedTimerRef.current) clearInterval(elapsedTimerRef.current);
      if (autosaveTimerRef.current) clearInterval(autosaveTimerRef.current);
    }
  }, [phase, isPaused, startTime, selectedPrompt, content]);

  // Safety check after 5 minutes of writing
  useEffect(() => {
    if (phase === 'writing' && elapsedSeconds >= 300 && !distressCheckShown) {
      setShowDistressCheck(true);
      setDistressCheckShown(true);
    }
  }, [phase, elapsedSeconds, distressCheckShown]);

  // ── Handlers ──
  const handleStart = useCallback(() => {
    setPhase('safety');
  }, []);

  const handleProceedToPrompts = useCallback(() => {
    setPhase('promptSelection');
  }, []);

  const handleSelectPrompt = useCallback((promptId: PromptId) => {
    setSelectedPrompt(promptId);
    setPhase('writing');
  }, []);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const handlePause = useCallback(() => {
    setIsPaused(true);
    // Save on pause
    if (selectedPrompt && content) {
      saveAutosave({ prompt: selectedPrompt, content });
    }
  }, [selectedPrompt, content]);

  const handleResume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleNeedToStop = useCallback(() => {
    // Save whatever they have
    if (selectedPrompt && content.trim()) {
      const entry: JournalEntry = {
        date: new Date().toISOString(),
        prompt: selectedPrompt,
        content,
        duration: elapsedSeconds,
      };
      const updated = [...entries, entry];
      saveEntries(updated);
      setEntries(updated);
    }
    clearAutosave();
    setPhase('safetyCheck');
  }, [selectedPrompt, content, elapsedSeconds, entries]);

  const handleDoneWriting = useCallback(() => {
    // Save the entry
    if (selectedPrompt && content.trim()) {
      const entry: JournalEntry = {
        date: new Date().toISOString(),
        prompt: selectedPrompt,
        content,
        duration: elapsedSeconds,
      };
      const updated = [...entries, entry];
      saveEntries(updated);
      setEntries(updated);
    }
    clearAutosave();
    setPhase('safetyCheck');
  }, [selectedPrompt, content, elapsedSeconds, entries]);

  const handleDistressBetter = useCallback(() => {
    setDistressResponse('better');
    setShowDistressCheck(false);
    setPhase('closingRitual');
  }, []);

  const handleDistressActivated = useCallback(() => {
    setDistressResponse('activated');
    setShowDistressCheck(false);
    setPhase('closingRitual');
  }, []);

  const handleDistressGrounding = useCallback(() => {
    // Save first
    if (selectedPrompt && content.trim()) {
      const entry: JournalEntry = {
        date: new Date().toISOString(),
        prompt: selectedPrompt,
        content,
        duration: elapsedSeconds,
      };
      const updated = [...entries, entry];
      saveEntries(updated);
    }
    clearAutosave();
    router.push('/recovery/trc/grounding');
  }, [selectedPrompt, content, elapsedSeconds, entries, router]);

  const handleDistressDismiss = useCallback(() => {
    setShowDistressCheck(false);
  }, []);

  const handleBreathingDone = useCallback(() => {
    setBreathingDone(true);
  }, []);

  const handleOrientDone = useCallback(() => {
    setOrientDone(true);
  }, []);

  const handleCompleteRitual = useCallback(() => {
    setPhase('completion');
    markStepCompleted('trauma-journal');
    try {
      localStorage.setItem('tamkinly_trc_trauma_journal_done', 'true');
    } catch {}
  }, [markStepCompleted]);

  const handleDeleteEntry = useCallback((index: number) => {
    const updated = entries.filter((_, i) => i !== index);
    saveEntries(updated);
    setEntries(updated);
  }, [entries]);

  const handleGroundingRedirect = useCallback(() => {
    if (selectedPrompt && content.trim()) {
      saveAutosave({ prompt: selectedPrompt, content });
    }
    router.push('/recovery/trc/grounding');
  }, [selectedPrompt, content, router]);

  // ── Helper: format elapsed time ──
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // ── Helper: word count ──
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  // ── Helper: prompt labels ──
  const getPromptLabel = (promptId: PromptId): string => {
    const key = `prompts.${promptId}.title`;
    try { return t(key); } catch { return promptId; }
  };

  const getPromptGuidance = (promptId: PromptId): string => {
    const key = `prompts.${promptId}.guidance`;
    try { return t(key); } catch { return ''; }
  };

  const getPromptDoNot = (promptId: PromptId): string => {
    const key = `prompts.${promptId}.doNot`;
    try { return t(key); } catch { return ''; }
  };

  const showBreadcrumb = phase === 'entry' || phase === 'safety' || phase === 'completion';

  // Prompt IDs for iteration
  const PROMPT_IDS: PromptId[] = ['checkin', 'reflection', 'observation', 'safe-moment', 'remember', 'free'];

  // ── Prompt icons/emojis ──
  const promptEmojis: Record<PromptId, string> = {
    'checkin': '💭',
    'reflection': '🔄',
    'observation': '👁',
    'safe-moment': '🛡',
    'remember': '📝',
    'free': '✍',
  };

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

      {/* Medical Disclaimer */}
      {phase === 'entry' && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <MedicalDisclaimer />
        </div>
      )}

      {/* Safety Response */}
      <SafetyResponse program="trc" assetId="trauma-journal" />

      {/* Distress Check-In (5-minute mark) */}
      <DistressCheckIn
        type="comfort"
        visible={showDistressCheck}
        questionAr={t('safetyCheck.question')}
        questionEn={t('safetyCheck.questionEn')}
        subtitleAr={t('safetyCheck.subtitle')}
        subtitleEn={t('safetyCheck.subtitleEn')}
        onContinue={handleDistressDismiss}
        onPause={handleDistressDismiss}
        onStop={handleNeedToStop}
        onGrounding={handleDistressGrounding}
      />

      {/* Grounding always visible link */}
      {phase !== 'entry' && phase !== 'completion' && (
        <div className="fixed bottom-4 left-4 z-40">
          <button
            onClick={handleGroundingRedirect}
            className="flex items-center gap-2 px-3 py-2 bg-[#1F6F78] text-white rounded-lg shadow-lg text-sm hover:bg-[#1a5e66] transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            {isAr ? 'العودة للتأريض' : 'Return to Grounding'}
          </button>
        </div>
      )}

      {/* Main content */}
      <AnimatePresence mode="wait">
        {/* ── ENTRY PHASE ── */}
        {phase === 'entry' && (
          <motion.div key="entry" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#1F6F78]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PenLine className="w-8 h-8 text-[#1F6F78]" />
              </div>
              <h1 className="text-3xl font-bold text-[#1A3C34] mb-3">{t('entry.title')}</h1>
              <p className="text-lg text-[#4A7C7C] mb-6">{t('entry.description')}</p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-amber-800 text-sm">{t('entry.disclaimer')}</p>
              </div>
            </div>

            {/* What is this tool */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-[#1A3C34] mb-3">{t('entry.whatIsTitle')}</h2>
              <p className="text-[#4A7C7C] mb-4">{t('entry.whatIsDescription')}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="px-3 py-1 bg-[#1F6F78]/10 text-[#1F6F78] rounded-full">{t('entry.duration')}</span>
                <span className="px-3 py-1 bg-[#3DD4B0]/10 text-[#1A3C34] rounded-full">{t('entry.level')}</span>
              </div>
            </div>

            {/* Previous entries */}
            {entries.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="text-md font-semibold text-[#1A3C34] mb-3">{t('entry.previousEntries')}</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {entries.slice(-5).reverse().map((entry, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm text-[#4A7C7C] bg-[#F5F9F8] rounded-lg px-3 py-2">
                      <span>{new Date(entry.date).toLocaleDateString(isAr ? 'ar-SA' : 'en-US')} — {getPromptLabel(entry.prompt)}</span>
                      <button
                        onClick={() => handleDeleteEntry(entries.length - 1 - idx)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        aria-label={isAr ? 'حذف' : 'Delete'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleStart}
              className="w-full py-4 bg-[#1F6F78] text-white rounded-xl text-lg font-semibold hover:bg-[#1a5e66] transition-colors shadow-md"
            >
              {t('entry.startButton')}
            </button>
          </motion.div>
        )}

        {/* ── SAFETY PHASE ── */}
        {phase === 'safety' && (
          <motion.div key="safety" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-[#1A3C34] mb-6">{t('safety.title')}</h2>

            {/* Safety guidelines */}
            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-[#3DD4B0]">
                <div className="flex items-start gap-3">
                  <span className="text-[#3DD4B0] text-xl">✓</span>
                  <p className="text-[#1A3C34]">{t('safety.guideline1')}</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-[#3DD4B0]">
                <div className="flex items-start gap-3">
                  <span className="text-[#3DD4B0] text-xl">✓</span>
                  <p className="text-[#1A3C34]">{t('safety.guideline2')}</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-amber-400">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-[#1A3C34] font-medium">{t('safety.guideline3')}</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-[#3DD4B0]">
                <div className="flex items-start gap-3">
                  <span className="text-[#3DD4B0] text-xl">✓</span>
                  <p className="text-[#1A3C34]">{t('safety.guideline4')}</p>
                </div>
              </div>
              <div className="bg-red-50 rounded-2xl p-5 shadow-sm border-l-4 border-red-400">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-red-800">{t('safety.guideline5')}</p>
                </div>
              </div>
            </div>

            {/* Key messages */}
            <div className="bg-[#1F6F78]/5 rounded-2xl p-6 mb-8">
              <h3 className="font-semibold text-[#1A3C34] mb-2">{t('safety.youControlTitle')}</h3>
              <p className="text-[#4A7C7C] text-sm mb-4">{t('safety.youControlDescription')}</p>
              <h3 className="font-semibold text-[#1A3C34] mb-2">{t('safety.notTherapyTitle')}</h3>
              <p className="text-[#4A7C7C] text-sm">{t('safety.notTherapyDescription')}</p>
            </div>

            {/* Contraindication */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-amber-800 text-sm">{t('safety.contraindication')}</p>
            </div>

            <button
              onClick={handleProceedToPrompts}
              className="w-full py-4 bg-[#1F6F78] text-white rounded-xl text-lg font-semibold hover:bg-[#1a5e66] transition-colors shadow-md"
            >
              {t('safety.proceedButton')}
            </button>
          </motion.div>
        )}

        {/* ── PROMPT SELECTION PHASE ── */}
        {phase === 'promptSelection' && (
          <motion.div key="promptSelection" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-[#1A3C34] mb-2">{t('promptSelection.title')}</h2>
            <p className="text-[#4A7C7C] mb-6">{t('promptSelection.subtitle')}</p>

            <div className="space-y-4 mb-8">
              {PROMPT_IDS.map((promptId) => (
                <button
                  key={promptId}
                  onClick={() => handleSelectPrompt(promptId)}
                  className="w-full text-left bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#3DD4B0]/30 group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{promptEmojis[promptId]}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1A3C34] group-hover:text-[#1F6F78] transition-colors mb-1">
                        {getPromptLabel(promptId)}
                      </h3>
                      <p className="text-sm text-[#4A7C7C]">{getPromptGuidance(promptId)}</p>
                      {getPromptDoNot(promptId) && (
                        <p className="text-xs text-amber-600 mt-1">{getPromptDoNot(promptId)}</p>
                      )}
                    </div>
                    <ChevronRight className={`w-5 h-5 text-[#4A7C7C] mt-1 shrink-0 ${isAr ? 'rotate-180' : ''}`} />
                  </div>
                </button>
              ))}
            </div>

            {/* I need to stop */}
            <button
              onClick={() => router.push('/recovery/trc')}
              className="w-full py-3 text-[#4A7C7C] rounded-xl text-sm hover:bg-[#1A3C34]/5 transition-colors"
            >
              {t('promptSelection.needToStop')}
            </button>
          </motion.div>
        )}

        {/* ── WRITING PHASE ── */}
        {phase === 'writing' && (
          <motion.div key="writing" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-2xl">
            {/* Prompt display */}
            {selectedPrompt && (
              <div className="bg-[#1F6F78]/5 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{promptEmojis[selectedPrompt]}</span>
                  <h3 className="font-semibold text-[#1A3C34]">{getPromptLabel(selectedPrompt)}</h3>
                </div>
                <p className="text-sm text-[#4A7C7C]">{getPromptGuidance(selectedPrompt)}</p>
              </div>
            )}

            {/* Writing toolbar */}
            <div className="flex items-center justify-between bg-white rounded-xl px-4 py-2 shadow-sm mb-3 text-sm text-[#4A7C7C]">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4" />
                <span>{formatTime(elapsedSeconds)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{wordCount}</span>
                <span className="text-xs">{t('writing.words')}</span>
              </div>
              {!isPaused ? (
                <button onClick={handlePause} className="flex items-center gap-1 text-[#1F6F78] hover:text-[#1a5e66]">
                  <Pause className="w-4 h-4" />
                  <span className="text-xs">{t('writing.pause')}</span>
                </button>
              ) : (
                <button onClick={handleResume} className="flex items-center gap-1 text-[#3DD4B0]">
                  <span className="text-xs font-medium">{t('writing.resume')}</span>
                </button>
              )}
            </div>

            {/* Pause overlay */}
            {isPaused && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-3 text-center">
                <p className="text-amber-800 mb-2">{t('writing.pausedMessage')}</p>
                <p className="text-amber-700 text-sm mb-4">{t('writing.pausedGuidance')}</p>
                <button
                  onClick={handleResume}
                  className="px-6 py-2 bg-[#1F6F78] text-white rounded-lg text-sm hover:bg-[#1a5e66] transition-colors"
                >
                  {t('writing.resume')}
                </button>
              </div>
            )}

            {/* Text area */}
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder={selectedPrompt ? t(`prompts.${selectedPrompt}.placeholder`) : ''}
              disabled={isPaused}
              className="w-full h-64 bg-white rounded-2xl p-5 shadow-sm border border-[#1F6F78]/10 text-[#1A3C34] placeholder-[#4A7C7C]/50 resize-y focus:outline-none focus:border-[#3DD4B0]/50 focus:ring-2 focus:ring-[#3DD4B0]/20 transition-all disabled:opacity-60"
              dir={direction}
            />

            {/* Action buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleDoneWriting}
                className="flex-1 py-3 bg-[#1F6F78] text-white rounded-xl font-semibold hover:bg-[#1a5e66] transition-colors shadow-sm"
              >
                {t('writing.doneButton')}
              </button>
              <button
                onClick={handleNeedToStop}
                className="px-6 py-3 bg-red-50 text-red-700 rounded-xl font-medium hover:bg-red-100 transition-colors border border-red-200"
              >
                {t('writing.stopButton')}
              </button>
            </div>

            {/* I need to stop is ALWAYS visible */}
            <div className="mt-3 text-center">
              <p className="text-xs text-[#4A7C7C]">{t('writing.stopReminder')}</p>
            </div>
          </motion.div>
        )}

        {/* ── SAFETY CHECK PHASE ── */}
        {phase === 'safetyCheck' && (
          <motion.div key="safetyCheck" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#3DD4B0]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#3DD4B0]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A3C34] mb-3">{t('safetyCheck.title')}</h2>
              <p className="text-[#4A7C7C]">{t('safetyCheck.subtitle2')}</p>
            </div>

            <div className="space-y-4 mb-8">
              <button
                onClick={handleDistressBetter}
                className="w-full text-left bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#3DD4B0]/30"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">😌</span>
                  <span className="font-medium text-[#1A3C34]">{t('safetyCheck.better')}</span>
                </div>
              </button>
              <button
                onClick={handleDistressActivated}
                className="w-full text-left bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-amber-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚡</span>
                  <span className="font-medium text-[#1A3C34]">{t('safetyCheck.activated')}</span>
                </div>
              </button>
              <button
                onClick={handleDistressGrounding}
                className="w-full text-left bg-red-50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-red-200 hover:border-red-400"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-red-500" />
                  <span className="font-medium text-red-700">{t('safetyCheck.needGrounding')}</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* ── CLOSING RITUAL PHASE ── */}
        {phase === 'closingRitual' && (
          <motion.div key="closingRitual" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-[#1A3C34] mb-2">{t('closingRitual.title')}</h2>
            <p className="text-[#4A7C7C] mb-6">{t('closingRitual.subtitle')}</p>

            {/* Step 1: Breathing */}
            <div className={`bg-white rounded-2xl p-5 shadow-sm mb-4 ${breathingDone ? 'opacity-60' : ''}`}>
              <div className="flex items-start gap-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm shrink-0 ${breathingDone ? 'bg-[#3DD4B0]' : 'bg-[#1F6F78]'}`}>
                  {breathingDone ? '✓' : '1'}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1A3C34] mb-1">{t('closingRitual.breathTitle')}</h3>
                  <p className="text-sm text-[#4A7C7C] mb-3">{t('closingRitual.breathDescription')}</p>
                  {!breathingDone && (
                    <button
                      onClick={handleBreathingDone}
                      className="px-4 py-2 bg-[#1F6F78] text-white rounded-lg text-sm hover:bg-[#1a5e66] transition-colors"
                    >
                      {t('closingRitual.breathDone')}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Orient to present */}
            <div className={`bg-white rounded-2xl p-5 shadow-sm mb-4 ${!breathingDone ? 'opacity-40' : orientDone ? 'opacity-60' : ''}`}>
              <div className="flex items-start gap-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm shrink-0 ${orientDone ? 'bg-[#3DD4B0]' : breathingDone ? 'bg-[#1F6F78]' : 'bg-gray-300'}`}>
                  {orientDone ? '✓' : '2'}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1A3C34] mb-1">{t('closingRitual.orientTitle')}</h3>
                  <p className="text-sm text-[#4A7C7C] mb-3">{t('closingRitual.orientDescription')}</p>
                  {breathingDone && !orientDone && (
                    <button
                      onClick={handleOrientDone}
                      className="px-4 py-2 bg-[#1F6F78] text-white rounded-lg text-sm hover:bg-[#1a5e66] transition-colors"
                    >
                      {t('closingRitual.orientDone')}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3: Transition */}
            <div className={`bg-white rounded-2xl p-5 shadow-sm mb-6 ${!orientDone ? 'opacity-40' : ''}`}>
              <div className="flex items-start gap-3">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm shrink-0 ${nextActivity ? 'bg-[#3DD4B0]' : orientDone ? 'bg-[#1F6F78]' : 'bg-gray-300'}`}>
                  {nextActivity ? '✓' : '3'}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1A3C34] mb-1">{t('closingRitual.transitionTitle')}</h3>
                  <p className="text-sm text-[#4A7C7C] mb-3">{t('closingRitual.transitionDescription')}</p>
                  {orientDone && (
                    <input
                      type="text"
                      value={nextActivity}
                      onChange={(e) => setNextActivity(e.target.value)}
                      placeholder={t('closingRitual.transitionPlaceholder')}
                      className="w-full px-3 py-2 bg-[#F5F9F8] rounded-lg border border-[#1F6F78]/10 text-[#1A3C34] placeholder-[#4A7C7C]/50 text-sm focus:outline-none focus:border-[#3DD4B0]/50"
                      dir={direction}
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleCompleteRitual}
              disabled={!breathingDone || !orientDone}
              className="w-full py-4 bg-[#1F6F78] text-white rounded-xl text-lg font-semibold hover:bg-[#1a5e66] transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {t('closingRitual.completeButton')}
            </button>
          </motion.div>
        )}

        {/* ── COMPLETION PHASE ── */}
        {phase === 'completion' && (
          <motion.div key="completion" {...fadeIn} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#3DD4B0]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#3DD4B0]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A3C34] mb-3">{t('completion.title')}</h2>
              <p className="text-[#4A7C7C] mb-2">
                {t('completion.wroteFor').replace('{minutes}', String(Math.floor(elapsedSeconds / 60)))}
              </p>
              <p className="text-[#4A7C7C] mb-6">{t('completion.saved')}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <p className="text-[#1A3C34] mb-2">{t('completion.keyMessage')}</p>
              <p className="text-sm text-[#4A7C7C]">{t('completion.savedLocally')}</p>
            </div>

            {nextActivity && (
              <div className="bg-[#3DD4B0]/5 rounded-2xl p-4 mb-6 text-center">
                <p className="text-sm text-[#1A3C34]">
                  {t('completion.nextActivityLabel')}: <strong>{nextActivity}</strong>
                </p>
              </div>
            )}

            <EnhancedSuggestedNextStep program="trc" currentStepId="trauma-journal" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TherapeuticExit */}
      <TherapeuticExit fallbackHref="/recovery/trc" className="!bottom-20" />
    </div>
  );
}
