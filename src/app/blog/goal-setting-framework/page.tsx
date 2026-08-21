'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Zap, Target, TrendingUp, Brain, RefreshCw, Compass, Map, Flag, Route } from "lucide-react";
import { BlogArticleJsonLd } from "@/components/seo/JsonLd";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';
import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function GoalSettingFrameworkArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  return (
    <>
      <BlogArticleJsonLd
        headline="Goal Setting Framework: Identity-Aligned Goals That Actually Work"
        description="SMART goals and OKRs fail because they ignore identity. Learn the identity-aligned goal setting framework that creates goals you actually achieve — because they are expressions of who you are becoming, not obligations you force yourself to pursue."
        slug="goal-setting-framework"
        datePublished="2026-04-05"
        dateModified="2026-04-05"
        author="Abdallah Chouaf"
        keywords={["goal setting framework", "identity-aligned goals", "goal setting", "how to set goals", "goal achievement", "identity goals", "effective goal setting"]}
      />
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Execution", "التنفيذ")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Goal Setting Framework: Identity-Aligned Goals That Actually Work", "إطار تحديد الأهداف: أهداف متوافقة مع الهوية تعمل فعلاً")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("11 min read", "١١ دقيقة قراءة")}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {getText("Abdallah Chouaf", "عبدالله الشواف")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">

            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              {getText(
                "You have set goals before. New Year's resolutions. Quarterly targets. Annual reviews. And like most people, you have watched those goals wither and die, usually within weeks of setting them. The research is brutal: only 8 percent of people achieve their New Year's resolutions. The average goal is abandoned by February. Corporate OKRs become paperwork exercises. Vision boards gather dust. The pattern is so consistent that most people have stopped believing goals work at all. But goals do work — when they are built on the right foundation. And that foundation is not SMART criteria, or stretch targets, or accountability systems. It is identity.",
                "لقد وضعت أهدافاً من قبل. قرارات رأس السنة. أهداف ربع سنوية. مراجعات سنوية. ومثل معظم الناس، شاهدت تلك الأهداف تذبل وتموت، عادة خلال أسابيع من وضعها. الأبحاث قاسية: فقط 8 بالمائة من الناس يحققون قرارات رأس السنة. الهدف المتوسط يُتخلى عنه بحلول فبراير. أهداف OKRs المؤسسية تصبح تمارين ورقية. لوحات الرؤية تجمع الغبار. النمط متسق لدرجة أن معظم الناس توقفوا عن تصديق أن الأهداف تعمل على الإطلاق. لكن الأهداف تعمل — عندما تُبنى على الأساس الصحيح. وهذا الأساس ليس معايير SMART، أو أهداف التمدد، أو أنظمة المساءلة. إنه الهوية."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why Traditional Goal Setting Fails", "لماذا يفشل تحديد الأهداف التقليدي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The SMART framework — Specific, Measurable, Achievable, Relevant, Time-bound — has been the gold standard of goal setting for four decades. And it produces goals that are clear, trackable, and perfectly structured for failure. Not because the framework is wrong, but because it is incomplete. SMART tells you how to format a goal, but it says nothing about whether the goal is aligned with who you are. You can set a perfectly SMART goal to run a marathon, but if your identity is 'I am not a runner,' that goal is fighting a war it will lose.",
                "إطار SMART — محدد، قابل للقياس، قابل للتحقيق، ذو صلة، محدد بوقت — كان المعيار الذهبي لتحديد الأهداف لأربعة عقود. وينتج أهدافاً واضحة، قابلة للتتبع، ومهيكلة بشكل مثالي للفشل. ليس لأن الإطار خاطئ، بل لأنه غير مكتمل. SMART يخبرك كيف تنسق هدفاً، لكنه لا يقول شيئاً عما إذا كان الهدف متوافقاً مع من أنت. يمكنك وضع هدف SMART مثالي لإجراء ماراثون، لكن إذا كانت هويتك 'أنا لست عداءً'، فإن ذلك الهدف يخرب حرباً سيخسرها."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The same applies to OKRs (Objectives and Key Results), BHAGs (Big Hairy Audacious Goals), and every other popular framework. They provide structure without alignment. And goals without identity alignment are like ships with detailed navigation systems but no compass — technically on course, but heading in the wrong direction. You achieve the goal and feel empty. Or you fail to achieve it and feel worse. Neither outcome produces lasting change, because neither outcome changes who you are.",
                "ينطبق الشيء نفسه على OKRs (الأهداف والنتائج الرئيسية)، وBHAGs (الأهداف الجريئة الكبيرة)، وكل إطار شائع آخر. إنها توفر البنية بدون محاذاة. والأهداف بدون محاذاة هوية تشبه سفناً بأنظمة ملاحة مفصلة لكن بدون بوصلة — تقنياً على المسار، لكنها تتجه في الاتجاه الخاطئ. تحقق الهدف وتشعر بالفراغ. أو تفشل في تحقيقه وتشعر بأسوأ. لا تؤدي النتيجة إلى تغيير دائم، لأن أياً منهما لا تغير من أنت."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "A goal that is not aligned with your identity is not a goal — it is a conflict. And conflicts always resolve in favor of identity.",
                  "هدف غير متوافق مع هويتك ليس هدفاً — إنه صراع. والصراعات تُحل دائماً لصالح الهوية."
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Identity-Aligned Goal Framework", "إطار الأهداف المتوافقة مع الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Identity-Aligned Goal Framework replaces the question 'What do I want to achieve?' with a deeper one: 'Who am I becoming, and what goals would that person naturally pursue?' This is not semantics — it is a fundamental reorientation of the goal-setting process. Instead of starting with outcomes and working backward to behaviors, you start with identity and let the goals emerge naturally from who you are becoming.",
                "إطار الأهداف المتوافقة مع الهوية يستبدل السؤال 'ماذا أريد أن أحقق؟' بسؤال أعمق: 'من أصبح، وما الأهداف التي سيتبعها ذلك الشخص طبيعياً؟' هذا ليس علم دلالة — إنه إعادة توجيه جوهرية لعملية تحديد الأهداف. بدلاً من البدء بالنتائج والعمل عائداً إلى السلوكيات، تبدأ بالهوية وتدع الأهداف تنبثق طبيعياً من من تصبح."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The framework has five layers, each building on the previous one. When all five layers are aligned, goals become almost impossible to abandon because abandoning them would mean abandoning who you are becoming.",
                "الإطار يتكون من خمس طبقات، كل واحدة تبني على السابقة. عندما تكون الطبقات الخمس متوافقة، تصبح الأهداف شبه مستحيلة التخلي لأن التخلي عنها يعني التخلي عمن تصبح."
              )}
            </p>

            <div className="grid md:grid-cols-5 gap-4 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <Compass className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary text-sm mb-2">{getText("Identity", "الهوية")}</h3>
                  <p className="text-xs text-slate-600">{getText("Who am I becoming?", "من أصبح؟")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <Map className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary text-sm mb-2">{getText("Values", "القيم")}</h3>
                  <p className="text-xs text-slate-600">{getText("What matters most to this identity?", "ما الأهم لهذه الهوية؟")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <Route className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary text-sm mb-2">{getText("Direction", "الاتجاه")}</h3>
                  <p className="text-xs text-slate-600">{getText("What path serves these values?", "أي مسار يخدم هذه القيم؟")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <Flag className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary text-sm mb-2">{getText("Milestones", "المعالم")}</h3>
                  <p className="text-xs text-slate-600">{getText("What markers show progress?", "أي علامات تُظهر التقدم؟")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary text-sm mb-2">{getText("Actions", "الأفعال")}</h3>
                  <p className="text-xs text-slate-600">{getText("What do I do today?", "ماذا أفعل اليوم؟")}</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Layer 1: Identity — The Foundation", "الطبقة ١: الهوية — الأساس")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Before setting a single goal, you must answer one question: Who am I becoming? Not what do I want to achieve. Not what should I accomplish. Who am I becoming? This question is the foundation of the entire framework because it determines which goals are worth pursuing and which are distractions. An identity statement is not a wish — it is a declaration. 'I am becoming a person who creates meaningful work.' 'I am becoming a leader who empowers others.' 'I am becoming someone who lives with intention and purpose.' These statements do not describe where you are — they describe where you are heading. And they make certain goals obviously aligned and others obviously irrelevant.",
                "قبل وضع هدف واحد، يجب أن تجيب على سؤال واحد: من أصبح؟ ليس ماذا أريد أن أحقق. ليس ماذا يجب أن أنجز. من أصبح؟ هذا السؤال هو أساس الإطار بأكمله لأنه يحدد أي الأهداف تستحق السعي وأيها مشتتات. بيان الهوية ليس أمنية — إنه إعلان. 'أنا أصبح شخصاً يخلق عملاً ذا معنى.' 'أنا أصبح قائداً يمكّن الآخرين.' 'أنا أصبح شخصاً يعيش بقصد وغرض.' هذه البيانات لا تصف أين أنت — إنها تصف إلى أين أنت متجه. وتجعل أهدافاً معينة متوافقة بوضوح وأخرى غير ذات صلة بوضوح."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Layer 2: Values — The Compass", "الطبقة ٢: القيم — البوصلة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Your identity is expressed through your values. If your identity is 'I am becoming a creator,' your values might include craftsmanship, originality, and impact. If your identity is 'I am becoming a leader,' your values might include service, courage, and integrity. These values become the compass that guides goal selection. A goal that serves your values is worth pursuing. A goal that conflicts with your values, no matter how SMART, is a distraction dressed as ambition.",
                "هويتك تُعبَّر عنها من خلال قيمك. إذا كانت هويتك 'أنا أصبح صانعاً'، فقد تتضمن قيمك الحرفية والأصالة والتأثير. إذا كانت هويتك 'أنا أصبح قائداً'، فقد تتضمن قيمك الخدمة والشجاعة والنزاهة. هذه القيم تصبح البوصلة التي توجه اختيار الأهداف. هدف يخدم قيمك يستحق السعي. هدف يتعارض مع قيمك، مهما كان ذكياً، هو مشتت متنكر كطموح."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This is where most goal-setting frameworks fail: they never ask whether the goal is worth pursuing. They assume that any clearly defined, measurable goal is valid. But a goal that is not grounded in your values is an obligation, not an aspiration. And obligations generate resistance, while aspirations generate momentum. The difference in energy is enormous. A goal aligned with your values pulls you forward. A goal disconnected from your values must be pushed.",
                "هنا تفشل معظم أطر تحديد الأهداف: إنها لا تسأل أبداً عما إذا كان الهدف يستحق السعي. إنها تفترض أن أي هدف محدد بوضوح وقابل للقياس هو صالح. لكن هدفاً غير متجذر في قيمك هو التزام، لا تطلع. والالتزامات تولد مقاومة، بينما التطلعات تولد زخماً. الفرق في الطاقة هائل. هدف متوافق مع قيمك يجذبك للأمام. هدف منفصل عن قيمك يجب أن يُدفع."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Layer 3: Direction — The Path", "الطبقة ٣: الاتجاه — المسار")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Traditional goal setting picks a specific destination: lose 20 pounds, make $100,000, write a book. Identity-aligned goal setting chooses a direction: become someone who honors their physical health, become someone who creates value, become someone who communicates ideas effectively. The difference is critical. A destination can be reached and then abandoned — you lose the weight and gain it back, you hit the revenue target and then coast. A direction is perpetual — there is always further to travel, more to become. This makes identity-aligned goals inherently sustainable because they are not about arriving — they are about traveling. And traveling in the right direction is always more valuable than arriving at the wrong destination.",
                "تحديد الأهداف التقليدي يختار وجهة محددة: خسر 20 رطلاً، حقق 100,000 دولار، اكتب كتاباً. تحديد الأهداف المتوافق مع الهوية يختار اتجاهاً: أصبح شخصاً يحترم صحته الجسدية، أصبح شخصاً يخلق قيمة، أصبح شخصاً يتواصل الأفكار بفعالية. الفرق حاسم. الوجهة يمكن الوصول إليها ثم التخلي عنها — تخسر الوزن وتستعيده، تصل لهدف الإيرادات ثم تتراخى. الاتجاه دائم — هناك دائماً أبعد للسفر، أكثر لتصبح. هذا يجعل الأهداف المتوافقة مع الهوية مستدامة بطبيعتها لأنها ليست عن الوصول — إنها عن السفر. والسفر في الاتجاه الصحيح دائماً أكثر قيمة من الوصول إلى الوجهة الخاطئة."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Layer 4: Milestones — The Markers", "الطبقة ٤: المعالم — العلامات")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "While direction is more important than destination, the brain still needs markers to track progress. Milestones are not goals in the traditional sense — they are identity evidence points. Each milestone is a moment where you can look back and say: I am closer to who I am becoming than I was before. The key distinction: traditional goals measure outcomes. Milestones measure identity alignment. A traditional goal says 'Run a 5K in under 25 minutes.' An identity milestone says 'Complete a training program as a runner would.' The first measures speed. The second measures identity consistency. Speed fluctuates. Identity consistency compounds.",
                "بينما الاتجاه أهم من الوجهة، الدماغ لا يزال يحتاج علامات لتتبع التقدم. المعالم ليست أهدافاً بالمعنى التقليدي — إنها نقاط أدلة هوية. كل معلم هو لحظة يمكنك فيها النظر للخلف وقول: أنا أقرب لمن أصبح مما كنت عليه من قبل. التمييز الأساسي: الأهداف التقليدية تقيس النتائج. المعالم تقيس محاذاة الهوية. الهدف التقليدي يقول 'اركض 5 كيلومترات في أقل من 25 دقيقة.' معلم الهوية يقول 'أكمل برنامج تدريب كما سيفعل عداء.' الأول يقيس السرعة. الثاني يقيس اتساق الهوية. السرعة تتأرجح. اتساق الهوية يتضاعف."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Layer 5: Actions — The Daily Practice", "الطبقة ٥: الأفعال — الممارسة اليومية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This is where identity-aligned goals become practical. Each day, you ask one question: What would the person I am becoming do today? The answer generates your daily actions — not from a checklist, but from the identity itself. This question automatically prioritizes, filters, and sequences your tasks. It eliminates the need for elaborate planning systems because the identity provides a built-in decision-making framework. When faced with a choice between scrolling social media and working on your project, the question answers itself: the person I am becoming would work on their project. Not because they should — because that is who they are.",
                "هنا تصبح الأهداف المتوافقة مع الهوية عملية. كل يوم، تسأل سؤالاً واحداً: ماذا سيفعل الشخص الذي أصبح اليوم؟ الإجابة تولد أفعالك اليومية — ليس من قائمة مرجعية، بل من الهوية نفسها. هذا السؤال يعطي الأولوية تلقائياً، ويصفي، ويرتب مهامك. إنه يلغي الحاجة لأنظمة تخطيط معقدة لأن الهوية توفر إطار اتخاذ قرارات مدمج. عند مواجهة خيار بين تصفح وسائل التواصل الاجتماعي والعمل على مشروعك، السؤال يجيب على نفسه: الشخص الذي أصبح سيعمل على مشروعه. ليس لأنه يجب عليه — لأن هذا من هو."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">
                {getText("The Identity Goal Template", "قالب هدف الهوية")}
              </h3>
              <div className="space-y-4 text-slate-600">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 font-semibold text-primary min-w-[100px]">{getText("Identity:", "الهوية:")}</span>
                  <span>{getText("I am becoming [who]", "أنا أصبح [من]")}</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 font-semibold text-primary min-w-[100px]">{getText("Values:", "القيم:")}</span>
                  <span>{getText("This identity serves [what matters]", "هذه الهوية تخدم [ما يهم]")}</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 font-semibold text-primary min-w-[100px]">{getText("Direction:", "الاتجاه:")}</span>
                  <span>{getText("I am moving toward [what kind of life]", "أنا أتحرك نحو [أي نوع حياة]")}</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 font-semibold text-primary min-w-[100px]">{getText("Milestone:", "المعلم:")}</span>
                  <span>{getText("Evidence that I am becoming this person: [what measurable sign]", "دليل أنني أصبح هذا الشخص: [أي علامة قابلة للقياس]")}</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 font-semibold text-primary min-w-[100px]">{getText("Today's Action:", "فعل اليوم:")}</span>
                  <span>{getText("What would this person do today? [specific action]", "ماذا سيفعل هذا الشخص اليوم؟ [فعل محدد]")}</span>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Example: Traditional vs. Identity-Aligned Goals", "مثال: الأهداف التقليدية مقابل المتوافقة مع الهوية")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <Card className="border-0 shadow-sm bg-red-50/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-3">{getText("Traditional SMART Goal", "هدف SMART تقليدي")}</h3>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>{getText("'Lose 15 pounds by June'", "'أخسر 15 رطلاً بحلول يونيو'")}</li>
                    <li>{getText("Specific: Lose 15 pounds", "محدد: أخسر 15 رطلاً")}</li>
                    <li>{getText("Measurable: Scale weight", "قابل للقياس: وزن الميزان")}</li>
                    <li>{getText("Achievable: Yes, with diet", "قابل للتحقيق: نعم، مع حمية")}</li>
                    <li>{getText("Relevant: Want to be healthier", "ذو صلة: أريد أن أكون أصح")}</li>
                    <li>{getText("Time-bound: By June", "محدد بوقت: بحلول يونيو")}</li>
                    <li className="font-semibold text-red-600 pt-2">{getText("Problem: When June passes, what then?", "المشكلة: عندما يمر يونيو، ماذا بعد؟")}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm bg-emerald-50/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-3">{getText("Identity-Aligned Goal", "هدف متوافق مع الهوية")}</h3>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>{getText("Identity: I am becoming an athlete", "الهوية: أنا أصبح رياضياً")}</li>
                    <li>{getText("Values: Vitality, strength, longevity", "القيم: الحيوية، القوة، طول العمر")}</li>
                    <li>{getText("Direction: Honoring my body daily", "الاتجاه: احترام جسدي يومياً")}</li>
                    <li>{getText("Milestone: Complete a training program", "المعلم: إكمال برنامج تدريب")}</li>
                    <li>{getText("Today: Move my body for 20 minutes", "اليوم: أحرك جسدي لـ 20 دقيقة")}</li>
                    <li className="font-semibold text-emerald-600 pt-2">{getText("Result: Direction never expires", "النتيجة: الاتجاه لا ينتهي صلاحيته أبداً")}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Identity Goal Audit", "تدقيق هدف الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Before committing to any goal, run it through the Identity Goal Audit. Five questions that determine whether a goal is worth your time and energy:",
                "قبل الالتزام بأي هدف، مرره عبر تدقيق هدف الهوية. خمسة أسئلة تحدد ما إذا كان الهدف يستحق وقتك وطاقتك:"
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <ol className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span>{getText("Does this goal align with who I am becoming? If the answer is no, the goal is a distraction — no matter how impressive it sounds.", "هل هذا الهدف متوافق مع من أصبح؟ إذا كانت الإجابة لا، الهدف مشتت — مهما بدا مثيراً للإعجاب.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span>{getText("Does this goal serve my core values? A goal that contradicts your values will generate internal resistance that no amount of willpower can overcome.", "هل هذا الهدف يخدم قيمي الأساسية؟ هدف يتعارض مع قيمك سيولد مقاومة داخلية لا يمكن لأي قدر من الإرادة التغلب عليها.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span>{getText("Is this a direction or a destination? Destinations end. Directions continue. Prefer goals that create perpetual growth over goals that have a finish line.", "هل هذا اتجاه أم وجهة؟ الوجهات تنتهي. الاتجاهات تستمر. فضل الأهداف التي تخلق نمواً دائماً على الأهداف التي لها خط نهاية.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span>{getText("What identity evidence will this goal produce? If achieving the goal does not provide evidence for your desired identity, the goal is misaligned.", "ما أدلة الهوية التي سينتجها هذا الهدف؟ إذا كان تحقيق الهدف لا يوفر أدلة لهويتك المطلوبة، الهدف غير متوافق.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">5</span>
                  <span>{getText("What would the person I am becoming do today? If you cannot answer this with a specific, actionable step, the goal is too abstract to execute.", "ماذا سيفعل الشخص الذي أصبح اليوم؟ إذا لم تستطع الإجابة بخطوة محدلة وقابلة للتنفيذ، الهدف مجرد جداً للتنفيذ.")}</span>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Speed as Strategy: Executing on Identity Goals", "السرعة كاستراتيجية: التنفيذ على أهداف الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "One of the most powerful aspects of identity-aligned goals is that they accelerate execution. When a goal flows from identity, the gap between intention and action collapses. You do not need to deliberate, motivate, or will yourself into action — you act because the action is an expression of who you are. This is speed as strategy: not moving fast for the sake of speed, but moving fast because the identity demands it. The person you are becoming would not wait until Monday. They would not need a perfect plan. They would start now, with what they have, and adjust along the way. Identity creates urgency without anxiety and momentum without force.",
                "أحد أقوى جوانب الأهداف المتوافقة مع الهوية أنها تسرّع التنفيذ. عندما يتدفق الهدف من الهوية، تنهار الفجوة بين النية والفعل. لا تحتاج للتداول، أو التحفيز، أو إرادة نفسك للفعل — أنت تتصرف لأن الفعل تعبير عن من أنت. هذه هي السرعة كاستراتيجية: ليس التحرك بسرعة لغرض السرعة، بل التحرك بسرعة لأن الهوية تتطلب ذلك. الشخص الذي تصبح لن ينتظر حتى الاثنين. لن يحتاج خطة مثالية. سيبدأ الآن، بما لديه، ويعدّل على الطريق. الهوية تخلق الإلحاح بدون قلق والزخم بدون قوة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This connects directly to our philosophy of speed as strategy. The gap between idea and reality is where power lives. When your goals are identity-aligned, you close that gap faster — not because you are rushing, but because there is no internal friction to slow you down. The goal and the identity are moving in the same direction, and that alignment eliminates the resistance that kills most goals before they begin.",
                "هذا يتصل مباشرة بفلسفتنا عن السرعة كاستراتيجية. الفجوة بين الفكرة والواقع هي حيث تعيش القوة. عندما تكون أهدافك متوافقة مع الهوية، تغلق تلك الفجوة أسرع — ليس لأنك تستعجل، بل لأنه لا يوجد احتكاك داخلي لإبطائك. الهدف والهوية يتحركان في نفس الاتجاه، وهذا التوافق يزيل المقاومة التي تقتل معظم الأهداف قبل أن تبدأ."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">{getText("The Bottom Line", "الخلاصة")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Goals that work are not SMART — they are identity-aligned. They do not start with what you want to achieve; they start with who you are becoming. They are not destinations you race toward; they are directions you travel along. They are not obligations you force yourself to pursue; they are expressions of who you are. When you align your goals with your identity, the entire goal-setting process transforms. The resistance disappears. The motivation becomes intrinsic. The execution accelerates. And the results compound — not because you are working harder, but because you are working from a place of alignment rather than conflict. Build the identity first. Let the goals emerge. Execute with the speed of someone who already knows who they are becoming.",
                "الأهداف التي تعمل ليست ذكية — إنها متوافقة مع الهوية. إنها لا تبدأ بما تريد تحقيقه؛ إنها تبدأ بمن تصبح. إنها ليست وجهات تسابق نحوها؛ إنها اتجاهات تسافر عليها. إنها ليست التزامات تجبر نفسك على السعي وراءها؛ إنها تعبيرات عن من أنت. عندما تحاذي أهدافك مع هويتك، تتحول عملية تحديد الأهداف بالكامل. المقاومة تختفي. التحفيز يصبح ذاتياً. التنفيذ يتسارع. والنتائج تتضاعف — ليس لأنك تعمل بجهد أكبر، بل لأنك تعمل من مكان توافق بدلاً من صراع. ابنِ الهوية أولاً. دع الأهداف تنبثق. نفّذ بسرعة شخص يعرف بالفعل من يصبح."
              )}
            </p>

          </div>
        </div>
      </section>

      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />

      <ArticleNavigation currentSlug="goal-setting-framework" />

      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {getText("Set Goals Aligned With Your Identity", "ضع أهدافاً متوافقة مع هويتك")}
            </h2>
            <p className="text-slate-300 mb-6">
              {getText("The Goal System and Planner help you design identity-aligned goals and execute on them with speed and clarity.", "نظام الأهداف والمخطط يساعدانك على تصميم أهداف متوافقة مع الهوية وتنفيذها بسرعة ووضوح.")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apps/goal-system">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  {getText("Try the Goal System", "جرب نظام الأهداف")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/blog/speed-as-strategy">
                <Button variant="white" size="lg" className="px-8 font-semibold">
                  {getText("Read: Speed as Strategy", "اقرأ: السرعة كاستراتيجية")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
            <BlogConversionSection />
      </article>
    </>
  );
}
