'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Zap, Target, Rocket } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "physics-of-momentum", title: "The Physics of Momentum", readTime: "8 min read" },
  { slug: "ten-minute-block-system", title: "The 10-Minute Block System", readTime: "9 min read" },
  { slug: "inversion-thinking", title: "Inversion Thinking", readTime: "8 min read" }
];

export default function SpeedAsStrategyArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Execution
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Speed as Strategy: The Execution Edge
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
              Speed is the one trait that separates the top 1% from everyone else. 
              Not intelligence. Not resources. Not talent. Just speed of execution 
              after a decision is made.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Most people think success requires being smart, having money, or knowing 
              the right people. But there&apos;s something even more fundamental: the 
              ability to turn ideas into reality fast.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Gap Between Idea and Reality
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Power—in business and in life—lives in the gap between ideas and reality. 
              Every day an idea sits unexecuted is a day it loses potential. Every hour 
              spent &quot;getting ready&quot; is an hour someone else is taking action.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;The difference in power, as I understand it, is the gap between ideas 
                becoming reality. The closer we get to closing that gap, the more powerful 
                and effective we become.&quot;
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              This isn&apos;t about rushing. It&apos;s about recognizing that execution is 
              where value is created. A mediocre idea executed today beats a perfect 
              idea executed next month.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Problem with Slow
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Consider this scenario: You need a website. The agency says it will take 
              two weeks. But you know that in two weeks, you could learn web design 
              from scratch and build it yourself.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              So why does the expert need two weeks? Why is everyone so slow?
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The answer reveals something important about modern work: most delays 
              are artificial. They&apos;re created by unnecessary processes, fear of 
              shipping imperfect work, and a culture that treats speed as suspicious.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">The Speed Reality Check</h3>
              <p className="text-slate-600 mb-4">
                When someone says something will take a week, ask: &quot;What&apos;s stopping 
                us from doing this in a day?&quot; Often, the answer reveals that most of 
                the &quot;time required&quot; is just padding and process.
              </p>
              <p className="text-slate-600">
                If you can accomplish by end of day what you planned for end of week, 
                you&apos;ve just accelerated your progress by 7x.
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Speed vs. Quality
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The biggest objection to speed is quality. People think fast means sloppy. 
              But speed and quality aren&apos;t opposites—they&apos;re partners.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Fast execution means faster feedback. Faster feedback means faster 
              improvement. Faster improvement means better quality sooner.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The person who ships in a day and iterates three times in a week ends 
              up with a better product than the person who spends a week trying to 
              ship something perfect.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Day 1</h3>
                  <p className="text-sm text-slate-600">Ship the first version</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Day 3</h3>
                  <p className="text-sm text-slate-600">Iterate based on feedback</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Rocket className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Day 7</h3>
                  <p className="text-sm text-slate-600">Version 4 is excellent</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Speed Mindset
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Speed isn&apos;t just a tactic—it&apos;s an identity. The person who identifies 
              as fast acts fast. The person who identifies as thorough acts slow. 
              Both are self-fulfilling.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              To become faster, start by challenging every timeline you create:
            </p>

            <ul className="space-y-3 text-slate-600 my-6">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                <span>When you say &quot;I&apos;ll do this by end of week,&quot; ask: &quot;Can I do it today?&quot;</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                <span>When someone says it will take time, ask: &quot;What&apos;s the fastest path?&quot;</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                <span>When you feel resistance to shipping, ship anyway and iterate.</span>
              </li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The 7x Acceleration
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Here&apos;s the math that changes everything: If you can accomplish in one 
              day what you planned for one week, you&apos;ve just accelerated your 
              trajectory by 7 times.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Over a year, that&apos;s not just progress—that&apos;s a different life entirely. 
              The person executing at 7x speed isn&apos;t just ahead. They&apos;re in a 
              completely different game.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Speed is your competitive advantage. Most people won&apos;t even try to be 
              fast. They&apos;ll accept slow as normal. They&apos;ll defend their timelines. 
              They&apos;ll resist the pressure to ship.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Rocket className="h-5 w-5" />
              <span className="font-semibold">The Key Insight</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Speed isn&apos;t about being busy. It&apos;s about closing the gap between idea 
              and reality. The faster you close that gap, the more powerful you become. 
              In a world of slow movers, speed is everything.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="speed-as-strategy" />

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
              Execute Your Transformation
            </h2>
            <p className="text-slate-300 mb-6">
              Get the tools to close the gap between who you are and who you want to be.
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
