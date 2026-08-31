/**
 * Protocol 1: Temporal Decoupling — Content
 * 
 * Source: Uploaded therapeutic specification (authoritative)
 * Brand: Tamkinly / تمكينلي (CORRECTED from prototype)
 * 
 * 7 steps · 12 minutes · Memory Reconsolidation based
 */

import type { ProtocolStep, ProtocolMeta } from '@/components/therapeutic/types';

export const TEMPORAL_DECOUPLING_META: ProtocolMeta = {
  title: {
    ar: 'بروتوكول التفكيك الزمني',
    en: 'The Temporal Decoupling Protocol',
  },
  subtitle: {
    ar: 'الاستيقاظ من وهم الذاكرة',
    en: 'Awakening from the Illusion of Memory',
  },
  badge: {
    ar: 'تمكينلي · أداة تحرر عميق',
    en: 'Tamkinly · A Deep Liberation Tool',
  },
  intro: {
    ar: 'هل جربت يوماً أن تدرك فجأة أنك تحلم؟ في تلك اللحظة الدقيقة، عندما تتوقف داخل الحلم وتطرح على نفسك سؤالاً بسيطاً: «كيف وصلت إلى هنا؟ أين كنت قبل لحظات؟»... غالباً ما يحدث شيء غريب جداً؛ يرتجف نسيج الحلم، ينهار الوهم، وتستيقظ فوراً في واقعك الآمن.',
    en: 'Have you ever suddenly realized, mid-dream, that you were dreaming? In that delicate instant, when you pause inside the dream and ask yourself a simple question — "How did I get here? Where was I a moment ago?" — something strange tends to happen: the fabric of the dream trembles, the illusion collapses, and you instantly awaken into your safe reality.',
  },
  intro2: {
    ar: 'ماذا لو أخبرتك أن صدماتك وذكرياتك المزعجة تعمل بنفس الآلية تماماً؟',
    en: 'What if I told you that your traumas and disturbing memories operate on the exact same mechanism?',
  },
  claim: {
    ar: 'اليوم، سنسحب هذه القوة. سنلعب مع العقل لعبة التفكيك عبر بروتوكول «أين بدأت؟».',
    en: 'Today, we will withdraw this power. We will play the mind\'s game of decoupling through a protocol called: "Where did it begin?"',
  },
  totalSteps: 7,
  totalDuration: 840,
  accentColor: '#1F6F78', // Teal
};

