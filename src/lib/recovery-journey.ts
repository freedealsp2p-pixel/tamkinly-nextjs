// Recovery Journey Model — R1-A
// Defines the journey stages, steps, and progression for both Porn Recovery and TRC
// Based on docs/recovery/frameworks/porn-recovery-framework.md and trc-framework.md
// CRITICAL: Domain separation — no cross-domain references

// ============================================================
// PORN RECOVERY JOURNEY
// ============================================================
// Based on 5-stage model: Awareness → Protection → Replacement → Support → Resilience
// Mapped to existing sections + REC tools

export type PornRecoveryStageId =
  | 'awareness'      // Stage 1: Understand the pattern
  | 'protection'     // Stage 2: Build recovery systems
  | 'replacement'    // Stage 3: Handle urges & triggers
  | 'support'        // Stage 4: Understand relapse
  | 'resilience';    // Stage 5: Reconstruct identity & maintain

export type PornRecoveryStepId =
  | 'recognition'      // I — Self-recognition cards
  | 'brain-cycle'      // II — Brain & behavior cycle
  | 'failed-attempts'  // III — Reframing failed attempts
  | 'framework'        // IV — Recovery framework (4 stages)
  | 'toolkit'          // V — HALT + Trigger Journal + Emergency Plan
  | 'urge-surfing'     // VI — Urge surfing (mindfulness of urges)
  | 'relapse'          // VII — Relapse scenarios & steps
  | 'identity'         // VIII — Identity reconstruction
  | 'future-self';     // IX — Future self letter

export interface PornRecoveryJourneyStep {
  id: PornRecoveryStepId;
  labelAr: string;
  labelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  stage: PornRecoveryStageId;
  route: string;          // URL or anchor
  anchorId: string;       // HTML section anchor for scroll
  downloadables: string[];// REC-* keys
  nextStep: PornRecoveryStepId | null;
  previousStep: PornRecoveryStepId | null;
  completionKey: string;  // localStorage key for completion
  isInteractive: boolean; // Has interactive tools (not just info)
  estimatedMinutes: number;
}

export interface PornRecoveryJourneyStage {
  id: PornRecoveryStageId;
  labelAr: string;
  labelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  steps: PornRecoveryStepId[];
  color: string;
  icon: string;
}

// Porn Recovery Stages
export const PORN_RECOVERY_STAGES: PornRecoveryJourneyStage[] = [
  {
    id: 'awareness',
    labelAr: 'فهم النمط',
    labelEn: 'Understand the Pattern',
    descriptionAr: 'المرحلة الأولى هي فهم سلوكك ودورة القهر. بدون هذا الفهم، كل محاولة للتوقف ستكون كمحاولة إيقاف نزيف دون معرفة مصدره.',
    descriptionEn: 'The first stage is understanding your behavior and the cycle of compulsion. Without this understanding, every attempt to stop is like trying to stop bleeding without knowing its source.',
    steps: ['recognition', 'brain-cycle', 'failed-attempts'],
    color: '#3DD4B0',
    icon: 'Eye'
  },
  {
    id: 'protection',
    labelAr: 'بناء أنظمة التعافي',
    labelEn: 'Build Recovery Systems',
    descriptionAr: 'الآن بعد أن فهمت النمط، حان وقت بناء أنظمة حماية عملية. هذا ليس إرادتك alone — هذا بيئة مصممة تقلل الاحتمالات.',
    descriptionEn: 'Now that you understand the pattern, it\'s time to build practical protection systems. This isn\'t willpower alone — it\'s a designed environment that reduces probabilities.',
    steps: ['framework', 'toolkit'],
    color: '#1F6F78',
    icon: 'Shield'
  },
  {
    id: 'replacement',
    labelAr: 'التعامل مع الدوافع والمحفزات',
    labelEn: 'Handle Urges & Triggers',
    descriptionAr: 'كل رغبة قهرية لها لحظة حرجة: 10 دقائق حيث يمكنك إعادة التوجيه. أدوات هذه المرحلة مصممة لهذه اللحظة بالذات.',
    descriptionEn: 'Every compulsive urge has a critical window: 10 minutes where you can redirect. The tools in this stage are designed for exactly that moment.',
    steps: ['urge-surfing'],
    color: '#C97B7B',
    icon: 'Zap'
  },
  {
    id: 'support',
    labelAr: 'فهم الانتكاس',
    labelEn: 'Understand Relapse',
    descriptionAr: 'الانتكاس ليس فشلاً نهائياً — هو تقرير حالة. يخبرك أين تحتاج تعزيز أنظمتك. هذه المرحلة تعلمك القراءة الصحيحة للانتكاس.',
    descriptionEn: 'Relapse is not a final failure — it\'s a status report. It tells you where you need to reinforce your systems. This stage teaches you to read relapse correctly.',
    steps: ['relapse'],
    color: '#E8685A',
    icon: 'RotateCcw'
  },
  {
    id: 'resilience',
    labelAr: 'إعادة بناء الهوية والمحافظة على التعافي',
    labelEn: 'Reconstruct Identity & Maintain Recovery',
    descriptionAr: 'التعافي الحقيقي ليس التوقف عن السلوك —هو بناء هوية جديدة لا تحتاج السلوك القهري. هنا تبدأ رحلة إعادة برمجة الهوية.',
    descriptionEn: 'True recovery isn\'t stopping the behavior — it\'s building a new identity that doesn\'t need the compulsive behavior. Here begins the identity reprogramming journey.',
    steps: ['identity', 'future-self'],
    color: '#3DD4B0',
    icon: 'Sprout'
  }
];

