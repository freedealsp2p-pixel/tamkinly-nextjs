'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Flame, Target, BookOpen, TrendingUp, Award, Star, 
  CheckCircle2, Calendar, Zap, Heart, Brain, Trophy,
  Sparkles, ArrowRight, User, Home, GitBranch, Layers,
  RefreshCw, Crown, Activity, Grid, Flag, Infinity,
  PenTool, FileText, FileCheck, Search, Clock
} from 'lucide-react';
import Link from 'next/link';

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="h-5 w-5" />,
  Flame: <Flame className="h-5 w-5" />,
  Award: <Award className="h-5 w-5" />,
  Star: <Star className="h-5 w-5" />,
  Target: <Target className="h-5 w-5" />,
  CheckCircle2: <CheckCircle2 className="h-5 w-5" />,
  Trophy: <Trophy className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
  Calendar: <Calendar className="h-5 w-5" />,
  PenTool: <PenTool className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  User: <User className="h-5 w-5" />,
  Home: <Home className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  Brain: <Brain className="h-5 w-5" />,
  FileCheck: <FileCheck className="h-5 w-5" />,
  Layers: <Layers className="h-5 w-5" />,
  GitBranch: <GitBranch className="h-5 w-5" />,
  Search: <Search className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  RefreshCw: <RefreshCw className="h-5 w-5" />,
  Crown: <Crown className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Activity: <Activity className="h-5 w-5" />,
  Grid: <Grid className="h-5 w-5" />,
  Flag: <Flag className="h-5 w-5" />,
  Infinity: <Infinity className="h-5 w-5" />,
  Clock: <Clock className="h-5 w-5" />,
};

// App configuration
const apps = [
  {
    slug: 'habit-tracker',
    name: 'Habit Tracker',
    nameAr: 'متتبع العادات',
    icon: <CheckCircle2 className="h-6 w-6" />,
    color: 'from-teal-500 to-emerald-500',
    description: 'Build your identity through daily actions',
    descriptionAr: 'ابنِ هويتك من خلال الإجراءات اليومية',
  },
  {
    slug: 'goal-system',
    name: 'Goal System',
    nameAr: 'نظام الأهداف',
    icon: <Target className="h-6 w-6" />,
    color: 'from-violet-500 to-purple-500',
    description: 'Transform through meaningful objectives',
    descriptionAr: 'تحول من خلال أهداف ذات معنى',
  },
  {
    slug: 'journal-system',
    name: 'Journal',
    nameAr: 'المذكرات',
    icon: <BookOpen className="h-6 w-6" />,
    color: 'from-rose-500 to-pink-500',
    description: 'Reflect and discover your true self',
    descriptionAr: 'تأمل واكتشف ذاتك الحقيقية',
  },
  {
    slug: 'identity-baseline',
    name: 'Identity Baseline',
    nameAr: 'خط الأساس للهوية',
    icon: <User className="h-6 w-6" />,
    color: 'from-cyan-500 to-teal-500',
    description: 'Measure your current self-concept',
    descriptionAr: 'قياس مفهوم الذات الحالي',
  },
  {
    slug: 'environmental-audit',
    name: 'Environmental Audit',
    nameAr: 'تدقيق البيئة',
    icon: <Home className="h-6 w-6" />,
    color: 'from-emerald-600 to-teal-600',
    description: 'Optimize your environment for change',
    descriptionAr: 'حسّن بيئتك للتغيير',
  },
  {
    slug: 'decision-analysis',
    name: 'Decision Analysis',
    nameAr: 'تحليل القرارات',
    icon: <GitBranch className="h-6 w-6" />,
    color: 'from-indigo-500 to-blue-500',
    description: 'Track and improve decision patterns',
    descriptionAr: 'تتبع وحسّن أنماط القرار',
  },
  {
    slug: 'evidence-tracking',
    name: 'Evidence Tracking',
    nameAr: 'تتبع الأدلة',
    icon: <Layers className="h-6 w-6" />,
    color: 'from-amber-500 to-orange-500',
    description: 'Document proof of transformation',
    descriptionAr: 'وثّق دليل التحول',
  },
  {
    slug: 'emotion-regulation',
    name: 'Emotion Regulation',
    nameAr: 'تنظيم المشاعر',
    icon: <Heart className="h-6 w-6" />,
    color: 'from-pink-500 to-rose-500',
    description: 'ERQ assessment for emotional control',
    descriptionAr: 'تقييم ERQ للتحكم العاطفي',
  },
];

