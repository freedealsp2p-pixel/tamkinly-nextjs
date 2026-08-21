'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { useLocale } from '@/components/providers/LocaleProvider';

// All articles in order
const allArticles = [
  // App Articles
  { slug: "identity-gap-assessment", title: "The Identity Gap Assessment: Discover What's Holding You Back", titleAr: "تقييم فجوة الهوية: اكتشف ما يعيقك", category: "FREE App", categoryAr: "تطبيق مجاني" },
  { slug: "values-clarification-tool", title: "Values Clarification Tool: Find What Truly Matters", titleAr: "أداة توضيح القيم: اكتشف ما يهم حقاً", category: "FREE App", categoryAr: "تطبيق مجاني" },
  { slug: "daily-reflection-practice", title: "Daily Reflection Practice: The Science of Self-Transformation", titleAr: "ممارسة التأمل اليومي: علم التحول الذاتي", category: "FREE App", categoryAr: "تطبيق مجاني" },
  { slug: "identity-recode-system-guide", title: "Identity Recode System: Complete 30-Day Transformation", titleAr: "نظام إعادة صياغة الهوية: تحول كامل في 30 يوم", category: "BASIC App", categoryAr: "تطبيق أساسي" },
  { slug: "ai-identity-coach-guide", title: "AI Identity Coach: Your Personal Transformation Guide", titleAr: "مدرب الهوية بالذكاء الاصطناعي: دليلك الشخصي للتحول", category: "MASTERY App", categoryAr: "تطبيق الإتقان" },

  // Worksheet Articles
  { slug: "who-am-i-worksheet", title: "Who Am I Worksheet: The Complete Identity Exploration", titleAr: "ورقة عمل من أنا: الاستكشاف الكامل للهوية", category: "Worksheet", categoryAr: "ورقة عمل" },
  { slug: "identity-based-habits-worksheet", title: "Identity-Based Habits Worksheet: James Clear's Method", titleAr: "ورقة عمل العادات المبنية على الهوية: طريقة جيمس كلير", category: "Worksheet", categoryAr: "ورقة عمل" },
  { slug: "self-authorship-worksheet", title: "Self-Authorship Worksheet: Your Internal Voice Journey", titleAr: "ورقة عمل تأليف الذات: رحلة صوتك الداخلي", category: "Worksheet", categoryAr: "ورقة عمل" },
  { slug: "identity-baseline-8d-worksheet", title: "Identity Baseline 8D: Holistic Self-Assessment", titleAr: "خط الأساس 8D: تقييم ذاتي شامل", category: "Worksheet", categoryAr: "ورقة عمل" },
  { slug: "environmental-audit-worksheet", title: "Environmental Audit Worksheet: Design Your Growth Space", titleAr: "ورقة عمل التدقيق البيئي: صمم مساحة نموك", category: "Worksheet", categoryAr: "ورقة عمل" },
  { slug: "erq-emotional-regulation-worksheet", title: "ERQ Emotional Regulation: Master Your Inner World", titleAr: "التنظيم العاطفي ERQ: أتقن عالمك الداخلي", category: "Worksheet", categoryAr: "ورقة عمل" },

  // Philosophy Articles
  { slug: "physics-of-momentum", title: "The Physics of Momentum: Why 18 Minutes Changes Everything", titleAr: "فيزياء الزخم: لماذا تغير 18 دقيقة كل شيء", category: "Identity Shift", categoryAr: "تحول الهوية" },
  { slug: "magic-in-work-you-avoid", title: "The Magic Is in the Work You Avoid", titleAr: "السحر في العمل الذي تتجنبه", category: "Transformation", categoryAr: "التحول" },
  { slug: "identity-millionaire", title: "The Identity Millionaire: Building Wealth Through Self-Transformation", titleAr: "المليونير الهوية: بناء الثروة من خلال التحول الذاتي", category: "Wealth & Identity", categoryAr: "الثروة والهوية" },
  { slug: "all-in-or-nothing", title: "All In or Nothing: The Power of Full Commitment", titleAr: "كل شيء أو لا شيء: قوة الالتزام الكامل", category: "Commitment", categoryAr: "الالتزام" },
  { slug: "five-steps-to-miracles", title: "Five Steps to Miracles: A Framework for Identity Liberation", titleAr: "خمس خطوات نحو المعجزات: إطار لتحرير الهوية", category: "Self-Liberation", categoryAr: "التحرر الذاتي" },
  { slug: "inversion-thinking", title: "Inversion Thinking: How to Win by Avoiding Failure", titleAr: "التفكير العكسي: كيف تفوز بتجنب الفشل", category: "Strategy", categoryAr: "الاستراتيجية" },
  { slug: "speed-as-strategy", title: "Speed as Strategy: The Execution Edge", titleAr: "السرعة كاستراتيجية: ميزة التنفيذ", category: "Execution", categoryAr: "التنفيذ" },
  { slug: "ten-minute-block-system", title: "The 10-Minute Block System: Breaking Through Every Obstacle", titleAr: "نظام الكتل العشر دقائق: اختراق كل عقبة", category: "Productivity", categoryAr: "الإنتاجية" },
  { slug: "work-on-yourself", title: "Work on Yourself: The Psycho-Cybernetics of Identity", titleAr: "اعمل على نفسك: السايبرنيتيكا النفسية للهوية", category: "Self-Image", categoryAr: "الصورة الذاتية" },
  { slug: "becoming-exceptional", title: "Becoming Exceptional: Why Ordinary Can Never Build Legacy", titleAr: "التحول لاستثنائي: لماذا لا يمكن للعادي بناء إرث", category: "Excellence", categoryAr: "التميز" },
  { slug: "dopamine-reset", title: "The 24-Hour Dopamine Reset: Reclaiming Your Focus", titleAr: "إعادة ضبط الدوبامين في 24 ساعة: استعد تركيزك", category: "Mental Clarity", categoryAr: "الوضوح الذهني" },
];

