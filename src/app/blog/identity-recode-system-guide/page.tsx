'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, BookOpen, Target, Zap, Calendar, CheckCircle2, Lock, Layers } from "lucide-react";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';
import { ArticleReferences } from '@/components/blog/ArticleReferences';

export default function IdentityRecodeSystemGuideArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "physics-of-momentum", title: getText("The Physics of Momentum: Why 18 Minutes Changes Everything", "فيزياء الزخم: لماذا تغير 18 دقيقة كل شيء"), readTime: getText("8 min read", "8 دقائق قراءة") },
    { slug: "identity-gap-assessment", title: getText("The Identity Gap Assessment: Measuring Who You Are vs. Who You Want to Be", "تقييم فجوة الهوية: قياس من أنت مقابل من تريد أن تكون"), readTime: getText("10 min read", "10 دقائق قراءة") },
    { slug: "work-on-yourself", title: getText("Work on Yourself: Psycho-Cybernetics", "اعمل على نفسك: السايبرنيتيكا النفسية"), readTime: getText("10 min read", "10 دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Transformation System", "نظام التحول")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The Identity Recode System: A Complete Framework for Identity Transformation", "نظام إعادة برمجة الهوية: إطار كامل لتحويل الهوية")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("12 min read", "12 دقيقة قراءة")}
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
                "What if changing who you are was as systematic as updating software? The Identity Recode System applies evidence-based principles from psychology, neuroscience, and behavioral science to create a complete 30-day transformation framework.",
                "ماذا لو كان تغيير من أنت منهجيًا كتحديث البرمجيات؟ يطبق نظام إعادة برمجة الهوية مبادئ قائمة على الأدلة من علم النفس وعلم الأعصاب والعلوم السلوكية لإنشاء إطار تحويل كامل لمدة 30 يومًا."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Identity transformation has traditionally been treated as mysterious—an art rather than a science. But decades of research in cognitive psychology, habit formation, and self-concept have revealed that identity change follows predictable patterns. When you understand these patterns, you can engineer transformation rather than hoping for it.",
                "عومل تحويل الهوية تقليديًا على أنه غامض—فن بدلاً من علم. لكن عقودًا من البحث في علم النفس المعرفي وتكوين العادات ومفهوم الذات كشفت أن تغيير الهوية يتبع أنماطًا يمكن التنبؤ بها. عندما تفهم هذه الأنماط، يمكنك هندسة التحول بدلاً من الأمل فيه."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Foundation: How Identity Actually Changes", "الأساس: كيف تتغير الهوية فعليًا")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research on self-concept and identity shows that identity is constructed through repeated behaviors and their interpretations. Every action you take is a vote for the type of person you are. When you accumulate enough votes, your brain updates your self-concept to match.",
                "تُظهر الأبحاث حول مفهوم الذات والهوية أن الهوية تُبنى من خلال السلوكيات المتكررة وتفسيراتها. كل فعل تقوم به هو تصويت لنوع الشخص الذي أنت عليه. عندما تتراكم أصوات كافية، يحدث دماغك مفهومك عن ذاتك ليتوافق معها."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("This insight—popularized by James Clear in Atomic Habits—forms the foundation of the Identity Recode System. But the system goes deeper, integrating additional research on:", "هذه الرؤية—التي نشرها جيمس كلير في العادات الذرية—تشكل أساس نظام إعادة برمجة الهوية. لكن النظام يتعمق أكثر، دامجًا أبحاثًا إضافية حول:")}
            </p>

            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>{getText("Neuroplasticity:", "اللدونة العصبية:")}</strong> {getText("How repeated thoughts and behaviors reshape neural pathways", "كيف تعيد الأفكار والسلوكيات المتكررة تشكيل المسارات العصبية")}</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>{getText("Self-efficacy:", "الكفاءة الذاتية:")}</strong> {getText("Albert Bandura's research on belief in one's capabilities", "أبحاث ألبرت باندورا حول الإيمان بقدرات المرء")}</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>{getText("Self-authorship:", "تأليف الذات:")}</strong> {getText("Baxter Magolda's model of internal identity construction", "نموذج باكستر ماجولدا للبناء الداخلي للهوية")}</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>{getText("Environmental psychology:", "علم النفس البيئي:")}</strong> {getText("How context shapes behavior and identity", "كيف يشكل السياق السلوك والهوية")}</span>
              </li>
            </ul>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"Every action you take is a vote for the type of person you wish to become. No single instance will transform your beliefs, but as the votes build up, so does the evidence of your new identity.\" — James Clear",
                  "\"كل فعل تقوم به هو تصويت لنوع الشخص الذي ترغب في أن تصبحه. لن يحول أي مثال واحد معتقداتك، لكن مع تراكم الأصوات، يتراكم أيضًا دليل هويتك الجديدة.\" — جيمس كلير"
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Six Components of the Identity Recode System", "المكونات الستة لنظام إعادة برمجة الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The system is organized into six integrated components, each designed to address a specific aspect of identity transformation:", "ينظم النظام في ستة مكونات متكاملة، كل منها مصمم لمعالجة جانب محدد من تحويل الهوية:")}
            </p>

            <div className="space-y-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("Identity Baseline Assessment", "تقييم خط أساس الهوية")}</h3>
                      <p className="text-slate-600 text-sm">
                        {getText("A comprehensive diagnostic protocol establishing current identity parameters across eight dimensions. Research shows that baseline measurement increases self-awareness and provides a reference point for tracking progress.", "بروتوكول تشخيصي شامل يحدد معلمات الهوية الحالية عبر ثمانية أبعاد. تُظهر الأبحاث أن قياس خط الأساس يزيد الوعي الذاتي ويوفر نقطة مرجعية لتتبع التقدم.")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#1F6F78] font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("The 4-Step Identity Recode Framework", "إطار إعادة برمجة الهوية ذو الأربع خطوات")}</h3>
                      <p className="text-slate-600 text-sm">
                        {getText("A systematic protocol for converting objectives into operational identities through empirical evidence accumulation. This framework translates abstract identity goals into daily behavioral votes.", "بروتوكول منهجي لتحويل الأهداف إلى هويات تشغيلية من خلال تراكم الأدلة التجريبية. يترجم هذا الإطار أهداف الهوية المجردة إلى أصوات سلوكية يومية.")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2A8A94]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#2A8A94] font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("Daily Evidence Accumulation Cycle", "دورة تراكم الأدلة اليومية")}</h3>
                      <p className="text-slate-600 text-sm">
                        {getText("Daily protocols for identity prompt review, non-negotiable action execution, and evidence logging. Research on habit formation shows that daily practice accelerates neural pathway development.", "بروتوكولات يومية لمراجعة موجهات الهوية وتنفيذ الإجراءات غير القابلة للتفاوض وتسجيل الأدلة. تُظهر أبحاث تكوين العادات أن الممارسة اليومية تسرع تطوير المسارات العصبية.")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2A8A94]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#2A8A94] font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("Weekly Integration Protocol", "بروتوكول التكامل الأسبوعي")}</h3>
                      <p className="text-slate-600 text-sm">
                        {getText("7-day review cycles for system calibration, consistency scoring, and environmental optimization. Weekly reviews prevent drift and maintain strategic alignment.", "دورات مراجعة لمدة 7 أيام لمعايرة النظام وتسجيل درجات الاتساق وتحسين البيئة. المراجعات الأسبوعية تمنع الانحراف وتحافظ على التوافق الاستراتيجي.")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2A8A94]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#2A8A94] font-bold">5</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("Monthly Identity Lock Protocol", "بروتوكول تأمين الهوية الشهري")}</h3>
                      <p className="text-slate-600 text-sm">
                        {getText("30-day transformation cycles culminating in identity statement rewriting and next-level objective selection. Monthly consolidation locks in progress and sets the stage for continued growth.", "دورات تحويل لمدة 30 يومًا تتوج بإعادة كتابة بيان الهوية واختيار الأهداف للمستوى التالي. التأسيس الشهري يقفل التقدم ويهيئ المسرح للنمو المستمر.")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C97B7B]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#C97B7B] font-bold">6</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("System Failure Recovery", "استعادة فشل النظام")}</h3>
                      <p className="text-slate-600 text-sm">
                        {getText("Protocols for chain break scenarios, 24-hour reset rules, and identity collapse prevention. Research shows that recovery protocols prevent abandonment during setbacks.", "بروتوكولات لسيناريوهات كسر السلسلة وقواعد إعادة التعيين لمدة 24 ساعة ومنع انهيار الهوية. تُظهر الأبحاث أن بروتوكولات الاستعادة تمنع التخلي أثناء النكسات.")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The 30-Day Transformation Cycle", "دورة التحول لمدة 30 يومًا")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Identity Recode System operates on a 30-day cycle—a timeframe chosen based on research on habit formation and neural adaptation. A study in the European Journal of Social Psychology found that habit formation takes an average of 66 days, with significant neural pathway development occurring in the first 30 days.",
                "يعمل نظام إعادة برمجة الهوية على دورة مدتها 30 يومًا—إطار زمني اختير بناءً على أبحاث تكوين العادات والتكيف العصبي. وجدت دراسة في المجلة الأوروبية لعلم النفس الاجتماعي أن تكوين العادات يستغرق في المتوسط 66 يومًا، مع تطور مهم في المسارات العصبية في أول 30 يومًا."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Each day in the system includes:", "يتضمن كل يوم في النظام:")}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("Daily Protocol Structure", "هيكل البروتوكول اليومي")}</h3>
              <ol className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <div>
                    <strong className="text-primary">{getText("Morning Identity Prompt Review:", "مراجعة موجهات الهوية الصباحية:")}</strong>
                    {getText(" Start each day connecting with your target identity through carefully designed prompts.", " ابدأ كل يوم بالتواصل مع هويتك المستهدفة من خلال موجهات مصممة بعناية.")}
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <div>
                    <strong className="text-primary">{getText("Non-Negotiable Action Execution:", "تنفيذ الإجراء غير القابل للتفاوض:")}</strong>
                    {getText(" Complete one specific action that demonstrates your new identity—your \"identity vote\" for the day.", " أكمل إجراءً محددًا واحدًا يُظهر هويتك الجديدة—\"تصويت الهوية\" الخاص بك لليوم.")}
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <div>
                    <strong className="text-primary">{getText("Evidence Logging:", "تسجيل الأدلة:")}</strong>
                    {getText(" Record the evidence you collected that supports your new identity.", " سجّل الأدلة التي جمعتها والتي تدعم هويتك الجديدة.")}
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <div>
                    <strong className="text-primary">{getText("Progress Tracking:", "تتبع التقدم:")}</strong>
                    {getText(" Monitor your consistency streak and overall transformation metrics.", " راقب سلسلة اتساقك ومقاييس التحول الشاملة.")}
                  </div>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Evidence-Based Worksheets", "أوراق العمل القائمة على الأدلة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The system includes specialized worksheets developed from validated psychological instruments and research-validated frameworks:", "يتضمن النظام أوراق عمل متخصصة مطورة من أدوات نفسية معتمدة وأطر بحثية محققة:")}
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Layers className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Identity Baseline", "خط أساس الهوية")}</h3>
                  <p className="text-sm text-slate-600">{getText("8-dimension diagnostic assessment", "تقييم تشخيصي ذو 8 أبعاد")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Environmental Audit", "تدقيق بيئي")}</h3>
                  <p className="text-sm text-slate-600">{getText("Context optimization framework", "إطار تحسين السياق")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#2A8A94]/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-[#2A8A94]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Emotion Regulation", "تنظيم المشاعر")}</h3>
                  <p className="text-sm text-slate-600">{getText("ERQ-based assessment tool", "أداة تقييم قائمة على ERQ")}</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why This System Works When Others Fail", "لماذا يعمل هذا النظام عندما تفشل الأنظمة الأخرى")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Most transformation attempts fail for predictable reasons. The Identity Recode System addresses each failure point:", "معظم محاولات التحول تفشل لأسباب يمكن التنبؤ بها. يعالج نظام إعادة برمجة الهوية كل نقطة فشل:")}
            </p>

            <div className="space-y-4 my-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("Vague Goals → Specific Identity Statements", "أهداف غامضة → بيانات هوية محددة")}</h4>
                  <p className="text-slate-600 text-sm">{getText("The system converts abstract desires into clear identity declarations", "يحول النظام الرغبات المجردة إلى إعلانات هوية واضحة")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("No Tracking → Daily Evidence Collection", "لا تتبع → جمع أدلة يومي")}</h4>
                  <p className="text-slate-600 text-sm">{getText("Every action is logged as evidence, creating visible progress", "كل فعل يُسجل كدليل، مما يخلق تقدمًا مرئيًا")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("Motivation Dependence → System Reliance", "الاعتماد على الدافعية → الاعتماد على النظام")}</h4>
                  <p className="text-slate-600 text-sm">{getText("Protocols work regardless of how motivated you feel", "البروتوكولات تعمل بغض النظر عن مدى شعورك بالدافعية")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("All-or-Nothing Thinking → Recovery Protocols", "التفكير الكلي أو العدم → بروتوكولات الاستعادة")}</h4>
                  <p className="text-slate-600 text-sm">{getText("Built-in failure recovery prevents collapse after setbacks", "استعادة الفشل المدمجة تمنع الانهيار بعد النكسات")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("Isolated Efforts → Integrated System", "جهود معزولة → نظام متكامل")}</h4>
                  <p className="text-slate-600 text-sm">{getText("All components work together synergistically", "جميع المكونات تعمل معًا بشكل تآزري")}</p>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The BASIC Tier Difference", "فرق المستوى الأساسي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The Identity Recode System is available as part of the BASIC tier—our comprehensive transformation package designed for serious identity change. Unlike free tools that provide isolated exercises, the BASIC tier offers:", "نظام إعادة برمجة الهوية متاح كجزء من المستوى الأساسي—حزمة التحول الشاملة المصممة لتغيير الهوية الجاد. على عكس الأدوات المجانية التي توفر تمارين معزولة، يقدم المستوى الأساسي:")}
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-8">
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">{getText("Executive Manual", "الدليل التنفيذي")}</h4>
                </div>
                <p className="text-sm text-slate-600">{getText("Complete operational documentation for every protocol", "توثيق تشغيلي كامل لكل بروتوكول")}</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">{getText("30-Day Planner", "مخطط 30 يومًا")}</h4>
                </div>
                <p className="text-sm text-slate-600">{getText("Daily implementation system with progress tracking", "نظام تنفيذ يومي مع تتبع التقدم")}</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">{getText("Assessment Worksheets", "أوراق عمل التقييم")}</h4>
                </div>
                <p className="text-sm text-slate-600">{getText("Evidence-based measurement tools for all dimensions", "أدوات قياس قائمة على الأدلة لجميع الأبعاد")}</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">{getText("Tracking Systems", "أنظمة التتبع")}</h4>
                </div>
                <p className="text-sm text-slate-600">{getText("Evidence logs and decision pattern analysis", "سجلات الأدلة وتحليل أنماط القرارات")}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#1F6F78] mt-12 mb-4">
              <Lock className="h-5 w-5" />
              <span className="font-semibold">{getText("BASIC Tier Product", "منتج المستوى الأساسي")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Identity Recode System represents months of research and development, synthesizing the best available science into a practical, actionable framework. It's designed for people who are serious about transformation—people ready to move from hoping for change to engineering it.",
                "يمثل نظام إعادة برمجة الهوية أشهرًا من البحث والتطوير، حيث يدمج أفضل العلوم المتاحة في إطار عملي وقابل للتنفيذ. إنه مصمم للأشخاص الجادين بشأن التحول—الأشخاص المستعدين للانتقال من الأمل في التغيير إلى هندسته."
              )}
            </p>

            <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] p-8 rounded-xl my-10 text-center">
              <Badge className="mb-4 bg-[#1F6F78]/30 text-white border-0">BASIC</Badge>
              <h3 className="text-white text-xl font-bold mb-3">{getText("Start Your 30-Day Transformation", "ابدأ تحولك لمدة 30 يومًا")}</h3>
              <p className="text-slate-300 mb-6">
                {getText("Get the complete Identity Recode System with executive manual, planner, and worksheets.", "احصل على نظام إعادة برمجة الهوية الكامل مع الدليل التنفيذي والمخطط وأوراق العمل.")}
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  {getText("View Products", "عرض المنتجات")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "Identity transformation isn't magic—it's method. The Identity Recode System provides that method, translating decades of psychological research into a practical framework you can implement today.",
                "تحويل الهوية ليس سحرًا—إنه منهج. يوفر نظام إعادة برمجة الهوية هذا المنهج، مترجمًا عقودًا من الأبحاث النفسية إلى إطار عملي يمكنك تطبيقه اليوم."
              )}
            </p>
          </div>
        </div>
      </section>

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
      <ArticleReferences slug="identity-recode-system-guide" />

      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />

        <BlogConversionSection />
      </article>
  );
}

