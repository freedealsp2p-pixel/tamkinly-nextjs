'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Laptop, 
  Users, 
  Zap, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Download,
  RotateCcw,
  Lightbulb,
  Target
} from 'lucide-react';

interface DimensionScore {
  dimension: string;
  score: number;
  description: string;
  questions: string[];
  icon: React.ReactNode;
  color: string;
  reflectionPrompt: string;
}

const dimensions: DimensionScore[] = [
  {
    dimension: 'Physical Space',
    score: 0,
    description: 'How your physical environment supports or hinders your identity goals',
    icon: <Home className="w-5 h-5" />,
    color: '#3DD4B0',
    questions: [
      'My physical space makes good behavior easy.',
      'My workspace or home setup supports focus.',
      'Important tools are easy to reach.',
      'Unhelpful objects are out of sight or removed.',
      'My space reminds me of the person I am becoming.',
      'My space reduces distraction instead of increasing it.',
      'My physical layout supports my daily routines.',
      'My environment lowers friction for the behaviors I want.'
    ],
    reflectionPrompt: 'What is the biggest physical obstacle to your transformation?'
  },
  {
    dimension: 'Digital Environment',
    score: 0,
    description: 'How your digital tools and spaces affect your focus and identity',
    icon: <Laptop className="w-5 h-5" />,
    color: '#1F6F78',
    questions: [
      'My phone and digital devices support my goals.',
      'I am not overexposed to distracting content.',
      'My digital notifications are under control.',
      'My social media use does not undermine my identity goals.',
      'My digital environment contains useful reminders, not only noise.',
      'I can access useful materials without getting lost in distraction.',
      'My digital habits are intentional rather than automatic.',
      'I have reduced unnecessary digital friction and clutter.'
    ],
    reflectionPrompt: 'What digital trigger most often weakens your focus?'
  },
  {
    dimension: 'Social Circle',
    score: 0,
    description: 'How the people around you influence your identity and behavior',
    icon: <Users className="w-5 h-5" />,
    color: '#64B5F6',
    questions: [
      'The people around me support the identity I am building.',
      'I spend enough time with people who model the behavior I want.',
      'My social circle does not normalize the habits I am trying to leave behind.',
      'I feel understood by at least some of the people around me.',
      'I can maintain my direction even when others do not share it.',
      'My relationships increase my discipline rather than weaken it.',
      'I know which relationships strengthen or weaken my progress.',
      'My social environment supports long-term change.'
    ],
    reflectionPrompt: 'Which relationship most strongly affects your consistency?'
  },
  {
    dimension: 'Resource Access',
    score: 0,
    description: 'Whether you have easy access to what you need for success',
    icon: <Zap className="w-5 h-5" />,
    color: '#FFB74D',
    questions: [
      'I have access to the tools I need to follow through.',
      'My routines are realistic for my current life situation.',
      'Time is allocated for the behaviors I want to build.',
      'I have enough structure to avoid unnecessary confusion.',
      'I know where to begin when I want to act.',
      'My resources reduce hesitation instead of creating it.',
      'I have support systems when motivation is low.',
      'I do not rely on willpower alone.'
    ],
    reflectionPrompt: 'What resource is missing or underused?'
  },
  {
    dimension: 'Cue Quality',
    score: 0,
    description: 'Environmental cues that trigger desired behaviors',
    icon: <Lightbulb className="w-5 h-5" />,
    color: '#BA68C8',
    questions: [
      'My environment contains cues that prompt the right actions.',
      'I have placed reminders where they will be seen.',
      'My cues are tied to specific behaviors, not vague intentions.',
      'My environment makes the next step obvious.',
      'I can tell what to do when I enter a specific space.',
      'My cues reduce decision fatigue.',
      'I am using prompts intentionally, not randomly.',
      'My cues support repetition.'
    ],
    reflectionPrompt: 'Which cue should you add, remove, or strengthen?'
  }
];

const frictionItems = [
  { name: 'Morning routine', level: '' },
  { name: 'Starting focused work', level: '' },
  { name: 'Making healthy choices', level: '' },
  { name: 'Saying no to distraction', level: '' },
  { name: 'Returning after a lapse', level: '' },
  { name: 'Keeping commitments', level: '' },
  { name: 'Logging progress', level: '' },
  { name: 'Ending the day intentionally', level: '' }
];

