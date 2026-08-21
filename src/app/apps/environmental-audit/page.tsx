'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useLocale } from '@/components/providers/LocaleProvider';
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

export default function EnvironmentalAuditPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

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
  const [checklist, setChecklist] = useState([
    { id: '1', text: getText('Remove distractions from desk', 'أزِل المشتّات من المكتب'), checked: false },
    { id: '2', text: getText('Turn off non-essential notifications', 'أوقِف الإشارات غير الضرورية'), checked: false },
    { id: '3', text: getText('Add visual reminder of target identity', 'أضِف تذكيرًا بصريًا للهويّة المستهدفة'), checked: false },
    { id: '4', text: getText('Place tools within reach', 'ضَع الأدوات في متناول اليد'), checked: false },
    { id: '5', text: getText('Create friction for bad habits', 'أنشئ عائقًا للعادات السيئة'), checked: false },
    { id: '6', text: getText('Reduce friction for good habits', 'قلّل العوائق للعادات الجيدة'), checked: false },
  ]);
  const [customItem, setCustomItem] = useState('');

  const frictionPoints = [
    getText('Cluttered workspace', 'مساحة عمل فوضوية'),
    getText('Phone distractions', 'مشتّتات الهاتف'),
    getText('Noise interruptions', 'مقاطعات الضوضاء'),
    getText('Poor lighting', 'إضاءة سيئة'),
    getText('Uncomfortable seating', 'جلوس غير مريح'),
    getText('Easy access to temptations', 'سهولة الوصول إلى المغريات'),
    getText('Lack of organized tools', 'نقص الأدوات المنظمة'),
    getText('No designated workspace', 'عدم وجود مساحة عمل مخصصة')
  ];

  const cueSuggestions = [
    getText('Leave notebook open on desk', 'اترك الدفتر مفتوحًا على المكتب'),
    getText('Place water bottle visible', 'ضَع زجاجة الماء في مكان مرئي'),
    getText('Set phone in another room', 'ضَع الهاتف في غرفة أخرى'),
    getText('Create morning playlist', 'أنشئ قائمة تشغيل صباحية'),
    getText('Prepare clothes the night before', 'جهّز الملابس من الليلة السابقة'),
    getText('Visual reminder of target identity', 'تذكير بصري للهويّة المستهدفة'),
    getText('Calendar blocking visible', 'حجب التقويم مرئي'),
    getText('Environment reset ritual', 'طقس إعادة ضبط البيئة')
  ];

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
    setChecklist([
      { id: '1', text: getText('Remove distractions from desk', 'أزِل المشتّات من المكتب'), checked: false },
      { id: '2', text: getText('Turn off non-essential notifications', 'أوقِف الإشارات غير الضرورية'), checked: false },
      { id: '3', text: getText('Add visual reminder of target identity', 'أضِف تذكيرًا بصريًا للهويّة المستهدفة'), checked: false },
      { id: '4', text: getText('Place tools within reach', 'ضَع الأدوات في متناول اليد'), checked: false },
      { id: '5', text: getText('Create friction for bad habits', 'أنشئ عائقًا للعادات السيئة'), checked: false },
      { id: '6', text: getText('Reduce friction for good habits', 'قلّل العوائق للعادات الجيدة'), checked: false },
    ]);
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  if (showResults) {
    const score = calculateEnvironmentScore();

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
                <Home className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#1F6F78]/50">{getText('BASIC', 'أساسي')}</Badge>
                <h1 className="text-xl font-bold">{getText('Environmental Audit Results', 'نتائج التدقيق البيئي')}</h1>
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
            <h2 className="text-3xl font-bold text-white mb-2">{getText('Your Environment Score', 'درجة بيئتك')}</h2>
            <p className="text-slate-400">{getText('How supportive is your environment for change?', 'ما مدى دعم بيئتك للتغيير؟')}</p>
          </div>

          {/* Overall Score */}
          <Card className="bg-white mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-[#8A94A6] text-sm uppercase tracking-wide mb-4">{getText('Environment Support Score', 'درجة دعم البيئة')}</h3>
              <div className="text-6xl font-bold text-[#0F1C2E] mb-2">{score}%</div>
              <p className="text-[#8A94A6] mb-6">
                {score >= 80 ? getText('Excellent environment for transformation!', 'بيئة ممتازة للتحوّل!') :
                 score >= 60 ? getText('Good foundation with some friction points.', 'أساس جيد مع بعض نقاط الاحتكاك.') :
                 score >= 40 ? getText('Significant environmental barriers exist.', 'توجد حواجز بيئية كبيرة.') :
                 getText('Major environmental redesign needed.', 'يتطلب إعادة تصميم بيئي كبير.')}
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
                  <h4 className="font-semibold text-[#0F1C2E]">{getText('Physical Space', 'المساحة المادية')}</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.physicalSpace || getText('Not provided', 'لم يُقدَّم')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Monitor className="w-5 h-5 text-[#1F6F78]" />
                  <h4 className="font-semibold text-[#0F1C2E]">{getText('Digital Environment', 'البيئة الرقمية')}</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.digitalEnvironment || getText('Not provided', 'لم يُقدَّم')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-[#2A8A94]" />
                  <h4 className="font-semibold text-[#0F1C2E]">{getText('Social Circle', 'الدائرة الاجتماعية')}</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.socialCircle || getText('Not provided', 'لم يُقدَّم')}</p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-5 h-5 text-[#0F1C2E]" />
                  <h4 className="font-semibold text-[#0F1C2E]">{getText('Resource Access', 'الوصول إلى الموارد')}</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.resourceAccess || getText('Not provided', 'لم يُقدَّم')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="bg-[#2A8A94]/10 border border-[#2A8A94]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-[#2A8A94]" />
                  <h4 className="font-semibold text-[#0F1C2E]">{getText('Main Friction Point', 'نقطة الاحتكاك الرئيسية')}</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.mainFriction || getText('Not identified', 'لم تُحدَّد')}</p>
              </CardContent>
            </Card>

            <Card className="bg-[#3DD4B0]/10 border border-[#3DD4B0]/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#3DD4B0]" />
                  <h4 className="font-semibold text-[#0F1C2E]">{getText('Best Cue to Add', 'أفضل إشارة لإضافتها')}</h4>
                </div>
                <p className="text-sm text-[#2B2E34]">{data.bestCue || getText('Not defined', 'لم تُحدَّد')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Checklist */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
                {getText('Environment Action Checklist', 'قائمة إجراءات البيئة')}
              </CardTitle>
              <CardDescription>
                {getText('Track your environment improvements', 'تتبّع تحسينات بيئتك')}
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
                <Lightbulb className="w-4 h-4 text-[#2A8A94]" />
                {getText('Why Environment Matters', 'لماذا البيئة مهمة')}
              </h4>
              <p className="text-slate-400 text-sm mb-3">
                {getText(
                  'Research shows that environmental friction and action cues significantly impact behavior change. The psychology of habits demonstrates that reducing friction for desired behaviors and adding visual cues can dramatically improve follow-through.',
                  'تُظهر الأبحاث أن الاحتكاك البيئي وإشارات الفعل تؤثر بشكل كبير على تغيير السلوك. يُثبت علم نفس العادات أن تقليل العوائق للسلوكيات المرغوبة وإضافة إشارات بصرية يمكن أن يحسّن المتابعة بشكل كبير.'
                )}
              </p>
              <p className="text-xs text-[#3DD4B0]">
                {getText(
                  'Reference: Mazar, et al. "Using the psychology of habits to promote sustainability"',
                  'مرجع: مازار وآخرون "استخدام علم نفس العادات لتعزيز الاستدامة"'
                )}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={handleReset} variant="secondary" className="shadow-md">
              <RotateCcw className="w-4 h-4 mr-2" />
              {getText('Retake Audit', 'إعادة التدقيق')}
            </Button>
            <Button onClick={handleExport} className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]">
              <Download className="w-4 h-4 mr-2" />
              {getText('Export Audit', 'تصدير التدقيق')}
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
              <Home className="w-5 h-5 text-[#3DD4B0]" />
            </div>
            <div>
              <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#1F6F78]/50">{getText('BASIC', 'أساسي')}</Badge>
              <h1 className="text-xl font-bold">{getText('Environmental Audit', 'التدقيق البيئي')}</h1>
              <p className="text-slate-400 text-sm">{getText('Identify what supports or blocks change', 'حدّد ما يدعم التغيير أو يعيقه')}</p>
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
                <Home className="w-5 h-5 text-[#3DD4B0]" />
                {getText('Physical & Digital Environment', 'البيئة المادية والرقمية')}
              </CardTitle>
              <CardDescription>
                {getText('Assess your physical workspace and digital distractions', 'قيّم مساحة عملك المادية والمشتّتات الرقمية')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#3DD4B0]" />
                  {getText('Physical space', 'المساحة المادية')}
                </label>
                <Textarea
                  placeholder={getText("My desk is... My workspace... Physical cues present...", "مكتبي... مساحة عملي... الإشارات المادية الموجودة...")}
                  value={data.physicalSpace}
                  onChange={(e) => setData(prev => ({ ...prev, physicalSpace: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">{getText('Describe your workspace and physical environment', 'صِف مساحة عملك وبيئتك المادية')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-[#1F6F78]" />
                  {getText('Digital environment', 'البيئة الرقمية')}
                </label>
                <Textarea
                  placeholder={getText("Notifications... Apps... Screen time... Digital distractions...", "الإشارات... التطبيقات... وقت الشاشة... المشتّتات الرقمية...")}
                  value={data.digitalEnvironment}
                  onChange={(e) => setData(prev => ({ ...prev, digitalEnvironment: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">{getText('What digital elements compete for your attention?', 'ما العناصر الرقمية التي تتنافس على انتباهك؟')}</p>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!data.physicalSpace || !data.digitalEnvironment}
                className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
              >
                {getText('Continue', 'متابعة')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2A8A94]" />
                {getText('Social & Resources', 'الاجتماعي والموارد')}
              </CardTitle>
              <CardDescription>
                {getText('Assess your social environment and available resources', 'قيّم بيئتك الاجتماعية والموارد المتاحة')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#2A8A94]" />
                  {getText('Social circle', 'الدائرة الاجتماعية')}
                </label>
                <Textarea
                  placeholder={getText("Who supports my goals? Who normalizes unwanted behaviors...", "من يدعم أهدافي؟ من يُشرعن السلوكيات غير المرغوبة...")}
                  value={data.socialCircle}
                  onChange={(e) => setData(prev => ({ ...prev, socialCircle: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">{getText('How do people around you influence your behavior?', 'كيف يؤثر من حولك على سلوكك؟')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#0F1C2E]" />
                  {getText('Resource access', 'الوصول إلى الموارد')}
                </label>
                <Textarea
                  placeholder={getText("Tools available... Resources organized... Access to what I need...", "الأدوات المتاحة... الموارد المنظمة... الوصول لما أحتاجه...")}
                  value={data.resourceAccess}
                  onChange={(e) => setData(prev => ({ ...prev, resourceAccess: e.target.value }))}
                  className="min-h-[100px]"
                />
                <p className="text-xs text-[#8A94A6] mt-1">{getText('What tools and resources do you have access to?', 'ما الأدوات والموارد التي يمكنك الوصول إليها؟')}</p>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  {getText('← Back', '→ رجوع')}
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!data.socialCircle || !data.resourceAccess}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
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
                <Zap className="w-5 h-5 text-[#2A8A94]" />
                {getText('Friction & Cues', 'الاحتكاك والإشارات')}
              </CardTitle>
              <CardDescription>
                {getText('Identify friction points and design new cues', 'حدّد نقاط الاحتكاك وصمّم إشارات جديدة')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#2A8A94]" />
                  {getText('Main friction point', 'نقطة الاحتكاك الرئيسية')}
                </label>
                <Textarea
                  placeholder={getText("What makes starting difficult? What consistently blocks progress?", "ما الذي يجعل البدء صعبًا؟ ما الذي يعيق التقدم باستمرار؟")}
                  value={data.mainFriction}
                  onChange={(e) => setData(prev => ({ ...prev, mainFriction: e.target.value }))}
                  className="min-h-[80px]"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {frictionPoints.slice(0, 4).map((point, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="cursor-pointer hover:bg-[#2A8A94]/10"
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
                  {getText('Best cue to add', 'أفضل إشارة لإضافتها')}
                </label>
                <Textarea
                  placeholder={getText("What visual or environmental cue could trigger the desired behavior?", "أيّ إشارة بصرية أو بيئية يمكن أن تحفّز السلوك المطلوب؟")}
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
                  {getText('← Back', '→ رجوع')}
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  disabled={!data.mainFriction || !data.bestCue}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
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
                {getText('Action Checklist', 'قائمة الإجراءات')}
              </CardTitle>
              <CardDescription>
                {getText('Create your environment improvement checklist', 'أنشئ قائمة تحسين بيئتك')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-[#8A94A6] mb-4">
                {getText("Check off the actions you'll take to optimize your environment:", "حدّد الإجراءات التي ستتخذها لتحسين بيئتك:")}
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
                  placeholder={getText("Add custom action...", "أضِف إجراءً مخصصًا...")}
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
                  {getText('← Back', '→ رجوع')}
                </Button>
                <Button
                  onClick={() => setShowResults(true)}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {getText('Complete Audit', 'إكمال التدقيق')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
