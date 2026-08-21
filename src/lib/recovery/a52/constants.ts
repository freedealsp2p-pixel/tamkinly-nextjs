"use client";

/**
 * A52 Breathing — Timing Constants
 * Based on: docs/recovery/a52-specification.md Section 7
 * 
 * Pattern: 5-2 (inhale 5s, exhale 2s, pause 1s)
 * 6 cycles × 8 seconds = 48 seconds of guided breathing
 */

export const TIMING = {
  /** Inhale duration in milliseconds */
  INHALE_MS: 5000,
  /** Exhale duration in milliseconds */
  EXHALE_MS: 2000,
  /** Pause between cycles in milliseconds */
  PAUSE_MS: 1000,
  /** Preparation countdown in milliseconds */
  PREPARATION_MS: 10000,
  /** Completion transition delay */
  COMPLETION_TRANSITION_MS: 5000,
} as const;

export const CYCLES = {
  /** Total number of breathing cycles */
  TOTAL: 6,
  /** Minimum cycle for early exit to still count as "partial completion" */
  MIN_PARTIAL: 1,
} as const;

export const VISUAL = {
  /** Circle scale at rest / end of exhale */
  SCALE_REST: 0.78,
  /** Circle scale at peak inhale */
  SCALE_PEAK: 1.0,
  /** Primary color (Teal) */
  COLOR_REST: '#1F6F78',
  /** Accent color (Mint) — peak inhale */
  COLOR_PEAK: '#3DD4B0',
  /** Background light */
  BG_LIGHT: '#F5F9F8',
  /** Background dark */
  BG_DARK: '#0A1A1F',
  /** Easing curve for breathing animation */
  BREATHING_EASING: [0.4, 0, 0.6, 1] as const,
  /** Circle base diameter (desktop) */
  CIRCLE_BASE_DESKTOP: 280,
  /** Circle peak diameter (desktop) */
  CIRCLE_PEAK_DESKTOP: 360,
  /** Progress bar height */
  PROGRESS_BAR_HEIGHT: 4,
  /** Progress bar color */
  PROGRESS_BAR_COLOR: '#1F6F78',
  /** Progress bar track color */
  PROGRESS_BAR_TRACK: '#E5E7EB',
} as const;

export const STORAGE_KEYS = {
  /** localStorage key for A52 reflection entries */
  REFLECTION_PREFIX: 'a52-reflection-',
  /** localStorage key for haptic preference */
  HAPTIC_PREFERENCE: 'a52-haptic-enabled',
} as const;

/** Duration of one complete breath cycle in ms */
export const CYCLE_DURATION_MS = TIMING.INHALE_MS + TIMING.EXHALE_MS + TIMING.PAUSE_MS;
/** Total breathing duration in ms */
export const TOTAL_BREATHING_MS = CYCLE_DURATION_MS * CYCLES.TOTAL;
