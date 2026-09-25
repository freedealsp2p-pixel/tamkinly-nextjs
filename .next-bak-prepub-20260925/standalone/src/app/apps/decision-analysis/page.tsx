'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { 
  TrendingUp, 
  ArrowRight, 
  RotateCcw,
  Download,
  Brain,
  Heart,
  Target,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  XCircle,
  AlertCircle,
  Plus,
  Trash2,
  BarChart3,
  Eye
} from 'lucide-react';

interface Decision {
  id: string;
  date: string;
  decision: string;
  context: string;
  emotion: string;
  choice: string;
  aligned: boolean;
  pattern: string;
  upgradeRule: string;
  ratings: {
    clarity: number;
    emotionalControl: number;
    valueAlignment: number;
  };
}

const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export default function DecisionAnalysisPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const emotions = [
    { value: 'calm', labelEn: 'Calm', labelAr: 'هادئ', color: '#3DD4B0' },
    { value: 'stressed', labelEn: 'Stressed', labelAr: 'متوتر', color: '#2A8A94' },
    { value: 'tired', labelEn: 'Tired', labelAr: 'متعب', color: '#8A94A6' },
    { value: 'anxious', labelEn: 'Anxious', labelAr: 'قلق', color: '#C97B7B' },
    { value: 'confident', labelEn: 'Confident', labelAr: 'واثق', color: '#1F6F78' },
    { value: 'frustrated', labelEn: 'Frustrated', labelAr: 'محبط', color: '#2A8A94' },
  ];

  const patternOptions = [
    getText('I choose comfort when stressed', 'أختار الراحة عند التوتر'),
    getText('I delay when uncertain', 'أماطل عند عدم اليقين'),
    getText('I seek external validation', 'أبحث عن التحقق الخارجي'),
    getText('I avoid confrontation', 'أتجنب المواجهة'),
    getText('I overthink simple choices', 'أفكر كثيرًا في الخيارات البسيطة'),
    getText('I decide impulsively', 'أقرر باندفاع'),
    getText('I prioritize others over myself', 'أعطي الأولوية للآخرين على نفسي'),
    getText('I choose the path of least resistance', 'أختار طريق المقاومة الأقل')
  ];

  const [showForm, setShowForm] = useState(false);
  const [decisions, setDecisions] = useState<Decision[]>(() => getFromStorage('tamkinly-decisions', []));
  
  const [formData, setFormData] = useState({
    decision: '',
    context: '',
    emotion: 'calm',
    choice: '',
    aligned: true,
    pattern: '',
    upgradeRule: '',
    clarity: 5,
    emotionalControl: 5,
    valueAlignment: 5
  });

  useEffect(() => {
    localStorage.setItem('tamkinly-decisions', JSON.stringify(decisions));
  }, [decisions]);

  const handleAddDecision = () => {
    const newDecision: Decision = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...formData,
      ratings: {
        clarity: formData.clarity,
        emotionalControl: formData.emotionalControl,
        valueAlignment: formData.valueAlignment
      }
    };
    setDecisions(prev => [newDecision, ...prev]);
    setFormData({
      decision: '',
      context: '',
      emotion: 'calm',
      choice: '',
      aligned: true,
      pattern: '',
      upgradeRule: '',
      clarity: 5,
      emotionalControl: 5,
      valueAlignment: 5
    });
    setShowForm(false);
  };

  const deleteDecision = (id: string) => {
    setDecisions(prev => prev.filter(d => d.id !== id));
  };

  const calculateStats = () => {
    if (decisions.length === 0) return { avgQuality: 0, alignedCount: 0, patterns: {} };
    
    const totalQuality = decisions.reduce((sum, d) => {
      const avg = (d.ratings.clarity + d.ratings.emotionalControl + d.ratings.valueAlignment) / 3;
      return sum + avg;
    }, 0);
    
    const alignedCount = decisions.filter(d => d.aligned).length;
    
    const patterns: Record<string, number> = {};
    decisions.forEach(d => {
      if (d.pattern) {
        patterns[d.pattern] = (patterns[d.pattern] || 0) + 1;
      }
    });

    return {
      avgQuality: Math.round((totalQuality / decisions.length) * 10),
      alignedCount,
      patterns
    };
  };

  const stats = calculateStats();

  const handleExport = () => {
    const exportData = {
      date: new Date().toISOString(),
      decisions,
      stats,
      summary: {
        totalDecisions: decisions.length,
        averageQuality: stats.avgQuality,
        alignmentRate: decisions.length > 0 ? Math.round((stats.alignedCount / decisions.length) * 100) : 0,
        mostCommonPattern: Object.entries(stats.patterns).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'
      }
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `decision-analysis-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            {getText('← Back to Apps', '→ العودة للتطبيقات')}
          </Link>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#1F6F78]/50">{getText('PREMIUM', 'متميز')}</Badge>
                </div>
                <h1 className="text-xl font-bold">{getText('Decision Pattern Analysis', 'تحليل أنماط القرار')}</h1>
              </div>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
            >
              <Plus className="w-4 h-4 mr-2" />
              {getText('Log Decision', 'تسجيل قرار')}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[#0F1C2E]">{decisions.length}</div>
              <p className="text-xs text-[#8A94A6]">{getText('Decisions Logged', 'قرارات مسجلة')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[#3DD4B0]">{stats.avgQuality}%</div>
              <p className="text-xs text-[#8A94A6]">{getText('Avg Quality Score', 'متوسط درجة الجودة')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[#1F6F78]">
                {decisions.length > 0 ? Math.round((stats.alignedCount / decisions.length) * 100) : 0}%
              </div>
              <p className="text-xs text-[#8A94A6]">{getText('Identity Aligned', 'متوافق مع الهوية')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[#2A8A94]">
                {Object.keys(stats.patterns).length}
              </div>
              <p className="text-xs text-[#8A94A6]">{getText('Patterns Identified', 'أنماط محددة')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Decision Form */}
        {showForm && (
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#3DD4B0]" />
                {getText('Log a Decision', 'تسجيل قرار')}
              </CardTitle>
              <CardDescription>
                {getText('Record the decision, context, and outcome for pattern analysis', 'سجّل القرار والسياق والنتيجة لتحليل الأنماط')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('Decision', 'القرار')}</label>
                <Input
                  placeholder={getText('What decision did you make?', 'ما القرار الذي اتخذته؟')}
                  value={formData.decision}
                  onChange={(e) => setFormData(prev => ({ ...prev, decision: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('Context', 'السياق')}</label>
                <Textarea
                  placeholder={getText('What was the situation? What led to this decision?', 'ما كان الموقف؟ ما الذي أدى إلى هذا القرار؟')}
                  value={formData.context}
                  onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('Emotional State', 'الحالة العاطفية')}</label>
                <div className="flex flex-wrap gap-2">
                  {emotions.map((emotion) => (
                    <Badge
                      key={emotion.value}
                      variant={formData.emotion === emotion.value ? 'default' : 'outline'}
                      className={`cursor-pointer ${formData.emotion === emotion.value ? '' : 'hover:bg-slate-100'}`}
                      style={formData.emotion === emotion.value ? { backgroundColor: emotion.color } : { borderColor: emotion.color, color: emotion.color }}
                      onClick={() => setFormData(prev => ({ ...prev, emotion: emotion.value }))}
                    >
                      {locale === 'ar' ? emotion.labelAr : emotion.labelEn}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('What did you choose?', 'ماذا اخترت؟')}</label>
                <Textarea
                  placeholder={getText('What action did you take?', 'ما الإجراء الذي اتخذته؟')}
                  value={formData.choice}
                  onChange={(e) => setFormData(prev => ({ ...prev, choice: e.target.value }))}
                  className="min-h-[60px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('Was it aligned with your identity?', 'هل كان متوافقًا مع هويتك؟')}</label>
                <div className="flex gap-4">
                  <Badge
                    variant={formData.aligned ? 'default' : 'outline'}
                    className={`cursor-pointer py-2 px-4 ${formData.aligned ? 'bg-[#3DD4B0]' : 'hover:bg-[#3DD4B0]/10'}`}
                    style={formData.aligned ? { backgroundColor: '#3DD4B0', color: '#0F1C2E' } : { borderColor: '#3DD4B0', color: '#3DD4B0' }}
                    onClick={() => setFormData(prev => ({ ...prev, aligned: true }))}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" /> {getText('Yes', 'نعم')}
                  </Badge>
                  <Badge
                    variant={!formData.aligned ? 'default' : 'outline'}
                    className={`cursor-pointer py-2 px-4 ${!formData.aligned ? 'bg-[#C97B7B]' : 'hover:bg-[#C97B7B]/10'}`}
                    style={!formData.aligned ? { backgroundColor: '#C97B7B', color: 'white' } : { borderColor: '#C97B7B', color: '#C97B7B' }}
                    onClick={() => setFormData(prev => ({ ...prev, aligned: false }))}
                  >
                    <XCircle className="w-4 h-4 mr-1" /> {getText('No', 'لا')}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('Pattern noticed', 'نمط ملحوظ')}</label>
                <div className="flex flex-wrap gap-2">
                  {patternOptions.map((pattern, i) => (
                    <Badge
                      key={i}
                      variant={formData.pattern === pattern ? 'default' : 'outline'}
                      className={`cursor-pointer text-xs ${formData.pattern === pattern ? 'bg-[#1F6F78]' : 'hover:bg-slate-100'}`}
                      onClick={() => setFormData(prev => ({ ...prev, pattern }))}
                    >
                      {pattern}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('Upgrade rule for next time', 'قاعدة تحسين للمرة القادمة')}</label>
                <Textarea
                  placeholder={getText('What would you do differently? What rule can you create?', 'ماذا ستفعل بشكل مختلف؟ ما القاعدة التي يمكنك إنشاؤها؟')}
                  value={formData.upgradeRule}
                  onChange={(e) => setFormData(prev => ({ ...prev, upgradeRule: e.target.value }))}
                  className="min-h-[60px]"
                />
              </div>

              {/* Quality Ratings */}
              <div className="space-y-4 p-4 bg-[#F6F8FA] rounded-lg">
                <h4 className="font-medium text-[#0F1C2E]">{getText('Decision Quality Rating', 'تقييم جودة القرار')}</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#2B2E34]">{getText('Clarity', 'الوضوح')}</span>
                      <span className="text-[#8A94A6]">{formData.clarity}/10</span>
                    </div>
                    <Slider value={[formData.clarity]} onValueChange={([v]) => setFormData(prev => ({ ...prev, clarity: v }))} max={10} min={1} step={1} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#2B2E34]">{getText('Emotional Control', 'التحكم العاطفي')}</span>
                      <span className="text-[#8A94A6]">{formData.emotionalControl}/10</span>
                    </div>
                    <Slider value={[formData.emotionalControl]} onValueChange={([v]) => setFormData(prev => ({ ...prev, emotionalControl: v }))} max={10} min={1} step={1} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#2B2E34]">{getText('Value Alignment', 'محاذاة القيم')}</span>
                      <span className="text-[#8A94A6]">{formData.valueAlignment}/10</span>
                    </div>
                    <Slider value={[formData.valueAlignment]} onValueChange={([v]) => setFormData(prev => ({ ...prev, valueAlignment: v }))} max={10} min={1} step={1} />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                  {getText('Cancel', 'إلغاء')}
                </Button>
                <Button
                  onClick={handleAddDecision}
                  disabled={!formData.decision || !formData.choice}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {getText('Log Decision', 'تسجيل قرار')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pattern Insights */}
        {Object.keys(stats.patterns).length > 0 && (
          <Card className="bg-[#0F1C2E] mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#3DD4B0]" />
                {getText('Pattern Insights', 'رؤى الأنماط')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.patterns)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([pattern, count], i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-white text-sm">{pattern}</span>
                      <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0]">{count} {getText('times', 'مرات')}</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Decision Log */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#0F1C2E]">{getText('Decision Log', 'سجل القرارات')}</CardTitle>
              {decisions.length > 0 && (
                <Button onClick={handleExport} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  {getText('Export', 'تصدير')}
                </Button>
              )}
            </div>
            <CardDescription>
              {getText('Based on Decision Pattern Analysis framework for studying decision behavior', 'بناءً على إطار تحليل أنماط القرار لدراسة سلوك القرار')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {decisions.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-[#8A94A6] mx-auto mb-4" />
                <p className="text-[#8A94A6]">{getText('No decisions logged yet. Start tracking to identify patterns.', 'لم يتم تسجيل قرارات بعد. ابدأ بالتتبع لتحديد الأنماط.')}</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {decisions.map((decision) => {
                  const emotionData = emotions.find(e => e.value === decision.emotion) || emotions[0];
                  const avgRating = Math.round((decision.ratings.clarity + decision.ratings.emotionalControl + decision.ratings.valueAlignment) / 3 * 10);
                  
                  return (
                    <div key={decision.id} className="p-4 border rounded-lg hover:border-[#3DD4B0]/30 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge style={{ backgroundColor: emotionData.color, color: 'white' }}>
                            {locale === 'ar' ? emotionData.labelAr : emotionData.labelEn}
                          </Badge>
                          {decision.aligned ? (
                            <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0]">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> {getText('Aligned', 'متوافق')}
                            </Badge>
                          ) : (
                            <Badge className="bg-[#C97B7B]/10 text-[#C97B7B]">
                              <XCircle className="w-3 h-3 mr-1" /> {getText('Not Aligned', 'غير متوافق')}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#8A94A6]">{avgRating}% {getText('quality', 'جودة')}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteDecision(decision.id)}
                            className="text-[#C97B7B] hover:bg-[#C97B7B]/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <h4 className="font-medium text-[#0F1C2E] mb-1">{decision.decision}</h4>
                      <p className="text-sm text-[#2B2E34] mb-2">{decision.choice}</p>
                      {decision.pattern && (
                        <p className="text-xs text-[#8A94A6] italic">{getText('Pattern:', 'النمط:')} {decision.pattern}</p>
                      )}
                      {decision.upgradeRule && (
                        <div className="mt-2 p-2 bg-[#3DD4B0]/5 rounded text-xs text-[#1F6F78]">
                          <Lightbulb className="w-3 h-3 inline mr-1" />
                          {getText('Upgrade:', 'تحسين:')} {decision.upgradeRule}
                        </div>
                      )}
                      <p className="text-xs text-[#8A94A6] mt-2">
                        {new Date(decision.date).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scientific Reference */}
        <Card className="bg-[#1F6F78]/10 border-[#1F6F78]/30 mt-8">
          <CardContent className="p-6">
            <h4 className="font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#2A8A94]" />
              {getText('Decision Quality Framework', 'إطار جودة القرار')}
            </h4>
            <p className="text-sm text-[#2B2E34] mb-3">
              {getText(
                'This tool helps you track decisions, identify patterns, and improve decision quality over time. Recording the context, emotion, and outcome reveals recurring patterns that may be limiting growth.',
                'تساعدك هذه الأداة على تتبع القرارات وتحديد الأنماط وتحسين جودة القرار بمرور الوقت. تسجيل السياق والعاطفة والنتيجة يكشف الأنماط المتكررة التي قد تحد من النمو.'
              )}
            </p>
            <p className="text-xs text-[#1F6F78]">
              {getText('Reference: "Are We Improving? Update and Critical Appraisal of the Measures of Decision Making Quality"', 'المرجع: "هل نتحسن؟ تحديث وتقييم نقدي لمقاييس جودة اتخاذ القرار"')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
);
}
