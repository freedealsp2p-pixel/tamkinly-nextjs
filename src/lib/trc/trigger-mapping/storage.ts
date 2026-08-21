"use client";

import type { TriggerEntry } from './types';

const ENTRIES_KEY = 'tamkinly_trc_trigger_entries';
const CURRENT_KEY = 'tamkinly_trc_trigger_current';

export function saveEntries(entries: TriggerEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  } catch {
    // localStorage unavailable or quota exceeded
  }
}

export function loadEntries(): TriggerEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ENTRIES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function clearEntries(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(ENTRIES_KEY);
  } catch {
    // ignore
  }
}

export function saveCurrentEntry(entry: Partial<TriggerEntry>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(entry));
  } catch {
    // ignore
  }
}

export function loadCurrentEntry(): Partial<TriggerEntry> | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearCurrentEntry(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CURRENT_KEY);
  } catch {
    // ignore
  }
}

