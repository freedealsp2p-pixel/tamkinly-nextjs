'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb, MedicalDisclaimer } from '@/components/recovery/system';
import { TherapeuticShell } from '@/components/therapeutic';
import {
  TRUNCATED_SENTENCE_META,
  AUDIO_TRACKS,
  PHYSICAL_STEPS,
  SYMBOL_LABEL,
  SYMBOL_HINT,
  TIMER_COPY,
  JOURNAL_PHASES,
  JOURNAL_DAILY_TASKS,
  JOURNAL_CLOSING_MESSAGE,
  JOURNAL_COPY,
  SCREENS_COPY,
  type Bilingual,
} from '@/lib/therapeutic-protocols/truncated-sentence';

// ============================================
// CONSTANTS & PERSISTENCE KEYS
// ============================================

const SLUG = 'truncated-sentence';
const KEY_STATE = `tsq_state_v1`; // { phase, sentence }
const KEY_RITUAL = `tsq_ritual_v1`; // { startedAt, reminderEmail, reminderSet }
const KEY_JOURNAL = `tsq_journal_v1`; // { entries: { [day]: { text, savedAt } } }

const DAY_MS = 24 * 60 * 60 * 1000;
const RITUAL_MS = 72 * 60 * 60 * 1000; // 72 hours

type Phase = 'welcome' | 'confront' | 'truncated' | 'taping' | 'physical' | 'timer';
type View = 'exercise' | 'journal';

interface SavedState {
  phase: Phase;
  sentence: string;
}
interface SavedRitual {
  startedAt: number;
  reminderEmail?: string;
  reminderSet?: boolean;
}
interface SavedJournal {
  entries: Record<string, { text: string; savedAt: number }>;
}

function loadJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function saveJSON(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — experience still works in-memory
  }
}

function clearAll() {
  try {
    window.localStorage.removeItem(KEY_STATE);
    window.localStorage.removeItem(KEY_RITUAL);
    window.localStorage.removeItem(KEY_JOURNAL);
  } catch {
    // noop
  }
}

// ============================================
// SMALL HELPERS
// ============================================

function pick(text: Bilingual, isAr: boolean): string {
  return isAr ? text.ar : text.en;
}

function formatClock(ms: number): { d: string; h: string; m: string; s: string } {
  const total = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return { d: String(d), h: pad(h), m: pad(m), s: pad(s) };
}

function formatMsShort(ms: number, isAr: boolean): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (isAr) return `${h} ساعة و${m} دقيقة`;
  return `${h}h ${m}m`;
}

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// ============================================
// AUDIO TRACK PLAYER
// ============================================

interface TrackPlayerProps {
  src: string;
  title: string;
  durationLabel: string;
  description: string;
  locked: boolean;
  lockNote: string;
  unavailableNote: string;
  isAr: boolean;
  direction: 'rtl' | 'ltr';
}

function TrackPlayer({
  src,
  title,
  durationLabel,
  description,
  locked,
  lockNote,
  unavailableNote,
  isAr,
  direction,
}: TrackPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [unavailable, setUnavailable] = useState(false);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => setUnavailable(true));
    }
  }, [playing]);

  const onSeek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = value * duration;
    setProgress(value);
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h4 className="text-sm sm:text-base font-semibold text-[#0F1C2E]">{title}</h4>
          <p className="text-xs text-[#0F1C2E]/50 mt-0.5 leading-relaxed">{description}</p>
        </div>
        <span className="flex-shrink-0 text-xs px-2 py-1 rounded-full bg-[#0F1C2E]/5 text-[#0F1C2E]/50 font-medium">
          {durationLabel}
        </span>
      </div>

      {locked ? (
        <div className="flex items-center gap-2 rounded-xl bg-[#0F1C2E]/[0.03] px-4 py-3">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0F1C2E]/40 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <span className="text-xs text-[#0F1C2E]/50">{lockNote}</span>
        </div>
      ) : unavailable ? (
        <div className="rounded-xl bg-[#0F1C2E]/[0.03] px-4 py-3">
          <span className="text-xs text-[#0F1C2E]/50 leading-relaxed">{unavailableNote}</span>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? (isAr ? 'إيقاف مؤقت' : 'Pause') : isAr ? 'تشغيل' : 'Play'}
            className="w-11 h-11 flex-shrink-0 rounded-full bg-[#3DD4B0] text-[#0F1C2E] flex items-center justify-center hover:bg-[#2BC49E] transition-colors"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4 ms-0.5" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5z" /></svg>
            )}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={progress}
            onChange={(e) => onSeek(Number(e.target.value))}
            aria-label={isAr ? 'شريط التقدم' : 'Seek'}
            className="flex-1 accent-[#1F6F78] h-1.5"
            dir="ltr"
          />
          <span className="text-xs text-[#0F1C2E]/50 tabular-nums flex-shrink-0" dir="ltr">
            {formatTime(current)} / {duration ? formatTime(duration) : '–:––'}
          </span>
        </div>
      )}

      {!locked && (
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onError={() => setUnavailable(true)}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d)) setDuration(d);
          }}
          onTimeUpdate={(e) => {
            const a = e.currentTarget;
            setCurrent(a.currentTime);
            if (a.duration > 0) setProgress(a.currentTime / a.duration);
          }}
          onEnded={() => {
            setPlaying(false);
            setProgress(0);
            setCurrent(0);
          }}
          hidden
        />
      )}
      <span dir={direction} className="sr-only">{isAr ? 'ar' : 'en'}</span>
    </div>
  );
}

