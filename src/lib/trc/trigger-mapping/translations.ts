"use client";

import type { Locale, TriggerCategory, BodyResponse, EmotionLabel } from './types';

// ============================================================
// Translation Interface
// ============================================================
export interface TriggerMappingTranslations {
  // Intro
  introTitle: string;
  introDescription: string;
  introMethodology: string;
  introWhatItDoes: string;
  introWhatItDoesNot: string;
  introNoEventDescription: string;
  introContraindication: string;
  consentLabel: string;
  beginButton: string;

  // Trigger Step
  triggerStepTitle: string;
  triggerStepSubtitle: string;
  triggerCategoryLabel: string;
  triggerCategories: Record<TriggerCategory, { label: string; description: string }>;
  triggerDescriptionLabel: string;
  triggerDescriptionPlaceholder: string;
  triggerNextButton: string;
  triggerStopHere: string;

  // Body Step
  bodyStepTitle: string;
  bodyStepSubtitle: string;
  bodyResponseLabel: string;
  bodyResponses: Record<BodyResponse, { label: string; description: string }>;
  bodyNotesLabel: string;
  bodyNotesPlaceholder: string;
  bodyNextButton: string;
  bodySkipButton: string;

  // Emotion Step
  emotionStepTitle: string;
  emotionStepSubtitle: string;
  emotionLabel: string;
  emotions: Record<EmotionLabel, string>;
  activationLabel: string;
  activationLow: string;
  activationMid: string;
  activationHigh: string;
  activationOverwhelmed: string;
  emotionNotesLabel: string;
  emotionNotesPlaceholder: string;
  emotionNextButton: string;
  emotionSkipButton: string;

  // Impulse Step
  impulseStepTitle: string;
  impulseStepSubtitle: string;
  impulseLabel: string;
  impulsePlaceholder: string;
  actualResponseLabel: string;
  actualResponsePlaceholder: string;
  impulseNextButton: string;
  impulseSkipButton: string;

  // What Helped Step
  helpedStepTitle: string;
  helpedStepSubtitle: string;
  whatHelpedLabel: string;
  whatHelpedPlaceholder: string;
  wouldHelpNextTimeLabel: string;
  wouldHelpNextTimePlaceholder: string;
  helpedNextButton: string;
  helpedSkipButton: string;

  // Review
  reviewTitle: string;
  reviewSubtitle: string;
  reviewTriggerLabel: string;
  reviewBodyLabel: string;
  reviewEmotionLabel: string;
  reviewImpulseLabel: string;
  reviewHelpedLabel: string;
  reviewAddAnother: string;
  reviewImDone: string;
  reviewDeleteEntry: string;
  reviewNoCategory: string;
  reviewEmpty: string;

  // Completion
  completionTitle: string;
  completionBody: string;
  completionInsight: string;
  completionSaveReminder: string;
  completionNextStepTitle: string;
  completionNextStepDesc: string;
  completionGoHome: string;
  completionEntriesCount: string;

  // Safety
  safetyNotFeelingSafe: string;
  safetyDissociationNotice: string;
  safetyGroundingSuggestion: string;

  // Common
  skipLabel: string;
  nextLabel: string;
  backLabel: string;
}

