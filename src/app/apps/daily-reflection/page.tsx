'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, 
  ArrowRight, 
  RotateCcw,
  Download,
  Calendar,
  RefreshCw,
  BookOpen,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const reflectionPrompts = [
  {
    theme: 'Self-Awareness',
    prompts: [
      'What would someone with my target identity do first each morning?',
      'How did my actions today reflect who I want to become?',
      'What did I learn about myself today?',
      'When did I feel most aligned with my values today?',
      'What decision am I most proud of today, and why?'
    ]
  },
  {
    theme: 'Identity Shift',
    prompts: [
      'How does my target identity respond to unexpected challenges?',
      'What evidence did I collect today that supports my new identity?',
      'What old pattern did I notice and choose differently today?',
      'How would the person I want to become handle this situation?',
      'What identity belief did I challenge today?'
    ]
  },
  {
    theme: 'Growth Mindset',
    prompts: [
      'What challenge today was actually an opportunity in disguise?',
      'How did I step outside my comfort zone today?',
      'What would I do differently if I knew I could not fail?',
      'What skill or knowledge did I develop today?',
      'How did I respond to a setback or difficulty?'
    ]
  },
  {
    theme: 'Values Alignment',
    prompts: [
      'Did my actions today match my stated values? Where was the gap?',
      'What value did I honor most today?',
      'When did I feel a conflict between my values and my actions?',
      'What boundary did I maintain (or need to maintain) today?',
      'How did I express my core values through my behavior?'
    ]
  },
  {
    theme: 'Emotional Intelligence',
    prompts: [
      'What emotion surprised me today? What triggered it?',
      'How did I regulate my emotions when faced with a challenge?',
      'What underlying need was I trying to meet with my behavior?',
      'How did my emotional state affect my decisions today?',
      'What would I tell a friend who felt the way I did today?'
    ]
  },
  {
    theme: 'Environmental Design',
    prompts: [
      'What in my environment helped or hindered my progress today?',
      'How can I redesign my environment to make tomorrow easier?',
      'What friction points did I encounter, and how can I remove them?',
      'What cue triggered a positive habit today?',
      'How did the people around me influence my behavior?'
    ]
  },
  {
    theme: 'Future Self',
    prompts: [
      'What would my future self thank me for doing today?',
      'If I continued today\'s patterns for a year, where would I be?',
      'What small action today moved me closer to my vision?',
      'What does my ideal tomorrow look like?',
      'What habit would my future self want me to start today?'
    ]
  }
];

// Function to get today's prompt based on date
function getTodaysPrompt() {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const totalPrompts = reflectionPrompts.reduce((sum, cat) => sum + cat.prompts.length, 0);
  
  let promptIndex = dayOfYear % totalPrompts;
  let currentCount = 0;
  
  for (const category of reflectionPrompts) {
    if (promptIndex < currentCount + category.prompts.length) {
      const localIndex = promptIndex - currentCount;
      return {
        prompt: category.prompts[localIndex],
        theme: category.theme
      };
    }
    currentCount += category.prompts.length;
  }
  
  return { prompt: reflectionPrompts[0].prompts[0], theme: reflectionPrompts[0].theme };
}

// Function to get random prompt
function getRandomPrompt() {
  const category = reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)];
  const prompt = category.prompts[Math.floor(Math.random() * category.prompts.length)];
  return { prompt, theme: category.theme };
}

