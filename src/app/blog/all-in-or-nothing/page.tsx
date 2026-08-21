'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function AllInOrNothingArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "magic-in-work-you-avoid", title: getText("The Magic in Work You Avoid", "السحر في العمل الذي تتجنبه"), readTime: getText("6 min read", "٦ دقائق قراءة") },
    { slug: "five-steps-to-miracles", title: getText("Five Steps to Miracles", "خمس خطوات نحو المعجزات"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "becoming-exceptional", title: getText("Becoming Exceptional", "أن تصبح استثنائياً"), readTime: getText("8 min read", "٨ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Commitment", "الالتزام")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("All In or Nothing: The Power of Full Commitment", "إما الكل أو لا شيء: قوة الالتزام الكامل")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("7 min read", "٧ دقائق قراءة")}
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
              {getText("\"If you're going to do it, do it. Say what you can do, and do what you say. If you can't do it, don't say you can.\"", "\"إذا كنت ستفعلها، فافعلها. قل ما يمكنك فعله، وافعل ما تقوله. إذا لم تستطع، فلا تقل أنك تستطيع.\"")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Half-effort is the most expensive mistake you can make. Not because it fails—but because it leaves you uncertain. When you go all in, you get an answer. When you hold back, you get questions.", "نصف الجهد هو أغلى خطأ يمكنك ارتكابه. ليس لأنه يفشل — بل لأنه يتركك غير متأكد. عندما تنطلق بكامل قوتك، تحصل على إجابة. عندما تحجم، تحصل على أسئلة.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Problem with Half-Measures", "مشكلة الحلول النصفية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("When you approach something with half commitment, something strange happens. You don't know if you failed because it wasn't possible or because you didn't really try. You don't know if you succeeded despite your hesitation or because of your talent.", "عندما تقترب من شيء بنصف التزام، يحدث شيء غريب. لا تعرف إن كنت فشلت لأن الأمر لم يكن ممكناً أم لأنك لم تحاول حقاً. لا تعرف إن كنت نجحت رغم ترددك أم بسبب موهبتك.")}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText("\"When you do something with half effort, you simply don't know if you failed or succeeded, got what you wanted or didn't get what you wanted. This keeps many of us awake at night.\"", "\"عندما تفعل شيئاً بنصف جهد، ببساطة لا تعرف إن كنت فشلت أم نجحت، حصلت على ما تريده أم لم تحصل. هذا يبقي كثيرين منا مستيقظين في الليل.\"")}
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("This uncertainty is corrosive. It erodes trust in yourself. Each half-attempt adds to a growing database of \"I don't know if I can\" evidence.", "هذا عدم اليقين أكّال. يآكل الثقة بنفسك. كل محاولة ناقصة تضيف إلى قاعدة بيانات متزايدة من أدلة \"لا أعرف إن كنت أستطيع\".")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Clarity of Full Commitment", "وضوح الالتزام الكامل")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Full commitment changes everything. When you go all in—when you commit completely—you get answers:", "الالتزام الكامل يغير كل شيء. عندما تنطلق بكامل قوتك — عندما تلتزم تماماً — تحصل على إجابات:")}
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">{getText("If You Succeed", "إذا نجحت")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    {getText("You know it was real. You know your capabilities. You have evidence of what's possible.", "تعرف أنه كان حقيقياً. تعرف قدراتك. لديك دليل على ما هو ممكن.")}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="h-5 w-5 text-secondary" />
                    <h3 className="font-semibold text-primary">{getText("If You Fail", "إذا فشلت")}</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    {getText("You know it wasn't for you. You get to walk away clean. You discover what's truly yours.", "تعرف أنه لم يكن لك. يمكنك المغادرة بضمير نظيف. تكتشف ما هو لك حقاً.")}
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Either way, you discover something true. And truth—even painful truth—is infinitely more valuable than the limbo of half-commitment.", "في كلتا الحالتين، تكتشف شيئاً حقيقياً. والحقيقة — حتى المؤلمة — لا تقدر بثمن مقارنة بغموض نصف الالتزام.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Dip-Your-Toe Trap", "فخ غمس إصبع القدم")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Many people think they're being smart by testing the waters. They say \"I think I'll try it\" and put in partial effort. They call it being cautious or pragmatic.", "كثير من الناس يظنون أنهم أذكياء بتجربة المياه. يقولون \"أظن أنني سأجرب\" ويبذلون جهداً جزئياً. يسمون ذلك حذراً أو براغماتية.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("But here's the truth: thinking about trying is fine. Considering options is wise. But when you decide to go—go. Don't jump in and then dip your toe. Dive. Finish it. Discover.", "لكن إليك الحقيقة: التفكير في التجربة جيد. النظر في الخيارات حكيم. لكن عندما تقرر الانطلاق — انطلق. لا تقفز ثم تغمس إصبعك. اغوص. أتممه. اكتشف.")}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("The Commitment Protocol", "بروتوكول الالتزام")}</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span>{getText("Think before you commit. Weigh the costs. Consider the path.", "فكر قبل أن تلتزم. زن التكاليف. تأمل المسار.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span>{getText("When you commit, commit fully. No hedging. No backup plans draining energy.", "عندما تلتزم، التزم بالكامل. لا تحوط. لا خطط بديلة تستنزف الطاقة.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span>{getText("See it through to completion. Either succeed or fail completely.", "أتممه حتى النهاية. إما أن تنجح أو تفشل بالكامل.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span>{getText("Learn from the result. Either way, you have valuable data.", "تعلم من النتيجة. في كلتا الحالتين، لديك بيانات قيمة.")}</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Identity Transformation", "تحول الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Going all in does something to your identity. Each full commitment proves to yourself that you're someone who follows through. Someone who keeps their word. Someone who can be trusted.", "الانطلاق بكامل القوة يفعل شيئاً بهويتك. كل التزام كامل يثبت لنفسك أنك شخص يفي بما يقوله. شخص يحافظ على كلمته. شخص يمكن الوثوق به.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Half-efforts do the opposite. Each one adds to a growing sense of \"I can't trust myself.\" Each broken commitment—to yourself or others—erodes the foundation of your identity.", "الجهود الناقصة تفعل العكس. كل منها يضيف إلى إحساس متزايد بـ \"لا أستطيع الوثوق بنفسي.\" كل التزام مكسور — لنفسك أو للآخرين — يآكل أساس هويتك.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The person who goes all in becomes someone who goes all in. The person who hedges becomes someone who hedges. These identities compound over time, creating vastly different life trajectories.", "الشخص الذي ينطلق بكامل قوته يصبح شخصاً ينطلق بكامل قوته. الشخص الذي يحوط يصبح شخصاً يحوط. هذه الهويات تتراكم مع الوقت، خالقة مسارات حياة مختلفة جداً.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("What \"All In\" Really Means", "ماذا يعني \"بكامل القوة\" حقاً")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Going all in doesn't mean being reckless. It doesn't mean betting everything on a single moment. It means giving your complete attention and effort to whatever you've decided to do.", "الانطلاق بكامل القوة لا يعني التهور. لا يعني المراهنة بكل شيء على لحظة واحدة. يعني إعطاء انتباهك الكامل وجهدك لما قررت فعله.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("It means being willing to look in the mirror afterward and say, \"I gave everything I had.\" It means preferring clear failure over uncertain success. It means choosing truth over comfort.", "يعني أن تكون مستعداً للنظر في المرآة بعد ذلك وقول \"أعطيت كل ما أملك.\" يعني تفضيل الفشل الواضح على النجاح غير المؤكد. يعني اختيار الحقيقة على الراحة.")}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText("\"The discovery and looking in the mirror and saying, I didn't do that with half effort, I went all the way—I discovered this isn't for me, or I discovered and you're absolutely right, this IS for me. That's a great place to arrive at.\"", "\"الاكتشاف والنظر في المرآة وقول، لم أفعل ذلك بنصف جهد، ذهبت حتى النهاية — اكتشفت أن هذا ليس لي، أو اكتشفت وأنت محق تماماً، هذا هو لي. هذا مكان عظيم للوصول إليه.\"")}
              </p>
            </div>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">{getText("The Key Insight", "الفكرة المفتاحية")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText("The cost of half-effort isn't just failure. It's the endless loop of \"what if\" that follows you. Full commitment buys you something priceless: clarity. Whether you win or lose, you'll know. And knowing is the beginning of everything.", "تكلفة نصف الجهد ليست فقط الفشل. إنها الحلقة اللانهائية من \"ماذا لو\" التي تتبعك. الالتزام الكامل يشتري لك شيئاً لا يقدر بثمن: الوضوح. سواء فزت أم خسرت، ستعرف. والمعرفة هي بداية كل شيء.")}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="coach" />

      <ArticleNavigation currentSlug="all-in-or-nothing" />

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

