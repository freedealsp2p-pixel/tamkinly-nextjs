'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Download,
  Plus,
  Trash2,
  Calendar,
  Clock,
  Target,
  Lightbulb,
  BarChart3,
  Search,
  RotateCcw
} from 'lucide-react';

interface DecisionEntry {
  id: string;
  date: string;
  decision: string;
  context: string;
  alternatives: string;
  choice: string;
  outcome: string;
  emotionState: string;
  clarity: number;
  emotionalStability: number;
  timeToThink: number;
  pressure: number;
  valuesAlignment: number;
  impulseControl: number;
  awareness: number;
  futureSelf: number;
  intentionality: number;
  valueAlignment: number;
  futureUsefulness: number;
  consequenceAwareness: number;
  consistencyScore: number;
  selfControl: number;
  overallQuality: number;
  patternNoticed: string;
  upgradeRule: string;
  reflection: string;
}

const qualityDimensions = [
  { key: 'valueAlignment', label: 'Value Alignment', description: 'Does this align with your values?' },
  { key: 'futureUsefulness', label: 'Future Usefulness', description: 'Will this serve your future self?' },
  { key: 'clarity', label: 'Clarity of Reasoning', description: 'How clear was your thinking?' },
  { key: 'emotionalStability', label: 'Emotional Regulation', description: 'Were you emotionally stable?' },
  { key: 'selfControl', label: 'Resistance to Impulse', description: 'Did you resist impulsive action?' },
  { key: 'consistencyScore', label: 'Identity Consistency', description: 'Aligned with target identity?' },
  { key: 'consequenceAwareness', label: 'Consequence Awareness', description: 'Did you consider outcomes?' },
];

const stateQuestions = [
  'I was clear-headed when I made this decision.',
  'I was emotionally stable when I made this decision.',
  'I had enough time to think.',
  'I felt pressure or urgency.',
  'I was acting from values rather than impulse.',
  'I felt internally conflicted.',
  'I knew what I was doing and why.',
  'I could have chosen differently if I had paused.'
];

