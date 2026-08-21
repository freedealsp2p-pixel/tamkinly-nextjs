"use client";

export type Locale = 'en' | 'ar';
export type SenseType = 'sight' | 'sound' | 'touch' | 'smell' | 'taste';

export type GroundingPhase =
  | 'intro'
  | 'bridge'
  | 'sight'
  | 'sound'
  | 'touch'
  | 'smell'
  | 'taste'
  | 'breathing'
  | 'completion';

export interface GroundingState {
  phase: GroundingPhase;
  locale: Locale;
}

export type GroundingAction =
  | { type: 'SET_PHASE'; phase: GroundingPhase }
  | { type: 'NEXT_SENSE' }
  | { type: 'PREV_SENSE' }
  | { type: 'SET_LOCALE'; locale: Locale };

export const SENSE_ORDER: SenseType[] = ['sight', 'sound', 'touch', 'smell', 'taste'];
