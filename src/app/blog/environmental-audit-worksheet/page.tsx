'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Home, Building2, Users, CheckCircle, Settings, ArrowUpRight } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function EnvironmentalAuditWorksheetArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "identity-based-habits-worksheet", title: getText("Identity-Based Habits: The James Clear Method", "العادات القائمة على الهوية: طريقة جيمس كلير"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "identity-baseline-8d-worksheet", title: getText("The Identity Baseline 8D Framework", "إطار خط أساس الهوية ثماني الأبعاد"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "who-am-i-worksheet", title: getText("The \"Who Am I?\" Self-Discovery Worksheet", "ورقة عمل \"من أنا؟\" لاكتشاف الذات"), readTime: getText("10 min read", "١٠ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Environmental Design", "التصميم البيئي")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Environmental Audit: Designing Your Surroundings for Lasting Change", "التدقيق البيئي: تصميم محيطك لتغيير دائم")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("9 min read", "٩ دقائق قراءة")}
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
                "\"Environment is the invisible hand that shapes human behavior.\" James Clear's observation captures a fundamental truth often overlooked in personal development: your surroundings are constantly influencing your choices, often without your conscious awareness.",
                "\"البيئة هي اليد الخفية التي تشكّل السلوك البشري.\" ملاحظة جيمس كلير تلتقط حقيقة أساسية غالباً ما يُتجاهلها في التطوير الشخصي: محيطك يؤثر باستمرار على خياراتك، غالباً دون وعيك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research in environmental psychology has established that our physical surroundings profoundly impact our behavior, mood, and even our sense of identity. A landmark study published in the Journal of Environmental Psychology found that environmental factors account for a significant portion of the variance in behavior change success—sometimes more than individual motivation.",
                "أثبتت الأبحاث في علم النفس البيئي أن محيطنا المادي يؤثر بعمق على سلوكنا ومزاجنا وحتى إحساسنا بالهوية. وجدت دراسة بارزة منشورة في مجلة علم النفس البيئي أن العوامل البيئية تمثل جزءاً كبيراً من التباين في نجاح تغيير السلوك—أحياناً أكثر من الدافع الفردي."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Science of Environmental Influence", "علم التأثير البيئي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Kurt Lewin, one of the pioneers of social psychology, proposed that behavior is a function of both person and environment: B = f(P, E). This elegant formulation reminds us that lasting change requires addressing both internal factors (identity, motivation, skills) and external factors (environment, context, cues).",
                "كورت لوين، أحد رواد علم النفس الاجتماعي، اقترح أن السلوك هو دالة للشخص والبيئة معاً: س = د(ش، ب). هذه الصياغة الأنيقة تذكرنا بأن التغيير الدائم يتطلب معالجة كل من العوامل الداخلية (الهوية، الدافع، المهارات) والعوامل الخارجية (البيئة، السياق، المحفزات)."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Modern research has validated Lewin's insight. Studies on habit formation consistently show that environmental design—structuring your surroundings to make desired behaviors easier and undesired behaviors harder—dramatically increases the likelihood of sustained change.",
                "أكدت الأبحاث الحديثة رؤية لوين. تُظهر الدراسات حول تكوين العادات باستمرار أن التصميم البيئي—هيكلة محيطك لجعل السلوكيات المرغوبة أسهل والسلوكيات غير المرغوبة أصعب—يزيد بشكل كبير من احتمالية التغيير المستدام."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"Small changes in context can lead to large changes in behavior over time. By designing our environments thoughtfully, we reduce the cognitive load required for good decisions.\" — Wendy Wood, author of Good Habits, Bad Habits",
                  "\"التغييرات الصغيرة في السياق يمكن أن تؤدي إلى تغييرات كبيرة في السلوك بمرور الوقت. من خلال تصميم بيئاتنا بعناية، نقلل الحمل المعرفي المطلوب لاتخاذ قرارات جيدة.\" — ويندي وود، مؤلفة كتاب العادات الجيدة والعادات السيئة"
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Three Layers of Environment", "طبقات البيئة الثلاث")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Environmental influence operates across multiple layers, each requiring different strategies for optimization. The Environmental Audit Worksheet addresses all three:",
                "يعمل التأثير البيئي عبر طبقات متعددة، كل منها يتطلب استراتيجيات مختلفة للتحسين. تتناول ورقة عمل التدقيق البيئي الطبقات الثلاث جميعها:"
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Home className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Physical Environment", "البيئة المادية")}</h3>
                  <p className="text-sm text-slate-600">{getText("Your spaces, objects, and their arrangement—what you see, touch, and interact with daily", "مساحاتك وأشياؤك وترتيبها—ما تراه وتلمسه وتتفاعل معه يومياً")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Social Environment", "البيئة الاجتماعية")}</h3>
                  <p className="text-sm text-slate-600">{getText("The people around you—their behaviors, expectations, and influence on your choices", "الأشخاص من حولك—سلوكياتهم وتوقعاتهم وتأثيرهم على خياراتك")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Digital Environment", "البيئة الرقمية")}</h3>
                  <p className="text-sm text-slate-600">{getText("Your devices, apps, and online spaces—the virtual contexts that command attention", "أجهزتك وتطبيقاتك ومساحاتك الإلكترونية—السياقات الافتراضية التي تستحوذ على الانتباه")}</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Physical Environment: Designing for Success", "البيئة المادية: التصميم من أجل النجاح")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Your physical environment constantly cues certain behaviors and inhibits others. Research by Brian Wansink at Cornell University demonstrated that environmental factors like plate size, food visibility, and package design significantly influence eating behavior—often more than conscious intentions.",
                "تُحفّز بيئتك المادية باستمرار سلوكيات معينة وتثبط أخرى. أظهرت أبحاث برايان وانسينك في جامعة كورنيل أن العوامل البيئية مثل حجم الطبق ووضوح الطعام وتصميم العبوة تؤثر بشكل كبير على سلوك الأكل—غالباً أكثر من النوايا الواعية."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The principle is simple: make desired behaviors visible, accessible, and frictionless; make undesired behaviors invisible, inconvenient, and friction-heavy. This is the essence of \"choice architecture\"—designing environments that nudge behavior in positive directions.",
                "المبدأ بسيط: اجعل السلوكيات المرغوبة مرئية ومتاحة وخالية من العوائق؛ واجعل السلوكيات غير المرغوبة غير مرئية وغير مريحة ومليئة بالعوائق. هذا هو جوهر \"هندسة الاختيار\"—تصميم بيئات تدفع السلوك في اتجاهات إيجابية."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("Physical Environment Audit Prompts", "محفزات تدقيق البيئة المادية")}</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("What objects in your space cue desired behaviors?", "ما الأشياء في مساحتك التي تحفز السلوكيات المرغوبة؟")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("What objects cue undesired behaviors?", "ما الأشياء التي تحفز السلوكيات غير المرغوبة؟")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Where do you spend most of your time?", "أين تقضي معظم وقتك؟")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("What's the friction level for your target behaviors?", "ما مستوى العوائق لسلوكياتك المستهدفة؟")}</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Social Environment: The Company You Keep", "البيئة الاجتماعية: الرفقة التي تحتفظ بها")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Social psychologists have long known that behavior is contagious. A seminal study by Nicholas Christakis and James Fowler, published in the New England Journal of Medicine, showed that health behaviors spread through social networks—your friends' friends' friends can influence your health.",
                "علماء النفس الاجتماعي يعرفون منذ فترة طويلة أن السلوك مُعدٍ. أظهرت دراسة رائدة لنيكولاس كريستاكيس وجيمس فاولر، منشورة في مجلة نيو إنغلاند للطب، أن السلوكيات الصحية تنتشر عبر الشبكات الاجتماعية—أصدقاء أصدقاء أصدقائك يمكنهم التأثير على صحتك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The social environment shapes identity through modeling, norms, and reinforcement. If everyone around you exercises, exercises becomes normal. If everyone around you complains, complaining becomes normal. Your social environment is constantly teaching you who you should be.",
                "تشكّل البيئة الاجتماعية الهوية من خلال النمذجة والمعايير والتعزيز. إذا كان كل من حولك يمارسون الرياضة، تصبح الرياضة طبيعية. إذا كان كل من حولك يتذمر، يصبح التذمر طبيعياً. بيئتك الاجتماعية تعلمك باستمرار من يجب أن تكون."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Environmental Audit includes assessment of your social environment: who supports your desired identity, who undermines it, and what communities might provide the reinforcement you need for transformation.",
                "يتضمن التدقيق البيئي تقييم بيئتك الاجتماعية: من يدعم هويتك المرغوبة، من يقوضها، وما المجتمعات التي قد توفر التعزيز الذي تحتاجه للتحول."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Digital Environment: Taming the Attention Economy", "البيئة الرقمية: ترويض اقتصاد الانتباه")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "In the modern era, your digital environment may be the most influential context of all. Research shows that the average person checks their phone 96 times per day—once every 10 minutes of waking life. Each notification, app icon, and social media feed shapes your attention, mood, and behavior.",
                "في العصر الحديث، قد تكون بيئتك الرقمية أكثر السياقات تأثيراً على الإطلاق. تُظهر الأبحاث أن الشخص العادي يتحقق من هاتفه ٩٦ مرة في اليوم—مرة كل ١٠ دقائق من وقت اليقظة. كل إشعار وأيقونة تطبيق وخلاصة وسائل التواصل الاجتماعي تشكّل انتباهك ومزاجك وسلوكك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Tristan Harris, former Google design ethicist and founder of the Center for Humane Technology, warns that our devices are designed to exploit psychological vulnerabilities. Without intentional design, your digital environment works against your goals rather than for them.",
                "يحذر تريستان هاريس، أخلاقي التصميم السابق في جوجل ومؤسس مركز التكنولوجيا الإنسانية، أن أجهزتنا مصممة لاستغلال نقاط الضعف النفسية. بدون تصميم مقصود، تعمل بيئتك الرقمية ضد أهدافك بدلاً من العمل لصالحها."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Settings className="h-5 w-5" />
              <span className="font-semibold">{getText("The Digital Design Principle", "مبدأ التصميم الرقمي")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The worksheet guides you through auditing your digital spaces: which apps serve your identity goals, which drain your time and energy, and how to restructure your digital environment to support transformation.",
                "ترشدك ورقة العمل خلال تدقيق مساحاتك الرقمية: أي التطبيقات تخدم أهداف هويتك، أيها تستنزف وقتك وطاقتك، وكيف تعيد هيكلة بيئتك الرقمية لدعم التحول."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Environment-Behavior Loop", "حلقة البيئة والسلوك")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Behavior creates environmental changes, which then influence future behavior. This feedback loop can work for or against you. When you clean your desk, the improved environment makes focused work easier, which reinforces the tidiness habit. Conversely, clutter begets more clutter.",
                "يخلق السلوك تغييرات بيئية، والتي تؤثر بدورها على السلوك المستقبلي. يمكن أن تعمل حلقة التغذية الراجعة هذه لصالحك أو ضدك. عندما تنظف مكتبك، تجعل البيئة المحسّنة العمل المركز أسهل، مما يعزز عادة الترتيب. على العكس، الفوضى تلد مزيداً من الفوضى."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Understanding this loop reveals why environment design is so powerful: small environmental changes create cascading effects that compound over time. One-time setup investments yield ongoing behavioral dividends.",
                "فهم هذه الحلقة يكشف لماذا التصميم البيئي قوي جداً: التغييرات البيئية الصغيرة تخلق آثاراً متتالية تتراكم بمرور الوقت. استثمارات الإعداد لمرة واحدة تنتج أرباحاً سلوكية مستمرة."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("What's Included in the Environmental Audit", "ما هو المضمّن في التدقيق البيئي")}</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Comprehensive physical space assessment and redesign prompts", "تقييم شامل للمساحة المادية ومحفزات إعادة التصميم")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Social network mapping and influence evaluation", "رسم خرائط الشبكة الاجتماعية وتقييم التأثير")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Digital environment audit and optimization guide", "تدقيق البيئة الرقمية ودليل التحسين")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Implementation plan for environmental changes", "خطة تنفيذ للتغييرات البيئية")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Progress tracking templates for ongoing optimization", "قوالب تتبع التقدم للتحسين المستمر")}</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("From Insight to Environmental Design", "من البصيرة إلى التصميم البيئي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Environmental Audit Worksheet doesn't just identify problems—it provides a framework for solutions. Each audit section includes specific intervention strategies backed by behavioral science research.",
                "ورقة عمل التدقيق البيئي لا تحدد المشاكل فقط—بل توفر إطاراً للحلول. يتضمن كل قسم من أقسام التدقيق استراتيجيات تدخل محددة مدعومة بأبحاث العلوم السلوكية."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The worksheet guides you through what researchers call \"implementation intentions\"—specific plans that link situations to behaviors. When you decide in advance how you'll restructure your environment, you remove decision fatigue from the equation.",
                "ترشدك ورقة العمل خلال ما يسميه الباحثون \"نوايا التنفيذ\"—خطط محددة تربط المواقف بالسلوكيات. عندما تقرر مسبقاً كيف ستعيد هيكلة بيئتك، تزيل إرهاق القرارة من المعادلة."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <ArrowUpRight className="h-5 w-5" />
              <span className="font-semibold">{getText("The Environment First Principle", "مبدأ البيئة أولاً")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When behavior change fails, most people blame themselves—not enough willpower, not enough motivation. But research suggests a different approach: blame the environment first. If the environment makes the desired behavior difficult, willpower will always lose eventually.",
                "عندما يفشل تغيير السلوك، يلوم معظم الناس أنفسهم—لا ما يكفي من قوة الإرادة، لا ما يكفي من الدافع. لكن الأبحاث تقترح مقاربة مختلفة: لُم البيئة أولاً. إذا كانت البيئة تجعل السلوك المرغوب صعباً، ستخسر قوة الإرادة في النهاية دائماً."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "Your environment is always working, always influencing, always shaping. The question isn't whether your environment affects you—it's whether you've designed it to work for your goals or against them. The Environmental Audit gives you the tools to make your environment your greatest ally in identity transformation.",
                "بيئتك تعمل دائماً، تؤثر دائماً، تشكّل دائماً. السؤال ليس ما إذا كانت بيئتك تؤثر عليك—بل هل صممتها لكي تعمل لصالح أهدافك أم ضدها. يمنحك التدقيق البيئي الأدوات لجعل بيئتك أعظم حليف لك في تحول الهوية."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <MidArticleUpgrade promoteTier="BASIC" variant="minimal" />
      <BlogArticleCTA ctaType="free" />

      <ArticleNavigation currentSlug="environmental-audit-worksheet" />

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

