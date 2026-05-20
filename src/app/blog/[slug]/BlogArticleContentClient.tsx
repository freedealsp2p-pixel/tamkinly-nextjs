'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Clock, User, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';
import { BlogArticle } from '@/lib/blog-articles';
import { BlogArticleJsonLd } from '@/components/seo/JsonLd';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';
import { ArticleNavigation } from '@/components/blog/ArticleNavigation';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { useLocale } from '@/components/providers/LocaleProvider';

// ============================================
// CLIENT COMPONENT - BILINGUAL RENDERING
// ============================================

export function BlogArticleContentClient({ article }: { article: BlogArticle }) {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => (locale === 'ar' ? ar : en);
  const isAr = locale === 'ar';

  // Localized article data
  const localTitle = getText(article.title, article.titleAr);
  const localDescription = getText(article.description, article.descriptionAr);
  const localCategory = getText(article.category, article.categoryAr);
  const localReadTime = getText(article.readTime, article.readTimeAr);
  const localAuthor = getText(article.author, article.authorAr);

  return (
    <>
      <ReadingProgressBar />
      <article className="min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
        {/* JSON-LD Structured Data for SEO */}
        <BlogArticleJsonLd
          headline={localTitle}
          headlineAr={article.titleAr}
          description={localDescription}
          slug={article.slug}
          datePublished={article.datePublished}
          dateModified={article.dateModified}
          author={article.author}
          keywords={article.keywords}
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Badge
                variant="outline"
                className={`mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10 ${
                  article.tier === 'FREE' ? 'border-green-400/50 text-green-400 bg-green-400/10' :
                  article.tier === 'BASIC' ? 'border-blue-400/50 text-blue-400 bg-blue-400/10' :
                  article.tier === 'BUNDLE' ? 'border-purple-400/50 text-purple-400 bg-purple-400/10' : ''
                }`}
              >
                {localCategory}
              </Badge>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                {localTitle}
              </h1>
              <div className="flex items-center gap-6 text-slate-400 text-sm">
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {localReadTime}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {localAuthor}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Share Bar - Sticky on desktop */}
        <div className="sticky top-16 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 py-3">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {localReadTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {localAuthor}
                </span>
                <span className="hidden sm:inline">{article.datePublished}</span>
              </div>
              <ShareButtons
                url={`https://tamkinly.com/blog/${article.slug}`}
                title={localTitle}
                description={localDescription}
              />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
                {localDescription}
              </p>

              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  `This article explores the science and principles behind ${article.title.toLowerCase()}. Understanding these concepts can significantly accelerate your identity transformation journey.`,
                  `يستكشف هذا المقال العلم والمبادئ وراء ${article.titleAr}. فهم هذه المفاهيم يمكن أن يسرّع بشكل كبير رحلة تحول هويتك.`
                )}
              </p>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText('Key Insights', 'رؤى أساسية')}
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  'At Tamkinly, we believe in evidence-based transformation. This article is part of our comprehensive approach to identity change, combining research-backed methodologies with practical, actionable frameworks.',
                  'في تمكنلي، نؤمن بالتحول المبني على الأدلة. هذا المقال جزء من نهجنا الشامل لتغيير الهوية، يجمع بين المنهجيات المدعومة بالبحث والأطر العملية القابلة للتطبيق.'
                )}
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-10">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Zap className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary mb-2">
                      {getText('Quick Implementation', 'تنفيذ سريع')}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {getText('Apply these concepts in just minutes a day', 'طبّق هذه المفاهيم في دقائق فقط يومياً')}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary mb-2">
                      {getText('Evidence-Based', 'مبني على الأدلة')}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {getText('Grounded in psychology and neuroscience', 'مبني على علم النفس والعلوم العصبية')}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Target className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary mb-2">
                      {getText('Identity-Focused', 'مركز على الهوية')}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {getText('Designed for lasting transformation', 'مصمم لتحول دائم')}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
                {getText('The Transformation Framework', 'إطار التحول')}
              </h2>

              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  'Every article in the Tamkinly blog connects to our core transformation methodology. We focus on three key elements: awareness, action, and identity integration.',
                  'كل مقال في مدونة تمكنلي مرتبط بمنهجية التحول الأساسية لدينا. نركز على ثلاثة عناصر رئيسية: الوعي، والفعل، واندماج الهوية.'
                )}
              </p>

              <div className="bg-primary/5 p-8 rounded-xl my-10">
                <h3 className="font-semibold text-primary mb-4">
                  {getText('Application Steps', 'خطوات التطبيق')}
                </h3>
                <ol className="space-y-3 text-slate-600">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                    <span>{getText('Read and reflect on the key concepts presented', 'اقرأ وتأمل في المفاهيم الرئيسية المعروضة')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                    <span>{getText('Identify one specific area to apply in your life', 'حدد مجالاً محدداً واحداً لتطبيقه في حياتك')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                    <span>{getText('Use our tools to track your progress and evidence', 'استخدم أدواتنا لتتبع تقدمك وأدلتك')}</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                    <span>{getText('Integrate the new behavior into your identity', 'ادمج السلوك الجديد في هويتك')}</span>
                  </li>
                </ol>
              </div>

              <div className="flex items-center gap-2 text-accent mt-12 mb-8">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">{getText('Moving Forward', 'المضي قدماً')}</span>
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">
                {getText(
                  'The journey of identity transformation is ongoing. Each article builds upon the last, creating a comprehensive framework for lasting change. We encourage you to explore related content and use our interactive tools to deepen your practice.',
                  'رحلة تحول الهوية مستمرة. كل مقال يبني على سابقه، مما يخلق إطاراً شاملاً للتغيير الدائم. نشجعك على استكشاف المحتوى ذي الصلة واستخدام أدواتنا التفاعلية لتعميق ممارستك.'
                )}
              </p>

              <p className="text-slate-600 leading-relaxed">
                {getText(
                  'Ready to take the next step? Explore our apps and products designed to support your transformation journey with structured guidance and tracking.',
                  'مستعد للخطوة التالية؟ استكشف تطبيقاتنا ومنتجاتنا المصممة لدعم رحلة تحولك مع إرشاد وتتبع منظم.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Article Navigation */}
        <ArticleNavigation currentSlug={article.slug} />

        {/* CTA Section with Quiz Link */}
        <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
                {getText('Does This Sound Like You?', 'هل هذا يصفك؟')}
              </h2>
              <p className="text-slate-300 mb-6">
                {getText(
                  'Take our free 3-minute Identity Gap Assessment and discover what is holding you back.',
                  'خذ تقييم فجوة الهوية المجاني لـ 3 دقائق واكتشف ما يعيقك.'
                )}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/quiz">
                  <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                    {getText('Start Free Assessment', 'ابدأ التقييم المجاني')}
                    <ArrowRight className={`${isAr ? 'mr-2 rotate-180' : 'ml-2'} h-5 w-5`} />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="white" size="lg" className="px-8 font-semibold">
                    {getText('View Products', 'عرض المنتجات')}
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
