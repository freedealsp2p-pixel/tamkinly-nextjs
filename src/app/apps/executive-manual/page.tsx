'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Target,
  Heart,
  Brain,
  Home,
  TrendingUp,
  Shield,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Lightbulb,
  Zap,
  Lock
} from 'lucide-react';

const phases = [
  {
    name: 'Phase 1: Observe',
    days: 'Days 1-7',
    description: 'Capture baseline, values, habits, triggers, and environment.',
    color: '#3DD4B0'
  },
  {
    name: 'Phase 2: Intervene',
    days: 'Days 8-14',
    description: 'Adjust cues, reduce friction, and improve decision structure.',
    color: '#1F6F78'
  },
  {
    name: 'Phase 3: Evidence',
    days: 'Days 15-21',
    description: 'Track repeated actions and emerging identity proof.',
    color: '#64B5F6'
  },
  {
    name: 'Phase 4: Stabilize',
    days: 'Days 22-30',
    description: 'Review results, reinforce wins, and refine the next cycle.',
    color: '#FFB74D'
  }
];

const corePrinciples = [
  { principle: 'Repeated behavior creates evidence.', icon: Target },
  { principle: 'Evidence shapes self-concept.', icon: Brain },
  { principle: 'Environment shapes repetition.', icon: Home },
  { principle: 'Decisions reveal identity.', icon: Heart },
  { principle: 'Emotional regulation protects consistency.', icon: Shield },
  { principle: 'Progress becomes visible when it is recorded.', icon: TrendingUp }
];

const systems = [
  { name: 'Baseline', question: 'Where am I now?', icon: Target, color: '#3DD4B0' },
  { name: 'Environment', question: 'What supports or blocks the new identity?', icon: Home, color: '#1F6F78' },
  { name: 'Decisions', question: 'What patterns drive my choices?', icon: Brain, color: '#64B5F6' },
  { name: 'Evidence', question: 'What proof shows that change is happening?', icon: Eye, color: '#FFB74D' },
  { name: 'Progress', question: 'How do I measure growth over time?', icon: TrendingUp, color: '#E57373' },
  { name: 'Integration', question: 'What must become stable, repeatable, and automatic?', icon: CheckCircle2, color: '#BA68C8' }
];

const rules = [
  'Write honestly, not ideally.',
  'Measure what happened, not what you hoped would happen.',
  'Use evidence before interpretation.',
  'Treat repeated resistance as information, not failure.',
  'Focus on consistency over intensity.',
  'Review the system weekly.',
  'Update the plan based on data.'
];

const worksheets = [
  { name: 'Executive Manual', purpose: 'Defines the logic and structure.', tier: 'BASIC' },
  { name: 'Identity Baseline Worksheet', purpose: 'Measures current identity status.', tier: 'BASIC' },
  { name: 'Environmental Audit', purpose: 'Finds support and resistance in context.', tier: 'BASIC' },
  { name: 'Decision Pattern Analysis', purpose: 'Tracks how choices are actually made.', tier: 'PREMIUM' },
  { name: 'Evidence Tracking System', purpose: 'Records proof of behavioral change.', tier: 'PREMIUM' },
  { name: 'Progress Dashboard Guide', purpose: 'Displays change over time in a simple visual form.', tier: 'PREMIUM' }
];

