'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Heart, Star, Target, Compass, Sparkles, CheckCircle2 } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function ValuesClarificationToolArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "identity-gap-assessment", title: getText("The Identity Gap Assessment: Measuring Who You Are vs. Who You Want to Be", "تقييم فجوة الهوية: قياس من أنت مقابل من تريد أن تكون"), readTime: getText("10 min read", "10 دقائق قراءة") },
    { slug: "physics-of-momentum", title: getText("The Physics of Momentum: Why 18 Minutes Changes Everything", "فيزياء الزخم: لماذا تغير 18 دقيقة كل شيء"), readTime: getText("8 min read", "8 دقائق قراءة") },
    { slug: "work-on-yourself", title: getText("Work on Yourself: Psycho-Cybernetics", "اعمل على نفسك: السايبرنيتيكا النفسية"), readTime: getText("10 min read", "10 دقائق قراءة") }
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
              {getText("Values Clarification: The Foundation of Authentic Identity", "توضيح القيم: أساس الهوية الأصيلة")}
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
                "Your values are the invisible architecture of your identity. When you know what truly matters to you, every decision becomes clearer, every action more aligned, and every step forward more purposeful.",
                "قيمك هي البنية الخفية لهويتك. عندما تعرف ما يهمك حقًا، يصبح كل قرار أوضح، وكل فعل أكثر توافقًا، وكل خطوة للأمام أكثر هدفًا."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research in positive psychology has consistently shown that values clarity—the clear understanding of what matters most to you—is strongly associated with psychological well-being, life satisfaction, and a sense of purpose. A study published in the Journal of Research in Personality found that individuals with clear personal values reported significantly higher levels of meaning in life and lower levels of anxiety and depression.",
                "أظهرت الأبحاث في علم النفس الإيجابي باستمرار أن وضوح القيم—الفهم الواضح لما يهمك أكثر—مرتبط بقوة بالرفاهية النفسية والرضا عن الحياة والشعور بالهدف. وجدت دراسة منشورة في مجلة أبحاث الشخصية أن الأفراد الذين لديهم قيم شخصية واضحة أبلغوا عن مستويات أعلى بكثير من المعنى في الحياة ومستويات أقل من القلق والاكتئاب."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("What Is Values Clarification?", "ما هو توضيح القيم؟")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Values clarification is the process of identifying, examining, and prioritizing the principles that guide your life. Unlike goals—which are destinations you achieve—values are directions you travel. You don't \"achieve\" honesty or creativity; you live in alignment with them.",
                "توضيح القيم هو عملية تحديد وفحص وترتيب المبادئ التي توجه حياتك. على عكس الأهداف—التي هي وجهات تصل إليها—القيم هي اتجاهات تسير فيها. أنت لا \"تحقق\" الصدق أو الإبداع؛ بل تعيش وفقًا لها."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This distinction is crucial for identity transformation. When your actions align with your values, you reinforce the neural pathways of your desired identity. When there's misalignment, you create cognitive dissonance—a psychological tension that undermines your sense of self.",
                "هذا التمييز حاسم لتحويل الهوية. عندما تتوافق أفعالك مع قيمك، فإنك تعزز المسارات العصبية لهويتك المرغوبة. وعندما يوجد عدم توافق، فإنك تخلق تنافرًا معرفيًا—توترًا نفسيًا يقوض إحساسك بذاتك."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"Values are like fingerprints. Nobody's are the same, but you leave 'em all over everything you do.\" — Elvis Presley",
                  "\"القيم كبصمات الأصابع. لا أحد يمتلك نفسها، لكنك تتركها على كل شيء تفعله.\" — إلفيس بريسلي"
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Science: Values and Psychological Well-Being", "العلم: القيم والرفاهية النفسية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The connection between values clarity and well-being is well-documented in psychological research. Acceptance and Commitment Therapy (ACT), developed by Steven Hayes, places values clarification at its core. Research shows that ACT interventions focusing on values lead to significant improvements in psychological flexibility and reduced symptoms of anxiety and depression.",
                "العلاقة بين وضوح القيم والرفاهية موثقة جيدًا في الأبحاث النفسية. علاج القبول والالتزام (ACT)، الذي طوره ستيفن هايز، يضع توضيح القيم في جوهره. تُظهر الأبحاث أن تدخلات ACT التي تركز على القيم تؤدي إلى تحسينات كبيرة في المرونة النفسية وتقليل أعراض القلق والاكتئاب."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "A comprehensive meta-analysis published in Psychological Bulletin examined 82 studies on values and well-being. The findings were clear: people who understood their core values and lived in alignment with them reported higher life satisfaction, greater sense of purpose, and stronger relationships.",
                "فحصت دراسة تلوية شاملة منشورة في النشرة النفسية 82 دراسة عن القيم والرفاهية. كانت النتائج واضحة: الأشخاص الذين فهموا قيمهم الجوهرية وعاشوا وفقًا لها أبلغوا عن رضا أعلى عن الحياة، وشعور أكبر بالهدف، وعلاقات أقوى."
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Compass className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Direction", "الاتجاه")}</h3>
                  <p className="text-sm text-slate-600">{getText("Values provide a compass for navigating life's decisions", "توفر القيم بوصلة للتنقل في قرارات الحياة")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Purpose", "الهدف")}</h3>
                  <p className="text-sm text-slate-600">{getText("Clear values create a sense of meaning and significance", "القيم الواضحة تخلق شعورًا بالمعنى والأهمية")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#2A8A94]/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-[#2A8A94]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Alignment", "التوافق")}</h3>
                  <p className="text-sm text-slate-600">{getText("Living your values reduces cognitive dissonance", "العيش وفق قيمك يقلل التنافر المعرفي")}</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Values-Identity Connection", "العلاقة بين القيم والهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Your values and your identity are deeply interconnected. In fact, many identity scholars argue that values form the core of identity. When you say \"I am an honest person,\" you're not just describing a trait—you're declaring a value that shapes your behavior, relationships, and self-concept.",
                "قيمك وهويتك مرتبطان بعمق. في الواقع، يجادل العديد من علماء الهوية بأن القيم تشكل جوهر الهوية. عندما تقول \"أنا شخص صادق\"، فأنت لا تصف سمة فحسب—بل تعلن عن قيمة تشكل سلوكك وعلاقاتك ومفهومك عن ذاتك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "James Clear's identity-based habit framework builds on this connection. He argues that lasting change comes not from focusing on what you want to achieve, but on who you want to become. And who you want to become is defined by your values.",
                "يستند إطار العادات القائم على الهوية لجيمس كلير إلى هذه العلاقة. يجادل بأن التغيير الدائم لا يأتي من التركيز على ما تريد تحقيقه، بل على من تريد أن تصبح. ومن تريد أن تصبح يحدده قيمك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Values Clarification Tool helps you discover this foundation. By selecting and ranking your top values, you create a personal hierarchy that can guide every decision—from small daily choices to major life directions.",
                "تساعدك أداة توضيح القيم على اكتشاف هذا الأساس. من خلال اختيار وترتيب قيمك الأهم، تخلق تسلسلًا هرميًا شخصيًا يمكن أن يوجه كل قرار—من الاختيارات اليومية الصغيرة إلى الاتجاهات الحياتية الكبرى."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("The Two-Step Clarification Process", "عملية التوضيح ذات الخطوتين")}</h3>
              <ol className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <div>
                    <strong className="text-primary">{getText("Selection:", "الاختيار:")}</strong> {getText("Browse through values across six categories—Personal Growth, Achievement, Relationships, Integrity, Well-being, and Contribution. Choose 5-10 that resonate most deeply with you.", "تصفح القيم عبر ست فئات—النمو الشخصي، الإنجاز، العلاقات، النزاهة، الرفاهية، والمساهمة. اختر 5-10 قيم تتوافق معك بعمق.")}
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <div>
                    <strong className="text-primary">{getText("Ranking:", "الترتيب:")}</strong> {getText("Order your top 5 values by importance. This prioritization reveals your core identity pillars.", "رتب أهم 5 قيم حسب الأهمية. يكشف هذا الترتيب أعمدة هويتك الجوهرية.")}
                  </div>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why Ranking Matters", "لماذا يهم الترتيب")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Selecting values is important, but ranking them reveals something deeper. When forced to choose between competing values—family versus career, freedom versus security, growth versus stability—your ranking shows what truly drives your decisions.",
                "اختيار القيم مهم، لكن ترتيبها يكشف شيئًا أعمق. عندما تُجبر على الاختيار بين قيم متعارضة—العائلة مقابل المسيرة، الحرية مقابل الأمان، النمو مقابل الاستقرار—يُظهر ترتيبك ما يحرك قراراتك حقًا."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research on values conflicts shows that internal tension often arises not from lacking values, but from unclear prioritization. When you know your #1 value is family, decisions that sacrifice work time for family time feel aligned rather than conflicted.",
                "تُظهر الأبحاث حول صراعات القيم أن التوتر الداخلي ينشأ غالبًا ليس من نقص القيم، بل من عدم وضوح الأولويات. عندما تعرف أن قيمتك الأولى هي العائلة، فإن القرارات التي تضحي بوقت العمل لصالح وقت العائلة تبدو متوافقة بدلاً من متعارضة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The tool presents values across six meaningful categories:", "تقدم الأداة القيم عبر ست فئات ذات معنى:")}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
              <div className="p-4 rounded-lg bg-[#3DD4B0]/10">
                <div className="w-3 h-3 rounded-full bg-[#3DD4B0] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">{getText("Personal Growth", "النمو الشخصي")}</h4>
                <p className="text-xs text-slate-500">{getText("Growth, Wisdom, Creativity, Curiosity", "النمو، الحكمة، الإبداع، الفضول")}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#2A8A94]/10">
                <div className="w-3 h-3 rounded-full bg-[#2A8A94] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">{getText("Achievement", "الإنجاز")}</h4>
                <p className="text-xs text-slate-500">{getText("Achievement, Ambition, Competence", "الإنجاز، الطموح، الكفاءة")}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#C97B7B]/10">
                <div className="w-3 h-3 rounded-full bg-[#C97B7B] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">{getText("Relationships", "العلاقات")}</h4>
                <p className="text-xs text-slate-500">{getText("Family, Friendship, Love, Compassion", "العائلة، الصداقة، الحب، التعاطف")}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#2A8A94]/10">
                <div className="w-3 h-3 rounded-full bg-[#2A8A94] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">{getText("Integrity", "النزاهة")}</h4>
                <p className="text-xs text-slate-500">{getText("Honesty, Integrity, Justice, Responsibility", "الصدق، النزاهة، العدالة، المسؤولية")}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#2A8A94]/10">
                <div className="w-3 h-3 rounded-full bg-[#2A8A94] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">{getText("Well-being", "الرفاهية")}</h4>
                <p className="text-xs text-slate-500">{getText("Health, Balance, Peace, Freedom", "الصحة، التوازن، السلام، الحرية")}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#3DD4B0]/10">
                <div className="w-3 h-3 rounded-full bg-[#3DD4B0] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">{getText("Contribution", "المساهمة")}</h4>
                <p className="text-xs text-slate-500">{getText("Service, Legacy, Community, Mentoring", "الخدمة، الإرث، المجتمع، الإرشاد")}</p>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("From Values to Action", "من القيم إلى الفعل")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Clarifying your values is powerful, but it's only the first step. The real transformation comes from living in alignment with them. This is where the Values Clarification Tool connects to the broader identity transformation framework.",
                "توضيح قيمك أمر قوي، لكنها الخطوة الأولى فقط. التحول الحقيقي يأتي من العيش وفقًا لها. هنا تتصل أداة توضيح القيم بإطار تحويل الهوية الأوسع."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("After completing the tool, you'll receive reflection questions designed to deepen your understanding:", "بعد إكمال الأداة، ستتلقى أسئلة تأمل مصممة لتعميق فهمك:")}
            </p>

            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <Star className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">{getText("How do your daily actions reflect your top value?", "كيف تعكس أفعالك اليومية قيمتك الأهم؟")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">{getText("When did you last make a decision that conflicted with these values?", "متى اتخذت آخر قرار تعارض مع هذه القيم؟")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">{getText("What would your life look like if you fully embodied these values?", "كيف ستبدو حياتك إذا جسّدت هذه القيم بالكامل؟")}</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">{getText("Which of these values needs more attention in your current life?", "أي من هذه القيم يحتاج إلى مزيد من الاهتمام في حياتك الحالية؟")}</span>
              </li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "These questions bridge the gap between intellectual understanding and behavioral change. They invite you to examine the alignment between your stated values and your lived reality.",
                "هذه الأسئلة تسد الفجوة بين الفهم الفكري والتغيير السلوكي. إنها تدعوك لفحص التوافق بين قيمك المعلنة وواقعك المعاش."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-4">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">{getText("FREE Tool Available", "أداة مجانية متاحة")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Values Clarification Tool is available at no cost. In about 5 minutes, you'll discover and rank your top 5 core values—the principles that define who you are and who you want to become.",
                "أداة توضيح القيم متاحة بدون تكلفة. في حوالي 5 دقائق، ستكتشف وترتب أهم 5 قيم جوهرية—المبادئ التي تحدد من أنت ومن تريد أن تصبح."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Ripple Effect of Values Clarity", "تأثير تموجات وضوح القيم")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When you clarify your values, something remarkable happens. Decision-making becomes easier because you have a clear hierarchy. Goal-setting becomes more meaningful because your goals align with what matters most. And identity transformation becomes more natural because you're clear about who you're becoming.",
                "عندما توضح قيمك، يحدث شيء ملحوظ. يصبح اتخاذ القرارات أسهل لأن لديك تسلسلًا هرميًا واضحًا. يصبح تحديد الأهداف أكثر معنى لأن أهدافك تتوافق مع ما يهمك أكثر. ويتحول تحويل الهوية بشكل طبيعي أكثر لأنك واضح بشأن من تصبح."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Research on self-concordant goals—goals aligned with your values—shows that people who pursue value-aligned goals experience higher well-being and greater goal achievement. When your goals express your values, you have more intrinsic motivation to pursue them.",
                "تُظهر الأبحاث حول الأهداف المتوافقة مع الذات—الأهداف المتوافقة مع قيمك—أن الأشخاص الذين يسعون وراء أهداف متوافقة مع قيمهم يشعرون برفاهية أعلى وإنجاز أكبر للأهداف. عندما تعبر أهدافك عن قيمك، يكون لديك دافع ذاتي أكبر لتحقيقها."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The Values Clarification Tool is part of Tamkinly's FREE tier because we believe everyone deserves this foundational clarity. Knowing your values isn't a luxury—it's essential for authentic identity transformation.",
                "أداة توضيح القيم جزء من المستوى المجاني من تمكنلي لأننا نؤمن أن الجميع يستحق هذه الوضوح الأساسي. معرفة قيمك ليست رفاهية—إنها ضرورية لتحويل الهوية الأصيل."
              )}
            </p>

            <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] p-8 rounded-xl my-10 text-center">
              <h3 className="text-white text-xl font-bold mb-3">{getText("Discover Your Core Values", "اكتشف قيمك الجوهرية")}</h3>
              <p className="text-slate-300 mb-6">
                {getText("Take the free 5-minute values clarification exercise. Find out what truly drives you.", "قم بتمرين توضيح القيم المجاني الذي يستغرق 5 دقائق. اكتشف ما يحركك حقًا.")}
              </p>
              <Link href="/apps/values-clarification">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  {getText("Start Clarifying Values", "ابدأ بتوضيح القيم")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "Your values are already within you, guiding your decisions whether you're conscious of them or not. Clarification simply brings them into awareness, giving you the power to intentionally shape your identity around what matters most.",
                "قيمك موجودة بداخلك بالفعل، توجه قراراتك سواء كنت واعيًا بها أم لا. التوضيح ببساطة يجلبها إلى الوعي، مما يمنحك القدرة على تشكيل هويتك بوعي حول ما يهمك أكثر."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleReferences slug="values-clarification-tool" />

      <MidArticleUpgrade promoteTier="BASIC" variant="minimal" />
      <BlogArticleCTA ctaType="values" />

      <ArticleNavigation currentSlug="values-clarification-tool" />

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

