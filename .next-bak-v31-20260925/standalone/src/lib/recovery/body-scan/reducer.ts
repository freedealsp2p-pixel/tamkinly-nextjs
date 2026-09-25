import {
  BodyScanState,
  BodyScanAction,
  BodyPartResult,
  BODY_PARTS,
} from './types';

export const initialState: BodyScanState = {
  phase: 'entry',
  currentPartIndex: 0,
  sensations: BODY_PARTS.map((bp) => ({ part: bp.id, sensation: null })),
  isPaused: false,
  locale: 'ar',
};

export function bodyScanReducer(state: BodyScanState, action: BodyScanAction): BodyScanState {
  switch (action.type) {
    case 'START_BRIDGE':
      return {
        ...state,
        phase: 'bridge',
      };

    case 'PROCEED':
      if (state.phase === 'bridge') {
        return {
          ...state,
          phase: 'scanning',
          currentPartIndex: 0,
        };
      }
      return state;

    case 'GO_BACK':
      if (state.phase === 'bridge') {
        return {
          ...state,
          phase: 'entry',
        };
      }
      if (state.phase === 'scanning' && state.currentPartIndex > 0) {
        return {
          ...state,
          currentPartIndex: state.currentPartIndex - 1,
        };
      }
      if (state.phase === 'integration') {
        return {
          ...state,
          phase: 'scanning',
          currentPartIndex: BODY_PARTS.length - 1,
        };
      }
      return state;

    case 'SET_SENSATION': {
      const updatedSensations: BodyPartResult[] = state.sensations.map((s, i) =>
        i === state.currentPartIndex ? { ...s, sensation: action.sensation } : s
      );
      return {
        ...state,
        sensations: updatedSensations,
      };
    }

    case 'NEXT_PART': {
      const nextIndex = state.currentPartIndex + 1;
      if (nextIndex >= BODY_PARTS.length) {
        return {
          ...state,
          phase: 'integration',
        };
      }
      return {
        ...state,
        currentPartIndex: nextIndex,
      };
    }

    case 'FINISH_SCANNING':
      return {
        ...state,
        phase: 'integration',
      };

    case 'FINISH_INTEGRATION':
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
