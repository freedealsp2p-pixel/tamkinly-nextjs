/**
 * TRC Assets Registry — Trauma Recovery Center
 * 
 * المصدر الوحيد للحقيقة لأصول التعافي من الصدمات
 * 
 * CRITICAL: This registry contains ONLY TRC assets.
 * Porn Recovery assets live in porn-recovery-assets.ts
 * NO cross-domain references are allowed.
 */

export type TrcAssetType = 'interactive' | 'worksheet' | 'psychoeducation' | 'tool';
export type TrcAssetStatus = 'planned' | 'specification' | 'in-progress' | 'clinical-review' | 'live' | 'deprecated';
export type TrcSafetyLevel = 'low' | 'moderate' | 'higher';
export type TrcStage = 'safety' | 'regulation' | 'recovery';

export interface TrcDownloadableRef {
  id: string;
  labelAr: string;
  labelEn: string;
  type: 'pdf' | 'worksheet' | 'card' | 'audio' | 'guide' | 'plan' | 'journal' | 'reference' | 'companion';
  status: 'planned' | 'in-production' | 'clinical-review' | 'ready' | 'built';
  /** Path relative to /downloads/trc/ */
  path?: string;
  /** ID of the parent digital tool this companion belongs to */
  parentToolId: string;
  /** Companion classification — determines production template */
  companionType: 'PRINTABLE_CARD' | 'WORKSHEET' | 'GUIDE' | 'PLAN' | 'JOURNAL' | 'REFERENCE' | 'COMPANION';
  /** Target page count for this companion */
  pageCount?: number;
  /** Canonical filename on disk */
  filename?: string;
}

export interface TrcAsset {
  id: string;
  labelAr: string;
  labelEn: string;
  type: TrcAssetType;
  status: TrcAssetStatus;
  descriptionAr: string;
  descriptionEn: string;
  route: string;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  /** TRC-only related assets — NO Porn Recovery references allowed */
  relatedAssets: string[];
  relatedWorksheets: string[];
  relatedArticles: string[];
  clinicalReference?: string;
  icon: string;
  requiresAudio?: boolean;
  requiresTimer?: boolean;
  stage: TrcStage;
  sectionType?: 'therapeutic' | 'standard';
  /** Next step in the TRC Safety/Regulation Path — TRC assets only */
  nextStep?: string;
  downloadables: TrcDownloadableRef[];
  translations: 'none' | 'partial' | 'complete';
  contraindications: string[];
  safetyLevel: TrcSafetyLevel;
  lineCount?: number;
  componentCount?: number;
}

/**
 * TRC Safety Path — the official therapeutic sequence
 * Safety Layer: Grounding → A52 → Safe Place → Body Scan
 * Regulation Layer: Trigger Mapping → Safety Plan
 */
export const TRC_SAFETY_PATH = ['grounding-54321', 'a52', 'safe-place', 'body-scan'] as const;
export const TRC_REGULATION_PATH = ['trigger-mapping', 'safety-plan'] as const;

