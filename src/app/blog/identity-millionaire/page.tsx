'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, TrendingUp, DollarSign, Target, Award } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "work-on-yourself", title: "Work on Yourself: Psycho-Cybernetics", readTime: "10 min read" },
  { slug: "becoming-exceptional", title: "Becoming Exceptional", readTime: "8 min read" },
  { slug: "inversion-thinking", title: "Inversion Thinking", readTime: "8 min read" }
];

export default function IdentityMillionaireArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Wealth & Identity
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              The Identity Millionaire: Building Wealth Through Self-Transformation
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
              True wealth doesn&apos;t start with a strategy. It starts with an identity. 
              The millionaire mindset isn&apos;t about money—it&apos;s about becoming the person 
              capable of creating and holding wealth.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Consider the concept of the &quot;virtual millionaire&quot;—someone who has achieved 
              financial freedom through identity transformation, not just accumulation. 
              The path to wealth reveals itself in stages, each requiring a different 
              version of yourself.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Three Stages of Wealth Identity
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Most people chase wealth without understanding that each level requires 
              a different identity. Here&apos;s the framework that changes everything:
            </p>

            <div className="space-y-6 my-8">
              <Card className="border-0 shadow-sm border-l-4 border-l-accent">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">Stage One</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">Cash Flow Millionaire</h3>
                      <p className="text-slate-600">
                        This is the first threshold—generating consistent monthly income that 
                        exceeds your needs. For many, this begins at $5,000/month. The identity 
                        shift here is profound: you stop being someone who trades time for money 
                        and become someone who creates value that generates income.
                      </p>
                      <p className="text-slate-600 mt-2">
                        <strong>Identity Question:</strong> Do you see yourself as someone who 
                        can create independent income streams?
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
                      <Badge variant="secondary" className="mb-2">Stage Two</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">Liquidity Millionaire</h3>
                      <p className="text-slate-600">
                        This stage is about accumulated accessible wealth—the ability to make 
                        moves without constraint. The identity shift here involves becoming 
                        someone who can hold and manage substantial resources, not just generate them.
                      </p>
                      <p className="text-slate-600 mt-2">
                        <strong>Identity Question:</strong> Do you see yourself as someone 
                        capable of managing and growing significant wealth?
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
                      <Badge variant="secondary" className="mb-2">Stage Three</Badge>
                      <h3 className="font-semibold text-primary text-lg mb-2">Asset Millionaire</h3>
                      <p className="text-slate-600">
                        The highest form—owning assets that generate wealth independently. 
                        Real estate, businesses, investments that work without your direct involvement. 
                        The identity here is complete: you become someone who builds systems, 
                        not just does work.
                      </p>
                      <p className="text-slate-600 mt-2">
                        <strong>Identity Question:</strong> Do you see yourself as someone 
                        who builds systems and assets, or someone who just works?
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why Most People Stay Stuck
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Here&apos;s what&apos;s fascinating: most people skip the first stage entirely. 
              They try to jump straight to liquidity or assets without ever building 
              the identity of someone who generates consistent cash flow.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              It&apos;s like trying to run a marathon without ever learning to walk. 
              Each stage builds the identity muscles needed for the next. 
              The person who can&apos;t generate $5,000/month independently isn&apos;t ready 
              to manage millions—they haven&apos;t developed the identity to hold it.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;Income doesn&apos;t exceed personal development by much.&quot; — Jim Rohn
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Identity-Wealth Connection
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Wealth is attracted, not pursued. When you become the person who can create 
              value, manage resources, and build systems, wealth flows toward you naturally.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This isn&apos;t manifestation theory. It&apos;s practical identity work. 
              The person who identifies as a creator builds differently than someone 
              who identifies as an employee. The person who identifies as an investor 
              thinks differently than someone who identifies as a consumer.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Your identity shapes your decisions. Your decisions shape your wealth.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">The Wealth Identity Audit</h3>
              <p className="text-slate-600 mb-4">Ask yourself these questions honestly:</p>
              <ul className="space-y-2 text-slate-600">
                <li>• Do I see myself as someone who creates value independently?</li>
                <li>• Am I comfortable with money, or do I have tension around it?</li>
                <li>• Do I think in terms of building assets or earning wages?</li>
                <li>• Would a wealthy version of me make the decisions I&apos;m making today?</li>
                <li>• What identity am I modeling for my future wealth?</li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Starting Where You Are
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The good news: you don&apos;t need millions to start developing the identity 
              of someone who has millions. You start with the first stage—cash flow.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Can you create $500/month independently? That&apos;s the beginning. 
              Each dollar generated outside of employment is evidence of a new identity. 
              Each small success builds the neural pathways for larger ones.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The virtual millionaire isn&apos;t someone who hit a jackpot. They&apos;re someone 
              who transformed their identity one stage at a time.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Target className="h-5 w-5" />
              <span className="font-semibold">The Key Insight</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Wealth isn&apos;t about the money you accumulate. It&apos;s about the person you become 
              in the process. Focus on the identity, and the wealth follows. Focus only on the 
              wealth, and you&apos;ll stay stuck at whatever level matches your current identity.
            </p>
          </div>
        </div>
      </section>

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

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="identity-millionaire" />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Transform Your Identity. Transform Your Wealth.
            </h2>
            <p className="text-slate-300 mb-6">
              Get the frameworks to become the person who creates lasting abundance.
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
