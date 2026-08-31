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

/** Phase-based protocol state machine */
export type ProtocolPhase = 'entry' | 'active' | 'completion';

/** Generic protocol state */
export interface ProtocolState {
  phase: ProtocolPhase;
  currentStep: number;
  isPaused: boolean;
}

/** Generic protocol actions */
export type ProtocolAction =
  | { type: 'START' }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'COMPLETE' }
  | { type: 'RESTART' };

/** Create a protocol reducer with a given step count */
export function createProtocolReducer(totalSteps: number) {
  const initialState: ProtocolState = {
    phase: 'entry',
    currentStep: 0,
    isPaused: false,
  };

  function reducer(state: ProtocolState, action: ProtocolAction): ProtocolState {
    switch (action.type) {
      case 'START':
        return { ...state, phase: 'active', currentStep: 0 };

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
