'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  BookOpen,
  Target,
  Brain,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  AlertTriangle,
  Sparkles
} from "lucide-react";

const keyTakeaways = [
  "Behavior change without identity change is temporary",
  "Your identity is the operating system; behavior is just the output",
  "Lasting transformation requires rewriting who you believe you are",
  "Small identity shifts create massive behavioral cascades",
  "You don't rise to your goals — you fall to your systems (and your identity is the system)"
];

const comparisonTable = [
  {
    aspect: "Focus",
    behavior: "What you do",
    identity: "Who you are"
  },
  {
    aspect: "Energy Source",
    behavior: "Willpower (depletable)",
    identity: "Automatic (renewable)"
  },
  {
    aspect: "Duration",
    behavior: "Temporary (requires maintenance)",
    identity: "Permanent (self-sustaining)"
  },
  {
    aspect: "Failure Response",
    behavior: "Guilt, shame, giving up",
    identity: "Learning, adjustment, continuation"
  },
  {
    aspect: "Example",
    behavior: "\"I'm trying to quit smoking\"",
    identity: "\"I'm not a smoker\""
  }
];

const exercises = [
  {
    number: 1,
    title: "The Identity Audit",
    time: "10 minutes",
    description: "Map your current identity across key life domains",
    steps: [
      "List 5 areas of your life (health, career, relationships, finances, personal growth)",
      "For each area, complete: \"I am the kind of person who...\"",
      "Notice which identities serve you and which limit you",
      "Identify ONE identity you want to transform"
    ]
  },
  {
    number: 2,
    title: "The Future Self Dialogue",
    time: "15 minutes",
    description: "Have a conversation with your future identity",
    steps: [
      "Close your eyes and imagine yourself 1 year from now",
      "See the version of you who has already achieved your goals",
      "Ask: \"What would [Future You] do in this situation?\"",
      "Write down 3 things Future You would do differently today"
    ]
  },
  {
    number: 3,
    title: "Identity Evidence Log",
    time: "5 minutes daily",
    description: "Collect evidence for your new identity",
    steps: [
      "Choose your target identity (e.g., \"I am a healthy person\")",
      "Each day, log 3 actions that prove this identity true",
      "Small actions count: took stairs, chose water, went to bed on time",
      "Review weekly to see your identity taking shape"
    ]
  },
  {
    number: 4,
    title: "The Identity Reframe",
    time: "5 minutes",
    description: "Transform goals into identity statements",
    steps: [
      "Write down a behavior goal (e.g., \"I want to run 3x per week\")",
      "Reframe it as an identity: \"I am a runner\"",
      "List 5 things a runner would do (even small things)",
      "Do ONE of those things today to cast your vote"
    ]
  }
];

