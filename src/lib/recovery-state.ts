// Recovery State Layer — R1-B
// Domain-aware state management for Recovery journeys
// CRITICAL: PornRecoveryState and TRCRecoveryState are COMPLETELY SEPARATE
// Shared only at infrastructure level (localStorage, types)

import { RecoveryProgram, TRC_STEPS } from './recovery-journey';

// ============================================================
// PORN RECOVERY STATE
// ============================================================

export interface PornRecoveryStepState {
  stepId: string;
  startedAt: string;       // ISO date
  completedAt: string | null;
  isCompleted: boolean;
  lastActivity: string;    // ISO date
  downloadablesUsed: string[];
  scrollProgress: number;  // 0-100
}

export interface PornRecoveryState {
  program: 'porn-recovery';
  startedAt: string;           // ISO date — first visit
  lastActivity: string;        // ISO date — last interaction
  currentStepId: string | null;
  currentStageId: string | null;
  steps: Record<string, PornRecoveryStepState>;
  completedSteps: string[];
  totalProgress: number;       // 0-100
  completionState: 'not-started' | 'in-progress' | 'completed';
  completedAt: string | null;
  downloadedTools: string[];
  identityData: {
    selectedCards: string[];
    personalStatement: string;
    savedAt: string | null;
  } | null;
  toolkitData: {
    halt: { hungry: boolean; angry: boolean; lonely: boolean; tired: boolean };
    journal: { trigger: string; emotion: string; savedAt: string | null };
  } | null;
  nextRecommendedStep: string | null;
}

// ============================================================
// TRC STATE
// ============================================================

export interface TrcStepState {
  stepId: string;
  startedAt: string;
  completedAt: string | null;
  isCompleted: boolean;
  lastActivity: string;
  downloadablesUsed: string[];
  sessionCount: number;       // How many times exercised
  lastSessionDuration: number; // minutes
}

export interface TrcState {
  program: 'trc';
  startedAt: string;
  lastActivity: string;
  currentStepId: string | null;
  currentStageId: string | null;
  steps: Record<string, TrcStepState>;
  completedSteps: string[];
  totalProgress: number;
  completionState: 'not-started' | 'in-progress' | 'completed';
  completedAt: string | null;
  downloadedTools: string[];
  safetyStageCompleted: boolean; // Must complete Safety before Regulation
  nextRecommendedStep: string | null;
}

// ============================================================
// SHARED STATE UTILITIES
// ============================================================

const PORN_RECOVERY_STATE_KEY = 'tamkinly_pr_state';
const TRC_STATE_KEY = 'tamkinly_trc_state';

export function getPornRecoveryState(): PornRecoveryState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PORN_RECOVERY_STATE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PornRecoveryState;
  } catch {
    return null;
  }
}

export function getTrcState(): TrcState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(TRC_STATE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TrcState;
  } catch {
    return null;
  }
}

export function savePornRecoveryState(state: PornRecoveryState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PORN_RECOVERY_STATE_KEY, JSON.stringify(state));
  } catch {}
}

export function saveTrcState(state: TrcState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TRC_STATE_KEY, JSON.stringify(state));
  } catch {}
}

// Initialize Porn Recovery state
export function initPornRecoveryState(): PornRecoveryState {
  const existing = getPornRecoveryState();
  if (existing) return existing;

  const now = new Date().toISOString();
  return {
    program: 'porn-recovery',
    startedAt: now,
    lastActivity: now,
    currentStepId: 'recognition',
    currentStageId: 'awareness',
    steps: {},
    completedSteps: [],
    totalProgress: 0,
    completionState: 'in-progress',
    completedAt: null,
    downloadedTools: [],
    identityData: null,
    toolkitData: null,
    nextRecommendedStep: 'recognition'
  };
}

// Initialize TRC state
export function initTrcState(): TrcState {
  const existing = getTrcState();
  if (existing) return existing;

  const now = new Date().toISOString();
  return {
    program: 'trc',
    startedAt: now,
    lastActivity: now,
    currentStepId: 'grounding',
    currentStageId: 'safety',
    steps: {},
    completedSteps: [],
    totalProgress: 0,
    completionState: 'in-progress',
    completedAt: null,
    downloadedTools: [],
    safetyStageCompleted: false,
    nextRecommendedStep: 'grounding'
  };
}

// Mark a Porn Recovery step as started
export function markPornRecoveryStepStarted(stepId: string): PornRecoveryState {
  const state = getPornRecoveryState() || initPornRecoveryState();
  const now = new Date().toISOString();

  if (!state.steps[stepId]) {
    state.steps[stepId] = {
      stepId,
      startedAt: now,
      completedAt: null,
      isCompleted: false,
      lastActivity: now,
      downloadablesUsed: [],
      scrollProgress: 0
    };
  }

  state.currentStepId = stepId;
  state.lastActivity = now;
  savePornRecoveryState(state);
  return state;
}

// Mark a Porn Recovery step as completed
export function markPornRecoveryStepCompleted(stepId: string): PornRecoveryState {
  const state = getPornRecoveryState() || initPornRecoveryState();
  const now = new Date().toISOString();

  if (state.steps[stepId]) {
    state.steps[stepId].completedAt = now;
    state.steps[stepId].isCompleted = true;
    state.steps[stepId].lastActivity = now;
  } else {
    state.steps[stepId] = {
      stepId,
      startedAt: now,
      completedAt: now,
      isCompleted: true,
      lastActivity: now,
      downloadablesUsed: [],
      scrollProgress: 100
    };
  }

  if (!state.completedSteps.includes(stepId)) {
    state.completedSteps.push(stepId);
  }

  state.lastActivity = now;
  // Calculate progress
  state.totalProgress = Math.round((state.completedSteps.length / 8) * 100); // 8 steps
  if (state.totalProgress >= 100) {
    state.completionState = 'completed';
    state.completedAt = now;
  }

  savePornRecoveryState(state);
  return state;
}