// ============================================
// RETURN SYMBOL (screen 4 reference — user draws it on paper)
// ============================================

function ReturnSymbol() {
  return (
    <svg viewBox="0 0 96 96" className="w-16 h-16 sm:w-20 sm:h-20" role="img" aria-hidden="true">
      <circle cx="48" cy="38" r="22" fill="none" stroke="#0F1C2E" strokeWidth="3.5" />
      <line x1="48" y1="8" x2="48" y2="88" stroke="#1F6F78" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="48" cy="38" r="4" fill="#3DD4B0" />
    </svg>
  );
}

// ============================================
// TRUNCATED SENTENCE DISPLAY (screens 2 & 3)
// lg+: one row — beginning pinned inline-start, end pinned inline-end, vast void between.
// <lg: stacked rows with a vast vertical void (mirrors the physical paper).
// Tape animation lives on an INNER span so keyframes never clobber positioning translate.
// ============================================

interface TruncatedDisplayProps {
  split: { start: string[]; end: string[] };
  showTape: boolean;
  taped: boolean;
  onTapeEnd?: () => void;
  direction: 'rtl' | 'ltr';
}

const TAPE_ANIM = 'tsqTape 2.4s cubic-bezier(0.22, 1, 0.36, 1) forwards';
const TAPE_STATIC = 'scaleX(1) rotate(-1.2deg)';

function TapeBand({ verticalMode, taped, onTapeEnd }: { verticalMode: boolean; taped: boolean; onTapeEnd?: () => void }) {
  return (
    <span className={`absolute inset-x-0 top-1/2 -translate-y-1/2 block ${verticalMode ? 'h-8 sm:h-10' : 'h-9 sm:h-11'}`}>
      <span
        className="block h-full w-full rounded-[3px] bg-[#0F1C2E] shadow-md"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 45%, rgba(0,0,0,0.18))',
          transform: taped ? TAPE_STATIC : undefined,
          animation: taped ? 'none' : TAPE_ANIM,
        }}
        onAnimationEnd={onTapeEnd}
      />
    </span>
  );
}

