'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Flame, Target, BookOpen, TrendingUp, Award, Star, 
  CheckCircle2, Calendar, Zap, Heart, Brain, Trophy,
  Sparkles, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
  votes: number;
}

interface Goal {
  id: string;
  title: string;
  progress: number;
  category: string;
  status: string;
}

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  wordCount: number;
}

// Initialize from localStorage
const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export default function ProgressDashboardPage() {
  const [habits, setHabits] = useState<Habit[]>(() => getFromStorage('tamkinly-habits', []));
  const [goals, setGoals] = useState<Goal[]>(() => getFromStorage('tamkinly-goals', []));
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => getFromStorage('tamkinly-journal', []));

  // Calculate stats
  const totalVotes = habits.reduce((acc, h) => acc + h.votes, 0);
  const maxStreak = Math.max(...habits.map(h => h.streak), 0);
  const completedToday = habits.filter(h => h.completedToday).length;
  
  const goalsInProgress = goals.filter(g => g.status === 'IN_PROGRESS').length;
  const goalsCompleted = goals.filter(g => g.status === 'COMPLETED').length;
  const avgGoalProgress = goals.length > 0 
    ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)
    : 0;

  const totalWords = journalEntries.reduce((acc, e) => acc + e.wordCount, 0);
  
  // Calculate journal streak
  let journalStreak = 0;
  const sortedEntries = [...journalEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  let checkDate = new Date();
  for (const entry of sortedEntries) {
    const entryDate = new Date(entry.date);
    const diffDays = Math.floor((checkDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0 || diffDays === 1) {
      journalStreak++;
      checkDate = entryDate;
    } else break;
  }

  // Identity Score (composite)
  const identityScore = Math.min(100, Math.round(
    (totalVotes * 2) +
    (maxStreak * 3) +
    (goalsCompleted * 10) +
    (journalStreak * 2) +
    (totalWords / 10)
  ));

  // Phase calculation
  const phase = identityScore < 30 ? 'Awareness' : identityScore < 60 ? 'Recoding' : 'Integration';
  const phaseColor = identityScore < 30 
    ? 'from-amber-500 to-orange-500' 
    : identityScore < 60 
      ? 'from-violet-500 to-purple-500' 
      : 'from-emerald-500 to-teal-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
            Your Transformation Journey
          </Badge>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Progress Dashboard
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
                <p className="text-slate-500">Phase: {phase}</p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  {identityScore}
                </p>
                <p className="text-sm text-slate-500">out of 100</p>
              </div>
            </div>
            <Progress value={identityScore} className="h-3" />
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
                  <p className="text-xl font-bold text-emerald-700">{maxStreak}</p>
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
                  <p className="text-xl font-bold text-violet-700">{totalVotes}</p>
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
                  <p className="text-xl font-bold text-amber-700">{goalsCompleted}</p>
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
                  <p className="text-xl font-bold text-rose-700">{totalWords}</p>
                  <p className="text-xs text-rose-600">Words Written</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/apps/habit-tracker">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer h-full group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-teal-500 transition-colors" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Habits</h3>
                <p className="text-sm text-slate-500 mb-3">Build your identity through daily actions</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{completedToday}/{habits.length} today</span>
                  {completedToday === habits.length && habits.length > 0 && (
                    <Badge className="bg-emerald-500 text-white text-xs">All done!</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/apps/goal-system">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer h-full group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white">
                    <Target className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-violet-500 transition-colors" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Goals</h3>
                <p className="text-sm text-slate-500 mb-3">Transform through meaningful objectives</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{goalsInProgress} in progress</span>
                  <Badge variant="secondary" className="text-xs">{avgGoalProgress}% avg</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/apps/journal-system">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer h-full group">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 text-white">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-rose-500 transition-colors" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">Journal</h3>
                <p className="text-sm text-slate-500 mb-3">Reflect and discover your true self</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{journalStreak} day streak</span>
                  <Badge variant="secondary" className="text-xs">{journalEntries.length} entries</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Weekly Progress */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                const isActive = i < (new Date().getDay() || 7);
                const isToday = i === ((new Date().getDay() + 6) % 7);
                
                return (
                  <div key={i} className="text-center">
                    <p className="text-xs text-slate-500 mb-2">{day}</p>
                    <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${
                      isToday 
                        ? 'bg-indigo-500 text-white ring-4 ring-indigo-200' 
                        : isActive 
                          ? 'bg-indigo-100 text-indigo-600' 
                          : 'bg-slate-100 text-slate-400'
                    }`}>
                      {isActive ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

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
              {[
                { name: 'First Step', desc: 'Complete first habit', unlocked: totalVotes > 0, icon: <Zap className="h-6 w-6" /> },
                { name: 'Week Warrior', desc: '7 day streak', unlocked: maxStreak >= 7, icon: <Flame className="h-6 w-6" /> },
                { name: 'Goal Getter', desc: 'Complete a goal', unlocked: goalsCompleted > 0, icon: <Target className="h-6 w-6" /> },
                { name: 'Writer', desc: 'Write 1000 words', unlocked: totalWords >= 1000, icon: <BookOpen className="h-6 w-6" /> },
                { name: 'Identity Builder', desc: '50 identity votes', unlocked: totalVotes >= 50, icon: <Star className="h-6 w-6" /> },
                { name: 'Month Master', desc: '30 day streak', unlocked: maxStreak >= 30, icon: <Award className="h-6 w-6" /> },
                { name: 'Author', desc: 'Write 5000 words', unlocked: totalWords >= 5000, icon: <Heart className="h-6 w-6" /> },
                { name: 'Transformer', desc: 'Score 60+', unlocked: identityScore >= 60, icon: <Brain className="h-6 w-6" /> },
              ].map((badge, i) => (
                <div 
                  key={i}
                  className={`p-4 rounded-xl text-center transition-all ${
                    badge.unlocked 
                      ? 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200' 
                      : 'bg-slate-50 opacity-50'
                  }`}
                >
                  <div className={`mx-auto w-fit p-2 rounded-full mb-2 ${
                    badge.unlocked ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {badge.icon}
                  </div>
                  <p className={`font-medium text-sm ${badge.unlocked ? 'text-amber-700' : 'text-slate-400'}`}>
                    {badge.name}
                  </p>
                  <p className="text-xs text-slate-500">{badge.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quote */}
        <Card className="border-0 shadow-lg mt-8 bg-gradient-to-r from-indigo-500 to-violet-600 text-white">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-medium mb-2">
              "The only way to do great work is to love what you do."
            </p>
            <p className="text-sm text-indigo-200">— Steve Jobs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