export const TRC_ASSETS: TrcAsset[] = [
  // ============================================
  // SAFETY LAYER — Interactive Tools
  // ============================================

  {
    id: 'grounding-54321',
    labelAr: 'تأريض 5-4-3-2-1',
    labelEn: '5-4-3-2-1 Grounding',
    type: 'interactive',
    status: 'live',
    descriptionAr: 'تقنية الارتكاز بالحواس الخمس (5-4-3-2-1) للتدخل الفوري عند نشاط أعراض الصدمة.',
    descriptionEn: '5-4-3-2-1 sensory grounding technique for immediate intervention during trauma symptom activation.',
    route: '/recovery/trc/grounding',
    duration: '3-5 minutes',
    difficulty: 'beginner',
    relatedAssets: ['a52', 'safe-place', 'body-scan'],
    relatedWorksheets: ['trigger-mapping'],
    relatedArticles: ['what-trauma-does-to-the-body'],
    clinicalReference: 'DBT Distress Tolerance / 5-4-3-2-1 Sensory Grounding',
    icon: 'Compass',
    requiresAudio: false,
    requiresTimer: false,
    stage: 'safety',
    sectionType: 'therapeutic',
    nextStep: 'a52',
    downloadables: [
      {
        id: 'grounding-pocket-card',
        labelAr: 'بطاقة التأريض الجيبية',
        labelEn: 'Grounding Pocket Card',
        type: 'card',
        status: 'built',
        path: 'TRC-Grounding-54321-AR.html',
        parentToolId: 'grounding-54321',
        companionType: 'PRINTABLE_CARD',
        pageCount: 2,
        filename: 'TRC-Grounding-54321-AR.html'
      },
      {
        id: 'grounding-pocket-card-en',
        labelAr: 'بطاقة التأريض الجيبية (إنجليزي)',
        labelEn: 'Grounding Pocket Card (English)',
        type: 'card',
        status: 'built',
        path: 'TRC-Grounding-54321-EN.html',
        parentToolId: 'grounding-54321',
        companionType: 'PRINTABLE_CARD',
        pageCount: 2,
        filename: 'TRC-Grounding-54321-EN.html'
      }
    ],
    translations: 'complete',
    contraindications: ['نوبة هلع نشطة', 'تفارق شديد'],
    safetyLevel: 'moderate'
  },

  {
    id: 'a52',
    labelAr: 'تنفس A52 (5-2)',
    labelEn: 'A52 Breathing (5-2)',
    type: 'interactive',
    status: 'clinical-review',
    descriptionAr: 'تقنية تنفس علاجية للتنظيم الذاتي السريع خلال التوتر الحاد.',
    descriptionEn: 'A therapeutic breathing technique for rapid autonomic regulation during acute stress.',
    route: '/recovery/trc/a52',
    duration: '3-5 minutes',
    difficulty: 'beginner',
    relatedAssets: ['grounding-54321', 'safe-place', 'body-scan'],
    relatedWorksheets: ['trigger-mapping'],
    relatedArticles: ['what-trauma-does-to-the-body'],
    clinicalReference: 'Porges Polyvagal Theory / Combat Breathing (MAP)',
    icon: 'Wind',
    requiresAudio: false,
    requiresTimer: true,
    stage: 'safety',
    sectionType: 'therapeutic',
    nextStep: 'safe-place',
    downloadables: [
      {
        id: 'a52-breathing-card',
        labelAr: 'بطاقة التنفس A52',
        labelEn: 'A52 Breathing Card',
        type: 'card',
        status: 'clinical-review',
        path: 'TRC-A52-Breathing-AR.html',
        parentToolId: 'a52',
        companionType: 'PRINTABLE_CARD',
        pageCount: 2,
        filename: 'TRC-A52-Breathing-AR.html'
      },
      {
        id: 'a52-breathing-card-en',
        labelAr: 'بطاقة التنفس A52 (إنجليزي)',
        labelEn: 'A52 Breathing Card (English)',
        type: 'card',
        status: 'built',
        path: 'TRC-A52-Breathing-EN.html',
        parentToolId: 'a52',
        companionType: 'PRINTABLE_CARD',
        pageCount: 2,
        filename: 'TRC-A52-Breathing-EN.html'
      }
    ],
    translations: 'partial',
    contraindications: ['COPD/ربو حاد', 'نوبة هلع نشطة', 'تفارق شديد', 'إصابة صدرية حديثة', 'حالات قلبية غير مستقرة'],
    safetyLevel: 'moderate'
  },

  {
    id: 'safe-place',
    labelAr: 'المكان الآمن',
    labelEn: 'Safe Place Visualization',
    type: 'interactive',
    status: 'clinical-review',
    descriptionAr: 'تمرين تخيلي لإنشاء مكان آمن داخلي يمكن الرجوع إليه في أوقات الضيق.',
    descriptionEn: 'A visualization exercise to create an internal safe place to return to during distress.',
    route: '/recovery/trc/safe-place',
    duration: '5-10 minutes',
    difficulty: 'beginner',
    relatedAssets: ['grounding-54321', 'a52', 'body-scan'],
    relatedWorksheets: ['safety-plan'],
    relatedArticles: ['what-trauma-does-to-the-body'],
    clinicalReference: 'EMDR Resource Installation / Narrative Exposure',
    icon: 'Shield',
    requiresAudio: true,
    requiresTimer: false,
    stage: 'safety',
    sectionType: 'therapeutic',
    nextStep: 'body-scan',
    downloadables: [
      {
        id: 'safe-place-worksheet',
        labelAr: 'ورقة عمل المكان الآمن',
        labelEn: 'Safe Place Worksheet',
        type: 'worksheet',
        status: 'clinical-review',
        path: 'TRC-Safe-Place-AR.html',
        parentToolId: 'safe-place',
        companionType: 'WORKSHEET',
        pageCount: 3,
        filename: 'TRC-Safe-Place-AR.html'
      },
      {
        id: 'safe-place-worksheet-en',
        labelAr: 'ورقة عمل المكان الآمن (إنجليزي)',
        labelEn: 'Safe Place Worksheet (English)',
        type: 'worksheet',
        status: 'built',
        path: 'TRC-Safe-Place-EN.html',
        parentToolId: 'safe-place',
        companionType: 'WORKSHEET',
        pageCount: 3,
        filename: 'TRC-Safe-Place-EN.html'
      }
    ],
    translations: 'partial',
    contraindications: ['تفارق شديد', 'ذكريات اقتحامية نشطة', 'رهاب الخلاء/الأماكن المغلقة'],
    safetyLevel: 'moderate'
  },

  {
    id: 'body-scan',
    labelAr: 'مسح الجسد',
    labelEn: 'Body Scan',
    type: 'interactive',
    status: 'clinical-review',
    descriptionAr: 'تمرين تأملي موجّه يمسح الجسد من الأطراف إلى المركز لتحديد مناطق التوتر.',
    descriptionEn: 'A guided meditation scanning the body from extremities to center to identify areas of tension.',
    route: '/recovery/trc/body-scan',
    duration: '10-15 minutes',
    difficulty: 'beginner',
    relatedAssets: ['grounding-54321', 'a52', 'safe-place'],
    relatedWorksheets: ['trigger-mapping'],
    relatedArticles: ['what-trauma-does-to-the-body'],
    clinicalReference: 'MBSR Body Scan / Somatic Experiencing',
    icon: 'Scan',
    requiresAudio: true,
    requiresTimer: true,
    stage: 'safety',
    sectionType: 'therapeutic',
    nextStep: 'trigger-mapping',
    downloadables: [
      {
        id: 'body-awareness-worksheet',
        labelAr: 'ورقة عمل الوعي الجسدي',
        labelEn: 'Body Awareness Worksheet',
        type: 'worksheet',
        status: 'clinical-review',
        path: 'TRC-Body-Scan-AR.html',
        parentToolId: 'body-scan',
        companionType: 'WORKSHEET',
        pageCount: 3,
        filename: 'TRC-Body-Scan-AR.html'
      },
      {
        id: 'body-awareness-worksheet-en',
        labelAr: 'ورقة عمل الوعي الجسدي (إنجليزي)',
        labelEn: 'Body Awareness Worksheet (English)',
        type: 'worksheet',
        status: 'built',
        path: 'TRC-Body-Scan-EN.html',
        parentToolId: 'body-scan',
        companionType: 'WORKSHEET',
        pageCount: 3,
        filename: 'TRC-Body-Scan-EN.html'
      }
    ],
    translations: 'partial',
    contraindications: ['تفارق شديد', 'اضطراب تشوه الجسم', 'صدمة جسدية/جنسية حديثة', 'ألم مزمن حاد'],
    safetyLevel: 'moderate'
  },

  // ============================================
  // REGULATION LAYER — Worksheets
  // ============================================

  {
    id: 'trigger-mapping',
    labelAr: 'خريطة المحفزات',
    labelEn: 'Trigger Mapping',
    type: 'worksheet',
    status: 'planned',
    descriptionAr: 'ورقة عمل لتحديد وتسجيل المحفزات العاطفية والجسدية وأنماط الاستجابة.',
    descriptionEn: 'A worksheet for identifying and recording emotional and physical triggers and response patterns.',
    route: '/recovery/trc/worksheets/trigger-mapping',
    relatedAssets: ['grounding-54321', 'a52', 'body-scan'],
    relatedWorksheets: ['safety-plan'],
    relatedArticles: ['what-trauma-does-to-the-body'],
    clinicalReference: 'CBT Trigger Analysis / DBT Chain Analysis',
    icon: 'Map',
    stage: 'regulation',
    sectionType: 'standard',
    nextStep: 'safety-plan',
    downloadables: [
      {
        id: 'trigger-mapping-worksheet',
        labelAr: 'ورقة عمل خريطة المحفزات',
        labelEn: 'Trigger Mapping Worksheet',
        type: 'worksheet',
        status: 'built',
        path: 'TRC-Trigger-Mapping-AR.html',
        parentToolId: 'trigger-mapping',
        companionType: 'WORKSHEET',
        pageCount: 3,
        filename: 'TRC-Trigger-Mapping-AR.html'
      },
      {
        id: 'trigger-mapping-worksheet-en',
        labelAr: 'ورقة عمل خريطة المحفزات (إنجليزي)',
        labelEn: 'Trigger Mapping Worksheet (English)',
        type: 'worksheet',
        status: 'built',
        path: 'TRC-Trigger-Mapping-EN.html',
        parentToolId: 'trigger-mapping',
        companionType: 'WORKSHEET',
        pageCount: 3,
        filename: 'TRC-Trigger-Mapping-EN.html'
      }
    ],
    translations: 'partial',
    contraindications: [],
    safetyLevel: 'low'
  },

  {
    id: 'safety-plan',
    labelAr: 'خطة الأمان',
    labelEn: 'Safety Plan',
    type: 'worksheet',
    status: 'planned',
    descriptionAr: 'ورقة عمل لإنشاء خطة أمان شخصية مع خطوات محددة للأزمات.',
    descriptionEn: 'A worksheet for creating a personal safety plan with specific crisis steps.',
    route: '/recovery/trc/worksheets/safety-plan',
    relatedAssets: ['safe-place', 'grounding-54321'],
    relatedWorksheets: ['trigger-mapping'],
    relatedArticles: ['what-trauma-does-to-the-body'],
    clinicalReference: 'Stanley & Brown Safety Planning Intervention',
    icon: 'ShieldCheck',
    stage: 'safety',
    sectionType: 'standard',
    nextStep: 'grounding-54321',
    downloadables: [
      {
        id: 'safety-plan-worksheet',
        labelAr: 'ورقة عمل خطة الأمان',
        labelEn: 'Safety Plan Worksheet',
        type: 'card',
        status: 'built',
        path: 'TRC-Safety-Plan-AR.html',
        parentToolId: 'safety-plan',
        companionType: 'PLAN',
        pageCount: 3,
        filename: 'TRC-Safety-Plan-AR.html'
      },
      {
        id: 'safety-plan-worksheet-en',
        labelAr: 'ورقة عمل خطة الأمان (إنجليزي)',
        labelEn: 'Safety Plan Worksheet (English)',
        type: 'card',
        status: 'built',
        path: 'TRC-Safety-Plan-EN.html',
        parentToolId: 'safety-plan',
        companionType: 'PLAN',
        pageCount: 3,
        filename: 'TRC-Safety-Plan-EN.html'
      }
    ],
    translations: 'partial',
    contraindications: [],
    safetyLevel: 'low'
  },

  // ============================================
  // PSYCHOEDUCATION
  // ============================================

  {
    id: 'what-trauma-does-to-the-body',
    labelAr: 'ماذا يفعل الصدمة بالجسم',
    labelEn: 'What Trauma Does To The Body',
    type: 'psychoeducation',
    status: 'clinical-review',
    descriptionAr: 'شرح مبسط لكيفية تأثير الصدمات على الجسم والجهاز العصبي.',
    descriptionEn: 'A simplified explanation of how trauma affects the body, nervous system, and physiological responses.',
    route: '/recovery/trc/what-trauma-does-to-the-body',
    duration: '10-15 minutes',
    relatedAssets: ['grounding-54321', 'a52', 'safe-place', 'body-scan'],
    relatedWorksheets: ['trigger-mapping'],
    relatedArticles: [],
    clinicalReference: 'van der Kolk / Porges Polyvagal Theory',
    icon: 'BookOpen',
    stage: 'safety',
    sectionType: 'standard',
    nextStep: 'grounding-54321',
    downloadables: [
      {
        id: 'psychoeducation-pdf',
        labelAr: 'ملف التثقيف النفسي',
        labelEn: 'Psychoeducation PDF',
        type: 'pdf',
        status: 'clinical-review',
        path: 'TRC-What-Trauma-Does-AR.html',
        parentToolId: 'what-trauma-does-to-the-body',
        companionType: 'GUIDE',
        pageCount: 6,
        filename: 'TRC-What-Trauma-Does-AR.html'
      },
      {
        id: 'psychoeducation-pdf-en',
        labelAr: 'ملف التثقيف النفسي (إنجليزي)',
        labelEn: 'Psychoeducation Guide (English)',
        type: 'pdf',
        status: 'built',
        path: 'TRC-What-Trauma-Does-EN.html',
        parentToolId: 'what-trauma-does-to-the-body',
        companionType: 'GUIDE',
        pageCount: 6,
        filename: 'TRC-What-Trauma-Does-EN.html'
      }
    ],
    translations: 'partial',
    contraindications: [],
    safetyLevel: 'low'
  },

  // ============================================
  // TRAUMA RESPONSES — Reference
  // ============================================

  {
    id: 'trauma-responses',
    labelAr: 'أنماط استجابة الصدمة',
    labelEn: 'Trauma Response Patterns',
    type: 'interactive',
    status: 'planned',
    descriptionAr: 'افهم استجاباتك الأربع: قتال، هرب، تجميد، استسلام',
    descriptionEn: 'Understand your four responses: fight, flight, freeze, fawn',
    route: '/recovery/trc/what-happens-during-trauma-responses',
    relatedAssets: [],
    relatedWorksheets: [],
    relatedArticles: [],
    icon: 'Brain',
    stage: 'regulation',
    clinicalReference: 'TRC Framework — Stage 2: Regulation, Principle 5',
    requiresAudio: false,
    requiresTimer: false,
    sectionType: 'therapeutic',
    downloadables: [
      {
        id: 'trauma-responses-ref-en',
        labelAr: 'مرجع أنماط الاستجابة (إنجليزي)',
        labelEn: 'Trauma Response Patterns Reference (English)',
        type: 'reference',
        status: 'built',
        path: 'TRC-Trauma-Responses-EN.html',
        parentToolId: 'trauma-responses',
        companionType: 'REFERENCE',
        pageCount: 3,
        filename: 'TRC-Trauma-Responses-EN.html'
      },
      {
        id: 'trauma-responses-ref',
        labelAr: 'مرجع أنماط الاستجابة',
        labelEn: 'Trauma Response Patterns Reference',
        type: 'reference',
        status: 'built',
        path: 'TRC-Trauma-Responses-AR.html',
        parentToolId: 'trauma-responses',
        companionType: 'REFERENCE',
        pageCount: 3,
        filename: 'TRC-Trauma-Responses-AR.html'
      }
    ],
    translations: 'partial',
    contraindications: ['severe-dissociation', 'active-flashbacks'],
    safetyLevel: 'higher',
  },

  // ============================================
  // RECOVERY LAYER — EFT, Reframing, Shame, Journal
  // ============================================

  {
    id: 'eft-tapping',
    labelAr: 'النقر العصبي EFT',
    labelEn: 'EFT Tapping',
    type: 'worksheet',
    status: 'clinical-review',
    descriptionAr: 'استخدام تقنية النقر على نقاط الطاقة لتقليل الشدة العاطفية المرتبطة بذكريات أو مشاعر محددة.',
    descriptionEn: 'Using acupoint tapping to reduce emotional intensity associated with specific memories or feelings.',
    route: '/recovery/trc/eft-tapping',
    duration: '10-20 minutes',
    difficulty: 'intermediate',
    relatedAssets: ['grounding-54321', 'thought-reframing'],
    relatedWorksheets: ['trigger-mapping'],
    relatedArticles: ['what-trauma-does-to-the-body'],
    clinicalReference: 'Craig & Fowlie (1995). Emotional Freedom Techniques',
    icon: 'Hand',
    requiresAudio: false,
    requiresTimer: false,
    stage: 'regulation',
    sectionType: 'therapeutic',
    nextStep: 'thought-reframing',
    downloadables: [
      {
        id: 'eft-tapping-worksheet',
        labelAr: 'ورقة عمل النقر EFT',
        labelEn: 'EFT Tapping Worksheet',
        type: 'worksheet',
        status: 'clinical-review',
        path: 'TRC-EFT-Tapping-AR.html',
        parentToolId: 'eft-tapping',
        companionType: 'WORKSHEET',
        pageCount: 4,
        filename: 'TRC-EFT-Tapping-AR.html'
      },
      {
        id: 'eft-tapping-worksheet-en',
        labelAr: 'ورقة عمل النقر EFT (إنجليزي)',
        labelEn: 'EFT Tapping Worksheet (English)',
        type: 'worksheet',
        status: 'built',
        path: 'TRC-EFT-Tapping-EN.html',
        parentToolId: 'eft-tapping',
        companionType: 'WORKSHEET',
        pageCount: 4,
        filename: 'TRC-EFT-Tapping-EN.html'
      }
    ],
    translations: 'partial',
    contraindications: ['صدمة حادة غير مستقرة', 'تفارق شديد', 'ذهان نشط'],
    safetyLevel: 'moderate'
  },

  {
    id: 'thought-reframing',
    labelAr: 'إعادة صياغة الأفكار',
    labelEn: 'Thought Reframing',
    type: 'worksheet',
    status: 'clinical-review',
    descriptionAr: 'فحص الأفكار التلقائية وإعادة صياغتها بشكل أكثر توازناً بناءً على الدليل.',
    descriptionEn: 'Examining automatic thoughts and reframing them more balancedly based on evidence.',
    route: '/recovery/trc/thought-reframing',
    duration: '10-15 minutes',
    difficulty: 'intermediate',
    relatedAssets: ['eft-tapping', 'shame-recovery'],
    relatedWorksheets: ['trigger-mapping'],
    relatedArticles: ['what-trauma-does-to-the-body'],
    clinicalReference: 'Beck (2011). Cognitive Behavior Therapy — Thought Records',
    icon: 'RefreshCw',
    requiresAudio: false,
    requiresTimer: false,
    stage: 'regulation',
    sectionType: 'therapeutic',
    nextStep: 'shame-recovery',
    downloadables: [
      {
        id: 'thought-reframing-worksheet',
        labelAr: 'ورقة عمل إعادة الصياغة',
        labelEn: 'Thought Reframing Worksheet',
        type: 'worksheet',
        status: 'clinical-review',
        path: 'TRC-Thought-Reframing-AR.html',
        parentToolId: 'thought-reframing',
        companionType: 'WORKSHEET',
        pageCount: 4,
        filename: 'TRC-Thought-Reframing-AR.html'
      },
      {
        id: 'thought-reframing-worksheet-en',
        labelAr: 'ورقة عمل إعادة الصياغة (إنجليزي)',
        labelEn: 'Thought Reframing Worksheet (English)',
        type: 'worksheet',
        status: 'built',
        path: 'TRC-Thought-Reframing-EN.html',
        parentToolId: 'thought-reframing',
        companionType: 'WORKSHEET',
        pageCount: 4,
        filename: 'TRC-Thought-Reframing-EN.html'
      }
    ],
    translations: 'partial',
    contraindications: [],
    safetyLevel: 'low'
  },

  {
    id: 'shame-recovery',
    labelAr: 'التعافي من العار',
    labelEn: 'Shame Recovery',
    type: 'worksheet',
    status: 'clinical-review',
    descriptionAr: 'تمييز العار عن الذنب وتطوير التعاطف مع الذات كأداة للتعافي من العار المترسب بالصدمة.',
    descriptionEn: 'Distinguishing shame from guilt and developing self-compassion as a tool for recovering from trauma-embedded shame.',
    route: '/recovery/trc/shame-recovery',
    duration: '15-20 minutes',
    difficulty: 'intermediate',
    relatedAssets: ['thought-reframing', 'trauma-journal'],
    relatedWorksheets: [],
    relatedArticles: ['what-trauma-does-to-the-body'],
    clinicalReference: 'Brown (2006). Shame Resilience Theory / Neff (2011). Self-Compassion',
    icon: 'Heart',
    requiresAudio: false,
    requiresTimer: false,
    stage: 'regulation',
    sectionType: 'therapeutic',
    nextStep: 'trauma-journal',
    downloadables: [
      {
        id: 'shame-recovery-worksheet',
        labelAr: 'ورقة عمل التعافي من العار',
        labelEn: 'Shame Recovery Worksheet',
        type: 'worksheet',
        status: 'clinical-review',
        path: 'TRC-Shame-Recovery-AR.html',
        parentToolId: 'shame-recovery',
        companionType: 'WORKSHEET',
        pageCount: 4,
        filename: 'TRC-Shame-Recovery-AR.html'
      },
      {
        id: 'shame-recovery-worksheet-en',
        labelAr: 'ورقة عمل التعافي من العار (إنجليزي)',
        labelEn: 'Shame Recovery Worksheet (English)',
        type: 'worksheet',
        status: 'built',
        path: 'TRC-Shame-Recovery-EN.html',
        parentToolId: 'shame-recovery',
        companionType: 'WORKSHEET',
        pageCount: 4,
        filename: 'TRC-Shame-Recovery-EN.html'
      }
    ],
    translations: 'partial',
    contraindications: ['عار مرتبط بإيذاء مستمر', 'اكتئاب حاد'],
    safetyLevel: 'higher'
  },

  {
    id: 'trauma-journal',
    labelAr: 'يوميات التعافي',
    labelEn: 'Trauma Journal',
    type: 'worksheet',
    status: 'clinical-review',
    descriptionAr: 'يوميات منظمة للكتابة التعبيرية عن التجربة الصدمية مع دعم التنظيم والسلامة.',
    descriptionEn: 'A structured journal for expressive writing about the trauma experience with regulation and safety support.',
    route: '/recovery/trc/trauma-journal',
    duration: '15-20 minutes',
    difficulty: 'intermediate',
    relatedAssets: ['shame-recovery', 'grounding-54321'],
    relatedWorksheets: [],
    relatedArticles: ['what-trauma-does-to-the-body'],
    clinicalReference: 'Pennebaker (1997). Opening Up / Written Exposure Therapy',
    icon: 'BookOpen',
    requiresAudio: false,
    requiresTimer: false,
    stage: 'recovery',
    sectionType: 'therapeutic',
    downloadables: [
      {
        id: 'trauma-journal-worksheet',
        labelAr: 'يوميات التعافي',
        labelEn: 'Trauma Journal',
        type: 'journal',
        status: 'clinical-review',
        path: 'TRC-Trauma-Journal-AR.html',
        parentToolId: 'trauma-journal',
        companionType: 'JOURNAL',
        pageCount: 6,
        filename: 'TRC-Trauma-Journal-AR.html'
      },
      {
        id: 'trauma-journal-worksheet-en',
        labelAr: 'يوميات التعافي (إنجليزي)',
        labelEn: 'Trauma Journal (English)',
        type: 'journal',
        status: 'built',
        path: 'TRC-Trauma-Journal-EN.html',
        parentToolId: 'trauma-journal',
        companionType: 'JOURNAL',
        pageCount: 6,
        filename: 'TRC-Trauma-Journal-EN.html'
      }
    ],
    translations: 'partial',
    contraindications: ['أزمة حادة', 'أفكار انتحارية نشطة'],
    safetyLevel: 'higher'
  },

  {
    id: 'regulation-quick-reference',
    labelAr: 'مرجع التنظيم السريع',
    labelEn: 'Regulation Quick Reference',
    type: 'psychoeducation',
    status: 'planned',
    descriptionAr: 'مرجع سريع يجمع كل أدوات التنظيم مع متى وكيف تستخدم كل أداة.',
    descriptionEn: 'A quick reference consolidating all regulation tools with when and how to use each.',
    route: '/recovery/trc/regulation-quick-reference',
    duration: '2-5 minutes',
    relatedAssets: ['grounding-54321', 'a52', 'safe-place', 'body-scan', 'eft-tapping', 'thought-reframing'],
    relatedWorksheets: ['trigger-mapping', 'safety-plan'],
    relatedArticles: ['what-trauma-does-to-the-body'],
    clinicalReference: 'Cross-tool summary of all TRC tools',
    icon: 'LayoutGrid',
    stage: 'regulation',
    sectionType: 'standard',
    downloadables: [
      {
        id: 'regulation-quick-ref-en',
        labelAr: 'مرجع التنظيم السريع (إنجليزي)',
        labelEn: 'Regulation Quick Reference (English)',
        type: 'reference',
        status: 'built',
        path: 'TRC-Regulation-Quick-Ref-EN.html',
        parentToolId: 'regulation-toolkit',
        companionType: 'REFERENCE',
        pageCount: 2,
        filename: 'TRC-Regulation-Quick-Ref-EN.html'
      },
      {
        id: 'regulation-quick-ref',
        labelAr: 'مرجع التنظيم السريع',
        labelEn: 'Regulation Quick Reference',
        type: 'reference',
        status: 'built',
        path: 'TRC-Regulation-Quick-Ref-AR.html',
        parentToolId: 'regulation-toolkit',
        companionType: 'REFERENCE',
        pageCount: 2,
        filename: 'TRC-Regulation-Quick-Ref-AR.html'
      }
    ],
    translations: 'partial',
    contraindications: [],
    safetyLevel: 'low'
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function getTrcAssetsByStage(stage: TrcStage): TrcAsset[] {
  return TRC_ASSETS.filter(a => a.stage === stage);
}

export function getTrcAssetsByStatus(status: TrcAssetStatus): TrcAsset[] {
  return TRC_ASSETS.filter(a => a.status === status);
}

export function getTrcAssetById(id: string): TrcAsset | undefined {
  return TRC_ASSETS.find(a => a.id === id);
}

export function getTrcSafetyPath(): TrcAsset[] {
  return TRC_SAFETY_PATH
    .map(id => TRC_ASSETS.find(a => a.id === id))
    .filter((a): a is TrcAsset => a !== undefined);
}

export function getTrcRegulationPath(): TrcAsset[] {
  return TRC_REGULATION_PATH
    .map(id => TRC_ASSETS.find(a => a.id === id))
    .filter((a): a is TrcAsset => a !== undefined);
}

export function getTrcNextStep(assetId: string): TrcAsset | undefined {
  const asset = getTrcAssetById(assetId);
  if (!asset?.nextStep) return undefined;
  return getTrcAssetById(asset.nextStep);
}