// ============================================================
// English Translations
// ============================================================
const en: TriggerMappingTranslations = {
  introTitle: 'Understanding Your Trigger Patterns',
  introDescription: 'This tool helps you notice and understand the patterns of what activates your body\'s alarm system. By mapping these patterns, you can begin to anticipate and prepare for them.',
  introMethodology: 'The process follows five gentle steps: what happened, how your body responded, what emotion came up, what you felt like doing, and what helped. You can stop at any point — every step is optional.',
  introWhatItDoes: 'What this tool does: helps you notice patterns between what happens around you and how your body and emotions respond.',
  introWhatItDoesNot: 'What this tool does NOT do: it is not a diagnosis, not therapy, and not exposure. It does not require you to write details about any traumatic event.',
  introNoEventDescription: 'Important: You do not need to describe the traumatic event itself. Focus only on what you noticed in the present moment — a sound, a place, a feeling.',
  introContraindication: 'Note: This tool is best used when at least two weeks have passed since a traumatic event. If the event was recent, consider using grounding or breathing tools first.',
  consentLabel: 'I understand — let me begin',
  beginButton: 'Let\'s begin, gently',

  triggerStepTitle: 'What Happened?',
  triggerStepSubtitle: 'Notice what you experienced — without judgment.',
  triggerCategoryLabel: 'What kind of trigger was it?',
  triggerCategories: {
    sensory: { label: 'Sensory', description: 'A sound, smell, touch, or something you saw' },
    situational: { label: 'Situational', description: 'A place, time, or circumstance' },
    relational: { label: 'Relational', description: 'An interaction with someone' },
    emotional: { label: 'Emotional', description: 'A feeling that triggered other feelings' },
    anniversary: { label: 'Anniversary / Seasonal', description: 'A date, season, or time of year' },
    internal: { label: 'Internal', description: 'A thought, memory, or body sensation' },
    other: { label: 'Other', description: 'Something else' },
  },
  triggerDescriptionLabel: 'What did you notice?',
  triggerDescriptionPlaceholder: 'A sound, a place, a feeling... just notice it.',
  triggerNextButton: 'Next step',
  triggerStopHere: 'I want to stop here',

  bodyStepTitle: 'How Did Your Body Respond?',
  bodyStepSubtitle: 'Your body\'s response is automatic — it\'s trying to protect you.',
  bodyResponseLabel: 'What did you notice in your body?',
  bodyResponses: {
    'racing-heart': { label: 'Racing heart', description: 'Heart beating fast or hard' },
    'shallow-breathing': { label: 'Shallow breathing', description: 'Short, quick breaths' },
    'chest-tightness': { label: 'Chest tightness', description: 'Pressure or tightness in chest' },
    'stomach-tightness': { label: 'Stomach tightness', description: 'Knot or tension in stomach' },
    'muscle-tension': { label: 'Muscle tension', description: 'Tight or clenched muscles' },
    'numbness': { label: 'Numbness', description: 'Feeling numb or disconnected' },
    'dissociation': { label: 'Dissociation', description: 'Feeling far away or unreal' },
    'trembling': { label: 'Trembling', description: 'Shaking or trembling' },
    'hot-flashes': { label: 'Hot flashes', description: 'Sudden heat or warmth' },
    'nausea': { label: 'Nausea', description: 'Feeling sick to your stomach' },
  },
  bodyNotesLabel: 'Anything else about your body\'s response?',
  bodyNotesPlaceholder: 'Optional — write only if you want to.',
  bodyNextButton: 'Next step',
  bodySkipButton: 'Skip this step',

  emotionStepTitle: 'What Emotion Came Up?',
  emotionStepSubtitle: 'There are no wrong emotions. Whatever came up is valid.',
  emotionLabel: 'Which emotion was most present?',
  emotions: {
    fear: 'Fear',
    anxiety: 'Anxiety',
    anger: 'Anger',
    sadness: 'Sadness',
    shame: 'Shame',
    guilt: 'Guilt',
    numbness: 'Numbness',
    overwhelm: 'Overwhelm',
    confusion: 'Confusion',
  },
  activationLabel: 'How activated did you feel?',
  activationLow: 'Within your window of tolerance',
  activationMid: 'Activated, but manageable',
  activationHigh: 'Highly activated',
  activationOverwhelmed: 'Overwhelmed — consider using grounding tools',
  emotionNotesLabel: 'Anything else about the emotion?',
  emotionNotesPlaceholder: 'Optional — write only if you want to.',
  emotionNextButton: 'Next step',
  emotionSkipButton: 'Skip this step',

  impulseStepTitle: 'What Did You Feel Like Doing?',
  impulseStepSubtitle: 'Noticing impulses is not the same as acting on them. Just notice.',
  impulseLabel: 'What did you feel like doing?',
  impulsePlaceholder: 'What impulse came up? Just notice it...',
  actualResponseLabel: 'What did you actually do?',
  actualResponsePlaceholder: 'What happened in the end? Optional...',
  impulseNextButton: 'Next step',
  impulseSkipButton: 'Skip this step',

  helpedStepTitle: 'What Helped?',
  helpedStepSubtitle: 'Even small things count. Sometimes just pausing is enough.',
  whatHelpedLabel: 'What helped in this moment?',
  whatHelpedPlaceholder: 'A breath, a thought, a person, a pause...',
  wouldHelpNextTimeLabel: 'What might help next time?',
  wouldHelpNextTimePlaceholder: 'Something to try or remember for next time...',
  helpedNextButton: 'Save this entry',
  helpedSkipButton: 'Save without this step',

  reviewTitle: 'Your Trigger Map',
  reviewSubtitle: 'Here are the patterns you\'ve noticed.',
  reviewTriggerLabel: 'Trigger',
  reviewBodyLabel: 'Body',
  reviewEmotionLabel: 'Emotion',
  reviewImpulseLabel: 'Impulse',
  reviewHelpedLabel: 'Helped',
  reviewAddAnother: 'Add another entry',
  reviewImDone: 'I\'m done',
  reviewDeleteEntry: 'Remove',
  reviewNoCategory: 'Not specified',
  reviewEmpty: 'No entries yet. Start by adding one.',

  completionTitle: 'You\'ve Started Understanding Your Patterns',
  completionBody: 'Every time you notice a pattern, you gain a little more understanding. Understanding patterns is the first step to managing them — not by fighting them, but by being prepared.',
  completionInsight: 'Understanding patterns is the first step to managing them.',
  completionSaveReminder: 'Your entries have been saved on this device. You can come back anytime to add more.',
  completionNextStepTitle: 'Create a Safety Plan',
  completionNextStepDesc: 'Use what you\'ve learned about your triggers to build a personal safety plan.',
  completionGoHome: 'Return to Tamkinly',
  completionEntriesCount: '{count} trigger {count, plural, one {entry} other {entries}} mapped',

  safetyNotFeelingSafe: 'Not feeling safe right now',
  safetyDissociationNotice: 'If you\'re feeling disconnected or numb, try a grounding exercise first.',
  safetyGroundingSuggestion: 'Try 5-4-3-2-1 grounding',

  skipLabel: 'Skip',
  nextLabel: 'Next',
  backLabel: 'Back',
};

