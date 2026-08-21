// useRecoveryState Hook — R1-B
// React hook wrapping recovery-state.ts for component consumption
// CRITICAL: Domain-aware — separate state per program

'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  PornRecoveryState,
  TrcState,
  RecoveryProgramSummary,
  getPornRecoveryState,
  getTrcState,
  initPornRecoveryState,
  initTrcState,
  markPornRecoveryStepStarted,
  markPornRecoveryStepCompleted,
  markTrcStepStarted,
  markTrcStepCompleted,
  addDownloadedTool,
  getPornRecoverySummary,
  getTrcSummary,
  savePornRecoveryState,
  saveTrcState
} from '@/lib/recovery-state';
import { RecoveryProgram } from '@/lib/recovery-journey';

export function usePornRecoveryState() {
  const [state, setState] = useState<PornRecoveryState | null>(null);
  const [summary, setSummary] = useState<RecoveryProgramSummary | null>(null);

  useEffect(() => {
    const existing = getPornRecoveryState();
    setState(existing);
    setSummary(getPornRecoverySummary());
  }, []);

  const init = useCallback(() => {
    const s = initPornRecoveryState();
    setState(s);
    setSummary(getPornRecoverySummary());
    return s;
  }, []);

  const markStepStarted = useCallback((stepId: string) => {
    const s = markPornRecoveryStepStarted(stepId);
    setState(s);
    setSummary(getPornRecoverySummary());
    return s;
  }, []);

  const markStepCompleted = useCallback((stepId: string) => {
    const s = markPornRecoveryStepCompleted(stepId);
    setState(s);
    setSummary(getPornRecoverySummary());
    return s;
  }, []);

  const addDownload = useCallback((toolKey: string) => {
    addDownloadedTool('porn-recovery', toolKey);
    setState(getPornRecoveryState());
  }, []);

  const updateIdentity = useCallback((data: PornRecoveryState['identityData']) => {
    const s = getPornRecoveryState() || initPornRecoveryState();
    s.identityData = data;
    s.lastActivity = new Date().toISOString();
    savePornRecoveryState(s);
    setState(s);
  }, []);

  const updateToolkit = useCallback((data: PornRecoveryState['toolkitData']) => {
    const s = getPornRecoveryState() || initPornRecoveryState();
    s.toolkitData = data;
    s.lastActivity = new Date().toISOString();
    savePornRecoveryState(s);
    setState(s);
  }, []);

  return {
    state,
    summary,
    init,
    markStepStarted,
    markStepCompleted,
    addDownload,
    updateIdentity,
    updateToolkit
  };
}

export function useTrcState() {
  const [state, setState] = useState<TrcState | null>(null);
  const [summary, setSummary] = useState<RecoveryProgramSummary | null>(null);

  useEffect(() => {
    const existing = getTrcState();
    setState(existing);
    setSummary(getTrcSummary());
  }, []);

  const init = useCallback(() => {
    const s = initTrcState();
    setState(s);
    setSummary(getTrcSummary());
    return s;
  }, []);

  const markStepStarted = useCallback((stepId: string) => {
    const s = markTrcStepStarted(stepId);
    setState(s);
    setSummary(getTrcSummary());
    return s;
  }, []);

  const markStepCompleted = useCallback((stepId: string) => {
    const s = markTrcStepCompleted(stepId);
    setState(s);
    setSummary(getTrcSummary());
    return s;
  }, []);

  const addDownload = useCallback((toolKey: string) => {
    addDownloadedTool('trc', toolKey);
    setState(getTrcState());
  }, []);

  return {
    state,
    summary,
    init,
    markStepStarted,
    markStepCompleted,
    addDownload
  };
}

// Generic hook that dispatches to the right program
export function useRecoveryState(program: RecoveryProgram) {
  const pr = usePornRecoveryState();
  const trc = useTrcState();

  if (program === 'porn-recovery') {
    return pr;
  }
  return trc;
}
