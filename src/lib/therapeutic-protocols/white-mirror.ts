/**
 * Protocol 3: White Mirror — Content
 * 
 * Source: Uploaded therapeutic specification (authoritative)
 * Brand: Tamkinly / تمكينلي (CORRECTED from prototype)
 * 
 * 4 steps · 9 minutes · Pattern Interrupt based
 * REQUIRES safety warning before starting
 */

import type { ProtocolStep, ProtocolMeta } from '@/components/therapeutic/types';

export const WHITE_MIRROR_META: ProtocolMeta = {
  title: {
    ar: 'بروتوكول المرآة البيضاء',
    en: 'The White Mirror Protocol',
  },
  subtitle: {
    ar: 'كسر النمط وإعادة التشفير',
    en: 'Pattern Interrupt and Recoding',
  },
  badge: {
    ar: 'تمكينلي · أداة إعادة تشفير الهوية',
    en: 'Tamkinly · An Identity Recoding Tool',
  },
  intro: {
    ar: 'هذا التمرين مصمم لإيقاف عجلة الأفكار السلبية بقوة، وزرع فكرة جديدة في لحظة السكون التام، بطريقة آمنة وفعالة. يجمع بين تقنية «كسر النمط» (Pattern Interrupt) و«الفراغ الذهني» و«الصوت البديل» في بروتوكول واحد متكامل.',
    en: 'This exercise is designed to forcefully halt the cycle of negative thoughts, and plant a new idea in the moment of complete stillness — in a safe and effective way. It combines the "Pattern Interrupt" technique, the "mental void," and the "alternative voice" into a single integrated protocol.',
  },
  intro2: {
    ar: 'سنحافظ على جوهر «الفراغ الذهني» و«الصوت الجديد»، لكننا ننقله من مساحة الوهم العابر إلى مساحة التطبيق النفسي الآمن والمستدام.',
    en: 'We preserve the essence of the "mental void" and the "new voice" — but we transfer it from the realm of fleeting illusion to the realm of safe, sustainable psychological application.',
  },
  claim: {
    ar: 'السر ليس في قول الفكرة مرة واحدة لتصبح سحراً، بل في الشعور باليقين التام أثناء نطقها في تلك اللحظة بالذات.',
    en: 'The secret is not in saying the idea once to make it magic — but in feeling complete certainty while uttering it in that precise moment.',
  },
  totalSteps: 4,
  totalDuration: 540,
  accentColor: '#0F1C2E', // Navy
};

/** Safety warning content — must be shown BEFORE the protocol starts */
export const WHITE_MIRROR_SAFETY = {
  badge: { ar: 'تحذير قبل البدء', en: 'Read before starting' },
  title: {
    ar: 'هذا التمرين ليس للجميع',
    en: 'This exercise is not for everyone',
  },
  body: {
    ar: 'يستخدم هذا البروتوكول تقنية «كسر النمط» التي قد تُحدث فراغاً ذهنياً مؤقتاً أو شعوراً بالانفصال عن الذات. هذه التجربة آمنة لمعظم الناس، لكنها قد تكون محفزة للقلق الحاد لدى البعض.',
    en: 'This protocol uses a "pattern interrupt" technique that may produce a temporary mental void or a sense of dissociation. This experience is safe for most people, but may trigger acute anxiety in some.',
  },
  doNotUse: {
    ar: 'لا تمارس هذا التمرين إذا كنت تعاني من:',
    en: 'Do not practice this exercise if you experience:',
  },
  conditions: [
    { ar: 'نوبات الهلع أو نوبات القلق الحادة', en: 'Panic attacks or acute anxiety episodes' },
    { ar: 'اضطراب الشخصية الانفصالية (Depersonalization/Derealization)', en: 'Depersonalization/Derealization disorder' },
    { ar: 'الخوف الشديد من الظلام أو العتمة', en: 'Severe fear of darkness (Nyctophobia)' },
    { ar: 'نوبة صدمة نفسية حادة غير معالجة', en: 'Untreated acute psychological trauma' },
    { ar: 'اضطرابات ذهانية أو فصام نشط', en: 'Active psychotic disorders or schizophrenia' },
  ],
  alternative: {
    ar: 'إذا كنت تنطبق عليك أي من هذه الحالات، ننصحك ببروتوكولاتنا الأخرى (التفكيك الزمني أو الشفرة البديلة) الأكثر لطفاً على الجهاز العصبي.',
    en: 'If any of these apply to you, we recommend our other protocols (Temporal Decoupling or The Alternative Code), which are gentler on the nervous system.',
  },
  accept: { ar: 'فهمت، وأرغب في المتابعة بأمان', en: 'I understand, and wish to proceed safely' },
};

