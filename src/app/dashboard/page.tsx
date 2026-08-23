'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Brain,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Sparkles,
  ArrowRight,
  User,
  BarChart3,
  BookOpen,
  Heart,
  Clock,
  CheckCircle2,
  Flame,
  Star,
  Settings,
  LogOut,
  Loader2,
  Shield,
  Compass,
  AlertCircle,
  Footprints,
  PenLine,
  Scale,
  Gift,
  Copy,
  Check,
  Sun,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';
import OnboardingProgress from '@/components/account/OnboardingProgress';

// Types for /api/progress response
interface QuizResults {
  overallScore: number;
  identityClarity: number;
  environmentalAlignment: number;
  emotionalRegulation: number;
  decisionQuality: number;
  progressMomentum: number;
  dominantChallenge: string;
  dominantChallengeAr: string;
  recommendedProduct: string;
  personalizedMessage: string;
  personalizedMessageAr: string;
  timestamp: string;
}

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
  apps: {
    habits: { total: number; completedToday: number; streak: number };
    goals: { total: number; inProgress: number; completed: number };
    journal: { entries: number; streak: number };
    decisions: { entries: number; avgQuality: number };
    evidence: { records: number; byType: Record<string, unknown> };
  };
  assessments: {
    identityBaseline: {
      overallScore: number;
      dimensions: Record<string, number>;
      completedAt: string;
    } | null;
    environmentalAudit: {
      overallScore: number;
      dimensions: Record<string, number>;
      completedAt: string;
    } | null;
    erq: {
      reappraisalScore: number;
      suppressionScore: number;
      completedAt: string;
    } | null;
  };
  achievements: Array<{
    id: string;
    category: string;
    progress: number;
    completed: boolean;
    completedAt: string | null;
  }>;
  appProgress: Record<string, unknown>;
}

