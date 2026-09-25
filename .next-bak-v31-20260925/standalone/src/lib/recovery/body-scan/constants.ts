/** Timing constants (in milliseconds) */
export const SCAN_DURATION_MS = 30_000; // 30 seconds per body part
export const INTEGRATION_BREATHING_MS = 10_000; // 10-second breathing pause
export const BRIDGE_READ_TIME_MS = 0; // user-controlled

/** Color palette */
export const COLORS = {
  /** Primary accent — calming teal */
  primary: '#5B9A8B',
  primaryLight: '#7DB8A8',
  primaryDark: '#3E7A6B',

  /** Sensation colors */
  tension: '#D4A574',
  ease: '#7DB8A8',
  neutral: '#9CA3AF',

  /** Background */
  bgDark: '#0F1A1A',
  bgCard: '#1A2B2B',
  bgCardHover: '#243838',

  /** Text */
  textPrimary: '#E8F0ED',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',

  /** UI */
  progressTrack: '#1A2B2B',
  progressFill: '#5B9A8B',
  border: '#2A3D3D',
} as const;

/** Storage key for persisting body scan results */
export const STORAGE_KEY = 'tamkinly_body_scan_results';

/** Body part highlight regions for SVG (relative coordinates 0-1) */
export const BODY_REGIONS: Record<string, { x: number; y: number; width: number; height: number }> = {
  'feet':      { x: 0.35, y: 0.88, width: 0.30, height: 0.10 },
  'legs':      { x: 0.35, y: 0.58, width: 0.30, height: 0.30 },
  'abdomen':   { x: 0.32, y: 0.42, width: 0.36, height: 0.18 },
  'chest':     { x: 0.30, y: 0.24, width: 0.40, height: 0.20 },
  'arms':      { x: 0.08, y: 0.24, width: 0.84, height: 0.28 },
  'neck-face': { x: 0.38, y: 0.04, width: 0.24, height: 0.22 },
};

/** Total estimated duration label */
export const DURATION_LABEL_AR = '15 دقيقة';
export const DURATION_LABEL_EN = '15 minutes';
export const DIFFICULTY_LABEL_AR = 'مبتدئ';
export const DIFFICULTY_LABEL_EN = 'Beginner';
