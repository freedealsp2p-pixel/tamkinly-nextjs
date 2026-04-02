'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sun, BookOpen, Brain, Sparkles, Calendar, CheckCircle2, PenLine } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "physics-of-momentum", title: "The Physics of Momentum: Why 18 Minutes Changes Everything", readTime: "8 min read" },
  { slug: "values-clarification-tool", title: "Values Clarification: The Foundation of Authentic Identity", readTime: "9 min read" },
  { slug: "becoming-exceptional", title: "Becoming Exceptional", readTime: "8 min read" }
];

export default function DailyReflectionPracticeArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Daily Practice
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Daily Reflection Practice: The Neuroscience of Identity Integration
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
              Every identity transformation in history has one thing in common: conscious 
              reflection. The daily practice of examining your thoughts, actions, and choices 
              isn&apos;t just therapeutic—it&apos;s how you actively construct who you&apos;re becoming.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research in neuroscience and psychology has transformed our understanding of 
              journaling and reflection. What was once seen as a simple self-help practice 
              is now recognized as a powerful tool for neural pathway reinforcement, emotional 
              regulation, and identity construction.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Science of Reflection and Journaling
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              A landmark study by psychologist James Pennebaker at the University of Texas 
              found that expressive writing—just 15-20 minutes a day for four days—produced 
              measurable improvements in both physical and mental health. Participants showed 
              enhanced immune function, reduced stress levels, and better overall well-being.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              But the benefits extend beyond health. Research published in the <em>Journal 
              of Experimental Psychology</em> demonstrated that reflection enhances learning 
              and performance. When we reflect on experiences, we extract meaning from them, 
              integrating new information into our existing knowledge structures—what 
              neuroscientists call &quot;memory consolidation.&quot;
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;We do not learn from experience... we learn from reflecting on experience.&quot; 
                — John Dewey
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Reflection as Identity Construction
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Identity isn&apos;t something you have—it&apos;s something you actively create through 
              narrative. Psychologist Dan McAdams, a leading researcher in narrative identity, 
              argues that we construct our identities through the stories we tell about ourselves. 
              Daily reflection is the process of editing that story.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Each time you reflect on your day through the lens of your target identity, 
              you&apos;re doing something powerful: you&apos;re selecting which experiences to emphasize, 
              which patterns to notice, and which version of yourself to reinforce. This 
              narrative selection shapes your neural pathways and your self-concept.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Daily Reflection Practice tool provides structured prompts across seven 
              themes designed to support identity transformation:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-[#3DD4B0]" />
                    </div>
                    <h3 className="font-semibold text-primary">Self-Awareness</h3>
                  </div>
                  <p className="text-sm text-slate-600">Deepen understanding of your patterns and choices</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#1F6F78]/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-[#1F6F78]" />
                    </div>
                    <h3 className="font-semibold text-primary">Identity Shift</h3>
                  </div>
                  <p className="text-sm text-slate-600">Track evidence supporting your new identity</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#64B5F6]/10 flex items-center justify-center">
                      <Sun className="h-4 w-4 text-[#64B5F6]" />
                    </div>
                    <h3 className="font-semibold text-primary">Growth Mindset</h3>
                  </div>
                  <p className="text-sm text-slate-600">Reframe challenges as opportunities</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#E57373]/10 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-[#E57373]" />
                    </div>
                    <h3 className="font-semibold text-primary">Values Alignment</h3>
                  </div>
                  <p className="text-sm text-slate-600">Examine alignment between actions and values</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#BA68C8]/10 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-[#BA68C8]" />
                    </div>
                    <h3 className="font-semibold text-primary">Emotional Intelligence</h3>
                  </div>
                  <p className="text-sm text-slate-600">Develop awareness of emotional patterns</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FFB74D]/10 flex items-center justify-center">
                      <PenLine className="h-4 w-4 text-[#FFB74D]" />
                    </div>
                    <h3 className="font-semibold text-primary">Environmental Design</h3>
                  </div>
                  <p className="text-sm text-slate-600">Optimize your environment for success</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Neural Pathway Connection
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Every time you reflect on your target identity and find evidence of progress, 
              you&apos;re strengthening specific neural pathways. This is neuroplasticity in action. 
              Research shows that the brain&apos;s architecture literally changes with repeated 
              mental activity—the neurons that fire together, wire together.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Dr. Carol Dweck&apos;s research on mindset demonstrates this principle. When you 
              reflect through a growth mindset lens—asking what you learned rather than 
              whether you succeeded—you reinforce neural patterns that support learning and 
              resilience. The daily reflection practice is designed to activate this mindset 
              consistently.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">The 7 Reflection Themes</h3>
              <div className="space-y-3 text-slate-600">
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                  <span><strong>Self-Awareness:</strong> Understanding your patterns, triggers, and choices</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                  <span><strong>Identity Shift:</strong> Collecting evidence of your new identity in action</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                  <span><strong>Growth Mindset:</strong> Reframing challenges as opportunities for development</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                  <span><strong>Values Alignment:</strong> Examining consistency between values and actions</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">5</span>
                  <span><strong>Emotional Intelligence:</strong> Developing awareness of emotional patterns</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">6</span>
                  <span><strong>Environmental Design:</strong> Optimizing surroundings for success</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">7</span>
                  <span><strong>Future Self:</strong> Connecting with who you&apos;re becoming</span>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Habit Loop of Reflection
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Building a daily reflection habit follows the same principles as any habit 
              formation. James Clear&apos;s research identifies the habit loop: cue, craving, 
              response, reward. The Daily Reflection Practice is designed with this loop in mind.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The tool provides a daily prompt based on the date, creating a natural cue. 
              The prompts are designed to trigger curiosity (craving), leading you to write 
              your reflection (response), and the insight you gain provides intrinsic reward. 
              Over time, this loop strengthens until reflection becomes automatic.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research shows that habits form through consistent repetition—approximately 
              21 days of daily practice creates noticeable momentum. By 66 days, the habit 
              becomes largely automatic. The tool tracks your streak and history, providing 
              visual feedback that reinforces the behavior.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why Structured Prompts Work Better Than Free Writing
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              While free-form journaling has benefits, research suggests that structured 
              reflection produces more consistent outcomes. A study in <em>Academic Medicine</em> 
              found that students using structured reflection prompts showed greater improvement 
              in critical thinking and self-awareness compared to those who journaled freely.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Structured prompts serve several functions:
            </p>

            <ul className="space-y-3 my-6">
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">They direct attention to specific aspects of identity</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">They reduce the cognitive load of deciding what to write</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">They ensure coverage of all important dimensions over time</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-slate-600">They connect daily experiences to larger identity goals</span>
              </li>
            </ul>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Compound Effect of Daily Reflection
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              One day of reflection is valuable. A week creates insight. A month builds 
              awareness. But the true power emerges over longer periods. Research on 
              longitudinal journaling shows that sustained practice leads to:
            </p>

            <div className="space-y-4 my-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Enhanced Self-Awareness</h4>
                  <p className="text-slate-600 text-sm">Greater recognition of patterns, triggers, and automatic behaviors</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Emotional Regulation</h4>
                  <p className="text-slate-600 text-sm">Improved ability to process and manage difficult emotions</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Identity Clarity</h4>
                  <p className="text-slate-600 text-sm">Stronger sense of who you are and who you&apos;re becoming</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Goal Progress</h4>
                  <p className="text-slate-600 text-sm">Better alignment between intentions and actions</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-accent mt-12 mb-4">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-semibold">FREE Daily Practice Available</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The Daily Reflection Practice is available at no cost. Start today with a 
              fresh prompt, save your reflections locally, and build a history of insights 
              that compounds over time.
            </p>

            <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] p-8 rounded-xl my-10 text-center">
              <h3 className="text-white text-xl font-bold mb-3">Start Your Daily Practice</h3>
              <p className="text-slate-300 mb-6">
                Begin with today&apos;s prompt. Your reflections are saved locally on your device.
              </p>
              <Link href="/apps/daily-reflection">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Start Reflecting
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Identity is built one day at a time, one reflection at a time. The question 
              isn&apos;t whether you&apos;re changing—you are, constantly. The question is whether 
              you&apos;re directing that change consciously. Daily reflection gives you that 
              direction.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="daily-reflection-practice" />

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
              Begin Your Daily Reflection Journey
            </h2>
            <p className="text-slate-300 mb-6">
              Start today. Your future self will thank you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apps/daily-reflection">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Start Daily Reflection
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
