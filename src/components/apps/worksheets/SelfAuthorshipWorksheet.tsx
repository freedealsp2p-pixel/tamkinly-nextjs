'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Compass, 
  Map, 
  Flag, 
  ArrowRight,
  Download,
  RotateCcw,
  CheckCircle2,
  Lightbulb,
  Users,
  BookOpen,
  Heart
} from 'lucide-react';

interface PhaseAnswer {
  question: string;
  answer: string;
}

interface SelfAuthorshipProfile {
  currentPhase: string;
  cognitiveScore: number;
  intrapersonalScore: number;
  interpersonalScore: number;
  answers: Record<string, PhaseAnswer[]>;
}

// Based on Baxter Magolda's Self-Authorship Theory
const phases = [
  {
    id: 'formulas',
    name: 'Following Formulas',
    description: 'Relying on external authorities for direction',
    color: '#8A94A6',
    icon: <BookOpen className="w-5 h-5" />,
    characteristics: [
      'Following others\' expectations without question',
      'Seeking approval before making decisions',
      'Viewing knowledge as certain and absolute',
      'Relying on external authorities for truth'
    ]
  },
  {
    id: 'crossroads',
    name: 'Crossroads',
    description: 'Questioning and exploring internal voice',
    color: '#2A8A94',
    icon: <Compass className="w-5 h-5" />,
    characteristics: [
      'Beginning to question external expectations',
      'Recognizing multiple perspectives',
      'Exploring own values and beliefs',
      'Feeling tension between self and others'
    ]
  },
  {
    id: 'authorship',
    name: 'Self-Authorship',
    description: 'Developing internal voice and identity',
    color: '#3DD4B0',
    icon: <Flag className="w-5 h-5" />,
    characteristics: [
      'Building an internal belief system',
      'Making decisions aligned with own values',
      'Balancing self with relationships',
      'Taking ownership of learning and growth'
    ]
  },
  {
    id: 'integrated',
    name: 'Integrated Identity',
    description: 'Living from self-defined values and beliefs',
    color: '#1F6F78',
    icon: <Heart className="w-5 h-5" />,
    characteristics: [
      'Strong internal foundation',
      'Authentic relationships',
      'Continuous self-reflection and growth',
      'Purposeful action aligned with values'
    ]
  }
];

const dimensions = [
  {
    id: 'cognitive',
    name: 'Cognitive Dimension',
    description: 'How you form beliefs and make knowledge claims',
    icon: <BookOpen className="w-5 h-5" />,
    color: '#2A8A94',
    questions: [
      'When faced with conflicting information, how do you determine what to believe?',
      'Do you rely more on expert opinions or your own analysis?',
      'How comfortable are you with uncertainty and ambiguity?',
      'What sources do you trust most for knowledge?'
    ]
  },
  {
    id: 'intrapersonal',
    name: 'Intrapersonal Dimension',
    description: 'How you understand and define yourself',
    icon: <Heart className="w-5 h-5" />,
    color: '#C97B7B',
    questions: [
      'How would you describe your core identity?',
      'What values guide your decisions?',
      'How do you handle internal conflicts or contradictions?',
      'What makes you feel authentic or inauthentic?'
    ]
  },
  {
    id: 'interpersonal',
    name: 'Interpersonal Dimension',
    description: 'How you relate to and interact with others',
    icon: <Users className="w-5 h-5" />,
    color: '#2A8A94',
    questions: [
      'How do you balance your needs with others\' expectations?',
      'What role does others\' approval play in your decisions?',
      'How do you maintain relationships while staying true to yourself?',
      'How do you handle relationships with people who have different values?'
    ]
  }
];

