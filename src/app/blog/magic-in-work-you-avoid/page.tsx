'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, AlertTriangle, Sparkles, Compass } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

export default function MagicInWorkYouAvoidArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "ten-minute-block-system", title: getText("The 10-Minute Block System", "نظام الكتل العشر دقائق"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "all-in-or-nothing", title: getText("All In or Nothing", "كل شيء أو لا شيء"), readTime: getText("7 min read", "٧ دقائق قراءة") },
    { slug: "physics-of-momentum", title: getText("The Physics of Momentum", "فيزياء الزخم"), readTime: getText("8 min read", "٨ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Transformation", "التحول")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The Magic Is in the Work You Avoid", "السحر في العمل الذي تتجنبه")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("6 min read", "٦ دقائق قراءة")}
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
                "\"The magic you're looking for is in the work you're avoiding.\"",
                "\"السحر الذي تبحث عنه في العمل الذي تتجنبه.\""
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This single sentence carries the weight of every transformation you've ever wanted. That uncomfortable task sitting on your list. The conversation you've been putting off. The practice you know would change everything but somehow never happens.",
                "هذه الجملة الواحدة تحمل ثقل كل تحول أردته يوماً. تلك المهمة غير المريحة على قائمتك. المحادثة التي تؤجلها. الممارسة التي تعرف أنها ستغير كل شيء لكنها بطريقة ما لا تحدث أبداً."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The resistance you feel isn't random. It's a compass. And it's pointing directly toward your growth.",
                "المقاومة التي تشعر بها ليست عشوائية. إنها بوصلة. وتشير مباشرة نحو نموك."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Resistance Map", "خريطة المقاومة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Your brain is designed to protect you from discomfort. When something feels hard, scary, or uncertain, your survival instincts kick in. They create resistance. They generate excuses. They manufacture reasons to delay.",
                "دماغك مصمم لحمايتك من عدم الراحة. عندما يشعر بشيء صعب أو مخيف أو غير مؤكد، تنطلق غرائز البقاء لديك. تخلق المقاومة. تولد الأعذار. تصنع أسباباً للتأجيل."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "But here's what most people miss: that resistance is information. It's not telling you to stop. It's telling you where the growth lives.",
                "لكن هذا ما يفوته معظم الناس: تلك المقاومة هي معلومة. إنها لا تخبرك بالتوقف. إنها تخبرك أين يكمن النمو."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"The tasks you avoid reveal the edges of your comfort zone. And the edges of your comfort zone are precisely where transformation happens.\"",
                  "\"المهام التي تتجنبها تكشف حدود منطقة راحتك. وحدود منطقة راحتك هي بالضبط حيث يحدث التحول.\""
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why We Avoid the Magic", "لماذا نتجنب السحر")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The work you avoid usually falls into three categories:",
                "العمل الذي تتجنبه عادةً يقع في ثلاث فئات:"
              )}
            </p>

            <div className="space-y-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("Identity-Threatening Work", "عمل يهدد الهوية")}</h3>
                      <p className="text-sm text-slate-600">
                        {getText(
                          "This challenges who you believe you are. The person who's always been \"bad at math\" avoiding the finance course. The \"shy person\" avoiding public speaking. The work that would force you to become someone new.",
                          "هذا يتحدى من تعتقد أنك عليه. الشخص الذي كان دائماً \"سيئاً في الرياضيات\" يتجنب دورة المالية. \"الشخص الخجول\" يتجنب التحدث أمام الجمهور. العمل الذي سيجبرك على أن تصبح شخصاً جديداً."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("Potential-Revealing Work", "عمل يكشف الإمكانات")}</h3>
                      <p className="text-sm text-slate-600">
                        {getText(
                          "This threatens to show you what you're capable of. If you actually did it, you'd have to acknowledge your own power. And that would mean you've been playing small. The work that would force you to own your potential.",
                          "هذا يهدد بأن يريك ما أنت قادر عليه. إذا فعلته فعلاً، سيتعين عليك الاعتراف بقوتك. وهذا يعني أنك كنت تلعب صغيراً. العمل الذي سيجبرك على امتلاك إمكاناتك."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Compass className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{getText("Truth-Requiring Work", "عمل يتطلب الحقيقة")}</h3>
                      <p className="text-sm text-slate-600">
                        {getText(
                          "This demands honesty. The difficult conversation. The confronting look in the mirror. The work that would strip away your illusions and force you to see reality clearly.",
                          "هذا يتطلب الصدق. المحادثة الصعبة. النظرة المواجهة في المرآة. العمل الذي سيجردك من أوهامك ويجبرك على رؤية الواقع بوضوح."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Identity Shift", "تحول الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When you finally do the work you've been avoiding, something profound happens. It's not just that you complete a task. You cross a threshold. You become someone who does that thing.",
                "عندما تفعل أخيراً العمل الذي كنت تتجنبه، يحدث شيء عميق. ليس فقط أنك تكمل مهمة. أنت تعبر عتبة. تصبح شخصاً يفعل ذلك الشيء."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The person who finally has that difficult conversation is no longer someone who avoids conflict. The person who finally starts that project is no longer someone who just talks about ideas. The person who finally faces their fear is no longer someone who lets fear decide.",
                "الشخص الذي يجري أخيراً تلك المحادثة الصعبة لم يعد شخصاً يتجنب الصراع. الشخص الذي يبدأ أخيراً ذلك المشروع لم يعد شخصاً يتحدث فقط عن الأفكار. الشخص الذي يواجه خوفه أخيراً لم يعد شخصاً يسمح للخوف بالقرار."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Each avoided task is a locked door. Behind it is a version of yourself you haven't met yet. The work is the key.",
                "كل مهمة متجنبة هي باب مقفل. خلفه نسخة من نفسك لم تقابلها بعد. العمل هو المفتاح."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("Finding Your Magic", "العثور على سحرك")}</h3>
              <p className="text-slate-600 mb-4">
                {getText(
                  "Ask yourself: What have I been avoiding? What task has been sitting on my list for weeks? What conversation do I keep postponing? What practice do I know would help but never seem to do?",
                  "اسأل نفسك: ما الذي كنت أتجنبه؟ ما المهمة التي كانت على قائمتي لأسابيع؟ ما المحادثة التي أستمر في تأجيلها؟ ما الممارسة التي أعرف أنها ستساعد لكني لا أبدو أفعلها أبداً؟"
                )}
              </p>
              <p className="text-slate-600">
                {getText(
                  "That's where your transformation lives. That's where the magic is hiding.",
                  "هناك يعيش تحولك. هناك يختبئ السحر."
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Practice of Moving Toward", "ممارسة التحرك نحو")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Transformation isn't about eliminating resistance. It's about learning to read it. When you feel that familiar pull to avoid, pause. Recognize it as a signal. A signpost pointing toward growth.",
                "التحول ليس عن إزالة المقاومة. إنه عن تعلم قراءتها. عندما تشعر بذلك الجذب المألوف للتجنب، توقف. تعرف عليها كإشارة. لوحة إرشادية تشير نحو النمو."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Then take one small step toward it. Not a leap. A step. The smallest possible action that moves you in the direction of the resistance.",
                "ثم اتخذ خطوة صغيرة نحوه. ليست قفزة. خطوة. أصغر فعل ممكن يحركك في اتجاه المقاومة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The magic isn't in the outcome. It's in the movement. It's in becoming someone who moves toward what they fear instead of away from it.",
                "السحر ليس في النتيجة. إنه في الحركة. إنه في أن تصبح شخصاً يتحرك نحو ما يخافه بدلاً من الابتعاد عنه."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "The work you're avoiding isn't just work. It's a doorway. A threshold. An invitation to become someone new.",
                  "العمل الذي تتجنبه ليس مجرد عمل. إنه باب. عتبة. دعوة لتصبح شخصاً جديداً."
                )}
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "The magic you're looking for is waiting. It's been waiting. It will keep waiting until you're ready to walk through the door you've been avoiding.",
                "السحر الذي تبحث عنه ينتظرك. كان ينتظرك. سيستمر بالانتظار حتى تكون مستعداً لعبور الباب الذي كنت تتجنبه."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="magic-in-work-you-avoid" />

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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {getText("Stop Avoiding. Start Transforming.", "توقف عن التجنب. ابدأ التحول.")}
            </h2>
            <p className="text-slate-300 mb-6">
              {getText("Get the frameworks and support to face what you've been running from.", "احصل على الأطر والدعم لمواجهة ما كنت تهرب منه.")}
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                {getText("Explore Products", "استكشف المنتجات")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
