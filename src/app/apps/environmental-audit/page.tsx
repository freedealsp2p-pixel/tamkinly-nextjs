'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Home, 
  ArrowRight, 
  RotateCcw,
  Download,
  Monitor,
  Users,
  Wrench,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  XCircle,
  Zap
} from 'lucide-react';

interface EnvironmentData {
  physicalSpace: string;
  digitalEnvironment: string;
  socialCircle: string;
  resourceAccess: string;
  mainFriction: string;
  bestCue: string;
  checklist: string[];
  reflections: {
    whatHelps: string;
    whatBlocks: string;
    cueToAdd: string;
  };
}

const frictionPoints = [
  'Cluttered workspace',
  'Phone distractions',
  'Noise interruptions',
  'Poor lighting',
  'Uncomfortable seating',
  'Easy access to temptations',
  'Lack of organized tools',
  'No designated workspace'
];

const cueSuggestions = [
  'Leave notebook open on desk',
  'Place water bottle visible',
  'Set phone in another room',
  'Create morning playlist',
  'Prepare clothes the night before',
  'Visual reminder of target identity',
  'Calendar blocking visible',
  'Environment reset ritual'
];

const initialChecklist = [
  { id: '1', text: 'Remove distractions from desk', checked: false },
  { id: '2', text: 'Turn off non-essential notifications', checked: false },
  { id: '3', text: 'Add visual reminder of target identity', checked: false },
  { id: '4', text: 'Place tools within reach', checked: false },
  { id: '5', text: 'Create friction for bad habits', checked: false },
  { id: '6', text: 'Reduce friction for good habits', checked: false },
];