export default function SelfAuthorshipWorksheet() {
  const [currentStep, setCurrentStep] = useState<'assessment' | 'journey' | 'results'>('assessment');
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, PhaseAnswer[]>>({});
  const [phaseRatings, setPhaseRatings] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (dimensionId: string, questionIndex: number, answer: string) => {
    setAnswers(prev => {
      const dimAnswers = prev[dimensionId] || [];
      const question = dimensions.find(d => d.id === dimensionId)?.questions[questionIndex] || '';
      
      const updatedAnswers = [...dimAnswers];
      updatedAnswers[questionIndex] = { question, answer };
      
      return { ...prev, [dimensionId]: updatedAnswers };
    });
  };

  const handlePhaseRating = (phaseId: string, rating: number) => {
    setPhaseRatings(prev => ({ ...prev, [phaseId]: rating }));
  };

  const handleNext = () => {
    if (currentDimension < dimensions.length - 1) {
      setCurrentDimension(currentDimension + 1);
    } else {
      setCurrentStep('journey');
    }
  };

  const handlePrevious = () => {
    if (currentDimension > 0) {
      setCurrentDimension(currentDimension - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep('assessment');
    setCurrentDimension(0);
    setAnswers({});
    setPhaseRatings({});
    setShowResults(false);
  };

  const calculatePhaseScore = () => {
    const phaseOrder = ['formulas', 'crossroads', 'authorship', 'integrated'];
    const scores = phaseOrder.map(id => phaseRatings[id] || 0);
    const maxIndex = scores.indexOf(Math.max(...scores));
    return phaseOrder[maxIndex];
  };

  const getDimensionCompletion = (dimId: string) => {
    const dimAnswers = answers[dimId] || [];
    return dimAnswers.filter(a => a.answer.trim()).length;
  };

  const getTotalCompletion = () => {
    const total = dimensions.reduce((sum, dim) => sum + dim.questions.length, 0);
    const answered = Object.values(answers).flat().filter(a => a.answer.trim()).length;
    return Math.round((answered / total) * 100);
  };

  if (showResults) {
    const currentPhaseId = calculatePhaseScore();
    const currentPhase = phases.find(p => p.id === currentPhaseId);
    
    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-[#0F1C2E] mb-2">
            Self-Authorship Profile
          </h2>
          <p className="text-[#8A94A6]">Your journey toward an internally-defined identity</p>
        </div>

        {/* Current Phase */}
        <Card className="bg-[#0F1C2E]">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: currentPhase?.color }}
              >
                {currentPhase?.icon}
              </div>
              <div className="flex-1">
                <Badge className="mb-2" style={{ backgroundColor: `${currentPhase?.color}20`, color: currentPhase?.color }}>
                  Your Current Phase
                </Badge>
                <h3 className="text-xl font-bold text-white">{currentPhase?.name}</h3>
                <p className="text-slate-400">{currentPhase?.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Phase Journey */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-[#0F1C2E]">Your Self-Authorship Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200" />
              <div className="relative flex justify-between">
                {phases.map((phase, index) => {
                  const rating = phaseRatings[phase.id] || 0;
                  const isCurrent = phase.id === currentPhaseId;
                  return (
                    <div key={phase.id} className="flex flex-col items-center">
                      <div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isCurrent ? 'ring-4 ring-offset-2' : ''
                        }`}
                        style={{ 
                          backgroundColor: `${phase.color}20`, 
                          color: phase.color,
                          // @ts-expect-error ringColor is a Tailwind utility, not a CSS property
                          ringColor: isCurrent ? phase.color : undefined
                        }}
                      >
                        {phase.icon}
                      </div>
                      <span className="text-xs font-medium text-[#0F1C2E] mt-2 text-center">
                        {phase.name}
                      </span>
                      <span className="text-xs text-[#8A94A6]">{rating}/10</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dimension Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dimensions.map((dim) => {
            const completion = getDimensionCompletion(dim.id);
            return (
              <Card key={dim.id} className="border-l-4" style={{ borderLeftColor: dim.color }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div style={{ color: dim.color }}>{dim.icon}</div>
                    <span className="font-semibold text-[#0F1C2E]">{dim.name}</span>
                  </div>
                  <Progress value={(completion / dim.questions.length) * 100} className="h-2 mb-2" />
                  <p className="text-xs text-[#8A94A6]">{completion}/{dim.questions.length} questions answered</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Growth Recommendations */}
        <Card className="bg-[#F6F8FA]">
          <CardHeader>
            <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-[#2A8A94]" />
              Growth Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {currentPhaseId === 'formulas' && (
                <>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Start questioning: Why do I believe what I believe?</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Practice making small decisions without seeking approval</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Explore different perspectives on issues you feel certain about</span>
                  </li>
                </>
              )}
              {currentPhaseId === 'crossroads' && (
                <>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Identify your top 5 core values and why they matter to you</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Practice making decisions that align with your values</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Accept that tension between self and others is normal</span>
                  </li>
                </>
              )}
              {currentPhaseId === 'authorship' && (
                <>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Build relationships that support your authentic self</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Create systems for consistent self-reflection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Practice holding your beliefs while respecting others</span>
                  </li>
                </>
              )}
              {currentPhaseId === 'integrated' && (
                <>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Mentor others on their self-authorship journey</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Continue refining your internal belief system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                    <span className="text-[#2B2E34]">Live purposefully aligned with your values</span>
                  </li>
                </>
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={handleReset} className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]">
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Assessment
          </Button>
          <Button 
            onClick={() => {
              const data = {
                date: new Date().toISOString(),
                currentPhase: currentPhaseId,
                phaseRatings,
                dimensionAnswers: answers,
                completion: getTotalCompletion()
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `self-authorship-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
            }}
            className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Results
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 'journey') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#0F1C2E] mb-2">Where Are You on the Journey?</h2>
          <p className="text-[#8A94A6]">Rate how well each phase describes your current experience (1-10)</p>
        </div>

        {/* Phase Rating Cards */}
        <div className="space-y-4">
          {phases.map((phase) => (
            <Card key={phase.id} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: phase.color }}
                  >
                    {phase.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#0F1C2E] mb-1">{phase.name}</h3>
                    <p className="text-sm text-[#8A94A6] mb-3">{phase.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {phase.characteristics.map((char, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {char}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={phaseRatings[phase.id] || 5}
                        onChange={(e) => handlePhaseRating(phase.id, parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <Badge className="font-mono text-lg px-3 py-1" style={{ backgroundColor: `${phase.color}20`, color: phase.color }}>
                        {phaseRatings[phase.id] || 5}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setCurrentStep('assessment')}
            variant="outline"
            className="border-gray-200"
          >
            ← Back
          </Button>
          <Button
            onClick={() => setShowResults(true)}
            className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8"
          >
            See Results
            <CheckCircle2 className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  const dimension = dimensions[currentDimension];

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 mb-2">
            Dimension {currentDimension + 1} of {dimensions.length}
          </Badge>
          <Progress 
            value={getTotalCompletion()} 
            className="h-2 w-48 bg-gray-100 [&>div]:bg-[#3DD4B0]" 
          />
        </div>
        <div className="text-right">
          <span className="text-sm text-[#8A94A6]">Overall Progress</span>
          <div className="text-2xl font-bold text-[#0F1C2E]">{getTotalCompletion()}%</div>
        </div>
      </div>

      {/* Current Dimension Card */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: dimension?.color }}
            >
              {dimension?.icon}
            </div>
            <div>
              <CardTitle className="text-xl text-[#0F1C2E]">{dimension?.name}</CardTitle>
              <CardDescription className="text-[#8A94A6]">{dimension?.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {dimension?.questions.map((question, qIndex) => (
            <div key={qIndex} className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#0F1C2E] text-white flex items-center justify-center text-xs">
                  {qIndex + 1}
                </span>
                {question}
              </label>
              <Textarea
                placeholder="Reflect deeply on this question..."
                value={answers[dimension.id]?.[qIndex]?.answer || ''}
                onChange={(e) => handleAnswerChange(dimension.id, qIndex, e.target.value)}
                className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrevious}
          disabled={currentDimension === 0}
          className="bg-[#0F1C2E] text-white hover:bg-[#1a2d47] disabled:opacity-50"
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
                getDimensionCompletion(dimensions[index].id) > 0 ? 'bg-[#1F6F78]' : 'bg-[#8A94A6]/30'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
        >
          {currentDimension === dimensions.length - 1 ? 'Continue to Journey' : 'Next →'}
        </Button>
      </div>
    </div>
  );
}
