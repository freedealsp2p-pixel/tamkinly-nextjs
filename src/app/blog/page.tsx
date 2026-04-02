'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, BookOpen, Target, Brain } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo";

// All articles organized by category
const appArticles = [
  {
    slug: "identity-gap-assessment",
    title: "The Identity Gap Assessment: Discover What's Holding You Back",
    excerpt: "Research-backed assessment revealing the gap between who you are and who you want to become. Free 3-minute quiz with personalized insights.",
    category: "FREE App",
    readTime: "8 min read",
    featured: true,
    tier: "FREE"
  },
  {
    slug: "values-clarification-tool",
    title: "Values Clarification Tool: Find What Truly Matters",
    excerpt: "Scientific method to discover your core values and align your life with what matters most. Based on ACT and positive psychology research.",
    category: "FREE App",
    readTime: "7 min read",
    featured: false,
    tier: "FREE"
  },
  {
    slug: "daily-reflection-practice",
    title: "Daily Reflection Practice: The Science of Self-Transformation",
    excerpt: "Evidence-based journaling prompts that rewire neural pathways. 7 themes for consistent growth and identity evolution.",
    category: "FREE App",
    readTime: "7 min read",
    featured: false,
    tier: "FREE"
  },
  {
    slug: "identity-recode-system-guide",
    title: "Identity Recode System: Complete 30-Day Transformation",
    excerpt: "Full identity transformation system with 6 interconnected components. Includes worksheets, trackers, and structured progression.",
    category: "BASIC App",
    readTime: "9 min read",
    featured: true,
    tier: "BASIC"
  },
  {
    slug: "ai-identity-coach-guide",
    title: "AI Identity Coach: Your Personal Transformation Guide",
    excerpt: "24/7 AI coaching powered by identity science. Personalized guidance for discovery, habits, self-authorship, and emotional regulation.",
    category: "BUNDLE App",
    readTime: "8 min read",
    featured: true,
    tier: "BUNDLE"
  }
];

const worksheetArticles = [
  {
    slug: "who-am-i-worksheet",
    title: "Who Am I Worksheet: The Complete Identity Exploration",
    excerpt: "Deep dive into self-concept clarity with research-backed questions. Explore personal, social, and possible selves dimensions.",
    category: "Worksheet",
    readTime: "10 min read",
    featured: false
  },
  {
    slug: "identity-based-habits-worksheet",
    title: "Identity-Based Habits Worksheet: James Clear's Method",
    excerpt: "Transform behaviors by changing who you believe you are. The three layers of habit change that create lasting transformation.",
    category: "Worksheet",
    readTime: "9 min read",
    featured: true
  },
  {
    slug: "self-authorship-worksheet",
    title: "Self-Authorship Worksheet: Your Internal Voice Journey",
    excerpt: "Based on Baxter Magolda's research. Move from external formulas to internally-defined identity through structured reflection.",
    category: "Worksheet",
    readTime: "8 min read",
    featured: false
  },
  {
    slug: "identity-baseline-8d-worksheet",
    title: "Identity Baseline 8D: Holistic Self-Assessment",
    excerpt: "Eight dimensions of identity: Physical, Intellectual, Emotional, Social, Occupational, Spiritual, Financial, Environmental.",
    category: "Worksheet",
    readTime: "7 min read",
    featured: false
  },
  {
    slug: "environmental-audit-worksheet",
    title: "Environmental Audit Worksheet: Design Your Growth Space",
    excerpt: "Your environment shapes your identity. Audit physical, social, and digital environments for transformation success.",
    category: "Worksheet",
    readTime: "8 min read",
    featured: false
  },
  {
    slug: "erq-emotional-regulation-worksheet",
    title: "ERQ Emotional Regulation: Master Your Inner World",
    excerpt: "Based on Gross & John's research. Cognitive reappraisal vs. suppression—the science of emotional intelligence.",
    category: "Worksheet",
    readTime: "8 min read",
    featured: false
  }
];

