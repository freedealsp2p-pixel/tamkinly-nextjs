/**
 * Protocol 4: Truncated Sentence — Content (FREE exercise)
 *
 * Source: User therapeutic specification (authoritative, 2026-09-26)
 * Brand: Tamkinly / تمكينلي
 *
 * 5 interactive screens · 2 audio tracks · 72h ritual timer · 9-day journal
 * FREE — no access gate, no purchase flow.
 */

export interface Bilingual {
  ar: string;
  en: string;
}

export const TRUNCATED_SENTENCE_META = {
  title: {
    ar: 'تقنية الجملة المبتورة',
    en: 'The Truncated Sentence Technique',
  } as Bilingual,
  subtitle: {
    ar: 'اكتب الجملة السلبية… اطمس وسطها… واعكسها في ثلاث ليالٍ',
    en: 'Write the negative sentence… blank out its middle… reverse it in three nights',
  } as Bilingual,
  badge: {
    ar: 'تمكينلي · تمرين مجاني بالكامل',
    en: 'Tamkinly · Completely Free Exercise',
  } as Bilingual,
  intro: {
    ar: 'هناك جملة عن نفسك تكررها منذ سنوات طويلة. لم تعد تحتاج إلى دليل؛ صارت تشبه الحقيقة. لكن انتبه: أي جملة تُكرَّر بما يكفي تصير باباً يدخل منها كل شكّ ونقد وخوف، فيمتلئ ما بين بدايتها ونهايتها بمعانٍ لم تخترها أنت.',
    en: 'There is a sentence about yourself you have repeated for years. It no longer needs proof; it feels like fact. But notice: any sentence repeated enough becomes a door through which every doubt, criticism and fear walks in — filling the space between its beginning and its end with meanings you never chose.',
  } as Bilingual,
  intro2: {
    ar: 'تقنية الجملة المبتورة تقلب المعادلة: نأخذ الجملة، نطمس وسطها بالشريط الأسود، ونترك عيناك تقرأان البداية والنهاية فقط. ثم نمنح الجملة طقساً مادياً حقيقياً — ورقة، وماء، وثلاث ليالٍ — ونختم بمفكرة تحول من تسعة أيام تبني اليقين الجديد خطوة بخطوة.',
    en: 'The Truncated Sentence Technique flips the equation: we take the sentence, blank out its middle with black tape, and let your eyes read only the beginning and the end. Then we give the sentence a real physical ritual — paper, water, three nights — and close with a nine-day transformation journal that builds the new certainty step by step.',
  } as Bilingual,
  claim: {
    ar: 'ما يُطمَس لا يستطيع إكمال جملته عليك.',
    en: 'What is blanked out cannot finish its sentence over you.',
  } as Bilingual,
  durationLabel: { ar: '١٥ دقيقة + ٩ أيام', en: '15 minutes + 9 days' } as Bilingual,
  freeLabel: { ar: 'مجاني', en: 'Free' } as Bilingual,
};

/** Audio tracks — files live at /public/audio/truncated-sentence/ */
export const AUDIO_TRACKS = {
  intro: {
    src: '/audio/truncated-sentence/intro-application.mp3',
    title: { ar: 'المقدمة والتطبيق', en: 'Introduction & Application' } as Bilingual,
    durationLabel: { ar: '٢:٤٥ دقيقة', en: '2:45 min' } as Bilingual,
    description: {
      ar: 'يوجهك للتحضير، وكتابة الجملة، وطمسها بالشريط اللاصق، وطي الورقة ووضعها في الماء.',
      en: 'Guides you through preparing, writing the sentence, blanking it with tape, folding the paper and placing it in the water.',
    } as Bilingual,
  },
  night3: {
    src: '/audio/truncated-sentence/third-night.mp3',
    title: { ar: 'ليلة اليوم الثالث', en: 'Night of the Third Day' } as Bilingual,
    durationLabel: { ar: 'الطقس الختامي', en: 'Closing ritual' } as Bilingual,
    description: {
      ar: 'توجيه صوتي لكيفية استخدام ماء الكوب لرسم علامة (+) على الجبين، ثم التخلص من الورقة والماء.',
      en: 'Audio guidance for using the cup\'s water to draw a (+) mark on your forehead, then discarding the paper and the water.',
    } as Bilingual,
  },
};

