'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  ArrowRight, 
  RotateCcw,
  Download,
  CheckCircle2,
  GripVertical,
  Star
} from 'lucide-react';

interface Value {
  id: string;
  name: string;
  description: string;
  category: string;
}

const valuesList: Value[] = [
  // Personal Growth
  { id: 'growth', name: 'Personal Growth', description: 'Continuous learning and self-improvement', category: 'Personal Growth' },
  { id: 'wisdom', name: 'Wisdom', description: 'Seeking knowledge and understanding', category: 'Personal Growth' },
  { id: 'creativity', name: 'Creativity', description: 'Expressing yourself through new ideas', category: 'Personal Growth' },
  { id: 'curiosity', name: 'Curiosity', description: 'Exploring and discovering new things', category: 'Personal Growth' },
  
  // Achievement
  { id: 'achievement', name: 'Achievement', description: 'Accomplishing goals and success', category: 'Achievement' },
  { id: 'ambition', name: 'Ambition', description: 'Striving for excellence and advancement', category: 'Achievement' },
  { id: 'competence', name: 'Competence', description: 'Being skilled and capable', category: 'Achievement' },
  { id: 'productivity', name: 'Productivity', description: 'Making effective use of time and resources', category: 'Achievement' },
  
  // Relationships
  { id: 'family', name: 'Family', description: 'Strong family bonds and relationships', category: 'Relationships' },
  { id: 'friendship', name: 'Friendship', description: 'Meaningful connections with friends', category: 'Relationships' },
  { id: 'love', name: 'Love', description: 'Deep emotional connections', category: 'Relationships' },
  { id: 'compassion', name: 'Compassion', description: 'Empathy and kindness toward others', category: 'Relationships' },
  
  // Integrity
  { id: 'honesty', name: 'Honesty', description: 'Truthfulness and authenticity', category: 'Integrity' },
  { id: 'integrity', name: 'Integrity', description: 'Living in alignment with principles', category: 'Integrity' },
  { id: 'justice', name: 'Justice', description: 'Fairness and equality', category: 'Integrity' },
  { id: 'responsibility', name: 'Responsibility', description: 'Being accountable for your actions', category: 'Integrity' },
  
  // Well-being
  { id: 'health', name: 'Health', description: 'Physical and mental well-being', category: 'Well-being' },
  { id: 'balance', name: 'Balance', description: 'Harmony between different life areas', category: 'Well-being' },
  { id: 'peace', name: 'Inner Peace', description: 'Calmness and serenity of mind', category: 'Well-being' },
  { id: 'freedom', name: 'Freedom', description: 'Independence and autonomy', category: 'Well-being' },
  
  // Contribution
  { id: 'service', name: 'Service', description: 'Helping others and contributing', category: 'Contribution' },
  { id: 'legacy', name: 'Legacy', description: 'Leaving a lasting positive impact', category: 'Contribution' },
  { id: 'community', name: 'Community', description: 'Building and supporting communities', category: 'Contribution' },
  { id: 'mentoring', name: 'Mentoring', description: 'Guiding and developing others', category: 'Contribution' },
];

const categoryColors: Record<string, string> = {
  'Personal Growth': '#3DD4B0',
  'Achievement': '#FFB74D',
  'Relationships': '#E57373',
  'Integrity': '#64B5F6',
  'Well-being': '#BA68C8',
  'Contribution': '#81C784'
};

