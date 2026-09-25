/**
 * Quiz Dynamic Recommendation Engine
 * Provides personalized recommendations based on quiz score tiers
 * 3-tier model: BASIC $7/mo, PREMIUM $17/mo, MASTERY $27/mo
 */

export type RecommendationTier = 'beginner' | 'explorer' | 'builder' | 'master';

export interface NextStep {
  stepEn: string;
  stepAr: string;
}

export interface QuizRecommendation {
  tier: RecommendationTier;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  recommendedProduct: string;
  productNameEn: string;
  productNameAr: string;
  productReasonEn: string;
  productReasonAr: string;
  ctaEn: string;
  ctaAr: string;
  nextSteps: NextStep[];
  color: string;
}

const recommendations: QuizRecommendation[] = [
  {
    tier: 'beginner',
    titleEn: 'Your identity foundation needs building',
    titleAr: 'أساس هويتك يحتاج إلى البناء',
    descriptionEn:
      "Your assessment reveals that your identity foundation is still taking shape. This isn't a weakness — it's the most powerful place to start. People who begin here and follow a structured path see the most dramatic transformations. The gap between who you are and who you want to be is your greatest opportunity.",
    descriptionAr:
      'يكشف تقييمك أن أساس هويتك لا يزال يتشكل. هذا ليس ضعفاً — بل هو أقوى مكان للبدء. الأشخاص الذين يبدأون من هنا ويتبعون مساراً منظماً يشهدون أعمق التحولات. الفجوة بين من أنت ومن تريد أن تكون هي أعظم فرصتك.',
    recommendedProduct: 'basic',
    productNameEn: 'Basic (Monthly)',
    productNameAr: 'أساسي (شهري)',
    productReasonEn:
      "The Basic plan is the perfect starting point for your identity journey. At just $7/month, you get a guided 7-day discipline introduction, daily identity prompts, evidence tracking basics, and a progress dashboard. It gives you a structured, low-risk entry into the Tamkinly methodology.",
    productReasonAr:
      'الخطة الأساسية هي نقطة البداية المثالية لرحلة هويتك. مقابل 7$ شهرياً فقط، تحصل على مقدمة انضباط موجهة لمدة 7 أيام ومطالبات هوية يومية وأساسيات تتبع الأدلة ولوحة تقدم. تمنحك دخولاً منظماً ومنخفض المخاطر لمنهجية تمكينلي.',
    ctaEn: 'Start with Basic — $7/mo',
    ctaAr: 'ابدأ بالخطة الأساسية — 7$/شهر',
    nextSteps: [
      {
        stepEn: 'Complete the Values Clarification Tool to discover what truly matters to you',
        stepAr: 'أكمل أداة تحديد القيم لاكتشاف ما يهمك حقاً',
      },
      {
        stepEn: 'Write down 3 moments when you felt most like yourself — this reveals your identity anchors',
        stepAr: 'اكتب 3 لحظات شعرت فيها بأنك أكثر نفسك — هذا يكشف مراسي هويتك',
      },
      {
        stepEn: 'Start with the Basic plan to build your first identity foundation',
        stepAr: 'ابدأ بالخطة الأساسية لبناء أساس هويتك الأول',
      },
    ],
    color: '#C97B7B',
  },
  {
    tier: 'explorer',
    titleEn: "You're discovering your path",
    titleAr: 'أنت تكتشف طريقك',
    descriptionEn:
      "You have some awareness of who you are and what you want, but the picture isn't complete yet. You're in the exploration phase — you've started asking the right questions, and now you need a structured system to turn those questions into clarity. This is where real transformation begins.",
    descriptionAr:
      'لديك بعض الوعي بمن أنت وما تريد، لكن الصورة ليست مكتملة بعد. أنت في مرحلة الاستكشاف — بدأت طرح الأسئلة الصحيحة، والآن تحتاج نظاماً منظماً لتحويل تلك الأسئلة إلى وضوح. هنا يبدأ التحول الحقيقي.',
    recommendedProduct: 'premium',
    productNameEn: 'Premium (Monthly)',
    productNameAr: 'مميز (شهري)',
    productReasonEn:
      "The Premium plan was built for explorers like you. At $17/month, it includes everything in Basic plus advanced decision analysis, evidence tracking, and a progress dashboard. Its structured 30-day program takes your emerging self-awareness and gives it a concrete framework.",
    productReasonAr:
      'الخطة المميزة بُنيت للمستكشفين مثلك. مقابل 17$ شهرياً، تتضمن كل ما في الأساسي بالإضافة إلى تحليل القرارات المتقدم وتتبع الأدلة ولوحة التقدم. برنامجها المنظم لمدة 30 يوماً يأخذ وعيك الذاتي الناشئ ويمنحه إطاراً ملموساً.',
    ctaEn: 'Upgrade to Premium — $17/mo',
    ctaAr: 'ارتقِ إلى المميز — 17$/شهر',
    nextSteps: [
      {
        stepEn: 'Use the Identity Baseline Worksheet to map where you are today',
        stepAr: 'استخدم ورقة عمل خط الأساس الهويتي لتحديد أين أنت اليوم',
      },
      {
        stepEn: 'Identify your top 3 identity gaps from the quiz dimension breakdown above',
        stepAr: 'حدد أهم 3 فجوات هويتك من تفصيل أبعاد الاختبار أعلاه',
      },
      {
        stepEn: 'Start the Premium plan for a guided 30-day transformation journey',
        stepAr: 'ابدأ الخطة المميزة لرحلة تحول موجّهة لمدة 30 يوماً',
      },
    ],
    color: '#2A8A94',
  },
  {
    tier: 'builder',
    titleEn: "You're actively constructing your identity",
    titleAr: 'أنت تبني هويتك بنشاط',
    descriptionEn:
      "Impressive — you've moved beyond awareness into active construction. You have a solid foundation and you're making real progress. The challenge now is maintaining momentum and deepening the work. Builders who add the right tools at this stage accelerate their growth exponentially.",
    descriptionAr:
      'مؤثر — لقد تجاوزت الوعي إلى البناء النشط. لديك أساس متين وأنت تحرز تقدماً حقيقياً. التحدي الآن هو الحفاظ على الزخم وتعميق العمل. البناؤون الذين يضيفون الأدوات المناسبة في هذه المرحلة يسرّعون نموهم بشكل كبير.',
    recommendedProduct: 'premium',
    productNameEn: 'Premium (Monthly)',
    productNameAr: 'مميز (شهري)',
    productReasonEn:
      "As a builder, you need more than daily prompts — you need analytics and advanced frameworks. The Premium plan at $17/month adds decision pattern analysis, evidence tracking, and a progress dashboard so you can measure what's working and refine your approach with precision.",
    productReasonAr:
      'كباني، تحتاج أكثر من التوجيهات اليومية — تحتاج تحليلات وأطر متقدمة. الخطة المميزة مقابل 17$ شهرياً تضيف تحليل أنماط القرار وتتبع الأدلة ولوحة تقدم حتى تتمكن من قياس ما يعمل وتحسين نهجك بدقة.',
    ctaEn: 'Go Deeper with Premium — $17/mo',
    ctaAr: 'اذهب أعمق مع المميز — 17$/شهر',
    nextSteps: [
      {
        stepEn: 'Set up the Progress Dashboard to track your transformation metrics weekly',
        stepAr: 'أنشئ لوحة التقدم لتتبع مقاييس تحولك أسبوعياً',
      },
      {
        stepEn: 'Use Decision Pattern Analysis to identify and optimize your decision-making habits',
        stepAr: 'استخدم تحليل أنماط القرار لتحديد وتحسين عاداتك في اتخاذ القرارات',
      },
      {
        stepEn: 'Upgrade to Premium for advanced tracking and optimization tools',
        stepAr: 'ارتقِ إلى المميز لأدوات التتبع والتحسين المتقدمة',
      },
    ],
    color: '#1F6F78',
  },
  {
    tier: 'master',
    titleEn: 'Your identity is well-aligned',
    titleAr: 'هويتك متوافقة بشكل جيد',
    descriptionEn:
      "Your identity alignment is exceptional. You've done the work — your values, environment, emotions, decisions, and momentum are all in sync. But mastery isn't a destination; it's a practice. The question now is: how do you sustain this and continue evolving? Masters who invest in refinement stay ahead.",
    descriptionAr:
      'توافق هويتك استثنائي. لقد قمت بالعمل — قيمك وبيئتك ومشاعرك وقراراتك وزخمك جميعها متزامنة. لكن الإتقان ليس وجهة؛ إنه ممارسة. السؤال الآن هو: كيف تحافظ على هذا وتستمر في التطور؟ الأساتذة الذين يستثمرون في التحسين يبقون في المقدمة.',
    recommendedProduct: 'mastery',
    productNameEn: 'Mastery (Monthly)',
    productNameAr: 'إتقان (شهري)',
    productReasonEn:
      "As a master, you're ready for the full ecosystem. The Mastery subscription at $27/month gives you all apps including AI Identity Coach, community access, priority support, and every tool in the platform. It's not about filling gaps anymore; it's about reaching your highest potential.",
    productReasonAr:
      'كأستاذ، أنت جاهز للنظام البيئي الكامل. اشتراك الإتقان مقابل 27$ شهرياً يمنحك جميع التطبيقات بما في ذلك مدرب الهوية الذكي والوصول للمجتمع والدعم ذو الأولوية وكل أداة في المنصة. لم يعد الأمر عن سد الفجوات؛ بل عن الوصول إلى أعلى إمكاناتك.',
    ctaEn: 'Unlock Mastery — $27/mo',
    ctaAr: 'افتح الإتقان — 27$/شهر',
    nextSteps: [
      {
        stepEn: 'Schedule a monthly identity audit using the Executive Manual framework',
        stepAr: 'حدد موعداً لتدقيق هوية شهري باستخدام إطار الدليل التنفيذي',
      },
      {
        stepEn: 'Activate the AI Identity Coach for real-time guidance and challenge detection',
        stepAr: 'فعّل مدرب الهوية الذكي للتوجيه في الوقت الحقيقي واكتشاف التحديات',
      },
      {
        stepEn: 'Get the Mastery subscription for access to every tool and continuous evolution',
        stepAr: 'احصل على اشتراك الإتقان للوصول لكل أداة والتطور المستمر',
      },
    ],
    color: '#3DD4B0',
  },
];

/**
 * Returns the personalized recommendation tier based on the quiz score.
 * @param score - The overall quiz score (0-100)
 * @returns The matching QuizRecommendation object
 */
export function getRecommendation(score: number): QuizRecommendation {
  if (score <= 30) {
    return recommendations[0]; // beginner → basic
  }
  if (score <= 60) {
    return recommendations[1]; // explorer → premium
  }
  if (score <= 80) {
    return recommendations[2]; // builder → premium
  }
  return recommendations[3]; // master → mastery
}

/**
 * Returns the tier key based on the quiz score.
 * @param score - The overall quiz score (0-100)
 * @returns The tier identifier string
 */
export function getTierKey(score: number): RecommendationTier {
  if (score <= 30) return 'beginner';
  if (score <= 60) return 'explorer';
  if (score <= 80) return 'builder';
  return 'master';
}
