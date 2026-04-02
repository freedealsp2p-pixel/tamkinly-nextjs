'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Target, Layers, Brain, Heart, CheckCircle, Activity } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "who-am-i-worksheet", title: "The \"Who Am I?\" Self-Discovery Worksheet", readTime: "10 min read" },
  { slug: "identity-based-habits-worksheet", title: "Identity-Based Habits: The James Clear Method", readTime: "10 min read" },
  { slug: "environmental-audit-worksheet", title: "Environmental Audit: Designing Your Surroundings for Change", readTime: "9 min read" }
];

const eightDimensions = [
  { title: "Physical", description: "Your relationship with your body, health, and physical environment" },
  { title: "Intellectual", description: "Your relationship with learning, knowledge, and cognitive growth" },
  { title: "Emotional", description: "Your relationship with feelings, emotional expression, and regulation" },
  { title: "Social", description: "Your relationship with community, belonging, and social connection" },
  { title: "Occupational", description: "Your relationship with work, career, and professional identity" },
  { title: "Spiritual", description: "Your relationship with meaning, purpose, and values" },
  { title: "Financial", description: "Your relationship with money, resources, and financial security" },
  { title: "Environmental", description: "Your relationship with your surroundings and physical spaces" }
];

export default function IdentityBaseline8DWorksheetArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Identity Assessment
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              The Identity Baseline 8D Framework: A Complete Self-Assessment
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
              True transformation requires a starting point. Before you can chart a course 
              to who you want to become, you must understand who you are across every 
              dimension of your life. The Identity Baseline 8D Framework provides that 
              comprehensive foundation.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This framework draws from multiple research traditions in psychology and 
              wellness. The eight-dimensional model has roots in the wellness literature 
              developed at institutions like the University of California, Davis, and has 
              been validated through decades of application in counseling and personal 
              development contexts.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why Eight Dimensions?
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research on self-concept clarity shows that a fragmented understanding of 
              oneself leads to poor decision-making, chronic dissatisfaction, and 
              psychological distress. Most self-assessment tools focus on a single 
              domain—career, health, or relationships—missing the interconnected nature 
              of human identity.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The 8D framework recognizes that identity is multidimensional. Your 
              professional struggles may stem from financial beliefs, which connect 
              to family patterns, which influence your emotional regulation. Each 
              dimension influences and is influenced by the others in a complex system.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;You cannot change what you do not measure, and you cannot measure what 
                you do not define. The eight dimensions provide both definition and 
                measurement for comprehensive self-assessment.&quot;
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Eight Dimensions of Identity
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Each dimension represents a distinct domain of identity, yet all are 
              interconnected. Research shows that interventions targeting one dimension 
              often produce positive effects across others—evidence of the holistic 
              nature of human identity.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-10">
              {eightDimensions.map((dim, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-accent">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-1">{dim.title}</h3>
                        <p className="text-sm text-slate-600">{dim.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Science of Holistic Self-Assessment
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The value of multi-dimensional self-assessment is supported by research in 
              several fields. Studies in health psychology demonstrate that interventions 
              addressing multiple life domains produce more sustainable behavior change 
              than single-domain approaches.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              A comprehensive review published in the Annual Review of Psychology found 
              that life satisfaction depends on perceived balance across domains, not 
              just achievement in any single area. High performers who neglect certain 
              dimensions often report lower overall well-being despite external success.
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Pattern Recognition</h3>
                  <p className="text-sm text-slate-600">Identify connections across dimensions you never noticed</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Targeted Growth</h3>
                  <p className="text-sm text-slate-600">Focus development efforts where they&apos;ll have the most impact</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Progress Tracking</h3>
                  <p className="text-sm text-slate-600">Measure change over time with repeatable assessments</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              How the Baseline Works
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Identity Baseline 8D Worksheet guides you through a structured assessment 
              of each dimension. For each domain, you&apos;ll evaluate your current state, 
              identify strengths, acknowledge growth edges, and clarify your desired state.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">The Assessment Process</h3>
              <ol className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span><strong>Rate current satisfaction</strong> on a 1-10 scale for each dimension</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span><strong>Identify specific strengths</strong> that contribute to your identity</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span><strong>Recognize growth opportunities</strong> without judgment</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span><strong>Define your desired state</strong> for each dimension</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">5</span>
                  <span><strong>Discover cross-dimensional patterns</strong> and connections</span>
                </li>
              </ol>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              From Assessment to Action
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The power of the baseline lies in its practical application. Once you&apos;ve 
              assessed all eight dimensions, patterns emerge that inform strategic 
              development. You might discover that improving your physical dimension 
              would have cascading positive effects on your emotional and occupational 
              dimensions.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research on the transtheoretical model of change shows that accurate 
              self-assessment is a critical precursor to successful behavior change. 
              Without a clear baseline, you cannot effectively plan interventions or 
              measure progress.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">What&apos;s Included in the Worksheet</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Detailed assessment prompts for all eight dimensions</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Visual scoring system to identify patterns at a glance</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Cross-dimensional analysis exercises</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Priority identification framework for focused development</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Progress tracking templates for repeat assessment</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Building Your Identity Baseline
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The baseline assessment serves as a reference point for all future 
              development. When you return to reassess in three months, six months, 
              or a year, you can objectively measure how your identity has evolved. 
              This tracking capability transforms vague aspirations into measurable progress.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The framework also helps identify which dimensions are most central to 
              your overall well-being. Research on the &quot;core self&quot; suggests that certain 
              dimensions carry more weight for each individual. Your baseline reveals 
              where your leverage points lie.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <Layers className="h-5 w-5" />
              <span className="font-semibold">The Integration Principle</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The ultimate goal isn&apos;t perfection in every dimension—it&apos;s integration. 
              A coherent identity emerges when all dimensions align with your core values 
              and support each other. The Identity Baseline 8D Worksheet reveals where 
              integration is strong and where fragmentation exists.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Every transformation journey begins with a single step: understanding 
              where you are now. The eight dimensions provide the map; the baseline 
              provides your coordinates. From there, any destination becomes navigable.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="identity-baseline-8d-worksheet" />

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
              Establish Your Identity Baseline Today
            </h2>
            <p className="text-slate-300 mb-6">
              Get the complete 8D assessment worksheet with scoring system and analysis tools.
            </p>
            <Link href="/worksheets/identity-baseline-8d">
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