export const WHITE_MIRROR_STEPS: ProtocolStep[] = [
  {
    id: 1,
    title: {
      ar: 'التجريد',
      en: 'Abstraction',
    },
    durationLabel: { ar: 'دقيقتان', en: 'Two minutes' },
    duration: 120,
    intro: {
      ar: 'اجلس في مكان هادئ ومضاء جيداً. لا حاجة للظلام أو الأقنعة الحقيقية. سنستخدم الخيال الواعي بدلاً منهما.',
      en: 'Sit in a quiet, well-lit place. No darkness or real masks needed. We will use conscious imagination instead.',
    },
    instructions: [
      {
        ar: 'أغمض عينيك. خذ ثلاثة أنفاس عميقة، كل واحدة أبطأ من سابقتها.',
        en: 'Close your eyes. Take three deep breaths, each slower than the one before.',
      },
      {
        ar: 'تخيل أنك تخلع عنك هويتك الحالية بكل أفكارها ومخاوفها، كأنك تنزع ثوباً قديماً.',
        en: 'Imagine you are removing your current identity with all its thoughts and fears — as if taking off an old garment.',
      },
      {
        ar: 'تخيل أنك تضع على وجهك قناعاً أبيض نقياً، لا ملامح له، ولا تاريخ، ولا أفكار مسبقة. في هذه اللحظة، أنت «لوحة فارغة».',
        en: 'Imagine placing on your face a pure white mask — featureless, history-less, with no prior thoughts. In this moment, you are a "blank canvas."',
      },
    ],
    hypnotic_cue: {
      ar: 'الفكرة القديمة تخص هويةً لم تعد ترتديها الآن.',
      en: 'The old idea belongs to an identity you are no longer wearing.',
    },
    reflection: {
      ar: 'كيف يبدو الإحساس بـ«خلع» الهوية القديمة؟ خفّة؟ فراغ؟ تحرر؟',
      en: 'What does "removing" the old identity feel like? Lightness? Emptiness? Liberation?',
    },
    icon: 'mask',
  },
  {
    id: 2,
    title: {
      ar: 'إحداث الفراغ',
      en: 'Creating the Void',
    },
    durationLabel: { ar: 'ثلاث دقائق', en: 'Three minutes' },
    duration: 180,
    intro: {
      ar: 'افتح عينيك وانظر إلى نقطة ثابتة أمامك (أو في مرآة عادية). حاول استحضار الفكرة السلبية المعتادة. ستلاحظ صعوبة في ربطها بنفسك.',
      en: 'Open your eyes and gaze at a fixed point in front of you (or in a regular mirror). Try to summon the usual negative thought. You will notice difficulty linking it to yourself.',
    },
    instructions: [
      {
        ar: 'افتح عينيك بهدوء. ثبّت نظرك على نقطة ثابتة أمامك، أو في عينيك في المرآة، دون حركة.',
        en: 'Open your eyes quietly. Fix your gaze on a point in front of you, or into your own eyes in the mirror, without movement.',
      },
      {
        ar: 'حاول الآن استحضار الفكرة السلبية المعتادة. لاحظ ما يحدث: الفكرة تخص هويتك القديمة، وليس هذا الوجه الخالي من الملامح.',
        en: 'Now try to summon the usual negative thought. Notice what happens: the thought belongs to your old identity, not to this featureless face.',
      },
      {
        ar: 'ابقَ في هذا الصمت. هذا هو «الفراغ المرجوه» — اللحظة التي تتوقف فيها عجلة الأفكار.',
        en: 'Stay in this silence. This is the "desired void" — the moment the wheel of thoughts comes to a halt.',
      },
    ],
    hypnotic_cue: {
      ar: 'حيث لا هوية، لا يوجد ما يتمسك به الفكر القديم.',
      en: 'Where there is no identity, the old thought has nothing to hold on to.',
    },
    reflection: {
      ar: 'هل لاحظت كيف حاولت الفكرة الظهور ولم تجد مرساها؟ كيف وصف ذلك الصمت؟',
      en: 'Did you notice how the thought tried to surface and found no anchor? How would you describe that silence?',
    },
    icon: 'circle',
  },
  {
    id: 3,
    title: {
      ar: 'زرع الصوت البديل',
      en: 'Planting the Alternative Voice',
    },
    durationLabel: { ar: 'دقيقتان', en: 'Two minutes' },
    duration: 120,
    intro: {
      ar: 'في لحظة الفراغ هذه، استدعي فكرتك الجديدة (الداعمة). انطقها بصوت مسموع، ولكن استخدم نبرة صوت مختلفة تماماً.',
      en: 'In this moment of void, summon your new (supportive) idea. Speak it aloud, but use a completely different tone of voice.',
    },
    instructions: [
      {
        ar: 'استحضر فكرتك الجديدة الداعمة. اجعلها واضحة، قصيرة، وموجهة (مثلاً: «أنا أختار ما يحدث لي»).',
        en: 'Summon your new supportive idea. Make it clear, short, and directed (for example: "I choose what happens to me").',
      },
      {
        ar: 'انطقها بصوت مسموع، لكن بنبرة مختلفة تماماً عن نبرة القلق أو التردد المعتادة. استخدم صوتاً هادئاً، عميقاً، وحازماً جداً (كأنه صوت مرشدك الداخلي).',
        en: 'Speak it aloud, but in a tone completely different from your usual anxiety or hesitation. Use a calm, deep, very firm voice (as if it were the voice of your inner guide).',
      },
      {
        ar: 'السر ليس في قولها مرة واحدة لتصبح سحراً، بل في الشعور باليقين التام أثناء نطقها في تلك اللحظة بالذات.',
        en: 'The secret is not in saying it once to make it magic — but in feeling complete certainty while uttering it in that precise moment.',
      },
    ],
    hypnotic_cue: {
      ar: 'الصوت الذي يخرج من الفراغ، يحمل قوة الفراغ ذاته.',
      en: 'The voice that emerges from the void carries the power of the void itself.',
    },
    reflection: {
      ar: 'كيف اختلفت نبرتك الجديدة عن نبرتك المعتادة؟ ما الإحساس الجسدي المصاحب لها؟',
      en: 'How did your new tone differ from your usual tone? What bodily sensation accompanied it?',
    },
    icon: 'mic',
  },
  {
    id: 4,
    title: {
      ar: 'التثبيت',
      en: 'Anchoring',
    },
    durationLabel: { ar: 'دقيقتان', en: 'Two minutes' },
    duration: 120,
    intro: {
      ar: 'التغيير يحتاج إلى دليل. هذا الصوت الجديد لن يصبح طبيعياً بمجرد قوله مرة. سيصبح طبيعياً بالتكرار اليومي.',
      en: 'Change requires evidence. This new voice will not become natural by being said once. It will become natural through daily repetition.',
    },
    instructions: [
      {
        ar: 'أغمض عينيك مجدداً. اشعر بصدى الصوت الجديد في صدرك. اسمح له أن يستقر قبل العودة.',
        en: 'Close your eyes again. Feel the resonance of the new voice in your chest. Allow it to settle before returning.',
      },
      {
        ar: 'خذ عهداً على نفسك بأن تكرر هذا التمرين العقلي يومياً لمدة أسبوع كامل، في نفس الوقت تقريباً.',
        en: 'Make a commitment to repeat this mental exercise daily for a full week, at roughly the same time.',
      },
      {
        ar: 'بعد أسبوع، سيتحول هذا «الصوت الجديد» من مجرد صدى غريب، إلى صوتك الداخلي الطبيعي.',
        en: 'After a week, this "new voice" will transform from a strange echo into your natural inner voice.',
      },
    ],
    hypnotic_cue: {
      ar: 'ما تقوله بيقين سبع مرات، يصبح حقيقتك الثامنة.',
      en: 'What you say with certainty seven times becomes your eighth truth.',
    },
    reflection: {
      ar: 'ما الوقت من اليوم الذي ستختاره لتكرار هذا التمرين؟ ولماذا هذا الوقت بالذات؟',
      en: 'What time of day will you choose to repeat this exercise? And why this specific time?',
    },
    icon: 'anchor',
  },
];