export default function ValuesClarificationPage() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [topFive, setTopFive] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [step, setStep] = useState<'select' | 'rank'>('select');

  const handleSelectValue = (valueId: string) => {
    if (selectedValues.includes(valueId)) {
      setSelectedValues(selectedValues.filter(id => id !== valueId));
    } else if (selectedValues.length < 10) {
      setSelectedValues([...selectedValues, valueId]);
    }
  };

  const moveToRanking = () => {
    if (selectedValues.length >= 5) {
      setTopFive(selectedValues.slice(0, 5));
      setStep('rank');
    }
  };

  const moveValueUp = (index: number) => {
    if (index > 0) {
      const newTopFive = [...topFive];
      [newTopFive[index - 1], newTopFive[index]] = [newTopFive[index], newTopFive[index - 1]];
      setTopFive(newTopFive);
    }
  };

  const moveValueDown = (index: number) => {
    if (index < topFive.length - 1) {
      const newTopFive = [...topFive];
      [newTopFive[index], newTopFive[index + 1]] = [newTopFive[index + 1], newTopFive[index]];
      setTopFive(newTopFive);
    }
  };

  const handleComplete = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedValues([]);
    setTopFive([]);
    setShowResults(false);
    setStep('select');
  };

  const getValue = (id: string) => valuesList.find(v => v.id === id);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
        {/* Header */}
        <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
              ← Back to Apps
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-xl bg-[#E57373]/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#E57373]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Values Clarification Tool</h1>
                <p className="text-slate-400 text-sm">FREE • 5 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Your Top 5 Core Values</h2>
            <p className="text-slate-400">The values that define who you are and guide your decisions</p>
          </div>

          {/* Top 5 Values Display */}
          <div className="space-y-4 mb-8">
            {topFive.map((valueId, index) => {
              const value = getValue(valueId);
              if (!value) return null;
              return (
                <Card key={valueId} className="bg-white overflow-hidden">
                  <div 
                    className="h-2" 
                    style={{ backgroundColor: categoryColors[value.category] }}
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: categoryColors[value.category] }}
                      >
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#0F1C2E]">{value.name}</h3>
                        <p className="text-[#8A94A6]">{value.description}</p>
                        <Badge 
                          className="mt-2"
                          style={{ backgroundColor: `${categoryColors[value.category]}20`, color: categoryColors[value.category] }}
                        >
                          {value.category}
                        </Badge>
                      </div>
                      {index === 0 && (
                        <div className="text-right">
                          <Star className="w-6 h-6 text-[#FFB74D] fill-[#FFB74D]" />
                          <p className="text-xs text-[#8A94A6]">Core Value</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Reflection Questions */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E]">Reflection Questions</CardTitle>
              <CardDescription>Use these questions to deepen your understanding of your values</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                  <span className="text-[#2B2E34]">How do your daily actions reflect your top value?</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                  <span className="text-[#2B2E34]">When did you last make a decision that conflicted with these values?</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                  <span className="text-[#2B2E34]">What would your life look like if you fully embodied these values?</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                  <span className="text-[#2B2E34]">Which of these values needs more attention in your current life?</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-[#0F1C2E]">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-xl font-bold mb-2">Live Your Values Daily</h3>
              <p className="text-slate-400 mb-4">
                The Identity Recode System helps you align your actions with your core values every day.
              </p>
              <Link href="/products">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-8">
                  Start Your Transformation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={handleReset} variant="secondary" className="shadow-md">
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
            <Button 
              onClick={() => {
                const data = {
                  date: new Date().toISOString(),
                  topFiveValues: topFive.map((id, i) => {
                    const v = getValue(id);
                    return { rank: i + 1, ...v };
                  })
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `core-values-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
              }}
              className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            ← Back to Apps
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-xl bg-[#E57373]/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#E57373]" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Values Clarification Tool</h1>
              <p className="text-slate-400 text-sm">FREE • 5 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {step === 'select' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Step 1: Select Your Values</h2>
              <p className="text-slate-400">
                Choose 5-10 values that resonate most with you. You'll rank them in the next step.
              </p>
              <Badge className="mt-4 bg-[#3DD4B0]/10 text-[#3DD4B0]">
                Selected: {selectedValues.length}/10
              </Badge>
            </div>

            {/* Values Grid by Category */}
            <div className="space-y-6 mb-8">
              {Object.keys(categoryColors).map(category => {
                const categoryValues = valuesList.filter(v => v.category === category);
                return (
                  <div key={category}>
                    <h3 
                      className="text-sm font-semibold uppercase tracking-wide mb-3"
                      style={{ color: categoryColors[category] }}
                    >
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categoryValues.map(value => (
                        <button
                          key={value.id}
                          onClick={() => handleSelectValue(value.id)}
                          disabled={!selectedValues.includes(value.id) && selectedValues.length >= 10}
                          className={`p-4 rounded-xl text-left transition-all ${
                            selectedValues.includes(value.id)
                              ? 'ring-2'
                              : 'bg-white/5 hover:bg-white/10 disabled:opacity-50'
                          }`}
                          style={{
                            backgroundColor: selectedValues.includes(value.id) ? `${categoryColors[category]}20` : undefined,
                            borderColor: selectedValues.includes(value.id) ? categoryColors[category] : undefined,
                            ringColor: selectedValues.includes(value.id) ? categoryColors[category] : undefined
                          }}
                        >
                          <h4 className="font-semibold text-white mb-1">{value.name}</h4>
                          <p className="text-xs text-slate-400">{value.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Button */}
            <div className="text-center">
              <Button
                onClick={moveToRanking}
                disabled={selectedValues.length < 5}
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-8 disabled:opacity-50"
              >
                Continue to Ranking
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}

        {step === 'rank' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Step 2: Rank Your Top 5</h2>
              <p className="text-slate-400">
                Drag to reorder. Your top value should be at #1.
              </p>
            </div>

            {/* Ranking List */}
            <Card className="bg-white mb-8">
              <CardContent className="p-6">
                <div className="space-y-3">
                  {topFive.map((valueId, index) => {
                    const value = getValue(valueId);
                    if (!value) return null;
                    return (
                      <div 
                        key={valueId}
                        className="flex items-center gap-4 p-4 bg-[#F6F8FA] rounded-xl"
                      >
                        <GripVertical className="w-5 h-5 text-[#8A94A6] cursor-move" />
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: categoryColors[value.category] }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0F1C2E]">{value.name}</h4>
                          <p className="text-xs text-[#8A94A6]">{value.description}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveValueUp(index)}
                            disabled={index === 0}
                            className="h-6 w-6 p-0"
                          >
                            ↑
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveValueDown(index)}
                            disabled={index === topFive.length - 1}
                            className="h-6 w-6 p-0"
                          >
                            ↓
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setStep('select')}
                variant="secondary"
                className="shadow-md"
              >
                ← Back to Selection
              </Button>
              <Button
                onClick={handleComplete}
                variant="accent"
                className="font-semibold px-8 shadow-md"
              >
                Complete & See Results
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
