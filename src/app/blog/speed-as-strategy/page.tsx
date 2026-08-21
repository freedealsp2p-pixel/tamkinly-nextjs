'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Zap, Target, Rocket } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function SpeedAsStrategyArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "physics-of-momentum", title: getText("The Physics of Momentum", "فيزياء الزخم"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "ten-minute-block-system", title: getText("The 10-Minute Block System", "نظام الكتل ذات العشر دقائق"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "inversion-thinking", title: getText("Inversion Thinking", "التفكير العكسي"), readTime: getText("8 min read", "٨ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Execution", "التنفيذ")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Speed as Strategy: The Execution Edge", "السرعة كاستراتيجية: ميزة التنفيذ")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("7 min read", "٧ دقائق قراءة")}
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
              {getText("Speed is the one trait that separates the top 1% from everyone else. Not intelligence. Not resources. Not talent. Just speed of execution after a decision is made.", "السرعة هي الصفة الوحيدة التي تفصل أعلى ١٪ عن الجميع. ليس الذكاء. ليس الموارد. ليس الموهبة. فقط سرعة التنفيذ بعد اتخاذ القرار.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Most people think success requires being smart, having money, or knowing the right people. But there's something even more fundamental: the ability to turn ideas into reality fast.", "معظم الناس يظنون أن النجاح يتطلب الذكاء أو امتلاك المال أو معرفة الأشخاص المناسبين. لكن هناك شيء أكثر أساسية: القدرة على تحويل الأفكار إلى واقع بسرعة.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Gap Between Idea and Reality", "الفجوة بين الفكرة والواقع")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Power—in business and in life—lives in the gap between ideas and reality. Every day an idea sits unexecuted is a day it loses potential. Every hour spent \"getting ready\" is an hour someone else is taking action.", "القوة — في الأعمال والحياة — تكمن في الفجوة بين الأفكار والواقع. كل يوم تظل فيه فكرة غير منفذة هو يوم تفقد فيه إمكاناتها. كل ساعة تقضيها في \"الاستعداد\" هي ساعة شخص آخر يتخذ فيها إجراءً.")}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText("\"The difference in power, as I understand it, is the gap between ideas becoming reality. The closer we get to closing that gap, the more powerful and effective we become.\"", "\"الفرق في القوة، كما أفهمه، هو الفجوة بين الأفكار والواقع. كلما اقتربنا من إغلاق تلك الفجوة، أصبحنا أقوى وأكثر فعالية.\"")}
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("This isn't about rushing. It's about recognizing that execution is where value is created. A mediocre idea executed today beats a perfect idea executed next month.", "هذا ليس عن الاستعجال. إنه عن إدراك أن التنفيذ هو حيث تُخلق القيمة. فكرة متواضعة نُفذت اليوم أفضل من فكرة مثالية ستنفذ الشهر القادم.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Problem with Slow", "مشكلة البطء")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Consider this scenario: You need a website. The agency says it will take two weeks. But you know that in two weeks, you could learn web design from scratch and build it yourself.", "تأمل هذا السيناريو: أنت بحاجة إلى موقع إلكتروني. الوكالة تقول إن الأمر سيستغرق أسبوعين. لكنك تعرف أنه في أسبوعين، يمكنك تعلم تصميم المواقع من الصفر وبناؤه بنفسك.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("So why does the expert need two weeks? Why is everyone so slow?", "إذن لماذا يحتاج الخبير إلى أسبوعين؟ لماذا الجميع بطيئون هكذا؟")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The answer reveals something important about modern work: most delays are artificial. They're created by unnecessary processes, fear of shipping imperfect work, and a culture that treats speed as suspicious.", "الكشف يجلي شيئاً مهماً عن العمل الحديث: معظم التأخيرات مصطنعة. سببها عمليات غير ضرورية، وخطر تقديم عمل غير مثالي، وثقافة تعامل السرعة بارتياب.")}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("The Speed Reality Check", "فحص واقع السرعة")}</h3>
              <p className="text-slate-600 mb-4">
                {getText("When someone says something will take a week, ask: \"What's stopping us from doing this in a day?\" Often, the answer reveals that most of the \"time required\" is just padding and process.", "عندما يقول شخص إن شيئاً سيستغرق أسبوعاً، اسأل: \"ما الذي يمنعنا من فعل هذا في يوم واحد؟\" غالباً، الكشف يجلي أن معظم \"الوقت المطلوب\" هو مجرد حشو وإجراءات.")}
              </p>
              <p className="text-slate-600">
                {getText("If you can accomplish by end of day what you planned for end of week, you've just accelerated your progress by 7x.", "إذا استطعت إنجاز بنهاية اليوم ما خططت له لنهاية الأسبوع، فقد سرّعت تقدمك بمعدل ٧ أضعاف.")}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Speed vs. Quality", "السرعة مقابل الجودة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The biggest objection to speed is quality. People think fast means sloppy. But speed and quality aren't opposites—they're partners.", "أكبر اعتراض على السرعة هو الجودة. الناس يظنون أن السريع يعني المهمل. لكن السرعة والجودة ليسا نقيضين — هما شريكان.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Fast execution means faster feedback. Faster feedback means faster improvement. Faster improvement means better quality sooner.", "التنفيذ السريع يعني تغذية راجعة أسرع. تغذية راجعة أسرع تعني تحسناً أسرع. تحسن أسرع يعني جودة أفضل في وقت أقرب.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The person who ships in a day and iterates three times in a week ends up with a better product than the person who spends a week trying to ship something perfect.", "الشخص الذي يطلق في يوم ويراجع ثلاث مرات في أسبوع ينتهي بمنتج أفضل من الشخص الذي يقضي أسبوعاً في محاولة إطلاق شيء مثالي.")}
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Day 1", "اليوم ١")}</h3>
                  <p className="text-sm text-slate-600">{getText("Ship the first version", "أطلق النسخة الأولى")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Day 3", "اليوم ٣")}</h3>
                  <p className="text-sm text-slate-600">{getText("Iterate based on feedback", "راجع بناءً على التغذية الراجعة")}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Rocket className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{getText("Day 7", "اليوم ٧")}</h3>
                  <p className="text-sm text-slate-600">{getText("Version 4 is excellent", "النسخة ٤ ممتازة")}</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Speed Mindset", "عقلية السرعة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Speed isn't just a tactic—it's an identity. The person who identifies as fast acts fast. The person who identifies as thorough acts slow. Both are self-fulfilling.", "السرعة ليست مجرد تكتيك — إنها هوية. الشخص الذي يعرّف نفسه بالسرعة يتصرف بسرعة. الشخص الذي يعرّف نفسه بالدقة يتصرف ببطء. كلاهما يحقق ذاته.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("To become faster, start by challenging every timeline you create:", "لتصبح أسرع، ابدأ بتحدي كل جدول زمني تضعه:")}
            </p>

            <ul className="space-y-3 text-slate-600 my-6">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                <span>{getText("When you say \"I'll do this by end of week,\" ask: \"Can I do it today?\"", "عندما تقول \"سأفعل هذا بنهاية الأسبوع\"، اسأل: \"هل يمكنني فعله اليوم؟\"")}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                <span>{getText("When someone says it will take time, ask: \"What's the fastest path?\"", "عندما يقول شخص إن الأمر سيستغرق وقتاً، اسأل: \"ما أسرع طريق؟\"")}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                <span>{getText("When you feel resistance to shipping, ship anyway and iterate.", "عندما تشعر بمقاومة للإطلاق، أطلق على أي وراجع.")}</span>
              </li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The 7x Acceleration", "تسريع ٧ أضعاف")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Here's the math that changes everything: If you can accomplish in one day what you planned for one week, you've just accelerated your trajectory by 7 times.", "إليك الحساب الذي يغير كل شيء: إذا استطعت إنجاز في يوم واحد ما خططت له لأسبوع، فقد سرّعت مسارك بمعدل ٧ أضعاف.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Over a year, that's not just progress—that's a different life entirely. The person executing at 7x speed isn't just ahead. They're in a completely different game.", "على مدار سنة، هذا ليس مجرد تقدم — إنها حياة مختلفة تماماً. الشخص الذي ينفذ بسرعة ٧ أضعاف ليس متقدماً فحسب. إنه في لعبة مختلفة كلياً.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Speed is your competitive advantage. Most people won't even try to be fast. They'll accept slow as normal. They'll defend their timelines. They'll resist the pressure to ship.", "السرعة هي ميزتك التنافسية. معظم الناس لن يحاولوا حتى أن يكونوا سريعين. سيقبلون البطء كأمر طبيعي. سيدافعون عن جداولهم الزمنية. سيقاومون الضغط للإطلاق.")}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Rocket className="h-5 w-5" />
              <span className="font-semibold">{getText("The Key Insight", "الفكرة المفتاحية")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText("Speed isn't about being busy. It's about closing the gap between idea and reality. The faster you close that gap, the more powerful you become. In a world of slow movers, speed is everything.", "السرعة ليست عن الانشغال. إنها عن إغلاق الفجوة بين الفكرة والواقع. كلما أسرعت في إغلاق تلك الفجوة، أصبحت أقوى. في عالم من البطيئين، السرعة هي كل شيء.")}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />

      <ArticleNavigation currentSlug="speed-as-strategy" />

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

