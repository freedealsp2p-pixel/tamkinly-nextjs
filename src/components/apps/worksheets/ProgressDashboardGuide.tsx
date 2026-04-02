'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowUp,
  ArrowDown,
  Target,
  Shield,
  Brain,
  Heart,
  Home,
  Zap,
  CheckCircle2,
  Trophy,
  Star,
  Download,
  RotateCcw,
  BarChart3,
  LineChart,
  Award,
  Flag,
  ChevronUp,
  ChevronDown,
  MinusCircle,
  Circle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Core Metrics Configuration
const coreMetrics = [
  {
    id: 'identityAlignment',
    name: 'Identity Alignment Score',
    description: 'How well your actions align with your desired identity',
    icon: <Target className="w-5 h-5" />,
    color: '#3DD4B0'
  },
  {
    id: 'selfTrust',
    name: 'Self-Trust Score',
    description: 'Your ability to trust your own judgment and follow through',
    icon: <Shield className="w-5 h-5" />,
    color: '#1F6F78'
  },
  {
    id: 'commitmentConsistency',
    name: 'Commitment Consistency Score',
    description: 'Your ability to follow through on commitments to yourself',
    icon: <CheckCircle2 className="w-5 h-5" />,
    color: '#64B5F6'
  },
  {
    id: 'decisionQuality',
    name: 'Decision Quality Score',
    description: 'The quality and intentionality of your decision-making',
    icon: <Brain className="w-5 h-5" />,
    color: '#0F1C2E'
  },
  {
    id: 'emotionalRegulation',
    name: 'Emotional Regulation Score',
    description: 'Your ability to manage and respond to emotional experiences',
    icon: <Heart className="w-5 h-5" />,
    color: '#E57373'
  },
  {
    id: 'environmentalAlignment',
    name: 'Environmental Alignment Score',
    description: 'How well your environment supports your identity',
    icon: <Home className="w-5 h-5" />,
    color: '#FFB74D'
  },
  {
    id: 'evidenceStrength',
    name: 'Evidence Strength Score',
    description: 'The strength of evidence supporting your new identity',
    icon: <BarChart3 className="w-5 h-5" />,
    color: '#81C784'
  },
  {
    id: 'agency',
    name: 'Agency Score',
    description: 'Your sense of control and ownership over your life direction',
    icon: <Zap className="w-5 h-5" />,
    color: '#BA68C8'
  }
];

