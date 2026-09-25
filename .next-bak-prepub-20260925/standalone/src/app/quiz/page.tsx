'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { 
  ArrowRight, 
  Sparkles, 
  Brain, 
  Heart, 
  User,
  Compass,
  TrendingUp,
  CheckCircle2,
  Star,
  Lock,
  ChevronRight,
  Target,
  Play
} from 'lucide-react';

// Types
type QuestionType = {
  id: number;
  question: string;
  questionAr: string;
  subtitle?: string;
  subtitleAr?: string;
  options: {
    text: string;
    textAr: string;
    value: number;
    insight?: string;
    insightAr?: string;
  }[];
  category: 'identity' | 'environment' | 'emotion' | 'decision' | 'progress' | 'alignment';
};

type QuizPhase = 'intro' | 'questions' | 'analyzing';

// Quiz Questions - 12 Questions Total
const quizQuestions: QuestionType[] = [
  {
    id: 1,
    question: "When you wake up in the morning, what's the first thought that crosses your mind?",
    questionAr: "عندما تستيقظ في الصباح، ما هو أول فكر يخطر ببالك؟",
    subtitle: "Be honest with yourself - this reveals your current mental baseline",
    subtitleAr: "كن صادقاً مع نفسك - هذا يكشف أساسك الذهني الحالي",
    category: 'identity',
    options: [
      { text: "A clear sense of purpose and direction", textAr: "إحساس واضح بالهدف والاتجاه", value: 5, insight: "Strong identity foundation", insightAr: "أساس هوية قوي" },
      { text: "A vague unease that something needs to change", textAr: "قلق غامض بأن شيئاً يحتاج للتغيير", value: 3, insight: "Identity seeking", insightAr: "بحث عن الهوية" },
      { text: "Overwhelm about everything I need to do", textAr: "إرهاق من كل ما يجب فعله", value: 2, insight: "Scattered identity", insightAr: "هوية مشتتة" },
      { text: "A feeling of emptiness or 'who am I really?'", textAr: "شعور بالفراغ أو 'من أنا حقاً؟'", value: 1, insight: "Identity gap detected", insightAr: "تم اكتشاف فجوة الهوية" }
    ]
  },
  {
    id: 2,
    question: "When you set a goal, what usually happens?",
    questionAr: "عندما تضع هدفاً، ماذا يحدث عادة؟",
    subtitle: "This reveals your execution identity pattern",
    subtitleAr: "هذا يكشف نمط هوية التنفيذ لديك",
    category: 'progress',
    options: [
      { text: "I follow through consistently without needing willpower", textAr: "أتابع باستمرار دون الحاجة لقوة إرادة", value: 5, insight: "Aligned action-taker", insightAr: "فاعل متوافق" },
      { text: "I start strong but lose momentum after a few weeks", textAr: "أبدأ بقوة لكن أفقد الزخم بعد أسابيع قليلة", value: 3, insight: "Inconsistent identity", insightAr: "هوية غير متسقة" },
      { text: "I procrastinate and then feel guilty about it", textAr: "أسوّف ثم أشعر بالذنب تجاه ذلك", value: 2, insight: "Self-sabotage pattern", insightAr: "نمط تخريب ذاتي" },
      { text: "I struggle to even set goals - I don't know what I want", textAr: "أواجه صعوبة حتى في تحديد الأهداف - لا أعرف ما أريد", value: 1, insight: "Identity clarity needed", insightAr: "يحتاج وضوح الهوية" }
    ]
  },
  {
    id: 3,
    question: "How would you describe your relationship with your environment (home, workspace, digital space)?",
    questionAr: "كيف تصف علاقتك مع بيئتك (المنزل، مساحة العمل، الفضاء الرقمي)؟",
    subtitle: "Your environment reflects your internal state",
    subtitleAr: "بيئتك تعكس حالتك الداخلية",
    category: 'environment',
    options: [
      { text: "Organized and energizing - it supports who I want to become", textAr: "منظمة ومنشطة - تدعم من أريد أن أصبح", value: 5, insight: "Environment aligned", insightAr: "بيئة متوافقة" },
      { text: "Functional but not inspiring - I've been meaning to improve it", textAr: "عملية لكنها ملهمة - أنوي تحسينها", value: 3, insight: "Environmental drift", insightAr: "انحراف بيئي" },
      { text: "Cluttered and draining - I feel stuck in it", textAr: "فوضوية ومستنزفة - أشعر بالعجز فيها", value: 2, insight: "Environmental friction", insightAr: "احتكاك بيئي" },
      { text: "Chaotic - I can't seem to maintain any order", textAr: "فوضوية - لا أستطيع الحفاظ على أي نظام", value: 1, insight: "Environmental collapse", insightAr: "انهيار بيئي" }
    ]
  },
  {
    id: 4,
    question: "When you experience strong emotions, what's your typical response?",
    questionAr: "عندما تمر بمشاعر قوية، ما هو رد فعلك المعتاد؟",
    subtitle: "Emotional regulation is the foundation of identity stability",
    subtitleAr: "التنظيم العاطفي هو أساس استقرار الهوية",
    category: 'emotion',
    options: [
      { text: "I acknowledge them, process them, and move forward", textAr: "أقر بها، أعالجها، وأتقدم", value: 5, insight: "Emotionally intelligent", insightAr: "ذكاء عاطفي" },
      { text: "I try to understand them but sometimes get stuck", textAr: "أحاول فهمها لكن أتعطل أحياناً", value: 3, insight: "Developing awareness", insightAr: "وعي متطور" },
      { text: "I suppress or avoid them until they explode", textAr: "أكبتها أو أتجنبها حتى تنفجر", value: 2, insight: "Emotional suppression", insightAr: "كبت عاطفي" },
      { text: "I feel controlled by them - they dictate my actions", textAr: "أشعر بأنها تتحكم بي - هي تحدد أفعالي", value: 1, insight: "Emotional dysregulation", insightAr: "اختلال عاطفي" }
    ]
  },
  {
    id: 5,
    question: "When faced with an important decision, you typically...",
    questionAr: "عند مواجهة قرار مهم، عادة...",
    subtitle: "Decision patterns reveal identity clarity",
    subtitleAr: "أنماط القرار تكشف وضوح الهوية",
    category: 'decision',
    options: [
      { text: "Make decisions aligned with my core values quickly and confidently", textAr: "أتخذ قرارات متوافقة مع قيمي الأساسية بسرعة وثقة", value: 5, insight: "Decisive identity", insightAr: "هوية حاسمة" },
      { text: "Deliberate but eventually make choices I'm comfortable with", textAr: "أفكر لكن في النهاية أتخذ خيارات مريحة لي", value: 3, insight: "Thoughtful processor", insightAr: "معالج متأمل" },
      { text: "Overthink, seek validation from others, and second-guess myself", textAr: "أبالغ في التفكير، أطلب تأكيد الآخرين، وأشك في نفسي", value: 2, insight: "Decision paralysis", insightAr: "شلل القرار" },
      { text: "Avoid making decisions or let others decide for me", textAr: "أتجنب اتخاذ القرارات أو أترك الآخرين يقررون لي", value: 1, insight: "Decision avoidance", insightAr: "تجنب القرار" }
    ]
  },
  {
    id: 6,
    question: "Which statement resonates most with you right now?",
    questionAr: "أي عبارة تتردد أكثر معك الآن؟",
    subtitle: "This reveals your current transformation readiness",
    subtitleAr: "هذا يكشف جاهزيتك الحالية للتحول",
    category: 'identity',
    options: [
      { text: "I know who I am and I'm actively becoming a better version", textAr: "أعرف من أنا وأصبح بنشاط نسخة أفضل", value: 5, insight: "Growth mindset active", insightAr: "عقلية نمو نشطة" },
      { text: "I have some clarity but feel there's more to discover", textAr: "لدي بعض الوضوح لكن أشعر أن هناك المزيد للاكتشاف", value: 3, insight: "Seeking deeper truth", insightAr: "البحث عن حقيقة أعمق" },
      { text: "I've lost touch with who I really am under all the expectations", textAr: "فقدت الاتصال بمن أنا حقاً تحت كل التوقعات", value: 2, insight: "Identity erosion", insightAr: "تآكل الهوية" },
      { text: "I feel like a stranger to myself - I don't know who I am anymore", textAr: "أشعر كأنني غريب على نفسي - لم أعد أعرف من أنا", value: 1, insight: "Identity crisis", insightAr: "أزمة هوية" }
    ]
  },
  {
    id: 7,
    question: "How do you handle setbacks or failures?",
    questionAr: "كيف تتعامل مع النكسات أو الفشل؟",
    subtitle: "Your relationship with failure shapes your identity",
    subtitleAr: "علاقتك مع الفشل تشكل هويتك",
    category: 'progress',
    options: [
      { text: "I see them as feedback and adjust my approach", textAr: "أراها كتغذية راجعة وأعدّل نهجي", value: 5, insight: "Resilient identity", insightAr: "هوية مرنة" },
      { text: "I recover eventually, but they shake my confidence", textAr: "أتعافى في النهاية، لكنها تهز ثقتي", value: 3, insight: "Recovering resilience", insightAr: "مرونة متعافية" },
      { text: "I spiral into self-doubt and take a long time to bounce back", textAr: "أغرق في الشك الذاتي وآخذ وقتاً طويلاً للتعافي", value: 2, insight: "Fragile identity", insightAr: "هوية هشة" },
      { text: "I use them as evidence that I'm not capable of change", textAr: "أستخدمها كدليل أنني غير قادر على التغيير", value: 1, insight: "Fixed mindset", insightAr: "عقلية ثابتة" }
    ]
  },
  {
    id: 8,
    question: "What best describes your current state of mind?",
    questionAr: "ما الذي يصف أفضل حالتك الذهنية الحالية؟",
    subtitle: "Your honest assessment of where you are",
    subtitleAr: "تقييمك الصادق لأين أنت",
    category: 'identity',
    options: [
      { text: "Grounded and purposeful - I feel in control of my life", textAr: "متماسك وهادف - أشعر بالسيطرة على حياتي", value: 5, insight: "Centered identity", insightAr: "هوية متمركزة" },
      { text: "Functional but unfulfilled - something is missing", textAr: "عملي لكن غير مُرضى - شيء ما ناقص", value: 3, insight: "Identity gap", insightAr: "فجوة هوية" },
      { text: "Restless and searching - I know I need change but don't know how", textAr: "قلق وباحث - أعرف أنني أحتاج تغييراً لكن لا أعرف كيف", value: 2, insight: "Seeking direction", insightAr: "البحث عن اتجاه" },
      { text: "Lost and overwhelmed - I need a complete reset", textAr: "تائه ومُغرق - أحتاج إعادة ضبط كاملة", value: 1, insight: "Identity reconstruction needed", insightAr: "يحتاج إعادة بناء الهوية" }
    ]
  },
  // NEW QUESTIONS 9-12
  {
    id: 9,
    question: "When you think about your core values, how clearly can you articulate them?",
    questionAr: "عندما تفكر في قيمك الأساسية، ما مدى وضوحك في التعبير عنها؟",
    subtitle: "Values clarity is the foundation of identity-driven decisions",
    subtitleAr: "وضوح القيم هو أساس القرارات المبنية على الهوية",
    category: 'identity',
    options: [
      { text: "I can name my top 5 values instantly and live by them daily", textAr: "أستطيع ذكر أهم 5 قيم فوراً وأعيش بها يومياً", value: 5, insight: "Values clarity", insightAr: "وضوح القيم" },
      { text: "I know some of my values but haven't fully defined them", textAr: "أعرف بعض قيمي لكن لم أحددها بالكامل", value: 3, insight: "Values exploration", insightAr: "استكشاف القيم" },
      { text: "I have a vague sense but struggle to name specifics", textAr: "لدي إحساس غامض لكن أواجه صعوبة في تحديد التفاصيل", value: 2, insight: "Values confusion", insightAr: "ارتباك القيم" },
      { text: "I'm not sure what my core values really are", textAr: "لست متأكداً ما هي قيمي الأساسية حقاً", value: 1, insight: "Values disconnect", insightAr: "انفصال القيم" }
    ]
  },
  {
    id: 10,
    question: "How well does your daily routine reflect the person you want to become?",
    questionAr: "ما مدى انعكاس روتينك اليومي على الشخص الذي تريد أن تصبح؟",
    subtitle: "Your habits reveal your true priorities",
    subtitleAr: "عاداتك تكشف أولوياتك الحقيقية",
    category: 'alignment',
    options: [
      { text: "Almost every action aligns with my target identity", textAr: "كل تصرف تقريباً يتوافق مع هويتي المستهدفة", value: 5, insight: "Strong alignment", insightAr: "توافق قوي" },
      { text: "Most days I make progress, but there are gaps", textAr: "معظم الأيام أحرز تقدماً، لكن هناك فجوات", value: 3, insight: "Partial alignment", insightAr: "توافق جزئي" },
      { text: "My routine often contradicts who I want to be", textAr: "روتيني غالباً يتناقض مع من أريد أن أكون", value: 2, insight: "Alignment gaps", insightAr: "فجوات التوافق" },
      { text: "There's a big disconnect between my days and my goals", textAr: "هناك انفصال كبير بين أيامي وأهدافي", value: 1, insight: "Misalignment", insightAr: "عدم التوافق" }
    ]
  },
  {
    id: 11,
    question: "When someone asks 'Who are you?', how do you typically respond?",
    questionAr: "عندما يسأل شخص 'من أنت؟'، كيف ترد عادة؟",
    subtitle: "Self-definition clarity reveals identity strength",
    subtitleAr: "وضوح تعريف الذات يكشف قوة الهوية",
    category: 'identity',
    options: [
      { text: "I confidently describe my authentic self and aspirations", textAr: "أصف بثقة ذاتي الحقيقية وتطلعاتي", value: 5, insight: "Clear self-concept", insightAr: "مفهوم ذات واضح" },
      { text: "I give a thoughtful answer but feel it's incomplete", textAr: "أعطي إجابة مدروسة لكن أشعر أنها غير مكتملة", value: 3, insight: "Developing identity", insightAr: "هوية متطورة" },
      { text: "I mostly describe what I do rather than who I am", textAr: "أصف في الغالب ما أفعله بدلاً من من أنا", value: 2, insight: "Role-based identity", insightAr: "هوية قائمة على الدور" },
      { text: "I struggle to answer or define myself by others' expectations", textAr: "أواجه صعوبة في الإجابة أو أحدد نفسي بتوقعات الآخرين", value: 1, insight: "Identity confusion", insightAr: "ارتباك الهوية" }
    ]
  },
  {
    id: 12,
    question: "How consistently do you keep the promises you make to yourself?",
    questionAr: "ما مدى التزامك بالوعود التي تقطعها لنفسك؟",
    subtitle: "Self-trust is built through kept promises",
    subtitleAr: "الثقة بالنفس تُبنى من خلال الوعود المحفوظة",
    category: 'progress',
    options: [
      { text: "Almost always - my word to myself is sacred", textAr: "دائماً تقريباً - كلمتي لنفسي مقدسة", value: 5, insight: "High self-trust", insightAr: "ثقة عالية بالنفس" },
      { text: "Usually, but I sometimes let myself down", textAr: "عادةً، لكنني أخذل نفسي أحياناً", value: 3, insight: "Building self-trust", insightAr: "بناء الثقة بالنفس" },
      { text: "I often break commitments to myself", textAr: "غالباً أنكث التزاماتي مع نفسي", value: 2, insight: "Eroded self-trust", insightAr: "ثقة متآكلة بالنفس" },
      { text: "I've stopped making promises to myself", textAr: "توقفت عن قطع الوعود لنفسي", value: 1, insight: "Self-trust collapse", insightAr: "انهيار الثقة بالنفس" }
    ]
  }
];

