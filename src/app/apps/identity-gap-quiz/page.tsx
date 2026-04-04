'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  ArrowRight, 
  RotateCcw,
  Download,
  Sparkles,
  Target,
  TrendingUp,
  CheckCircle2,
  Shield
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  dimension: string;
  dimensionLabel: string;
}

const questions: Question[] = [
  // Self-Trust Dimension
  { id: 1, text: 'I trust my own judgment when making important decisions', dimension: 'selfTrust', dimensionLabel: 'Self-Trust' },
  { id: 2, text: 'I keep the promises I make to myself', dimension: 'selfTrust', dimensionLabel: 'Self-Trust' },
  { id: 3, text: 'I believe in my ability to figure things out', dimension: 'selfTrust', dimensionLabel: 'Self-Trust' },
  
  // Clarity Dimension
  { id: 4, text: 'I have a clear vision of who I want to become', dimension: 'clarity', dimensionLabel: 'Clarity' },
  { id: 5, text: 'I know my top 5 core values', dimension: 'clarity', dimensionLabel: 'Clarity' },
  { id: 6, text: 'I can describe my ideal future self in detail', dimension: 'clarity', dimensionLabel: 'Clarity' },
  
  // Alignment Dimension
  { id: 7, text: 'My daily actions reflect my stated values', dimension: 'alignment', dimensionLabel: 'Alignment' },
  { id: 8, text: 'I spend most of my time on what truly matters to me', dimension: 'alignment', dimensionLabel: 'Alignment' },
  { id: 9, text: 'My environment supports my growth goals', dimension: 'alignment', dimensionLabel: 'Alignment' },
  
  // Consistency Dimension
  { id: 10, text: 'I follow through on commitments to myself', dimension: 'consistency', dimensionLabel: 'Consistency' },
  { id: 11, text: 'I maintain habits even when motivation is low', dimension: 'consistency', dimensionLabel: 'Consistency' },
  { id: 12, text: 'I have systems that help me stay on track', dimension: 'consistency', dimensionLabel: 'Consistency' },
];

const scaleLabels = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