const sections = [
  {
    id: 'purpose',
    title: 'Purpose of the System',
    content: `This planner is designed to help a person move from passive reaction to intentional self-direction. The core assumption is simple: lasting change becomes more stable when it is rooted in identity, supported by environment, and reinforced through repeated evidence.`
  },
  {
    id: 'what-it-does',
    title: 'What This System Does',
    list: [
      'Clarifies the current identity baseline.',
      'Identifies the gap between present behavior and desired identity.',
      'Audits the environment for support and friction.',
      'Analyzes decision patterns.',
      'Tracks evidence of change daily.',
      'Measures progress over 30 days.'
    ]
  },
  {
    id: 'what-it-does-not',
    title: 'What This System Does Not Do',
    list: [
      'It does not rely on motivation alone.',
      'It does not assume one insight will create transformation.',
      'It does not measure progress only by emotion or intention.'
    ]
  },
  {
    id: 'how-to-use',
    title: 'How to Use This Manual',
    content: `Use this manual as the operating logic behind the worksheets and dashboard. Each page in the planner should connect to one of six functions: assess, observe, design, decide, evidence, and review.`
  },
  {
    id: 'rhythm',
    title: 'Recommended Rhythm',
    list: [
      'Day 1: Complete baseline assessments.',
      'Days 2-7: Observe patterns and environment.',
      'Days 8-14: Modify cues, routines, and decisions.',
      'Days 15-21: Track evidence and consistency.',
      'Days 22-30: Review progress, refine identity, and lock in maintenance.'
    ]
  },
  {
    id: 'user-rule',
    title: 'User Rule',
    highlight: 'Do not aim for perfection. Aim for repeated observation and correction.'
  },
  {
    id: 'identity-mechanism',
    title: 'How Identity Change Works',
    content: `A person does not simply "become" a new identity by thinking positively. Identity is strengthened when behavior, self-description, and context begin to match.`,
    list: [
      'A new identity is chosen.',
      'Small actions are repeated.',
      'The actions produce evidence.',
      'The evidence reduces self-doubt.',
      'The self-concept updates.',
      'The behavior becomes more natural.'
    ]
  },
  {
    id: 'progress-examples',
    title: 'Examples of Valid Progress',
    list: [
      'Completing planned actions.',
      'Making cleaner decisions.',
      'Recovering faster after lapses.',
      'Reducing friction in the environment.',
      'Keeping a consistent log.',
      'Acting according to values under stress.',
      'Seeing fewer identity conflicts.'
    ]
  },
  {
    id: 'setbacks',
    title: 'How to Interpret Setbacks',
    content: `Setbacks do not mean the identity failed. They indicate one of four things:`,
    list: [
      'The environment is too resistant.',
      'The cue is too weak.',
      'The decision rule is unclear.',
      'The evidence system is too passive.'
    ],
    note: 'This interpretation keeps the user in problem-solving mode instead of self-judgment mode.'
  },
  {
    id: 'maintenance',
    title: 'Maintenance Principle',
    content: `The final goal is not to "finish" change, but to create a repeatable identity system. When change is maintained through evidence, environment, and self-monitoring, it becomes less dependent on temporary motivation.`,
    list: [
      'Actions are easier to repeat.',
      'Identity feels more coherent.',
      'Decisions require less effort.',
      'Recovery from misses becomes faster.'
    ]
  },
  {
    id: 'implementation',
    title: 'Implementation Logic',
    content: `For each target identity, ask four questions:`,
    list: [
      'What does this identity do repeatedly?',
      'What makes that behavior easier or harder?',
      'What decisions support or block it?',
      'What evidence would prove it is becoming real?'
    ],
    note: 'This keeps the system grounded in measurable behavior rather than vague aspiration.'
  },
  {
    id: 'dashboard',
    title: 'Reading the Dashboard',
    content: `A good dashboard should be simple, visible, and repeated often. Monitoring progress works best when the outcome is physically recorded and reviewed frequently.`,
    list: [
      'Daily completion.',
      'Weekly consistency.',
      'Identity alignment score.',
      'Decision quality score.',
      'Environmental support score.',
      'Evidence count.',
      'Milestones reached.'
    ]
  },
  {
    id: 'final',
    title: 'Final Instruction',
    highlight: 'Use this manual as the standard for every worksheet inside the planner. Each page should help the user answer one question: "What am I repeatedly proving to myself about who I am becoming?"'
  }
];

