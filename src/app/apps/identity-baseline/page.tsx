'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { 
  User, 
  ArrowRight, 
  RotateCcw,
  Download,
  Target,
  Heart,
  Brain,
  Shield,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface BaselineData {
  whoAmI: string;
  habitsProof: string;
  identityGap: string;
  identityClarity: number;
  selfTrust: number;
  valueCongruence: number;
  reflection: string;
}

export default function IdentityBaselinePage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const [step, setStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState<BaselineData>({
    whoAmI: '',
    habitsProof: '',
    identityGap: '',
    identityClarity: 5,
    selfTrust: 5,
    valueCongruence: 5,
    reflection: ''
  });
  const [currentPrompt, setCurrentPrompt] = useState(0);

  const assessmentDimensions = [
    {
      id: 'identityClarity',
      name: getText('Identity Clarity', 'وضوح الهويّة'),
      description: getText('How clearly can you define who you are?', 'ما مدى وضوح تعريفك لنفسك؟'),
      question: getText('Rate your current identity clarity', 'قيّم وضوح هويّتك الحالية'),
      icon: <Target className="w-5 h-5" />,
      color: '#3DD4B0'
    },
    {
      id: 'selfTrust',
      name: getText('Self-Trust', 'الثقة بالنفس'),
      description: getText('How much do you trust your own judgment?', 'ما مدى ثقتك بحكمك الخاص؟'),
      question: getText('Rate your self-trust', 'قيّم ثقتك بنفسك'),
      icon: <Shield className="w-5 h-5" />,
      color: '#1F6F78'
    },
    {
      id: 'valueCongruence',
      name: getText('Value Congruence', 'توافق القيم'),
      description: getText('How well do your actions match your values?', 'ما مدى توافق أفعالك مع قيمك؟'),
      question: getText('Rate your value congruence', 'قيّم توافق قيمك'),
      icon: <Heart className="w-5 h-5" />,
      color: '#2A8A94'
    }
  ];

  const reflectionPrompts = [
    getText("What do my daily choices say about the identity I am living?", "ماذا تقول خياراتي اليومية عن الهويّة التي أعيشها؟"),
    getText("When do I feel most authentic?", "متى أشعر بأكبر قدر من الأصالة؟"),
    getText("What identity would my closest friends say I embody?", "أيّ هويّة سيقول أقرب أصدقائي إنني أُجسّدها؟"),
    getText("What parts of my current identity do I want to keep?", "ما أجزاء هويّتي الحالية التي أريد الاحتفاظ بها؟"),
    getText("What parts of my current identity no longer serve me?", "ما أجزاء هويّتي الحالية التي لم تعد تخدميني؟")
  ];

  const handleSliderChange = (dimension: string, value: number[]) => {
    setData(prev => ({
      ...prev,
      [dimension]: value[0]
    }));
  };

  const calculateOverallScore = () => {
    const scores = [data.identityClarity, data.selfTrust, data.valueCongruence];
    return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10);
  };

  const getStrengthsAndGaps = () => {
    const scores = [
      { name: getText('Identity Clarity', 'وضوح الهويّة'), score: data.identityClarity },
      { name: getText('Self-Trust', 'الثقة بالنفس'), score: data.selfTrust },
      { name: getText('Value Congruence', 'توافق القيم'), score: data.valueCongruence }
    ];
    scores.sort((a, b) => b.score - a.score);
    return {
      strength: scores[0],
      gap: scores[2]
    };
  };

  const handleExport = () => {
    const exportData = {
      date: new Date().toISOString(),
      assessment: data,
      overallScore: calculateOverallScore(),
      interpretation: {
        strength: getStrengthsAndGaps().strength,
        biggestGap: getStrengthsAndGaps().gap
      }
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `identity-baseline-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handleReset = () => {
    setStep(1);
    setShowResults(false);
    setData({
      whoAmI: '',
      habitsProof: '',
      identityGap: '',
      identityClarity: 5,
      selfTrust: 5,
      valueCongruence: 5,
      reflection: ''
    });
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  if (showResults) {
    const overallScore = calculateOverallScore();
    const { strength, gap } = getStrengthsAndGaps();

    return (
<div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
              {getText('← Back to Apps', 'العودة إلى التطبيقات →')}
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                <User className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#1F6F78]/50">{getText('BASIC', 'أساسي')}</Badge>
                <h1 className="text-xl font-bold">{getText('Identity Baseline Results', 'نتائج خط الأساس الهويّي')}</h1>
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
            <h2 className="text-3xl font-bold text-white mb-2">{getText('Your Identity Baseline', 'خط الأساس الهويّي الخاص بك')}</h2>
            <p className="text-slate-400">{getText('This is your starting point for transformation', 'هذه هي نقطة انطلاقك للتحوّل')}</p>
          </div>

          {/* Overall Score */}
          <Card className="bg-white mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-[#8A94A6] text-sm uppercase tracking-wide mb-4">{getText('Overall Identity Score', 'درجة الهويّة الإجمالية')}</h3>
              <div className="text-6xl font-bold text-[#0F1C2E] mb-2">{overallScore}%</div>
              <p className="text-[#8A94A6] mb-6">
                {overallScore >= 70 ? getText('Strong identity foundation with clear direction.', 'أساس هوية قوي مع اتجاه واضح.') :
                 overallScore >= 50 ? getText('Moderate clarity with room for growth.', 'وضوح متوسط مع مجال للنمو.') :
                 getText('Significant opportunity for identity development.', 'فرصة كبيرة لتطوير الهويّة.')}
              </p>
              <Progress value={overallScore} className="h-3" />
            </CardContent>
          </Card>

          {/* Dimension Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {assessmentDimensions.map((dim) => (
              <Card key={dim.id} className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div style={{ color: dim.color }}>{dim.icon}</div>
                    <span className="font-semibold text-[#0F1C2E]">{dim.name}</span>
                  </div>
                  <div className="text-3xl font-bold text-[#0F1C2E] mb-2">
                    {data[dim.id as keyof BaselineData] as number}/10
                  </div>
                  <Progress value={(data[dim.id as keyof BaselineData] as number) * 10} className="h-2" />
                  <p className="text-xs text-[#8A94A6] mt-2">{dim.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Strengths & Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="bg-[#3DD4B0]">
              <CardContent className="p-6">
                <Badge className="bg-white/20 text-white mb-2">{getText('Your Strength', 'نقطة قوّتك')}</Badge>
                <h3 className="text-xl font-bold text-white">{strength.name}</h3>
                <p className="text-white/80 text-sm">{getText('Score', 'الدرجة')}: {strength.score}/10</p>
                <p className="text-white/70 text-xs mt-2">{getText('Build on this foundation', 'ابنِ على هذا الأساس')}</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1F6F78]">
              <CardContent className="p-6">
                <Badge className="bg-white/20 text-white mb-2">{getText('Biggest Gap', 'أكبر فجوة')}</Badge>
                <h3 className="text-xl font-bold text-white">{gap.name}</h3>
                <p className="text-white/80 text-sm">{getText('Score', 'الدرجة')}: {gap.score}/10</p>
                <p className="text-white/70 text-xs mt-2">{getText('Focus your development here', 'ركّز على التطوير هنا')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Self-Concept Summary */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#3DD4B0]" />
                {getText('Your Self-Concept Summary', 'ملخص المفهوم الذاتي الخاص بك')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-[#F6F8FA] rounded-lg">
                <h4 className="font-medium text-[#0F1C2E] mb-2">{getText('Who am I right now?', 'من أنا الآن؟')}</h4>
                <p className="text-[#2B2E34] text-sm">{data.whoAmI || getText('Not provided', 'لم يُقدَّم')}</p>
              </div>
              <div className="p-4 bg-[#F6F8FA] rounded-lg">
                <h4 className="font-medium text-[#0F1C2E] mb-2">{getText('What identity do my habits prove?', 'ما الهويّة التي تثبتها عاداتي؟')}</h4>
                <p className="text-[#2B2E34] text-sm">{data.habitsProof || getText('Not provided', 'لم يُقدَّم')}</p>
              </div>
              <div className="p-4 bg-[#F6F8FA] rounded-lg">
                <h4 className="font-medium text-[#0F1C2E] mb-2">{getText('What is my biggest identity gap?', 'ما أكبر فجوة في هويّتي؟')}</h4>
                <p className="text-[#2B2E34] text-sm">{data.identityGap || getText('Not provided', 'لم يُقدَّم')}</p>
              </div>
              <div className="p-4 bg-[#2A8A94]/10 rounded-lg border border-[#2A8A94]/30">
                <h4 className="font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#2A8A94]" />
                  {getText('Reflection', 'تأمّل')}
                </h4>
                <p className="text-[#2B2E34] text-sm">{data.reflection || getText('Not provided', 'لم يُقدَّم')}</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={handleReset} variant="secondary" className="shadow-md">
              <RotateCcw className="w-4 h-4 mr-2" />
              {getText('Retake Assessment', 'إعادة التقييم')}
            </Button>
            <Button onClick={handleExport} className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]">
              <Download className="w-4 h-4 mr-2" />
              {getText('Export Baseline', 'تصدير خط الأساس')}
            </Button>
          </div>
        </div>
      </div>
);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            {getText('← Back to Apps', 'العودة إلى التطبيقات →')}
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
              <User className="w-5 h-5 text-[#3DD4B0]" />
            </div>
            <div>
              <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#1F6F78]/50">{getText('BASIC', 'أساسي')}</Badge>
              <h1 className="text-xl font-bold">{getText('Identity Baseline Worksheet', 'ورقة عمل خط الأساس الهويّي')}</h1>
              <p className="text-slate-400 text-sm">{getText('Measure your current self-concept', 'قيّم مفهومك الذاتي الحالي')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="container mx-auto px-4 py-4 max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">{getText('Step', 'الخطوة')} {step} {getText('of', 'من')} {totalSteps}</span>
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
                <Brain className="w-5 h-5 text-[#3DD4B0]" />
                {getText('Self-Concept Inventory', 'جرد المفهوم الذاتي')}
              </CardTitle>
              <CardDescription>
                {getText('Based on the Self-Concept and Identity Measure (SCIM), answer honestly about your current state.', 'بناءً على مقياس المفهوم الذاتي والهويّة (SCIM)، أجب بصدق عن حالتك الحالية.')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
                  {getText('Who am I right now?', 'من أنا الآن؟')}
                </label>
                <Textarea
                  placeholder={getText("I am someone who...", "أنا شخص...")}
                  value={data.whoAmI}
                  onChange={(e) => setData(prev => ({ ...prev, whoAmI: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">{getText('Describe your current identity in your own words', 'صِف هويّتك الحالية بكلماتك الخاصة')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
                  {getText('What identity do my habits currently prove?', 'ما الهويّة التي تثبتها عاداتي حاليًا؟')}
                </label>
                <Textarea
                  placeholder={getText("My habits show that I am...", "عاداتي تُظهر أنني...")}
                  value={data.habitsProof}
                  onChange={(e) => setData(prev => ({ ...prev, habitsProof: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">{getText('Based on Habit-Identity Links research (Verplanken & Sui)', 'بناءً على بحث روابط العادات والهويّة (Verplanken & Sui)')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
                  {getText('What is my biggest identity gap?', 'ما أكبر فجوة في هويّتي؟')}
                </label>
                <Textarea
                  placeholder={getText("I value... but my behavior...", "أنا أقدّر... لكن سلوكي...")}
                  value={data.identityGap}
                  onChange={(e) => setData(prev => ({ ...prev, identityGap: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">{getText('Where do your values and actions diverge?', 'أين تتباعد قيمك وأفعالك؟')}</p>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!data.whoAmI || !data.habitsProof || !data.identityGap}
                className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
              >
                {getText('Continue to Ratings', 'متابعة التقييم')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Target className="w-5 h-5 text-[#3DD4B0]" />
                {getText('Identity Dimensions Rating', 'تقييم أبعاد الهويّة')}
              </CardTitle>
              <CardDescription>
                {getText('Rate each dimension on a scale of 1-10', 'قيّم كل بُعد على مقياس من 1 إلى 10')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {assessmentDimensions.map((dim) => (
                <div key={dim.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div style={{ color: dim.color }}>{dim.icon}</div>
                      <span className="font-medium text-[#0F1C2E]">{dim.name}</span>
                    </div>
                    <Badge 
                      variant="outline"
                      style={{ borderColor: dim.color, color: dim.color }}
                    >
                      {data[dim.id as keyof BaselineData] as number}/10
                    </Badge>
                  </div>
                  <p className="text-sm text-[#8A94A6]">{dim.question}</p>
                  <Slider
                    value={[data[dim.id as keyof BaselineData] as number]}
                    onValueChange={(value) => handleSliderChange(dim.id, value)}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-[#8A94A6]">{dim.description}</p>
                </div>
              ))}

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  {getText('← Back', '→ رجوع')}
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                >
                  {getText('Continue', 'متابعة')}
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
                <Lightbulb className="w-5 h-5 text-[#2A8A94]" />
                {getText('Reflection Prompt', 'موجّه التأمّل')}
              </CardTitle>
              <CardDescription>
                {getText('Take a moment to reflect deeply on this question', 'خذ لحظة لتتأمّل بعمق في هذا السؤال')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-[#2A8A94]/10 rounded-lg border border-[#2A8A94]/30">
                <p className="text-lg font-medium text-[#0F1C2E]">
                  {reflectionPrompts[currentPrompt]}
                </p>
              </div>

              <Textarea
                placeholder={getText("Write your reflection here...", "اكتب تأمّلك هنا...")}
                value={data.reflection}
                onChange={(e) => setData(prev => ({ ...prev, reflection: e.target.value }))}
                className="min-h-[150px]"
              />

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPrompt((prev) => (prev + 1) % reflectionPrompts.length)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {getText('Different prompt', 'موجّه مختلف')}
                </Button>
                <span className="text-xs text-[#8A94A6]">
                  {data.reflection.length} {getText('characters', 'حرف')}
                </span>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1"
                >
                  {getText('← Back', '→ رجوع')}
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                >
                  {getText('Continue', 'متابعة')}
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
                {getText('Review Your Baseline', 'راجع خط الأساس الخاص بك')}
              </CardTitle>
              <CardDescription>
                {getText('Make sure your responses are accurate before submitting', 'تأكد من دقة إجاباتك قبل الإرسال')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {assessmentDimensions.map((dim) => (
                  <div key={dim.id} className="text-center p-4 bg-[#F6F8FA] rounded-lg">
                    <div style={{ color: dim.color }} className="flex justify-center mb-2">{dim.icon}</div>
                    <div className="text-2xl font-bold text-[#0F1C2E]">
                      {data[dim.id as keyof BaselineData] as number}/10
                    </div>
                    <div className="text-xs text-[#8A94A6]">{dim.name}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-[#0F1C2E] rounded-lg text-white">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#3DD4B0]" />
                  {getText('What happens next?', 'ماذا سيحدث بعد ذلك؟')}
                </h4>
                <p className="text-sm text-slate-300">
                  {getText("This baseline will serve as your reference point. You'll be able to compare your progress over time and see how your identity evolves.", "سيكون خط الأساس هذا نقطة مرجعك. ستتمكن من مقارنة تقدّمك بمرور الوقت ورؤية كيف تتطوّر هويّتك.")}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setStep(3)}
                  variant="outline"
                  className="flex-1"
                >
                  {getText('← Back', '→ رجوع')}
                </Button>
                <Button
                  onClick={() => setShowResults(true)}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {getText('Complete Baseline', 'إكمال خط الأساس')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
