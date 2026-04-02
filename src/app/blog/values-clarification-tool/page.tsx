'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Heart, Star, Target, Compass, Sparkles, CheckCircle2 } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "identity-gap-assessment", title: "The Identity Gap Assessment: Measuring Who You Are vs. Who You Want to Be", readTime: "10 min read" },
  { slug: "physics-of-momentum", title: "The Physics of Momentum: Why 18 Minutes Changes Everything", readTime: "8 min read" },
  { slug: "work-on-yourself", title: "Work on Yourself: Psycho-Cybernetics", readTime: "10 min read" }
];

export default function ValuesClarificationToolArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Self-Discovery
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Values Clarification: The Foundation of Authentic Identity
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
              Your values are the invisible architecture of your identity. When you know what 
              truly matters to you, every decision becomes clearer, every action more aligned, 
              and every step forward more purposeful.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research in positive psychology has consistently shown that values clarity—the 
              clear understanding of what matters most to you—is strongly associated with 
              psychological well-being, life satisfaction, and a sense of purpose. A study 
              published in the <em>Journal of Research in Personality</em> found that individuals 
              with clear personal values reported significantly higher levels of meaning in life 
              and lower levels of anxiety and depression.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              What Is Values Clarification?
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Values clarification is the process of identifying, examining, and prioritizing 
              the principles that guide your life. Unlike goals—which are destinations you 
              achieve—values are directions you travel. You don&apos;t &quot;achieve&quot; honesty or 
              creativity; you live in alignment with them.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This distinction is crucial for identity transformation. When your actions align 
              with your values, you reinforce the neural pathways of your desired identity. 
              When there&apos;s misalignment, you create cognitive dissonance—a psychological tension 
              that undermines your sense of self.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;Values are like fingerprints. Nobody&apos;s are the same, but you leave &apos;em all 
                over everything you do.&quot; — Elvis Presley
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Science: Values and Psychological Well-Being
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The connection between values clarity and well-being is well-documented in 
              psychological research. Acceptance and Commitment Therapy (ACT), developed by 
              Steven Hayes, places values clarification at its core. Research shows that ACT 
              interventions focusing on values lead to significant improvements in psychological 
              flexibility and reduced symptoms of anxiety and depression.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              A comprehensive meta-analysis published in <em>Psychological Bulletin</em> examined 
              82 studies on values and well-being. The findings were clear: people who understood 
              their core values and lived in alignment with them reported higher life satisfaction, 
              greater sense of purpose, and stronger relationships.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Compass className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Direction</h3>
                  <p className="text-sm text-slate-600">Values provide a compass for navigating life&apos;s decisions</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Purpose</h3>
                  <p className="text-sm text-slate-600">Clear values create a sense of meaning and significance</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#BA68C8]/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-[#BA68C8]" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Alignment</h3>
                  <p className="text-sm text-slate-600">Living your values reduces cognitive dissonance</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Values-Identity Connection
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Your values and your identity are deeply interconnected. In fact, many identity 
              scholars argue that values form the core of identity. When you say &quot;I am an 
              honest person,&quot; you&apos;re not just describing a trait—you&apos;re declaring a value that 
              shapes your behavior, relationships, and self-concept.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              James Clear&apos;s identity-based habit framework builds on this connection. He argues 
              that lasting change comes not from focusing on what you want to achieve, but on 
              who you want to become. And who you want to become is defined by your values.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Values Clarification Tool helps you discover this foundation. By selecting 
              and ranking your top values, you create a personal hierarchy that can guide every 
              decision—from small daily choices to major life directions.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">The Two-Step Clarification Process</h3>
              <ol className="space-y-4 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <div>
                    <strong className="text-primary">Selection:</strong> Browse through values across six categories—Personal Growth, Achievement, Relationships, Integrity, Well-being, and Contribution. Choose 5-10 that resonate most deeply with you.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <div>
                    <strong className="text-primary">Ranking:</strong> Order your top 5 values by importance. This prioritization reveals your core identity pillars.
                  </div>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why Ranking Matters
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Selecting values is important, but ranking them reveals something deeper. When 
              forced to choose between competing values—family versus career, freedom versus 
              security, growth versus stability—your ranking shows what truly drives your decisions.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research on values conflicts shows that internal tension often arises not from 
              lacking values, but from unclear prioritization. When you know your #1 value is 
              family, decisions that sacrifice work time for family time feel aligned rather 
              than conflicted.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The tool presents values across six meaningful categories:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-8">
              <div className="p-4 rounded-lg bg-[#3DD4B0]/10">
                <div className="w-3 h-3 rounded-full bg-[#3DD4B0] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">Personal Growth</h4>
                <p className="text-xs text-slate-500">Growth, Wisdom, Creativity, Curiosity</p>
              </div>
              <div className="p-4 rounded-lg bg-[#FFB74D]/10">
                <div className="w-3 h-3 rounded-full bg-[#FFB74D] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">Achievement</h4>
                <p className="text-xs text-slate-500">Achievement, Ambition, Competence</p>
              </div>
              <div className="p-4 rounded-lg bg-[#E57373]/10">
                <div className="w-3 h-3 rounded-full bg-[#E57373] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">Relationships</h4>
                <p className="text-xs text-slate-500">Family, Friendship, Love, Compassion</p>
              </div>
              <div className="p-4 rounded-lg bg-[#64B5F6]/10">
                <div className="w-3 h-3 rounded-full bg-[#64B5F6] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">Integrity</h4>
                <p className="text-xs text-slate-500">Honesty, Integrity, Justice, Responsibility</p>
              </div>
              <div className="p-4 rounded-lg bg-[#BA68C8]/10">
                <div className="w-3 h-3 rounded-full bg-[#BA68C8] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">Well-being</h4>
                <p className="text-xs text-slate-500">Health, Balance, Peace, Freedom</p>
              </div>
              <div className="p-4 rounded-lg bg-[#81C784]/10">
                <div className="w-3 h-3 rounded-full bg-[#81C784] mb-2"></div>
                <h4 className="font-semibold text-primary text-sm">Contribution</h4>
                <p className="text-xs text-slate-500">Service, Legacy, Community, Mentoring</p>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              From Values to Action
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Clarifying your values is powerful, but it&apos;s only the first step. The real 
              transformation comes from living in alignment with them. This is where the 
              Values Clarification Tool connects to the broader identity transformation framework.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              After completing the tool, you&apos;ll receive reflection questions designed to 
              deepen your understanding:
            </p>

            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <Star className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">How do your daily actions reflect your top value?</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">When did you last make a decision that conflicted with these values?</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">What would your life look like if you fully embodied these values?</span>
              </li>
              <li className="flex items-start gap-3">
                <Star className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">Which of these values needs more attention in your current life?</span>
              </li>
            </ul>

            <p className="text-slate-600 leading-relaxed mb-6">
              These questions bridge the gap between intellectual understanding and behavioral 
              change. They invite you to examine the alignment between your stated values and 
              your lived reality.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-4">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">FREE Tool Available</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Values Clarification Tool is available at no cost. In about 5 minutes, you&apos;ll 
              discover and rank your top 5 core values—the principles that define who you are 
              and who you want to become.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Ripple Effect of Values Clarity
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              When you clarify your values, something remarkable happens. Decision-making becomes 
              easier because you have a clear hierarchy. Goal-setting becomes more meaningful 
              because your goals align with what matters most. And identity transformation becomes 
              more natural because you&apos;re clear about who you&apos;re becoming.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research on self-concordant goals—goals aligned with your values—shows that people 
              who pursue value-aligned goals experience higher well-being and greater goal 
              achievement. When your goals express your values, you have more intrinsic motivation 
              to pursue them.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Values Clarification Tool is part of Tamkinly&apos;s FREE tier because we believe 
              everyone deserves this foundational clarity. Knowing your values isn&apos;t a luxury—
              it&apos;s essential for authentic identity transformation.
            </p>

            <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] p-8 rounded-xl my-10 text-center">
              <h3 className="text-white text-xl font-bold mb-3">Discover Your Core Values</h3>
              <p className="text-slate-300 mb-6">
                Take the free 5-minute values clarification exercise. Find out what truly drives you.
              </p>
              <Link href="/apps/values-clarification">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Start Clarifying Values
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Your values are already within you, guiding your decisions whether you&apos;re 
              conscious of them or not. Clarification simply brings them into awareness, 
              giving you the power to intentionally shape your identity around what matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="values-clarification-tool" />

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
            <Badge className="mb-4 bg-accent/20 text-accent border-0">FREE Tool</Badge>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Discover What Matters Most?
            </h2>
            <p className="text-slate-300 mb-6">
              Clarify your core values in just 5 minutes. No signup required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apps/values-clarification">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Clarify Your Values
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