// Achievement definitions
const allAchievements = [
  { id: 'first_habit', name: 'First Step', icon: 'Zap', color: '#3DD4B0', category: 'HABITS' },
  { id: 'habit_week', name: 'Week Warrior', icon: 'Flame', color: '#FF6B6B', category: 'HABITS' },
  { id: 'habit_month', name: 'Month Master', icon: 'Award', color: '#FFB74D', category: 'HABITS' },
  { id: 'first_goal', name: 'Visionary', icon: 'Target', color: '#64B5F6', category: 'GOALS' },
  { id: 'goal_complete', name: 'Goal Getter', icon: 'CheckCircle2', color: '#4CAF50', category: 'GOALS' },
  { id: 'first_entry', name: 'Reflection Starter', icon: 'BookOpen', color: '#E57373', category: 'JOURNAL' },
  { id: 'writer_1000', name: 'Writer', icon: 'PenTool', color: '#7986CB', category: 'JOURNAL' },
  { id: 'baseline_complete', name: 'Self-Aware', icon: 'User', color: '#3DD4B0', category: 'IDENTITY' },
  { id: 'audit_complete', name: 'Environment Designer', icon: 'Home', color: '#1F6F78', category: 'IDENTITY' },
  { id: 'erq_complete', name: 'Emotional Explorer', icon: 'Heart', color: '#E57373', category: 'IDENTITY' },
  { id: 'first_evidence', name: 'Evidence Collector', icon: 'FileCheck', color: '#4CAF50', category: 'CONSISTENCY' },
  { id: 'first_decision', name: 'Decision Logger', icon: 'GitBranch', color: '#5C6BC0', category: 'CONSISTENCY' },
  { id: 'identity_30', name: 'Identity Builder', icon: 'TrendingUp', color: '#3DD4B0', category: 'TRANSFORMATION' },
  { id: 'identity_60', name: 'Transformer', icon: 'RefreshCw', color: '#1F6F78', category: 'TRANSFORMATION' },
  { id: 'identity_80', name: 'Identity Master', icon: 'Crown', color: '#FFD700', category: 'TRANSFORMATION' },
  { id: 'journey_start', name: 'Journey Begins', icon: 'Flag', color: '#3DD4B0', category: 'MILESTONE' },
];

interface ProgressData {
  identityScore: number;
  phase: string;
  journey: {
    currentDay: number;
    currentPhase: string;
    totalVotes: number;
    maxStreak: number;
    goalsCompleted: number;
    journalStreak: number;
    totalWords: number;
    decisionsLogged: number;
    evidenceRecords: number;
  };
  apps: Record<string, { total?: number; completedToday?: number; streak?: number; entries?: number; inProgress?: number; completed?: number; avgQuality?: number; records?: number }>;
  assessments: {
    identityBaseline: { overallScore: number; completedAt: string } | null;
    environmentalAudit: { overallScore: number; completedAt: string } | null;
    erq: { reappraisalScore: number; suppressionScore: number; completedAt: string } | null;
  };
  achievements: { id: string; completed: boolean; progress: number }[];
}

