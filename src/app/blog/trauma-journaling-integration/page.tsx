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

export default function TraumaJournalingArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "trauma-recovery-three-stages", title: getText("The Three Stages of Trauma Recovery: Safety, Regulation, Integration", "مراحل التعافي من الصدمات: الأمان ثم التنظيم ثم التكامل"), readTime: getText("12 min read", "١٢ دقيقة قراءة") },
    { slug: "what-trauma-does-to-the-body", title: getText("What Trauma Does to the Body: Where the Past Lives in You", "ماذا تفعل الصدمة بالجسد: أين يسكن الماضي فيك"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "separating-self-from-shame", title: getText("Separating Yourself from Shame: You Are Not Your Shadow", "فصل الذات عن الخجل: أنت لست ظلّك"), readTime: getText("9 min read", "٩ دقائق قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="Trauma Journaling for Integration: The Page That Holds What You Carry"
        headlineAr="الكتابة العلاجية للتكامل: الصفحة التي تحمل ما تحمله"
        description="Written at the right pace, journaling helps the brain file trauma as past instead of present. Learn paced expressive writing, containment tools for hard days, and when to seek support."
        slug="trauma-journaling-integration"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["trauma journaling", "expressive writing", "journaling for ptsd", "integration trauma", "pennebaker writing"]}
        image="/uploads/articles/trauma-journaling-integration.webp"
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
                {getText("Trauma Journaling for Integration: The Page That Holds What You Carry", "الكتابة العلاجية للتكامل: الصفحة التي تحمل ما تحمله")}
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
                  "A traumatic experience resists filing. The brain keeps it open — fragments, images, body states — because it was never safely completed, so it keeps visiting: in dreams, in flinches, in hours you cannot account for. James Pennebaker's research on expressive writing found something remarkable: people who wrote about difficult experiences for fifteen to twenty minutes a day, for a few days, showed measurable improvements in physical and mental health. The page, used correctly, does what the moment of trauma never allowed — it holds the experience so your nervous system can finally finish processing it.",
                  "التجربة الصادمة تقاوم الأرشفة. يحتفظ بها الدماغ مفتوحة — شذرات، وصور، وحالات جسدية — لأنها لم تكتمل بأمان يوماً، فتستمر في الزيارة: في الأحلام، وفي الارتجافات، وفي ساعات لا تستطيع تفسيرها. وقد وجدت أبحاث جيمس بينيبيكر في الكتابة التعبيرية شيئاً مذهلاً: من كتبوا عن تجاربهم الصعبة خمس عشرة إلى عشرين دقيقة يومياً لبضعة أيام أظهروا تحسناً قابلاً للقياس في الصحة الجسدية والنفسية. الصفحة، المستخدمة صحيحاً، تفعل ما لم تسمح به لحظة الصدمة — تحمل التجربة ليتم جهازك العصبي أخيراً معالجتها."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This guide is educational and free. Processing severe trauma — especially childhood trauma — deserves a trained professional alongside you. Journaling is a powerful companion to that work, not a substitute for it. If writing floods you, stop and ground first.",
                  "هذا الدليل تثقيفي ومجاني. معالجة الصدمة الشديدة — خصوصاً من الطفولة — تستحق معالجاً مدرّباً بجانبك. الكتابة رفيقة قوية لذلك العمل لا بديل عنه. وإن غرقت في الكتابة، فتوقف وتأرّض أولاً."
                )}
              </div>

              <ArticleFigure
                src="/uploads/articles/trauma-journaling-integration.webp"
                width={1376}
                height={768}
                alt={{
                  en: "Open journal with constellations of ordered light rising from its pages",
                  ar: "دفتر مفتوح تتصاعد منه كوكبات ضوء مرتّبة من صفحاته",
                }}
                title={{
                  en: "The Page That Holds What You Carry",
                  ar: "الصفحة التي تحمل ما تحمله",
                }}
                caption={{
                  en: "Written at the right pace, the story files itself as past — and stops visiting as present.",
                  ar: "بوتيرة صحيحة، تحفظ القصة نفسها كماضٍ — وتتوقف عن زيارتك كحاضر.",
                }}
              />

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Why Pacing Is Everything", "لماذا تكون التوتّرة كل شيء")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "There is a difference between processing and flooding, and it is the difference between medicine and overdose. Integration means revisiting the memory in doses your window of tolerance can hold — enough activation to work with the material, enough safety to stay present. Flooding means re-living the whole event at full volume, which teaches the brain nothing except that the topic is dangerous. This is why trauma models insist on stabilization first. If your body is already running near its limit, adding the story on top does not integrate it; it re-injures. Start where the capacity is, not where the pain is loudest.",
                  "ثمّة فرق بين المعالجة والغرق، وهو فرق الدواء عن الجرعة الزائدة. التكامل يعني إعادة زيارة الذكرى بجرعات تحتملها نافذة تحمّلك — نشاط كافٍ للعمل على المادة، وأمان كافٍ للبقاء حاضراً. والغرق يعني إعادة عيش الحدث كاملاً بأقصى صوت، وهذا لا يعلّم الدماغ شيئاً سوى أن الموضوع خطر. لهذا تصرّ نماذج التعافي على التثبيت أولاً. فإذا كان جسدك يعمل قرب حده الأقصى أصلاً، فإضافة القصة فوق ذلك لا تدمجها؛ بل تعيد الإيذاء. ابدأ حيث السعة، لا حيث الألم أعلى صوتاً."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The Paced Writing Protocol", "بروتوكول الكتابة المُتدرّجة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Set a timer for fifteen minutes — a defined container matters, because it tells your nervous system there is an exit. Before writing, settle your body: feet on the floor, three slow exhales. Then write about the experience and what it left behind — thoughts, feelings, what it changed in how you see yourself. Write continuously; do not edit, do not worry about grammar, and do not force chronological order. If the intensity climbs past a seven out of ten, pause: name five things you can see, take one slow breath, and decide whether to continue or close for today. When the timer ends, write one closing line — and I am here now — then do something physical: stretch, walk, wash your face. The container includes the exit.",
                  "اضبط مؤقتاً على خمس عشرة دقيقة — الحاوية المحددة مهمة، لأنها تُخبر جهازك العصبي أن هناك مخرجاً. قبل الكتابة، ثبّت جسدك: قدمان على الأرض، وثلاثة أنفاس زفيرية بطيئة. ثم اكتب عن التجربة وما تركته وراءها — أفكار، ومشاعر، وما غيّرته في نظرتك إلى نفسك. اكتب باستمرار؛ لا تحرّر، ولا تقلق على النحو، ولا تُجبر الترتيب الزمني. إن صعدت الشدة فوق سبعة من عشرة، فتوقف: سمِّ خمسة أشياء تراها، وخذ نفساً بطيئاً، وقرّر المتابعة أو الإغلاق لليوم. حين ينتهي المؤقت، اكتب سطر ختام واحداً — وأنا هنا الآن — ثم افعل شيئاً جسدياً: إطالة، مشية، غسل الوجه. الحاوية تشمل المخرج."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Containment Tools for the Days It Rises Again", "أدوات الاحتواء للأيام التي يعود فيها كل شيء")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Some days the material opens itself at the wrong time — in traffic, in a meeting, at midnight. Containment is not repression; it is scheduling with mercy. Techniques that reliably help: the file-and-date technique, where you tell yourself this belongs to then, and I will write about it at seven; a transitional object or ritual that marks the end of writing — closing the notebook with both hands, putting it in a drawer, washing your hands; and grounding through temperature, which interrupts the body's replay faster than thought does. If a session leaves you dysregulated for hours, that is information: the dose was too high. Shorten the sessions, move farther from the hardest material, and add a week of stabilization practice first.",
                  "أيامٌ يفتح فيها الموضوع نفسه في وقت خاطئ — في السيارة، في اجتماع، في منتصف الليل. الاحتواء ليس كبتاً؛ إنه جدولة برحمة. تقنيات تنفع بثبات: تقنية الملف والتاريخ، حيث تقول لنفسك هذا يعود إلى حينها، وسأكتب عنه في السابعة؛ وغرض انتقالي أو طقس يُعلّم نهاية الكتابة — إغلاق الدفتر بيدين، ووضعه في درج، وغسل اليدين؛ والتأريض بالحرارة، الذي يقاطع إعادة تشغيل الجسد أسرع من أي تفكير. وإن تركتك جلسة غير منظّم لساعات، فهذه معلومة: الجرعة كانت أعلى من اللازم. قصّر الجلسات، وابتعد عن أصعب مادة، وأضِف أسبوعاً من ممارسة التثبيت أولاً."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("What Integration Actually Feels Like", "كيف يبدو التكامل فعلاً")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Do not expect the memory to become pleasant — integration does not repaint the past. What changes is its relationship to the present: the story develops a beginning, middle, and end; the body stops bracing as if it might happen again; the visits become rarer, shorter, and recognizably about then rather than now. People describe it as the memory moving from a roommate to a photograph — still real, still yours, no longer living in the house. That shift is the measurable goal of the whole three-stage model: safety, regulation, and finally this — a past that stays behind you, carried on pages instead of in your shoulders.",
                  "لا تتوقع أن تصير الذكرى لطيفة — التكامل لا يعيد تلوين الماضي. ما يتغير علاقته بالحاضر: القصة تنمو بدايةً ووسطاً ونهاية؛ والجسد يتوقف عن الاستعداد وكأنها قد تتكرر؛ وتصبح الزيارات أندر وأقصر ومعروفة بأنها عن حينها لا الآن. يصفها الناس بأنها تتحول من زميل سكن إلى صورة — حقيقية بعد، وتخصّك بعد، لكنها لم تعد تسكن البيت. هذا التحول هو الهدف المقيس للنموذج ثلاثي المراحل كله: أمان، وتنظيم، ثم هذا أخيراً — ماضٍ يبقى خلفك، محمولاً على صفحات بدل كتفيك."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Prefer a structured journaling companion?", "تفضل رفيقاً منظّماً للكتابة؟")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "The trauma journal tool in Tamkinly's Trauma Recovery Center offers paced writing prompts with built-in containment and grounding checks — free and completely private.",
                    "أداة دفتر الصدمات في مركز التعافي من الصدمات بتمكينلي تقدّم مطالبات كتابة متدرّجة مع احتواء وفحوص تأريض مدمجة — مجاناً وخاصة تماماً."
                  )}
                </p>
                <Link href="/recovery/trc/trauma-journal">
                  <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#1F6F78' }}>
                    {getText("Open the Trauma Journal", "افتح دفتر الصدمات")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <ArticleReferences slug="trauma-journaling-integration" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="trauma-journaling-integration" />

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