export const TEMPORAL_DECOUPLING_STEPS: ProtocolStep[] = [
  {
    id: 1,
    title: {
      ar: 'الاستدعاء الآمن',
      en: 'Safe Recall',
    },
    durationLabel: { ar: 'دقيقتان', en: 'Two minutes' },
    duration: 120,
    intro: {
      ar: 'ابدأ بإنشاء مساحة أمان داخلية قبل استدعاء أي شيء. هذه ليست معركة، بل ترحيب.',
      en: 'Begin by creating an inner sense of safety before recalling anything. This is not a battle — it is a welcome.',
    },
    instructions: [
      {
        ar: 'أغمض عينيك. خذ نفساً بطيئاً وعميقاً من الأنف، وزفيراً أبطأ من الفم.',
        en: 'Close your eyes. Take a slow, deep breath in through the nose — and an even slower breath out through the mouth.',
      },
      {
        ar: 'اسمح لنفسك باستحضار تلك الذكرى التي تريد التخلص من عبئها. لا تقاومها، لا تحاول تغييرها.',
        en: 'Allow yourself to summon the memory whose weight you wish to release. Do not resist it. Do not try to change it.',
      },
      {
        ar: 'دعها تُعرض على شاشة مخيلتك كفيلم قصير، تماماً كما تفعل دائماً.',
        en: 'Let it play on the screen of your imagination like a short film — exactly as you always do.',
      },
    ],
    hypnotic_cue: {
      ar: 'أنت لست في الحدث. أنت في غرفة العرض. وشاشة العرض ملكك.',
      en: 'You are not in the event. You are in the screening room. And the screen belongs to you.',
    },
    reflection: {
      ar: 'هل لاحظت كيف يبدأ عقلك بعرض الفيلم من لقطة محددة دون مقدمات؟',
      en: 'Did you notice how your mind begins playing the film from a specific frame, with no preamble?',
    },
    icon: 'eye',
  },
  {
    id: 2,
    title: {
      ar: 'إيقاف الوهم',
      en: 'Halting the Illusion',
    },
    durationLabel: { ar: 'دقيقة واحدة', en: 'One minute' },
    duration: 60,
    intro: {
      ar: 'راقب الفيلم حتى يبلغ اللقطة المعتادة، تلك اللقطة المركزية الوحيدة المشحونة التي تتذكرها دائماً.',
      en: 'Watch the film until it reaches the usual frame — that singular, charged central frame you always remember.',
    },
    instructions: [
      {
        ar: 'تابع عرض الفيلم بهدوء، دون أن تنجرف معه.',
        en: 'Continue watching the film quietly, without being pulled into it.',
      },
      {
        ar: 'عند الوصول إلى اللقطة المركزية، وبحزم داخلي هادئ، أوقف الفيلم.',
        en: 'When you reach the central frame — with calm inner firmness — stop the film.',
      },
      {
        ar: 'جمّد الصورة تماماً. كأنك ضغطت زر الإيقاف المؤقت على جهاز التحكم.',
        en: 'Freeze the image completely. As if you pressed pause on the remote control.',
      },
    ],
    hypnotic_cue: {
      ar: 'هذه هي اللحظة التي ينتقل فيها السلطة من الذاكرة إليك.',
      en: 'This is the moment power transfers — from the memory, to you.',
    },
    reflection: {
      ar: 'كيف يبدو إيقاف ذاكرة كانت دائماً هي من توقفك أنت؟',
      en: 'What does it feel like to halt a memory that has always been the one to halt you?',
    },
    icon: 'pause',
  },
  {
    id: 3,
    title: {
      ar: 'السؤال المفكّك',
      en: 'The Decoupling Question',
    },
    durationLabel: { ar: 'دقيقة واحدة', en: 'One minute' },
    duration: 60,
    intro: {
      ar: 'انظر إلى تلك الصورة المجمدة أمامك، واسأل عقلك بفضول صارم.',
      en: 'Look at that frozen image before you, and ask your mind — with stern curiosity.',
    },
    instructions: [
      {
        ar: 'ثبّت نظرك على الصورة المجمدة كما تنظر إلى لوحة معلّقة في متحف.',
        en: 'Fix your gaze on the frozen image as you would a painting hanging in a museum.',
      },
      {
        ar: 'بصوت داخلي هادئ وحازم، اطرح السؤال: «كيف وصلت إلى هذه اللحظة؟»',
        en: 'In a calm, firm inner voice, ask the question: "How did I arrive at this moment?"',
      },
      {
        ar: 'انتظر الإجابة. لا تختلقها. دع الصمت يعمل.',
        en: 'Wait for the answer. Do not invent it. Let the silence do its work.',
      },
    ],
    hypnotic_cue: {
      ar: 'السؤال نفسه شفرة. مجرد طرحه يبدأ بتفكيك البنية.',
      en: 'The question itself is a key. Merely asking it begins to dismantle the structure.',
    },
    reflection: {
      ar: 'هل حاول عقلك تبرير اللقطة بدل تذكر ما قبلها؟ لاحظ ذلك دون حكم.',
      en: 'Did your mind try to justify the frame rather than recall what preceded it? Notice this without judgment.',
    },
    icon: 'help-circle',
  },
  {
    id: 4,
    title: {
      ar: 'التفكيك العكسي',
      en: 'Reverse Decoupling',
    },
    durationLabel: { ar: 'ثلاث دقائق', en: 'Three minutes' },
    duration: 180,
    intro: {
      ar: 'لا تسمح لعقلك باختراع إجابات أو تبريرات. طالبه بالمشاهد الفعلية. ارجع بالزمن للخلف، إطاراً تلو الآخر.',
      en: 'Do not allow your mind to fabricate answers or justifications. Demand actual scenes. Travel backward in time — frame by frame.',
    },
    instructions: [
      {
        ar: 'اسأل: «ما هي اللقطة التي سبقت هذا المشهد مباشرة؟»',
        en: 'Ask: "What is the frame that immediately preceded this scene?"',
      },
      {
        ar: 'ثم اسأل: «والتي قبلها؟» استمر في التراجع مشهداً بعد مشهد.',
        en: 'Then ask: "And the one before that?" Keep retreating — scene after scene.',
      },
      {
        ar: 'استمر حتى تصل إلى مساحة ضبابية، نقطة يضطر فيها عقلك للاعتراف: «لا أعرف» أو «لا أتذكر».',
        en: 'Continue until you reach a foggy space — a point where your mind is forced to admit: "I don\'t know," or "I don\'t remember."',
      },
    ],
    hypnotic_cue: {
      ar: 'كل لقطة لا تتذكرها، هي مساحة حررتها من سطوة الذكرى.',
      en: 'Every frame you cannot remember is a space you have liberated from the memory\'s grip.',
    },
    reflection: {
      ar: 'أين توقف الفيلم؟ ما المساحة الضبابية التي ظهرت؟',
      en: 'Where did the film stop? What foggy space appeared?',
    },
    icon: 'rotate-ccw',
  },
  {
    id: 5,
    title: {
      ar: 'المواجهة النهائية',
      en: 'The Final Encounter',
    },
    durationLabel: { ar: 'دقيقتان', en: 'Two minutes' },
    duration: 120,
    intro: {
      ar: 'عُد إلى لقطة الحدث الأولى التي بدأ بها الوهم. انظر إليها واسأل عقلك بوعي تام.',
      en: 'Return to the first frame of the event where the illusion began. Look at it and ask your mind — with full awareness.',
    },
    instructions: [
      {
        ar: 'انظر إلى لقطة البداية بوصفها قراراً، لا حقيقة. اختيار، لا قدراً.',
        en: 'Look at the starting frame as a decision, not a fact. As a choice, not fate.',
      },
      {
        ar: 'اسأل: «لماذا اخترت أن تبدأ المشهد من هنا بالذات؟»',
        en: 'Ask: "Why did you choose to begin the scene from this exact point?"',
      },
      {
        ar: 'استمع للإجابة بصمت. ستكون صادقة، ربما غير متوقعة.',
        en: 'Listen to the answer in silence. It will be honest — perhaps unexpected.',
      },
    ],
    hypnotic_cue: {
      ar: 'البدايات اختيارات. والاختيارات يمكن إعادة قراءتها.',
      en: 'Beginnings are choices. And choices can be re-read.',
    },
    reflection: {
      ar: 'ماذا كشف لك عقلك عن سبب اختيار هذه البداية بالذات؟',
      en: 'What did your mind reveal about why it chose this specific beginning?',
    },
    icon: 'eye',
  },
  {
    id: 6,
    title: {
      ar: 'نقطة الشفاء',
      en: 'The Point of Healing',
    },
    durationLabel: { ar: 'دقيقتان', en: 'Two minutes' },
    duration: 120,
    intro: {
      ar: 'راقب ما سيحدث بصمت. ستدرك أن الذاكرة لا تحتاج أن تعطيك الفيلم كاملاً كي تجعلك تظن أنك عشته كاملاً.',
      en: 'Observe, in silence, what happens. You will realize that the memory does not need to give you the full film in order to make you believe you lived it in full.',
    },
    instructions: [
      {
        ar: 'تنفّس بهدوء. اسمح للإدراك الجديد أن يستقر في جسدك، لا في عقلك فقط.',
        en: 'Breathe quietly. Allow the new realization to settle into your body — not only your mind.',
      },
      {
        ar: 'لاحظ أن عقلك الباطن سيتجنب مستقبلاً إعادة تشغيل هذا الفيلم.',
        en: 'Notice that your subconscious will, going forward, avoid replaying this film.',
      },
      {
        ar: 'لأنه يعلم الآن أنك تمتلك شفرة التفكيك، وأنه سيضطر لمواجهة نفس الأسئلة التي تكسر وهمه.',
        en: 'Because it now knows you hold the decryption key — and that it will have to face the same questions that break its illusion.',
      },
    ],
    hypnotic_cue: {
      ar: 'هنا.. تنهار الذكرى، وتستيقظ أنت.',
      en: 'Here... the memory collapses. And you awaken.',
    },
    reflection: {
      ar: 'ما الإحساس الذي تشعر به في جسدك الآن مقارنة ببداية التمرين؟',
      en: 'What sensation do you feel in your body now, compared to the start of the exercise?',
    },
    icon: 'sunrise',
  },
  {
    id: 7,
    title: {
      ar: 'الاندماج والإغلاق',
      en: 'Integration & Closure',
    },
    durationLabel: { ar: 'دقيقة واحدة', en: 'One minute' },
    duration: 60,
    intro: {
      ar: 'قبل العودة، امنح نفسك لحظة تأريض. التمرين لم ينتهِ بالتفكيك، بل بالعودة الآمنة إلى الحاضر.',
      en: 'Before returning, grant yourself a moment of grounding. The exercise does not end with decoupling — it ends with a safe return to the present.',
    },
    instructions: [
      {
        ar: 'خذ ثلاثة أنفاس عميقة، وشعر بقدميك على الأرض.',
        en: 'Take three deep breaths, and feel your feet on the ground.',
      },
      {
        ar: 'اسمح لعينيك أن تُفتحا ببطء. عُد إلى الغرفة التي تجلس فيها.',
        en: 'Allow your eyes to open slowly. Return to the room you are sitting in.',
      },
      {
        ar: 'اختر كلمة واحدة تصف حالتك الآن. قلها داخلياً ثلاث مرات.',
        en: 'Choose one word that describes your state now. Say it inwardly, three times.',
      },
    ],
    hypnotic_cue: {
      ar: 'ما تعلّمته اليوم يبقى معك. عفوياً، بهدوء، دون جهد.',
      en: 'What you learned today stays with you. Spontaneously, quietly, without effort.',
    },
    reflection: {
      ar: 'ما الكلمة التي اخترتها؟ ولماذا؟',
      en: 'What word did you choose? And why?',
    },
    icon: 'anchor',
  },
];
