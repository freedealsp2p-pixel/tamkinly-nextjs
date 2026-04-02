'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Briefcase, 
  Heart, 
  Target, 
  Star, 
  Zap,
  ArrowRight,
  Download,
  RotateCcw,
  CheckCircle2,
  Plus,
  Trash2,
  Compass
} from 'lucide-react';

interface IdentityPart {
  id: string;
  role: string;
  strength: number;
  description: string;
}

interface SelfConceptAnswer {
  question: string;
  answer: string;
}

const identityDimensions = [
  {
    id: 'roles',
    title: 'My Roles',
    description: 'What roles do you play in life? (e.g., parent, professional, friend, creator)',
    icon: <Briefcase className="w-5 h-5" />,
    color: '#3DD4B0',
    questions: [
      'What roles do you currently play in your life?',
      'Which roles feel most authentic to you?',
      'Which roles would you like to develop further?'
    ]
  },
  {
    id: 'traits',
    title: 'My Traits',
    description: 'What character traits define you? (e.g., creative, determined, compassionate)',
    icon: <Star className="w-5 h-5" />,
    color: '#FFB74D',
    questions: [
      'What are your top 5 character strengths?',
      'What traits do others consistently recognize in you?',
      'What traits would you like to strengthen?'
    ]
  },
  {
    id: 'values',
    title: 'My Values',
    description: 'What principles guide your decisions? (e.g., honesty, growth, freedom)',
    icon: <Heart className="w-5 h-5" />,
    color: '#E57373',
    questions: [
      'What values are non-negotiable for you?',
      'When have you acted against your values? Why?',
      'What values do you want to prioritize more?'
    ]
  },
  {
    id: 'goals',
    title: 'My Goals',
    description: 'What are you working toward? What legacy do you want to build?',
    icon: <Target className="w-5 h-5" />,
    color: '#64B5F6',
    questions: [
      'What are you working toward in the next year?',
      'What would make you feel proud at the end of your life?',
      'What impact do you want to have on others?'
    ]
  },
  {
    id: 'energy',
    title: 'My Energy Sources',
    description: 'What energizes you? What drains you?',
    icon: <Zap className="w-5 h-5" />,
    color: '#BA68C8',
    questions: [
      'What activities make you lose track of time?',
      'What situations consistently drain your energy?',
      'What would your ideal day look like?'
    ]
  },
  {
    id: 'identity',
    title: 'My Identity Statement',
    description: 'Who are you becoming? What is your chosen identity?',
    icon: <Compass className="w-5 h-5" />,
    color: '#1F6F78',
    questions: [
      'If you could describe yourself in one sentence, what would it be?',
      'Who do you want to become in the next 5 years?',
      'What would your ideal future self say about who you are today?'
    ]
  }
];

const selfDiscoveryQuestions = [
  'What makes you feel most alive?',
  'When do you feel most like yourself?',
  'What would you do if you knew you could not fail?',
  'What do you want to be remembered for?',
  'What are you most proud of about yourself?',
  'What would you change about your life if you could?',
  'What are you afraid to admit about yourself?',
  'What dream have you given up on? Should you revisit it?',
  'What do you value most in your relationships?',
  'What would you do if money were no object?'
];

