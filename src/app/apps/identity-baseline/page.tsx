'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  User, 
  ArrowRight, 
  RotateCcw,
  Download,
  Target,
  Heart,
  Brain,
  Shield,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface BaselineData {
  whoAmI: string;
  habitsProof: string;
  identityGap: string;
  identityClarity: number;
  selfTrust: number;
  valueCongruence: number;
  reflection: string;
}

const assessmentDimensions = [
  {
    id: 'identityClarity',
    name: 'Identity Clarity',
    description: 'How clearly can you define who you are?',
    question: 'Rate your current identity clarity',
    icon: <Target className="w-5 h-5" />,
    color: '#3DD4B0'
  },
  {
    id: 'selfTrust',
    name: 'Self-Trust',
    description: 'How much do you trust your own judgment?',
    question: 'Rate your self-trust',
    icon: <Shield className="w-5 h-5" />,
    color: '#1F6F78'
  },
  {
    id: 'valueCongruence',
    name: 'Value Congruence',
    description: 'How well do your actions match your values?',
    question: 'Rate your value congruence',
    icon: <Heart className="w-5 h-5" />,
    color: '#FFB74D'
  }
];

const reflectionPrompts = [
  "What do my daily choices say about the identity I am living?",
  "When do I feel most authentic?",
  "What identity would my closest friends say I embody?",
  "What parts of my current identity do I want to keep?",
  "What parts of my current identity no longer serve me?"
];