export default function DecisionPatternAnalysis() {
  const [entries, setEntries] = useState<DecisionEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<Partial<DecisionEntry>>({
    date: new Date().toISOString().split('T')[0],
    decision: '',
    context: '',
    alternatives: '',
    choice: '',
    outcome: '',
    emotionState: '',
    clarity: 50,
    emotionalStability: 50,
    timeToThink: 50,
    pressure: 50,
    valuesAlignment: 50,
    impulseControl: 50,
    awareness: 50,
    futureSelf: 50,
    intentionality: 50,
    valueAlignment: 50,
    futureUsefulness: 50,
    consequenceAwareness: 50,
    consistencyScore: 50,
    selfControl: 50,
    overallQuality: 50,
    patternNoticed: '',
    upgradeRule: '',
    reflection: ''
  });

  const handleAddEntry = () => {
    const newEntry: DecisionEntry = {
      ...formData as DecisionEntry,
      id: Date.now().toString()
    };
    setEntries([newEntry, ...entries]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      decision: '',
      context: '',
      alternatives: '',
      choice: '',
      outcome: '',
      emotionState: '',
      clarity: 50,
      emotionalStability: 50,
      timeToThink: 50,
      pressure: 50,
      valuesAlignment: 50,
      impulseControl: 50,
      awareness: 50,
      futureSelf: 50,
      intentionality: 50,
      valueAlignment: 50,
      futureUsefulness: 50,
      consequenceAwareness: 50,
      consistencyScore: 50,
      selfControl: 50,
      overallQuality: 50,
      patternNoticed: '',
      upgradeRule: '',
      reflection: ''
    });
    setShowForm(false);
    setCurrentStep(0);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const filteredEntries = entries.filter(entry =>
    entry.decision.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.context.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getOverallStats = () => {
    if (entries.length === 0) return { avg: 0, high: 0, low: 0 };
    const scores = entries.map(e => e.overallQuality);
    return {
      avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      high: scores.filter(s => s >= 70).length,
      low: scores.filter(s => s < 40).length
    };
  };

  if (showAnalysis) {
    const stats = getOverallStats();
    
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0F1C2E]">Decision Pattern Analysis</h2>
            <p className="text-[#8A94A6]">Insights from {entries.length} decisions logged</p>
          </div>
          <Button onClick={() => setShowAnalysis(false)} className="bg-[#0F1C2E] text-white hover:bg-[#1a2d47] font-semibold px-5 py-2.5">
            Back to Journal
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] border-0">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-[#3DD4B0]">{entries.length}</div>
              <div className="text-white/80 text-sm">Total Decisions</div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-[#0F1C2E]">{stats.avg}%</div>
              <div className="text-[#8A94A6] text-sm">Avg Quality</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{stats.high}</div>
              <div className="text-green-700 text-sm">High Quality (≥70%)</div>
            </CardContent>
          </Card>
          <Card className="bg-red-50 border border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-red-600">{stats.low}</div>
              <div className="text-red-700 text-sm">Needs Work (&lt;40%)</div>
            </CardContent>
          </Card>
        </div>

        {/* Quality Dimensions Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#3DD4B0]" />
              Decision Quality Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityDimensions.map((dim) => {
                const avg = entries.length > 0 
                  ? Math.round(entries.reduce((a, e) => a + (e[dim.key as keyof DecisionEntry] as number), 0) / entries.length)
                  : 0;
                return (
                  <div key={dim.key} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-[#0F1C2E]">{dim.label}</span>
                      <span className="text-[#8A94A6]">{avg}%</span>
                    </div>
                    <Progress value={avg} className="h-2" />
                    <p className="text-xs text-[#8A94A6]">{dim.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Patterns Detected */}
        <Card className="bg-[#F6F8FA]">
          <CardHeader>
            <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
              <Search className="w-5 h-5 text-[#3DD4B0]" />
              Pattern Recognition
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm text-[#0F1C2E] font-medium mb-2">What pattern appears across your decisions?</p>
              <p className="text-sm text-[#8A94A6]">
                {entries.filter(e => e.patternNoticed).length > 0 
                  ? entries.filter(e => e.patternNoticed).slice(0, 3).map(e => e.patternNoticed).join('; ')
                  : 'Log more decisions with pattern notes to see trends.'
                }
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <p className="text-sm text-[#0F1C2E] font-medium mb-2">Upgrade Rules Created</p>
              <p className="text-sm text-[#8A94A6]">
                {entries.filter(e => e.upgradeRule).length} decision protocols established
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Final Statement */}
        <Card className="bg-[#0F1C2E]">
          <CardContent className="p-6">
            <h3 className="text-[#3DD4B0] font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Final Decision Statement
            </h3>
            <p className="text-white/80 text-sm mb-3">
              My decisions are currently teaching me that...
            </p>
            <Textarea placeholder="Complete your decision statement..." className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Entry Form with Steps
  if (showForm) {
    const steps = [
      { title: 'Decision Log', description: 'What happened?' },
      { title: 'State Analysis', description: 'Your internal conditions' },
      { title: 'Quality Matrix', description: 'Evaluate the decision' },
      { title: 'Pattern Recognition', description: 'What do you notice?' }
    ];

    return (
      <div className="space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between mb-4">
          <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0]">
            Step {currentStep + 1} of {steps.length}
          </Badge>
          <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2 w-48" />
        </div>

        {/* Step Title */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#0F1C2E]">{steps[currentStep].title}</h3>
          <p className="text-[#8A94A6]">{steps[currentStep].description}</p>
        </div>

        {/* Step 1: Decision Log */}
        {currentStep === 0 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date and Time
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2B2E34]">Emotional State</label>
                  <Input
                    placeholder="e.g., Calm, Anxious, Excited..."
                    value={formData.emotionState}
                    onChange={(e) => setFormData({ ...formData, emotionState: e.target.value })}
                    className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2B2E34]">Decision made:</label>
                <Textarea
                  placeholder="What decision did you make?"
                  value={formData.decision}
                  onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
                  className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2B2E34]">Situation/Context:</label>
                <Textarea
                  placeholder="What was the situation?"
                  value={formData.context}
                  onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                  className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2B2E34]">What options were available?</label>
                <Textarea
                  placeholder="List the alternatives you considered..."
                  value={formData.alternatives}
                  onChange={(e) => setFormData({ ...formData, alternatives: e.target.value })}
                  className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2B2E34]">What did you choose?</label>
                <Textarea
                  placeholder="What did you actually choose?"
                  value={formData.choice}
                  onChange={(e) => setFormData({ ...formData, choice: e.target.value })}
                  className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2B2E34]">What happened next?</label>
                <Textarea
                  placeholder="What was the outcome?"
                  value={formData.outcome}
                  onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                  className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: State Analysis */}
        {currentStep === 1 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-6">
              <p className="text-sm text-[#8A94A6]">Rate each statement from 1 to 10</p>
              {stateQuestions.map((question, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-[#2B2E34]">{question}</span>
                    <span className="text-sm font-medium text-[#0F1C2E]">
                      {index === 0 ? formData.clarity :
                       index === 1 ? formData.emotionalStability :
                       index === 2 ? formData.timeToThink :
                       index === 3 ? formData.pressure :
                       index === 4 ? formData.valuesAlignment :
                       index === 5 ? formData.impulseControl :
                       index === 6 ? formData.awareness :
                       formData.futureSelf}%
                    </span>
                  </div>
                  <Slider
                    value={[index === 0 ? formData.clarity || 50 :
                            index === 1 ? formData.emotionalStability || 50 :
                            index === 2 ? formData.timeToThink || 50 :
                            index === 3 ? formData.pressure || 50 :
                            index === 4 ? formData.valuesAlignment || 50 :
                            index === 5 ? formData.impulseControl || 50 :
                            index === 6 ? formData.awareness || 50 :
                            formData.futureSelf || 50]}
                    onValueChange={(value) => {
                      const key = index === 0 ? 'clarity' :
                                  index === 1 ? 'emotionalStability' :
                                  index === 2 ? 'timeToThink' :
                                  index === 3 ? 'pressure' :
                                  index === 4 ? 'valuesAlignment' :
                                  index === 5 ? 'impulseControl' :
                                  index === 6 ? 'awareness' :
                                  'futureSelf';
                      setFormData({ ...formData, [key]: value[0] });
                    }}
                    max={100}
                    step={5}
                  />
                </div>
              ))}
              <div className="p-3 bg-[#F6F8FA] rounded-lg">
                <p className="text-sm text-[#8A94A6]">
                  <strong>Prompt:</strong> What emotional or mental state most influenced this decision?
                </p>
                <Textarea 
                  placeholder="Your reflection..."
                  value={formData.reflection}
                  onChange={(e) => setFormData({ ...formData, reflection: e.target.value })}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Quality Matrix */}
        {currentStep === 2 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-6">
              <p className="text-sm text-[#8A94A6]">Evaluate the decision quality (1-10)</p>
              {qualityDimensions.map((dim) => (
                <div key={dim.key} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-sm font-medium text-[#2B2E34]">{dim.label}</span>
                      <p className="text-xs text-[#8A94A6]">{dim.description}</p>
                    </div>
                    <span className="text-sm font-medium text-[#0F1C2E]">
                      {formData[dim.key as keyof DecisionEntry] as number}%
                    </span>
                  </div>
                  <Slider
                    value={[formData[dim.key as keyof DecisionEntry] as number || 50]}
                    onValueChange={(value) => setFormData({ ...formData, [dim.key]: value[0] })}
                    max={100}
                    step={5}
                  />
                </div>
              ))}
              <div className="p-3 bg-[#3DD4B0]/10 rounded-lg border border-[#3DD4B0]/30">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#0F1C2E]">Overall Decision Quality</span>
                  <span className="text-2xl font-bold text-[#3DD4B0]">{formData.overallQuality}%</span>
                </div>
                <Slider
                  value={[formData.overallQuality || 50]}
                  onValueChange={(value) => setFormData({ ...formData, overallQuality: value[0] })}
                  max={100}
                  step={5}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Pattern Recognition */}
        {currentStep === 3 && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2B2E34]">
                  What pattern appears across this decision and previous decisions?
                </label>
                <Textarea
                  placeholder="What recurring behavior do you notice?"
                  value={formData.patternNoticed}
                  onChange={(e) => setFormData({ ...formData, patternNoticed: e.target.value })}
                  className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[#2B2E34]">
                  If the same situation happens again, my rule is:
                </label>
                <Textarea
                  placeholder="What protocol will you follow next time?"
                  value={formData.upgradeRule}
                  onChange={(e) => setFormData({ ...formData, upgradeRule: e.target.value })}
                  className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-800">
                  <strong>Pattern Label:</strong> Give this pattern a name (e.g., "Procrastination Loop", "Identity Aligned")
                </p>
                <Input 
                  placeholder="Pattern name..."
                  className="mt-2 bg-white"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : setShowForm(false)}
            className="bg-[#0F1C2E] text-white hover:bg-[#1a2d47] font-semibold px-6 py-2.5"
          >
            {currentStep === 0 ? 'Cancel' : '← Previous'}
          </Button>
          <div className="flex items-center gap-1">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentStep === index ? 'bg-[#3DD4B0] w-4' : 'bg-[#8A94A6]/30'
                }`}
              />
            ))}
          </div>
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-6 py-2.5"
            >
              Next →
            </Button>
          ) : (
            <Button
              onClick={handleAddEntry}
              disabled={!formData.decision}
              className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-6 py-2.5"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Save Decision
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Purpose Header */}
      <Card className="bg-[#3DD4B0]/5 border-[#3DD4B0]/20">
        <CardContent className="p-4">
          <p className="text-sm text-[#0F1C2E]">
            <strong>Purpose:</strong> To analyze recurring decision habits and identify whether choices are made from identity, impulse, avoidance, or alignment. 
            Log one meaningful decision per day. Focus on decisions that affected behavior, time, energy, or consistency.
          </p>
        </CardContent>
      </Card>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F1C2E]">Decision Pattern Analysis</h2>
          <p className="text-[#8A94A6]">Track, analyze, and upgrade your decision patterns</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowAnalysis(true)}
            disabled={entries.length < 1}
            className="bg-[#1F6F78] text-white hover:bg-[#1a5a62] font-semibold px-5 py-2.5 disabled:opacity-50"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Analysis
          </Button>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-5 py-2.5"
          >
            <Plus className="w-4 h-4 mr-2" />
            Log Decision
          </Button>
        </div>
      </div>

      {/* Search */}
      {entries.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]" />
          <Input
            placeholder="Search decisions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-[#1F6F78]/20 focus:border-[#3DD4B0]"
          />
        </div>
      )}

      {/* Entries List */}
      {filteredEntries.length > 0 ? (
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-[#8A94A6]">{entry.date}</div>
                    {entry.emotionState && (
                      <Badge variant="outline">{entry.emotionState}</Badge>
                    )}
                    <Badge className={
                      entry.overallQuality >= 70 ? 'bg-green-100 text-green-700' :
                      entry.overallQuality >= 40 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }>
                      {entry.overallQuality}% quality
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <h3 className="font-semibold text-[#0F1C2E] mb-1">{entry.decision}</h3>
                <p className="text-sm text-[#8A94A6] mb-2">{entry.context}</p>
                {entry.patternNoticed && (
                  <div className="mt-2 p-2 bg-[#F6F8FA] rounded text-sm">
                    <span className="font-medium text-[#0F1C2E]">Pattern: </span>
                    <span className="text-[#8A94A6]">{entry.patternNoticed}</span>
                  </div>
                )}
                {entry.upgradeRule && (
                  <div className="mt-1 p-2 bg-[#3DD4B0]/10 rounded text-sm">
                    <span className="font-medium text-[#1F6F78]">Upgrade Rule: </span>
                    <span className="text-[#2B2E34]">{entry.upgradeRule}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-[#F6F8FA]">
          <CardContent className="p-8 text-center">
            <Brain className="w-12 h-12 text-[#8A94A6] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#0F1C2E] mb-2">Start Your Decision Journal</h3>
            <p className="text-[#8A94A6] mb-4">
              Document your decisions to identify patterns and improve your decision-making quality.
            </p>
            <Button onClick={() => setShowForm(true)} className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-6 py-2.5">
              <Plus className="w-4 h-4 mr-2" />
              Log Your First Decision
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Export */}
      {entries.length > 0 && (
        <Button
          onClick={() => {
            const data = {
              exportDate: new Date().toISOString(),
              totalDecisions: entries.length,
              entries: entries
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `decision-pattern-analysis-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
          }}
          className="bg-[#0F1C2E] text-white hover:bg-[#1a2d47] font-semibold px-5 py-2.5"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Journal
        </Button>
      )}
    </div>
  );
}