// Porn Recovery Steps (journey sequence)
export const PORN_RECOVERY_STEPS: PornRecoveryJourneyStep[] = [
  {
    id: 'recognition',
    labelAr: 'التعرف على النمط',
    labelEn: 'Recognize the Pattern',
    descriptionAr: 'هل ما تعيشه نمط قهري؟ هذه البطاقات تساعدك تعرف.',
    descriptionEn: 'Is what you\'re experiencing a compulsive pattern? These cards help you identify it.',
    stage: 'awareness',
    route: '/recovery/porn-recovery',
    anchorId: 'recognition',
    downloadables: [],
    nextStep: 'brain-cycle',
    previousStep: null,
    completionKey: 'tamkinly_pr_recognition_done',
    isInteractive: true,
    estimatedMinutes: 5
  },
  {
    id: 'brain-cycle',
    labelAr: 'دورة الدماغ والسلوك',
    labelEn: 'Brain & Behavior Cycle',
    descriptionAr: 'كيف يعمل الدماغ في هذه الدورة: محفز → رغبة → استجابة → راحة → تكرار.',
    descriptionEn: 'How the brain works in this cycle: trigger → urge → response → relief → repeat.',
    stage: 'awareness',
    route: '/recovery/porn-recovery',
    anchorId: 'brain',
    downloadables: ['REC-05-PATTERN-RECOGNITION'],
    nextStep: 'failed-attempts',
    previousStep: 'recognition',
    completionKey: 'tamkinly_pr_brain_done',
    isInteractive: false,
    estimatedMinutes: 8
  },
  {
    id: 'failed-attempts',
    labelAr: 'إعادة تأطير المحاولات الفاشلة',
    labelEn: 'Reframe Failed Attempts',
    descriptionAr: 'محاولاتك السابقة ليست فشلاً — هي بيانات. هنا تعيد قراءتها.',
    descriptionEn: 'Your previous attempts aren\'t failures — they\'re data. Here you re-read them.',
    stage: 'awareness',
    route: '/recovery/porn-recovery',
    anchorId: 'failed-attempts',
    downloadables: ['REC-06-RECOVERY-LOOP-MAP', 'REC-07-REFRAME'],
    nextStep: 'framework',
    previousStep: 'brain-cycle',
    completionKey: 'tamkinly_pr_attempts_done',
    isInteractive: false,
    estimatedMinutes: 6
  },
  {
    id: 'framework',
    labelAr: 'منهجية التعافي',
    labelEn: 'Recovery Framework',
    descriptionAr: '4 مراحل واضحة مع أدوات لكل مرحلة. هذا هو الهيكل الذي ستبني عليه.',
    descriptionEn: '4 clear stages with tools for each. This is the structure you\'ll build on.',
    stage: 'protection',
    route: '/recovery/porn-recovery',
    anchorId: 'framework',
    downloadables: ['REC-04-RECOVERY-REVIEW', 'REC-08-STAGE-ASSESSMENT'],
    nextStep: 'toolkit',
    previousStep: 'failed-attempts',
    completionKey: 'tamkinly_pr_framework_done',
    isInteractive: true,
    estimatedMinutes: 10
  },
  {
    id: 'toolkit',
    labelAr: 'أدوات التدخل الفوري',
    labelEn: 'Immediate Intervention Tools',
    descriptionAr: 'HALT، سجل المحفزات، خطة الطوارئ. هذه أدوات اللحظة الحرجة.',
    descriptionEn: 'HALT, Trigger Journal, Emergency Plan. These are the critical moment tools.',
    stage: 'protection',
    route: '/recovery/porn-recovery',
    anchorId: 'toolkit',
    downloadables: ['REC-01-HALT', 'REC-02-TRIGGER-JOURNAL', 'REC-03-EMERGENCY-PLAN'],
    nextStep: 'urge-surfing',
    previousStep: 'framework',
    completionKey: 'tamkinly_pr_toolkit_done',
    isInteractive: true,
    estimatedMinutes: 15
  },
  {
    id: 'urge-surfing',
    labelAr: 'ركوب الرغبة',
    labelEn: 'Urge Surfing',
    descriptionAr: 'لاحظ الرغبة كظاهرة جسدية تتقلب ثم تنخفض. لا تحتاج لمقاومتها — فقط مراقبتها. تقنية Marlatt (1985) لإدارة الرغبات دون الاستجابة لها.',
    descriptionEn: 'Observe the urge as a bodily phenomenon that rises and falls. You don\'t need to resist it — just watch it. Marlatt\'s (1985) technique for managing urges without acting on them.',
    stage: 'replacement',
    route: '/recovery/porn-recovery',
    anchorId: 'urge-surfing',
    downloadables: ['REC-03-EMERGENCY-PLAN'],
    nextStep: 'relapse',
    previousStep: 'toolkit',
    completionKey: 'tamkinly_pr_urge_surfing_done',
    isInteractive: true,
    estimatedMinutes: 10
  },
  {
    id: 'relapse',
    labelAr: 'قراءة الانتكاس',
    labelEn: 'Read Relapse',
    descriptionAr: '3 سيناريوهات عملية: كل انتكاس رسالة، ليس نهاية.',
    descriptionEn: '3 practical scenarios: every relapse is a message, not an ending.',
    stage: 'support',
    route: '/recovery/porn-recovery',
    anchorId: 'relapse',
    downloadables: ['REC-09-RELAPSE-SCENARIO-REVIEW'],
    nextStep: 'identity',
    previousStep: 'urge-surfing',
    completionKey: 'tamkinly_pr_relapse_done',
    isInteractive: true,
    estimatedMinutes: 8
  },
  {
    id: 'identity',
    labelAr: 'إعادة بناء الهوية',
    labelEn: 'Reconstruct Identity',
    descriptionAr: 'من أنت بدون هذا السلوك؟ هنا تبني الإجابة.',
    descriptionEn: 'Who are you without this behavior? Here you build the answer.',
    stage: 'resilience',
    route: '/recovery/porn-recovery',
    anchorId: 'identity',
    downloadables: ['REC-10-IDENTITY-CARDS'],
    nextStep: 'future-self',
    previousStep: 'relapse',
    completionKey: 'tamkinly_pr_identity_done',
    isInteractive: true,
    estimatedMinutes: 12
  },
  {
    id: 'future-self',
    labelAr: 'رسالة لنفسك المستقبلية',
    labelEn: 'Future Self Letter',
    descriptionAr: 'اكتب لنفسك بعد سنة: من أصبحت، ما تغير، ما نصيحتك.',
    descriptionEn: 'Write to yourself in a year: who you became, what changed, your advice.',
    stage: 'resilience',
    route: '/recovery/porn-recovery',
    anchorId: 'future-self',
    downloadables: ['REC-11-FUTURE-SELF-LETTER'],
    nextStep: null, // Journey complete
    previousStep: 'identity',
    completionKey: 'tamkinly_pr_future_self_done',
    isInteractive: true,
    estimatedMinutes: 10
  }
];

