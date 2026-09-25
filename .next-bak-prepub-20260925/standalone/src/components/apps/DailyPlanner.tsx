'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';

interface DailyEntry {
  day: number;
  date: string;
  identityPrompt: string;
  nonNegotiables: string[];
  evidence: string[];
  completed: boolean;
  notes: string;
}

interface DailyPlannerProps {
  days?: number;
}

// Helper functions defined outside component to avoid hoisting issues
function getDailyPrompt(day: number): string {
  const prompts = [
    'What would someone with my target identity do first each morning?',
    'How does my target identity respond to unexpected challenges?',
    'What decision standards does my target identity maintain?',
    'How does my target identity allocate focused work time?',
    'What language patterns characterize my target identity?',
    'How does my target identity handle emotional discomfort?',
    'What environmental cues support my target identity?',
    'How does my target identity approach learning and growth?',
    'What boundaries does my target identity maintain?',
    'How does my target identity measure progress?',
    'What rituals reinforce my target identity daily?',
    'How does my target identity handle failure or setbacks?',
    'What communication patterns define my target identity?',
    'How does my target identity maintain energy and focus?',
    'What relationships support my target identity?',
    'How does my target identity make difficult decisions?',
    'What standards does my target identity never compromise?',
    'How does my target identity handle success and recognition?',
    'What daily habits are non-negotiable for my target identity?',
    'How does my target identity manage stress and pressure?',
    "What values guide my target identity's actions?",
    'How does my target identity maintain consistency?',
    'What prevents my target identity from distraction?',
    'How does my target identity ensure continuous improvement?',
    "What systems support my target identity's operations?",
    'How does my target identity balance different life areas?',
    'What motivates my target identity internally?',
    'How does my target identity handle criticism?',
    'What legacy does my target identity build daily?',
    'How has my target identity transformed through this process?',
  ];
  return prompts[(day - 1) % prompts.length];
}

function getDailyNonNegotiables(day: number): string[] {
  const actions = [
    [
      'Morning identity alignment (15 min)',
      'First focused work block (90 min)',
      'Evidence logging (evening)',
    ],
    [
      'Review identity standards',
      'Execute priority task',
      'Document 3 evidence points',
    ],
    [
      'Visualize target identity',
      'Complete scheduled actions',
      'Review decision quality',
    ],
    [
      'Align environment with identity',
      'Deep work session',
      'Track emotional state',
    ],
    [
      'Practice identity language',
      'Execute non-negotiable tasks',
      'Record behavioral evidence',
    ],
    [
      'Morning planning session',
      'Focus block without interruption',
      'Evening reflection',
    ],
    [
      'Environmental optimization',
      'Skill development session',
      'Progress assessment',
    ],
    [
      'Identity reinforcement ritual',
      'Strategic work block',
      'System calibration',
    ],
    [
      'Boundary enforcement practice',
      'Priority execution',
      'Evidence collection',
    ],
    ['Progress measurement', 'Identity-based decisions', 'System review'],
  ];
  return actions[(day - 1) % actions.length];
}

function createInitialEntries(days: number): DailyEntry[] {
  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      day: i + 1,
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      identityPrompt: getDailyPrompt(i + 1),
      nonNegotiables: getDailyNonNegotiables(i + 1),
      evidence: [],
      completed: false,
      notes: '',
    };
  });
}