/** Screen 4 — physical ritual instructions (standard bullet list, NO checkboxes) */
export const PHYSICAL_STEPS: Bilingual[] = [
  {
    ar: 'اكتب ما تراه على الشاشة في ورقة حقيقية وضع شريطاً أسود في المنتصف.',
    en: 'Write what you see on the screen on a real sheet of paper and place a black tape across the middle.',
  },
  {
    ar: 'اطوِ الورقة 3 طيات باتجاهك.',
    en: 'Fold the paper 3 times toward yourself.',
  },
  {
    ar: 'ارسم الرمز المخصص على الوجه الخارجي.',
    en: 'Draw the dedicated symbol on the outer face.',
  },
  {
    ar: 'ضعها في كوب ماء.',
    en: 'Place it in a cup of water.',
  },
];

/** The dedicated symbol shown on screen 4 (user draws it on the folded paper) */
export const SYMBOL_LABEL = {
  ar: 'رمز العودة',
  en: 'The Symbol of Return',
} as Bilingual;
export const SYMBOL_HINT = {
  ar: 'دائرة يخترقها خط مستقيم نحو الأسفل — عودتك إلى مركزك.',
  en: 'A circle pierced by a straight line downward — your return to your center.',
} as Bilingual;

/** Screen 5 — waiting phase */
export const TIMER_COPY = {
  title: { ar: 'مؤقت الانتظار', en: 'The Waiting Timer' } as Bilingual,
  message: {
    ar: 'ورقتك الآن تتطهر. عد هنا في ليلة اليوم الثالث.',
    en: 'Your paper is now purifying. Return here on the night of the third day.',
  } as Bilingual,
  reminderTitle: { ar: 'تذكير بالبريد الإلكتروني', en: 'Email Reminder' } as Bilingual,
  reminderNote: {
    ar: 'سنرسل لك تنبيهاً في ليلة اليوم الثالث لتعود وتكمل الطقس.',
    en: 'We will send you a notice on the night of the third day so you return and complete the ritual.',
  } as Bilingual,
  reminderCta: { ar: 'تفعيل الإشعار', en: 'Activate Notification' } as Bilingual,
  reminderDone: {
    ar: 'تم تفعيل التذكير — سنراك في ليلة اليوم الثالث.',
    en: 'Reminder activated — see you on the night of the third day.',
  } as Bilingual,
  emailLabel: { ar: 'بريدك الإلكتروني', en: 'Your email' } as Bilingual,
  unlockedTitle: {
    ar: 'ليلة اليوم الثالث — الطقس الختامي',
    en: 'Night of the Third Day — The Closing Ritual',
  } as Bilingual,
  unlockedBody: {
    ar: 'حان وقت الختام: استخدم ماء الكوب الذي انحلّت فيه الورقة لرسم علامة (+) على جبينك، ثم تخلص من الورقة والماء معاً. استمع إلى التوجيه الصوتي وأنت تنفّذ.',
    en: 'Time to close: use the water in the cup — where the paper has dissolved — to draw a (+) mark on your forehead, then discard the paper and the water together. Play the audio guidance as you do it.',
  } as Bilingual,
} as const;

/** 9-day journal — 3 phases with gain-framing questions */
export const JOURNAL_PHASES = [
  {
    id: 1,
    name: { ar: 'الاتساع والهدوء', en: 'Expansion & Calm' } as Bilingual,
    days: [1, 2, 3],
    question: {
      ar: 'ما هو الشعور الإيجابي أو الخفة التي لاحظتها في تفكيرك اليوم؟',
      en: 'What positive feeling or lightness did you notice in your thinking today?',
    } as Bilingual,
  },
  {
    id: 2,
    name: { ar: 'تشكل اليقين', en: 'Certainty Taking Shape' } as Bilingual,
    days: [4, 5, 6],
    question: {
      ar: 'اكتب موقفاً بسيطاً أو حواراً داخلياً اليوم عكس إيمانك بقيمتك الذاتية الإيجابية.',
      en: 'Write a simple situation or an internal dialogue from today that contradicted your belief in your positive self-worth.',
    } as Bilingual,
  },
  {
    id: 3,
    name: { ar: 'التجلي', en: 'Embodiment' } as Bilingual,
    days: [7, 8, 9],
    question: {
      ar: 'كيف تصرفت اليوم كشخص يمتلك هذه الصفة الإيجابية بيقين تام؟',
      en: 'How did you act today as a person who possesses this positive trait with complete certainty?',
    } as Bilingual,
  },
];

