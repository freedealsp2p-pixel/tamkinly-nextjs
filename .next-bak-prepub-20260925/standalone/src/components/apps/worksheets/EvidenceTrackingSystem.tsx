'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Trophy, 
  Target, 
  CheckCircle2,
  Download,
  Plus,
  Trash2,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Star,
  BookOpen,
  Sparkles,
  Heart,
  Shield,
  Lightbulb,
  Layers,
  Compass,
  Zap,
  Eye,
  Edit3,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface DailyActionLog {
  id: string;
  date: string;
  plannedAction: string;
  actionCompleted: 'yes' | 'no' | '';
  whatWasDone?: string;
  whatPreventedIt?: string;
  timeStarted: string;
  timeFinished: string;
  qualityOfCompletion: number;
}

interface BehavioralEvidence {
  id: string;
  date: string;
  evidenceType: string;
  description: string;
  strengthScore: number;
}

interface WeeklySummary {
  week: number;
  summary: string;
}

interface ConsistencyMetrics {
  completedPlannedDays: number;
  returnedAfterMissed: number;
  actionsBecameRegular: number;
  neededLessEffort: number;
  behavedLikeIdentity: number;
  showedUpLowMotivation: number;
  trackedHonestly: number;
  trustConsistency: number;
}

interface TransformationMilestone {
  id: string;
  title: string;
  checked: boolean;
  dateAchieved?: string;
}

interface IdentityImplication {
  becomingWho: string;
  identityStrengthened: string;
  oldIdentityLosing: string;
  confidentConclusion: string;
}

interface WeeklyReview {
  strongestEvidence: string;
  weakestArea: string;
  followThroughPattern: string;
  adjustmentNextWeek: string;
  evidenceForConfidence: string;
}

const evidenceTypes = [
  { id: 'self-trust', name: 'Evidence of Self-Trust', icon: Heart, description: 'Proof that you trust yourself to follow through' },
  { id: 'commitment', name: 'Evidence of Commitment Consistency', icon: Shield, description: 'Actions that show you keep your word to yourself' },
  { id: 'emotional', name: 'Evidence of Emotional Regulation', icon: Sparkles, description: 'Moments of emotional control and awareness' },
  { id: 'decision', name: 'Evidence of Decision Quality', icon: Lightbulb, description: 'Choices aligned with your target identity' },
  { id: 'environment', name: 'Evidence of Environmental Discipline', icon: Layers, description: 'Control over your surroundings and context' },
  { id: 'value', name: 'Evidence of Value Congruence', icon: Compass, description: 'Actions matching your stated values' },
  { id: 'agency', name: 'Evidence of Agency', icon: Zap, description: 'Taking ownership and intentional action' },
  { id: 'identity', name: 'Evidence of Identity Alignment', icon: Eye, description: 'Behavior matching your desired identity' }
];

const defaultMilestones: TransformationMilestone[] = [
  { id: '1', title: 'First completed action', checked: false },
  { id: '2', title: 'First full week of consistency', checked: false },
  { id: '3', title: 'First recovery after a lapse', checked: false },
  { id: '4', title: 'First visible identity-aligned decision', checked: false },
  { id: '5', title: 'First environmental improvement', checked: false },
  { id: '6', title: 'First emotional regulation win', checked: false },
  { id: '7', title: 'First moment of self-trust', checked: false },
  { id: '8', title: 'First week with no major avoidance pattern', checked: false }
];

const consistencyQuestions = [
  { id: 'completedPlannedDays', question: 'I completed what I planned most days.' },
  { id: 'returnedAfterMissed', question: 'I returned after missed days.' },
  { id: 'actionsBecameRegular', question: 'My actions became more regular over time.' },
  { id: 'neededLessEffort', question: 'I needed less effort to stay on track.' },
  { id: 'behavedLikeIdentity', question: 'I behaved more like the identity I chose.' },
  { id: 'showedUpLowMotivation', question: 'I showed up even when motivation was low.' },
  { id: 'trackedHonestly', question: 'I tracked my behavior honestly.' },
  { id: 'trustConsistency', question: 'I can trust my consistency more than before.' }
];

