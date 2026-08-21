"use client";

/**
 * A52 Breathing — State Machine (Pure Reducer)
 * Based on: docs/recovery/a52-specification.md Section 7.5
 * 
 * Transitions:
 *   entry →[START_BRIDGE]→ bridge
 *   bridge →[PROCEED]→ preparation
 *   bridge →[GO_BACK]→ (exit to /recovery/trc)
 *   preparation →[PREPARATION_DONE]→ breathing (cycle=1, subPhase=inhale)
 *   breathing (inhale) →[5s]→ breathing (exhale)
 *   breathing (exhale) →[2s]→ breathing (pause)
 *   breathing (pause) →[1s]→ breathing (cycle+1, inhale) OR completion
 *   completion →[REPEAT]→ preparation
 *   any →[EARLY_EXIT]→ completion (with earlyExitCycle)
 */

import type { A52State, A52Action, BreathSubPhase } from './types';
import { CYCLES } from './constants';

export const initialState: A52State = {
  phase: 'entry',
  cycle: 1,
  breathSubPhase: null,
  phaseStartTime: null,
  isPaused: false,
  pausedAt: null,
  sessionProgress: 0,
  reflectionText: '',
  earlyExitCycle: null,
  hapticEnabled: false,
};

export function a52Reducer(state: A52State, action: A52Action): A52State {
  switch (action.type) {
    case 'START_BRIDGE':
      return {
        ...state,
        phase: 'bridge',
        phaseStartTime: performance.now(),
      };

    case 'PROCEED_TO_PREPARATION':
      return {
        ...state,
        phase: 'preparation',
        phaseStartTime: performance.now(),
      };

    case 'GO_BACK':
      // Handled by the page component (router.push), not by reducer
      return state;

    case 'PREPARATION_DONE':
      return {
        ...state,
        phase: 'breathing',
        cycle: 1,
        breathSubPhase: 'inhale',
        phaseStartTime: performance.now(),
        sessionProgress: 0,
        earlyExitCycle: null,
      };

    case 'BREATH_PHASE_COMPLETE': {
      if (state.phase !== 'breathing') return state;

      const nextSubPhase = getNextBreathSubPhase(state.breathSubPhase);
      
      if (nextSubPhase === null) {
        // Completed a full cycle (pause → next cycle or completion)
        if (state.cycle >= CYCLES.TOTAL) {
          return {
            ...state,
            phase: 'completion',
            breathSubPhase: null,
            phaseStartTime: performance.now(),
            sessionProgress: 100,
          };
        }
        return {
          ...state,
          cycle: state.cycle + 1,
          breathSubPhase: 'inhale',
          phaseStartTime: performance.now(),
          sessionProgress: ((state.cycle) / CYCLES.TOTAL) * 100,
        };
      }

      return {
        ...state,
        breathSubPhase: nextSubPhase,
        phaseStartTime: performance.now(),
      };
    }

    case 'CYCLE_COMPLETE': {
      if (state.cycle >= CYCLES.TOTAL) {
        return {
          ...state,
          phase: 'completion',
          breathSubPhase: null,
          phaseStartTime: performance.now(),
          sessionProgress: 100,
        };
      }
      return {
        ...state,
        cycle: state.cycle + 1,
        breathSubPhase: 'inhale',
        phaseStartTime: performance.now(),
        sessionProgress: (state.cycle / CYCLES.TOTAL) * 100,
      };
    }

    case 'ALL_CYCLES_COMPLETE':
      return {
        ...state,
        phase: 'completion',
        breathSubPhase: null,
        phaseStartTime: performance.now(),
        sessionProgress: 100,
      };

    case 'EARLY_EXIT':
      return {
        ...state,
        phase: 'completion',
        breathSubPhase: null,
        phaseStartTime: performance.now(),
        earlyExitCycle: action.cycle,
        isPaused: false,
        sessionProgress: (action.cycle / CYCLES.TOTAL) * 100,
      };

    case 'REPEAT_EXERCISE':
      return {
        ...state,
        phase: 'preparation',
        cycle: 1,
        breathSubPhase: null,
        phaseStartTime: performance.now(),
        isPaused: false,
        pausedAt: null,
        sessionProgress: 0,
        reflectionText: '',
        earlyExitCycle: null,
      };

    case 'SET_PAUSED':
      return {
        ...state,
        isPaused: action.isPaused,
        pausedAt: action.isPaused ? performance.now() : null,
      };

    case 'SET_REFLECTION':
      return {
        ...state,
        reflectionText: action.text,
      };

    case 'TOGGLE_HAPTIC':
      return {
        ...state,
        hapticEnabled: !state.hapticEnabled,
      };

    default:
      return state;
  }
}

/**
 * Determines the next breath sub-phase in the cycle.
 * inhale → exhale → pause → (next cycle or completion)
 */
function getNextBreathSubPhase(current: BreathSubPhase | null): BreathSubPhase | null {
  switch (current) {
    case 'inhale':
      return 'exhale';
    case 'exhale':
      return 'pause';
    case 'pause':
      // After pause, the cycle completes — handled by CYCLE_COMPLETE
      return null;
    default:
      return 'inhale';
  }
}