// ============================================================
// TRC JOURNEY
// ============================================================
// Based on 3-stage clinical model: Safety → Regulation → Integration
// CRITICAL: Independent methodology, NOT copied from Porn Recovery

export type TrcStageId =
  | 'safety'         // Stage 1: Safety & Stabilization
  | 'regulation'     // Stage 2: Regulation
  | 'integration';   // Stage 3: Integration / Recovery

export type TrcStepId =
  | 'grounding'           // 5-4-3-2-1 sensory grounding
  | 'a52-breathing'       // A52 combat breathing
  | 'safe-place'          // Safe Place visualization
  | 'body-scan'           // Guided body scan
  | 'trauma-psychoeducation' // What trauma does to the body
  | 'trigger-mapping'     // (Wave 2) Map personal triggers
  | 'safety-plan'         // (Wave 2) Create safety plan
  | 'regulation-toolkit'  // (Wave 2) Regulation toolkit
  | 'eft-tapping'         // (Wave 2→3) EFT Tapping
  | 'thought-reframing'   // (Wave 3) Cognitive thought reframing
  | 'trauma-journal'      // (Wave 3) Trauma journaling
  | 'trauma-responses'    // (Wave 2) Trauma response patterns
  | 'shame-recovery'      // (Wave 2) Shame & self-blame reframing (TF-CBT)
  | 'boundaries'          // (Wave 3) Setting boundaries
  | 'therapist-selection' // (Wave 3) Finding a therapist
  | 'recovery-milestones';// (Wave 3) Recovery milestones

