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

export default function GroundingForFlashbacksArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "window-of-tolerance", title: getText("The Window of Tolerance: Living Inside Your Optimal Zone", "نافذة التحمّل: العيش داخل منطقتك المثلى"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "paced-breathing-for-regulation", title: getText("Paced Breathing for Regulation: Inhale Four, Exhale Six", "التنفس المنظّم للتوازن العصبي: شهيق أربعة وزفير ستة"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "what-trauma-does-to-the-body", title: getText("What Trauma Does to the Body: Where the Past Lives in You", "ماذا تفعل الصدمة بالجسد: أين يسكن الماضي فيك"), readTime: getText("9 min read", "٩ دقائق قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="Grounding for Flashbacks: Evidence That You Are Here Now"
        headlineAr="التأريض للذكريات الومضية: دليل على أنك هنا الآن"
        description="Flashbacks pull you into a past moment; grounding returns you to the present. Learn the 5-4-3-2-1 technique and other grounding tools that give your nervous system proof of now."
        slug="grounding-for-flashbacks"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["grounding techniques", "54321 grounding", "flashback management", "grounding for anxiety", "ptsd grounding"]}
        image="/uploads/articles/grounding-for-flashbacks.webp"
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
                {getText("Grounding for Flashbacks: Evidence That You Are Here Now", "التأريض للذكريات الومضية: دليل على أنك هنا الآن")}
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
                  "A flashback is not remembering — it is reliving. The past arrives with the senses of the present: the smell, the sound, the body state, without any felt boundary saying it happened then and not now. That is why being told you are safe rarely helps; your nervous system does not accept arguments, it accepts evidence. Grounding is the practice of handing your senses that evidence, sixty seconds at a time, until your body believes what the calendar already knows: you are here, and it is now.",
                  "الذكرى الومضية ليست تذكّراً — إنها إعادة عيش. يصل الماضي بحواس الحاضر: الرائحة، والصوت، وحالة الجسد، دون أي حدود محسوسة تقول إنه حدث حينها لا الآن. ولهذا نادراً ما ينفع قول «أنت آمن»؛ فجهازك العصبي لا يقبل الحجج، بل يقبل الأدلة. التأريض هو ممارسة تسليم حواسك ذلك الدليل، ستين ثانية في كل مرة، حتى يصدق جسدك ما يعرفه التقويم: أنك هنا، وأنه الآن."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This guide is educational and free. Processing trauma — especially severe or childhood trauma — deserves a trained professional alongside you. The tools here are a free companion for stabilization and daily practice, not a replacement for trauma-focused therapy.",
                  "هذا الدليل تثقيفي ومجاني. معالجة الصدمة — خصوصاً إن كانت شديدة أو من الطفولة — تستحق معالجاً مدرّباً بجانبك. الأدوات هنا رفيقة مجانية للتثبيت والممارسة اليومية، وليست بديلاً عن العلاج الموجّه للصدمات."
                )}
              </div>

              <ArticleFigure
                src="/uploads/articles/grounding-for-flashbacks.webp"
                width={1376}
                height={768}
                alt={{
                  en: "Bare feet on solid ground with roots of light spreading as fog thins above",
                  ar: "قدمان حافيتان على أرض صلبة وجذور ضوء تتمدد والضباب يتناثر فوقها",
                }}
                title={{
                  en: "Grounding: Evidence of Now",
                  ar: "التأريض: دليل الحاضر",
                }}
                caption={{
                  en: "Five senses, sixty seconds, one truth: you are here, and it is now.",
                  ar: "خمس حواس، ستون ثانية، حقيقة واحدة: أنت هنا، وهذا الآن.",
                }}
              />

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Why Grounding Works", "لماذا ينفع التأريض")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "During a flashback, the brain's smoke detector has hijacked attention and the time-stamping system has failed, so the experience runs without a past label. Sensory attention competes directly with that process: you cannot fully attend to the texture of a blanket and the sensations of the past scene at the same time. Grounding exploits this bottleneck deliberately. By loading all five channels of input with present-moment data, you force the nervous system to choose the channel that has a date on it — today. Over repetitions, the brain also relearns the association: intensity does not automatically mean danger, and sensation in the present can be tolerated.",
                  "خلال الذكرى الومضية، يخطف كاشف الدخان في الدماغ الانتباه ويفشل نظام التوقيت الزمني، فتجري التجربة دون ملصق الماضي. والانتباه الحسي يتنافس تنافساً مباشراً مع تلك العملية: لا يمكنك أن تُعطي ملمس البطانية انتباهاً كاملاً وإحساسات المشهد الماضي في الوقت نفسه. التأريض يستثمر هذا العنق بوعي. بتحميل القنوات الخمس كلها ببيانات اللحظة الحاضرة، تجبر جهازك العصبي على اختيار القناة التي تحمل تاريخاً — اليوم. ومع التكرار، يتعلّم الدماغ الارتباط من جديد: الشدة لا تعني الخطر تلقائياً، والإحساس في الحاضر يمكن تحمّله."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The 5-4-3-2-1 Technique, Slowly", "تقنية 5-4-3-2-1، ببطء")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Work through the five senses in order, naming items out loud when possible: five things you can see (the exact color of the wall, a shadow's edge), four things you can physically feel (fabric, chair pressure, the temperature of your hands), three things you can hear (near, far, and your own breath), two things you can smell (or two smells you like), and one thing you can taste (or one slow sip of water). The power is in the detail: one specific thing per channel beats ten vague ones. If you lose count — you will, at first — that is not failure; starting over is the practice.",
                  "امشِ على الحواس الخمس بالترتيب، سمِّ ما تجده بصوت مسموع إن أمكن: خمسة أشياء تراها (اللون الدقيق للجدار، حدّ الظل)، وأربعة أشياء تلمسها جسدياً (القماش، ضغط الكرسي، حرارة يديك)، وثلاثة أشياء تسمعها (قريب، بعيد، ونفسك)، ورائحتان تشمهما (أو رائحتان تحبهما)، وطعم واحد تشعر به (أو رشفة ماء بطيئة). القوة في التفصيل: شيء واحد محدد لكل قناة أفضل من عشرة ضبابية. وإذا ضلّ العدّ — وستضلّ في البداية — فذلك ليس فشلاً؛ البدء من جديد هو الممارسة نفسها."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("A Grounding Kit for the Days It Feels Impossible", "طقم تأريض للأيام التي يبدو فيها كل شيء مستحيلاً")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Build your kit before the storm, not during it. Strong sensory anchors work best: an ice cube held in the hand, a citrus peel to smell, peppermint gum, a stone with a distinct texture kept in a pocket. Add orientation phrases you can repeat without thinking — my name is..., I am in..., today is... — because speech uses different brain circuitry than the flashback does. Feet on the floor, pressing down, is a primitive but powerful anchor; so is temperature, which is why cold water on the face or wrists resets so effectively. Write your five anchors on a card. In distress, you will not remember the clever plan — you will only do what the card says.",
                  "ابنِ طقمك قبل العاصفة لا أثناءها. المراسِ الحسية القوية أنجع: مكعب ثلج في الكف، أو قشرة حمضيات تشمّها، أو علكة نعناع، أو حجر بملمس مميز في الجيب. أضِف عبارات توجيه تكررها دون تفكير — اسمي هو...، أنا في...، اليوم هو... — لأن الكلام يستخدم دوائر دماغية مختلفة عن الذكرى الومضية. والقدمان على الأرض بالضغط مرساة بدائية لكنها قوية؛ وكذلك الحرارة، ولهذا يُعيد الماء البارد على الوجه أو المعصمين الضبط بفعالية. اكتب مراسيك الخمسة على بطاقة. في الضيق لن تتذكر الخطة الذكية — ستفعل فقط ما على البطاقة."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("After the Wave Passes", "بعد مرور الموجة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Once you are back in the present, do not rush away from yourself. Drink water, wrap in a blanket, and let your heart rate settle — a flashback floods the body with stress chemistry, and the aftercare matters as much as the exit. Then, later and gently, note what preceded the episode: time, place, tiredness level, any cue. Patterns there are not accusations; they are scheduling information, telling you when extra support or an earlier bedtime would help. Flashbacks tend to lose both frequency and force as the nervous system accumulates proof of safety — and grounding is how you collect that proof, sixty seconds at a time.",
                  "حين تعود إلى الحاضر، لا تهرع مبتعداً عن نفسك. اشرب ماءً، وتحتّ ببطانية، ودع معدل قلبك يهدأ — الذكرى الومضية تغمر الجسد بكيمياء التوتر، والرعاية بعد الحدث لا تقل أهمية عن الخروج. ثم لاحقاً وبلطف، دوّن ما سبق الحلقة: الوقت، المكان، مستوى التعب، أي إشارة. الأنماط هناك ليست اتهامات؛ إنها معلومات جدولة تخبرك متى تفيد مساندة إضافية أو نوم أبكر. تميل الذكريات الومضية إلى تراجع تكرارها وقوتها مع تراكم أدلة الأمان لدى الجهاز العصبي — والتأريض هو وسيلة جمعك لتلك الأدلة، ستين ثانية في كل مرة."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Practice grounding with a guided tool", "تدرّب على التأريض بأداة موجَّهة")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "The 5-4-3-2-1 interactive tool in Tamkinly's Trauma Recovery Center walks you through each sense at your pace — free, private, and ready whenever you need it.",
                    "الأداة التفاعلية 5-4-3-2-1 في مركز التعافي من الصدمات بتمكينلي تمشي معك عبر كل حاسة وسرعتك — مجانية وخاصة وجاهزة متى احتجتها."
                  )}
                </p>
                <Link href="/recovery/trc/grounding">
                  <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#1F6F78' }}>
                    {getText("Open the Grounding Tool", "افتح أداة التأريض")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <ArticleReferences slug="grounding-for-flashbacks" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="grounding-for-flashbacks" />

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