// Products are defined in quiz-recommendations.ts (3-tier: BASIC $7, PREMIUM $17, MASTERY $27)

// Main Quiz Component
export default function IdentityQuizPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const { locale, direction } = useLocale();

  // Calculate user profile and navigate to results
  const calculateAndNavigate = () => {
    const categories = {
      identity: 0,
      environment: 0,
      emotion: 0,
      decision: 0,
      progress: 0,
      alignment: 0
    };

    let categoryCounts = { ...categories };

    answers.forEach((answer, index) => {
      const question = quizQuestions[index];
      categories[question.category] += answer;
      categoryCounts[question.category]++;
    });

    // Calculate percentages
    const identityClarity = Math.round((categories.identity / (categoryCounts.identity * 5)) * 100);
    const environmentalAlignment = Math.round((categories.environment / (categoryCounts.environment * 5)) * 100);
    const emotionalRegulation = Math.round((categories.emotion / (categoryCounts.emotion * 5)) * 100);
    const decisionQuality = Math.round((categories.decision / (categoryCounts.decision * 5)) * 100);
    const progressMomentum = Math.round((categories.progress / (categoryCounts.progress * 5)) * 100);
    const alignmentScore = categoryCounts.alignment > 0 ? Math.round((categories.alignment / (categoryCounts.alignment * 5)) * 100) : 0;

    // Calculate overall score (Identity Gap Score) - average of all dimensions
    const activeDimensions = [identityClarity, environmentalAlignment, emotionalRegulation, decisionQuality, progressMomentum];
    if (alignmentScore > 0) activeDimensions.push(alignmentScore);
    const overallScore = Math.round(activeDimensions.reduce((a, b) => a + b, 0) / activeDimensions.length);

    // Determine dominant challenge
    const scores = [
      { name: 'Identity Clarity', nameAr: 'وضوح الهوية', score: identityClarity },
      { name: 'Environmental Alignment', nameAr: 'التوافق البيئي', score: environmentalAlignment },
      { name: 'Emotional Regulation', nameAr: 'التنظيم العاطفي', score: emotionalRegulation },
      { name: 'Decision Quality', nameAr: 'جودة القرارات', score: decisionQuality },
      { name: 'Progress Momentum', nameAr: 'زخم التقدم', score: progressMomentum }
    ];
    if (alignmentScore > 0) {
      scores.push({ name: 'Life Alignment', nameAr: 'التوافق الحياتي', score: alignmentScore });
    }
    const lowestScore = scores.sort((a, b) => a.score - b.score)[0];

    // Determine recommended product based on score
    let recommendedProduct = 'mastery';
    let personalizedMessage = '';
    let personalizedMessageAr = '';

    if (overallScore >= 70) {
      recommendedProduct = 'mastery';
      personalizedMessage = "You have a strong foundation. The Premium Bundle will help you optimize and master your identity transformation with advanced tools and frameworks.";
      personalizedMessageAr = "لديك أساس قوي. ستساعدك الباقة المتميزة على تحسين وإتقان تحول هويتك مع أدوات وأطر متقدمة.";
    } else if (overallScore >= 50) {
      recommendedProduct = 'mastery';
      personalizedMessage = "You're ready for transformation. The Identity Recode Planner is perfectly suited for your journey - it will guide you through a complete 30-day identity reconstruction.";
      personalizedMessageAr = "أنت جاهز للتحول. مخطط إعادة صياغة الهوية مناسب تماماً لرحلتك - سيوجهك خلال إعادة بناء هوية كاملة لمدة 30 يوم.";
    } else if (overallScore >= 35) {
      recommendedProduct = 'mastery';
      personalizedMessage = "There's significant potential waiting to be unlocked. The Planner will help you rebuild your identity foundation from the ground up.";
      personalizedMessageAr = "هناك إمكانات كبيرة تنتظر الإطلاق. المخطط سيساعدك على إعادة بناء أساس هويتك من الصفر.";
    } else {
      recommendedProduct = 'basic';
      personalizedMessage = "Your transformation journey starts with a single step. The 7-Day Reset is the perfect introduction to discover what's possible.";
      personalizedMessageAr = "رحلة تحولك تبدأ بخطوة واحدة. إعادة الضبط لمدة 7 أيام هي المقدمة المثالية لاكتشاف ما هو ممكن.";
    }

    // Store results in localStorage
    const results = {
      overallScore,
      identityClarity,
      environmentalAlignment,
      emotionalRegulation,
      decisionQuality,
      progressMomentum,
      dominantChallenge: lowestScore.name,
      dominantChallengeAr: lowestScore.nameAr,
      recommendedProduct,
      personalizedMessage,
      personalizedMessageAr,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('quizResults', JSON.stringify(results));
    
    // Navigate to results page
    router.push('/quiz/results');
  };

  // Handle answer selection
  const handleAnswer = (value: number) => {
    setSelectedAnswer(value);
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Start analyzing phase
      setPhase('analyzing');
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setAnalyzingProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          calculateAndNavigate();
        }
      }, 100);
    }
  };

  // Get text based on language
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  // Render intro section
  const renderIntro = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
          <Sparkles className="w-3.5 h-3.5 mr-2" />
          {getText('Free Identity Assessment', 'تقييم الهوية المجاني')}
        </Badge>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {getText('Discover Your ', 'اكتشف فجوة ')}
          <span className="text-[#3DD4B0]">{getText('Identity Gap', 'هويتك')}</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {getText(
            'Answer 12 revealing questions to uncover what\'s holding you back from becoming the person you know you can be — and get a personalized transformation roadmap.',
            'أجب عن 12 سؤال كاشف لتكتشف ما يعيقك عن أن تصبح الشخص الذي تعرف أنه يمكنك أن تكون — واحصل على خارطة طريق شخصية للتحول.'
          )}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#3DD4B0]">2,847+</div>
            <div className="text-slate-400 text-sm">{getText('People Assessed', 'تم تقييمهم')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#3DD4B0]">94%</div>
            <div className="text-slate-400 text-sm">{getText('Accuracy Rate', 'دقة')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#3DD4B0]">3 min</div>
            <div className="text-slate-400 text-sm">{getText('Average Time', 'الوقت المتوسط')}</div>
          </div>
        </div>

        {/* Q15 — Quiz Results Preview */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-8">
            {getText("Here's what you'll receive in 5 minutes.", 'هذا ما ستحصل عليه في 5 دقائق.')}
          </h2>
          
          <div className="space-y-6">
            {/* Identity Gap Score */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  {getText('Your Identity Gap Score', 'نقاط فجوة هويتك')}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {getText(
                    "A number from 1–100 that measures the distance between your current identity and your performed identity — who you actually are vs. who you show up as.",
                    'رقم من 1 إلى 100 يقيس المسافة بين هويتك الحالية وهويتك التي تؤديها — من أنت فعلاً مقابل كيف تظهر.'
                  )}
                </p>
              </div>
            </div>

            {/* Visual Map */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#1F6F78]/30 flex items-center justify-center flex-shrink-0 mt-1">
                <Compass className="w-5 h-5 text-[#1F6F78]" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  {getText('A visual map across 6 life dimensions', 'خريطة مرئية عبر 6 أبعاد في حياتك')}
                </h3>
                <p className="text-[#3DD4B0] text-xs mb-1.5 tracking-wide">
                  {getText(
                    'Self-Trust · Decision Quality · Values Alignment · Consistency · Environmental Support · Emotional Regulation',
                    'الثقة بالذات · جودة القرارات · توافق القيم · الاتساق · الدعم البيئي · التنظيم العاطفي'
                  )}
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {getText(
                    "You'll see exactly where the gap is largest — and where you're already stronger than you think.",
                    'ستعرف بالضبط أين الفجوة الأكبر — وأين أنت أقوى مما تعتقد.'
                  )}
                </p>
              </div>
            </div>

            {/* One Next Step */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#FFB74D]/20 flex items-center justify-center flex-shrink-0 mt-1">
                <ArrowRight className="w-5 h-5 text-[#FFB74D]" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  {getText('One personalized next step', 'خطوة تالية مخصصة واحدة')}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {getText(
                    "Not a list of recommendations. One specific action matched to your highest-impact gap. Clear. Actionable. Immediate.",
                    'ليست قائمة توصيات. فعل واحد محدد يتطابق مع الفجوة الأعلى تأثيراً لديك. واضح. قابل للتطبيق. فوري.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={() => setPhase('questions')}
          className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-10 h-16 text-xl font-semibold shadow-xl rounded-xl transition-all hover:scale-105 group"
        >
          <Play className="mr-3 h-6 w-6 group-hover:animate-pulse" />
          {getText('Start Your Free Assessment', 'ابدأ التقييم المجاني')}
          <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
        </Button>

        {/* Privacy Note */}
        <p className="text-slate-500 text-xs mt-6 max-w-md mx-auto">
          {getText(
            'No email required at any point. Your answers are private and not stored.',
            'لا بريد إلكتروني مطلوب في أي مرحلة. إجاباتك خاصة ولا تُحفظ.'
          )}
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-[#3DD4B0]" />
            <span>{getText('100% Private', 'خاص 100%')}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
            <span>{getText('No Email Required', 'لا يتطلب بريد إلكتروني')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-[#3DD4B0]" />
            <span>{getText('Instant Results', 'نتائج فورية')}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render questions
  const renderQuestions = () => {
    const question = quizQuestions[currentQuestion];
    const progress = ((currentQuestion) / quizQuestions.length) * 100;

    const categoryColors = {
      identity: '#3DD4B0',
      environment: '#1F6F78',
      emotion: '#E57373',
      decision: '#64B5F6',
      progress: '#FFB74D',
      alignment: '#9333EA'
    };

    const categoryIcons = {
      identity: User,
      environment: Compass,
      emotion: Heart,
      decision: Brain,
      progress: TrendingUp,
      alignment: Target
    };

    const categoryNames = {
      identity: { en: 'Identity', ar: 'الهوية' },
      environment: { en: 'Environment', ar: 'البيئة' },
      emotion: { en: 'Emotion', ar: 'العاطفة' },
      decision: { en: 'Decision', ar: 'القرار' },
      progress: { en: 'Progress', ar: 'التقدم' },
      alignment: { en: 'Alignment', ar: 'التوافق' }
    };

    const Icon = categoryIcons[question.category];
    const color = categoryColors[question.category];
    const categoryName = categoryNames[question.category];

    return (
      <div className="min-h-screen bg-[#F6F8FA] flex flex-col">
        {/* Progress Bar */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#8A94A6]">
                {getText('Question', 'السؤال')} {currentQuestion + 1} {getText('of', 'من')} {quizQuestions.length}
              </span>
              <span className="text-sm font-semibold text-[#0F1C2E]">{Math.round(progress)}% {getText('Complete', 'مكتمل')}</span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-200" />
          </div>
        </div>

        {/* Question Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full">
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8 md:p-12">
                {/* Category Badge */}
                <Badge 
                  className="mb-6"
                  style={{ 
                    backgroundColor: `${color}20`,
                    color: color
                  }}
                >
                  <Icon className="w-3.5 h-3.5 mr-1" />
                  {getText(categoryName.en, categoryName.ar)}
                </Badge>

                {/* Question */}
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E] mb-3 leading-tight">
                  {getText(question.question, question.questionAr)}
                </h2>
                
                {question.subtitle && (
                  <p className="text-[#8A94A6] mb-8 text-lg">
                    {getText(question.subtitle, question.subtitleAr || '')}
                  </p>
                )}

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full ${direction === 'rtl' ? 'text-right' : 'text-left'} p-4 md:p-5 rounded-xl border-2 transition-all duration-300 group
                        ${selectedAnswer === option.value 
                          ? 'border-[#3DD4B0] bg-[#3DD4B0]/10 shadow-lg' 
                          : 'border-slate-200 hover:border-[#3DD4B0]/50 hover:bg-slate-50'
                        }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
                          ${selectedAnswer === option.value 
                            ? 'bg-[#3DD4B0] text-[#0F1C2E]' 
                            : 'bg-slate-100 text-[#8A94A6] group-hover:bg-[#3DD4B0]/20 group-hover:text-[#3DD4B0]'
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#0F1C2E] text-lg">
                            {getText(option.text, option.textAr)}
                          </p>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-[#8A94A6] transition-all
                          ${selectedAnswer === option.value ? 'opacity-100 text-[#3DD4B0]' : 'opacity-0 group-hover:opacity-100'}
                        `} />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Next Question Button */}
                {selectedAnswer !== null && (
                  <div className="mt-6 text-center">
                    <Button
                      onClick={handleNext}
                      className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-8 h-12"
                    >
                      {currentQuestion < quizQuestions.length - 1 ? getText('Next Question', 'السؤال التالي') : getText('See Results', 'عرض النتائج')} <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // Render analyzing phase
  const renderAnalyzing = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Brain */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-[#3DD4B0]/20 animate-ping" />
          <div className="absolute inset-4 rounded-full bg-[#3DD4B0]/30 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-16 h-16 text-[#3DD4B0]" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-3xl font-bold text-white mb-4">
          {getText('Analyzing Your Responses', 'تحليل إجاباتك')}
        </h2>
        <p className="text-slate-300 mb-8">
          {getText(
            'Our algorithm is processing your answers to create a personalized identity transformation roadmap...',
            'خوارزميتنا تعالج إجاباتك لإنشاء خارطة طريق شخصية لتحول الهوية...'
          )}
        </p>

        {/* Progress */}
        <div className="max-w-md mx-auto">
          <Progress value={analyzingProgress} className="h-3 bg-slate-700" />
          <p className="text-[#3DD4B0] mt-4 font-semibold">{analyzingProgress}% {getText('Complete', 'مكتمل')}</p>
        </div>

        {/* Loading Messages */}
        <div className="mt-8 space-y-2 text-slate-400 text-sm">
          {analyzingProgress > 20 && <p className="animate-fade-in">✓ {getText('Identifying identity patterns...', 'تحديد أنماط الهوية...')}</p>}
          {analyzingProgress > 40 && <p className="animate-fade-in">✓ {getText('Calculating transformation readiness...', 'حساب جاهزية التحول...')}</p>}
          {analyzingProgress > 60 && <p className="animate-fade-in">✓ {getText('Mapping environmental factors...', 'رسم العوامل البيئية...')}</p>}
          {analyzingProgress > 80 && <p className="animate-fade-in">✓ {getText('Generating personalized recommendations...', 'إنشاء توصيات شخصية...')}</p>}
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <>
      {phase === 'intro' && renderIntro()}
      {phase === 'questions' && renderQuestions()}
      {phase === 'analyzing' && renderAnalyzing()}
    </>
  );
}
