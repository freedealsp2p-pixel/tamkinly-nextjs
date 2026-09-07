'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Eye, Heart, Shield, CheckCircle, ArrowUpRight, Brain } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function ERQEmotionalRegulationWorksheetArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "self-authorship-worksheet", title: getText("Self-Authorship: Writing Your Own Story", "تأليف الذات: كتابة قصتك الخاصة"), readTime: getText("9 min read", "9 دقائق قراءة") },
    { slug: "who-am-i-worksheet", title: getText("The \"Who Am I?\" Self-Discovery Worksheet", "ورقة عمل \"من أنا؟\" لاكتشاف الذات"), readTime: getText("10 min read", "10 دقائق قراءة") },
    { slug: "identity-based-habits-worksheet", title: getText("Identity-Based Habits: The James Clear Method", "العادات القائمة على الهوية: طريقة جيمس كلير"), readTime: getText("10 min read", "10 دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Emotional Intelligence", "الذكاء العاطفي")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("ERQ Emotional Regulation: Mastering the Art of Emotional Response", "تنظيم المشاعر ERQ: إتقان فن الاستجابة العاطفية")}
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
                "Emotions are not just reactions—they are data. The ability to regulate emotional responses is not about suppression or denial; it's about choosing how you engage with your emotional life. This is the insight behind the Emotion Regulation Questionnaire (ERQ), developed by James Gross and Oliver John in their groundbreaking 2003 research.",
                "المشاعر ليست مجرد ردود فعل—إنها بيانات. القدرة على تنظيم الاستجابات العاطفية لا تتعلق بالكبت أو الإنكار؛ بل تتعلق باختيار كيف تتفاعل مع حياتك العاطفية. هذه هي الرؤية التي تقف خلف استبيان تنظيم المشاعر (ERQ)، الذي طوره جيمس غروس وأوليفر جون في بحثهما الرائد عام 2003."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Their work, published in the Journal of Personality and Social Psychology, identified two primary strategies people use to regulate emotions: cognitive reappraisal and expressive suppression. Understanding these strategies—and developing flexibility in using them—has profound implications for identity transformation.",
                "أعمالهم، المنشورة في مجلة الشخصية وعلم النفس الاجتماعي، حددت استراتيجيتين رئيسيتين يستخدمهما الناس لتنظيم المشاعر: إعادة التقييم المعرفي وكبت التعبير. فهم هذه الاستراتيجيات—وتطوير المرونة في استخدامها—له آثار عميقة على تحويل الهوية."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Two Strategies of Emotional Regulation", "استراتيجيتا تنظيم المشاعر")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Gross's process model of emotion regulation reveals that emotions can be influenced at different points in the generative process. The ERQ focuses on two strategies that have received the most research attention:",
                "يكشف نموذج عملية غروس لتنظيم المشاعر أن المشاعر يمكن التأثير عليها في نقاط مختلفة من العملية التوليدية. يركز ERQ على استراتيجيتين حظيتا بأكبر قدر من الاهتمام البحثي:"
              )}
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2 text-center">{getText("Cognitive Reappraisal", "إعادة التقييم المعرفي")}</h3>
                  <p className="text-sm text-slate-600 text-center">
                    {getText("Changing how you think about a situation to alter its emotional impact. Reinterpreting events to find new meaning, perspective, or opportunity.", "تغيير طريقة تفكيرك في موقف لتغيير تأثيره العاطفي. إعادة تفسير الأحداث لإيجاد معنى جديد أو منظور أو فرصة.")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2 text-center">{getText("Expressive Suppression", "كبت التعبير")}</h3>
                  <p className="text-sm text-slate-600 text-center">
                    {getText("Inhibiting outward signs of inner feelings. Masking emotional expression regardless of the underlying emotional experience.", "كبت العلامات الخارجية للمشاعر الداخلية. إخفاء التعبير العاطفي بغض النظر عن التجربة العاطفية الكامنة.")}
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The research reveals a crucial finding: these strategies have dramatically different outcomes. Cognitive reappraisal is associated with better mental health, more satisfying relationships, and greater well-being. Expressive suppression, in contrast, is linked to negative outcomes across multiple domains.",
                "تكشف الأبحاث عن نتيجة حاسمة: هذه الاستراتيجيات لها نتائج مختلفة جذريًا. ترتبط إعادة التقييم المعرفي بصحة نفسية أفضل وعلاقات أكثر إرضاءً ورفاهية أكبر. في المقابل، يرتبط كبت التعبير بنتائج سلبية عبر مجالات متعددة."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Research Evidence", "الأدلة البحثية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Gross and John's research has been replicated and extended across cultures, age groups, and contexts. A meta-analysis published in Psychological Bulletin synthesized findings from hundreds of studies, confirming the differential effects of these regulation strategies.",
                "تم تكرار أبحاث غروس وجون وتوسيعها عبر الثقافات والفئات العمرية والسياقات. جمعت دراسة تلوية منشورة في النشرة النفسية نتائج مئات الدراسات، مؤكدة التأثيرات المختلفة لهاتين الاستراتيجيتين."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"People who habitually use reappraisal tend to experience more positive emotions and fewer negative emotions, have better interpersonal functioning, and report greater life satisfaction. In contrast, habitual suppression is associated with worse outcomes on all these measures.\" — Gross & John, 2003",
                  "\"الأشخاص الذين يستخدمون إعادة التقييم بشكل معتاد يميلون إلى تجربة مشاعر إيجابية أكثر ومشاعر سلبية أقل، ولديهم أداء بين شخصي أفضل، ويبلغون عن رضا أكبر عن الحياة. في المقابل، يرتبط الكبت المعتاد بنتائج أسوأ في جميع هذه المقاييس.\" — غروس وجون، 2003"
                )}
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Studies using physiological measures show that suppression doesn't actually reduce emotional experience—it just masks outward expression. The body continues to respond as if the emotion is present, creating internal tension that accumulates over time.",
                "تُظهر الدراسات باستخدام القياسات الفسيولوجية أن الكبت لا يقلل التجربة العاطفية فعليًا—بل يخفي التعبير الخارجي فقط. يستمر الجسم في الاستجابة وكأن المشاعر موجودة، مما يخلق توترًا داخليًا يتراكم بمرور الوقت."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why Strategy Choice Matters for Identity", "لماذا يهم اختيار الاستراتيجية للهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Emotional regulation strategies aren't just techniques—they're identity expressions. The habitual use of suppression creates an identity of concealment, of being someone who cannot show their authentic self. Reappraisal, in contrast, creates an identity of meaning-making and cognitive flexibility.",
                "استراتيجيات التنظيم العاطفي ليست مجرد تقنيات—إنها تعبيرات عن الهوية. يخلق الاستخدام المعتاد للكبت هوية الإخفاء، أن تكون شخصًا لا يستطيع إظهار ذاته الأصيلة. في المقابل، تخلق إعادة التقييم هوية صناعة المعنى والمرونة المعرفية."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research on emotional identity shows that how you regulate emotions becomes part of who you are. If you consistently suppress emotions, you develop an identity as someone who doesn't feel strongly—or who shouldn't feel strongly. If you reappraise, you develop an identity as someone who finds meaning in difficulty.",
                "تُظهر الأبحاث حول الهوية العاطفية أن طريقة تنظيمك للمشاعر تصبح جزءًا من هويتك. إذا كبحت المشاعر باستمرار، تطور هوية كشخص لا يشعر بقوة—أو لا ينبغي أن يشعر بقوة. إذا أعدت التقييم، تطور هوية كشخص يجد المعنى في الصعوبات."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("Outcomes by Regulation Strategy", "النتائج حسب استراتيجية التنظيم")}</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 text-sm font-semibold text-primary">{getText("Domain", "المجال")}</th>
                      <th className="text-left py-3 text-sm font-semibold text-primary">{getText("Reappraisal", "إعادة التقييم")}</th>
                      <th className="text-left py-3 text-sm font-semibold text-primary">{getText("Suppression", "الكبت")}</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600">
                    <tr className="border-b border-slate-100">
                      <td className="py-3">{getText("Emotional Experience", "التجربة العاطفية")}</td>
                      <td className="py-3 text-accent">{getText("Reduced negative emotion", "تقليل المشاعر السلبية")}</td>
                      <td className="py-3">{getText("No reduction in experience", "لا تقليل في التجربة")}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3">{getText("Memory", "الذاكرة")}</td>
                      <td className="py-3 text-accent">{getText("Improved recall", "تحسين الاستذكار")}</td>
                      <td className="py-3">{getText("Impaired memory", "ضعف الذاكرة")}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3">{getText("Relationships", "العلاقات")}</td>
                      <td className="py-3 text-accent">{getText("Greater closeness", "قرب أكبر")}</td>
                      <td className="py-3">{getText("Reduced intimacy", "تقليل الحميمية")}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3">{getText("Well-being", "الرفاهية")}</td>
                      <td className="py-3 text-accent">{getText("Higher life satisfaction", "رضا أعلى عن الحياة")}</td>
                      <td className="py-3">{getText("Lower satisfaction", "رضا أقل")}</td>
                    </tr>
                    <tr>
                      <td className="py-3">{getText("Physiology", "الفسيولوجيا")}</td>
                      <td className="py-3 text-accent">{getText("Reduced stress response", "تقليل استجابة التوتر")}</td>
                      <td className="py-3">{getText("Elevated stress markers", "ارتفاع مؤشرات التوتر")}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Developing Reappraisal Skills", "تطوير مهارات إعادة التقييم")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Cognitive reappraisal isn't about positive thinking or denial—it's about perspective flexibility. Research shows that effective reappraisal involves multiple techniques for reframing emotional situations:",
                "إعادة التقييم المعرفي ليست تفكيرًا إيجابيًا أو إنكارًا—إنها مرونة المنظور. تُظهر الأبحاث أن إعادة التقييم الفعالة تتضمن تقنيات متعددة لإعادة صياغة المواقف العاطفية:"
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Reinterpretation", "إعادة التفسير")}</h3>
                  <p className="text-sm text-slate-600">{getText("Finding new meaning in events that initially seemed negative", "إيجاد معنى جديد في أحداث بدت سلبية في البداية")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Normalization", "التسوية")}</h3>
                  <p className="text-sm text-slate-600">{getText("Placing experiences in broader context, reducing their intensity", "وضع التجارب في سياق أوسع، مما يقلل حدتها")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Growth Focus", "التركيز على النمو")}</h3>
                  <p className="text-sm text-slate-600">{getText("Identifying opportunities for learning and development", "تحديد فرص التعلم والتطوير")}</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Studies show that reappraisal skills can be developed through practice. A randomized controlled trial published in the Journal of Consulting and Clinical Psychology found that participants who received reappraisal training showed significant improvements in emotional well-being compared to control groups.",
                "تُظهر الدراسات أن مهارات إعادة التقييم يمكن تطويرها من خلال الممارسة. وجدت تجربة عشوائية مضبوطة منشورة في مجلة الاستشارات وعلم النفس السريري أن المشاركين الذين تلقوا تدريبًا على إعادة التقييم أظهروا تحسينات كبيرة في الرفاهية العاطفية مقارنة بمجموعات الضبط."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The ERQ Assessment", "تقييم ERQ")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The original ERQ consists of just 10 items, making it one of the most efficient psychological assessments available. Despite its brevity, it reliably predicts emotional patterns, relationship quality, and well-being.",
                "يتكون ERQ الأصلي من 10 بنود فقط، مما يجعله أحد أكثر التقييمات النفسية كفاءة. على الرغم من إيجازه، فإنه يتنبأ بشكل موثوق بالأنماط العاطفية وجودة العلاقات والرفاهية."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Our ERQ Emotional Regulation Worksheet extends the assessment with practical exercises for developing reappraisal skills and reducing reliance on suppression. The worksheet helps you:", "توسع ورقة عمل تنظيم المشاعر ERQ التقييم بتمارين عملية لتطوير مهارات إعادة التقييم وتقليل الاعتماد على الكبت. تساعدك ورقة العمل في:")}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("What's Included in the Worksheet", "ما هو المضمّن في ورقة العمل")}</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Complete ERQ assessment with scoring interpretation", "تقييم ERQ كامل مع تفسير النتائج")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Personalized feedback based on your regulation profile", "ملاحظات مخصصة بناءً على ملفك التنظيمي")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Guided reappraisal exercises with real-life scenarios", "تمارين موجهة لإعادة التقييم مع سيناريوهات واقعية")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Strategies for reducing suppression habits", "استراتيجيات لتقليل عادات الكبت")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Progress tracking for regulation skill development", "تتبع التقدم في تطوير مهارات التنظيم")}</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Context and Flexibility", "السياق والمرونة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "While reappraisal generally produces better outcomes, emotional regulation is not one-size-fits-all. Research on emotion regulation flexibility shows that the most emotionally intelligent individuals can adjust their strategy based on context.",
                "بينما تنتج إعادة التقييم نتائج أفضل عمومًا، فإن التنظيم العاطفي ليس مقاسًا واحدًا يناسب الجميع. تُظهر الأبحاث حول مرونة تنظيم المشاعر أن أكثر الأفراد ذكاءً عاطفيًا يمكنهم تعديل استراتيجيتهم بناءً على السياق."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Sometimes suppression is appropriate—during a crisis that requires immediate action, for instance. The goal isn't to eliminate suppression entirely but to expand your repertoire and make conscious choices about how you regulate emotions in different situations.",
                "أحيانًا يكون الكبت مناسبًا—أثناء أزمة تتطلب فعلًا فوريًا، على سبيل المثال. الهدف ليس القضاء على الكبت تمامًا بل توسيع ذخيرتك واتخاذ خيارات واعية حول كيفية تنظيم مشاعرك في مواقف مختلفة."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <ArrowUpRight className="h-5 w-5" />
              <span className="font-semibold">{getText("The Flexibility Principle", "مبدأ المرونة")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The worksheet includes exercises for developing regulation flexibility—the ability to match your strategy to the situation. This meta-skill represents the cutting edge of emotion regulation research and practice.",
                "تتضمن ورقة العمل تمارين لتطوير مرونة التنظيم—القدرة على مطابقة استراتيجيتك مع الموقف. تمثل هذه المهارة الفوقية أحدث ما توصل إليه بحث وممارسة تنظيم المشاعر."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Emotional Regulation and Identity Transformation", "التنظيم العاطفي وتحويل الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Your relationship with your emotions shapes who you become. People who develop reappraisal skills become more resilient, more relationally competent, and more psychologically flexible. These qualities support every aspect of identity transformation.",
                "علاقتك بمشاعر تشكل من تصبح. الأشخاص الذين يطورون مهارات إعادة التقييم يصبحون أكثر مرونة وأكثر كفاءة في العلاقات وأكثر مرونة نفسيًا. هذه الصفات تدعم كل جانب من جوانب تحويل الهوية."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When you can regulate emotions effectively, you can navigate the challenges of change without being derailed by fear, doubt, or discomfort. Emotional regulation creates the stability needed for sustained identity work.",
                "عندما تستطيع تنظيم مشاعرك بفعالية، يمكنك التنقل في تحديات التغيير دون أن تنحرف عن مسارك بالخوف أو الشك أو الانزعاج. يخلق التنظيم العاطفي الاستقرار اللازم لعمل الهوية المستدام."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "The ERQ Emotional Regulation Worksheet provides both assessment and development tools for this essential skill. Understanding your regulation patterns is the first step toward choosing how you engage with your emotional life—and the identity those emotions shape.",
                "توفر ورقة عمل تنظيم المشاعر ERQ أدوات تقييم وتطوير لهذه المهارة الأساسية. فهم أنماط تنظيمك هو الخطوة الأولى نحو اختيار كيف تتفاعل مع حياتك العاطفية—والهوية التي تشكلها تلك المشاعر."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleReferences slug="erq-emotional-regulation-worksheet" />

      <MidArticleUpgrade promoteTier="BASIC" variant="minimal" />
      <BlogArticleCTA ctaType="daily" />

      <ArticleNavigation currentSlug="erq-emotional-regulation-worksheet" />

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

