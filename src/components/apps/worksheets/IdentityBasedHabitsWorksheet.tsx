'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Target, 
  Vote, 
  Trophy, 
  Calendar,
  ArrowRight,
  Download,
  RotateCcw,
  CheckCircle2,
  Plus,
  Trash2,
  Sparkles,
  Zap,
  Star
} from 'lucide-react';

interface IdentityStatement {
  id: string;
  statement: string;
  category: string;
}

interface HabitVote {
  id: string;
  habit: string;
  identityStatement: string;
  votes: number;
  targetVotes: number;
  completed: boolean;
  category: 'tiny' | 'small' | 'medium' | 'large';
}

interface DailyVote {
  date: string;
  habitId: string;
  completed: boolean;
  notes: string;
}

const categories = [
  { id: 'health', name: 'Health & Fitness', color: '#3DD4B0' },
  { id: 'career', name: 'Career & Work', color: '#1F6F78' },
  { id: 'relationships', name: 'Relationships', color: '#E57373' },
  { id: 'growth', name: 'Personal Growth', color: '#64B5F6' },
  { id: 'creativity', name: 'Creativity', color: '#BA68C8' },
  { id: 'mindfulness', name: 'Mindfulness', color: '#FFB74D' }
];

const habitSizes = [
  { id: 'tiny', name: 'Tiny (2 min)', description: 'Quick wins that take less than 2 minutes', votes: 1 },
  { id: 'small', name: 'Small (5-15 min)', description: 'Brief but meaningful actions', votes: 2 },
  { id: 'medium', name: 'Medium (15-30 min)', description: 'Substantial daily practice', votes: 3 },
  { id: 'large', name: 'Large (30+ min)', description: 'Major commitment actions', votes: 5 }
];

const identityPrompts = [
  'What type of person do you want to become?',
  'What would someone with your target identity do every day?',
  'What habits would be automatic for your ideal self?',
  'What does your target identity NOT do?',
  'How would your target identity handle setbacks?'
];