export interface TrcJourneyStep {
  id: TrcStepId;
  labelAr: string;
  labelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  stage: TrcStageId;
  route: string;
  anchorId: string;
  downloadables: string[];
  nextStep: TrcStepId | null;
  previousStep: TrcStepId | null;
  completionKey: string;
  isInteractive: boolean;
  isAvailable: boolean;    // false = planned (Wave 2+)
  safetyLevel: 'low' | 'moderate' | 'higher';
  sectionType: 'therapeutic' | 'standard';
  contraindications?: string[];
  estimatedMinutes: number;
}

export interface TrcJourneyStage {
  id: TrcStageId;
  labelAr: string;
  labelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  steps: TrcStepId[];
  color: string;
  icon: string;
  clinicalNoteAr?: string;
  clinicalNoteEn?: string;
}

// TRC Stages
export const TRC_STAGES: TrcJourneyStage[] = [
  {
    id: 'safety',
    labelAr: 'الأمان والاستقرار',
    labelEn: 'Safety & Stabilization',
    descriptionAr: 'قبل أي شيء، يجب أن تشعر بالأمان. هذه المرحلة تعلمك أدوات تنظم جهازك العصبي وتعيدك إلى اللحظة الحالية.',
    descriptionEn: 'Before anything, you must feel safe. This stage teaches tools to regulate your nervous system and bring you back to the present moment.',
    steps: ['grounding', 'a52-breathing', 'safe-place', 'body-scan'],
    color: '#1F6F78',
    icon: 'Shield',
    clinicalNoteAr: 'إذا شعرت بانفصال أو نوبة هلع، توقف فوراً وعد إلى التمرين الأساسي.',
    clinicalNoteEn: 'If you experience dissociation or panic, stop immediately and return to the basic exercise.'
  },
  {
    id: 'regulation',
    labelAr: 'التنظيم',
    labelEn: 'Regulation',
    descriptionAr: 'بعد أن تعلمت تنظم نفسك في لحظات الأزمة، حان وقت فهم محفزاتك الشخصية وبناء خطة أمان مفصلة.',
    descriptionEn: 'After learning to regulate yourself in crisis moments, it\'s time to understand your personal triggers and build a detailed safety plan.',
    steps: ['trigger-mapping', 'safety-plan', 'regulation-toolkit', 'eft-tapping', 'thought-reframing', 'trauma-journal', 'trauma-responses', 'shame-recovery'],
    color: '#3DD4B0',
    icon: 'Gauge',
    clinicalNoteAr: 'أدوات هذه المرحلة تتطلب إكمال مرحلة الأمان أولاً.',
    clinicalNoteEn: 'Tools in this stage require completing the Safety stage first.'
  },
  {
    id: 'integration',
    labelAr: 'التعافي والتكامل',
    labelEn: 'Integration & Recovery',
    descriptionAr: 'المرحلة الأخيرة: بناء حدود صحية، اختيار معالج مناسب، وتتبع معالم تعافيك.',
    descriptionEn: 'The final stage: building healthy boundaries, choosing a therapist, and tracking your recovery milestones.',
    steps: ['boundaries', 'therapist-selection', 'recovery-milestones'],
    color: '#3DD4B0',
    icon: 'Sprout'
  }
];

