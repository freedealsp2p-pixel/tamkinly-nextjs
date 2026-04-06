'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  BookOpen,
  Video,
  FileText,
  Mail,
  ExternalLink,
  Brain,
  Target,
  TrendingUp,
  Users,
  Sparkles,
  CheckCircle2,
  Clock
} from "lucide-react";

// Hero Section
function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/10">
            Free Resources
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Resources for Your{" "}
            <span className="text-accent">Journey</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Free tools, guides, and content to support your transformation. 
            No email required (unless noted).
          </p>
        </div>
      </div>
    </section>
  );
}

// Free Resources Section
function ResourcesSection() {
  const resources = [
    {
      icon: FileText,
      category: "Assessment",
      title: "Identity Assessment Quiz",
      description: "Discover where you are on your identity journey with our free 20-question assessment. Get personalized insights instantly.",
      action: "Take Quiz",
      href: "/quiz",
      free: true
    },
    {
      icon: BookOpen,
      category: "Guide",
      title: "Identity vs. Behavior Change",
      description: "A deep dive into why traditional self-improvement fails and the identity-first approach that creates lasting transformation.",
      action: "Read Guide",
      href: "#identity-research",
      free: true
    },
    {
      icon: Video,
      category: "Video Series",
      title: "The Four Phases Explained",
      description: "Watch our 4-part video series breaking down each phase of the Identity Reconstruction Framework.",
      action: "Coming Soon",
      href: "#",
      free: true,
      comingSoon: true
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {resources.map((resource, idx) => (
            <Card key={idx} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                      <resource.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {resource.category}
                      </Badge>
                      {resource.comingSoon && (
                        <Badge className="bg-amber-100 text-amber-700 text-xs">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-primary mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {resource.description}
                    </p>
                    {resource.comingSoon ? (
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Available Soon
                      </span>
                    ) : (
                      <Button asChild variant="link" className="p-0 h-auto text-accent">
                        <Link href={resource.href}>
                          {resource.action}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Identity vs Behavior Change Research Section
function IdentityResearchSection() {
  const keyInsights = [
    {
      title: "Habits and Identity: Behavioral, Cognitive, Affective, and Motivational Aspects",
      source: "Verplanken & Sui",
      insight: "Explains how habits become linked to identity and the \"true self,\" showing that connecting behavior to identity strengthens self-esteem and self-integration. This is one of the best sources for understanding why change becomes more durable when it becomes \"part of who I am\" rather than just a new habit.",
      icon: Brain
    },
    {
      title: "Centered Identity Transformation to Reduce Executive Function Burden",
      source: "Caldwell et al.",
      insight: "Research demonstrating that identity transformation can reduce the executive burden required to maintain behavior change. When behavior is integrated into identity, it requires less willpower and conscious effort to sustain.",
      icon: Target
    },
    {
      title: "The Influence of Identity Within-Person and Between Behaviours",
      source: "PMC Study (2025)",
      insight: "Discusses the relationship between identity and behavior, showing that identity may be difficult to change, but is highly valuable when designing behavioral interventions. Identity interacts with intention, habit, and self-determined motivation.",
      icon: TrendingUp
    },
    {
      title: "Does Monitoring Goal Progress Promote Goal Attainment?",
      source: "Harkin et al. (Meta-Analysis)",
      insight: "Shows that progress monitoring supports goal achievement. This is crucial because identity-based change needs a practical system to see behavioral evidence over time—exactly what tracking provides.",
      icon: CheckCircle2
    }
  ];

  return (
    <section id="identity-research" className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent">
              <BookOpen className="w-3 h-3 mr-1" />
              Research-Based Guide
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
              Identity vs. Behavior Change
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Why traditional self-improvement often fails, and what the science says about lasting transformation.
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">What is Behavior Change?</h3>
              <p className="text-slate-600 leading-relaxed">
                Behavior change means altering what a person does: waking up earlier, exercising, journaling, 
                or reducing procrastination. It often relies on goals, reminders, habit loops, and willpower. 
                That approach can work, but it may remain fragile if it is not connected to a deeper self-concept.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">What is Identity Change?</h3>
              <p className="text-slate-600 leading-relaxed">
                Identity change means shifting the internal story of &quot;who I am.&quot; Instead of only asking, 
                &quot;What should I do?&quot; the person begins asking, &quot;What would someone like me do?&quot; 
                Research on habit and identity shows that when habits feel tied to the true self, 
                they are associated with stronger cognitive self-integration, higher self-esteem, 
                and a stronger striving toward an ideal self.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary to-[#1F6F78] rounded-xl p-8 shadow-sm mb-8">
              <h3 className="font-serif text-2xl font-bold text-white mb-4">Why Identity Change is More Durable</h3>
              <p className="text-slate-300 leading-relaxed">
                Behavior change can produce short-term results, but identity change tends to make the behavior 
                easier to maintain under stress. Caldwell et al. describe &quot;centered identity transformation&quot; 
                as a process in which the new behavior becomes integrated into a person&apos;s roles, values, 
                and self-representations, reducing reliance on effortful executive control over time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">How the Two Are Connected</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Behavior is the visible expression of identity, and identity is reinforced by repeated behavior. 
                A person does not usually transform by thinking alone; they transform by repeated action that 
                becomes evidence for a new self-view.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The 2025 PMC study on identity and behavior notes that identity is associated with behavior 
                at both within-person and between-person levels, and that intention, self-determined motivation, 
                and habit all interact with identity in long-term change.
              </p>
            </div>
          </div>

          {/* Research Insights */}
          <div className="mb-12">
            <h3 className="font-serif text-2xl font-bold text-primary mb-6 text-center">
              Key Research Findings
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {keyInsights.map((insight, idx) => (
                <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                          <insight.icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary text-sm mb-1">
                          {insight.title}
                        </h4>
                        <p className="text-xs text-accent mb-2">{insight.source}</p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {insight.insight}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Practical Application */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-primary mb-6">
              Practical Meaning for Tamkinly
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              For an app like Tamkinly, the best model is not &quot;track habits only,&quot; but reverse-engineer 
              the identity behind the goal. That means:
            </p>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                <div>
                  <h4 className="font-semibold text-primary">Define the Target Identity</h4>
                  <p className="text-sm text-slate-600">Who must you become for the behavior to be natural?</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                <div>
                  <h4 className="font-semibold text-primary">Identify Supporting Behaviors</h4>
                  <p className="text-sm text-slate-600">What would that identity repeatedly do?</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                <div>
                  <h4 className="font-semibold text-primary">Design the Environment</h4>
                  <p className="text-sm text-slate-600">Create conditions that support those behaviors.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                <div>
                  <h4 className="font-semibold text-primary">Track Evidence</h4>
                  <p className="text-sm text-slate-600">Build proof until the new identity becomes believable.</p>
                </div>
              </li>
            </ol>

            <div className="mt-8 p-6 bg-accent/5 rounded-lg border-l-4 border-accent">
              <h4 className="font-semibold text-primary mb-2">Key Takeaway</h4>
              <p className="text-slate-600 leading-relaxed">
                If behavior change asks, &quot;What should I do tomorrow?&quot;, identity change asks, 
                &quot;Who must I become for tomorrow&apos;s behavior to be natural?&quot; 
                Sources on habits and identity consistently show that linking behavior to self-concept 
                supports stronger self-integration, better persistence, and more effective long-term change.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Newsletter Section
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto border-0 shadow-lg overflow-hidden">
          <div className="grid sm:grid-cols-2">
            <div className="bg-primary p-8 lg:p-10">
              <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Weekly Insights
              </h3>
              <p className="text-slate-300 text-sm">
                Join thousands receiving weekly identity insights, journal prompts, and transformation tools.
              </p>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              {subscribed ? (
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="font-semibold text-primary">You&apos;re subscribed!</p>
                  <p className="text-sm text-slate-500">Check your inbox for a welcome email.</p>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email) return;
                  setSubscribing(true);
                  try {
                    const res = await fetch('/api/email/subscribe', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, source: 'resources-page' })
                    });
                    if (res.ok) {
                      setSubscribed(true);
                    }
                  } catch { /* silent fail */ }
                  finally { setSubscribing(false); }
                }} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                  <Button disabled={subscribing} className="w-full bg-accent text-primary hover:bg-accent/90">
                    {subscribing ? 'Subscribing...' : 'Subscribe'}
                  </Button>
                  <p className="text-xs text-slate-500 text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

// Articles Section
function ArticlesSection() {
  const articles = [
    {
      title: "The Physics of Momentum: Why 18 Minutes Changes Everything",
      excerpt: "Discover how the science of momentum and habit formation can transform your identity.",
      readTime: "8 min read",
      category: "Identity Shift",
      slug: "physics-of-momentum"
    },
    {
      title: "The Magic Is in the Work You Avoid",
      excerpt: "That uncomfortable task you keep putting off? It holds the key to your transformation.",
      readTime: "6 min read",
      category: "Transformation",
      slug: "magic-in-work-you-avoid"
    },
    {
      title: "The Identity Millionaire: Building Wealth Through Self-Transformation",
      excerpt: "True wealth starts with who you become, not what you acquire.",
      readTime: "9 min read",
      category: "Wealth & Identity",
      slug: "identity-millionaire"
    },
    {
      title: "Five Steps to Miracles: A Framework for Identity Liberation",
      excerpt: "Surrender the old versions of yourself. Step into who you were meant to be.",
      readTime: "10 min read",
      category: "Self-Liberation",
      slug: "five-steps-to-miracles"
    },
    {
      title: "Work on Yourself: The Psycho-Cybernetics of Identity",
      excerpt: "Your self-image controls everything. Change the inner image, change everything.",
      readTime: "10 min read",
      category: "Self-Image",
      slug: "work-on-yourself"
    },
    {
      title: "The 24-Hour Dopamine Reset: Reclaiming Your Focus",
      excerpt: "Reset your motivation system in just one day and rediscover natural drive.",
      readTime: "12 min read",
      category: "Mental Clarity",
      slug: "dopamine-reset"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            Latest Articles
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            Deep Dives
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {articles.map((article, idx) => (
            <Link key={idx} href={`/blog/${article.slug}`}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group h-full">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-2 text-xs text-[#1F6F78] border-[#1F6F78]/30">
                    {article.category}
                  </Badge>
                  <h3 className="font-semibold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{article.readTime}</span>
                    <span className="text-accent text-sm flex items-center gap-1">
                      Read <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready for the Full Experience?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            The Identity Recode Planner brings all these concepts together in a practical, 
            30-day transformation journey.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
              View Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function ResourcesPage() {
  return (
    <>
      <HeroSection />
      <ResourcesSection />
      <IdentityResearchSection />
      <NewsletterSection />
      <ArticlesSection />
      <CTASection />
    </>
  );
}
