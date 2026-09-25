/**
 * Safe Place — State Machine (Pure Reducer)
 *
 * Transitions:
 *   entry →[START_BRIDGE]→ bridge
 *   bridge →[PROCEED]→ building (currentSense='sight')
 *   bridge →[GO_BACK]→ (exit to /recovery/trc)
 *   building →[NEXT_SENSE]→ building (next sense) OR immersion
 *   building →[PREV_SENSE]→ building (prev sense) OR bridge
 *   building →[SET_SENSE_INPUT]→ building (update sense value)
 *   building →[FINISH_BUILDING]→ immersion
 *   immersion →[FINISH_IMMERSION]→ completion
 *   completion →[REPEAT]→ entry
 *   any →[SET_PAUSED]→ (toggle pause)
 */

import type { SafePlaceState, SafePlaceAction, SenseStep } from './types';
import { SENSE_ORDER } from './types';

export const initialState: SafePlaceState = {
  phase: 'entry',
  currentSense: 'sight',
  senses: {
    sight: '',
    sound: '',
    touch: '',
    smell: '',
    taste: '',
  },
  isPaused: false,
  locale: 'ar',
};

export function safePlaceReducer(state: SafePlaceState, action: SafePlaceAction): SafePlaceState {
  switch (action.type) {
    case 'START_BRIDGE':
      return {
        ...state,
        phase: 'bridge',
      };

    case 'PROCEED':
      return {
        ...state,
        phase: 'building',
        currentSense: 'sight',
      };

    case 'GO_BACK':
      // Handled by the page component (router.push), not by reducer
      return state;

    case 'SET_SENSE_INPUT':
      return {
        ...state,
        senses: {
          ...state.senses,
          [action.sense]: action.value,
        },
      };

    case 'NEXT_SENSE': {
      if (state.phase !== 'building') return state;
      const currentIndex = SENSE_ORDER.indexOf(state.currentSense);
      if (currentIndex >= SENSE_ORDER.length - 1) {
        // Last sense — move to immersion
        return {
          ...state,
          phase: 'immersion',
        };
      }
      return {
        ...state,
        currentSense: SENSE_ORDER[currentIndex + 1],
      };
    }

    case 'PREV_SENSE': {
      if (state.phase !== 'building') return state;
      const currentIndex = SENSE_ORDER.indexOf(state.currentSense);
      if (currentIndex <= 0) {
        // First sense — go back to bridge
        return {
          ...state,
          phase: 'bridge',
        };
      }
      return {
        ...state,
        currentSense: SENSE_ORDER[currentIndex - 1],
      };
    }

    case 'FINISH_BUILDING':
      return {
        ...state,
        phase: 'immersion',
      };

    case 'FINISH_IMMERSION':
      return {
        ...state,
        phase: 'completion',
      };

    case 'REPEAT':
      return {
        ...initialState,
      };

    case 'SET_PAUSED':
      return {
        ...state,
        isPaused: action.isPaused,
      };

    default:
      return state;
  }
}
