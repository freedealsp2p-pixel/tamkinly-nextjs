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

export default function WhatTraumaDoesToTheBodyArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "window-of-tolerance", title: getText("The Window of Tolerance: Living Inside Your Optimal Zone", "نافذة التحمّل: العيش داخل منطقتك المثلى"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "grounding-for-flashbacks", title: getText("Grounding for Flashbacks: Evidence That You Are Here Now", "التأريض للذكريات الومضية: دليل على أنك هنا الآن"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "trauma-recovery-three-stages", title: getText("The Three Stages of Trauma Recovery: Safety, Regulation, Integration", "مراحل التعافي من الصدمات: الأمان ثم التنظيم ثم التكامل"), readTime: getText("12 min read", "١٢ دقيقة قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="What Trauma Does to the Body: Where the Past Lives in You"
        headlineAr="ماذا تفعل الصدمة بالجسد: أين يسكن الماضي فيك"
        description="Trauma is stored in the body: a hypervigilant alarm, tense muscles, a disrupted stress axis. Understand the neuroscience of how the body keeps the score — and how it learns safety again."
        slug="what-trauma-does-to-the-body"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["trauma and the body", "somatic trauma symptoms", "body keeps the score", "nervous system trauma", "hypervigilance"]}
        image="/uploads/articles/what-trauma-does-to-the-body.webp"
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
                {getText("What Trauma Does to the Body: Where the Past Lives in You", "ماذا تفعل الصدمة بالجسد: أين يسكن الماضي فيك")}
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
                  "You can close a chapter of your life and still find your body refusing to read the ending: the shoulders that never drop, the sleep that breaks at a sound, the stomach that clenches in a perfectly safe room. This is not weakness or imagination. Trauma is a physiological event as much as a psychological one — the body learns danger, and it keeps that lesson in muscle tension, hormone levels, and an alarm that never fully powers down. Understanding where the past lives in your body is the beginning of teaching it that the danger is over.",
                  "يمكنك أن تغلق فصلاً من حياتك وتجد جسدك ما زال يرفض قراءة النهاية: الكتفان اللذان لا يهبطان، والنوم الذي ينقطع عند صوت، والمعدة التي تنقبض في غرفة آمنة تماماً. هذا ليس ضعفاً ولا خيالاً. الصدمة حدث فسيولوجي بقدر ما هو حدث نفسي — الجسد يتعلّم الخطر، ويحفظ ذلك الدرس في توتر العضلات، ومستويات الهرمونات، وإنذار لا يُطفأ تماماً أبداً. فهم مكان سكنى الماضي في جسدك هو بداية تعليمه أن الخطر قد انتهى."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This guide is educational and free. Processing trauma — especially severe or childhood trauma — deserves a trained professional alongside you. The tools here are a free companion for stabilization and daily practice, not a replacement for trauma-focused therapy.",
                  "هذا الدليل تثقيفي ومجاني. معالجة الصدمة — خصوصاً إن كانت شديدة أو من الطفولة — تستحق معالجاً مدرّباً بجانبك. الأدوات هنا رفيقة مجانية للتثبيت والممارسة اليومية، وليست بديلاً عن العلاج الموجّه للصدمات."
                )}
              </div>

              <ArticleFigure
                src="/uploads/articles/what-trauma-does-to-the-body.webp"
                width={1376}
                height={768}
                alt={{
                  en: "Translucent silhouette with glowing nodes along the spine as an outer storm settles",
                  ar: "سيلويت شفاف بنقاط ضوء على العمود الفقري وعاصفة خارجية تهدأ",
                }}
                title={{
                  en: "Where Trauma Lives in the Body",
                  ar: "أين تسكن الصدمة في الجسد",
                }}
                caption={{
                  en: "The body remembers what the mind survived — and the body can learn safety again.",
                  ar: "الجسد يذكر ما نجا منه العقل — ويمكن للجسد أن يتعلّم الأمان من جديد.",
                }}
              />

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The Alarm, the Archive, and the Brake", "الإنذار، والأرشيف، والمكبح")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Three systems carry most of trauma's imprint. The amygdala — the brain's smoke detector — becomes hypervigilant after overwhelming experience, firing alarms at harmless cues that vaguely resemble the original threat: a tone of voice, a smell, footsteps behind you. The hippocampus, which time-stamps memories as finished, shrinks its output under chronic stress, which is why traumatic memories feel present-tense instead of past-tense. And the HPA axis — the hormonal cascade behind cortisol and adrenaline — recalibrates to a higher idle, leaving you exhausted yet unable to rest. None of this is a defect; each change was a survival adaptation that outstayed the danger.",
                  "ثلاثة أنظمة تحمل معظم بصمة الصدمة. اللوزة الدماغية — كاشف الدخان في الدماغ — تصبح في حالة تأهب زائد بعد التجربة الساحقة، فتُطلق الإنذارات على إشارات بريئة تشبه التهديد الأصلي بشكل غامض: نبرة صوت، أو رائحة، أو خطوات خلفك. والحُصين، الذي يختم الذكريات بطابع الانتهاء، يتراجع إنتاجه تحت التوتر المزمن، ولهذا تبدو الذكريات الصادمة بصيغة الحاضر لا الماضي. ومحور HPA — الشلال الهرموني خلف الكورتيزول والأدرينالين — يعاير نفسه نحو دوران أعلى، فيبقيت منهكاً وعاجزاً عن الراحة في آن. لا شيء من هذا عيب؛ كل تغيير كان تكيفاً للبقاء بقى بعد انقضاء الخطر."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("How the Body Keeps the Score", "كيف يحتسب الجسد النقاط")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Bessel van der Kolk's famous phrase is a clinical description, not poetry. Unprocessed trauma often surfaces as the body's ledger: chronic muscle tension in the neck, jaw, and pelvis; unexplained gut problems, because the gut is richly wired to the alarm system; migraines, shallow breathing, a startle response that fires at nothing. People frequently spend years chasing these symptoms organ by organ before anyone names the pattern. When doctors cannot find a cause, that is not proof the suffering is imaginary — it is often proof the suffering is being stored somewhere no scan looks: in a nervous system still running yesterday's emergency plan.",
                  "عبارة فان دير كولك الشهيرة وصفٌ سريري لا شِعر. الصدمة غير المعالَجة تظهر غالباً كسجل محاسبي للجسد: توتر عضلي مزمن في الرقبة والفك والحوض؛ ومشكلات هضمية بلا تفسير، لأن الأمعاء متصلة اتصالاً غنياً بنظام الإنذار؛ وصداعات نصبية، وتنفّس سطحي، واستجابة إجفال تُطلق على لا شيء. كثيرون يطاردون هذه الأعراض عاماً بعام عضواً بعد عضو قبل أن يسمّي أحد النمط. وحين لا يجد الأطباء سبباً، فليس ذلك دليلاً على أن المعاناة خيالية — بل غالباً دليل على أنها تُخزَّن في مكان لا تنظر إليه أي صورة: جهاز عصبي ما زال ينفذ خطة الطوارئ الخاصة بالأمس."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The Body Learns Danger — and It Can Unlearn It", "الجسد يتعلّم الخطر — ويمكنه أن ينساه")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "The hopeful news is symmetry: the same neuroplasticity that encoded threat can encode safety, provided you speak the body's language — repetition, sensation, and rhythm rather than argument. Slow exhaled breathing signals the alarm to stand down. Grounding through the five senses supplies present-tense evidence that contradicts past-tense fear. Gentle movement — walking, stretching, shaking out the arms — discharges the mobilized energy that freeze responses trapped. None of these practices erases what happened; they teach the body a second, competing lesson, and with daily repetition the second lesson starts to win. This is why body-based practices sit at the heart of every serious trauma-recovery model.",
                  "الخبر المبشّر هو التناظر: العصبية نفسها التي شفّرت التهديد تستطيع أن تشفّر الأمان، بشرط أن تخاطب لغة الجسد — التكرار، والإحساس، والإيقاع، لا الجدال. التنفس البطيء الزفيري يُشير للإنذار بأن يخفض الاستعداد. والتأريض عبر الحواس الخمس يقدّم أدلة بصيغة الحاضر تناقض الخوف بصيغة الماضي. والحركة اللطيفة — المشي، والإطالة، وتهزّ الذراعين — تُفرغ الطاقة المُتحرّكة التي حبستها استجابات التجمّد. لا تمحو هذه الممارسات ما حدث؛ إنها تعلّم الجسد درساً ثانياً منافساً، ومع التكرار اليومي يبدأ الدرس الثاني في الانتشار. لهذا تحتل الممارسات الجسدية قلب كل نموذج جدي للتعافي من الصدمات."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Reading Your Body's Ledger: A One-Week Practice", "قراءة سجل جسدك: ممارسة لأسبوع واحد")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "For one week, do a two-minute body scan at the same hour each evening: from head to feet, notice where you are holding — jaw, shoulders, stomach, hands — and simply name it without fixing it. Then apply one body-level intervention daily: ten minutes of paced breathing, a slow walk without your phone, or a hot shower with attention on the sensation of warmth. The goal is not immediate calm; it is building the basic trust that your body's states are readable and changeable. That trust is stage one of trauma recovery — and every tool that follows depends on it.",
                  "على مدى أسبوع، أجرِ مسحاً جسدياً لدقيقتين في الساعة نفسها كل مساء: من الرأس إلى القدمين، ولاحظ أين تتقبّض — الفك، الكتفان، المعدة، اليدان — وسمِّه فقط دون إصلاحه. ثم طبّق تدخلاً واحداً على مستوى الجسد يومياً: عشر دقائق من التنفس المنظّم، أو مشية بطيئة بلا هاتف، أو دشاً ساخناً مع انتباهٍ إلى إحساس الدفء. الهدف ليس الهدوء الفوري؛ بل بناء الثقة الأساسية بأن حالات جسدك قابلة للقراءة والتغيير. تلك الثقة هي المرحلة الأولى من التعافي من الصدمات — وكل أداة لاحقة تقوم عليها."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Ready for body-first stabilization tools?", "جاهز لأدوات تثبيت تبدأ من الجسد؟")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "The Trauma Recovery Center in Tamkinly offers free guided practices for grounding, breathing, and body scanning — built for exactly this stage of the journey.",
                    "مركز التعافي من الصدمات في تمكينلي يقدّم ممارسات موجَّهة مجانية للتأريض والتنفس والمسح الجسدي — مصممة لهذه المرحلة تحديداً من الرحلة."
                  )}
                </p>
                <Link href="/recovery/trc">
                  <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#1F6F78' }}>
                    {getText("Visit the Trauma Recovery Center", "زر مركز التعافي من الصدمات")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <ArticleReferences slug="what-trauma-does-to-the-body" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="what-trauma-does-to-the-body" />

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
