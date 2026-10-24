/**
 * Bilingual Files Catalog
 * Central registry of all printable worksheets and attached PDFs.
 * Each file has Arabic + English versions.
 * Users see their current language version as primary, with option to download the other.
 */

export interface BilingualFile {
  /** Unique resource ID for analytics */
  resourceId: string;
  /** Display title (will be translated if key exists, otherwise used as-is) */
  titleKey?: string;
  /** Title fallback (used if no translation key) */
  titleFallback?: { ar: string; en: string };
  /** Arabic version path */
  ar: { href: string; available: boolean; size?: string };
  /** English version path */
  en: { href: string; available: boolean; size?: string };
  /** Category for analytics */
  category: string;
}

export const BILINGUAL_FILES: Record<string, BilingualFile> = {
  // ============================================
  // RECOVERY TOOLKIT
  // ============================================
  'REC-01-HALT': {
    resourceId: 'REC-01',
    titleFallback: { ar: 'فحص HALT', en: 'HALT Basic Needs Check' },
    ar: { href: '/downloads/porn-recovery/REC-01-HALT-Worksheet.pdf', available: true, size: '1.1 MB' },
    en: { href: '/downloads/porn-recovery/REC-01-HALT-Worksheet-EN.pdf', available: true, size: '311 KB' },
    category: 'Recovery Toolkit',
  },
  'REC-02-TRIGGER-JOURNAL': {
    resourceId: 'REC-02',
    titleFallback: { ar: 'سجل المحفزات', en: 'Trigger Journal' },
    ar: { href: '/downloads/porn-recovery/REC-02-Trigger-Journal.pdf', available: true, size: '731 KB' },
    en: { href: '/downloads/porn-recovery/REC-02-Trigger-Journal-EN.pdf', available: true, size: '567 KB' },
    category: 'Recovery Toolkit',
  },
  'REC-03-EMERGENCY-PLAN': {
    resourceId: 'REC-03',
    titleFallback: { ar: 'خطة الطوارئ', en: 'Emergency Plan' },
    ar: { href: '/downloads/porn-recovery/REC-03-Emergency-Plan.pdf', available: true, size: '824 KB' },
    en: { href: '/downloads/porn-recovery/REC-03-Emergency-Plan-EN.pdf', available: true, size: '606 KB' },
    category: 'Recovery Toolkit',
  },
  'REC-04-RECOVERY-REVIEW': {
    resourceId: 'REC-04',
    titleFallback: { ar: 'مراجعة التعافي', en: 'Recovery Review' },
    ar: { href: '/downloads/porn-recovery/REC-04-Recovery-Review.pdf', available: true, size: '803 KB' },
    en: { href: '/downloads/porn-recovery/REC-04-Recovery-Review-EN.pdf', available: true, size: '593 KB' },
    category: 'Recovery Toolkit',
  },
  'REC-05-PATTERN-RECOGNITION': {
    resourceId: 'REC-05',
    titleFallback: { ar: 'رصد الأنماط السلوكية', en: 'Pattern Recognition' },
    ar: { href: '/downloads/porn-recovery/REC-05-Pattern-Recognition.pdf', available: true, size: '664 KB' },
    en: { href: '/downloads/porn-recovery/REC-05-Pattern-Recognition-EN.pdf', available: true, size: '476 KB' },
    category: 'Recovery Toolkit',
  },
  'REC-06-RECOVERY-LOOP-MAP': {
    resourceId: 'REC-06',
    titleFallback: { ar: 'خريطة حلقة التعافي', en: 'Recovery Loop Map' },
    ar: { href: '/downloads/porn-recovery/REC-06-Recovery-Loop-Map.pdf', available: true, size: '658 KB' },
    en: { href: '/downloads/porn-recovery/REC-06-Recovery-Loop-Map-EN.pdf', available: true, size: '475 KB' },
    category: 'Recovery Toolkit',
  },
  'REC-07-REFRAME': {
    resourceId: 'REC-07',
    titleFallback: { ar: 'إعادة التأطير', en: 'Reframe' },
    ar: { href: '/downloads/porn-recovery/REC-07-Reframe.pdf', available: true, size: '672 KB' },
    en: { href: '/downloads/porn-recovery/REC-07-Reframe-EN.pdf', available: true, size: '471 KB' },
    category: 'Recovery Toolkit',
  },
  'REC-08-STAGE-ASSESSMENT': {
    resourceId: 'REC-08',
    titleFallback: { ar: 'تقييم المرحلة', en: 'Stage Assessment' },
    ar: { href: '/downloads/porn-recovery/REC-08-Stage-Assessment.pdf', available: true, size: '482 KB' },
    en: { href: '/downloads/porn-recovery/REC-08-Stage-Assessment-EN.pdf', available: true, size: '330 KB' },
    category: 'Recovery Toolkit',
  },
  'REC-09-RELAPSE-SCENARIO-REVIEW': {
    resourceId: 'REC-09',
    titleFallback: { ar: 'مراجعة سيناريو الانتكاسة', en: 'Relapse Scenario Review' },
    ar: { href: '/downloads/porn-recovery/REC-09-Relapse-Scenario-Review.pdf', available: true, size: '635 KB' },
    en: { href: '/downloads/porn-recovery/REC-09-Relapse-Scenario-Review-EN.pdf', available: true, size: '420 KB' },
    category: 'Recovery Toolkit',
  },
  'REC-10-IDENTITY-CARDS': {
    resourceId: 'REC-10',
    titleFallback: { ar: 'بطاقات بناء الهوية', en: 'Identity Builder Cards' },
    ar: { href: '/downloads/porn-recovery/REC-10-Identity-Cards.pdf', available: true, size: '225 KB' },
    en: { href: '/downloads/porn-recovery/REC-10-Identity-Cards-EN.pdf', available: true, size: '203 KB' },
    category: 'Recovery Toolkit',
  },

  'REC-11-FUTURE-SELF-LETTER': {
    resourceId: 'REC-11',
    titleFallback: { ar: 'رسالة من نفسك بعد 90 يوماً', en: 'A Letter From 90 Days Ahead' },
    ar: { href: '/downloads/porn-recovery/REC-11-Future-Self-Letter.pdf', available: true, size: '560 KB' },
    en: { href: '/downloads/porn-recovery/REC-11-Future-Self-Letter-EN.pdf', available: true, size: '374 KB' },
    category: 'Recovery Toolkit',
  },

  // ============================================
  // PRODUCT PDFs — Task 71 (2026-10-25): one-time packages (The Planner + Mastery).
  // Founder directive: pay FIRST (Tribute), then access — Planner-package files
  // are served from the gated page /downloads/planner (server-side code+email check).
  // Free files (Action List + Recovery Toolkit) stay public on /downloads.
  // ============================================
  '7-DAYS-SYSTEM': {
    resourceId: '7-DAYS-SYSTEM',
    titleFallback: { ar: 'إعادة ضبط الهوية في 7 أيام — الدليل المصغر', en: 'The 7-Day Identity Reset — Mini Guide' },
    ar: { href: '/downloads/v2/Tamkinly-7-Day-Identity-Reset.pdf', available: true, size: '5.6 MB' },
    en: { href: '/downloads/v2/Tamkinly-7-Day-Identity-Reset.pdf', available: true, size: '5.6 MB' },
    category: 'Planner Files',
  },
  'PLANNER-DIGITAL': {
    resourceId: 'PLANNER-DIGITAL',
    titleFallback: { ar: 'مخطط إعادة صياغة الهوية — النسخة الرقمية التفاعلية', en: 'Identity Recode Planner — Digital Interactive Edition' },
    ar: { href: '/downloads/v2/Identity-Recode-Planner-Digital-Interactive.pdf', available: true, size: '19.9 MB' },
    en: { href: '/downloads/v2/Identity-Recode-Planner-Digital-Interactive.pdf', available: true, size: '19.9 MB' },
    category: 'Planner Files',
  },
  'PLANNER-PRINT': {
    resourceId: 'PLANNER-PRINT',
    titleFallback: { ar: 'مخطط إعادة صياغة الهوية — نسخة الطباعة عالية الدقة', en: 'Identity Recode Planner — Print-Ready Edition' },
    ar: { href: '/downloads/v2/Identity-Recode-Planner-Print-Ready-HighRes.pdf', available: true, size: '52.7 MB' },
    en: { href: '/downloads/v2/Identity-Recode-Planner-Print-Ready-HighRes.pdf', available: true, size: '52.7 MB' },
    category: 'Planner Files',
  },
  'RECOVERY-TOOLKIT-EN': {
    resourceId: 'RECOVERY-TOOLKIT-EN',
    titleFallback: { ar: 'عددة التعافي — 11 ورقة عمل عملية', en: 'Recovery Toolkit — 11 Practical Worksheets' },
    ar: { href: '/downloads/v2/Tamkinly-Recovery-Toolkit-EN.pdf', available: true, size: '5.0 MB' },
    en: { href: '/downloads/v2/Tamkinly-Recovery-Toolkit-EN.pdf', available: true, size: '5.0 MB' },
    category: 'Free Attachment',
  },
  'EXECUTIVE-MANUAL': {
    resourceId: 'EXECUTIVE-MANUAL',
    titleFallback: { ar: 'الدليل التنفيذي', en: 'Executive Manual' },
    ar: { href: '/Executive-Manual.pdf', available: true, size: '74 KB' },
    en: { href: '/Executive-Manual.pdf', available: true, size: '74 KB' },
    category: 'Planner Files',
  },
  'ACTION-LIST': {
    resourceId: 'ACTION-LIST',
    titleFallback: { ar: 'قائمة العمل — حوّل يومك إلى دليل', en: 'Action List — Turn Today Into Evidence' },
    ar: { href: '/downloads/v2/Tamkinly-Action-List.pdf', available: true, size: '0.6 MB' },
    en: { href: '/downloads/v2/Tamkinly-Action-List.pdf', available: true, size: '0.6 MB' },
    category: 'Free Attachment',
  },
  'IDENTITY-BASELINE': {
    resourceId: 'IDENTITY-BASELINE',
    titleFallback: { ar: 'ورقة عمل خط الأساس', en: 'Identity Baseline Worksheet' },
    ar: { href: '/Identity-Baseline-Worksheet.pdf', available: true, size: '75 KB' },
    en: { href: '/Identity-Baseline-Worksheet.pdf', available: true, size: '75 KB' },
    category: 'Planner Files',
  },
  'ENVIRONMENTAL-AUDIT': {
    resourceId: 'ENVIRONMENTAL-AUDIT',
    titleFallback: { ar: 'التدقيق البيئي', en: 'Environmental Audit' },
    ar: { href: '/Environmental-Audit.pdf', available: true, size: '62 KB' },
    en: { href: '/Environmental-Audit.pdf', available: true, size: '62 KB' },
    category: 'Planner Files',
  },
  'DECISION-PATTERN': {
    resourceId: 'DECISION-PATTERN',
    titleFallback: { ar: 'تحليل أنماط القرار', en: 'Decision Pattern Analysis' },
    ar: { href: '/Decision-Pattern-Analysis.pdf', available: true, size: '58 KB' },
    en: { href: '/Decision-Pattern-Analysis.pdf', available: true, size: '58 KB' },
    category: 'Planner Files',
  },
  'EVIDENCE-TRACKING': {
    resourceId: 'EVIDENCE-TRACKING',
    titleFallback: { ar: 'نظام تتبع الأدلة', en: 'Evidence Tracking System' },
    ar: { href: '/Evidence-Tracking-System.pdf', available: true, size: '60 KB' },
    en: { href: '/Evidence-Tracking-System.pdf', available: true, size: '60 KB' },
    category: 'Planner Files',
  },
  'PROGRESS-DASHBOARD': {
    resourceId: 'PROGRESS-DASHBOARD',
    titleFallback: { ar: 'دليل لوحة التقدم', en: 'Progress Dashboard Guide' },
    ar: { href: '/Progress-Dashboard-Guide.pdf', available: true, size: '58 KB' },
    en: { href: '/Progress-Dashboard-Guide.pdf', available: true, size: '58 KB' },
    category: 'Planner Files',
  },
  // Identity Reset Checklist — founder directive 2026-10-22: part of the Planner
  // package ($9.99 one-time, PREMIUM tier). Weekly-cycle tool: define one specific
  // identity, grow into it for a focused week, Failure Recovery Protocol page for
  // setbacks; printable file the owner can reprint and rerun indefinitely.
  // Task 71: v2 founder file (official Names Register #6) — served via the GATED
  // page /downloads/planner (not the public page).
  'IDENTITY-RESET-CHECKLIST': {
    resourceId: 'IDENTITY-RESET-CHECKLIST',
    titleFallback: { ar: 'قائمة إعادة ضبط الهوية', en: 'Identity Reset Checklist' },
    ar: { href: '/downloads/v2/Tamkinly-Identity-Reset-Checklist.pdf', available: false },
    en: { href: '/downloads/v2/Tamkinly-Identity-Reset-Checklist.pdf', available: true, size: '1.7 MB' },
    category: 'Planner Files',
  },
};

/**
 * Get a bilingual file by its key
 */
export function getBilingualFile(key: string): BilingualFile | undefined {
  return BILINGUAL_FILES[key];
}

/**
 * Get the file path for a specific language
 */
export function getFileForLanguage(key: string, lang: 'ar' | 'en'): string | undefined {
  const file = BILINGUAL_FILES[key];
  if (!file) return undefined;
  return file[lang].available ? file[lang].href : undefined;
}

/**
 * Check if a file is available in a specific language
 */
export function isFileAvailable(key: string, lang: 'ar' | 'en'): boolean {
  const file = BILINGUAL_FILES[key];
  return file ? file[lang].available : false;
}

/**
 * Check if a file is available in ANY language
 */
export function isFileAvailableAny(key: string): boolean {
  const file = BILINGUAL_FILES[key];
  return file ? (file.ar.available || file.en.available) : false;
}