export default function IdentityGapQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  // Calculate dimension scores
  const calculateDimensionScores = () => {
    const dimensions = ['selfTrust', 'clarity', 'alignment', 'consistency'];
    const scores: Record<string, { current: number; target: number; gap: number }> = {};
    
    dimensions.forEach(dim => {
      const dimQuestions = questions.filter(q => q.dimension === dim);
      const total = dimQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      const maxPossible = dimQuestions.length * 5;
      const current = Math.round((total / maxPossible) * 100);
      const target = 100;
      scores[dim] = {
        current,
        target,
        gap: target - current
      };
    });
    
    return scores;
  };

  const getOverallGap = () => {
    const scores = calculateDimensionScores();
    const avgCurrent = Object.values(scores).reduce((sum, s) => sum + s.current, 0) / 4;
    return Math.round(100 - avgCurrent);
  };

  const getDominantGrowthArea = () => {
    const scores = calculateDimensionScores();
    const sorted = Object.entries(scores).sort((a, b) => b[1].gap - a[1].gap);
    return sorted[0];
  };

  // Tamkinly brand colors only
  const dimensionInfo: Record<string, { name: string; description: string; color: string; icon: React.ReactNode }> = {
    selfTrust: {
      name: 'Self-Trust',
      description: 'Your ability to trust your own judgment and keep promises to yourself',
      color: '#3DD4B0', // Mint - primary accent
      icon: <Brain className="w-5 h-5" />
    },
    clarity: {
      name: 'Clarity',
      description: 'How clear you are about who you want to become and what you value',
      color: '#1F6F78', // Teal - secondary
      icon: <Target className="w-5 h-5" />
    },
    alignment: {
      name: 'Alignment',
      description: 'The match between your daily actions and your stated values',
      color: '#FFB74D', // Amber - warm accent
      icon: <Sparkles className="w-5 h-5" />
    },
    consistency: {
      name: 'Consistency',
      description: 'Your ability to follow through on commitments regardless of motivation',
      color: '#0F1C2E', // Navy - primary
      icon: <TrendingUp className="w-5 h-5" />
    }
  };

  if (showResults) {
    const scores = calculateDimensionScores();
    const overallGap = getOverallGap();
    const [dominantArea, dominantScore] = getDominantGrowthArea();

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
                <Brain className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Identity Gap Assessment</h1>
                <p className="text-slate-400 text-sm">FREE • 3 min</p>
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
            <h2 className="text-3xl font-bold text-white mb-2">Your Identity Gap Results</h2>
            <p className="text-slate-400">Discover where you are versus where you want to be</p>
          </div>

          {/* Overall Gap Score */}
          <Card className="bg-white mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-[#8A94A6] text-sm uppercase tracking-wide mb-4">Your Identity Gap Score</h3>
              <div className="text-6xl font-bold text-[#0F1C2E] mb-2">{overallGap}%</div>
              <p className="text-[#8A94A6] mb-6">
                {overallGap <= 20 ? 'Excellent alignment! Minor refinements needed.' :
                 overallGap <= 40 ? 'Good foundation with room for growth.' :
                 overallGap <= 60 ? 'Significant opportunity for transformation.' :
                 'Major gap - you\'re at a powerful turning point.'}
              </p>
              <Progress value={100 - overallGap} className="h-3" />
              <p className="text-xs text-[#8A94A6] mt-2">Current alignment: {100 - overallGap}%</p>
            </CardContent>
          </Card>

          {/* Dominant Growth Area */}
          <Card className="bg-[#3DD4B0] mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  {dimensionInfo[dominantArea].icon}
                </div>
                <div className="flex-1">
                  <Badge className="bg-white/20 text-white mb-2">Your #1 Growth Area</Badge>
                  <h3 className="text-xl font-bold text-white">{dimensionInfo[dominantArea].name}</h3>
                  <p className="text-white/80 text-sm">{dimensionInfo[dominantArea].description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{dominantScore.gap}%</div>
                  <div className="text-white/80 text-xs">Gap to close</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dimension Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {Object.entries(scores).map(([dim, score]) => (
              <Card key={dim} className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div style={{ color: dimensionInfo[dim].color }}>
                        {dimensionInfo[dim].icon}
                      </div>
                      <span className="font-semibold text-[#0F1C2E]">{dimensionInfo[dim].name}</span>
                    </div>
                    <Badge variant="outline" className="font-mono">{score.current}%</Badge>
                  </div>
                  <Progress value={score.current} className="h-2 mb-2" />
                  <p className="text-xs text-[#8A94A6]">{score.gap}% gap to target</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="bg-[#0F1C2E]">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-xl font-bold mb-2">Ready to Close the Gap?</h3>
              <p className="text-slate-400 mb-4">
                The Identity Recode System provides the exact framework to transform your dominant growth area.
              </p>
              <Link href="/products">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-8">
                  View Transformation Packages
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={handleReset} variant="secondary" className="shadow-md">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
            <Button 
              onClick={() => {
                const data = {
                  date: new Date().toISOString(),
                  overallGap,
                  dominantGrowthArea: dominantArea,
                  dimensionScores: scores
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `identity-gap-results-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
              }}
              className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const dimensionColor = dimensionInfo[question.dimension].color;

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
              <Brain className="w-5 h-5 text-[#3DD4B0]" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Identity Gap Assessment</h1>
              <p className="text-slate-400 text-sm">FREE • 3 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0">
            Question {currentQuestion + 1} of {questions.length}
          </Badge>
          <Progress 
            value={((currentQuestion + 1) / questions.length) * 100} 
            className="h-2 w-32 bg-white/10 [&>div]:bg-[#3DD4B0]" 
          />
        </div>

        {/* Question Card */}
        <Card className="bg-white mb-6">
          <CardContent className="p-8">
            <Badge 
              className="mb-4" 
              style={{ backgroundColor: `${dimensionColor}20`, color: dimensionColor }}
            >
              {question.dimensionLabel}
            </Badge>
            
            <h2 className="text-2xl font-bold text-[#0F1C2E] mb-6 leading-relaxed">
              {question.text}
            </h2>

            {/* Rating Scale */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-[#8A94A6] px-1">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
              <div className="flex gap-3">
                {scaleLabels.map((label) => (
                  <button
                    key={label.value}
                    onClick={() => handleAnswer(label.value)}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                      answers[question.id] === label.value
                        ? 'text-white'
                        : 'bg-[#F6F8FA] text-[#8A94A6] hover:bg-gray-200'
                    }`}
                    style={{
                      backgroundColor: answers[question.id] === label.value ? dimensionColor : undefined
                    }}
                  >
                    {label.value}
                  </button>
                ))}
              </div>
              {answers[question.id] && (
                <p className="text-center text-sm text-[#8A94A6]">
                  {scaleLabels.find(l => l.value === answers[question.id])?.label}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="white" className="disabled:opacity-50"
          >
            ← Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentQuestion === index ? 'bg-[#3DD4B0] w-4' : 
                  answers[questions[index].id] ? 'bg-white/60' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!answers[question.id]}
            className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next →'}
          </Button>
        </div>
      </div>
    </div>
  );
}