export default function EnvironmentalAuditTemplate() {
  const [currentDimension, setCurrentDimension] = useState(0);
  const [scores, setScores] = useState<number[]>(dimensions.map(() => 50));
  const [frictionLevels, setFrictionLevels] = useState<Record<string, string>>({});
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

  const handleFrictionChange = (item: string, level: string) => {
    setFrictionLevels(prev => ({ ...prev, [item]: level }));
  };

  const handleNext = () => {
    if (currentDimension < dimensions.length) {
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
    setFrictionLevels({});
    setReflections(dimensions.map(() => ''));
    setShowResults(false);
  };

  const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { label: 'Supportive', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 60) return { label: 'Neutral', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 40) return { label: 'Mixed', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Blocking', color: 'text-[#FC6D26]', bg: 'bg-[#FFE4CC]' };
  };

  if (showResults) {
    const sortedScores = dimensions
      .map((d, i) => ({ name: d.dimension, score: scores[i], color: d.color }))
      .sort((a, b) => a.score - b.score);
    
    const strongestArea = sortedScores[sortedScores.length - 1];
    const weakestArea = sortedScores[0];

    const highFrictionItems = Object.entries(frictionLevels)
      .filter(([_, level]) => level === 'high')
      .map(([name]) => name);

    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-[#0F1C2E] mb-2">
            Environmental Audit Complete
          </h2>
          <p className="text-[#8A94A6]">Your environment optimization roadmap</p>
        </div>

        {/* Overall Score */}
        <Card className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] border-0">
          <CardContent className="p-8 text-center">
            <h3 className="text-[#8A94A6] text-sm uppercase tracking-wide mb-4">Environmental Support Score</h3>
            <div className="text-6xl font-bold text-[#3DD4B0] mb-2">{overallScore}%</div>
            <div className="text-white text-lg">{getScoreLabel(overallScore).label}</div>
            <Progress 
              value={overallScore} 
              className="h-3 mt-6 bg-[#1A2A42] [&>div]:bg-[#3DD4B0]" 
            />
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
                <Progress value={scores[index]} className="h-2 bg-gray-100" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Friction Map */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#E57373]" />
              Friction Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {frictionItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded-lg text-sm text-center ${
                    frictionLevels[item.name] === 'high' ? 'bg-[#FFE4CC] text-[#C44D0A]' :
                    frictionLevels[item.name] === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    frictionLevels[item.name] === 'low' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>
            {highFrictionItems.length > 0 && (
              <div className="mt-4 p-3 bg-[#FFF3E8] rounded-lg">
                <p className="text-sm text-[#C44D0A]">
                  <strong>High Friction Areas:</strong> {highFrictionItems.join(', ')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className="bg-[#F6F8FA]">
          <CardHeader>
            <CardTitle className="text-[#0F1C2E]">Environmental Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-[#0F1C2E]">Strongest Supportive Factor</span>
              <Badge className="bg-green-100 text-green-800">{strongestArea.name}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#FFF3E8] rounded-lg">
              <span className="text-[#0F1C2E]">Strongest Blocking Factor</span>
              <Badge className="bg-[#FFE4CC] text-[#C44D0A]">{weakestArea.name}</Badge>
            </div>
            <div className="p-3 bg-[#3DD4B0]/10 rounded-lg">
              <p className="text-sm text-[#0F1C2E] font-medium mb-2">
                Final Environmental Statement:
              </p>
              <p className="text-sm text-[#8A94A6]">
                My environment currently makes it easier to...
              </p>
              <Textarea placeholder="Complete your environmental statement..." className="mt-2" />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={handleReset} className="bg-[#1F6F78] text-white hover:bg-[#1a5a62] font-semibold px-6 py-2.5">
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Audit
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
                })),
                frictionMap: frictionLevels
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `environmental-audit-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
            }}
            className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-6 py-2.5"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Audit
          </Button>
        </div>
      </div>
    );
  }

  // Friction Map Step
  if (currentDimension === dimensions.length) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Badge className="bg-[#E57373]/10 text-[#E57373] border-0 mb-2">
            Final Step: Friction Map
          </Badge>
          <span className="text-sm text-[#8A94A6]">Mark each item by friction level</span>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#E57373]/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[#E57373]" />
              </div>
              <div>
                <CardTitle className="text-xl text-[#0F1C2E]">Resistance Map</CardTitle>
                <CardDescription className="text-[#8A94A6]">
                  Where does your environment create the most resistance?
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {frictionItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#F6F8FA] rounded-lg">
                <span className="text-[#2B2E34]">{item.name}</span>
                <div className="flex gap-2">
                  {['low', 'moderate', 'high'].map((level) => (
                    <button
                      key={level}
                      onClick={() => handleFrictionChange(item.name, level)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        frictionLevels[item.name] === level
                          ? level === 'high' ? 'bg-[#FC6D26] text-white' :
                            level === 'moderate' ? 'bg-yellow-500 text-white' :
                            'bg-green-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="p-3 bg-[#1F6F78]/5 rounded-lg border border-[#1F6F78]/20 mt-6">
              <p className="text-sm text-[#2B2E34]">
                <strong>Prompt:</strong> Where does your environment create the most resistance?
              </p>
              <Textarea 
                placeholder="Reflect on your friction points..."
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button onClick={handlePrevious} className="bg-[#0F1C2E] text-white hover:bg-[#1a2d47] font-semibold px-6 py-2.5">
            ← Previous
          </Button>
          <Button onClick={handleNext} className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-6 py-2.5">
            Complete Audit
          </Button>
        </div>
      </div>
    );
  }

  const dimension = dimensions[currentDimension];

  return (
    <div className="space-y-8">
      {/* Purpose Header */}
      <Card className="bg-[#3DD4B0]/5 border-[#3DD4B0]/20">
        <CardContent className="p-4">
          <p className="text-sm text-[#0F1C2E]">
            <strong>Purpose:</strong> To identify the environmental conditions that support or interfere with identity installation, daily consistency, and behavior change. 
            Evaluate the environment you live in, not the environment you wish you had.
          </p>
        </CardContent>
      </Card>

      {/* Progress Header */}
      <div className="flex items-center justify-between">
        <div>
          <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 mb-2">
            Section {currentDimension + 1} of {dimensions.length + 1}
          </Badge>
          <Progress 
            value={((currentDimension + 1) / (dimensions.length + 1)) * 100} 
            className="h-2 w-48 bg-gray-100 [&>div]:bg-[#3DD4B0]" 
          />
        </div>
        <div className="text-right">
          <span className="text-sm text-[#8A94A6]">Section Score</span>
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
          {/* Questions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#0F1C2E] text-sm uppercase tracking-wide">
              Rate each statement (1-10)
            </h4>
            <p className="text-xs text-[#8A94A6]">
              1 = strongly blocking | 5 = neutral | 10 = strongly supportive
            </p>
            {dimension.questions.map((question, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-[#F6F8FA] rounded-lg">
                <span className="w-6 h-6 rounded-full bg-[#0F1C2E] text-white flex items-center justify-center text-xs flex-shrink-0">
                  {index + 1}
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
              <span>1 - Strongly blocking</span>
              <span>10 - Strongly supportive</span>
            </div>
          </div>

          {/* Reflection */}
          <div className="space-y-2">
            <h4 className="font-semibold text-[#0F1C2E] text-sm uppercase tracking-wide">
              Reflection
            </h4>
            <p className="text-sm text-[#8A94A6] italic">{dimension.reflectionPrompt}</p>
            <Textarea
              placeholder="Your observations..."
              value={reflections[currentDimension]}
              onChange={(e) => handleReflectionChange(e.target.value)}
              className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button onClick={handlePrevious} disabled={currentDimension === 0} className="bg-[#0F1C2E] text-white hover:bg-[#1a2d47] font-semibold px-6 py-2.5 disabled:opacity-50">
          ← Previous
        </Button>
        <div className="flex items-center gap-1">
          {[...dimensions, { id: 'friction' }].map((_, index) => (
            <button
              key={index}
              onClick={() => index <= currentDimension && setCurrentDimension(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentDimension === index ? 'bg-[#3DD4B0] w-4' : 
                index < currentDimension ? 'bg-[#1F6F78]' : 'bg-[#8A94A6]/30'
              }`}
            />
          ))}
        </div>
        <Button onClick={handleNext} className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-6 py-2.5">
          {currentDimension === dimensions.length - 1 ? 'Next: Friction Map →' : 'Next →'}
        </Button>
      </div>
    </div>
  );
}