export default function IdentityBaselinePage() {
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState<BaselineData>({
    whoAmI: '',
    habitsProof: '',
    identityGap: '',
    identityClarity: 5,
    selfTrust: 5,
    valueCongruence: 5,
    reflection: ''
  });
  const [currentPrompt, setCurrentPrompt] = useState(0);

  const handleSliderChange = (dimension: string, value: number[]) => {
    setData(prev => ({
      ...prev,
      [dimension]: value[0]
    }));
  };

  const calculateOverallScore = () => {
    const scores = [data.identityClarity, data.selfTrust, data.valueCongruence];
    return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10);
  };

  const getStrengthsAndGaps = () => {
    const scores = [
      { name: 'Identity Clarity', score: data.identityClarity },
      { name: 'Self-Trust', score: data.selfTrust },
      { name: 'Value Congruence', score: data.valueCongruence }
    ];
    scores.sort((a, b) => b.score - a.score);
    return {
      strength: scores[0],
      gap: scores[2]
    };
  };

  const handleExport = () => {
    const exportData = {
      date: new Date().toISOString(),
      assessment: data,
      overallScore: calculateOverallScore(),
      interpretation: {
        strength: getStrengthsAndGaps().strength,
        biggestGap: getStrengthsAndGaps().gap
      }
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `identity-baseline-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleReset = () => {
    setStep(1);
    setShowResults(false);
    setData({
      whoAmI: '',
      habitsProof: '',
      identityGap: '',
      identityClarity: 5,
      selfTrust: 5,
      valueCongruence: 5,
      reflection: ''
    });
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  if (showResults) {
    const overallScore = calculateOverallScore();
    const { strength, gap } = getStrengthsAndGaps();

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
        {/* Header */}
        <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
              ← Back to Apps
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                <User className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#1F6F78]/50">BASIC</Badge>
                <h1 className="text-xl font-bold">Identity Baseline Results</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Results Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Your Identity Baseline</h2>
            <p className="text-slate-400">This is your starting point for transformation</p>
          </div>

          {/* Overall Score */}
          <Card className="bg-white mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-[#8A94A6] text-sm uppercase tracking-wide mb-4">Overall Identity Score</h3>
              <div className="text-6xl font-bold text-[#0F1C2E] mb-2">{overallScore}%</div>
              <p className="text-[#8A94A6] mb-6">
                {overallScore >= 70 ? 'Strong identity foundation with clear direction.' :
                 overallScore >= 50 ? 'Moderate clarity with room for growth.' :
                 'Significant opportunity for identity development.'}
              </p>
              <Progress value={overallScore} className="h-3" />
            </CardContent>
          </Card>

          {/* Dimension Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {assessmentDimensions.map((dim) => (
              <Card key={dim.id} className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div style={{ color: dim.color }}>{dim.icon}</div>
                    <span className="font-semibold text-[#0F1C2E]">{dim.name}</span>
                  </div>
                  <div className="text-3xl font-bold text-[#0F1C2E] mb-2">
                    {data[dim.id as keyof BaselineData] as number}/10
                  </div>
                  <Progress value={(data[dim.id as keyof BaselineData] as number) * 10} className="h-2" />
                  <p className="text-xs text-[#8A94A6] mt-2">{dim.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Strengths & Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="bg-[#3DD4B0]">
              <CardContent className="p-6">
                <Badge className="bg-white/20 text-white mb-2">Your Strength</Badge>
                <h3 className="text-xl font-bold text-white">{strength.name}</h3>
                <p className="text-white/80 text-sm">Score: {strength.score}/10</p>
                <p className="text-white/70 text-xs mt-2">Build on this foundation</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1F6F78]">
              <CardContent className="p-6">
                <Badge className="bg-white/20 text-white mb-2">Biggest Gap</Badge>
                <h3 className="text-xl font-bold text-white">{gap.name}</h3>
                <p className="text-white/80 text-sm">Score: {gap.score}/10</p>
                <p className="text-white/70 text-xs mt-2">Focus your development here</p>
              </CardContent>
            </Card>
          </div>

          {/* Self-Concept Summary */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#3DD4B0]" />
                Your Self-Concept Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-[#F6F8FA] rounded-lg">
                <h4 className="font-medium text-[#0F1C2E] mb-2">Who am I right now?</h4>
                <p className="text-[#2B2E34] text-sm">{data.whoAmI || 'Not provided'}</p>
              </div>
              <div className="p-4 bg-[#F6F8FA] rounded-lg">
                <h4 className="font-medium text-[#0F1C2E] mb-2">What identity do my habits prove?</h4>
                <p className="text-[#2B2E34] text-sm">{data.habitsProof || 'Not provided'}</p>
              </div>
              <div className="p-4 bg-[#F6F8FA] rounded-lg">
                <h4 className="font-medium text-[#0F1C2E] mb-2">What is my biggest identity gap?</h4>
                <p className="text-[#2B2E34] text-sm">{data.identityGap || 'Not provided'}</p>
              </div>
              <div className="p-4 bg-[#FFB74D]/10 rounded-lg border border-[#FFB74D]/30">
                <h4 className="font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#FFB74D]" />
                  Reflection
                </h4>
                <p className="text-[#2B2E34] text-sm">{data.reflection || 'Not provided'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={handleReset} variant="secondary" className="shadow-md">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
            <Button onClick={handleExport} className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]">
              <Download className="w-4 h-4 mr-2" />
              Export Baseline
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            ← Back to Apps
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
              <User className="w-5 h-5 text-[#3DD4B0]" />
            </div>
            <div>
              <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#1F6F78]/50">BASIC</Badge>
              <h1 className="text-xl font-bold">Identity Baseline Worksheet</h1>
              <p className="text-slate-400 text-sm">Measure your current self-concept</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="container mx-auto px-4 py-4 max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Step {step} of {totalSteps}</span>
          <span className="text-sm text-[#3DD4B0]">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-white/10 [&>div]:bg-[#3DD4B0]" />
      </div>

      {/* Assessment Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {step === 1 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#3DD4B0]" />
                Self-Concept Inventory
              </CardTitle>
              <CardDescription>
                Based on the Self-Concept and Identity Measure (SCIM), answer honestly about your current state.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
                  Who am I right now?
                </label>
                <Textarea
                  placeholder="I am someone who..."
                  value={data.whoAmI}
                  onChange={(e) => setData(prev => ({ ...prev, whoAmI: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">Describe your current identity in your own words</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
                  What identity do my habits currently prove?
                </label>
                <Textarea
                  placeholder="My habits show that I am..."
                  value={data.habitsProof}
                  onChange={(e) => setData(prev => ({ ...prev, habitsProof: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">Based on Habit-Identity Links research (Verplanken & Sui)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
                  What is my biggest identity gap?
                </label>
                <Textarea
                  placeholder="I value... but my behavior..."
                  value={data.identityGap}
                  onChange={(e) => setData(prev => ({ ...prev, identityGap: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">Where do your values and actions diverge?</p>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!data.whoAmI || !data.habitsProof || !data.identityGap}
                className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
              >
                Continue to Ratings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Target className="w-5 h-5 text-[#3DD4B0]" />
                Identity Dimensions Rating
              </CardTitle>
              <CardDescription>
                Rate each dimension on a scale of 1-10
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {assessmentDimensions.map((dim) => (
                <div key={dim.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div style={{ color: dim.color }}>{dim.icon}</div>
                      <span className="font-medium text-[#0F1C2E]">{dim.name}</span>
                    </div>
                    <Badge 
                      variant="outline"
                      style={{ borderColor: dim.color, color: dim.color }}
                    >
                      {data[dim.id as keyof BaselineData] as number}/10
                    </Badge>
                  </div>
                  <p className="text-sm text-[#8A94A6]">{dim.question}</p>
                  <Slider
                    value={[data[dim.id as keyof BaselineData] as number]}
                    onValueChange={(value) => handleSliderChange(dim.id, value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-[#8A94A6]">{dim.description}</p>
                </div>
              ))}

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  ← Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#FFB74D]" />
                Reflection Prompt
              </CardTitle>
              <CardDescription>
                Take a moment to reflect deeply on this question
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-[#FFB74D]/10 rounded-lg border border-[#FFB74D]/30">
                <p className="text-lg font-medium text-[#0F1C2E]">
                  {reflectionPrompts[currentPrompt]}
                </p>
              </div>

              <Textarea
                placeholder="Write your reflection here..."
                value={data.reflection}
                onChange={(e) => setData(prev => ({ ...prev, reflection: e.target.value }))}
                className="min-h-[150px]"
              />

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPrompt((prev) => (prev + 1) % reflectionPrompts.length)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Different prompt
                </Button>
                <span className="text-xs text-[#8A94A6]">
                  {data.reflection.length} characters
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1"
                >
                  ← Back
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
                Review Your Baseline
              </CardTitle>
              <CardDescription>
                Make sure your responses are accurate before submitting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {assessmentDimensions.map((dim) => (
                  <div key={dim.id} className="text-center p-4 bg-[#F6F8FA] rounded-lg">
                    <div style={{ color: dim.color }} className="flex justify-center mb-2">{dim.icon}</div>
                    <div className="text-2xl font-bold text-[#0F1C2E]">
                      {data[dim.id as keyof BaselineData] as number}/10
                    </div>
                    <div className="text-xs text-[#8A94A6]">{dim.name}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-[#0F1C2E] rounded-lg text-white">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#3DD4B0]" />
                  What happens next?
                </h4>
                <p className="text-sm text-slate-300">
                  This baseline will serve as your reference point. You'll be able to compare 
                  your progress over time and see how your identity evolves.
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(3)}
                  variant="outline"
                  className="flex-1"
                >
                  ← Back
                </Button>
                <Button
                  onClick={() => setShowResults(true)}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete Baseline
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
