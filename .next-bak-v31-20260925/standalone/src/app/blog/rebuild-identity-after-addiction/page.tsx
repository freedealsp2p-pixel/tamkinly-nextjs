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

export default function RebuildIdentityArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "relapse-is-data", title: getText("Relapse Is Data: What the Slip Was Trying to Tell You", "الانتكاس معلومات: ماذا أرادت الزلة أن تقول لك"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "separating-self-from-shame", title: getText("Separating Yourself from Shame: You Are Not Your Shadow", "فصل الذات عن الخجل: أنت لست ظلّك"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "the-memory-illusion", title: getText("The Memory Illusion: Why You Are Not Who You Remember Being", "وهم الذاكرة: لست من تتذكّر أنك"), readTime: getText("9 min read", "٩ دقائق قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="Rebuild Identity After Addiction: Every Vote Builds the New Self"
        headlineAr="إعادة بناء الهوية بعد الإدمان: كل صوت يبني الذات الجديدة"
        description="Lasting recovery is identity work: you are not restoring the old you, you are assembling someone sturdier. Use votes, the future-self letter, and values to make the new identity real."
        slug="rebuild-identity-after-addiction"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["identity recovery", "rebuild identity after addiction", "identity based habits", "future self", "identity change"]}
        image="/uploads/articles/rebuild-identity-after-addiction.webp"
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
                {getText("Rebuild Identity After Addiction: Every Vote Builds the New Self", "إعادة بناء الهوية بعد الإدمان: كل صوت يبني الذات الجديدة")}
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
                  "The final stage of recovery is the one most advice skips: you cannot simply remove a behavior — you have to replace the identity it was serving. Compulsive use fills real human needs: escape, comfort, control after a hard day, feeling alive after numbness. Take it away and the vacuum does something every vacuum does. This is why the fifth stage is not abstinence maintenance; it is construction. You are not recovering the old you. You are assembling someone sturdier.",
                  "المرحلة الأخيرة من التعافي هي التي يتجاهلها معظم النصائح: لا يمكنك أن تزيل سلوكاً فحسب — بل عليك أن تستبدل الهوية التي كان يخدمها. الاستخدام القهري يملأ احتياجات إنسانية حقيقية: الهروب، والارتياح، والسيطرة بعد يوم عصيب، والإحساس بالحياة بعد الخدر. خذه بعيداً فيفعل الفراغ ما يفعله كل فراغ. لهذا ليست المرحلة الخامسة صيانةَ امتناع؛ إنها بناء. أنت لا تستعيد ذاتك القديمة. أنت تركّب شخصاً أكثر صلابة."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This guide is educational and free. It is not a replacement for professional care — if compulsive sexual behavior is severely affecting your life, working with a qualified therapist is a sign of strength, not failure.",
                  "هذا الدليل تثقيفي ومجاني، ولا يغني عن الرعاية المتخصصة — إذا كان السلوك الجنسي القهري يؤثر بحدة في حياتك، فالعمل مع معالج مؤهل علامة قوة لا علامة فشل."
                )}
              </div>

              <ArticleFigure
                src="/uploads/articles/rebuild-identity-after-addiction.webp"
                width={1376}
                height={768}
                alt={{
                  en: "Figure assembling a translucent geometric self-portrait from glowing fragments",
                  ar: "شخصية تركّب بورتريهها الشفاف الهندسي من شظايا متوهجة",
                }}
                title={{
                  en: "Every Vote Builds the New Self",
                  ar: "كل صوت يبني الذات الجديدة",
                }}
                caption={{
                  en: "You are not recovering the old you — you are assembling someone sturdier.",
                  ar: "أنت لا تستعيد ذاتك القديمة — بل تركّب شخصاً أكثر صلابة.",
                }}
              />

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Identity Is Evidence, Not Intention", "الهوية أدلة لا نوايا")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Your self-image is not what you wish or intend; it is what your brain has witnessed you do repeatedly. This is James Clear's formulation and it is neurologically literal: every action you take is a vote for the type of person you believe yourself to be. Two votes cast with conviction — a workout, an honest conversation, a journal page — do not feel like much on any single day. But votes accumulate, and the brain updates its model the way it updates anything: with repeated, undeniable evidence. The question that steers recovery is therefore never what should I stop doing. It is: what did I just vote for?",
                  "صورتك الذاتية ليست ما تتمنى أو تنوي؛ إنها ما شاهد دماغك منك فعله تكراراً. هذه صياغة جيمس كلير وهي حرفية عصبياً: كل فعل تقوم به صوتٌ انتخابي لنوع الشخص الذي تظن نفسك. صوتان مصوّبَان بإيمان — تمرين، أو حوار صادق، أو صفحة دفتر — لا يبدوان شيئاً في أي يوم واحد. لكن الأصوات تتراكم، والدماغ يحدّث نموذجه كما يحدّث كل شيء: بأدلة متكررة غير قابلة للإنكار. والسؤال الذي يقود التعافي ليس إذن: ماذا ينبغي أن أتوقف عن فعله؟ بل: لمن صوّتُ للتو؟"
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The Future-Self Letter", "رسالة نفسك المستقبلية")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Write, in present tense, who you are one year from now: how your evenings look, how you handle stress, what your closest relationship feels like, what you do with the energy you used to spend hiding. Write it as fact, not aspiration — I finish my workday and take a walk before dinner; when the urge comes, I ride it and write down what it taught me. Read the letter weekly. This is not manifestation theater; it is a cognitive map. A brain without a destination defaults to the old path, and research on possible selves shows that a vivid, specific future identity measurably changes present-day choices. You cannot vote for a person you cannot picture.",
                  "اكتب، بصيغة الحاضر، من أنت بعد سنة من الآن: كيف تبدو أمسياتك، وكيف تتعامل مع التوتر، وكيف يبدو أقرب علاقة لك، وماذا تفعل بالطاقة التي كنت تصرفها في الاختباء. اكتبها كوقائع لا كأمنيات — أُنهي يوم عملي وأمشي قبل العشاء؛ وحين تأتي الرغبة أركبها وأدوّن ما علّمتني إياه. اقرأ الرسالة أسبوعياً. هذه ليست مسرحية إلهام؛ إنها خريطة إدراكية. الدماغ بلا وجهة يعود إلى الطريق القديم، وتظهر دراسات «الأنا المستطاعة» أن هوية مستقبلية حية ومحددة تغيّر قياساً خيارات اليوم. لا يمكنك أن تصوّت لشخص لا تستطيع تصوّره."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Crowd Out the Vacuum with Values", "ازحم الفراغ بالقيم")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Compulsive behavior survives longest in lives with a vacuum, and it starves in lives crowded with meaning. That is not a slogan; it is a scheduling instruction. Name your top three values — the people, work, and body you actually respect — and then audit your week against them. Where is the vacuum? The empty Thursday evening, the unattended friendship, the strength training you abandoned. Fill the two largest vacuums with something specific and scheduled. Recovery holds when the life you are building is genuinely better to live than the one you are leaving — better not in theory, but on a concrete Tuesday night.",
                  "السلوك القهري يبقى أطول عمراً في الحياة الفارغة، ويتضور جوعاً في الحياة المزدحمة بالمعنى. تلك ليست شعاراً؛ إنها تعليمة جدولة. سمِّ قيمك الثلاث الأعلى — البشر والعمل والجسد الذي تحترمه فعلاً — ثم راجع أسبوعك في مقابلها. أين الفراغ؟ مساء الخميس الفارغ، والصداقة المهملة، وتمارين القوة المتروكة. املأ أكبر فراغين بشيء محدد ومجدول. يستقر التعافي حين تكون الحياة التي تبنيها أفضل عيشاً فعلاً من الحياة التي تتركها — أفضل ليس في النظرية، بل في ثلاثاءٍ محدد الليلة."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("When the Old Self Calls", "حين يناديك الذات القديمة")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Expect the old identity to campaign for its seat. It will speak in a familiar voice: one more time will not matter, you were always this way, nobody would know. Do not argue with it — outvote it, in public if possible: tell your accountability person, go where people are, do the next small vote immediately. Each time you act from the new identity while the old one is still speaking, the old voice loses a little authority and the new one gains it. Rebuilding is not a feeling that arrives; it is an office that fills — one verified vote, one kept promise, one honest week at a time.",
                  "توقّع أن تُرشّح الهوية القديمة نفسها لمقعد من جديد. ستتكلم بصوت مألوف: مرة أخرى لن تُغيب، كنت هكذا دوماً، ولن يعلم أحد. لا تجادلها — تفوقها أصواتاً، علناً إن أمكن: أخبر مرجع مساءلتك، واذهب حيث الناس، ونفّذ الصوت الصغير التالي فوراً. كل مرة تتصرف فيها من الهوية الجديدة بينما القديمة ما زالت تتكلم، تفقد الصوت القديم شيئاً من سلطته وتكتسبه الجديدة. إعادة البناء ليست شعوراً يصل؛ إنها منصب يُمتلئ — صوت موثوق واحد، ووعد مكتمل واحد، وأسبوع صادق واحد في كل مرة."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Ready for the identity rebuild stage?", "جاهز لمرحلة إعادة بناء الهوية؟")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "The final stage of Tamkinly's free recovery journey includes the identity rebuild tools: future-self letter, values check, and daily votes — free and private.",
                    "المرحلة الأخيرة من رحلة التعافي المجانية في تمكينلي تتضمن أدوات إعادة البناء: رسالة نفسك المستقبلية، وفحص القيم، والأصوات اليومية — مجاناً وخاصة."
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
        <ArticleReferences slug="rebuild-identity-after-addiction" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="rebuild-identity-after-addiction" />

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
