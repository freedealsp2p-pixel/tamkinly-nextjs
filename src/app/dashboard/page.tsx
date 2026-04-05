'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  Shield
} from 'lucide-react';
import { signOut } from 'next-auth/react';

// Demo data for when user is not logged in
const demoData = {
  identityScore: 58,
  phase: 'Recoding',
  currentStreak: 3,
  bestStreak: 7,
  totalVotes: 24,
  habitsCompleted: 12,
  wordsWritten: 1450,
  achievements: [
    { id: 'first-habit', name: 'First Step', description: 'Complete your first habit', unlocked: true },
    { id: 'week-streak', name: 'Week Warrior', description: '7-day streak', unlocked: false, progress: 43 },
  ],
  recentActivity: [
    { type: 'quiz', name: 'Identity Gap Assessment', date: 'Today', score: 58 },
    { type: 'habit', name: 'Morning Routine', date: 'Yesterday', completed: true },
    { type: 'journal', name: 'Day 15 Reflection', date: '2 days ago', words: 150 },
  ],
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(demoData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Still show dashboard with demo data
      setIsLoading(false);
    } else if (status === 'authenticated') {
      // Fetch real user data
      fetchUserData();
    }
  }, [status]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/progress');
      if (response.ok) {
        const userData = await response.json();
        setData({ ...demoData, ...userData });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

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
                {status === 'authenticated' ? 'Premium' : 'Free'}
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              {status === 'authenticated' ? (
                <>
                  <Link href="/settings">
                    <Button variant="ghost" size="icon">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link href="/auth/signin?callbackUrl=/dashboard">
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                    Sign In to Save Progress
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
                    Create a free account to save your progress
                  </h2>
                  <p className="text-slate-300">
                    Your quiz results and achievements will be saved permanently
                  </p>
                </div>
                <Link href="/auth/signup?callbackUrl=/dashboard">
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                    Create Free Account
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
              ? `Welcome back, ${session?.user?.name || 'there'}!`
              : 'Your Dashboard'
            }
          </h1>
          <p className="text-slate-600">
            Track your transformation journey and see your progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Identity Score', value: `${data.identityScore}%`, icon: Brain, color: '#3DD4B0' },
            { label: 'Current Streak', value: `${data.currentStreak} days`, icon: Flame, color: '#FFB74D' },
            { label: 'Total Votes', value: data.totalVotes, icon: CheckCircle2, color: '#1F6F78' },
            { label: 'Habits Done', value: data.habitsCompleted, icon: Target, color: '#64B5F6' },
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

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transformation Phase */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#0F1C2E]">Your Transformation Phase</h2>
                  <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0]">{data.phase}</Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Overall Progress</span>
                      <span className="font-semibold">{data.identityScore}%</span>
                    </div>
                    <Progress value={data.identityScore} className="h-3" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    {['Awareness', 'Recoding', 'Integration'].map((phase, idx) => (
                      <div key={phase} className={`text-center p-3 rounded-lg ${
                        phase === data.phase ? 'bg-[#3DD4B0]/10 border-2 border-[#3DD4B0]' : 'bg-slate-50'
                      }`}>
                        <div className="text-sm font-semibold text-[#0F1C2E]">{phase}</div>
                        <div className="text-xs text-slate-500">
                          {idx === 0 ? '0-29%' : idx === 1 ? '30-59%' : '60%+'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[#0F1C2E] mb-4">Continue Your Journey</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Identity Gap Quiz', icon: Brain, url: '/quiz', tier: 'FREE' },
                    { name: 'Daily Reflection', icon: BookOpen, url: '/apps/daily-reflection', tier: 'FREE' },
                    { name: 'Values Clarification', icon: Heart, url: '/apps/values-clarification', tier: 'FREE' },
                    { name: 'Progress Dashboard', icon: BarChart3, url: '/apps/progress-dashboard', tier: 'FREE' },
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
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[#0F1C2E] mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {data.recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                        {activity.type === 'quiz' && <Brain className="h-5 w-5 text-[#3DD4B0]" />}
                        {activity.type === 'habit' && <CheckCircle2 className="h-5 w-5 text-[#3DD4B0]" />}
                        {activity.type === 'journal' && <BookOpen className="h-5 w-5 text-[#3DD4B0]" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#0F1C2E]">{activity.name}</div>
                        <div className="text-sm text-slate-500">
                          {activity.date}
                          {activity.score && ` • Score: ${activity.score}%`}
                          {activity.words && ` • ${activity.words} words`}
                        </div>
                      </div>
                    </div>
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
                  <h2 className="text-xl font-bold text-[#0F1C2E]">Achievements</h2>
                  <Badge variant="outline">{data.achievements.filter(a => a.unlocked).length} / 20</Badge>
                </div>
                <div className="space-y-3">
                  {data.achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-3 rounded-lg ${achievement.unlocked ? 'bg-[#3DD4B0]/10' : 'bg-slate-50 opacity-60'}`}
                    >
                      <div className="flex items-center gap-2">
                        {achievement.unlocked ? (
                          <Star className="h-5 w-5 text-[#FFB74D] fill-current" />
                        ) : (
                          <Star className="h-5 w-5 text-slate-300" />
                        )}
                        <div className="font-semibold text-[#0F1C2E]">{achievement.name}</div>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{achievement.description}</p>
                      {!achievement.unlocked && achievement.progress && (
                        <Progress value={achievement.progress} className="h-1.5 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
                <Link href="/apps/progress-dashboard">
                  <Button variant="link" className="w-full mt-4">
                    View All Achievements
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upgrade Card */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78]">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-6 w-6 text-[#3DD4B0]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Unlock Full Potential</h3>
                  <p className="text-slate-300 text-sm mb-4">
                    Get access to all 15+ apps, AI coaching, and premium features
                  </p>
                  <Link href="/products">
                    <Button className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                      View Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-[#0F1C2E] mb-4">Quick Links</h3>
                <div className="space-y-2">
                  {[
                    { name: 'Take Assessment', url: '/quiz' },
                    { name: 'View All Apps', url: '/apps' },
                    { name: 'Products & Pricing', url: '/products' },
                    { name: 'Help & FAQ', url: '/faq' },
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
