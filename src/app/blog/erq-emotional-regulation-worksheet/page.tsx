'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, Eye, Heart, Shield, CheckCircle, ArrowUpRight, Brain } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "self-authorship-worksheet", title: "Self-Authorship: Writing Your Own Story", readTime: "9 min read" },
  { slug: "who-am-i-worksheet", title: "The \"Who Am I?\" Self-Discovery Worksheet", readTime: "10 min read" },
  { slug: "identity-based-habits-worksheet", title: "Identity-Based Habits: The James Clear Method", readTime: "10 min read" }
];

export default function ERQEmotionalRegulationWorksheetArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Emotional Intelligence
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              ERQ Emotional Regulation: Mastering the Art of Emotional Response
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
              Emotions are not just reactions—they are data. The ability to regulate 
              emotional responses is not about suppression or denial; it&apos;s about 
              choosing how you engage with your emotional life. This is the insight 
              behind the Emotion Regulation Questionnaire (ERQ), developed by James 
              Gross and Oliver John in their groundbreaking 2003 research.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Their work, published in the Journal of Personality and Social Psychology, 
              identified two primary strategies people use to regulate emotions: 
              cognitive reappraisal and expressive suppression. Understanding these 
              strategies—and developing flexibility in using them—has profound 
              implications for identity transformation.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Two Strategies of Emotional Regulation
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Gross&apos;s process model of emotion regulation reveals that emotions can 
              be influenced at different points in the generative process. The ERQ 
              focuses on two strategies that have received the most research attention:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2 text-center">Cognitive Reappraisal</h3>
                  <p className="text-sm text-slate-600 text-center">
                    Changing how you think about a situation to alter its emotional impact. 
                    Reinterpreting events to find new meaning, perspective, or opportunity.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2 text-center">Expressive Suppression</h3>
                  <p className="text-sm text-slate-600 text-center">
                    Inhibiting outward signs of inner feelings. Masking emotional 
                    expression regardless of the underlying emotional experience.
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The research reveals a crucial finding: these strategies have dramatically 
              different outcomes. Cognitive reappraisal is associated with better mental 
              health, more satisfying relationships, and greater well-being. Expressive 
              suppression, in contrast, is linked to negative outcomes across multiple domains.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Research Evidence
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Gross and John&apos;s research has been replicated and extended across cultures, 
              age groups, and contexts. A meta-analysis published in Psychological Bulletin 
              synthesized findings from hundreds of studies, confirming the differential 
              effects of these regulation strategies.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;People who habitually use reappraisal tend to experience more positive 
                emotions and fewer negative emotions, have better interpersonal functioning, 
                and report greater life satisfaction. In contrast, habitual suppression is 
                associated with worse outcomes on all these measures.&quot;
                — Gross & John, 2003
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              Studies using physiological measures show that suppression doesn&apos;t actually 
              reduce emotional experience—it just masks outward expression. The body 
              continues to respond as if the emotion is present, creating internal 
              tension that accumulates over time.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why Strategy Choice Matters for Identity
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Emotional regulation strategies aren&apos;t just techniques—they&apos;re identity 
              expressions. The habitual use of suppression creates an identity of 
              concealment, of being someone who cannot show their authentic self. 
              Reappraisal, in contrast, creates an identity of meaning-making and 
              cognitive flexibility.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research on emotional identity shows that how you regulate emotions 
              becomes part of who you are. If you consistently suppress emotions, 
              you develop an identity as someone who doesn&apos;t feel strongly—or who 
              shouldn&apos;t feel strongly. If you reappraise, you develop an identity 
              as someone who finds meaning in difficulty.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Outcomes by Regulation Strategy</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 text-sm font-semibold text-primary">Domain</th>
                      <th className="text-left py-3 text-sm font-semibold text-primary">Reappraisal</th>
                      <th className="text-left py-3 text-sm font-semibold text-primary">Suppression</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600">
                    <tr className="border-b border-slate-100">
                      <td className="py-3">Emotional Experience</td>
                      <td className="py-3 text-accent">Reduced negative emotion</td>
                      <td className="py-3">No reduction in experience</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3">Memory</td>
                      <td className="py-3 text-accent">Improved recall</td>
                      <td className="py-3">Impaired memory</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3">Relationships</td>
                      <td className="py-3 text-accent">Greater closeness</td>
                      <td className="py-3">Reduced intimacy</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3">Well-being</td>
                      <td className="py-3 text-accent">Higher life satisfaction</td>
                      <td className="py-3">Lower satisfaction</td>
                    </tr>
                    <tr>
                      <td className="py-3">Physiology</td>
                      <td className="py-3 text-accent">Reduced stress response</td>
                      <td className="py-3">Elevated stress markers</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Developing Reappraisal Skills
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Cognitive reappraisal isn&apos;t about positive thinking or denial—it&apos;s about 
              perspective flexibility. Research shows that effective reappraisal involves 
              multiple techniques for reframing emotional situations:
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Reinterpretation</h3>
                  <p className="text-sm text-slate-600">Finding new meaning in events that initially seemed negative</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Normalization</h3>
                  <p className="text-sm text-slate-600">Placing experiences in broader context, reducing their intensity</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Growth Focus</h3>
                  <p className="text-sm text-slate-600">Identifying opportunities for learning and development</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              Studies show that reappraisal skills can be developed through practice. 
              A randomized controlled trial published in the Journal of Consulting 
              and Clinical Psychology found that participants who received reappraisal 
              training showed significant improvements in emotional well-being compared 
              to control groups.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The ERQ Assessment
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The original ERQ consists of just 10 items, making it one of the most 
              efficient psychological assessments available. Despite its brevity, it 
              reliably predicts emotional patterns, relationship quality, and well-being.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Our ERQ Emotional Regulation Worksheet extends the assessment with 
              practical exercises for developing reappraisal skills and reducing 
              reliance on suppression. The worksheet helps you:
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">What&apos;s Included in the Worksheet</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Complete ERQ assessment with scoring interpretation</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Personalized feedback based on your regulation profile</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Guided reappraisal exercises with real-life scenarios</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Strategies for reducing suppression habits</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Progress tracking for regulation skill development</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Context and Flexibility
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              While reappraisal generally produces better outcomes, emotional regulation 
              is not one-size-fits-all. Research on emotion regulation flexibility shows 
              that the most emotionally intelligent individuals can adjust their strategy 
              based on context.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Sometimes suppression is appropriate—during a crisis that requires immediate 
              action, for instance. The goal isn&apos;t to eliminate suppression entirely but 
              to expand your repertoire and make conscious choices about how you regulate 
              emotions in different situations.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <ArrowUpRight className="h-5 w-5" />
              <span className="font-semibold">The Flexibility Principle</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The worksheet includes exercises for developing regulation flexibility—
              the ability to match your strategy to the situation. This meta-skill 
              represents the cutting edge of emotion regulation research and practice.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Emotional Regulation and Identity Transformation
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Your relationship with your emotions shapes who you become. People who 
              develop reappraisal skills become more resilient, more relationally 
              competent, and more psychologically flexible. These qualities support 
              every aspect of identity transformation.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              When you can regulate emotions effectively, you can navigate the 
              challenges of change without being derailed by fear, doubt, or 
              discomfort. Emotional regulation creates the stability needed for 
              sustained identity work.
            </p>

            <p className="text-slate-600 leading-relaxed">
              The ERQ Emotional Regulation Worksheet provides both assessment and 
              development tools for this essential skill. Understanding your 
              regulation patterns is the first step toward choosing how you engage 
              with your emotional life—and the identity those emotions shape.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="erq-emotional-regulation-worksheet" />

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
              Master Your Emotional Regulation
            </h2>
            <p className="text-slate-300 mb-6">
              Get the complete ERQ worksheet with assessment, exercises, and development tools.
            </p>
            <Link href="/worksheets/erq-emotional-regulation">
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
