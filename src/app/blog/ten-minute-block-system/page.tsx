'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Brain, Sparkles, Zap, Target, CheckCircle } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "physics-of-momentum", title: "The Physics of Momentum", readTime: "8 min read" },
  { slug: "dopamine-reset", title: "The 24-Hour Dopamine Reset", readTime: "12 min read" },
  { slug: "speed-as-strategy", title: "Speed as Strategy", readTime: "7 min read" }
];

export default function TenMinuteBlockSystemArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Productivity
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              The 10-Minute Block System: Breaking Through Every Obstacle
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                9 min read
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Tamkinly Team
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
              What if the one thing you need to overcome obstacles and make faster 
              progress than 99% of people is a simple 10-minute daily system?
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This system took its creator from a cycle of burnout and procrastination 
              to building a portfolio of online businesses—working just four hours a day 
              from anywhere in the world.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Five-Step Framework
            </h2>

            <div className="space-y-6 my-8">
              {/* Step 1 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">2 Minutes</Badge>
                        <h3 className="font-semibold text-primary">Mental Purge</h3>
                      </div>
                      <p className="text-slate-600 mb-2">
                        Write down everything causing mental noise. Every incomplete task, 
                        every thought looping in your head—get it all on paper.
                      </p>
                      <p className="text-sm text-slate-500">
                        Your brain treats starting as the hardest part. Once you&apos;ve purged 
                        the noise, you create space for clarity.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">2 Minutes</Badge>
                        <h3 className="font-semibold text-primary">Momentum Multiplier</h3>
                      </div>
                      <p className="text-slate-600 mb-2">
                        Focus on one small win. Jerry Seinfeld wrote just one joke a day. 
                        After 10-20 years, his net worth exceeded $1.1 billion.
                      </p>
                      <p className="text-sm text-slate-500">
                        Big numbers come from small daily actions. What&apos;s the smallest 
                        action you can take today toward your goal?
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">1 Minute</Badge>
                        <h3 className="font-semibold text-primary">Discomfort Challenge</h3>
                      </div>
                      <p className="text-slate-600 mb-2">
                        Use the 5-second rule. When you think of something you need to do, 
                        count down: 5, 4, 3, 2, 1—then take the smallest possible action.
                      </p>
                      <p className="text-sm text-slate-500">
                        A messy first action is better than a perfect action that never happens. 
                        You were running from discomfort, but the discomfort was blocking your success.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-secondary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">2 Minutes</Badge>
                        <h3 className="font-semibold text-primary">Messy Launch Protocol</h3>
                      </div>
                      <p className="text-slate-600 mb-2">
                        Launch at 70% ready. If you&apos;re not embarrassed by your first version, 
                        you probably launched too late.
                      </p>
                      <p className="text-sm text-slate-500">
                        The Founder OS was written at 70%. It had six modules and a community. 
                        47 sales in one day. Then iterate based on feedback. Speed is your advantage.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 5 */}
              <Card className="border-0 shadow-sm border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">3 Minutes</Badge>
                        <h3 className="font-semibold text-primary">Single Domino Decision</h3>
                      </div>
                      <p className="text-slate-600 mb-2">
                        If you&apos;re stuck, it&apos;s often because you&apos;re trying to do too many things 
                        at once. What&apos;s the ONE thing that would move everything forward?
                      </p>
                      <p className="text-sm text-slate-500">
                        Imagine every second is a domino. Line them up right, and one domino 
                        today can trigger unstoppable momentum.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why This Works
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The power of this system isn&apos;t in the individual steps—it&apos;s in the 
              compounding effect. Each element builds on the previous:
            </p>

            <ul className="space-y-3 text-slate-600 my-6">
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Purging</strong> creates mental space</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Small wins</strong> build momentum</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Discomfort challenges</strong> break resistance</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Messy launches</strong> accelerate learning</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Single focus</strong> maximizes impact</span>
              </li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Identity Connection
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              This system doesn&apos;t just change what you do—it changes who you are. 
              Each day you follow it, you become someone who:
            </p>

            <ul className="space-y-2 text-slate-600 my-6">
              <li>• Clears mental clutter instead of carrying it</li>
              <li>• Builds momentum instead of waiting for motivation</li>
              <li>• Faces discomfort instead of avoiding it</li>
              <li>• Ships instead of perfecting</li>
              <li>• Focuses instead of scattering</li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              The identity shift happens through action. You can&apos;t think your way 
              into being someone different. You have to act differently—consistently—until 
              the new identity becomes natural.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;Action defeats anxiety. A messy first action today beats a perfect 
                action next year. You don&apos;t need more discipline—you need a system 
                that makes starting easy.&quot;
              </p>
            </div>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Your 10-Minute Practice</h3>
              <p className="text-slate-600 mb-4">Tomorrow morning, try this:</p>
              <ol className="space-y-2 text-slate-600">
                <li><strong>2 min:</strong> Write down every thought causing noise</li>
                <li><strong>2 min:</strong> Pick one small win and complete it</li>
                <li><strong>1 min:</strong> Use the 5-4-3-2-1 countdown for a hard task</li>
                <li><strong>2 min:</strong> Launch something at 70%</li>
                <li><strong>3 min:</strong> Identify your single most important domino</li>
              </ol>
            </div>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">The Key Insight</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Ten minutes a day won&apos;t change your life overnight. But it will 
              change who you are—day by day, action by action. The person who follows 
              this system for a year isn&apos;t the same person who started. They&apos;re 
              someone who&apos;s learned to overcome every obstacle, one 10-minute block at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="ten-minute-block-system" />

      {/* Related Articles */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold text-primary mb-6">Related Articles</h3>
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Build Your Transformation System
            </h2>
            <p className="text-slate-300 mb-6">
              Get the frameworks to overcome obstacles and become who you&apos;re meant to be.
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