function TruncatedDisplay({ split, showTape, taped, onTapeEnd, direction }: TruncatedDisplayProps) {
  const wordCls = 'text-2xl lg:text-3xl font-bold text-[#0F1C2E] whitespace-nowrap';
  return (
    <div dir={direction}>
      {/* Wide screens: single row with vast horizontal void */}
      <div className="hidden lg:flex items-center justify-between gap-6 min-h-[130px]">
        <span className={wordCls}>{split.start.join(' ')}</span>
        <div className="relative flex-1 self-stretch min-w-[120px]">
          {showTape ? (
            <TapeBand verticalMode={false} taped={taped} onTapeEnd={onTapeEnd} />
          ) : (
            <span className="absolute top-1/2 start-0 end-0 border-t-2 border-dashed border-[#0F1C2E]/15" />
          )}
        </div>
        <span className={wordCls}>{split.end.join(' ')}</span>
      </div>

      {/* Narrow screens: stacked rows with vast vertical void */}
      <div className="lg:hidden">
        <div className="flex items-start min-h-[52px]">
          <span className={wordCls}>{split.start.join(' ')}</span>
        </div>
        <div className="relative h-24 sm:h-32 my-1">
          {showTape ? (
            <TapeBand verticalMode taped={taped} onTapeEnd={onTapeEnd} />
          ) : (
            <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-[#0F1C2E]/15" />
          )}
        </div>
        <div className="flex items-end justify-end min-h-[52px]">
          <span className={wordCls}>{split.end.join(' ')}</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN CLIENT
// ============================================

export default function TruncatedSentenceClient() {
  const { locale, direction } = useLocale();
  const isAr = locale === 'ar';

  const [restored, setRestored] = useState(false);
  const [view, setView] = useState<View>('exercise');
  const [phase, setPhase] = useState<Phase>('welcome');
  const [sentence, setSentence] = useState('');
  const [taped, setTaped] = useState(false);
  const [ritual, setRitual] = useState<SavedRitual | null>(null);
  const [journal, setJournal] = useState<SavedJournal>({ entries: {} });
  const [now, setNow] = useState(() => Date.now());
  const [dayInput, setDayInput] = useState('');
  const [daySavedNote, setDaySavedNote] = useState(false);

  // Reminder form
  const [email, setEmail] = useState('');
  const [reminderSending, setReminderSending] = useState(false);
  const [reminderError, setReminderError] = useState('');
  const [reminderSet, setReminderSet] = useState(false);

  // ---- Restore once on mount
  useEffect(() => {
    const st = loadJSON<SavedState>(KEY_STATE);
    if (st) {
      if (st.sentence) setSentence(st.sentence);
      if (st.phase) {
        setPhase(st.phase);
        setTaped(st.phase === 'physical' || st.phase === 'timer');
      }
    }
    const r = loadJSON<SavedRitual>(KEY_RITUAL);
    if (r && r.startedAt) {
      setRitual(r);
      if (r.reminderSet) setReminderSet(true);
      if (r.reminderEmail) setEmail(r.reminderEmail);
    }
    const j = loadJSON<SavedJournal>(KEY_JOURNAL);
    if (j && j.entries) setJournal({ entries: j.entries });
    setRestored(true);
  }, []);

  // ---- Persist
  useEffect(() => {
    if (!restored) return;
    saveJSON(KEY_STATE, { phase, sentence } as SavedState);
  }, [phase, sentence, restored]);

  useEffect(() => {
    if (!restored) return;
    saveJSON(KEY_JOURNAL, journal);
  }, [journal, restored]);

  // ---- 1s ticker while waiting on timer or journal
  useEffect(() => {
    if (!restored) return;
    const needsTick = view === 'journal' || phase === 'timer';
    if (!needsTick) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [view, phase, restored]);

  // ---- Derived ritual timeline
  const ritualEnd = ritual ? ritual.startedAt + RITUAL_MS : 0;
  const unlocked = ritual !== null && now >= ritualEnd;
  const remaining = ritual ? Math.max(0, ritualEnd - now) : 0;
  const clock = formatClock(remaining);

  // ---- Sentence split (first segment inline-start, last segment inline-end)
  const split = useMemo(() => {
    const words = sentence.trim().split(/\s+/).filter(Boolean);
    const n = words.length;
    if (n === 0) return { start: [], end: [] as string[] };
    let startWords: string[];
    let endWords: string[];
    if (n <= 6) {
      const half = Math.max(1, Math.ceil(n / 2));
      startWords = words.slice(0, half);
      endWords = words.slice(half);
    } else {
      startWords = words.slice(0, 3);
      endWords = words.slice(-3);
    }
    if (endWords.length === 0) endWords = ['…'];
    return { start: startWords, end: endWords };
  }, [sentence]);

  // ---- Journal day logic
  const currentDay = ritual
    ? Math.min(9, Math.floor((now - ritual.startedAt) / DAY_MS) + 1)
    : 0;
  const firstOpenDay = (() => {
    if (!ritual) return 0;
    for (let d = 1; d <= 9; d++) {
      const opensAt = ritual.startedAt + (d - 1) * DAY_MS;
      if (now >= opensAt && !journal.entries[String(d)]) return d;
    }
    return 0; // all open days answered
  })();
  const doneDays = Object.keys(journal.entries).length;
  const allNineDone = doneDays >= 9;

  // ---- Journal view of a specific day
  const [journalDay, setJournalDay] = useState(0); // 0 = auto (firstOpenDay)
  const activeJournalDay = journalDay > 0 ? journalDay : firstOpenDay || currentDay;
  const activePhase = JOURNAL_PHASES.find((p) => activeJournalDay >= p.days[0] && activeJournalDay <= p.days[2]) || JOURNAL_PHASES[0];
  const activeEntry = journal.entries[String(activeJournalDay)];

  useEffect(() => {
    setDayInput(activeEntry ? activeEntry.text : '');
    setDaySavedNote(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeJournalDay]);

  const saveDay = () => {
    const text = dayInput.trim();
    if (!text || !ritual) return;
    setJournal((prev) => ({
      entries: {
        ...prev.entries,
        [String(activeJournalDay)]: { text, savedAt: Date.now() },
      },
    }));
    setDaySavedNote(true);
  };

  // ---- Actions
  const scrollTop = useCallback(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goPhase = (p: Phase) => {
    setPhase(p);
    scrollTop();
  };

  const startRitualTimer = () => {
    const startedAt = Date.now();
    const r: SavedRitual = { startedAt };
    setRitual(r);
    saveJSON(KEY_RITUAL, r);
    goPhase('timer');
  };

  const handleRestart = () => {
    clearAll();
    setSentence('');
    setTaped(false);
    setRitual(null);
    setJournal({ entries: {} });
    setReminderSet(false);
    setReminderError('');
    setView('exercise');
    goPhase('welcome');
  };

  const submitReminder = async () => {
    setReminderError('');
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setReminderError(isAr ? 'أدخل بريداً إلكترونياً صحيحاً.' : 'Enter a valid email address.');
      return;
    }
    setReminderSending(true);
    try {
      const res = await fetch(`/api/protocols/${SLUG}/reminder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, locale: isAr ? 'ar' : 'en', startedAt: ritual ? ritual.startedAt : Date.now() }),
      });
      if (!res.ok) throw new Error('failed');
      const r: SavedRitual = {
        startedAt: ritual ? ritual.startedAt : Date.now(),
        reminderEmail: value,
        reminderSet: true,
      };
      setRitual(r);
      saveJSON(KEY_RITUAL, r);
      setReminderSet(true);
    } catch {
      setReminderError(isAr ? 'تعذر التفعيل الآن — حاول لاحقاً.' : 'Could not activate right now — try again later.');
    } finally {
      setReminderSending(false);
    }
  };

  // ---- Breadcrumbs
  const breadcrumbs = [
    { label: isAr ? 'الرئيسية' : 'Home', href: '/' },
    { label: isAr ? 'التطبيقات' : 'Apps', href: '/apps' },
    { label: isAr ? 'البروتوكولات العلاجية' : 'Therapeutic Protocols', href: '/apps/therapeutic-protocols' },
    { label: pick(TRUNCATED_SENTENCE_META.title, isAr) },
  ];

  if (!restored) {
    return (
      <TherapeuticShell sectionType="standard">
        <div className="min-h-screen bg-[#F5F9F8]" />
      </TherapeuticShell>
    );
  }

  const showTabs = ritual !== null || phase === 'timer';

  return (
    <TherapeuticShell
      sectionType={phase === 'welcome' ? 'standard' : 'therapeutic'}
      exitProps={{ label: isAr ? 'مغادرة التجربة' : 'Leave the experience' }}
    >
      <div className="min-h-screen bg-[#F5F9F8]" dir={direction}>
        <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
          <RecoveryBreadcrumb items={breadcrumbs} />

          {/* Header (always visible once the experience started) */}
          {phase !== 'welcome' && (
            <div className="flex items-center justify-between gap-3 mt-4 mb-6 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F1C2E]">
                {pick(TRUNCATED_SENTENCE_META.title, isAr)}
              </h1>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#3DD4B0]/20 text-[#0F1C2E] font-semibold">
                {pick(SCREENS_COPY.freeBadge, isAr)}
              </span>
            </div>
          )}

          {/* View tabs (after the ritual began) */}
          {showTabs && (
            <div className="grid grid-cols-2 gap-2 mb-6" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={view === 'exercise'}
                onClick={() => { setView('exercise'); scrollTop(); }}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  view === 'exercise'
                    ? 'border-[#1F6F78] bg-[#1F6F78]/5 text-[#0F1C2E] ring-1 ring-[#1F6F78]'
                    : 'border-slate-200 bg-white text-[#0F1C2E]/60 hover:border-[#1F6F78]/40'
                }`}
              >
                {pick(SCREENS_COPY.exerciseTab, isAr)}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={view === 'journal'}
                onClick={() => { setView('journal'); setJournalDay(0); scrollTop(); }}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  view === 'journal'
                    ? 'border-[#1F6F78] bg-[#1F6F78]/5 text-[#0F1C2E] ring-1 ring-[#1F6F78]'
                    : 'border-slate-200 bg-white text-[#0F1C2E]/60 hover:border-[#1F6F78]/40'
                }`}
              >
                {pick(SCREENS_COPY.journalTab, isAr)}
              </button>
            </div>
          )}

          {/* ============================================
              VIEW: EXERCISE
              ============================================ */}
          {view === 'exercise' && (
            <>
              {/* ---------- WELCOME (free landing) ---------- */}
              {phase === 'welcome' && (
                <div className="space-y-6">
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3DD4B0]/20 text-[#0F1C2E] text-xs font-semibold">
                        {pick(TRUNCATED_SENTENCE_META.badge, isAr)}
                      </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1C2E] leading-tight">
                      {pick(TRUNCATED_SENTENCE_META.title, isAr)}
                    </h1>
                    <p className="text-[#0F1C2E]/60 leading-relaxed max-w-lg mx-auto">
                      {pick(TRUNCATED_SENTENCE_META.subtitle, isAr)}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-7 shadow-sm space-y-4">
                    <p className="text-[#0F1C2E]/80 leading-loose">{pick(TRUNCATED_SENTENCE_META.intro, isAr)}</p>
                    <p className="text-[#0F1C2E]/80 leading-loose">{pick(TRUNCATED_SENTENCE_META.intro2, isAr)}</p>
                    <p className="text-[#1F6F78] font-semibold leading-relaxed text-center pt-1">
                      {pick(TRUNCATED_SENTENCE_META.claim, isAr)}
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-7 shadow-sm">
                    <h2 className="text-base sm:text-lg font-semibold text-[#0F1C2E] mb-3">
                      {pick(SCREENS_COPY.whatInside, isAr)}
                    </h2>
                    <ul className="space-y-2.5">
                      {SCREENS_COPY.insideItems.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#0F1C2E]/75 leading-relaxed">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#3DD4B0] flex-shrink-0" />
                          <span>{pick(item as Bilingual, isAr)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-4 mt-5 pt-4 border-t border-slate-100 text-xs text-[#0F1C2E]/50">
                      <span>{pick(TRUNCATED_SENTENCE_META.durationLabel, isAr)}</span>
                      <span>·</span>
                      <span>{pick(SCREENS_COPY.freeBadge, isAr)}</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => goPhase('confront')}
                      className="inline-flex items-center gap-2 bg-[#3DD4B0] text-[#0F1C2E] rounded-xl px-8 py-3.5 text-base font-semibold hover:bg-[#2BC49E] transition-colors shadow-sm"
                    >
                      {pick(SCREENS_COPY.startCta, isAr)}
                    </button>
                  </div>

                  <TrackPlayer
                    src={AUDIO_TRACKS.intro.src}
                    title={pick(AUDIO_TRACKS.intro.title, isAr)}
                    durationLabel={pick(AUDIO_TRACKS.intro.durationLabel, isAr)}
                    description={pick(AUDIO_TRACKS.intro.description, isAr)}
                    locked={false}
                    lockNote=""
                    unavailableNote={pick(SCREENS_COPY.audioUnavailable, isAr)}
                    isAr={isAr}
                    direction={direction}
                  />

                  <MedicalDisclaimer className="mt-2" />
                </div>
              )}

              {/* ---------- SCREEN 1: CONFRONT ---------- */}
              {phase === 'confront' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-8 shadow-sm text-center space-y-5">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F1C2E] leading-relaxed">
                      {pick(SCREENS_COPY.confrontTitle, isAr)}
                    </h2>
                    <input
                      type="text"
                      value={sentence}
                      onChange={(e) => setSentence(e.target.value)}
                      placeholder={pick(SCREENS_COPY.confrontPlaceholder, isAr)}
                      maxLength={140}
                      autoFocus
                      className="w-full rounded-xl border-2 border-slate-200 focus:border-[#1F6F78] outline-none px-5 py-4 text-lg sm:text-xl text-center text-[#0F1C2E] placeholder:text-[#0F1C2E]/25 bg-[#F5F9F8] transition-colors"
                    />
                    <p className="text-xs text-[#0F1C2E]/45">{pick(SCREENS_COPY.confrontHint, isAr)}</p>
                    <button
                      type="button"
                      onClick={() => { if (sentence.trim().split(/\s+/).filter(Boolean).length >= 2) goPhase('truncated'); }}
                      className="w-full sm:w-auto bg-[#3DD4B0] text-[#0F1C2E] rounded-xl px-8 py-3.5 text-base font-semibold hover:bg-[#2BC49E] transition-colors"
                    >
                      {pick(SCREENS_COPY.confrontBtn, isAr)}
                    </button>
                    {sentence.trim().split(/\s+/).filter(Boolean).length < 2 && sentence.trim().length > 0 && (
                      <p className="text-xs text-[#E8685A]">{pick(SCREENS_COPY.confrontError, isAr)}</p>
                    )}
                  </div>
                </div>
              )}

              {/* ---------- SCREEN 2: TRUNCATED ---------- */}
              {phase === 'truncated' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-10 shadow-sm">
                    <p className="text-center text-[#0F1C2E]/60 text-sm sm:text-base mb-8 lg:mb-12 leading-relaxed">
                      {pick(SCREENS_COPY.truncateTitle, isAr)}
                    </p>

                    {/* The truncated sentence: beginning pinned inline-start, end pinned inline-end, vast void between */}
                    <TruncatedDisplay split={split} showTape={false} taped={false} direction={direction} />

                    <p className="text-center text-xs text-[#0F1C2E]/35 mt-8 lg:mt-12">
                      {sentence.trim()}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => { setTaped(false); goPhase('taping'); }}
                      className="w-full sm:w-auto bg-[#3DD4B0] text-[#0F1C2E] rounded-xl px-8 py-3.5 text-base font-semibold hover:bg-[#2BC49E] transition-colors"
                    >
                      {pick(SCREENS_COPY.truncateBtn, isAr)}
                    </button>
                    <button
                      type="button"
                      onClick={() => goPhase('confront')}
                      className="text-sm text-[#0F1C2E]/50 hover:text-[#0F1C2E] underline underline-offset-4 px-4 py-2"
                    >
                      {pick(SCREENS_COPY.editSentence, isAr)}
                    </button>
                  </div>
                </div>
              )}

              {/* ---------- SCREEN 3: TAPING (animation) ---------- */}
              {phase === 'taping' && (
                <div className="space-y-6">
                  <style>{`
                    @keyframes tsqTape {
                      0% { transform: scaleX(0) rotate(-1.2deg); opacity: 0.35; }
                      35% { opacity: 1; }
                      100% { transform: scaleX(1) rotate(-1.2deg); opacity: 1; }
                    }
                  `}</style>
                  <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-10 shadow-sm">
                    <TruncatedDisplay split={split} showTape taped={taped} onTapeEnd={() => setTaped(true)} direction={direction} />
                  </div>

                  <div className="text-center">
                    {taped ? (
                      <div className="space-y-4">
                        <p className="text-[#1F6F78] font-semibold">{pick(SCREENS_COPY.tapingTitle, isAr)}</p>
                        <button
                          type="button"
                          onClick={() => goPhase('physical')}
                          className="w-full sm:w-auto bg-[#3DD4B0] text-[#0F1C2E] rounded-xl px-8 py-3.5 text-base font-semibold hover:bg-[#2BC49E] transition-colors"
                        >
                          {pick(SCREENS_COPY.tapingBtn, isAr)}
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-[#0F1C2E]/40">{isAr ? '…' : '…'}</p>
                    )}
                  </div>
                </div>
              )}

              {/* ---------- SCREEN 4: PHYSICAL RITUAL (bullet list — NO checkboxes) ---------- */}
              {phase === 'physical' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-8 shadow-sm space-y-5">
                    <div className="text-center space-y-1.5">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#0F1C2E]">
                        {pick(SCREENS_COPY.physicalTitle, isAr)}
                      </h2>
                      <p className="text-sm text-[#0F1C2E]/55">{pick(SCREENS_COPY.physicalIntro, isAr)}</p>
                    </div>

                    {/* Truncated sentence reference (already taped) */}
                    <div className="rounded-xl bg-[#F5F9F8] border border-slate-100 px-4 py-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-lg sm:text-xl font-bold text-[#0F1C2E] whitespace-nowrap">{split.start.join(' ')}</span>
                        <span className="flex-1 h-1.5 rounded bg-[#0F1C2E] mx-2" style={{ transform: 'rotate(-1deg)' }} />
                        <span className="text-lg sm:text-xl font-bold text-[#0F1C2E] whitespace-nowrap">{split.end.join(' ')}</span>
                      </div>
                    </div>

                    {/* Instructions — standard bullet points only */}
                    <ul className="space-y-3">
                      {PHYSICAL_STEPS.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-[#0F1C2E]/85 leading-relaxed">
                          <span className="mt-[9px] w-2 h-2 rounded-full bg-[#1F6F78] flex-shrink-0" />
                          <span className="text-sm sm:text-base">{pick(step, isAr)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* The dedicated symbol */}
                    <div className="rounded-2xl border border-[#1F6F78]/25 bg-[#1F6F78]/[0.04] p-5 flex items-center gap-4">
                      <ReturnSymbol />
                      <div>
                        <h3 className="text-sm sm:text-base font-semibold text-[#0F1C2E]">{pick(SYMBOL_LABEL, isAr)}</h3>
                        <p className="text-xs sm:text-sm text-[#0F1C2E]/55 mt-1 leading-relaxed">{pick(SYMBOL_HINT, isAr)}</p>
                      </div>
                    </div>
                  </div>

                  <TrackPlayer
                    src={AUDIO_TRACKS.intro.src}
                    title={pick(AUDIO_TRACKS.intro.title, isAr)}
                    durationLabel={pick(AUDIO_TRACKS.intro.durationLabel, isAr)}
                    description={pick(AUDIO_TRACKS.intro.description, isAr)}
                    locked={false}
                    lockNote=""
                    unavailableNote={pick(SCREENS_COPY.audioUnavailable, isAr)}
                    isAr={isAr}
                    direction={direction}
                  />

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={startRitualTimer}
                      className="w-full sm:w-auto bg-[#3DD4B0] text-[#0F1C2E] rounded-xl px-8 py-3.5 text-base font-semibold hover:bg-[#2BC49E] transition-colors"
                    >
                      {pick(SCREENS_COPY.physicalBtn, isAr)}
                    </button>
                  </div>
                </div>
              )}

              {/* ---------- SCREEN 5: TIMER ---------- */}
              {phase === 'timer' && ritual && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-8 shadow-sm text-center space-y-5">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0F1C2E]">
                      {pick(TIMER_COPY.title, isAr)}
                    </h2>

                    {!unlocked ? (
                      <>
                        <p className="text-[#0F1C2E]/70 leading-relaxed text-sm sm:text-base">
                          {pick(TIMER_COPY.message, isAr)}
                        </p>
                        <div className="flex items-stretch justify-center gap-2 sm:gap-3" dir="ltr">
                          {[
                            { v: clock.d, l: isAr ? 'يوم' : 'days' },
                            { v: clock.h, l: isAr ? 'ساعة' : 'hrs' },
                            { v: clock.m, l: isAr ? 'دقيقة' : 'min' },
                            { v: clock.s, l: isAr ? 'ثانية' : 'sec' },
                          ].map((unit, i) => (
                            <div key={i} className="rounded-xl bg-[#F5F9F8] border border-slate-100 px-3 sm:px-5 py-3 min-w-[64px] sm:min-w-[76px]">
                              <div className="text-2xl sm:text-3xl font-bold text-[#0F1C2E] tabular-nums">{unit.v}</div>
                              <div className="text-[10px] sm:text-xs text-[#0F1C2E]/45 mt-0.5">{unit.l}</div>
                            </div>
                          ))}
                        </div>

                        {/* Email reminder */}
                        <div className="rounded-2xl border border-slate-100 bg-[#F5F9F8] p-4 sm:p-5 text-start space-y-3">
                          <h3 className="text-sm font-semibold text-[#0F1C2E]">{pick(TIMER_COPY.reminderTitle, isAr)}</h3>
                          <p className="text-xs text-[#0F1C2E]/55 leading-relaxed">{pick(TIMER_COPY.reminderNote, isAr)}</p>
                          {reminderSet ? (
                            <p className="text-sm text-[#1F6F78] font-medium flex items-center gap-2">
                              <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                              {pick(TIMER_COPY.reminderDone, isAr)}
                            </p>
                          ) : (
                            <div className="flex flex-col sm:flex-row gap-2">
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={pick(TIMER_COPY.emailLabel, isAr)}
                                className="flex-1 rounded-xl border border-slate-200 focus:border-[#1F6F78] outline-none px-4 py-3 text-sm text-[#0F1C2E] bg-white transition-colors"
                              />
                              <button
                                type="button"
                                onClick={submitReminder}
                                disabled={reminderSending}
                                className="rounded-xl bg-[#0F1C2E] text-white px-6 py-3 text-sm font-semibold hover:bg-[#1a2c42] transition-colors disabled:opacity-50"
                              >
                                {reminderSending ? '…' : pick(TIMER_COPY.reminderCta, isAr)}
                              </button>
                            </div>
                          )}
                          {reminderError && <p className="text-xs text-[#E8685A]">{reminderError}</p>}
                        </div>

                        <button
                          type="button"
                          onClick={() => { setView('journal'); setJournalDay(0); scrollTop(); }}
                          className="text-sm text-[#1F6F78] underline underline-offset-4 hover:text-[#0F1C2E] transition-colors"
                        >
                          {pick(SCREENS_COPY.journalTab, isAr)} →
                        </button>
                      </>
                    ) : (
                      <>
                        {/* 72h completed — night 3 unlocked */}
                        <div className="rounded-2xl border border-[#3DD4B0] bg-[#3DD4B0]/10 p-5 sm:p-6 text-start space-y-3">
                          <h3 className="text-lg font-bold text-[#0F1C2E]">{pick(TIMER_COPY.unlockedTitle, isAr)}</h3>
                          <p className="text-sm sm:text-base text-[#0F1C2E]/75 leading-relaxed">{pick(TIMER_COPY.unlockedBody, isAr)}</p>
                        </div>

                        <TrackPlayer
                          src={AUDIO_TRACKS.night3.src}
                          title={pick(AUDIO_TRACKS.night3.title, isAr)}
                          durationLabel={pick(AUDIO_TRACKS.night3.durationLabel, isAr)}
                          description={pick(AUDIO_TRACKS.night3.description, isAr)}
                          locked={false}
                          lockNote=""
                          unavailableNote={pick(SCREENS_COPY.audioUnavailable, isAr)}
                          isAr={isAr}
                          direction={direction}
                        />

                        <button
                          type="button"
                          onClick={() => { setView('journal'); setJournalDay(0); scrollTop(); }}
                          className="w-full sm:w-auto bg-[#3DD4B0] text-[#0F1C2E] rounded-xl px-8 py-3.5 text-base font-semibold hover:bg-[#2BC49E] transition-colors"
                        >
                          {pick(SCREENS_COPY.journalTab, isAr)} →
                        </button>
                      </>
                    )}
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="text-xs text-[#0F1C2E]/40 hover:text-[#0F1C2E]/70 underline underline-offset-4"
                    >
                      {pick(SCREENS_COPY.restart, isAr)}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ============================================
              VIEW: JOURNAL (9 days, 3 phases, gain framing)
              ============================================ */}
          {view === 'journal' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-7 shadow-sm space-y-5">
                <div className="text-center space-y-1.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F1C2E]">{pick(JOURNAL_COPY.title, isAr)}</h2>
                  <p className="text-sm text-[#0F1C2E]/55">{pick(JOURNAL_COPY.subtitle, isAr)}</p>
                </div>

                {!ritual ? (
                  <div className="rounded-xl bg-[#0F1C2E]/[0.03] px-4 py-6 text-center">
                    <p className="text-sm text-[#0F1C2E]/60 leading-relaxed">{pick(JOURNAL_COPY.notStarted, isAr)}</p>
                    <button
                      type="button"
                      onClick={() => { setView('exercise'); scrollTop(); }}
                      className="mt-4 text-sm text-[#1F6F78] underline underline-offset-4"
                    >
                      ← {pick(SCREENS_COPY.exerciseTab, isAr)}
                    </button>
                  </div>
                ) : (
                  <>
                    {/* 9 day dots */}
                    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                      {Array.from({ length: 9 }, (_, i) => i + 1).map((d) => {
                        const opensAt = ritual.startedAt + (d - 1) * DAY_MS;
                        const isOpen = now >= opensAt;
                        const isDone = Boolean(journal.entries[String(d)]);
                        const isActive = d === activeJournalDay;
                        return (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setJournalDay(d)}
                            aria-label={`${pick(JOURNAL_COPY.dayLabel, isAr)} ${d}`}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-semibold transition-all flex items-center justify-center ${
                              isDone
                                ? 'bg-[#1F6F78] text-white'
                                : isOpen
                                  ? 'bg-white border-2 border-[#1F6F78] text-[#1F6F78]'
                                  : 'bg-[#0F1C2E]/[0.04] text-[#0F1C2E]/30'
                            } ${isActive ? 'ring-2 ring-[#3DD4B0] ring-offset-2' : ''}`}
                          >
                            {isAr ? ['١','٢','٣','٤','٥','٦','٧','٨','٩'][d - 1] : d}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-center text-xs text-[#0F1C2E]/45">
                      {doneDays} / 9 {pick(JOURNAL_COPY.daysDone, isAr)}
                    </p>

                    {/* Active day panel */}
                    {(() => {
                      const d = activeJournalDay;
                      const opensAt = ritual.startedAt + (d - 1) * DAY_MS;
                      const isOpen = now >= opensAt;
                      const entry = journal.entries[String(d)];
                      if (!isOpen) {
                        return (
                          <div className="rounded-xl bg-[#0F1C2E]/[0.03] px-4 py-5 text-center">
                            <p className="text-sm text-[#0F1C2E]/55">
                              {pick(JOURNAL_COPY.dayLabel, isAr)} {isAr ? ['١','٢','٣','٤','٥','٦','٧','٨','٩'][d-1] : d} — {pick(JOURNAL_COPY.opensIn, isAr)} {formatMsShort(opensAt - now, isAr)}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 flex-wrap justify-center">
                            <span className="text-xs px-2.5 py-1 rounded-full bg-[#1F6F78]/10 text-[#1F6F78] font-medium">
                              {pick(JOURNAL_COPY.phaseLabel, isAr)} {activePhase.id}: {pick(activePhase.name, isAr)}
                            </span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-[#0F1C2E]/5 text-[#0F1C2E]/50 font-medium">
                              {pick(JOURNAL_COPY.dayLabel, isAr)} {isAr ? ['١','٢','٣','٤','٥','٦','٧','٨','٩'][d-1] : d}
                            </span>
                          </div>

                          <p className="text-base sm:text-lg font-semibold text-[#0F1C2E] text-center leading-relaxed">
                            {pick(activePhase.question, isAr)}
                          </p>

                          {/* Fixed daily tasks — plain bullets, never checkboxes */}
                          <div className="rounded-xl bg-[#F5F9F8] border border-slate-100 p-4">
                            <h4 className="text-xs font-semibold text-[#0F1C2E]/60 mb-2.5">{pick(JOURNAL_COPY.tasksTitle, isAr)}</h4>
                            <ul className="space-y-2">
                              {JOURNAL_DAILY_TASKS.map((task, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-[#0F1C2E]/70">
                                  <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-[#3DD4B0] flex-shrink-0" />
                                  <span className="text-sm leading-relaxed">{pick(task, isAr)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {entry ? (
                            <div className="rounded-xl border border-[#1F6F78]/25 bg-[#1F6F78]/[0.04] p-4">
                              <p className="text-xs text-[#1F6F78] font-medium mb-2 flex items-center gap-1.5">
                                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
                                {pick(JOURNAL_COPY.saved, isAr)}
                              </p>
                              <p className="text-sm text-[#0F1C2E]/80 leading-relaxed whitespace-pre-wrap">{entry.text}</p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <textarea
                                value={dayInput}
                                onChange={(e) => setDayInput(e.target.value)}
                                placeholder={pick(JOURNAL_COPY.placeholder, isAr)}
                                rows={5}
                                maxLength={2000}
                                className="w-full rounded-xl border border-slate-200 focus:border-[#1F6F78] outline-none px-4 py-3 text-sm sm:text-base text-[#0F1C2E] bg-white leading-relaxed transition-colors resize-y"
                              />
                              <div className="flex items-center justify-between gap-3 flex-wrap">
                                <button
                                  type="button"
                                  onClick={saveDay}
                                  disabled={!dayInput.trim()}
                                  className="bg-[#3DD4B0] text-[#0F1C2E] rounded-xl px-6 py-3 text-sm font-semibold hover:bg-[#2BC49E] transition-colors disabled:opacity-40"
                                >
                                  {pick(JOURNAL_COPY.save, isAr)}
                                </button>
                                {firstOpenDay === 0 && !allNineDone && (
                                  <span className="text-xs text-[#0F1C2E]/50">{pick(JOURNAL_COPY.answered, isAr)}</span>
                                )}
                              </div>
                              {daySavedNote && (
                                <p className="text-xs text-[#1F6F78]">{pick(JOURNAL_COPY.saved, isAr)} ✓</p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>

              {/* Closing message after day 9 */}
              {ritual && allNineDone && (
                <div className="rounded-2xl bg-[#0F1C2E] text-white p-6 sm:p-8 space-y-3 shadow-md">
                  <p className="text-xs text-[#3DD4B0] font-semibold tracking-wide">{isAr ? 'رسالة الختام' : 'CLOSING MESSAGE'}</p>
                  <p className="text-sm sm:text-base leading-loose text-white/90">{pick(JOURNAL_CLOSING_MESSAGE, isAr)}</p>
                </div>
              )}

              <p className="text-center text-xs text-[#0F1C2E]/35 leading-relaxed px-4">
                {isAr
                  ? 'تُحفظ إجاباتك على هذا الجهاز فقط — خصوصيتك محمية.'
                  : 'Your entries are stored on this device only — your privacy is protected.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </TherapeuticShell>
  );
}
