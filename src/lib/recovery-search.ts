// Recovery Search Index — bilingual instant search over Recovery-section articles & tools.
// Data-driven: builds the index from the existing journey registries (single source of truth)
// plus a small set of extra guide pages. No backend involved; pure client-side matching.

import {
  PORN_RECOVERY_STEPS,
  TRC_STEPS,
  PORN_RECOVERY_STAGES,
  TRC_STAGES,
} from '@/lib/recovery-journey';

export interface RecoverySearchItem {
  id: string;
  program: 'trc' | 'pr' | 'guide';
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  stageLabelAr: string;
  stageLabelEn: string;
  minutes: number | null;
  href: string;
  tagsAr: string[];
  tagsEn: string[];
}

// Extra TRC content pages that are not journey steps but are real articles.
const TRC_GUIDE_EXTRAS: RecoverySearchItem[] = [
  {
    id: 'guide-grounding',
    program: 'guide',
    titleAr: 'دليل التأريض الموسع',
    titleEn: 'Grounding Guide',
    descAr: 'دليل موسع لتقنية التأريض 5-4-3-2-1: متى تستخدمها، وكيف تمارسها خطوة بخطوة.',
    descEn: 'An expanded guide to the 5-4-3-2-1 grounding technique: when to use it and how to practice it step by step.',
    stageLabelAr: 'دليل',
    stageLabelEn: 'Guide',
    minutes: null,
    href: '/recovery/trc/grounding-guide',
    tagsAr: ['تأريض', 'حواس', 'استقرار'],
    tagsEn: ['grounding', 'senses', 'stabilization'],
  },
  {
    id: 'guide-regulation',
    program: 'guide',
    titleAr: 'دليل التنظيم العصبي',
    titleEn: 'Regulation Guide',
    descAr: 'دليل موسع لفهم الجهاز العصبي بعد الصدمة، وأدوات تنظيم الاستثارة اليومية.',
    descEn: 'An expanded guide to understanding the nervous system after trauma, and daily arousal-regulation tools.',
    stageLabelAr: 'دليل',
    stageLabelEn: 'Guide',
    minutes: null,
    href: '/recovery/trc/regulation-guide',
    tagsAr: ['تنظيم', 'جهاز عصبي', 'استثارة'],
    tagsEn: ['regulation', 'nervous system', 'arousal'],
  },
  {
    id: 'guide-secondary-trauma',
    program: 'guide',
    titleAr: 'الصدمة الثانوية',
    titleEn: 'Secondary Trauma',
    descAr: 'كيف تؤثر صدمة الآخرين علينا: العلامات المبكرة وطرق التعافي للمساندين والقريبين.',
    descEn: 'How others\u2019 trauma affects us: early signs and recovery approaches for supporters and relatives.',
    stageLabelAr: 'دليل',
    stageLabelEn: 'Guide',
    minutes: null,
    href: '/recovery/trc/secondary-trauma',
    tagsAr: ['صدمة ثانوية', 'مساندين', 'علامات'],
    tagsEn: ['secondary trauma', 'supporters', 'signs'],
  },
];

function stageLabelTrc(stageId: string): { ar: string; en: string } {
  const st = TRC_STAGES.find((s) => s.id === stageId);
  return { ar: st?.labelAr ?? '', en: st?.labelEn ?? '' };
}
function stageLabelPr(stageId: string): { ar: string; en: string } {
  const st = PORN_RECOVERY_STAGES.find((s) => s.id === stageId);
  return { ar: st?.labelAr ?? '', en: st?.labelEn ?? '' };
}

/** Full index, built once at module load from the registries. */
export const RECOVERY_SEARCH_INDEX: RecoverySearchItem[] = [
  // TRC journey steps (only available ones — every entry must be a working route)
  ...TRC_STEPS.filter((s) => s.isAvailable).map<RecoverySearchItem>((s) => {
    const label = stageLabelTrc(s.stage);
    return {
      id: `trc-${s.id}`,
      program: 'trc',
      titleAr: s.labelAr,
      titleEn: s.labelEn,
      descAr: s.descriptionAr,
      descEn: s.descriptionEn,
      stageLabelAr: label.ar,
      stageLabelEn: label.en,
      minutes: s.estimatedMinutes,
      href: s.route,
      tagsAr: s.sectionType === 'therapeutic' ? ['علاجي'] : [],
      tagsEn: s.sectionType === 'therapeutic' ? ['therapeutic'] : [],
    };
  }),
  // PR journey steps
  ...PORN_RECOVERY_STEPS.map<RecoverySearchItem>((s) => {
    const label = stageLabelPr(s.stage);
    return {
      id: `pr-${s.id}`,
      program: 'pr',
      titleAr: s.labelAr,
      titleEn: s.labelEn,
      descAr: s.descriptionAr,
      descEn: s.descriptionEn,
      stageLabelAr: label.ar,
      stageLabelEn: label.en,
      minutes: s.estimatedMinutes,
      href: `${s.route}#${s.anchorId}`,
      tagsAr: s.isInteractive ? ['تفاعلي'] : [],
      tagsEn: s.isInteractive ? ['interactive'] : [],
    };
  }),
  // Extra guides
  ...TRC_GUIDE_EXTRAS,
];

/** Normalize Arabic text: strip diacritics/tatweel, unify letter forms, lowercase. */
export function normalizeArabic(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim();
}

function haystackOf(item: RecoverySearchItem): string {
  return normalizeArabic(
    [
      item.titleAr,
      item.titleEn,
      item.descAr,
      item.descEn,
      item.stageLabelAr,
      item.stageLabelEn,
      ...item.tagsAr,
      ...item.tagsEn,
    ].join(' '),
  );
}

const HAYSTACKS: Array<{ item: RecoverySearchItem; hay: string }> = RECOVERY_SEARCH_INDEX.map(
  (item) => ({ item, hay: haystackOf(item) }),
);

/**
 * Search recovery content. All query tokens must match (AND).
 * Arabic article handling: each token also matches without its definite article
 * (e.g. "التنفس" matches "تنفس A52 القتالي").
 * Results ranked: title matches first, then tag matches, then description matches.
 */
export function searchRecoveryContent(query: string, locale: 'ar' | 'en'): RecoverySearchItem[] {
  const q = normalizeArabic(query);
  if (!q) return [];
  const rawTokens = q.split(' ').filter(Boolean);
  if (rawTokens.length === 0) return [];

  // Variants per token: as typed + article-stripped forms.
  const tokenVariants: string[][] = rawTokens.map((t) => {
    if (t.length > 3 && t.startsWith('ال')) return [t, t.slice(2)];
    if (t.length > 4 && t.startsWith('وال')) return [t, t.slice(3)];
    return [t];
  });

  const matches: Array<{ item: RecoverySearchItem; score: number }> = [];
  for (const { item, hay } of HAYSTACKS) {
    if (!tokenVariants.every((vs) => vs.some((v) => hay.includes(v)))) continue;
    const title = normalizeArabic(locale === 'ar' ? item.titleAr : item.titleEn);
    const titleOther = normalizeArabic(locale === 'ar' ? item.titleEn : item.titleAr);
    let score = 0;
    if (tokenVariants.some((vs) => vs.some((v) => title.startsWith(v)))) score += 4;
    else if (tokenVariants.some((vs) => vs.some((v) => title.includes(v)))) score += 3;
    else if (tokenVariants.some((vs) => vs.some((v) => titleOther.includes(v)))) score += 2;
    else score += 1;
    matches.push({ item, score });
  }

  matches.sort((a, b) => b.score - a.score);
  return matches.map((m) => m.item);
}