// Trend Options
const trendOptions = [
  { value: 'improving', label: 'Improving', icon: <TrendingUp className="w-4 h-4" />, color: 'text-green-600', bg: 'bg-green-100' },
  { value: 'stable', label: 'Stable', icon: <Minus className="w-4 h-4" />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { value: 'declining', label: 'Declining', icon: <TrendingDown className="w-4 h-4" />, color: 'text-red-600', bg: 'bg-red-100' }
];

// Trend Tracking Categories
const trendCategories = [
  { id: 'consistency', name: 'Consistency Trend' },
  { id: 'alignment', name: 'Alignment Trend' },
  { id: 'evidence', name: 'Evidence Trend' },
  { id: 'decisionQuality', name: 'Decision Quality Trend' },
  { id: 'emotionalRegulation', name: 'Emotional Regulation Trend' }
];

// Milestones
const milestones = [
  { id: 'firstWeek', name: 'First completed week', description: 'Successfully completed your first full week of the program' },
  { id: 'firstStressDecision', name: 'First identity-aligned decision under stress', description: 'Made a decision aligned with your new identity during a stressful situation' },
  { id: 'firstRepairedLapse', name: 'First repaired lapse', description: 'Successfully recovered and repaired after a setback' },
  { id: 'firstStreak', name: 'First high-consistency streak', description: 'Maintained high consistency for an extended period' },
  { id: 'firstEnvironmental', name: 'First major environmental improvement', description: 'Made significant changes to your environment to support your identity' },
  { id: 'firstSelfTrust', name: 'First strong self-trust moment', description: 'Experienced a moment of deep trust in yourself' },
  { id: 'firstEmotionalStability', name: 'First week of stable emotional regulation', description: 'Maintained emotional stability for a full week' }
];

// Milestone Status Options
const milestoneStatuses = [
  { value: 'not_reached', label: 'Not yet reached', icon: <Circle className="w-4 h-4" />, color: 'text-gray-400', bg: 'bg-gray-100' },
  { value: 'reached', label: 'Reached', icon: <CheckCircle className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-100' },
  { value: 'sustained', label: 'Sustained', icon: <Award className="w-4 h-4" />, color: 'text-green-600', bg: 'bg-green-100' }
];

// Transformation Status Options
const transformationStatuses = [
  'Early stage',
  'Emerging',
  'Stabilizing',
  'Strong',
  'Highly integrated'
];

// Weekly Reflection Prompts
const reflectionPrompts = [
  { id: 'improved', question: 'What improved this week?' },
  { id: 'easier', question: 'What became easier?' },
  { id: 'harder', question: 'What became harder?' },
  { id: 'evidence', question: 'What behavior created the most evidence?' },
  { id: 'support', question: 'What support did I fail to use?' },
  { id: 'focus', question: 'What should I focus on next week?' }
];

// Helper function to get direction of change
const getDirection = (baseline: number, current: number) => {
  const diff = current - baseline;
  if (diff > 0) return { direction: 'up', icon: <ArrowUp className="w-4 h-4" />, color: 'text-green-600', bg: 'bg-green-100', label: 'Up' };
  if (diff < 0) return { direction: 'down', icon: <ArrowDown className="w-4 h-4" />, color: 'text-red-600', bg: 'bg-red-100', label: 'Down' };
  return { direction: 'stable', icon: <Minus className="w-4 h-4" />, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Stable' };
};

export default function ProgressDashboardGuide() {
  // State for Baseline vs Current scores
  const [scores, setScores] = useState<Record<string, { baseline: number; current: number }>>(() => {
    const initial: Record<string, { baseline: number; current: number }> = {};
    coreMetrics.forEach(metric => {
      initial[metric.id] = { baseline: 50, current: 50 };
    });
    return initial;
  });

  // State for Trends
  const [trends, setTrends] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    trendCategories.forEach(cat => {
      initial[cat.id] = 'stable';
    });
    return initial;
  });

  // State for Weekly Reflections
  const [reflections, setReflections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    reflectionPrompts.forEach(prompt => {
      initial[prompt.id] = '';
    });
    return initial;
  });

  // State for Milestones
  const [milestoneStatus, setMilestoneStatus] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    milestones.forEach(m => {
      initial[m.id] = 'not_reached';
    });
    return initial;
  });

  // State for Dashboard Summary
  const [summary, setSummary] = useState({
    strongestArea: '',
    weakestArea: '',
    biggestImprovement: '',
    remainingGap: '',
    transformationStatus: 'Early stage',
    finalStatement: ''
  });

  // Calculate differences for each metric
  const scoreAnalysis = useMemo(() => {
    return coreMetrics.map(metric => {
      const score = scores[metric.id];
      const diff = score.current - score.baseline;
      const direction = getDirection(score.baseline, score.current);
      return {
        ...metric,
        baseline: score.baseline,
        current: score.current,
        diff,
        direction
      };
    });
  }, [scores]);

  // Handle score changes
  const handleBaselineChange = (metricId: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [metricId]: { ...prev[metricId], baseline: value }
    }));
  };

  const handleCurrentChange = (metricId: string, value: number) => {
    setScores(prev => ({
      ...prev,
      [metricId]: { ...prev[metricId], current: value }
    }));
  };

  // Handle trend changes
  const handleTrendChange = (trendId: string, value: string) => {
    setTrends(prev => ({ ...prev, [trendId]: value }));
  };

  // Handle reflection changes
  const handleReflectionChange = (promptId: string, value: string) => {
    setReflections(prev => ({ ...prev, [promptId]: value }));
  };

  // Handle milestone changes
  const handleMilestoneChange = (milestoneId: string, status: string) => {
    setMilestoneStatus(prev => ({ ...prev, [milestoneId]: status }));
  };

  // Handle summary changes
  const handleSummaryChange = (field: string, value: string) => {
    setSummary(prev => ({ ...prev, [field]: value }));
  };

  // Reset function
  const handleReset = () => {
    const emptyScores: Record<string, { baseline: number; current: number }> = {};
    coreMetrics.forEach(metric => {
      emptyScores[metric.id] = { baseline: 50, current: 50 };
    });
    setScores(emptyScores);

    const emptyTrends: Record<string, string> = {};
    trendCategories.forEach(cat => {
      emptyTrends[cat.id] = 'stable';
    });
    setTrends(emptyTrends);

    const emptyReflections: Record<string, string> = {};
    reflectionPrompts.forEach(prompt => {
      emptyReflections[prompt.id] = '';
    });
    setReflections(emptyReflections);

    const emptyMilestones: Record<string, string> = {};
    milestones.forEach(m => {
      emptyMilestones[m.id] = 'not_reached';
    });
    setMilestoneStatus(emptyMilestones);

    setSummary({
      strongestArea: '',
      weakestArea: '',
      biggestImprovement: '',
      remainingGap: '',
      transformationStatus: 'Early stage',
      finalStatement: ''
    });
  };

  // Export function
  const handleExport = () => {
    const data = {
      date: new Date().toISOString(),
      scores,
      trends,
      reflections,
      milestoneStatus,
      summary
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const avgBaseline = Object.values(scores).reduce((sum, s) => sum + s.baseline, 0) / Object.keys(scores).length;
    const avgCurrent = Object.values(scores).reduce((sum, s) => sum + s.current, 0) / Object.keys(scores).length;
    return { baseline: Math.round(avgBaseline), current: Math.round(avgCurrent), diff: Math.round(avgCurrent - avgBaseline) };
  }, [scores]);

  // Calculate milestone progress
  const milestoneProgress = useMemo(() => {
    const reached = Object.values(milestoneStatus).filter(s => s !== 'not_reached').length;
    return Math.round((reached / milestones.length) * 100);
  }, [milestoneStatus]);

  return (
    <div className="space-y-8 pb-8">
      {/* Purpose Header */}
      <Card className="bg-gradient-to-r from-[#3DD4B0]/10 to-[#1F6F78]/10 border-[#3DD4B0]/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#3DD4B0] flex items-center justify-center text-white flex-shrink-0">
              <LineChart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-[#0F1C2E] text-lg mb-2">Purpose</h3>
              <p className="text-[#2B2E34]">
                To visually display progress, consistency, and identity alignment across the 30-day journey so the user can see change over time rather than rely on memory alone. <strong>Update the dashboard once per day or once per week.</strong>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress Summary */}
      <Card className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] border-0">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-[#8A94A6] text-sm uppercase tracking-wide mb-2">Baseline Average</p>
              <div className="text-4xl font-bold text-white mb-1">{overallProgress.baseline}</div>
              <Progress value={overallProgress.baseline} className="h-2 bg-[#1A2A42] [&>div]:bg-white/50" />
            </div>
            <div className="text-center">
              <p className="text-[#8A94A6] text-sm uppercase tracking-wide mb-2">Current Average</p>
              <div className="text-4xl font-bold text-[#3DD4B0] mb-1">{overallProgress.current}</div>
              <Progress value={overallProgress.current} className="h-2 bg-[#1A2A42] [&>div]:bg-[#3DD4B0]" />
            </div>
            <div className="text-center">
              <p className="text-[#8A94A6] text-sm uppercase tracking-wide mb-2">Overall Change</p>
              <div className={`text-4xl font-bold ${overallProgress.diff >= 0 ? 'text-green-400' : 'text-red-400'} mb-1`}>
                {overallProgress.diff >= 0 ? '+' : ''}{overallProgress.diff}
              </div>
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${overallProgress.diff >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {overallProgress.diff >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {overallProgress.diff >= 0 ? 'Progress Made' : 'Needs Attention'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 1: Core Dashboard Metrics */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-[#F6F8FA] rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3DD4B0] flex items-center justify-center text-white">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-[#0F1C2E]">Core Dashboard Metrics</CardTitle>
              <CardDescription className="text-[#8A94A6]">Track these scores weekly to monitor your transformation</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {coreMetrics.map((metric) => {
              const score = scores[metric.id];
              const diff = score.current - score.baseline;
              return (
                <div
                  key={metric.id}
                  className="p-4 rounded-xl border border-gray-100 hover:border-[#3DD4B0]/30 transition-colors"
                  style={{ backgroundColor: `${metric.color}08` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div style={{ color: metric.color }}>{metric.icon}</div>
                    <span className="text-sm font-medium text-[#0F1C2E]">{metric.name.replace(' Score', '')}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#0F1C2E]">{score.current}</p>
                      <p className="text-xs text-[#8A94A6]">Current</p>
                    </div>
                    <Badge className={`${diff >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {diff >= 0 ? '+' : ''}{diff}
                    </Badge>
                  </div>
                  <Progress value={score.current} className="h-1.5 mt-3 bg-gray-100" style={{ backgroundColor: `${metric.color}20` }} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Baseline vs Current Comparison */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-[#F6F8FA] rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1F6F78] flex items-center justify-center text-white">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-[#0F1C2E]">Baseline vs Current Comparison</CardTitle>
              <CardDescription className="text-[#8A94A6]">Compare your starting point to where you are now</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {scoreAnalysis.map((metric) => (
              <div
                key={metric.id}
                className="p-4 rounded-xl bg-white border border-gray-100 hover:border-[#3DD4B0]/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: metric.color }}
                  >
                    {metric.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#0F1C2E]">{metric.name}</h4>
                    <p className="text-xs text-[#8A94A6]">{metric.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
                  {/* Baseline */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#8A94A6] uppercase tracking-wide">Baseline</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={metric.baseline}
                      onChange={(e) => handleBaselineChange(metric.id, parseInt(e.target.value) || 0)}
                      className="text-center font-bold text-[#0F1C2E]"
                    />
                  </div>

                  {/* Current */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[#8A94A6] uppercase tracking-wide">Current</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={metric.current}
                      onChange={(e) => handleCurrentChange(metric.id, parseInt(e.target.value) || 0)}
                      className="text-center font-bold text-[#3DD4B0]"
                    />
                  </div>

                  {/* Difference */}
                  <div className="text-center">
                    <label className="text-xs font-medium text-[#8A94A6] uppercase tracking-wide block mb-2">Difference</label>
                    <div className={`text-2xl font-bold ${metric.diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.diff >= 0 ? '+' : ''}{metric.diff}
                    </div>
                  </div>

                  {/* Direction */}
                  <div className="text-center">
                    <label className="text-xs font-medium text-[#8A94A6] uppercase tracking-wide block mb-2">Direction</label>
                    <Badge className={`${metric.direction.bg} ${metric.direction.color} flex items-center gap-1 justify-center w-full py-1.5`}>
                      {metric.direction.icon}
                      {metric.direction.label}
                    </Badge>
                  </div>
                </div>

                {/* Progress Bar Comparison */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8A94A6] w-16">Baseline</span>
                    <Progress value={metric.baseline} className="h-2 flex-1 bg-gray-100" />
                    <span className="text-xs font-medium text-[#8A94A6] w-8">{metric.baseline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#3DD4B0] w-16">Current</span>
                    <Progress value={metric.current} className="h-2 flex-1 bg-gray-100 [&>div]:bg-[#3DD4B0]" />
                    <span className="text-xs font-medium text-[#3DD4B0] w-8">{metric.current}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Trend Tracking */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-[#F6F8FA] rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0F1C2E] flex items-center justify-center text-white">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-[#0F1C2E]">Trend Tracking</CardTitle>
              <CardDescription className="text-[#8A94A6]">Monitor the direction of your progress over time</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendCategories.map((category) => (
              <div
                key={category.id}
                className="p-4 rounded-xl border border-gray-100 hover:border-[#3DD4B0]/30 transition-all"
              >
                <h4 className="font-semibold text-[#0F1C2E] mb-3">{category.name}</h4>
                <div className="flex gap-2">
                  {trendOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleTrendChange(category.id, option.value)}
                      className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg transition-all ${
                        trends[category.id] === option.value
                          ? `${option.bg} ${option.color} ring-2 ring-offset-2 ring-current`
                          : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {option.icon}
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Weekly Reflection Block */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-[#F6F8FA] rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3DD4B0] flex items-center justify-center text-white">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-[#0F1C2E]">Weekly Reflection Block</CardTitle>
              <CardDescription className="text-[#8A94A6]">Take time to reflect on your week and identify patterns</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {reflectionPrompts.map((prompt) => (
            <div key={prompt.id} className="space-y-2">
              <label className="text-sm font-medium text-[#0F1C2E] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1F6F78]/10 text-[#1F6F78] flex items-center justify-center text-xs">
                  {reflectionPrompts.indexOf(prompt) + 1}
                </span>
                {prompt.question}
              </label>
              <Textarea
                value={reflections[prompt.id]}
                onChange={(e) => handleReflectionChange(prompt.id, e.target.value)}
                placeholder="Reflect on this question..."
                className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0] resize-none"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Section 5: Milestone Display */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-[#F6F8FA] rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1F6F78] flex items-center justify-center text-white">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl text-[#0F1C2E]">Milestone Display</CardTitle>
                <CardDescription className="text-[#8A94A6]">Track your key achievements throughout the journey</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-[#8A94A6]">Progress</p>
              <p className="text-2xl font-bold text-[#3DD4B0]">{milestoneProgress}%</p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={milestoneProgress} className="h-2 bg-gray-100 [&>div]:bg-[#3DD4B0]" />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {milestones.map((milestone) => {
              const status = milestoneStatuses.find(s => s.value === milestoneStatus[milestone.id]) || milestoneStatuses[0];
              return (
                <div
                  key={milestone.id}
                  className={`p-4 rounded-xl border transition-all ${
                    status.value === 'sustained' ? 'border-green-200 bg-green-50' :
                    status.value === 'reached' ? 'border-blue-200 bg-blue-50' :
                    'border-gray-100 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`${status.bg} ${status.color} p-2 rounded-lg`}>
                        {status.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0F1C2E] text-sm">{milestone.name}</h4>
                        <p className="text-xs text-[#8A94A6]">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {milestoneStatuses.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => handleMilestoneChange(milestone.id, s.value)}
                        className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                          milestoneStatus[milestone.id] === s.value
                            ? `${s.bg} ${s.color} ring-2 ring-offset-1 ring-current`
                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {s.icon}
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Section 6: Final Dashboard Summary */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3DD4B0] flex items-center justify-center text-[#0F1C2E]">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl text-white">Final Dashboard Summary</CardTitle>
              <CardDescription className="text-[#8A94A6]">Synthesize your progress and identify next steps</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Summary Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0F1C2E]">Current Strongest Area</label>
              <Input
                value={summary.strongestArea}
                onChange={(e) => handleSummaryChange('strongestArea', e.target.value)}
                placeholder="Which area shows the most strength?"
                className="border-[#3DD4B0]/30 focus:border-[#3DD4B0]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0F1C2E]">Current Weakest Area</label>
              <Input
                value={summary.weakestArea}
                onChange={(e) => handleSummaryChange('weakestArea', e.target.value)}
                placeholder="Which area needs the most work?"
                className="border-red-200 focus:border-red-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0F1C2E]">Biggest Improvement Since Baseline</label>
              <Input
                value={summary.biggestImprovement}
                onChange={(e) => handleSummaryChange('biggestImprovement', e.target.value)}
                placeholder="What has improved the most?"
                className="border-green-200 focus:border-green-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0F1C2E]">Most Important Remaining Gap</label>
              <Input
                value={summary.remainingGap}
                onChange={(e) => handleSummaryChange('remainingGap', e.target.value)}
                placeholder="What gap should you focus on?"
                className="border-yellow-200 focus:border-yellow-400"
              />
            </div>
          </div>

          {/* Transformation Status Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0F1C2E]">Overall Transformation Status</label>
            <div className="flex flex-wrap gap-2">
              {transformationStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleSummaryChange('transformationStatus', status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    summary.transformationStatus === status
                      ? 'bg-[#3DD4B0] text-[#0F1C2E] ring-2 ring-[#3DD4B0] ring-offset-2'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Final Statement */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0F1C2E]">Final Statement</label>
            <div className="p-4 bg-[#3DD4B0]/5 rounded-xl border border-[#3DD4B0]/20">
              <p className="text-[#0F1C2E] mb-2">
                <strong>The dashboard shows that my identity shift is currently...</strong>
              </p>
              <Textarea
                value={summary.finalStatement}
                onChange={(e) => handleSummaryChange('finalStatement', e.target.value)}
                placeholder="Complete this statement with your honest assessment..."
                className="min-h-[100px] border-[#3DD4B0]/30 focus:border-[#3DD4B0]"
              />
            </div>
          </div>

          {/* Summary Preview Card */}
          <div className="p-4 bg-gradient-to-r from-[#0F1C2E]/5 to-[#1F6F78]/5 rounded-xl">
            <h4 className="font-semibold text-[#0F1C2E] mb-3">Summary Preview</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="text-[#8A94A6] text-xs mb-1">Strongest</p>
                <p className="font-medium text-[#0F1C2E] truncate">{summary.strongestArea || '—'}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="text-[#8A94A6] text-xs mb-1">Weakest</p>
                <p className="font-medium text-[#0F1C2E] truncate">{summary.weakestArea || '—'}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="text-[#8A94A6] text-xs mb-1">Best Improvement</p>
                <p className="font-medium text-[#0F1C2E] truncate">{summary.biggestImprovement || '—'}</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <p className="text-[#8A94A6] text-xs mb-1">Status</p>
                <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0]">{summary.transformationStatus}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-[#1F6F78] text-[#1F6F78] hover:bg-[#1F6F78]/10 font-semibold px-6 py-2.5"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Dashboard
        </Button>
        <Button
          onClick={handleExport}
          className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-6 py-2.5"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Dashboard
        </Button>
      </div>

      {/* Footer Note */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              <strong>Update Frequency:</strong> For best results, update this dashboard once per day or at minimum once per week. 
              Consistent tracking reveals patterns that sporadic updates cannot show.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
