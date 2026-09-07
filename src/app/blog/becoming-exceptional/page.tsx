'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Star, Shield, TrendingUp } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function BecomingExceptionalArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "five-steps-to-miracles", title: getText("Five Steps to Miracles", "خمس خطوات نحو المعجزات"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "work-on-yourself", title: getText("Work on Yourself: Psycho-Cybernetics", "اعمل على نفسك: السيبرانية النفسية للهوية"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "all-in-or-nothing", title: getText("All In or Nothing", "إما الكل أو لا شيء"), readTime: getText("7 min read", "٧ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Excellence", "التميّز")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("Becoming Exceptional: Why Ordinary Can Never Build Legacy", "أن تصبح استثنائياً: لماذا لا يستطيع العادي بناء إرث أبداً")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("8 min read", "٨ دقائق قراءة")}
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
              {getText("You cannot make yourself exceptional and live an ordinary life. To become exceptional, you must live an exceptional life. And an exceptional life doesn't always mean better—it means different enough that most people would reject it.", "لا يمكنك أن تصبح استثنائياً وتعيش حياة عادية. لتصبح استثنائياً، يجب أن تعيش حياة استثنائية. والحياة الاستثنائية لا تعني دائماً الأفضل — بل تعني مختلفة بما يكفي ليرفضها معظم الناس. وهذا ما عاشه ابن خلدون حين اختار العزلة لكتابة مقدمته الشهيرة، وما عاشه المتنبي حين رفض أن يكون شاعراً عادياً في بلاط خليفة، بل أراد أن يكون صوتاً استثنائياً يتجاوز عصره.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("And when that happens, you must reject them too. Oil and water don't mix. This is what it truly means to be exceptional: you must become the exception.", "وعندما يحدث ذلك، يجب أن ترفضهم أنت أيضاً. الزيت والماء لا يمتزجان. هذا هو المعنى الحقيقي للاستثنائية: يجب أن تصبح الاستثناء. وكما قال أبو الطيب المتنبي: «ومن لا يطيق صعود الجبال يعش أبد الدهر بين الحفر» — فمن يرفض الصعود يبقى في القاع، ومن يختار الاستثنائية يدفع ثمنها غالياً لكنه يصل إلى القمة.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Cost of Being Different", "ثمن الاختلاف")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Most people want the rewards of being exceptional without the costs. They want to stand out without standing apart. They want to be extraordinary while living ordinary.", "معظم الناس يريدون مكافآت الاستثنائية دون تكلفتها. يريدون البروز دون الانفصال. يريدون أن يكونوا استثنائيين بينما يعيشون حياة عادية. وهذا ما حذّر منه الفارابي حين ميّز بين «الإنسان الكامل» وبين العامة — فالإنسان الكامل لا يصل إلى كماله بالتمني، بل بالتفرد في الاختيار والصبر على مشقّة المخالفة.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("But it doesn't work that way. Exceptional isn't a checkbox you tick while keeping everything else the same. It's a fundamental orientation toward life that touches everything.", "لكن الأمور لا تسير هكذا. الاستثنائية ليست خانة تضع فيها علامة مع إبقاء كل شيء آخر كما هو. إنها توجه أساسي تجاه الحياة يمس كل شيء.")}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText("\"Why settle for being average when you have a chance to be the best? I don't wake up every day just to be average.\"", "\"لماذا ترضى بالمتوسط بينما لديك فرصة لتكون الأفضل؟ أنا لا أستيقظ كل يوم لأكون متوسطاً.\"")}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("What Makes Someone Exceptional?", "ما الذي يجعل شخصاً استثنائياً؟")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Excellence is confidence. And confidence is knowing who you are because you've put in the hours, the discipline, the sacrifice. It's not arrogance—it's earned certainty.", "التميّز هو الثقة. والثقة هي معرفة من أنت لأنك بذلت الساعات والانضباط والتضحية. ليس غطرسة — بل يقين مكتسب. والعرب قديماً كانوا يسمّون هذا «الحميّة» — ليس الحميّة الجاهلية العمياء، بل حميّة صاحب المروءة الذي يعرف قدر نفسه لأنه صقلها بالتجربة.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("People will call you names. They'll say you're too ambitious, too extreme, maybe even obsessive. But here's the truth: none of that matters, because those people aren't putting in the work.", "سيسمّونك بأسماء. سيقولون إنك طموح أكثر من اللازم، متطرف جداً، ربما حتى مهووس. لكن إليك الحقيقة: لا شيء من ذلك يهم، لأن هؤلاء الناس لا يبذلون الجهد.")}
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">{getText("The Ordinary Path", "المسار العادي")}</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>{getText("• Seek comfort and convenience", "• السعي للراحة والسهولة")}</li>
                    <li>{getText("• Follow the well-worn path", "• اتباع المسار المطروق")}</li>
                    <li>{getText("• Avoid risk and uncertainty", "• تجنب المخاطرة وعدم اليقين")}</li>
                    <li>{getText("• Prioritize fitting in", "• إعطاء الأولوية للاندماج")}</li>
                    <li>{getText("• Accept mediocrity as normal", "• تقبل الوساطة كأمر طبيعي")}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">{getText("The Exceptional Path", "المسار الاستثنائي")}</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>{getText("• Embrace discomfort for growth", "• احتضان عدم الراحة من أجل النمو")}</li>
                    <li>{getText("• Forge your own path", "• رسم مسارك الخاص")}</li>
                    <li>{getText("• Accept risk as necessary", "• تقبل المخاطرة كضرورة")}</li>
                    <li>{getText("• Stand apart willingly", "• الوقوف منفرداً بإرادة")}</li>
                    <li>{getText("• Refuse to settle", "• الرفض بالقبول بالأقل")}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Exceptional Identity", "الهوية الاستثنائية")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Becoming exceptional starts with identity. It's deciding that you're not willing to settle for what's normal. It's choosing to become the exception rather than the rule.", "أن تصبح استثنائياً يبدأ بالهوية. إنها قرارك بعدم الرضا بما هو طبيعي. إنها اختيارك أن تصبح الاستثناء بدلاً من القاعدة.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("This isn't about being better than others. It's about being fully yourself—so fully that you naturally stand out. The exceptional person isn't trying to be different. They're just being completely themselves.", "الأمر ليس حول أن تكون أفضل من الآخرين. بل حول أن تكون نفسك بالكامل — بشكل كامل لدرجة أنك تبرز بشكل طبيعي. الشخص الاستثنائي لا يحاول أن يكون مختلفاً. إنه ببساطة يكون نفسه بالكامل. وكما جاء في الحكمة: «من عرف نفسه عرف ربّه» — فمن عرف ذاته الحقيقية وعاش بها بصدق، أصبح استثنائياً بدون أن يحاول.")}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("The Exceptional Mindset", "العقلية الاستثنائية")}</h3>
              <ul className="space-y-2 text-slate-600">
                <li>{getText("• I don't compete—I express", "• أنا لا أنافس — أعبر")}</li>
                <li>{getText("• I don't compare—I contribute", "• أنا لا أقارن — أساهم")}</li>
                <li>{getText("• I don't conform—I create", "• أنا لا أتماهى — أخلق")}</li>
                <li>{getText("• I don't fit in—I stand out", "• أنا لا أندمج — أبرز")}</li>
                <li>{getText("• I don't settle—I become", "• أنا لا أقبل بالأقل — أصبح")}</li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Loneliness of Excellence", "وحدة التميّز")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Here's what no one tells you: becoming exceptional can be lonely. The path narrows as you climb. The people who understood you before may not understand you now.", "إليك ما لا يخبرك به أحد: أن تصبح استثنائياً قد يكون وحيداً. يضيق المسار كلما صعدت. الأشخاص الذين فهموك سابقاً قد لا يفهمونك الآن. وقد عاش هذه الوحدة أعظم عقول الأمة — من ابن سينا الذي كتب الشفاء في عزلة، إلى ابن خلدون الذي نُفي مراراً قبل أن يُعترف بعبقريته.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("This isn't a bug—it's a feature. The loneliness of excellence isn't something to avoid. It's something to embrace. It's evidence that you're on the right path.", "هذا ليس عيباً — إنه ميزة. وحدة التميّز ليست شيئاً يجب تجنبه. إنها شيء يجب احتضانه. إنها دليل على أنك في المسار الصحيح.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Oil and water don't mix. When you're oil in a world of water, you'll naturally separate. Don't fight it. Don't dilute yourself to blend in. Let yourself rise.", "الزيت والماء لا يمتزجان. عندما تكون زيتاً في عالم من الماء، ستنفصل بشكل طبيعي. لا تقاوم ذلك. لا تخفف نفسك لتندمج. دع نفسك ترتفع.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Legacy Question", "سؤال الإرث")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Ordinary will never build a legacy. Ever. The monuments, the movements, the transformations—they all come from people who refused to settle, who chose the exceptional path.", "العادي لن يبني إرثاً أبداً. النصب التذكارية والحركات والتحولات — كلها أتت من أشخاص رفضوا القبول بالأقل، اختاروا المسار الاستثنائي. والحضارة الإسلامية نفسها بُنيت على أيدي استثنائيين رفضوا العادي — من الخوارزمي الذي اخترع الجبر، إلى ابن النفيس الذي اكتشف الدورة الدموية الصغرى، لم يكن أحد منهم راضياً بأن يكون عادياً.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("What do you want to leave behind? What impact do you want to make? What version of yourself do you want to have become?", "ماذا تريد أن تترك خلفك؟ ما الأثر الذي تريد أن تصنعه؟ أي نسخة من نفسك تريد أن تصبح؟")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("These questions can't be answered from an ordinary mindset. They require you to step into the exceptional—to accept the costs, the loneliness, the different life that comes with choosing to be more.", "لا يمكن الإجابة على هذه الأسئلة بعقلية عادية. إنها تتطلب منك أن تخطو نحو الاستثنائية — أن تقبل التكلفة والوحدة والحياة المختلفة التي تأتي مع اختيار أن تكون أكثر.")}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText("\"The ordinary will never build a legacy. Ever. To leave something behind, you must become something exceptional.\"", "\"العادي لن يبني إرثاً أبداً. لتترك شيئاً خلفك، يجب أن تصبح شيئاً استثنائياً.\"")}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Choosing Your Path", "اختيار مسارك")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("There's no judgment in choosing ordinary. Many people live good, meaningful, happy lives without being exceptional. That's a valid choice.", "لا إدانة في اختيار العادي. كثير من الناس يعيشون حياة جيدة وذات معنى وسعيدة دون أن يكونوا استثنائيين. هذا خيار صالح.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("But if you feel called to something more—if you can't shake the sense that you're meant for a different path—don't ignore that call. It's not vanity. It's not delusion. It's your exceptional self trying to emerge.", "لكن إذا شعرت بأنك مدعو لشيء أكبر — إذا لم تستطع التخلص من الإحساس بأنك خُلقت لمسار مختلف — لا تتجاهل ذلك النداء. ليس غروراً. ليس وهماً. إنه ذاتك الاستثنائية تحاول أن تبرز.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The question isn't whether you're capable of being exceptional. Everyone has that capacity. The question is whether you're willing to pay the price—live the different life, stand apart, reject the ordinary path.", "السؤال ليس ما إذا كنت قادراً على الاستثنائية. كل شخص يمتلك هذه القدرة. السؤال هو ما إذا كنت مستعداً لدفع الثمن — أن تعيش الحياة المختلفة، أن تقف منفرداً، أن ترفض المسار العادي.")}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">{getText("The Key Insight", "الفكرة المفتاحية")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText("You can't be exceptional while living ordinary. You can't stand out while fitting in. You can't build legacy while following the crowd. Becoming exceptional isn't about being better—it's about being different enough to matter.", "لا يمكنك أن تكون استثنائياً بينما تعيش عادياً. لا يمكنك أن تبرز بينما تندمج. لا يمكنك أن تبني إرثاً بينما تتبع القطيع. أن تصبح استثنائياً ليس حول أن تكون أفضل — بل حول أن تكون مختلفاً بما يكفي ليكون لك أثر.")}
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleReferences slug="becoming-exceptional" />

      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="coach" />

      <ArticleNavigation currentSlug="becoming-exceptional" />

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

