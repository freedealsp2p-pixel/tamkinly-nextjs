'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sun, BookOpen, Brain, Sparkles, Calendar, CheckCircle2, PenLine } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function DailyReflectionPracticeArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "physics-of-momentum", title: getText("The Physics of Momentum: Why 18 Minutes Changes Everything", "فيزياء الزخم: لماذا تغير 18 دقيقة كل شيء"), readTime: getText("8 min read", "8 دقائق قراءة") },
    { slug: "values-clarification-tool", title: getText("Values Clarification: The Foundation of Authentic Identity", "توضيح القيم: أساس الهوية الأصيلة"), readTime: getText("9 min read", "9 دقائق قراءة") },
    { slug: "becoming-exceptional", title: getText("Becoming Exceptional", "الصعود نحو التميز"), readTime: getText("8 min read", "8 دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Daily Practice", "ممارسة يومية")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Daily Reflection Practice: The Neuroscience of Identity Integration", "ممارسة التأمل اليومي: علم الأعصاب لتكامل الهوية")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("9 min read", "9 دقائق قراءة")}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {getText("Tamkinly Team", "فريق تمكنلي")}
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
                "Every identity transformation in history has one thing in common: conscious reflection. The daily practice of examining your thoughts, actions, and choices isn't just therapeutic—it's how you actively construct who you're becoming.",
                "كل تحول هوية في التاريخ له شيء مشترك: التأمل الواعي. الممارسة اليومية لفحص أفكارك وأفعالك واختياراتك ليست علاجية فحسب—إنها كيف تبني بنشاط من تصبح."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research in neuroscience and psychology has transformed our understanding of journaling and reflection. What was once seen as a simple self-help practice is now recognized as a powerful tool for neural pathway reinforcement, emotional regulation, and identity construction.",
                "لقد غيّرت الأبحاث في علم الأعصاب وعلم النفس فهمنا لكتابة اليوميات والتأمل. ما كان يُنظر إليه سابقًا كممارسة بسيطة للمساعدة الذاتية يُعترف به الآن كأداة قوية لتعزيز المسارات العصبية والتنظيم العاطفي وبناء الهوية."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Science of Reflection and Journaling", "علم التأمل وكتابة اليوميات")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "A landmark study by psychologist James Pennebaker at the University of Texas found that expressive writing—just 15-20 minutes a day for four days—produced measurable improvements in both physical and mental health. Participants showed enhanced immune function, reduced stress levels, and better overall well-being.",
                "وجدت دراسة رائدة لعالم النفس جيمس بينيباكر في جامعة تكساس أن الكتابة التعبيرية—15-20 دقيقة فقط يوميًا لمدة أربعة أيام—أحدثت تحسينات قابلة للقياس في كل من الصحة الجسدية والنفسية. أظهر المشاركون تعزيزًا في وظائف المناعة وانخفاض مستويات التوتر وتحسنًا عامًا في الرفاهية."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "But the benefits extend beyond health. Research published in the Journal of Experimental Psychology demonstrated that reflection enhances learning and performance. When we reflect on experiences, we extract meaning from them, integrating new information into our existing knowledge structures—what neuroscientists call \"memory consolidation.\"",
                "لكن الفوائد تمتد إلى ما هو أبعد من الصحة. أظهرت أبحاث منشورة في مجلة علم النفس التجريبي أن التأمل يعزز التعلم والأداء. عندما نتأمل في التجارب، نستخرج المعنى منها، مما يدمج المعلومات الجديدة في هياكل معرفتنا الحالية—ما يسميه علماء الأعصاب \"تعزيز الذاكرة\"."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"We do not learn from experience... we learn from reflecting on experience.\" — John Dewey",
                  "\"نحن لا نتعلم من التجربة... نحن نتعلم من التأمل في التجربة.\" — جون ديوي"
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Reflection as Identity Construction", "التأمل كبناء للهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Identity isn't something you have—it's something you actively create through narrative. Psychologist Dan McAdams, a leading researcher in narrative identity, argues that we construct our identities through the stories we tell about ourselves. Daily reflection is the process of editing that story.",
                "الهوية ليست شيئًا تمتلكه—إنها شيء تصنعه بنشاط من خلال السرد. يجادل عالم النفس دان ماكادامز، الباحث الرائد في الهوية السردية، أننا نبني هوياتنا من خلال القصص التي نرويها عن أنفسنا. التأمل اليومي هو عملية تحرير تلك القصة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Each time you reflect on your day through the lens of your target identity, you're doing something powerful: you're selecting which experiences to emphasize, which patterns to notice, and which version of yourself to reinforce. This narrative selection shapes your neural pathways and your self-concept.",
                "في كل مرة تتأمل فيها في يومك من خلال عدسة هويتك المستهدفة، أنت تفعل شيئًا قويًا: أنت تختار أي التجارب تبرزها، وأي الأنماط تلاحظها، وأي نسخة من نفسك تعززها. هذا الاختيار السردي يشكل مساراتك العصبية ومفهومك عن ذاتك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The Daily Reflection Practice tool provides structured prompts across seven themes designed to support identity transformation:", "توفر أداة ممارسة التأمل اليومي موجهات منظمة عبر سبعة مواضيع مصممة لدعم تحويل الهوية:")}
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-[#3DD4B0]" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("Self-Awareness", "الوعي الذاتي")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("Deepen understanding of your patterns and choices", "تعميق فهم أنماطك واختياراتك")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1F6F78]/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-[#1F6F78]" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("Identity Shift", "التحول في الهوية")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("Track evidence supporting your new identity", "تتبع الأدلة الداعمة لهويتك الجديدة")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#2A8A94]/10 flex items-center justify-center">
                      <Sun className="h-4 w-4 text-[#2A8A94]" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("Growth Mindset", "عقلية النمو")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("Reframe challenges as opportunities", "إعادة صياغة التحديات كفرص")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#C97B7B]/10 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-[#C97B7B]" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("Values Alignment", "توافق القيم")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("Examine alignment between actions and values", "فحص التوافق بين الأفعال والقيم")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#2A8A94]/10 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-[#2A8A94]" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("Emotional Intelligence", "الذكاء العاطفي")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("Develop awareness of emotional patterns", "تطوير الوعي بالأنماط العاطفية")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#2A8A94]/10 flex items-center justify-center">
                      <PenLine className="h-4 w-4 text-[#2A8A94]" />
                    </div>
                    <h3 className="font-semibold text-primary">{getText("Environmental Design", "تصميم البيئة")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{getText("Optimize your environment for success", "تحسين بيئتك لتحقيق النجاح")}</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Neural Pathway Connection", "الارتباط بالمسارات العصبية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Every time you reflect on your target identity and find evidence of progress, you're strengthening specific neural pathways. This is neuroplasticity in action. Research shows that the brain's architecture literally changes with repeated mental activity—the neurons that fire together, wire together.",
                "في كل مرة تتأمل فيها في هويتك المستهدفة وتجد دليلًا على التقدم، فإنك تعزز مسارات عصبية محددة. هذا هو اللدونة العصبية في العمل. تُظهر الأبحاث أن بنية الدماغ تتغير حرفيًا مع النشاط العقلي المتكرر—الخلايا العصبية التي تنطلق معًا، تتصل معًا."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Dr. Carol Dweck's research on mindset demonstrates this principle. When you reflect through a growth mindset lens—asking what you learned rather than whether you succeeded—you reinforce neural patterns that support learning and resilience. The daily reflection practice is designed to activate this mindset consistently.",
                "تُظهر أبحاث الدكتورة كارول دويك عن العقلية هذا المبدأ. عندما تتأمل من خلال عدسة عقلية النمو—سائلاً نفسك ماذا تعلمت بدلاً من هل نجحت—فإنك تعزز الأنماط العصبية التي تدعم التعلم والمرونة. ممارسة التأمل اليومي مصممة لتنشيط هذه العقلية باستمرار."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("The 7 Reflection Themes", "مواضيع التأمل السبعة")}</h3>
              <div className="space-y-3 text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span><strong>{getText("Self-Awareness:", "الوعي الذاتي:")}</strong> {getText("Understanding your patterns, triggers, and choices", "فهم أنماطك ومحفزاتك واختياراتك")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span><strong>{getText("Identity Shift:", "التحول في الهوية:")}</strong> {getText("Collecting evidence of your new identity in action", "جمع الأدلة على هويتك الجديدة في العمل")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span><strong>{getText("Growth Mindset:", "عقلية النمو:")}</strong> {getText("Reframing challenges as opportunities for development", "إعادة صياغة التحديات كفرص للتطوير")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span><strong>{getText("Values Alignment:", "توافق القيم:")}</strong> {getText("Examining consistency between values and actions", "فحص الاتساق بين القيم والأفعال")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">5</span>
                  <span><strong>{getText("Emotional Intelligence:", "الذكاء العاطفي:")}</strong> {getText("Developing awareness of emotional patterns", "تطوير الوعي بالأنماط العاطفية")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">6</span>
                  <span><strong>{getText("Environmental Design:", "تصميم البيئة:")}</strong> {getText("Optimizing surroundings for success", "تحسين المحيط لتحقيق النجاح")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">7</span>
                  <span><strong>{getText("Future Self:", "الذات المستقبلية:")}</strong> {getText("Connecting with who you're becoming", "التواصل مع من تصبح")}</span>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Habit Loop of Reflection", "حلقة عادة التأمل")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Building a daily reflection habit follows the same principles as any habit formation. James Clear's research identifies the habit loop: cue, craving, response, reward. The Daily Reflection Practice is designed with this loop in mind.",
                "بناء عادة التأمل اليومي يتبع نفس مبادئ تكوين أي عادة. يحدد بحث جيمس كلير حلقة العادة: الإشارة، الشغف، الاستجابة، المكافأة. ممارسة التأمل اليومي مصممة مع مراعاة هذه الحلقة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The tool provides a daily prompt based on the date, creating a natural cue. The prompts are designed to trigger curiosity (craving), leading you to write your reflection (response), and the insight you gain provides intrinsic reward. Over time, this loop strengthens until reflection becomes automatic.",
                "توفر الأداة موجهة يومية بناءً على التاريخ، مما يخلق إشارة طبيعية. الموجهات مصممة لتحفيز الفضول (الشغف)، مما يقودك لكتابة تأملك (الاستجابة)، والبصيرة التي تكتسبها توفر مكافأة ذاتية. بمرور الوقت، تصبح هذه الحلقة أقوى حتى يصبح التأمل تلقائيًا."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research shows that habits form through consistent repetition—approximately 21 days of daily practice creates noticeable momentum. By 66 days, the habit becomes largely automatic. The tool tracks your streak and history, providing visual feedback that reinforces the behavior.",
                "تُظهر الأبحاث أن العادات تتشكل من خلال التكرار المنتظم—حوالي 21 يومًا من الممارسة اليومية يخلق زخمًا ملحوظًا. بحلول 66 يومًا، تصبح العادة تلقائية إلى حد كبير. تتبع الأداة سلسلتك وسجلك، مما يوفر ملاحظات بصرية تعزز السلوك."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why Structured Prompts Work Better Than Free Writing", "لماذا تعمل الموجهات المنظمة أفضل من الكتابة الحرة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "While free-form journaling has benefits, research suggests that structured reflection produces more consistent outcomes. A study in Academic Medicine found that students using structured reflection prompts showed greater improvement in critical thinking and self-awareness compared to those who journaled freely.",
                "بينما لكتابة اليوميات الحرة فوائدها، تشير الأبحاث إلى أن التأمل المنظم ينتج نتائج أكثر اتساقًا. وجدت دراسة في التعليم الأكاديمي أن الطلاب الذين استخدموا موجهات تأمل منظمة أظهروا تحسنًا أكبر في التفكير النقدي والوعي الذاتي مقارنة بمن كتبوا بحرية."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Structured prompts serve several functions:", "تخدم الموجهات المنظمة عدة وظائف:")}
            </p>

            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">{getText("They direct attention to specific aspects of identity", "توجه الانتباه إلى جوانب محددة من الهوية")}</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">{getText("They reduce the cognitive load of deciding what to write", "تقلل الحمل المعرفي لاتخاذ قرار ماذا تكتب")}</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">{getText("They ensure coverage of all important dimensions over time", "تضمن تغطية جميع الأبعاد المهمة بمرور الوقت")}</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">{getText("They connect daily experiences to larger identity goals", "تربط التجارب اليومية بأهداف الهوية الأكبر")}</span>
              </li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Compound Effect of Daily Reflection", "التأثير التراكمي للتأمل اليومي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("One day of reflection is valuable. A week creates insight. A month builds awareness. But the true power emerges over longer periods. Research on longitudinal journaling shows that sustained practice leads to:", "يوم واحد من التأمل قيّم. أسبوع يخلق بصيرة. شهر يبني وعيًا. لكن القوة الحقيقية تظهر على فترات أطول. تُظهر الأبحاث حول كتابة اليوميات الطولية أن الممارسة المستمرة تؤدي إلى:")}
            </p>

            <div className="space-y-4 my-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{getText("Enhanced Self-Awareness", "وعي ذاتي معزز")}</h4>
                  <p className="text-slate-600 text-sm">{getText("Greater recognition of patterns, triggers, and automatic behaviors", "تعزيز التعرف على الأنماط والمحفزات والسلوكيات التلقائية")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{getText("Emotional Regulation", "التنظيم العاطفي")}</h4>
                  <p className="text-slate-600 text-sm">{getText("Improved ability to process and manage difficult emotions", "تحسين القدرة على معالجة وإدارة المشاعر الصعبة")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{getText("Identity Clarity", "وضوح الهوية")}</h4>
                  <p className="text-slate-600 text-sm">{getText("Stronger sense of who you are and who you're becoming", "إحساس أقوى بمن أنت ومن تصبح")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">{getText("Goal Progress", "تقدم الأهداف")}</h4>
                  <p className="text-slate-600 text-sm">{getText("Better alignment between intentions and actions", "توافق أفضل بين النوايا والأفعال")}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-accent mt-12 mb-4">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">{getText("FREE Daily Practice Available", "ممارسة يومية مجانية متاحة")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Daily Reflection Practice is available at no cost. Start today with a fresh prompt, save your reflections locally, and build a history of insights that compounds over time.",
                "ممارسة التأمل اليومي متاحة بدون تكلفة. ابدأ اليوم بموجهة جديدة، احفظ تأملاتك محليًا، وابنِ سجلًا من البصائر يتراكم بمرور الوقت."
              )}
            </p>

            <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] p-8 rounded-xl my-10 text-center">
              <h3 className="text-white text-xl font-bold mb-3">{getText("Start Your Daily Practice", "ابدأ ممارستك اليومية")}</h3>
              <p className="text-slate-300 mb-6">
                {getText("Begin with today's prompt. Your reflections are saved locally on your device.", "ابدأ بموجهة اليوم. يتم حفظ تأملاتك محليًا على جهازك.")}
              </p>
              <Link href="/apps/daily-reflection">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  {getText("Start Reflecting", "ابدأ التأمل")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "Identity is built one day at a time, one reflection at a time. The question isn't whether you're changing—you are, constantly. The question is whether you're directing that change consciously. Daily reflection gives you that direction.",
                "الهوية تُبنى يومًا بعد يوم، وتأملًا بعد تأمل. السؤال ليس هل أنت تتغير—أنت تتغير باستمرار. السؤال هو هل توجه ذلك التغيير بوعي. التأمل اليومي يمنحك هذا الاتجاه."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <MidArticleUpgrade promoteTier="BASIC" variant="minimal" />
      <BlogArticleCTA ctaType="daily" />

      <ArticleNavigation currentSlug="daily-reflection-practice" />

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
  );
}

