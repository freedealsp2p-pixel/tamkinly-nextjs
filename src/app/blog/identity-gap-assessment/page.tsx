'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Brain, Target, TrendingUp, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function IdentityGapAssessmentArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Self-Assessment", "التقييم الذاتي")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The Identity Gap Assessment: Measuring Who You Are vs. Who You Want to Be", "تقييم فجوة الهوية: قياس من أنت مقابل من تريد أن تكون")}
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
                "The distance between your current self and your ideal self isn't just a philosophical concept—it's a measurable gap that research shows directly impacts your mental health, motivation, and life satisfaction.",
                "المسافة بين ذاتك الحالية وذاتك المثالية ليست مجرد مفهوم فلسفي—إنها فجوة قابلة للقياس تُظهر الأبحاث أنها تؤثر مباشرة على صحتك النفسية ودافعك ورضاك عن الحياة. وهذا المفهوم يتجلى بوضوح في الفكر العربي الإسلامي، حيث تحدّث ابن خلدون عن «العصبية» كقوة تجذب الإنسان نحو هويته الأصلية، وتحدّث الغزالي عن «المقامات» كمراحل للارتقاء الروحي — ففكرة الفجوة بين الحالي والمثالي ليست غريبة على تراثنا، بل هي جوهر الطريق إلى التحقق."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "A groundbreaking study published in Frontiers in Psychology (2020) found that \"identity gaps\"—the discrepancies between how we see ourselves and how we want to be seen—are significantly associated with depression symptoms. The larger the gap, the greater the psychological distress.",
                "وجدت دراسة رائدة منشورة في مجلة Frontiers in Psychology (٢٠٢٠) أن \"فجوات الهوية\"—التناقضات بين كيفية رؤيتنا لأنفسنا وكيف نريد أن يرانا الآخرون—مرتبطة بشكل كبير بأعراض الاكتئاب. كلما كبرت الفجوة، زاد الضيق النفسي."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("What Is an Identity Gap?", "ما هي فجوة الهوية؟")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Your identity gap represents the space between your actual self (who you currently are) and your ideal self (who you aspire to become). This isn't about self-criticism—it's about honest self-assessment. The research shows that acknowledging this gap is the first step toward closing it.",
                "تمثل فجوة الهوية المسافة بين ذاتك الفعلية (من أنت حالياً) وذاتك المثالية (من تتطلع لأن تصبح). هذا ليس عن انتقاد الذات—بل عن التقييم الذاتي الصادق، تماماً كما قال الحسن البصري: «لا يُصلح آخر هذه الأمة إلا ما أصلح أولها» — أي أن معرفة أين تقف هي شرط التقدم. تُظهر الأبحاث أن الاعتراف بهذه الفجوة هو الخطوة الأولى نحو إغلاقها."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "According to identity theory developed by Burkitt (2008) and expanded by scholars like McLean and Syed, our identity isn't fixed—it's a dynamic construction that we continuously negotiate through our actions, relationships, and self-reflection. The identity gap exists because we're always in a state of becoming.",
                "وفقاً لنظرية الهوية التي طورها بوركيت (٢٠٠٨) ووسعها باحثون مثل ماكلين وسيد، هويتنا ليست ثابتة—إنها بناء ديناميكي نتفاوض عليه باستمرار من خلال أفعالنا وعلاقاتنا وتأملنا الذاتي. فجوة الهوية موجودة لأننا دائماً في حالة صيرورة."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"The self is not something ready-made, but something in continuous formation through choice of action.\" — John Dewey",
                  "\"الذات ليست شيئاً جاهزاً، بل شيء يتشكل باستمرار من خلال اختيار الفعل.\" — جون ديوي"
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Four Dimensions of Identity Alignment", "الأبعاد الأربعة لمحاذاة الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research in self-concept and identity development has identified several key dimensions that determine how aligned you are with your ideal identity. Our Identity Gap Assessment measures four critical areas:",
                "حددت الأبحاث في المفهوم الذاتي وتطور الهوية عدة أبعاد رئيسية تحدد مدى توافقك مع هويتك المثالية. يقيس تقييم فجوة الهوية لدينا أربعة مجالات حرجة:"
              )}
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Self-Trust", "الثقة بالنفس")}</h3>
                  <p className="text-sm text-slate-600">
                    {getText(
                      "Your ability to trust your own judgment and keep the promises you make to yourself. Research shows self-trust is foundational to identity coherence.",
                      "قدرتك على الثقة بحكمك الخاص والوفاء بالوعود التي تقطعها لنفسك. تُظهر الأبحاث أن الثقة بالنفس هي أساس تماسك الهوية. وفي التراث الإسلامي، يرتبط هذا المفهوم بـ«الأمانة مع النفس» — فمن لا يفي بما يعد به لنفسه يفقد الثقة بذاته، والثقة بالذات هي أول درجات التمكين."
                    )}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Clarity", "الوضوح")}</h3>
                  <p className="text-sm text-slate-600">
                    {getText(
                      "How clearly you can envision who you want to become and what you truly value. Studies link identity clarity to higher well-being and purpose.",
                      "مدى وضوح رؤيتك لمن تريد أن تصبح وما تقدره حقاً. تربط الدراسات وضوح الهوية بمستوى أعلى من الرفاهية والهدف."
                    )}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#2A8A94]/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-[#2A8A94]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Alignment", "المحاذاة")}</h3>
                  <p className="text-sm text-slate-600">
                    {getText(
                      "The match between your daily actions and your stated values. Misalignment creates cognitive dissonance and undermines identity development.",
                      "مدى التوافق بين أفعالك اليومية وقيمك المعلنة. عدم المحاذاة يخلق تنافراً معرفياً ويقوض تطور الهوية."
                    )}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#2A8A94]/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-[#2A8A94]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Consistency", "الاتساق")}</h3>
                  <p className="text-sm text-slate-600">
                    {getText(
                      "Your ability to follow through on commitments regardless of motivation. Consistency builds identity evidence and reinforces neural pathways.",
                      "قدرتك على الالتزام بالعهود بغض النظر عن الدافع. الاتساق يبني أدلة الهوية ويعزز المسارات العصبية. وكما قال علي بن أبي طالب رضي الله عنه: «لا تكن ممن يرجو الآخرة بغير عمل» — فالاتساق في العمل هو الجسر بين النية والتحقق، وبين الهوية المأمولة والهوية المتحققة."
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Science Behind Identity Gaps and Mental Health", "العلم وراء فجوات الهوية والصحة النفسية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Frontiers in Psychology study (2020) by Jiyoung Park and colleagues examined how identity gaps relate to depression. Their findings were striking: individuals with larger discrepancies between their actual and ideal selves reported significantly higher levels of depressive symptoms.",
                "فحصت دراسة Frontiers in Psychology (٢٠٢٠) لجيونغ بارك وزملائها كيف ترتبط فجوات الهوية بالاكتئاب. كانت نتائجهم مذهلة: الأفراد ذوو التناقضات الأكبر بين ذواتهم الفعلية والمثالية أبلغوا عن مستويات أعلى بكثير من أعراض الاكتئاب."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "But here's the empowering insight: the research also found that awareness of the gap—consciously acknowledging it—was the first step toward reducing it. Those who understood their identity gaps were better positioned to take action.",
                "لكن إليك البصيرة التمكينية: وجدت الأبحاث أيضاً أن الوعي بالفجوة—الاعتراف بها بوعي—كان الخطوة الأولى نحو تقليلها. كان الأشخاص الذين فهموا فجوات هويتهم في وضع أفضل لاتخاذ الإجراءات. وهذا يتوافق مع مبدأ «المحاسبة» في التراث الإسلامي — محاسبة النفس قبل أن تُحاسب، ومعرفة مواطن الضعف قبل أن تصبح هوة سحيقة. فالعلاج يبدأ بالتشخيص."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This aligns with Self-Discrepancy Theory developed by Edward Higgins (1987), which proposes that different types of self-discrepancies create different emotional vulnerabilities. The gap between actual and ideal selves relates to dejection-related emotions (disappointment, sadness), while the gap between actual and ought selves relates to agitation-related emotions (fear, anxiety).",
                "يتوافق هذا مع نظرية التناقض الذاتي التي طورها إدوارد هيغينز (١٩٨٧)، والتي تقترح أن أنواعاً مختلفة من التناقضات الذاتية تخلق نقاط ضعف عاطفية مختلفة. ترتبط الفجوة بين الذات الفعلية والمثالية بالمشاعر المتعلقة بالإحباط (خيبة الأمل، الحزن)، بينما ترتبط الفجوة بين الذات الفعلية والذات الواجبة بالمشاعر المتعلقة بالقلق (الخوف، القلق)."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("What the Assessment Reveals", "ما يكشفه التقييم")}</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span>{getText("Your overall identity gap percentage—how much room for growth exists", "نسبة فجوة الهوية الإجمالية لديك—كم مساحة للنمو متاحة")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span>{getText("Your dominant growth area—the dimension with the most opportunity for transformation", "مجال نموك المهيمن—البعد الذي يحتوي على أكبر فرصة للتحول")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span>{getText("Dimension-specific scores across self-trust, clarity, alignment, and consistency", "درجات محددة لكل بُعد عبر الثقة بالنفس والوضوح والمحاذاة والاتساق")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span>{getText("Actionable insights tailored to your unique gap profile", "رؤى قابلة للتنفيذ مصممة خصيصاً لملف الفجوة الفريد لديك")}</span>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why Measurement Matters", "لماذا يهم القياس")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "In behavioral psychology, there's a principle known as the Hawthorne Effect: people change their behavior when they know they're being observed. The Identity Gap Assessment creates a similar effect—by measuring your alignment, you become more conscious of it.",
                "في علم النفس السلوكي، هناك مبدأ يُعرف بتأثير هوثورن: يغيّر الناس سلوكهم عندما يعلمون أنهم تحت الملاحظة. يخلق تقييم فجوة الهوية تأثيراً مشابهاً—من خلال قياس محاذاتك، تصبح أكثر وعياً بها."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "James Clear, author of Atomic Habits, emphasizes that identity change starts with awareness. You can't change what you don't measure. The assessment provides a baseline—a starting point from which all progress can be tracked.",
                "يشدد جيمس كلير، مؤلف كتاب العادات الذرية، على أن تغيير الهوية يبدأ بالوعي. لا يمكنك تغيير ما لا تقيسه. يوفر التقييم خط أساس—نقطة بداية يمكن من خلالها تتبع كل التقدم."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research on self-monitoring by psychologist Mark Snyder (1974) shows that individuals who regularly assess their behavior are better at aligning their actions with their goals. The Identity Gap Assessment makes this process systematic and measurable.",
                "تُظهر أبحاث المراقبة الذاتية للعالم النفسي مارك سنايدر (١٩٧٤) أن الأفراد الذين يقيّمون سلوكهم بانتظام أفضل في محاذاة أفعالهم مع أهدافهم. يجعل تقييم فجوة الهوية هذه العملية منهجية وقابلة للقياس."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-4">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">{getText("FREE Assessment Available", "تقييم مجاني متاح")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Identity Gap Assessment is available at no cost. In just 3 minutes, you'll receive a comprehensive analysis of where you are versus where you want to be—across all four critical dimensions of identity alignment.",
                "يتوفر تقييم فجوة الهوية بدون تكلفة. في ٣ دقائق فقط، ستحصل على تحليل شامل لأين أنت مقابل أين تريد أن تكون—عبر جميع الأبعاد الأربعة الحرجة لمحاذاة الهوية."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("From Assessment to Action", "من التقييم إلى الفعل")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Completing the assessment is just the beginning. The real transformation happens when you use the insights to guide your daily actions. Here's how the assessment connects to tangible change:",
                "إكمال التقييم هو مجرد البداية. يحدث التحول الحقيقي عندما تستخدم الرؤى لتوجيه أفعالك اليومية. إليك كيف يرتبط التقييم بالتغيير الملموس:"
              )}
            </p>

            <div className="space-y-4 my-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("Identify Your Growth Edge", "حدد حافة نموك")}</h4>
                  <p className="text-slate-600 text-sm">
                    {getText(
                      "The assessment highlights your dominant growth area—the dimension where improvement will have the greatest impact on your overall identity alignment.",
                      "يسلط التقييم الضوء على مجال نموك المهيمن—البعد الذي سيكون للتحسين فيه التأثير الأكبر على محاذاة هويتك الإجمالية."
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("Set Evidence-Based Goals", "ضع أهدافاً مبنية على الأدلة")}</h4>
                  <p className="text-slate-600 text-sm">
                    {getText(
                      "With measurable scores, you can set specific targets for improvement and track your progress over time.",
                      "بدرجات قابلة للقياس، يمكنك تحديد أهداف محددة للتحسين وتتبع تقدمك بمرور الوقت."
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">{getText("Connect to Transformation Tools", "اتصل بأدوات التحول")}</h4>
                  <p className="text-slate-600 text-sm">
                    {getText(
                      "Your results point you toward specific tools and systems designed to close the gap in your dominant growth area.",
                      "تشير نتائجك إلى أدوات وأنظمة محددة مصممة لسد الفجوة في مجال نموك المهيمن."
                    )}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The assessment is part of Tamkinly's FREE tier—our commitment to making evidence-based identity transformation accessible to everyone. Because everyone deserves the clarity that comes from understanding where they are and where they're headed.",
                "التقييم جزء من المستوى المجاني من تمكنلي—التزامنا بجعل تحول الهوية المبني على الأدلة متاحاً للجميع. لأن الجميع يستحقون الوضوح الذي يأتي من فهم أين هم وإلى أين يتجهون."
              )}
            </p>

            <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] p-8 rounded-xl my-10 text-center">
              <h3 className="text-white text-xl font-bold mb-3">{getText("Take the FREE Assessment", "خذ التقييم المجاني")}</h3>
              <p className="text-slate-300 mb-6">
                {getText("Discover your identity gap in just 3 minutes. No signup required.", "اكتشف فجوة هويتك في ٣ دقائق فقط. لا يتطلب تسجيلاً.")}
              </p>
              <Link href="/quiz">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  {getText("Start Assessment", "ابدأ التقييم")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "Understanding your identity gap isn't about judgment—it's about awareness. It's about having the information you need to make conscious choices about who you're becoming. The gap exists whether you measure it or not. Measuring it simply gives you the power to close it.",
                "فهم فجوة هويتك ليس عن الحكم—بل عن الوعي. إنه عن امتلاك المعلومات التي تحتاجها لاتخاذ خيارات واعية حول من تصبح. الفجوة موجودة سواء قستها أم لا. قياسها ببساطة يمنحك القدرة على إغلاقها."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleReferences slug="identity-gap-assessment" />

      <MidArticleUpgrade promoteTier="BASIC" variant="minimal" />
      <BlogArticleCTA ctaType="quiz" />

      <ArticleNavigation currentSlug="identity-gap-assessment" />
        <BlogConversionSection />
      </article>
  );
}