export default function ExecutiveManualPage() {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-8 px-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            ← Back to Apps
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-14 h-14 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-[#3DD4B0]" />
            </div>
            <div>
              <Badge className="bg-[#1F6F78]/20 text-[#1F6F78] border border-[#1F6F78]/50 mb-2">BASIC</Badge>
              <h1 className="text-2xl font-bold">Executive Manual</h1>
              <p className="text-slate-400">Identity Recode Planner - 30-Day Guided Journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <Card className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] border-0 mb-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                A 30-Day Guided Journey for Identity Alignment
              </h2>
              <p className="text-[#8A94A6] text-lg mb-6">
                Behavioral Recalibration, and Self-Authored Change
              </p>
              <p className="text-slate-300 max-w-2xl mx-auto">
                A practical system for assessing your current identity, identifying misalignment, 
                redesigning your environment, tracking evidence, and installing a more coherent 
                self-concept through daily action.
              </p>
            </CardContent>
          </Card>

          {/* Core Principles */}
          <Card className="mb-8 border-l-4 border-l-[#3DD4B0]">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#3DD4B0]" />
                Core Principles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {corePrinciples.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-[#F6F8FA] rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#3DD4B0]" />
                    </div>
                    <span className="text-[#2B2E34] font-medium">{item.principle}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* The 6-System Model */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E]">The 6-System Model</CardTitle>
              <p className="text-[#8A94A6]">This planner works through six linked systems:</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systems.map((system, index) => (
                  <Card key={index} className="border-l-4" style={{ borderLeftColor: system.color }}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${system.color}20` }}>
                          <system.icon className="w-4 h-4" style={{ color: system.color }} />
                        </div>
                        <span className="font-semibold text-[#0F1C2E]">{index + 1}. {system.name}</span>
                      </div>
                      <p className="text-sm text-[#8A94A6] italic">{system.question}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 30-Day Path */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#3DD4B0]" />
                The 30-Day Path
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {phases.map((phase, index) => (
                  <div key={index} className="p-4 rounded-lg border-2" style={{ borderColor: phase.color }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: phase.color }}>
                        {index + 1}
                      </div>
                      <span className="font-semibold text-[#0F1C2E]">{phase.name}</span>
                    </div>
                    <Badge variant="outline" className="mb-2 text-xs">{phase.days}</Badge>
                    <p className="text-sm text-[#8A94A6]">{phase.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rules */}
          <Card className="mb-8 bg-[#1F6F78]/5 border-[#1F6F78]/20">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#1F6F78]" />
                Rules of the Planner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#1F6F78] text-white flex items-center justify-center text-xs flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-[#2B2E34]">{rule}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={section.id} className={section.highlight ? 'bg-[#3DD4B0]/10 border-[#3DD4B0]' : ''}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#0F1C2E] mb-4">{section.title}</h3>
                  {section.content && (
                    <p className="text-[#2B2E34] leading-relaxed mb-4">{section.content}</p>
                  )}
                  {section.highlight && (
                    <p className="text-[#1F6F78] font-semibold text-lg italic">{section.highlight}</p>
                  )}
                  {section.list && (
                    <ul className="space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                          <span className="text-[#2B2E34]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.note && (
                    <p className="text-sm text-[#8A94A6] italic mt-4 p-3 bg-white/50 rounded-lg">
                      {section.note}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Worksheets Overview */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E]">Using the Worksheets Together</CardTitle>
              <p className="text-[#8A94A6]">Each worksheet has a role in the system:</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {worksheets.map((ws, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#F6F8FA] rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileTextIcon className="w-5 h-5 text-[#1F6F78]" />
                      <div>
                        <span className="font-medium text-[#0F1C2E]">{ws.name}</span>
                        <p className="text-sm text-[#8A94A6]">{ws.purpose}</p>
                      </div>
                    </div>
                    <Badge className={ws.tier === 'BASIC' ? 'bg-[#1F6F78]/10 text-[#1F6F78]' : 'bg-purple-100 text-purple-800'}>
                      {ws.tier}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link href="/apps/identity-recode-system">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 py-6 text-lg font-semibold">
                Start the 30-Day Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}