// Demo data for unauthenticated users
const getDemoData = (t: (key: string) => string): ProgressData => ({
  identityScore: 58,
  phase: 'RECODING',
  journey: {
    currentDay: 0,
    currentPhase: 'AWARENESS',
    totalVotes: 24,
    maxStreak: 7,
    goalsCompleted: 0,
    journalStreak: 3,
    totalWords: 1450,
    decisionsLogged: 0,
    evidenceRecords: 0,
  },
  apps: {
    habits: { total: 3, completedToday: 2, streak: 3 },
    goals: { total: 2, inProgress: 2, completed: 0 },
    journal: { entries: 5, streak: 3 },
    decisions: { entries: 3, avgQuality: 65 },
    evidence: { records: 5, byType: {} },
  },
  assessments: {
    identityBaseline: null,
    environmentalAudit: null,
    erq: null,
  },
  achievements: [
    { id: 'first-habit', category: 'habits', progress: 100, completed: true, completedAt: new Date().toISOString() },
    { id: 'week-streak', category: 'streaks', progress: 43, completed: false, completedAt: null },
  ],
  appProgress: {},
});

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations('dashboardPage');
  const { locale } = useLocale();
  const [data, setData] = useState<ProgressData>(getDemoData(t));
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessCode, setAccessCode] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [codeSuccess, setCodeSuccess] = useState<string | null>(null);
  const [referralCopied, setReferralCopied] = useState(false);
  const [referralInfo, setReferralInfo] = useState<{ code: string; totalReferrals: number; currentTier: string; nextTierAt: number | null } | null>(null);
  const [showRecovery, setShowRecovery] = useState(false);
  // Check if user has discovered Recovery
  useEffect(() => {
    try {
      const discovered = localStorage.getItem('tamkinly_recovery_discovered');
      if (discovered === 'true') {
        setShowRecovery(true);
      }
    } catch {}
  }, []);

  useEffect(() => {
    // Load quiz results from localStorage (works for both auth and anon users)
    try {
      const stored = localStorage.getItem('quizResults');
      if (stored) {
        setQuizResults(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }

    if (status === 'unauthenticated') {
      setIsLoading(false);
    } else if (status === 'authenticated') {
      fetchUserData();
    }
  }, [status]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/progress');
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.progress) {
          setData(result.progress);
          // If API returned assessment data, try to extract quiz results from appProgress
          if (result.progress.assessments?.identityBaseline) {
            // We have a baseline from the DB, but the quiz results in localStorage
            // are richer (5 dimensions). Prioritize localStorage if available.
            if (!quizResults) {
              // Build quiz-like results from identityBaseline assessment
              const baseline = result.progress.assessments.identityBaseline;
              setQuizResults({
                overallScore: baseline.overallScore,
                identityClarity: baseline.dimensions.selfConcept || 50,
                environmentalAlignment: baseline.dimensions.environmentalAlignment || 50,
                emotionalRegulation: baseline.dimensions.emotionalRegulation || 50,
                decisionQuality: baseline.dimensions.decisionQuality || 50,
                progressMomentum: baseline.dimensions.commitmentConsistency || 50,
                dominantChallenge: '',
                dominantChallengeAr: '',
                recommendedProduct: '',
                personalizedMessage: '',
                personalizedMessageAr: '',
                timestamp: baseline.completedAt,
              });
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }

    // Fetch referral data
    try {
      const refRes = await fetch('/api/referral');
      if (refRes.ok) {
        const refData = await refRes.json();
        if (refData.code) {
          setReferralInfo({
            code: refData.code,
            totalReferrals: refData.totalReferrals || 0,
            currentTier: refData.currentTier === 3 ? 'PREMIUM_BUNDLE' : refData.currentTier === 2 ? 'BASIC_ACCESS' : 'TRIAL_EXTENSION',
            nextTierAt: refData.nextTierAt,
          });
        }
      }
    } catch {}
  };

  // Fetch referral data
  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/referral')
        .then(res => res.json())
        .then(data => {
          if (data.code) {
            setReferralInfo({
              code: data.code,
              totalReferrals: data.totalReferrals || 0,
              currentTier: data.currentTier || 'TRIAL_EXTENSION',
              nextTierAt: data.nextTierAt || 4,
            });
          }
        })
        .catch(() => {});
    }
  }, [status]);

  const handleActivateCode = async () => {
    if (!accessCode.trim()) return;
    setCodeLoading(true);
    setCodeError(null);
    setCodeSuccess(null);
    try {
      const sessionEmail = session?.user?.email || '';
      const response = await fetch('/api/access/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode.trim(), email: sessionEmail }),
      });
      const result = await response.json();
      if (!response.ok) {
        setCodeError(result.error || 'Invalid code');
        return;
      }
      setCodeSuccess('Access granted! Tier: ' + result.tier);
      const accessInfo = JSON.parse(localStorage.getItem('tamkinly_access') || '{}');
      accessInfo[accessCode.trim()] = { tier: result.tier, productId: result.productId, activatedAt: new Date().toISOString() };
      localStorage.setItem('tamkinly_access', JSON.stringify(accessInfo));
      setAccessCode('');
      fetchUserData();
    } catch {
      setCodeError('Network error');
    } finally {
      setCodeLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Derive phase display name
  const phaseLabel = useMemo(() => {
    switch (data.phase) {
      case 'AWARENESS': return t('awareness');
      case 'RECODING': return t('recoding');
      case 'INTEGRATION': return t('integration');
      default: return t('recoding');
    }
  }, [data.phase, t]);

  // Derive journey phase label
  const journeyPhaseLabel = useMemo(() => {
    const phase = data.journey?.currentPhase || data.phase;
    switch (phase) {
      case 'AWARENESS': return t('phaseAwareness');
      case 'RECODING': return t('phaseRecodingJourney');
      case 'INTEGRATION': return t('phaseIntegration');
      default: return t('phaseAwareness');
    }
  }, [data.journey?.currentPhase, data.phase, t]);

  // Get guidance message based on quiz score
  const guidanceMessage = useMemo(() => {
    if (!quizResults) return t('guidanceNoQuiz');
    if (quizResults.overallScore <= 40) return t('guidanceWide');
    if (quizResults.overallScore <= 70) return t('guidanceModerate');
    return t('guidanceNarrow');
  }, [quizResults, t]);

  // Get guidance icon color based on score
  const guidanceColor = useMemo(() => {
    if (!quizResults) return '#8A94A6';
    if (quizResults.overallScore <= 40) return '#C97B7B';
    if (quizResults.overallScore <= 70) return '#2A8A94';
    return '#3DD4B0';
  }, [quizResults]);

  // Quiz dimension data for bars
  const quizDimensions = useMemo(() => {
    if (!quizResults) return [];
    return [
      { key: 'identityClarity', label: t('identityClarity'), value: quizResults.identityClarity, color: '#3DD4B0', icon: User },
      { key: 'environmentalAlignment', label: t('environmentalAlignment'), value: quizResults.environmentalAlignment, color: '#1F6F78', icon: Compass },
      { key: 'emotionalRegulation', label: t('emotionalRegulation'), value: quizResults.emotionalRegulation, color: '#C97B7B', icon: Heart },
      { key: 'decisionQuality', label: t('decisionQuality'), value: quizResults.decisionQuality, color: '#2A8A94', icon: Brain },
      { key: 'progressMomentum', label: t('progressMomentum'), value: quizResults.progressMomentum, color: '#2A8A94', icon: TrendingUp },
    ];
  }, [quizResults, t]);

  // Get score category
  const scoreCategory = useMemo(() => {
    if (!quizResults) return null;
    if (quizResults.overallScore <= 40) return t('gapWide');
    if (quizResults.overallScore <= 70) return t('gapModerate');
    return t('gapNarrow');
  }, [quizResults, t]);

  // Journey progress calculation
  const journeyDay = data.journey?.currentDay || 0;
  const journeyProgressPercent = Math.round((journeyDay / 30) * 100);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#3DD4B0]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-[#3DD4B0]">
                Tamkinly
              </Link>
              <Badge variant="outline" className="hidden sm:inline-flex">
                {status === 'authenticated' ? (session?.user?.accessTier || t('free')) : t('free')}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              {status === 'authenticated' ? (
                <>
                  <Link href="/account">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('signOut')}
                  </Button>
                </>
              ) : (
                <Link href="/auth/signin?callbackUrl=/dashboard">
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                    {t('signInToSave')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {status !== 'authenticated' && (
          <Card className="mb-8 bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">
                    {t('createAccountTitle')}
                  </h2>
                  <p className="text-slate-300">
                    {t('createAccountDesc')}
                  </p>
                </div>
                {/* Access Code Input */}
                <div className="flex gap-2 mb-4">
                  <Input
                    type="text"
                    placeholder="TMLY-XXXX-XXXX"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                    className="flex-1 h-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 font-mono text-center tracking-wider"
                    maxLength={18}
                  />
                  <Button
                    onClick={handleActivateCode}
                    disabled={codeLoading || !accessCode.trim()}
                    className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                  >
                    {codeLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('activateCode')}
                  </Button>
                </div>
                {codeError && <p className="text-[#B88A8E] text-xs mb-2">{codeError}</p>}
                {codeSuccess && <p className="text-green-400 text-xs mb-2">{codeSuccess}</p>}

                <Link href="/auth/signup?callbackUrl=/dashboard">
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                    {t('createFreeAccount')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F1C2E] mb-2">
            {status === 'authenticated'
              ? t('welcomeBack').replace('{name}', session?.user?.name || t('there'))
              : t('yourDashboard')
            }
          </h1>
          <p className="text-slate-600">
            {t('trackJourney')}
          </p>
        </div>

        {/* Guidance/Alerts Section */}
        <Card className="mb-8 border-l-4" style={{ borderLeftColor: guidanceColor }}>
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${guidanceColor}15` }}>
                <AlertCircle className="h-5 w-5" style={{ color: guidanceColor }} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0F1C2E] mb-1">{t('guidanceTitle')}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{guidanceMessage}</p>
                {!quizResults && (
                  <Link href="/quiz" className="inline-block mt-3">
                    <Button size="sm" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                      {t('takeQuiz')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: t('identityScore'), value: `${data.identityScore}%`, icon: Brain, color: '#3DD4B0' },
            { label: t('currentStreak'), value: `${data.journey?.journalStreak || 0} ${t('days')}`, icon: Flame, color: '#2A8A94' },
            { label: t('totalVotes'), value: data.journey?.totalVotes || 0, icon: CheckCircle2, color: '#1F6F78' },
            { label: t('habitsDone'), value: data.apps?.habits?.completedToday || 0, icon: Target, color: '#2A8A94' },
          ].map((stat, idx) => (
            <Card key={idx} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                    <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-[#0F1C2E]">{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access to Apps */}
        <Card className="mb-8 border-0 shadow-sm bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{t('yourApps')}</h3>
                <p className="text-slate-300 text-sm">{t('yourAppsDesc')}</p>
              </div>
              <Link href="/apps">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                  {t('openApps')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <Link href="/apps/identity-gap-quiz" className="bg-white/5 hover:bg-white/10 rounded-lg p-3 text-center transition-colors">
                <Brain className="h-5 w-5 text-[#3DD4B0] mx-auto mb-1" />
                <span className="text-xs text-white">{t('quiz')}</span>
              </Link>
              <Link href="/apps/daily-reflection" className="bg-white/5 hover:bg-white/10 rounded-lg p-3 text-center transition-colors">
                <Sun className="h-5 w-5 text-[#3DD4B0] mx-auto mb-1" />
                <span className="text-xs text-white">{t('reflection')}</span>
              </Link>
              <Link href="/apps/habit-tracker" className="bg-white/5 hover:bg-white/10 rounded-lg p-3 text-center transition-colors">
                <Target className="h-5 w-5 text-[#3DD4B0] mx-auto mb-1" />
                <span className="text-xs text-white">{t('habits')}</span>
              </Link>
              <Link href="/apps/ai-identity-coach" className="bg-white/5 hover:bg-white/10 rounded-lg p-3 text-center transition-colors">
                <Sparkles className="h-5 w-5 text-[#3DD4B0] mx-auto mb-1" />
                <span className="text-xs text-white">{t('aiCoach')}</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Progress */}
          <div className="lg:col-span-2 space-y-6">
          {/* Onboarding Progress */}
          <OnboardingProgress />

            {/* Assessment Results Card */}
            {quizResults ? (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-bold text-[#0F1C2E]">{t('assessmentResults')}</h2>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0]">{scoreCategory}</Badge>
                      <Link href="/quiz/results">
                        <Button variant="ghost" size="sm" className="text-[#1F6F78]">
                          {t('viewFullResults')}
                          <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Overall Score */}
                  <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78]">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#3DD4B0]">{quizResults.overallScore}%</div>
                      <div className="text-sm text-slate-300">{t('overallScore')}</div>
                    </div>
                    <div className="flex-1">
                      <Progress value={quizResults.overallScore} className="h-3 bg-white/20" />
                    </div>
                  </div>

                  {/* 5 Dimension Scores */}
                  <div className="space-y-3">
                    {quizDimensions.map((dim) => (
                      <div key={dim.key} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${dim.color}15` }}>
                          <dim.icon className="h-4 w-4" style={{ color: dim.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-[#0F1C2E] truncate">{dim.label}</span>
                            <span className="text-sm font-semibold" style={{ color: dim.color }}>{dim.value}%</span>
                          </div>
                          <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full rounded-full transition-all duration-700"
                              style={{ width: `${dim.value}%`, backgroundColor: dim.color }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dominant Challenge */}
                  {quizResults.dominantChallenge && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-[#1F6F78]" />
                        <span className="text-sm text-slate-500">{t('dominantChallenge')}:</span>
                        <span className="text-sm font-semibold text-[#0F1C2E]">
                          {locale === 'ar' ? quizResults.dominantChallengeAr : quizResults.dominantChallenge}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-sm border-dashed border-2 border-slate-200">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-7 w-7 text-[#3DD4B0]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F1C2E] mb-2">{t('assessmentResults')}</h3>
                  <p className="text-slate-500 text-sm mb-4">{t('takeQuizDesc')}</p>
                  <Link href="/quiz">
                    <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                      {t('takeQuiz')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* 30-Day Journey Progress */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-bold text-[#0F1C2E]">{t('journeyProgress')}</h2>
                  <Badge className="bg-[#1F6F78]/15 text-[#1F6F78]">
                    {journeyDay > 0 ? t('dayOf', { day: String(journeyDay) }) : t('journeyNotStarted')}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">{t('overallProgress')}</span>
                    <span className="font-semibold text-[#0F1C2E]">{journeyProgressPercent}%</span>
                  </div>
                  <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
                    {/* Three-phase colored bar */}
                    <div className="absolute top-0 left-0 h-full flex" style={{ width: '100%' }}>
                      <div className="h-full bg-[#3DD4B0]/20" style={{ width: '33.33%' }} />
                      <div className="h-full bg-[#1F6F78]/20" style={{ width: '33.33%' }} />
                      <div className="h-full bg-[#0F1C2E]/20" style={{ width: '33.34%' }} />
                    </div>
                    <div
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#3DD4B0] via-[#1F6F78] to-[#0F1C2E] transition-all duration-700"
                      style={{ width: `${journeyProgressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Phase Indicator */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: t('phaseAwareness'), range: '1-10', active: journeyDay > 0 && journeyDay <= 10 },
                    { label: t('phaseRecodingJourney'), range: '11-22', active: journeyDay > 10 && journeyDay <= 22 },
                    { label: t('phaseIntegration'), range: '23-30', active: journeyDay > 22 },
                  ].map((phase, idx) => (
                    <div
                      key={idx}
                      className={`text-center p-3 rounded-lg transition-all ${
                        phase.active
                          ? 'bg-[#3DD4B0]/10 border-2 border-[#3DD4B0]'
                          : 'bg-slate-50'
                      }`}
                    >
                      <div className="text-sm font-semibold text-[#0F1C2E]">{phase.label}</div>
                      <div className="text-xs text-slate-500">{t('days')} {phase.range}</div>
                    </div>
                  ))}
                </div>

                {journeyDay === 0 && (
                  <Link href="/apps/identity-recode-system" className="block">
                    <Button className="w-full bg-[#1F6F78] text-white hover:bg-[#185c63]">
                      {t('startJourney')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}

                {/* Journey Stats */}
                {journeyDay > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
                    {[
                      { label: t('bestStreak'), value: data.journey?.maxStreak || 0, icon: Flame, color: '#2A8A94' },
                      { label: t('wordsWritten'), value: data.journey?.totalWords || 0, icon: PenLine, color: '#3DD4B0' },
                      { label: t('decisionsLogged'), value: data.journey?.decisionsLogged || 0, icon: Scale, color: '#1F6F78' },
                      { label: t('evidenceRecords'), value: data.journey?.evidenceRecords || 0, icon: Shield, color: '#2A8A94' },
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center p-2 rounded-lg bg-slate-50">
                        <stat.icon className="h-4 w-4 mx-auto mb-1" style={{ color: stat.color }} />
                        <div className="text-lg font-bold text-[#0F1C2E]">{stat.value}</div>
                        <div className="text-xs text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Transformation Phase */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#0F1C2E]">{t('yourTransformationPhase')}</h2>
                  <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0]">{phaseLabel}</Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">{t('overallProgress')}</span>
                      <span className="font-semibold">{data.identityScore}%</span>
                    </div>
                    <Progress value={data.identityScore} className="h-3" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {[t('awareness'), t('recoding'), t('integration')].map((phase, idx) => (
                      <div key={phase} className={`text-center p-3 rounded-lg ${
                        phase === phaseLabel ? 'bg-[#3DD4B0]/10 border-2 border-[#3DD4B0]' : 'bg-slate-50'
                      }`}>
                        <div className="text-sm font-semibold text-[#0F1C2E]">{phase}</div>
                        <div className="text-xs text-slate-500">
                          {idx === 0 ? t('phaseRange1') : idx === 1 ? t('phaseRange2') : t('phaseRange3')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* App Stats */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[#0F1C2E] mb-4">{t('continueJourney')}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: t('identityGapQuiz'), icon: Brain, url: '/quiz', tier: t('freeTier'), stat: quizResults ? `${quizResults.overallScore}%` : null },
                    { name: t('dailyReflectionApp'), icon: BookOpen, url: '/apps/daily-reflection', tier: t('freeTier'), stat: data.apps?.journal?.streak ? `${data.apps.journal.streak} ${t('days')}` : null },
                    { name: t('valuesClarificationApp'), icon: Heart, url: '/apps/values-clarification', tier: t('freeTier'), stat: null },
                    { name: t('progressDashboardApp'), icon: BarChart3, url: '/apps/progress-dashboard', tier: t('freeTier'), stat: null },
                  ].map((app, idx) => (
                    <Link key={idx} href={app.url}>
                      <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                          <app.icon className="h-5 w-5 text-[#3DD4B0]" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[#0F1C2E]">{app.name}</div>
                          <div className="text-xs text-slate-500">{app.tier}</div>
                        </div>
                        {app.stat && (
                          <Badge variant="outline" className="text-xs">{app.stat}</Badge>
                        )}
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Achievements & Upgrades */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#0F1C2E]">{t('achievements')}</h2>
                  <Badge variant="outline">{data.achievements?.filter(a => a.completed).length || 0} / 20</Badge>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {(data.achievements || []).map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-lg ${achievement.completed ? 'bg-[#3DD4B0]/10' : 'bg-slate-50 opacity-60'}`}
                    >
                      <div className="flex items-center gap-2">
                        {achievement.completed ? (
                          <Star className="h-5 w-5 text-[#2A8A94] fill-current" />
                        ) : (
                          <Star className="h-5 w-5 text-slate-300" />
                        )}
                        <div className="font-semibold text-[#0F1C2E]">{achievement.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{t('score')}: {achievement.progress}%</p>
                      {!achievement.completed && achievement.progress > 0 && (
                        <Progress value={achievement.progress} className="h-1.5 mt-2" />
                      )}
                    </div>
                  ))}
                  {(!data.achievements || data.achievements.length === 0) && (
                    <p className="text-sm text-slate-400 text-center py-4">{t('loading')}</p>
                  )}
                </div>
                <Link href="/apps/progress-dashboard">
                  <Button variant="link" className="w-full mt-4">
                    {t('viewAllAchievements')}
                  </Button>
                </Link>
              </CardContent>
            </Card>


            {/* App Stats Summary */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#0F1C2E] mb-4">{t('continueJourney')}</h3>
                <div className="space-y-3">
                  {[
                    { label: t('habitsToday'), value: `${data.apps?.habits?.completedToday || 0}/${data.apps?.habits?.total || 0}`, icon: CheckCircle2, color: '#3DD4B0' },
                    { label: t('goalsInProgress'), value: data.apps?.goals?.inProgress || 0, icon: Target, color: '#1F6F78' },
                    { label: t('goalsCompleted'), value: data.apps?.goals?.completed || 0, icon: Award, color: '#2A8A94' },
                    { label: t('journalStreak'), value: `${data.apps?.journal?.streak || 0} ${t('days')}`, icon: BookOpen, color: '#2A8A94' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" style={{ color: item.color }} />
                        <span className="text-slate-600 text-sm">{item.label}</span>
                      </div>
                      <span className="font-semibold text-[#0F1C2E] text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>


            {/* Recovery Programs Card — shown only if user discovered Recovery */}
            {showRecovery && (
            <Card className="border-0 shadow-sm border-l-4 border-l-[#1F6F78]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#1F6F78]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0F1C2E]">{t('recoveryPrograms')}</h3>
                    <p className="text-xs text-slate-500">{t('recoveryProgramsDesc')}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link href="/recovery/porn-recovery" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F0FDF9] transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Brain className="h-4 w-4 text-[#3DD4B0]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F1C2E]">{t('pornRecovery')}</p>
                      <p className="text-xs text-slate-500">{t('pornRecoveryShort')}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#3DD4B0] transition-colors" />
                  </Link>
                  <Link href="/recovery/trc" className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F6F8FA] transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-[#1F6F78]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Shield className="h-4 w-4 text-[#1F6F78]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F1C2E]">{t('trcProgram')}</p>
                      <p className="text-xs text-slate-500">{t('trcShort')}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1F6F78] transition-colors" />
                  </Link>
                </div>
                <Link href="/recovery" className="block mt-4">
                  <Button variant="outline" className="w-full border-[#1F6F78] text-[#1F6F78] hover:bg-[#1F6F78] hover:text-white text-sm">
                    {t('exploreRecovery')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
            )}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78]">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-[#3DD4B0]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t('unlockFullPotential')}</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    {t('unlockDesc')}
                  </p>
                  <Link href="/products">
                    <Button className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                      {t('viewProducts')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Referral Program Widget */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#0F1C2E]">{t('referralTitle')}</h3>
                  <Gift className="h-5 w-5 text-[#3DD4B0]" />
                </div>
                {status === 'authenticated' && referralInfo ? (
                  <>
                    <div className="bg-[#0F1C2E] rounded-lg p-3 mb-3 text-center">
                      <span className="font-mono text-lg text-[#3DD4B0] tracking-widest">{referralInfo.code}</span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText('https://tamkinly.com/ref/' + referralInfo.code);
                          setReferralCopied(true);
                          setTimeout(() => setReferralCopied(false), 2000);
                        }}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-[#1F6F78] text-[#1F6F78] text-xs"
                      >
                        {referralCopied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                        {referralCopied ? 'Copied!' : t('yourCode')}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-slate-500">{t('referralCount')}</span>
                      <span className="font-semibold text-[#0F1C2E]">{referralInfo.totalReferrals}</span>
                    </div>
                    {referralInfo.nextTierAt && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-500">{t('currentTier')}</span>
                          <span className="text-[#1F6F78]">
                            {referralInfo.currentTier === 'PREMIUM_BUNDLE' ? 'Premium' :
                             referralInfo.currentTier === 'BASIC_ACCESS' ? 'Basic' : 'Trial+'}
                          </span>
                        </div>
                        <Progress value={Math.min(100, (referralInfo.totalReferrals / referralInfo.nextTierAt) * 100)} className="h-1.5" />
                      </div>
                    )}
                    <Link href="/referral">
                      <Button variant="link" className="w-full text-[#1F6F78] text-sm">
                        {t('viewReferralPage')}
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-slate-500 mb-3">
                      {locale === 'ar' ? 'سجل الدخول للوصول إلى برنامج الإحالة' : 'Sign in to access the referral program'}
                    </p>
                    <Link href="/auth/signin?callbackUrl=/dashboard">
                      <Button size="sm" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                        {locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#0F1C2E] mb-4">{t('quickLinks')}</h3>
                <div className="space-y-2">
                  {[
                    { name: t('takeAssessment'), url: '/quiz' },
                    { name: t('viewAllApps'), url: '/apps' },
                    { name: t('productsAndPricing'), url: '/products' },
                    { name: t('helpAndFaq'), url: '/faq' },
                  ].map((link, idx) => (
                    <Link key={idx} href={link.url}>
                      <div className="flex items-center justify-between p-2 rounded hover:bg-slate-50 transition-colors">
                        <span className="text-slate-600">{link.name}</span>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