// TRC Steps (clinical sequence)
export const TRC_STEPS: TrcJourneyStep[] = [
  {
    id: 'grounding',
    labelAr: 'تنظيم الحواس 5-4-3-2-1',
    labelEn: '5-4-3-2-1 Sensory Grounding',
    descriptionAr: 'أدعك لتنظم جهازك العصبي عبر حواسك الخمس. أول خطوة دائماً.',
    descriptionEn: 'Engage your nervous system through your five senses. Always the first step.',
    stage: 'safety',
    route: '/recovery/trc/grounding',
    anchorId: 'grounding',
    downloadables: ['trc-01-grounding-pocket-card'],
    nextStep: 'a52-breathing',
    previousStep: null,
    completionKey: 'tamkinly_trc_grounding_done',
    isInteractive: true,
    isAvailable: true,
    safetyLevel: 'moderate',
    sectionType: 'therapeutic',
    estimatedMinutes: 5
  },
  {
    id: 'a52-breathing',
    labelAr: 'تنفس A52 القتالي',
    labelEn: 'A52 Combat Breathing',
    descriptionAr: 'تنفس 5 ثوانٍ − احبس 2 ثانية. تقنية تنظيم عسكري معدلة للتعافي.',
    descriptionEn: 'Breathe 5 seconds − hold 2 seconds. Modified military regulation technique for recovery.',
    stage: 'safety',
    route: '/recovery/trc/a52',
    anchorId: 'a52',
    downloadables: ['trc-02-breathing-technique-card'],
    nextStep: 'safe-place',
    previousStep: 'grounding',
    completionKey: 'tamkinly_trc_a52_done',
    isInteractive: true,
    isAvailable: true,
    safetyLevel: 'moderate',
    sectionType: 'therapeutic',
    contraindications: ['panic-disorder', 'severe-dissociation'],
    estimatedMinutes: 8
  },
  {
    id: 'safe-place',
    labelAr: 'المكان الآمن',
    labelEn: 'Safe Place Visualization',
    descriptionAr: 'بصر مكاناً تشعر فيه بالأمان التام. أداة تنظيم عميقة.',
    descriptionEn: 'Visualize a place where you feel completely safe. A deep regulation tool.',
    stage: 'safety',
    route: '/recovery/trc/safe-place',
    anchorId: 'safe-place',
    downloadables: ['trc-03-safe-place-journal'],
    nextStep: 'body-scan',
    previousStep: 'a52-breathing',
    completionKey: 'tamkinly_trc_safe_place_done',
    isInteractive: true,
    isAvailable: true,
    safetyLevel: 'moderate',
    sectionType: 'therapeutic',
    contraindications: ['severe-dissociation', 'active-flashbacks'],
    estimatedMinutes: 10
  },
  {
    id: 'body-scan',
    labelAr: 'مسح الجسد',
    labelEn: 'Guided Body Scan',
    descriptionAr: 'انتبه لجسدك من الرأس إلى القدمين. تعلم أين يخزن الصدمة.',
    descriptionEn: 'Attend to your body from head to feet. Learn where trauma is stored.',
    stage: 'safety',
    route: '/recovery/trc/body-scan',
    anchorId: 'body-scan',
    downloadables: ['trc-04-body-scan-guide'],
    nextStep: 'trigger-mapping',
    previousStep: 'safe-place',
    completionKey: 'tamkinly_trc_body_scan_done',
    isInteractive: true,
    isAvailable: true,
    safetyLevel: 'higher',
    sectionType: 'therapeutic',
    contraindications: ['severe-dissociation', 'recent-trauma', 'active-flashbacks'],
    estimatedMinutes: 12
  },
  {
    id: 'trauma-psychoeducation',
    labelAr: 'ماذا تفعل الصدمة بالجسد',
    labelEn: 'What Trauma Does to the Body',
    descriptionAr: 'افهم لماذا يتفاعل جسدك بهذه الطريقة. معرفة تخفف اللوم.',
    descriptionEn: 'Understand why your body reacts this way. Knowledge reduces self-blame.',
    stage: 'safety',
    route: '/recovery/trc/what-trauma-does-to-the-body',
    anchorId: 'psychoeducation',
    downloadables: [],
    nextStep: null, // Informational, not sequential
    previousStep: null,
    completionKey: 'tamkinly_trc_psychoeducation_done',
    isInteractive: false,
    isAvailable: true,
    safetyLevel: 'low',
    sectionType: 'standard',
    estimatedMinutes: 10
  },
  // Wave 2 — Regulation Stage (planned but defined for journey model)
  {
    id: 'trigger-mapping',
    labelAr: 'خريطة المحفزات',
    labelEn: 'Trigger Mapping',
    descriptionAr: 'حدد المحفزات الشخصية التي تنشط استجابات الصدمة.',
    descriptionEn: 'Identify personal triggers that activate trauma responses.',
    stage: 'regulation',
    route: '/recovery/trc/worksheets/trigger-mapping',
    anchorId: 'trigger-mapping',
    downloadables: ['trc-05-trigger-map-worksheet'],
    nextStep: 'safety-plan',
    previousStep: 'body-scan',
    completionKey: 'tamkinly_trc_trigger_mapping_done',
    isInteractive: true,
    isAvailable: true, // Wave 2A
    safetyLevel: 'moderate',
    sectionType: 'therapeutic',
    estimatedMinutes: 15
  },
  {
    id: 'safety-plan',
    labelAr: 'خطة الأمان',
    labelEn: 'Safety Plan',
    descriptionAr: 'أنشئ خطة أمان مفصلة خطوة بخطوة.',
    descriptionEn: 'Create a detailed step-by-step safety plan.',
    stage: 'regulation',
    route: '/recovery/trc/worksheets/safety-plan',
    anchorId: 'safety-plan',
    downloadables: ['trc-06-safety-plan-card'],
    nextStep: 'regulation-toolkit',
    previousStep: 'trigger-mapping',
    completionKey: 'tamkinly_trc_safety_plan_done',
    isInteractive: true,
    isAvailable: true, // Wave 2B
    safetyLevel: 'moderate',
    sectionType: 'therapeutic',
    estimatedMinutes: 20
  },
  {
    id: 'regulation-toolkit',
    labelAr: 'أدوات التنظيم',
    labelEn: 'Regulation Toolkit',
    descriptionAr: 'مجموعة أدوات لتنظيم الجهاز العصبي في لحظات الأزمة.',
    descriptionEn: 'A toolkit for regulating the nervous system in crisis moments.',
    stage: 'regulation',
    route: '/recovery/trc/regulation-toolkit',
    anchorId: 'regulation-toolkit',
    downloadables: ['trc-07-regulation-quick-reference'],
    nextStep: 'eft-tapping',
    previousStep: 'safety-plan',
    completionKey: 'tamkinly_trc_regulation_toolkit_done',
    isInteractive: true,
    isAvailable: true, // Wave 2B
    safetyLevel: 'moderate',
    sectionType: 'therapeutic',
    estimatedMinutes: 15
  },
  // Wave 2→3 — EFT Tapping (planned, requires clinical review)
  {
    id: 'eft-tapping',
    labelAr: 'تقنية EFT للنقر العصبي',
    labelEn: 'EFT Tapping',
    descriptionAr: 'أداة ذاتية للتخفيف من شدة الاستجابات العاطفية عبر النقر على نقاط الجسد.',
    descriptionEn: 'A self-help tool for reducing the intensity of emotional responses through body tapping.',
    stage: 'regulation',
    route: '/recovery/trc/eft-tapping',
    anchorId: 'eft-tapping',
    downloadables: ['trc-09-eft-self-help-worksheet'],
    nextStep: 'thought-reframing',
    previousStep: 'regulation-toolkit',
    completionKey: 'tamkinly_trc_eft_done',
    isInteractive: true,
    isAvailable: true, // Built with clinical-review status — page route active
    safetyLevel: 'higher',
    sectionType: 'therapeutic',
    contraindications: ['active-dissociation', 'severe-dissociation'],
    estimatedMinutes: 10
  },
  // Wave 3 — Thought Reframing (active)
  {
    id: 'thought-reframing',
    labelAr: 'إعادة صياغة الأفكار',
    labelEn: 'Thought Reframing',
    descriptionAr: 'أداة معرفية لإعادة صياغة الأفكار المشوهة المرتبطة بالصدمة.',
    descriptionEn: 'A cognitive tool for reframing distorted thoughts associated with trauma.',
    stage: 'regulation',
    route: '/recovery/trc/thought-reframing',
    anchorId: 'thought-reframing',
    downloadables: [],
    nextStep: 'trauma-journal',
    previousStep: 'eft-tapping',
    completionKey: 'tamkinly_trc_thought_reframing_done',
    isInteractive: true,
    isAvailable: true,
    safetyLevel: 'moderate',
    sectionType: 'therapeutic',
    contraindications: ['acute-crisis'],
    estimatedMinutes: 12
  },
  // Wave 3 — Trauma Journal (planned)
  {
    id: 'trauma-journal',
    labelAr: 'يوميات الصدمة',
    labelEn: 'Trauma Journal',
    descriptionAr: 'أداة كتابية منظمة لمعالجة التجارب الصادمة بأسلوب آمن ومتدرج.',
    descriptionEn: 'A structured writing tool for processing traumatic experiences in a safe, gradual manner.',
    stage: 'regulation',
    route: '/recovery/trc/trauma-journal',
    anchorId: 'trauma-journal',
    downloadables: [],
    nextStep: 'trauma-responses',
    previousStep: 'thought-reframing',
    completionKey: 'tamkinly_trc_trauma_journal_done',
    isInteractive: true,
    isAvailable: true,
    safetyLevel: 'higher',
    sectionType: 'therapeutic',
    contraindications: ['active-dissociation', 'severe-dissociation', 'recent-trauma'],
    estimatedMinutes: 15
  },
  {
    id: 'trauma-responses',
    labelAr: 'أنماط استجابة الصدمة',
    labelEn: 'Trauma Response Patterns',
    descriptionAr: 'افهم استجاباتك الأربع: قتال، هرب، تجميد، استسلام.',
    descriptionEn: 'Understand your four responses: fight, flight, freeze, fawn.',
    stage: 'regulation',
    route: '/recovery/trc/what-happens-during-trauma-responses',
    anchorId: 'trauma-responses',
    downloadables: ['trc-08-response-patterns-reference'],
    nextStep: 'shame-recovery',
    previousStep: 'trauma-journal',
    completionKey: 'tamkinly_trc_trauma_responses_done',
    isInteractive: true,
    isAvailable: true, // Wave 2C
    safetyLevel: 'higher',
    sectionType: 'therapeutic',
    estimatedMinutes: 12
  },
  {
    id: 'shame-recovery',
    labelAr: 'العار وإعادة البناء',
    labelEn: 'Shame & Self-Blame Reframing',
    descriptionAr: 'الصدمة تخلق قصة مدمّرة عن الذات: "أنا السبب"، "جسدي قذر". هنا تعيد صياغة هذه الأفكار بأفكار واقعية: "كنت ضحية"، "المسؤولية على المعتدي".',
    descriptionEn: 'Trauma creates a destructive self-story: "It was my fault", "My body is dirty". Here you reframe these with realistic thoughts: "I was a victim", "Responsibility lies with the perpetrator".',
    stage: 'regulation',
    route: '/recovery/trc/shame-recovery',
    anchorId: 'shame-recovery',
    downloadables: [],
    nextStep: 'boundaries',
    previousStep: 'trauma-responses',
    completionKey: 'tamkinly_trc_shame_recovery_done',
    isInteractive: true,
    isAvailable: true,
    safetyLevel: 'moderate',
    sectionType: 'therapeutic',
    contraindications: ['severe-dissociation', 'acute-crisis'],
    estimatedMinutes: 15
  },
  {
    id: 'therapist-selection',
    labelAr: 'اختيار المعالج',
    labelEn: 'Finding a Therapist',
    descriptionAr: 'كيف تجد معالجاً مناسباً لصدماتك.',
    descriptionEn: 'How to find a therapist suited to your trauma.',
    stage: 'integration',
    route: '/recovery/trc/journey',
    anchorId: 'therapist-selection',
    downloadables: [],
    nextStep: 'recovery-milestones',
    previousStep: 'boundaries',
    completionKey: 'tamkinly_trc_therapist_done',
    isInteractive: true,
    isAvailable: false,
    safetyLevel: 'low',
    sectionType: 'standard',
    estimatedMinutes: 10
  },
  {
    id: 'recovery-milestones',
    labelAr: 'معالم التعافي',
    labelEn: 'Recovery Milestones',
    descriptionAr: 'تتبع تقدمك واحتفل به.',
    descriptionEn: 'Track your progress and celebrate it.',
    stage: 'integration',
    route: '/recovery/trc/journey',
    anchorId: 'recovery-milestones',
    downloadables: [],
    nextStep: null, // Journey complete
    previousStep: 'therapist-selection',
    completionKey: 'tamkinly_trc_milestones_done',
    isInteractive: true,
    isAvailable: false,
    safetyLevel: 'low',
    sectionType: 'standard',
    estimatedMinutes: 10
  }
];

