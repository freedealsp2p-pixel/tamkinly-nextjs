'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Home, Building2, Users, CheckCircle, Settings, ArrowUpRight } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "identity-based-habits-worksheet", title: "Identity-Based Habits: The James Clear Method", readTime: "10 min read" },
  { slug: "identity-baseline-8d-worksheet", title: "The Identity Baseline 8D Framework", readTime: "8 min read" },
  { slug: "who-am-i-worksheet", title: "The \"Who Am I?\" Self-Discovery Worksheet", readTime: "10 min read" }
];

export default function EnvironmentalAuditWorksheetArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Environmental Design
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Environmental Audit: Designing Your Surroundings for Lasting Change
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
              &quot;Environment is the invisible hand that shapes human behavior.&quot; James Clear&apos;s 
              observation captures a fundamental truth often overlooked in personal development: 
              your surroundings are constantly influencing your choices, often without your 
              conscious awareness.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research in environmental psychology has established that our physical 
              surroundings profoundly impact our behavior, mood, and even our sense of 
              identity. A landmark study published in the Journal of Environmental Psychology 
              found that environmental factors account for a significant portion of the 
              variance in behavior change success—sometimes more than individual motivation.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Science of Environmental Influence
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Kurt Lewin, one of the pioneers of social psychology, proposed that behavior 
              is a function of both person and environment: B = f(P, E). This elegant 
              formulation reminds us that lasting change requires addressing both internal 
              factors (identity, motivation, skills) and external factors (environment, 
              context, cues).
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Modern research has validated Lewin&apos;s insight. Studies on habit formation 
              consistently show that environmental design—structuring your surroundings 
              to make desired behaviors easier and undesired behaviors harder—dramatically 
              increases the likelihood of sustained change.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;Small changes in context can lead to large changes in behavior over time. 
                By designing our environments thoughtfully, we reduce the cognitive load 
                required for good decisions.&quot;
                — Wendy Wood, author of Good Habits, Bad Habits
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Three Layers of Environment
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Environmental influence operates across multiple layers, each requiring 
              different strategies for optimization. The Environmental Audit Worksheet 
              addresses all three:
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Home className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Physical Environment</h3>
                  <p className="text-sm text-slate-600">Your spaces, objects, and their arrangement—what you see, touch, and interact with daily</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Social Environment</h3>
                  <p className="text-sm text-slate-600">The people around you—their behaviors, expectations, and influence on your choices</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Digital Environment</h3>
                  <p className="text-sm text-slate-600">Your devices, apps, and online spaces—the virtual contexts that command attention</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Physical Environment: Designing for Success
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Your physical environment constantly cues certain behaviors and inhibits 
              others. Research by Brian Wansink at Cornell University demonstrated that 
              environmental factors like plate size, food visibility, and package design 
              significantly influence eating behavior—often more than conscious intentions.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The principle is simple: make desired behaviors visible, accessible, and 
              frictionless; make undesired behaviors invisible, inconvenient, and 
              friction-heavy. This is the essence of &quot;choice architecture&quot;—designing 
              environments that nudge behavior in positive directions.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Physical Environment Audit Prompts</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>What objects in your space cue desired behaviors?</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>What objects cue undesired behaviors?</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Where do you spend most of your time?</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>What&apos;s the friction level for your target behaviors?</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Social Environment: The Company You Keep
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Social psychologists have long known that behavior is contagious. A seminal 
              study by Nicholas Christakis and James Fowler, published in the New England 
              Journal of Medicine, showed that health behaviors spread through social 
              networks—your friends&apos; friends&apos; friends can influence your health.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The social environment shapes identity through modeling, norms, and 
              reinforcement. If everyone around you exercises, exercises becomes normal. 
              If everyone around you complains, complaining becomes normal. Your social 
              environment is constantly teaching you who you should be.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Environmental Audit includes assessment of your social environment: 
              who supports your desired identity, who undermines it, and what 
              communities might provide the reinforcement you need for transformation.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Digital Environment: Taming the Attention Economy
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              In the modern era, your digital environment may be the most influential 
              context of all. Research shows that the average person checks their phone 
              96 times per day—once every 10 minutes of waking life. Each notification, 
              app icon, and social media feed shapes your attention, mood, and behavior.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Tristan Harris, former Google design ethicist and founder of the Center 
              for Humane Technology, warns that our devices are designed to exploit 
              psychological vulnerabilities. Without intentional design, your digital 
              environment works against your goals rather than for them.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Settings className="h-5 w-5" />
              <span className="font-semibold">The Digital Design Principle</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The worksheet guides you through auditing your digital spaces: which apps 
              serve your identity goals, which drain your time and energy, and how to 
              restructure your digital environment to support transformation.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Environment-Behavior Loop
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Behavior creates environmental changes, which then influence future behavior. 
              This feedback loop can work for or against you. When you clean your desk, 
              the improved environment makes focused work easier, which reinforces the 
              tidiness habit. Conversely, clutter begets more clutter.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Understanding this loop reveals why environment design is so powerful: 
              small environmental changes create cascading effects that compound over 
              time. One-time setup investments yield ongoing behavioral dividends.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">What&apos;s Included in the Environmental Audit</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Comprehensive physical space assessment and redesign prompts</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Social network mapping and influence evaluation</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Digital environment audit and optimization guide</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Implementation plan for environmental changes</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Progress tracking templates for ongoing optimization</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              From Insight to Environmental Design
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Environmental Audit Worksheet doesn&apos;t just identify problems—it provides 
              a framework for solutions. Each audit section includes specific intervention 
              strategies backed by behavioral science research.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The worksheet guides you through what researchers call &quot;implementation 
              intentions&quot;—specific plans that link situations to behaviors. When you 
              decide in advance how you&apos;ll restructure your environment, you remove 
              decision fatigue from the equation.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <ArrowUpRight className="h-5 w-5" />
              <span className="font-semibold">The Environment First Principle</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              When behavior change fails, most people blame themselves—not enough 
              willpower, not enough motivation. But research suggests a different 
              approach: blame the environment first. If the environment makes the 
              desired behavior difficult, willpower will always lose eventually.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Your environment is always working, always influencing, always shaping. 
              The question isn&apos;t whether your environment affects you—it&apos;s whether 
              you&apos;ve designed it to work for your goals or against them. The 
              Environmental Audit gives you the tools to make your environment your 
              greatest ally in identity transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="environmental-audit-worksheet" />

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
              Audit Your Environment for Transformation
            </h2>
            <p className="text-slate-300 mb-6">
              Get the complete Environmental Audit worksheet with assessment tools and action plans.
            </p>
            <Link href="/worksheets/environmental-audit">
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
