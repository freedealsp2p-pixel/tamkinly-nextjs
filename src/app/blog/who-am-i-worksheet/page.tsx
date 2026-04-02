'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Target, Users, Heart, Lightbulb, CheckCircle } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "identity-based-habits-worksheet", title: "Identity-Based Habits: The James Clear Method", readTime: "10 min read" },
  { slug: "self-authorship-worksheet", title: "Self-Authorship: Writing Your Own Story", readTime: "9 min read" },
  { slug: "identity-baseline-8d-worksheet", title: "The Identity Baseline 8D Framework", readTime: "8 min read" }
];

export default function WhoAmIWorksheetArticle() {
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
              The &quot;Who Am I?&quot; Worksheet: A Science-Backed Guide to Self-Discovery
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
              The question &quot;Who am I?&quot; has echoed through centuries of human thought, yet most of us 
              navigate life without ever truly answering it. Research shows that individuals with high 
              self-concept clarity—the extent to which their self-beliefs are clearly and confidently 
              defined—experience significantly better mental health outcomes and life satisfaction.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              A landmark study by Campbell and colleagues (1996) published in the Journal of Personality 
              and Social Psychology found that people with low self-concept clarity were more prone to 
              depression, anxiety, and chronic indecision. The researchers discovered that knowing who 
              you are isn&apos;t just philosophical—it&apos;s foundational to psychological well-being.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Science of Self-Concept Clarity
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Self-concept clarity refers to the internal consistency and stability of your beliefs 
              about yourself. When you possess high clarity, you can articulate your values, strengths, 
              and areas for growth without contradiction or confusion. You know what you stand for, 
              what drives your decisions, and what gives your life meaning.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research published in the Personality and Social Psychology Bulletin demonstrates that 
              individuals with high self-concept clarity show greater resilience during life transitions. 
              They adapt more effectively to change because their core identity remains stable even as 
              circumstances shift around them.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;The unexamined life is not worth living,&quot; Socrates declared over two millennia ago. 
                Modern psychology has confirmed what philosophers long suspected: self-knowledge 
                is not a luxury—it&apos;s a necessity for flourishing.
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Three Dimensions of Identity
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Contemporary identity research identifies three critical dimensions that shape who we are. 
              Understanding these dimensions provides the framework for meaningful self-exploration:
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Personal Identity</h3>
                  <p className="text-sm text-slate-600">Your unique traits, values, beliefs, and experiences that distinguish you from others</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Social Identity</h3>
                  <p className="text-sm text-slate-600">The groups, communities, and relationships that shape your sense of belonging</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Possible Selves</h3>
                  <p className="text-sm text-slate-600">Your envisioned future identities—hoped-for and feared versions of yourself</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              Hazel Markus and Paula Nurius introduced the concept of &quot;possible selves&quot; in their 
              influential 1986 research, showing that our visions of future identity significantly 
              influence present behavior. When you can clearly articulate who you want to become, 
              you&apos;re more likely to take actions aligned with that vision.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why Self-Discovery Worksheets Work
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The structured format of a self-discovery worksheet provides several evidence-based 
              advantages over informal reflection. A study in the Journal of Experimental Psychology 
              found that writing down thoughts produces measurable cognitive benefits compared to 
              simply thinking about them.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              When you externalize your inner experience through structured prompts, you engage 
              different neural networks than those involved in passive contemplation. This process 
              of &quot;externalizing cognition&quot; helps identify patterns and connections that might 
              otherwise remain invisible.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Research-Backed Benefits of Self-Discovery Writing</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Increased self-awareness and emotional intelligence (Journal of Personality Assessment)</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Reduced symptoms of anxiety and depression through expressive writing (APA)</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Improved decision-making aligned with personal values (Journal of Behavioral Decision Making)</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Greater sense of purpose and life meaning (Journal of Positive Psychology)</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Identity Exploration Framework
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Our &quot;Who Am I?&quot; worksheet guides you through five essential domains of self-discovery. 
              Each domain draws from established psychological research to ensure comprehensive 
              identity exploration:
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              <strong className="text-primary">Values and Beliefs:</strong> Research by Shalom Schwartz 
              identified ten universal values that motivate human behavior across cultures. Understanding 
              which values guide your decisions reveals the architecture of your identity.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              <strong className="text-primary">Strengths and Talents:</strong> The VIA Classification 
              of Strengths, developed by Peterson and Seligman, provides a framework for identifying 
              your core character strengths. Studies show that using your signature strengths leads 
              to greater happiness and fulfillment.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              <strong className="text-primary">Life Experiences:</strong> Narrative identity research 
              by Dan McAdams demonstrates that the stories we tell about our lives shape who we become. 
              Understanding your narrative helps integrate past experiences into a coherent sense of self.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              <strong className="text-primary">Relationships and Roles:</strong> Social identity theory, 
              developed by Tajfel and Turner, shows how group memberships and relationships contribute 
              to self-concept. Examining these connections reveals how you define yourself in relation to others.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              <strong className="text-primary">Future Vision:</strong> Goal-setting research by Locke 
              and Latham demonstrates that clear, specific goals increase motivation and achievement. 
              Articulating your desired future self creates a target for identity transformation.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              From Insight to Action
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Self-discovery without application is incomplete. The final section of the worksheet 
              bridges insight to action by identifying specific changes aligned with your authentic self. 
              Research on implementation intentions shows that when you create specific plans connecting 
              situations to behaviors, you&apos;re far more likely to follow through.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Lightbulb className="h-5 w-5" />
              <span className="font-semibold">The Transformation Principle</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The journey of self-discovery is not a destination but a continuous process. As you 
              grow and evolve, your understanding of yourself deepens. The &quot;Who Am I?&quot; worksheet 
              provides a foundation for ongoing reflection, a snapshot you can return to and revise 
              as your identity develops.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Identity transformation begins with clarity. Before you can become who you want to be, 
              you must understand who you are. The research is clear: individuals with high self-concept 
              clarity navigate life&apos;s challenges with greater confidence and purpose.
            </p>

            <p className="text-slate-600 leading-relaxed">
              The question &quot;Who am I?&quot; deserves more than a passing thought. It deserves structured, 
              systematic exploration. Your future self will thank you for the investment you make today.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="who-am-i-worksheet" />

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
              Ready to Discover Your Authentic Self?
            </h2>
            <p className="text-slate-300 mb-6">
              Get the complete &quot;Who Am I?&quot; worksheet with guided prompts based on psychological research.
            </p>
            <Link href="/worksheets/who-am-i">
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