export default function DailyReflectionPage() {
  const [currentPrompt, setCurrentPrompt] = useState<{ prompt: string; theme: string } | null>(() => getTodaysPrompt());
  const [reflection, setReflection] = useState('');
  const [pastReflections, setPastReflections] = useState<{ date: string; prompt: string; reflection: string; theme: string }[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('daily-reflections');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [showHistory, setShowHistory] = useState(false);
  const [saveConfirmation, setSaveConfirmation] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Save to localStorage when pastReflections changes
    localStorage.setItem('daily-reflections', JSON.stringify(pastReflections));
  }, [pastReflections]);

  const handleNewPrompt = () => {
    setCurrentPrompt(getRandomPrompt());
    setReflection('');
  };

  const handleTodaysPrompt = () => {
    setCurrentPrompt(getTodaysPrompt());
  };

  const handleSaveReflection = () => {
    if (!reflection.trim() || !currentPrompt) return;
    
    const newReflection = {
      date: new Date().toISOString(),
      prompt: currentPrompt.prompt,
      reflection: reflection,
      theme: currentPrompt.theme
    };
    
    const updated = [newReflection, ...pastReflections].slice(0, 30); // Keep last 30
    setPastReflections(updated);
    localStorage.setItem('daily-reflections', JSON.stringify(updated));
    
    // Show visual confirmation
    setSaveConfirmation(true);
    toast({
      title: '✅ Reflection Saved!',
      description: 'Your reflection has been saved successfully. Keep building your identity!',
      duration: 3000,
    });
    setTimeout(() => setSaveConfirmation(false), 3000);
    
    // Clear for next entry
    setReflection('');
    setCurrentPrompt(getRandomPrompt());
  };

  const themeColors: Record<string, string> = {
    'Self-Awareness': '#3DD4B0',
    'Identity Shift': '#1F6F78',
    'Growth Mindset': '#64B5F6',
    'Values Alignment': '#E57373',
    'Emotional Intelligence': '#BA68C8',
    'Environmental Design': '#FFB74D',
    'Future Self': '#81C784'
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
              <div className="w-10 h-10 rounded-xl bg-[#FFB74D]/20 flex items-center justify-center">
                <Sun className="w-5 h-5 text-[#FFB74D]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Daily Reflection Prompt</h1>
                <p className="text-slate-400 text-sm">FREE • Daily identity-focused reflection</p>
              </div>
            </div>
            <Button
              onClick={() => setShowHistory(!showHistory)}
              variant="accent"
              className="shadow-md"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {showHistory ? 'Today\'s Prompt' : 'History'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Save Confirmation Banner */}
        {saveConfirmation && (
          <div className="mb-6 bg-[#3DD4B0]/20 border border-[#3DD4B0]/50 rounded-xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 className="w-6 h-6 text-[#3DD4B0] flex-shrink-0" />
            <div>
              <p className="text-white font-semibold">Reflection Saved Successfully!</p>
              <p className="text-slate-300 text-sm">Your reflection has been saved locally. Keep building your identity!</p>
            </div>
          </div>
        )}
        {showHistory ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">Reflection History</h2>
            
            {pastReflections.length > 0 ? (
              <div className="space-y-4">
                {pastReflections.map((entry, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge style={{ backgroundColor: `${themeColors[entry.theme]}20`, color: themeColors[entry.theme] }}>
                          {entry.theme}
                        </Badge>
                        <span className="text-sm text-[#8A94A6]">
                          {new Date(entry.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <p className="text-[#0F1C2E] font-medium mb-3 italic">"{entry.prompt}"</p>
                      <p className="text-[#2B2E34]">{entry.reflection}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-[#8A94A6] mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">No reflections yet</h3>
                  <p className="text-slate-400">Start reflecting to build your history.</p>
                </CardContent>
              </Card>
            )}
            
            <Button
              onClick={() => {
                const data = { reflections: pastReflections };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `reflections-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
              }}
              className="mt-6 bg-[#1F6F78] text-white hover:bg-[#1a5a62]"
              disabled={pastReflections.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Reflections
            </Button>
          </>
        ) : (
          <>
            {/* Today's Prompt Card */}
            {currentPrompt && (
              <Card className="bg-white mb-6">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <Badge 
                      className="font-medium"
                      style={{ backgroundColor: `${themeColors[currentPrompt.theme]}20`, color: themeColors[currentPrompt.theme] }}
                    >
                      <Lightbulb className="w-3 h-3 mr-1" />
                      {currentPrompt.theme}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleTodaysPrompt}
                        variant="outline"
                        size="sm"
                        title="Today's assigned prompt"
                      >
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={handleNewPrompt}
                        variant="outline"
                        size="sm"
                        title="Get random prompt"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#0F1C2E] leading-relaxed mb-6">
                    {currentPrompt.prompt}
                  </h2>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-[#8A94A6]">Take a moment to reflect deeply on this question.</p>
                    <p className="text-xs text-[#8A94A6]">Your reflection is saved locally on your device.</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reflection Input */}
            <Card className="bg-white/10 border-white/20 mb-6">
              <CardContent className="p-6">
                <label className="text-sm font-medium text-white mb-2 block">
                  Your Reflection
                </label>
                <Textarea
                  placeholder="Write your thoughts here... Be honest with yourself. This is for your growth."
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="min-h-[200px] bg-white border-white/20 text-[#0F1C2E] placeholder:text-[#8A94A6]"
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-slate-400">{reflection.length} characters</span>
                  <Button
                    onClick={handleSaveReflection}
                    disabled={!reflection.trim()}
                    className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
                  >
                    Save Reflection
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-[#0F1C2E] border-[#1F6F78]/30">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">Your Reflection Stats</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-[#3DD4B0]">{pastReflections.length}</div>
                    <div className="text-xs text-slate-400">Total Reflections</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#3DD4B0]">
                      {pastReflections.filter(r => 
                        new Date(r.date).toDateString() === new Date().toDateString()
                      ).length}
                    </div>
                    <div className="text-xs text-slate-400">Today</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#3DD4B0]">
                      {new Set(pastReflections.map(r => r.theme)).size}
                    </div>
                    <div className="text-xs text-slate-400">Themes Explored</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
