"use client";

import type { TriggerMappingState, TriggerMappingAction, TriggerEntry } from './types';

export const initialState: TriggerMappingState = {
  phase: 'intro',
  locale: 'en',
  entries: [],
  currentEntry: {},
  showSafetyCheck: false,
  hasConsented: false,
};

function createEntry(partial: Partial<TriggerEntry>): TriggerEntry {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString(),
    triggerDescription: partial.triggerDescription || '',
    triggerCategory: partial.triggerCategory || null,
    bodyResponses: partial.bodyResponses || [],
    bodyResponseNotes: partial.bodyResponseNotes || '',
    primaryEmotion: partial.primaryEmotion || null,
    activationLevel: partial.activationLevel || 1,
    emotionNotes: partial.emotionNotes || '',
    impulse: partial.impulse || '',
    actualResponse: partial.actualResponse || '',
    whatHelped: partial.whatHelped || '',
    wouldHelpNextTime: partial.wouldHelpNextTime || '',
  };
}

export function triggerMappingReducer(
  state: TriggerMappingState,
  action: TriggerMappingAction
): TriggerMappingState {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.phase };

    case 'SET_LOCALE':
      return { ...state, locale: action.locale };

    case 'CONSENT':
      return { ...state, hasConsented: true, phase: 'trigger-entry' };

    case 'ADD_ENTRY':
      return { ...state, entries: [...state.entries, action.entry] };

    case 'UPDATE_CURRENT_ENTRY':
      return {
        ...state,
        currentEntry: { ...state.currentEntry, ...action.updates },
      };

    case 'SAVE_AND_CONTINUE': {
      const entry = createEntry(state.currentEntry);
      return {
        ...state,
        entries: [...state.entries, entry],
        currentEntry: {},
        phase: 'review',
      };
    }

    case 'STOP_HERE': {
      // Save whatever we have and go to completion
      const hasPartialData = Object.keys(state.currentEntry).length > 0;
      if (hasPartialData) {
        const entry = createEntry(state.currentEntry);
        return {
          ...state,
          entries: [...state.entries, entry],
          currentEntry: {},
          phase: 'completion',
        };
      }
      return { ...state, phase: 'completion' };
    }

    case 'DELETE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter((e) => e.id !== action.id),
      };

    case 'SET_ENTRIES':
      return { ...state, entries: action.entries };

    case 'SHOW_SAFETY_CHECK':
      return { ...state, showSafetyCheck: action.show };

    default:
      return state;
  }
}

