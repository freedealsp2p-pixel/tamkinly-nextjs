'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';
import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';
import { BlogArticleJsonLd } from "@/components/seo/JsonLd";
import { ArticleFigure } from '@/components/blog/ArticleFigure';

export default function RelapseIsDataArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "relapse-prevention-system", title: getText("Relapse Prevention System: Structure That Chooses Before You Do", "نظام الوقاية من الانتكاس: بنية تختار قبل أن تفعل"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "understanding-the-compulsion-cycle", title: getText("Understanding the Compulsion Cycle: The Moment It Breaks", "فهم دورة الإدمان القهري: اللحظة التي تنكسر فيها"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "rebuild-identity-after-addiction", title: getText("Rebuild Identity After Addiction: Every Vote Builds the New Self", "إعادة بناء الهوية بعد الإدمان: كل صوت يبني الذات الجديدة"), readTime: getText("9 min read", "٩ دقائق قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="Relapse Is Data: What the Slip Was Trying to Tell You"
        headlineAr="الانتكاس معلومات: ماذا أرادت الزلة أن تقول لك"
        description="A relapse is not a verdict on your character — it is a report on your system. Run the three-question functional analysis, respond with self-compassion instead of shame, and adjust one layer."
        slug="relapse-is-data"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["relapse is part of recovery", "after a slip", "functional analysis addiction", "abstinence violation effect", "self compassion after relapse"]}
        image="/uploads/articles/relapse-is-data.webp"
      />
      <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
                {getText("Recovery", "التعافي")}
              </Badge>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                {getText("Relapse Is Data: What the Slip Was Trying to Tell You", "الانتكاس معلومات: ماذا أرادت الزلة أن تقول لك")}
              </h1>
              <div className="flex items-center gap-6 text-slate-400 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {getText("8 min read", "٨ دقائق قراءة")}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {getText("Tamkinly Team", "فريق تمكينلي")}
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
                  "The worst hour of relapse is usually not the slip itself — it is the hour after, when the mind holds court: I knew I would fail. All that effort for nothing. I am not the kind of person who recovers. Here is the reframe that changes everything: a relapse is not a verdict on who you are. It is a report on where your system failed, written in the only language a stressed nervous system speaks — behavior. Read it as an engineer reads a failed bridge, and the same event that once ended recoveries becomes the thing that makes this one different.",
                  "أسوأ ساعة في الانتكاس ليست الزلة ذاتها — بل الساعة التي تليها، حين يعقد العقل محاكمته: كنت سأفشل كما عرفت. كل هذا الجهد هدر. لست من النوع الذي يتعافى. وهذه هي الصياغة التي تغيّر كل شيء: الانتكاس ليس حكماً على من أنت. إنه تقرير عن موضع فشل نظامك، مكتوب باللغة الوحيدة التي يتحدث بها جهاز عصبي مجهد — السلوك. اقرأه كما يقرأ المهندس جسراً انهار، وسيصبح الحدث نفسه الذي أنهى تعافياتٍ سابقة هو ما يجعل هذه التعافي مختلفاً."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This guide is educational and free. It is not a replacement for professional care — if compulsive sexual behavior is severely affecting your life, working with a qualified therapist is a sign of strength, not failure.",
                  "هذا الدليل تثقيفي ومجاني، ولا يغني عن الرعاية المتخصصة — إذا كان السلوك الجنسي القهري يؤثر بحدة في حياتك، فالعمل مع معالج مؤهل علامة قوة لا علامة فشل."
                )}
              </div>

              <ArticleFigure
                src="/uploads/articles/relapse-is-data.webp"
                width={1376}
                height={768}
                alt={{
                  en: "Cracked path re-routing forward beside a gauge turning toward glowing mint",
                  ar: "درب متشقق يعيد توجيهه إلى الأمام بجانب مؤشر يتجه نحو النعناعي المضيء",
                }}
                title={{
                  en: "What the Slip Was Trying to Tell You",
                  ar: "ماذا أرادت الزلة أن تقول لك",
                }}
                caption={{
                  en: "A relapse reports where the system failed — it never rules on who you are.",
                  ar: "الانتكاس يبلّغ أين فشل النظام — ولا يحكم أبداً على من أنت.",
                }}
              />

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The Trap: The Abstinence Violation Effect", "الفخ: أثر انتهاك الامتناع")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Psychologists call it the abstinence violation effect: the moment a small slip gets reinterpreted as total failure, and the resulting shame, guilt, and hopelessness produce more of the exact behavior being condemned. I already broke it, so why bother becomes the most expensive sentence in recovery. The data agrees — most extended relapses are not caused by the first slip; they are caused by the meaning people assign to the first slip. The slip is a crack in a path. The story I am hopeless is what turns the crack into a canyon. Your first job after any slip is to refuse the story, not to promise perfection.",
                  "يسمي علماء النفس ذلك أثر انتهاك الامتناع: اللحظة التي تُعاد فيها تفسير الزلة الصغيرة على أنها فشل كلي، فينتج الخجل والذنب واليأس مزيداً من السلوك ذاته الذي تُدان به. «لقد انكسر الأمر أصلاً، فلماذا أتعب؟» أغلى جملة في التعافي. والبيانات متفقة: أغلب الانتكاسات الممتدة لا تسببها الزلة الأولى؛ بل تسببها الدلالة التي يمنحها الناس للزلة الأولى. الزلة شق في طريق. أما قصة «أنا بلا أمل» فهي ما يحول الشق وادياً. ومهمتك الأولى بعد أي زلة أن ترفض القصة، لا أن تَعِد بالكمال."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The Three-Question Functional Analysis", "تحليل الوظيفة بثلاثة أسئلة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Once the immediate wave has settled — hours later, not seconds — run the same three questions every time. Question one: what was the trigger? Name the state before the moment: exhaustion, loneliness, conflict, celebration, boredom. Question two: which system layer failed — devices, time, energy, or accountability? A phone in the bedroom is a device failure; a 2 a.m. wallowing hour is a time failure; skipped meals and broken sleep are energy failures; a week without any check-in is an accountability failure. Question three: what single adjustment would have interrupted this exact path? One adjustment — not five. The output is not an apology; it is a modification to your system.",
                  "بعد أن يستقر موجة الضيق الأولى — بعد ساعات لا ثوانٍ — أجب عن الأسئلة الثلاثة نفسها في كل مرة. السؤال الأول: ما المحفّز؟ سمِّ الحالة قبل اللحظة: إجهاد، وحدة، صراع، احتفال، ملل. السؤال الثاني: أي طبقة من نظامك انهارت — الأجهزة، الوقت، الطاقة، أم المساءلة؟ هاتف في غرفة النوم فشلُ أجهزة؛ وساعة التأوه الثانية فجراً فشلُ وقت؛ ووجبات متخطاة ونوم مكسور فشلُ طاقة؛ وأسبوع بلا أي إحاطة فشلُ مساءلة. السؤال الثالث: أي تعديل واحد كان سيقطع هذا الطريق تحديداً؟ تعديل واحد — لا خمسة. والمخرجات ليست اعتذاراً؛ إنها تعديل في نظامك."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Keep the Skills, Reset the Count", "احفظ المهارات، وأعد ضبط العدّ")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Here is the part almost everyone gets wrong: the day counter and the skill counter are different instruments. The day counter may honestly reset to day one. The skill counter does not reset at all — the triggers you mapped, the systems you built, the urge-surfing reps you banked, the self-knowledge you earned: none of it evaporated because of one slip. Weeks of built systems do not evaporate in one night; treating them as if they did is precisely how one bad night becomes a bad month. Continue from day one with everything you had on day thirty. That is not cheating the count — that is understanding what the count was for.",
                  "وهنا الخطأ الذي يرتكبه الجميع تقريباً: عدّاد الأيام وعدّاد المهارات أداتان مختلفتان. عدّاد الأيام قد يُعاد بحق إلى اليوم الأول. أما عدّاد المهارات فلا يُعاد أبداً — المحفزات التي رسمتها، والأنظمة التي بنيتها، وتدريبات ركوب الموجة التي جمّعتها، والمعرفة بنفسك التي كسبتها: لا شيء منها تتبخر بسبب زلة واحدة. أسابيع من الأنظمة المبنية لا تتبخر في ليلة واحدة؛ ومعاملتها كأنها تتبخر هو بالضبط ما يحوّل ليلة سيئة إلى شهر سيئ. أكمل من اليوم الأول وكل ما كان معك في اليوم الثلاثين. تلك ليست غشاً للعدّاد — تلك فهمٌ لسبب وجوده."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("When the Pattern Repeats", "حين يتكرر النمط")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "A single slip carries one lesson. A repeating pattern carries a structural one: if every relapse happens at 1 a.m., the problem is the schedule; if every relapse follows conflict, the problem is that you have no tool for the feelings conflict produces. Repeated slips at the same layer mean that layer needs redesign, not more resolve. And if you have adjusted every layer honestly and the pattern still holds, that is not a verdict either — it is the standard signal that professional support would move what self-help alone cannot. Reading your data correctly includes knowing when to escalate.",
                  "الزلة الواحدة تحمل درساً واحداً. أما النمط المتكرر فيحمل درساً بنيوياً: إذا كان كل انتكاس في الواحدة فجراً، فالمشكلة في الجدول؛ وإذا كان كل انتكاس بعد صراع، فالمشكلة أنك لا تملك أداة للمشاعر التي ينتجها الصراع. الزلات المتكررة في الطبقة نفسها تعني أن تلك الطبقة تحتاج إعادة تصميم لا مزيداً من العزيمة. وإذا عدّلت كل الطبقات بصدق وبقي النمط، فهذا ليس حكماً عليك أيضاً — إنه الإشارة المعيارية إلى أن الدعم المتخصص يحرّك ما لا تستطيع المساعدة الذاتية وحدها. قراءة بياناتك قراءة صحيحة تشمل معرفة متى تصعد درجة."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Turn your next slip into your best data", "اجعل زلتك القادمة أفضل بياناتك")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "The relapse reader in Tamkinly's free recovery journey walks you through the three-question analysis and tracks which layer needs attention — private, judgment-free, and free.",
                    "قارئ الانتكاس في رحلة التعافي المجانية بتمكينلي يمشي معك تحليل الأسئلة الثلاثة ويتتبع الطبقة التي تحتاج انتباهاً — خاص، بلا أحكام، ومجاني."
                  )}
                </p>
                <Link href="/recovery/porn-recovery">
                  <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#1F6F78' }}>
                    {getText("Start the Free Recovery Journey", "ابدأ رحلة التعافي المجانية")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <ArticleReferences slug="relapse-is-data" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="relapse-is-data" />

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
    </>
  );
}