// ============================================================
// Arabic Translations
// ============================================================
const ar: TriggerMappingTranslations = {
  introTitle: 'فهم أنماط محفزاتك',
  introDescription: 'تساعدك هذه الأداة على ملاحظة وفهم أنماط ما ينشط نظام الإنذار في جسدك. برسم خريطة لهذه الأنماط، يمكنك البدء بتوقعها والاستعداد لها.',
  introMethodology: 'العملية تتبع خمس خطوات بسيطة: ماذا حدث، كيف استجاب جسدك، ما الشعور الذي ظهر، ماذا شعرت بالرغبة بفعله، وما الذي ساعد. يمكنك التوقف عند أي نقطة — كل خطوة اختيارية.',
  introWhatItDoes: 'ما تفعله هذه الأداة: تساعدك على ملاحظة الأنماط بين ما يحدث حولك وكيف يستجيب جسدك ومشاعرك.',
  introWhatItDoesNot: 'ما لا تفعله هذه الأداة: ليست تشخيصًا، وليست علاجًا، وليست تعريضًا. لا تتطلب منك كتابة تفاصيل عن الحدث الصادم نفسه.',
  introNoEventDescription: 'مهم: لا تحتاج لوصف الحدث الصادم نفسه. ركز فقط على ما لاحظته في اللحظة الحالية — صوت، مكان، شعور.',
  introContraindication: 'ملاحظة: من الأفضل استخدام هذه الأداة بعد مرور أسبوعين على الأقل على الحدث الصادم. إذا كان الحدث حديثًا، فكر في استخدام أدوات الارتكاز أو التنفس أولاً.',
  consentLabel: 'فهمت — دعني أبدأ',
  beginButton: 'لنبدأ، ببطء',

  triggerStepTitle: 'ماذا حدث؟',
  triggerStepSubtitle: 'لاحظ ما اختبرته — بدون حكم.',
  triggerCategoryLabel: 'ما نوع المحفز؟',
  triggerCategories: {
    sensory: { label: 'حسي', description: 'صوت، رائحة، لمس، أو شيء رأيته' },
    situational: { label: 'ظرفي', description: 'مكان، وقت، أو ظرف' },
    relational: { label: 'علاقي', description: 'تفاعل مع شخص' },
    emotional: { label: 'عاطفي', description: 'شعور أثار مشاعر أخرى' },
    anniversary: { label: 'تاريخي / موسمي', description: 'تاريخ، فصل، أو وقت من السنة' },
    internal: { label: 'داخلي', description: 'فكرة، ذكرى، أو إحساس في الجسد' },
    other: { label: 'آخر', description: 'شيء آخر' },
  },
  triggerDescriptionLabel: 'ماذا لاحظت؟',
  triggerDescriptionPlaceholder: 'صوت، مكان، شعور... فقط لاحظه.',
  triggerNextButton: 'الخطوة التالية',
  triggerStopHere: 'أريد التوقف هنا',

  bodyStepTitle: 'كيف استجاب جسدك؟',
  bodyStepSubtitle: 'استجابة جسدك تلقائية — يحاول حمايتك.',
  bodyResponseLabel: 'ماذا لاحظت في جسدك؟',
  bodyResponses: {
    'racing-heart': { label: 'خفقان القلب', description: 'القلب يخفق بسرعة أو بقوة' },
    'shallow-breathing': { label: 'تنفس سريع', description: 'أنفاس قصيرة وسريعة' },
    'chest-tightness': { label: 'ضيق الصدر', description: 'ضغط أو شد في الصدر' },
    'stomach-tightness': { label: 'شد في المعدة', description: 'عقدة أو شد في المعدة' },
    'muscle-tension': { label: 'شد عضلي', description: 'عضلات مشدودة أو مضمومة' },
    'numbness': { label: 'خدر', description: 'الشعور بالخدر أو الانفصال' },
    'dissociation': { label: 'انفصال', description: 'الشعور بالبعد أو عدم الواقعية' },
    'trembling': { label: 'ارتجاف', description: 'اهتزاز أو ارتجاف' },
    'hot-flashes': { label: 'هبات ساخنة', description: 'حرارة مفاجئة' },
    'nausea': { label: 'غثيان', description: 'الشعور بالغثيان' },
  },
  bodyNotesLabel: 'شيء آخر عن استجابة جسدك؟',
  bodyNotesPlaceholder: 'اختياري — اكتب فقط إذا أردت.',
  bodyNextButton: 'الخطوة التالية',
  bodySkipButton: 'تجاوز هذه الخطوة',

  emotionStepTitle: 'ما الشعور الذي ظهر؟',
  emotionStepSubtitle: 'لا توجد مشاعر خاطئة. كل ما ظهر صحيح.',
  emotionLabel: 'أي شعور كان الأبرز؟',
  emotions: {
    fear: 'خوف',
    anxiety: 'قلق',
    anger: 'غضب',
    sadness: 'حزن',
    shame: 'عار',
    guilt: 'ذنب',
    numbness: 'خدر',
    overwhelm: 'إرهاق شديد',
    confusion: 'ارتباك',
  },
  activationLabel: 'ما مدى النشاط الذي شعرت به؟',
  activationLow: 'ضمن نافذة التحمل',
  activationMid: 'منشط لكن يمكن التعامل معه',
  activationHigh: 'نشاط عالٍ',
  activationOverwhelmed: 'إرهاق شديد — فكّر في استخدام أدوات الارتكاز',
  emotionNotesLabel: 'شيء آخر عن الشعور؟',
  emotionNotesPlaceholder: 'اختياري — اكتب فقط إذا أردت.',
  emotionNextButton: 'الخطوة التالية',
  emotionSkipButton: 'تجاوز هذه الخطوة',

  impulseStepTitle: 'ماذا شعرت بالرغبة بفعله؟',
  impulseStepSubtitle: 'ملاحظة الدوافع ليست مثل التصرف بناءً عليها. فقط لاحظ.',
  impulseLabel: 'ماذا شعرت بالرغبة بفعله؟',
  impulsePlaceholder: 'ما الدافع الذي ظهر؟ فقط لاحظه...',
  actualResponseLabel: 'ماذا فعلت فعلاً؟',
  actualResponsePlaceholder: 'ماذا حدث في النهاية؟ اختياري...',
  impulseNextButton: 'الخطوة التالية',
  impulseSkipButton: 'تجاوز هذه الخطوة',

  helpedStepTitle: 'ما الذي ساعد؟',
  helpedStepSubtitle: 'حتى الأشياء الصغيرة تحسب. أحياناً التوقف فقط يكفي.',
  whatHelpedLabel: 'ما الذي ساعد في هذه اللحظة؟',
  whatHelpedPlaceholder: 'تنفس، فكرة، شخص، توقف...',
  wouldHelpNextTimeLabel: 'ما الذي قد يساعد في المرة القادمة؟',
  wouldHelpNextTimePlaceholder: 'شيء لتجربته أو تذكره في المرة القادمة...',
  helpedNextButton: 'حفظ هذا السجل',
  helpedSkipButton: 'حفظ بدون هذه الخطوة',

  reviewTitle: 'خريطة محفزاتك',
  reviewSubtitle: 'هذه الأنماط التي لاحظتها.',
  reviewTriggerLabel: 'المحفز',
  reviewBodyLabel: 'الجسد',
  reviewEmotionLabel: 'الشعور',
  reviewImpulseLabel: 'الدافع',
  reviewHelpedLabel: 'ما ساعد',
  reviewAddAnother: 'إضافة سجل آخر',
  reviewImDone: 'انتهيت',
  reviewDeleteEntry: 'حذف',
  reviewNoCategory: 'غير محدد',
  reviewEmpty: 'لا توجد سجلات بعد. أضف واحدة للبدء.',

  completionTitle: 'لقد بدأت فهم أنماطك',
  completionBody: 'في كل مرة تلاحظ فيها نمطًا، تكسب فهمًا أكثر قليلاً. فهم الأنماط هو الخطوة الأولى لإدارتها — ليس بمحاربتها، بل بالاستعداد لها.',
  completionInsight: 'فهم الأنماط هو الخطوة الأولى لإدارتها.',
  completionSaveReminder: 'تم حفظ سجلاتك على هذا الجهاز. يمكنك العودة في أي وقت لإضافة المزيد.',
  completionNextStepTitle: 'إنشاء خطة أمان',
  completionNextStepDesc: 'استخدم ما تعلمته عن محفزاتك لبناء خطة أمان شخصية.',
  completionGoHome: 'العودة إلى تمكنلي',
  completionEntriesCount: 'تم رسم خريطة {count} سجل محفز',

  safetyNotFeelingSafe: 'لا أشعر بالراحة الآن',
  safetyDissociationNotice: 'إذا كنت تشعر بالانفصال أو الخدر، جرب تمرين الارتكاز أولاً.',
  safetyGroundingSuggestion: 'جرب الارتكاز 5-4-3-2-1',

  skipLabel: 'تجاوز',
  nextLabel: 'التالي',
  backLabel: 'رجوع',
};

export const translations: Record<Locale, TriggerMappingTranslations> = { en, ar };

export function getTranslations(locale: Locale): TriggerMappingTranslations {
  return translations[locale];
}

