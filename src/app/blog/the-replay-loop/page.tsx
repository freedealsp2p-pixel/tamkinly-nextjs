'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User } from "lucide-react";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';
import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';
import { BlogArticleJsonLd } from "@/components/seo/JsonLd";

export default function TheReplayLoopArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "the-memory-illusion", title: getText("The Memory Illusion: Why You Are Not Who You Remember Being", "وهم الذاكرة: لست من تتذكّر أنك"), readTime: getText("9 min read", "9 دقائق قراءة") },
    { slug: "vagus-nerve-breathing", title: getText("Vagus Nerve Breathing: The Science of Calming Your Body on Command", "تنفس العصب المبهم (Vagus nerve): علم تهدئة جسدك بقدرتك"), readTime: getText("9 min read", "9 دقائق قراءة") },
    { slug: "rebuild-identity-after-addiction", title: getText("Rebuild Identity After Addiction: Every Vote Builds the New Self", "إعادة بناء الهوية بعد الإدمان: كل صوت يبني الذات الجديدة"), readTime: getText("9 min read", "9 دقائق قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
        headline="The Replay Loop: Why Your Mind Replays What It Cannot Close"
        headlineAr="حلقة الإعادة: لماذا يعيد عقلك تشغيل ما لم يُغلق"
        description="Rumination feels like problem-solving, but it is a screening room: replaying painful events keeps them feeling like yesterday. Learn what two studies found about the replay loop — and the one-retelling exercise that turns reliving into re-authoring."
        slug="the-replay-loop"
        datePublished="2026-11-11"
        dateModified="2026-11-11"
        author="Tamkinly Team"
        keywords={["rumination", "replay loop", "overthinking", "re-authoring", "narrative identity", "memory and identity"]}
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
                {getText("The Replay Loop: Why Your Mind Replays What It Cannot Close", "حلقة الإعادة: لماذا يعيد عقلك تشغيل ما لم يُغلق")}
              </h1>
              <div className="flex items-center gap-6 text-slate-400 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {getText("7 min read", "7 دقائق قراءة")}
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
                  "12:47 a.m. The ceiling has seen this before. A conversation from three years ago starts playing again, full volume, frame by frame. You know every line. You know how it ends. You press play anyway. By the fourth replay your chest is tight, the argument that happened once is now happening on a schedule, and sleep is a rumor.",
                  "الساعة 12:47 فجراً. السقف قد شاهد هذا من قبل. حوار من قبل ثلاث سنوات يبدأ بالتشغيل من جديد، بصوت كامل الصوت، إطاراً بإطار. تعرف كل سطر. تعرف كيف ينتهي. ومع ذلك تضغط زر التشغيل. عند الإعادة الرابعة يكون صدرك مشدوداً، والجدال الذي وقع مرة واحدة يجدول نفسه الآن بمواعيد، والنوم مجرد إشاعة."
                )}
              </p>

              <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
                {getText(
                  "This article is educational and free. It is not a substitute for therapy. And if replaying comes with heavy distress or thoughts of harming yourself, please talk to a licensed professional or a local crisis line tonight — a page is for meaning, not for emergencies.",
                  "هذا المقال تثقيفي ومجاني، ولا يغني عن العلاج. وإذا صاحب الإعادة ضيقٌ ثقيل أو أفكار عن إيذاء نفسك، فتحدث الليلة إلى مختص مرخّص أو خط أزمة محلي — فالصفحة للمعنى، لا للطوارئ."
                )}
              </div>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The Loop That Feels Like Work", "الحلقة التي تبدو وكأنها عمل")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Call it the replay loop. It arrives dressed as problem-solving. You are going to think it through one more time, find the line you should have said, and be free. It never works that way. Psychologists have a name for the habit: rumination. They describe it precisely: reasoning that runs in circles, repeats itself, and rarely strays from negative ground. Reflection moves a problem forward. The replay loop holds it in place, polished, ready for tonight's screening. The difference matters more than it looks, because one of them is thinking about your life and the other is just aging inside it. And the aging compounds. Every night you run the tape, the memory gets one more coat of importance, one more reason to feel like current events instead of history.",
                  "سمِّها حلقة الإعادة. تأتي متنكّرة في زي حلّ المشكلات. ستُقول: سأفكر فيها مرة أخيرة فقط، سأجد الجملة التي كان ينبغي أن أقولها، ثم أتحرر. لكن الأمر لا يعمل هكذا أبداً. لعلماء النفس اسم لهذه العادة: الاجترار. ويصفونها بدقة: استدلال يدور في حلقات، يكرر نفسه، ونادراً ما يبتعد عن الأرض السالبة. التأمل يُحرّك المشكلة إلى الأمام. أما حلقة الإعادة فتُبقيها في مكانها، مصقولة، جاهزة لعرض هذه الليلة. والفرق أهم مما يبدو، لأن أحدهما يفكّر في حياته، والآخر يشيخ داخلها فحسب. وهذه الشيخوخة تتراكم. كل ليلة تُشغّل فيها الشريط، تأخذ الذكرى طبقة إضافية من الأهمية، وسبباً إضافياً لتشبه أحداث اليوم بدل أن تكون تاريخاً."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Why \u201CJust Stop Thinking About It\u201D Fails", "لماذا تفشل نصيحة «فقط توقف عن التفكير فيها»")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "The common advice is to drop the thought. Replace it, distract it, snap out of it. That advice fails for a simple reason: the loop recruits your best quality. It feels like effort. It feels like caring, like finally doing something about the past. A mind built to solve things will keep feeding a machine that produces nothing. Every replay costs the same and pays the same: nothing. Distraction holds for an hour. Then the screening resumes, same theater, same seat.",
                  "النصيحة الشائعة: اترك الفكرة. استبدلها، شتّت انتباهك، تخلص منها. وتفشل تلك النصيحة لسبب بسيط: الحلقة تُجنّد أفضل ما فيك. فهي تبدو كجهد. تبدو كاهتمام، وكأنك تُجري أخيراً شيئاً حيال الماضي. والعقل الذي بُني ليحلّ المشكلات سيواصل إطعام آلة لا تُنتج شيئاً. كل إعادة تُكلف الشيء نفسه وتُؤدي الشيء نفسه: لا شيء. التشتت يصمد ساعة. ثم يُستأنف العرض، المسرح نفسه، والمقعد نفسه."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("What the Studies Found", "ما وجدته الدراسات")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Two studies explain what the loop is actually doing. The first measured time. People ruminated about real events: anger, guilt, and sadness from the past year. Three experiments pointed the same direction. The more they ruminated, the more recent those events felt, as if they happened \u201Cjust yesterday.\u201D That result held even after accounting for when the event actually occurred and how intense it was. For guilt memories, the link ran through vividness: the more vivid the replay, the closer the event felt. Angry rumination also traveled with a pull to re-approach the provocation. In plain terms, replaying keeps the wound near, and near wounds stay open. The calendar says years have passed. The mind, fed nightly on detail, says last week.",
                  "دراستان تشرحان ما تصنعه الحلقة فعلاً. الأولى قاست الزمن. اجترار الناس لأحداث حقيقية: غضب وذنب وحزن من العام الماضي. وثلاث تجارب أشارت في الاتجاه نفسه. كلما ازداد الاجترار، شعر صاحبه بأن الحدث أحدث، كأنه وقع «أمس فقط». وصدت تلك النتيجة حتى بعد ضبط تاريخ وقوع الحدث فعلياً وشدّته. وفي ذكريات الذنب، مرّ الارتباط عبر الحيوية: كلما كانت الإعادة أكثر حيوية، بدا الحدث أقرب. كما صاحب الاجترار الغاضب ميلٌ إلى الاقتراب من الاستفزاز من جديد. وبعبارة مباشرة: الإعادة تُبقي الجرح قريباً، والجروح القريبة تبقى مفتوحة. التقويم يقول: مرت سنوات. والعقل، الذي يُطعَّم كل ليلة بالتفاصيل، يقول: الأسبوع الماضي."
                )}
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "The second study listened to how people tell their own stories. Ninety-four students narrated painful memories: disappointing themselves, harming someone, or being rejected. The researchers looked for innovative moments, the parts of a story that say what changed since. Reflectors were full of them. In ruminators' stories they were scarce. The scores followed the story too: more innovative moments predicted lower depression and anxiety, and heavier self-argument predicted higher. Notably, narrating lifted mood in both groups. Telling the story helps. How the story is told decides what it does next.",
                  "أما الدراسة الثانية فاستمعت إلى كيفية سرد الناس لقصصهم. أربعة وتسعون طالباً رووا ذكريات مؤلمة: خيبة أمل في النفس، أو إيذاء شخص، أو رفض. وبحث الباحثون عن «لحظات مبتكرة»، وهي أجزاء القصة التي تقول ما الذي تغيّر منذ ذلك الحين. كان الرواة المتمركزون حول الحلول غنيين بها. أما في قصص الاجترار فكانت شحيحة. وتبعت الدرجات القصة أيضاً: لحظات مبتكرة أكثر تنبأت باكتئاب وقلق أقل، وجدال ذاتي أثقل تنبأ بزيادتهما. ومن الملاحظ أن السرد رفع المزاج في المجموعتين. سرد القصة يُفيد. أما كيفية سردها فهي التي تحدد ما سيفعله السرد بعد ذلك."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("From Reliving to Re-Authoring", "من إعادة العيش إلى إعادة التأليف")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "So the goal is not a silent mind. The goal is a story that moves. Reliving adds vividness, and vividness pulls the past closer. Re-authoring adds something else: a sentence about change. When a story gains even one line about what is different now, it stops being a room you live in and becomes a road you have walked. Change-lines are rarely dramatic. A fear that shrank. A door that closed and led somewhere better. An old decision you finally understand instead of resent. That is the distinction the research keeps drawing. Same memory. Same facts. One version holds you at the scene. The other lets the scene recede.",
                  "لذا فالهدف ليس عقلاً صامتاً. الهدف قصة تتحرك. إعادة العيش تزيد الحيوية، والحيوية تجذب الماضي إلى الأقرب. أما إعادة التأليف فتضيف شيئاً آخر: جملة عن التغيّر. حين تكسب القصة سطراً واحداً على الأقل عمّا اختلف الآن، تتوقف عن كونها غرفة تسكنها وتصير طريقاً سلكته. سطور التغيّر نادراً ما تكون درامية. خوف تقلّص. باب أُغلق ليقود إلى مكان أفضل. قرار قديم تفهمه أخيراً بدل أن تحقد عليه. هذا هو التمييز الذي تواصل الدراسات رسمه. الذاكرة نفسها. الوقائع نفسها. نسخة تُبقيك في مسرح الحدث. ونسخة تدع المشهد يبتعد."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("The One-Retelling Exercise", "تمرين السرد الواحد")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Tonight, once, in writing: tell the memory that replays most. Keep it short, half a page. Then add one sentence that starts with \u201Csince then\u201D. Since then, you learned something, left something, became someone slightly different. If nothing feels changed, write the change you are asking from the coming year. That single line is an innovative moment, the exact feature the studies found in reflectors and missed in ruminators. Do not retell it ten times. One retelling with a change-line beats ten screenings. Close the notebook. The loop will knock tomorrow night. You now know what it is selling: closeness dressed as progress.",
                  "الليلة، مرة واحدة، كتابةً: روِ الذكرى التي تُعاد أكثر من غيرها. اجعلها قصيرة، نصف صفحة. ثم أضف جملة واحدة تبدأ بـ«منذ ذلك الحين». منذ ذلك الحين، تعلمت شيئاً، أو تركت شيئاً، أو صرت شخصاً مختلفاً قليلاً. وإذا لم يبدُ شيئٌ قد تغيّر، فاكتب التغيّر الذي تطلبه من العام القادم. ذلك السطر الواحد هو لحظة مبتكرة، وهي بالضبط السمة التي وجدتها الدراسات عند المتمركزين حول الحلول وفقدتها حلقات الاجترار. لا تُعد السرد عشر مرات. سردٌ واحد مع سطر تغيّر يتفوق على عشرة عروض. أغلق الدفتر. ستطرق الحلقة بابك ليلة الغد. وأنت الآن تعرف ما تبيعه: قرباً متنكراً في زي تقدّم."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("What This Cannot Do", "ما لا تستطيع هذه الصفحة فعله")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "Nothing here promises healing. The studies show relationships, and prediction is not causation: a vivid replay can feel close because it is vivid, or grow vivid because it feels close. The storyteller study measured students, not whole lives. And a replay loop does not die because one page was written. Some nights it wins anyway. That is not failure, it is frequency. Loops weaken by count, the way any habit does, and a rough night is one data point in a longer series.",
                  "لا شيء هنا يعدك بالشفاء. الدراسات تُظهر علاقات، والتنبؤ ليس سببية: الإعادة الحيوية قد تبدو قريبة لأنها حيوية، أو تزداد حيوية لأنها تبدو قريبة. ودراسة السرداء قاست طلاباً، لا حياة كاملة. كما أن حلقة الإعادة لا تموت لأن صفحة كُتبت. بعض الليالي ستكسب هي. ذلك ليس فشلاً، إنه تكرار. الحلقات تضعف بالعدّ، كما تضعف أي عادة، والليلة الصعبة نقطة بيانات واحدة في سلسلة أطول."
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText("Same Ceiling, New Pen", "السقف نفسه، قلم جديد")}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  "12:47 a.m. The ceiling is familiar. The conversation starts, the one from three years ago. Tonight it gets to play once, in ink, half a page, and then it has to earn its airtime by answering one question: since then, what changed? If the answer is nothing yet, the coming year just received its assignment. The memory keeps its date. The wound keeps its history. But the screening room is yours, the pen is in your hand, and \u201Cjust yesterday\u201D only stays true if the story never moves.",
                  "الساعة 12:47 فجراً. السقف مألوف. يبدأ الحوار، ذاك الذي من قبل ثلاث سنوات. الليلة يُسمح له بالعرض مرة واحدة، بحبر، في نصف صفحة، ثم عليه أن يستحق وقت العرض بالإجابة عن سؤال واحد: منذ ذلك الحين، ما الذي تغيّر؟ إذا كان الجواب لا شيء بعد، فقد تلقى العام القادم مهمته للتو. الذكرى تحتفظ بتاريخها. الجرح يحتفظ بتاريخه. لكن قاعة العرض ملكك، والقلم في يدك، و«أمس فقط» تبقى صادقة فقط إذا بقيت القصة بلا حركة."
                )}
              </p>

              {/* Free Journey CTA */}
              <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                  {getText("Ready to turn replays into a story that moves?", "جاهز لتحويل الإعادات إلى قصة تتحرك؟")}
                </h3>
                <p className="text-slate-600 mb-4">
                  {getText(
                    "Tamkinly's identity tools — the Identity Gap assessment, daily reflection, and the recode system — turn practices like the one-retelling exercise into a daily, measurable protocol.",
                    "أدوات الهوية في تمكينلي — تقييم فجوة الهوية والتأمل اليومي ونظام إعادة الشيفرة — تحوّل ممارسات مثل تمرين السرد الواحد إلى بروتوكول يومي قابل للقياس."
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
        <ArticleReferences slug="the-replay-loop" />

        <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
        <BlogArticleCTA ctaType="recode" />

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
