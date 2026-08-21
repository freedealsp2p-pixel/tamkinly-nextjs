'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
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

// Achievement definitions
const allAchievements = [
  { id: 'first_habit', nameEn: 'First Step', nameAr: 'الخطوة الأولى', icon: 'Zap', color: '#3DD4B0', category: 'HABITS', categoryAr: 'العادات' },
  { id: 'habit_week', nameEn: 'Week Warrior', nameAr: 'محارب الأسبوع', icon: 'Flame', color: '#FF6B6B', category: 'HABITS', categoryAr: 'العادات' },
  { id: 'habit_month', nameEn: 'Month Master', nameAr: 'سيد الشهر', icon: 'Award', color: '#2A8A94', category: 'HABITS', categoryAr: 'العادات' },
  { id: 'first_goal', nameEn: 'Visionary', nameAr: 'صاحب الرؤية', icon: 'Target', color: '#2A8A94', category: 'GOALS', categoryAr: 'الأهداف' },
  { id: 'goal_complete', nameEn: 'Goal Getter', nameAr: 'محقق الأهداف', icon: 'CheckCircle2', color: '#4CAF50', category: 'GOALS', categoryAr: 'الأهداف' },
  { id: 'first_entry', nameEn: 'Reflection Starter', nameAr: 'بادئ التأمل', icon: 'BookOpen', color: '#C97B7B', category: 'JOURNAL', categoryAr: 'المذكرات' },
  { id: 'writer_1000', nameEn: 'Writer', nameAr: 'الكاتب', icon: 'PenTool', color: '#7986CB', category: 'JOURNAL', categoryAr: 'المذكرات' },
  { id: 'baseline_complete', nameEn: 'Self-Aware', nameAr: 'واعٍ بذاته', icon: 'User', color: '#3DD4B0', category: 'IDENTITY', categoryAr: 'الهوية' },
  { id: 'audit_complete', nameEn: 'Environment Designer', nameAr: 'مصمم البيئة', icon: 'Home', color: '#1F6F78', category: 'IDENTITY', categoryAr: 'الهوية' },
  { id: 'erq_complete', nameEn: 'Emotional Explorer', nameAr: 'مستكشف المشاعر', icon: 'Heart', color: '#C97B7B', category: 'IDENTITY', categoryAr: 'الهوية' },
  { id: 'first_evidence', nameEn: 'Evidence Collector', nameAr: 'جامع الأدلة', icon: 'FileCheck', color: '#4CAF50', category: 'CONSISTENCY', categoryAr: 'الاتساق' },
  { id: 'first_decision', nameEn: 'Decision Logger', nameAr: 'مسجل القرارات', icon: 'GitBranch', color: '#5C6BC0', category: 'CONSISTENCY', categoryAr: 'الاتساق' },
  { id: 'identity_30', nameEn: 'Identity Builder', nameAr: 'باني الهوية', icon: 'TrendingUp', color: '#3DD4B0', category: 'TRANSFORMATION', categoryAr: 'التحول' },
  { id: 'identity_60', nameEn: 'Transformer', nameAr: 'المحول', icon: 'RefreshCw', color: '#1F6F78', category: 'TRANSFORMATION', categoryAr: 'التحول' },
  { id: 'identity_80', nameEn: 'Identity Master', nameAr: 'سيد الهوية', icon: 'Crown', color: '#FFD700', category: 'TRANSFORMATION', categoryAr: 'التحول' },
  { id: 'journey_start', nameEn: 'Journey Begins', nameAr: 'تبدأ الرحلة', icon: 'Flag', color: '#3DD4B0', category: 'MILESTONE', categoryAr: 'معلم' },
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
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  // App configuration
  const apps = [
    {
      slug: 'habit-tracker',
      name: getText('Habit Tracker', 'متتبع العادات'),
      icon: <CheckCircle2 className="h-6 w-6" />,
      color: 'from-teal-500 to-emerald-500',
      description: getText('Build your identity through daily actions', 'ابنِ هويتك من خلال الإجراءات اليومية'),
    },
    {
      slug: 'goal-system',
      name: getText('Goal System', 'نظام الأهداف'),
      icon: <Target className="h-6 w-6" />,
      color: 'from-violet-500 to-purple-500',
      description: getText('Transform through meaningful objectives', 'تحول من خلال أهداف ذات معنى'),
    },
    {
      slug: 'journal-system',
      name: getText('Journal', 'المذكرات'),
      icon: <BookOpen className="h-6 w-6" />,
      color: 'from-rose-500 to-pink-500',
      description: getText('Reflect and discover your true self', 'تأمل واكتشف ذاتك الحقيقية'),
    },
    {
      slug: 'identity-baseline',
      name: getText('Identity Baseline', 'خط الأساس للهوية'),
      icon: <User className="h-6 w-6" />,
      color: 'from-cyan-500 to-teal-500',
      description: getText('Measure your current self-concept', 'قياس مفهوم الذات الحالي'),
    },
    {
      slug: 'environmental-audit',
      name: getText('Environmental Audit', 'تدقيق البيئة'),
      icon: <Home className="h-6 w-6" />,
      color: 'from-emerald-600 to-teal-600',
      description: getText('Optimize your environment for change', 'حسّن بيئتك للتغيير'),
    },
    {
      slug: 'decision-analysis',
      name: getText('Decision Analysis', 'تحليل القرارات'),
      icon: <GitBranch className="h-6 w-6" />,
      color: 'from-indigo-500 to-blue-500',
      description: getText('Track and improve decision patterns', 'تتبع وحسّن أنماط القرار'),
    },
    {
      slug: 'evidence-tracking',
      name: getText('Evidence Tracking', 'تتبع الأدلة'),
      icon: <Layers className="h-6 w-6" />,
      color: 'from-[#1F6F78] to-[#2A8A94]',
      description: getText('Document proof of transformation', 'وثّق دليل التحول'),
    },
    {
      slug: 'emotion-regulation',
      name: getText('Emotion Regulation', 'تنظيم المشاعر'),
      icon: <Heart className="h-6 w-6" />,
      color: 'from-pink-500 to-rose-500',
      description: getText('ERQ assessment for emotional control', 'تقييم ERQ للتحكم العاطفي'),
    },
  ];

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
          <p className="text-white">{getText('Loading your progress...', 'جارٍ تحميل تقدمك...')}</p>
        </div>
      </div>
);
  }

  const phaseColor = progress?.phase === 'AWARENESS' 
    ? 'from-[#1F6F78] to-[#2A8A94]' 
    : progress?.phase === 'RECODING' 
      ? 'from-violet-500 to-purple-500' 
      : 'from-emerald-500 to-teal-500';

  const unlockedAchievements = progress?.achievements
    .filter(a => a.completed)
    .map(a => a.id) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-[#1F6F78]/10 text-[#1F6F78] hover:bg-[#1F6F78]/20">
            {getText(progress?.journey?.currentPhase || 'AWARENESS', progress?.journey?.currentPhase === 'AWARENESS' ? 'الوعي' : progress?.journey?.currentPhase === 'RECODING' ? 'إعادة البرمجة' : 'الدمج')} {getText('Phase • Day', 'المرحلة • اليوم')} {progress?.journey?.currentDay || 1}
          </Badge>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] bg-clip-text text-transparent">
            {getText('Transformation Dashboard', 'لوحة التحول')}
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            {getText('Track your identity transformation journey. Every action counts.', 'تتبع رحلة تحول هويتك. كل إجراء يُحسب.')}
          </p>
        </div>

        {/* Identity Score Card */}
        <Card className="border-0 shadow-xl mb-8 overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${phaseColor}`} />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{getText('Identity Score', 'درجة الهوية')}</h2>
                <p className="text-slate-500">{getText('Phase:', 'المرحلة:')} {getText(progress?.phase || 'AWARENESS', progress?.phase === 'AWARENESS' ? 'الوعي' : progress?.phase === 'RECODING' ? 'إعادة البرمجة' : 'الدمج')}</p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] bg-clip-text text-transparent">
                  {progress?.identityScore || 0}
                </p>
                <p className="text-sm text-slate-500">{getText('out of 100', 'من ١٠٠')}</p>
              </div>
            </div>
            <Progress value={progress?.identityScore || 0} className="h-3" />
            <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm">
              <div className="text-[#4da8a2]">
                <p className="font-medium">{getText('Awareness', 'الوعي')}</p>
                <p className="text-xs text-slate-400">0-29</p>
              </div>
              <div className="text-violet-600">
                <p className="font-medium">{getText('Recoding', 'إعادة البرمجة')}</p>
                <p className="text-xs text-slate-400">30-59</p>
              </div>
              <div className="text-emerald-600">
                <p className="font-medium">{getText('Integration', 'الدمج')}</p>
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
                  <p className="text-xs text-emerald-600">{getText('Best Streak', 'أفضل سلسلة')}</p>
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
                  <p className="text-xs text-violet-600">{getText('Identity Votes', 'أصوات الهوية')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-[#e8f4f3] to-[#e6f3f4]">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#1F6F78] text-white">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#1F6F78]">{progress?.journey?.goalsCompleted || 0}</p>
                  <p className="text-xs text-[#4da8a2]">{getText('Goals Done', 'أهداف محققة')}</p>
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
                  <p className="text-xs text-rose-600">{getText('Words Written', 'كلمات مكتوبة')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Apps Grid */}
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Grid className="h-5 w-5 text-[#3DD4B0]" />
          {getText('Your Apps', 'تطبيقاتك')}
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
                      {app.slug === 'habit-tracker' && `${progress?.apps?.habits?.completedToday || 0}/${progress?.apps?.habits?.total || 0} ${getText('today', 'اليوم')}`}
                      {app.slug === 'goal-system' && `${progress?.apps?.goals?.inProgress || 0} ${getText('active', 'نشط')}`}
                      {app.slug === 'journal-system' && `${progress?.apps?.journal?.entries || 0} ${getText('entries', 'إدخالات')}`}
                      {app.slug === 'identity-baseline' && (progress?.assessments?.identityBaseline ? getText('Completed', 'مكتمل') : getText('Not started', 'لم يبدأ'))}
                      {app.slug === 'environmental-audit' && (progress?.assessments?.environmentalAudit ? getText('Completed', 'مكتمل') : getText('Not started', 'لم يبدأ'))}
                      {app.slug === 'decision-analysis' && `${progress?.apps?.decisions?.entries || 0} ${getText('logged', 'مسجل')}`}
                      {app.slug === 'evidence-tracking' && `${progress?.apps?.evidence?.records || 0} ${getText('records', 'سجلات')}`}
                      {app.slug === 'emotion-regulation' && (progress?.assessments?.erq ? getText('Completed', 'مكتمل') : getText('Not started', 'لم يبدأ'))}
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
              <Brain className="h-5 w-5 text-[#2A8A94]" />
              {getText('Assessment Results', 'نتائج التقييم')}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {progress?.assessments?.identityBaseline && (
                <Card className="border-l-4 border-l-[#3DD4B0]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{getText('Identity Baseline', 'خط الأساس للهوية')}</CardTitle>
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
                    <CardTitle className="text-sm font-medium">{getText('Environmental Audit', 'التدقيق البيئي')}</CardTitle>
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
                <Card className="border-l-4 border-l-[#C97B7B]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{getText('ERQ Assessment', 'تقييم ERQ')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-slate-500">{getText('Reappraisal', 'إعادة التقييم')}</p>
                        <div className="text-xl font-bold text-[#0F1C2E]">
                          {progress.assessments.erq.reappraisalScore.toFixed(1)}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">{getText('Suppression', 'الكبت')}</p>
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
              <Trophy className="h-5 w-5 text-[#3DD4B0]" />
              {getText('Achievements', 'الإنجازات')}
            </CardTitle>
            <CardDescription>{getText('Milestones in your transformation journey', 'معالم في رحلة تحولك')}</CardDescription>
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
                        ? 'bg-gradient-to-br from-[#e8f4f3] to-[#e6f3f4] border border-[#b3d9d6]' 
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
                    <p className={`font-medium text-sm ${unlocked ? 'text-[#1F6F78]' : 'text-slate-400'}`}>
                      {locale === 'ar' ? badge.nameAr : badge.nameEn}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">{locale === 'ar' ? badge.categoryAr : badge.category}</Badge>
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
              {getText('"The only way to do great work is to love what you do."', '"الطريقة الوحيدة للقيام بعمل عظيم هي أن تحب ما تفعله."')}
            </p>
            <p className="text-sm text-slate-300">— Steve Jobs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
