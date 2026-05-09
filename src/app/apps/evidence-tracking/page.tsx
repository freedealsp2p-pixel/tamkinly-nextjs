'use client';

import { AccessGate } from '@/components/AccessGate';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { useLocale } from '@/components/providers/LocaleProvider';
import { 
  BarChart3, 
  ArrowRight, 
  RotateCcw,
  Download,
  Target,
  CheckCircle2,
  Flame,
  Sparkles,
  Plus,
  Calendar,
  TrendingUp,
  Award,
  Eye
} from 'lucide-react';

interface Evidence {
  id: string;
  date: string;
  action: string;
  evidence: string;
  identityProof: string;
  followedThrough: boolean;
  strength: number;
  notes: string;
}

const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export default function EvidenceTrackingPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const identityProofs = [
    getText('I acted like a disciplined person', 'تصرفت كشخص منضبط'),
    getText('I acted like a growth-focused person', 'تصرفت كشخص يركز على النمو'),
    getText('I acted like a healthy person', 'تصرفت كشخص صحي'),
    getText('I acted like a creative person', 'تصرفت كشخص مبدع'),
    getText('I acted like a confident person', 'تصرفت كشخص واثق'),
    getText('I acted like a reliable person', 'تصرفت كشخص موثوق'),
    getText('I acted like an organized person', 'تصرفت كشخص منظم'),
    getText('I acted like a mindful person', 'تصرفت كشخص واعٍ')
  ];

  const [showForm, setShowForm] = useState(false);
  const [evidence, setEvidence] = useState<Evidence[]>(() => getFromStorage('tamkinly-evidence', []));
  
  const [formData, setFormData] = useState({
    action: '',
    evidence: '',
    identityProof: identityProofs[0],
    followedThrough: true,
    strength: 5,
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('tamkinly-evidence', JSON.stringify(evidence));
  }, [evidence]);

  const handleAddEvidence = () => {
    const newEvidence: Evidence = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...formData
    };
    setEvidence(prev => [newEvidence, ...prev]);
    setFormData({
      action: '',
      evidence: '',
      identityProof: identityProofs[0],
      followedThrough: true,
      strength: 5,
      notes: ''
    });
    setShowForm(false);
  };

  const deleteEvidence = (id: string) => {
    setEvidence(prev => prev.filter(e => e.id !== id));
  };

  const calculateStats = () => {
    if (evidence.length === 0) return { totalActions: 0, streak: 0, avgStrength: 0, identityProofs: {} };
    
    let streak = 0;
    const sortedEvidence = [...evidence].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    let checkDate = new Date();
    
    for (const e of sortedEvidence) {
      const eDate = new Date(e.date);
      const diffDays = Math.floor((checkDate.getTime() - eDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 0 || diffDays === 1) {
        streak++;
        checkDate = eDate;
      } else break;
    }
    
    const avgStrength = Math.round(
      evidence.reduce((sum, e) => sum + e.strength, 0) / evidence.length * 10
    );
    
    const proofs: Record<string, number> = {};
    evidence.forEach(e => {
      proofs[e.identityProof] = (proofs[e.identityProof] || 0) + 1;
    });

    return {
      totalActions: evidence.length,
      streak,
      avgStrength,
      identityProofs: proofs
    };
  };

  const stats = calculateStats();

  const handleExport = () => {
    const exportData = {
      date: new Date().toISOString(),
      evidence,
      stats,
      summary: {
        totalEvidence: evidence.length,
        currentStreak: stats.streak,
        averageStrength: stats.avgStrength,
        strongestIdentity: Object.entries(stats.identityProofs).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None'
      }
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evidence-tracking-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const groupedEvidence = evidence.reduce((groups, e) => {
    const date = new Date(e.date).toLocaleDateString();
    if (!groups[date]) groups[date] = [];
    groups[date].push(e);
    return groups;
  }, {} as Record<string, Evidence[]>);

  return (
      <AccessGate appSlug="evidence-tracking">
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
                <BarChart3 className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#1F6F78]/50">{getText('PREMIUM', 'متميز')}</Badge>
                </div>
                <h1 className="text-xl font-bold">{getText('Evidence Tracker', 'متتبع الأدلة')}</h1>
              </div>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
            >
              <Plus className="w-4 h-4 mr-2" />
              {getText('Log Evidence', 'تسجيل دليل')}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[#FFB74D]/10 flex items-center justify-center mx-auto mb-2">
                <Flame className="w-5 h-5 text-[#FFB74D]" />
              </div>
              <div className="text-3xl font-bold text-[#0F1C2E]">{stats.streak}</div>
              <p className="text-xs text-[#8A94A6]">{getText('Day Streak', 'سلسلة الأيام')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-2">
                <Target className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div className="text-3xl font-bold text-[#0F1C2E]">{stats.totalActions}</div>
              <p className="text-xs text-[#8A94A6]">{getText('Evidence Logged', 'أدلة مسجلة')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-5 h-5 text-[#1F6F78]" />
              </div>
              <div className="text-3xl font-bold text-[#0F1C2E]">{stats.avgStrength}%</div>
              <p className="text-xs text-[#8A94A6]">{getText('Avg Strength', 'متوسط القوة')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[#FFB74D]/10 flex items-center justify-center mx-auto mb-2">
                <Award className="w-5 h-5 text-[#FFB74D]" />
              </div>
              <div className="text-3xl font-bold text-[#0F1C2E]">
                {evidence.filter(e => e.followedThrough).length}
              </div>
              <p className="text-xs text-[#8A94A6]">{getText('Follow-throughs', 'المتابعات')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Evidence Form */}
        {showForm && (
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#3DD4B0]" />
                {getText("Log Today's Evidence", 'سجّل دليل اليوم')}
              </CardTitle>
              <CardDescription>
                {getText('Record concrete proof of behavior change - based on self-monitoring research', 'سجّل دليلًا ملموسًا على التغيير السلوكي - بناءً على أبحاث المراقبة الذاتية')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
                  {getText("Today's action", 'إجراء اليوم')}
                </label>
                <Textarea
                  placeholder={getText('What action did you take today?', 'ما الإجراء الذي اتخذته اليوم؟')}
                  value={formData.action}
                  onChange={(e) => setFormData(prev => ({ ...prev, action: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
                  {getText('Evidence', 'الدليل')}
                </label>
                <Textarea
                  placeholder={getText('What concrete proof do you have? Be specific.', 'ما الدليل الملموس الذي لديك؟ كن محددًا.')}
                  value={formData.evidence}
                  onChange={(e) => setFormData(prev => ({ ...prev, evidence: e.target.value }))}
                  className="min-h-[80px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">{getText('Example: "I wrote my top 3 priorities before checking my phone"', 'مثال: "كتبت أهم ٣ أولويات قبل التحقق من هاتفي"')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
                  {getText('Identity proof', 'دليل الهوية')}
                </label>
                <div className="flex flex-wrap gap-2">
                  {identityProofs.map((proof, i) => (
                    <Badge
                      key={i}
                      variant={formData.identityProof === proof ? 'default' : 'outline'}
                      className={`cursor-pointer ${formData.identityProof === proof ? 'bg-[#3DD4B0] text-[#0F1C2E]' : 'hover:bg-[#3DD4B0]/10'}`}
                      onClick={() => setFormData(prev => ({ ...prev, identityProof: proof }))}
                    >
                      {proof}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
                  {getText('Did you follow through?', 'هل التزمت بالتنفيذ؟')}
                </label>
                <div className="flex gap-4">
                  <Badge
                    variant={formData.followedThrough ? 'default' : 'outline'}
                    className={`cursor-pointer py-2 px-4 ${formData.followedThrough ? 'bg-[#3DD4B0] text-[#0F1C2E]' : 'hover:bg-[#3DD4B0]/10 border-[#3DD4B0] text-[#3DD4B0]'}`}
                    onClick={() => setFormData(prev => ({ ...prev, followedThrough: true }))}
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" /> {getText('Yes', 'نعم')}
                  </Badge>
                  <Badge
                    variant={!formData.followedThrough ? 'default' : 'outline'}
                    className={`cursor-pointer py-2 px-4 ${!formData.followedThrough ? 'bg-[#E57373] text-white' : 'hover:bg-[#E57373]/10 border-[#E57373] text-[#E57373]'}`}
                    onClick={() => setFormData(prev => ({ ...prev, followedThrough: false }))}
                  >
                    {getText('Not fully', 'ليس بالكامل')}
                  </Badge>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <label className="font-medium text-[#0F1C2E]">{getText('Strength of evidence', 'قوة الدليل')}</label>
                  <span className="text-[#8A94A6]">{formData.strength}/10</span>
                </div>
                <Slider
                  value={[formData.strength]}
                  onValueChange={([v]) => setFormData(prev => ({ ...prev, strength: v }))}
                  max={10}
                  min={1}
                  step={1}
                />
                <p className="text-xs text-[#8A94A6] mt-1">{getText('How strong is this proof of your identity change?', 'ما مدى قوة هذا الدليل على تغيير هويتك؟')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">
                  {getText('Notes (optional)', 'ملاحظات (اختياري)')}
                </label>
                <Textarea
                  placeholder={getText('Any additional reflections...', 'أي تأملات إضافية...')}
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="min-h-[60px]"
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                  {getText('Cancel', 'إلغاء')}
                </Button>
                <Button
                  onClick={handleAddEvidence}
                  disabled={!formData.action || !formData.evidence}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {getText('Log Evidence', 'تسجيل دليل')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Identity Proof Summary */}
        {Object.keys(stats.identityProofs).length > 0 && (
          <Card className="bg-[#0F1C2E] mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#3DD4B0]" />
                {getText('Identity Evidence Summary', 'ملخص أدلة الهوية')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(stats.identityProofs)
                  .sort((a, b) => b[1] - a[1])
                  .map(([proof, count], i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white">{proof}</span>
                          <span className="text-[#3DD4B0]">{count} {getText('actions', 'إجراءات')}</span>
                        </div>
                        <Progress 
                          value={(count / stats.totalActions) * 100} 
                          className="h-2 bg-white/10 [&>div]:bg-[#3DD4B0]" 
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Evidence Log */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#0F1C2E]">{getText('Evidence Log', 'سجل الأدلة')}</CardTitle>
              {evidence.length > 0 && (
                <Button onClick={handleExport} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  {getText('Export', 'تصدير')}
                </Button>
              )}
            </div>
            <CardDescription>
              {getText('Each entry is proof of who you\'re becoming', 'كل إدخال هو دليل على من تصبح')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {evidence.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-[#8A94A6] mx-auto mb-4" />
                <p className="text-[#8A94A6]">{getText('No evidence logged yet. Start recording proof of your transformation.', 'لم يتم تسجيل أدلة بعد. ابدأ بتسجيل دليل تحولك.')}</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {Object.entries(groupedEvidence).map(([date, items]) => (
                  <div key={date}>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-[#3DD4B0]" />
                      <span className="text-sm font-medium text-[#0F1C2E]">{date}</span>
                      <Badge variant="secondary" className="text-xs">{items.length} {getText('actions', 'إجراءات')}</Badge>
                    </div>
                    <div className="space-y-3">
                      {items.map((e) => (
                        <div 
                          key={e.id} 
                          className="p-4 bg-[#F6F8FA] rounded-lg hover:bg-[#F6F8FA]/80 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {e.followedThrough ? (
                                <CheckCircle2 className="w-4 h-4 text-[#3DD4B0]" />
                              ) : (
                                <CheckCircle2 className="w-4 h-4 text-[#FFB74D]" />
                              )}
                              <span className="text-sm font-medium text-[#0F1C2E]">{e.action}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{e.strength}/10</Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteEvidence(e.id)}
                                className="text-[#E57373] hover:bg-[#E57373]/10 h-6 w-6 p-0"
                              >
                                ×
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-[#2B2E34] mb-2">{e.evidence}</p>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] text-xs">
                              {e.identityProof}
                            </Badge>
                          </div>
                          {e.notes && (
                            <p className="text-xs text-[#8A94A6] mt-2 italic">{e.notes}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scientific Reference */}
        <Card className="bg-[#1F6F78]/10 border-[#1F6F78]/30 mt-8">
          <CardContent className="p-6">
            <h4 className="font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#3DD4B0]" />
              {getText('Why Evidence Tracking Works', 'لماذا يعمل تتبع الأدلة')}
            </h4>
            <p className="text-sm text-[#2B2E34] mb-3">
              {getText(
                'Research shows that monitoring goal progress significantly promotes goal attainment. Self-monitoring is a key element in behavior change, helping you see patterns and build evidence for your new identity.',
                'تظهر الأبحاث أن مراقبة تقدم الأهداف يعزز بشكل كبير تحقيق الأهداف. المراقبة الذاتية هي عنصر أساسي في التغيير السلوكي، تساعدك على رؤية الأنماط وبناء الأدلة لهويتك الجديدة.'
              )}
            </p>
            <p className="text-xs text-[#1F6F78]">
              {getText('Reference: Harkin et al. "Does Monitoring Goal Progress Promote Goal Attainment?"', 'المرجع: هاركين وآخرون. "هل تعزز مراقبة تقدم الأهداف تحقيقها؟"')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </AccessGate>
    );
}
