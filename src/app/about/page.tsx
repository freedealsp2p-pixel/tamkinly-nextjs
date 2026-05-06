'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Heart, 
  Target, 
  Users, 
  Lightbulb,
  Compass,
  Scale
} from "lucide-react";

// Hero Section
function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/10">
            Our Story
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            About&nbsp;<span className="text-accent">Tamkinly</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            A space born from the understanding that true transformation doesn't come from 
            fixing what's broken—but from returning to what's always been there.
          </p>
        </div>
      </div>
    </section>
  );
}

// Mission Section
function MissionSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">
              Our Mission
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-6">
              Return to Who You Already Are
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                In a world obsessed with self-improvement, we forgot something essential: 
                you&apos;re not a project to be completed. You&apos;re not a problem to be solved. 
                You&apos;re not broken.
              </p>
              <p>
                Tamkinly was created from a simple but radical idea—that the path forward 
                isn&apos;t about becoming someone new, but about returning to who you&apos;ve always been 
                beneath the layers of expectations, conditioning, and self-judgment.
              </p>
              <p>
                We don&apos;t offer quick fixes or temporary motivation. We provide frameworks 
                for deep identity work that creates lasting transformation from the inside out.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <Card className="border-0 shadow-xl bg-accent/5">
              <CardContent className="p-8 lg:p-10">
                <div className="text-6xl text-accent/30 font-serif mb-4">&ldquo;</div>
                <blockquote className="font-serif text-2xl text-primary leading-relaxed mb-6">
                  The journey isn&apos;t about adding more. It&apos;s about removing everything that isn&apos;t truly you.
                </blockquote>
                <p className="text-sm text-slate-500">
                  — The Tamkinly Philosophy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// Values Section
function ValuesSection() {
  const values = [
    {
      icon: Heart,
      title: "No Self-Judgment",
      description: "We meet you where you are, not where you 'should' be. Growth without shame."
    },
    {
      icon: Target,
      title: "Identity-First",
      description: "Lasting change starts at the identity level, not the behavior level."
    },
    {
      icon: Users,
      title: "Human-Centered",
      description: "We design for real humans with real complexities, not idealized versions."
    },
    {
      icon: Lightbulb,
      title: "Clarity Over Complexity",
      description: "Simple doesn't mean shallow. Deep work can be beautifully simple."
    },
    {
      icon: Compass,
      title: "Self-Direction",
      description: "We provide the map, but you choose the path. Your journey is yours."
    },
    {
      icon: Scale,
      title: "Evidence-Informed",
      description: "Grounded in psychology, neuroscience, and proven transformation principles."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            Our Values
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            What We Believe
          </h2>
          <p className="text-slate-600">
            These aren&apos;t just words on a page. They&apos;re the principles that guide every product we create.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, idx) => (
            <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// What Makes Us Different
function DifferentSection() {
  const differences = [
    {
      title: "Not Another Planner",
      description: "We don't just give you empty pages to fill. Every prompt, every exercise is strategically designed to guide you deeper into self-understanding."
    },
    {
      title: "No Toxic Positivity",
      description: "We won't tell you to 'just think positive' or 'manifest your dreams.' Real transformation requires honest self-confrontation."
    },
    {
      title: "Depth Over Hacks",
      description: "Quick tips don't create lasting change. We go deep, because that's where real transformation happens."
    },
    {
      title: "One-Time Purchase",
      description: "No subscriptions. No upsells. No hidden fees. Buy once, own forever—including all future updates."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              What Makes Us Different
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
              Not Your Typical Self-Help Brand
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {differences.map((diff, idx) => (
              <Card key={idx} className="border-l-4 border-l-accent border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary mb-2">{diff.title}</h3>
                  <p className="text-sm text-slate-600">{diff.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Founders Section — A Collective Born From Lived Experience
function FounderSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              The Founders
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
              Born From Experience, Not Theory
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We didn&apos;t start with a business plan. We started with a shared realization—that the life 
              we were living wasn&apos;t the one we were capable of.
            </p>
          </div>
          
          <Card className="border-0 shadow-2xl bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Team Image Section */}
                <div className="lg:w-2/5 bg-gradient-to-br from-primary via-[#1F6F78] to-primary relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(61,212,176,0.2),transparent_50%)]" />
                  <div className="p-8 lg:p-10 flex flex-col items-center justify-center min-h-[400px] relative">
                    {/* Team Photo */}
                    <div className="relative w-full max-w-[320px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                      <Image 
                        src="/founders-team.webp" 
                        alt="Tamkinly Founding Team - Young visionaries planning together" 
                        width={672}
                        height={384}
                        className="w-full h-auto object-cover"
                        priority
                      />
                    </div>
                    
                    {/* Floating badge */}
                    <div className="mt-6 bg-white rounded-full px-5 py-2 shadow-lg border border-accent/20">
                      <span className="text-sm font-medium text-primary flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Building the future of self-transformation
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
                  {/* Quote Icon */}
                  <div className="text-6xl text-accent/20 font-serif mb-4">&ldquo;</div>
                  
                  <blockquote className="text-slate-700 leading-relaxed mb-6 text-lg">
                    <p className="mb-4">
                      Each of us had spent years chasing a &ldquo;better&rdquo; version of ourselves—reading the books, 
                      attending the workshops, following the gurus. We tried every method available, and while some 
                      things worked temporarily, nothing created lasting change. Because they were all trying to 
                      &apos;fix&apos; us, as if we were broken.
                    </p>
                    <p className="mb-4">
                      What we discovered—through our own struggles, failures, and breakthroughs—was that the answer 
                      wasn&apos;t about becoming someone new. It was about stripping away everything that wasn&apos;t 
                      truly us. Not the complete version, but the version that lives with meaning, purpose, and 
                      authenticity. The strongest, healthiest, most beautiful version that was always there beneath 
                      the noise.
                    </p>
                    <p>
                      Tamkinly was born from that shared journey. We didn&apos;t create it from textbooks—we built it 
                      from the scars and wisdom of our own transformation. And we&apos;re here to walk that path 
                      with you.
                    </p>
                  </blockquote>
                  
                  {/* Founders Info */}
                  <div className="border-t border-slate-200 pt-6 mt-auto">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-primary text-xl">
                          The Tamkinly Founders
                        </p>
                        <p className="text-[#1F6F78] font-medium">
                          A collective of lived experiences
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Social proof */}
                  <div className="flex items-center gap-6 mt-6 pt-6 border-t border-slate-100">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">500+</p>
                      <p className="text-sm text-slate-500">Transformations</p>
                    </div>
                    <div className="w-px h-10 bg-slate-200" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">15+</p>
                      <p className="text-sm text-slate-500">Years of Combined Research</p>
                    </div>
                    <div className="w-px h-10 bg-slate-200" />
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">4</p>
                      <p className="text-sm text-slate-500">Founding Members</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Return to{" "}
            <span className="text-accent">Yourself</span>?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Start your journey of identity reconstruction today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/methodology">
              <Button variant="white" size="lg" className="px-8 font-semibold">
                Our Methodology
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <DifferentSection />
      <FounderSection />
      <CTASection />
    </>
  );
}
