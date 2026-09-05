'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Brain, MessageCircle, Target, Heart, Zap, CheckCircle2, Lock } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function AIIdentityCoachGuideArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "identity-recode-system-guide", title: getText("The Identity Recode System: A Complete Framework for Identity Transformation", "نظام إعادة برمجة الهوية: إطار كامل لتحويل الهوية"), readTime: getText("12 min read", "12 دقيقة قراءة") },
    { slug: "identity-gap-assessment", title: getText("The Identity Gap Assessment: Measuring Who You Are vs. Who You Want to Be", "تقييم فجوة الهوية: قياس من أنت مقابل من تريد أن تكون"), readTime: getText("10 min read", "10 دقائق قراءة") },
    { slug: "values-clarification-tool", title: getText("Values Clarification: The Foundation of Authentic Identity", "توضيح القيم: أساس الهوية الأصيلة"), readTime: getText("9 min read", "9 دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("AI Coaching", "التدريب بالذكاء الاصطناعي")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The AI Identity Coach: Your 24/7 Transformation Companion", "مدرب الهوية بالذكاء الاصطناعي: رفيق تحولك على مدار الساعة")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("11 min read", "11 دقيقة قراءة")}
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
                "The most powerful transformation tool isn't an app or a workbook—it's a conversation. The AI Identity Coach brings evidence-based coaching frameworks into an interactive dialogue, available whenever you need guidance, clarity, or support on your transformation journey.",
                "أقوى أداة تحول ليست تطبيقًا أو كتيب عمل—إنها محادثة. يجلب مدرب الهوية بالذكاء الاصطناعي أطر التدريب القائمة على الأدلة إلى حوار تفاعلي، متاح كلما احتجت إلى إرشاد أو وضوح أو دعم في رحلة تحولك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "For decades, coaching was reserved for those who could afford personal sessions with trained professionals. But advances in artificial intelligence have democratized access to sophisticated coaching methodologies. The AI Identity Coach represents the convergence of cutting-edge AI and proven psychological frameworks.",
                "لعقود، كان التدريب مخصصًا لمن يستطيعون تحمل تكاليف جلسات شخصية مع محترفين مدربين. لكن التطورات في الذكاء الاصطناعي قد جعلت الوصول إلى منهجيات التدريب المتطورة متاحًا للجميع. يمثل مدرب الهوية بالذكاء الاصطناعي التقاء الذكاء الاصطناعي المتطور والأطر النفسية المثبتة."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Science of AI Coaching", "علم التدريب بالذكاء الاصطناعي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research on AI-assisted coaching has shown remarkable results. A study published in Nature Human Behaviour found that AI coaching was as effective as human coaching for goal attainment, with participants showing significant improvements in self-efficacy and behavioral change.",
                "أظهرت الأبحاث حول التدريب المساعد بالذكاء الاصطناعي نتائج ملحوظة. وجدت دراسة منشورة في سلوك الإنسان الطبيعي أن التدريب بالذكاء الاصطناعي كان بنفس فعالية التدريب البشري لتحقيق الأهداف، حيث أظهر المشاركون تحسينات كبيرة في الكفاءة الذاتية والتغيير السلوكي."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("What makes AI coaching effective? Research identifies several key factors:", "ما الذي يجعل التدريب بالذكاء الاصطناعي فعالًا؟ تحدد الأبحاث عدة عوامل رئيسية:")}
            </p>

            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>{getText("Immediate Availability:", "التوفر الفوري:")}</strong> {getText("Support whenever you need it, without scheduling constraints", "دعم كلما احتجت إليه، بدون قيود جدولة")}</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>{getText("Non-judgmental Space:", "مساحة خالية من الأحكام:")}</strong> {getText("Complete privacy encourages deeper exploration", "الخصوصية الكاملة تشجع الاستكشاف الأعمق")}</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>{getText("Consistent Frameworks:", "أطر متسقة:")}</strong> {getText("Evidence-based methodologies applied systematically", "منهجيات قائمة على الأدلة مطبقة بشكل منهجي")}</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>{getText("Memory and Context:", "الذاكرة والسياق:")}</strong> {getText("Conversations build on each other for continuity", "المحادثات تبني على بعضها لضمان الاستمرارية")}</span>
              </li>
            </ul>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"The quality of your life is in direct proportion to the quality of the questions you ask yourself.\" — Tony Robbins",
                  "\"جودة حياتك تتناسب طرديًا مع جودة الأسئلة التي تسألها لنفسك.\" — توني روبنز"
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Evidence-Based Framework Behind the Coach", "الإطار القائم على الأدلة خلف المدرب")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The AI Identity Coach isn't a generic chatbot. It's built on validated psychological frameworks that have been tested and refined through decades of research:", "مدرب الهوية بالذكاء الاصطناعي ليس روبوت محادثة عامًا. إنه مبني على أطر نفسية معتمدة تم اختبارها وتحسينها عبر عقود من البحث:")}
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Atomic Habits Framework", "إطار العادات الذرية")}</h3>
                  <p className="text-sm text-slate-600">
                    {getText("James Clear's identity-based habit formation methodology—building new identities through accumulated behavioral \"votes.\"", "منهجية تكوين العادات القائمة على الهوية لجيمس كلير—بناء هويات جديدة من خلال الأصوات السلوكية المتراكمة.")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Self-Authorship Theory", "نظرية تأليف الذات")}</h3>
                  <p className="text-sm text-slate-600">
                    {getText("Marcia Baxter Magolda's four-phase model of developing internal identity authority and authentic self-direction.", "نموذج الأربع مراحل لمارسيا باكستر ماجولدا لتطوير سلطة الهوية الداخلية والتوجيه الذاتي الأصيل.")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#2A8A94]/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-[#2A8A94]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Cognitive Behavioral Approaches", "المناهج المعرفية السلوكية")}</h3>
                  <p className="text-sm text-slate-600">
                    {getText("Evidence-based techniques for identifying and restructuring unhelpful thought patterns and beliefs.", "تقنيات قائمة على الأدلة لتحديد وإعادة هيكلة أنماط التفكير والمعتقدات غير المفيدة.")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#2A8A94]/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-[#2A8A94]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Values-Based Coaching", "التدريب القائم على القيم")}</h3>
                  <p className="text-sm text-slate-600">
                    {getText("Acceptance and Commitment Therapy principles for living in alignment with your core values.", "مبادئ علاج القبول والالتزام للعيش وفقًا لقيمك الجوهرية.")}
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Four Key Coaching Domains", "أربع مجالات تدريب رئيسية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The AI Identity Coach is structured around four primary domains, each addressing a critical aspect of identity transformation:", "هيكل مدرب الهوية بالذكاء الاصطناعي حول أربع مجالات رئيسية، كل منها يعالج جانبًا حاسمًا من تحويل الهوية:")}
            </p>

            <div className="space-y-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("Identity Discovery", "اكتشاف الهوية")}</h3>
                      <p className="text-slate-600 text-sm mb-3">
                        {getText("Explore who you are at your core and who you want to become. The coach helps you uncover your authentic self, distinguish between genuine desires and external expectations, and define your target identity with clarity.", "استكشف من أنت في جوهرك ومن تريد أن تصبح. يساعدك المدرب على كشف ذاتك الأصيلة، والتمييز بين الرغبات الحقيقية والتوقعات الخارجية، وتحديد هويتك المستهدفة بوضوح.")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">{getText("Self-concept exploration", "استكشاف مفهوم الذات")}</Badge>
                        <Badge variant="outline" className="text-xs">{getText("Future self visualization", "تصور الذات المستقبلية")}</Badge>
                        <Badge variant="outline" className="text-xs">{getText("Identity gap analysis", "تحليل فجوة الهوية")}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-[#1F6F78]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("Habit Formation", "تكوين العادات")}</h3>
                      <p className="text-slate-600 text-sm mb-3">
                        {getText("Learn to build identity-based habits that stick. The coach applies James Clear's Atomic Habits framework to help you design cues, routines, and rewards that reinforce your target identity.", "تعلم بناء عادات قائمة على الهوية تستمر. يطبق المدرب إطار العادات الذرية لجيمس كلير لمساعدتك في تصميم الإشارات والروتين والمكافآت التي تعزز هويتك المستهدفة.")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">{getText("Identity votes", "أصوات الهوية")}</Badge>
                        <Badge variant="outline" className="text-xs">{getText("Habit stacking", "تكديس العادات")}</Badge>
                        <Badge variant="outline" className="text-xs">{getText("Environment design", "تصميم البيئة")}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#2A8A94]/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-5 w-5 text-[#2A8A94]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("Self-Authorship", "تأليف الذات")}</h3>
                      <p className="text-slate-600 text-sm mb-3">
                        {getText("Develop your internal voice and move from following external formulas to creating your own path. The coach guides you through Baxter Magolda's phases of self-authorship development.", "طور صوتك الداخلي وانتقل من اتباع الصيغ الخارجية إلى خلق مسارك الخاص. يرشدك المدرب عبر مراحل تطوير تأليف الذات لباكستر ماجولدا.")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">{getText("Internal authority", "السلطة الداخلية")}</Badge>
                        <Badge variant="outline" className="text-xs">{getText("Authentic choices", "الخيارات الأصيلة")}</Badge>
                        <Badge variant="outline" className="text-xs">{getText("Self-directed growth", "النمو الموجه ذاتيًا")}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#C97B7B]/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="h-5 w-5 text-[#C97B7B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("Emotion Regulation", "تنظيم المشاعر")}</h3>
                      <p className="text-slate-600 text-sm mb-3">
                        {getText("Master the emotional challenges of transformation. The coach teaches cognitive reappraisal techniques and helps you navigate the uncomfortable feelings that arise during identity change.", "أتقن التحديات العاطفية للتحول. يعلمك المدرب تقنيات إعادة التقييم المعرفي ويساعدك على التنقل في المشاعر غير المريحة التي تنشأ أثناء تغيير الهوية.")}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">{getText("Cognitive reappraisal", "إعادة التقييم المعرفي")}</Badge>
                        <Badge variant="outline" className="text-xs">{getText("Emotional awareness", "الوعي العاطفي")}</Badge>
                        <Badge variant="outline" className="text-xs">{getText("Resilience building", "بناء المرونة")}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("How Conversations Drive Transformation", "كيف تقود المحادثات التحول")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Unlike static worksheets or videos, conversation enables a dynamic exchange that adapts to your specific situation. The AI Identity Coach uses sophisticated dialogue strategies to:", "على عكس أوراق العمل أو مقاطع الفيديو الثابتة، تمكّن المحادثة تبادلاً ديناميكيًا يتكيف مع وضعك المحدد. يستخدم مدرب الهوية بالذكاء الاصطناعي استراتيجيات حوار متطورة من أجل:")}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("Coaching Dialogue Strategies", "استراتيجيات حوار التدريب")}</h3>
              <ol className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <div>
                    <strong className="text-primary">{getText("Powerful Questions:", "أسئلة قوية:")}</strong>
                    {getText(" Ask questions that prompt deep reflection and new insights about your identity.", " اطرح أسئلة تحفز التأمل العميق ورؤى جديدة حول هويتك.")}
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <div>
                    <strong className="text-primary">{getText("Reframing:", "إعادة الصياغة:")}</strong>
                    {getText(" Help you see situations from new perspectives that support your transformation.", " تساعدك على رؤية المواقف من منظورات جديدة تدعم تحولك.")}
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <div>
                    <strong className="text-primary">{getText("Accountability:", "المساءلة:")}</strong>
                    {getText(" Track commitments and follow up on progress in future conversations.", " تتبع الالتزامات والمتابعة حول التقدم في المحادثات المستقبلية.")}
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <div>
                    <strong className="text-primary">{getText("Evidence Collection:", "جمع الأدلة:")}</strong>
                    {getText(" Help you identify and celebrate evidence of your new identity emerging.", " تساعدك على تحديد والاحتفاء بأدلة هويتك الجديدة التي تظهر.")}
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">5</span>
                  <div>
                    <strong className="text-primary">{getText("Obstacle Navigation:", "التنقل بين العوائق:")}</strong>
                    {getText(" Work through barriers and setbacks with evidence-based strategies.", " العمل عبر الحواجز والنكسات باستخدام استراتيجيات قائمة على الأدلة.")}
                  </div>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Privacy Advantage", "ميزة الخصوصية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Identity transformation involves vulnerable exploration—examining your deepest fears, your authentic desires, and the gaps between who you are and who you want to be. The AI Identity Coach provides a completely private space for this exploration.",
                "يتضمن تحويل الهوية استكشافًا عرضة للضعف—فحص مخاوفك الأعمق ورغباتك الأصيلة والفجوات بين من أنت ومن تريد أن تكون. يوفر مدرب الهوية بالذكاء الاصطناعي مساحة خاصة تمامًا لهذا الاستكشاف."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research on self-disclosure shows that people are more honest in anonymous contexts. This honesty enables deeper exploration and more meaningful breakthroughs. With AI coaching, you can discuss sensitive topics without concern about judgment or social consequences.",
                "تُظهر الأبحاث حول الإفشاء الذاتي أن الناس أكثر صدقًا في السياقات المجهولة. هذا الصدق يمكّن الاستكشاف الأعمق والاختراقات الأكثر معنى. مع التدريب بالذكاء الاصطناعي، يمكنك مناقشة المواضيع الحساسة دون قلق من الأحكام أو العواقب الاجتماعية."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("When to Use the AI Identity Coach", "متى تستخدم مدرب الهوية بالذكاء الاصطناعي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The coach is available 24/7, making it ideal for moments when you need immediate support:", "المدرب متاح على مدار الساعة، مما يجعله مثاليًا لللحظات التي تحتاج فيها إلى دعم فوري:")}
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-8">
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">{getText("Decision Moments", "لحظات القرار")}</h4>
                </div>
                <p className="text-sm text-slate-600">{getText("When facing a choice that tests your new identity", "عندما تواجه خيارًا يختبر هويتك الجديدة")}</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">{getText("Motivation Dips", "انخفاض الدافعية")}</h4>
                </div>
                <p className="text-sm text-slate-600">{getText("When you feel your commitment wavering", "عندما تشعر بأن التزامك يتذبذب")}</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">{getText("Insight Seeking", "البحث عن بصيرة")}</h4>
                </div>
                <p className="text-sm text-slate-600">{getText("When you need help understanding a pattern", "عندما تحتاج مساعدة في فهم نمط")}</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">{getText("Goal Clarification", "توضيح الأهداف")}</h4>
                </div>
                <p className="text-sm text-slate-600">{getText("When you need help defining your next step", "عندما تحتاج مساعدة في تحديد خطوتك التالية")}</p>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Mastery Tier Advantage", "ميزة مستوى الإتقان")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The AI Identity Coach is an exclusive feature of the Mastery tier—our most comprehensive transformation plan. Mastery combines:", "مدرب الهوية بالذكاء الاصطناعي ميزة حصرية في مستوى الإتقان—باقة التحول الأكثر شمولاً لدينا. يجمع الإتقان بين:")}
            </p>

            <div className="space-y-4 my-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("All BASIC Features", "جميع ميزات المستوى الأساسي")}</h4>
                  <p className="text-slate-600 text-sm">{getText("Complete Identity Recode System with all worksheets and tools", "نظام إعادة برمجة الهوية الكامل مع جميع أوراق العمل والأدوات")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("Unlimited AI Coaching", "تدريب بالذكاء الاصطناعي غير محدود")}</h4>
                  <p className="text-slate-600 text-sm">{getText("24/7 access to evidence-based coaching conversations", "وصول على مدار الساعة لمحادثات التدريب القائمة على الأدلة")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("Contextual Memory", "الذاكرة السياقية")}</h4>
                  <p className="text-slate-600 text-sm">{getText("The coach remembers your journey and builds on previous conversations", "يتذكر المدرب رحلتك ويبني على المحادثات السابقة")}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("Integrated Experience", "تجربة متكاملة")}</h4>
                  <p className="text-slate-600 text-sm">{getText("AI coaching that connects to your Identity Recode System progress", "تدريب بالذكاء الاصطناعي يتصل بتقدمك في نظام إعادة برمجة الهوية")}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#3DD4B0] mt-12 mb-4">
              <Lock className="h-5 w-5" />
              <span className="font-semibold">{getText("Mastery Tier Exclusive", "حصري لمستوى الإتقان")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Mastery tier is designed for those who want the complete transformation experience—combining structured systems with personalized coaching support. It's the closest you can get to having a personal transformation coach available whenever you need one.",
                "مستوى الإتقان مصمم لمن يريدون تجربة التحول الكاملة—يجمع بين الأنظمة المنظمة والدعم التدريبي المخصص. إنه أقرب ما يمكنك الحصول عليه إلى مدرب تحول شخصي متاح كلما احتجت إليه."
              )}
            </p>

            <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] p-8 rounded-xl my-10 text-center">
              <Badge className="mb-4 bg-[#3DD4B0]/20 text-[#3DD4B0] border-0">MASTERY</Badge>
              <h3 className="text-white text-xl font-bold mb-3">{getText("Experience AI-Powered Coaching", "اختبر التدريب المدعوم بالذكاء الاصطناعي")}</h3>
              <p className="text-slate-300 mb-6">
                {getText("Get 24/7 access to the AI Identity Coach with Mastery — $27.", "احصل على وصول على مدار الساعة لمدرب الهوية بالذكاء الاصطناعي مع باقة الإتقان — $27.")}
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  {getText("Get Mastery — $27", "احصل على باقة الإتقان — $27")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "Transformation isn't a solo journey—but it also doesn't require expensive coaching sessions. The AI Identity Coach brings sophisticated, evidence-based coaching into your pocket, ready whenever you are. Because the best time for transformation isn't tomorrow or next week—it's whenever you're ready to ask the right questions.",
                "التحول ليس رحلة فردية—لكنه أيضًا لا يتطلب جلسات تدريب مكلفة. يجلب مدرب الهوية بالذكاء الاصطناعي تدريبًا متطورًا قائمًا على الأدلة في جيبك، جاهز كلما كنت مستعدًا. لأن أفضل وقت للتحول ليس غدًا أو الأسبوع القادم—إنه كلما كنت مستعدًا لطرح الأسئلة الصحيحة."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="coach" />

      <ArticleNavigation currentSlug="ai-identity-coach-guide" />

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

