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

export default function PacedBreathingArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "vagus-nerve-breathing", title: getText("Vagus Nerve Breathing: The Science of Calming Your Body on Command", "تنفس العصب المبهم (Vagus nerve): علم تهدئة جسدك بقدرتك"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "grounding-for-flashbacks", title: getText("Grounding for Flashbacks: Evidence That You Are Here Now", "التأريض للذكريات الومضية: دليل على أنك هنا الآن"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "window-of-tolerance", title: getText("The Window of Tolerance: Living Inside Your Optimal Zone", "نافذة التحمّل: العيش داخل منطقتك المثلى"), readTime: getText("9 min read", "٩ دقائق قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="Paced Breathing for Regulation: Inhale Four, Exhale Six"
        headlineAr="التنفس المنظّم للتوازن العصبي: شهيق أربعة وزفير ستة"
        description="Paced breathing — a longer exhale than inhale — is the fastest lever on the vagus nerve (Vagus nerve) and your parasympathetic brake. Learn the 4-6 rhythm, the science, and a 5-minute daily protocol."
        slug="paced-breathing-for-regulation"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["paced breathing", "4-6 breathing", "vagus nerve breathing", "HRV breathing", "parasympathetic activation"]}
        image="/uploads/articles/paced-breathing-for-regulation.webp"
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
                {getText("Paced Breathing for Regulation: Inhale Four, Exhale Six", "التنفس المنظّم للتوازن العصبي: شهيق أربعة وزفير ستة")}
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
                  "When your alarm system is ringing, you cannot argue it quiet — but you can breathe it quiet. Paced breathing, simply making your exhale longer than your inhale, is the most direct manual control you have over your own nervous system. Four counts in, six counts out: an unremarkable rhythm with a remarkable effect. It is the oldest off-switch in the human body, and five minutes of it can measurably change your heart rhythm, your blood pressure, and the felt sense of whether the world is dangerous.",
                  "حين يرنّ نظام إنذارك لا يمكنك أن تُسكته بالجدال — لكن يمكنك أن تُسكته بالتنفس. التنفس المنظّم — مجرد جعل زفيرك أطول من شهيقك — هو أقوى مقبض يدوي مباشر تملكه على جهازك العصبي. أربعة عدهات شهيقاً، وستة زفيراً: إيقاع غير ملفت بأثر ملفت. إنه أقدم مفتاح إطفاء في جسد الإنسان، وخمس دقائق منه تكفي لتغيير إيقاع قلبك وضغطك وإحساسك الجسي بالعالم: خطر أم لا."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This guide is educational and free. It is not a replacement for professional care. If you feel dizzy at any point, return to your natural breath and try again later with a smaller count.",
                  "هذا الدليل تثقيفي ومجاني، ولا يغني عن الرعاية المتخصصة. إذا شعرت بدوار في أي لحظة، فعُد إلى تنفسك الطبيعي وأعد المحاولة لاحقاً بعدد أصغر."
                )}
              </div>

              <ArticleFigure
                src="/uploads/articles/paced-breathing-for-regulation.webp"
                width={1376}
                height={768}
                alt={{
                  en: "Concentric ripples expanding and contracting on deep navy water",
                  ar: "دوائر متجمّعة تتمدد وتنكمش على ماء كحلي عميق",
                }}
                title={{
                  en: "The Breathing Rhythm That Resets Alarm",
                  ar: "إيقاع التنفس الذي يعيد ضبط الإنذار",
                }}
                caption={{
                  en: "Inhale four, exhale six — the oldest off-switch in the human body.",
                  ar: "شهيق أربعة وزفير ستة — أقدم مفتاح إطفاء في جسد الإنسان.",
                }}
              />

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Why the Long Exhale Works", "لماذا ينفع الزفير الطويل")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Your breath is the only channel of the autonomic nervous system that answers to conscious control — a manual override built into automatic machinery. The mechanism is mechanical before it is mystical: on every inhale, the heart speeds up slightly; on every exhale, pressure on the great vessels rises and baroreceptors signal the brain to slow the heart down. Stretch the exhale and you stretch that braking signal. The result is increased heart rate variability — the spacing between heartbeats becoming more adaptive — which research links to emotional flexibility and calm under pressure. In plain terms: a long exhale tells the vagus nerve (Vagus nerve) to apply the parasympathetic brake, and the whole system follows.",
                  "نفسك هي القناة الوحيدة في الجهاز العصبي الذاتي التي تستجيب للتحكم الواعي — تجاوزٌ يدوي مبني في آلة تلقائية. الآلية ميكانيكية قبل أن تكون روحانية: في كل شهيق يتسارع القلب قليلاً؛ وفي كل زفير يرتفع الضغط على الأوعية الكبرى فتُشير مستقبلات الضغط إلى الدماغ بإبطاء القلب. مُدّ الزفير تُمدّ إشارة الكبح تلك. والنتيجة ارتفاع تقلب معدل ضربات القلب — تباعد النبضات بطريقة أكثر تكيفاً — وهو ما يربطه البحث بالمرونة العاطفية والهدوء تحت الضغط. وبعبارة بسيطة: الزفير الطويل يُخبر العصب المبهم (Vagus nerve) أن يفعّل مكبح الجهاز السمبثاوي، فيتبعه النظام كله."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The 4-6 Protocol", "بروتوكول 4-6")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Sit with both feet on the ground. Inhale through the nose for four counts — soft belly, no strain. Exhale through the mouth for six counts, as if fogging a mirror gently. Continue for five minutes. Two details decide the practice: the exhale must be longer than the inhale, and the counts must feel easy — if six is a struggle, use four in and five out. Once or twice a day at a calm moment trains the system faster than only reaching for it in crisis. Think of it as strength training for your brake reflex: the repetitions done in peace are what make it available in the storm.",
                  "اجلس وقدماك على الأرض. شهيق من الأنف لأربعة عدهات — بطن لين بلا إجهاد. زفير من الفم لستة عدهات، كأنك تُبخّر مرآة برفق. تابع خمس دقائق. تفصيلان يحسمان الممارسة: أن يكون الزفير أطول من الشهيق، وأن تكون العدهات سهلة — إن كانت الستة صعبة، فاستخدم أربعة شهيقاً وخمسة زفيراً. مرة أو مرتان يومياً في لحظة هدوء تدرّبان النظام أسرع من الاكتفاء بالاحتجاج له في الأزمة. اعتبره تدريب قوة لمُعكس المكبح لديك: التكرارات المنجزة في السكون هي ما يجعله متاحاً في العاصفة."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Where It Fits in Recovery", "أين يقع في خارطة التعافي")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Paced breathing is the regulation layer that makes every other tool usable. Grounding works better in a body whose exhale can lengthen; urge surfing depends on staying physically settled while the wave crests; sleep returns when the evening ends with a slower rhythm. This is why trauma-recovery models place breathing practice in the stabilization stage — before any processing of hard material. Ten minutes a day for two weeks changes your baseline, not just your crises: the system that spends more time braked calms faster when challenged. You are not learning a trick; you are re-tuning a thermostat.",
                  "التنفس المنظّم هو طبقة التنظيم التي تجعل بقية الأدوات قابلة للاستخدام. التأريض أنجح في جسد يمكن أن يطيل زفيره؛ وركوب الموجة قائم على البقاء جسدياً مستقراً بينما الموجة تبلغ ذروتها؛ والنوم يعود حين تنتهي الأمسية بإيقاع أبطأ. لهذا تضع نماذج التعافي من الصدمات تدريب التنفس في مرحلة التثبيت — قبل أي معالجة للمادة الصعبة. عشر دقائق يومياً لأسبوعين تغيّر خط أساسك لا أزماتك فقط: النظام الذي يقضي وقتاً أطول في وضع الكبح يهدأ أسرع عند التحدي. أنت لا تتعلم حيلة؛ أنت تعاير منظم حرارة."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Make It Stick", "اجعله يلازمك")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Attach the practice to something you already do daily: five minutes after your morning coffee, or before you pick up your phone in the evening. Track only two things — did you practice, and how did your body feel on a one-to-ten scale afterwards. On hard days, one minute counts; consistency outranks duration. And if counting feels mechanical, sync the rhythm with something slow: walking pace, a metronome, waves. The skill you are building is larger than any technique — it is the discovery, proven in your own body, that your state has a dial, and your hands are on it.",
                  "اربط الممارسة بشيء تفعله يومياً أصلاً: خمس دقائق بعد قهوة الصباح، أو قبل أن تلتقط هاتفك مساءً. تتبّع أمرين فقط — هل تدرّبت، وكيف شعر جسدك على مقياس من عشرة بعد ذلك. في الأيام الصعبة، الدقيقة واحدة تُحتسب؛ والاستمرارية تتفوق على المدة. وإن بدا العدّ آلياً، فزامن الإيقاع بشيء بطيء: مشية، أو مترونوم، أو أمواج. المهارة التي تبنيها أكبر من أي تقنية — إنها الاكتشاف المثبت في جسدك: حالتك لها مقبض، ويداك هما على ذلك المقبض."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Want a paced breathing guide with you?", "تريد مرشداً للتنفس المنظّم معك؟")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "The regulation tools in Tamkinly's free Trauma Recovery Center include guided paced breathing with visual pacing — free and private.",
                    "أدوات التنظيم في مركز التعافي المجاني من الصدمات بتمكينلي تتضمن تنفّساً منظّماً موجَّهاً بإيقاع بصري — مجاناً وخاصة."
                  )}
                </p>
                <Link href="/recovery/trc/regulation-toolkit">
                  <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#1F6F78' }}>
                    {getText("Open the Regulation Toolkit", "افتح صندوق أدوات التنظيم")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <ArticleReferences slug="paced-breathing-for-regulation" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="paced-breathing-for-regulation" />

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
