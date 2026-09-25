/**
 * Porn Recovery Assets Registry — برنامج التعافي من الإباحية
 * 
 * المصدر الوحيد للحقيقة لأصول التعافي من الإباحية
 * 
 * CRITICAL: This registry contains ONLY Porn Recovery assets.
 * TRC assets live in trc-assets.ts
 * NO cross-domain references are allowed.
 */

export type PornRecoveryStage = 'learn' | 'recovery' | 'reconstruct' | 'maintain';
export type PornRecoveryAssetType = 'interactive' | 'worksheet' | 'psychoeducation' | 'workbook' | 'crisis' | 'tool' | 'downloadable';
export type PornRecoveryAssetStatus = 'planned' | 'specification' | 'in-progress' | 'clinical-review' | 'live' | 'deprecated';

export interface PornRecoveryDownloadableRef {
  id: string;
  labelAr: string;
  labelEn: string;
  type: 'pdf' | 'worksheet' | 'card' | 'audio';
  status: 'planned' | 'in-progress' | 'built';
  /** Path relative to /downloads/porn-recovery/ */
  path: string;
}

export interface PornRecoveryAsset {
  id: string;
  labelAr: string;
  labelEn: string;
  type: PornRecoveryAssetType;
  status: PornRecoveryAssetStatus;
  descriptionAr: string;
  descriptionEn: string;
  route: string;
  stage: PornRecoveryStage;
  /** Porn Recovery-only related assets — NO TRC references allowed */
  relatedAssets: string[];
  relatedWorksheets: string[];
  relatedArticles: string[];
  icon: string;
  /** Next step in the Porn Recovery Path — Porn Recovery assets only */
  nextStep?: string;
  downloadables: PornRecoveryDownloadableRef[];
  translations: 'none' | 'partial' | 'complete';
  lineCount?: number;
  componentCount?: number;
}

/**
 * Porn Recovery Path — the official therapeutic sequence
 * Learn: Recognition → Understanding → Reframing
 * Recovery: Framework → Tools → Emergency
 * Reconstruct: Relapse → Identity
 * Maintain: Future Self → CTA
 */
export const PORN_RECOVERY_PATH = [
  'recovery-hero',
  'recovery-recognition',
  'recovery-brain',
  'recovery-failed-attempts',
  'recovery-framework',
  'recovery-toolkit',
  'recovery-relapse',
  'recovery-identity',
  'recovery-future-self',
  'recovery-cta',
] as const;

