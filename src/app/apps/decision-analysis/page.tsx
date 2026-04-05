'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  TrendingUp, 
  ArrowRight, 
  RotateCcw,
  Download,
  Brain,
  Heart,
  Target,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  XCircle,
  AlertCircle,
  Plus,
  Trash2,
  BarChart3,
  Eye
} from 'lucide-react';

interface Decision {
  id: string;
  date: string;
  decision: string;
  context: string;
  emotion: string;
  choice: string;
  aligned: boolean;
  pattern: string;
  upgradeRule: string;
  ratings: {
    clarity: number;
    emotionalControl: number;
    valueAlignment: number;
  };
}

const emotions = [
  { value: 'calm', label: 'Calm', color: '#3DD4B0' },
  { value: 'stressed', label: 'Stressed', color: '#FFB74D' },
  { value: 'tired', label: 'Tired', color: '#8A94A6' },
  { value: 'anxious', label: 'Anxious', color: '#E57373' },
  { value: 'confident', label: 'Confident', color: '#1F6F78' },
  { value: 'frustrated', label: 'Frustrated', color: '#BA68C8' },
];

const patternOptions = [
  'I choose comfort when stressed',
  'I delay when uncertain',
  'I seek external validation',
  'I avoid confrontation',
  'I overthink simple choices',
  'I decide impulsively',
  'I prioritize others over myself',
  'I choose the path of least resistance'
];

