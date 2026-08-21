import type { SafetyPlanData } from './types';
import { initialPlan } from './reducer';

const STORAGE_KEY = 'tamkinly_trc_safety_plan';

export function savePlan(plan: SafetyPlanData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch { /* storage full or unavailable */ }
}

export function loadPlan(): SafetyPlanData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SafetyPlanData;
  } catch {
    return null;
  }
}

export function clearPlan(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function loadOrInit(): SafetyPlanData {
  return loadPlan() || initialPlan;
}
