'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Brain, 
  CheckCircle2,
  ArrowRight,
  Download,
  RotateCcw,
  Info
} from 'lucide-react';

// ERQ Questions based on Gross & John (2003)
const erqQuestions = [
  // Cognitive Reappraisal Questions
  {
    id: 1,
    text: 'When I want to feel more positive emotion, I change the way I\'m thinking about the situation.',
    subscale: 'reappraisal',
    reverse: false
  },
  {
    id: 2,
    text: 'When I want to feel less negative emotion, I change the way I\'m thinking about the situation.',
    subscale: 'reappraisal',
    reverse: false
  },
  {
    id: 3,
    text: 'When I\'m faced with a stressful situation, I make myself think about it in a way that helps me stay calm.',
    subscale: 'reappraisal',
    reverse: false
  },
  {
    id: 4,
    text: 'When I want to feel more positive emotion, I change the way I\'m thinking about the situation.',
    subscale: 'reappraisal',
    reverse: false
  },
  {
    id: 5,
    text: 'I control my emotions by changing the way I think about the situation I\'m in.',
    subscale: 'reappraisal',
    reverse: false
  },
  {
    id: 6,
    text: 'When I want to feel less negative emotion, I change the way I\'m thinking about the situation.',
    subscale: 'reappraisal',
    reverse: false
  },
  // Expressive Suppression Questions
  {
    id: 7,
    text: 'I keep my emotions to myself.',
    subscale: 'suppression',
    reverse: false
  },
  {
    id: 8,
    text: 'I control my emotions by not expressing them.',
    subscale: 'suppression',
    reverse: false
  },
  {
    id: 9,
    text: 'When I am feeling negative emotions, I make sure not to express them.',
    subscale: 'suppression',
    reverse: false
  },
  {
    id: 10,
    text: 'I control my emotions by not expressing them.',
    subscale: 'suppression',
    reverse: false
  }
];

const scaleLabels = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
  { value: 6, label: 'Very Strongly Agree' },
  { value: 7, label: 'Completely Agree' }
];

// Strategies for improvement
const strategies = {
  reappraisal: [
    {
      title: 'Cognitive Reframing',
      description: 'Practice viewing situations from multiple perspectives. Ask "What else could this mean?"',
      exercise: 'Next time you feel negative emotion, write down 3 alternative interpretations of the situation.'
    },
    {
      title: 'Self-Distancing',
      description: 'View your experiences from a third-person perspective to gain objectivity.',
      exercise: 'When experiencing strong emotions, ask "What would a wise friend say about this situation?"'
    },
    {
      title: 'Temporal Distancing',
      description: 'Consider how you\'ll feel about this situation in the future.',
      exercise: 'Ask yourself "Will this matter in 1 year? 5 years? How will I view it then?"'
    },
    {
      title: 'Benefit Finding',
      description: 'Look for hidden opportunities or lessons in difficult situations.',
      exercise: 'After a challenging experience, write down one thing you learned or one way you grew.'
    }
  ],
  suppression: [
    {
      title: 'Emotional Acceptance',
      description: 'Allow emotions to be present without trying to change them immediately.',
      exercise: 'Practice sitting with uncomfortable emotions for 2 minutes without trying to push them away.'
    },
    {
      title: 'Expressive Writing',
      description: 'Process emotions through writing rather than suppressing them.',
      exercise: 'Spend 10 minutes writing about your emotional experiences each day.'
    },
    {
      title: 'Body Awareness',
      description: 'Notice where emotions live in your body and describe the sensations.',
      exercise: 'When feeling emotion, scan your body and describe the physical sensations you notice.'
    },
    {
      title: 'Safe Expression',
      description: 'Find appropriate outlets and people with whom you can express emotions.',
      exercise: 'Identify 2-3 people you trust and practice sharing your emotional experiences with them.'
    }
  ]
};

