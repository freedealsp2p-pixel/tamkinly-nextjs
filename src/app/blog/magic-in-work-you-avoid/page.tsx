'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, AlertTriangle, Sparkles, Compass } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "ten-minute-block-system", title: "The 10-Minute Block System", readTime: "9 min read" },
  { slug: "all-in-or-nothing", title: "All In or Nothing", readTime: "7 min read" },
  { slug: "physics-of-momentum", title: "The Physics of Momentum", readTime: "8 min read" }
];

export default function MagicInWorkYouAvoidArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Transformation
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              The Magic Is in the Work You Avoid
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                6 min read
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
              &quot;The magic you&apos;re looking for is in the work you&apos;re avoiding.&quot;
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This single sentence carries the weight of every transformation you&apos;ve ever wanted. 
              That uncomfortable task sitting on your list. The conversation you&apos;ve been putting off. 
              The practice you know would change everything but somehow never happens.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The resistance you feel isn&apos;t random. It&apos;s a compass. And it&apos;s pointing directly 
              toward your growth.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Resistance Map
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Your brain is designed to protect you from discomfort. When something feels hard, 
              scary, or uncertain, your survival instincts kick in. They create resistance. 
              They generate excuses. They manufacture reasons to delay.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              But here&apos;s what most people miss: that resistance is information. It&apos;s not 
              telling you to stop. It&apos;s telling you where the growth lives.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;The tasks you avoid reveal the edges of your comfort zone. And the edges of 
                your comfort zone are precisely where transformation happens.&quot;
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why We Avoid the Magic
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The work you avoid usually falls into three categories:
            </p>

            <div className="space-y-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Identity-Threatening Work</h3>
                      <p className="text-sm text-slate-600">
                        This challenges who you believe you are. The person who&apos;s always been 
                        &quot;bad at math&quot; avoiding the finance course. The &quot;shy person&quot; avoiding 
                        public speaking. The work that would force you to become someone new.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Potential-Revealing Work</h3>
                      <p className="text-sm text-slate-600">
                        This threatens to show you what you&apos;re capable of. If you actually did it, 
                        you&apos;d have to acknowledge your own power. And that would mean you&apos;ve been 
                        playing small. The work that would force you to own your potential.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Compass className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Truth-Requiring Work</h3>
                      <p className="text-sm text-slate-600">
                        This demands honesty. The difficult conversation. The confronting look 
                        in the mirror. The work that would strip away your illusions and force 
                        you to see reality clearly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Identity Shift
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              When you finally do the work you&apos;ve been avoiding, something profound happens. 
              It&apos;s not just that you complete a task. You cross a threshold. You become someone 
              who does that thing.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The person who finally has that difficult conversation is no longer someone who 
              avoids conflict. The person who finally starts that project is no longer someone 
              who just talks about ideas. The person who finally faces their fear is no longer 
              someone who lets fear decide.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Each avoided task is a locked door. Behind it is a version of yourself you haven&apos;t 
              met yet. The work is the key.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Finding Your Magic</h3>
              <p className="text-slate-600 mb-4">
                Ask yourself: What have I been avoiding? What task has been sitting on my list 
                for weeks? What conversation do I keep postponing? What practice do I know would 
                help but never seem to do?
              </p>
              <p className="text-slate-600">
                That&apos;s where your transformation lives. That&apos;s where the magic is hiding.
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Practice of Moving Toward
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Transformation isn&apos;t about eliminating resistance. It&apos;s about learning to read it. 
              When you feel that familiar pull to avoid, pause. Recognize it as a signal. 
              A signpost pointing toward growth.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Then take one small step toward it. Not a leap. A step. The smallest possible 
              action that moves you in the direction of the resistance.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The magic isn&apos;t in the outcome. It&apos;s in the movement. It&apos;s in becoming someone 
              who moves toward what they fear instead of away from it.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                The work you&apos;re avoiding isn&apos;t just work. It&apos;s a doorway. A threshold. 
                An invitation to become someone new.
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed">
              The magic you&apos;re looking for is waiting. It&apos;s been waiting. It will keep waiting 
              until you&apos;re ready to walk through the door you&apos;ve been avoiding.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="magic-in-work-you-avoid" />

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
              Stop Avoiding. Start Transforming.
            </h2>
            <p className="text-slate-300 mb-6">
              Get the frameworks and support to face what you&apos;ve been running from.
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
