'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Star, Shield, TrendingUp } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "five-steps-to-miracles", title: "Five Steps to Miracles", readTime: "10 min read" },
  { slug: "work-on-yourself", title: "Work on Yourself: Psycho-Cybernetics", readTime: "10 min read" },
  { slug: "all-in-or-nothing", title: "All In or Nothing", readTime: "7 min read" }
];

export default function BecomingExceptionalArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Excellence
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Becoming Exceptional: Why Ordinary Can Never Build Legacy
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
              You cannot make yourself exceptional and live an ordinary life. 
              To become exceptional, you must live an exceptional life. And an 
              exceptional life doesn&apos;t always mean better—it means different 
              enough that most people would reject it.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              And when that happens, you must reject them too. Oil and water 
              don&apos;t mix. This is what it truly means to be exceptional: you 
              must become the exception.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Cost of Being Different
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Most people want the rewards of being exceptional without the 
              costs. They want to stand out without standing apart. They want 
              to be extraordinary while living ordinary.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              But it doesn&apos;t work that way. Exceptional isn&apos;t a checkbox you 
              tick while keeping everything else the same. It&apos;s a fundamental 
              orientation toward life that touches everything.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;Why settle for being average when you have a chance to be the best? 
                I don&apos;t wake up every day just to be average.&quot;
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              What Makes Someone Exceptional?
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Excellence is confidence. And confidence is knowing who you are 
              because you&apos;ve put in the hours, the discipline, the sacrifice. 
              It&apos;s not arrogance—it&apos;s earned certainty.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              People will call you names. They&apos;ll say you&apos;re too ambitious, 
              too extreme, maybe even obsessive. But here&apos;s the truth: 
              none of that matters, because those people aren&apos;t putting in the work.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">The Ordinary Path</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Seek comfort and convenience</li>
                    <li>• Follow the well-worn path</li>
                    <li>• Avoid risk and uncertainty</li>
                    <li>• Prioritize fitting in</li>
                    <li>• Accept mediocrity as normal</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">The Exceptional Path</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Embrace discomfort for growth</li>
                    <li>• Forge your own path</li>
                    <li>• Accept risk as necessary</li>
                    <li>• Stand apart willingly</li>
                    <li>• Refuse to settle</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Exceptional Identity
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Becoming exceptional starts with identity. It&apos;s deciding that 
              you&apos;re not willing to settle for what&apos;s normal. It&apos;s choosing 
              to become the exception rather than the rule.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This isn&apos;t about being better than others. It&apos;s about being 
              fully yourself—so fully that you naturally stand out. The 
              exceptional person isn&apos;t trying to be different. They&apos;re just 
              being completely themselves.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">The Exceptional Mindset</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• I don&apos;t compete—I express</li>
                <li>• I don&apos;t compare—I contribute</li>
                <li>• I don&apos;t conform—I create</li>
                <li>• I don&apos;t fit in—I stand out</li>
                <li>• I don&apos;t settle—I become</li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Loneliness of Excellence
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Here&apos;s what no one tells you: becoming exceptional can be lonely. 
              The path narrows as you climb. The people who understood you 
              before may not understand you now.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This isn&apos;t a bug—it&apos;s a feature. The loneliness of excellence 
              isn&apos;t something to avoid. It&apos;s something to embrace. It&apos;s 
              evidence that you&apos;re on the right path.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Oil and water don&apos;t mix. When you&apos;re oil in a world of water, 
              you&apos;ll naturally separate. Don&apos;t fight it. Don&apos;t dilute yourself 
              to blend in. Let yourself rise.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Legacy Question
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Ordinary will never build a legacy. Ever. The monuments, the 
              movements, the transformations—they all come from people who 
              refused to settle, who chose the exceptional path.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              What do you want to leave behind? What impact do you want to 
              make? What version of yourself do you want to have become?
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              These questions can&apos;t be answered from an ordinary mindset. 
              They require you to step into the exceptional—to accept the 
              costs, the loneliness, the different life that comes with 
              choosing to be more.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;The ordinary will never build a legacy. Ever. To leave 
                something behind, you must become something exceptional.&quot;
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Choosing Your Path
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              There&apos;s no judgment in choosing ordinary. Many people live 
              good, meaningful, happy lives without being exceptional. 
              That&apos;s a valid choice.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              But if you feel called to something more—if you can&apos;t shake 
              the sense that you&apos;re meant for a different path—don&apos;t ignore 
              that call. It&apos;s not vanity. It&apos;s not delusion. It&apos;s your 
              exceptional self trying to emerge.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The question isn&apos;t whether you&apos;re capable of being exceptional. 
              Everyone has that capacity. The question is whether you&apos;re 
              willing to pay the price—live the different life, stand apart, 
              reject the ordinary path.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Shield className="h-5 w-5" />
              <span className="font-semibold">The Key Insight</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              You can&apos;t be exceptional while living ordinary. You can&apos;t 
              stand out while fitting in. You can&apos;t build legacy while 
              following the crowd. Becoming exceptional isn&apos;t about being 
              better—it&apos;s about being different enough to matter.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="becoming-exceptional" />

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
              Become Exceptional
            </h2>
            <p className="text-slate-300 mb-6">
              Get the frameworks to transform your identity and build your legacy.
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