export default function EvidenceTrackingSystem() {
  const [dailyLogs, setDailyLogs] = useState<DailyActionLog[]>([]);
  const [behavioralEvidence, setBehavioralEvidence] = useState<BehavioralEvidence[]>([]);
  const [weeklySummaries, setWeeklySummaries] = useState<WeeklySummary[]>([
    { week: 1, summary: '' },
    { week: 2, summary: '' },
    { week: 3, summary: '' },
    { week: 4, summary: '' }
  ]);
  const [consistencyMetrics, setConsistencyMetrics] = useState<ConsistencyMetrics>({
    completedPlannedDays: 5,
    returnedAfterMissed: 5,
    actionsBecameRegular: 5,
    neededLessEffort: 5,
    behavedLikeIdentity: 5,
    showedUpLowMotivation: 5,
    trackedHonestly: 5,
    trustConsistency: 5
  });
  const [milestones, setMilestones] = useState<TransformationMilestone[]>(defaultMilestones);
  const [identityImplication, setIdentityImplication] = useState<IdentityImplication>({
    becomingWho: '',
    identityStrengthened: '',
    oldIdentityLosing: '',
    confidentConclusion: ''
  });
  const [weeklyReview, setWeeklyReview] = useState<WeeklyReview>({
    strongestEvidence: '',
    weakestArea: '',
    followThroughPattern: '',
    adjustmentNextWeek: '',
    evidenceForConfidence: ''
  });
  
  const [showDailyLogForm, setShowDailyLogForm] = useState(false);
  const [showEvidenceForm, setShowEvidenceForm] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    dailyAction: true,
    behavioralEvidence: true,
    progressTimeline: false,
    consistencyMetrics: false,
    milestones: true,
    identityImplication: false,
    weeklyReview: false
  });
  
  const [dailyLogForm, setDailyLogForm] = useState<Omit<DailyActionLog, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    plannedAction: '',
    actionCompleted: '',
    whatWasDone: '',
    whatPreventedIt: '',
    timeStarted: '',
    timeFinished: '',
    qualityOfCompletion: 5
  });
  
  const [evidenceForm, setEvidenceForm] = useState<Omit<BehavioralEvidence, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    evidenceType: '',
    description: '',
    strengthScore: 5
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddDailyLog = () => {
    const newLog: DailyActionLog = {
      ...dailyLogForm,
      id: Date.now().toString()
    };
    setDailyLogs([newLog, ...dailyLogs]);
    setDailyLogForm({
      date: new Date().toISOString().split('T')[0],
      plannedAction: '',
      actionCompleted: '',
      whatWasDone: '',
      whatPreventedIt: '',
      timeStarted: '',
      timeFinished: '',
      qualityOfCompletion: 5
    });
    setShowDailyLogForm(false);
  };

  const handleAddEvidence = () => {
    const newEvidence: BehavioralEvidence = {
      ...evidenceForm,
      id: Date.now().toString()
    };
    setBehavioralEvidence([newEvidence, ...behavioralEvidence]);
    setEvidenceForm({
      date: new Date().toISOString().split('T')[0],
      evidenceType: '',
      description: '',
      strengthScore: 5
    });
    setShowEvidenceForm(false);
  };

  const handleDeleteDailyLog = (id: string) => {
    setDailyLogs(dailyLogs.filter(log => log.id !== id));
  };

  const handleDeleteEvidence = (id: string) => {
    setBehavioralEvidence(behavioralEvidence.filter(e => e.id !== id));
  };

  const handleMilestoneToggle = (id: string, checked: boolean) => {
    setMilestones(milestones.map(m => 
      m.id === id 
        ? { ...m, checked, dateAchieved: checked ? new Date().toISOString().split('T')[0] : undefined }
        : m
    ));
  };

  const handleWeeklySummaryChange = (week: number, summary: string) => {
    setWeeklySummaries(weeklySummaries.map(s => 
      s.week === week ? { ...s, summary } : s
    ));
  };

  const handleConsistencyMetricChange = (metric: keyof ConsistencyMetrics, value: number) => {
    setConsistencyMetrics(prev => ({ ...prev, [metric]: value }));
  };

  const getCompletedDaysCount = () => {
    return dailyLogs.filter(log => log.actionCompleted === 'yes').length;
  };

  const getTotalEvidenceCount = () => {
    return behavioralEvidence.length;
  };

  const getMilestoneProgress = () => {
    return milestones.filter(m => m.checked).length;
  };

  const getAverageQuality = () => {
    const completedLogs = dailyLogs.filter(log => log.actionCompleted === 'yes');
    if (completedLogs.length === 0) return 0;
    return Math.round(completedLogs.reduce((sum, log) => sum + log.qualityOfCompletion, 0) / completedLogs.length);
  };

  const getAverageConsistencyScore = () => {
    const values = Object.values(consistencyMetrics);
    return Math.round(values.reduce((sum, val) => sum + val, 0) / values.length);
  };

  const exportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      dailyLogs,
      behavioralEvidence,
      weeklySummaries,
      consistencyMetrics,
      milestones,
      identityImplication,
      weeklyReview
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `identity-evidence-tracking-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Purpose Header */}
      <Card className="bg-gradient-to-r from-[#0F1C2E] to-[#1a2d47] border-0">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#3DD4B0]/20 rounded-lg">
              <BookOpen className="w-6 h-6 text-[#3DD4B0]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Evidence Tracking System</h2>
              <p className="text-[#8A94A6] text-sm leading-relaxed">
                To record observable proof that identity-aligned behavior is happening in real life, not only in intention or self-description. 
                Log one meaningful piece of evidence per day. Use concrete facts only.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#0F1C2E]">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="w-6 h-6 text-[#3DD4B0] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#3DD4B0]">{getCompletedDaysCount()}</div>
            <div className="text-[#8A94A6] text-xs">Completed Days</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 text-[#1F6F78] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#0F1C2E]">{getTotalEvidenceCount()}</div>
            <div className="text-[#8A94A6] text-xs">Evidence Records</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4 text-center">
            <Star className="w-6 h-6 text-[#2A8A94] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#0F1C2E]">{getAverageQuality()}/10</div>
            <div className="text-[#8A94A6] text-xs">Avg Quality</div>
          </CardContent>
        </Card>
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-4 text-center">
            <Award className="w-6 h-6 text-[#2A8A94] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#0F1C2E]">{getMilestoneProgress()}/8</div>
            <div className="text-[#8A94A6] text-xs">Milestones</div>
          </CardContent>
        </Card>
      </div>

      {/* Section 1: Daily Action Log */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('dailyAction')}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#3DD4B0]" />
              Daily Action Log
            </CardTitle>
            {expandedSections.dailyAction ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          <CardDescription>Track your planned actions and completion each day</CardDescription>
        </CardHeader>
        {expandedSections.dailyAction && (
          <CardContent className="space-y-4">
            <Button
              onClick={() => setShowDailyLogForm(!showDailyLogForm)}
              className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold h-11"
            >
              <Plus className="w-5 h-5 mr-2" />
              {showDailyLogForm ? 'Cancel' : 'Add Daily Action Log'}
            </Button>

            {showDailyLogForm && (
              <Card className="border-2 border-[#3DD4B0]">
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </label>
                      <Input
                        type="date"
                        value={dailyLogForm.date}
                        onChange={(e) => setDailyLogForm({ ...dailyLogForm, date: e.target.value })}
                        className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2B2E34]">Action Completed?</label>
                      <Select
                        value={dailyLogForm.actionCompleted}
                        onValueChange={(value: 'yes' | 'no') => 
                          setDailyLogForm({ ...dailyLogForm, actionCompleted: value })
                        }
                      >
                        <SelectTrigger className="border-[#1F6F78]/20 focus:border-[#3DD4B0]">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes - Completed</SelectItem>
                          <SelectItem value="no">No - Not Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2B2E34]">Planned Action</label>
                    <Textarea
                      placeholder="What action did you plan to take today?"
                      value={dailyLogForm.plannedAction}
                      onChange={(e) => setDailyLogForm({ ...dailyLogForm, plannedAction: e.target.value })}
                      className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                    />
                  </div>

                  {dailyLogForm.actionCompleted === 'yes' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2B2E34]">If yes, what was done?</label>
                      <Textarea
                        placeholder="Describe what you actually did..."
                        value={dailyLogForm.whatWasDone}
                        onChange={(e) => setDailyLogForm({ ...dailyLogForm, whatWasDone: e.target.value })}
                        className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                      />
                    </div>
                  )}

                  {dailyLogForm.actionCompleted === 'no' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2B2E34]">If no, what prevented it?</label>
                      <Textarea
                        placeholder="What obstacles or barriers prevented completion?"
                        value={dailyLogForm.whatPreventedIt}
                        onChange={(e) => setDailyLogForm({ ...dailyLogForm, whatPreventedIt: e.target.value })}
                        className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Time Started
                      </label>
                      <Input
                        type="time"
                        value={dailyLogForm.timeStarted}
                        onChange={(e) => setDailyLogForm({ ...dailyLogForm, timeStarted: e.target.value })}
                        className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Time Finished
                      </label>
                      <Input
                        type="time"
                        value={dailyLogForm.timeFinished}
                        onChange={(e) => setDailyLogForm({ ...dailyLogForm, timeFinished: e.target.value })}
                        className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-[#2B2E34]">
                      Quality of Completion: {dailyLogForm.qualityOfCompletion}/10
                    </label>
                    <Slider
                      value={[dailyLogForm.qualityOfCompletion]}
                      onValueChange={(value) => setDailyLogForm({ ...dailyLogForm, qualityOfCompletion: value[0] })}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-[#8A94A6]">
                      <span>1 = Poor</span>
                      <span>5 = Adequate</span>
                      <span>10 = Excellent</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowDailyLogForm(false)}
                      className="border-[#1F6F78] text-[#1F6F78]"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddDailyLog}
                      disabled={!dailyLogForm.plannedAction || !dailyLogForm.actionCompleted}
                      className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-6"
                    >
                      Save Log
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Daily Logs List */}
            {dailyLogs.length > 0 && (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {dailyLogs.map((log) => (
                  <Card key={log.id} className={`border-l-4 ${log.actionCompleted === 'yes' ? 'border-l-[#3DD4B0]' : 'border-l-[#2A8A94]'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#0F1C2E]">{log.date}</span>
                          <Badge className={log.actionCompleted === 'yes' ? 'bg-[#3DD4B0]/10 text-[#1F6F78]' : 'bg-[#2A8A94]/10 text-[#B8860B]'}>
                            {log.actionCompleted === 'yes' ? 'Completed' : 'Not Completed'}
                          </Badge>
                          {log.actionCompleted === 'yes' && (
                            <Badge variant="outline" className="font-mono">{log.qualityOfCompletion}/10</Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDailyLog(log.id)}
                          className="text-[#C97B7B] hover:text-[#A86565] hover:bg-[#F8EEEF]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-[#0F1C2E] mb-1"><strong>Planned:</strong> {log.plannedAction}</p>
                      {log.actionCompleted === 'yes' && log.whatWasDone && (
                        <p className="text-sm text-[#1F6F78]"><strong>Done:</strong> {log.whatWasDone}</p>
                      )}
                      {log.actionCompleted === 'no' && log.whatPreventedIt && (
                        <p className="text-sm text-[#2A8A94]"><strong>Barrier:</strong> {log.whatPreventedIt}</p>
                      )}
                      {(log.timeStarted || log.timeFinished) && (
                        <p className="text-xs text-[#8A94A6] mt-2">
                          {log.timeStarted && `Started: ${log.timeStarted}`}
                          {log.timeStarted && log.timeFinished && ' | '}
                          {log.timeFinished && `Finished: ${log.timeFinished}`}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Section 2: Behavioral Evidence Record */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('behavioralEvidence')}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#1F6F78]" />
              Behavioral Evidence Record
            </CardTitle>
            {expandedSections.behavioralEvidence ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          <CardDescription>Document evidence across 8 key identity dimensions</CardDescription>
        </CardHeader>
        {expandedSections.behavioralEvidence && (
          <CardContent className="space-y-4">
            <Button
              onClick={() => setShowEvidenceForm(!showEvidenceForm)}
              className="w-full bg-[#1F6F78] text-white hover:bg-[#1a5a62] font-semibold h-11"
            >
              <Plus className="w-5 h-5 mr-2" />
              {showEvidenceForm ? 'Cancel' : 'Add Evidence Record'}
            </Button>

            {showEvidenceForm && (
              <Card className="border-2 border-[#1F6F78]">
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date
                      </label>
                      <Input
                        type="date"
                        value={evidenceForm.date}
                        onChange={(e) => setEvidenceForm({ ...evidenceForm, date: e.target.value })}
                        className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#2B2E34]">Evidence Type</label>
                      <Select
                        value={evidenceForm.evidenceType}
                        onValueChange={(value) => setEvidenceForm({ ...evidenceForm, evidenceType: value })}
                      >
                        <SelectTrigger className="border-[#1F6F78]/20 focus:border-[#3DD4B0]">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                          {evidenceTypes.map(type => (
                            <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2B2E34]">Evidence Description</label>
                    <Textarea
                      placeholder="Describe the concrete, observable evidence. Be factual and specific."
                      value={evidenceForm.description}
                      onChange={(e) => setEvidenceForm({ ...evidenceForm, description: e.target.value })}
                      className="min-h-[100px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                    />
                    <p className="text-xs text-[#8A94A6]">Focus on observable facts, not interpretations</p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-[#2B2E34]">
                      Evidence Strength Score: {evidenceForm.strengthScore}/10
                    </label>
                    <Slider
                      value={[evidenceForm.strengthScore]}
                      onValueChange={(value) => setEvidenceForm({ ...evidenceForm, strengthScore: value[0] })}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-[#8A94A6]">
                      <span>1 = Weak</span>
                      <span>5 = Moderate</span>
                      <span>10 = Strong</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowEvidenceForm(false)}
                      className="border-[#1F6F78] text-[#1F6F78]"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddEvidence}
                      disabled={!evidenceForm.evidenceType || !evidenceForm.description}
                      className="bg-[#1F6F78] text-white hover:bg-[#1a5a62] font-semibold px-6"
                    >
                      Save Evidence
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Evidence Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {evidenceTypes.map(type => {
                const Icon = type.icon;
                const count = behavioralEvidence.filter(e => e.evidenceType === type.id).length;
                const avgStrength = (() => {
                  const items = behavioralEvidence.filter(e => e.evidenceType === type.id);
                  if (items.length === 0) return 0;
                  return Math.round(items.reduce((sum, e) => sum + e.strengthScore, 0) / items.length);
                })();
                return (
                  <div
                    key={type.id}
                    className="p-4 bg-[#F6F8FA] rounded-lg border border-gray-200 hover:border-[#3DD4B0] transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-[#1F6F78]" />
                      <span className="text-sm font-medium text-[#0F1C2E]">{type.name}</span>
                    </div>
                    <p className="text-xs text-[#8A94A6] mb-2">{type.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{count} entries</Badge>
                      {count > 0 && (
                        <span className="text-xs text-[#3DD4B0] font-medium">Avg: {avgStrength}/10</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Evidence Records List */}
            {behavioralEvidence.length > 0 && (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {behavioralEvidence.map((evidence) => {
                  const type = evidenceTypes.find(t => t.id === evidence.evidenceType);
                  const Icon = type?.icon || Target;
                  return (
                    <Card key={evidence.id} className="border-l-4 border-l-[#1F6F78]">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-[#1F6F78]" />
                            <span className="text-sm font-medium text-[#1F6F78]">{type?.name}</span>
                            <span className="text-xs text-[#8A94A6]">{evidence.date}</span>
                            <Badge className="bg-[#3DD4B0]/10 text-[#1F6F78]">{evidence.strengthScore}/10</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEvidence(evidence.id)}
                            className="text-[#C97B7B] hover:text-[#A86565] hover:bg-[#F8EEEF]"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-[#0F1C2E]">{evidence.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      {/* Section 3: Progress Timeline */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('progressTimeline')}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#3DD4B0]" />
              Progress Timeline
            </CardTitle>
            {expandedSections.progressTimeline ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          <CardDescription>Weekly summaries of your transformation journey</CardDescription>
        </CardHeader>
        {expandedSections.progressTimeline && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {weeklySummaries.map((week) => (
                <Card key={week.week} className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#0F1C2E] flex items-center gap-2">
                      <Badge className="bg-[#3DD4B0] text-[#0F1C2E]">Week {week.week}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder={`Summarize your progress, challenges, and insights from Week ${week.week}...`}
                      value={week.summary}
                      onChange={(e) => handleWeeklySummaryChange(week.week, e.target.value)}
                      className="min-h-[120px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Section 4: Consistency Metrics */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('consistencyMetrics')}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#1F6F78]" />
              Consistency Metrics
            </CardTitle>
            {expandedSections.consistencyMetrics ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          <CardDescription>
            Rate your consistency across key dimensions (1-10) • Average Score: {getAverageConsistencyScore()}/10
          </CardDescription>
        </CardHeader>
        {expandedSections.consistencyMetrics && (
          <CardContent className="space-y-6">
            {consistencyQuestions.map((q) => (
              <div key={q.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#2B2E34]">{q.question}</label>
                  <Badge className="bg-[#3DD4B0]/10 text-[#1F6F78] font-mono">
                    {consistencyMetrics[q.id as keyof ConsistencyMetrics]}/10
                  </Badge>
                </div>
                <Slider
                  value={[consistencyMetrics[q.id as keyof ConsistencyMetrics]]}
                  onValueChange={(value) => handleConsistencyMetricChange(q.id as keyof ConsistencyMetrics, value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#0F1C2E]">Overall Consistency Score</span>
                <div className="flex items-center gap-2">
                  <Progress value={getAverageConsistencyScore() * 10} className="w-32 h-2" />
                  <span className="text-sm font-bold text-[#3DD4B0]">{getAverageConsistencyScore()}/10</span>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Section 5: Transformation Milestones */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('milestones')}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#2A8A94]" />
              Transformation Milestones
            </CardTitle>
            {expandedSections.milestones ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          <CardDescription>Check off each milestone as you achieve it</CardDescription>
        </CardHeader>
        {expandedSections.milestones && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    milestone.checked
                      ? 'bg-[#3DD4B0]/10 border-[#3DD4B0]'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={milestone.id}
                      checked={milestone.checked}
                      onCheckedChange={(checked) => handleMilestoneToggle(milestone.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={milestone.id}
                        className={`text-sm font-medium cursor-pointer ${
                          milestone.checked ? 'text-[#0F1C2E] line-through' : 'text-[#0F1C2E]'
                        }`}
                      >
                        {milestone.title}
                      </label>
                      {milestone.checked && milestone.dateAchieved && (
                        <p className="text-xs text-[#3DD4B0] mt-1">Achieved: {milestone.dateAchieved}</p>
                      )}
                    </div>
                    {milestone.checked && <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Progress 
                value={(getMilestoneProgress() / milestones.length) * 100} 
                className="h-2 mb-2" 
              />
              <p className="text-xs text-[#8A94A6] text-center">
                {getMilestoneProgress()} of {milestones.length} milestones achieved
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Section 6: Identity Implication */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('identityImplication')}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#3DD4B0]" />
              Identity Implication
            </CardTitle>
            {expandedSections.identityImplication ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          <CardDescription>Reflect on what the evidence teaches about your identity</CardDescription>
        </CardHeader>
        {expandedSections.identityImplication && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34]">What is the evidence teaching me about who I am becoming?</label>
              <Textarea
                placeholder="Reflect on the patterns and evidence you've gathered..."
                value={identityImplication.becomingWho}
                onChange={(e) => setIdentityImplication({ ...identityImplication, becomingWho: e.target.value })}
                className="min-h-[100px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34]">What identity is being strengthened by these actions?</label>
              <Textarea
                placeholder="Identify the identity that is gaining power..."
                value={identityImplication.identityStrengthened}
                onChange={(e) => setIdentityImplication({ ...identityImplication, identityStrengthened: e.target.value })}
                className="min-h-[100px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34]">What old identity is losing power?</label>
              <Textarea
                placeholder="Consider what old patterns or identities are fading..."
                value={identityImplication.oldIdentityLosing}
                onChange={(e) => setIdentityImplication({ ...identityImplication, oldIdentityLosing: e.target.value })}
                className="min-h-[100px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34]">What conclusion can I now make with confidence?</label>
              <Textarea
                placeholder="State a confident conclusion based on your evidence..."
                value={identityImplication.confidentConclusion}
                onChange={(e) => setIdentityImplication({ ...identityImplication, confidentConclusion: e.target.value })}
                className="min-h-[100px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Section 7: Weekly Review */}
      <Card>
        <CardHeader className="cursor-pointer" onClick={() => toggleSection('weeklyReview')}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-[#1F6F78]" />
              Weekly Review
            </CardTitle>
            {expandedSections.weeklyReview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
          <CardDescription>Reflect on your week and plan adjustments</CardDescription>
        </CardHeader>
        {expandedSections.weeklyReview && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34]">What was the strongest evidence this week?</label>
              <Textarea
                placeholder="Identify your most powerful evidence of identity-aligned behavior..."
                value={weeklyReview.strongestEvidence}
                onChange={(e) => setWeeklyReview({ ...weeklyReview, strongestEvidence: e.target.value })}
                className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34]">What was the weakest area this week?</label>
              <Textarea
                placeholder="Be honest about where you struggled..."
                value={weeklyReview.weakestArea}
                onChange={(e) => setWeeklyReview({ ...weeklyReview, weakestArea: e.target.value })}
                className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34]">What pattern do I see in my follow-through?</label>
              <Textarea
                placeholder="Look for recurring patterns in your behavior..."
                value={weeklyReview.followThroughPattern}
                onChange={(e) => setWeeklyReview({ ...weeklyReview, followThroughPattern: e.target.value })}
                className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34]">What adjustment should I make next week?</label>
              <Textarea
                placeholder="Identify specific changes to implement..."
                value={weeklyReview.adjustmentNextWeek}
                onChange={(e) => setWeeklyReview({ ...weeklyReview, adjustmentNextWeek: e.target.value })}
                className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#2B2E34]">What evidence would I need to see to feel more confident?</label>
              <Textarea
                placeholder="Define what would strengthen your belief in your transformation..."
                value={weeklyReview.evidenceForConfidence}
                onChange={(e) => setWeeklyReview({ ...weeklyReview, evidenceForConfidence: e.target.value })}
                className="min-h-[80px] border-[#1F6F78]/20 focus:border-[#3DD4B0]"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Export Button */}
      {(dailyLogs.length > 0 || behavioralEvidence.length > 0) && (
        <Button
          onClick={exportData}
          className="w-full bg-[#0F1C2E] text-white hover:bg-[#1a2d47] font-semibold h-11"
        >
          <Download className="w-5 h-5 mr-2" />
          Export Complete Evidence Tracking Data
        </Button>
      )}
    </div>
  );
}
