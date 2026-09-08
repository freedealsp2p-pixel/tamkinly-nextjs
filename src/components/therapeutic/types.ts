import { type LucideIcon } from 'lucide-react';

/** A single protocol step — used by all three experiences */
export interface ProtocolStep {
  id: number;
  title: { ar: string; en: string };
  durationLabel: { ar: string; en: string };
  duration: number; // seconds
  intro: { ar: string; en: string };
  instructions: { ar: string; en: string }[];
  hypnotic_cue: { ar: string; en: string };
  reflection: { ar: string; en: string };
  icon: string;
}

/** Bilingual text pair */
export interface BilingualText {
  ar: string;
  en: string;
}

/** Protocol metadata */
export interface ProtocolMeta {
  title: BilingualText;
  subtitle: BilingualText;
  badge: BilingualText;
  intro: BilingualText;
  intro2?: BilingualText;
  claim: BilingualText;
  totalSteps: number;
  totalDuration: number; // seconds
  /** Color accent for this protocol within Tamkinly identity */
  accentColor: string;
}

/**
 * Phase-based protocol state machine (premium experience journey):
 *
 *   welcome      — Experience Welcome (orientation, no marketing)
 *   preparation  — calm readiness state before the first active step
 *   safety-gate  — White Mirror explicit safety gate (accept required)
 *   active       — guided session (one step at a time, pausable)
 *   completion   — grounded therapeutic closure
 */
export type ProtocolPhase =
  | 'welcome'
  | 'preparation'
  | 'safety-gate'
  | 'active'
  | 'completion';

/** Generic protocol state */
export interface ProtocolState {
  phase: ProtocolPhase;
  currentStep: number;
  isPaused: boolean;
}

/** Generic protocol actions */
export type ProtocolAction =
  | { type: 'TO_PREPARATION' }   // welcome -> preparation
  | { type: 'BACK_TO_WELCOME' }  // preparation -> welcome
  | { type: 'OPEN_GATE' }        // welcome -> safety-gate (White Mirror)
  | { type: 'START' }            // preparation / accepted gate -> active step 1
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'COMPLETE' }
  | { type: 'RESTART' };         // explicit choice only -> welcome

/** Create a protocol reducer with a given step count */
export function createProtocolReducer(totalSteps: number) {
  const initialState: ProtocolState = {
    phase: 'welcome',
    currentStep: 0,
    isPaused: false,
  };

  function reducer(state: ProtocolState, action: ProtocolAction): ProtocolState {
    switch (action.type) {
      case 'TO_PREPARATION':
        return { ...state, phase: 'preparation' };

      case 'BACK_TO_WELCOME':
        return { ...state, phase: 'welcome' };

      case 'OPEN_GATE':
        return { ...state, phase: 'safety-gate' };

      case 'START':
        return { ...state, phase: 'active', currentStep: 0, isPaused: false };

      case 'NEXT_STEP':
        if (state.currentStep >= totalSteps - 1) {
          return { ...state, phase: 'completion' };
        }
        return { ...state, currentStep: state.currentStep + 1 };

      case 'PREV_STEP':
        if (state.currentStep <= 0) return state;
        return { ...state, currentStep: state.currentStep - 1 };

      case 'PAUSE':
        return { ...state, isPaused: true };

      case 'RESUME':
        return { ...state, isPaused: false };

      case 'COMPLETE':
        return { ...state, phase: 'completion' };

      case 'RESTART':
        return { ...initialState };

      default:
        return state;
    }
  }

  return { initialState, reducer };
}

/** Shape persisted locally (device only) so a session can be resumed. */
export interface PersistedProtocolProgress {
  phase: ProtocolPhase;
  currentStep: number;
}

/** Restore previously saved progress — never restores paused flag. */
export function loadPersistedProgress(
  slug: string
): PersistedProtocolProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(`tamkinly_protocol_progress_${slug}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedProtocolProgress;
    if (
      (parsed.phase === 'preparation' || parsed.phase === 'active') &&
      typeof parsed.currentStep === 'number' &&
      parsed.currentStep >= 0
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

/** Save progress locally (device only). No therapeutic responses are stored. */
export function persistProgress(
  slug: string,
  progress: PersistedProtocolProgress
): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      `tamkinly_protocol_progress_${slug}`,
      JSON.stringify(progress)
    );
  } catch {
    // Storage unavailable — the experience still works fully without resume.
  }
}

/**
 * Scroll to the top of the viewport, respecting the user's reduced-motion
 * preference (jumps instantly instead of animating). Shared by all three
 * protocol clients so phase/step transitions never fight the OS setting.
 */
export function scrollToTop(): void {
  if (typeof window === 'undefined') return;
  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
}

/** Clear saved progress (called on completion). */
export function clearPersistedProgress(slug: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(`tamkinly_protocol_progress_${slug}`);
  } catch {
    // ignore
  }
}
