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

export default function UrgeSurfingArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "paced-breathing-for-regulation", title: getText("Paced Breathing for Regulation: Inhale Four, Exhale Six", "التنفس المنظّم للتوازن العصبي: شهيق أربعة وزفير ستة"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "understanding-the-compulsion-cycle", title: getText("Understanding the Compulsion Cycle: The Moment It Breaks", "فهم دورة الإدمان القهري: اللحظة التي تنكسر فيها"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "trauma-recovery-three-stages", title: getText("The Three Stages of Trauma Recovery: Safety, Regulation, Integration", "مراحل التعافي من الصدمات: الأمان ثم التنظيم ثم التكامل"), readTime: getText("12 min read", "١٢ دقيقة قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="Urge Surfing: How to Ride the 10-Minute Wave of an Urge"
        headlineAr="ركوب الموجة: كيف تعبر نافذة الرغبة في عشر دقائق"
        description="Urges rise, peak, and fall like waves — most within ten minutes. Learn the classic urge surfing protocol: locate, breathe, observe, and let the wave pass without acting on it."
        slug="urge-surfing-10-minute-window"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["urge surfing", "how long do urges last", "mindfulness for cravings", "urge management", "craving wave"]}
        image="/uploads/articles/urge-surfing-10-minute-window.webp"
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
                {getText("Urge Surfing: How to Ride the 10-Minute Wave of an Urge", "ركوب الموجة: كيف تعبر نافذة الرغبة في عشر دقائق")}
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
                  "An urge feels permanent from inside it — like a pressure that will only keep building until you give in. But urges obey the physics of waves, not engines: they rise, they peak, and they fall, usually within ten to twenty minutes. Urge surfing, developed by Alan Marlatt within mindfulness-based relapse prevention, teaches you to stay on the board and observe the wave until it spends itself. You do not fight the urge and you do not obey it. You outlast it.",
                  "الرغبة تبدو دائمة من داخلها — كضغطٍ لن يتوقف عن التصاعد حتى تستسلم. لكن الرغبات تخضع لفيزياء الأمواج لا للمحركات: تنهض، وتبلغ ذروتها، ثم تتراجع — أغلبها خلال عشر إلى عشرين دقيقة. ركوب الموجة، الذي طوّره آلان مارلات ضمن الوقاية من الانتكاس باليقظة الذهنية، يعلّمك البقاء على اللوح وملاحظة الموجة حتى تستنزف طاقتها. أنت لا تحارب الرغبة ولا تخضع لها. أنت تصمد أطول منها."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This guide is educational and free. It is not a replacement for professional care — if compulsive sexual behavior is severely affecting your life, working with a qualified therapist is a sign of strength, not failure.",
                  "هذا الدليل تثقيفي ومجاني، ولا يغني عن الرعاية المتخصصة — إذا كان السلوك الجنسي القهري يؤثر بحدة في حياتك، فالعمل مع معالج مؤهل علامة قوة لا علامة فشل."
                )}
              </div>

              <ArticleFigure
                src="/uploads/articles/urge-surfing-10-minute-window.webp"
                width={1376}
                height={768}
                alt={{
                  en: "Steady figure standing on the crest of an abstract wave under a dawn sky",
                  ar: "شخصية ثابتة تقف على قمة موجة مجرّدة تحت سماء الفجر",
                }}
                title={{
                  en: "Riding the Urge Like a Wave",
                  ar: "ركوب الرغبة كموجة",
                }}
                caption={{
                  en: "An urge rises, peaks, and falls — your only task is to stay on the board for ten minutes.",
                  ar: "الرغبة تنهض وتبلغ ذروتها ثم تتراجع — مهمتك الوحيدة البقاء على اللوح عشر دقائق.",
                }}
              />

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Why Urges Feel Endless — and Are Not", "لماذا تبدو الرغبات لا تنتهي — وهي ليست كذلك")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "The feeling of permanence comes from attention. When you fixate on an urge, every second of discomfort seems to confirm that it will last forever, so you act just to end the tension. Studies of craving show a different story: unacted-upon cravings reach a peak and subside on their own, and practicing observing them without reacting measurably weakens the link between cue and behavior. Each wave you ride all the way through is also a data point your brain records — proof that the wave ends by itself — which makes the next wave smaller in practice, even when it feels identical in the moment.",
                  "الإحساس بالديمومة مصدره الانتباه. حين تثبّت نظرك على الرغبة، تبدو كل ثانية انزعاج دليلاً على أنها ستبقى إلى الأبد، فتفعل شيئاً فقط لإنهاء التوتر. وتروي دراسات الشوق قصة مختلفة: الشهوات التي لا تُستجيب لها تبلغ ذروتها ثم تخبو من تلقاء نفسها، وممارسة ملاحظتها دون استجابة تُضعف قياساً الرابط بين الإشارة والسلوك. وكل موجة تعبرها حتى نهايتها هي نقطة بيانات يسجلها دماغك — دليل على أن الموجة تنتهي وحدها — وهذا يجعل الموجة التالية أصغر عملياً حتى لو بدت مطابقة لها في اللحظة."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The Four-Step Protocol", "البروتوكول من أربع خطوات")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Step one — locate. When the urge hits, sit down if you can, and find where it lives in your body: a pull in the chest, restlessness in the legs, heat in the face. Step two — breathe. Slow your exhale below your inhale (four counts in, six out) and let the breath be an anchor while the body buzzes. Step three — observe. Describe the sensation like a curious scientist instead of a victim: it is tightening, it is pulsing, it is moving. Naming and observing shift you from participant to witness, and the witness is the part of you that can choose. Step four — let it pass. Watch the intensity rise and fall like a curve on a screen. When it drops — and it will — get up and do one concrete action that belongs to the person you are becoming.",
                  "الخطوة الأولى — حدّد المكان. حين تضرب الرغبة، اجلس إن استطعت، وابحث أين تسكن في جسدك: شدّ في الصدر، أو تململ في الساقين، أو حرارة في الوجه. الخطوة الثانية — تنفّس. أبطئ زفيرك حتى يصبح أطول من شهيقك (أربعة عدهات شهيقاً، وستة زفيراً)، ودع النفس مرساةً بينما الجسد يتهيّج. الخطوة الثالثة — لاحظ. صف الإحساس كعالِم فضولي لا كضحية: إنه يتشنج، إنه ينبض، إنه يتحرك. التسمية والملاحظة تنقلانك من مشارك إلى شاهد، والشاهد هو الجزء القادر على الاختيار. الخطوة الرابعة — دعها تمر. راقب الشدة وهي تصعد وتنحدر كمنحنى على شاشة. حين تهبط — وستهبط — انهض وافعل فعلاً واحداً ملموساً ينتمي إلى الشخص الذي تصير إليه."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Common Mistakes That Capsize the Board", "أخطاء شائعة تقلب اللوح")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Three mistakes sink most first attempts. The first is treating urge surfing as a resistance technique — clenching, bargaining, white-knuckling. Tension feeds the wave; relaxed observation starves it. The second is checking the clock: is it over yet? Monitoring for the end keeps you out of the observing state and back in the bargaining one. Set a ten-minute timer, then forget it. The third is practicing only during crises. Ride small waves deliberately — a craving for sugar, the pull to check your phone — so that when a big one arrives, the skill is already muscle memory. Surfers train in shallow water before they paddle into the swell.",
                  "ثلاثة أخطاء تغرق معظم المحاولات الأولى. الأول معاملة ركوب الموجة كتقنية مقاومة — تشنج، ومفاوضة، وقبضة بيضاء. التوتر يغذي الموجة؛ والملاحظة المرتاحة تُجويها. الثاني مراقبة الساعة: هل انتهت؟ تتبع النهاية يُخرجك من حالة الملاحظة ويعيدك إلى المفاوضة. اضبط مؤقتاً لعشر دقائق ثم انسَه. الثالث التدريب في الأزمات فقط. اركب الأمواج الصغيرة عمداً — شوق الحلوى، أو شدّ فحص الهاتف — حتى إذا جاءت الكبيرة تكون المهارة قد صارت ذاكرة عضلية. المتزلجون على الأمواج يتدربون في المياه الضحلة قبل أن يجدفوا نحو الهاوية."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Your First Rep: Tonight", "تدريبك الأول: الليلة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Do not wait for a perfect wave. Tonight, when a mild urge appears — for a snack, a scroll, anything — run the full protocol once: locate, breathe, observe, let it pass, then log what happened in one line: what the wave peaked at and how long it took to drop. One completed ride teaches you more than a week of theory, because the entire method rests on an experience you can only collect firsthand: the wave ends on its own, and you are still here. Ten minutes at a time, that proof compounds into a different relationship with every urge that follows.",
                  "لا تنتظر موجة مثالية. الليلة، حين تظهر رغبة خفيفة — طعام، أو تصفح، أي شيء — جرِّب البروتوكول كاملاً مرة واحدة: حدّد، تنفّس، لاحظ، دعها تمر، ثم دوّن ما حدث في سطر واحد: أين بلغت الموجة ذروتها وكم استغرق هبوطها. ركوبٌ واحد مكتمل يعلّمك أكثر من أسبوع نظري، لأن المنهج كله يستند إلى تجربة لا تُجمع إلا من الأولى: الموجة تنتهي وحدها، وأنت ما زلت هنا. عشر دقائق في كل مرة، يتراكم هذا الدليل حتى يصبح علاقة مختلفة مع كل رغبة لاحقة."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Want a guided urge surfing timer?", "تريد مؤقت ركوب موجة موجَّهاً؟")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "The urge surfing tool inside Tamkinly's free recovery journey walks you through the four steps in real time and keeps a private log of every wave you ride.",
                    "أداة ركوب الموجة داخل رحلة التعافي المجانية في تمكينلي تمشي معك الخطوات الأربع في الزمن الحقيقي، وتحتفظ بسجل خاص لكل موجة تعبرها."
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
        <ArticleReferences slug="urge-surfing-10-minute-window" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="urge-surfing-10-minute-window" />

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
