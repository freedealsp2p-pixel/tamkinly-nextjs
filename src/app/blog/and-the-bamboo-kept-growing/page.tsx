'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, TreePine, Eye, Timer, TrendingUp, Shield, Layers } from "lucide-react";
import { BlogArticleJsonLd } from "@/components/seo/JsonLd";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

export default function AndTheBambooKeptGrowingArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <BlogArticleJsonLd
        headline="And the Bamboo Kept Growing: Why Your Invisible Work Matters"
        description="The Chinese bamboo tree grows nothing for five years — then explodes 90 feet in six weeks. Your identity transformation follows the same law. Here's why the work you can't see is the work that changes everything."
        slug="and-the-bamboo-kept-growing"
        datePublished="2026-05-09"
        dateModified="2026-05-09"
        author="Abdallah Chouaf"
        keywords={["bamboo tree", "patience", "identity transformation", "invisible work", "roots before growth", "consistency", "delayed results"]}
      />
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Identity Shift", "تحول الهوية")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("And the Bamboo Kept Growing: Why Your Invisible Work Matters", "والخيزران استمر بالنمو: لماذا يهم عملك غير المرئي")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("9 min read", "٩ دقائق قراءة")}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {getText("Abdallah Chouaf", "عبدالله الشواف")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">

            {/* Opening - The Story */}
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              {getText(
                "A farmer planted a Chinese bamboo seed. He watered it and waited. A week passed. He knelt down, brushed the soil aside, checked for any sign of life, and saw nothing.",
                "زارع غرس بذرة خيزران صيني. سقاها وانتظر. مر أسبوع. جثا على ركبتيه، أزاح التراب، بحث عن أي علامة حياة، ولم يرَ شيئاً."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "A month goes by, and he waters it again. Still nothing. A year goes by, and he's out there every morning, staring at the same patch of dirt, wondering if the seed is dead, wondering if he's been wasting his time.",
                "يمر شهر، فيسقيها مجدداً. لا شيء. يمضي عام، وهو هناك كل صباح، يحدق في نفس بقعة التراب، يتساءل هل البذرة ميتة، هل أضاع وقته."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The second year: nothing. The third year: nothing. The fourth year: still nothing. By the fifth year, his neighbors are laughing at him. His family is telling him to give up. Even he's starting to doubt himself, but every morning he picks up the watering can and shows up anyway.",
                "العام الثاني: لا شيء. العام الثالث: لا شيء. العام الرابع: لا شيء أيضاً. بحلول العام الخامس، جيرانه يضحكون عليه. عائلته تقول له أن يتخلى. حتى هو بدأ يشك في نفسه، لكن كل صباح يمسك وعاء الماء ويحضر رغم كل شيء."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "One day, in the fifth year, a small green shoot breaks through the dirt. In six weeks, it grows 90 feet into the sky.",
                "في أحد الأيام، في العام الخامس، تخرج برعم أخضر صغير من التراب. في ستة أسابيع، ينمو ٩٠ قدماً في السماء."
              )}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic text-lg">
                {getText(
                  "Now, did it grow in six weeks, or did it grow over five years?",
                  "الآن، هل نما في ستة أسابيع، أم نما على مدار خمس سنوات؟"
                )}
              </p>
            </div>

            {/* Section: The Law of Invisible Roots */}
            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Law of Invisible Roots", "قانون الجذور غير المرئية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This is how every meaningful thing in life works. Whether it's the body you're building, the business you're growing, or the relationships you're investing in — the pattern is identical. You water in silence for years, doubting yourself the whole time, until one day the roots are deep enough to hold something massive.",
                "هكذا يعمل كل شيء ذو معنى في الحياة. سواء كان الجسد الذي تبنيه، أو المشروع الذي تنمّيه، أو العلاقات التي تستثمر فيها — النمط متطابق. أنت تسقي في صمت لسنوات، تشك في نفسك طوال الوقت، حتى يأتي يوم تصبح فيه الجذور عميقة بما يكفي لتحمل شيئاً ضخماً."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The bamboo wasn't doing nothing for five years. It was building a root system so vast and so deep that when the time came, it could sustain explosive growth that no other plant could match. Those 90 feet in six weeks weren't a miracle — they were the inevitable result of five years of underground preparation that nobody could see.",
                "الخيزران لم يكن عاطلاً لخمس سنوات. كان يبني نظام جذور هائل وعميق لدرجة أنه عندما حان الوقت، استطاع أن ي sustaining نمواً انفجارياً لا يطاقله نبات آخر. تلك الـ ٩٠ قدماً في ستة أسابيع لم تكن معجزة — كانت النتيجة الحتمية لخمس سنوات من التحضير تحت الأرض لم يستطع أحد أن يراها."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Your identity works the same way. Every morning you choose the new behavior over the old pattern, you're not wasting time — you're building roots. Every journal entry, every 18-minute block, every moment you refuse to quit — these aren't empty repetitions. They're the underground architecture of a transformation that will one day break through the surface and stun everyone who watched you water the dirt.",
                "هويتك تعمل بنفس الطريقة. كل صباح تختار فيه السلوك الجديد بدلاً من النمط القديم، لست تضيع الوقت — أنت تبني جذوراً. كل سطر تكتبه، كل كتلة ١٨ دقيقة، كل لحظة ترفض فيها الاستسلام — هذه ليست تكرارات فارغة. إنها البنية التحتية لتحول سيخرج يوماً إلى السطح ويبهر كل من شاهدك تسقي التراب."
              )}
            </p>

            {/* Section: The Year Three Trap */}
            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Year Three Trap", "فخ العام الثالث")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Most people quit in year three. They kneel down, see nothing, and walk away right before the breakthrough. Not because they lack willpower — but because the human brain is not wired to value invisible progress. Your nervous system craves evidence. It demands visible results. And when the evidence doesn't come, it interprets the silence as failure.",
                "معظم الناس يستسلمون في العام الثالث. يجثون، لا يرون شيئاً، ويمشون بعيداً قبل الاختراق مباشرة. ليس لأنهم يفتقرون للإرادة — بل لأن الدماغ البشري غير مهيأ لتقدير التقدم غير المرئي. جهازك العصبي يشتاق للأدلة. يطالب بنتائج مرئية. وعندما لا تأتي الأدلة، يفسر الصمت كفشل."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This is why identity transformation is the hardest work you'll ever do. Not because the actions are difficult — they're usually embarrassingly simple. It's hard because the results are invisible for longer than your brain can comfortably tolerate. You're asked to keep watering when every rational signal tells you the seed is dead.",
                "لهذا يكون تحول الهوية أصعب عمل ستقوم به على الإطلاق. ليس لأن الأفعال صعبة — عادة ما تكون بسيطة بشكل محرج. إنه صعب لأن النتائج غير مرئية لفترة أطول مما يتحمله عقلك براحة. يُطلب منك الاستمرار في السقي عندما تكون كل إشارة عقلانية تقول إن البذرة ميتة."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "But here's what the bamboo knows that most people don't: the absence of visible results is not the absence of results. The silence above ground is not a sign that nothing is happening below ground. It's the opposite — the longer the silence, the deeper the roots, and the more dramatic the breakthrough when it finally comes.",
                "لكن هذا ما يعرفه الخيزران وما يجهله معظم الناس: غياب النتائج المرئية ليس غياباً للنتائج. الصمت فوق الأرض ليس دليلاً على أنه لا شيء يحدث تحتها. العكس هو الصحي — كلما طال الصمت، تعمقت الجذور، وكان الاختراق أكثر دراماتيكية عندما يأتي أخيراً."
              )}
            </p>

            {/* Visual Cards - The Timeline */}
            <div className="grid md:grid-cols-4 gap-4 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                    <Timer className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="font-semibold text-primary mb-1">{getText("Year 1-2", "العام ١-٢")}</h3>
                  <p className="text-sm text-slate-500">{getText("Doubt creeps in. Nothing visible. But roots are forming.", "يتسلل الشك. لا شيء مرئي. لكن الجذور تتشكل.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm ring-2 ring-red-100">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
                    <Eye className="h-6 w-6 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-red-600 mb-1">{getText("Year 3", "العام ٣")}</h3>
                  <p className="text-sm text-slate-500">{getText("The danger zone. Most people quit here.", "منطقة الخطر. معظم الناس يستسلمون هنا.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-3">
                    <Shield className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="font-semibold text-amber-600 mb-1">{getText("Year 4", "العام ٤")}</h3>
                  <p className="text-sm text-slate-500">{getText("Deepest roots. Maximum resilience. Almost there.", "أعمق الجذور. أقصى مرونة. على وشك.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm ring-2 ring-accent/20">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <TreePine className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-accent mb-1">{getText("Year 5", "العام ٥")}</h3>
                  <p className="text-sm text-slate-500">{getText("Breakthrough. 90 feet. The world sees what you built.", "اختراق. ٩٠ قدماً. العالم يرى ما بنيت.")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Section: The Identity Underground */}
            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Identity Underground", "تحت أرض الهوية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "At Tamkinly, we map this process through what we call the Identity Baseline — the eight dimensions of who you are. When you begin your transformation, the changes happen in the dimensions nobody can see first: your intellectual frameworks, your emotional regulation, your spiritual alignment. These are underground dimensions. Your physical appearance, your social standing, your financial reality — these are the surface. And just like the bamboo, the underground must be built before the surface can sustain explosive growth.",
                "في تمكنلي، نرسم هذه العملية من خلال ما نسميه خط الأساس للهوية — الأبعاد الثمانية لمن أنت. عندما تبدأ تحولك، التغييرات تحدث أولاً في الأبعاد التي لا يستطيع أحد رؤيتها: أطرك الفكرية، تنظيمك العاطفي، محاذاتك الروحية. هذه أبعاد تحت الأرض. مظهرك الجسدي، مكانتك الاجتماعية، واقعك المالي — هذه هي السطح. ومثل الخيزران، يجب بناء ما تحت الأرض قبل أن يتمكن السطح من تحمل النمو الانفجاري."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This is why the Identity Gap Assessment matters. It doesn't just measure where you are — it reveals the distance between your underground construction and your surface reality. When that gap feels enormous, it's not a sign that you're failing. It's a sign that your roots are still spreading. The bigger the gap feels, the more dramatic the breakthrough will be.",
                "لهذا يهم تقييم فجوة الهوية. لا يقيس فقط أين أنت — بل يكشف المسافة بين بنائك تحت الأرض وواقعك على السطح. عندما تبدو تلك الفجوة هائلة، ليست علامة على أنك تفشل. إنها علامة أن جذورك لا تزال تنتشر. كلما بدت الفجوة أكبر، كان الاختراق أكثر دراماتيكية."
              )}
            </p>

            {/* Section: Watering the Bamboo - The Protocol */}
            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Watering the Bamboo: The Protocol", "سقي الخيزران: البروتوكول")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The farmer didn't water the bamboo with motivation. He didn't water it with inspiration. He didn't water it when he felt like it. He watered it every single morning because that's what you do when you've decided that something matters more than your comfort, your doubt, or your timeline. He showed up with the watering can — not because he saw results, but because he understood the law of invisible roots.",
                "المزارع لم يسقِ الخيزران بالتحفيز. لم يسقه بالإلهام. لم يسقه عندما شاء ذلك. سقاه كل صباح لأن هذا ما تفعله عندما تقرر أن شيئاً ما أهم من راحتك، وشكك، وجدولك الزمني. حضر بوعاء الماء — ليس لأنه رأى نتائج، بل لأنه فهم قانون الجذور غير المرئية."
              )}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">
                {getText("The Bamboo Protocol for Identity Change", "بروتوكول الخيزران لتغيير الهوية")}
              </h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span>{getText("Define the new identity — who are you becoming?", "حدد الهوية الجديدة — من أنت في طريقك لتصبح؟")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span>{getText("Identify the daily 'watering' — the smallest action that proves this identity.", "حدد 'السقي' اليومي — أصغر فعل يثبت هذه الهوية.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span>{getText("Show up regardless of visible results — this is the non-negotiable.", "احضر بغض النظر عن النتائج المرئية — هذا هو غير القابل للتفاوض.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span>{getText("Track evidence underground — journal, reflect, measure what matters.", "تتبع الأدلة تحت الأرض — دوّن، تأمل، قِس ما يهم.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">5</span>
                  <span>{getText("Expect year three — anticipate the doubt and outlast it.", "توقع العام الثالث — استبق الشك وتجاوزه.")}</span>
                </li>
              </ol>
            </div>

            {/* Section: Your Body, Your Business, Your Relationships */}
            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Bamboo Law Applies to Everything", "قانون الخيزران ينطبق على كل شيء")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "This isn't just a metaphor — it's a biological and neurological law. Your body builds muscle fiber by fiber, long before the mirror reflects any change. Your business gains trust customer by customer, long before revenue confirms you're on the right path. Your relationships deepen conversation by conversation, long before you feel the solidity of genuine connection.",
                "هذا ليس مجرد استعارة — إنه قانون بيولوجي وعصبي. جسدك يبني الألياف العضلية ليفاً بليف، قبل أن يعكس المرآاً أي تغيير. مشروعك يكسب الثقة عميلاً بعميل، قبل أن يؤكد الإيراد أنك على المسار الصحيح. علاقاتك تتعمق محادثة بمحادثة، قبل أن تشعر بصلابة الاتصال الحقيقي."
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Layers className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("The Body", "الجسد")}</h3>
                  <p className="text-sm text-slate-600">{getText("Muscle memory builds in silence. Strength shows up months after consistency begins.", "الذاكرة العضلية تبني في صمت. القوة تظهر أشهراً بعد بدء الاتساق.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("The Business", "المشروع")}</h3>
                  <p className="text-sm text-slate-600">{getText("Reputation compounds invisibly. The market notices long after you've already become someone worth noticing.", "السمعة تتراكم بشكل غير مرئي. السوق يلاحظ بعد أن أصبحت شخصاً يستحق الملاحظة.")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Relationships", "العلاقات")}</h3>
                  <p className="text-sm text-slate-600">{getText("Trust deepens through small, consistent proof. Not grand gestures — daily presence.", "الثقة تتعمق من خلال الدليل الصغير المتسق. ليس الإيماءات الكبيرة — الحضور اليومي.")}</p>
                </CardContent>
              </Card>
            </div>

            {/* Section: Don't Be That Person */}
            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Don't Be That Person", "لا تكن ذلك الشخص")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Most people quit in year three. They've invested two years of consistent effort, seen minimal visible return, and the internal dialogue becomes deafening. \"Maybe this isn't for me.\" \"Maybe I'm doing it wrong.\" \"Maybe the seed was dead all along.\" These aren't signs of failure — they're signs you're exactly where every successful person has stood before their breakthrough.",
                "معظم الناس يستسلمون في العام الثالث. استثمروا عامين من الجهد المتسق، رأوا عائداً مرئياً ضئيلاً، والحوار الداخلي أصبح مدوياً. \"ربما هذا ليس لي.\" \"ربما أفعل ذلك بشكل خاطئ.\" \"ربما البذرة كانت ميتة منذ البداية.\" هذه ليست علامات فشل — إنها علامات أنك بالضبط حيث وقف كل شخص ناجح قبل اختراقه."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The people who quit in year three don't fail because the method doesn't work. They fail because they trusted their eyes instead of understanding the law. They demanded evidence from the surface when all the evidence was accumulating below. They walked away from 90 feet of growth because they couldn't see the six inches of roots that were about to change everything.",
                "الأشخاص الذين يستسلمون في العام الثالث لا يفشلون لأن الطريقة لا تعمل. يفشلون لأنهم وثقوا بأعينهم بدلاً من فهم القانون. طالبوا بالأدلة من السطح بينما كل الأدلة كانت تتراكم في الأسفل. مشوا بعيداً عن ٩٠ قدماً من النمو لأنهم لم يستطيعوا رؤية الست بوصات من الجذور التي كانت على وشك تغيير كل شيء."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "At Tamkinly, we built the Daily Reflection Practice specifically for this — to give you a way to track what's happening underground. When you journal your identity evidence daily, you create a record that your doubting mind can't argue with. The reflection becomes your proof that roots are forming, even when the surface looks unchanged.",
                "في تمكنلي، بنينا ممارسة التأمل اليومي خصيصاً لهذا — لنمنحك طريقة لتتبع ما يحدث تحت الأرض. عندما تدوّن أدلة هويتك يومياً، تخلق سجلاً لا يمكن لعقلك المتشكك أن يجادله. التأمل يصبح دليلك أن الجذور تتشكل، حتى عندما يبدو السطح بدون تغيير."
              )}
            </p>

            {/* Section: The Second Best Time */}
            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Second Best Time", "ثاني أفضل وقت")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "There's a Chinese proverb that compresses all of this wisdom into a single sentence: \"The best time to plant a tree was 20 years ago. The second best time is now.\" This isn't motivational fluff — it's a neurological fact. Your brain can begin rewiring itself at any moment you choose. The neural pathways of your new identity can start forming today, regardless of how many years you've spent watering the wrong seeds or letting the soil dry out.",
                "هناك مثل صيني يضغط كل هذه الحكمة في جملة واحدة: \"أفضل وقت لغرس شجرة كان قبل عشرين عاماً. ثاني أفضل وقت هو الآن.\" هذا ليس كلاماً تحفيزياً فارغاً — إنه حقيقة عصبية. دماغك يمكنه البدء في إعادة تشكيل نفسه في أي لحظة تختارها. المسارات العصبية لهويتك الجديدة يمكن أن تبدأ في التشكل اليوم، بغض النظر عن كم سنة قضيتها تسقي البذور الخطأ أو تترك التربة تجف."
              )}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "You don't need to go back 20 years. You need to start today. The bamboo doesn't ask how long you waited before planting — it only asks for consistent watering from this moment forward. Your identity doesn't ask how many years you spent as someone you didn't want to be — it only asks: are you willing to show up tomorrow? And the day after? And the one after that?",
                "لا تحتاج للعودة عشرين عاماً. تحتاج أن تبدأ اليوم. الخيزران لا يسأل كم طال انتظارك قبل الزرع — يسأل فقط عن السقي المتسق من هذه اللحظة فصاعداً. هويتك لا تسأل كم سنة قضيتها كشخص لم ترد أن تكونه — تسأل فقط: هل أنت مستعد أن تحضر غداً؟ واليوم الذي يليه؟ والذي يليه؟"
              )}
            </p>

            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-xl my-10 border border-accent/10">
              <p className="text-primary font-serif text-xl italic text-center leading-relaxed">
                {getText(
                  "\"The best time to plant a tree was 20 years ago. The second best time is now.\" — Chinese Proverb",
                  "\"أفضل وقت لغرس شجرة كان قبل عشرين عاماً. ثاني أفضل وقت هو الآن.\" — مثل صيني"
                )}
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "So keep doing the work that nurtures your seeds. Don't stop whatever you face or don't see the quick results. The roots are growing. The breakthrough is coming. And when it arrives, it won't be six weeks of sudden luck — it'll be the harvest of every single morning you chose to show up when the dirt gave you nothing back.",
                "استمر في العمل الذي يغذي بذورك. لا تتوقف مهما واجهت أو لم ترَ نتائج سريعة. الجذور تنمو. الاختراق قادم. وعندما يأتي، لن يكون ستة أسابيع من الحظ المفاجئ — سيكون حصاد كل صباح اخترت فيه أن تحضر عندما التراب لم يمنحك شيئاً بالمقابل."
              )}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <TreePine className="h-5 w-5" />
              <span className="font-semibold">{getText("The Bottom Line", "الخلاصة")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The bamboo didn't grow in six weeks. It grew in five years. Your transformation isn't hiding in some future breakthrough — it's accumulating in every invisible action you take today. Don't be the person who walks away in year three. Keep watering. The shoot is coming.",
                "الخيزران لم ينمُ في ستة أسابيع. نما في خمس سنوات. تحولك ليس مخبأً في اختراق مستقبلي ما — إنه يتراكم في كل فعل غير مرئي تقوم به اليوم. لا تكن الشخص الذي يمشي بعيداً في العام الثالث. استمر في السقي. البرعم قادم."
              )}
            </p>

          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="and-the-bamboo-kept-growing" />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              {getText("Start Building Your Roots Today", "ابدأ ببناء جذورك اليوم")}
            </h2>
            <p className="text-slate-300 mb-6">
              {getText("The Daily Reflection Practice helps you track your invisible progress and build evidence that your transformation is working — even when the surface looks unchanged.", "ممارسة التأمل اليومي تساعدك على تتبع تقدمك غير المرئي وبناء أدلة على أن تحولك يعمل — حتى عندما يبدو السطح بدون تغيير.")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apps/daily-reflection-practice">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  {getText("Start Daily Reflection", "ابدأ التأمل اليومي")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/apps/identity-gap-assessment">
                <Button variant="white" size="lg" className="px-8 font-semibold">
                  {getText("Measure Your Gap", "قِس فجوتك")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
    </>
  );
}
