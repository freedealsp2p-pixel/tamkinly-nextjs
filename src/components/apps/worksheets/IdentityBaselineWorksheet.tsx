'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Shield, 
  Target, 
  Heart, 
  Brain, 
  Home, 
  Compass, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Download,
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface DimensionScore {
  dimension: string;
  score: number;
  maxScore: number;
  description: string;
  questions: string[];
  icon: React.ReactNode;
  color: string;
  reflection: string;
  reflectionPrompt: string;
}

const dimensions: DimensionScore[] = [
  {
    dimension: 'Self-Concept',
    score: 0,
    maxScore: 100,
    description: 'How clear and coherent is your sense of self?',
    icon: <User className="w-5 h-5" />,
    color: '#3DD4B0',
    questions: [
      'I have a clear sense of who I am.',
      'My behavior usually reflects the person I want to be.',
      'I feel internally consistent across different situations.',
      'I know what matters to me most.',
      'I trust my own judgment more than I used to.',
      'I feel like my life reflects my values.',
      'I can describe myself without confusion or contradiction.',
      'I feel a strong connection between my identity and my daily actions.'
    ],
    reflection: '1-3 = unclear or fragmented self-concept, 4-6 = developing self-concept, 7-8 = stable self-concept, 9-10 = highly integrated self-concept',
    reflectionPrompt: 'What patterns do you notice in how you see yourself?'
  },
  {
    dimension: 'Value Congruence',
    score: 0,
    maxScore: 100,
    description: 'Alignment between your actions and your core values',
    icon: <Compass className="w-5 h-5" />,
    color: '#81C784',
    questions: [
      'I can clearly name my top 5 values.',
      'My daily actions reflect my stated values.',
      'I rarely act against my values.',
      'My decisions are guided by my values.',
      'I feel aligned between what I say and what I do.',
      'My priorities match my values.',
      'I am proud of how I live my values.',
      'My values guide my important decisions.'
    ],
    reflection: 'High congruence means your actions match your stated values.',
    reflectionPrompt: 'What values are most important to you? How well do your actions align?'
  },
  {
    dimension: 'Self-Trust',
    score: 0,
    maxScore: 100,
    description: 'Your ability to trust your own judgment and follow through',
    icon: <Shield className="w-5 h-5" />,
    color: '#1F6F78',
    questions: [
      'I keep promises I make to myself.',
      'I follow through on commitments even when I do not feel like it.',
      'I can rely on myself under pressure.',
      'I do not abandon myself when things get difficult.',
      'I trust my decisions after I make them.',
      'I learn from mistakes without collapsing into self-doubt.',
      'I act in ways that strengthen my confidence in myself.',
      'I am becoming a person I can trust.'
    ],
    reflection: 'Self-trust grows when the self repeatedly observes consistent follow-through.',
    reflectionPrompt: 'How has your relationship with self-trust evolved?'
  },
  {
    dimension: 'Commitment Consistency',
    score: 0,
    maxScore: 100,
    description: 'Your ability to follow through on commitments to yourself',
    icon: <Target className="w-5 h-5" />,
    color: '#64B5F6',
    questions: [
      'I usually complete what I start.',
      'I do not break my own commitments easily.',
      'My intentions are usually matched by action.',
      'I can stay consistent over time, not just for a few days.',
      'I know how to recover after inconsistency.',
      'I return to my commitments after disruption.',
      'I am building a reputation with myself for consistency.',
      'My daily actions support my long-term direction.'
    ],
    reflection: 'Stable commitment is a sign that the new identity is being repeatedly reinforced.',
    reflectionPrompt: 'What is the most common reason you fail to stay consistent?'
  },
  {
    dimension: 'Decision Quality',
    score: 0,
    maxScore: 100,
    description: 'The quality and intentionality of your decision-making process',
    icon: <Brain className="w-5 h-5" />,
    color: '#0F1C2E',
    questions: [
      'I make decisions that are aligned with my values.',
      'I do not make important decisions purely from emotion.',
      'I think clearly before I commit to action.',
      'I can distinguish between impulse and alignment.',
      'I usually know why I chose what I chose.',
      'My decisions usually support my future self.',
      'I rarely sabotage myself through avoidable choices.',
      'I am becoming more intentional in how I choose.'
    ],
    reflection: 'Decision quality shows when judgment improves through analytical processing.',
    reflectionPrompt: 'What type of decision causes the most damage to your progress?'
  },
  {
    dimension: 'Emotional Regulation',
    score: 0,
    maxScore: 100,
    description: 'Your ability to manage and respond to emotional experiences',
    icon: <Heart className="w-5 h-5" />,
    color: '#E57373',
    questions: [
      'I can stay grounded when I feel overwhelmed.',
      'I can notice my emotions without being controlled by them.',
      'I recover from disappointment without staying stuck.',
      'I can keep moving even when I feel uncomfortable.',
      'I know what triggers emotional reactivity in me.',
      'I can regulate myself without relying on avoidance.',
      'My emotional state does not completely determine my behavior.',
      'I can return to clarity after emotional disruption.'
    ],
    reflection: 'Emotional regulation protects consistency and enables intentional action.',
    reflectionPrompt: 'What emotional state most often weakens your identity alignment?'
  },
  {
    dimension: 'Environmental Alignment',
    score: 0,
    maxScore: 100,
    description: 'How well your environment supports your identity and goals',
    icon: <Home className="w-5 h-5" />,
    color: '#FFB74D',
    questions: [
      'My environment makes good behavior easy.',
      'My space supports the identity I want to build.',
      'My digital environment is not overly distracting.',
      'The people around me support my direction.',
      'I have access to the resources I need.',
      'My routines are designed to reduce friction.',
      'My surroundings contain useful reminders of who I am becoming.',
      'My environment does not constantly pull me away from my goals.'
    ],
    reflection: 'Environment shapes repetition and reduces friction for desired behaviors.',
    reflectionPrompt: 'What is the biggest environmental obstacle to your transformation?'
  },
  {
    dimension: 'Personal Agency',
    score: 0,
    maxScore: 100,
    description: 'Your sense of control and ownership over your life direction',
    icon: <TrendingUp className="w-5 h-5" />,
    color: '#BA68C8',
    questions: [
      'I believe my actions matter.',
      'I see myself as responsible for my life direction.',
      'I believe change is something I can participate in.',
      'I focus on what I can control.',
      'I do not blame external conditions for everything.',
      'I can influence my results through disciplined action.',
      'I believe I am an active participant in my transformation.',
      'I feel ownership over my progress.'
    ],
    reflection: 'Agency is the belief that your actions create meaningful results.',
    reflectionPrompt: 'Where do you still give away your power?'
  }
];

