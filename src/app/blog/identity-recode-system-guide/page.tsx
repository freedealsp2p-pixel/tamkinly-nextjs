'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, BookOpen, Target, Zap, Calendar, CheckCircle2, Lock, Layers } from "lucide-react";

const relatedArticles = [
  { slug: "physics-of-momentum", title: "The Physics of Momentum: Why 18 Minutes Changes Everything", readTime: "8 min read" },
  { slug: "identity-gap-assessment", title: "The Identity Gap Assessment: Measuring Who You Are vs. Who You Want to Be", readTime: "10 min read" },
  { slug: "work-on-yourself", title: "Work on Yourself: Psycho-Cybernetics", readTime: "10 min read" }
];

export default function IdentityRecodeSystemGuideArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Transformation System
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              The Identity Recode System: A Complete Framework for Identity Transformation
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
              What if changing who you are was as systematic as updating software? The 
              Identity Recode System applies evidence-based principles from psychology, 
              neuroscience, and behavioral science to create a complete 30-day transformation 
              framework.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Identity transformation has traditionally been treated as mysterious—an art 
              rather than a science. But decades of research in cognitive psychology, 
              habit formation, and self-concept have revealed that identity change follows 
              predictable patterns. When you understand these patterns, you can engineer 
              transformation rather than hoping for it.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Foundation: How Identity Actually Changes
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research on self-concept and identity shows that identity is constructed 
              through repeated behaviors and their interpretations. Every action you take 
              is a vote for the type of person you are. When you accumulate enough votes, 
              your brain updates your self-concept to match.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This insight—popularized by James Clear in <em>Atomic Habits</em>—forms the 
              foundation of the Identity Recode System. But the system goes deeper, 
              integrating additional research on:
            </p>

            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>Neuroplasticity:</strong> How repeated thoughts and behaviors reshape neural pathways</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>Self-efficacy:</strong> Albert Bandura&apos;s research on belief in one&apos;s capabilities</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>Self-authorship:</strong> Baxter Magolda&apos;s model of internal identity construction</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600"><strong>Environmental psychology:</strong> How context shapes behavior and identity</span>
              </li>
            </ul>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;Every action you take is a vote for the type of person you wish to become. 
                No single instance will transform your beliefs, but as the votes build up, 
                so does the evidence of your new identity.&quot; — James Clear
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Six Components of the Identity Recode System
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The system is organized into six integrated components, each designed to 
              address a specific aspect of identity transformation:
            </p>

            <div className="space-y-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Identity Baseline Assessment</h3>
                      <p className="text-slate-600 text-sm">
                        A comprehensive diagnostic protocol establishing current identity parameters 
                        across eight dimensions. Research shows that baseline measurement increases 
                        self-awareness and provides a reference point for tracking progress.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#1F6F78] font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">The 4-Step Identity Recode Framework</h3>
                      <p className="text-slate-600 text-sm">
                        A systematic protocol for converting objectives into operational identities 
                        through empirical evidence accumulation. This framework translates abstract 
                        identity goals into daily behavioral votes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#64B5F6]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#64B5F6] font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Daily Evidence Accumulation Cycle</h3>
                      <p className="text-slate-600 text-sm">
                        Daily protocols for identity prompt review, non-negotiable action execution, 
                        and evidence logging. Research on habit formation shows that daily practice 
                        accelerates neural pathway development.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#BA68C8]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#BA68C8] font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Weekly Integration Protocol</h3>
                      <p className="text-slate-600 text-sm">
                        7-day review cycles for system calibration, consistency scoring, and 
                        environmental optimization. Weekly reviews prevent drift and maintain 
                        strategic alignment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FFB74D]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#FFB74D] font-bold">5</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Monthly Identity Lock Protocol</h3>
                      <p className="text-slate-600 text-sm">
                        30-day transformation cycles culminating in identity statement rewriting 
                        and next-level objective selection. Monthly consolidation locks in progress 
                        and sets the stage for continued growth.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#E57373]/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#E57373] font-bold">6</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">System Failure Recovery</h3>
                      <p className="text-slate-600 text-sm">
                        Protocols for chain break scenarios, 24-hour reset rules, and identity 
                        collapse prevention. Research shows that recovery protocols prevent 
                        abandonment during setbacks.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The 30-Day Transformation Cycle
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Identity Recode System operates on a 30-day cycle—a timeframe chosen 
              based on research on habit formation and neural adaptation. A study in the 
              <em> European Journal of Social Psychology</em> found that habit formation 
              takes an average of 66 days, with significant neural pathway development 
              occurring in the first 30 days.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Each day in the system includes:
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Daily Protocol Structure</h3>
              <ol className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <div>
                    <strong className="text-primary">Morning Identity Prompt Review:</strong> 
                    Start each day connecting with your target identity through carefully designed prompts.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <div>
                    <strong className="text-primary">Non-Negotiable Action Execution:</strong> 
                    Complete one specific action that demonstrates your new identity—your &quot;identity vote&quot; for the day.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <div>
                    <strong className="text-primary">Evidence Logging:</strong> 
                    Record the evidence you collected that supports your new identity.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <div>
                    <strong className="text-primary">Progress Tracking:</strong> 
                    Monitor your consistency streak and overall transformation metrics.
                  </div>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Evidence-Based Worksheets
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The system includes specialized worksheets developed from validated 
              psychological instruments and research-validated frameworks:
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Layers className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Identity Baseline</h3>
                  <p className="text-sm text-slate-600">8-dimension diagnostic assessment</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Environmental Audit</h3>
                  <p className="text-sm text-slate-600">Context optimization framework</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#BA68C8]/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-[#BA68C8]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Emotion Regulation</h3>
                  <p className="text-sm text-slate-600">ERQ-based assessment tool</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why This System Works When Others Fail
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Most transformation attempts fail for predictable reasons. The Identity Recode 
              System addresses each failure point:
            </p>

            <div className="space-y-4 my-8">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">Vague Goals → Specific Identity Statements</h4>
                  <p className="text-slate-600 text-sm">The system converts abstract desires into clear identity declarations</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">No Tracking → Daily Evidence Collection</h4>
                  <p className="text-slate-600 text-sm">Every action is logged as evidence, creating visible progress</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">Motivation Dependence → System Reliance</h4>
                  <p className="text-slate-600 text-sm">Protocols work regardless of how motivated you feel</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">All-or-Nothing Thinking → Recovery Protocols</h4>
                  <p className="text-slate-600 text-sm">Built-in failure recovery prevents collapse after setbacks</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">Isolated Efforts → Integrated System</h4>
                  <p className="text-slate-600 text-sm">All components work together synergistically</p>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The BASIC Tier Difference
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Identity Recode System is available as part of the BASIC tier—our 
              comprehensive transformation package designed for serious identity change. 
              Unlike free tools that provide isolated exercises, the BASIC tier offers:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-8">
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">Executive Manual</h4>
                </div>
                <p className="text-sm text-slate-600">Complete operational documentation for every protocol</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">30-Day Planner</h4>
                </div>
                <p className="text-sm text-slate-600">Daily implementation system with progress tracking</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">Assessment Worksheets</h4>
                </div>
                <p className="text-sm text-slate-600">Evidence-based measurement tools for all dimensions</p>
              </div>
              <div className="p-4 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-primary">Tracking Systems</h4>
                </div>
                <p className="text-sm text-slate-600">Evidence logs and decision pattern analysis</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#1F6F78] mt-12 mb-4">
              <Lock className="h-5 w-5" />
              <span className="font-semibold">BASIC Tier Product</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Identity Recode System represents months of research and development, 
              synthesizing the best available science into a practical, actionable framework. 
              It&apos;s designed for people who are serious about transformation—people ready 
              to move from hoping for change to engineering it.
            </p>

            <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] p-8 rounded-xl my-10 text-center">
              <Badge className="mb-4 bg-[#1F6F78]/30 text-white border-0">BASIC</Badge>
              <h3 className="text-white text-xl font-bold mb-3">Start Your 30-Day Transformation</h3>
              <p className="text-slate-300 mb-6">
                Get the complete Identity Recode System with executive manual, planner, and worksheets.
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  View Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Identity transformation isn&apos;t magic—it&apos;s method. The Identity Recode System 
              provides that method, translating decades of psychological research into a 
              practical framework you can implement today.
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

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-[#1F6F78]/30 text-white border-0">BASIC</Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Recode Your Identity?
            </h2>
            <p className="text-slate-300 mb-6">
              Get the complete 30-day transformation system with all worksheets and tracking tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Get Identity Recode System
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/apps/identity-recode-system">
                <Button variant="white" size="lg" className="px-8">
                  Preview System
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