export default function IdentityBasedHabitsWorksheet() {
  const [step, setStep] = useState<'identity' | 'habits' | 'voting' | 'results'>('identity');
  const [identityStatements, setIdentityStatements] = useState<IdentityStatement[]>([]);
  const [habitVotes, setHabitVotes] = useState<HabitVote[]>([]);
  const [dailyVotes, setDailyVotes] = useState<DailyVote[]>([]);
  
  const [newStatement, setNewStatement] = useState('');
  const [newStatementCategory, setNewStatementCategory] = useState('growth');
  const [newHabit, setNewHabit] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('tiny');
  const [newHabitIdentity, setNewHabitIdentity] = useState('');

  // Identity Statements Management
  const handleAddStatement = () => {
    if (!newStatement.trim()) return;
    setIdentityStatements([...identityStatements, {
      id: Date.now().toString(),
      statement: newStatement,
      category: newStatementCategory
    }]);
    setNewStatement('');
  };

  const handleRemoveStatement = (id: string) => {
    setIdentityStatements(identityStatements.filter(s => s.id !== id));
  };

  // Habits Management
  const handleAddHabit = () => {
    if (!newHabit.trim() || !newHabitIdentity.trim()) return;
    const size = habitSizes.find(s => s.id === newHabitCategory);
    setHabitVotes([...habitVotes, {
      id: Date.now().toString(),
      habit: newHabit,
      identityStatement: newHabitIdentity,
      votes: 0,
      targetVotes: 30, // 30 votes to establish habit
      completed: false,
      category: newHabitCategory as 'tiny' | 'small' | 'medium' | 'large'
    }]);
    setNewHabit('');
    setNewHabitIdentity('');
  };

  const handleRemoveHabit = (id: string) => {
    setHabitVotes(habitVotes.filter(h => h.id !== id));
  };

  const handleVote = (habitId: string) => {
    setHabitVotes(habitVotes.map(h => 
      h.id === habitId 
        ? { ...h, votes: h.votes + 1, completed: h.votes + 1 >= h.targetVotes }
        : h
    ));
    
    setDailyVotes([...dailyVotes, {
      date: new Date().toISOString(),
      habitId,
      completed: true,
      notes: ''
    }]);
  };

  const getHabitProgress = (habit: HabitVote) => {
    return Math.min((habit.votes / habit.targetVotes) * 100, 100);
  };

  const getTotalVotes = () => habitVotes.reduce((sum, h) => sum + h.votes, 0);
  const getCompletedHabits = () => habitVotes.filter(h => h.completed).length;

  const handleReset = () => {
    setStep('identity');
    setIdentityStatements([]);
    setHabitVotes([]);
    setDailyVotes([]);
  };

  // Render based on step
  if (step === 'results') {
    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-6">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-[#0F1C2E] mb-2">
            Identity-Based Habits Dashboard
          </h2>
          <p className="text-[#8A94A6]">Track your votes for your new identity</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[#0F1C2E]">
            <CardContent className="p-4 text-center">
              <Vote className="w-6 h-6 text-[#3DD4B0] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#3DD4B0]">{getTotalVotes()}</div>
              <div className="text-[#8A94A6] text-xs">Total Votes</div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 text-[#1F6F78] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#0F1C2E]">{habitVotes.length}</div>
              <div className="text-[#8A94A6] text-xs">Active Habits</div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#0F1C2E]">{getCompletedHabits()}</div>
              <div className="text-[#8A94A6] text-xs">Established</div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-[#FFB74D] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#0F1C2E]">{identityStatements.length}</div>
              <div className="text-[#8A94A6] text-xs">Identity Statements</div>
            </CardContent>
          </Card>
        </div>

        {/* Habit Voting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habitVotes.map((habit) => {
            const size = habitSizes.find(s => s.id === habit.category);
            return (
              <Card 
                key={habit.id} 
                className={`border-2 ${habit.completed ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">{size?.name}</Badge>
                        {habit.completed && (
                          <Badge className="bg-green-500 text-white text-xs">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Established
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-semibold text-[#0F1C2E]">{habit.habit}</h4>
                      <p className="text-xs text-[#8A94A6] italic">"I am someone who {habit.identityStatement}"</p>
                    </div>
                    <Button
                      onClick={() => handleVote(habit.id)}
                      disabled={habit.completed}
                      className={`ml-2 ${habit.completed ? 'bg-gray-200 text-gray-500' : 'bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]'}`}
                      size="sm"
                    >
                      <Vote className="w-4 h-4 mr-1" />
                      Vote
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8A94A6]">{habit.votes}/{habit.targetVotes} votes</span>
                      <span className="text-[#8A94A6]">{Math.round(getHabitProgress(habit))}%</span>
                    </div>
                    <Progress value={getHabitProgress(habit)} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add New Habit */}
        <Card className="border-2 border-dashed border-[#3DD4B0]">
          <CardHeader>
            <CardTitle className="text-lg text-[#0F1C2E]">Add New Identity Vote</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="text-sm font-medium text-[#2B2E34] mb-1 block">Habit Size</label>
                <select
                  value={newHabitCategory}
                  onChange={(e) => setNewHabitCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  {habitSizes.map(size => (
                    <option key={size.id} value={size.id}>{size.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-[#2B2E34] mb-1 block">Habit Action</label>
                <Input
                  placeholder="e.g., Read for 10 minutes"
                  value={newHabit}
                  onChange={(e) => setNewHabit(e.target.value)}
                  className="border-gray-200"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[#2B2E34] mb-1 block">Identity Statement (complete: "I am someone who...")</label>
              <div className="flex gap-2">
                <span className="text-[#8A94A6] py-2">I am someone who</span>
                <Input
                  placeholder="e.g., reads daily"
                  value={newHabitIdentity}
                  onChange={(e) => setNewHabitIdentity(e.target.value)}
                  className="flex-1 border-gray-200"
                />
              </div>
            </div>
            <Button onClick={handleAddHabit} className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
              <Plus className="w-4 h-4 mr-2" />
              Add Habit Vote
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={handleReset} variant="outline" className="border-gray-200">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset All
          </Button>
          <Button 
            onClick={() => {
              const data = {
                date: new Date().toISOString(),
                identityStatements,
                habitVotes,
                dailyVotes,
                stats: {
                  totalVotes: getTotalVotes(),
                  completedHabits: getCompletedHabits()
                }
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `identity-habits-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
            }}
            className="bg-[#0F1C2E] text-white hover:bg-[#1a2d47]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2">
        {['identity', 'habits', 'voting'].map((s, i) => (
          <React.Fragment key={s}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s 
                  ? 'bg-[#3DD4B0] text-[#0F1C2E]' 
                  : i < ['identity', 'habits', 'voting'].indexOf(step)
                    ? 'bg-[#0F1C2E] text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {i + 1}
            </div>
            {i < 2 && <div className={`w-12 h-1 ${i < ['identity', 'habits', 'voting'].indexOf(step) ? 'bg-[#0F1C2E]' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      {step === 'identity' && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1F6F78] flex items-center justify-center text-white">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl text-[#0F1C2E]">Define Your Identity</CardTitle>
                <CardDescription>Start with who you want to become</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-[#F6F8FA] rounded-lg">
              <p className="text-[#8A94A6] text-sm mb-4">
                Based on James Clear's Atomic Habits: Every action you take is a vote for the type of person you wish to become.
              </p>
              <div className="space-y-2">
                {identityPrompts.map((prompt, i) => (
                  <p key={i} className="text-sm text-[#2B2E34] flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#3DD4B0] mt-0.5 flex-shrink-0" />
                    {prompt}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-[#2B2E34]">Your Identity Statements</label>
              <p className="text-xs text-[#8A94A6]">Complete: "I am someone who..."</p>
              
              {identityStatements.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {identityStatements.map((stmt) => {
                    const cat = categories.find(c => c.id === stmt.category);
                    return (
                      <Badge 
                        key={stmt.id}
                        className="py-2 px-3"
                        style={{ backgroundColor: `${cat?.color}20`, color: cat?.color }}
                      >
                        I am someone who {stmt.statement}
                        <button onClick={() => handleRemoveStatement(stmt.id)} className="ml-2 opacity-60 hover:opacity-100">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              )}

              <div className="flex gap-2">
                <span className="text-[#8A94A6] py-2 whitespace-nowrap">I am someone who</span>
                <Input
                  placeholder="e.g., exercises daily"
                  value={newStatement}
                  onChange={(e) => setNewStatement(e.target.value)}
                  className="flex-1 border-gray-200"
                />
                <select
                  value={newStatementCategory}
                  onChange={(e) => setNewStatementCategory(e.target.value)}
                  className="px-3 border border-gray-200 rounded-lg"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <Button onClick={handleAddStatement} className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button 
              onClick={() => setStep('habits')} 
              disabled={identityStatements.length < 1}
              className="w-full bg-[#0F1C2E] text-white hover:bg-[#1a2d47] disabled:opacity-50"
            >
              Continue to Habits
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'habits' && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#3DD4B0] flex items-center justify-center text-[#0F1C2E]">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl text-[#0F1C2E]">Create Habit Votes</CardTitle>
                <CardDescription>Each habit is a vote for your new identity</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {habitSizes.map((size) => (
                <div key={size.id} className="p-3 bg-[#F6F8FA] rounded-lg">
                  <h4 className="font-medium text-[#0F1C2E]">{size.name}</h4>
                  <p className="text-xs text-[#8A94A6]">{size.description}</p>
                  <Badge variant="outline" className="mt-2 text-xs">+{size.votes} votes</Badge>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-[#2B2E34]">Add Your Habits</label>
              
              {habitVotes.length > 0 && (
                <div className="space-y-2 mb-4">
                  {habitVotes.map((habit) => (
                    <div key={habit.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <div>
                        <span className="font-medium text-[#0F1C2E]">{habit.habit}</span>
                        <p className="text-xs text-[#8A94A6]">"I am someone who {habit.identityStatement}"</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveHabit(habit.id)}
                        className="text-[#FC6D26] hover:text-[#E55A10]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#8A94A6]">Habit Size</label>
                    <select
                      value={newHabitCategory}
                      onChange={(e) => setNewHabitCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg mt-1"
                    >
                      {habitSizes.map(size => (
                        <option key={size.id} value={size.id}>{size.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#8A94A6]">Habit Action</label>
                    <Input
                      placeholder="e.g., Read for 10 minutes"
                      value={newHabit}
                      onChange={(e) => setNewHabit(e.target.value)}
                      className="mt-1 border-gray-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#8A94A6]">Identity Statement</label>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[#8A94A6] py-2 whitespace-nowrap">I am someone who</span>
                    <Input
                      placeholder="e.g., reads daily"
                      value={newHabitIdentity}
                      onChange={(e) => setNewHabitIdentity(e.target.value)}
                      className="flex-1 border-gray-200"
                    />
                  </div>
                </div>
                <Button onClick={handleAddHabit} className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Habit
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => setStep('identity')} 
                variant="outline"
                className="flex-1 border-gray-200"
              >
                ← Back
              </Button>
              <Button 
                onClick={() => setStep('voting')} 
                disabled={habitVotes.length < 1}
                className="flex-1 bg-[#0F1C2E] text-white hover:bg-[#1a2d47] disabled:opacity-50"
              >
                Start Voting
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 'voting' && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB74D] flex items-center justify-center text-[#0F1C2E]">
                <Vote className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-xl text-[#0F1C2E]">Cast Your First Votes</CardTitle>
                <CardDescription>Complete each habit once to start voting for your identity</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#8A94A6]">
              Each time you complete a habit, click "Vote" to cast a vote for your new identity. 
              Research shows it takes about 30 votes to establish a new identity-based habit.
            </p>
            
            <div className="space-y-3">
              {habitVotes.map((habit) => (
                <div 
                  key={habit.id} 
                  className="flex items-center justify-between p-4 bg-[#F6F8FA] rounded-lg"
                >
                  <div>
                    <span className="font-medium text-[#0F1C2E]">{habit.habit}</span>
                    <p className="text-xs text-[#8A94A6]">"I am someone who {habit.identityStatement}"</p>
                  </div>
                  <Button
                    onClick={() => handleVote(habit.id)}
                    className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                  >
                    <Vote className="w-4 h-4 mr-2" />
                    Vote (+1)
                  </Button>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => setStep('results')} 
              className="w-full bg-[#0F1C2E] text-white hover:bg-[#1a2d47]"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
