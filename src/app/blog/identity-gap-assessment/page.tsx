'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Brain, Target, TrendingUp, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

export default function IdentityGapAssessmentArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Self-Assessment
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              The Identity Gap Assessment: Measuring Who You Are vs. Who You Want to Be
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
              The distance between your current self and your ideal self isn&apos;t just a philosophical 
              concept—it&apos;s a measurable gap that research shows directly impacts your mental health, 
              motivation, and life satisfaction.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              A groundbreaking study published in <em>Frontiers in Psychology</em> (2020) found that 
              &quot;identity gaps&quot;—the discrepancies between how we see ourselves and how we want to be 
              seen—are significantly associated with depression symptoms. The larger the gap, the 
              greater the psychological distress.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              What Is an Identity Gap?
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Your identity gap represents the space between your actual self (who you currently are) 
              and your ideal self (who you aspire to become). This isn&apos;t about self-criticism—it&apos;s 
              about honest self-assessment. The research shows that acknowledging this gap is the 
              first step toward closing it.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              According to identity theory developed by Burkitt (2008) and expanded by scholars like 
              McLean and Syed, our identity isn&apos;t fixed—it&apos;s a dynamic construction that we 
              continuously negotiate through our actions, relationships, and self-reflection. The 
              identity gap exists because we&apos;re always in a state of becoming.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;The self is not something ready-made, but something in continuous formation through 
                choice of action.&quot; — John Dewey
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Four Dimensions of Identity Alignment
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research in self-concept and identity development has identified several key dimensions 
              that determine how aligned you are with your ideal identity. Our Identity Gap Assessment 
              measures four critical areas:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Self-Trust</h3>
                  <p className="text-sm text-slate-600">
                    Your ability to trust your own judgment and keep the promises you make to yourself. 
                    Research shows self-trust is foundational to identity coherence.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Clarity</h3>
                  <p className="text-sm text-slate-600">
                    How clearly you can envision who you want to become and what you truly value. 
                    Studies link identity clarity to higher well-being and purpose.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#BA68C8]/10 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-[#BA68C8]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Alignment</h3>
                  <p className="text-sm text-slate-600">
                    The match between your daily actions and your stated values. Misalignment 
                    creates cognitive dissonance and undermines identity development.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#64B5F6]/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-[#64B5F6]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Consistency</h3>
                  <p className="text-sm text-slate-600">
                    Your ability to follow through on commitments regardless of motivation. 
                    Consistency builds identity evidence and reinforces neural pathways.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Science Behind Identity Gaps and Mental Health
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Frontiers in Psychology study (2020) by Jiyoung Park and colleagues examined how 
              identity gaps relate to depression. Their findings were striking: individuals with 
              larger discrepancies between their actual and ideal selves reported significantly 
              higher levels of depressive symptoms.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              But here&apos;s the empowering insight: the research also found that awareness of the 
              gap—consciously acknowledging it—was the first step toward reducing it. Those who 
              understood their identity gaps were better positioned to take action.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This aligns with Self-Discrepancy Theory developed by Edward Higgins (1987), which 
              proposes that different types of self-discrepancies create different emotional 
              vulnerabilities. The gap between actual and ideal selves relates to dejection-related 
              emotions (disappointment, sadness), while the gap between actual and ought selves 
              relates to agitation-related emotions (fear, anxiety).
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">What the Assessment Reveals</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span>Your overall identity gap percentage—how much room for growth exists</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span>Your dominant growth area—the dimension with the most opportunity for transformation</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span>Dimension-specific scores across self-trust, clarity, alignment, and consistency</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span>Actionable insights tailored to your unique gap profile</span>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why Measurement Matters
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              In behavioral psychology, there&apos;s a principle known as the Hawthorne Effect: people 
              change their behavior when they know they&apos;re being observed. The Identity Gap Assessment 
              creates a similar effect—by measuring your alignment, you become more conscious of it.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              James Clear, author of <em>Atomic Habits</em>, emphasizes that identity change starts 
              with awareness. You can&apos;t change what you don&apos;t measure. The assessment provides 
              a baseline—a starting point from which all progress can be tracked.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research on self-monitoring by psychologist Mark Snyder (1974) shows that individuals 
              who regularly assess their behavior are better at aligning their actions with their 
              goals. The Identity Gap Assessment makes this process systematic and measurable.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-4">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">FREE Assessment Available</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Identity Gap Assessment is available at no cost. In just 3 minutes, you&apos;ll 
              receive a comprehensive analysis of where you are versus where you want to be—across 
              all four critical dimensions of identity alignment.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              From Assessment to Action
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Completing the assessment is just the beginning. The real transformation happens 
              when you use the insights to guide your daily actions. Here&apos;s how the assessment 
              connects to tangible change:
            </p>

            <div className="space-y-4 my-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">Identify Your Growth Edge</h4>
                  <p className="text-slate-600 text-sm">
                    The assessment highlights your dominant growth area—the dimension where 
                    improvement will have the greatest impact on your overall identity alignment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">Set Evidence-Based Goals</h4>
                  <p className="text-slate-600 text-sm">
                    With measurable scores, you can set specific targets for improvement and 
                    track your progress over time.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <AlertCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary">Connect to Transformation Tools</h4>
                  <p className="text-slate-600 text-sm">
                    Your results point you toward specific tools and systems designed to close 
                    the gap in your dominant growth area.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The assessment is part of Tamkinly&apos;s FREE tier—our commitment to making 
              evidence-based identity transformation accessible to everyone. Because everyone 
              deserves the clarity that comes from understanding where they are and where 
              they&apos;re headed.
            </p>

            <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] p-8 rounded-xl my-10 text-center">
              <h3 className="text-white text-xl font-bold mb-3">Take the FREE Assessment</h3>
              <p className="text-slate-300 mb-6">
                Discover your identity gap in just 3 minutes. No signup required.
              </p>
              <Link href="/quiz">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Start Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Understanding your identity gap isn&apos;t about judgment—it&apos;s about awareness. 
              It&apos;s about having the information you need to make conscious choices about 
              who you&apos;re becoming. The gap exists whether you measure it or not. Measuring 
              it simply gives you the power to close it.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="identity-gap-assessment" />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-accent/20 text-accent border-0">FREE Assessment</Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Discover Your Identity Gap?
            </h2>
            <p className="text-slate-300 mb-6">
              Take the free 3-minute assessment and get your personalized identity alignment report.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quiz">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Take the Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="white" size="lg" className="px-8">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