export default function IdentityBaselineWorksheet() {
  const [currentDimension, setCurrentDimension] = useState(0);
  const [scores, setScores] = useState<number[]>(dimensions.map(() => 50));
  const [reflections, setReflections] = useState<string[]>(dimensions.map(() => ''));
  const [showResults, setShowResults] = useState(false);

  const handleScoreChange = (value: number[]) => {
    const newScores = [...scores];
    newScores[currentDimension] = value[0];
    setScores(newScores);
  };

  const handleReflectionChange = (value: string) => {
    const newReflections = [...reflections];
    newReflections[currentDimension] = value;
    setReflections(newReflections);
  };

  const handleNext = () => {
    if (currentDimension < dimensions.length - 1) {
      setCurrentDimension(currentDimension + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentDimension > 0) {
      setCurrentDimension(currentDimension - 1);
    }
  };

  const handleReset = () => {
    setCurrentDimension(0);
    setScores(dimensions.map(() => 50));
    setReflections(dimensions.map(() => ''));
    setShowResults(false);
  };

  const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { label: 'Strong', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 60) return { label: 'Developing', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 40) return { label: 'Emerging', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Needs Focus', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const dimension = dimensions[currentDimension];

  if (showResults) {
    const sortedScores = dimensions
      .map((d, i) => ({ name: d.dimension, score: scores[i], color: d.color }))
      .sort((a, b) => a.score - b.score);
    
    const strongestArea = sortedScores[sortedScores.length - 1];
    const weakestArea = sortedScores[0];

    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-[#0F1C2E] mb-2">
            Identity Baseline Assessment Complete
          </h2>
          <p className="text-[#8A94A6]">Your comprehensive identity profile across 8 dimensions</p>
        </div>

        {/* Overall Score */}
        <Card className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-[#8A94A6] text-sm uppercase tracking-wide mb-4">Overall Identity Alignment Score</h3>
            <div className="text-6xl font-bold text-[#3DD4B0] mb-2">{overallScore}</div>
            <div className="text-white text-lg">{getScoreLabel(overallScore).label}</div>
            <Progress 
              value={overallScore} 
              className="h-3 mt-6 bg-[#1A2A42] [&>div]:bg-[#3DD4B0]" 
            />
            <p className="text-[#8A94A6] text-sm mt-4">
              Weighted average across all 8 dimensions
            </p>
          </CardContent>
        </Card>

        {/* Dimension Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensions.map((dim, index) => (
            <Card key={index} className="border-l-4" style={{ borderLeftColor: dim.color }}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div style={{ color: dim.color }}>{dim.icon}</div>
                    <span className="font-semibold text-[#0F1C2E]">{dim.dimension}</span>
                  </div>
                  <Badge className={`${getScoreLabel(scores[index]).bg} ${getScoreLabel(scores[index]).color}`}>
                    {scores[index]}%
                  </Badge>
                </div>
                <Progress 
                  value={scores[index]} 
                  className="h-2 bg-gray-100" 
                />
                {reflections[index] && (
                  <p className="text-xs text-[#8A94A6] mt-2 italic line-clamp-2">
                    "{reflections[index].substring(0, 100)}..."
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Card */}
        <Card className="bg-[#F6F8FA]">
          <CardHeader>
            <CardTitle className="text-[#0F1C2E]">Baseline Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-[#0F1C2E]">Strongest Area</span>
              <Badge className="bg-green-100 text-green-800">{strongestArea.name} ({strongestArea.score}%)</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-[#0F1C2E]">Area for Growth</span>
              <Badge className="bg-red-100 text-red-800">{weakestArea.name} ({weakestArea.score}%)</Badge>
            </div>
            <div className="p-3 bg-[#3DD4B0]/10 rounded-lg">
              <p className="text-sm text-[#0F1C2E]">
                <strong>Final Baseline Statement:</strong> I am starting from a place where...
              </p>
              <Textarea 
                placeholder="Complete your baseline statement..."
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={handleReset}
            className="bg-[#1F6F78] text-white hover:bg-[#1a5a62] font-semibold px-6 py-2.5"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Assessment
          </Button>
          <Button 
            onClick={() => {
              const data = {
                date: new Date().toISOString(),
                overallScore,
                dimensions: dimensions.map((d, i) => ({
                  name: d.dimension,
                  score: scores[i],
                  reflection: reflections[i]
                }))
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `identity-baseline-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
            }}
            className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-6 py-2.5"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Purpose Header */}
      <Card className="bg-[#3DD4B0]/5 border-[#3DD4B0]/20">
        <CardContent className="p-4">
          <p className="text-sm text-[#0F1C2E]">
            <strong>Purpose:</strong> To establish a clear, honest snapshot of your current identity before any transformation work begins. 
            Complete this worksheet on Day 1. Answer honestly, not aspirationally.
          </p>
        </CardContent>
      </Card>

      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 mb-2">
            Dimension {currentDimension + 1} of {dimensions.length}
          </Badge>
          <Progress 
            value={((currentDimension + 1) / dimensions.length) * 100} 
            className="h-2 w-48 bg-gray-100 [&>div]:bg-[#3DD4B0]" 
          />
        </div>
        <div className="text-right">
          <span className="text-sm text-[#8A94A6]">Current Score</span>
          <div className={`text-2xl font-bold ${getScoreLabel(scores[currentDimension]).color}`}>
            {scores[currentDimension]}%
          </div>
        </div>
      </div>

      {/* Current Dimension Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: dimension.color }}
            >
              {dimension.icon}
            </div>
            <div>
              <CardTitle className="text-xl text-[#0F1C2E]">{dimension.dimension}</CardTitle>
              <CardDescription className="text-[#8A94A6]">{dimension.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating Questions */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[#0F1C2E] text-sm uppercase tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#3DD4B0]" />
              Rate each statement from 1 to 10
            </h4>
            <p className="text-xs text-[#8A94A6]">
              1 = Very low / not true | 5 = Neutral / mixed | 10 = Fully true / highly stable
            </p>
            {dimension.questions.map((question, qIndex) => (
              <div key={qIndex} className="flex items-start gap-3 p-3 bg-[#F6F8FA] rounded-lg">
                <span className="w-6 h-6 rounded-full bg-[#0F1C2E] text-white flex items-center justify-center text-xs flex-shrink-0">
                  {qIndex + 1}
                </span>
                <span className="text-[#2B2E34] text-sm">{question}</span>
              </div>
            ))}
          </div>

          {/* Score Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-[#0F1C2E] text-sm uppercase tracking-wide">
                Overall Score for {dimension.dimension}
              </h4>
              <Badge className={`${getScoreLabel(scores[currentDimension]).bg} ${getScoreLabel(scores[currentDimension]).color}`}>
                {scores[currentDimension]}%
              </Badge>
            </div>
            <Slider
              value={[scores[currentDimension]]}
              onValueChange={handleScoreChange}
              max={100}
              step={5}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-[#8A94A6]">
              <span>1 - Needs significant improvement</span>
              <span>10 - Strong and consistent</span>
            </div>
          </div>

          {/* Interpretation */}
          <div className="p-3 bg-[#1F6F78]/5 rounded-lg border border-[#1F6F78]/20">
            <h4 className="font-semibold text-[#1F6F78] text-sm mb-1">Interpretation:</h4>
            <p className="text-sm text-[#2B2E34]">{dimension.reflection}</p>
          </div>

          {/* Reflection */}
          <div className="space-y-2">
            <h4 className="font-semibold text-[#0F1C2E] text-sm uppercase tracking-wide">
              Reflection Exercise
            </h4>
            <p className="text-sm text-[#8A94A6] italic">{dimension.reflectionPrompt}</p>
            <Textarea
              placeholder="Take a moment to reflect... Your thoughts will be saved with your assessment."
              value={reflections[currentDimension]}
              onChange={(e) => handleReflectionChange(e.target.value)}
              className="min-h-[100px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrevious}
          disabled={currentDimension === 0}
          className="bg-[#0F1C2E] text-white hover:bg-[#1a2d47] font-semibold px-6 py-2.5 disabled:opacity-50"
        >
          ← Previous
        </Button>
        
        <div className="flex items-center gap-1">
          {dimensions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDimension(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentDimension === index ? 'bg-[#3DD4B0] w-4' : 
                scores[index] !== 50 ? 'bg-[#1F6F78]' : 'bg-[#8A94A6]/30'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-6 py-2.5"
        >
          {currentDimension === dimensions.length - 1 ? 'Complete Assessment' : 'Next →'}
        </Button>
      </div>

      {/* Baseline Rule */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800">
            <strong>Baseline Rule:</strong> If a score feels uncertain, choose the lower score. 
            Your goal is clarity, not perfection.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
