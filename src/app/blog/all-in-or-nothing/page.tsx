'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "magic-in-work-you-avoid", title: "The Magic in Work You Avoid", readTime: "6 min read" },
  { slug: "five-steps-to-miracles", title: "Five Steps to Miracles", readTime: "10 min read" },
  { slug: "becoming-exceptional", title: "Becoming Exceptional", readTime: "8 min read" }
];

export default function AllInOrNothingArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Commitment
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              All In or Nothing: The Power of Full Commitment
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                7 min read
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
              &quot;If you&apos;re going to do it, do it. Say what you can do, and do what you say. 
              If you can&apos;t do it, don&apos;t say you can.&quot;
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Half-effort is the most expensive mistake you can make. Not because it fails—but 
              because it leaves you uncertain. When you go all in, you get an answer. When you 
              hold back, you get questions.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Problem with Half-Measures
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              When you approach something with half commitment, something strange happens. 
              You don&apos;t know if you failed because it wasn&apos;t possible or because you 
              didn&apos;t really try. You don&apos;t know if you succeeded despite your hesitation 
              or because of your talent.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;When you do something with half effort, you simply don&apos;t know if you failed 
                or succeeded, got what you wanted or didn&apos;t get what you wanted. This keeps 
                many of us awake at night.&quot;
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              This uncertainty is corrosive. It erodes trust in yourself. Each half-attempt 
              adds to a growing database of &quot;I don&apos;t know if I can&quot; evidence.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Clarity of Full Commitment
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Full commitment changes everything. When you go all in—when you commit 
              completely—you get answers:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">If You Succeed</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    You know it was real. You know your capabilities. 
                    You have evidence of what&apos;s possible.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="h-5 w-5 text-secondary" />
                    <h3 className="font-semibold text-primary">If You Fail</h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    You know it wasn&apos;t for you. You get to walk away clean. 
                    You discover what&apos;s truly yours.
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              Either way, you discover something true. And truth—even painful truth—is 
              infinitely more valuable than the limbo of half-commitment.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Dip-Your-Toe Trap
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Many people think they&apos;re being smart by testing the waters. They say 
              &quot;I think I&apos;ll try it&quot; and put in partial effort. They call it being 
              cautious or pragmatic.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              But here&apos;s the truth: thinking about trying is fine. Considering options 
              is wise. But when you decide to go—go. Don&apos;t jump in and then dip your toe. 
              Dive. Finish it. Discover.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">The Commitment Protocol</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span>Think before you commit. Weigh the costs. Consider the path.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span>When you commit, commit fully. No hedging. No backup plans draining energy.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span>See it through to completion. Either succeed or fail completely.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span>Learn from the result. Either way, you have valuable data.</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Identity Transformation
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Going all in does something to your identity. Each full commitment proves 
              to yourself that you&apos;re someone who follows through. Someone who keeps 
              their word. Someone who can be trusted.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Half-efforts do the opposite. Each one adds to a growing sense of 
              &quot;I can&apos;t trust myself.&quot; Each broken commitment—to yourself or others—erodes 
              the foundation of your identity.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The person who goes all in becomes someone who goes all in. 
              The person who hedges becomes someone who hedges. These identities 
              compound over time, creating vastly different life trajectories.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              What &quot;All In&quot; Really Means
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Going all in doesn&apos;t mean being reckless. It doesn&apos;t mean betting 
              everything on a single moment. It means giving your complete attention 
              and effort to whatever you&apos;ve decided to do.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              It means being willing to look in the mirror afterward and say, 
              &quot;I gave everything I had.&quot; It means preferring clear failure over 
              uncertain success. It means choosing truth over comfort.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;The discovery and looking in the mirror and saying, I didn&apos;t do that 
                with half effort, I went all the way—I discovered this isn&apos;t for me, 
                or I discovered and you&apos;re absolutely right, this IS for me. 
                That&apos;s a great place to arrive at.&quot;
              </p>
            </div>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">The Key Insight</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              The cost of half-effort isn&apos;t just failure. It&apos;s the endless loop of 
              &quot;what if&quot; that follows you. Full commitment buys you something priceless: 
              clarity. Whether you win or lose, you&apos;ll know. And knowing is the beginning 
              of everything.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="all-in-or-nothing" />

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
              Commit to Your Transformation
            </h2>
            <p className="text-slate-300 mb-6">
              Go all in on becoming who you were meant to be.
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
