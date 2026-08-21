/**
 * Safe Place — TypeScript Types
 * Based on: Safe Place guided visualization specification
 *
 * State Machine: entry → bridge → building (5 senses) → immersion → completion
 */

export type SafePlacePhase = 'entry' | 'bridge' | 'building' | 'immersion' | 'completion';
export type SenseStep = 'sight' | 'sound' | 'touch' | 'smell' | 'taste';
export type Locale = 'en' | 'ar';

export interface SafePlaceState {
  phase: SafePlacePhase;
  currentSense: SenseStep;
  senses: {
    sight: string;
    sound: string;
    touch: string;
    smell: string;
    taste: string;
  };
  isPaused: boolean;
  locale: Locale;
}

export type SafePlaceAction =
  | { type: 'START_BRIDGE' }
  | { type: 'PROCEED' }
  | { type: 'GO_BACK' }
  | { type: 'SET_SENSE_INPUT'; sense: SenseStep; value: string }
  | { type: 'NEXT_SENSE' }
  | { type: 'PREV_SENSE' }
  | { type: 'FINISH_BUILDING' }
  | { type: 'FINISH_IMMERSION' }
  | { type: 'REPEAT' }
  | { type: 'SET_PAUSED'; isPaused: boolean };

export const SENSE_ORDER: SenseStep[] = ['sight', 'sound', 'touch', 'smell', 'taste'];
