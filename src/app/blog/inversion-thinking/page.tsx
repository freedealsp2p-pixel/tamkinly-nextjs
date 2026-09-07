'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, AlertTriangle, Lightbulb, XCircle, CheckCircle } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function InversionThinkingArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "identity-millionaire", title: getText("The Identity Millionaire", "المليونير بالهوية"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "ten-minute-block-system", title: getText("The 10-Minute Block System", "نظام الكتل ذات العشر دقائق"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "speed-as-strategy", title: getText("Speed as Strategy", "السرعة كاستراتيجية"), readTime: getText("7 min read", "٧ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Strategy", "استراتيجية")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Inversion Thinking: How to Win by Avoiding Failure", "التفكير العكسي: كيف تفوز بتجنب الفشل")}
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
              {getText("\"All I want to know is where I'm going to die, so I'll never go there.\" — Charlie Munger", "\"كل ما أريد معرفته هو أين سأموت، حتى لا أذهب إلى هناك أبداً.\" — تشارلي مانجر")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("This single quote from billionaire investor Charlie Munger reveals one of the most powerful thinking frameworks available. While everyone else asks \"How do I succeed?\" Munger asks \"How do I fail?\"—then simply avoids doing that.", "يكشف هذا الاقتباس الوحيد من المستثمر الملياردير تشارلي مانجر عن أحد أقوى أطر التفكير المتاحة. بينما يسأل الجميع \"كيف أنجح؟\" يسأل مانجر \"كيف أفشل؟\" — ثم يتجنب ببساطة القيام بذلك.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("It sounds simple. But this inversion principle built two of the most successful investment track records in history. And you don't need to be the smartest person in the room to use it.", "يبدو بسيطاً. لكن مبدأ الانعكاس هذا بنى اثنين من أنجح سجلات الاستثمار في التاريخ. ولا تحتاج أن تكون أذكى شخص في الغرفة لاستخدامه.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Inversion Principle", "مبدأ الانعكاس")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Most failures don't come from a lack of intelligence or opportunity. They come from obvious, avoidable mistakes: overspending, chasing shiny objects, ignoring what's working, neglecting relationships, avoiding difficult conversations.", "معظم الإخفاقات لا تأتي من نقص الذكاء أو الفرص. تأتي من أخطاء واضحة يمكن تجنبها: الإنفاق المفرط، مطاردة البريق، تجاهل ما ينجح، إهمال العلاقات، تجنب المحادثات الصعبة.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Instead of trying to be brilliant, focus on not being stupid. Instead of chasing success, focus on avoiding failure. The results are often the same—but the approach is far more reliable.", "بدلاً من محاولة أن تكون عبقرياً، ركز على ألا تكون غبياً. بدلاً من مطاردة النجاح، ركز على تجنب الفشل. النتائج غالباً واحدة — لكن المنهج أكثر موثوقية بكثير.")}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText("\"Instead of asking how to win, ask how to lose—then make sure you don't do those things.\"", "\"بدلاً من أن تسأل كيف تفوز، اسأل كيف تخسر — ثم تأكد من ألا تفعل تلك الأشياء.\"")}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Anti-Goal Exercise", "تمرين الأهداف العكسية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Here's how to apply inversion thinking to any area of your life:", "إليك كيف تطبق التفكير العكسي في أي مجال من حياتك:")}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("Step 1: Define Failure", "الخطوة ١: حدد الفشل")}</h3>
              <p className="text-slate-600 mb-4">
                {getText("Instead of writing your goals, write exactly how you would fail:", "بدلاً من كتابة أهدافك، اكتب بالضبط كيف ستفشل:")}
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>{getText("• How would you go bankrupt?", "• كيف ستُفلس؟")}</li>
                <li>{getText("• How would you destroy your health?", "• كيف ستدمر صحتك؟")}</li>
                <li>{getText("• How would you ruin your relationships?", "• كيف ستخرب علاقاتك؟")}</li>
                <li>{getText("• How would you ensure you never achieve your dreams?", "• كيف ستضمن ألا تحقق أحلامك أبداً؟")}</li>
              </ul>
            </div>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("Step 2: Invert the List", "الخطوة ٢: اعكس القائمة")}</h3>
              <p className="text-slate-600 mb-4">
                {getText("Take your failure list and avoid every item on it:", "خذ قائمة الفشل وتجنب كل بند فيها:")}
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>{getText("• To avoid bankruptcy: spend less than you earn, build reserves.", "• لتجنب الإفلاس: أنفق أقل مما تكسب، ابنِ احتياطيات.")}</li>
                <li>{getText("• To avoid health collapse: move daily, sleep enough, manage stress.", "• لتجنب انهيار الصحة: تحرك يومياً، نم بما يكفي، أدر التوتر.")}</li>
                <li>{getText("• To avoid relationship ruin: communicate, show up, apologize.", "• لتجنب تدمير العلاقات: تواصل، احضر، اعتذر.")}</li>
                <li>{getText("• To avoid dream death: take action, persist, stay focused.", "• لتجنب موت الأحلام: اتخذ إجراءً، استمر، ابقَ مركزاً.")}</li>
              </ul>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("This isn't about pessimism. It's about clarity. When you see clearly what leads to failure, the path to success becomes obvious.", "هذا ليس تشاؤماً. إنه وضوح. عندما ترى بوضوح ما يقود إلى الفشل، يصبح طريق النجاح واضحاً.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Common Failure Patterns", "أنماط الفشل الشائعة")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <XCircle className="h-5 w-5 text-[#C97B7B]" />
                    <h3 className="font-semibold text-primary">{getText("Financial Failure", "الفشل المالي")}</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>{getText("• Lifestyle inflation with income", "• تضخم نمط الحياة مع الدخل")}</li>
                    <li>{getText("• No emergency fund", "• لا صندوق طوارئ")}</li>
                    <li>{getText("• High-interest debt", "• ديون ذات فائدة عالية")}</li>
                    <li>{getText("• No income diversification", "• لا تنويع في مصادر الدخل")}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">{getText("Financial Safety", "الأمان المالي")}</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>{getText("• Live below your means", "• عش دون إمكانياتك")}</li>
                    <li>{getText("• Build 6-month reserves", "• ابنِ احتياطيات ستة أشهر")}</li>
                    <li>{getText("• Eliminate bad debt", "• تخلص من الديون السيئة")}</li>
                    <li>{getText("• Create multiple income streams", "• أنشئ مصادر دخل متعددة")}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <XCircle className="h-5 w-5 text-[#C97B7B]" />
                    <h3 className="font-semibold text-primary">{getText("Identity Failure", "فشل الهوية")}</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>{getText("• Living others' expectations", "• العيش وفق توقعات الآخرين")}</li>
                    <li>{getText("• Never defining your values", "• عدم تحديد قيمك أبداً")}</li>
                    <li>{getText("• Avoiding self-reflection", "• تجنب التأمل الذاتي")}</li>
                    <li>{getText("• Blaming circumstances", "• لوم الظروف")}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">{getText("Identity Clarity", "وضوح الهوية")}</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>{getText("• Define who you are", "• حدد من أنت")}</li>
                    <li>{getText("• Clarify core values", "•وضح القيم الأساسية")}</li>
                    <li>{getText("• Regular self-examination", "• فحص ذاتي منتظم")}</li>
                    <li>{getText("• Take radical responsibility", "• تحمل المسؤولية الكاملة")}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Applying Inversion to Identity", "تطبيق الانعكاس على الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Inversion thinking applies beautifully to identity transformation. Instead of asking \"How do I become the person I want to be?\" ask \"What would ensure I stay the person I don't want to be?\"", "ينطبق التفكير العكسي بشكل رائع على تحول الهوية. بدلاً من أن تسأل \"كيف أصبح الشخص الذي أريد أن أكونه؟\" اسأل \"ما الذي سيضمن أن أبقى الشخص الذي لا أريد أن أكونه؟\"")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The answers are often uncomfortable but clarifying:", "الإجابات غالباً غير مريحة لكنها توضح الأمور:")}
            </p>

            <ul className="space-y-3 text-slate-600 my-6">
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>{getText("Keep consuming content without taking action", "استمر في استهلاك المحتوى دون اتخاذ إجراء")}</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>{getText("Stay in environments that don't support your growth", "ابقَ في بيئات لا تدعم نموك")}</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>{getText("Neglect the daily practices that build new neural pathways", "أهمل الممارسات اليومية التي تبني مسارات عصبية جديدة")}</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>{getText("Avoid difficult conversations with yourself", "تجنب المحادثات الصعبة مع نفسك")}</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>{getText("Wait for motivation instead of building discipline", "انتظر الحماس بدلاً من بناء الانضباط")}</span>
              </li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Now invert: Do the opposite of each. That's your transformation plan.", "الآن اعكس: افعل عكس كل منها. هذه خطة تحولك.")}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Lightbulb className="h-5 w-5" />
              <span className="font-semibold">{getText("The Key Insight", "الفكرة المفتاحية")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText("You don't need a perfect plan to succeed. You just need to avoid the obvious ways to fail. Stay away from where you don't want to end up, and you'll naturally move toward where you do.", "لست بحاجة إلى خطة مثالية لتنجح. أنت فقط بحاجة لتجنب الطرق الواضحة للفشل. ابقَ بعيداً عن المكان الذي لا تريد أن تنتهي فيه، وستتحرك بشكل طبيعي نحو المكان الذي تريده.")}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleReferences slug="inversion-thinking" />

      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="coach" />

      <ArticleNavigation currentSlug="inversion-thinking" />

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

