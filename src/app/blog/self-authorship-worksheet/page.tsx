'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, Sparkles, BookOpen, Compass, Shield, CheckCircle, ArrowUpRight } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";

const relatedArticles = [
  { slug: "who-am-i-worksheet", title: "The \"Who Am I?\" Self-Discovery Worksheet", readTime: "10 min read" },
  { slug: "identity-based-habits-worksheet", title: "Identity-Based Habits: The James Clear Method", readTime: "10 min read" },
  { slug: "erq-emotional-regulation-worksheet", title: "ERQ Emotional Regulation: Master Your Emotions", readTime: "9 min read" }
];

export default function SelfAuthorshipWorksheetArticle() {
  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              Personal Development
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Self-Authorship: The Journey to Writing Your Own Life Story
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
              &quot;Self-authorship is the internal capacity to define one&apos;s own beliefs, identity, 
              and social relations.&quot; This definition from educational psychologist Marcia 
              Baxter Magolda captures the essence of what it means to become the author of 
              your own life—a journey from being shaped by external forces to shaping yourself.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              Baxter Magolda&apos;s groundbreaking longitudinal study, spanning over two decades 
              of research at Miami University, revealed that most adults never achieve full 
              self-authorship. They remain forever influenced by external authorities—parents, 
              culture, institutions—without developing the internal voice to question, 
              evaluate, and choose their own path.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Three Dimensions of Self-Authorship
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Baxter Magolda&apos;s research identified three interconnected dimensions that 
              define the self-authored individual. These dimensions develop together, 
              influencing each other in a continuous process of growth:
            </p>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Epistemological</h3>
                  <p className="text-sm text-slate-600">How you know what you know—your relationship to knowledge and truth</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Compass className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Intrapersonal</h3>
                  <p className="text-sm text-slate-600">How you understand yourself—your identity and sense of purpose</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">Interpersonal</h3>
                  <p className="text-sm text-slate-600">How you relate to others—your relationships and social context</p>
                </CardContent>
              </Card>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              The epistemological dimension involves moving from accepting knowledge from 
              authorities to constructing your own knowledge through critical evaluation. 
              The intrapersonal dimension involves shifting from defining yourself through 
              external expectations to crafting an identity based on internal values. The 
              interpersonal dimension involves evolving from dependency on others&apos; approval 
              to mutual, interdependent relationships.
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Four Phases of Development
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Baxter Magolda identified four distinct phases in the journey toward 
              self-authorship. Understanding where you are in this progression provides 
              crucial insight for personal development:
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Phase 1: Following Formulas</h3>
              <p className="text-slate-600 mb-6">
                In this phase, individuals rely entirely on external authorities for 
                direction. They follow predetermined formulas for life—what to believe, 
                how to act, who to become. Decisions are made by deferring to others&apos; 
                expectations rather than internal evaluation.
              </p>

              <h3 className="font-semibold text-primary mb-4">Phase 2: Crossroads</h3>
              <p className="text-slate-600 mb-6">
                The crossroads phase begins when external formulas no longer fit life&apos;s 
                complexity. Individuals experience tension between external expectations 
                and emerging internal perspectives. This phase often accompanies major 
                life transitions—career changes, relationship shifts, existential questioning.
              </p>

              <h3 className="font-semibold text-primary mb-4">Phase 3: Becoming the Author</h3>
              <p className="text-slate-600 mb-6">
                In this phase, the internal voice grows stronger. Individuals begin 
                trusting their own judgment and making choices based on self-defined 
                values. External voices are considered but not automatically followed.
              </p>

              <h3 className="font-semibold text-primary mb-4">Phase 4: Internal Foundation</h3>
              <p className="text-slate-600">
                Full self-authorship is achieved when individuals possess a stable 
                internal foundation. They can navigate complex situations by drawing 
                on their own beliefs and values while remaining open to growth and 
                new perspectives.
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Research Foundation
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Baxter Magolda&apos;s research followed participants from age 18 to 34, 
              conducting annual interviews to track their development. Her findings 
              challenged prevailing assumptions about adult development, revealing 
              that chronological age doesn&apos;t automatically produce self-authorship.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The study, published in her influential book &quot;Making Their Own Way&quot; 
              (2001), demonstrated that most young adults remain in the formulaic 
              phases throughout their college years. Self-authorship typically 
              emerges in the late twenties or thirties—if it emerges at all.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                &quot;Self-authorship is not about rejecting external input or becoming 
                isolated. It&apos;s about developing the capacity to critically evaluate 
                external messages against your own values, beliefs, and goals.&quot;
                — Marcia Baxter Magolda
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why Self-Authorship Matters
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Research links self-authorship to numerous positive outcomes. A study 
              published in the Journal of College Student Development found that 
              self-authored individuals demonstrate greater career adaptability, 
              more satisfying relationships, and stronger mental health.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              In professional contexts, self-authored individuals navigate ambiguity 
              more effectively. They can make decisions without clear guidelines, 
              adapt to changing circumstances, and maintain their values under pressure. 
              These capabilities have become increasingly valuable in today&apos;s rapidly 
              evolving workplace.
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-10">
              <h3 className="font-semibold text-primary mb-4">Benefits of Self-Authorship</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Greater resilience during life transitions and challenges</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>More authentic relationships based on genuine connection</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Improved decision-making aligned with personal values</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Enhanced career adaptability and professional growth</span>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>Stronger sense of purpose and life meaning</span>
                </li>
              </ul>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Self-Authorship Worksheet
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Our Self-Authorship Journey Worksheet translates Baxter Magolda&apos;s 
              research into practical exercises for personal development. The worksheet 
              guides you through assessing your current phase, identifying growth edges, 
              and developing strategies for progress.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The worksheet includes prompts for each of the three dimensions, helping 
              you identify where you&apos;re most dependent on external formulas and where 
              you&apos;ve already developed internal authority. This assessment provides a 
              roadmap for focused development.
            </p>

            <div className="flex items-center gap-2 text-accent mt-12 mb-8">
              <ArrowUpRight className="h-5 w-5" />
              <span className="font-semibold">The Developmental Principle</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              Self-authorship is not achieved through a single breakthrough. It&apos;s 
              developed through repeated practice of internal questioning, value 
              clarification, and authentic choice. Each decision you make from your 
              own internal foundation strengthens that foundation.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              The worksheet helps you identify specific situations where you default 
              to external formulas and develop strategies for engaging your internal 
              voice instead. Over time, this practice transforms your relationship 
              with yourself, others, and knowledge itself.
            </p>

            <p className="text-slate-600 leading-relaxed">
              Most people live lives scripted by others—the expectations of parents, 
              the demands of culture, the pressure of peers. Self-authorship offers 
              a different path: the opportunity to become the author of your own 
              story. The question is whether you&apos;re ready to pick up the pen.
            </p>
          </div>
        </div>
      </section>

      {/* Article Navigation */}
      <ArticleNavigation currentSlug="self-authorship-worksheet" />

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
              Begin Your Self-Authorship Journey
            </h2>
            <p className="text-slate-300 mb-6">
              Get the complete worksheet based on Baxter Magolda&apos;s research framework.
            </p>
            <Link href="/worksheets/self-authorship">
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
