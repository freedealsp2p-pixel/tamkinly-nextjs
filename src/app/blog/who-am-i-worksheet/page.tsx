'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Target, Users, Heart, Lightbulb, CheckCircle } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function WhoAmIWorksheetArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "identity-based-habits-worksheet", title: getText("Identity-Based Habits: The James Clear Method", "العادات المبنية على الهوية: طريقة جيمس كلير"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "self-authorship-worksheet", title: getText("Self-Authorship: Writing Your Own Story", "تأليف الذات: كتابة قصتك الخاصة"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "identity-baseline-8d-worksheet", title: getText("The Identity Baseline 8D Framework", "إطار خط أساس الهوية الثماني الأبعاد"), readTime: getText("8 min read", "٨ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Self-Discovery", "اكتشاف الذات")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The \"Who Am I?\" Worksheet: A Science-Backed Guide to Self-Discovery", "ورقة عمل \"من أنا؟\": دليل علمي لاكتشاف الذات")}
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
                "The question \"Who am I?\" has echoed through centuries of human thought, yet most of us navigate life without ever truly answering it. Research shows that individuals with high self-concept clarity—the extent to which their self-beliefs are clearly and confidently defined—experience significantly better mental health outcomes and life satisfaction.",
                "سؤال \"من أنا؟\" يتردد عبر قرون من الفكر البشري، ومع ذلك يبحر معظمنا في الحياة دون أن يجيبه حقاً. تُظهر الأبحاث أن الأفراد الذين يتمتعون بوضوح عالٍ في المفهوم الذاتي — المدى الذي تكون فيه معتقداتهم عن أنفسهم محددة بوضوح وثقة — يختبرون نتائج أفضل بكثير في الصحة النفسية والرضا عن الحياة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "A landmark study by Campbell and colleagues (1996) published in the Journal of Personality and Social Psychology found that people with low self-concept clarity were more prone to depression, anxiety, and chronic indecision. The researchers discovered that knowing who you are isn't just philosophical—it's foundational to psychological well-being.",
                "وجدت دراسة بارزة لكامبل وزملائه (١٩٩٦) منشورة في مجلة الشخصية وعلم النفس الاجتماعي أن الأشخاص ذوي الوضوح المنخفض في المفهوم الذاتي كانوا أكثر عرضة للاكتئاب والقلق وعدم الحسم المزمن. اكتشف الباحثون أن معرفة من أنت ليست فلسفية فحسب — بل هي أساسية للرفاهية النفسية."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Science of Self-Concept Clarity", "علم وضوح المفهوم الذاتي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Self-concept clarity refers to the internal consistency and stability of your beliefs about yourself. When you possess high clarity, you can articulate your values, strengths, and areas for growth without contradiction or confusion. You know what you stand for, what drives your decisions, and what gives your life meaning.",
                "وضوح المفهوم الذاتي يشير إلى الاتساق الداخلي والاستقرار في معتقداتك عن نفسك. عندما تتمتع بوضوح عالٍ، يمكنك التعبير عن قيمك ونقاط قوتك ومجالات نموك بدون تناقض أو ارتباك. تعرف ماذا تمثل، ما الذي يحرك قراراتك، وما الذي يعطي حياتك معنى."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research published in the Personality and Social Psychology Bulletin demonstrates that individuals with high self-concept clarity show greater resilience during life transitions. They adapt more effectively to change because their core identity remains stable even as circumstances shift around them.",
                "تُظهر الأبحاث المنشورة في نشرة الشخصية وعلم النفس الاجتماعي أن الأفراد ذوي الوضوح العالي في المفهوم الذاتي يظهرون مرونة أكبر خلال التحولات الحياتية. يتكيفون بشكل أكثر فعالية مع التغيير لأن هويتهم الأساسية تظل مستقرة حتى عندما تتغير الظروف من حولهم."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"The unexamined life is not worth living,\" Socrates declared over two millennia ago. Modern psychology has confirmed what philosophers long suspected: self-knowledge is not a luxury—it's a necessity for flourishing.",
                  "\"الحياة التي لا تُفحص لا تستحق أن تُعاش،\" أعلن سقراط قبل أكثر من ألفي عام. أكد علم النفس الحديث ما شك فيه الفلاسفة طويلاً: المعرفة الذاتية ليست رفاهية — بل هي ضرورة للرخاء."
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Three Dimensions of Identity", "الأبعاد الثلاثة للهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Contemporary identity research identifies three critical dimensions that shape who we are. Understanding these dimensions provides the framework for meaningful self-exploration:",
                "تحدد أبحاث الهوية المعاصرة ثلاثة أبعاد حاسمة تشكل من نحن. فهم هذه الأبعاد يوفر الإطار للاستكشاف الذاتي الهادف:"
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Personal Identity", "الهوية الشخصية")}</h3>
                  <p className="text-sm text-slate-600">{getText("Your unique traits, values, beliefs, and experiences that distinguish you from others", "سماتك الفريدة وقيمك ومعتقداتك وتجاربك التي تميزك عن الآخرين")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Social Identity", "الهوية الاجتماعية")}</h3>
                  <p className="text-sm text-slate-600">{getText("The groups, communities, and relationships that shape your sense of belonging", "المجموعات والمجتمعات والعلاقات التي تشكل شعورك بالانتماء")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Possible Selves", "الذوات الممكنة")}</h3>
                  <p className="text-sm text-slate-600">{getText("Your envisioned future identities—hoped-for and feared versions of yourself", "هوياتك المستقبلية المتصورة — نسخ من نفسك مؤمّلة ومخيفة")}</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Hazel Markus and Paula Nurius introduced the concept of \"possible selves\" in their influential 1986 research, showing that our visions of future identity significantly influence present behavior. When you can clearly articulate who you want to become, you're more likely to take actions aligned with that vision.",
                "قدمت هايزل ماركوس وبولا نوريوس مفهوم \"الذوات الممكنة\" في بحثهما المؤثر عام ١٩٨٦، موضحين أن رؤيتنا لهوية المستقبل تؤثر بشكل كبير على السلوك الحالي. عندما يمكنك التعبير بوضوح عمن تريد أن تصبح، فمن المرجح أن تتخذ أفعالاً متوافقة مع تلك الرؤية."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why Self-Discovery Worksheets Work", "لماذا تعمل أوراق عمل اكتشاف الذات")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The structured format of a self-discovery worksheet provides several evidence-based advantages over informal reflection. A study in the Journal of Experimental Psychology found that writing down thoughts produces measurable cognitive benefits compared to simply thinking about them.",
                "الشكل المنظم لورقة عمل اكتشاف الذات يوفر عدة مزايا مبنية على الأدلة مقارنة بالتأمل غير الرسمي. وجدت دراسة في مجلة علم النفس التجريبي أن تدوين الأفكار ينتج فوائد معرفية قابلة للقياس مقارنة بمجرد التفكير فيها."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When you externalize your inner experience through structured prompts, you engage different neural networks than those involved in passive contemplation. This process of \"externalizing cognition\" helps identify patterns and connections that might otherwise remain invisible.",
                "عندما تُخرج تجربتك الداخلية من خلال مطالبات منظمة، تنشط شبكات عصبية مختلفة عن تلك المشاركة في التأمل السلبي. هذه العملية لـ \"إخراج الإدراك\" تساعد في تحديد الأنماط والروابط التي قد تظل خفية بطريقة أخرى."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("Research-Backed Benefits of Self-Discovery Writing", "فوائد كتابة اكتشاف الذات المدعومة بالأبحاث")}</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Increased self-awareness and emotional intelligence (Journal of Personality Assessment)", "زيادة الوعي الذاتي والذكاء العاطفي (مجلة تقييم الشخصية)")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Reduced symptoms of anxiety and depression through expressive writing (APA)", "تقليل أعراض القلق والاكتئاب من خلال الكتابة التعبيرية (الجمعية الأمريكية لعلم النفس)")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Improved decision-making aligned with personal values (Journal of Behavioral Decision Making)", "تحسين صنع القرار المتوافق مع القيم الشخصية (مجلة صنع القرار السلوكي)")}</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{getText("Greater sense of purpose and life meaning (Journal of Positive Psychology)", "شعور أكبر بالهدف ومعنى الحياة (مجلة علم النفس الإيجابي)")}</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Identity Exploration Framework", "إطار استكشاف الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Our \"Who Am I?\" worksheet guides you through five essential domains of self-discovery. Each domain draws from established psychological research to ensure comprehensive identity exploration:",
                "ترشدك ورقة عمل \"من أنا؟\" لدينا عبر خمسة مجالات أساسية لاكتشاف الذات. كل مجال يستند إلى أبحاث نفسية راسخة لضمان استكشاف شامل للهوية:"
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              <strong className="text-primary">{getText("Values and Beliefs:", "القيم والمعتقدات:")}</strong> {getText(
                "Research by Shalom Schwartz identified ten universal values that motivate human behavior across cultures. Understanding which values guide your decisions reveals the architecture of your identity.",
                "حددت أبحاث شالوم شوارتز عشر قيم عالمية تحفز السلوك البشري عبر الثقافات. فهم القيم التي توجه قراراتك يكشف بنية هويتك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              <strong className="text-primary">{getText("Strengths and Talents:", "نقاط القوة والمواهب:")}</strong> {getText(
                "The VIA Classification of Strengths, developed by Peterson and Seligman, provides a framework for identifying your core character strengths. Studies show that using your signature strengths leads to greater happiness and fulfillment.",
                "تصنيف VIA لنقاط القوة، الذي طوره بيترسون وسليغمان، يوفر إطاراً لتحديد نقاط قوة شخصيتك الأساسية. تُظهر الدراسات أن استخدام نقاط قوتك المميزة يؤدي إلى سعادة وإنجاز أكبر."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              <strong className="text-primary">{getText("Life Experiences:", "تجارب الحياة:")}</strong> {getText(
                "Narrative identity research by Dan McAdams demonstrates that the stories we tell about our lives shape who we become. Understanding your narrative helps integrate past experiences into a coherent sense of self.",
                "يُظهر بحث الهوية السردية لدن ماك آدمز أن القصص التي نرويها عن حياتنا تشكل من نصبح. فهم سردك يساعد في دمج التجارب الماضية في إحساس متماسك بالذات."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              <strong className="text-primary">{getText("Relationships and Roles:", "العلاقات والأدوار:")}</strong> {getText(
                "Social identity theory, developed by Tajfel and Turner, shows how group memberships and relationships contribute to self-concept. Examining these connections reveals how you define yourself in relation to others.",
                "نظرية الهوية الاجتماعية، التي طورها تاجفل وتيرنر، توضح كيف تساهم عضوية المجموعات والعلاقات في المفهوم الذاتي. فحص هذه الروابط يكشف كيف تحدد نفسك بالنسبة للآخرين."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              <strong className="text-primary">{getText("Future Vision:", "رؤية المستقبل:")}</strong> {getText(
                "Goal-setting research by Locke and Latham demonstrates that clear, specific goals increase motivation and achievement. Articulating your desired future self creates a target for identity transformation.",
                "يُظهر بحث تحديد الأهداف للوك ولاثام أن الأهداف الواضحة والمحددة تزيد من التحفيز والإنجاز. التعبير عن ذاتك المستقبلية المرغوبة يخلق هدفاً لتحول الهوية."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("From Insight to Action", "من البصيرة إلى الفعل")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Self-discovery without application is incomplete. The final section of the worksheet bridges insight to action by identifying specific changes aligned with your authentic self. Research on implementation intentions shows that when you create specific plans connecting situations to behaviors, you're far more likely to follow through.",
                "اكتشاف الذات بدون تطبيق غير مكتمل. القسم الأخير من ورقة العمل يربط البصيرة بالفعل من خلال تحديد تغييرات محددة متوافقة مع ذاتك الأصيلة. تُظهر أبحاث نوايا التنفيذ أنه عندما تنشئ خططاً محددة تربط المواقف بالسلوكيات، فمن المرجح جداً أن تتابع التنفيذ."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Lightbulb className="h-5 w-5" />
              <span className="font-semibold">{getText("The Transformation Principle", "مبدأ التحول")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The journey of self-discovery is not a destination but a continuous process. As you grow and evolve, your understanding of yourself deepens. The \"Who Am I?\" worksheet provides a foundation for ongoing reflection, a snapshot you can return to and revise as your identity develops.",
                "رحلة اكتشاف الذات ليست وجهة بل عملية مستمرة. كلما نميت وتطورت، تعمق فهمك لنفسك. توفر ورقة عمل \"من أنا؟\" أساساً للتأمل المستمر، لقطة يمكنك العودة إليها ومراجعتها مع تطور هويتك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Identity transformation begins with clarity. Before you can become who you want to be, you must understand who you are. The research is clear: individuals with high self-concept clarity navigate life's challenges with greater confidence and purpose.",
                "تحول الهوية يبدأ بالوضوح. قبل أن تصبح من تريد أن تكون، يجب أن تفهم من أنت. الأبحاث واضحة: الأفراد ذوي الوضوح العالي في المفهوم الذاتي يبحرون في تحديات الحياة بثقة وهدف أكبر."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "The question \"Who am I?\" deserves more than a passing thought. It deserves structured, systematic exploration. Your future self will thank you for the investment you make today.",
                "سؤال \"من أنا؟\" يستحق أكثر من تفكيرة عابرة. يستحق استكشافاً منظماً ومنهجياً. ذاتك المستقبلية ستشكرك على الاستثمار الذي تقوم به اليوم."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <MidArticleUpgrade promoteTier="BASIC" variant="minimal" />
      <BlogArticleCTA ctaType="worksheet" />

      <ArticleNavigation currentSlug="who-am-i-worksheet" />

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

