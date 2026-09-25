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

export default function RelapsePreventionSystemArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "understanding-the-compulsion-cycle", title: getText("Understanding the Compulsion Cycle: The Moment It Breaks", "فهم دورة الإدمان القهري: اللحظة التي تنكسر فيها"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "relapse-is-data", title: getText("Relapse Is Data: What the Slip Was Trying to Tell You", "الانتكاس معلومات: ماذا أرادت الزلة أن تقول لك"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "porn-recovery-roadmap", title: getText("The Complete Porn Recovery Roadmap: 5 Stages That Actually Work", "خارطة التعافي من الإباحية: خمس مراحل فعّالة فعلاً"), readTime: getText("12 min read", "١٢ دقيقة قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="Relapse Prevention System: Structure That Chooses Before You Do"
        headlineAr="نظام الوقاية من الانتكاس: بنية تختار قبل أن تفعل"
        description="Willpower fails under stress — systems do not. Build four protective layers (devices, time, energy, accountability) plus if-then plans that intercept relapse before it starts."
        slug="relapse-prevention-system"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["relapse prevention", "relapse prevention plan", "high risk situations", "if then planning", "addiction recovery system"]}
        image="/uploads/articles/relapse-prevention-system.webp"
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
                {getText("Relapse Prevention System: Structure That Chooses Before You Do", "نظام الوقاية من الانتكاس: بنية تختار قبل أن تفعل")}
              </h1>
              <div className="flex items-center gap-6 text-slate-400 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {getText("9 min read", "٩ دقائق قراءة")}
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
                  "Nobody relapses because they lacked a strong enough wish to stay free. People relapse because at the decisive moment — tired, alone, at 1 a.m. with a phone in hand — their environment asked nothing of them and their willpower was off duty. A relapse prevention system flips the odds: instead of relying on the weakest version of you, you build a structure that makes the healthy choice the default one. You do not need stronger willpower. You need a structure that chooses before you do.",
                  "لا ينتكس أحد بسبب ضعف رغبته في البقاء حراً. الناس ينتكسون لأن اللحظة الحاسمة — متعباً، ووحيداً، في الواحدة صباحاً وهاتفه بين يديه — بيئتها لم تشترط عليهم شيئاً وإرادتهم كانت خارج الخدمة. نظام الوقاية من الانتكاس يقلب المعادلة: بدل الاعتماد على أسوأ نسخة منك، تبني بنية تجعل الاختيار الصحي هو الخيار الافتراضي. لا تحتاج إرادة أقوى — بل بنية تختار قبل أن تفعل."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This guide is educational and free. It is not a replacement for professional care — if compulsive sexual behavior is severely affecting your life, working with a qualified therapist is a sign of strength, not failure.",
                  "هذا الدليل تثقيفي ومجاني، ولا يغني عن الرعاية المتخصصة — إذا كان السلوك الجنسي القهري يؤثر بحدة في حياتك، فالعمل مع معالج مؤهل علامة قوة لا علامة فشل."
                )}
              </div>

              <ArticleFigure
                src="/uploads/articles/relapse-prevention-system.webp"
                width={1376}
                height={768}
                alt={{
                  en: "Calm figure inside a thin teal geometric dome while chaos stays outside",
                  ar: "شخصية هادئة داخل قبة هندسية تركوازية رقيقة والفوضى تبقى خارجها",
                }}
                title={{
                  en: "A System That Protects Your Recovery",
                  ar: "نظامٌ يحمي تعافيك",
                }}
                caption={{
                  en: "You do not need stronger willpower — you need a structure that chooses before you do.",
                  ar: "لا تحتاج إرادة أقوى — بل بنية تختار قبل أن تفعل.",
                }}
              />

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Layer One: Devices", "الطبقة الأولى: الأجهزة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "The device layer removes easy access, because friction delays behavior long enough for deliberation to return. Practical moves: charge the phone outside the bedroom, install a content blocker whose password someone else holds, keep the laptop screen visible in shared spaces, and log out of browsers that autofill your way into trouble. None of these steps makes relapse impossible — that is not their job. They buy minutes, and minutes are where choice lives. In behavioral terms you are adding friction to the unwanted path and removing friction from the healthy one.",
                  "طبقة الأجهزة تُصعّد صعوبة الوصول، لأن الاحتكاك يؤخر السلوك مُنذرةً كافيةً ليعود التفكير الواعي. خطوات عملية: اشحن الهاتف خارج غرفة النوم، وركّب حاجب محتوى يشخص أحد غيرك كلمته، وأبقِ شاشة الحاسوب مرئية في المساحات المشتركة، وسجّل خروجك من المتصفحات التي تعبّئ طريقك نحو المشكلة تلقائياً. لا شيء من هذه الخطوات يجعل الانتكاس مستحيلاً — فهذه ليست مهمتها. إنها تشتري دقائق، والدقائق هي موطن الاختيار. بمصطلحات علم السلوك، أنت تزيد الاحتكاك على الطريق غير المرغوب وتنزعه عن الطريق الصحي."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Layer Two: Time, Layer Three: Energy", "الطبقة الثانية: الوقت، والثالثة: الطاقة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Relapse has a schedule. It clusters around unstructured hours: late nights, empty weekends, the gap between coming home and falling asleep. Rebuilding that timetable is prevention, not productivity. Give your highest-risk hours a standing appointment — a workout, a call, reading, anything embodied and specific. The energy layer feeds the same goal: most slips happen when sleep debt, hunger, and stress stack up. A real bedtime, regular meals, and daily movement are not lifestyle decoration; they keep the prefrontal brake strong enough to steer. When your baseline energy is stable, urges arrive as waves instead of commands.",
                  "للانتكاس جدول زمني. إنه يتجمع حول الساعات غير المهيكلة: الليالي المتأخرة، ونهايات الأسبوع الفارغة، والفجوة بين العودة إلى البيت والنوم. إعادة بناء هذا الجدول وقايةٌ لا إنتاجية. امنح ساعاتك الأكثر خطراً موعداً ثابتاً — تمرين، أو مكالمة، أو قراءة، أي شيء جسدي ومحدد. وطبقة الطاقة تخدم الهدف نفسه: أغلب الزلات تحدث حين تتراكم دَين النوم والجوع والتوتر. موعد نوم حقيقي، ووجبات منتظمة، وحركة يومية ليست زينة أسلوب حياة؛ إنها تحافظ على قوة الكابح الجبهي بما يكفي للقيادة. حين تكون طاقتك الأساسية مستقرة، تصل الرغبات أمواجاً لا أوامر."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Layer Four: Accountability", "الطبقة الرابعة: المساءلة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Secrecy is the oxygen of compulsive behavior, and accountability is how you cut the supply. One trusted person — a friend, a partner, a group, a therapist — who knows your plan and hears an honest check-in once a week changes the physics of the moment of choice: you are no longer deciding alone. Keep it simple and sustainable: a weekly message naming how the week went is enough. If telling a human feels impossible right now, a structured tool that keeps you honest with yourself is a legitimate first layer — but aim for a human eventually, because shame shrinks when it is spoken.",
                  "السرّية هي أكسجين السلوك القهري، والمساءلة هي الطريقة لقطع إمداده. شخص واحد موثوق — صديق، أو شريك، أو مجموعة، أو معالج — يعرف خطتك ويسمع منك إحاطة صادقة أسبوعياً، يغيّر فيزياء لحظة الاختيار: لم تعد تقرر وحدك. أبقِها بسيطة ومستدامة: رسالة أسبوعية تصف فيها مجريات الأسبوع تكفي. وإن بدا إخبار إنسان مستحيلاً الآن، فأداة مهيكلة تُبقيك صادقاً مع نفسك طبقة أولى مشروعة — لكن اجعل هدفك إنساناً في النهاية، لأن الخجل يتقلص حين يُنطق."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("If-Then Plans: Pre-Deciding the Hard Moments", "خطط «إن حدث فافعل»: اتخاذ القرار مسبقاً لللحظات الصعبة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Research on implementation intentions by Peter Gollwitzer shows why pre-decided plans outperform in-the-moment resolve: they delegate action to a cue instead of to willpower. Write three plans in the exact form: if X happens, then I will do Y. If it is after 11 p.m. and I am alone with my phone, then the phone charges in the kitchen. If I feel the urge, then I stand up and walk for ten minutes. If I slip, then I run the three-question review and continue from day one of skills. Rehearse them until they are boring. In the moment of a real urge, a rehearsed plan fires automatically — precisely when your deliberation cannot.",
                  "تُظهر أبحاث نوايا التنفيذ لبيتر غولفيتزر لماذا تتفوق الخطط المتخذة مسبقاً على الحسم اللحظي: إنها تفوّض الفعل لإشارة بدل الإرادة. اكتب ثلاث خطط بصيغة محددة: إن حدث س، فسأفعل ص. إن تجاوز الوقت الحادية عشرة ليلاً وكنت وحدك مع هاتفك، فسيُشحن الهاتف في المطبخ. إن شعرت بالرغبة، فسأنهض وأمشي عشر دقائق. إن زلت، فسأجري مراجعة الأسئلة الثلاثة وأكمل من اليوم الأول للمهارات. تدرّب عليها حتى تصبح ممّلة. في لحظة رغبة حقيقية، تُطلق الخطة المجرَّبة تلقائياً — بالضبط حين يعجز تفكيرك الواعي."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Want the four layers built with you step by step?", "تريد بناء الطبقات الأربع معك خطوة بخطوة؟")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "The free Tamkinly recovery journey includes the systems builder and the relapse reader — tools that turn these layers into your daily structure. Free, private, and without an account.",
                    "رحلة التعافي المجانية في تمكينلي تتضمن بانِي الأنظمة وقارئ الانتكاس — أدوات تحوّل هذه الطبقات إلى بنيتك اليومية. مجانية وخاصة وبلا حساب."
                  )}
                </p>
                <Link href="/recovery/porn-recovery">
                  <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#1F6F78' }}>
                    {getText("Build My System", "ابنِ نظامي")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <ArticleReferences slug="relapse-prevention-system" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="relapse-prevention-system" />

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