// ============================================================
// SHARED JOURNEY UTILITIES
// ============================================================

export type RecoveryProgram = 'porn-recovery' | 'trc';

export interface RecoveryJourneyOverview {
  program: RecoveryProgram;
  labelAr: string;
  labelEn: string;
  targetAudienceAr: string;
  targetAudienceEn: string;
  whyStartHereAr: string;
  whyStartHereEn: string;
  whatYouFindAr: string;
  whatYouFindEn: string;
  journeyNatureAr: string;
  journeyNatureEn: string;
  firstStepAr: string;
  firstStepEn: string;
  firstStepRoute: string;
  totalSteps: number;
  availableSteps: number;
  color: string;
}

export const RECOVERY_JOURNEYS: Record<RecoveryProgram, RecoveryJourneyOverview> = {
  'porn-recovery': {
    program: 'porn-recovery',
    labelAr: 'التعافي من الأنماط القهرية',
    labelEn: 'Recovery from Compulsive Patterns',
    targetAudienceAr: 'من يعاني من أنماط قهرية مرتبطة بالإباحية أو السلوك الجنسي القهري',
    targetAudienceEn: 'Those experiencing compulsive patterns related to pornography or compulsive sexual behavior',
    whyStartHereAr: 'لأن هذا النمط يعمل خارج الوعي — وفهمه أولاً يفتح باب التعافي الحقيقي',
    whyStartHereEn: 'Because this pattern operates below awareness — understanding it first opens the door to real recovery',
    whatYouFindAr: 'منهجية من 5 مراحل، 8 خطوات تفاعلية، 11 أداة قابلة للتحميل، أدوات تدخل فوري',
    whatYouFindEn: 'A 5-stage methodology, 8 interactive steps, 11 downloadable tools, immediate intervention tools',
    journeyNatureAr: 'رحلة تدريجية: فهم → بناء أنظمة → التعامل مع الدوافع → فهم الانتكاس → بناء هوية جديدة',
    journeyNatureEn: 'A gradual journey: understand → build systems → handle urges → understand relapse → build new identity',
    firstStepAr: 'التعرف على النمط',
    firstStepEn: 'Recognize the Pattern',
    firstStepRoute: '/recovery/porn-recovery',
    totalSteps: PORN_RECOVERY_STEPS.length,
    availableSteps: PORN_RECOVERY_STEPS.filter(s => true).length, // All available
    color: '#3DD4B0'
  },
  'trc': {
    program: 'trc',
    labelAr: 'التعافي من الصدمات الجنسية',
    labelEn: 'Trauma Recovery',
    targetAudienceAr: 'من يتعامل مع آثار صدمات أو تحرش أو اعتداء جنسي',
    targetAudienceEn: 'Those dealing with effects of sexual trauma, harassment, or assault',
    whyStartHereAr: 'لأن الصدمة مخزنة في الجسد والجهاز العصبي — وتنظيمهما أولاً شرط أساسي لأي خطوة لاحقة',
    whyStartHereEn: 'Because trauma is stored in the body and nervous system — regulating them first is a prerequisite for any subsequent step',
    whatYouFindAr: 'منهجية من 3 مراحل سريرية، أدوات تنظيم وإدارة أزمة، بروتوكولات أمان إلزامية',
    whatYouFindEn: 'A 3-stage clinical methodology, regulation and crisis management tools, mandatory safety protocols',
    journeyNatureAr: 'رحلة سريرية: أمان واستقرار → تنظيم → تعافي وتكامل — بوتيرة تحددها أنت',
    journeyNatureEn: 'A clinical journey: safety & stabilization → regulation → integration — at your own pace',
    firstStepAr: 'تنظيم الحواس 5-4-3-2-1',
    firstStepEn: '5-4-3-2-1 Sensory Grounding',
    firstStepRoute: '/recovery/trc/grounding',
    totalSteps: TRC_STEPS.filter(s => s.isAvailable).length,
    availableSteps: TRC_STEPS.filter(s => s.isAvailable).length,
    color: '#1F6F78'
  }
};