export default function UnifiedProgressDashboard() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/progress');
      const data = await response.json();
      if (data.success) {
        setProgress(data.progress);
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
      // Use demo data
      setProgress(getDemoProgress());
    } finally {
      setLoading(false);
    }
  };

  const getDemoProgress = (): ProgressData => ({
    identityScore: 35,
    phase: 'RECODING',
    journey: {
      currentDay: 7,
      currentPhase: 'AWARENESS',
      totalVotes: 50,
      maxStreak: 3,
      goalsCompleted: 0,
      journalStreak: 2,
      totalWords: 450,
      decisionsLogged: 3,
      evidenceRecords: 5,
    },
    apps: {
      habits: { total: 3, completedToday: 2, streak: 3 },
      goals: { total: 2, inProgress: 2, completed: 0 },
      journal: { entries: 5, streak: 2 },
      decisions: { entries: 3, avgQuality: 65 },
      evidence: { records: 5 },
    },
    assessments: {
      identityBaseline: null,
      environmentalAudit: null,
      erq: null,
    },
    achievements: [],
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-[#3DD4B0]" />
          </div>
          <p className="text-white">Loading your progress...</p>
        </div>
      </div>
    );
  }

  const phaseColor = progress?.phase === 'AWARENESS' 
    ? 'from-amber-500 to-orange-500' 
    : progress?.phase === 'RECODING' 
      ? 'from-violet-500 to-purple-500' 
      : 'from-emerald-500 to-teal-500';

  const unlockedAchievements = progress?.achievements
    .filter(a => a.completed)
    .map(a => a.id) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-[#1F6F78]/10 text-[#1F6F78] hover:bg-[#1F6F78]/20">
            {progress?.journey?.currentPhase || 'AWARENESS'} Phase • Day {progress?.journey?.currentDay || 1}
          </Badge>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] bg-clip-text text-transparent">
            Transformation Dashboard
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Track your identity transformation journey. Every action counts.
          </p>
        </div>

        {/* Identity Score Card */}
        <Card className="border-0 shadow-xl mb-8 overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${phaseColor}`} />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Identity Score</h2>
                <p className="text-slate-500">Phase: {progress?.phase || 'AWARENESS'}</p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] bg-clip-text text-transparent">
                  {progress?.identityScore || 0}
                </p>
                <p className="text-sm text-slate-500">out of 100</p>
              </div>
            </div>
            <Progress value={progress?.identityScore || 0} className="h-3" />
            <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm">
              <div className="text-amber-600">
                <p className="font-medium">Awareness</p>
                <p className="text-xs text-slate-400">0-29</p>
              </div>
              <div className="text-violet-600">
                <p className="font-medium">Recoding</p>
                <p className="text-xs text-slate-400">30-59</p>
              </div>
              <div className="text-emerald-600">
                <p className="font-medium">Integration</p>
                <p className="text-xs text-slate-400">60+</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500 text-white">
                  <Flame className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xl font-bold text-emerald-700">{progress?.journey?.maxStreak || 0}</p>
                  <p className="text-xs text-emerald-600">Best Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-50 to-purple-50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-violet-500 text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xl font-bold text-violet-700">{progress?.journey?.totalVotes || 0}</p>
                  <p className="text-xs text-violet-600">Identity Votes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500 text-white">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xl font-bold text-amber-700">{progress?.journey?.goalsCompleted || 0}</p>
                  <p className="text-xs text-amber-600">Goals Done</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-pink-50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-500 text-white">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xl font-bold text-rose-700">{progress?.journey?.totalWords || 0}</p>
                  <p className="text-xs text-rose-600">Words Written</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Apps Grid */}
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Grid className="h-5 w-5 text-[#3DD4B0]" />
          Your Apps
        </h2>
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {apps.map((app) => (
            <Link key={app.slug} href={`/apps/${app.slug}`}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer h-full group">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${app.color} text-white`}>
                      {app.icon}
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-[#3DD4B0] transition-colors" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">{app.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{app.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">
                      {app.slug === 'habit-tracker' && `${progress?.apps?.habits?.completedToday || 0}/${progress?.apps?.habits?.total || 0} today`}
                      {app.slug === 'goal-system' && `${progress?.apps?.goals?.inProgress || 0} active`}
                      {app.slug === 'journal-system' && `${progress?.apps?.journal?.entries || 0} entries`}
                      {app.slug === 'identity-baseline' && (progress?.assessments?.identityBaseline ? 'Completed' : 'Not started')}
                      {app.slug === 'environmental-audit' && (progress?.assessments?.environmentalAudit ? 'Completed' : 'Not started')}
                      {app.slug === 'decision-analysis' && `${progress?.apps?.decisions?.entries || 0} logged`}
                      {app.slug === 'evidence-tracking' && `${progress?.apps?.evidence?.records || 0} records`}
                      {app.slug === 'emotion-regulation' && (progress?.assessments?.erq ? 'Completed' : 'Not started')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Assessment Results */}
        {(progress?.assessments?.identityBaseline || progress?.assessments?.environmentalAudit || progress?.assessments?.erq) && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-[#BA68C8]" />
              Assessment Results
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {progress?.assessments?.identityBaseline && (
                <Card className="border-l-4 border-l-[#3DD4B0]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Identity Baseline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#0F1C2E] mb-2">
                      {progress.assessments.identityBaseline.overallScore}%
                    </div>
                    <Progress value={progress.assessments.identityBaseline.overallScore} className="h-2" />
                  </CardContent>
                </Card>
              )}
              {progress?.assessments?.environmentalAudit && (
                <Card className="border-l-4 border-l-[#1F6F78]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Environmental Audit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-[#0F1C2E] mb-2">
                      {progress.assessments.environmentalAudit.overallScore}%
                    </div>
                    <Progress value={progress.assessments.environmentalAudit.overallScore} className="h-2" />
                  </CardContent>
                </Card>
              )}
              {progress?.assessments?.erq && (
                <Card className="border-l-4 border-l-[#E57373]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">ERQ Assessment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-slate-500">Reappraisal</p>
                        <div className="text-xl font-bold text-[#0F1C2E]">
                          {progress.assessments.erq.reappraisalScore.toFixed(1)}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">Suppression</p>
                        <div className="text-xl font-bold text-[#0F1C2E]">
                          {progress.assessments.erq.suppressionScore.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Achievements */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Achievements
            </CardTitle>
            <CardDescription>Milestones in your transformation journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allAchievements.map((badge) => {
                const unlocked = unlockedAchievements.includes(badge.id);
                return (
                  <div 
                    key={badge.id}
                    className={`p-4 rounded-xl text-center transition-all ${
                      unlocked 
                        ? 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200' 
                        : 'bg-slate-50 opacity-50'
                    }`}
                  >
                    <div 
                      className={`mx-auto w-fit p-2 rounded-full mb-2 ${
                        unlocked ? 'text-white' : 'bg-slate-200 text-slate-400'
                      }`}
                      style={unlocked ? { backgroundColor: badge.color } : {}}
                    >
                      {iconMap[badge.icon] || <Star className="h-5 w-5" />}
                    </div>
                    <p className={`font-medium text-sm ${unlocked ? 'text-amber-700' : 'text-slate-400'}`}>
                      {badge.name}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">{badge.category}</Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quote */}
        <Card className="border-0 shadow-lg mt-8 bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] text-white">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-medium mb-2">
              "The only way to do great work is to love what you do."
            </p>
            <p className="text-sm text-slate-300">— Steve Jobs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
