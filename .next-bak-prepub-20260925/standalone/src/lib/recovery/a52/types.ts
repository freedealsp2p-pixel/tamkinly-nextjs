"use client";

/**
 * A52 Breathing — TypeScript Types
 * Based on: docs/recovery/a52-specification.md
 * 
 * State Machine: entry → bridge → preparation → breathing → completion
 */

export type A52Phase =
  | 'entry'         // شاشة الدخول
  | 'bridge'        // الجسر العلاجي
  | 'preparation'   // التحضير (10 ثوانٍ)
  | 'breathing'     // التنفّس الموجَّه (6 دورات)
  | 'completion';   // شاشة الإغلاق

export type BreathSubPhase = 'inhale' | 'exhale' | 'pause';

export interface A52State {
  phase: A52Phase;
  cycle: number;                          // 1 ← 6
  breathSubPhase: BreathSubPhase | null;  // null إلا في phase='breathing'
  phaseStartTime: number | null;          // performance.now() عند بداية المرحلة الفرعية
  isPaused: boolean;                      // true عند فتح نافذة الخروج
  pausedAt: number | null;               // لحفظ زمن الإيقاف
  sessionProgress: number;               // 0 ← 100
  reflectionText: string;                // نص التأمّل في الإغلاق (local only)
  earlyExitCycle: number | null;         // إن خرج مبكرًا، يُسجَّل هنا
  hapticEnabled: boolean;                // اهتزاز خفيف (اختياري)
}

export type A52Action =
  | { type: 'START_BRIDGE' }
  | { type: 'PROCEED_TO_PREPARATION' }
  | { type: 'GO_BACK' }
  | { type: 'PREPARATION_DONE' }
  | { type: 'BREATH_PHASE_COMPLETE' }
  | { type: 'CYCLE_COMPLETE' }
  | { type: 'ALL_CYCLES_COMPLETE' }
  | { type: 'EARLY_EXIT'; cycle: number }
  | { type: 'REPEAT_EXERCISE' }
  | { type: 'SET_PAUSED'; isPaused: boolean }
  | { type: 'SET_REFLECTION'; text: string }
  | { type: 'TOGGLE_HAPTIC' };

export type Locale = 'en' | 'ar';
