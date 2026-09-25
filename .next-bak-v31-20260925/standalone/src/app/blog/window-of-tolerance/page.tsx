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

export default function WindowOfToleranceArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "what-trauma-does-to-the-body", title: getText("What Trauma Does to the Body: Where the Past Lives in You", "ماذا تفعل الصدمة بالجسد: أين يسكن الماضي فيك"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "grounding-for-flashbacks", title: getText("Grounding for Flashbacks: Evidence That You Are Here Now", "التأريض للذكريات الومضية: دليل على أنك هنا الآن"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "paced-breathing-for-regulation", title: getText("Paced Breathing for Regulation: Inhale Four, Exhale Six", "التنفس المنظّم للتوازن العصبي: شهيق أربعة وزفير ستة"), readTime: getText("8 min read", "٨ دقائق قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="The Window of Tolerance: Living Inside Your Optimal Zone"
        headlineAr="نافذة التحمّل: العيش داخل منطقتك المثلى"
        description="Between hyperarousal and shutdown lies your window of tolerance — the zone where you can think, feel, and choose. Learn to recognize when you leave it and the tools that widen it over time."
        slug="window-of-tolerance"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["window of tolerance", "hyperarousal", "hypoarousal", "nervous system regulation", "dan siegel"]}
        image="/uploads/articles/window-of-tolerance.webp"
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
                {getText("The Window of Tolerance: Living Inside Your Optimal Zone", "نافذة التحمّل: العيش داخل منطقتك المثلى")}
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
                  "There is a zone where you are most yourself: alert but not alarmed, feeling but not flooded, able to think clearly, connect honestly, and choose deliberately. Dan Siegel called it the window of tolerance, and once you learn to see it, it explains more of your week than any personality test. Why you snapped at a small comment. Why you went numb during a hard conversation. Why the plan you made in the morning dissolved by evening. Above the window is chaos; below it is collapse. Inside it is where life actually happens.",
                  "ثمّة منطقة تكون فيها أكثر نفسيتك: متيقظاً بلا إنذار، وشاعراً دون غرق، قادراً على التفكير بوضوح والارتباط بصدق والاختيار بعمد. سماها دانيال سيغل نافذة التحمّل، وحين تتعلم رؤيتها تفسر من أسبوعك أكثر من أي اختبار شخصية. لماذا انفجرت عند تعليق صغير. ولماذا أخدت في حوار صعب. ولماذا ذاب قرارك الصباحي بحلول المساء. فوق النافذة فوضى؛ ودونها انهيار. وداخلها يقع الحياة فعلاً."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This guide is educational and free. Processing trauma — especially severe or childhood trauma — deserves a trained professional alongside you. The tools here are a free companion for stabilization and daily practice, not a replacement for trauma-focused therapy.",
                  "هذا الدليل تثقيفي ومجاني. معالجة الصدمة — خصوصاً إن كانت شديدة أو من الطفولة — تستحق معالجاً مدرّباً بجانبك. الأدوات هنا رفيقة مجانية للتثبيت والممارسة اليومية، وليست بديلاً عن العلاج الموجّه للصدمات."
                )}
              </div>

              <ArticleFigure
                src="/uploads/articles/window-of-tolerance.webp"
                width={1376}
                height={768}
                alt={{
                  en: "Calm luminous horizontal band between deep abyss and chaotic storm, a figure inside",
                  ar: "شريط ضوء هادئ أفقي بين هاوية عميقة وعاصفة فوضوية وشخصية داخله",
                }}
                title={{
                  en: "Living Inside the Window",
                  ar: "العيش داخل النافذة",
                }}
                caption={{
                  en: "Between explosion and shutdown there is a window — and it can widen.",
                  ar: "بين الانفجار والانسحاب نافذة — ويمكن أن تتّسع.",
                }}
              />

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Above the Window: Hyperarousal", "فوق النافذة: فرط الاستثارة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Hyperarousal is the nervous system's gas pedal stuck down: racing thoughts, a pounding heart, irritability that spikes over nothing, the urge to move, fix, fight, or flee. From this state you may say things you do not mean, send messages you regret, or chase stimulation — including compulsive habits — just to discharge the charge. Nothing useful is decided up here, because the thinking brain is partially offline; the body believes it is in an emergency and behaves accordingly. The signature of hyperarousal is too much: too loud, too fast, too reactive.",
                  "فرط الاستثارة هو دواسة وقود الجهاز العصبي عالقة منخفضة: أفكار متسابقة، وقلب يخفق، وتسرّع ينفجر لأتفه ما، ورغبة في الحركة والإصلاح والقتال والهرب. من هذه الحالة قد تقول ما لا تقصده، وترسل رسائل تندم عليها، أو تطارد المثيرات — من بينها العادات القهرية — فقط لتُفرغ الشحنة. لا شيء مفيد يُقرر هنا، لأن الدماغ المفكر خارج الخدمة جزئياً؛ الجسد يظن نفسه في حالة طوارئ ويتصرف وفقاً لذلك. بصمة فرط الاستثارة هي الزيادة: صوت أعلى، إيقاع أسرع، ردّ فعل أشد."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Below the Window: Hypoarousal", "دون النافذة: نقص الاستثارة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Hypoarousal is the opposite emergency: shutdown. Energy drops through the floor, feelings go muffled or absent, the world looks gray and far away, and even simple tasks feel like moving through deep water. Where hyperarousal says do something now, hypoarousal says do nothing, feel nothing, disappear. This is the dorsal vagal state — the body's ancient last resort — and it is common after prolonged stress or trauma. People often misread it as laziness or depression of character, but it is physiology: a nervous system that concluded engagement was too dangerous and pulled the master breaker.",
                  "نقص الاستثارة هو الطوارئ المعاكسة: الانسحاب الكامل. الطاقة تهبط إلى الأرضية، والمشاعر تخفت أو تغيب، والعالم يبدو رمادياً بعيداً، وأبسط المهام تصبح كالسباحة في ماء عميق. حيث يقول فرط الاستثارة «افعل شيئاً الآن»، يقول نقص الاستثارة «لا تفعل شيئاً، لا تشعر بشيء، اختفِ». هذه حالة العصب الجارفي الظهري — الملاذ الأخير القديم في الجسد — وهي شائعة بعد التوتر المديد أو الصدمة. وكثيرون يقرؤونها خطأً كسَلَب أو كساد أخلاقي، لكنها فسيولوجيا: جهاز عصبي استنتج أن الاندماج أخطر من اللازم فسحب قاطع التيار الرئيسي."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Recognizing Your Own Edges", "التعرف على حوافّك أنت")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Everyone's window is different, and yours has a signature. For one week, note three check-ins a day: where am I on my own scale — inside, high, or low? Body signals make reliable markers: jaw and shoulders climbing means you are leaving upward; fog, heaviness, and distance mean you are sinking below. Notice especially what pushed you out — an email, a tone of voice, hunger, a specific hour. Most people discover their window is narrower on short sleep and wider after movement. This is not self-diagnosis; it is cartography. You cannot stay inside a window you have never actually seen.",
                  "نافذة كل إنسان مختلفة، ولك منها بصمة. لأسبوع واحد، سجّل ثلاث فحوص يومياً: أين أنا على سلّمي الخاص — داخل النافذة، مرتفعاً، أم منخفضاً؟ إشارات الجسد مؤشرات موثوقة: الفك والكتفان يصعدان تعني خروجاً نحو الأعلى؛ والضباب والثقل والبعاد تعني هبوطاً تحت النافذة. ولاحظ خصوصاً ما أخرجك — رسالة عمل، أو نبرة صوت، أو جوع، أو ساعة بعينها. ويكتشف معظم الناس أن نوافذهم أضيق عند نقص النوم وأوسع بعد الحركة. هذا ليس تشخيصاً ذاتياً؛ إنه رسم خريطة. لا يمكنك البقاء داخل نافذة لم ترها فعلاً قط."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Widening the Window: Return, Repeat, Trust", "توسيع النافذة: عُد، ثم كرّر، ثم وثِق")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "The window widens the way a muscle grows: through repeated, well-recovered stress — not through forcing yourself to endure more. Two skills do the work. First, learn your return tools: for high states, a longer exhale, cold water on the face, a walk that burns the charge; for low states, gentle activation — sunlight, movement, a warm shower, one tiny completed task, a text to a safe person. Second, practice the return while the wave is small, so that regulation becomes reflex rather than rescue. Over weeks, the same triggers produce smaller departures and faster returns. That is what widening feels like: not a calmer life, but a system that recovers faster — and stays present for more of it.",
                  "تتسع النافذة كما ينمو العضل: عبر توتر متكرر يُتعافى منه جيداً — لا عبر إجبار نفسك على تحمّل مزيد. مهارتان تقومان بالعمل. الأولى: تعلّم أدوات عودتك: للحالات العالية، زفير أطول، وماء بارد على الوجه، ومشية تُفرغ الشحنة؛ وللحالات المنخفضة، تنشيط لطيف — ضوء شمس، وحركة، ودش دافئ، ومهمة صغيرة تكتمل، ورسالة لشخص آمن. الثانية: تدرّب على العودة والموجة صغيرة، حتى يصبح التنظيم انعكاساً لا إنقاذاً. وأسابيع، تنتج المثيرات ذاتها خروجاً أصغر وعوداً أسرع. تلك هي إحساس التسّع: ليس حياة أهدأ، بل نظام يتعافى أسرع — ويحضر لحياة أكبر منها."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Find your window with guided regulation tools", "اكتشف نافذتك بأدوات تنظيم موجَّهة")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "The Trauma Recovery Center in Tamkinly includes regulation practices for both edges of the window — grounding for highs, gentle activation for lows. Free and private.",
                    "مركز التعافي من الصدمات في تمكينلي يتضمن ممارسات تنظيم لحافتي النافذة — تأريض للمرتفعة، وتنشيط لطيف للمنخفضة. مجاناً وخاصة."
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
        <ArticleReferences slug="window-of-tolerance" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="window-of-tolerance" />

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