/** Fixed daily tasks — displayed as plain bullet points (never checkboxes) */
export const JOURNAL_DAILY_TASKS: Bilingual[] = [
  {
    ar: 'راقب الأفكار الداعمة التي تظهر في ذهنك اليوم بشكل عفوي.',
    en: 'Notice the supportive thoughts that appear spontaneously in your mind today.',
  },
  {
    ar: 'تنفس بعمق لمدة دقيقة، واستشعر الامتنان للوضوح الذهني الذي تكتسبه.',
    en: 'Breathe deeply for one minute, and feel gratitude for the mental clarity you are gaining.',
  },
  {
    ar: 'ابتسم أمام المرآة كدليل مادي على تقبلك لهويتك الإيجابية الجديدة.',
    en: 'Smile at the mirror as physical proof of your acceptance of your new positive identity.',
  },
];

/** Closing message — shown after day 9 is saved (verbatim from the source spec) */
export const JOURNAL_CLOSING_MESSAGE = {
  ar: 'مرحباً بك في حقيقتك. لقد اكتملت الأيام التسعة، والآن أنت تقف في مساحة جديدة من اليقين. هذه النسخة التي تختبرها اليوم ليست شخصاً جديداً تحاول تقمصه، بل هي عودة إلى طبيعتك الأصيلة. كلماتك الإيجابية أصبحت واقعاً حياً، وأفكارك الداعمة تبني مسارك بثبات. امضِ الآن في يومك بهذا التجلي الجديد واستمتع بتجسيد هذه الصورة المشرقة.',
  en: 'Welcome to your reality. The nine days are complete, and now you stand in a new space of certainty. This version of you that you are experiencing today is not a new person you are trying to impersonate — it is a return to your authentic nature. Your positive words have become a living reality, and your supportive thoughts are steadily building your path. Go now into your day with this new embodiment, and enjoy bringing this bright image to life.',
} as Bilingual;

export const JOURNAL_COPY = {
  title: { ar: 'مفكرة التحول', en: 'The Transformation Journal' } as Bilingual,
  subtitle: {
    ar: 'تسعة أيام متتالية — ثلاث مراحل تبني اليقين الجديد.',
    en: 'Nine consecutive days — three phases that build the new certainty.',
  } as Bilingual,
  dayLabel: { ar: 'اليوم', en: 'Day' } as Bilingual,
  phaseLabel: { ar: 'المرحلة', en: 'Phase' } as Bilingual,
  tasksTitle: { ar: 'مهامك اليومية الثابتة', en: 'Your fixed daily tasks' } as Bilingual,
  placeholder: { ar: 'اكتب إجابتك هنا…', en: 'Write your answer here…' } as Bilingual,
  save: { ar: 'حفظ يومية اليوم', en: 'Save today\'s entry' } as Bilingual,
  saved: { ar: 'محفوظ', en: 'Saved' } as Bilingual,
  lockedDay: { ar: 'يُفتح لاحقاً', en: 'Opens later' } as Bilingual,
  opensIn: { ar: 'يُفتح بعد', en: 'Opens in' } as Bilingual,
  notStarted: {
    ar: 'تُفتح مفكرة التحول بعد بدء الطقس الأول — أكمل الشاشات الخمس أولاً.',
    en: 'The transformation journal opens after you begin the first ritual — complete the five screens first.',
  } as Bilingual,
  daysDone: { ar: 'أيام مكتملة', en: 'days completed' } as Bilingual,
  answered: { ar: 'أجبت اليوم — عودة غداً.', en: 'You answered today — see you tomorrow.' } as Bilingual,
} as const;