export default function EmotionRegulationAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(erqQuestions.map(() => 0));
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < erqQuestions.length - 1) {
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
    setAnswers(erqQuestions.map(() => 0));
    setShowResults(false);
  };

  // Calculate subscale scores
  const calculateScores = () => {
    const reappraisalQuestions = erqQuestions.filter(q => q.subscale === 'reappraisal');
    const suppressionQuestions = erqQuestions.filter(q => q.subscale === 'suppression');
    
    const reappraisalScore = Math.round(
      reappraisalQuestions.reduce((sum, q) => {
        const idx = erqQuestions.findIndex(eq => eq.id === q.id);
        return sum + answers[idx];
      }, 0) / reappraisalQuestions.length
    );
    
    const suppressionScore = Math.round(
      suppressionQuestions.reduce((sum, q) => {
        const idx = erqQuestions.findIndex(eq => eq.id === q.id);
        return sum + answers[idx];
      }, 0) / suppressionQuestions.length
    );

    return { reappraisalScore, suppressionScore };
  };

  const getInterpretation = (score: number, type: 'reappraisal' | 'suppression') => {
    if (type === 'reappraisal') {
      if (score >= 5) return { level: 'High', color: 'text-green-600', description: 'You effectively use cognitive strategies to manage emotions.' };
      if (score >= 3) return { level: 'Moderate', color: 'text-yellow-600', description: 'You have some ability to reframe situations emotionally.' };
      return { level: 'Developing', color: 'text-red-600', description: 'There\'s room to develop healthier cognitive regulation strategies.' };
    } else {
      if (score >= 5) return { level: 'High', color: 'text-red-600', description: 'You tend to suppress emotions, which may have negative long-term effects.' };
      if (score >= 3) return { level: 'Moderate', color: 'text-yellow-600', description: 'You sometimes suppress emotions. Consider more expressive alternatives.' };
      return { level: 'Low', color: 'text-green-600', description: 'You express emotions freely, which is generally healthy.' };
    }
  };

  const { reappraisalScore, suppressionScore } = calculateScores();

  if (showResults) {
    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-[#0F1C2E] mb-2">
            Emotion Regulation Profile
          </h2>
          <p className="text-[#8A94A6]">Based on the Emotion Regulation Questionnaire (ERQ)</p>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cognitive Reappraisal */}
          <Card className="border-2 border-[#3DD4B0]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                  <Brain className="w-5 h-5 text-[#3DD4B0]" />
                  Cognitive Reappraisal
                </CardTitle>
                <Badge className={getInterpretation(reappraisalScore, 'reappraisal').color}>
                  {getInterpretation(reappraisalScore, 'reappraisal').level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-[#0F1C2E]">{reappraisalScore}</div>
                <div className="text-[#8A94A6] text-sm">out of 7</div>
              </div>
              <Progress value={(reappraisalScore / 7) * 100} className="h-3 mb-4" />
              <p className="text-sm text-[#8A94A6]">
                {getInterpretation(reappraisalScore, 'reappraisal').description}
              </p>
              <div className="mt-4 p-3 bg-[#3DD4B0]/10 rounded-lg">
                <p className="text-sm text-[#0F1C2E]">
                  <strong>What this means:</strong> Cognitive reappraisal involves changing your thoughts to change your emotional response. Higher scores indicate healthier emotion regulation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Expressive Suppression */}
          <Card className="border-2 border-[#E57373]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#E57373]" />
                  Expressive Suppression
                </CardTitle>
                <Badge className={getInterpretation(suppressionScore, 'suppression').color}>
                  {getInterpretation(suppressionScore, 'suppression').level}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-[#0F1C2E]">{suppressionScore}</div>
                <div className="text-[#8A94A6] text-sm">out of 7</div>
              </div>
              <Progress value={(suppressionScore / 7) * 100} className="h-3 mb-4" />
              <p className="text-sm text-[#8A94A6]">
                {getInterpretation(suppressionScore, 'suppression').description}
              </p>
              <div className="mt-4 p-3 bg-[#E57373]/10 rounded-lg">
                <p className="text-sm text-[#0F1C2E]">
                  <strong>What this means:</strong> Expressive suppression involves hiding emotions. Lower scores are generally healthier as suppression can lead to long-term negative effects.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personalized Strategies */}
        <Card className="bg-[#0F1C2E]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-[#3DD4B0]" />
              Personalized Improvement Strategies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reappraisalScore < 5 && (
                <div>
                  <h4 className="text-[#3DD4B0] font-semibold mb-3">Strengthen Cognitive Reappraisal</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {strategies.reappraisal.map((strategy, idx) => (
                      <div key={idx} className="p-4 bg-[#1A2A42] rounded-lg">
                        <h5 className="text-white font-medium mb-1">{strategy.title}</h5>
                        <p className="text-[#8A94A6] text-sm mb-2">{strategy.description}</p>
                        <p className="text-[#3DD4B0] text-xs italic">Exercise: {strategy.exercise}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {suppressionScore >= 4 && (
                <div>
                  <h4 className="text-[#E57373] font-semibold mb-3">Reduce Expressive Suppression</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {strategies.suppression.map((strategy, idx) => (
                      <div key={idx} className="p-4 bg-[#1A2A42] rounded-lg">
                        <h5 className="text-white font-medium mb-1">{strategy.title}</h5>
                        <p className="text-[#8A94A6] text-sm mb-2">{strategy.description}</p>
                        <p className="text-[#3DD4B0] text-xs italic">Exercise: {strategy.exercise}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {reappraisalScore >= 5 && suppressionScore < 4 && (
                <div className="p-4 bg-[#3DD4B0]/20 rounded-lg text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#3DD4B0] mx-auto mb-2" />
                  <p className="text-white font-medium">Excellent emotional regulation profile!</p>
                  <p className="text-[#8A94A6] text-sm mt-1">Continue practicing healthy reappraisal strategies.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Research Note */}
        <Card className="bg-[#F6F8FA]">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-[#1F6F78] mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#0F1C2E] mb-2">About the ERQ</h4>
                <p className="text-sm text-[#8A94A6] leading-relaxed">
                  The Emotion Regulation Questionnaire (ERQ) was developed by James J. Gross and Oliver P. John. 
                  Research shows that cognitive reappraisal is generally associated with healthier emotional outcomes, 
                  while expressive suppression may have negative long-term effects on well-being and relationships. 
                  This is a self-assessment tool and should not be used as a clinical diagnosis.
                </p>
              </div>
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
                assessment: 'Emotion Regulation Questionnaire (ERQ)',
                scores: {
                  cognitiveReappraisal: reappraisalScore,
                  expressiveSuppression: suppressionScore
                },
                interpretation: {
                  reappraisal: getInterpretation(reappraisalScore, 'reappraisal'),
                  suppression: getInterpretation(suppressionScore, 'suppression')
                }
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `erq-assessment-${new Date().toISOString().split('T')[0]}.json`;
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

  const question = erqQuestions[currentQuestion];

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 mb-2">
            Question {currentQuestion + 1} of {erqQuestions.length}
          </Badge>
          <Progress 
            value={((currentQuestion + 1) / erqQuestions.length) * 100} 
            className="h-2 w-48 bg-gray-100 [&>div]:bg-[#3DD4B0]" 
          />
        </div>
        <Badge variant="outline" className={
          question.subscale === 'reappraisal' ? 'border-[#3DD4B0] text-[#3DD4B0]' : 'border-[#E57373] text-[#E57373]'
        }>
          {question.subscale === 'reappraisal' ? 'Cognitive Reappraisal' : 'Expressive Suppression'}
        </Badge>
      </div>

      {/* Question Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: question.subscale === 'reappraisal' ? '#3DD4B0' : '#E57373' }}
            >
              {question.subscale === 'reappraisal' ? <Brain className="w-6 h-6" /> : <Heart className="w-6 h-6" />}
            </div>
            <CardDescription className="text-[#8A94A6]">
              Rate how much you agree with this statement
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 bg-[#F6F8FA] rounded-lg">
            <p className="text-xl text-[#0F1C2E] leading-relaxed">
              {question.text}
            </p>
          </div>

          {/* Rating Scale */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs text-[#8A94A6] px-1">
              <span>Strongly Disagree</span>
              <span>Completely Agree</span>
            </div>
            <div className="flex gap-2">
              {scaleLabels.map((label) => (
                <button
                  key={label.value}
                  onClick={() => handleAnswer(label.value)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    answers[currentQuestion] === label.value
                      ? question.subscale === 'reappraisal'
                        ? 'bg-[#3DD4B0] text-[#0F1C2E]'
                        : 'bg-[#E57373] text-white'
                      : 'bg-[#F6F8FA] text-[#8A94A6] hover:bg-gray-200'
                  }`}
                >
                  {label.value}
                </button>
              ))}
            </div>
            {answers[currentQuestion] > 0 && (
              <p className="text-center text-sm text-[#8A94A6]">
                {scaleLabels.find(l => l.value === answers[currentQuestion])?.label}
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
          className="bg-[#0F1C2E] text-white hover:bg-[#1a2d47] font-semibold px-6 py-2.5 disabled:opacity-50"
        >
          ← Previous
        </Button>
        
        <div className="flex items-center gap-1">
          {erqQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentQuestion === index 
                  ? erqQuestions[index].subscale === 'reappraisal' ? 'bg-[#3DD4B0] w-4' : 'bg-[#E57373] w-4'
                  : answers[index] > 0 ? 'bg-[#1F6F78]' : 'bg-[#8A94A6]/30'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={answers[currentQuestion] === 0}
          className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-6 py-2.5 disabled:opacity-50"
        >
          {currentQuestion === erqQuestions.length - 1 ? 'See Results' : 'Next →'}
        </Button>
      </div>
    </div>
  );
}
