'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Brain, MessageCircle, Target, Heart, Zap, CheckCircle2, Lock } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "identity-recode-system-guide", title: "The Identity Recode System: A Complete Framework for Identity Transformation", readTime: "12 min read" },
  { slug: "identity-gap-assessment", title: "The Identity Gap Assessment: Measuring Who You Are vs. Who You Want to Be", readTime: "10 min read" },
  { slug: "values-clarification-tool", title: "Values Clarification: The Foundation of Authentic Identity", readTime: "9 min read" }
];

export default function AIIdentityCoachGuideArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              AI Coaching
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              The AI Identity Coach: Your 24/7 Transformation Companion
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                11 min read
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
              The most powerful transformation tool isn&apos;t an app or a workbook—it&apos;s a 
              conversation. The AI Identity Coach brings evidence-based coaching frameworks 
              into an interactive dialogue, available whenever you need guidance, clarity, 
              or support on your transformation journey.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              For decades, coaching was reserved for those who could afford personal 
              sessions with trained professionals. But advances in artificial intelligence 
              have democratized access to sophisticated coaching methodologies. The AI 
              Identity Coach represents the convergence of cutting-edge AI and proven 
              psychological frameworks.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Science of AI Coaching
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research on AI-assisted coaching has shown remarkable results. A study 
              published in <em>Nature Human Behaviour</em> found that AI coaching was 
              as effective as human coaching for goal attainment, with participants 
              showing significant improvements in self-efficacy and behavioral change.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              What makes AI coaching effective? Research identifies several key factors:
            </p>

            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>Immediate Availability:</strong> Support whenever you need it, without scheduling constraints</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>Non-judgmental Space:</strong> Complete privacy encourages deeper exploration</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>Consistent Frameworks:</strong> Evidence-based methodologies applied systematically</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>Memory and Context:</strong> Conversations build on each other for continuity</span>
              </li>
            </ul>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;The quality of your life is in direct proportion to the quality of the 
                questions you ask yourself.&quot; — Tony Robbins
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Evidence-Based Framework Behind the Coach
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The AI Identity Coach isn&apos;t a generic chatbot. It&apos;s built on validated 
              psychological frameworks that have been tested and refined through decades 
              of research:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Atomic Habits Framework</h3>
                  <p className="text-sm text-slate-600">
                    James Clear&apos;s identity-based habit formation methodology—building 
                    new identities through accumulated behavioral &quot;votes.&quot;
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Self-Authorship Theory</h3>
                  <p className="text-sm text-slate-600">
                    Marcia Baxter Magolda&apos;s four-phase model of developing internal 
                    identity authority and authentic self-direction.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#BA68C8]/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-[#BA68C8]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Cognitive Behavioral Approaches</h3>
                  <p className="text-sm text-slate-600">
                    Evidence-based techniques for identifying and restructuring 
                    unhelpful thought patterns and beliefs.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#64B5F6]/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-[#64B5F6]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Values-Based Coaching</h3>
                  <p className="text-sm text-slate-600">
                    Acceptance and Commitment Therapy principles for living in 
                    alignment with your core values.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Four Key Coaching Domains
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The AI Identity Coach is structured around four primary domains, each 
              addressing a critical aspect of identity transformation:
            </p>

            <div className="space-y-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Identity Discovery</h3>
                      <p className="text-slate-600 text-sm mb-3">
                        Explore who you are at your core and who you want to become. The coach 
                        helps you uncover your authentic self, distinguish between genuine 
                        desires and external expectations, and define your target identity 
                        with clarity.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">Self-concept exploration</Badge>
                        <Badge variant="outline" className="text-xs">Future self visualization</Badge>
                        <Badge variant="outline" className="text-xs">Identity gap analysis</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-[#1F6F78]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Habit Formation</h3>
                      <p className="text-slate-600 text-sm mb-3">
                        Learn to build identity-based habits that stick. The coach applies 
                        James Clear&apos;s Atomic Habits framework to help you design cues, 
                        routines, and rewards that reinforce your target identity.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">Identity votes</Badge>
                        <Badge variant="outline" className="text-xs">Habit stacking</Badge>
                        <Badge variant="outline" className="text-xs">Environment design</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#BA68C8]/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-5 w-5 text-[#BA68C8]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Self-Authorship</h3>
                      <p className="text-slate-600 text-sm mb-3">
                        Develop your internal voice and move from following external formulas 
                        to creating your own path. The coach guides you through Baxter 
                        Magolda&apos;s phases of self-authorship development.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">Internal authority</Badge>
                        <Badge variant="outline" className="text-xs">Authentic choices</Badge>
                        <Badge variant="outline" className="text-xs">Self-directed growth</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E57373]/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="h-5 w-5 text-[#E57373]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Emotion Regulation</h3>
                      <p className="text-slate-600 text-sm mb-3">
                        Master the emotional challenges of transformation. The coach teaches 
                        cognitive reappraisal techniques and helps you navigate the 
                        uncomfortable feelings that arise during identity change.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">Cognitive reappraisal</Badge>
                        <Badge variant="outline" className="text-xs">Emotional awareness</Badge>
                        <Badge variant="outline" className="text-xs">Resilience building</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              How Conversations Drive Transformation
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Unlike static worksheets or videos, conversation enables a dynamic exchange 
              that adapts to your specific situation. The AI Identity Coach uses 
              sophisticated dialogue strategies to:
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Coaching Dialogue Strategies</h3>
              <ol className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <div>
                    <strong className="text-primary">Powerful Questions:</strong> 
                    Ask questions that prompt deep reflection and new insights about your identity.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <div>
                    <strong className="text-primary">Reframing:</strong> 
                    Help you see situations from new perspectives that support your transformation.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <div>
                    <strong className="text-primary">Accountability:</strong> 
                    Track commitments and follow up on progress in future conversations.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <div>
                    <strong className="text-primary">Evidence Collection:</strong> 
                    Help you identify and celebrate evidence of your new identity emerging.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">5</span>
                  <div>
                    <strong className="text-primary">Obstacle Navigation:</strong> 
                    Work through barriers and setbacks with evidence-based strategies.
                  </div>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Privacy Advantage
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Identity transformation involves vulnerable exploration—examining your 
              deepest fears, your authentic desires, and the gaps between who you are 
              and who you want to be. The AI Identity Coach provides a completely 
              private space for this exploration.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research on self-disclosure shows that people are more honest in 
              anonymous contexts. This honesty enables deeper exploration and more 
              meaningful breakthroughs. With AI coaching, you can discuss sensitive 
              topics without concern about judgment or social consequences.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              When to Use the AI Identity Coach
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The coach is available 24/7, making it ideal for moments when you need 
              immediate support:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-8">
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">Decision Moments</h4>
                </div>
                <p className="text-sm text-slate-600">When facing a choice that tests your new identity</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">Motivation Dips</h4>
                </div>
                <p className="text-sm text-slate-600">When you feel your commitment wavering</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">Insight Seeking</h4>
                </div>
                <p className="text-sm text-slate-600">When you need help understanding a pattern</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">Goal Clarification</h4>
                </div>
                <p className="text-sm text-slate-600">When you need help defining your next step</p>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The BUNDLE Tier Advantage
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The AI Identity Coach is an exclusive feature of the BUNDLE tier—our 
              most comprehensive transformation package. The BUNDLE combines:
            </p>

            <div className="space-y-4 my-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">All BASIC Features</h4>
                  <p className="text-slate-600 text-sm">Complete Identity Recode System with all worksheets and tools</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">Unlimited AI Coaching</h4>
                  <p className="text-slate-600 text-sm">24/7 access to evidence-based coaching conversations</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">Contextual Memory</h4>
                  <p className="text-slate-600 text-sm">The coach remembers your journey and builds on previous conversations</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">Integrated Experience</h4>
                  <p className="text-slate-600 text-sm">AI coaching that connects to your Identity Recode System progress</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#3DD4B0] mt-12 mb-4">
              <Lock className="h-5 w-5" />
              <span className="font-semibold">BUNDLE Tier Exclusive</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The BUNDLE tier is designed for those who want the complete transformation 
              experience—combining structured systems with personalized coaching support. 
              It&apos;s the closest you can get to having a personal transformation coach 
              available whenever you need one.
            </p>

            <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] p-8 rounded-xl my-10 text-center">
              <Badge className="mb-4 bg-[#3DD4B0]/20 text-[#3DD4B0] border-0">BUNDLE</Badge>
              <h3 className="text-white text-xl font-bold mb-3">Experience AI-Powered Coaching</h3>
              <p className="text-slate-300 mb-6">
                Get 24/7 access to the AI Identity Coach with the complete BUNDLE package.
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Get the BUNDLE
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Transformation isn&apos;t a solo journey—but it also doesn&apos;t require expensive 
              coaching sessions. The AI Identity Coach brings sophisticated, evidence-based 
              coaching into your pocket, ready whenever you are. Because the best time for 
              transformation isn&apos;t tomorrow or next week—it&apos;s whenever you&apos;re ready to 
              ask the right questions.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="ai-identity-coach-guide" />

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
            <Badge className="mb-4 bg-[#3DD4B0]/20 text-[#3DD4B0] border-0">BUNDLE Exclusive</Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Get Your AI Transformation Companion
            </h2>
            <p className="text-slate-300 mb-6">
              Access the AI Identity Coach and the complete transformation toolkit with BUNDLE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Get the BUNDLE
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/apps/ai-identity-coach">
                <Button variant="white" size="lg" className="px-8">
                  Preview Coach
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