// Mark a TRC step as started
export function markTrcStepStarted(stepId: string): TrcState {
  const state = getTrcState() || initTrcState();
  const now = new Date().toISOString();

  if (!state.steps[stepId]) {
    state.steps[stepId] = {
      stepId,
      startedAt: now,
      completedAt: null,
      isCompleted: false,
      lastActivity: now,
      downloadablesUsed: [],
      sessionCount: 1,
      lastSessionDuration: 0
    };
  } else {
    state.steps[stepId].sessionCount += 1;
  }

  state.currentStepId = stepId;
  state.lastActivity = now;
  saveTrcState(state);
  return state;
}

// Mark a TRC step as completed
export function markTrcStepCompleted(stepId: string): TrcState {
  const state = getTrcState() || initTrcState();
  const now = new Date().toISOString();

  if (state.steps[stepId]) {
    state.steps[stepId].completedAt = now;
    state.steps[stepId].isCompleted = true;
    state.steps[stepId].lastActivity = now;
  } else {
    state.steps[stepId] = {
      stepId,
      startedAt: now,
      completedAt: now,
      isCompleted: true,
      lastActivity: now,
      downloadablesUsed: [],
      sessionCount: 1,
      lastSessionDuration: 0
    };
  }

  if (!state.completedSteps.includes(stepId)) {
    state.completedSteps.push(stepId);
  }

  // Check if Safety stage completed
  const safetySteps = ['grounding', 'a52-breathing', 'safe-place', 'body-scan'];
  state.safetyStageCompleted = safetySteps.every(s => state.completedSteps.includes(s));

  state.lastActivity = now;
  // Calculate progress based on ALL available steps (Wave 2 = 9 steps)
  const allAvailableStepIds = TRC_STEPS.filter(s => s.isAvailable).map(s => s.id);
  const availableStepsCount = allAvailableStepIds.length;
  const completedAvailableCount = state.completedSteps.filter(s => allAvailableStepIds.includes(s as any)).length;
  state.totalProgress = Math.round((completedAvailableCount / availableStepsCount) * 100);
  if (state.totalProgress >= 100) {
    state.completionState = 'completed';
    state.completedAt = now;
  }

  saveTrcState(state);
  return state;
}

// Add a downloaded tool
export function addDownloadedTool(program: RecoveryProgram, toolKey: string): void {
  if (program === 'porn-recovery') {
    const state = getPornRecoveryState() || initPornRecoveryState();
    if (!state.downloadedTools.includes(toolKey)) {
      state.downloadedTools.push(toolKey);
    }
    state.lastActivity = new Date().toISOString();
    savePornRecoveryState(state);
  } else {
    const state = getTrcState() || initTrcState();
    if (!state.downloadedTools.includes(toolKey)) {
      state.downloadedTools.push(toolKey);
    }
    state.lastActivity = new Date().toISOString();
    saveTrcState(state);
  }
}

// Get recovery program summary (for dashboard / journey pages)
export interface RecoveryProgramSummary {
  program: RecoveryProgram;
  isStarted: boolean;
  progress: number;
  completionState: 'not-started' | 'in-progress' | 'completed';
  currentStep: string | null;
  nextRecommendedStep: string | null;
  lastActivity: string | null;
  completedStepsCount: number;
  totalStepsCount: number;
}

export function getPornRecoverySummary(): RecoveryProgramSummary {
  const state = getPornRecoveryState();
  if (!state) {
    return {
      program: 'porn-recovery',
      isStarted: false,
      progress: 0,
      completionState: 'not-started',
      currentStep: null,
      nextRecommendedStep: 'recognition',
      lastActivity: null,
      completedStepsCount: 0,
      totalStepsCount: 8
    };
  }
  return {
    program: 'porn-recovery',
    isStarted: true,
    progress: state.totalProgress,
    completionState: state.completionState,
    currentStep: state.currentStepId,
    nextRecommendedStep: state.nextRecommendedStep,
    lastActivity: state.lastActivity,
    completedStepsCount: state.completedSteps.length,
    totalStepsCount: 8
  };
}

export function getTrcSummary(): RecoveryProgramSummary {
  const trcAvailableCount = TRC_STEPS.filter(s => s.isAvailable).length;
  const state = getTrcState();
  if (!state) {
    return {
      program: 'trc',
      isStarted: false,
      progress: 0,
      completionState: 'not-started',
      currentStep: null,
      nextRecommendedStep: 'grounding',
      lastActivity: null,
      completedStepsCount: 0,
      totalStepsCount: trcAvailableCount
    };
  }
  return {
    program: 'trc',
    isStarted: true,
    progress: state.totalProgress,
    completionState: state.completionState,
    currentStep: state.currentStepId,
    nextRecommendedStep: state.nextRecommendedStep,
    lastActivity: state.lastActivity,
    completedStepsCount: state.completedSteps.length,
    totalStepsCount: trcAvailableCount
  };
}