export default function EnvironmentalAuditPage() {
  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState<EnvironmentData>({
    physicalSpace: '',
    digitalEnvironment: '',
    socialCircle: '',
    resourceAccess: '',
    mainFriction: '',
    bestCue: '',
    checklist: [],
    reflections: {
      whatHelps: '',
      whatBlocks: '',
      cueToAdd: ''
    }
  });
  const [checklist, setChecklist] = useState(initialChecklist);
  const [customItem, setCustomItem] = useState('');

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addCustomItem = () => {
    if (customItem.trim()) {
      setChecklist(prev => [
        ...prev,
        { id: Date.now().toString(), text: customItem, checked: false }
      ]);
      setCustomItem('');
    }
  };

  const calculateEnvironmentScore = () => {
    const checkedCount = checklist.filter(item => item.checked).length;
    return Math.round((checkedCount / checklist.length) * 100);
  };

  const handleExport = () => {
    const exportData = {
      date: new Date().toISOString(),
      environment: {
        physicalSpace: data.physicalSpace,
        digitalEnvironment: data.digitalEnvironment,
        socialCircle: data.socialCircle,
        resourceAccess: data.resourceAccess,
        mainFriction: data.mainFriction,
        bestCue: data.bestCue
      },
      checklist: checklist,
      score: calculateEnvironmentScore(),
      reflections: data.reflections
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `environmental-audit-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleReset = () => {
    setStep(1);
    setShowResults(false);
    setData({
      physicalSpace: '',
      digitalEnvironment: '',
      socialCircle: '',
      resourceAccess: '',
      mainFriction: '',
      bestCue: '',
      checklist: [],
      reflections: {
        whatHelps: '',
        whatBlocks: '',
        cueToAdd: ''
      }
    });
    setChecklist(initialChecklist);
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  if (showResults) {
    const score = calculateEnvironmentScore();

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
        {/* Header */}
        <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
              ← Back to Apps
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                <Home className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#1F6F78]/50">BASIC</Badge>
                <h1 className="text-xl font-bold">Environmental Audit Results</h1>
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
            <h2 className="text-3xl font-bold text-white mb-2">Your Environment Score</h2>
            <p className="text-slate-400">How supportive is your environment for change?</p>
          </div>

          {/* Overall Score */}
          <Card className="bg-white mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-[#8A94A6] text-sm uppercase tracking-wide mb-4">Environment Support Score</h3>
              <div className="text-6xl font-bold text-[#0F1C2E] mb-2">{score}%</div>
              <p className="text-[#8A94A6] mb-6">
                {score >= 80 ? 'Excellent environment for transformation!' :
                 score >= 60 ? 'Good foundation with some friction points.' :
                 score >= 40 ? 'Significant environmental barriers exist.' :
                 'Major environmental redesign needed.'}
              </p>
              <Progress value={score} className="h-3" />
            </CardContent>
          </Card>

          {/* Environment Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Home className="w-5 h-5 text-[#3DD4B0]" />
                  <h4 className="font-semibold text-[#0F1C2E]">Physical Space</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.physicalSpace || 'Not provided'}</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="w-5 h-5 text-[#1F6F78]" />
                  <h4 className="font-semibold text-[#0F1C2E]">Digital Environment</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.digitalEnvironment || 'Not provided'}</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-[#FFB74D]" />
                  <h4 className="font-semibold text-[#0F1C2E]">Social Circle</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.socialCircle || 'Not provided'}</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-[#0F1C2E]" />
                  <h4 className="font-semibold text-[#0F1C2E]">Resource Access</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.resourceAccess || 'Not provided'}</p>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="bg-[#FFB74D]/10 border border-[#FFB74D]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-[#FFB74D]" />
                  <h4 className="font-semibold text-[#0F1C2E]">Main Friction Point</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.mainFriction || 'Not identified'}</p>
              </CardContent>
            </Card>

            <Card className="bg-[#3DD4B0]/10 border border-[#3DD4B0]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#3DD4B0]" />
                  <h4 className="font-semibold text-[#0F1C2E]">Best Cue to Add</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.bestCue || 'Not defined'}</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Checklist */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
                Environment Action Checklist
              </CardTitle>
              <CardDescription>
                Track your environment improvements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div 
                    key={item.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      item.checked ? 'bg-[#3DD4B0]/10' : 'bg-[#F6F8FA]'
                    }`}
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                    />
                    <span className={item.checked ? 'line-through text-[#8A94A6]' : 'text-[#2B2E34]'}>
                      {item.text}
                    </span>
                    {item.checked && <CheckCircle2 className="w-4 h-4 text-[#3DD4B0] ml-auto" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scientific Reference */}
          <Card className="bg-[#0F1C2E] mb-8">
            <CardContent className="p-6">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#FFB74D]" />
                Why Environment Matters
              </h4>
              <p className="text-slate-400 text-sm mb-3">
                Research shows that environmental friction and action cues significantly impact behavior change. 
                The psychology of habits demonstrates that reducing friction for desired behaviors and adding 
                visual cues can dramatically improve follow-through.
              </p>
              <p className="text-xs text-[#3DD4B0]">
                Reference: Mazar, et al. "Using the psychology of habits to promote sustainability"
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={handleReset} variant="secondary" className="shadow-md">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Audit
            </Button>
            <Button onClick={handleExport} className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]">
              <Download className="w-4 h-4 mr-2" />
              Export Audit
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
            <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
              <Home className="w-5 h-5 text-[#3DD4B0]" />
            </div>
            <div>
              <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#1F6F78]/50">BASIC</Badge>
              <h1 className="text-xl font-bold">Environmental Audit</h1>
              <p className="text-slate-400 text-sm">Identify what supports or blocks change</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="container mx-auto px-4 py-4 max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Step {step} of {totalSteps}</span>
          <span className="text-sm text-[#3DD4B0]">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-white/10 [&>div]:bg-[#3DD4B0]" />
      </div>

      {/* Assessment Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {step === 1 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Home className="w-5 h-5 text-[#3DD4B0]" />
                Physical & Digital Environment
              </CardTitle>
              <CardDescription>
                Assess your physical workspace and digital distractions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#3DD4B0]" />
                  Physical space
                </label>
                <Textarea
                  placeholder="My desk is... My workspace... Physical cues present..."
                  value={data.physicalSpace}
                  onChange={(e) => setData(prev => ({ ...prev, physicalSpace: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">Describe your workspace and physical environment</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-[#1F6F78]" />
                  Digital environment
                </label>
                <Textarea
                  placeholder="Notifications... Apps... Screen time... Digital distractions..."
                  value={data.digitalEnvironment}
                  onChange={(e) => setData(prev => ({ ...prev, digitalEnvironment: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">What digital elements compete for your attention?</p>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!data.physicalSpace || !data.digitalEnvironment}
                className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FFB74D]" />
                Social & Resources
              </CardTitle>
              <CardDescription>
                Assess your social environment and available resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#FFB74D]" />
                  Social circle
                </label>
                <Textarea
                  placeholder="Who supports my goals? Who normalizes unwanted behaviors..."
                  value={data.socialCircle}
                  onChange={(e) => setData(prev => ({ ...prev, socialCircle: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">How do people around you influence your behavior?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#0F1C2E]" />
                  Resource access
                </label>
                <Textarea
                  placeholder="Tools available... Resources organized... Access to what I need..."
                  value={data.resourceAccess}
                  onChange={(e) => setData(prev => ({ ...prev, resourceAccess: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">What tools and resources do you have access to?</p>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  ← Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!data.socialCircle || !data.resourceAccess}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FFB74D]" />
                Friction & Cues
              </CardTitle>
              <CardDescription>
                Identify friction points and design new cues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#FFB74D]" />
                  Main friction point
                </label>
                <Textarea
                  placeholder="What makes starting difficult? What consistently blocks progress?"
                  value={data.mainFriction}
                  onChange={(e) => setData(prev => ({ ...prev, mainFriction: e.target.value }))}
                  className="min-h-[80px]"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {frictionPoints.slice(0, 4).map((point, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="cursor-pointer hover:bg-[#FFB74D]/10"
                      onClick={() => setData(prev => ({ ...prev, mainFriction: point }))}
                    >
                      {point}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#3DD4B0]" />
                  Best cue to add
                </label>
                <Textarea
                  placeholder="What visual or environmental cue could trigger the desired behavior?"
                  value={data.bestCue}
                  onChange={(e) => setData(prev => ({ ...prev, bestCue: e.target.value }))}
                  className="min-h-[80px]"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {cueSuggestions.slice(0, 4).map((cue, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="cursor-pointer hover:bg-[#3DD4B0]/10 border-[#3DD4B0] text-[#3DD4B0]"
                      onClick={() => setData(prev => ({ ...prev, bestCue: cue }))}
                    >
                      {cue}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                  ← Back
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  disabled={!data.mainFriction || !data.bestCue}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
                Action Checklist
              </CardTitle>
              <CardDescription>
                Create your environment improvement checklist
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-[#8A94A6] mb-4">
                Check off the actions you'll take to optimize your environment:
              </p>
              
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-3 p-3 bg-[#F6F8FA] rounded-lg"
                  >
                    <Checkbox
                      checked={item.checked}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                    />
                    <span className="text-[#2B2E34]">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Add custom action..."
                  value={customItem}
                  onChange={(e) => setCustomItem(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                />
                <Button onClick={addCustomItem} variant="outline" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex gap-4 mt-6">
                <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
                  ← Back
                </Button>
                <Button
                  onClick={() => setShowResults(true)}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Complete Audit
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