export default function IdentityVsBehaviorGuide() {
  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link href="/resources" className="inline-flex items-center text-[#3DD4B0] hover:text-white transition-colors text-sm font-medium mb-10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Resources
            </Link>
            {/* Centered Title */}
            <div className="text-center">
              <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/10">
                <BookOpen className="w-3.5 h-3.5 mr-2" />
                Free Guide
              </Badge>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight text-center">
              Identity vs. Behavior Change: Why Willpower Always Fails
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-6 text-center">
              The hidden reason most self-improvement efforts don't last — and the identity-first 
              approach that creates permanent transformation.
            </p>
            <div className="flex items-center justify-center gap-8 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-white font-medium">15 min read</span>
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4 text-accent" />
                <span className="text-white font-medium">Tamkinly Team</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-12 bg-accent/5 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-accent" />
              <h2 className="font-semibold text-primary">Key Takeaways</h2>
            </div>
            <ul className="space-y-2">
              {keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">
            
            {/* Introduction */}
            <div className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              Every January, millions of people set behavior goals. They commit to exercising, 
              eating better, reading more, or building that side project. By February, most 
              have already quit. The problem isn't their willpower — it's their approach.
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Behavior Trap
            </h2>
            
            <p className="text-slate-600 leading-relaxed mb-6">
              Traditional self-improvement focuses on <strong>behavior</strong>: what you do. 
              "I need to exercise more." "I should stop procrastinating." "I want to be more productive."
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This approach treats symptoms, not causes. It's like trying to fix a car's 
              performance by pushing it faster instead of tuning the engine.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 rounded-r-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">The Willpower Depletion Problem</h4>
                  <p className="text-amber-700 text-sm">
                    Willpower is a finite resource. Studies show it depletes with use. 
                    Every decision, every resistance, every "I should" drains it. 
                    Behavior change that relies on willpower is fighting a losing battle.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              What Identity Actually Means
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Your identity is not who you wish you were. It's not who you tell people you are. 
              It's the deep, often unconscious beliefs you hold about yourself — the internal 
              narrative that runs your life.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              When you truly believe "I am a healthy person," healthy choices become automatic. 
              You don't debate whether to exercise. You don't fight cravings. You simply do what 
              a healthy person does — because that's who you are.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This is why identity change is so powerful: it moves behavior from the conscious 
              (effortful) to the unconscious (automatic).
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Behavior vs. Identity: A Clear Comparison
            </h2>

            {/* Comparison Table */}
            <div className="overflow-x-auto my-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-3 text-left font-semibold">Aspect</th>
                    <th className="px-4 py-3 text-left font-semibold">Behavior Change</th>
                    <th className="px-4 py-3 text-left font-semibold">Identity Change</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-primary">{row.aspect}</td>
                      <td className="px-4 py-3 text-slate-600">{row.behavior}</td>
                      <td className="px-4 py-3 text-accent font-medium">{row.identity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              The Identity Recode Framework
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              Lasting transformation follows a specific sequence. Skip a step, and the change 
              won't stick. Here's the framework:
            </p>

            <div className="bg-primary/5 p-8 rounded-xl my-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Identify Your Current Identity</h4>
                    <p className="text-slate-600 text-sm">What do you believe about yourself in this area? Be honest. The truth will set you free.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Define Your Target Identity</h4>
                    <p className="text-slate-600 text-sm">Who would you be if you had already achieved your goals? How would that person think, feel, act?</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Collect Evidence</h4>
                    <p className="text-slate-600 text-sm">Take small actions that prove your new identity is true. Each action is a vote for who you're becoming.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Embody and Expand</h4>
                    <p className="text-slate-600 text-sm">As evidence accumulates, your identity solidifies. The behavior becomes automatic. The change becomes permanent.</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              Why This Matters
            </h2>

            <p className="text-slate-600 leading-relaxed mb-6">
              The goal isn't to have more discipline. The goal is to need less discipline. 
              When your identity aligns with your desired behavior, you don't need willpower. 
              The behavior becomes as natural as breathing.
            </p>

            <p className="text-slate-600 leading-relaxed mb-6">
              This is why two people can face the same temptation and respond differently. 
              One has to fight; the other doesn't even notice. The difference isn't strength — 
              it's identity.
            </p>

            <div className="bg-accent/5 border-l-4 border-accent p-6 my-8 rounded-r-lg">
              <p className="text-slate-700 italic">
                "You don't rise to the level of your goals. You fall to the level of your systems." 
                — James Clear. And your identity is the most important system of all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercises Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                Practical Exercises
              </Badge>
              <h2 className="font-serif text-3xl font-bold text-primary mb-4">
                Transform Theory Into Practice
              </h2>
              <p className="text-slate-600">
                These exercises will help you apply identity-first principles to your own life.
              </p>
            </div>

            <div className="space-y-6">
              {exercises.map((exercise) => (
                <Card key={exercise.number} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold">
                        {exercise.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg text-primary">{exercise.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {exercise.time}
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm mb-4">{exercise.description}</p>
                        <ol className="space-y-2">
                          {exercise.steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs">{idx + 1}</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                Continue Your Journey
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <Link href="/quiz">
                <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group h-full bg-accent/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="h-6 w-6 text-accent" />
                      <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                        Take the Identity Assessment
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600">
                      Discover your identity gaps and get a personalized transformation roadmap.
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/apps">
                <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group h-full bg-accent/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="h-6 w-6 text-accent" />
                      <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                        Explore Transformation Apps
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600">
                        Free tools to track habits, set goals, and build your new identity.
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready for Structured Transformation?
            </h2>
            <p className="text-slate-300 mb-6">
              The Identity Recode Planner provides a 30-day guided journey with daily exercises, 
              journaling prompts, and progress tracking.
            </p>
            <Link href="/products">
              <Button size="xl" variant="accent" className="font-bold shadow-2xl shadow-[#3DD4B0]/30 hover:shadow-[#3DD4B0]/50">
                View Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
