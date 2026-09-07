'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Brain, Sparkles, Zap, Target, CheckCircle } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function TenMinuteBlockSystemArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "physics-of-momentum", title: getText("The Physics of Momentum", "فيزياء الزخم"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "dopamine-reset", title: getText("The 24-Hour Dopamine Reset", "إعادة ضبط الدوبامين في ٢٤ ساعة"), readTime: getText("12 min read", "١٢ دقيقة قراءة") },
    { slug: "speed-as-strategy", title: getText("Speed as Strategy", "السرعة كاستراتيجية"), readTime: getText("7 min read", "٧ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Productivity", "الإنتاجية")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The 10-Minute Block System: Breaking Through Every Obstacle", "نظام الكتل العشر دقائق: اختراق كل عقبة")}
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
                "What if the one thing you need to overcome obstacles and make faster progress than 99% of people is a simple 10-minute daily system?",
                "ماذا لو كان الشيء الوحيد الذي تحتاجه لتجاوز العقبات والتقدم أسرع من ٩٩٪ من الناس هو نظام يومي بسيط من ١٠ دقائق؟"
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This system took its creator from a cycle of burnout and procrastination to building a portfolio of online businesses—working just four hours a day from anywhere in the world.",
                "هذا النظام أخذ صانعه من دورة الإرهاق والتسويف إلى بناء محفظة من الأعمال التجارية عبر الإنترنت — يعمل فقط أربع ساعات يومياً من أي مكان في العالم."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Five-Step Framework", "الإطار الخماسي")}
            </h2>

            <div className="space-y-6 my-8">
              {/* Step 1 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{getText("2 Minutes", "دقيقتان")}</Badge>
                        <h3 className="font-semibold text-primary">{getText("Mental Purge", "التطهير الذهني")}</h3>
                      </div>
                      <p className="text-slate-600 mb-2">
                        {getText(
                          "Write down everything causing mental noise. Every incomplete task, every thought looping in your head—get it all on paper.",
                          "اكتب كل ما يسبب الضوضاء الذهنية. كل مهمة غير مكتملة، كل فكرة تدور في رأسك — ضعها كلها على الورق."
                        )}
                      </p>
                      <p className="text-sm text-slate-500">
                        {getText(
                          "Your brain treats starting as the hardest part. Once you've purged the noise, you create space for clarity.",
                          "دماغك يعتبر البدء هو أصعب جزء. بمجرد أن تطهر الضوضاء، تخلق مساحة للوضوح."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{getText("2 Minutes", "دقيقتان")}</Badge>
                        <h3 className="font-semibold text-primary">{getText("Momentum Multiplier", "مضاعف الزخم")}</h3>
                      </div>
                      <p className="text-slate-600 mb-2">
                        {getText(
                          "Focus on one small win. Jerry Seinfeld wrote just one joke a day. After 10-20 years, his net worth exceeded $1.1 billion.",
                          "ركز على فوز صغير واحد. جيري سينفيلد كان يكتب نكتة واحدة فقط يومياً. بعد ١٠-٢٠ سنة، تجاوزت ثروته ١.١ مليار دولار."
                        )}
                      </p>
                      <p className="text-sm text-slate-500">
                        {getText(
                          "Big numbers come from small daily actions. What's the smallest action you can take today toward your goal?",
                          "الأرقام الكبيرة تأتي من الأفعال اليومية الصغيرة. ما أصغر فعل يمكنك اتخاذه اليوم نحو هدفك؟"
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{getText("1 Minute", "دقيقة واحدة")}</Badge>
                        <h3 className="font-semibold text-primary">{getText("Discomfort Challenge", "تحدي عدم الراحة")}</h3>
                      </div>
                      <p className="text-slate-600 mb-2">
                        {getText(
                          "Use the 5-second rule. When you think of something you need to do, count down: 5, 4, 3, 2, 1—then take the smallest possible action.",
                          "استخدم قاعدة الـ ٥ ثوانٍ. عندما تفكر في شيء تحتاج لفعله، عدّ تنازلياً: ٥، ٤، ٣، ٢، ١ — ثم اتخذ أصغر فعل ممكن."
                        )}
                      </p>
                      <p className="text-sm text-slate-500">
                        {getText(
                          "A messy first action is better than a perfect action that never happens. You were running from discomfort, but the discomfort was blocking your success.",
                          "الفعل الأول الفوضوي أفضل من فعل مثالي لا يحدث أبداً. كنت تهرب من عدم الراحة، لكن عدم الراحة كان يحجب نجاحك."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{getText("2 Minutes", "دقيقتان")}</Badge>
                        <h3 className="font-semibold text-primary">{getText("Messy Launch Protocol", "بروتوكول الإطلاق الفوضوي")}</h3>
                      </div>
                      <p className="text-slate-600 mb-2">
                        {getText(
                          "Launch at 70% ready. If you're not embarrassed by your first version, you probably launched too late.",
                          "أطلق عند ٧٠٪ جاهزية. إذا لم تشعر بالحرج من نسختك الأولى، فمن المحتمل أنك أطلقت متأخراً جداً."
                        )}
                      </p>
                      <p className="text-sm text-slate-500">
                        {getText(
                          "The Founder OS was written at 70%. It had six modules and a community. 47 sales in one day. Then iterate based on feedback. Speed is your advantage.",
                          "نظام المؤسس كُتب عند ٧٠٪. كان يحتوي على ست وحدات ومجتمع. ٤٧ مبيعة في يوم واحد. ثم كرّر بناءً على الملاحظات. السرعة هي ميزتك."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 5 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{getText("3 Minutes", "٣ دقائق")}</Badge>
                        <h3 className="font-semibold text-primary">{getText("Single Domino Decision", "قرار الدومينو الواحد")}</h3>
                      </div>
                      <p className="text-slate-600 mb-2">
                        {getText(
                          "If you're stuck, it's often because you're trying to do too many things at once. What's the ONE thing that would move everything forward?",
                          "إذا كنت عالقاً، فغالباً لأنك تحاول فعل أشياء كثيرة في وقت واحد. ما هو الشيء الواحد الذي سحرّك كل شيء للأمام؟"
                        )}
                      </p>
                      <p className="text-sm text-slate-500">
                        {getText(
                          "Imagine every second is a domino. Line them up right, and one domino today can trigger unstoppable momentum.",
                          "تخيل أن كل ثانية هي قطعة دومينو. رتّبها بشكل صحيح، وقطعة دومينو واحدة اليوم يمكن أن تطلق زخماً لا يُوقف."
                        )}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why This Works", "لماذا يعمل هذا")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The power of this system isn't in the individual steps—it's in the compounding effect. Each element builds on the previous:",
                "قوة هذا النظام ليست في الخطوات الفردية — بل في التأثير التراكمي. كل عنصر يبني على السابق:"
              )}
            </p>

            <ul className="space-y-3 text-slate-600 my-6">
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{getText("<strong>Purging</strong> creates mental space", "<strong>التطهير</strong> يخلق مساحة ذهنية")}</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{getText("<strong>Small wins</strong> build momentum", "<strong>الانتصارات الصغيرة</strong> تبني الزخم")}</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{getText("<strong>Discomfort challenges</strong> break resistance", "<strong>تحديات عدم الراحة</strong> تكسر المقاومة")}</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{getText("<strong>Messy launches</strong> accelerate learning", "<strong>الإطلاقات الفوضوية</strong> تسرّع التعلم")}</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{getText("<strong>Single focus</strong> maximizes impact", "<strong>التركيز الواحد</strong> يعظم التأثير")}</span>
              </li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Identity Connection", "الارتباط بالهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This system doesn't just change what you do—it changes who you are. Each day you follow it, you become someone who:",
                "هذا النظام لا يغير ما تفعله فحسب — بل يغير من أنت. كل يوم تتبعه، تصبح شخصاً:"
              )}
            </p>

            <ul className="space-y-2 text-slate-600 my-6">
              <li>{getText("• Clears mental clutter instead of carrying it", "• يخلي الفوضى الذهنية بدلاً من حملها")}</li>
              <li>{getText("• Builds momentum instead of waiting for motivation", "• يبني الزخم بدلاً من انتظار التحفيز")}</li>
              <li>{getText("• Faces discomfort instead of avoiding it", "• يواجه عدم الراحة بدلاً من تجنبها")}</li>
              <li>{getText("• Ships instead of perfecting", "• يُطلق بدلاً من إتقان")}</li>
              <li>{getText("• Focuses instead of scattering", "• يركز بدلاً من التشتت")}</li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The identity shift happens through action. You can't think your way into being someone different. You have to act differently—consistently—until the new identity becomes natural.",
                "تحول الهوية يحدث من خلال الفعل. لا يمكنك التفكير في طريقك لتصبح شخصاً مختلفاً. عليك أن تتصرف بشكل مختلف — بشكل متسق — حتى تصبح الهوية الجديدة طبيعية."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"Action defeats anxiety. A messy first action today beats a perfect action next year. You don't need more discipline—you need a system that makes starting easy.\"",
                  "\"الفعل يهزم القلق. فعل أول فوضوي اليوم أفضل من فعل مثالي العام القادم. أنت لا تحتاج إلى مزيد من الانضباط — أنت بحاجة إلى نظام يجعل البدء سهلاً.\""
                )}
              </p>
            </div>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("Your 10-Minute Practice", "ممارستك لـ ١٠ دقائق")}</h3>
              <p className="text-slate-600 mb-4">{getText("Tomorrow morning, try this:", "غداً صباحاً، جرّب هذا:")}</p>
              <ol className="space-y-2 text-slate-600">
                <li>{getText("<strong>2 min:</strong> Write down every thought causing noise", "<strong>٢ دقيقة:</strong> اكتب كل فكرة تسبب الضوضاء")}</li>
                <li>{getText("<strong>2 min:</strong> Pick one small win and complete it", "<strong>٢ دقيقة:</strong> اختر فوزاً صغيراً وأكمله")}</li>
                <li>{getText("<strong>1 min:</strong> Use the 5-4-3-2-1 countdown for a hard task", "<strong>١ دقيقة:</strong> استخدم العد التنازلي ٥-٤-٣-٢-١ لمهمة صعبة")}</li>
                <li>{getText("<strong>2 min:</strong> Launch something at 70%", "<strong>٢ دقيقة:</strong> أطلق شيئاً عند ٧٠٪")}</li>
                <li>{getText("<strong>3 min:</strong> Identify your single most important domino", "<strong>٣ دقائق:</strong> حدد قطعة الدومينو الواحدة الأهم")}</li>
              </ol>
            </div>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">{getText("The Key Insight", "الفكرة الأساسية")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "Ten minutes a day won't change your life overnight. But it will change who you are—day by day, action by action. The person who follows this system for a year isn't the same person who started. They're someone who's learned to overcome every obstacle, one 10-minute block at a time.",
                "عشر دقائق يومياً لن تغير حياتك بين ليلة وضحاها. لكنها ستغير من أنت — يوماً بعد يوم، فعلاً بعد فعل. الشخص الذي يتبع هذا النظام لمدة عام ليس نفس الشخص الذي بدأ. إنه شخص تعلم كيف يتجاوز كل عقبة، كتلة من ١٠ دقائق في كل مرة."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleReferences slug="ten-minute-block-system" />

      <MidArticleUpgrade promoteTier="BASIC" variant="minimal" />
      <BlogArticleCTA ctaType="daily" />

      <ArticleNavigation currentSlug="ten-minute-block-system" />

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