export const PORN_RECOVERY_ASSETS: PornRecoveryAsset[] = [
  // ============================================
  // LIVE — Interactive Page Sections
  // ============================================

  {
    id: 'recovery-page',
    labelAr: 'رحلة التعافي من الإباحية',
    labelEn: 'Porn Recovery Journey',
    type: 'interactive',
    status: 'live',
    descriptionAr: 'صفحة واحدة شاملة تحتوي 11 قسماً تغطي رحلة التعافي الكاملة من الإباحية.',
    descriptionEn: 'A comprehensive single-page experience with 11 sections covering the full porn recovery journey.',
    route: '/recovery/porn-recovery',
    stage: 'learn',
    relatedAssets: ['recovery-hero', 'recovery-recognition', 'recovery-brain', 'recovery-framework', 'recovery-toolkit'],
    relatedWorksheets: ['urge-log', 'relapse-analysis', 'recovery-planning'],
    relatedArticles: [],
    icon: 'Heart',
    nextStep: 'recovery-hero',
    downloadables: [],
    translations: 'complete',
    lineCount: 3291,
    componentCount: 12
  },

  {
    id: 'recovery-hero',
    labelAr: 'مدخل رحلة التعافي',
    labelEn: 'Recovery Hero Entry',
    type: 'interactive',
    status: 'live',
    descriptionAr: 'قسم التعريف برحلة التعافي — فهم ما يحدث داخل عقلك.',
    descriptionEn: 'The recovery journey introduction — understand what is happening inside your brain.',
    route: '/recovery/porn-recovery#hero',
    stage: 'learn',
    relatedAssets: ['recovery-recognition', 'recovery-brain'],
    relatedWorksheets: [],
    relatedArticles: [],
    icon: 'Sparkles',
    nextStep: 'recovery-recognition',
    downloadables: [],
    translations: 'complete',
    lineCount: 96
  },

  {
    id: 'recovery-recognition',
    labelAr: 'الاعتراف',
    labelEn: 'Recognition',
    type: 'interactive',
    status: 'live',
    descriptionAr: 'قسم الاعتراف الذاتي — الخطوة الأولى في التعافي.',
    descriptionEn: 'Self-recognition section — the first step in recovery.',
    route: '/recovery/porn-recovery#recognition',
    stage: 'learn',
    relatedAssets: ['recovery-brain', 'recovery-failed-attempts'],
    relatedWorksheets: [],
    relatedArticles: [],
    icon: 'Eye',
    nextStep: 'recovery-brain',
    downloadables: [],
    translations: 'complete',
    lineCount: 138
  },

  {
    id: 'recovery-brain',
    labelAr: 'الدماغ والسلوك',
    labelEn: 'Brain & Behavior',
    type: 'psychoeducation',
    status: 'live',
    descriptionAr: 'تثقيف نفسي عن دور الدماغ واللدونة العصبية في السلوك القهري.',
    descriptionEn: 'Psychoeducation about the brain\'s role and neuroplasticity in compulsive behavior.',
    route: '/recovery/porn-recovery#brain',
    stage: 'learn',
    relatedAssets: ['recovery-framework', 'recovery-failed-attempts'],
    relatedWorksheets: [],
    relatedArticles: [],
    icon: 'Brain',
    nextStep: 'recovery-failed-attempts',
    downloadables: [
      {
        id: 'rec-05-pattern-recognition',
        labelAr: 'التعرف على الأنماط السلوكية',
        labelEn: 'Pattern Recognition',
        type: 'pdf',
        status: 'built',
        path: 'REC-05-Pattern-Recognition.pdf'
      },
      {
        id: 'rec-05-pattern-recognition-en',
        labelAr: 'التعرف على الأنماط السلوكية (إنجليزي)',
        labelEn: 'Pattern Recognition (English)',
        type: 'pdf',
        status: 'built',
        path: 'REC-05-Pattern-Recognition-EN.pdf'
      }
    ],
    translations: 'complete',
    lineCount: 224
  },

  {
    id: 'recovery-failed-attempts',
    labelAr: 'إعادة تأطير المحاولات الفاشلة',
    labelEn: 'Reframing Failed Attempts',
    type: 'interactive',
    status: 'live',
    descriptionAr: 'إعادة التأطير المعرفي للمحاولات الفاشلة — ليست فشلاً بل خطوات في الطريق.',
    descriptionEn: 'Cognitive reframing of failed attempts — not failures but steps along the way.',
    route: '/recovery/porn-recovery#failed-attempts',
    stage: 'learn',
    relatedAssets: ['recovery-framework'],
    relatedWorksheets: [],
    relatedArticles: [],
    icon: 'RefreshCw',
    nextStep: 'recovery-framework',
    downloadables: [
      {
        id: 'rec-06-recovery-loop-map',
        labelAr: 'خريطة حلقة التعافي',
        labelEn: 'Recovery Loop Map',
        type: 'pdf',
        status: 'built',
        path: 'REC-06-Recovery-Loop-Map.pdf'
      },
      {
        id: 'rec-06-recovery-loop-map-en',
        labelAr: 'خريطة حلقة التعافي (إنجليزي)',
        labelEn: 'Recovery Loop Map (English)',
        type: 'pdf',
        status: 'built',
        path: 'REC-06-Recovery-Loop-Map-EN.pdf'
      },
      {
        id: 'rec-07-reframe',
        labelAr: 'إعادة التأطير',
        labelEn: 'Reframe',
        type: 'pdf',
        status: 'built',
        path: 'REC-07-Reframe.pdf'
      },
      {
        id: 'rec-07-reframe-en',
        labelAr: 'إعادة التأطير (إنجليزي)',
        labelEn: 'Reframe (English)',
        type: 'pdf',
        status: 'built',
        path: 'REC-07-Reframe-EN.pdf'
      }
    ],
    translations: 'complete',
    lineCount: 215
  },

  {
    id: 'recovery-framework',
    labelAr: 'الإطار المرحلي',
    labelEn: 'Stage Framework',
    type: 'interactive',
    status: 'live',
    descriptionAr: 'الإطار المرحلي للتعافي — أربع مراحل من الوعي إلى النمو.',
    descriptionEn: 'The recovery stage framework — four stages from awareness to growth.',
    route: '/recovery/porn-recovery#framework',
    stage: 'recovery',
    relatedAssets: ['recovery-toolkit'],
    relatedWorksheets: [],
    relatedArticles: [],
    icon: 'LayoutGrid',
    nextStep: 'recovery-toolkit',
    downloadables: [
      {
        id: 'rec-04-recovery-review',
        labelAr: 'مراجعة التعافي',
        labelEn: 'Recovery Review',
        type: 'pdf',
        status: 'built',
        path: 'REC-04-Recovery-Review.pdf'
      },
      {
        id: 'rec-04-recovery-review-en',
        labelAr: 'مراجعة التعافي (إنجليزي)',
        labelEn: 'Recovery Review (English)',
        type: 'pdf',
        status: 'built',
        path: 'REC-04-Recovery-Review-EN.pdf'
      },
      {
        id: 'rec-08-stage-assessment',
        labelAr: 'تقييم المرحلة',
        labelEn: 'Stage Assessment',
        type: 'pdf',
        status: 'built',
        path: 'REC-08-Stage-Assessment.pdf'
      },
      {
        id: 'rec-08-stage-assessment-en',
        labelAr: 'تقييم المرحلة (إنجليزي)',
        labelEn: 'Stage Assessment (English)',
        type: 'pdf',
        status: 'built',
        path: 'REC-08-Stage-Assessment-EN.pdf'
      }
    ],
    translations: 'complete',
    lineCount: 190
  },

  {
    id: 'recovery-toolkit',
    labelAr: 'أدوات التعافي',
    labelEn: 'Recovery Toolkit',
    type: 'tool',
    status: 'live',
    descriptionAr: 'أدوات عملية: HALT، سجل الرغبات، خطة الطوارئ — مع ملفات PDF قابلة للتنزيل.',
    descriptionEn: 'Practical tools: HALT check, Trigger Journal, Emergency Plan — with downloadable PDFs.',
    route: '/recovery/porn-recovery#toolkit',
    stage: 'recovery',
    relatedAssets: ['recovery-relapse'],
    relatedWorksheets: ['urge-log', 'recovery-planning'],
    relatedArticles: [],
    icon: 'Wrench',
    nextStep: 'recovery-relapse',
    downloadables: [
      {
        id: 'rec-01-halt',
        labelAr: 'ورقة عمل HALT',
        labelEn: 'HALT Worksheet',
        type: 'pdf',
        status: 'built',
        path: 'REC-01-HALT-Worksheet.pdf'
      },
      {
        id: 'rec-01-halt-en',
        labelAr: 'ورقة عمل HALT (إنجليزي)',
        labelEn: 'HALT Worksheet (English)',
        type: 'pdf',
        status: 'built',
        path: 'REC-01-HALT-Worksheet-EN.pdf'
      },
      {
        id: 'rec-02-trigger-journal',
        labelAr: 'سجل الرغبات',
        labelEn: 'Trigger Journal',
        type: 'pdf',
        status: 'built',
        path: 'REC-02-Trigger-Journal.pdf'
      },
      {
        id: 'rec-02-trigger-journal-en',
        labelAr: 'سجل الرغبات (إنجليزي)',
        labelEn: 'Trigger Journal (English)',
        type: 'pdf',
        status: 'built',
        path: 'REC-02-Trigger-Journal-EN.pdf'
      },
      {
        id: 'rec-03-emergency-plan',
        labelAr: 'خطة الطوارئ',
        labelEn: 'Emergency Plan',
        type: 'pdf',
        status: 'built',
        path: 'REC-03-Emergency-Plan.pdf'
      },
      {
        id: 'rec-03-emergency-plan-en',
        labelAr: 'خطة الطوارئ (إنجليزي)',
        labelEn: 'Emergency Plan (English)',
        type: 'pdf',
        status: 'built',
        path: 'REC-03-Emergency-Plan-EN.pdf'
      }
    ],
    translations: 'complete',
    lineCount: 311
  },

  {
    id: 'recovery-relapse',
    labelAr: 'التعامل مع الانتكاس',
    labelEn: 'Dealing with Relapse',
    type: 'interactive',
    status: 'live',
    descriptionAr: 'ثلاثة سيناريوهات تفاعلية للتعامل مع الانتكاس.',
    descriptionEn: 'Three interactive scenarios for dealing with relapse.',
    route: '/recovery/porn-recovery#relapse',
    stage: 'reconstruct',
    relatedAssets: ['recovery-identity'],
    relatedWorksheets: ['relapse-analysis'],
    relatedArticles: [],
    icon: 'RotateCcw',
    nextStep: 'recovery-identity',
    downloadables: [
      {
        id: 'rec-09-relapse-scenario',
        labelAr: 'مراجعة سيناريو الانتكاس',
        labelEn: 'Relapse Scenario Review',
        type: 'pdf',
        status: 'built',
        path: 'REC-09-Relapse-Scenario-Review.pdf'
      },
      {
        id: 'rec-09-relapse-scenario-en',
        labelAr: 'مراجعة سيناريو الانتكاس (إنجليزي)',
        labelEn: 'Relapse Scenario Review (English)',
        type: 'pdf',
        status: 'built',
        path: 'REC-09-Relapse-Scenario-Review-EN.pdf'
      }
    ],
    translations: 'complete',
    lineCount: 267
  },

  {
    id: 'recovery-identity',
    labelAr: 'إعادة بناء الهوية',
    labelEn: 'Identity Reconstruction',
    type: 'interactive',
    status: 'live',
    descriptionAr: 'قسم إعادة بناء الهوية — 4 بطاقات هوية ثابتة.',
    descriptionEn: 'Identity reconstruction section — 4 static identity cards.',
    route: '/recovery/porn-recovery#identity',
    stage: 'reconstruct',
    relatedAssets: ['recovery-future-self'],
    relatedWorksheets: [],
    relatedArticles: [],
    icon: 'User',
    nextStep: 'recovery-future-self',
    downloadables: [
      {
        id: 'rec-10-identity-cards',
        labelAr: 'بطاقات الهوية',
        labelEn: 'Identity Cards',
        type: 'pdf',
        status: 'built',
        path: 'REC-10-Identity-Cards.pdf'
      },
      {
        id: 'rec-10-identity-cards-en',
        labelAr: 'بطاقات الهوية (إنجليزي)',
        labelEn: 'Identity Cards (English)',
        type: 'pdf',
        status: 'built',
        path: 'REC-10-Identity-Cards-EN.pdf'
      }
    ],
    translations: 'complete',
    lineCount: 161
  },

  {
    id: 'recovery-future-self',
    labelAr: 'الذات المستقبلية',
    labelEn: 'Future Self',
    type: 'interactive',
    status: 'live',
    descriptionAr: 'رسالة الذات المستقبلية — 4 هويات مستقبلية.',
    descriptionEn: 'Future Self letter — 4 future identities.',
    route: '/recovery/porn-recovery#future-self',
    stage: 'maintain',
    relatedAssets: ['recovery-cta'],
    relatedWorksheets: [],
    relatedArticles: [],
    icon: 'Sun',
    nextStep: 'recovery-cta',
    downloadables: [
      {
        id: 'rec-11-future-self-letter',
        labelAr: 'رسالة الذات المستقبلية',
        labelEn: 'Future Self Letter',
        type: 'pdf',
        status: 'built',
        path: 'REC-11-Future-Self-Letter.pdf'
      },
      {
        id: 'rec-11-future-self-letter-en',
        labelAr: 'رسالة الذات المستقبلية (إنجليزي)',
        labelEn: 'Future Self Letter (English)',
        type: 'pdf',
        status: 'built',
        path: 'REC-11-Future-Self-Letter-EN.pdf'
      }
    ],
    translations: 'complete',
    lineCount: 172
  },

  {
    id: 'recovery-cta',
    labelAr: 'دعوة للعمل',
    labelEn: 'Call to Action',
    type: 'interactive',
    status: 'live',
    descriptionAr: 'دعوة للعمل — طباعة، مشاركة، تبرع.',
    descriptionEn: 'Call to action — print, share, donate.',
    route: '/recovery/porn-recovery#cta',
    stage: 'maintain',
    relatedAssets: ['recovery-hero'],
    relatedWorksheets: ['recovery-planning'],
    relatedArticles: [],
    icon: 'Heart',
    nextStep: undefined,
    downloadables: [],
    translations: 'complete',
    lineCount: 199
  },

  // ============================================
  // PLANNED — Interactive Worksheets
  // ============================================

  {
    id: 'urge-log',
    labelAr: 'سجل الدوافع',
    labelEn: 'Urge Log',
    type: 'worksheet',
    status: 'planned',
    descriptionAr: 'سجل يومي لتتبع الدوافع والعوامل المحيطة والاستجابات المستخدمة.',
    descriptionEn: 'A daily log for tracking urges, surrounding factors, and responses used.',
    route: '/recovery/porn-recovery/downloads',
    stage: 'recovery',
    relatedAssets: ['recovery-toolkit'],
    relatedWorksheets: ['relapse-analysis'],
    relatedArticles: [],
    icon: 'FileText',
    nextStep: 'relapse-analysis',
    downloadables: [],
    translations: 'none'
  },

  {
    id: 'relapse-analysis',
    labelAr: 'تحليل الانتكاس',
    labelEn: 'Relapse Analysis',
    type: 'worksheet',
    status: 'planned',
    descriptionAr: 'ورقة عمل لتحليل الانتكاسات وفهم الأنماط وبناء استراتيجيات وقائية.',
    descriptionEn: 'A worksheet for analyzing relapses, understanding patterns, and building preventive strategies.',
    route: '/recovery/porn-recovery/downloads',
    stage: 'reconstruct',
    relatedAssets: ['recovery-relapse'],
    relatedWorksheets: ['urge-log'],
    relatedArticles: [],
    icon: 'Search',
    nextStep: 'recovery-planning',
    downloadables: [],
    translations: 'none'
  },

  {
    id: 'recovery-planning',
    labelAr: 'تخطيط التعافي',
    labelEn: 'Recovery Planning',
    type: 'worksheet',
    status: 'planned',
    descriptionAr: 'ورقة عمل لإنشاء خطة تعافي شخصية شاملة مع أهداف قابلة للقياس.',
    descriptionEn: 'A worksheet for creating a comprehensive personal recovery plan with measurable goals.',
    route: '/recovery/porn-recovery/downloads',
    stage: 'maintain',
    relatedAssets: ['recovery-cta'],
    relatedWorksheets: ['urge-log', 'relapse-analysis'],
    relatedArticles: [],
    icon: 'Target',
    nextStep: 'recovery-page',
    downloadables: [],
    translations: 'none'
  },

  // ============================================
  // DOWNLOADABLE PDFs — All REC-01 through REC-11
  // ============================================

  {
    id: 'rec-downloads',
    labelAr: 'ملفات التعافي القابلة للتنزيل',
    labelEn: 'Recovery Downloadable Files',
    type: 'downloadable',
    status: 'live',
    descriptionAr: '11 ملف PDF قابل للتنزيل يغطي جميع مراحل التعافي — بالعربية والإنجليزية.',
    descriptionEn: '11 downloadable PDF files covering all recovery stages — in Arabic and English.',
    route: '/recovery/porn-recovery#toolkit',
    stage: 'recovery',
    relatedAssets: ['recovery-toolkit'],
    relatedWorksheets: [],
    relatedArticles: [],
    icon: 'Download',
    downloadables: [
      { id: 'rec-01', labelAr: 'ورقة عمل HALT', labelEn: 'HALT Worksheet', type: 'pdf', status: 'built', path: 'REC-01-HALT-Worksheet.pdf' },
      { id: 'rec-01-en', labelAr: 'HALT Worksheet (EN)', labelEn: 'HALT Worksheet (EN)', type: 'pdf', status: 'built', path: 'REC-01-HALT-Worksheet-EN.pdf' },
      { id: 'rec-02', labelAr: 'سجل الرغبات', labelEn: 'Trigger Journal', type: 'pdf', status: 'built', path: 'REC-02-Trigger-Journal.pdf' },
      { id: 'rec-02-en', labelAr: 'Trigger Journal (EN)', labelEn: 'Trigger Journal (EN)', type: 'pdf', status: 'built', path: 'REC-02-Trigger-Journal-EN.pdf' },
      { id: 'rec-03', labelAr: 'خطة الطوارئ', labelEn: 'Emergency Plan', type: 'pdf', status: 'built', path: 'REC-03-Emergency-Plan.pdf' },
      { id: 'rec-03-en', labelAr: 'Emergency Plan (EN)', labelEn: 'Emergency Plan (EN)', type: 'pdf', status: 'built', path: 'REC-03-Emergency-Plan-EN.pdf' },
      { id: 'rec-04', labelAr: 'مراجعة التعافي', labelEn: 'Recovery Review', type: 'pdf', status: 'built', path: 'REC-04-Recovery-Review.pdf' },
      { id: 'rec-04-en', labelAr: 'Recovery Review (EN)', labelEn: 'Recovery Review (EN)', type: 'pdf', status: 'built', path: 'REC-04-Recovery-Review-EN.pdf' },
      { id: 'rec-05', labelAr: 'التعرف على الأنماط', labelEn: 'Pattern Recognition', type: 'pdf', status: 'built', path: 'REC-05-Pattern-Recognition.pdf' },
      { id: 'rec-05-en', labelAr: 'Pattern Recognition (EN)', labelEn: 'Pattern Recognition (EN)', type: 'pdf', status: 'built', path: 'REC-05-Pattern-Recognition-EN.pdf' },
      { id: 'rec-06', labelAr: 'خريطة حلقة التعافي', labelEn: 'Recovery Loop Map', type: 'pdf', status: 'built', path: 'REC-06-Recovery-Loop-Map.pdf' },
      { id: 'rec-06-en', labelAr: 'Recovery Loop Map (EN)', labelEn: 'Recovery Loop Map (EN)', type: 'pdf', status: 'built', path: 'REC-06-Recovery-Loop-Map-EN.pdf' },
      { id: 'rec-07', labelAr: 'إعادة التأطير', labelEn: 'Reframe', type: 'pdf', status: 'built', path: 'REC-07-Reframe.pdf' },
      { id: 'rec-07-en', labelAr: 'Reframe (EN)', labelEn: 'Reframe (EN)', type: 'pdf', status: 'built', path: 'REC-07-Reframe-EN.pdf' },
      { id: 'rec-08', labelAr: 'تقييم المرحلة', labelEn: 'Stage Assessment', type: 'pdf', status: 'built', path: 'REC-08-Stage-Assessment.pdf' },
      { id: 'rec-08-en', labelAr: 'Stage Assessment (EN)', labelEn: 'Stage Assessment (EN)', type: 'pdf', status: 'built', path: 'REC-08-Stage-Assessment-EN.pdf' },
      { id: 'rec-09', labelAr: 'مراجعة سيناريو الانتكاس', labelEn: 'Relapse Scenario Review', type: 'pdf', status: 'built', path: 'REC-09-Relapse-Scenario-Review.pdf' },
      { id: 'rec-09-en', labelAr: 'Relapse Scenario Review (EN)', labelEn: 'Relapse Scenario Review (EN)', type: 'pdf', status: 'built', path: 'REC-09-Relapse-Scenario-Review-EN.pdf' },
      { id: 'rec-10', labelAr: 'بطاقات الهوية', labelEn: 'Identity Cards', type: 'pdf', status: 'built', path: 'REC-10-Identity-Cards.pdf' },
      { id: 'rec-10-en', labelAr: 'Identity Cards (EN)', labelEn: 'Identity Cards (EN)', type: 'pdf', status: 'built', path: 'REC-10-Identity-Cards-EN.pdf' },
      { id: 'rec-11', labelAr: 'رسالة الذات المستقبلية', labelEn: 'Future Self Letter', type: 'pdf', status: 'built', path: 'REC-11-Future-Self-Letter.pdf' },
      { id: 'rec-11-en', labelAr: 'Future Self Letter (EN)', labelEn: 'Future Self Letter (EN)', type: 'pdf', status: 'built', path: 'REC-11-Future-Self-Letter-EN.pdf' },
    ],
    translations: 'complete',
    lineCount: 0
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getPornRecoveryAssetsByStage(stage: PornRecoveryStage): PornRecoveryAsset[] {
  return PORN_RECOVERY_ASSETS.filter(a => a.stage === stage);
}

export function getPornRecoveryAssetsByStatus(status: PornRecoveryAssetStatus): PornRecoveryAsset[] {
  return PORN_RECOVERY_ASSETS.filter(a => a.status === status);
}

export function getPornRecoveryAssetById(id: string): PornRecoveryAsset | undefined {
  return PORN_RECOVERY_ASSETS.find(a => a.id === id);
}

export function getPornRecoveryPath(): PornRecoveryAsset[] {
  return PORN_RECOVERY_PATH
    .map(id => PORN_RECOVERY_ASSETS.find(a => a.id === id))
    .filter((a): a is PornRecoveryAsset => a !== undefined);
}

export function getPornRecoveryNextStep(assetId: string): PornRecoveryAsset | undefined {
  const asset = getPornRecoveryAssetById(assetId);
  if (!asset?.nextStep) return undefined;
  return getPornRecoveryAssetById(asset.nextStep);
}

export function getPornRecoveryDownloadables(): PornRecoveryDownloadableRef[] {
  return PORN_RECOVERY_ASSETS.flatMap(a => a.downloadables);
}
