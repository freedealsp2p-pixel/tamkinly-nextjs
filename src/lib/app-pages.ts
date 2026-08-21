/**
 * App Pages Data Configuration
 * Centralized metadata for all app pages
 * Enables unique SEO for each app
 */

import type { Metadata } from 'next';

// ============================================
// TYPES
// ============================================

export interface AppFeature {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
}

export interface AppPage {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  tier: 'FREE' | 'BASIC' | 'PREMIUM' | 'MASTERY';
  category: string;
  categoryAr: string;
  keywords: string[];
  image?: string;
  features: AppFeature[];
  methodologyEn?: string;
  methodologyAr?: string;
  valuePropEn?: string;
  valuePropAr?: string;
}

// ============================================
// ALL APP PAGES
// ============================================

export const APP_PAGES: AppPage[] = [
  {
    slug: 'identity-gap-quiz',
    title: 'Identity Gap Quiz | Free 3-Minute Assessment',
    titleAr: 'اختبار فجوة الهوية | تقييم مجاني في 3 دقائق',
    description: 'Discover the gap between who you are and who you want to become. Free research-backed assessment with instant personalized results.',
    descriptionAr: 'اكتشف الفجوة بين من أنت ومن تريد أن تصبح. تقييم مجاني مبني على الأبحاث مع نتائج شخصية فورية.',
    tier: 'FREE',
    category: 'Assessment',
    categoryAr: 'التقييم',
    keywords: ['identity gap quiz', 'free assessment', 'self-discovery', 'identity test', 'personal growth assessment'],
    valuePropEn: 'Bridge the gap between who you are and who you want to be — in just 3 minutes.',
    valuePropAr: 'سدّ الفجوة بين من أنت ومن تريد أن تكون — في 3 دقائق فقط.',
    methodologyEn: 'Based on Higgins\' Self-Discrepancy Theory (1987), which shows that the gap between your actual self and ideal self drives motivation and emotional patterns.',
    methodologyAr: 'مبني على نظرية هيجينز لتناقض الذات (1987)، والتي تُظهر أن الفجوة بين ذاتك الفعلية وذاتك المثالية تحفز الدوافع والأنماط العاطفية.',
    features: [
      { titleEn: '3-Minute Assessment', titleAr: 'تقييم في 3 دقائق', descriptionEn: 'Quick yet scientifically validated questions that map your identity landscape.', descriptionAr: 'أسئلة سريعة ومعتمدة علمياً ترسم خريطة مشهد هويتك.', icon: 'Clock' },
      { titleEn: 'Gap Analysis', titleAr: 'تحليل الفجوة', descriptionEn: 'Visual breakdown of where you are vs. where you want to be across key dimensions.', descriptionAr: 'تحليل مرئي لمكانك مقابل حيث تريد أن تكون عبر الأبعاد الرئيسية.', icon: 'BarChart3' },
      { titleEn: 'Personalized Results', titleAr: 'نتائج شخصية', descriptionEn: 'Tailored insights and recommendations based on your unique identity profile.', descriptionAr: 'رؤى وتوصيات مخصصة بناءً على ملف هويتك الفريد.', icon: 'Sparkles' },
      { titleEn: 'Action Steps', titleAr: 'خطوات عملية', descriptionEn: 'Clear next steps to start closing your identity gap immediately.', descriptionAr: 'خطوات تالية واضحة لبدء سد فجوة هويتك فوراً.', icon: 'Zap' },
    ],
  },
  {
    slug: 'values-clarification',
    title: 'Values Clarification Tool | Discover Your Core Values',
    titleAr: 'أداة توضيح القيم | اكتشف قيمك الأساسية',
    description: 'Scientific method to identify and clarify your core values. Based on ACT and positive psychology research. Free tool.',
    descriptionAr: 'طريقة علمية لتحديد وتوضيح قيمك الأساسية. مبنية على أبحاث ACT وعلم النفس الإيجابي. أداة مجانية.',
    tier: 'FREE',
    category: 'Self-Discovery',
    categoryAr: 'الاكتشاف الذاتي',
    keywords: ['values clarification', 'core values', 'ACT therapy', 'values exercise', 'personal values'],
    valuePropEn: 'Uncover the values that drive every decision you make — and start living aligned.',
    valuePropAr: 'اكتشف القيم التي تحرك كل قرار تتخذه — وابدأ العيش بتناغم.',
    methodologyEn: 'Rooted in Acceptance and Commitment Therapy (ACT) values work and Schwartz\'s Theory of Basic Human Values, proven across 82 cultures.',
    methodologyAr: 'متأصل في عمل القيم في علاج القبول والالتزام (ACT) ونظرية شوارتز للقيم البشرية الأساسية، المثبتة عبر 82 ثقافة.',
    features: [
      { titleEn: 'Interactive Sorting', titleAr: 'فرز تفاعلي', descriptionEn: 'Drag-and-drop exercise to rank what matters most to you.', descriptionAr: 'تمرين سحب وإفلات لترتيب ما يهمك أكثر.', icon: 'Sparkles' },
      { titleEn: 'Value Mapping', titleAr: 'رسم خريطة القيم', descriptionEn: 'Visual map of your core values and how they connect to your daily life.', descriptionAr: 'خريطة مرئية لقيمك الأساسية وكيف تتصل بحياتك اليومية.', icon: 'TrendingUp' },
      { titleEn: 'Alignment Score', titleAr: 'درجة التوافق', descriptionEn: 'See how well your current actions match your stated values.', descriptionAr: 'شاهد مدى توافق أفعالك الحالية مع قيمك المعلنة.', icon: 'BarChart3' },
      { titleEn: 'Guided Reflection', titleAr: 'تأمل موجه', descriptionEn: 'Deep prompts to explore why each value matters to you.', descriptionAr: 'محفزات عميقة لاستكشاف لماذا كل قيمة مهمة لك.', icon: 'Brain' },
    ],
  },
  {
    slug: 'daily-reflection',
    title: 'Daily Reflection Practice | Evidence-Based Journaling',
    titleAr: 'ممارسة التأمل اليومي | كتابة يومية مبنية على الأدلة',
    description: 'Transform your identity through daily reflection. 7 themes with research-backed prompts that rewire neural pathways.',
    descriptionAr: 'حوّل هويتك من خلال التأمل اليومي. 7 مواضيع مع مطالبات مبنية على الأبحاث تعيد تشكيل المسارات العصبية.',
    tier: 'FREE',
    category: 'Journaling',
    categoryAr: 'الكتابة اليومية',
    keywords: ['daily reflection', 'journaling prompts', 'daily journal', 'reflection practice', 'mindfulness journaling'],
    valuePropEn: 'Rewire your neural pathways in just 5 minutes a day with guided identity reflection.',
    valuePropAr: 'أعد تشكيل مساراتك العصبية في 5 دقائق فقط يومياً مع التأمل الهويتي الموجه.',
    methodologyEn: 'Built on expressive writing research (Pennebaker, 1997) and neuroplasticity — consistent reflection physically rewires your brain\'s identity networks.',
    methodologyAr: 'مبني على أبحاث الكتابة التعبيرية (بينيباكر، 1997) واللدونة العصبية — التأمل المستمر يعيد تشكيل شبكات الهوية في دماغك فعلياً.',
    features: [
      { titleEn: '7 Rotating Themes', titleAr: '7 مواضيع متناوبة', descriptionEn: 'Each day focuses on a different aspect of identity transformation.', descriptionAr: 'كل يوم يركز على جانب مختلف من تحول الهوية.', icon: 'Calendar' },
      { titleEn: 'Research-Backed Prompts', titleAr: 'محفزات مدعومة بالأبحاث', descriptionEn: 'Every prompt is grounded in psychology and neuroscience research.', descriptionAr: 'كل محفز مبني على أبحاث علم النفس والعلوم العصبية.', icon: 'Brain' },
      { titleEn: 'Streak Tracking', titleAr: 'تتبع الاستمرارية', descriptionEn: 'Build consistency with visual streaks and milestone celebrations.', descriptionAr: 'ابنِ الاستمرارية مع الإحصائيات المرئية والاحتفال بالإنجازات.', icon: 'TrendingUp' },
      { titleEn: 'Progress Insights', titleAr: 'رؤى التقدم', descriptionEn: 'See patterns in your reflections and identity evolution over time.', descriptionAr: 'شاهد الأنماط في تأملاتك وتطور هويتك عبر الوقت.', icon: 'BarChart3' },
    ],
  },
  {
    slug: 'habit-tracker',
    title: 'Habit Tracker | Build Identity-Based Habits',
    titleAr: 'متتبع العادات | ابنِ عادات مبنية على الهوية',
    description: 'Track habits that align with your desired identity. Visual progress tracking and streak motivation. Free tool.',
    descriptionAr: 'تتبع العادات المتوافقة مع هويتك المستهدفة. تتبع مرئي للتقدم وتحفيز الاستمرارية. أداة مجانية.',
    tier: 'FREE',
    category: 'Productivity',
    categoryAr: 'الإنتاجية',
    keywords: ['identity-aligned habits', 'daily consistency', 'habit architecture', 'streak tracking', 'identity-based habits'],
    valuePropEn: 'Build habits that don\'t just change what you do — they change who you are.',
    valuePropAr: 'ابنِ عادات لا تغير ما تفعله فقط — بل تغير من أنت.',
    methodologyEn: 'Based on James Clear\'s identity-based habit framework and Lally et al.\'s habit formation research showing 66 days to automaticity.',
    methodologyAr: 'مبني على إطار جيمس كلير للعادات المبنية على الهوية وأبحاث لالي وآخرين التي تُظهر 66 يوماً للوصول إلى الأتمتة.',
    features: [
      { titleEn: 'Identity-Linked Habits', titleAr: 'عادات مرتبطة بالهوية', descriptionEn: 'Each habit connects to the identity you\'re building, not just the outcome.', descriptionAr: 'كل عادة متصلة بالهوية التي تبنيها، وليس فقط بالنتيجة.', icon: 'User' },
      { titleEn: 'Visual Progress', titleAr: 'تقدم مرئي', descriptionEn: 'Beautiful charts and streaks that make progress feel tangible and motivating.', descriptionAr: 'رسوم بيانية وإحصائيات جميلة تجعل التقدم ملموساً ومحفزاً.', icon: 'TrendingUp' },
      { titleEn: 'Daily Check-In', titleAr: 'تسجيل يومي', descriptionEn: 'Simple one-tap tracking that fits into any schedule.', descriptionAr: 'تتبع بنقرة واحدة بسيط يناسب أي جدول.', icon: 'CheckCircle2' },
      { titleEn: 'Identity Score', titleAr: 'درجة الهوية', descriptionEn: 'See how your daily habits add up to the person you\'re becoming.', descriptionAr: 'شاهد كيف تتراكم عاداتك اليومية لتشكل الشخص الذي تصبحه.', icon: 'BarChart3' },
    ],
  },
  {
    slug: 'goal-system',
    title: 'Goal System | Identity-Aligned Goal Setting',
    titleAr: 'نظام الأهداف | تحديد أهداف متوافقة مع الهوية',
    description: 'Set goals that match who you want to become. Break down aspirations into actionable steps with progress tracking.',
    descriptionAr: 'حدد أهدافاً تتوافق مع من تريد أن تصبح. قسّم تطلعاتك إلى خطوات عملية مع تتبع التقدم.',
    tier: 'PREMIUM',
    category: 'Planning',
    categoryAr: 'التخطيط',
    keywords: ['goal setting', 'goal system', 'achievement planning', 'goal tracker', 'smart goals'],
    valuePropEn: 'Set goals that actually stick — because they\'re aligned with who you\'re becoming.',
    valuePropAr: 'حدد أهدافاً تلتزم بها فعلاً — لأنها متوافقة مع من تصبح.',
    methodologyEn: 'Combines Locke & Latham\'s Goal-Setting Theory with identity-based motivation research — goals tied to self-concept are 3x more likely to be achieved.',
    methodologyAr: 'يجمع بين نظرية لوك ولاثام لتحديد الأهداف وأبحاث التحفيز المبني على الهوية — الأهداف المرتبطة بالمفهوم الذاتي أكثر احتمالاً 3 مرات للتحقق.',
    features: [
      { titleEn: 'Identity Alignment Check', titleAr: 'فحص توافق الهوية', descriptionEn: 'Every goal is evaluated against your desired identity before you commit.', descriptionAr: 'كل هدف يُقيّم مقابل هويتك المستهدفة قبل أن تلتزم.', icon: 'Sparkles' },
      { titleEn: 'Smart Breakdown', titleAr: 'تفكيك ذكي', descriptionEn: 'Automatically break big goals into manageable weekly and daily steps.', descriptionAr: 'قسّم الأهداف الكبيرة تلقائياً إلى خطوات أسبوعية ويومية قابلة للإدارة.', icon: 'Zap' },
      { titleEn: 'Progress Tracking', titleAr: 'تتبع التقدم', descriptionEn: 'Visual dashboards showing how each goal connects to your transformation.', descriptionAr: 'لوحات مرئية تُظهر كيف يرتبط كل هدف بتحولك.', icon: 'TrendingUp' },
      { titleEn: 'Weekly Review', titleAr: 'مراجعة أسبوعية', descriptionEn: 'Structured reflection to celebrate wins and adjust your approach.', descriptionAr: 'تأمل منظم للاحتفال بالإنجازات وتعديل نهجك.', icon: 'Calendar' },
    ],
  },
  {
    slug: 'identity-baseline',
    title: 'Identity Baseline Worksheet | Self-Concept Assessment',
    titleAr: 'ورقة عمل خط الأساس للهوية | تقييم المفهوم الذاتي',
    description: 'Measure your current self-concept clarity across 8 dimensions. Research-backed baseline for transformation tracking.',
    descriptionAr: 'قِس وضوح مفهومك الذاتي الحالي عبر 8 أبعاد. خط أساس مبني على الأبحاث لتتبع التحول.',
    tier: 'PREMIUM',
    category: 'Assessment',
    categoryAr: 'التقييم',
    keywords: ['identity baseline', 'self-concept', 'identity worksheet', 'baseline assessment', 'self-assessment'],
    valuePropEn: 'You can\'t transform what you can\'t measure. Get a scientific baseline of who you are today.',
    valuePropAr: 'لا يمكنك تحويل ما لا يمكنك قياسه. احصل على خط أساس علمي لمن أنت اليوم.',
    methodologyEn: 'Based on Campbell et al.\'s Self-Concept Clarity Scale and identity status research — measuring coherence, consistency, and stability of self-concept.',
    methodologyAr: 'مبني على مقياس كامبل وآخرين لوضوح المفهوم الذاتي وأبحاث حالة الهوية — قياس تماسك واتساق واستقرار المفهوم الذاتي.',
    features: [
      { titleEn: '8-Dimension Assessment', titleAr: 'تقييم 8 أبعاد', descriptionEn: 'Comprehensive evaluation across identity clarity, self-trust, value congruence, and more.', descriptionAr: 'تقييم شامل عبر وضوح الهوية والثقة بالنفس وتوافق القيم والمزيد.', icon: 'BarChart3' },
      { titleEn: 'Quantified Baseline', titleAr: 'خط أساس كمي', descriptionEn: 'Numerical scores that give you a concrete starting point for transformation.', descriptionAr: 'درجات رقمية تمنحك نقطة بداية ملموسة للتحول.', icon: 'TrendingUp' },
      { titleEn: 'Strengths & Gaps Map', titleAr: 'خريطة نقاط القوة والفجوات', descriptionEn: 'Identify what\'s working and what needs the most attention in your identity.', descriptionAr: 'حدد ما يعمل وما يحتاج أكبر قدر من الاهتمام في هويتك.', icon: 'Sparkles' },
      { titleEn: 'Exportable Report', titleAr: 'تقرير قابل للتصدير', descriptionEn: 'Download your results to track progress over time and share with coaches.', descriptionAr: 'حمّل نتائجك لتتبع التقدم عبر الوقت ومشاركتها مع المدربين.', icon: 'CheckCircle2' },
    ],
  },
  {
    slug: 'identity-recode-system',
    title: 'Identity Recode System | 30-Day Transformation Program',
    titleAr: 'نظام إعادة صياغة الهوية | برنامج تحول لمدة 30 يوماً',
    description: 'Complete identity transformation system with 6 interconnected components. Structured 30-day program with worksheets and trackers.',
    descriptionAr: 'نظام تحول هوية كامل مع 6 مكونات مترابطة. برنامج منظم لمدة 30 يوماً مع أوراق عمل وأدوات تتبع.',
    tier: 'PREMIUM',
    category: 'Transformation',
    categoryAr: 'التحول',
    keywords: ['identity recode', 'transformation program', '30-day challenge', 'identity change', 'personal transformation'],
    valuePropEn: 'Rewrite your identity in 30 days with a systematic, evidence-based transformation protocol.',
    valuePropAr: 'أعد كتابة هويتك في 30 يوماً مع بروتوكول تحول منهجي مبني على الأدلة.',
    methodologyEn: 'Integrates neuroplasticity research, identity theory (Marcia, 1966), and cognitive restructuring — creating new neural pathways through repeated identity-consistent action.',
    methodologyAr: 'يدمج أبحاث اللدونة العصبية ونظرية الهوية (مارشيا، 1966) وإعادة البناء المعرفي — إنشاء مسارات عصبية جديدة من خلال العمل المتكرر المتوافق مع الهوية.',
    features: [
      { titleEn: '6 Connected Components', titleAr: '6 مكونات مترابطة', descriptionEn: 'Baseline, daily planner, environmental audit, evidence tracking, emotion regulation, and decision analysis.', descriptionAr: 'خط الأساس، المخطط اليومي، التدقيق البيئي، تتبع الأدلة، التنظيم العاطفي، وتحليل القرارات.', icon: 'Sparkles' },
      { titleEn: '30-Day Protocol', titleAr: 'بروتوكول 30 يوماً', descriptionEn: 'Day-by-day instructions that build on each other for compound transformation.', descriptionAr: 'تعليمات يومية تتراكم فوق بعضها لتحول مركب.', icon: 'Calendar' },
      { titleEn: 'Interactive Worksheets', titleAr: 'أوراق عمل تفاعلية', descriptionEn: 'Fill-in exercises that make the abstract tangible and trackable.', descriptionAr: 'تمارين قابلة للتعبئة تجعل المجرد ملموساً وقابلاً للتتبع.', icon: 'BookOpen' },
      { titleEn: 'Progress Dashboard', titleAr: 'لوحة تتبع التقدم', descriptionEn: 'See your transformation unfold with visual metrics and milestones.', descriptionAr: 'شاهد تحولك يتكشف مع مقاييس مرئية ومعالم.', icon: 'TrendingUp' },
    ],
  },
  {
    slug: 'environmental-audit',
    title: 'Environmental Audit | Design Your Growth Space',
    titleAr: 'التدقيق البيئي | صمّم مساحة نموك',
    description: 'Audit your physical, social, and digital environments. Align your surroundings with your transformation goals.',
    descriptionAr: 'دقّق بيئاتك المادية والاجتماعية والرقمية. وائم محيطك مع أهداف تحولك.',
    tier: 'PREMIUM',
    category: 'Environment',
    categoryAr: 'البيئة',
    keywords: ['environmental audit', 'environment design', 'growth environment', 'space optimization', 'environmental psychology'],
    valuePropEn: 'Your environment shapes 95% of your behavior. Audit it, redesign it, transform.',
    valuePropAr: 'بيئتك تشكل 95% من سلوكك. دقّقها، أعد تصميمها، تحوّل.',
    methodologyEn: 'Based on Kurt Lewin\'s Field Theory and environmental psychology research showing that surroundings are the strongest predictor of behavior change.',
    methodologyAr: 'مبني على نظرية كورت لوين للحقل وأبحاث علم النفس البيئي التي تُظهر أن المحيط هو أقوى مؤشر لتغيير السلوك.',
    features: [
      { titleEn: '3-Environment Scan', titleAr: 'مسح 3 بيئات', descriptionEn: 'Systematically evaluate your physical, social, and digital spaces.', descriptionAr: 'قيّم بشكل منهجي مساحاتك المادية والاجتماعية والرقمية.', icon: 'Home' },
      { titleEn: 'Alignment Score', titleAr: 'درجة التوافق', descriptionEn: 'See how much your current environment supports or sabotages your goals.', descriptionAr: 'شاهد مدى دعم بيئتك الحالية لأهدافك أو تقويضها لها.', icon: 'BarChart3' },
      { titleEn: 'Redesign Blueprint', titleAr: 'مخطط إعادة التصميم', descriptionEn: 'Actionable changes you can make today to align your space with your identity.', descriptionAr: 'تغييرات عملية يمكنك إجراؤها اليوم لمواءمة مساحتك مع هويتك.', icon: 'Sparkles' },
      { titleEn: 'Quick Wins Checklist', titleAr: 'قائمة إنجازات سريعة', descriptionEn: 'Simple swaps and changes that create immediate positive impact.', descriptionAr: 'تبديلات وتغييرات بسيطة تخلق تأثيراً إيجابياً فورياً.', icon: 'Zap' },
    ],
  },
  {
    slug: 'emotion-regulation',
    title: 'ERQ Emotion Regulation | Master Your Inner World',
    titleAr: 'التنظيم العاطفي ERQ | أتقن عالمك الداخلي',
    description: 'Based on Gross & John\'s ERQ research. Learn cognitive reappraisal vs. suppression for emotional intelligence.',
    descriptionAr: 'مبني على أبحاث Gross & John في ERQ. تعلم إعادة التقييم المعرفي مقابل الكبت للذكاء العاطفي.',
    tier: 'MASTERY',
    category: 'Mental Health',
    categoryAr: 'الصحة النفسية',
    keywords: ['emotion regulation', 'ERQ', 'emotional intelligence', 'cognitive reappraisal', 'emotional control'],
    valuePropEn: 'Stop suppressing emotions. Learn the science of cognitive reappraisal for lasting emotional intelligence.',
    valuePropAr: 'توقف عن كبت المشاعر. تعلم علم إعادة التقييم المعرفي لذكاء عاطفي دائم.',
    methodologyEn: 'Based on the Emotion Regulation Questionnaire (Gross & John, 2003) — the gold standard for measuring reappraisal vs. suppression strategies.',
    methodologyAr: 'مبني على استبيان التنظيم العاطفي (غروس وجون، 2003) — المعيار الذهبي لقياس استراتيجيات إعادة التقييم مقابل الكبت.',
    features: [
      { titleEn: '10-Item ERQ Assessment', titleAr: 'تقييم ERQ من 10 بنود', descriptionEn: 'The validated research instrument to measure your regulation style.', descriptionAr: 'أداة البحث المعتمدة لقياس أسلوب تنظيمك.', icon: 'BarChart3' },
      { titleEn: 'Reappraisal vs Suppression', titleAr: 'إعادة التقييم مقابل الكبت', descriptionEn: 'Understand which strategy you use and why reappraisal is healthier.', descriptionAr: 'افهم أي استراتيجية تستخدم ولماذا إعادة التقييم أكثر صحة.', icon: 'Brain' },
      { titleEn: 'Personalized Techniques', titleAr: 'تقنيات شخصية', descriptionEn: 'Custom exercises to strengthen your cognitive reappraisal skills.', descriptionAr: 'تمارين مخصصة لتعزيز مهارات إعادة التقييم المعرفي لديك.', icon: 'Sparkles' },
      { titleEn: 'Progress Tracking', titleAr: 'تتبع التقدم', descriptionEn: 'Retake the assessment over time to measure real growth in emotional regulation.', descriptionAr: 'أعد التقييم عبر الوقت لقياس النمو الحقيقي في التنظيم العاطفي.', icon: 'TrendingUp' },
    ],
  },
  {
    slug: 'decision-analysis',
    title: 'Decision Pattern Analysis | Better Choices Framework',
    titleAr: 'تحليل أنماط القرارات | إطار اختيارات أفضل',
    description: 'Analyze your decision-making patterns and identify cognitive biases. Make better choices aligned with your identity.',
    descriptionAr: 'حلّل أنماط اتخاذ قراراتك وحدد التحيزات المعرفية. اتخذ اختيارات أفضل متوافقة مع هويتك.',
    tier: 'PREMIUM',
    category: 'Decision Making',
    categoryAr: 'اتخاذ القرارات',
    keywords: ['decision analysis', 'decision making', 'cognitive biases', 'choice architecture', 'better decisions'],
    valuePropEn: 'Your decisions define your identity. Learn to recognize and override the biases that hold you back.',
    valuePropAr: 'قراراتك تحدد هويتك. تعلم التعرف على التحيزات التي تعيقك وتجاوزها.',
    methodologyEn: 'Based on Kahneman & Tversky\'s cognitive bias research and Thaler & Sunstein\'s choice architecture — designing better decision environments.',
    methodologyAr: 'مبني على أبحاث كانمان وتفرسكي في التحيز المعرفي وتالير وسانستين في هندسة الاختيار — تصميم بيئات قرارات أفضل.',
    features: [
      { titleEn: 'Pattern Recognition', titleAr: 'التعرف على الأنماط', descriptionEn: 'Identify recurring patterns in how you make decisions — good and bad.', descriptionAr: 'حدد الأنماط المتكررة في كيفية اتخاذ قراراتك — الجيدة والسيئة.', icon: 'Brain' },
      { titleEn: 'Bias Detection', titleAr: 'كشف التحيزات', descriptionEn: 'Uncover cognitive biases that silently influence your choices.', descriptionAr: 'اكشف التحيزات المعرفية التي تؤثر بصمت على اختياراتك.', icon: 'Sparkles' },
      { titleEn: 'Identity-Aligned Framework', titleAr: 'إطار متوافق مع الهوية', descriptionEn: 'Decision-making framework that keeps your choices aligned with who you\'re becoming.', descriptionAr: 'إطار اتخاذ قرارات يبقي اختياراتك متوافقة مع من تصبح.', icon: 'User' },
      { titleEn: 'Decision Journal', titleAr: 'يومنة القرارات', descriptionEn: 'Track and review decisions to improve your judgment over time.', descriptionAr: 'تتبع وراجع القرارات لتحسين حكمك عبر الوقت.', icon: 'BookOpen' },
    ],
  },
  {
    slug: 'evidence-tracking',
    title: 'Evidence Tracking System | Document Your Transformation',
    titleAr: 'نظام تتبع الأدلة | وثّق تحولك',
    description: 'Track evidence of your new identity. Capture moments that prove who you\'re becoming with this structured system.',
    descriptionAr: 'تتبع أدلة هويتك الجديدة. التقط اللحظات التي تثبت من تصبح بهذا النظام المنظم.',
    tier: 'PREMIUM',
    category: 'Progress Tracking',
    categoryAr: 'تتبع التقدم',
    keywords: ['evidence tracking', 'transformation evidence', 'progress documentation', 'identity proof', 'change tracking'],
    valuePropEn: 'You are who you can prove you are. Track the evidence of your new identity, one moment at a time.',
    valuePropAr: 'أنت من يمكنك إثبات أنك هو. تتبع أدلة هويتك الجديدة، لحظة بلحظة.',
    methodologyEn: 'Based on self-perception theory (Bem, 1972) — we infer our identity from observing our own behavior. Evidence tracking accelerates this natural process.',
    methodologyAr: 'مبني على نظرية الإدراك الذاتي (بيم، 1972) — نستنتج هويتنا من مراقبة سلوكنا الخاص. تتبع الأدلة يسرّع هذه العملية الطبيعية.',
    features: [
      { titleEn: 'Evidence Capture', titleAr: 'التقاط الأدلة', descriptionEn: 'Log daily moments that prove your new identity with context and reflection.', descriptionAr: 'سجّل اللحظات اليومية التي تثبت هويتك الجديدة مع السياق والتأمل.', icon: 'CheckCircle2' },
      { titleEn: 'Identity Proof Score', titleAr: 'درجة إثبات الهوية', descriptionEn: 'Numerical measure of how much evidence supports your desired identity.', descriptionAr: 'قياس رقمي لكمية الأدلة الداعمة لهويتك المستهدفة.', icon: 'BarChart3' },
      { titleEn: 'Pattern Insights', titleAr: 'رؤى الأنماط', descriptionEn: 'AI-powered analysis of your evidence patterns and identity themes.', descriptionAr: 'تحليل مدعوم بالذكاء الاصطناعي لأنماط أدلتك وموضوعات الهوية.', icon: 'Brain' },
      { titleEn: 'Milestone Celebrations', titleAr: 'الاحتفال بالإنجازات', descriptionEn: 'Automated recognition of key transformation milestones and progress.', descriptionAr: 'اعتراف تلقائي بمعالم التحول الرئيسية والتقدم.', icon: 'Sparkles' },
    ],
  },
  {
    slug: 'daily-planner',
    title: 'Daily Planner | Identity-Based Time Management',
    titleAr: 'المخطط اليومي | إدارة الوقت المبنية على الهوية',
    description: 'Plan your day around who you want to become. Time blocking and priority setting aligned with your identity.',
    descriptionAr: 'خطط ليومك حول من تريد أن تصبح. تقسيم الوقت وتحديد الأولويات المتوافقة مع هويتك.',
    tier: 'PREMIUM',
    category: 'Planning',
    categoryAr: 'التخطيط',
    keywords: ['daily planner', 'time management', 'daily planning', 'time blocking', 'productivity planner'],
    valuePropEn: 'Plan your day around who you\'re becoming — not just what you need to get done.',
    valuePropAr: 'خطط ليومك حول من تصبح — وليس فقط ما تحتاج لإنجازه.',
    methodologyEn: 'Combines time-blocking research with identity-based motivation — when your daily schedule reflects your desired identity, consistency becomes automatic.',
    methodologyAr: 'يجمع بين أبحاث تقسيم الوقت والتحفيز المبني على الهوية — عندما يعكس جدولك اليومي هويتك المستهدفة، تصبح الاستمرارية تلقائية.',
    features: [
      { titleEn: 'Identity-First Planning', titleAr: 'تخطيط الهوية أولاً', descriptionEn: 'Start each day by choosing who you want to be, then plan tasks that prove it.', descriptionAr: 'ابدأ كل يوم باختيار من تريد أن تكون، ثم خطط مهاماً تثبت ذلك.', icon: 'User' },
      { titleEn: 'Smart Time Blocks', titleAr: 'كتل زمنية ذكية', descriptionEn: 'Pre-designed time blocks aligned with identity-building activities.', descriptionAr: 'كتل زمنية مصممة مسبقاً متوافقة مع أنشطة بناء الهوية.', icon: 'Clock' },
      { titleEn: 'Non-Negotiable Actions', titleAr: 'إجراءات غير قابلة للتفاوض', descriptionEn: 'Set daily identity-proof actions that you commit to no matter what.', descriptionAr: 'حدد إجراءات إثبات هوية يومية تلتزم بها مهما حدث.', icon: 'CheckCircle2' },
      { titleEn: 'Evening Review', titleAr: 'مراجعة مسائية', descriptionEn: 'Reflect on how your day lived up to the identity you aimed for.', descriptionAr: 'تأمل كيف عاش يومك وفقاً للهوية التي استهدفتها.', icon: 'Sparkles' },
    ],
  },
  {
    slug: 'journal-system',
    title: 'Journal System | Structured Self-Reflection',
    titleAr: 'نظام الكتابة اليومية | التأمل الذاتي المنظم',
    description: 'Complete journaling system with templates for identity work, habit tracking, and transformation documentation.',
    descriptionAr: 'نظام كتابة يومية كامل مع قوالب لعمل الهوية وتتبع العادات وتوثيق التحول.',
    tier: 'PREMIUM',
    category: 'Journaling',
    categoryAr: 'الكتابة اليومية',
    keywords: ['journal system', 'journaling templates', 'self-reflection', 'identity journal', 'structured journaling'],
    valuePropEn: 'Stop staring at blank pages. Structured templates that turn journaling into a transformation tool.',
    valuePropAr: 'توقف عن التحديق في الصفحات الفارغة. قوالب منظمة تحول الكتابة إلى أداة تحول.',
    methodologyEn: 'Based on Pennebaker\'s expressive writing paradigm and structured reflection research — guided templates produce deeper insight than free writing.',
    methodologyAr: 'مبني على نموذج بينيباكر للكتابة التعبيرية وأبحاث التأمل المنظم — القوالب الموجهة تنتج رؤى أعمق من الكتابة الحرة.',
    features: [
      { titleEn: 'Multiple Templates', titleAr: 'قوالب متعددة', descriptionEn: 'Choose from identity work, habit tracking, emotion processing, and more.', descriptionAr: 'اختر من عمل الهوية وتتبع العادات ومعالجة المشاعر والمزيد.', icon: 'BookOpen' },
      { titleEn: 'Guided Prompts', titleAr: 'محفزات موجهة', descriptionEn: 'Research-backed questions that unlock deeper self-understanding.', descriptionAr: 'أسئلة مدعومة بالأبحاث تفتح فهماً ذاتياً أعمق.', icon: 'Brain' },
      { titleEn: 'Tag & Search', titleAr: 'وسم وبحث', descriptionEn: 'Tag entries by theme and search across your entire journal history.', descriptionAr: 'وسم المدخلات حسب الموضوع وابحث عبر تاريخ يومتك بالكامل.', icon: 'Sparkles' },
      { titleEn: 'Growth Timeline', titleAr: 'خط زمني للنمو', descriptionEn: 'Visual timeline showing your transformation journey over weeks and months.', descriptionAr: 'خط زمني مرئي يُظهر رحلة تحولك عبر الأسابيع والأشهر.', icon: 'TrendingUp' },
    ],
  },
  {
    slug: 'worksheets',
    title: 'Worksheets Library | Transformation Tools Collection',
    titleAr: 'مكتبة أوراق العمل | مجموعة أدوات التحول',
    description: 'Access all Tamkinly worksheets in one place. Identity exploration, habit building, and transformation exercises.',
    descriptionAr: 'الوصول إلى جميع أوراق عمل تمكينلي في مكان واحد. استكشاف الهوية وبناء العادات وتمارين التحول.',
    tier: 'PREMIUM',
    category: 'Worksheets',
    categoryAr: 'أوراق العمل',
    keywords: ['worksheets', 'transformation tools', 'self-improvement worksheets', 'identity exercises', 'personal development'],
    valuePropEn: 'Every tool you need for transformation, organized and ready to use — all in one place.',
    valuePropAr: 'كل أداة تحتاجها للتحول، منظمة وجاهزة للاستخدام — كلها في مكان واحد.',
    methodologyEn: 'Each worksheet is built on specific psychological frameworks — CBT, ACT, positive psychology, and identity research — ensuring evidence-based practice.',
    methodologyAr: 'كل ورقة عمل مبنية على أطر نفسية محددة — العلاج المعرفي السلوكي ACT وعلم النفس الإيجابي وأبحاث الهوية — مما يضمن ممارسة مبنية على الأدلة.',
    features: [
      { titleEn: 'Complete Library', titleAr: 'مكتبة كاملة', descriptionEn: 'Access every Tamkinly worksheet — identity, habits, emotions, decisions, and more.', descriptionAr: 'الوصول لكل أوراق عمل تمكينلي — الهوية والعادات والمشاعر والقرارات والمزيد.', icon: 'BookOpen' },
      { titleEn: 'Interactive Format', titleAr: 'تنسيق تفاعلي', descriptionEn: 'Fill in digitally or print — designed for how you work best.', descriptionAr: 'املأ رقمياً أو اطبع — مصمم لطريقة عملك الأفضل.', icon: 'Zap' },
      { titleEn: 'Progress Saving', titleAr: 'حفظ التقدم', descriptionEn: 'Your work is saved automatically — pick up where you left off.', descriptionAr: 'عملك يُحفظ تلقائياً — أكمل من حيث توقفت.', icon: 'CheckCircle2' },
      { titleEn: 'New Worksheets Monthly', titleAr: 'أوراق عمل جديدة شهرياً', descriptionEn: 'Fresh exercises and templates added every month based on user feedback.', descriptionAr: 'تمارين وقوالب جديدة تُضاف كل شهر بناءً على ملاحظات المستخدمين.', icon: 'Sparkles' },
    ],
  },
  {
    slug: 'ai-identity-coach',
    title: 'AI Identity Coach | Coming Soon',
    titleAr: 'مدرب الهوية بالذكاء الاصطناعي | دليل تحول شخصي على مدار الساعة',
    description: 'The Tamkinly AI Identity Coach is coming Q3 2026. Built on neuroplasticity and self-authorship. Join the waitlist for early access.',
    descriptionAr: 'تدريب مدعوم بالذكاء الاصطناعي لتحويل الهوية. إرشاد شخصي للاكتشاف والعادات والتنظيم العاطفي.',
    tier: 'MASTERY',
    category: 'AI Coaching',
    categoryAr: 'التدريب بالذكاء الاصطناعي',
    keywords: ['AI coach', 'artificial intelligence coaching', 'identity coach', 'AI therapy', 'personal AI guide'],
    valuePropEn: 'Your 24/7 identity transformation guide — personalized coaching powered by AI and neuroscience.',
    valuePropAr: 'دليل تحول هويتك على مدار الساعة — تدريب شخصي مدعوم بالذكاء الاصطناعي والعلوم العصبية.',
    methodologyEn: 'Built on neuroplasticity research, self-authorship theory (Baxter Magolda), and evidence-based coaching frameworks for sustainable identity change.',
    methodologyAr: 'مبني على أبحاث اللدونة العصبية ونظرية التأليف الذاتي (باكستر ماجولدا) وأطر التدريب المبنية على الأدلة للتغيير الهويتي المستدام.',
    features: [
      { titleEn: '24/7 Availability', titleAr: 'متاح على مدار الساعة', descriptionEn: 'Get coaching support whenever you need it — no scheduling required.', descriptionAr: 'احصل على دعم التدريب متى احتجت — بدون حاجة لجدولة.', icon: 'Headphones' },
      { titleEn: 'Personalized Guidance', titleAr: 'إرشاد شخصي', descriptionEn: 'AI that learns your patterns and provides tailored identity coaching.', descriptionAr: 'ذكاء اصطناعي يتعلم أنماطك ويقدم تدريباً هويتياً مخصصاً.', icon: 'Sparkles' },
      { titleEn: 'Neuroscience-Backed', titleAr: 'مدعوم بالعلوم العصبية', descriptionEn: 'Every recommendation is grounded in neuroplasticity and identity research.', descriptionAr: 'كل توصية مؤسسة على اللدونة العصبية وأبحاث الهوية.', icon: 'Brain' },
      { titleEn: 'Waitlist Early Access', titleAr: 'وصول مبكر عبر قائمة الانتظار', descriptionEn: 'Join the waitlist now to be first in line when we launch.', descriptionAr: 'انضم لقائمة الانتظار الآن لتكون أول في الصف عند الإطلاق.', icon: 'Zap' },
    ],
  },
  {
    slug: 'progress-dashboard',
    title: 'Progress Dashboard | Unified Transformation Tracker',
    titleAr: 'لوحة تتبع التقدم | متتبع تحول موحد',
    description: 'Track your progress across all Tamkinly apps. Unified view of identity score, achievements, and transformation journey.',
    descriptionAr: 'تتبع تقدمك عبر جميع تطبيقات تمكينلي. عرض موحد لدرجة الهوية والإنجازات ورحلة التحول.',
    tier: 'PREMIUM',
    category: 'Dashboard',
    categoryAr: 'لوحة المتابعة',
    keywords: ['progress dashboard', 'transformation tracker', 'identity score', 'achievement tracking', 'progress monitoring'],
    valuePropEn: 'See your entire transformation journey in one view — scores, milestones, and patterns across all tools.',
    valuePropAr: 'شاهد رحلة تحولك بالكامل في عرض واحد — درجات ومعالم وأنماط عبر جميع الأدوات.',
    methodologyEn: 'Combines multi-dimensional assessment data with longitudinal tracking — providing a comprehensive view of identity transformation over time.',
    methodologyAr: 'يجمع بيانات التقييم متعدد الأبعاد مع التتبع الطولي — مقدماً عرضاً شاملاً لتحول الهوية عبر الوقت.',
    features: [
      { titleEn: 'Unified Identity Score', titleAr: 'درجة هوية موحدة', descriptionEn: 'One number that tracks your overall transformation progress across all dimensions.', descriptionAr: 'رقم واحد يتتبع تقدم تحولك الإجمالي عبر جميع الأبعاد.', icon: 'BarChart3' },
      { titleEn: 'Cross-App Tracking', titleAr: 'تتبع عبر التطبيقات', descriptionEn: 'See how your work in each app contributes to your overall transformation.', descriptionAr: 'شاهد كيف يساهم عملك في كل تطبيق في تحولك الإجمالي.', icon: 'TrendingUp' },
      { titleEn: 'Achievement System', titleAr: 'نظام الإنجازات', descriptionEn: 'Unlock milestones and badges as you progress through your transformation.', descriptionAr: 'افتح المعالم والشارات كما تتقدم في تحولك.', icon: 'Sparkles' },
      { titleEn: 'Weekly Reports', titleAr: 'تقارير أسبوعية', descriptionEn: 'Automated weekly summaries of your progress, patterns, and next steps.', descriptionAr: 'ملخصات أسبوعية آلية لتقدمك وأنماطك وخطواتك التالية.', icon: 'BookOpen' },
    ],
  },
  {
    slug: 'executive-manual',
    title: 'Executive Manual | Complete Transformation Guide',
    titleAr: 'الدليل التنفيذي | دليل التحول الكامل',
    description: 'Comprehensive guide for identity transformation. Step-by-step instructions for using all Tamkinly tools effectively.',
    descriptionAr: 'دليل شامل لتحويل الهوية. تعليمات خطوة بخطوة لاستخدام جميع أدوات تمكينلي بفعالية.',
    tier: 'PREMIUM',
    category: 'Guide',
    categoryAr: 'الدليل',
    keywords: ['executive manual', 'transformation guide', 'user guide', 'complete manual', 'transformation instructions'],
    valuePropEn: 'The complete playbook for identity transformation — every strategy, tool, and technique in one guide.',
    valuePropAr: 'الدليل الكامل لتحويل الهوية — كل استراتيجية وأداة وتقنية في دليل واحد.',
    methodologyEn: 'Synthesizes 50+ years of identity research into a practical, step-by-step transformation framework anyone can follow.',
    methodologyAr: 'يلخص أكثر من 50 عاماً من أبحاث الهوية في إطار تحول عملي خطوة بخطوة يمكن لأي شخص اتباعه.',
    features: [
      { titleEn: 'Step-by-Step Guide', titleAr: 'دليل خطوة بخطوة', descriptionEn: 'Clear instructions for every phase of your transformation journey.', descriptionAr: 'تعليمات واضحة لكل مرحلة من رحلة تحولك.', icon: 'BookOpen' },
      { titleEn: 'Tool Integration', titleAr: 'تكامل الأدوات', descriptionEn: 'Learn how to use all Tamkinly tools together for maximum impact.', descriptionAr: 'تعلم كيفية استخدام جميع أدوات تمكينلي معاً لأقصى تأثير.', icon: 'Sparkles' },
      { titleEn: 'Strategy Library', titleAr: 'مكتبة الاستراتيجيات', descriptionEn: 'Proven strategies for common transformation challenges and plateaus.', descriptionAr: 'استراتيجيات مثبتة لتحديات وهضاب التحول الشائعة.', icon: 'Brain' },
      { titleEn: 'Regular Updates', titleAr: 'تحديثات منتظمة', descriptionEn: 'New content and strategies added based on latest research and user feedback.', descriptionAr: 'محتوى واستراتيجيات جديدة تُضاف بناءً على أحدث الأبحاث وملاحظات المستخدمين.', icon: 'Zap' },
    ],
  },
  {
    slug: 'community-access',
    title: 'Community Access | Connect with Transformation Seekers',
    titleAr: 'الوصول للمجتمع | تواصل مع باحثي التحول',
    description: 'Join a community of people on their transformation journey. Share experiences, get support, and celebrate wins.',
    descriptionAr: 'انضم لمجتمع من الأشخاص في رحلة تحولهم. شارك التجارب واحصل على الدعم واحتفل بالإنجازات.',
    tier: 'MASTERY',
    category: 'Community',
    categoryAr: 'المجتمع',
    keywords: ['community', 'transformation community', 'support group', 'accountability partner', 'growth community'],
    valuePropEn: 'Transform faster together — accountability, support, and shared wisdom from people on the same journey.',
    valuePropAr: 'تحوّل أسرع معاً — مساءلة ودعم وحكمة مشتركة من أشخاص في نفس الرحلة.',
    methodologyEn: 'Social identity theory shows that belonging to a group committed to transformation accelerates individual change through accountability and shared norms.',
    methodologyAr: 'نظرية الهوية الاجتماعية تُظهر أن الانتماء لمجموعة ملتزمة بالتحول يسرّع التغيير الفردي من خلال المساءلة والمعايير المشتركة.',
    features: [
      { titleEn: 'Accountability Partners', titleAr: 'شركاء المساءلة', descriptionEn: 'Get matched with people on similar transformation paths for mutual support.', descriptionAr: 'احصل على مطابقة مع أشخاص في مسارات تحول مماثلة للدعم المتبادل.', icon: 'Users' },
      { titleEn: 'Group Challenges', titleAr: 'تحديات جماعية', descriptionEn: 'Participate in community transformation challenges for extra motivation.', descriptionAr: 'شارك في تحديات التحول المجتمعية لتحفيز إضافي.', icon: 'Sparkles' },
      { titleEn: 'Expert Sessions', titleAr: 'جلسات الخبراء', descriptionEn: 'Live Q&A sessions with psychologists and transformation experts.', descriptionAr: 'جلسات أسئلة وأجوبة مباشرة مع علماء نفس وخبراء تحول.', icon: 'Headphones' },
      { titleEn: 'Win Celebrations', titleAr: 'الاحتفال بالإنجازات', descriptionEn: 'Share and celebrate your transformation milestones with the community.', descriptionAr: 'شارك واحتفل بمعالم تحولك مع المجتمع.', icon: 'CheckCircle2' },
    ],
  },
  {
    slug: 'priority-support',
    title: 'Priority Support | Personal Transformation Assistance',
    titleAr: 'الدعم ذو الأولوية | مساعدة شخصية للتحول',
    description: 'Get priority access to our transformation experts. Personal guidance and faster response times for your journey.',
    descriptionAr: 'احصل على وصول ذو الأولوية لخبراء التحول لدينا. إرشاد شخصي وأوقات استجابة أسرع لرحلتك.',
    tier: 'MASTERY',
    category: 'Support',
    categoryAr: 'الدعم',
    keywords: ['priority support', 'personal assistance', 'transformation help', 'expert guidance', 'premium support'],
    valuePropEn: 'Get unstuck fast — personal guidance from transformation experts when you need it most.',
    valuePropAr: 'اخرج من الجمود بسرعة — إرشاد شخصي من خبراء التحول عندما تحتاجه أكثر.',
    methodologyEn: 'Research shows that personalized guidance increases transformation success rates by 65% compared to self-directed approaches alone.',
    methodologyAr: 'تُظهر الأبحاث أن الإرشاد الشخصي يزيد معدلات نجاح التحول بنسبة 65% مقارنة بالنهج الذاتي وحده.',
    features: [
      { titleEn: 'Priority Response', titleAr: 'استجابة ذات أولوية', descriptionEn: 'Get answers to your questions within 24 hours, guaranteed.', descriptionAr: 'احصل على إجابات لأسئلتك خلال 24 ساعة، مضمون.', icon: 'Headphones' },
      { titleEn: 'Expert Guidance', titleAr: 'إرشاد الخبراء', descriptionEn: 'Direct access to transformation experts who understand the Tamkinly system.', descriptionAr: 'وصول مباشر لخبراء تحول يفهمون نظام تمكينلي.', icon: 'Users' },
      { titleEn: 'Personalized Advice', titleAr: 'نصائح شخصية', descriptionEn: 'Get specific recommendations for your unique situation and challenges.', descriptionAr: 'احصل على توصيات محددة لوضعك وتحدياتك الفريدة.', icon: 'Sparkles' },
      { titleEn: 'Crisis Support', titleAr: 'دعم الأزمات', descriptionEn: 'Fast-track support when you\'re feeling stuck or overwhelmed in your journey.', descriptionAr: 'دعم مسرع عندما تشعر بالجمود أو الإرهاق في رحلتك.', icon: 'Heart' },
    ],
  },
  {
    slug: 'trial-planner',
    title: 'Trial Planner | Free Transformation Starter',
    titleAr: 'مخطط التجربة | بداية تحول مجانية',
    description: 'Start your transformation journey with our free trial planner. Sample exercises from our premium tools.',
    descriptionAr: 'ابدأ رحلة تحولك مع مخطط التجربة المجاني لدينا. تمارين تجريبية من أدواتنا المتميزة.',
    tier: 'BASIC',
    category: 'Planning',
    categoryAr: 'التخطيط',
    keywords: ['trial planner', 'free trial', 'transformation starter', 'free tools', 'beginner planning'],
    valuePropEn: 'Try the Tamkinly system for free — a taste of the transformation tools that have helped thousands.',
    valuePropAr: 'جرب نظام تمكينلي مجاناً — لمذاق من أدوات التحول التي ساعدت الآلاف.',
    methodologyEn: 'Sample exercises from our evidence-based tools — designed to give you a real experience of how identity transformation works.',
    methodologyAr: 'تمارين تجريبية من أدواتنا المبنية على الأدلة — مصممة لتمنحك تجربة حقيقية لكيفية عمل تحول الهوية.',
    features: [
      { titleEn: 'Sample Exercises', titleAr: 'تمارين تجريبية', descriptionEn: 'Try exercises from our premium tools to see the Tamkinly difference.', descriptionAr: 'جرب تمارين من أدواتنا المتميزة لترى فرق تمكينلي.', icon: 'Sparkles' },
      { titleEn: 'Quick Results', titleAr: 'نتائج سريعة', descriptionEn: 'See meaningful insights in your very first session.', descriptionAr: 'شاهد رؤى ذات معنى في جلستك الأولى جداً.', icon: 'Zap' },
      { titleEn: 'No Commitment', titleAr: 'بدون التزام', descriptionEn: 'Free forever — no credit card required, no time limit.', descriptionAr: 'مجاني للأبد — بدون بطاقة ائتمان، بدون حد زمني.', icon: 'CheckCircle2' },
      { titleEn: 'Upgrade Anytime', titleAr: 'ترقية في أي وقت', descriptionEn: 'Seamlessly upgrade to unlock the full transformation system when ready.', descriptionAr: 'قم بالترقية بسلاسة لفتح نظام التحول الكامل عندما تكون مستعداً.', icon: 'TrendingUp' },
    ],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get app page by slug
 */
export function getAppPageBySlug(slug: string): AppPage | undefined {
  return APP_PAGES.find(app => app.slug === slug);
}

/**
 * Get all app slugs for static generation
 */
export function getAllAppSlugs(): string[] {
  return APP_PAGES.map(app => app.slug);
}

/**
 * Generate metadata for an app page
 */
export function generateAppPageMetadata(slug: string): Metadata {
  const app = getAppPageBySlug(slug);
  
  if (!app) {
    return {
      title: 'App Not Found | Tamkinly',
      description: 'The requested app could not be found.',
    };
  }
  
  const fullUrl = `https://tamkinly.com/apps/${app.slug}`;
  const imageUrl = app.image 
    ? `https://tamkinly.com${app.image}` 
    : `https://tamkinly.com/apps/${app.slug}/opengraph-image`;
  
  const isFree = app.tier === 'FREE';
  const tierDescription = isFree 
    ? 'Free to use.' 
    : `Available in ${app.tier} package.`;
  
  return {
    title: app.title,
    description: `${app.description} ${tierDescription}`,
    keywords: app.keywords,
    
    alternates: {
      canonical: fullUrl,
    },
    
    openGraph: {
      title: app.title,
      description: app.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: app.title,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: app.title,
      description: app.description,
      site: '@tamkinly',
      images: [imageUrl],
    },
    
    other: {
      'app:tier': app.tier,
      'app:category': app.category,
      'DC.description': app.description,
      'DC.subject': app.keywords.slice(0, 3).join(', '),
    },
  };
}

/**
 * Get apps by tier
 */
export function getAppsByTier(tier: 'FREE' | 'BASIC' | 'PREMIUM' | 'MASTERY'): AppPage[] {
  return APP_PAGES.filter(app => app.tier === tier);
}

/**
 * Get apps by category
 */
export function getAppsByCategory(category: string): AppPage[] {
  return APP_PAGES.filter(app => 
    app.category.toLowerCase().includes(category.toLowerCase())
  );
}

