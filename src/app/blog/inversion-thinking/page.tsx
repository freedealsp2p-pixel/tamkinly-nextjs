'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, AlertTriangle, Lightbulb, XCircle, CheckCircle } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "identity-millionaire", title: "The Identity Millionaire", readTime: "9 min read" },
  { slug: "ten-minute-block-system", title: "The 10-Minute Block System", readTime: "9 min read" },
  { slug: "speed-as-strategy", title: "Speed as Strategy", readTime: "7 min read" }
];

export default function InversionThinkingArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Strategy
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Inversion Thinking: How to Win by Avoiding Failure
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                8 min read
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
              &quot;All I want to know is where I&apos;m going to die, so I&apos;ll never go there.&quot; 
              — Charlie Munger
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This single quote from billionaire investor Charlie Munger reveals one of 
              the most powerful thinking frameworks available. While everyone else asks 
              &quot;How do I succeed?&quot; Munger asks &quot;How do I fail?&quot;—then simply avoids doing that.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              It sounds simple. But this inversion principle built two of the most 
              successful investment track records in history. And you don&apos;t need to be 
              the smartest person in the room to use it.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Inversion Principle
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Most failures don&apos;t come from a lack of intelligence or opportunity. 
              They come from obvious, avoidable mistakes: overspending, chasing shiny 
              objects, ignoring what&apos;s working, neglecting relationships, avoiding 
              difficult conversations.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Instead of trying to be brilliant, focus on not being stupid. 
              Instead of chasing success, focus on avoiding failure. 
              The results are often the same—but the approach is far more reliable.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;Instead of asking how to win, ask how to lose—then make sure you 
                don&apos;t do those things.&quot;
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Anti-Goal Exercise
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Here&apos;s how to apply inversion thinking to any area of your life:
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Step 1: Define Failure</h3>
              <p className="text-slate-600 mb-4">
                Instead of writing your goals, write exactly how you would fail:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• How would you go bankrupt?</li>
                <li>• How would you destroy your health?</li>
                <li>• How would you ruin your relationships?</li>
                <li>• How would you ensure you never achieve your dreams?</li>
              </ul>
            </div>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Step 2: Invert the List</h3>
              <p className="text-slate-600 mb-4">
                Take your failure list and avoid every item on it:
              </p>
              <ul className="space-y-2 text-slate-600">
                <li>• To avoid bankruptcy: spend less than you earn, build reserves.</li>
                <li>• To avoid health collapse: move daily, sleep enough, manage stress.</li>
                <li>• To avoid relationship ruin: communicate, show up, apologize.</li>
                <li>• To avoid dream death: take action, persist, stay focused.</li>
              </ul>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              This isn&apos;t about pessimism. It&apos;s about clarity. When you see clearly 
              what leads to failure, the path to success becomes obvious.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Common Failure Patterns
            </h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold text-primary">Financial Failure</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Lifestyle inflation with income</li>
                    <li>• No emergency fund</li>
                    <li>• High-interest debt</li>
                    <li>• No income diversification</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">Financial Safety</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Live below your means</li>
                    <li>• Build 6-month reserves</li>
                    <li>• Eliminate bad debt</li>
                    <li>• Create multiple income streams</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold text-primary">Identity Failure</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Living others&apos; expectations</li>
                    <li>• Never defining your values</li>
                    <li>• Avoiding self-reflection</li>
                    <li>• Blaming circumstances</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">Identity Clarity</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Define who you are</li>
                    <li>• Clarify core values</li>
                    <li>• Regular self-examination</li>
                    <li>• Take radical responsibility</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Applying Inversion to Identity
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Inversion thinking applies beautifully to identity transformation. 
              Instead of asking &quot;How do I become the person I want to be?&quot; ask 
              &quot;What would ensure I stay the person I don&apos;t want to be?&quot;
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The answers are often uncomfortable but clarifying:
            </p>

            <ul className="space-y-3 text-slate-600 my-6">
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>Keep consuming content without taking action</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>Stay in environments that don&apos;t support your growth</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>Neglect the daily practices that build new neural pathways</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>Avoid difficult conversations with yourself</span>
              </li>
              <li className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span>Wait for motivation instead of building discipline</span>
              </li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              Now invert: Do the opposite of each. That&apos;s your transformation plan.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Lightbulb className="h-5 w-5" />
              <span className="font-semibold">The Key Insight</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              You don&apos;t need a perfect plan to succeed. You just need to avoid the 
              obvious ways to fail. Stay away from where you don&apos;t want to end up, 
              and you&apos;ll naturally move toward where you do.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="inversion-thinking" />

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
              Avoid Failure. Achieve Transformation.
            </h2>
            <p className="text-slate-300 mb-6">
              Get the frameworks to see clearly and avoid what&apos;s holding you back.
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