const DailyPlanner: React.FC<DailyPlannerProps> = ({ days = 30 }) => {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [entries, setEntries] = useState<DailyEntry[]>(() => createInitialEntries(days));
  const [newEvidence, setNewEvidence] = useState<string>('');

  const currentEntry = entries.find((entry) => entry.day === currentDay) || entries[0];

  const completedDays = entries.filter((entry) => entry.completed).length;
  const progressPercentage = (completedDays / days) * 100;

  const handleToggleComplete = (day: number) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.day === day ? { ...entry, completed: !entry.completed } : entry
      )
    );
  };

  const handleAddEvidence = (day: number, evidence: string) => {
    if (!evidence.trim()) return;
    setEntries((prev) =>
      prev.map((entry) =>
        entry.day === day
          ? { ...entry, evidence: [...entry.evidence, evidence] }
          : entry
      )
    );
  };

  const handleUpdateNotes = (day: number, notes: string) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.day === day ? { ...entry, notes } : entry))
    );
  };

  return (
    <Card className="bg-[#0F1C2E] border-0">
      <CardContent className="p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-[#1F6F78]/30">
          <div>
            <h2 className="text-2xl font-bold text-[#3DD4B0] mb-1">Daily Planner</h2>
            <p className="text-[#8A94A6] text-sm">
              Day {currentDay} of {days} • {currentEntry.date}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="bg-[#1F6F78] text-white hover:bg-[#1a5a62] font-semibold px-4 py-2"
              onClick={() => setCurrentDay((prev) => Math.max(1, prev - 1))}
            >
              ← Previous
            </Button>

            <select
              value={currentDay}
              onChange={(e) => setCurrentDay(Number(e.target.value))}
              className="bg-[#0F1C2E] border border-[#3DD4B0] text-white rounded-md px-4 py-2.5 text-sm font-medium"
            >
              {entries.map((entry) => (
                <option key={entry.day} value={entry.day}>
                  Day {entry.day}: {entry.date}
                </option>
              ))}
            </select>

            <Button
              className="bg-[#1F6F78] text-white hover:bg-[#1a5a62] font-semibold px-4 py-2"
              onClick={() => setCurrentDay((prev) => Math.min(days, prev + 1))}
            >
              Next →
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Identity Prompt */}
            <Card className="bg-[#1A2A42] border-[#1F6F78]/20">
              <CardHeader>
                <CardTitle className="text-[#8A94A6] text-lg">Identity Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white text-lg italic leading-relaxed mb-6">
                  {currentEntry.identityPrompt}
                </p>
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={currentEntry.completed}
                    onCheckedChange={() => handleToggleComplete(currentDay)}
                    className="border-[#1F6F78] data-[state=checked]:bg-[#3DD4B0] data-[state=checked]:border-[#3DD4B0]"
                  />
                  <span className="text-[#8A94A6] text-sm">Mark day as completed</span>
                </div>
              </CardContent>
            </Card>

            {/* Non-Negotiable Actions */}
            <Card className="bg-[#1A2A42] border-[#1F6F78]/20">
              <CardHeader>
                <CardTitle className="text-[#8A94A6] text-lg">Non-Negotiable Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {currentEntry.nonNegotiables.map((action, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Checkbox className="border-[#1F6F78] data-[state=checked]:bg-[#3DD4B0] data-[state=checked]:border-[#3DD4B0] mt-0.5" />
                      <span className="text-white">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Evidence Log */}
            <Card className="bg-[#1A2A42] border-[#1F6F78]/20">
              <CardHeader>
                <CardTitle className="text-[#8A94A6] text-lg">Evidence Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {currentEntry.evidence.map((evidence, index) => (
                    <div
                      key={index}
                      className="bg-[#0F1C2E] p-3 rounded-md text-white text-sm border-l-4 border-[#3DD4B0]"
                    >
                      {evidence}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add new evidence (factual, not emotional)..."
                    className="bg-[#0F1C2E] border-[#1F6F78]/30 text-white placeholder:text-[#8A94A6]"
                    value={newEvidence}
                    onChange={(e) => setNewEvidence(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newEvidence.trim()) {
                        handleAddEvidence(currentDay, newEvidence.trim());
                        setNewEvidence('');
                      }
                    }}
                  />
                  <Button
                    className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                    onClick={() => {
                      if (newEvidence.trim()) {
                        handleAddEvidence(currentDay, newEvidence.trim());
                        setNewEvidence('');
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Daily Notes */}
            <Card className="bg-[#1A2A42] border-[#1F6F78]/20">
              <CardHeader>
                <CardTitle className="text-[#8A94A6] text-lg">Daily Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Record insights, observations, or adjustments..."
                  className="bg-[#0F1C2E] border-[#1F6F78]/30 text-white placeholder:text-[#8A94A6] min-h-[120px]"
                  value={currentEntry.notes}
                  onChange={(e) => handleUpdateNotes(currentDay, e.target.value)}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-8 p-6 bg-[#1A2A42] rounded-lg">
          <h3 className="text-[#8A94A6] text-lg mb-4">30-Day Progress</h3>
          
          <Progress 
            value={progressPercentage} 
            className="h-2 bg-[#0F1C2E] [&>div]:bg-[#3DD4B0]" 
          />

          <div className="flex justify-between mt-4 text-[#8A94A6] text-sm">
            <div>Completed: {completedDays} / {days} days</div>
            <div>Progress: {Math.round(progressPercentage)}%</div>
            <div>
              Evidence Collected:{' '}
              {entries.reduce((sum, entry) => sum + entry.evidence.length, 0)} points
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyPlanner;
