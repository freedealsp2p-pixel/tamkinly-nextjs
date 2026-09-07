'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, TrendingUp, DollarSign, Target, Award } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';

export default function IdentityMillionaireArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "work-on-yourself", title: getText("Work on Yourself: Psycho-Cybernetics", "اعمل على نفسك: السيبرانية النفسية للهوية"), readTime: getText("10 min read", "١٠ دقائق قراءة") },
    { slug: "becoming-exceptional", title: getText("Becoming Exceptional", "أن تصبح استثنائياً"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "inversion-thinking", title: getText("Inversion Thinking", "التفكير العكسي"), readTime: getText("8 min read", "٨ دقائق قراءة") }
  ];

  return (
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Wealth & Identity", "الثروة والهوية")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The Identity Millionaire: Building Wealth Through Self-Transformation", "المليونير بالهوية: بناء الثروة من خلال تحول الذات")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("9 min read", "٩ دقائق قراءة")}
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
              {getText("True wealth doesn't start with a strategy. It starts with an identity. The millionaire mindset isn't about money—it's about becoming the person capable of creating and holding wealth.", "الثروة الحقيقية لا تبدأ باستراتيجية. بل تبدأ بهوية. عقلية المليونير لا تتعلق بالمال — بل تتعلق بأن تصبح الشخص القادر على خلق الثروة والاحتفاظ بها.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Consider the concept of the \"virtual millionaire\"—someone who has achieved financial freedom through identity transformation, not just accumulation. The path to wealth reveals itself in stages, each requiring a different version of yourself.", "تأمل مفهوم \"المليونير الافتراضي\" — شخص حقق الحرية المالية من خلال تحول الهوية، وليس فقط التراكم. يكشف طريق الثروة عن نفسه على مراحل، كل منها يتطلب نسخة مختلفة منك.")}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Three Stages of Wealth Identity", "المراحل الثلاث لهوية الثروة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Most people chase wealth without understanding that each level requires a different identity. Here's the framework that changes everything:", "معظم الناس يطاردون الثروة دون فهم أن كل مستوى يتطلب هوية مختلفة. إليك الإطار الذي يغير كل شيء:")}
            </p>

            <div className="space-y-6 my-8">
              <Card className="border-0 shadow-sm border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">{getText("Stage One", "المرحلة الأولى")}</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">{getText("Cash Flow Millionaire", "مليونير التدفق النقدي")}</h3>
                      <p className="text-slate-600">
                        {getText("This is the first threshold—generating consistent monthly income that exceeds your needs. For many, this begins at $5,000/month. The identity shift here is profound: you stop being someone who trades time for money and become someone who creates value that generates income.", "هذا هو الحد الأول — توليد دخل شهري ثابت يتجاوز احتياجاتك. بالنسبة للكثيرين، يبدأ هذا عند ٥,٠٠٠ دولار شهرياً. التحول في الهوية هنا عميق: تتوقف عن كونك شخصاً يبادل الوقت بالمال وتصبح شخصاً يخلق قيمة تولد الدخل.")}
                      </p>
                      <p className="text-slate-600 mt-2">
                        <strong>{getText("Identity Question:", "سؤال الهوية:")}</strong> {getText("Do you see yourself as someone who can create independent income streams?", "هل ترى نفسك شخصاً قادراً على خلق مصادر دخل مستقلة؟")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">{getText("Stage Two", "المرحلة الثانية")}</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">{getText("Liquidity Millionaire", "مليونير السيولة")}</h3>
                      <p className="text-slate-600">
                        {getText("This stage is about accumulated accessible wealth—the ability to make moves without constraint. The identity shift here involves becoming someone who can hold and manage substantial resources, not just generate them.", "هذه المرحلة تتعلق بالثروة المتراكمة المتاحة — القدرة على التحرك بلا قيود. التحول في الهوية هنا يتضمن أن تصبح شخصاً قادراً على الاحتفاظ بالموارد الكبيرة وإدارتها، وليس فقط توليدها.")}
                      </p>
                      <p className="text-slate-600 mt-2">
                        <strong>{getText("Identity Question:", "سؤال الهوية:")}</strong> {getText("Do you see yourself as someone capable of managing and growing significant wealth?", "هل ترى نفسك شخصاً قادراً على إدارة وتنمية ثروة كبيرة؟")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">{getText("Stage Three", "المرحلة الثالثة")}</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">{getText("Asset Millionaire", "مليونير الأصول")}</h3>
                      <p className="text-slate-600">
                        {getText("The highest form—owning assets that generate wealth independently. Real estate, businesses, investments that work without your direct involvement. The identity here is complete: you become someone who builds systems, not just does work.", "أعلى صورة — امتلاك أصول تولد الثروة بشكل مستقل. عقارات، أعمال تجارية، استثمارات تعمل دون تدخلك المباشر. الهوية هنا مكتملة: تصبح شخصاً يبني أنظمة، وليس فقط شخصاً يعمل.")}
                      </p>
                      <p className="text-slate-600 mt-2">
                        <strong>{getText("Identity Question:", "سؤال الهوية:")}</strong> {getText("Do you see yourself as someone who builds systems and assets, or someone who just works?", "هل ترى نفسك شخصاً يبني أنظمة وأصولاً، أم شخصاً يعمل فقط؟")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why Most People Stay Stuck", "لماذا يبقى معظم الناس عالقين")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Here's what's fascinating: most people skip the first stage entirely. They try to jump straight to liquidity or assets without ever building the identity of someone who generates consistent cash flow.", "إليك ما هو مثير: معظم الناس يتخطون المرحلة الأولى تماماً. يحاولون القفز مباشرة إلى السيولة أو الأصول دون بناء هوية شخص يولد تدفقاً نقدياً ثابتاً.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("It's like trying to run a marathon without ever learning to walk. Each stage builds the identity muscles needed for the next. The person who can't generate $5,000/month independently isn't ready to manage millions—they haven't developed the identity to hold it.", "الأمر مثل محاولة ركض ماراثون دون تعلم المشي أبداً. كل مرحلة تبني عضلات الهوية المطلوبة للمرحلة التالية. الشخص الذي لا يستطيع توليد ٥,٠٠٠ دولار شهرياً بشكل مستقل ليس مستعداً لإدارة الملايين — لم يطور الهوية القادرة على الاحتفاظ بها.")}
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                {getText("\"Income doesn't exceed personal development by much.\" — Jim Rohn", "\"الدخل لا يتجاوز التطور الشخصي بكثير.\" — جيم رون")}
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Identity-Wealth Connection", "العلاقة بين الهوية والثروة")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Wealth is attracted, not pursued. When you become the person who can create value, manage resources, and build systems, wealth flows toward you naturally.", "الثروة تُجذب ولا تُطارد. عندما تصبح الشخص القادر على خلق القيمة وإدارة الموارد وبناء الأنظمة، تتدفق الثروة نحوك بشكل طبيعي.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("This isn't manifestation theory. It's practical identity work. The person who identifies as a creator builds differently than someone who identifies as an employee. The person who identifies as an investor thinks differently than someone who identifies as a consumer.", "هذه ليست نظرية تجلي. إنها عمل عملي على الهوية. الشخص الذي يعرّف نفسه كخالق يبني بطريقة مختلفة عمن يعرّف نفسه كموظف. الشخص الذي يعرّف نفسه كمستثمر يفكر بطريقة مختلفة عمن يعرّف نفسه كمستهلك.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Your identity shapes your decisions. Your decisions shape your wealth.", "هويتك تشكل قراراتك. وقراراتك تشكل ثروتك.")}
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">{getText("The Wealth Identity Audit", "تدقيق هوية الثروة")}</h3>
              <p className="text-slate-600 mb-4">{getText("Ask yourself these questions honestly:", "اسأل نفسك هذه الأسئلة بصدق:")}</p>
              <ul className="space-y-2 text-slate-600">
                <li>{getText("• Do I see myself as someone who creates value independently?", "• هل أرى نفسي شخصاً يخلق قيمة بشكل مستقل؟")}</li>
                <li>{getText("• Am I comfortable with money, or do I have tension around it?", "• هل أنا مرتاح مع المال، أم أن لدي توتراً حياله؟")}</li>
                <li>{getText("• Do I think in terms of building assets or earning wages?", "• هل أفكر بمصطلحات بناء الأصول أم كسب الأجور؟")}</li>
                <li>{getText("• Would a wealthy version of me make the decisions I'm making today?", "• هل ستتخذ النسخة الثرية مني القرارات التي أتخذها اليوم؟")}</li>
                <li>{getText("• What identity am I modeling for my future wealth?", "• ما الهوية التي أمثلها لثروتي المستقبلية؟")}</li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Starting Where You Are", "ابدأ من حيث أنت")}
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The good news: you don't need millions to start developing the identity of someone who has millions. You start with the first stage—cash flow.", "الخبر السار: لست بحاجة إلى ملايين لتبدأ في تطوير هوية شخص يملك الملايين. ابدأ بالمرحلة الأولى — التدفق النقدي.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("Can you create $500/month independently? That's the beginning. Each dollar generated outside of employment is evidence of a new identity. Each small success builds the neural pathways for larger ones.", "هل يمكنك خلق ٥٠٠ دولار شهرياً بشكل مستقل؟ هذا هو البداية. كل دولار يُولد خارج الوظيفة هو دليل على هوية جديدة. كل نجاح صغير يبني المسارات العصبية لنجاحات أكبر.")}
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              {getText("The virtual millionaire isn't someone who hit a jackpot. They're someone who transformed their identity one stage at a time.", "المليونير الافتراضي ليس شخصاً ربح الجائزة الكبرى. بل هو شخص حوّل هويته مرحلة تلو الأخرى.")}
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Target className="h-5 w-5" />
              <span className="font-semibold">{getText("The Key Insight", "الفكرة المفتاحية")}</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              {getText("Wealth isn't about the money you accumulate. It's about the person you become in the process. Focus on the identity, and the wealth follows. Focus only on the wealth, and you'll stay stuck at whatever level matches your current identity.", "الثروة ليست في المال الذي تجمعه. بل في الشخص الذي تصبحه في هذه العملية. ركز على الهوية، والثروة تتبع. ركز فقط على الثروة، وستبقى عالقاً عند المستوى الذي يطابق هويتك الحالية.")}
            </p>
          </div>
        </div>
      </section>

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

      {/* Article Navigation */}
      <ArticleReferences slug="identity-millionaire" />

      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />

      <ArticleNavigation currentSlug="identity-millionaire" />
        <BlogConversionSection />
      </article>
  );
}