// Utility functions
export function getPornRecoveryStepById(id: PornRecoveryStepId): PornRecoveryJourneyStep | undefined {
  return PORN_RECOVERY_STEPS.find(s => s.id === id);
}

export function getTrcStepById(id: TrcStepId): TrcJourneyStep | undefined {
  return TRC_STEPS.find(s => s.id === id);
}

export function getPornRecoveryStepsByStage(stage: PornRecoveryStageId): PornRecoveryJourneyStep[] {
  return PORN_RECOVERY_STEPS.filter(s => s.stage === stage);
}

export function getTrcStepsByStage(stage: TrcStageId): TrcJourneyStep[] {
  return TRC_STEPS.filter(s => s.stage === stage);
}

export function getTrcAvailableSteps(): TrcJourneyStep[] {
  return TRC_STEPS.filter(s => s.isAvailable);
}

export function getNextStepForProgram(program: RecoveryProgram, currentStepId: string): { nextStepId: string | null; route: string } | null {
  if (program === 'porn-recovery') {
    const step = PORN_RECOVERY_STEPS.find(s => s.id === currentStepId);
    if (!step || !step.nextStep) return null;
    const next = PORN_RECOVERY_STEPS.find(s => s.id === step.nextStep);
    return next ? { nextStepId: next.id, route: next.route } : null;
  }
  if (program === 'trc') {
    const step = TRC_STEPS.find(s => s.id === currentStepId);
    if (!step || !step.nextStep) return null;
    const next = TRC_STEPS.find(s => s.id === step.nextStep);
    return next ? { nextStepId: next.id, route: next.route } : null;
  }
  return null;
}
