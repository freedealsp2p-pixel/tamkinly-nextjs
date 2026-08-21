'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, BookOpen, Compass, Shield, CheckCircle, ArrowUpRight } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function SelfAuthorshipWorksheetArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "who-am-i-worksheet", title: getText("The \"Who Am I?\" Self-Discovery Worksheet", "ورقة عمل \"من أنا؟\" لاكتشاف الذات"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "identity-based-habits-worksheet", title: getText("Identity-Based Habits: The James Clear Method", "العادات القائمة على الهوية: طريقة جيمس كلير"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "erq-emotional-regulation-worksheet", title: getText("ERQ Emotional Regulation: Master Your Emotions", "تنظيم المشاعر ERQ: أتقن عواطفك"), readTime: getText("9 min read", "٩ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Personal Development", "التطوير الشخصي")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Self-Authorship: The Journey to Writing Your Own Life Story", "تأليف الذات: رحلة كتابة قصة حياتك بنفسك")}
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
                "\"Self-authorship is the internal capacity to define one's own beliefs, identity, and social relations.\" This definition from educational psychologist Marcia Baxter Magolda captures the essence of what it means to become the author of your own life—a journey from being shaped by external forces to shaping yourself.",
                "\"تأليف الذات هو القدرة الداخلية على تحديد معتقدات الفرد وهويته وعلاقاته الاجتماعية.\" هذا التعريف من عالمة النفس التربوية مارسيا باكستر ماغولدا يلخص جوهر ما يعنيه أن تصبح مؤلف حياتك الخاصة—رحلة من التشكيل بواسطة القوى الخارجية إلى تشكيل ذاتك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Baxter Magolda's groundbreaking longitudinal study, spanning over two decades of research at Miami University, revealed that most adults never achieve full self-authorship. They remain forever influenced by external authorities—parents, culture, institutions—without developing the internal voice to question, evaluate, and choose their own path.",
                "كشفت دراسة ماغولدا الرائدة الطولية، التي امتدت لأكثر من عقدين من البحث في جامعة ميامي، أن معظم البالغين لا يصلون أبداً إلى تأليف الذات الكامل. يظلون متأثرين للأبد بالسلطات الخارجية—الآباء، الثقافة، المؤسسات—دون تطوير الصوت الداخلي للتساؤل والتقييم واختيار مسارهم الخاص."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Three Dimensions of Self-Authorship", "الأبعاد الثلاثة لتأليف الذات")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Baxter Magolda's research identified three interconnected dimensions that define the self-authored individual. These dimensions develop together, influencing each other in a continuous process of growth:",
                "حددت أبحاث ماغولدا ثلاثة أبعاد مترابطة تحدد الفرد المؤلف لذاته. هذه الأبعاد تتطور معاً، مؤثرة على بعضها البعض في عملية نمو مستمرة:"
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Epistemological", "المعرفي")}</h3>
                  <p className="text-sm text-slate-600">{getText("How you know what you know—your relationship to knowledge and truth", "كيف تعرف ما تعرفه—علاقتك بالمعرفة والحقيقة")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Compass className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Intrapersonal", "الذاتي الداخلي")}</h3>
                  <p className="text-sm text-slate-600">{getText("How you understand yourself—your identity and sense of purpose", "كيف تفهم نفسك—هويتك وإحساسك بالهدف")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Interpersonal", "بين الأشخاص")}</h3>
                  <p className="text-sm text-slate-600">{getText("How you relate to others—your relationships and social context", "كيف ترتبط بالآخرين—علاقاتك وسياقك الاجتماعي")}</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The epistemological dimension involves moving from accepting knowledge from authorities to constructing your own knowledge through critical evaluation. The intrapersonal dimension involves shifting from defining yourself through external expectations to crafting an identity based on internal values. The interpersonal dimension involves evolving from dependency on others' approval to mutual, interdependent relationships.",
                "يتضمن البعد المعرفي الانتقال من قبول المعرفة من السلطات إلى بناء معرفتك الخاصة من خلال التقييم النقدي. يتضمن البعد الذاتي الداخلي التحول من تعريف نفسك من خلال التوقعات الخارجية إلى صياغة هوية مبنية على القيم الداخلية. يتضمن البعد بين الأشخاص التطور من الاعتماد على موافقة الآخرين إلى علاقات متبادلة ومترابطة."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Four Phases of Development", "مراحل التطور الأربع")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Baxter Magolda identified four distinct phases in the journey toward self-authorship. Understanding where you are in this progression provides crucial insight for personal development:",
                "حددت ماغولدا أربع مراحل متميزة في رحلة تأليف الذات. فهم أين أنت في هذا التقدم يوفر رؤية حاسمة للتطوير الشخصي:"
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("Phase 1: Following Formulas", "المرحلة الأولى: اتباع الصيغ")}</h3>
              <p className="text-slate-600 mb-6">
                {getText(
                  "In this phase, individuals rely entirely on external authorities for direction. They follow predetermined formulas for life—what to believe, how to act, who to become. Decisions are made by deferring to others' expectations rather than internal evaluation.",
                  "في هذه المرحلة، يعتمد الأفراد كلياً على السلطات الخارجية للتوجيه. يتبعون صيغاً محددة مسبقاً للحياة—ماذا يؤمنون، كيف يتصرفون، من يصبحون. تُتخذ القرارات بالامتثال لتوقعات الآخرين بدلاً من التقييم الداخلي."
                )}
              </p>

              <h3 className="font-semibold text-primary mb-4">{getText("Phase 2: Crossroads", "المرحلة الثانية: مفترق الطرق")}</h3>
              <p className="text-slate-600 mb-6">
                {getText(
                  "The crossroads phase begins when external formulas no longer fit life's complexity. Individuals experience tension between external expectations and emerging internal perspectives. This phase often accompanies major life transitions—career changes, relationship shifts, existential questioning.",
                  "تبدأ مرحلة مفترق الطرق عندما لا تناسب الصيغ الخارجية تعقيد الحياة بعد ذلك. يواجه الأفراد توتراً بين التوقعات الخارجية والمنظورات الداخلية الناشئة. غالباً ما ترافق هذه المرحلة التحولات الحياتية الكبرى—تغييرات مهنية، تحولات في العلاقات، تساؤلات وجودية."
                )}
              </p>

              <h3 className="font-semibold text-primary mb-4">{getText("Phase 3: Becoming the Author", "المرحلة الثالثة: أن تصبح المؤلف")}</h3>
              <p className="text-slate-600 mb-6">
                {getText(
                  "In this phase, the internal voice grows stronger. Individuals begin trusting their own judgment and making choices based on self-defined values. External voices are considered but not automatically followed.",
                  "في هذه المرحلة، يزداد الصوت الداخلي قوة. يبدأ الأفراد بالوثوق بحكمهم الخاص واتخاذ الخيارات بناءً على قيم محددة ذاتياً. تُؤخذ الأصوات الخارجية بعين الاعتبار لكن لا تُتبع تلقائياً."
                )}
              </p>

              <h3 className="font-semibold text-primary mb-4">{getText("Phase 4: Internal Foundation", "المرحلة الرابعة: الأساس الداخلي")}</h3>
              <p className="text-slate-600">
                {getText(
                  "Full self-authorship is achieved when individuals possess a stable internal foundation. They can navigate complex situations by drawing on their own beliefs and values while remaining open to growth and new perspectives.",
                  "يتحقق تأليف الذات الكامل عندما يمتلك الأفراد أساساً داخلياً مستقراً. يمكنهم التنقل في المواقف المعقدة بالاعتماد على معتقداتهم وقيمهم الخاصة مع البقاء منفتحين على النمو والمنظورات الجديدة."
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Research Foundation", "الأساس البحثي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Baxter Magolda's research followed participants from age 18 to 34, conducting annual interviews to track their development. Her findings challenged prevailing assumptions about adult development, revealing that chronological age doesn't automatically produce self-authorship.",
                "أبحاث ماغولدا تابعت المشاركين من عمر ١٨ إلى ٣٤ عاماً، تجري مقابلات سنوية لتتبع تطورهم. تحدت نتائجها الافتراضات السائدة حول نمو البالغين، كاشفة أن العمر الزمني لا ينتج تلقائياً تأليف الذات."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The study, published in her influential book \"Making Their Own Way\" (2001), demonstrated that most young adults remain in the formulaic phases throughout their college years. Self-authorship typically emerges in the late twenties or thirties—if it emerges at all.",
                "أظهرت الدراسة، المنشورة في كتابها المؤثر \"صنع طريقهم الخاص\" (٢٠٠١)، أن معظم الشباب البالغين يبقون في المراحل الصيغية طوال سنوات دراستهم الجامعية. يظهر تأليف الذات عادةً في أواخر العشرينيات أو الثلاثينيات—إذا ظهر على الإطلاق."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"Self-authorship is not about rejecting external input or becoming isolated. It's about developing the capacity to critically evaluate external messages against your own values, beliefs, and goals.\" — Marcia Baxter Magolda",
                  "\"تأليف الذات ليس عن رفض المدخلات الخارجية أو الانعزال. إنه عن تطوير القدرة على التقييم النقدي للرسائل الخارجية مقارنة بقيمك ومعتقداتك وأهدافك.\" — مارسيا باكستر ماغولدا"
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why Self-Authorship Matters", "لماذا يهم تأليف الذات")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research links self-authorship to numerous positive outcomes. A study published in the Journal of College Student Development found that self-authored individuals demonstrate greater career adaptability, more satisfying relationships, and stronger mental health.",
                "تربط الأبحاث تأليف الذات بالعديد من النتائج الإيجابية. وجدت دراسة منشورة في مجلة تطوير طالب الجامعة أن الأفراد المؤلفين لذاتهم يظهرون قدرة أكبر على التكيف المهني، وعلاقات أكثر إرضاءً، وصحة نفسية أقوى."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "In professional contexts, self-authored individuals navigate ambiguity more effectively. They can make decisions without clear guidelines, adapt to changing circumstances, and maintain their values under pressure. These capabilities have become increasingly valuable in today's rapidly evolving workplace.",
                "في السياقات المهنية، يتنقل الأفراد المؤلفون لذاتهم في الغموض بفعالية أكبر. يمكنهم اتخاذ القرارات دون إرشادات واضحة، والتكيف مع الظروف المتغيرة، والحفاظ على قيمهم تحت الضغط. أصبحت هذه القدرات ذات قيمة متزايدة في مكان العمل سريع التطور اليوم."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("Benefits of Self-Authorship", "فوائد تأليف الذات")}</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Greater resilience during life transitions and challenges", "مرونة أكبر أثناء تحولات الحياة وتحدياتها")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("More authentic relationships based on genuine connection", "علاقات أكثر أصالة مبنية على تواصل حقيقي")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Improved decision-making aligned with personal values", "تحسين عملية صنع القرار المتوافق مع القيم الشخصية")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Enhanced career adaptability and professional growth", "تعزيز القدرة على التكيف المهني والنمو المهني")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Stronger sense of purpose and life meaning", "إحساس أقوى بالهدف ومعنى الحياة")}</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Self-Authorship Worksheet", "ورقة عمل تأليف الذات")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Our Self-Authorship Journey Worksheet translates Baxter Magolda's research into practical exercises for personal development. The worksheet guides you through assessing your current phase, identifying growth edges, and developing strategies for progress.",
                "تترجم ورقة عمل رحلة تأليف الذات أبحاث ماغولدا إلى تمارين عملية للتطوير الشخصي. ترشدك الورقة خلال تقييم مرحلتك الحالية، وتحديد حواف النمو، وتطوير استراتيجيات التقدم."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The worksheet includes prompts for each of the three dimensions, helping you identify where you're most dependent on external formulas and where you've already developed internal authority. This assessment provides a roadmap for focused development.",
                "تتضمن الورقة محفزات لكل من الأبعاد الثلاثة، تساعدك على تحديد أين تعتمد أكثر على الصيغ الخارجية وأين طورت سابقاً سلطة داخلية. يوفر هذا التقييم خارطة طريق للتطوير المركّز."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <ArrowUpRight className="h-5 w-5" />
              <span className="font-semibold">{getText("The Developmental Principle", "مبدأ التطوير")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Self-authorship is not achieved through a single breakthrough. It's developed through repeated practice of internal questioning, value clarification, and authentic choice. Each decision you make from your own internal foundation strengthens that foundation.",
                "لا يتحقق تأليف الذات من خلال اختراق واحد. بل يتطور من خلال الممارسة المتكررة للتساؤل الداخلي وتوضيح القيم والاختيار الأصيل. كل قرار تتخذه من أساسك الداخلي يعزز ذلك الأساس."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The worksheet helps you identify specific situations where you default to external formulas and develop strategies for engaging your internal voice instead. Over time, this practice transforms your relationship with yourself, others, and knowledge itself.",
                "تساعدك الورقة على تحديد المواقف المحددة حيث تلجأ إلى الصيغ الخارجية وتطوير استراتيجيات لإشراك صوتك الداخلي بدلاً من ذلك. بمرور الوقت، تحول هذه الممارسة علاقتك مع نفسك والآخرين والمعرفة ذاتها."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "Most people live lives scripted by others—the expectations of parents, the demands of culture, the pressure of peers. Self-authorship offers a different path: the opportunity to become the author of your own story. The question is whether you're ready to pick up the pen.",
                "يعيش معظم الناس حيوات كتبها آخرون—توقعات الآباء، متطلبات الثقافة، ضغط الأقران. يقدم تأليف الذات مساراً مختلفاً: فرصة أن تصبح مؤلف قصتك الخاصة. السؤال هو هل أنت مستعد لالتقاط القلم."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="coach" />

      <ArticleNavigation currentSlug="self-authorship-worksheet" />

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

