'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  Compass,
  Layers,
  RefreshCw,
  Target,
  Brain,
  Sparkles,
  CheckCircle2,
  Users,
  Clock,
  TrendingUp,
  Lightbulb,
  HelpCircle
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// HERO SECTION - Minimal & Calm
// ═══════════════════════════════════════════════════════════════

function HeroSection() {
  return (
    <section className="bg-[#0F1C2E] py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-6 bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 px-4 py-2">
            The Framework
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            The Methodology
          </h1>
          <p className="text-lg text-[#8A94A6] leading-relaxed max-w-2xl mx-auto">
            A science-backed approach to identity transformation. 
            Four questions. Four phases. Lasting change.
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 1: WHY - Why Does This Matter?
// ═══════════════════════════════════════════════════════════════

function WhySection() {
  const stats = [
    { value: "92%", label: "of habits fail within 90 days" },
    { value: "75%", label: "of change efforts rely on willpower" },
    { value: "3x", label: "more effective when identity-based" }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#3DD4B0] flex items-center justify-center text-[#0F1C2E] font-bold text-lg">
              1
            </div>
            <div>
              <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 mb-1">WHY</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                Why does this matter?
              </h2>
            </div>
          </div>

          {/* Main Question */}
          <div className="mb-12 p-6 bg-[#F6F8FA] rounded-2xl border-l-4 border-[#3DD4B0]">
            <p className="text-xl text-[#0F1C2E] leading-relaxed">
              <span className="font-semibold">Have you ever wondered</span> why some changes 
              feel effortless while others feel like a constant battle?
            </p>
          </div>

          {/* The Problem */}
          <div className="space-y-6 mb-12">
            <p className="text-lg text-[#2B2E34] leading-relaxed">
              Traditional self-improvement focuses on <span className="font-semibold">what you do</span>—habits, 
              routines, behaviors. But here's what research shows:
            </p>
            
            <Card className="border-0 bg-[#0F1C2E]">
              <CardContent className="p-8">
                <p className="text-lg text-white leading-relaxed italic">
                  "Executive function is crucial for initiation but unsustainable long-term 
                  due to stress and impulses; identity integration makes behaviors 
                  more automatic and resilient."
                </p>
                <p className="text-sm text-[#8A94A6] mt-4">
                  — Maintain IT Model, Journal of Behavioral Medicine
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <Card key={idx} className="border border-gray-200 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-[#3DD4B0] mb-2">{stat.value}</div>
                  <div className="text-sm text-[#8A94A6]">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* The Insight */}
          <div className="space-y-4">
            <p className="text-lg text-[#2B2E34] leading-relaxed">
              The problem isn't your willpower or motivation. 
              <span className="font-semibold text-[#0F1C2E]"> The problem is you're trying to change 
              behavior without changing identity.</span>
            </p>
            <p className="text-lg text-[#2B2E34] leading-relaxed">
              Identity-based change works because it doesn't require effort to maintain. 
              When your actions align with who you believe you are, they become automatic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 2: WHAT - What Is This About?
// ═══════════════════════════════════════════════════════════════

function WhatSection() {
  const concepts = [
    {
      title: "Identity vs Behavior",
      description: "Behavior is what you do. Identity is who you are. Lasting change happens at the identity level.",
      icon: Brain
    },
    {
      title: "The Maintain IT Model",
      description: "A research framework showing how centered identity reduces executive function burden for sustainable change.",
      icon: Target
    },
    {
      title: "Neuroplasticity",
      description: "Your brain can rewire itself. Repeated identity-aligned actions create new neural pathways that become automatic.",
      icon: Sparkles
    },
    {
      title: "Self-Authorship",
      description: "Moving from external influence to internal voice—consciously designing who you become.",
      icon: Compass
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#1F6F78] flex items-center justify-center text-white font-bold text-lg">
              2
            </div>
            <div>
              <Badge className="bg-[#1F6F78]/10 text-[#1F6F78] border-0 mb-1">WHAT</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                What is the methodology?
              </h2>
            </div>
          </div>

          {/* Main Definition */}
          <div className="mb-12 p-8 bg-white rounded-2xl shadow-sm">
            <p className="text-xl text-[#0F1C2E] leading-relaxed mb-6">
              The <span className="font-semibold">Identity Recode Methodology</span> is a 
              four-phase framework for transforming who you are—not just what you do.
            </p>
            <p className="text-[#2B2E34] leading-relaxed">
              It's built on peer-reviewed research in psychology and neuroscience, including 
              the Maintain IT Model, Erikson's identity formation theory, and neuroplasticity research.
            </p>
          </div>

          {/* Key Concepts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {concepts.map((concept, idx) => (
              <Card key={idx} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0F1C2E] flex items-center justify-center flex-shrink-0">
                      <concept.icon className="w-5 h-5 text-[#3DD4B0]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-2">{concept.title}</h3>
                      <p className="text-sm text-[#8A94A6] leading-relaxed">{concept.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* The Core Shift */}
          <div className="mt-12 p-6 bg-[#0F1C2E] rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
              <div>
                <p className="text-[#8A94A6] text-sm mb-2">From</p>
                <p className="text-white text-lg font-medium">"I want to exercise more"</p>
              </div>
              <ArrowRight className="w-6 h-6 text-[#3DD4B0] rotate-90 md:rotate-0" />
              <div>
                <p className="text-[#8A94A6] text-sm mb-2">To</p>
                <p className="text-[#3DD4B0] text-lg font-medium">"I am someone who moves my body"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 3: HOW - How Does It Work?
// ═══════════════════════════════════════════════════════════════

function HowSection() {
  const phases = [
    {
      number: "01",
      icon: Compass,
      title: "Discover",
      subtitle: "Days 1-7",
      description: "Understand where you truly are—not where you think you should be. Identity audit, values excavation, pattern recognition.",
      activities: ["Identity baseline assessment", "Values exploration", "Current pattern mapping"]
    },
    {
      number: "02",
      icon: Layers,
      title: "Deconstruct",
      subtitle: "Days 8-14",
      description: "Peel back layers of conditioning, expectations, and inherited beliefs. Release what isn't authentically you.",
      activities: ["Identify borrowed identities", "Challenge 'should' narratives", "Release outdated beliefs"]
    },
    {
      number: "03",
      icon: RefreshCw,
      title: "Reconstruct",
      subtitle: "Days 15-21",
      description: "Build your authentic identity. Create new narratives, align values with actions, establish identity-based habits.",
      activities: ["Define core identity", "Create empowering narratives", "Build evidence log"]
    },
    {
      number: "04",
      icon: Target,
      title: "Integrate",
      subtitle: "Days 22-30",
      description: "Make your new identity automatic. Environment alignment, daily practices, resilience protocols.",
      activities: ["Daily embodiment", "Environment optimization", "Setback recovery plan"]
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#0F1C2E] flex items-center justify-center text-white font-bold text-lg">
              3
            </div>
            <div>
              <Badge className="bg-[#0F1C2E]/10 text-[#0F1C2E] border-0 mb-1">HOW</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                How does it work?
              </h2>
            </div>
          </div>

          {/* Timeline Header */}
          <div className="mb-8 p-6 bg-[#F6F8FA] rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#8A94A6]">30-Day Transformation Protocol</span>
              <span className="text-sm font-medium text-[#0F1C2E]">4 Phases</span>
            </div>
            <Progress value={0} className="h-2 bg-gray-200" />
          </div>

          {/* Phases */}
          <div className="space-y-6">
            {phases.map((phase, idx) => (
              <Card key={idx} className="border border-gray-200 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-4">
                    {/* Phase Number */}
                    <div className="bg-[#0F1C2E] p-6 flex flex-col items-center justify-center text-center">
                      <span className="font-serif text-4xl font-bold text-[#3DD4B0]/30 mb-2">
                        {phase.number}
                      </span>
                      <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center mb-2">
                        <phase.icon className="h-5 w-5 text-[#3DD4B0]" />
                      </div>
                      <span className="text-xs text-[#8A94A6]">{phase.subtitle}</span>
                    </div>
                    
                    {/* Phase Content */}
                    <div className="lg:col-span-3 p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-xl text-[#0F1C2E]">{phase.title}</h3>
                      </div>
                      <p className="text-[#2B2E34] mb-4 leading-relaxed">{phase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.activities.map((activity, i) => (
                          <Badge key={i} variant="outline" className="text-xs border-[#1F6F78]/30 text-[#1F6F78]">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Daily Structure */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-gray-200">
              <CardContent className="p-5 text-center">
                <Clock className="w-6 h-6 text-[#3DD4B0] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#0F1C2E] mb-1">Morning</p>
                <p className="text-xs text-[#8A94A6]">5-10 min intention</p>
              </CardContent>
            </Card>
            <Card className="border border-gray-200">
              <CardContent className="p-5 text-center">
                <Brain className="w-6 h-6 text-[#1F6F78] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#0F1C2E] mb-1">Afternoon</p>
                <p className="text-xs text-[#8A94A6]">15-20 min core work</p>
              </CardContent>
            </Card>
            <Card className="border border-gray-200">
              <CardContent className="p-5 text-center">
                <TrendingUp className="w-6 h-6 text-[#FFB74D] mx-auto mb-2" />
                <p className="text-sm font-medium text-[#0F1C2E] mb-1">Evening</p>
                <p className="text-xs text-[#8A94A6]">10-15 min reflection</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SECTION 4: WHAT IF - What If You Applied This?
// ═══════════════════════════════════════════════════════════════

function WhatIfSection() {
  const scenarios = [
    {
      question: "What if you could change without relying on willpower?",
      outcome: "Identity-based behaviors become automatic—they don't require effort to maintain."
    },
    {
      question: "What if setbacks became signals instead of failures?",
      outcome: "The methodology includes recovery protocols that make you stronger after each challenge."
    },
    {
      question: "What if 30 days could reshape your neural pathways?",
      outcome: "Neuroplasticity research shows measurable brain changes from repeated identity-aligned actions."
    },
    {
      question: "What if you stopped fighting yourself?",
      outcome: "When actions align with identity, there's no internal conflict—only natural flow."
    }
  ];

  const questions = [
    "Which area of your life feels like constant effort?",
    "What would change if that effort became automatic?",
    "What's stopping you from starting today?"
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#3DD4B0] flex items-center justify-center text-[#0F1C2E] font-bold text-lg">
              4
            </div>
            <div>
              <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 mb-1">WHAT IF</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                What if you applied this?
              </h2>
            </div>
          </div>

          {/* Scenarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {scenarios.map((scenario, idx) => (
              <Card key={idx} className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  <HelpCircle className="w-5 h-5 text-[#1F6F78] mb-3" />
                  <p className="font-medium text-[#0F1C2E] mb-3">{scenario.question}</p>
                  <p className="text-sm text-[#8A94A6] leading-relaxed">{scenario.outcome}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reflection Questions */}
          <Card className="border-2 border-[#3DD4B0] bg-white">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-[#3DD4B0]" />
                <h3 className="font-semibold text-xl text-[#0F1C2E]">Questions for You</h3>
              </div>
              <div className="space-y-4">
                {questions.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-[#F6F8FA] rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-[#0F1C2E] text-white flex items-center justify-center text-sm flex-shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-[#0F1C2E] font-medium">{q}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community */}
          <div className="mt-12 flex items-center justify-center gap-8 text-center flex-wrap">
            <div className="flex items-center gap-2 text-[#8A94A6]">
              <Users className="w-5 h-5" />
              <span className="text-sm">Evidence-based approach</span>
            </div>
            <div className="flex items-center gap-2 text-[#8A94A6]">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm">30-day protocol</span>
            </div>
            <div className="flex items-center gap-2 text-[#8A94A6]">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Self-paced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CTA SECTION
// ═══════════════════════════════════════════════════════════════

function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0F1C2E]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to begin?
          </h2>
          <p className="text-lg text-[#8A94A6] mb-8 leading-relaxed">
            The Identity Recode Planner guides you through all four phases 
            in 30 days. Science-backed. Intentionally designed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-14 font-semibold">
                Start Your Transformation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/apps">
              <Button variant="white" size="lg" className="px-8 h-14 font-medium">
                Try Interactive Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function MethodologyPage() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <WhatSection />
      <HowSection />
      <WhatIfSection />
      <CTASection />
    </>
  );
}
