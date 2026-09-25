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

export default function UnderstandingCompulsionCycleArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "relapse-prevention-system", title: getText("Relapse Prevention System: Structure That Chooses Before You Do", "نظام الوقاية من الانتكاس: بنية تختار قبل أن تفعل"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "urge-surfing-10-minute-window", title: getText("Urge Surfing: How to Ride the 10-Minute Wave of an Urge", "ركوب الموجة: كيف تعبر نافذة الرغبة في عشر دقائق"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "relapse-is-data", title: getText("Relapse Is Data: What the Slip Was Trying to Tell You", "الانتكاس معلومات: ماذا أرادت الزلة أن تقول لك"), readTime: getText("8 min read", "٨ دقائق قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="Understanding the Compulsion Cycle: The Moment It Breaks"
        headlineAr="فهم دورة الإدمان القهري: اللحظة التي تنكسر فيها"
        description="The compulsion cycle runs on autopilot: trigger, ritual, behavior, relief, hangover. Learn each stage, find the two-minute breaking point where choice still exists, and start breaking the loop today."
        slug="understanding-the-compulsion-cycle"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["compulsion cycle", "porn addiction cycle", "habit loop", "trigger awareness", "breaking the cycle", "urge management"]}
        image="/uploads/articles/understanding-the-compulsion-cycle.webp"
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
                {getText("Understanding the Compulsion Cycle: The Moment It Breaks", "فهم دورة الإدمان القهري: اللحظة التي تنكسر فيها")}
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
                  "A compulsive behavior never starts at the moment you give in. It starts minutes — sometimes hours — earlier, at a point so ordinary you barely notice it: a bored evening, a stressful message, the phone lighting up in an empty room. By the time you feel the urge as an urge, most of the loop has already run. Understanding the compulsion cycle stage by stage is the first recovery skill, because you cannot break a loop you cannot see.",
                  "السلوك القهري لا يبدأ أبداً في لحظة الاستسلام. إنه يبدأ قبلها بدقائق — وأحياناً بساعات — في نقطة عادية لدرجة تكاد لا تُلاحظ: أمسية فارغة، أو رسالة مجهدة، أو هاتف يضيء في غرفة صامتة. وحين تشعر بالرغبة بوصفها رغبة، تكون معظم الحلقة قد دارت بالفعل. فهم دورة الإدمان القهري مرحلةً بمرحلة هو مهارة التعافي الأولى، لأنك لا تستطيع كسر حلقة لا تراها."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This guide is educational and free. It is not a replacement for professional care — if compulsive sexual behavior is severely affecting your life, working with a qualified therapist is a sign of strength, not failure.",
                  "هذا الدليل تثقيفي ومجاني، ولا يغني عن الرعاية المتخصصة — إذا كان السلوك الجنسي القهري يؤثر بحدة في حياتك، فالعمل مع معالج مؤهل علامة قوة لا علامة فشل."
                )}
              </div>

              <ArticleFigure
                src="/uploads/articles/understanding-the-compulsion-cycle.webp"
                width={1376}
                height={768}
                alt={{
                  en: "Circular loop of arrows around a calm figure with one cracked glowing segment",
                  ar: "حلقة سهمين دائرية حول شخصية هادئة وفجوة متوهجة تنكسر فيها",
                }}
                title={{
                  en: "The Compulsion Cycle and Its Breaking Point",
                  ar: "دورة الإدمان القهري ونقطة انكسارها",
                }}
                caption={{
                  en: "Every loop has a weak link — recovery begins where the circle cracks open.",
                  ar: "لكل حلقة حلقةُ ضعف — ويبدأ التعافي حيث تنشق الدائرة.",
                }}
              />

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The Five Stages of the Loop", "المراحل الخمس للحلقة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Clinical models of addictive behavior — from Marlatt's relapse-prevention work to modern neuroscience of habit — describe the same architecture. First comes the trigger: an internal state (stress, boredom, loneliness, fatigue) or an external cue (a device, a time of day, a private space). The trigger does not ask permission; it simply starts the search. Second comes the ritual: the small, rehearsed sequence that leads toward the behavior — closing a door, opening an incognito tab, telling yourself this is the last time. The ritual is where the brain anticipates the reward and dopamine spikes before anything has happened.",
                  "تصف النماذج السريرية للسلوك الإدماني — من أعمال مارلات في الوقاية من الانتكاس إلى علم الأعصاب الحديث للعادات — البنية نفسها. أولاً يأتي المحفّز: حالة داخلية (توتر، أو ملل، أو وحدة، أو إجهاد) أو إشارة خارجية (جهاز، أو وقت من اليوم، أو مساحة خاصة). المحفّز لا يستأذن؛ إنه يبدأ البحث فحسب. ثانياً يأتي الطقس: المتتالية الصغيرة المجرَّبة التي تقود نحو السلوك — إغلاق باب، أو فتح نافذة تصفح خفي، أو إخبار النفس أن هذه المرة الأخيرة. الطقس هو المكان الذي يتوقع فيه الدماغ المكافأة، فيقفز الدوبامين قبل أن يحدث أي شيء."
                )}
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Third is the behavior itself, experienced on autopilot rather than as a decision. Fourth comes the relief — real, fast, and short-lived, which is exactly what teaches the brain to repeat the loop. Fifth arrives the hangover: the drop, the guilt, the promises. Crucially, the shame of stage five becomes tomorrow's trigger, feeding the very loop it condemns. The cycle is not a moral failure; it is a learned circuit that fires faster than conscious thought, which is why good people keep doing what they sincerely intend to stop.",
                  "ثالثاً يأتي السلوك ذاته، معاشاً على الطيار الآلي لا كقرار واعٍ. رابعاً يأتي الارتياح — حقيقي وسريع وقصير الأمد، وهو بالضبط ما يعلّم الدماغ تكرار الحلقة. خامساً يحضر الانتهار: الهبوط، والذنب، والوعود. والمفارقة الحاسمة أن خجل المرحلة الخامسة يصبح محفّز الغد، فيغذّي الحلقة ذاتها التي يدينها. الدورة ليست فشلاً أخلاقياً؛ إنها دائرة متعلَّمة تُطلق أسرع من الفكر الواعي، ولهذا يستمر الناس الطيبون في فعل ما يعزمون بصدق على التوقف عنه."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Why Willpower Waits Too Late", "لماذا تتدخل الإرادة متأخرة جداً")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Most people aim their willpower at stage three — the behavior itself — when the internal debate is already over. By then, dopamine has narrowed your attention to one goal, the prefrontal brake is weakened by stress, and the urge feels like a need. Research on habit and relapse consistently shows that intervention succeeds earlier in the chain: a trigger noticed at stage one, or a ritual interrupted at stage two, requires a fraction of the strength that resisting at stage three requires. This is not a character insight — it is a timing insight.",
                  "يوجّه معظم الناس إرادتهم إلى المرحلة الثالثة — السلوك ذاته — حين يكون الجدال الداخلي قد انتهى. ففي تلك اللحظة يكون الدوبامين قد ضيّق انتباهك نحو هدف واحد، ويكون الكابح الجبهي قد أضعفه التوتر، وتكون الرغبة قد تحولت إلى إحساس بالحاجة. وتُظهر أبحاث العادات والانتكاس باستمرار أن التدخل ينجح أبكر في السلسلة: محفّز تلاحظه في المرحلة الأولى، أو طقس تقاطعه في الثانية، يحتاج جزءاً يسيراً من القوة اللازمة للمقاومة في الثالثة. هذه ليست معلومة عن الشخصية — إنها معلومة عن التوقيت."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The Breaking Point: The Space Between Craving and Ritual", "نقطة الانكسار: المسافة بين الشوق والطقس")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Every loop has one weak link, and for compulsive behaviors it is the gap between feeling the pull and starting the ritual. In that gap — often less than two minutes wide — you are still choosing. The skill is to make that gap visible and longer. Name the trigger out loud or on paper: I am bored, I am anxious, I am alone. Naming shifts activity from the automatic circuitry of the striatum toward the prefrontal cortex, the part of you that can deliberate. Then insert one physical disruptor: stand up, change rooms, put the phone in another space, splash water on your face. You are not trying to win an argument with the urge; you are buying your deliberating brain enough time to come back online.",
                  "لكل حلقة حلقةُ ضعف واحدة، وفي السلوكيات القهرية تكون هي المسافة بين الشعور بالشدّ وبداية الطقس. في تلك الفجوة — التي لا يزيد عرضها غالباً على دقيقتين — ما زلت تختار. والمهارة هي جعل هذه الفجوة مرئية وأطول. سمِّ المحفّز بصوت مسموع أو على ورق: أنا ملان، أنا قلقان، أنا وحيد. التسمية تنشط القشرة الجبهية القادرة على التفكير بدل الدوائر التلقائية في العقدة المخططة. ثم أدخِل مقاطعاً فيزيائياً واحداً: انهض، غيّر الغرفة، ضع الهاتف في مكان آخر، أو انثر ماءً على وجهك. أنت لا تحاول أن تكسب جدالاً مع الرغبة؛ أنت تشتري لدماغك المفكر الوقت الكافي ليعود إلى العمل."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Map Your Own Cycle — Then Attack One Link", "ارسم حلقتك الخاصة — ثم اهجم على حلقة واحدة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "For the next seven days, keep a two-line log: the moment you noticed an urge (time, place, state) and what you did next. Patterns will surface quickly — most people find three recurring triggers and one fixed ritual. Then choose a single link to attack this week: remove one trigger if you can (device out of the bedroom, content blocker on), or interrupt one ritual (no screens in the bathroom, a walk at your highest-risk hour). Do not try to fight the whole loop at once. Recovery is won link by link, and every link you weaken makes the next one easier to see — and easier to break.",
                  "على مدى الأيام السبعة القادمة، احتفظ بسجل من سطرين: لحظة ملاحظتك للرغبة (الوقت، المكان، الحالة)، وما فعلتَه بعدها. ستظهر الأنماط سريعاً — يجد معظم الناس ثلاثة محفزات متكررة وطقساً واحداً ثابتاً. ثم اختر حلقة واحدة للهجوم عليها هذا الأسبوع: أزل محفزاً إن استطعت (الهاتف خارج غرفة النوم، أو حاجب محتوى)، أو قاطع طقساً واحداً (لا شاشات في الحمام، أو مشية في ساعة الخطر العالية). لا تحاول قتال الحلقة كاملة دفعة واحدة. يُكسب التعافي حلقةً بعد حلقة، وكل حلقة تُضعفها تجعل التالية أوضح في الرؤية — وأسهل في الكسر."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Ready to map your cycle with a guided tool?", "جاهز لرسم حلقتك بأداة موجَّهة؟")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "Tamkinly's free Porn Recovery journey walks you through the cycle mapper, urge surfing, and the relapse reader — step by step, at your pace. 100% free, no account needed, and your progress stays private on your device.",
                    "رحلة التعافي المجانية من الإباحية في تمكينلي تمشي معك عبر محدد الحلقة وركوب الموجة وقارئ الانتكاس — خطوة بخطوة، وبسرعتك. مجانية ١٠٠٪، بلا حساب، وتقدّمك يبقى خاصاً على جهازك."
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
        <ArticleReferences slug="understanding-the-compulsion-cycle" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="understanding-the-compulsion-cycle" />

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
