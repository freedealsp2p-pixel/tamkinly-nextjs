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

export default function TheMemoryIllusionArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "rebuild-identity-after-addiction", title: getText("Rebuild Identity After Addiction: Every Vote Builds the New Self", "إعادة بناء الهوية بعد الإدمان: كل صوت يبني الذات الجديدة"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "vagus-nerve-breathing", title: getText("Vagus Nerve Breathing: The Science of Calming Your Body on Command", "تنفس العصب المبهم (Vagus nerve): علم تهدئة جسدك بقدرتك"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "trauma-recovery-three-stages", title: getText("The Three Stages of Trauma Recovery: Safety, Regulation, Integration", "مراحل التعافي من الصدمات: الأمان ثم التنظيم ثم التكامل"), readTime: getText("12 min read", "١٢ دقيقة قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="The Memory Illusion: Why You Are Not Who You Remember Being"
        headlineAr="وهم الذاكرة: لست من تتذكّر أنك"
        description="Memory is not a recording — it is a reconstruction edited every time you recall it. Discover the neuroscience of the memory illusion and why your self-story is editable, then start editing it on purpose."
        slug="the-memory-illusion"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["memory illusion", "reconstructive memory", "false memories", "self narrative", "identity change"]}
      />
      <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
                {getText("Identity & Transformation", "الهوية والتحوّل")}
              </Badge>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                {getText("The Memory Illusion: Why You Are Not Who You Remember Being", "وهم الذاكرة: لست من تتذكّر أنك")}
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
                  "You probably experience your memories as files: open one, and the past plays back exactly as it happened. That experience is the memory illusion — one of the most robust findings of modern psychology. Memory is not a recording; it is a reconstruction, rebuilt every single time you recall it, from fragments, emotion, and whatever story you currently believe about yourself. This is not a limitation to mourn. It is the single most liberating fact in identity change: if the story is rebuilt at every retrieval, the story can be edited on purpose.",
                  "ربما تعيش ذكرياتك على أنها ملفات: تفتح واحداً فيُعاد تشغيل الماضي كما حدث تماماً. ذلك الإحساس هو وهم الذاكرة — من أكثر ما ثبت في علم النفس الحديث. الذاكرة ليست تسجيلاً؛ إنها إعادة بناء، تُشيَّد من جديد في كل مرة تستدعيها، من شذرات وعاطفة وأي قصة تعتقد حالياً عن نفسك. وهذا ليس قصوراً يُحزن عليه. إنه أكثر حقائق تحريراً في تغيير الهوية: إذا كانت القصة تُبنى في كل استدعاء، فالقصة قابلة للتحرير عمداً."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This article is educational and free. It is not a substitute for therapy — and it is not an invitation to rewrite facts with other people. We are talking about the meaning of your past, not its events.",
                  "هذا المقال تثقيفي ومجاني، ولا يغني عن العلاج — وليس دعوة لإعادة كتابة الوقائع مع الآخرين. حديثنا عن معنى ماضيك لا عن أحداثه."
                )}
              </div>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("How Reconstruction Works", "كيف تعمل إعادة البناء")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "The evidence has accumulated for nearly a century. Frederic Bartlett showed in the 1930s that people retell stories by reshaping them toward what makes sense to their culture and expectations. Elizabeth Loftus demonstrated that memories can be altered by suggestion — wording changes, imagination exercises, even fabricated childhood scenes that feel as real as real ones. Modern neuroscience fills in the mechanism: recalling a memory makes it temporarily labile, and it is re-saved with the emotional coloring of the present moment. Every retrieval is a small rewrite. You have never once remembered your past as it was; you have only ever remembered the last version you told.",
                  "تراكمت الأدلة قرناً كاملاً تقريباً. أظهر فريدريك بارتليت في الثلاثينيات أن الناس يعيدون سرد القصص بصياغتها نحو ما يليق بثقافتهم وتوقعاتهم. وبرهنت إليزابيث لوفتس أن الذكريات يمكن أن تتغير بالإيحاء — بتغيير صياغة، وتمارين تخيل، وحتى مشاهد طفولة مفبركة تبدو حقيقية بقدر الحقيقية. وعلم الأعصاب الحديث يملأ الآلية: استدعاء الذكرى يجعلها مؤقتاً قابلة للتشكل، وتُحفظ من جديد بتلوين عاطفي للحاضر. كل استدعاء إعادة كتابة صغيرة. لم تتذكر ماضيك كما كان ولا مرة واحدة؛ بل تذكرت دائماً آخر نسخة رويتها."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The Self-Story: Your Most Rehearsed Memory", "القصة الذاتية: أكثر ذكرياتك تكراراً")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Among all memories, the most consequential is the one you keep retelling: the story of who you are. I was always the shy one. I never finish anything. I am someone who struggles with this. Psychologists call the memory system behind it the self-memory system, and it works like any other memory — rebuilt at retrieval, biased toward consistency. The problem is not honesty; the problem is that the self-story hardens into identity evidence. A person who tells I always quit stories collects confirming moments and discards contradicting ones. The story is not reporting your life. The story is curating it — and curation can be changed.",
                  "من بين كل الذكريات، الأشد أثراً هي التي تعيد روايتها: قصة من أنت. كنت الخجول دائماً. لا أُكمل شيئاً أبداً. أنا من يعاني مع هذا. ويسمي علماء النفس النظام الذاكري خلفها نظام الذاكرة-الذات، وهو يعمل كأي ذاكرة — يُعاد بناؤه عند الاستدعاء، ومنحازاً نحو الاتساق. والمشكلة ليست في الأمانة؛ المشكلة أن القصة الذاتية تتماسك إلى أدلة هوية. الشخص الذي يقول «أتخلى دائماً» يجمع لحظات مؤكدة ويرفض المؤاكسة. القصة لا تنقل حياتك. القصة تُنتقي منها — والانتقاء قابل للتغيير."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Editing on Purpose: Three Practices", "التحرير العمد: ثلاث ممارسات")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "First, retrieve differently. When an old identity memory surfaces — the humiliation, the failure, the always — add present-tense commentary before you file it again: that was then; here is what I know now; this is what it made possible. Each retrieval with new framing is a re-save with new wiring. Second, widen the archive. Deliberately recall disconfirming evidence — the times you did finish, did speak up, did change — and write three of them down; memory that is never retrieved grows faint, so make the counter-evidence louder. Third, rehearse forward. Every evening, one line about today that fits the person you are becoming. This is not denial of the past; it is participation in how it will be stored.",
                  "أولاً، استدعِ بغير الطريقة القديمة. حين تظهر ذكرى هوية قديمة — الإذلال، الفشل، الـ«دائماً» — أضِف تعليقاً بصيغة الحاضر قبل أن تحفظها من جديد: كان ذلك حينها؛ وهذا ما أعرفه الآن؛ وهذه هي الإمكانات التي فتحها. كل استدعاء بتأطير جديد حفظٌ جديد بأسلاك جديدة. ثانياً، وسّع الأرشيف. استدعِ عمداً الأدلة المؤاكسة — المرات التي أكملت فيها، وتكلّمت، وتغيّرت — واكتب ثلاثاً منها؛ فالذاكرة التي لا تُستدعى تخبو، فاجعل الدليل المضاد أعلى صوتاً. ثالثاً، تدرّب نحو الأمام. كل مساء سطر واحد عن اليوم يناسب الشخص الذي تصير إليه. هذا ليس إنكاراً للماضي؛ إنه مشاركة في كيفية تخزينه."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("What This Means for Change", "ماذا يعني هذا للتغيير")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Here is why the memory illusion matters more than motivation: the greatest obstacle to change is rarely the present — it is a past that keeps being retrieved as proof that change is impossible. But that proof is an editing artifact, not a verdict. The past has one fixed property — that it happened — and an unlimited number of open properties: what it meant, what it taught, which chapter of your story it occupies. History does not change; the history you are continuously telling does. And because identity follows evidence, the person you keep describing is the person your brain keeps expecting — until a better description gives it a better forecast. You are not who you remember being. You are who you keep rebuilding.",
                  "لهذا يتفوق وهم الذاكرة على الحافز: أكبر عوائق التغيير ليست الحاضر — بل ماضٍ يُستدعى باستمرار كدليل على أن التغيير مستحيل. لكن ذلك الدليل أثرُ تحرير لا حُكم. للماضي خاصية ثابتة واحدة — أنه وقع — وعدد مفتوح من الخصائص المفتوحة: ماذا يعني، وماذا علّم، وأي فصل من قصتك يشغله. التاريخ لا يتغير؛ أما التاريخ الذي ترويه باستمرار فيتغير. ولأن الهوية تتبع الأدلة، فالشخص الذي توصفه باستمرار هو الشخص الذي يتوقعه دماغك — إلى أن يمنحه وصف أفضل توقعاً أفضل. أنت لست من تتذكر أنك. أنت من تُعيد بناءه باستمرار."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Ready to edit your self-story with structure?", "جاهز لتحرير قصتك الذاتية بمنهج؟")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "Tamkinly's identity tools — the Identity Gap assessment, daily reflection, and the recode system — turn these practices into a daily, measurable protocol.",
                    "أدوات الهوية في تمكينلي — تقييم فجوة الهوية والتأمل اليومي ونظام إعادة الشيفرة — تحوّل هذه الممارسات إلى بروتوكول يومي قابل للقياس."
                  )}
                </p>
                <Link href="/quiz">
                  <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#1F6F78' }}>
                    {getText("Start with the Free Assessment", "ابدأ بالتقييم المجاني")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <ArticleReferences slug="the-memory-illusion" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="the-memory-illusion" />

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
