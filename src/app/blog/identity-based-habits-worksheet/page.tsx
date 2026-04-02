'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Target, Zap, RefreshCw, CheckCircle, ArrowUpRight } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "who-am-i-worksheet", title: "The \"Who Am I?\" Self-Discovery Worksheet", readTime: "10 min read" },
  { slug: "physics-of-momentum", title: "The Physics of Momentum: Why 18 Minutes Changes Everything", readTime: "8 min read" },
  { slug: "environmental-audit-worksheet", title: "Environmental Audit: Designing Your Surroundings for Change", readTime: "9 min read" }
];

export default function IdentityBasedHabitsWorksheetArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Habit Formation
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Identity-Based Habits: Transforming Change from the Inside Out
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
              &quot;Every action you take is a vote for the type of person you wish to become.&quot; 
              This single sentence from James Clear&apos;s bestselling book Atomic Habits captures 
              a revolutionary insight: lasting change doesn&apos;t come from focusing on what you 
              want to achieve—it comes from focusing on who you want to become.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The shift from outcome-based to identity-based habits represents one of the most 
              significant advances in behavior change science. Research published in the European 
              Journal of Social Psychology by BPS (British Psychological Society) found that 
              participants who framed their actions in identity terms (&quot;I am a non-smoker&quot;) 
              were significantly more successful than those who used resistance language 
              (&quot;I don&apos;t smoke&quot; or &quot;I can&apos;t smoke&quot;).
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Three Layers of Behavior Change
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Clear&apos;s framework identifies three concentric circles of change. Most people 
              approach transformation from the outside in—focusing on outcomes first. But 
              the most effective approach works from the inside out:
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Outcomes</h3>
                  <p className="text-sm text-slate-600">What you want to achieve (lose 20 pounds, write a book)</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Processes</h3>
                  <p className="text-sm text-slate-600">What you do (exercise daily, write every morning)</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Identity</h3>
                  <p className="text-sm text-slate-600">What you believe (I am fit, I am a writer)</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              &quot;Outcomes are about what you get. Processes are about what you do. Identity is 
              about what you believe,&quot; Clear explains. &quot;With outcome-based habits, the focus 
              is on what you want to achieve. With identity-based habits, the focus is on who 
              you wish to become.&quot;
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Psychology of Identity-Based Change
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The scientific foundation for identity-based habits draws from self-perception 
              theory, developed by Daryl Bem in the 1960s. This theory suggests that we 
              learn about ourselves by observing our own behavior, much like we learn about 
              others by watching what they do.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              When you perform an action repeatedly, you begin to see yourself as someone 
              who does that thing. The action creates evidence for a new identity. As this 
              evidence accumulates, your self-concept shifts to accommodate your behavior.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;The more you repeat a behavior, the more you reinforce the identity associated 
                with that behavior. In fact, the word identity originally meant &apos;repeated beingness.&apos;&quot; 
                — James Clear, Atomic Habits
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Evidence Accumulation Model
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Your identity is not fixed—it&apos;s a running tally of the choices you&apos;ve made. 
              This understanding transforms how we approach habit formation. Instead of 
              relying on willpower, we focus on casting votes for our desired identity.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              A study in the Journal of Personality and Social Psychology found that behavior 
              consistent with one&apos;s identity is performed with greater automaticity and less 
              internal conflict. When an action aligns with who you believe you are, it 
              requires less cognitive effort to perform.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">The Identity Shift Protocol</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span><strong>Decide the type of person you want to be.</strong> What does a healthy person do? What does a productive person do?</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span><strong>Prove it to yourself with small wins.</strong> Start with tiny actions that cast votes for your new identity.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span><strong>Let the evidence accumulate.</strong> Each repetition adds weight to your new self-concept.</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span><strong>Watch the identity solidify.</strong> Over time, the behavior becomes automatic because it&apos;s who you are.</span>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Two-Step Process
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Clear presents a deceptively simple framework for identity transformation: 
              decide the type of person you want to be, then prove it to yourself with 
              small wins. The elegance of this approach lies in its psychological sophistication.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The first step addresses identity—what Clear calls &quot;the deepest level of 
              change.&quot; When you clarify the type of person you want to become, you create 
              a reference point for decision-making. Every choice becomes an opportunity 
              to move toward or away from that identity.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The second step leverages the power of small wins. Research by Teresa Amabile 
              at Harvard Business School found that small achievements create momentum and 
              motivation far disproportionate to their size. Each tiny victory provides 
              psychological fuel for continued progress.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <ArrowUpRight className="h-5 w-5" />
              <span className="font-semibold">The Progress Principle</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              Amabile&apos;s research reveals that the most powerful motivator isn&apos;t external 
              rewards—it&apos;s the sense of progress on meaningful work. When you track small 
              wins aligned with your desired identity, you generate intrinsic motivation 
              that sustains long-term change.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Identity Statements vs. Goals
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Traditional goal-setting focuses on outcomes: &quot;I want to run a marathon.&quot; 
              Identity-based habits focus on the person behind the goal: &quot;I am a runner.&quot; 
              This distinction has profound implications for behavior change.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              When you identify as a runner, running becomes something you do naturally, 
              not something you force yourself to do. The behavior flows from your identity 
              rather than requiring constant willpower and self-control.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="min-w-full bg-white border border-slate-200 rounded-lg">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Goal Approach</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-primary">Identity Approach</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-600">&quot;I want to read more books&quot;</td>
                    <td className="px-6 py-4 text-sm text-slate-600">&quot;I am a reader&quot;</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-600">&quot;I want to lose weight&quot;</td>
                    <td className="px-6 py-4 text-sm text-slate-600">&quot;I am a healthy person&quot;</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-600">&quot;I want to save money&quot;</td>
                    <td className="px-6 py-4 text-sm text-slate-600">&quot;I am financially responsible&quot;</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-slate-600">&quot;I want to learn Spanish&quot;</td>
                    <td className="px-6 py-4 text-sm text-slate-600">&quot;I am a language learner&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Identity-Based Habits Worksheet
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Our worksheet guides you through the complete process of developing identity-based 
              habits. It includes exercises for clarifying your desired identity, identifying 
              identity-aligned behaviors, and tracking your progress as evidence accumulates.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The worksheet structure ensures you don&apos;t skip the critical step of identity 
              definition. Many people jump straight to behavior change without ever clarifying 
              who they want to become. This shortcut leads to unsustainable change because 
              the new behavior has no identity anchor.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">What&apos;s Included in the Worksheet</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Identity clarification prompts to define who you want to become</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Habit-stacking templates based on James Clear&apos;s methodology</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Small wins tracking system to accumulate identity evidence</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Progress reflection questions to reinforce new identity</span>
                </li>
              </ul>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research consistently shows that structured approaches to behavior change 
              outperform unstructured attempts. The worksheet provides the framework you 
              need to implement identity-based habits systematically.
            </p>

            <p className="text-slate-600 leading-relaxed">
              The difference between who you are and who you want to be is not measured 
              in grand gestures or dramatic transformations. It&apos;s measured in the quiet 
              accumulation of small actions that cast votes for your new identity. Every 
              repetition counts. Every choice matters. Start casting votes today.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="identity-based-habits-worksheet" />

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
              Start Building Identity-Based Habits Today
            </h2>
            <p className="text-slate-300 mb-6">
              Get the complete worksheet based on James Clear&apos;s Atomic Habits methodology.
            </p>
            <Link href="/worksheets/identity-based-habits">
              <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                Get the Worksheet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
