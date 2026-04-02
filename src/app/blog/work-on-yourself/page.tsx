'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Brain, ScanFace, Sparkles, RefreshCw } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "identity-millionaire", title: "The Identity Millionaire", readTime: "9 min read" },
  { slug: "physics-of-momentum", title: "The Physics of Momentum", readTime: "8 min read" },
  { slug: "five-steps-to-miracles", title: "Five Steps to Miracles", readTime: "10 min read" }
];

export default function WorkOnYourselfArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Self-Image
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Work on Yourself: The Psycho-Cybernetics of Identity
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                10 min read
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
              &quot;If you want to be rich and happy for the rest of your life, learn this 
              lesson well: Learn to work harder on yourself than you do on your job.&quot; 
              — Jim Rohn
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Income doesn&apos;t exceed personal development by much. Success is something 
              you attract, not something you pursue. The key isn&apos;t chasing outcomes—it&apos;s 
              becoming the person who naturally creates those outcomes.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Discovery That Changed Everything
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              In the 1960s, cosmetic surgeon Maxwell Maltz noticed something strange. 
              He would fix people&apos;s faces—remove scars, correct features—and some patients 
              would suddenly become confident and transformed.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              But others? They remained the same. Same insecurities. Same shyness. 
              Same self-doubt. Despite the physical transformation, nothing changed inside.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                Maltz realized: If you don&apos;t change your inner image, external change 
                makes no difference. He called this &quot;Psycho-Cybernetics&quot;—the navigation 
                system of the mind.
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Self-Image Problem
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Your self-image is the internal picture you hold of yourself. It&apos;s not 
              who you actually are—it&apos;s who you believe you are. And this belief 
              operates like a thermostat, constantly adjusting your behavior to match 
              your internal setting.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              If you secretly believe you&apos;re not good enough, your subconscious will 
              prove you right. It will create situations where you fail, sabotage your 
              own efforts, and interpret neutral events as evidence of your inadequacy.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <ScanFace className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">The Old Approach</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Try to change behavior directly</li>
                    <li>• Use willpower and discipline</li>
                    <li>• Fight against self-doubt</li>
                    <li>• Push harder when stuck</li>
                    <li>• Get temporary results</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">The Identity Approach</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Change the internal image first</li>
                    <li>• Let behavior align naturally</li>
                    <li>• Rewrite the underlying belief</li>
                    <li>• Allow effortless change</li>
                    <li>• Get permanent results</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Navigation System
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Think of your self-image as a target-seeking mechanism. Like a guided 
              missile, it will adjust your course to hit whatever target you&apos;ve 
              programmed into it.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The problem? Most people&apos;s internal target is set to &quot;mediocrity&quot; or 
              &quot;struggle.&quot; They&apos;ve programmed themselves for less than they&apos;re capable of. 
              No amount of effort will override this programming—because the navigation 
              system is always working to hit the programmed target.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The solution isn&apos;t more effort. The solution is reprogramming the target.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Deep Emotional Rehearsal
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Maltz discovered that the only way to reprogram your self-image is 
              through &quot;deep emotional rehearsal&quot;—what we might now call visualization 
              or guided imagery. You don&apos;t need more discipline or another strategy. 
              You need a new identity.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">The Reprogramming Protocol</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span><strong>Define the new identity.</strong> Who do you want to become? Be specific.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span><strong>Create vivid mental images.</strong> See yourself acting as this person in specific situations.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span><strong>Add emotional intensity.</strong> Feel what it would feel like to be this person.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span><strong>Practice daily.</strong> Repetition rewires neural pathways.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">5</span>
                  <span><strong>Act in alignment.</strong> Take small actions that prove the new identity true.</span>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Identity Regulates Everything
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Your identity regulates your desires, your patterns, and your expected 
              results. If you change your identity, everything that follows changes 
              automatically.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The person who identifies as healthy naturally makes healthy choices. 
              The person who identifies as a writer naturally writes. The person who 
              identifies as successful naturally takes successful actions.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              You don&apos;t have to fight yourself when your identity is aligned with 
              your goals. The behavior becomes automatic because it&apos;s just &quot;what 
              someone like me does.&quot;
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;You don&apos;t need more discipline or another marketing strategy. 
                You need a new identity. Identity is what regulates desire, pattern, 
                and expected outcome into your reality. Change your identity, and 
                everything following it changes automatically.&quot;
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Practice of Self-Work
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Working on yourself isn&apos;t selfish—it&apos;s essential. Every area of your 
              life improves when you improve. Your relationships, your career, your 
              health, your happiness—all rise or fall with your personal development.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The question isn&apos;t whether you have time for self-work. The question 
              is whether you can afford not to do it. Because without it, you&apos;re 
              operating with outdated software—trying to navigate modern challenges 
              with an identity formed by past experiences.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <RefreshCw className="h-5 w-5" />
              <span className="font-semibold">The Key Insight</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Happiness isn&apos;t in what you get—it&apos;s in what you become. The goal 
              isn&apos;t to have more; it&apos;s to be more. And being more starts with 
              rewriting the internal image that controls everything.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="work-on-yourself" />

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
              Transform Your Self-Image
            </h2>
            <p className="text-slate-300 mb-6">
              Get the tools to reprogram your identity and become who you&apos;re meant to be.
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
