/**
 * Protocol 2: Alternative Code — Content
 * 
 * Source: Uploaded therapeutic specification (authoritative)
 * Brand: Tamkinly / تمكينلي (CORRECTED from prototype)
 * 
 * 5 steps · 15 minutes · Neural substitution based
 */

import type { ProtocolStep, ProtocolMeta } from '@/components/therapeutic/types';

export const ALTERNATIVE_CODE_META: ProtocolMeta = {
  title: {
    ar: 'بروتوكول الشفرة البديلة',
    en: 'The Alternative Code Protocol',
  },
  subtitle: {
    ar: 'تحييد الذاكرة وإعادة توجيهها',
    en: 'Neutralizing the Memory and Redirecting It',
  },
  badge: {
    ar: 'تمكينلي · أداة تحرر عميق',
    en: 'Tamkinly · A Deep Liberation Tool',
  },
  intro: {
    ar: 'بصفتي معالجاً نفسياً، أؤكد لك أن هذا التمرين يستند إلى واحدة من أعمق آليات علم النفس العصبي: «إعادة توطيد الذاكرة» و«فك الارتباط الشرطي».',
    en: 'As a psychotherapist, I can confirm that this exercise draws upon one of the deepest mechanisms in neuropsychology: "memory reconsolidation" and "conditioned association decoupling."',
  },
  intro2: {
    ar: 'الأسماء ليست مجرد حروف؛ إنها «أزرار تشغيل» تطلق شلالاً من الكيمياء العاطفية في الدماغ. عندما نحاول محو الاسم، نحن نقاوم الدماغ، والمقاومة تزيد التثبيت. لكن عندما نستخدم الاسم ذاته كـ«شفرة مرور» لقصة جديدة تماماً، نحن نقوم بعملية «اختراق» (Hijacking) للمسار العصبي.',
    en: 'Names are not mere letters — they are "launch buttons" that trigger cascades of emotional chemistry in the brain. When we try to erase the name, we resist the brain, and resistance deepens the fixation. But when we use the very same name as a "passcode" to an entirely new story, we perform a "hijacking" of the neural pathway.',
  },
  claim: {
    ar: 'نسحب الشحنة العاطفية من ألم الحنين، لنضخها في تجربة خيالية ممتعة وغامرة.',
    en: 'We withdraw the emotional charge from the pain of longing — and inject it into an immersive, pleasurable imagined experience.',
  },
  totalSteps: 5,
  totalDuration: 900,
  accentColor: '#2A8A94', // Teal variant
};

