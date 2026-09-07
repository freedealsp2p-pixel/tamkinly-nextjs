'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Brain, Zap, RefreshCw, Smartphone, Coffee } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function DopamineResetArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "ten-minute-block-system", title: getText("The 10-Minute Block System", "نظام الكتل العشر دقائق"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "physics-of-momentum", title: getText("The Physics of Momentum", "فيزياء الزخم"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "work-on-yourself", title: getText("Work on Yourself: Psycho-Cybernetics", "اعمل على نفسك: سايبرانيكس النفسية"), readTime: getText("10 min read", "١٠ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Mental Clarity", "الوضوح الذهني")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The 24-Hour Dopamine Reset: Reclaiming Your Focus", "إعادة ضبط الدوبامين في ٢٤ ساعة: استعد تركيزك")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("12 min read", "١٢ دقيقة قراءة")}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {getText("Tamkinly Team", "فريق تمكنلي")}
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
                "This is more important than your goals. It explains why simple tasks feel overwhelming, why you scroll for hours and still feel empty, why motivation feels impossible to sustain.",
                "هذا أهم من أهدافك. يفسر لماذا تبدو المهام البسيطة ساحقة، لماذا تتصفح لساعات وما زلت تشعر بالفراغ، لماذا يبدو التحفيز مستحيلاً للاستمرار."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Here's the amazing part: you can reset your dopamine in just 24 hours. Not in 30 days. Not in 90 days. In one day.",
                "إليك الجزء المذهل: يمكنك إعادة ضبط الدوبامين لديك في ٢٤ ساعة فقط. ليس في ٣٠ يوماً. ليس في ٩٠ يوماً. في يوم واحد."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Understanding Dopamine", "فهم الدوبامين")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Dopamine isn't happiness—it's motivation. It's the chemical that says \"go get that, do that again.\" This is crucial to understand.",
                "الدوبامين ليس السعادة — إنه التحفيز. إنه المادة الكيميائية التي تقول \"اذهب واحصل على ذلك، افعل ذلك مرة أخرى.\" هذا أمر حاسم لفهمه."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The problem? Your brain wasn't designed for infinite scrolling of 10-second videos. For fast food. For constant notifications. For endless stimulation.",
                "المشكلة؟ دماغك لم يُصمم للتصفح اللانهائي لفيديوهات الـ ١٠ ثوانٍ. للوجبات السريعة. للإشعارات المستمرة. للتحفيز الذي لا ينتهي."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Your brain evolved for effort, challenge, and delayed reward.",
                "دماغك تطور للمجهود والتحدي والمكافأة المؤجلة."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"Imagine this: you wake up, check your phone, scroll, watch short videos, eat a sugar-filled breakfast, drink caffeine, open 12 tabs, switch between apps. This isn't natural stimulation—it's a dopamine explosion.\"",
                  "\"تخيل هذا: تستيقظ، تتحقق من هاتفك، تتصفح، تشاهد فيديوهات قصيرة، تتناول فطوراً مليئاً بالسكر، تشرب الكافيين، تفتح ١٢ تبويباً، تتنقل بين التطبيقات. هذا ليس تحفيزاً طبيعياً — إنه انفجار دوبامين.\""
                )}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Overstimulation Problem", "مشكلة التحفيز المفرط")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When dopamine spikes repeatedly, your brain protects itself by downregulating—reducing sensitivity. The things that used to excite you no longer do.",
                "عندما يرتفع الدوبامين مراراً، يحمي دماغك نفسه بالتقليل — يخفض الحساسية. الأشياء التي كانت تثيرك لم تعد تفعل ذلك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This is why work feels boring. Why studying feels painful. Why the gym feels heavy. Why goals feel meaningless. Your brain is simply oversaturated with stimulation.",
                "لهذا يبدو العمل مملّاً. لماذا تبدو الدراسة مؤلمة. لماذا يبدو النادي ثقيلاً. لماذا تبدو الأهداف بلا معنى. دماغك ببساطة مشبع بالتحفيز."
              )}
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Smartphone className="h-5 w-5 text-[#1F6F78]" />
                    <h3 className="font-semibold text-primary">{getText("High Dopamine Triggers", "محفزات الدوبامين العالية")}</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>{getText("• Social media scrolling", "• تصفح وسائل التواصل الاجتماعي")}</li>
                    <li>{getText("• Short-form videos", "• الفيديوهات القصيرة")}</li>
                    <li>{getText("• Sugar and processed foods", "• السكر والأطعمة المصنعة")}</li>
                    <li>{getText("• Constant notifications", "• الإشعارات المستمرة")}</li>
                    <li>{getText("• Video games", "• ألعاب الفيديو")}</li>
                    <li>{getText("• Pornography", "• المحتوى الإباحي")}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Coffee className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">{getText("Low Dopamine Activities", "أنشطة الدوبامين المنخفضة")}</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>{getText("• Walking in nature", "• المشي في الطبيعة")}</li>
                    <li>{getText("• Reading books", "• قراءة الكتب")}</li>
                    <li>{getText("• Journaling", "• كتابة اليوميات")}</li>
                    <li>{getText("• Deep conversation", "• المحادثة العميقة")}</li>
                    <li>{getText("• Meditation", "• التأمل")}</li>
                    <li>{getText("• Creative work", "• العمل الإبداعي")}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Good News: Your Brain Adapts", "الأخبار الجيدة: دماغك يتكيف")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The remarkable thing about your brain is its neuroplasticity. It can rewire itself. The 24-hour reset leverages this adaptability to restore your natural motivation system.",
                "الشيء الملفت في دماغك هو مرونته العصبية. يمكنه إعادة تشكيل نفسه. إعادة الضبط بـ ٢٤ ساعة تستغل هذه القدرة على التكيف لاستعادة نظام التحفيز الطبيعي لديك."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Step 1: Remove High-Dopamine Triggers (The Purge)", "الخطوة ١: أزل محفزات الدوبامين العالية (التطهير)")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "For the next 24 hours, give your brain true silence. Not just a quiet room—internal quiet. This means:",
                "خلال الـ ٢٤ ساعة القادمة، امنح دماغك صمتاً حقيقياً. ليس مجرد غرفة هادئة — صمت داخلي. هذا يعني:"
              )}
            </p>

            <ul className="space-y-2 text-slate-600 my-6">
              <li>{getText("• No social media", "• لا وسائل تواصل اجتماعي")}</li>
              <li>{getText("• No short-form videos", "• لا فيديوهات قصيرة")}</li>
              <li>{getText("• No infinite scrolling", "• لا تصفح لانهائي")}</li>
              <li>{getText("• No fast food or sugar spikes", "• لا وجبات سريعة أو ارتفاعات سكر")}</li>
              <li>{getText("• No gaming marathons", "• لا ماراثونات ألعاب")}</li>
              <li>{getText("• No constant music in your ears", "• لا موسيقى مستمرة في أذنيك")}</li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Before you panic: you're not quitting forever. You're not deleting apps. You're not becoming a monk. You're simply hitting the restart button.",
                "قبل أن تصاب بالذعر: أنت لا تتوقف للأبد. أنت لا تحذف التطبيقات. أنت لا تصبح راهباً. أنت ببساطة تضغط على زر إعادة التشغيل."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("What to Expect", "ماذا تتوقع")}</h3>
              <p className="text-slate-600 mb-4">
                {getText(
                  "Initially, your brain will rebel. You'll reach for your phone without thinking. You'll feel a strange emptiness. Maybe irritability or restlessness.",
                  "في البداية، سيتمرد دماغك. ستصل إلى هاتفك دون تفكير. ستشعر بفراغ غريب. ربما انفعال أو تململ."
                )}
              </p>
              <p className="text-slate-600">
                {getText(
                  "This isn't failure—these are withdrawal symptoms from overstimulation. Your brain has become so accustomed to maximum input that silence feels wrong.",
                  "هذا ليس فشلاً — هذه أعراض انسحاب من التحفيز المفرط. دماغك اعتاد كثيراً على أقصى مدخلات حتى أن الصمت يبدو خاطئاً."
                )}
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Stay with the discomfort. Behind it lies clarity, focus, and natural energy.",
                "ابقَ مع عدم الراحة. خلفها تكمن الوضوح والتركيز والطاقة الطبيعية."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Step 2: Replace with Low-Dopamine Activities", "الخطوة ٢: استبدل بأنشطة الدوبامين المنخفضة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Here's where most people fail: they remove stimulation but don't replace it. They sit in a vacuum, feel bored and empty, and conclude it doesn't work.",
                "هنا يفشل معظم الناس: يزيلون التحفيز لكنهم لا يستبدلونه. يجلسون في فراغ، يشعرون بالملل والفراغ، ويستنتجون أنها لا تعمل."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "But a reset isn't about sitting in emptiness—it's about replacing intense stimulation with gentle nourishment:",
                "لكن إعادة الضبط ليست عن الجلوس في الفراغ — بل عن استبدال التحفيز الشديد بالتغذية اللطيفة:"
              )}
            </p>

            <ul className="space-y-3 text-slate-600 my-6">
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{getText("<strong>Walk outside.</strong> No scrolling, no consuming. Just feel the air, your breath, the environment.", "<strong>امشِ في الخارج.</strong> لا تصفح، لا استهلاك. فقط اشعر بالهواء، أنفاسك، البيئة.")}</span>
              </li>
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{getText("<strong>Read a book.</strong> A few pages. Let your mind focus on one simple thing.", "<strong>اقرأ كتاباً.</strong> بضع صفحات. دع عقلك يركز على شيء بسيط واحد.")}</span>
              </li>
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{getText("<strong>Write in a journal.</strong> Empty your thoughts onto paper. Plan. Dream.", "<strong>اكتب في يومياتك.</strong> افرغ أفكارك على الورق. خطط. حلُم.")}</span>
              </li>
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{getText("<strong>Tidy your space.</strong> There's power in organizing your physical environment while resetting your mental one.", "<strong>رتّب مساحتك.</strong> هناك قوة في تنظيم بيئتك المادية أثناء إعادة ضبط بيئتك الذهنية.")}</span>
              </li>
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{getText("<strong>Exercise lightly.</strong> Stretch. Move your body.", "<strong>مارس الرياضة بخفة.</strong> مُدّ عضلاتك. حرّك جسدك.")}</span>
              </li>
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span>{getText("<strong>Have a real conversation.</strong> Deep and present, not quick texts.", "<strong>أجرِ محادثة حقيقية.</strong> عميقة وحاضرة، لا رسائل سريعة.")}</span>
              </li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "These activities don't cause excitement spikes—they awaken your mind gently. After hours, your brain starts to change its expectations. Walking becomes relaxing. Reading becomes engaging. Your clean room becomes satisfying.",
                "هذه الأنشطة لا تسبب ارتفاعات الإثارة — بل توقظ عقلك بلطف. بعد ساعات، يبدأ دماغك بتغيير توقعاته. المشي يصبح مريحاً. القراءة تصبح مشوقة. غرفتك النظيفة تصبح مرضية."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Step 3: Delay Gratification (The Reward)", "الخطوة ٣: أجّل الإشباع (المكافأة)")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This is the most powerful part. During these hours, you're retraining your reward system.",
                "هذا هو الجزء الأقوى. خلال هذه الساعات، أنت تعيد تدريب نظام المكافأة لديك."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Most people live backwards: they wake up and immediately consume. Phone first. Entertainment first. Comfort first. Work comes later—if at all.",
                "معظم الناس يعيشون بشكل معكوس: يستيقظون ويستهلكون فوراً. الهاتف أولاً. الترفيه أولاً. الراحة أولاً. العمل يأتي لاحقاً — إن أتى."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This pattern destroys motivation. When your brain gets the reward before the effort, it stops valuing the effort.",
                "هذا النمط يدمر التحفيز. عندما يحصل دماغك على المكافأة قبل المجهود، يتوقف عن تقدير المجهود."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "\"On your reset day, reverse the order: do the hard things first. Before entertainment. Before comfort. Before easy pleasure. This sends a powerful signal to your brain: effort comes before reward.\"",
                  "\"في يوم إعادة الضبط، اعكس الترتيب: افعل الأشياء الصعبة أولاً. قبل الترفيه. قبل الراحة. قبل المتعة السهلة. هذا يرسل إشارة قوية لدماغك: المجهود يأتي قبل المكافأة.\""
                )}
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "If you have work, start before touching your phone. If you want to exercise, move your body before relaxing. Your brain will adapt quickly—dopamine will start linking to achievement instead of distraction.",
                "إذا كان لديك عمل، ابدأ قبل لمس هاتفك. إذا كنت تريد ممارسة الرياضة، حرّك جسدك قبل الاسترخاء. سيتكيف دماغك بسرعة — سيربط الدوبامين بالإنجاز بدلاً من الإلهاء."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "You're teaching your brain that rewards must be earned. Focus first. Then fun. Once your brain learns this pattern again, motivation becomes natural and automatic.",
                "أنت تعلّم دماغك أن المكافآت يجب أن تُكتسب. التركيز أولاً. ثم المتعة. بمجرد أن يتعلم دماغك هذا النمط مرة أخرى، يصبح التحفيز طبيعياً وتلقائياً."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Transformation", "التحول")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "By the end of 24 hours, something shifts. You won't feel transformed overnight—but you'll notice:",
                "بنهاية ٢٤ ساعة، شيء يتغير. لن تشعر بالتحول بين ليلة وضحاها — لكنك ستلاحظ:"
              )}
            </p>

            <ul className="space-y-2 text-slate-600 my-6">
              <li>{getText("• Your mind is clearer", "• عقلك أوضح")}</li>
              <li>{getText("• Simple tasks feel less overwhelming", "• المهام البسيطة تبدو أقل إرهاقاً")}</li>
              <li>{getText("• You're more present", "• أنت أكثر حضوراً")}</li>
              <li>{getText("• Natural motivation is returning", "• التحفيز الطبيعي يعود")}</li>
              <li>{getText("• You can focus longer", "• يمكنك التركيز لفترة أطول")}</li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This isn't magic. It's biology. You've allowed your dopamine system to recalibrate. You've broken the cycle of constant stimulation that was keeping you stuck.",
                "هذا ليس سحراً. إنه علم الأحياء. لقد سمحت لنظام الدوبامين لديك بإعادة المعايرة. لقد كسرت دورة التحفيز المستمر التي كانت تبقيك عالقاً."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <RefreshCw className="h-5 w-5" />
              <span className="font-semibold">{getText("The Key Insight", "الفكرة الأساسية")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "You don't need more motivation. You don't need more discipline. You need to reset the system that creates motivation naturally. One day of intentional recalibration can restore what months of overstimulation has dulled. Your brain is ready to return to its natural state. Give it the chance.",
                "أنت لا تحتاج إلى مزيد من التحفيز. أنت لا تحتاج إلى مزيد من الانضباط. أنت بحاجة إلى إعادة ضبط النظام الذي يخلق التحفيز بشكل طبيعي. يوم واحد من إعادة المعايرة المقصودة يمكن أن يستعيد ما أخمده شهور التحفيز المفرط. دماغك مستعد للعودة إلى حالته الطبيعية. امنحه الفرصة."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleReferences slug="dopamine-reset" />

      <MidArticleUpgrade promoteTier="BASIC" variant="minimal" />
      <BlogArticleCTA ctaType="daily" />

      <ArticleNavigation currentSlug="dopamine-reset" />

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
  );
}