export const SCREENS_COPY = {
  // Screen 1
  confrontTitle: {
    ar: 'ما هي الفكرة السلبية التي تود عكسها اليوم؟',
    en: 'What is the negative thought you want to reverse today?',
  } as Bilingual,
  confrontPlaceholder: {
    ar: 'أنا أعتقد أنني لست شخصاً جميلاً',
    en: 'I believe I am not a beautiful person',
  } as Bilingual,
  confrontBtn: { ar: 'تفكيك الفكرة', en: 'Deconstruct the Thought' } as Bilingual,
  confrontHint: {
    ar: 'اكتبها كما تقولها لنفسك في داخلك — بصيغتك أنت.',
    en: 'Write it the way you say it inside your head — in your own words.',
  } as Bilingual,
  confrontError: {
    ar: 'اكتب جملة من كلمتين على الأقل.',
    en: 'Write a sentence of at least two words.',
  } as Bilingual,

  // Screen 2
  truncateTitle: {
    ar: 'اقرأ البداية والنهاية فقط… لا تدع عقلك يملأ الفراغ.',
    en: 'Read only the beginning and the end… do not let your mind fill the blank.',
  } as Bilingual,
  truncateBtn: { ar: 'طمس الفراغ', en: 'Blank Out the Gap' } as Bilingual,

  // Screen 3
  tapingTitle: {
    ar: 'الفراغ الآن مطموس.',
    en: 'The blank is now covered.',
  } as Bilingual,
  tapingBtn: { ar: 'انتقل للتطبيق المادي', en: 'Continue to the Physical Ritual' } as Bilingual,

  // Screen 4
  physicalTitle: { ar: 'طقس الورقة والماء', en: 'The Paper & Water Ritual' } as Bilingual,
  physicalIntro: {
    ar: 'الآن انقل ما حدث هنا إلى العالم الحقيقي — بخط يدك.',
    en: 'Now carry what happened here into the real world — in your own handwriting.',
  } as Bilingual,
  physicalBtn: { ar: 'بدء مؤقت الأيام الثلاثة', en: 'Start the Three-Day Timer' } as Bilingual,
  audioCardTitle: { ar: 'توجيه صوتي مرافق', en: 'Companion Audio Guide' } as Bilingual,

  // Generic
  startCta: { ar: 'ابدأ التجربة', en: 'Begin the Experience' } as Bilingual,
  restart: { ar: 'إعادة التجربة من البداية', en: 'Restart the experience' } as Bilingual,
  editSentence: { ar: 'تعديل الجملة', en: 'Edit the sentence' } as Bilingual,
  journalTab: { ar: 'مفكرة التحول', en: 'Transformation Journal' } as Bilingual,
  exerciseTab: { ar: 'التمرين', en: 'The Exercise' } as Bilingual,
  audioLocked: {
    ar: 'يُفتح هذا المسار في ليلة اليوم الثالث.',
    en: 'This track unlocks on the night of the third day.',
  } as Bilingual,
  audioUnavailable: {
    ar: 'النسخة الصوتية قيد الإضافة — النص المكتوب يكفي لأداء الطقس.',
    en: 'The audio version is being added — the written text is enough to perform the ritual.',
  } as Bilingual,
  freeBadge: { ar: 'مجاني بالكامل', en: 'Completely free' } as Bilingual,
  whatInside: { ar: 'ماذا يوجد بالداخل؟', en: 'What\'s inside?' } as Bilingual,
  insideItems: [
    { ar: 'خمس شاشات تفاعلية تنقلك من الجملة إلى الطقس.', en: 'Five interactive screens that carry you from the sentence to the ritual.' },
    { ar: 'مساران صوتيان: المقدمة والتطبيق، وليلة اليوم الثالث.', en: 'Two audio tracks: Introduction & Application, and Night of the Third Day.' },
    { ar: 'طقس مادي حقيقي: ورقة، شريط أسود، رمز، وكوب ماء.', en: 'A real physical ritual: paper, black tape, a symbol, and a cup of water.' },
    { ar: 'مؤقت ٧٢ ساعة مع تذكير بالبريد الإلكتروني.', en: 'A 72-hour timer with an email reminder.' },
    { ar: 'مفكرة تحول من ٩ أيام بثلاث مراحل.', en: 'A 9-day transformation journal in three phases.' },
  ] as { ar: string; en: string }[],
} as const;
