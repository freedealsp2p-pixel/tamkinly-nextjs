'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Brain, ScanFace, Sparkles, RefreshCw } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function WorkOnYourselfArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "identity-millionaire", title: getText("The Identity Millionaire", "المليونير بالهوية"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "physics-of-momentum", title: getText("The Physics of Momentum", "فيزياء الزخم"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "five-steps-to-miracles", title: getText("Five Steps to Miracles", "خمس خطوات نحو المعجزات"), readTime: getText("10 min read", "١٠ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Self-Image", "الصورة الذاتية")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Work on Yourself: The Psycho-Cybernetics of Identity", "اعمل على نفسك: السيبرانية النفسية للهوية")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("10 min read", "١٠ دقائق قراءة")}
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
              {getText("\"If you want to be rich and happy for the rest of your life, learn this lesson well: Learn to work harder on yourself than you do on your job.\" — Jim Rohn", "\"إذا أردت أن تكون غنياً وسعيداً لبقية حياتك، تعلّم هذا الدرس جيداً: تعلّم أن تعمل على نفسك بجهد أكبر مما تعمل في وظيفتك.\" — جيم رون")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Income doesn't exceed personal development by much. Success is something you attract, not something you pursue. The key isn't chasing outcomes—it's becoming the person who naturally creates those outcomes.", "الدخل لا يتجاوز التطور الشخصي بكثير. النجاح شيء تجذبه، وليس شيء تطارده. المفتاح ليس في مطاردة النتائج — بل في أن تصبح الشخص الذي يخلق هذه النتائج بشكل طبيعي.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Discovery That Changed Everything", "الاكتشاف الذي غيّر كل شيء")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("In the 1960s, cosmetic surgeon Maxwell Maltz noticed something strange. He would fix people's faces—remove scars, correct features—and some patients would suddenly become confident and transformed.", "في الستينيات، لاحظ جراح التجميل ماكسويل مالتز شيئاً غريباً. كان يصلح وجوه الناس — يزيل الندوب، يصحح الملامح — وبعض المرضى كانوا يصبحون فجأة واثقين ومتحولين.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("But others? They remained the same. Same insecurities. Same shyness. Same self-doubt. Despite the physical transformation, nothing changed inside.", "لكن الآخرين؟ بقوا كما هم. نفس المخاوف. نفس الخجل. نفس الشك في الذات. رغم التحول الجسدي، لم يتغير شيء في الداخل.")}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText("Maltz realized: If you don't change your inner image, external change makes no difference. He called this \"Psycho-Cybernetics\"—the navigation system of the mind.", "أدرك مالتز: إذا لم تغيّر صورتك الداخلية، فإن التغيير الخارجي لا يحدث أي فرق. أطلق على هذا \"السيبرانية النفسية\" — نظام الملاحة في العقل.")}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Self-Image Problem", "مشكلة الصورة الذاتية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Your self-image is the internal picture you hold of yourself. It's not who you actually are—it's who you believe you are. And this belief operates like a thermostat, constantly adjusting your behavior to match your internal setting.", "صورتك الذاتية هي الصورة الداخلية التي تحملها عن نفسك. ليست من أنت فعلاً — بل من تعتقد أنك عليه. وهذا الاعتقاد يعمل كمنظم حرارة، يعدّل سلوكك باستمرار ليتوافق مع إعدادك الداخلي.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("If you secretly believe you're not good enough, your subconscious will prove you right. It will create situations where you fail, sabotage your own efforts, and interpret neutral events as evidence of your inadequacy.", "إذا كنت تعتقد في أعماقك أنك لست جيداً بما يكفي، فإن عقلك الباطن سيثبت لك أنك محق. سيخلق مواقف تفشل فيها، يخ جهودك، ويفسر الأحداث المحايدة كدليل على عدم كفاءتك.")}
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <ScanFace className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">{getText("The Old Approach", "المنهج القديم")}</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>{getText("• Try to change behavior directly", "• محاولة تغيير السلوك مباشرة")}</li>
                    <li>{getText("• Use willpower and discipline", "• استخدام الإرادة والانضباط")}</li>
                    <li>{getText("• Fight against self-doubt", "• محاربة الشك في الذات")}</li>
                    <li>{getText("• Push harder when stuck", "• الضغط بقوة أكبر عند التعثر")}</li>
                    <li>{getText("• Get temporary results", "• الحصول على نتائج مؤقتة")}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">{getText("The Identity Approach", "منهج الهوية")}</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>{getText("• Change the internal image first", "• تغيير الصورة الداخلية أولاً")}</li>
                    <li>{getText("• Let behavior align naturally", "• ترك السلوك يتماشى بشكل طبيعي")}</li>
                    <li>{getText("• Rewrite the underlying belief", "• إعادة كتابة المعتقد الكامن")}</li>
                    <li>{getText("• Allow effortless change", "• السماح بالتغيير بلا جهد")}</li>
                    <li>{getText("• Get permanent results", "• الحصول على نتائج دائمة")}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Navigation System", "نظام الملاحة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Think of your self-image as a target-seeking mechanism. Like a guided missile, it will adjust your course to hit whatever target you've programmed into it.", "فكر في صورتك الذاتية كآلية تبحث عن الهدف. مثل صاروخ موجه، ستعدّل مسارك لتصيب أي هدف برمجته بداخلك.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The problem? Most people's internal target is set to \"mediocrity\" or \"struggle.\" They've programmed themselves for less than they're capable of. No amount of effort will override this programming—because the navigation system is always working to hit the programmed target.", "المشكلة؟ الهدف الداخلي لمعظم الناس مضبوط على \"الوساطة\" أو \"الكفاح\". لقد برمجوا أنفسهم على أقل مما هم قادرون عليه. لا يمكن لأي جهد أن يتجاوز هذه البرمجة — لأن نظام الملاحة يعمل دائماً على إصابة الهدف المبرمج.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The solution isn't more effort. The solution is reprogramming the target.", "الحل ليس مزيداً من الجهد. الحل هو إعادة برمجة الهدف.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Deep Emotional Rehearsal", "البروفة العاطفية العميقة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Maltz discovered that the only way to reprogram your self-image is through \"deep emotional rehearsal\"—what we might now call visualization or guided imagery. You don't need more discipline or another strategy. You need a new identity.", "اكتشف مالتز أن الطريقة الوحيدة لإعادة برمجة صورتك الذاتية هي من خلال \"البروفة العاطفية العميقة\" — وهو ما قد نسميه الآن التصور أو التخيل الموجه. لست بحاجة إلى مزيد من الانضباط أو استراتيجية أخرى. أنت بحاجة إلى هوية جديدة.")}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("The Reprogramming Protocol", "بروتوكول إعادة البرمجة")}</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span><strong>{getText("Define the new identity.", "حدد الهوية الجديدة.")}</strong> {getText("Who do you want to become? Be specific.", "من تريد أن تصبح؟ كن محدداً.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span><strong>{getText("Create vivid mental images.", "اصنع صوراً ذهنية حية.")}</strong> {getText("See yourself acting as this person in specific situations.", " تخيل نفسك تتصرف كشخص في مواقف محددة.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span><strong>{getText("Add emotional intensity.", "أضف شدة عاطفية.")}</strong> {getText("Feel what it would feel like to be this person.", "اشعر بما سيكون عليه الشعور بأنك هذا الشخص.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span><strong>{getText("Practice daily.", "تدرب يومياً.")}</strong> {getText("Repetition rewires neural pathways.", "التكرار يعيد توصيل المسارات العصبية.")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">5</span>
                  <span><strong>{getText("Act in alignment.", "تصرف بانسجام.")}</strong> {getText("Take small actions that prove the new identity true.", "اتخذ إجراءات صغيرة تثبت الهوية الجديدة صحيحة.")}</span>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Identity Regulates Everything", "الهوية تنظم كل شيء")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Your identity regulates your desires, your patterns, and your expected results. If you change your identity, everything that follows changes automatically.", "هويتك تنظم رغباتك وأنماطك ونتائجك المتوقعة. إذا غيّرت هويتك، يتغير كل شيء يتبعها تلقائياً.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The person who identifies as healthy naturally makes healthy choices. The person who identifies as a writer naturally writes. The person who identifies as successful naturally takes successful actions.", "الشخص الذي يعرّف نفسه كشخص صحي يتخذ خيارات صحية بشكل طبيعي. الشخص الذي يعرّف نفسه ككاتب يكتب بشكل طبيعي. الشخص الذي يعرّف نفسه كشخص ناجح يتخذ إجراءات ناجحة بشكل طبيعي.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("You don't have to fight yourself when your identity is aligned with your goals. The behavior becomes automatic because it's just \"what someone like me does.\"", "لست بحاجة لمحاربة نفسك عندما تتوافق هويتك مع أهدافك. يصبح السلوك تلقائياً لأنه ببساطة \"ما يفعله شخص مثلي.\"")}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText("\"You don't need more discipline or another marketing strategy. You need a new identity. Identity is what regulates desire, pattern, and expected outcome into your reality. Change your identity, and everything following it changes automatically.\"", "\"لست بحاجة إلى مزيد من الانضباط أو استراتيجية تسويق أخرى. أنت بحاجة إلى هوية جديدة. الهوية هي ما ينظم الرغبة والنمط والنتيجة المتوقعة في واقعك. غيّر هويتك، وكل شيء يتبعها يتغير تلقائياً.\"")}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Practice of Self-Work", "ممارسة العمل على الذات")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Working on yourself isn't selfish—it's essential. Every area of your life improves when you improve. Your relationships, your career, your health, your happiness—all rise or fall with your personal development.", "العمل على نفسك ليس أنانية — إنه ضروري. كل مجال في حياتك يتحسن عندما تتحسن أنت. علاقاتك، مسيرتك المهنية، صحتك، سعادتك — كلها ترتفع أو تنخفض مع تطورك الشخصي.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The question isn't whether you have time for self-work. The question is whether you can afford not to do it. Because without it, you're operating with outdated software—trying to navigate modern challenges with an identity formed by past experiences.", "السؤال ليس ما إذا كان لديك وقت للعمل على ذاتك. السؤال هو هل يمكنك تحمل عدم القيام بذلك. لأن بدونه، أنت تعمل ببرمجيات قديمة — تحاول التعامل مع تحديات عصرية بهوية شكلتها تجارب الماضي.")}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <RefreshCw className="h-5 w-5" />
              <span className="font-semibold">{getText("The Key Insight", "الفكرة المفتاحية")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText("Happiness isn't in what you get—it's in what you become. The goal isn't to have more; it's to be more. And being more starts with rewriting the internal image that controls everything.", "السعادة ليست في ما تحصل عليه — بل في ما تصبح عليه. الهدف ليس أن تمتلك أكثر؛ بل أن تكون أكثر. وكونك أكثر يبدأ بإعادة كتابة الصورة الداخلية التي تتحكم في كل شيء.")}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleReferences slug="work-on-yourself" />

      <MidArticleUpgrade promoteTier="BASIC" variant="minimal" />
      <BlogArticleCTA ctaType="quiz" />

      <ArticleNavigation currentSlug="work-on-yourself" />

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