const philosophyArticles = [
  {
    slug: "physics-of-momentum",
    title: "The Physics of Momentum: Why 18 Minutes Changes Everything",
    excerpt: "Discover how the science of momentum and habit formation can transform your identity in just 18 minutes a day.",
    category: "Identity Shift",
    readTime: "8 min read",
    featured: true
  },
  {
    slug: "magic-in-work-you-avoid",
    title: "The Magic Is in the Work You Avoid",
    excerpt: "That uncomfortable task you keep putting off? It holds the key to your transformation.",
    category: "Transformation",
    readTime: "6 min read",
    featured: false
  },
  {
    slug: "identity-millionaire",
    title: "The Identity Millionaire: Building Wealth Through Self-Transformation",
    excerpt: "True wealth starts with who you become, not what you acquire. The three stages of identity-based success.",
    category: "Wealth & Identity",
    readTime: "9 min read",
    featured: true
  },
  {
    slug: "all-in-or-nothing",
    title: "All In or Nothing: The Power of Full Commitment",
    excerpt: "Half-effort leaves you uncertain. Full commitment gives you clarity—even when you fail.",
    category: "Commitment",
    readTime: "7 min read",
    featured: false
  },
  {
    slug: "five-steps-to-miracles",
    title: "Five Steps to Miracles: A Framework for Identity Liberation",
    excerpt: "Surrender the old versions of yourself. Step into who you were meant to be.",
    category: "Self-Liberation",
    readTime: "10 min read",
    featured: true
  },
  {
    slug: "inversion-thinking",
    title: "Inversion Thinking: How to Win by Avoiding Failure",
    excerpt: "Charlie Munger's counterintuitive approach to success: ask how to lose, then don't do that.",
    category: "Strategy",
    readTime: "8 min read",
    featured: false
  },
  {
    slug: "speed-as-strategy",
    title: "Speed as Strategy: The Execution Edge",
    excerpt: "The gap between idea and reality is where power lives. Execute faster than everyone else.",
    category: "Execution",
    readTime: "7 min read",
    featured: false
  },
  {
    slug: "ten-minute-block-system",
    title: "The 10-Minute Block System: Breaking Through Every Obstacle",
    excerpt: "From paralysis to progress in just 10 minutes. A practical system for overcoming resistance.",
    category: "Productivity",
    readTime: "9 min read",
    featured: false
  },
  {
    slug: "work-on-yourself",
    title: "Work on Yourself: The Psycho-Cybernetics of Identity",
    excerpt: "Your self-image controls everything. Change the inner image, change everything.",
    category: "Self-Image",
    readTime: "10 min read",
    featured: true
  },
  {
    slug: "becoming-exceptional",
    title: "Becoming Exceptional: Why Ordinary Can Never Build Legacy",
    excerpt: "You cannot be exceptional while living an ordinary life. The courage to embrace what makes you different.",
    category: "Excellence",
    readTime: "8 min read",
    featured: false
  },
  {
    slug: "dopamine-reset",
    title: "The 24-Hour Dopamine Reset: Reclaiming Your Focus",
    excerpt: "Reset your motivation system in just one day and rediscover natural drive.",
    category: "Mental Clarity",
    readTime: "12 min read",
    featured: true
  }
];

const allFeatured = [...appArticles, ...worksheetArticles, ...philosophyArticles].filter(a => a.featured);

export default function BlogPage() {
  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd data={[breadcrumbSchema]} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              <BookOpen className="w-3.5 h-3.5 mr-2" />
              Knowledge Base
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              The{" "}
              <span className="text-accent">Tamkinly</span> Blog
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Research-backed insights, practical frameworks, and transformation tools. 
              Every article is designed to guide you toward your true identity.
            </p>
          </div>
        </div>
      </section>

      {/* Apps Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-1">
                  Interactive Tools
                </Badge>
                <h2 className="font-serif text-3xl font-bold text-primary">
                  App Guides
                </h2>
              </div>
            </div>
            <p className="text-slate-600 max-w-2xl">
              Deep dives into each Tamkinly app—how they work, the science behind them, and how to maximize your results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card className={`h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  article.featured ? 'ring-2 ring-accent/20' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className={`text-xs ${
                        article.tier === 'FREE' ? 'text-green-600 border-green-200' :
                        article.tier === 'BASIC' ? 'text-blue-600 border-blue-200' :
                        'text-purple-600 border-purple-200'
                      }`}>
                        {article.tier}
                      </Badge>
                      <Badge variant="outline" className="text-xs text-[#1F6F78] border-[#1F6F78]/30">
                        {article.category}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                      <span className="text-accent text-sm flex items-center gap-1">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Worksheets Section */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Brain className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-1">
                  Practical Exercises
                </Badge>
                <h2 className="font-serif text-3xl font-bold text-primary">
                  Worksheet Guides
                </h2>
              </div>
            </div>
            <p className="text-slate-600 max-w-2xl">
              Step-by-step guides for each worksheet, including the research behind them and how to use them effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {worksheetArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card className="h-full border-0 shadow-sm bg-white hover:shadow-md transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3 text-xs text-[#1F6F78] border-[#1F6F78]/30">
                      {article.category}
                    </Badge>
                    <h3 className="font-semibold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                      <span className="text-accent text-sm flex items-center gap-1">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Articles */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <Badge variant="secondary" className="mb-1">
                  Insights
                </Badge>
                <h2 className="font-serif text-3xl font-bold text-primary">
                  Transformation Philosophy
                </h2>
              </div>
            </div>
            <p className="text-slate-600 max-w-2xl">
              Inspiring articles on identity, growth, and transformation—connecting timeless wisdom with modern science.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophyArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card className={`h-full border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group ${
                  article.featured ? 'ring-2 ring-accent/20' : ''
                }`}>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3 text-xs text-[#1F6F78] border-[#1F6F78]/30">
                      {article.category}
                    </Badge>
                    <h3 className="font-semibold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                      <span className="text-accent text-sm flex items-center gap-1">
                        Read <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Transform Your{" "}
              <span className="text-accent">Identity</span>?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              These insights are just the beginning. Start your structured transformation journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apps">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                  Try Free Apps
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="white" size="lg" className="px-8 font-semibold">
                  View Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
