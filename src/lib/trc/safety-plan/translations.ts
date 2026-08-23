import type { Locale } from './types';

type TranslationMap = Record<string, Record<Locale, string>>;

export const t: TranslationMap = {
  // Intro
  'intro.title': { ar: 'خطة الأمان الشخصية', en: 'Personal Safety Plan' },
  'intro.subtitle': { ar: 'هذه خطتك أنت — أداة عملية يمكنك الرجوع إليها عندما يرتفع الضيق', en: 'This is YOUR plan — a practical tool you can return to when distress rises' },
  'intro.whatIs': { ar: 'خطة الأمان هي مجموعة إجراءات شخصية تعدها مسبقاً لتستخدمها عند الحاجة. ليست تشخيصاً أو علاجاً — بل أداة مساندة.', en: 'A safety plan is a set of personal actions you prepare in advance to use when needed. It\'s not diagnosis or treatment — it\'s a support tool.' },
  'intro.yourPlan': { ar: 'هذه خطتك أنت. يمكنك تغييرها في أي وقت.', en: 'This is YOUR plan. You can change it anytime.' },
  'intro.saveReminder': { ar: 'لا تحتاج إكمال كل شيء الآن. احفظ وعد لاحقاً.', en: 'You don\'t need to complete everything now. Save and come back later.' },
  'intro.begin': { ar: 'ابدأ بناء خطتي', en: 'Start building my plan' },

  // Warning Signs
  'warnings.title': { ar: 'علامات الإنذار المبكر', en: 'Early Warning Signs' },
  'warnings.description': { ar: 'ما العلامات التي تخبرك أن الضيق يرتفع؟ اختر ما يناسبك.', en: 'What signs tell you distress is rising? Choose what applies to you.' },
  'warnings.physical': { ar: 'علامات جسدية', en: 'Physical signs' },
  'warnings.emotional': { ar: 'علامات عاطفية', en: 'Emotional signs' },
  'warnings.behavioral': { ar: 'علامات سلوكية', en: 'Behavioral signs' },
  'warnings.custom': { ar: 'علامات أخرى خاصة بك', en: 'Other signs specific to you' },
  'warnings.physicalOptions': { ar: 'تسارع ضربات القلب|توتر العضلات|تنفس سطحي|ضيق الصدر|غثيان|ارتعاش|تنميل|صداع', en: 'Racing heart|Muscle tension|Shallow breathing|Chest tightness|Nausea|Trembling|Numbness|Headache' },
  'warnings.emotionalOptions': { ar: 'إرهاق شديد|تنميل عاطفي|تهيج|خوف|عار|شعور بالانفصال|غضب', en: 'Overwhelm|Emotional numbness|Irritability|Fear|Shame|Feeling disconnected|Anger' },
  'warnings.behavioralOptions': { ar: 'عزلة|تجنب|يقظة مفرطة|عدم القدرة على التركيز|مشاكل نوم', en: 'Isolation|Avoidance|Hypervigilance|Can\'t focus|Sleep problems' },

  // Stabilize
  'stabilize.title': { ar: 'ما يساعد على الاستقرار', en: 'What Helps You Stabilize' },
  'stabilize.description': { ar: 'أي من هذه الأدوات تساعدك؟ اختر التي جربتها أو تريد تجربتها.', en: 'Which of these tools help you? Choose ones you\'ve tried or want to try.' },
  'stabilize.a52': { ar: 'تنفس A52 — نمط 5-5-2 للتنظيم اليومي', en: 'A52 Breathing — 5-5-2 pattern for daily regulation' },
  'stabilize.grounding': { ar: 'تنظيم الحواس 5-4-3-2-1 — ارتكاز فوري', en: '5-4-3-2-1 Grounding — immediate relief' },
  'stabilize.safePlace': { ar: 'المكان الآمن — تصور مكان آمن داخلي', en: 'Safe Place — internal safe place visualization' },
  'stabilize.bodyScan': { ar: 'مسح الجسد — انتباه من الرأس للقدمين', en: 'Body Scan — attention from head to feet' },
  'stabilize.otherTools': { ar: 'أدوات أخرى', en: 'Other tools' },

  // Support People
  'support.title': { ar: 'الأشخاص ومصادر الدعم', en: 'Support People & Sources' },
  'support.description': { ar: 'من يمكن أن تتواصل معه عند الحاجة؟', en: 'Who can you contact when needed?' },
  'support.okIfFew': { ar: 'لا بأس إن لم يكن لديك أشخاص كثيرون الآن', en: 'It\'s okay if you don\'t have many people right now' },
  'support.name': { ar: 'الاسم', en: 'Name' },
  'support.relation': { ar: 'العلاقة', en: 'Relationship' },
  'support.method': { ar: 'طريقة التواصل', en: 'Contact method' },
  'support.when': { ar: 'متى تتواصل', en: 'When to contact' },
  'support.add': { ar: 'أضف شخص', en: 'Add person' },

  // Safe Places
  'places.title': { ar: 'الأماكن الآمنة', en: 'Safe Places' },
  'places.description': { ar: 'أين تشعر بالأمان؟ أضف أماكن يمكنك الذهاب إليها.', en: 'Where do you feel safe? Add places you can go to.' },
  'places.name': { ar: 'اسم المكان', en: 'Place name' },
  'places.location': { ar: 'الموقع', en: 'Location' },
  'places.why': { ar: 'لماذا آمن', en: 'Why it\'s safe' },
  'places.add': { ar: 'أضف مكان', en: 'Add place' },

  // Distress Steps
  'distress.title': { ar: 'خطوات عند ارتفاع الضيق', en: 'Steps When Distress Rises' },
  'distress.description': { ar: 'ماذا تفعل في كل مستوى؟ عدّل المقترحات أو اكتب خطواتك.', en: 'What do you do at each level? Edit suggestions or write your own steps.' },
  'distress.mild': { ar: 'ضيق خفيف', en: 'Mild distress' },
  'distress.moderate': { ar: 'ضيق متوسط', en: 'Moderate distress' },
  'distress.high': { ar: 'ضيق شديد', en: 'High distress' },
  'distress.crisis': { ar: 'أزمة', en: 'Crisis' },

  // Professional Help
  'professional.title': { ar: 'متى تطلب مساعدة متخصصة', en: 'When to Seek Professional Help' },
  'professional.description': { ar: 'هذه إرشادات وليست تشخيصاً. المعالج المتخصص يمكنه تقييم وضعك.', en: 'These are guidelines, not diagnosis. A professional can assess your situation.' },
  'professional.suicidal': { ar: 'أفكار إيذاء النفس أو الانتحار — يتطلب مساعدة فورية', en: 'Thoughts of self-harm or suicide — requires IMMEDIATE help' },
  'professional.selfHarm': { ar: 'رغبة في إيذاء النفس', en: 'Self-harm urges' },
  'professional.panic': { ar: 'نوبات هلع تمنع النوم أو العمل', en: 'Panic attacks preventing sleep or work' },
  'professional.cantFunction': { ar: 'عدم القدرة على أداء مهام الحياة اليومية', en: 'Can\'t function in daily life' },
  'professional.dissociation': { ar: 'تفارق لا يمكن السيطرة عليه', en: 'Dissociation can\'t control' },
  'professional.flashbacks': { ar: 'ذكريات اقتحامية ساحقة', en: 'Flashbacks overwhelming' },
  'professional.cantSleep': { ar: 'عدم النوم لأيام', en: 'Can\'t sleep for days' },
  'professional.custom': { ar: 'معيار آخر', en: 'Other criterion' },

  // Exit Plan
  'exit.title': { ar: 'خطة التوقف عند الشعور بعدم الأمان', en: 'Exit Plan When Feeling Unsafe' },
  'exit.description': { ar: 'عندما تشعر أنك تحتاج للتوقف — ماذا تفعل؟', en: 'When you feel you need to stop — what do you do?' },
  'exit.stopSignal': { ar: 'ما الذي يخبرك أن تحتاج التوقف؟', en: 'What tells you to stop?' },
  'exit.firstAction': { ar: 'ما أول شيء تفعله؟', en: 'What\'s the first thing you do?' },
  'exit.grounding': { ar: 'أي تقنية ارتكاز تناسبك أكثر؟', en: 'Which grounding technique works best for you?' },
  'exit.contact': { ar: 'من تتواصل معه؟', en: 'Who do you contact?' },
  'exit.destination': { ar: 'أين تذهب؟', en: 'Where do you go?' },

  // Review
  'review.title': { ar: 'مراجعة خطة الأمان', en: 'Review Safety Plan' },
  'review.edit': { ar: 'تعديل', en: 'Edit' },
  'review.save': { ar: 'احفظ الخطة', en: 'Save Plan' },
  'review.bookmark': { ar: 'احفظ هذه الصفحة في المفضلة للرجوع إليها سريعاً', en: 'Bookmark this page for quick access' },

  // Completion
  'completion.title': { ar: 'خطة الأمان محفوظة', en: 'Safety Plan Saved' },
  'completion.message': { ar: 'خطتك محفوظة على هذا الجهاز. يمكنك العودة في أي وقت لمراجعتها أو تحديثها.', en: 'Your plan is saved on this device. Come back anytime to review or update it.' },
  'completion.reminder': { ar: 'تذكر: خطة الأمان ليست بديلاً عن المعالجة المتخصصة عند الحاجة.', en: 'Remember: a safety plan is not a substitute for professional treatment when needed.' },

  // Navigation
  'nav.next': { ar: 'التالي', en: 'Next' },
  'nav.back': { ar: 'السابق', en: 'Back' },
  'nav.skip': { ar: 'تخطي', en: 'Skip' },
  'nav.stopHere': { ar: 'أريد التوقف هنا', en: 'I want to stop here' },
};

export function getText(key: string, locale: Locale): string {
  return t[key]?.[locale] || key;
}

export function getTranslations(locale: Locale): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, translations] of Object.entries(t)) {
    result[key] = translations[locale] || translations["en"] || key;
  }
  return result;
}