export default function WhoAmIWorksheet() {
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState<Record<string, SelfConceptAnswer[]>>({});
  const [identityParts, setIdentityParts] = useState<IdentityPart[]>([]);
  const [newRole, setNewRole] = useState('');
  const [newStrength, setNewStrength] = useState(5);
  const [showResults, setShowResults] = useState(false);
  const [discoveryAnswers, setDiscoveryAnswers] = useState<Record<number, string>>({});

  const handleAnswerChange = (dimensionId: string, questionIndex: number, answer: string) => {
    setAnswers(prev => {
      const dimAnswers = prev[dimensionId] || [];
      const existing = dimAnswers.findIndex(a => a.question === identityDimensions.find(d => d.id === dimensionId)?.questions[questionIndex]);
      
      if (existing >= 0) {
        dimAnswers[existing].answer = answer;
      } else {
        dimAnswers[questionIndex] = {
          question: identityDimensions.find(d => d.id === dimensionId)?.questions[questionIndex] || '',
          answer
        };
      }
      
      return { ...prev, [dimensionId]: [...dimAnswers] };
    });
  };

  const handleAddIdentityPart = () => {
    if (!newRole.trim()) return;
    setIdentityParts([...identityParts, {
      id: Date.now().toString(),
      role: newRole,
      strength: newStrength,
      description: ''
    }]);
    setNewRole('');
    setNewStrength(5);
  };

  const handleRemoveIdentityPart = (id: string) => {
    setIdentityParts(identityParts.filter(p => p.id !== id));
  };

  const handleNext = () => {
    if (currentDimension < identityDimensions.length - 1) {
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
    setAnswers({});
    setIdentityParts([]);
    setDiscoveryAnswers({});
    setShowResults(false);
  };

  const getCompletionPercentage = () => {
    const totalQuestions = identityDimensions.reduce((sum, dim) => sum + dim.questions.length, 0);
    const answeredQuestions = Object.values(answers).flat().filter(a => a.answer.trim()).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const dimension = identityDimensions[currentDimension];
  const dimensionAnswers = answers[dimension?.id] || [];

  if (showResults) {
    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-[#0F1C2E] mb-2">
            Who Am I? - Your Identity Profile
          </h2>
          <p className="text-[#8A94A6]">A comprehensive picture of your identity dimensions</p>
        </div>

        {/* Identity Parts Summary */}
        {identityParts.length > 0 && (
          <Card className="bg-[#0F1C2E]">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#3DD4B0]" />
                My Identity Components
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {identityParts.map((part, index) => (
                  <div 
                    key={part.id} 
                    className="p-4 bg-[#1A2A42] rounded-lg text-center"
                  >
                    <div className="text-2xl font-bold text-[#3DD4B0] mb-1">{part.role}</div>
                    <div className="text-[#8A94A6] text-sm">Strength: {part.strength}/10</div>
                    <Progress value={part.strength * 10} className="h-1 mt-2 bg-[#0F1C2E] [&>div]:bg-[#3DD4B0]" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dimension Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {identityDimensions.map((dim, index) => {
            const dimAnswers = answers[dim.id] || [];
            const answeredCount = dimAnswers.filter(a => a.answer.trim()).length;
            
            return (
              <Card key={index} className="border-l-4" style={{ borderLeftColor: dim.color }}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div style={{ color: dim.color }}>{dim.icon}</div>
                    <span className="font-semibold text-[#0F1C2E]">{dim.title}</span>
                    <Badge variant="outline" className="ml-auto">
                      {answeredCount}/{dim.questions.length}
                    </Badge>
                  </div>
                  {dimAnswers.filter(a => a.answer.trim()).slice(0, 2).map((answer, i) => (
                    <p key={i} className="text-sm text-[#8A94A6] mb-1 line-clamp-2">
                      • {answer.answer.substring(0, 80)}...
                    </p>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Discovery Questions Review */}
        <Card className="bg-[#F6F8FA]">
          <CardHeader>
            <CardTitle className="text-[#0F1C2E]">Self-Discovery Insights</CardTitle>
            <CardDescription>Key insights from your reflection questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(discoveryAnswers)
                .filter(([_, answer]) => answer.trim())
                .slice(0, 5)
                .map(([index, answer]) => (
                  <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                    <p className="text-xs text-[#8A94A6] mb-1 italic">
                      Q: {selfDiscoveryQuestions[parseInt(index)]}
                    </p>
                    <p className="text-[#2B2E34]">{answer}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={handleReset} className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]">
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          <Button 
            onClick={() => {
              const data = {
                date: new Date().toISOString(),
                identityParts,
                dimensionAnswers: answers,
                discoveryAnswers: Object.entries(discoveryAnswers).map(([index, answer]) => ({
                  question: selfDiscoveryQuestions[parseInt(index)],
                  answer
                }))
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `who-am-i-profile-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
            }}
            className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 mb-2">
            Dimension {currentDimension + 1} of {identityDimensions.length}
          </Badge>
          <Progress 
            value={getCompletionPercentage()} 
            className="h-2 w-48 bg-gray-100 [&>div]:bg-[#3DD4B0]" 
          />
        </div>
        <div className="text-right">
          <span className="text-sm text-[#8A94A6]">Overall Progress</span>
          <div className="text-2xl font-bold text-[#0F1C2E]">{getCompletionPercentage()}%</div>
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
              <CardTitle className="text-xl text-[#0F1C2E]">{dimension?.title}</CardTitle>
              <CardDescription className="text-[#8A94A6]">{dimension?.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Questions */}
          <div className="space-y-4">
            {dimension?.questions.map((question, qIndex) => (
              <div key={qIndex} className="space-y-2">
                <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0F1C2E] text-white flex items-center justify-center text-xs">
                    {qIndex + 1}
                  </span>
                  {question}
                </label>
                <Textarea
                  placeholder="Take your time to reflect..."
                  value={dimensionAnswers[qIndex]?.answer || ''}
                  onChange={(e) => handleAnswerChange(dimension.id, qIndex, e.target.value)}
                  className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Identity Parts Builder */}
      {currentDimension === 0 && (
        <Card className="border-2 border-dashed border-[#1F6F78]/30">
          <CardHeader>
            <CardTitle className="text-lg text-[#0F1C2E]">Build Your Identity Map</CardTitle>
            <CardDescription>Add the key components that define who you are</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="e.g., Creative, Leader, Learner..."
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="flex-1 border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#8A94A6]">Strength:</span>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={newStrength}
                  onChange={(e) => setNewStrength(parseInt(e.target.value) || 5)}
                  className="w-16 border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                />
              </div>
              <Button onClick={handleAddIdentityPart} className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {identityParts.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {identityParts.map((part) => (
                  <Badge 
                    key={part.id}
                    className="py-2 px-3 bg-[#0F1C2E] text-white"
                  >
                    {part.role} ({part.strength}/10)
                    <button onClick={() => handleRemoveIdentityPart(part.id)} className="ml-2 hover:text-red-300">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
          {identityDimensions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentDimension(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentDimension === index ? 'bg-[#3DD4B0] w-4' : 
                answers[identityDimensions[index].id]?.some(a => a.answer.trim()) ? 'bg-[#1F6F78]' : 'bg-[#8A94A6]/30'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
        >
          {currentDimension === identityDimensions.length - 1 ? 'Complete Profile' : 'Next →'}
        </Button>
      </div>
    </div>
  );
}
