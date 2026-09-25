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

export default function SeparatingSelfFromShameArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "rebuild-identity-after-addiction", title: getText("Rebuild Identity After Addiction: Every Vote Builds the New Self", "إعادة بناء الهوية بعد الإدمان: كل صوت يبني الذات الجديدة"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "relapse-is-data", title: getText("Relapse Is Data: What the Slip Was Trying to Tell You", "الانتكاس معلومات: ماذا أرادت الزلة أن تقول لك"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "porn-recovery-roadmap", title: getText("The Complete Porn Recovery Roadmap: 5 Stages That Actually Work", "خارطة التعافي من الإباحية: خمس مراحل فعّالة فعلاً"), readTime: getText("12 min read", "١٢ دقيقة قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="Separating Yourself from Shame: You Are Not Your Shadow"
        headlineAr="فصل الذات عن الخجل: أنت لست ظلّك"
        description="Shame says the behavior is you — it is not. Learn the difference between shame and guilt, why shame drives the compulsion it punishes, and three practices that dissolve it."
        slug="separating-self-from-shame"
        datePublished="2026-09-25"
        dateModified="2026-09-25"
        author="Tamkinly Team"
        keywords={["shame and addiction", "shame vs guilt", "self compassion recovery", "shame recovery", "toxic shame"]}
        image="/uploads/articles/separating-self-from-shame.webp"
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
                {getText("Separating Yourself from Shame: You Are Not Your Shadow", "فصل الذات عن الخجل: أنت لست ظلّك")}
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
                  "After a slip, two voices speak. One says: what you did was against your values — a behavior worth examining. The other says: you are disgusting, broken, beyond repair. The first voice is guilt, and guilt can be useful; it points at an action. The second is shame, and shame points at you — at your entire self — and declares it worthless. Recovery requires learning to hear the difference, because shame does not prevent relapse. Shame organizes it.",
                  "بعد الزلة يتكلم صوتان. الأول يقول: ما فعلته يخالف قيمك — سلوك يستحق المراجعة. والثاني يقول: أنت مقزز، تالف، خارج نطاق الإصلاح. الصوت الأول هو الذنب، والذنب نافع؛ فهو يشير إلى فعل. والثاني هو الخجل، والخجل يشير إليك — إلى ذاتك كلها — ويحكم عليها بالعبثية. يحتاج التعافي إلى تعلّم التمييز بينهما، لأن الخجل لا يمنع الانتكاس. الخجل ينظمه ويدبّره."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This guide is educational and free. It is not a replacement for professional care. If shame feels overwhelming or connected to past trauma, a therapist can help you carry it safely.",
                  "هذا الدليل تثقيفي ومجاني، ولا يغني عن الرعاية المتخصصة. إذا بدا الخجل خانقاً أو متصلاً بصدمة سابقة، فالمعالج يستطيع مساعدتك على حمله بأمان."
                )}
              </div>

              <ArticleFigure
                src="/uploads/articles/separating-self-from-shame.webp"
                width={1376}
                height={768}
                alt={{
                  en: "Figure stepping out of a heavy shadow left behind on the wall, walking toward light",
                  ar: "شخصية تخرج من ظل ثقيل تركته على الجدار وتمشي نحو الضوء",
                }}
                title={{
                  en: "You Are Not Your Shadow",
                  ar: "لست ظلّك",
                }}
                caption={{
                  en: "Shame hides; connection and self-compassion dissolve it.",
                  ar: "الخجل يختبئ؛ والارتباط والتعاطف مع الذات يذيبانه.",
                }}
              />

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Why Shame Fuels What It Condemns", "لماذا يغذّي الخجل ما يدينه")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "The research on shame and addictive behavior points to a cruel loop. Shame is one of the most physically unbearable emotions — it is experienced as social death, a wish to disappear. A behavior that reliably numbs unbearable feeling therefore becomes the most available shelter from shame itself. That is why the sentence I hate myself for doing this so I need to do it to stop feeling the hate is not a paradox; it is the exact machinery of the cycle. Shame also demands secrecy, and secrecy removes the accountability and connection that recovery depends on. Condemning yourself is not discipline. It is fuel.",
                  "تشير أبحاث الخجل والسلوك الإدماني إلى حلقة قاسية. الخجل من أقسى المشاعر جسدياً — يُعاش كموت اجتماعي، ورغبة في الاختفاء. ولذلك يصبح السلوك الذي يُخدّر الإحساس الذي لا يُحتمل أدفأ ملاجئ من الخجل نفسه. لهذا ليست جملة «أكره نفسي لأنني فعلت، فيلزمني أن أفعل لأتوقف عن الشعور بالكراهية» مفارقة؛ إنها بالضبط آلية الحلقة. والخجل يطالب بالسرّية أيضاً، والسرّية تنزع المساءلة والارتباط اللذين يقوم عليهما التعافي. جلد الذات ليس صرامة. إنه وقود."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Practice One: Name It in Two Sentences", "الممارسة الأولى: سمِّه في جملتين")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Shame survives in silence and vagueness; it dissolves in precise language. When the spiral starts, write two sentences only. The first: what I did — concrete, factual, no adjectives. The second: what that says about my worth — and then strike it out, because behavior does not adjudicate worth. This tiny exercise forces the separation the title promises: the act goes in one column, the self in another. Research on shame suggests that labeling the emotion by name alone reduces its intensity, and you will feel that the moment the sentence leaves your pen.",
                  "الخجل يعيش في الصمت والغموض؛ ويذوب في اللغة الدقيقة. حين تبدأ الدوامة، اكتب جملتين فقط. الأولى: ما فعلته — ملموساً، واقعياً، بلا صفات. والثانية: ماذا يقول ذلك عن قيمتي — ثم شطبها، لأن السلوك لا يفصل في قيمة الإنسان. هذا التمرين الصغير يفرض الفصل الذي يَعِد به العنوان: الفعل في عمود، والذات في عمود آخر. وتوحي أبحاث الخجل أن تسمية الشعور باسمه وحدها تخفض شدته، وستلمس ذلك في اللحظة التي تخرج فيها الجملة من قلمك."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Practice Two: Speak to Yourself as You Would to a Friend", "الممارسة الثانية: خاطب نفسك كما تخاطب صديقاً")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Self-compassion is not letting yourself off the hook — it is changing the tone of the conversation while keeping the accountability. The test is simple: if your best friend told you he had done what you did, would you call him disgusting and tell him there is no point trying? You would not. You would say something honest and kind: this was against your values, you can learn from it, one slip is not a life sentence. Say those words to yourself, in the second person, out loud if you can. Studies on self-compassion in recovery show it predicts longer stretches between relapses — harsh self-criticism predicts shorter ones.",
                  "التعاطف مع الذات ليس تنازلاً عن المسؤولية — إنه تغيير نبرة الحوار مع الإبقاء على المساءلة. الاختبار بسيط: لو أخبرك صديقك الأقرب أنه فعل ما فعلت، هل ستسميه مقززاً وتقول له لا معنى للمحاولة؟ لن تفعل. ستقول شيئاً صادقاً ولطيفاً: هذا يخالف قيمك، يمكنك التعلم منه، زلة واحدة ليست حكماً على العمر. قل تلك الكلمات لنفسك، بصيغة المخاطب، وبصوت مسموع إن استطعت. وتظهر دراسات التعاطف مع الذات في التعافي أنه يتنبأ بفترات أطول بين الانتكاسات — بينما يتنبأ الجلد الذاتي القاسي بفترات أقصر."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Practice Three: One True Sentence to One Safe Person", "الممارسة الثالثة: جملة صادقة واحدة لشخص آمن واحد")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Shame's power doubles in isolation and halves the moment it is spoken to someone safe. You do not need a confession scene; you need one true sentence: I have been struggling with this, and I am working on it. Choose carefully — someone whose first response will be respect, not horror. Notice what happens in your body afterward: the tightness usually drops, because hiding is heavy labor and the body pays for it. Connection is not a bonus feature of recovery; it is the antidote itself. What is spoken to another person becomes survivable, and what becomes survivable stops running your life from the dark.",
                  "قوة الخجل تتضاعف في العزلة وتنصف لحظة نطقها لشخص آمن. لا تحتاج مشهداً اعترافياً؛ تحتاج جملة صادقة واحدة: أنا أعاني من هذا، وأنا أعمل عليه. اختر بعناية — شخصاً تكون استجابته الأولى الاحترام لا الرعب. لاحظ ما يحدث في جسدك بعدها: التوتر يهبط عادة، لأن التخفي شاقّة يدفع الجسد ثمنها. الارتباط ليس ميزة إضافية في التعافي؛ إنه الترياق نفسه. ما يُنطق لشخص آخر يصبح قابلاً للنجاة، وما يصبح قابلاً للنجاة يتوقف عن إدارة حياتك من الظلام."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Working on shame as part of recovery?", "تعمل على الخجل كجزء من تعافيك؟")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "The shame recovery track inside Tamkinly's free recovery journeys walks you through these three practices with guided exercises — private, at your pace.",
                    "مسار التعافي من الخجل داخل رحلات تمكينلي المجانية يمشي معك هذه الممارسات الثلاث بتمارين موجَّهة — بخصوصية وسرعتك أنت."
                  )}
                </p>
                <Link href="/recovery/porn-recovery">
                  <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#1F6F78' }}>
                    {getText("Start the Free Journey", "ابدأ الرحلة المجانية")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* References */}
        <ArticleReferences slug="separating-self-from-shame" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

        <ArticleNavigation currentSlug="separating-self-from-shame" />

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