const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export default function DecisionAnalysisPage() {
  const [showForm, setShowForm] = useState(false);
  const [decisions, setDecisions] = useState<Decision[]>(() => getFromStorage('tamkinly-decisions', []));
  
  const [formData, setFormData] = useState({
    decision: '',
    context: '',
    emotion: 'calm',
    choice: '',
    aligned: true,
    pattern: '',
    upgradeRule: '',
    clarity: 5,
    emotionalControl: 5,
    valueAlignment: 5
  });

  useEffect(() => {
    localStorage.setItem('tamkinly-decisions', JSON.stringify(decisions));
  }, [decisions]);

  const handleAddDecision = () => {
    const newDecision: Decision = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...formData,
      ratings: {
        clarity: formData.clarity,
        emotionalControl: formData.emotionalControl,
        valueAlignment: formData.valueAlignment
      }
    };
    setDecisions(prev => [newDecision, ...prev]);
    setFormData({
      decision: '',
      context: '',
      emotion: 'calm',
      choice: '',
      aligned: true,
      pattern: '',
      upgradeRule: '',
      clarity: 5,
      emotionalControl: 5,
      valueAlignment: 5
    });
    setShowForm(false);
  };

  const deleteDecision = (id: string) => {
    setDecisions(prev => prev.filter(d => d.id !== id));
  };

  const calculateStats = () => {
    if (decisions.length === 0) return { avgQuality: 0, alignedCount: 0, patterns: {} };
    
    const totalQuality = decisions.reduce((sum, d) => {
      const avg = (d.ratings.clarity + d.ratings.emotionalControl + d.ratings.valueAlignment) / 3;
      return sum + avg;
    }, 0);
    
    const alignedCount = decisions.filter(d => d.aligned).length;
    
    const patterns: Record<string, number> = {};
    decisions.forEach(d => {
      if (d.pattern) {
        patterns[d.pattern] = (patterns[d.pattern] || 0) + 1;
      }
    });

    return {
      avgQuality: Math.round((totalQuality / decisions.length) * 10),
      alignedCount,
      patterns
    };
  };

  const stats = calculateStats();

  const handleExport = () => {
    const exportData = {
      date: new Date().toISOString(),
      decisions,
      stats,
      summary: {
        totalDecisions: decisions.length,
        averageQuality: stats.avgQuality,
        alignmentRate: decisions.length > 0 ? Math.round((stats.alignedCount / decisions.length) * 100) : 0,
        mostCommonPattern: Object.entries(stats.patterns).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'
      }
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `decision-analysis-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            ← Back to Apps
          </Link>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#1F6F78]/50">PREMIUM</Badge>
                </div>
                <h1 className="text-xl font-bold">Decision Pattern Analysis</h1>
              </div>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Log Decision
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[#0F1C2E]">{decisions.length}</div>
              <p className="text-xs text-[#8A94A6]">Decisions Logged</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[#3DD4B0]">{stats.avgQuality}%</div>
              <p className="text-xs text-[#8A94A6]">Avg Quality Score</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[#1F6F78]">
                {decisions.length > 0 ? Math.round((stats.alignedCount / decisions.length) * 100) : 0}%
              </div>
              <p className="text-xs text-[#8A94A6]">Identity Aligned</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[#FFB74D]">
                {Object.keys(stats.patterns).length}
              </div>
              <p className="text-xs text-[#8A94A6]">Patterns Identified</p>
            </CardContent>
          </Card>
        </div>

        {/* Decision Form */}
        {showForm && (
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#3DD4B0]" />
                Log a Decision
              </CardTitle>
              <CardDescription>
                Record the decision, context, and outcome for pattern analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">Decision</label>
                <Input
                  placeholder="What decision did you make?"
                  value={formData.decision}
                  onChange={(e) => setFormData(prev => ({ ...prev, decision: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">Context</label>
                <Textarea
                  placeholder="What was the situation? What led to this decision?"
                  value={formData.context}
                  onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">Emotional State</label>
                <div className="flex flex-wrap gap-2">
                  {emotions.map((emotion) => (
                    <Badge
                      key={emotion.value}
                      variant={formData.emotion === emotion.value ? 'default' : 'outline'}
                      className={`cursor-pointer ${formData.emotion === emotion.value ? '' : 'hover:bg-slate-100'}`}
                      style={formData.emotion === emotion.value ? { backgroundColor: emotion.color } : { borderColor: emotion.color, color: emotion.color }}
                      onClick={() => setFormData(prev => ({ ...prev, emotion: emotion.value }))}
                    >
                      {emotion.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">What did you choose?</label>
                <Textarea
                  placeholder="What action did you take?"
                  value={formData.choice}
                  onChange={(e) => setFormData(prev => ({ ...prev, choice: e.target.value }))}
                  className="min-h-[60px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">Was it aligned with your identity?</label>
                <div className="flex gap-4">
                  <Badge
                    variant={formData.aligned ? 'default' : 'outline'}
                    className={`cursor-pointer py-2 px-4 ${formData.aligned ? 'bg-[#3DD4B0]' : 'hover:bg-[#3DD4B0]/10'}`}
                    style={formData.aligned ? { backgroundColor: '#3DD4B0', color: '#0F1C2E' } : { borderColor: '#3DD4B0', color: '#3DD4B0' }}
                    onClick={() => setFormData(prev => ({ ...prev, aligned: true }))}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Yes
                  </Badge>
                  <Badge
                    variant={!formData.aligned ? 'default' : 'outline'}
                    className={`cursor-pointer py-2 px-4 ${!formData.aligned ? 'bg-[#E57373]' : 'hover:bg-[#E57373]/10'}`}
                    style={!formData.aligned ? { backgroundColor: '#E57373', color: 'white' } : { borderColor: '#E57373', color: '#E57373' }}
                    onClick={() => setFormData(prev => ({ ...prev, aligned: false }))}
                  >
                    <XCircle className="w-4 h-4 mr-1" /> No
                  </Badge>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">Pattern noticed</label>
                <div className="flex flex-wrap gap-2">
                  {patternOptions.map((pattern, i) => (
                    <Badge
                      key={i}
                      variant={formData.pattern === pattern ? 'default' : 'outline'}
                      className={`cursor-pointer text-xs ${formData.pattern === pattern ? 'bg-[#1F6F78]' : 'hover:bg-slate-100'}`}
                      onClick={() => setFormData(prev => ({ ...prev, pattern }))}
                    >
                      {pattern}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">Upgrade rule for next time</label>
                <Textarea
                  placeholder="What would you do differently? What rule can you create?"
                  value={formData.upgradeRule}
                  onChange={(e) => setFormData(prev => ({ ...prev, upgradeRule: e.target.value }))}
                  className="min-h-[60px]"
                />
              </div>

              {/* Quality Ratings */}
              <div className="space-y-4 p-4 bg-[#F6F8FA] rounded-lg">
                <h4 className="font-medium text-[#0F1C2E]">Decision Quality Rating</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#2B2E34]">Clarity</span>
                      <span className="text-[#8A94A6]">{formData.clarity}/10</span>
                    </div>
                    <Slider value={[formData.clarity]} onValueChange={([v]) => setFormData(prev => ({ ...prev, clarity: v }))} max={10} min={1} step={1} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#2B2E34]">Emotional Control</span>
                      <span className="text-[#8A94A6]">{formData.emotionalControl}/10</span>
                    </div>
                    <Slider value={[formData.emotionalControl]} onValueChange={([v]) => setFormData(prev => ({ ...prev, emotionalControl: v }))} max={10} min={1} step={1} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#2B2E34]">Value Alignment</span>
                      <span className="text-[#8A94A6]">{formData.valueAlignment}/10</span>
                    </div>
                    <Slider value={[formData.valueAlignment]} onValueChange={([v]) => setFormData(prev => ({ ...prev, valueAlignment: v }))} max={10} min={1} step={1} />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleAddDecision}
                  disabled={!formData.decision || !formData.choice}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Log Decision
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pattern Insights */}
        {Object.keys(stats.patterns).length > 0 && (
          <Card className="bg-[#0F1C2E] mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#3DD4B0]" />
                Pattern Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.patterns)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([pattern, count], i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white text-sm">{pattern}</span>
                      <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0]">{count} times</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Decision Log */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#0F1C2E]">Decision Log</CardTitle>
              {decisions.length > 0 && (
                <Button onClick={handleExport} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              )}
            </div>
            <CardDescription>
              Based on Decision Pattern Analysis framework for studying decision behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            {decisions.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-[#8A94A6] mx-auto mb-4" />
                <p className="text-[#8A94A6]">No decisions logged yet. Start tracking to identify patterns.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {decisions.map((decision) => {
                  const emotionData = emotions.find(e => e.value === decision.emotion) || emotions[0];
                  const avgRating = Math.round((decision.ratings.clarity + decision.ratings.emotionalControl + decision.ratings.valueAlignment) / 3 * 10);
                  
                  return (
                    <div key={decision.id} className="p-4 border rounded-lg hover:border-[#3DD4B0]/30 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge style={{ backgroundColor: emotionData.color, color: 'white' }}>
                            {emotionData.label}
                          </Badge>
                          {decision.aligned ? (
                            <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0]">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Aligned
                            </Badge>
                          ) : (
                            <Badge className="bg-[#E57373]/10 text-[#E57373]">
                              <XCircle className="w-3 h-3 mr-1" /> Not Aligned
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#8A94A6]">{avgRating}% quality</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteDecision(decision.id)}
                            className="text-[#E57373] hover:bg-[#E57373]/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <h4 className="font-medium text-[#0F1C2E] mb-1">{decision.decision}</h4>
                      <p className="text-sm text-[#2B2E34] mb-2">{decision.choice}</p>
                      {decision.pattern && (
                        <p className="text-xs text-[#8A94A6] italic">Pattern: {decision.pattern}</p>
                      )}
                      {decision.upgradeRule && (
                        <div className="mt-2 p-2 bg-[#3DD4B0]/5 rounded text-xs text-[#1F6F78]">
                          <Lightbulb className="w-3 h-3 inline mr-1" />
                          Upgrade: {decision.upgradeRule}
                        </div>
                      )}
                      <p className="text-xs text-[#8A94A6] mt-2">
                        {new Date(decision.date).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scientific Reference */}
        <Card className="bg-[#1F6F78]/10 border-[#1F6F78]/30 mt-8">
          <CardContent className="p-6">
            <h4 className="font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#FFB74D]" />
              Decision Quality Framework
            </h4>
            <p className="text-sm text-[#2B2E34] mb-3">
              This tool helps you track decisions, identify patterns, and improve decision quality over time. 
              Recording the context, emotion, and outcome reveals recurring patterns that may be limiting growth.
            </p>
            <p className="text-xs text-[#1F6F78]">
              Reference: "Are We Improving? Update and Critical Appraisal of the Measures of Decision Making Quality"
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
