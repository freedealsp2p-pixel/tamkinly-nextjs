'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Shield, Compass, Waves, BarChart3, HeartHandshake, CalendarDays, Phone } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';
import { BlogArticleJsonLd } from "@/components/seo/JsonLd";

export default function PornRecoveryRoadmapArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "dopamine-reset", title: getText("Dopamine Reset: Reclaiming Your Attention in a Hyperstimulating World", "إعادة ضبط الدوبامين: استعد انتباهك في عالم مفرط التحفيز"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "physics-of-momentum", title: getText("The Physics of Momentum: Why 18 Minutes Changes Everything", "فيزياء الزخم: لماذا تغيّر ١٨ دقيقة كل شيء"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "how-to-build-habits-that-stick", title: getText("How to Build Habits That Stick: The Science of Lasting Change", "كيف تبني عادات تدوم: علم التغيير المستدام"), readTime: getText("10 min read", "١٠ دقائق قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
      headline="The Complete Porn Recovery Roadmap: 5 Stages That Actually Work"
      headlineAr="خارطة التعافي من الإباحية: خمس مراحل فعّالة فعلاً"
      description="A free, science-based recovery roadmap: understand the compulsion cycle, build recovery systems, handle urges with urge surfing, read relapse as data, and rebuild identity after addiction."
      slug="porn-recovery-roadmap"
      datePublished="2026-09-16"
      dateModified="2026-09-16"
      author="Tamkinly Team"
      keywords={ ["porn addiction recovery", "porn recovery roadmap", "urge surfing", "relapse prevention", "compulsion cycle", "recovery stages", "how to quit porn"] }
    />
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Recovery", "التعافي")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The Complete Porn Recovery Roadmap: 5 Stages That Actually Work", "خارطة التعافي من الإباحية: خمس مراحل فعّالة فعلاً")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("12 min read", "١٢ دقيقة قراءة")}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {getText("Tamkinly Team", "فريق تمكينلي")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              {getText(
                "If you have tried to quit a hundred times and failed a hundred times, the problem is not that you are broken. The problem is that you have been given advice built on willpower, willpower, and more willpower — and willpower was never designed to do this job alone. Recovery is not a test of character. It is a set of skills and systems that anyone can learn, one stage at a time. This roadmap gives you those stages in order.",
                "إن جربت التوقف مئة مرة وفشلت مئة مرة، فالمشكلة ليست أنك تالف. المشكلة أنك تلقّت نصائح مبنية على الإرادة والإرادة ثم الإرادة — والإرادة لم تُصمّم يوماً لتقوم بهذه المهمة وحدها. التعافي ليس اختباراً للشخصية؛ إنه مجموعة مهارات وأنظمة يستطيع أي إنسان تعلّمها، مرحلة بعد مرحلة. هذه الخارطة تمنحك المراحل بالترتيب الصحيح."
              )}
            </p>

            <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
              {getText(
                "This guide is educational and free. It is not a replacement for professional care — if compulsive sexual behavior is severely affecting your life, working with a qualified therapist is a sign of strength, not failure. Tamkinly's recovery journeys are a free companion to that care, not a substitute for it.",
                "هذا الدليل تثقيفي ومجاني، ولا يغني عن الرعاية المتخصصة — إذا كان السلوك الجنسي القهري يؤثر بحدة في حياتك، فالعمل مع معالج مؤهل علامة قوة لا علامة فشل. رحلات التعافي في تمكينلي رفيقة مجانية لتلك الرعاية، لا بديلاً عنها."
              )}
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The structure below mirrors the five-stage journey inside Tamkinly's free Recovery Center: understand the pattern, build recovery systems, handle urges, read relapse correctly, and rebuild identity. You can read this article in one sitting and start today, or walk stage by stage inside the interactive journey — everything referenced here is free, with no account required.",
                "تعكس البنية أدناه الرحلة خماسية المراحل داخل مركز التعافي المجاني في تمكينلي: افهم النمط، ابنِ أنظمة التعافي، تعامل مع الرغبات، اقرأ الانتكاس قراءة صحيحة، ثم أعد بناء الهوية. يمكنك قراءة هذا المقال بجلسة واحدة والبدء اليوم، أو السير مرحلةً بمرحلة داخل الرحلة التفاعلية — كل ما نُشير إليه هنا مجاني ولا يتطلب حساباً."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why Willpower Alone Fails: The Compulsion Cycle", "لماذا تفشل الإرادة وحدها: دورة الإدمان القهري")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Compulsive pornography use is not primarily a moral weakness; it behaves like a learned loop that the brain runs automatically. Modern clinical frameworks — including Compulsive Sexual Behaviour Disorder in the ICD-11 — describe it as a pattern in which repetitive sexual imagery becomes a way to regulate feelings, despite real harm. Researchers studying internet pornography addiction point to the same machinery seen in other compulsive behaviors: cues trigger craving, craving narrows attention, and the behavior delivers a fast hit of relief that the brain remembers and predicts.",
                "الاستخدام القهري للإباحية ليس ضعفاً أخلاقياً بالدرجة الأولى؛ إنه يتصرف كحلقة متعلَّمة يعمل بها الدماغ تلقائياً. تصف الأطر السريرية الحديثة — ومنها اضطراب السلوك الجنسي القهري في التصنيف الدولي ICD-11 — النمط بأنه تحوّل الصور الجنسية المتكررة إلى وسيلة لتنظيم المشاعر رغم الضرر الواضح. ويشير باحثون يدرسون إدمان الإباحية عبر الإنترنت إلى الآلية نفسها الموجودة في السلوكيات القهرية الأخرى: الإشارات تستفز الشغف، والشغف يضيّق الانتباه، ثم يقدّم السلوك جرعة سريعة من الارتياح يحفظها الدماغ ويتوقعها."
              )}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This is why the 'just stop' strategy collapses under stress. Each trip around the loop deepens the track it runs on, and willpower is a limited resource that gets weakest exactly when the loop is strongest — late at night, alone, tired, or emotionally raw. Breaking the loop therefore has nothing to do with trying harder and everything to do with seeing the loop clearly, redesigning the environment it lives in, and rehearsing a different response at the exact moment the loop activates.",
                "لهذا ينهار أسلوب «فقط توقف» تحت الضغط. كل دورة كاملة حول الحلقة تعمّق المسار الذي تسير عليه، والإرادة مورد محدود يضعف تماماً حين تكون الحلقة أقوى ما تكون — في وقت متأخر من الليل، أو في الوحدة، أو مع التعب، أو حين تكون المشاعر مجروحة. كسر الحلقة لا علاقة له بمحاولة أشد، بل برؤية الحلقة بوضوح، وإعادة تصميم البيئة التي تعيش فيها، والتدرّب على استجابة مختلفة في اللحظة التي تتفعّل فيها الحلقة بالضبط."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Stage 1 — Understand the Pattern", "المرحلة الأولى — افهم النمط")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Every compulsive loop has the same skeleton: a trigger (a thought, feeling, time, or place), a ritual (the small preparatory actions that make the behavior almost inevitable), the behavior itself, a wave of short-lived relief, and then shame — which quietly becomes the next day's trigger. You cannot interrupt a pattern you cannot see, so the first stage of recovery is pure observation: for one week, without trying to be perfect, write down when the pull appears, what happened just before it, and what you felt.",
                "لكل حلقة قهرية هيكل واحد: مُحفّز (فكرة أو شعور أو وقت أو مكان)، وطقس (الأفعال التحضيرية الصغيرة التي تجعل السلوك شبه محتوم)، ثم السلوك نفسه، فموجة ارتياح قصيرة، ثم الخجل — الذي يصبح بهدوء مُحفّز اليوم التالي. لا يمكنك قطع نمط لا تراه، لذلك فالمرحلة الأولى من التعافي ملاحظة صرفة: خلال أسبوع، دون محاولة الكمال، دوّن متى يظهر السحب نحو السلوك، وما حدث قبله مباشرة، وما شعرت به."
              )}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Most people discover the same three insights within days: their worst moments follow a predictable time and place, the trigger is almost always an uncomfortable emotion (stress, boredom, loneliness, exhaustion) rather than desire itself, and their 'failed attempts' were not random — they followed the same script every time. That reframe matters enormously. A failed attempt is a status report about which part of your system needs reinforcement, not a verdict on who you are. Recovery begins the moment you stop asking 'what is wrong with me?' and start asking 'where exactly does my loop break open?'",
                "يكتشف معظم الناس الرؤى الثلاث نفسها خلال أيام: أسوأ لحظاتهم تأتي في وقت ومكان يمكن التنبؤ بهما، والمحفّز الحقيقي شبه دائمٍ شعورٌ غير مريح (توتر أو ملل أو وحدة أو إجهاد) لا الرغبة ذاتها، و«محاولاتهم الفاشلة» لم تكن عشوائية — بل سرت على السيناريو نفسه كل مرة. هذه إعادة تأطير بالغة الأهمية: المحاولة الفاشلة تقرير حالة يخبرك أي جزء من نظامك يحتاج تعزيزاً، وليست حكماً على هويتك. يبدأ التعافي من اللحظة التي تترك فيها سؤال «ما خطئي أنا؟» وتبدأ سؤال «أين تنكسر حلقتي تحديداً؟»"
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Stage 2 — Build Recovery Systems", "المرحلة الثانية — ابنِ أنظمة التعافي")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The second stage moves the battle from willpower to design. People who recover long-term do not resist temptation better than people who relapse — they face temptation less often, because their environment no longer hands it to them. Systems beat goals: a goal says 'I will stop', a system says 'the path I used to take no longer exists.' Research on habit formation shows that context cues power automatic behavior, which is exactly why you change the context first.",
                "المرحلة الثانية تنقل المعركة من الإرادة إلى التصميم. الناس الذين يتعافون طويل الأمد لا يقاومون الإغراء أفضل من الناس الذين ينتكسون — بل يواجهون الإغراء أقل، لأن بيئتهم لم تعد تقدمه لهم. الأنظمة تتفوق على النوايا: النية تقول «سأتوقف»، أما النظام فيقول «الطريق الذي كنت أسلكه لم يعد موجوداً». تُظهر أبحاث تكوين العادات أن إشارات السياق تدير السلوك التلقائي، ولهذا بالضبط تغيّر السياق أولاً."
              )}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "A minimum viable system includes four layers: device boundaries (content blockers installed with a partner or friend holding the password, safe-search locked on, phone charging outside the bedroom), time boundaries (the high-risk hours — usually late night — given a replacement routine), energy boundaries (sleep, movement, and real meals, because exhaustion and hunger amplify every craving), and accountability (one honest human who knows your plan). None of these layers requires perfection; together they simply make the old behavior harder to start and easier to survive.",
                "النظام الأدنى الفعّال يتضمن أربع طبقات: حدود الأجهزة (حاجبات محتوى مثبتة بكلمة سر يحتفظ بها شريك أو صديق، وبحث آمن مقفل، والهاتف يُشحن خارج غرفة النوم)، وحدود الوقت (ساعات الخطر الأعلى — عادة آخر الليل — تُمنح لروتين بديل)، وحدود الطاقة (نوم وحركة ووجبات حقيقية، لأن الإنهاك والجوع يضاعفان كل رغبة)، ثم المساءلة (إنسان واحد صادق يعرف خطتك). لا تطلب أي طبقة من هذه الطبقات الكمال؛ لكنها مجتمعة تجعل السلوك القديم أصعب في البدء وأسهل في النجاة منه."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Stage 3 — Handle Urges: The 10-Minute Window", "المرحلة الثالثة — تعامل مع الرغبات: نافذة العشر دقائق")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Here is the most encouraging discovery in the science of craving: an urge is a wave, not a wall. It rises, it peaks, and — if you do not feed it — it falls, usually within minutes. In a well-known study, researcher Sarah Bowen and Alan Marlatt taught people to 'surf the urge': observe the craving with curiosity, breathe through it, and let it pass without acting. Participants who surfed the wave did not necessarily eliminate cravings — they simply stopped obeying them. The skill is not suppression; it is observation without obedience.",
                "إليك أكثر الاكتشافات تشجيعاً في علم الشغف: الرغبة موجةٌ لا جدار. تنهض، وتبلغ ذروتها، ثم — إن لم تُطعمها — تتراجع، عادة خلال دقائق. في دراسة معروفة درّب الباحثة سارة بوين وآلان مارلات الأشخاص على «ركوب الموجة»: أن تراقب الشغف بفضول، وتتنفس عبره، وتتركه يمر دون أن تفعل. المشاركون الذين ركبوا الموجة لم يلغوا الرغبات بالضرورة — بل توقفوا عن طاعتها ببساطة. المهارة ليست الكبت؛ إنها الملاحظة دون طاعة."
              )}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Practically, when an urge hits, you do three things. First, name it out loud or on paper: 'urge' — naming moves activity from the alarm centers of the brain toward the observing mind. Second, set a timer for ten minutes and commit only to the timer, not to forever; forever is overwhelming, ten minutes is survivable. Third, move: cold water on the face, a brisk walk around the block, twenty push-ups — any physical state-change that helps the wave break. Check the free urge-surfing tool in Tamkinly's recovery journey: it walks you through this window step by step, in the moment.",
                "عملياً، حين تضرب الرغبة تفعل ثلاثة أشياء. أولاً، تسمّيها بصوت عالٍ أو على الورق: «رغبة» — التسمية تنشط العقل الملاحِظ بدل مراكز الإنذار في الدماغ. ثانياً، تضبط مؤقتاً لعشر دقائق وتلتزم بالمؤقت فقط، لا بالأبد؛ «الأبد» خانقة، أما عشر دقائق فقابلة للنجاة. ثالثاً، تتحرك: ماء بارد على الوجه، أو مشية سريعة حول البناية، أو عشرون تمريناً ضغطاً — أي تغيير جسدي يساعد الموجة على الانكسار. جرّب أداة ركوب الموجة المجانية في رحلة التعافي: تمشي معك خطوة خطوة داخل هذه النافذة، في اللحظة نفسها."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Stage 4 — Read Relapse Correctly", "المرحلة الرابعة — اقرأ الانتكاس قراءة صحيحة")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Relapse research has a name for the trap that turns one slip into a full collapse: the Abstinence Violation Effect. It works like this — you slip once, you conclude 'I've ruined everything, I'm hopeless after all', shame floods in, and the emotional pain of the shame drives the next episode. The slip was survivable; the story you told about the slip was not. This is why relapse management is a core recovery skill, not an embarrassment to hide.",
                "لأبحاث الانتكاس اسمٌ لفخّ يحوّل الزلة الواحدة إلى انهيار كامل: أثر انتهاك الامتناع. يعمل هكذا — تنزلق مرة، فتستنتج «دمّرت كل شيء، أنا ميؤوس منها أصولاً»، فيغمر الخجل كل شيء، ثم يقود الألم النفسي للخجل إلى الحلقة التالية. الزلة كانت قابلة للنجاة؛ أما القصة التي روتها عن الزلة فلم تكن كذلك. لهذا تُعدّ إدارة الانتكاس مهارة تعافٍ أساسية، لا مسألة تستحق الإخفاء."
              )}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "After any slip, run the same three questions every time: What was the trigger? Which system layer failed (device, time, energy, or accountability)? And what single adjustment prevents this exact path next time? Then — and this is the part almost everyone gets wrong — you continue from day one of the count without restarting your skills. Weeks of built systems do not evaporate because of one slip; treating them as if they did is precisely how one bad night becomes a bad month.",
                "بعد أي زلة، أجب عن الأسئلة الثلاثة نفسها في كل مرة: ما المحفّز؟ أي طبقة من نظامك انهارت (الأجهزة، الوقت، الطاقة، أم المساءلة)؟ وأي تعديل واحد يغلق هذا الطريق تحديداً في المرة القادمة؟ ثم — وهنا الخطأ الذي يرتكبه الجميع تقريباً — تُكمل العدّ من اليوم الأول دون إعادة تعلّم المهارات من الصفر. أسابيع من الأنظمة المبنية لا تتبخر بسبب زلة واحدة؛ ومعاملتها كأنها تتبخر هو بالضبط ما يحوّل ليلة سيئة إلى شهر سيئ."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Stage 5 — Rebuild Identity: The Real Finish Line", "المرحلة الخامسة — أعد بناء الهوية: خط النهاية الحقيقي")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The final stage is the one most advice skips entirely: you cannot just remove a behavior, you have to replace the identity it was serving. Compulsive use often fills real needs — escape, comfort, a feeling of control after a stressful day. Recovery holds when those needs find new answers. James Clear's formulation is useful here: every action you take is a vote for the type of person you wish to become. Two votes cast with conviction — a workout, an honest conversation, a journal page — begin building a self-image that no longer needs the old escape.",
                "المرحلة الأخيرة هي التي يتجاهلها معظم النصائح كلياً: لا يمكنك إزالة سلوك فحسب، بل عليك أن تستبدل الهوية التي كان يخدمها. الاستخدام القهري يملأ غالباً احتياجات حقيقية — هروب، أو ارتياح، أو إحساس بالسيطرة بعد يوم عصيب. ويستقر التعافي حين تجد تلك الاحتياجات أجوبة جديدة. صياغة جيمس كلير مفيدة هنا: كل فعل تقوم به صوتٌ انتخابي لنوع الشخص الذي تريد أن تصبح. صوتان مصوّبَان بإيمان — تمرين، أو حوار صادق، أو صفحة دفتر — يبدآن ببناء صورة ذات لم تعد تحتاج الهروب القديم."
              )}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Two tools accelerate this stage. The first is a future-self letter: write, in present tense, who you are one year from now — how your evenings look, how you handle stress, what your closest relationship feels like. Read it weekly. The second is a values check: pornography use survives longest in lives with a vacuum, and it starves in lives crowded with meaning — work you respect, people you love, a body you care for. When the fifth stage is done honestly, staying free stops feeling like resisting temptation and starts feeling like protecting something you built.",
                "أداتان تسرّعان هذه المرحلة. الأولى رسالة نفسك المستقبلية: اكتب، بصيغة الحاضر، من أنت بعد سنة — كيف تبدو أمسياتك، وكيف تتعامل مع التوتر، وكيف يبدو أقرب علاقة لك. اقرأها أسبوعياً. والثانية فحص القيم: الاستخدام القهري يبقى أطول عمراً في الحياة الفارغة، ويتضور جوعاً في الحياة المزدحمة بالمعنى — عملٍ تحترمه، وبشر تحبهم، وجسدٍ تعتنى به. حين تُنجز المرحلة الخامسة بصدق، يتوقف البقاء حراً عن كونه مقاومةً للإغراء، ويصبح حمايةً لشيء بنته بنفسك."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("How Long Does Recovery Actually Take?", "كم يستغرق التعافي فعلاً؟")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The honest answer: longer than two weeks and shorter than despair. Habit research by Phillippa Lally and colleagues found new habits take anywhere from 18 to 254 days to become automatic, averaging around 66 — and rewiring a behavior that served emotional regulation takes patience with that variance. Expect a curve, not a line: early weeks feel raw, momentum builds quietly, slips cluster around stress, and the gaps between them stretch until the old behavior feels foreign rather than magnetic. The roadmap above is designed for that curve — each stage you complete makes the next one easier, and no single bad day reverses the stages you have already earned.",
                "الجواب الصادق: أطول من أسبوعين وأقصر من اليأس. وجدت أبحاث العادات لبفيليبا لالي وزملائها أن العادات الجديدة تحتاج من ١٨ إلى ٢٥٤ يوماً لتصبح تلقائية، بمتوسط ٦٦ يوماً تقريباً — وإعادة توصيف سلوك كان يخدم تنظيم المشاعر تحتاج صبراً على هذا التباين. توقَّع منحنى لا خطاً مستقيماً: الأسابيع الأولى خام، والزخم يتكوّن بهدوء، والزلات تتجمع حول الضغوط، وتتوارت الفواصل بينها حتى يصبح السلوك القديم غريباً بدل أن يكون مغناطيسياً. خارطة الطريق أعلاه مصمّمة لهذا المنحنى — كل مرحلة تُتمّها تجعل التي بعدها أسهل، ولا يوم سيئ واحد يُلغي المراحل التي اكتسبتها بالفعل."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("When to Seek Professional Help", "متى تطلب مساعدة متخصصة؟")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Self-guided recovery works for many people, and free tools exist precisely because cost should never be the barrier. But some signs deserve professional attention: use that continues despite serious consequences (relationship breakdown, job risk, legal trouble), a co-occurring struggle like depression, anxiety, or past trauma, escalation toward riskier content, or repeated collapse of every system you build. Asking for help in those situations is not a setback — it is the same skill you have been practicing all along: refusing to face an overwhelming wave alone.",
                "التعافي الذاتي ينفع مع كثير من الناس، والأدوات المجانية موجودة أساساً لأن التكلفة ألا تكون هي الحاجب. لكن ثمة علامات تستحق انتباهاً متخصصاً: استخدامٌ مستمر رغم عواقب جسيمة (انهيار علاقة، خطر وظيفي، مشكلة قانونية)، أو معاناة مصاحبة كالاكتئاب أو القلق أو صدمة سابقة، أو تصعيد نحو محتوى أخطر، أو انهيار متكرر لكل نظام تبنيه. طلب المساعدة في هذه الحالات ليس تراجعاً — إنه المهارة نفسها التي تدرّبت عليها طوال الطريق: رفض مواجهة موجة خانقة وحدك."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Your First Week: A 7-Day Micro-Plan", "أسبوعك الأول: خطة مصغّرة من سبعة أيام")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Do not start with a perfect life; start with one honest week. Day 1: observe and log — no promises to be perfect, just data. Day 2: install device boundaries and move the phone out of the bedroom. Day 3: map your cycle — the trigger, the ritual, the moment of choice. Day 4: rehearse urge surfing once, deliberately, even with a mild urge. Day 5: fix the energy layer — a real bedtime and one walk. Day 6: tell one trusted human about the plan. Day 7: write the future-self letter and read it. Seven small votes. By the end of the week you will not be a finished person — you will be someone with a system, which is exactly what this roadmap promises.",
                "لا تبدأ بحياة مثالية؛ ابدأ بأسبوع صادق واحد. اليوم ١: ملاحظة وتدوين — لا وعود بالكمال، بيانات فقط. اليوم ٢: ثبّت حدود الأجهزة وانقل الهاتف خارج غرفة النوم. اليوم ٣: ارسم حلقتك — المحفّز، الطقس، لحظة الاختيار. اليوم ٤: تدرّب على ركوب الموجة مرة واحدة، عمداً، حتى برغبة خفيفة. اليوم ٥: أصلح طبقة الطاقة — موعد نوم حقيقي ومشية واحدة. اليوم ٦: أخبر إنساناً واحداً تثق به بالخطة. اليوم ٧: اكتب رسالة نفسك المستقبلية واقرأها. سبعة أصوات صغيرة. بنهاية الأسبوع لن تكون إنساناً مكتمل النجاة — لكنك ستكون إنساناً يملك نظاماً، وهذا بالضبط ما تعده به هذه الخارطة."
              )}
            </p>

            {/* Free Journey CTA */}
            <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                {getText("Ready to walk the journey instead of just reading about it?", "جاهز أن تسير الرحلة بدل أن تقرأ عنها فقط؟")}
              </h3>
              <p className="text-slate-600 mb-4">
                {getText(
                  "Tamkinly's Porn Recovery journey walks you through all five stages with interactive tools: the cycle mapper, urge surfing, the relapse reader, and the identity rebuild. 100% free, no account needed, progress stays private on your device.",
                  "رحلة التعافي من الإباحية في تمكينلي تمشي معك المراحل الخمس بأدوات تفاعلية: محدد الحلقة، ركوب الموجة، قارئ الانتكاس، وإعادة بناء الهوية. مجانية ١٠٠٪، بلا حساب، وتقدّمك يبقى خاصاً على جهازك."
                )}
              </p>
              <Link href="/recovery/porn-recovery">
                <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#1F6F78' }}>
                  {getText("Start the Free Recovery Journey", "ابدأ رحلة التعافي المجانية")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* References */}
      <ArticleReferences slug="porn-recovery-roadmap" />

      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />

      <ArticleNavigation currentSlug="porn-recovery-roadmap" />

      {/* Related Articles */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold text-primary mb-6">{getText("Related Articles", "مقالات ذات صلة")}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <Card className="h-full border-0 shadow-sm bg-white hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-primary text-sm mb-2 line-clamp-2">
                        {article.title}
                      </h4>
                      <span className="text-xs text-slate-500">{article.readTime}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <BlogConversionSection />
    </article>

    </>
  );
}