interface ArticleNavigationProps {
  currentSlug: string;
}

export function ArticleNavigation({ currentSlug }: ArticleNavigationProps) {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const isAr = locale === 'ar';

  const currentIndex = allArticles.findIndex(article => article.slug === currentSlug);

  if (currentIndex === -1) return null;

  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Helpers for localized title/category
  const getTitle = (article: typeof allArticles[number]) => isAr ? article.titleAr : article.title;
  const getCategory = (article: typeof allArticles[number]) => isAr ? article.categoryAr : article.category;

  // In RTL: swap arrow directions (Previous uses ArrowRight, Next uses ArrowLeft)
  const PrevArrow = isAr ? ArrowRight : ArrowLeft;
  const NextArrow = isAr ? ArrowLeft : ArrowRight;
  const prevHoverClass = isAr ? "group-hover:translate-x-1" : "group-hover:-translate-x-1";
  const nextHoverClass = isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1";

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-100" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back to Blog Link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-slate-500 hover:text-accent transition-colors mb-8 text-sm"
          >
            <BookOpen className={`h-4 w-4 ${isAr ? 'ml-2' : 'mr-2'}`} />
            {getText("Back to All Articles", "العودة لجميع المقالات")}
          </Link>

          {/* Navigation Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link href={`/blog/${prevArticle.slug}`}>
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <PrevArrow className={`h-5 w-5 text-accent transition-transform ${prevHoverClass}`} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">{getText("Previous Article", "المقال السابق")}</p>
                        <h4 className="font-medium text-primary text-sm leading-snug group-hover:text-accent transition-colors line-clamp-2">
                          {getTitle(prevArticle)}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">{getCategory(prevArticle)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}

            {nextArticle ? (
              <Link href={`/blog/${nextArticle.slug}`}>
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 justify-end text-right">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">{getText("Next Article", "المقال التالي")}</p>
                        <h4 className="font-medium text-primary text-sm leading-snug group-hover:text-accent transition-colors line-clamp-2">
                          {getTitle(nextArticle)}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">{getCategory(nextArticle)}</p>
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        <NextArrow className={`h-5 w-5 text-accent transition-transform ${nextHoverClass}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>

          {/* Mobile: Show only available buttons */}
          <div className="flex flex-col gap-3 md:hidden">
            {prevArticle && (
              <Link href={`/blog/${prevArticle.slug}`}>
                <Button variant="outline" className={`w-full ${isAr ? 'justify-end' : 'justify-start'}`}>
                  {isAr ? (
                    <>
                      {getText("Previous", "السابق")}: {getTitle(prevArticle)}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {getText("Previous", "السابق")}: {getTitle(prevArticle)}
                    </>
                  )}
                </Button>
              </Link>
            )}
            {nextArticle && (
              <Link href={`/blog/${nextArticle.slug}`}>
                <Button variant="outline" className={`w-full ${isAr ? 'justify-start' : 'justify-end'}`}>
                  {isAr ? (
                    <>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {getText("Next", "التالي")}: {getTitle(nextArticle)}
                    </>
                  ) : (
                    <>
                      {getText("Next", "التالي")}: {getTitle(nextArticle)}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
