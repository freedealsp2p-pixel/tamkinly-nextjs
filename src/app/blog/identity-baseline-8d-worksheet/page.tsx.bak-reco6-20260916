'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Target, Layers, Brain, Heart, CheckCircle, Activity } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function IdentityBaseline8DWorksheetArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "who-am-i-worksheet", title: getText("The \"Who Am I?\" Self-Discovery Worksheet", "ورقة عمل \"من أنا؟\" لاكتشاف الذات"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "identity-based-habits-worksheet", title: getText("Identity-Based Habits: The James Clear Method", "العادات القائمة على الهوية: طريقة جيمس كلير"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "environmental-audit-worksheet", title: getText("Environmental Audit: Designing Your Surroundings for Change", "التدقيق البيئي: تصميم محيطك للتغيير"), readTime: getText("9 min read", "٩ دقائق قراءة") }
  ];

  const eightDimensions = [
    { title: getText("Physical", "الجسدي"), description: getText("Your relationship with your body, health, and physical environment", "علاقتك بجسدك وصحتك وبيئتك المادية") },
    { title: getText("Intellectual", "الذهني"), description: getText("Your relationship with learning, knowledge, and cognitive growth", "علاقتك بالتعلم والمعرفة والنمو المعرفي") },
    { title: getText("Emotional", "العاطفي"), description: getText("Your relationship with feelings, emotional expression, and regulation", "علاقتك بالمشاعر والتعبير العاطفي والتنظيم") },
    { title: getText("Social", "الاجتماعي"), description: getText("Your relationship with community, belonging, and social connection", "علاقتك بالمجتمع والانتماء والتواصل الاجتماعي") },
    { title: getText("Occupational", "المهني"), description: getText("Your relationship with work, career, and professional identity", "علاقتك بالعمل والمسيرة المهنية والهوية المهنية") },
    { title: getText("Spiritual", "الروحي"), description: getText("Your relationship with meaning, purpose, and values", "علاقتك بالمعنى والهدف والقيم") },
    { title: getText("Financial", "المالي"), description: getText("Your relationship with money, resources, and financial security", "علاقتك بالمال والموارد والأمان المالي") },
    { title: getText("Environmental", "البيئي"), description: getText("Your relationship with your surroundings and physical spaces", "علاقتك بمحيطك والمساحات المادية من حولك") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Identity Assessment", "تقييم الهوية")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The Identity Baseline 8D Framework: A Complete Self-Assessment", "إطار خط أساس الهوية ثماني الأبعاد: تقييم ذاتي شامل")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("8 min read", "٨ دقائق قراءة")}
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
                "True transformation requires a starting point. Before you can chart a course to who you want to become, you must understand who you are across every dimension of your life. The Identity Baseline 8D Framework provides that comprehensive foundation.",
                "التحول الحقيقي يتطلب نقطة بداية. قبل أن تتمكن من رسم مسار لمن تريد أن تصبح، يجب أن تفهم من أنت عبر كل بُعد من أبعاد حياتك. يوفر إطار خط أساس الهوية ثماني الأبعاد تلك الأساس الشامل."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This framework draws from multiple research traditions in psychology and wellness. The eight-dimensional model has roots in the wellness literature developed at institutions like the University of California, Davis, and has been validated through decades of application in counseling and personal development contexts.",
                "يستلهم هذا الإطار من تقاليد بحثية متعددة في علم النفس والرفاهية. يعود نموذج الأبعاد الثمانية إلى أدبيات الرفاهية المطورة في مؤسسات مثل جامعة كاليفورنيا في ديفيس، وقد تم التحقق منه عبر عقود من التطبيق في سياقات الإرشاد والتطوير الشخصي."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why Eight Dimensions?", "لماذا ثمانية أبعاد؟")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research on self-concept clarity shows that a fragmented understanding of oneself leads to poor decision-making, chronic dissatisfaction, and psychological distress. Most self-assessment tools focus on a single domain—career, health, or relationships—missing the interconnected nature of human identity.",
                "تُظهر أبحاث وضوح المفهوم الذاتي أن الفهم المفتت للذات يؤدي إلى ضعف صنع القرار والاستياء المزمن والضيق النفسي. تركز معظم أدوات التقييم الذاتي على مجال واحد—المسيرة المهنية أو الصحة أو العلاقات—فاقدة الطبيعة المترابطة للهوية البشرية."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The 8D framework recognizes that identity is multidimensional. Your professional struggles may stem from financial beliefs, which connect to family patterns, which influence your emotional regulation. Each dimension influences and is influenced by the others in a complex system.",
                "يدرك إطار الأبعاد الثمانية أن الهوية متعددة الأبعاد. قد تنبع صراعاتك المهنية من معتقدات مالية، التي ترتبط بأنماط عائلية، التي تؤثر على تنظيمك العاطفي. كل بُعد يؤثر ويتأثر بالأبعاد الأخرى في نظام معقد."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"You cannot change what you do not measure, and you cannot measure what you do not define. The eight dimensions provide both definition and measurement for comprehensive self-assessment.\"",
                  "\"لا يمكنك تغيير ما لا تقيسه، ولا يمكنك قياس ما لا تحدده. الأبعاد الثمانية توفر التحديد والقياس معاً للتقييم الذاتي الشامل.\""
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Eight Dimensions of Identity", "أبعاد الهوية الثمانية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Each dimension represents a distinct domain of identity, yet all are interconnected. Research shows that interventions targeting one dimension often produce positive effects across others—evidence of the holistic nature of human identity.",
                "يمثل كل بُعد مجالاً متميزاً للهوية، ومع ذلك جميعها مترابطة. تُظهر الأبحاث أن التدخلات التي تستهدف بُعداً واحداً غالباً ما تنتج آثاراً إيجابية عبر الأبعاد الأخرى—دليل على الطبيعة الشمولية للهوية البشرية."
              )}
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-10">
              {eightDimensions.map((dim, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-accent">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{dim.title}</h3>
                        <p className="text-sm text-slate-600">{dim.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Science of Holistic Self-Assessment", "علم التقييم الذاتي الشمولي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The value of multi-dimensional self-assessment is supported by research in several fields. Studies in health psychology demonstrate that interventions addressing multiple life domains produce more sustainable behavior change than single-domain approaches.",
                "قيمة التقييم الذاتي متعدد الأبعاد مدعومة بأبحاث في عدة مجالات. تُظهر الدراسات في علم نفس الصحة أن التدخلات التي تعالج مجالات حياتية متعددة تنتج تغييراً سلوكياً أكثر استدامة من المقاربات أحادية المجال."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "A comprehensive review published in the Annual Review of Psychology found that life satisfaction depends on perceived balance across domains, not just achievement in any single area. High performers who neglect certain dimensions often report lower overall well-being despite external success.",
                "وجد مراجعة شاملة منشورة في المراجعة السنوية لعلم النفس أن الرضا عن الحياة يعتمد على التوازن المُدرك عبر المجالات، وليس فقط الإنجاز في أي مجال واحد. غالباً ما يُبلغ الأداء العاليون الذين يهملون أبعاداً معينة عن رفاهية إجمالية أقل على الرغم من النجاح الخارجي."
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Pattern Recognition", "التعرف على الأنماط")}</h3>
                  <p className="text-sm text-slate-600">{getText("Identify connections across dimensions you never noticed", "حدد الروابط عبر الأبعاد التي لم تلاحظها من قبل")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Targeted Growth", "النمو الموجّه")}</h3>
                  <p className="text-sm text-slate-600">{getText("Focus development efforts where they'll have the most impact", "ركّز جهود التطوير حيث سيكون لها التأثير الأكبر")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Progress Tracking", "تتبع التقدم")}</h3>
                  <p className="text-sm text-slate-600">{getText("Measure change over time with repeatable assessments", "قِس التغيير بمرور الوقت بتقييمات قابلة للتكرار")}</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("How the Baseline Works", "كيف يعمل خط الأساس")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Identity Baseline 8D Worksheet guides you through a structured assessment of each dimension. For each domain, you'll evaluate your current state, identify strengths, acknowledge growth edges, and clarify your desired state.",
                "ترشدك ورقة عمل خط أساس الهوية ثماني الأبعاد خلال تقييم منظم لكل بُعد. لكل مجال، ستقيّم حالتك الحالية وتحدد نقاط القوة وتقرّب حواف النمو وتوضّح حالتك المرغوبة."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("The Assessment Process", "عملية التقييم")}</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span>{getText("<strong>Rate current satisfaction</strong> on a 1-10 scale for each dimension", "<strong>قيّم رضاك الحالي</strong> على مقياس ١-١٠ لكل بُعد")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span>{getText("<strong>Identify specific strengths</strong> that contribute to your identity", "<strong>حدد نقاط القوة المحددة</strong> التي تساهم في هويتك")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span>{getText("<strong>Recognize growth opportunities</strong> without judgment", "<strong>تعرف على فرص النمو</strong> بدون إطلاق أحكام")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span>{getText("<strong>Define your desired state</strong> for each dimension", "<strong>حدد حالتك المرغوبة</strong> لكل بُعد")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">5</span>
                  <span>{getText("<strong>Discover cross-dimensional patterns</strong> and connections", "<strong>اكتشف الأنماط العابرة للأبعاد</strong> والروابط")}</span>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("From Assessment to Action", "من التقييم إلى الفعل")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The power of the baseline lies in its practical application. Once you've assessed all eight dimensions, patterns emerge that inform strategic development. You might discover that improving your physical dimension would have cascading positive effects on your emotional and occupational dimensions.",
                "تكمن قوة خط الأساس في تطبيقه العملي. بمجرد تقييمك لجميع الأبعاد الثمانية، تظهر أنماط تُبلغ التطوير الاستراتيجي. قد تكتشف أن تحسين بُعدك الجسدي سيكون له آثار إيجابية متتالية على أبعادك العاطفية والمهنية."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research on the transtheoretical model of change shows that accurate self-assessment is a critical precursor to successful behavior change. Without a clear baseline, you cannot effectively plan interventions or measure progress.",
                "تُظهر الأبحاث حول النموذج العابر نظرياً للتغيير أن التقييم الذاتي الدقيق هو سلف حاسم للتغيير السلوكي الناجح. بدون خط أساس واضح، لا يمكنك التخطيط الفعال للتدخلات أو قياس التقدم."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("What's Included in the Worksheet", "ما هو المضمّن في ورقة العمل")}</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Detailed assessment prompts for all eight dimensions", "محفزات تقييم مفصلة لجميع الأبعاد الثمانية")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Visual scoring system to identify patterns at a glance", "نظام تسجيل مرئي لتحديد الأنماط بنظرة سريعة")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Cross-dimensional analysis exercises", "تمارين تحليلية عابرة للأبعاد")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Priority identification framework for focused development", "إطار تحديد الأولويات للتطوير المركّز")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Progress tracking templates for repeat assessment", "قوالب تتبع التقدم للتقييم المتكرر")}</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Building Your Identity Baseline", "بناء خط أساس هويتك")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The baseline assessment serves as a reference point for all future development. When you return to reassess in three months, six months, or a year, you can objectively measure how your identity has evolved. This tracking capability transforms vague aspirations into measurable progress.",
                "يعمل تقييم خط الأساس كنقطة مرجعية لجميع التطوير المستقبلي. عندما تعود لإعادة التقييم بعد ثلاثة أشهر أو ستة أشهر أو سنة، يمكنك قياس كيف تطورت هويتك بشكل موضوعي. تحوّل قدرة التتبع هذه الطموحات الغامضة إلى تقدم قابل للقياس."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The framework also helps identify which dimensions are most central to your overall well-being. Research on the \"core self\" suggests that certain dimensions carry more weight for each individual. Your baseline reveals where your leverage points lie.",
                "يساعد الإطار أيضاً في تحديد أي الأبعاد أكثر مركزية لرفاهيتك الإجمالية. تشير أبحاث \"الذات الأساسية\" إلى أن أبعاداً معينة تحمل وزناً أكبر لكل فرد. يكشف خط أساسك أين تكمن نقاط الرافعة الخاصة بك."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Layers className="h-5 w-5" />
              <span className="font-semibold">{getText("The Integration Principle", "مبدأ التكامل")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The ultimate goal isn't perfection in every dimension—it's integration. A coherent identity emerges when all dimensions align with your core values and support each other. The Identity Baseline 8D Worksheet reveals where integration is strong and where fragmentation exists.",
                "الهدف النهائي ليس الكمال في كل بُعد—بل التكامل. تظهر الهوية المتماسكة عندما تتماشى جميع الأبعاد مع قيمك الأساسية وتدعم بعضها البعض. تكشف ورقة عمل خط أساس الهوية ثماني الأبعاد أين يكون التكامل قوياً وأين يوجد التفتت."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "Every transformation journey begins with a single step: understanding where you are now. The eight dimensions provide the map; the baseline provides your coordinates. From there, any destination becomes navigable.",
                "كل رحلة تحول تبدأ بخطوة واحدة: فهم أين أنت الآن. الأبعاد الثمانية توفر الخريطة؛ خط الأساس يوفر إحداثياتك. من هناك، يصبح أي وجهة قابلة للملاحة."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleReferences slug="identity-baseline-8d-worksheet" />

      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />

      <ArticleNavigation currentSlug="identity-baseline-8d-worksheet" />

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