export const ALTERNATIVE_CODE_STEPS: ProtocolStep[] = [
  {
    id: 1,
    title: {
      ar: 'تفكيك الشفرة',
      en: 'Decoding the Cipher',
    },
    durationLabel: { ar: 'دقيقتان', en: 'Two minutes' },
    duration: 120,
    intro: {
      ar: 'خذ اسم الشخص الذي يثير فيك الحنين أو الألم، واكتبه أمامك كحروف متفرقة. لنأخذ (ر ي ا ن) كمثال.',
      en: 'Take the name of the person who stirs longing or pain in you, and write it before you as separate letters. Let us take (R A Y A N) as an example.',
    },
    instructions: [
      {
        ar: 'اكتب الاسم على ورقة، أو في حقل الكتابة أدناه، كحروف منفصلة بفراغات بينها.',
        en: 'Write the name on paper, or in the input field below, as separated letters with spaces between them.',
      },
      {
        ar: 'انظر إلى الحروف كأنها مجرد أشكال هندسية مجردة، لا علاقة لها بأي إنسان.',
        en: 'Look at the letters as though they were mere abstract geometric shapes, unrelated to any human being.',
      },
      {
        ar: 'كرّر النظر بهدوء. لاحظ كيف تبدأ الحروف تفقد «معناها» تدريجياً، وتبقى أشكالاً فقط.',
        en: 'Repeat this gaze quietly. Notice how the letters gradually lose their "meaning," remaining only as shapes.',
      },
    ],
    hypnotic_cue: {
      ar: 'كل اسم هو شفرة. والشيفرة يمكن إعادة برمجتها.',
      en: 'Every name is a code. And a code can be reprogrammed.',
    },
    reflection: {
      ar: 'كيف تغيّرت نظرتك للحروف بعد تكرار النظر إليها؟',
      en: 'How did your perception of the letters shift after repeatedly looking at them?',
    },
    icon: 'puzzle',
  },
  {
    id: 2,
    title: {
      ar: 'صناعة العالم الجديد',
      en: 'Crafting the New World',
    },
    durationLabel: { ar: 'ثلاث دقائق', en: 'Three minutes' },
    duration: 180,
    intro: {
      ar: 'الآن، حوّل كل حرف إلى كلمة تخدم مشهداً قوياً، إيجابياً، ولا علاقة له بالماضي.',
      en: 'Now, transform each letter into a word that serves a vivid, positive scene, unrelated to the past.',
    },
    instructions: [
      {
        ar: 'اختر لكل حرف كلمة جديدة تبدأ بنفس الحرف، وترتبط بعالم خيالي ممتع.',
        en: 'Choose for each letter a new word that begins with the same letter, and connects to a pleasurable imaginary world.',
      },
      {
        ar: 'مثال: (ر = رحلة، ي = يخت، ا = أستراليا، ن = نيوزيلندا). يمكنك استخدام مثالك الخاص.',
        en: 'Example: (R = River, A = Aurora, Y = Yacht, A = Australia, N = New Zealand). Feel free to use your own.',
      },
      {
        ar: 'اكتب الكلمات الجديدة بجانب كل حرف. هذه هي شفرتك الجديدة.',
        en: 'Write the new words next to each letter. This is your new code.',
      },
    ],
    hypnotic_cue: {
      ar: 'أنت لم تمحُ الاسم. أنت أعطيته عنواناً جديداً لعالم آخر.',
      en: 'You did not erase the name. You gave it a new address to another world.',
    },
    reflection: {
      ar: 'ما الكلمات التي اختارها عقلك تلقائياً؟ ولماذا هذه بالذات؟',
      en: 'Which words did your mind choose automatically? And why these, specifically?',
    },
    icon: 'wand-2',
  },
  {
    id: 3,
    title: {
      ar: 'الغوص الإيحائي',
      en: 'Hypnotic Immersion',
    },
    durationLabel: { ar: 'خمس دقائق', en: 'Five minutes' },
    duration: 300,
    intro: {
      ar: 'أغمض عينيك. لا تحفظ الكلمات، بل ابدأ ببناء عالم كامل منها. تخيل أنك في أستراليا، تقف على سطح يخت فخم.',
      en: 'Close your eyes. Do not memorize the words — instead, begin building an entire world from them. Imagine you are in Australia, standing on the deck of a luxurious yacht.',
    },
    instructions: [
      {
        ar: 'استشعر ارتداد الأمواج تحت قدميك. اشعر بحركة القارب، ودافئ الشمس على كتفيك.',
        en: 'Feel the waves rebounding beneath your feet. Sense the boat\'s motion, and the warmth of the sun on your shoulders.',
      },
      {
        ar: 'استنشق رائحة نسيم البحر المالحة، واسمع صوت الشلالات المتدفقة عند اقترابك من جزر نيوزيلندا الساحرة.',
        en: 'Inhale the salty scent of the sea breeze, and hear the sound of flowing waterfalls as you approach the enchanting islands of New Zealand.',
      },
      {
        ar: 'عش في هذا العالم لخمس دقائق كاملة. اجعل كل حواسك الخمس مشاركة في بناء المشهد.',
        en: 'Live in this world for a full five minutes. Engage all five senses in constructing the scene.',
      },
    ],
    hypnotic_cue: {
      ar: 'العقل لا يفرّق بين واقع يُعاش، وخيال يُحيا بكل الحواس.',
      en: 'The mind does not distinguish between a reality lived and an imagination inhabited with every sense.',
    },
    reflection: {
      ar: 'أي حاسة كانت الأقوى في خيالك؟ البصر، السمع، أم اللمس؟',
      en: 'Which sense was strongest in your imagination? Sight, hearing, or touch?',
    },
    icon: 'compass',
  },
  {
    id: 4,
    title: {
      ar: 'التكثيف والتكرار',
      en: 'Intensification and Repetition',
    },
    durationLabel: { ar: 'ثلاث دقائق', en: 'Three minutes' },
    duration: 180,
    intro: {
      ar: 'عش التجربة بكل حواسك. اجعل الألوان زاهية، والمشاعر مكثفة لأقصى درجة. كرر هذا الغوص التخيلي عدة مرات.',
      en: 'Live the experience with every sense. Make the colors vivid, the emotions intensified to the maximum. Repeat this imaginative immersion several times.',
    },
    instructions: [
      {
        ar: 'ارفع شدة الألوان في خيالك: السماء أكثر زرقة، الماء أكثر لمعاناً، الشمس أكثر دفئاً.',
        en: 'Amplify the colors in your imagination: bluer skies, more shimmering water, warmer sun.',
      },
      {
        ar: 'ارفع حدة المشاعر: الفرح، الحرية، الانتعاش، الاكتمال.',
        en: 'Sharpen the emotions: joy, freedom, invigoration, completeness.',
      },
      {
        ar: 'كرّر الدخول والخروج من هذا العالم ثلاث مرات على الأقل. كل مرة، اجعله أكثر وضوحاً.',
        en: 'Repeat entering and exiting this world at least three times. Each time, make it clearer, more vivid.',
      },
    ],
    hypnotic_cue: {
      ar: 'التكرار ليس حفظاً. التكرار تثبيت عصبي للطريق الجديد.',
      en: 'Repetition is not memorization. Repetition is the neural anchoring of a new path.',
    },
    reflection: {
      ar: 'كيف تغيّرت شدة التجربة بين المرة الأولى والمرة الثالثة؟',
      en: 'How did the intensity of the experience change between the first and the third time?',
    },
    icon: 'flame',
  },
  {
    id: 5,
    title: {
      ar: 'النتيجة: الاستبدال العصبي',
      en: 'The Outcome: Neural Substitution',
    },
    durationLabel: { ar: 'دقيقتان', en: 'Two minutes' },
    duration: 120,
    intro: {
      ar: 'ستُصدم من النتيجة. في كل مرة يحاول فيها عقلك استدعاء هذا «الاسم»، لن يجد الشخص المعني، بل ستندلع في وعيك فوراً تفاصيل القصة الجديدة.',
      en: 'You will be shocked by the result. Each time your mind attempts to summon this "name," it will not find the person — instead, the details of the new story will instantly ignite in your awareness.',
    },
    instructions: [
      {
        ar: 'افتح عينيك. انظر إلى الاسم المكتوب أمامك مرة أخرى.',
        en: 'Open your eyes. Look at the written name once more.',
      },
      {
        ar: 'لاحظ ما يحدث تلقائياً: هل وصلت الصورة القديمة، أم الجديدة؟',
        en: 'Notice what happens automatically: did the old image arrive, or the new one?',
      },
      {
        ar: 'لقد أصبح الاسم مرتبطاً بمسار عصبي جديد تماماً، وتم تفريغ الشحنة العاطفية القديمة.',
        en: 'The name has now been linked to an entirely new neural pathway, and the old emotional charge has been drained.',
      },
    ],
    hypnotic_cue: {
      ar: 'ما لم تعد تستدعيه بكلمة قديمة، يصبح ماضياً لا يعود.',
      en: 'What you no longer summon with the old word becomes a past that does not return.',
    },
    reflection: {
      ar: 'عند سماع الاسم الآن، ما أول صورة وصلت لوعيك؟ القديمة أم الجديدة؟',
      en: 'Upon hearing the name now, what was the first image to reach your awareness? The old or the new?',
    },
    icon: 'check-circle',
  },
];
