'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

// All articles in order
const allArticles = [
  // App Articles
  { slug: "identity-gap-assessment", title: "The Identity Gap Assessment: Discover What's Holding You Back", category: "FREE App" },
  { slug: "values-clarification-tool", title: "Values Clarification Tool: Find What Truly Matters", category: "FREE App" },
  { slug: "daily-reflection-practice", title: "Daily Reflection Practice: The Science of Self-Transformation", category: "FREE App" },
  { slug: "identity-recode-system-guide", title: "Identity Recode System: Complete 30-Day Transformation", category: "BASIC App" },
  { slug: "ai-identity-coach-guide", title: "AI Identity Coach: Your Personal Transformation Guide", category: "BUNDLE App" },
  
  // Worksheet Articles
  { slug: "who-am-i-worksheet", title: "Who Am I Worksheet: The Complete Identity Exploration", category: "Worksheet" },
  { slug: "identity-based-habits-worksheet", title: "Identity-Based Habits Worksheet: James Clear's Method", category: "Worksheet" },
  { slug: "self-authorship-worksheet", title: "Self-Authorship Worksheet: Your Internal Voice Journey", category: "Worksheet" },
  { slug: "identity-baseline-8d-worksheet", title: "Identity Baseline 8D: Holistic Self-Assessment", category: "Worksheet" },
  { slug: "environmental-audit-worksheet", title: "Environmental Audit Worksheet: Design Your Growth Space", category: "Worksheet" },
  { slug: "erq-emotional-regulation-worksheet", title: "ERQ Emotional Regulation: Master Your Inner World", category: "Worksheet" },
  
  // Philosophy Articles
  { slug: "physics-of-momentum", title: "The Physics of Momentum: Why 18 Minutes Changes Everything", category: "Identity Shift" },
  { slug: "magic-in-work-you-avoid", title: "The Magic Is in the Work You Avoid", category: "Transformation" },
  { slug: "identity-millionaire", title: "The Identity Millionaire: Building Wealth Through Self-Transformation", category: "Wealth & Identity" },
  { slug: "all-in-or-nothing", title: "All In or Nothing: The Power of Full Commitment", category: "Commitment" },
  { slug: "five-steps-to-miracles", title: "Five Steps to Miracles: A Framework for Identity Liberation", category: "Self-Liberation" },
  { slug: "inversion-thinking", title: "Inversion Thinking: How to Win by Avoiding Failure", category: "Strategy" },
  { slug: "speed-as-strategy", title: "Speed as Strategy: The Execution Edge", category: "Execution" },
  { slug: "ten-minute-block-system", title: "The 10-Minute Block System: Breaking Through Every Obstacle", category: "Productivity" },
  { slug: "work-on-yourself", title: "Work on Yourself: The Psycho-Cybernetics of Identity", category: "Self-Image" },
  { slug: "becoming-exceptional", title: "Becoming Exceptional: Why Ordinary Can Never Build Legacy", category: "Excellence" },
  { slug: "dopamine-reset", title: "The 24-Hour Dopamine Reset: Reclaiming Your Focus", category: "Mental Clarity" },
];

interface ArticleNavigationProps {
  currentSlug: string;
}

export function ArticleNavigation({ currentSlug }: ArticleNavigationProps) {
  const currentIndex = allArticles.findIndex(article => article.slug === currentSlug);
  
  if (currentIndex === -1) return null;
  
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back to Blog Link */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-slate-500 hover:text-accent transition-colors mb-8 text-sm"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Back to All Articles
          </Link>
          
          {/* Navigation Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link href={`/blog/${prevArticle.slug}`}>
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group bg-white">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <ArrowLeft className="h-5 w-5 text-accent group-hover:-translate-x-1 transition-transform" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Previous Article</p>
                        <h4 className="font-medium text-primary text-sm leading-snug group-hover:text-accent transition-colors line-clamp-2">
                          {prevArticle.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">{prevArticle.category}</p>
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
                        <p className="text-xs text-slate-500 mb-1">Next Article</p>
                        <h4 className="font-medium text-primary text-sm leading-snug group-hover:text-accent transition-colors line-clamp-2">
                          {nextArticle.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">{nextArticle.category}</p>
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        <ArrowRight className="h-5 w-5 text-accent group-hover:translate-x-1 transition-transform" />
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
                <Button variant="outline" className="w-full justify-start">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous: {prevArticle.title}
                </Button>
              </Link>
            )}
            {nextArticle && (
              <Link href={`/blog/${nextArticle.slug}`}>
                <Button variant="outline" className="w-full justify-end">
                  Next: {nextArticle.title}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
