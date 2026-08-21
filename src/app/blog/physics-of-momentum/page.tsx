'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Zap, Target, TrendingUp } from "lucide-react";
import { BlogArticleJsonLd } from "@/components/seo/JsonLd";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function PhysicsOfMomentumArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <BlogArticleJsonLd
        headline="The Physics of Momentum: Why 18 Minutes Changes Everything"
        description="Discover how the science of momentum and habit formation can transform your identity in just 18 minutes a day."
        slug="physics-of-momentum"
        datePublished="2024-10-15"
        dateModified="2024-10-15"
        author="Tamkinly Team"
        keywords={["habit formation", "identity transformation", "momentum", "personal development", "18 minutes"]}
      />
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Identity Shift", "تحول الهوية")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The Physics of Momentum: Why 18 Minutes Changes Everything", "فيزياء الزخم: لماذا تغيّر ١٨ دقيقة كل شيء")}
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
                "If you want to become an expert in anything, it takes three months of 18 minutes each day. If you want to become a master, it takes 18 minutes a day for a year.",
                "إذا أردت أن تصبح خبيراً في أي شيء، يلزمك ثلاثة أشهر بمعدل ١٨ دقيقة يومياً. وإذا أردت أن تصبح ماهراً، يلزمك ١٨ دقيقة يومياً لمدة عام."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This simple truth reveals something profound about transformation. The gap between where you are and who you want to become isn't measured in years—it's measured in consistent, focused minutes.",
                "هذه الحقيقة البسيطة تكشف شيئاً عميقاً عن التحول. الفجوة بين مكانك ومن تريد أن تصبح لا تُقاس بالسنوات — بل تُقاس بالدقائق المركزة والمتسقة."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Law of Identity Momentum", "قانون زخم الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "In physics, a body in motion stays in motion unless acted upon by an external force. This isn't just a law of mechanics—it's a law of transformation. Once you begin moving toward a new identity, the hardest part isn't maintaining momentum. The hardest part is starting.",
                "في الفيزياء، الجسم المتحرك يبقى متحركاً ما لم تؤثر عليه قوة خارجية. هذا ليس مجرد قانون ميكانيكي — بل هو قانون للتحول. بمجرد أن تبدأ بالتحرك نحو هوية جديدة، أصعب جزء ليس الحفاظ على الزخم. أصعب جزء هو البدء."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Science tells us that habit formation takes approximately 21 days. After three weeks of consistent practice, your new behavior becomes \"carved in stone.\" It becomes something you simply do—without negotiation, without motivation, without the internal debate that kills most transformations before they begin.",
                "العلم يخبرنا أن تكوين العادات يستغرق حوالي ٢١ يوماً. بعد ثلاثة أسابيع من الممارسة المتسقة، يصبح سلوكك الجديد \"محفوراً في الحجر\". يصبح شيئاً تفعله ببساطة — بدون تفاوض، بدون تحفيز، بدون الجدال الداخلي الذي يقتل معظم التحولات قبل أن تبدأ."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"After 21 days, you're already in motion. You won't stop unless something catastrophic happens—a tragedy or trauma that pulls you off course. After 21 days, you have so much momentum that motivation becomes irrelevant. You simply do it without a second thought.\"",
                  "\"بعد ٢١ يوماً، أنت بالفعل في حركة. لن تتوقف ما لم يحدث شيء كارثي — مأساة أو صدمة تخرجك عن مسارك. بعد ٢١ يوماً، يكون لديك زخم كبير لدرجة أن التحفيز يصبح غير ذي صلة. أنت ببساطة تفعله دون تفكير.\""
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why 18 Minutes?", "لماذا ١٨ دقيقة؟")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Eighteen minutes isn't arbitrary. It's long enough to create meaningful engagement with your new identity, yet short enough to eliminate excuses. Anyone can find 18 minutes. The busy executive, the overwhelmed parent, the skeptical beginner—everyone has 18 minutes.",
                "ثماني عشرة دقيقة ليست عشوائية. إنها طويلة بما يكفي لخلق تفاعل حقيقي مع هويتك الجديدة، وقصيرة بما يكفي للقضاء على الأعذار. أي شخص يمكنه أن يجد ١٨ دقيقة. المدير المشغول، الوالد المنهك، المبتدئ المتشكك — الجميع لديه ١٨ دقيقة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "But here's what makes this timeframe powerful: it bypasses your brain's resistance system. Your mind can't mount a serious objection to 18 minutes. It can't generate the fear and overwhelm that stops most transformation efforts before they start.",
                "لكن هذا ما يجعل هذا الإطار الزمني قوياً: إنه يتجاوز نظام المقاومة في دماغك. عقلك لا يستطيع أن يبدي اعتراضاً جاداً على ١٨ دقيقة. لا يمكنه توليد الخوف والإرهاق الذي يوقف معظم جهود التحول قبل أن تبدأ."
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("21 Days", "٢١ يوماً")}</h3>
                  <p className="text-sm text-slate-600">{getText("Habit formation, momentum takes over", "تكوين العادات، الزخم يتولى الأمر")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("3 Months", "٣ أشهر")}</h3>
                  <p className="text-sm text-slate-600">{getText("Expert level proficiency in any skill", "مستوى الخبرة في أي مهارة")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("1 Year", "عام واحد")}</h3>
                  <p className="text-sm text-slate-600">{getText("Mastery, complete identity integration", "الإتقان، اندماج الهوية بالكامل")}</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Identity Connection", "الارتباط بالهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This principle extends far beyond skill acquisition. It's the foundation of identity transformation. Every day you show up for those 18 minutes, you're not just practicing a skill—you're practicing a new version of yourself.",
                "هذا المبدأ يمتد إلى أبعد من اكتساب المهارات. إنه أساس تحول الهوية. كل يوم تحضر فيه ل تلك الـ ١٨ دقيقة، لست تتدرب فقط على مهارة — بل تتدرب على نسخة جديدة من نفسك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When you write for 18 minutes, you're not \"trying to write.\" You're a writer. When you meditate for 18 minutes, you're not \"attempting meditation.\" You're a meditator. When you exercise for 18 minutes, you're not \"trying to get fit.\" You're an athlete.",
                "عندما تكتب لمدة ١٨ دقيقة، لست \"تحاول الكتابة.\" أنت كاتب. عندما تتأمل لمدة ١٨ دقيقة، لست \"تحاول التأمل.\" أنت متأمل. عندما تمارس الرياضة لمدة ١٨ دقيقة، لست \"تحاول أن تصبح لائقاً.\" أنت رياضي."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The behavior comes first. The identity follows. And after 21 days, the behavior is automatic—meaning the identity becomes automatic too.",
                "السلوك يأتي أولاً. الهوية تتبعه. وبعد ٢١ يوماً، يصبح السلوك تلقائياً — مما يعني أن الهوية تصبح تلقائية أيضاً."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Breaking the Inertia", "كسر القصور الذاتي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Most people never start because they're waiting for motivation. They're waiting to feel ready. They're waiting for the perfect circumstances. But physics teaches us another truth: static objects tend to stay static.",
                "معظم الناس لا يبدأون أبداً لأنهم ينتظرون التحفيز. ينتظرون الشعور بالجاهزية. ينتظرون الظروف المثالية. لكن الفيزياء تعلمنا حقيقة أخرى: الأجسام الساكنة تميل إلى البقاء ساكنة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The answer isn't motivation. The answer is movement. Small, consistent, almost embarrassingly small movement. Because once you're moving, continuing becomes easier than stopping.",
                "الجواب ليس التحفيز. الجواب هو الحركة. حركة صغيرة، متسقة، صغيرة بشكل محرج تقريباً. لأنه بمجرد أن تبدأ بالحركة، يصبح الاستمرار أسهل من التوقف."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("The Momentum Protocol", "بروتوكول الزخم")}</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span>{getText("Choose your new identity. What do you want to become?", "اختر هويتك الجديدة. ماذا تريد أن تصبح؟")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span>{getText("Define the smallest daily action that represents that identity.", "حدد أصغر فعل يومي يمثل تلك الهوية.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span>{getText("Commit to 18 minutes. No more, no less.", "التزم بـ ١٨ دقيقة. لا أكثر ولا أقل.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span>{getText("Mark each day complete. Build the chain.", "سجل كل يوم كمكتمل. ابنِ السلسلة.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">5</span>
                  <span>{getText("After 21 days, notice that the resistance has disappeared.", "بعد ٢١ يوماً، لاحظ أن المقاومة قد اختفت.")}</span>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Compound Effect", "التأثير التراكمي")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Three months of 18-minute days equals 27 hours of focused practice. That's enough to become an expert in almost anything. A year equals 109 hours—enough for mastery.",
                "ثلاثة أشهر من أيام الـ ١٨ دقيقة تساوي ٢٧ ساعة من الممارسة المركزة. هذا يكفي لتصبح خبيراً في أي شيء تقريباً. سنة تساوي ١٠٩ ساعات — تكفي للإتقان."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "But the real compound effect isn't in the hours. It's in the identity. Every day you show up, you reinforce the neural pathways of your new self. You become the person who does this thing. And that identity shift ripples into every area of your life.",
                "لكن التأثير التراكمي الحقيقي ليس في الساعات. إنه في الهوية. كل يوم تحضر فيه، تعزز المسارات العصبية لذاتك الجديدة. تصبح الشخص الذي يفعل هذا الشيء. ويتسع تحول الهوية ليشمل كل مجالات حياتك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The writer becomes more observant. The athlete becomes more disciplined. The meditator becomes more present. The new identity doesn't just add a skill—it transforms how you show up in the world.",
                "الكاتب يصبح أكثر ملاحظة. الرياضي يصبح أكثر انضباطاً. المتأمل يصبح أكثر حضوراً. الهوية الجديدة لا تضيف فقط مهارة — بل تحول طريقة ظهورك في العالم."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <TrendingUp className="h-5 w-5" />
              <span className="font-semibold">{getText("The Key Insight", "الفكرة الأساسية")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The transformation you're seeking isn't hiding in a dramatic life overhaul. It's hiding in 18 minutes. The question isn't whether you have time. The question is whether you're willing to start small enough to actually start.",
                "التحول الذي تبحث عنه ليس مخبأً في إصلاح جذري للحياة. إنه مخبأٌ في ١٨ دقيقة. السؤال ليس ما إذا كان لديك وقت. السؤال هو هل أنت مستعد أن تبدأ بصغر يكفي لتبدأ فعلاً."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "A body in motion stays in motion. The hardest part is the first push. After that, momentum does the work for you.",
                "الجسم المتحرك يبقى متحركاً. أصعب جزء هو الدفعة الأولى. بعد ذلك، الزخم يقوم بالعمل نيابة عنك."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />

      <ArticleNavigation currentSlug="physics-of-momentum" />
        <BlogConversionSection />
      </article>
    </>
  );
}

