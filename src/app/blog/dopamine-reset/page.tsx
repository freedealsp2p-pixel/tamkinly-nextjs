'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Brain, Zap, RefreshCw, Smartphone, Coffee } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "ten-minute-block-system", title: "The 10-Minute Block System", readTime: "9 min read" },
  { slug: "physics-of-momentum", title: "The Physics of Momentum", readTime: "8 min read" },
  { slug: "work-on-yourself", title: "Work on Yourself: Psycho-Cybernetics", readTime: "10 min read" }
];

export default function DopamineResetArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Mental Clarity
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              The 24-Hour Dopamine Reset: Reclaiming Your Focus
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                12 min read
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
              This is more important than your goals. It explains why simple 
              tasks feel overwhelming, why you scroll for hours and still feel 
              empty, why motivation feels impossible to sustain.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Here&apos;s the amazing part: you can reset your dopamine in just 
              24 hours. Not in 30 days. Not in 90 days. In one day.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Understanding Dopamine
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Dopamine isn&apos;t happiness—it&apos;s motivation. It&apos;s the chemical 
              that says &quot;go get that, do that again.&quot; This is crucial to understand.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The problem? Your brain wasn&apos;t designed for infinite scrolling 
              of 10-second videos. For fast food. For constant notifications. 
              For endless stimulation.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Your brain evolved for effort, challenge, and delayed reward.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;Imagine this: you wake up, check your phone, scroll, watch 
                short videos, eat a sugar-filled breakfast, drink caffeine, 
                open 12 tabs, switch between apps. This isn&apos;t natural 
                stimulation—it&apos;s a dopamine explosion.&quot;
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Overstimulation Problem
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              When dopamine spikes repeatedly, your brain protects itself by 
              downregulating—reducing sensitivity. The things that used to 
              excite you no longer do.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This is why work feels boring. Why studying feels painful. 
              Why the gym feels heavy. Why goals feel meaningless. Your 
              brain is simply oversaturated with stimulation.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Smartphone className="h-5 w-5 text-red-500" />
                    <h3 className="font-semibold text-primary">High Dopamine Triggers</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Social media scrolling</li>
                    <li>• Short-form videos</li>
                    <li>• Sugar and processed foods</li>
                    <li>• Constant notifications</li>
                    <li>• Video games</li>
                    <li>• Pornography</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Coffee className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold text-primary">Low Dopamine Activities</h3>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Walking in nature</li>
                    <li>• Reading books</li>
                    <li>• Journaling</li>
                    <li>• Deep conversation</li>
                    <li>• Meditation</li>
                    <li>• Creative work</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Good News: Your Brain Adapts
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The remarkable thing about your brain is its neuroplasticity. 
              It can rewire itself. The 24-hour reset leverages this 
              adaptability to restore your natural motivation system.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Step 1: Remove High-Dopamine Triggers (The Purge)
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              For the next 24 hours, give your brain true silence. Not just 
              a quiet room—internal quiet. This means:
            </p>

            <ul className="space-y-2 text-slate-600 my-6">
              <li>• No social media</li>
              <li>• No short-form videos</li>
              <li>• No infinite scrolling</li>
              <li>• No fast food or sugar spikes</li>
              <li>• No gaming marathons</li>
              <li>• No constant music in your ears</li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              Before you panic: you&apos;re not quitting forever. You&apos;re not 
              deleting apps. You&apos;re not becoming a monk. You&apos;re simply 
              hitting the restart button.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">What to Expect</h3>
              <p className="text-slate-600 mb-4">
                Initially, your brain will rebel. You&apos;ll reach for your phone 
                without thinking. You&apos;ll feel a strange emptiness. Maybe 
                irritability or restlessness.
              </p>
              <p className="text-slate-600">
                This isn&apos;t failure—these are withdrawal symptoms from 
                overstimulation. Your brain has become so accustomed to 
                maximum input that silence feels wrong.
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              Stay with the discomfort. Behind it lies clarity, focus, 
              and natural energy.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Step 2: Replace with Low-Dopamine Activities
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Here&apos;s where most people fail: they remove stimulation but 
              don&apos;t replace it. They sit in a vacuum, feel bored and empty, 
              and conclude it doesn&apos;t work.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              But a reset isn&apos;t about sitting in emptiness—it&apos;s about 
              replacing intense stimulation with gentle nourishment:
            </p>

            <ul className="space-y-3 text-slate-600 my-6">
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Walk outside.</strong> No scrolling, no consuming. Just feel the air, your breath, the environment.</span>
              </li>
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Read a book.</strong> A few pages. Let your mind focus on one simple thing.</span>
              </li>
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Write in a journal.</strong> Empty your thoughts onto paper. Plan. Dream.</span>
              </li>
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Tidy your space.</strong> There&apos;s power in organizing your physical environment while resetting your mental one.</span>
              </li>
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Exercise lightly.</strong> Stretch. Move your body.</span>
              </li>
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span><strong>Have a real conversation.</strong> Deep and present, not quick texts.</span>
              </li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              These activities don&apos;t cause excitement spikes—they awaken 
              your mind gently. After hours, your brain starts to change 
              its expectations. Walking becomes relaxing. Reading becomes 
              engaging. Your clean room becomes satisfying.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Step 3: Delay Gratification (The Reward)
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              This is the most powerful part. During these hours, you&apos;re 
              retraining your reward system.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Most people live backwards: they wake up and immediately 
              consume. Phone first. Entertainment first. Comfort first. 
              Work comes later—if at all.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This pattern destroys motivation. When your brain gets the 
              reward before the effort, it stops valuing the effort.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;On your reset day, reverse the order: do the hard things 
                first. Before entertainment. Before comfort. Before easy 
                pleasure. This sends a powerful signal to your brain: 
                effort comes before reward.&quot;
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              If you have work, start before touching your phone. If you 
              want to exercise, move your body before relaxing. Your brain 
              will adapt quickly—dopamine will start linking to achievement 
              instead of distraction.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              You&apos;re teaching your brain that rewards must be earned. 
              Focus first. Then fun. Once your brain learns this pattern 
              again, motivation becomes natural and automatic.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Transformation
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              By the end of 24 hours, something shifts. You won&apos;t feel 
              transformed overnight—but you&apos;ll notice:
            </p>

            <ul className="space-y-2 text-slate-600 my-6">
              <li>• Your mind is clearer</li>
              <li>• Simple tasks feel less overwhelming</li>
              <li>• You&apos;re more present</li>
              <li>• Natural motivation is returning</li>
              <li>• You can focus longer</li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              This isn&apos;t magic. It&apos;s biology. You&apos;ve allowed your 
              dopamine system to recalibrate. You&apos;ve broken the cycle 
              of constant stimulation that was keeping you stuck.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <RefreshCw className="h-5 w-5" />
              <span className="font-semibold">The Key Insight</span>
            </div>

            <p className="text-slate-600 leading-relaxed">
              You don&apos;t need more motivation. You don&apos;t need more 
              discipline. You need to reset the system that creates 
              motivation naturally. One day of intentional recalibration 
              can restore what months of overstimulation has dulled. 
              Your brain is ready to return to its natural state. 
              Give it the chance.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="dopamine-reset" />

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
              Reset Your Mind. Transform Your Life.
            </h2>
            <p className="text-slate-300 mb-6">
              Get the tools to reclaim your focus and become who you&apos;re meant to be.
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
