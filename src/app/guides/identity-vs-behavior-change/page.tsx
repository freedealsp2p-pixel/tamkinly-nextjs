'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  BookOpen,
  Target,
  Brain,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import { useLocale } from '@/components/providers/LocaleProvider';

export default function IdentityVsBehaviorGuide() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const keyTakeaways = [
    getText("Behavior change without identity change is temporary", "التغيير السلوكي بدون تغيير الهوية مؤقت"),
    getText("Your identity is the operating system; behavior is just the output", "هويتك هي نظام التشغيل؛ السلوك هو مجرد المخرجات"),
    getText("Lasting transformation requires rewriting who you believe you are", "التحول الدائم يتطلب إعادة كتابة من تعتقد أنك"),
    getText("Small identity shifts create massive behavioral cascades", "التحولات الصغيرة في الهوية تخلق تداعيات سلوكية هائلة"),
    getText("You don't rise to your goals — you fall to your systems (and your identity is the system)", "أنت لا ترتقي إلى مستوى أهدافك — بل تنحدر إلى مستوى أنظمتك (وهويتك هي النظام)")
  ];

  const comparisonTable = [
    {
      aspect: getText("Focus", "التركيز"),
      behavior: getText("What you do", "ما تفعله"),
      identity: getText("Who you are", "من أنت")
    },
    {
      aspect: getText("Energy Source", "مصدر الطاقة"),
      behavior: getText("Willpower (depletable)", "الإرادة (قابلة للنفاد)"),
      identity: getText("Automatic (renewable)", "تلقائي (متجدد)")
    },
    {
      aspect: getText("Duration", "المدة"),
      behavior: getText("Temporary (requires maintenance)", "مؤقت (يتطلب صيانة)"),
      identity: getText("Permanent (self-sustaining)", "دائم (ذاتي الاستدامة)")
    },
    {
      aspect: getText("Failure Response", "الاستجابة للفشل"),
      behavior: getText("Guilt, shame, giving up", "الشعور بالذنب، الخجل، الاستسلام"),
      identity: getText("Learning, adjustment, continuation", "التعلم، التعديل، الاستمرار")
    },
    {
      aspect: getText("Example", "مثال"),
      behavior: getText("\"I'm trying to quit smoking\"", "\"أنا أحاول الإقلاع عن التدخين\""),
      identity: getText("\"I'm not a smoker\"", "\"أنا لست مدخنًا\"")
    }
  ];

  const exercises = [
    {
      number: 1,
      title: getText("The Identity Audit", "تدقيق الهوية"),
      time: getText("10 minutes", "10 دقائق"),
      description: getText("Map your current identity across key life domains", "ارسم خريطة هويتك الحالية عبر مجالات الحياة الرئيسية"),
      steps: [
        getText("List 5 areas of your life (health, career, relationships, finances, personal growth)", "اذكر 5 مجالات من حياتك (الصحة، المسيرة المهنية، العلاقات، المالية، النمو الشخصي)"),
        getText("For each area, complete: \"I am the kind of person who...\"", "لكل مجال، أكمل: \"أنا النوع من الأشخاص الذي...\""),
        getText("Notice which identities serve you and which limit you", "لاحظ أي الهويات تخدمك وأيها يحدك"),
        getText("Identify ONE identity you want to transform", "حدد هوية واحدة تريد تحويلها")
      ]
    },
    {
      number: 2,
      title: getText("The Future Self Dialogue", "حوار الذات المستقبلية"),
      time: getText("15 minutes", "15 دقيقة"),
      description: getText("Have a conversation with your future identity", "أجرِ محادثة مع هويتك المستقبلية"),
      steps: [
        getText("Close your eyes and imagine yourself 1 year from now", "أغمض عينيك وتخيل نفسك بعد سنة من الآن"),
        getText("See the version of you who has already achieved your goals", "شاهد النسخة منك التي حققت أهدافك بالفعل"),
        getText("Ask: \"What would [Future You] do in this situation?\"", "اسأل: \"ماذا سيفعل [أنت المستقبلية] في هذا الموقف؟\""),
        getText("Write down 3 things Future You would do differently today", "اكتب 3 أشياء ستفعلها ذاتك المستقبلية بشكل مختلف اليوم")
      ]
    },
    {
      number: 3,
      title: getText("Identity Evidence Log", "سجل أدلة الهوية"),
      time: getText("5 minutes daily", "5 دقائق يوميًا"),
      description: getText("Collect evidence for your new identity", "اجمع الأدلة لهويتك الجديدة"),
      steps: [
        getText("Choose your target identity (e.g., \"I am a healthy person\")", "اختر هويتك المستهدفة (مثلاً: \"أنا شخص صحي\")"),
        getText("Each day, log 3 actions that prove this identity true", "كل يوم، سجل 3 أفعال تثبت هذه الهوية صحيحة"),
        getText("Small actions count: took stairs, chose water, went to bed on time", "الأفعال الصغيرة تحسب: صعد الدرج، اختار الماء، ذهب للنوم في الوقت المحدد"),
        getText("Review weekly to see your identity taking shape", "راجع أسبوعيًا لترى هويتك تتشكل")
      ]
    },
    {
      number: 4,
      title: getText("The Identity Reframe", "إعادة صياغة الهوية"),
      time: getText("5 minutes", "5 دقائق"),
      description: getText("Transform goals into identity statements", "حوّل الأهداف إلى بيانات هوية"),
      steps: [
        getText("Write down a behavior goal (e.g., \"I want to run 3x per week\")", "اكتب هدفًا سلوكيًا (مثلاً: \"أريد الركض 3 مرات أسبوعيًا\")"),
        getText("Reframe it as an identity: \"I am a runner\"", "أعد صياغته ك هوية: \"أنا عداء\""),
        getText("List 5 things a runner would do (even small things)", "اذكر 5 أشياء سيفعلها العداء (حتى الأشياء الصغيرة)"),
        getText("Do ONE of those things today to cast your vote", "افعل واحدًا من تلك الأشياء اليوم لتلقي تصويتك")
      ]
    }
  ];

  return (
    <article className="min-h-screen bg-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link href="/resources" className="inline-flex items-center text-[#3DD4B0] hover:text-white transition-colors text-sm font-medium mb-10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {getText("Back to Resources", "العودة إلى الموارد")}
            </Link>
            {/* Centered Title */}
            <div className="text-center">
              <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/10">
                <BookOpen className="w-3.5 h-3.5 mr-2" />
                {getText("Free Guide", "دليل مجاني")}
              </Badge>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight text-center">
              {getText("Identity vs. Behavior Change: Why Willpower Always Fails", "الهوية مقابل التغيير السلوكي: لماذا تفشل الإرادة دائمًا")}
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-6 text-center">
              {getText(
                "The hidden reason most self-improvement efforts don't last — and the identity-first approach that creates permanent transformation.",
                "السبب الخفي لعدم استمرار معظم جهود تطوير الذات — والنهج القائم على الهوية الذي يخلق تحولًا دائمًا."
              )}
            </p>
            <div className="flex items-center justify-center gap-8 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-white font-medium">{getText("15 min read", "15 دقيقة قراءة")}</span>
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4 text-accent" />
                <span className="text-white font-medium">{getText("Tamkinly Team", "فريق تمكنلي")}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-12 bg-accent/5 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-accent" />
              <h2 className="font-semibold text-primary">{getText("Key Takeaways", "النقاط الرئيسية")}</h2>
            </div>
            <ul className="space-y-2">
              {keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">
            
            {/* Introduction */}
            <div className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              {getText(
                "Every January, millions of people set behavior goals. They commit to exercising, eating better, reading more, or building that side project. By February, most have already quit. The problem isn't their willpower — it's their approach.",
                "كل يناير، يضع ملايين الأشخاص أهدافًا سلوكية. يلتزمون بممارسة الرياضة، وتناول طعام أفضل، وقراءة المزيد، أو بناء ذلك المشروع الجانبي. بحلول فبراير، يكون معظمهم قد استسلم بالفعل. المشكلة ليست في إرادتهم — بل في نهجهم."
              )}
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Behavior Trap", "فخ السلوك")}
            </h2>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Traditional self-improvement focuses on behavior: what you do. \"I need to exercise more.\" \"I should stop procrastinating.\" \"I want to be more productive.\"",
                "يركز تطوير الذات التقليدي على السلوك: ما تفعله. \"أحتاج إلى ممارسة الرياضة أكثر.\" \"يجب أن أتوقف عن التسويف.\" \"أريد أن أكون أكثر إنتاجية.\""
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This approach treats symptoms, not causes. It's like trying to fix a car's performance by pushing it faster instead of tuning the engine.",
                "هذا النهج يعالج الأعراض وليس الأسباب. إنه مثل محاولة إصلاح أداء سيارة بدفعها أسرع بدلاً من ضبط المحرك."
              )}
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">{getText("The Willpower Depletion Problem", "مشكلة نفاد الإرادة")}</h4>
                  <p className="text-amber-700 text-sm">
                    {getText(
                      "Willpower is a finite resource. Studies show it depletes with use. Every decision, every resistance, every \"I should\" drains it. Behavior change that relies on willpower is fighting a losing battle.",
                      "الإرادة مورد محدود. تُظهر الدراسات أنها تنفد بالاستخدام. كل قرار، كل مقاومة، كل \"يجب أن\" تستنزفها. التغيير السلوكي الذي يعتمد على الإرادة يخسر معركة خاسرة."
                    )}
                  </p>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("What Identity Actually Means", "ما تعنيه الهوية فعلاً")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Your identity is not who you wish you were. It's not who you tell people you are. It's the deep, often unconscious beliefs you hold about yourself — the internal narrative that runs your life.",
                "هويتك ليست من تتمنى أن تكونه. ليست من تخبر الناس أنك عليه. إنها المعتقدات العميقة، غالبًا اللاواعية، التي تحملها عن نفسك — السرد الداخلي الذي يدير حياتك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When you truly believe \"I am a healthy person,\" healthy choices become automatic. You don't debate whether to exercise. You don't fight cravings. You simply do what a healthy person does — because that's who you are.",
                "عندما تؤمن حقًا \"أنا شخص صحي\"، تصبح الخيارات الصحية تلقائية. أنت لا تناقش ما إذا كنت ستمارس الرياضة. لا تحارب الرغبات. أنت ببساطة تفعل ما يفعله الشخص الصحي — لأن هذا هو أنت."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This is why identity change is so powerful: it moves behavior from the conscious (effortful) to the unconscious (automatic).",
                "هذا هو سبب قوة تغيير الهوية: إنه ينقل السلوك من الوعي (الجهد) إلى اللاوعي (التلقائي)."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Behavior vs. Identity: A Clear Comparison", "السلوك مقابل الهوية: مقارنة واضحة")}
            </h2>

            {/* Comparison Table */}
            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-3 text-left font-semibold">{getText("Aspect", "الجانب")}</th>
                    <th className="px-4 py-3 text-left font-semibold">{getText("Behavior Change", "التغيير السلوكي")}</th>
                    <th className="px-4 py-3 text-left font-semibold">{getText("Identity Change", "تغيير الهوية")}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-primary">{row.aspect}</td>
                      <td className="px-4 py-3 text-slate-600">{row.behavior}</td>
                      <td className="px-4 py-3 text-accent font-medium">{row.identity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Identity Recode Framework", "إطار إعادة برمجة الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Lasting transformation follows a specific sequence. Skip a step, and the change won't stick. Here's the framework:",
                "التحول الدائم يتبع تسلسلًا محددًا. تخطَّ خطوة، ولن يستمر التغيير. إليك الإطار:"
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">{getText("Identify Your Current Identity", "حدد هويتك الحالية")}</h4>
                    <p className="text-slate-600 text-sm">{getText("What do you believe about yourself in this area? Be honest. The truth will set you free.", "ماذا تعتقد عن نفسك في هذا المجال؟ كن صادقًا. الحق سيحررك.")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">{getText("Define Your Target Identity", "حدد هويتك المستهدفة")}</h4>
                    <p className="text-slate-600 text-sm">{getText("Who would you be if you had already achieved your goals? How would that person think, feel, act?", "من ستكون لو كنت قد حققت أهدافك بالفعل؟ كيف سيفكر ذلك الشخص، ويشعر، ويتصرف؟")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">{getText("Collect Evidence", "اجمع الأدلة")}</h4>
                    <p className="text-slate-600 text-sm">{getText("Take small actions that prove your new identity is true. Each action is a vote for who you're becoming.", "اتخذ أفعالاً صغيرة تثبت أن هويتك الجديدة صحيحة. كل فعل هو تصويت لمن تصبح.")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">{getText("Embody and Expand", "جسّد وتوسع")}</h4>
                    <p className="text-slate-600 text-sm">{getText("As evidence accumulates, your identity solidifies. The behavior becomes automatic. The change becomes permanent.", "مع تراكم الأدلة، تتصلب هويتك. يصبح السلوك تلقائيًا. يصبح التغيير دائمًا.")}</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why This Matters", "لماذا هذا مهم")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The goal isn't to have more discipline. The goal is to need less discipline. When your identity aligns with your desired behavior, you don't need willpower. The behavior becomes as natural as breathing.",
                "الهدف ليس أن يكون لديك انضباط أكثر. الهدف هو أن تحتاج إلى انضباط أقل. عندما تتوافق هويتك مع سلوكك المرغوب، لا تحتاج إلى إرادة. يصبح السلوك طبيعيًا كالتنفس."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This is why two people can face the same temptation and respond differently. One has to fight; the other doesn't even notice. The difference isn't strength — it's identity.",
                "هذا هو السبب في أن شخصين يمكنهما مواجهة نفس الإغراء والاستجابة بشكل مختلف. واحد عليه أن يقاتل؛ والآخر لا يلاحظ حتى. الفرق ليس القوة — إنها الهوية."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"You don't rise to the level of your goals. You fall to the level of your systems.\" — James Clear. And your identity is the most important system of all.",
                  "\"أنت لا ترتقي إلى مستوى أهدافك. أنت تنحدر إلى مستوى أنظمتك.\" — جيمس كلير. وهويتك هي أهم نظام على الإطلاق."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercises Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                {getText("Practical Exercises", "تمارين عملية")}
              </Badge>
              <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                {getText("Transform Theory Into Practice", "حوّل النظرية إلى ممارسة")}
              </h2>
              <p className="text-slate-600">
                {getText("These exercises will help you apply identity-first principles to your own life.", "هذه التمارين ستساعدك في تطبيق مبادئ الهوية أولاً على حياتك الخاصة.")}
              </p>
            </div>

            <div className="space-y-6">
              {exercises.map((exercise) => (
                <Card key={exercise.number} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold">
                        {exercise.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg text-primary">{exercise.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {exercise.time}
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm mb-4">{exercise.description}</p>
                        <ol className="space-y-2">
                          {exercise.steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs">{idx + 1}</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                {getText("Continue Your Journey", "واصل رحلتك")}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <Link href="/quiz">
                <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group h-full bg-accent/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="h-6 w-6 text-accent" />
                      <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                        {getText("Take the Identity Assessment", "قم بتقييم الهوية")}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600">
                      {getText("Discover your identity gaps and get a personalized transformation roadmap.", "اكتشف فجوات هويتك واحصل على خارطة طريق تحويل مخصصة.")}
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/apps">
                <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group h-full bg-accent/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="h-6 w-6 text-accent" />
                      <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                        {getText("Explore Transformation Apps", "استكشف تطبيقات التحول")}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600">
                      {getText("Free tools to track habits, set goals, and build your new identity.", "أدوات مجانية لتتبع العادات وتحديد الأهداف وبناء هويتك الجديدة.")}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {getText("Ready for Structured Transformation?", "هل أنت مستعد لتحول منظم؟")}
            </h2>
            <p className="text-slate-300 mb-6">
              {getText("The Identity Recode Planner provides a 30-day guided journey with daily exercises, journaling prompts, and progress tracking.", "يوفر مخطط إعادة برمجة الهوية رحلة موجهة لمدة 30 يومًا مع تمارين يومية وموجهات كتابة وتتبع التقدم.")}
            </p>
            <Link href="/products">
              <Button size="xl" variant="accent" className="font-bold shadow-2xl shadow-[#3DD4B0]/30 hover:shadow-[#3DD4B0]/50">
                {getText("View Products", "عرض المنتجات")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
