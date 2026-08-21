'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Heart, BookOpen, Dumbbell, Droplets, Hammer, Brain, Wind } from "lucide-react";
import { BlogArticleJsonLd } from "@/components/seo/JsonLd";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function RedefiningDisciplineArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  return (
    <>
      <BlogArticleJsonLd
        headline="Redefining Discipline: The Highest Form of Self-Love"
        description="Discipline is not punishment. It is not a cage. It is the highest form of self-love — a sacred contract with your future self. The six pillars of growth and the path from effort to automatic identity."
        slug="redefining-discipline"
        datePublished="2026-05-09"
        dateModified="2026-05-09"
        author="Abdallah Chouaf"
        keywords={["discipline", "self-love", "habits", "identity", "six pillars", "consistency", "growth", "commitment"]}
      />
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Commitment", "الالتزام")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Redefining Discipline: The Highest Form of Self-Love", "إعادة تعريف الانضباط: أعلى أشكال حب الذات")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("10 min read", "١٠ دقائق قراءة")}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {getText("Abdallah Chouaf", "عبدالله الشواف")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">

            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              {getText(
                "Discipline is often misunderstood as a rigid form of self-punishment or a restrictive cage that stifles personal freedom. But the profound reality is that discipline is the highest form of self-love. When you embrace discipline, you are consciously choosing the long-term fulfillment of your future self over the fleeting, hollow impulses of your present self. It is a sacred contract you sign with your potential, promising to protect your dreams from being scattered by the winds of chaos and distraction. Discipline is not deprivation — it is liberation. It frees your spirit from the slavery of whims and enables your mind and body to reach their zenith.",
                "غالباً يُساء فهم الانضباط كشكل صارم من عقاب الذات أو قفص مقيد يخنق الحرية الشخصية. لكن الواقع العميق هو أن الانضباط هو أعلى أشكال حب الذات. عندما تحتضن الانضباط، أنت تختار بوعي الإشباع طويل المدى لذاتك المستقبلية على حساب النزوات العابرة الفارغة لذاتك الحاضرة. إنه عقد مقدس توقعه مع إمكاناتك، تعد فيه بحماية أحلامك من أن تبددها رياح الفوضى والتشتت. الانضباط ليس حرماناً — إنه تحرير. يحرر روحك من عبودية الأهواء ويمكّن عقلك وجسدك من بلوغ ذروتهما."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "We must dismantle the prevailing myth that a disciplined person is someone who lives in constant agony or joyless labor. True discipline is actually a preemptive system designed to prevent the far greater suffering caused by regret, stagnation, and failure. Behavioral science suggests that disciplined individuals experience significantly lower stress levels because their lives are guided by a clear internal structure that minimizes decision fatigue. Discipline does not mean waking up at four in the morning without purpose — it means radically prioritizing the activities that elevate your character every single day and building a psychological fortress that protects your time and energy from being drained by low-value stimuli. The undisciplined life is not freedom — it is chaos wearing the mask of liberty. And the person who confuses chaos with freedom is the one who will spend their life wondering why nothing ever changes.",
                "يجب تفكيك الأسطورة السائدة بأن الشخص المنضبط هو من يعيش في عذاب مستمر أو عمل بلا فرح. الانضباط الحقيقي هو في الواقع نظام استباقي مصمم لمنع المعاناة الأكبر بكثير التي يسببها الندم والركود والفشل. علم السلوك يشير إلى أن الأشخاص المنضبطين يعانون من مستويات توتر أقل بكثير لأن حياتهم موجهة بهيكل داخلي واضح يقلل إرهاق القرار. الانضباط لا يعني الاستيقاظ في الرابعة صباحاً بلا هدف — بل يعني إعطاء أولوية جذرية للأنشطة التي ترفع شخصيتك كل يوم وبناء حصن نفسي يحمي وقتك وطاقتك من أن تستنزفها محفزات منخفضة القيمة. الحياة بلا انضباط ليست حرية — إنها فوضى ترتدي قناع الحرية. والشخص الذي يخلط بين الفوضى والحرية هو من سيقضي حياته يتساءل لماذا لا يتغير شيء أبداً."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "To construct a life that is both disciplined and harmonious, one must focus on foundational pillars that nourish the soul, the intellect, and the physical form in unison. These are not arbitrary rules — they are the load-bearing walls of the architecture of an exceptional life. Remove any one of them and the structure begins to lean. Neglect two and it starts to crack. Ignore three and it collapses entirely.",
                "لبناء حياة منضبطة ومتناغمة في آن واحد، يجب التركيز على أعمدة أساسية تغذي الروح والفكر والجسد معاً. هذه ليست قواعد تعسفية — إنها الجدران الحاملة لعمارة حياة استثنائية. أزل أي واحد منها وتبدأ البنية في الميل. أهمل اثنين وتبدأ في التشقق. تجاهل ثلاثة وتنهار بالكامل."
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Wind className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Prayer", "الصلاة")}</h3>
                  <p className="text-sm text-slate-600">{getText("The spiritual anchor. Daily recalibration that pulls you from noise into meaning and purpose beyond tasks.", "المرساة الروحية. معايرة يومية تخرجك من الضجيج إلى المعنى والغاية الذي يتجاوز المهام.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Meditation", "التأمل")}</h3>
                  <p className="text-sm text-slate-600">{getText("Mental clarity and emotional regulation. The space between stimulus and response where your real power lives.", "الوضوح الذهني والتنظيم العاطفي. المسافة بين المحفز والاستجابة حيث تعيش قوتك الحقيقية.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Reading", "القراءة")}</h3>
                  <p className="text-sm text-slate-600">{getText("Intellectual fuel. Constant updates to your mental software from the world's greatest thinkers.", "الوقود الفكري. تحديثات مستمرة لبرمجياتك الذهنية من أعظم مفكري العالم.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Exercise", "الرياضة")}</h3>
                  <p className="text-sm text-slate-600">{getText("The body that carries your ambitions. Physical discipline forges the will and sends a message to your brain.", "الجسد الذي يحمل طموحاتك. الانضباط الجسدي يصقل الإرادة ويرسل رسالة لدماغك.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Droplets className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Hydration", "الترطيب")}</h3>
                  <p className="text-sm text-slate-600">{getText("The simplest biological discipline. Peak brain and cellular function depend on this foundation.", "أبسط انضباط بيولوجي. أداء الدماغ والخلايا الأمثل يعتمد على هذا الأساس.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Hammer className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Personal Craft", "الحرفة الشخصية")}</h3>
                  <p className="text-sm text-slate-600">{getText("Mastery of a specific skill. The engine that converts abstract discipline into tangible success.", "إتقان مهارة محددة. المحرك الذي يحول الانضباط المجرد إلى نجاح ملموس.")}</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Discipline does not manifest in a vacuum — it is forged in the granular details of your daily routine. The secret lies in designing an environment that nudges you toward these pillars. Place a book on your pillow. Prepare your workout gear the night before. Establish non-negotiable times for prayer and reflection. By doing so, you drastically reduce internal resistance. The daily journey is not a frantic sprint toward a finish line, but a compounding series of small, quiet victories that begin the moment you choose purposeful action over the comfort of the snooze button. Environment is the invisible hand that shapes behavior. When your environment supports discipline, discipline stops being a battle and starts being a default.",
                "الانضباط لا يتجسد في فراغ — يُصقل في تفاصيل روتينك اليومي الدقيقة. السر يكمن في تصميم بيئة تدفعك نحو هذه الأعمدة. ضع كتاباً على وسادتك. حضّر ملابس رياضتك من الليلة. حدد أوقاتاً غير قابلة للتفاوض للصلاة والتأمل. بذلك، تقلل المقاومة الداخلية بشكل جذري. الرحلة اليومية ليست سباقاً محموماً نحو خط النهاية، بل سلسلة متراكمة من الانتصارات الصغيرة الهادئة التي تبدأ في اللحظة التي تختار فيها الفعل الهادف على راحة زر الغفوة. البيئة هي اليد غير المرئية التي تشكل السلوك. عندما تدعم بيئتك الانضباط، يتوقف الانضباط عن كونه معركة ويصبح خياراً افتراضياً."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The true essence of discipline is found not in intensity but in consistency. Sincerity toward your daily methodology is what creates a transformative divergence over time. Executing ten percent of your plan with unwavering regularity is far superior to achieving one hundred percent for a single day followed by burnout. Consistency eventually transforms a chosen behavior into an automatic habit. Once a behavior becomes habitual, the mental effort required to perform it diminishes, and discipline transitions from an external effort to a natural expression of your identity. The person who shows up at sixty percent every day will always outpace the person who shows up at one hundred percent once a month. Not because they try harder — because they try more often.",
                "جوهر الانضباط الحقيقي يكمن ليس في الكثافة بل في الاتساق. الإخلاص لمنهجيتك اليومية هو ما يخلق تباعداً تحويلياً مع الوقت. تنفيذ عشرة بالمائة من خطتك بانتظام لا يتزعزع أفضل بكثير من تحقيق مئة بالمائة ليوم واحد يعقبه احتراق. الاتساق يحوّل في النهاية السلوك المختار إلى عادة تلقائية. بمجرد أن يصبح السلوك عادياً، يتناقص الجهد الذهني المطلوب لأدائه، وينتقل الانضباط من جهد خارجي إلى تعبير طبيعي عن هويتك. الشخص الذي يحضر بنسبة ستين بالمائة كل يوم سيتفوق دائماً على الشخص الذي يحضر بنسبة مئة بالمائة مرة في الشهر. ليس لأنه يحاول بجهد أكبر — بل لأنه يحاول أكثر.",
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText(
                  "Every disciplined act you perform today is a brick in the architecture of your future. A radiant future is not a product of luck — it is the inevitable consequence of years of disciplined decisions.",
                  "كل فعل منضبط تقوم به اليوم هو لبنة في عمارة مستقبلك. المستقبل المشرق ليس نتاج الحظ — بل هو النتيجة الحتمية لسنوات من القرارات المنضبطة."
                )}
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "By adhering to these pillars, you are building a shield that protects you from the volatility of life and the dangers of aimlessness. When you master your days, you eventually master your destiny, turning the impossible into a series of managed milestones. Redefining discipline means seeing it as the bridge that connects your current reality to your absolute potential. It is the connective tissue between dreams and accomplishments. Always remember that discipline is the way you tell yourself that your aspirations are worth the effort, and that your inherent value is too great to be wasted on the pursuit of shallow, fleeting pleasures. Start today with a single pillar. Let the cumulative fruits of your discipline lead you to a life of depth, influence, and fulfillment that you once only dared to imagine.",
                "بالالتزام بهذه الأعمدة، أنت تبني درعاً يحميك من تقلبات الحياة ومخاطر العشوائية. عندما تتحكم في أيامك، تتحكم في النهاية في مصيرك، محولاً المستحيل إلى سلسلة من المعالم المدارة. إعادة تعريف الانضباط تعني رؤيته كجسر يربط واقعك الحالي بإمكاناتك المطلقة. إنه النسيج الضام بين الأحلام والإنجازات. تذكر دائماً أن الانضباط هو طريقتك لتخبر نفسك أن طموحاتك تستحق الجهد، وأن قيمتك الذاتية أكبر من أن تُهدر في مطاردة الملذات السطحية العابرة. ابدأ اليوم بعمود واحد. دع ثمار انضباطك المتراكمة تقودك لحياة من العمق والتأثير والإنجاز لم تجرؤ يوماً إلا على تخيلها."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Heart className="h-5 w-5" />
              <span className="font-semibold">{getText("The Bottom Line", "الخلاصة")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText(
                "Discipline is not the opposite of freedom. It is the prerequisite for it. The undisciplined person is not free — they are a slave to impulse, mood, and circumstance. The disciplined person is the one who has earned the right to choose. Start with one pillar. Show up tomorrow. Then the day after. Watch how the compound effect of small, consistent choices transforms not just what you do, but who you are.",
                "الانضباط ليس نقيض الحرية. إنه شرطها المسبق. الشخص غير المنضبط ليس حراً — هو عبد للنزوة والمزاج والظرف. الشخص المنضبط هو من كسب حق الاختيار. ابدأ بعمود واحد. احضر غداً. ثم اليوم الذي يليه. راقب كيف يحوّل التأثير التراكمي للاختيارات الصغيرة المتسقة ليس فقط ما تفعله، بل من أنت."
              )}
            </p>

          </div>
        </div>
      </section>

      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />


      <ArticleNavigation currentSlug="redefining-discipline" />

      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {getText("Build Your Disciplined Identity", "ابنِ هويتك المنضبطة")}
            </h2>
            <p className="text-slate-300 mb-6">
              {getText("The Identity-Based Habits Worksheet helps you connect discipline to identity — so showing up becomes who you are, not what you force.", "ورقة عمل العادات المبنية على الهوية تساعدك على ربط الانضباط بالهوية — ليصبح الحضور من أنت، لا ما تجبر نفسك عليه.")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/blog/identity-based-habits-worksheet">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  {getText("Start Building Identity-Based Habits", "ابدأ ببناء عادات مبنية على الهوية")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/blog/daily-reflection-practice">
                <Button variant="white" size="lg" className="px-8 font-semibold">
                  {getText("Daily Reflection Practice", "ممارسة التأمل اليومي")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
            <BlogConversionSection />
      </article>
    </>
  );
}

