"use client";

import type { GroundingState, GroundingAction, SenseType } from './types';
import { SENSE_ORDER } from './types';

export const initialState: GroundingState = {
  phase: 'intro',
  locale: 'en',
};

export function groundingReducer(state: GroundingState, action: GroundingAction): GroundingState {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.phase };
    case 'NEXT_SENSE': {
      const currentIdx = SENSE_ORDER.indexOf(state.phase as SenseType);
      if (currentIdx === -1 || currentIdx >= SENSE_ORDER.length - 1) {
        return { ...state, phase: 'breathing' };
      }
      return { ...state, phase: SENSE_ORDER[currentIdx + 1] };
    }
    case 'PREV_SENSE': {
      const currentIdx = SENSE_ORDER.indexOf(state.phase as SenseType);
      if (currentIdx <= 0) return state;
      return { ...state, phase: SENSE_ORDER[currentIdx - 1] };
    }
    case 'SET_LOCALE':
      return { ...state, locale: action.locale };
    default:
      return state;
  }
}
