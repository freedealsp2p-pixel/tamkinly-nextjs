/**
 * Safe Place — Constants
 */

export const IMMERSION_DURATION_MS = 30000;
export const STORAGE_KEY = 'safe-place-data';

export const SENSES = {
  sight: {
    labelAr: 'البصر',
    labelEn: 'Sight',
    icon: 'Eye',
    placeholderAr: 'ماذا ترى في مكانك الآمن؟',
    placeholderEn: 'What do you see in your safe place?',
  },
  sound: {
    labelAr: 'السمع',
    labelEn: 'Sound',
    icon: 'Ear',
    placeholderAr: 'ماذا تسمع؟',
    placeholderEn: 'What do you hear?',
  },
  touch: {
    labelAr: 'اللمس',
    labelEn: 'Touch',
    icon: 'Hand',
    placeholderAr: 'ماذا تشعر باللمس؟',
    placeholderEn: 'What do you feel by touch?',
  },
  smell: {
    labelAr: 'الشم',
    labelEn: 'Smell',
    icon: 'Wind',
    placeholderAr: 'ماذا تشمّ؟',
    placeholderEn: 'What do you smell?',
  },
  taste: {
    labelAr: 'التذوّق',
    labelEn: 'Taste',
    icon: 'Coffee',
    placeholderAr: 'ماذا تتذوّق؟',
    placeholderEn: 'What do you taste?',
  },
} as const;

export const VISUAL = {
  /** Gradient colors for immersion background */
  GRADIENT_START: '#1F6F78',
  GRADIENT_MID: '#2A9D8F',
  GRADIENT_END: '#3DD4B0',
  /** Background light */
  BG_LIGHT: '#F5F9F8',
  /** Background dark */
  BG_DARK: '#0A1A1F',
  /** Primary color */
  PRIMARY: '#1F6F78',
  /** Accent color */
  ACCENT: '#3DD4B0',
  /** Text primary */
  TEXT_PRIMARY: '#0F1C2E',
  /** Text muted */
  TEXT_MUTED: '#0F1C2E70',
} as const;
