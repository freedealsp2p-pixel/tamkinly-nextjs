'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Target, Zap, RefreshCw, CheckCircle, ArrowUpRight } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function IdentityBasedHabitsWorksheetArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "who-am-i-worksheet", title: getText("The \"Who Am I?\" Self-Discovery Worksheet", "ورقة عمل \"من أنا؟\" لاكتشاف الذات"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "physics-of-momentum", title: getText("The Physics of Momentum: Why 18 Minutes Changes Everything", "فيزياء الزخم: لماذا تغيّر ١٨ دقيقة كل شيء"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "environmental-audit-worksheet", title: getText("Environmental Audit: Designing Your Surroundings for Change", "التدقيق البيئي: تصميم محيطك للتغيير"), readTime: getText("9 min read", "٩ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Habit Formation", "تكوين العادات")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Identity-Based Habits: Transforming Change from the Inside Out", "العادات القائمة على الهوية: تحويل التغيير من الداخل إلى الخارج")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("10 min read", "١٠ دقائق قراءة")}
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
                "\"Every action you take is a vote for the type of person you wish to become.\" This single sentence from James Clear's bestselling book Atomic Habits captures a revolutionary insight: lasting change doesn't come from focusing on what you want to achieve—it comes from focusing on who you want to become.",
                "\"كل فعل تقوم به هو صوت لصالح نوع الشخص الذي ترغب في أن تصبحه.\" هذه الجملة الواحدة من كتاب جيمس كلير الأكثر مبيعاً العادات الذرية تلتقط رؤية ثورية: التغيير الدائم لا يأتي من التركيز على ما تريد تحقيقه—بل يأتي من التركيز على من تريد أن تصبح."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The shift from outcome-based to identity-based habits represents one of the most significant advances in behavior change science. Research published in the European Journal of Social Psychology by BPS (British Psychological Society) found that participants who framed their actions in identity terms (\"I am a non-smoker\") were significantly more successful than those who used resistance language (\"I don't smoke\" or \"I can't smoke\").",
                "يمثل التحول من العادات القائمة على النتائج إلى العادات القائمة على الهوية أحد أبرز التطورات في علم تغيير السلوك. وجدت أبحاث منشورة في المجلة الأوروبية لعلم النفس الاجتماعي أن المشاركين الذين صاغوا أفعالهم بمصطلحات الهوية (\"أنا غير مدخن\") كانوا أكثر نجاحاً بشكل ملحوظ من أولئك الذين استخدموا لغة المقاومة (\"أنا لا أدخن\" أو \"لا يمكنني التدخين\")."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Three Layers of Behavior Change", "طبقات تغيير السلوك الثلاث")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Clear's framework identifies three concentric circles of change. Most people approach transformation from the outside in—focusing on outcomes first. But the most effective approach works from the inside out:",
                "يحدد إطار كلير ثلاث دوائر متداخلة للتغيير. يتعامل معظم الناس مع التحول من الخارج إلى الداخل—مركزين على النتائج أولاً. لكن المقاربة الأكثر فعالية تعمل من الداخل إلى الخارج:"
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Outcomes", "النتائج")}</h3>
                  <p className="text-sm text-slate-600">{getText("What you want to achieve (lose 20 pounds, write a book)", "ما تريد تحقيقه (خسارة ٩ كيلو، كتابة كتاب)")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Processes", "العمليات")}</h3>
                  <p className="text-sm text-slate-600">{getText("What you do (exercise daily, write every morning)", "ما تفعله (ممارسة الرياضة يومياً، الكتابة كل صباح)")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Identity", "الهوية")}</h3>
                  <p className="text-sm text-slate-600">{getText("What you believe (I am fit, I am a writer)", "ما تؤمن به (أنا لائق، أنا كاتب)")}</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "\"Outcomes are about what you get. Processes are about what you do. Identity is about what you believe,\" Clear explains. \"With outcome-based habits, the focus is on what you want to achieve. With identity-based habits, the focus is on who you wish to become.\"",
                "\"النتائج تتعلق بما تحصل عليه. العمليات تتعلق بما تفعله. الهوية تتعلق بما تؤمن به،\" يشرح كلير. \"مع العادات القائمة على النتائج، يكون التركيز على ما تريد تحقيقه. مع العادات القائمة على الهوية، يكون التركيز على من ترغب في أن تصبح.\""
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Psychology of Identity-Based Change", "علم نفس التغيير القائم على الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The scientific foundation for identity-based habits draws from self-perception theory, developed by Daryl Bem in the 1960s. This theory suggests that we learn about ourselves by observing our own behavior, much like we learn about others by watching what they do.",
                "الأساس العلمي للعادات القائمة على الهوية يستلهم من نظرية الإدراك الذاتي، التي طورها داريل بيم في الستينيات. تقترح هذه النظرية أننا نتعرف على أنفسنا من خلال ملاحظة سلوكنا الخاص، تماماً كما نتعرف على الآخرين بمشاهدة ما يفعلونه."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When you perform an action repeatedly, you begin to see yourself as someone who does that thing. The action creates evidence for a new identity. As this evidence accumulates, your self-concept shifts to accommodate your behavior.",
                "عندما تؤدي فعلاً بشكل متكرر، تبدأ في رؤية نفسك كشخص يفعل ذلك الشيء. يخلق الفعل دليلاً لهوية جديدة. مع تراكم هذا الدليل، يتغير مفهومك عن نفسك لاستيعاب سلوكك."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"The more you repeat a behavior, the more you reinforce the identity associated with that behavior. In fact, the word identity originally meant 'repeated beingness.'\" — James Clear, Atomic Habits",
                  "\"كلما كررت سلوكاً أكثر، كلما عززت الهوية المرتبطة بذلك السلوك أكثر. في الواقع، كلمة الهوية كانت تعني أصلاً 'الكينونة المتكررة.'\" — جيمس كلير، العادات الذرية"
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Evidence Accumulation Model", "نموذج تراكم الأدلة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Your identity is not fixed—it's a running tally of the choices you've made. This understanding transforms how we approach habit formation. Instead of relying on willpower, we focus on casting votes for our desired identity.",
                "هويتك ليست ثابتة—إنها تعداد جارٍ للخيارات التي اتخذتها. هذا الفهم يحوّل كيفية مقاربتنا لتكوين العادات. بدلاً من الاعتماد على قوة الإرادة، نركز على الإدلاء بأصواتنا لصالح هويتنا المرغوبة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "A study in the Journal of Personality and Social Psychology found that behavior consistent with one's identity is performed with greater automaticity and less internal conflict. When an action aligns with who you believe you are, it requires less cognitive effort to perform.",
                "وجدت دراسة في مجلة الشخصية وعلم النفس الاجتماعي أن السلوك المتسق مع هوية الفرد يُؤدى بأتمتة أكبر وصراع داخلي أقل. عندما يتوافق الفعل مع من تعتقد أنك هو، فإنه يتطلب جهداً معرفياً أقل للتنفيذ."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("The Identity Shift Protocol", "بروتوكول تحول الهوية")}</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span>{getText("<strong>Decide the type of person you want to be.</strong> What does a healthy person do? What does a productive person do?", "<strong>قرر نوع الشخص الذي تريد أن تكونه.</strong> ماذا يفعل الشخص الصحي؟ ماذا يفعل الشخص المنتج؟")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span>{getText("<strong>Prove it to yourself with small wins.</strong> Start with tiny actions that cast votes for your new identity.", "<strong>أثبت ذلك لنفسك بانتصارات صغيرة.</strong> ابدأ بأفعال ضئيلة تدلي بأصواتها لهويتك الجديدة.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span>{getText("<strong>Let the evidence accumulate.</strong> Each repetition adds weight to your new self-concept.", "<strong>دع الأدلة تتراكم.</strong> كل تكرار يضيف وزناً لمفهومك الذاتي الجديد.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span>{getText("<strong>Watch the identity solidify.</strong> Over time, the behavior becomes automatic because it's who you are.", "<strong>راقب الهوية وهي تتصلب.</strong> بمرور الوقت، يصبح السلوك تلقائياً لأنه أصبح جزءاً منك.")}</span>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Two-Step Process", "العملية ذات الخطوتين")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Clear presents a deceptively simple framework for identity transformation: decide the type of person you want to be, then prove it to yourself with small wins. The elegance of this approach lies in its psychological sophistication.",
                "يقدم كلير إطاراً بسيطاً مضللاً لتحول الهوية: قرر نوع الشخص الذي تريد أن تكونه، ثم أثبت ذلك لنفسك بانتصارات صغيرة. تكمن أناقة هذه المقاربة في تعقيداها النفسي."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The first step addresses identity—what Clear calls \"the deepest level of change.\" When you clarify the type of person you want to become, you create a reference point for decision-making. Every choice becomes an opportunity to move toward or away from that identity.",
                "تعالج الخطوة الأولى الهوية—ما يسميه كلير \"أعمق مستوى من التغيير.\" عندما توضح نوع الشخص الذي تريد أن تصبحه، تنشئ نقطة مرجعية لصنع القرار. يصبح كل خيار فرصة للتحرك نحو تلك الهوية أو الابتعاد عنها."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The second step leverages the power of small wins. Research by Teresa Amabile at Harvard Business School found that small achievements create momentum and motivation far disproportionate to their size. Each tiny victory provides psychological fuel for continued progress.",
                "تستفيد الخطوة الثانية من قوة الانتصارات الصغيرة. وجدت أبحاث تيريزا أمابيلي في كلية هارفارد للأعمال أن الإنجازات الصغيرة تخلق زخماً ودافعاً يفوق حجمها بكثير. كل انتصار صغير يوفر وقوداً نفسياً لمواصلة التقدم."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <ArrowUpRight className="h-5 w-5" />
              <span className="font-semibold">{getText("The Progress Principle", "مبدأ التقدم")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Amabile's research reveals that the most powerful motivator isn't external rewards—it's the sense of progress on meaningful work. When you track small wins aligned with your desired identity, you generate intrinsic motivation that sustains long-term change.",
                "تكشف أبحاث أمابيلي أن أقوى محفز ليس المكافآت الخارجية—بل الإحساس بالتقدم في عمل ذي معنى. عندما تتتبع الانتصارات الصغيرة المتوافقة مع هويتك المرغوبة، تولد دافعاً داخلياً يبقي التغيير طويل الأمد."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Identity Statements vs. Goals", "بيانات الهوية مقابل الأهداف")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Traditional goal-setting focuses on outcomes: \"I want to run a marathon.\" Identity-based habits focus on the person behind the goal: \"I am a runner.\" This distinction has profound implications for behavior change.",
                "تركز設定 الأهداف التقليدية على النتائج: \"أريد أن أركض ماراثوناً.\" العادات القائمة على الهوية تركز على الشخص وراء الهدف: \"أنا عدّاء.\" هذا التمييز له آثار عميقة على تغيير السلوك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When you identify as a runner, running becomes something you do naturally, not something you force yourself to do. The behavior flows from your identity rather than requiring constant willpower and self-control.",
                "عندما تحدد هويتك كعدّاء، يصبح الجري شيئاً تفعله طبيعياً، وليس شيئاً تجبر نفسك على فعله. يتدفق السلوك من هويتك بدلاً من أن يتطلب قوة إرادة وضبطاً للنفس مستمرين."
              )}
            </p>

            <div className="overflow-x-auto my-8">
              <table className="min-w-full bg-white border border-slate-200 rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">{getText("Goal Approach", "مقاربة الأهداف")}</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">{getText("Identity Approach", "مقاربة الهوية")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-600">{getText("\"I want to read more books\"", "\"أريد أن أقرأ المزيد من الكتب\"")}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{getText("\"I am a reader\"", "\"أنا قارئ\"")}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-600">{getText("\"I want to lose weight\"", "\"أريد أن أفقد وزناً\"")}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{getText("\"I am a healthy person\"", "\"أنا شخص صحي\"")}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-600">{getText("\"I want to save money\"", "\"أريد أن أوفر المال\"")}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{getText("\"I am financially responsible\"", "\"أنا مسؤول مالياً\"")}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-600">{getText("\"I want to learn Spanish\"", "\"أريد أن أتعلم الإسبانية\"")}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{getText("\"I am a language learner\"", "\"أنا متعلم لغات\"")}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Identity-Based Habits Worksheet", "ورقة عمل العادات القائمة على الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Our worksheet guides you through the complete process of developing identity-based habits. It includes exercises for clarifying your desired identity, identifying identity-aligned behaviors, and tracking your progress as evidence accumulates.",
                "ترشدك ورقة العمل لدينا خلال العملية الكاملة لتطوير العادات القائمة على الهوية. تتضمن تمارين لتوضيح هويتك المرغوبة وتحديد السلوكيات المتوافقة مع الهوية وتتبع تقدمك مع تراكم الأدلة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The worksheet structure ensures you don't skip the critical step of identity definition. Many people jump straight to behavior change without ever clarifying who they want to become. This shortcut leads to unsustainable change because the new behavior has no identity anchor.",
                "تضمن بنية ورقة العمل أنك لا تتخطى الخطوة الحاسمة لتحديد الهوية. يقفز كثير من الناس مباشرة إلى تغيير السلوك دون توضيح من يريدون أن يصبحوا أبداً. هذا الاختصار يؤدي إلى تغيير غير مستدام لأن السلوك الجديد لا يوجد له مرساة هوية."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("What's Included in the Worksheet", "ما هو المضمّن في ورقة العمل")}</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Identity clarification prompts to define who you want to become", "محفزات توضيح الهوية لتحديد من تريد أن تصبح")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Habit-stacking templates based on James Clear's methodology", "قوالب تكديس العادات المبنية على منهجية جيمس كلير")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Small wins tracking system to accumulate identity evidence", "نظام تتبع الانتصارات الصغيرة لتراكم أدلة الهوية")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Progress reflection questions to reinforce new identity", "أسئلة تأمل التقدم لتعزيز الهوية الجديدة")}</span>
                </li>
              </ul>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research consistently shows that structured approaches to behavior change outperform unstructured attempts. The worksheet provides the framework you need to implement identity-based habits systematically.",
                "تُظهر الأبحاث باستمرار أن المقاربات المنظمة لتغيير السلوك تتفوق على المحاولات غير المنظمة. توفر ورقة العمل الإطار الذي تحتاجه لتطبيق العادات القائمة على الهوية بشكل منهجي."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "The difference between who you are and who you want to be is not measured in grand gestures or dramatic transformations. It's measured in the quiet accumulation of small actions that cast votes for your new identity. Every repetition counts. Every choice matters. Start casting votes today.",
                "الفارق بين من أنت ومن تريد أن تكون لا يُقاس بالإيماءات الكبيرة أو التحولات الدرامية. بل يُقاس بالتراكم الهادئ للأفعال الصغيرة التي تدلي بأصواتها لهويتك الجديدة. كل تكرار يُحسب. كل خيار يهم. ابدأ بالإدلاء بأصواتك اليوم."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />

      <ArticleNavigation currentSlug="identity-based-habits-worksheet" />

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

