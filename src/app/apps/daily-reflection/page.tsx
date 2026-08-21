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
import { useLocale } from '@/components/providers/LocaleProvider';

const reflectionPromptsEn = [
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
      "If I continued today's patterns for a year, where would I be?",
      'What small action today moved me closer to my vision?',
      'What does my ideal tomorrow look like?',
      'What habit would my future self want me to start today?'
    ]
  }
];

const reflectionPromptsAr = [
  {
    theme: 'الوعي الذاتي',
    prompts: [
      'ماذا سيفعل شخص يحمل هويتي المستهدفة أول شيء كل صباح؟',
      'كيف عكست أفعالي اليوم الشخص الذي أريد أن أصبحه؟',
      'ماذا تعلّمت عن نفسي اليوم؟',
      'متى شعرت بأكبر انسجام مع قيمي اليوم؟',
      'ما القرار الذي أفخر به أكثر اليوم، ولماذا؟'
    ]
  },
  {
    theme: 'تحوّل الهوية',
    prompts: [
      'كيف تستجيب هويتي المستهدفة للتحديات غير المتوقعة؟',
      'ما الدليل الذي جمعته اليوم الذي يدعم هويتي الجديدة؟',
      'ما النمط القديم الذي لاحظته واخترت مختلفًا اليوم؟',
      'كيف سيتعامل الشخص الذي أريد أن أصبحه مع هذا الموقف؟',
      'ما المعتقد الهويّاتي الذي تحدّيته اليوم؟'
    ]
  },
  {
    theme: 'عقلية النمو',
    prompts: [
      'ما التحدي اليوم الذي كان في الحقيقة فرصة مقنّعة؟',
      'كيف خرجت من منطقة راحتي اليوم؟',
      'ماذا سأفعل بشكل مختلف لو عرفت أنني لا أستطيع الفشل؟',
      'ما المهارة أو المعرفة التي طوّرتها اليوم؟',
      'كما استجبت للنكسة أو الصعوبة؟'
    ]
  },
  {
    theme: 'محاذاة القيم',
    prompts: [
      'هل طابقت أفعالي اليوم قيمي المعلنة؟ أين كانت الفجوة؟',
      'ما القيمة التي كرّمتها أكثر اليوم؟',
      'متى شعرت بتعارض بين قيمي وأفعالي؟',
      'ما الحد الذي حافظت عليه (أو أحتاج للحفاظ عليه) اليوم؟',
      'كما عبّرت عن قيمي الجوهرية من خلال سلوكي؟'
    ]
  },
  {
    theme: 'الذكاء العاطفي',
    prompts: [
      'ما العاطفة التي فاجأتني اليوم؟ ما الذي أثارها؟',
      'كما نظّمت مشاعري عندما واجهت تحديًا؟',
      'ما الحاجة الكامنة التي كنت أحاول تلبيتها من خلال سلوكي؟',
      'كيف أثرت حالتي العاطفية على قراراتي اليوم؟',
      'ماذا سأقول لصديق شعر بنفس ما شعرت به اليوم؟'
    ]
  },
  {
    theme: 'التصميم البيئي',
    prompts: [
      'ما الذي في بيئتي ساعد أو أعاق تقدّمي اليوم؟',
      'كيف يمكنني إعادة تصميم بيئتي لتسهيل الغد؟',
      'ما نقاط الاحتكاك التي واجهتها، وكيف يمكنني إزالتها؟',
      'ما المحفّز الذي أطلق عادة إيجابية اليوم؟',
      'كيف أثر الأشخاص من حولي على سلوكي؟'
    ]
  },
  {
    theme: 'الذات المستقبلية',
    prompts: [
      'ما الذي سيشكرني عليه ذاتي المستقبلية لفعله اليوم؟',
      'لو استمريت في أنماط اليوم لمدة سنة، أين سأكون؟',
      'ما الفعل الصغير اليوم الذي قرّبني من رؤيتي؟',
      'كيف يبدو غدي المثالي؟',
      'ما العادة التي تريد ذاتي المستقبلية أن أبدأها اليوم؟'
    ]
  }
];

// Function to get today's prompt based on date
function getTodaysPrompt(locale: string) {
  const prompts = locale === 'ar' ? reflectionPromptsAr : reflectionPromptsEn;
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const totalPrompts = prompts.reduce((sum, cat) => sum + cat.prompts.length, 0);
  
  let promptIndex = dayOfYear % totalPrompts;
  let currentCount = 0;
  
  for (const category of prompts) {
    if (promptIndex < currentCount + category.prompts.length) {
      const localIndex = promptIndex - currentCount;
      return {
        prompt: category.prompts[localIndex],
        theme: category.theme
      };
    }
    currentCount += category.prompts.length;
  }
  
  return { prompt: prompts[0].prompts[0], theme: prompts[0].theme };
}

// Function to get random prompt
function getRandomPrompt(locale: string) {
  const prompts = locale === 'ar' ? reflectionPromptsAr : reflectionPromptsEn;
  const category = prompts[Math.floor(Math.random() * prompts.length)];
  const prompt = category.prompts[Math.floor(Math.random() * category.prompts.length)];
  return { prompt, theme: category.theme };
}

export default function DailyReflectionPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const [currentPrompt, setCurrentPrompt] = useState<{ prompt: string; theme: string } | null>(() => getTodaysPrompt(locale));
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
    setCurrentPrompt(getRandomPrompt(locale));
    setReflection('');
  };

  const handleTodaysPrompt = () => {
    setCurrentPrompt(getTodaysPrompt(locale));
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
      title: getText('✅ Reflection Saved!', '✅ تم حفظ التأمّل!'),
      description: getText('Your reflection has been saved successfully. Keep building your identity!', 'تم حفظ تأمّلك بنجاح. استمر في بناء هويتك!'),
      duration: 3000,
    });
    setTimeout(() => setSaveConfirmation(false), 3000);
    
    // Clear for next entry
    setReflection('');
    setCurrentPrompt(getRandomPrompt(locale));
  };

  const themeColors: Record<string, string> = {
    'Self-Awareness': '#3DD4B0',
    'الوعي الذاتي': '#3DD4B0',
    'Identity Shift': '#1F6F78',
    'تحوّل الهوية': '#1F6F78',
    'Growth Mindset': '#2A8A94',
    'عقلية النمو': '#2A8A94',
    'Values Alignment': '#C97B7B',
    'محاذاة القيم': '#C97B7B',
    'Emotional Intelligence': '#2A8A94',
    'الذكاء العاطفي': '#2A8A94',
    'Environmental Design': '#2A8A94',
    'التصميم البيئي': '#2A8A94',
    'Future Self': '#3DD4B0',
    'الذات المستقبلية': '#3DD4B0'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            {locale === 'ar' ? '→ العودة للتطبيقات' : '← Back to Apps'}
          </Link>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2A8A94]/20 flex items-center justify-center">
                <Sun className="w-5 h-5 text-[#2A8A94]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{getText('Daily Reflection Prompt', 'محفّز التأمّل اليومي')}</h1>
                <p className="text-slate-400 text-sm">{getText('FREE • Daily identity-focused reflection', 'مجاني • تأمّل يومي مركّز على الهوية')}</p>
              </div>
            </div>
            <Button
              onClick={() => setShowHistory(!showHistory)}
              variant="accent"
              className="shadow-md"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {showHistory ? getText("Today's Prompt", 'محفّز اليوم') : getText('History', 'السجل')}
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
              <p className="text-white font-semibold">{getText('Reflection Saved Successfully!', 'تم حفظ التأمّل بنجاح!')}</p>
              <p className="text-slate-300 text-sm">{getText('Your reflection has been saved locally. Keep building your identity!', 'تم حفظ تأمّلك محليًا. استمر في بناء هويتك!')}</p>
            </div>
          </div>
        )}
        {showHistory ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">{getText('Reflection History', 'سجل التأمّلات')}</h2>
            
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
                          {new Date(entry.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { 
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
                  <h3 className="text-white font-semibold mb-2">{getText('No reflections yet', 'لا توجد تأمّلات بعد')}</h3>
                  <p className="text-slate-400">{getText('Start reflecting to build your history.', 'ابدأ بالتأمّل لبناء سجلك.')}</p>
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
              {getText('Export Reflections', 'تصدير التأمّلات')}
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
                        title={getText("Today's assigned prompt", 'محفّز اليوم المحدد')}
                      >
                        <Calendar className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={handleNewPrompt}
                        variant="outline"
                        size="sm"
                        title={getText('Get random prompt', 'الحصول على محفّز عشوائي')}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-[#0F1C2E] leading-relaxed mb-6">
                    {currentPrompt.prompt}
                  </h2>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-[#8A94A6]">{getText('Take a moment to reflect deeply on this question.', 'خذ لحظة للتأمّل بعمق في هذا السؤال.')}</p>
                    <p className="text-xs text-[#8A94A6]">{getText('Your reflection is saved locally on your device.', 'يتم حفظ تأمّلك محليًا على جهازك.')}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reflection Input */}
            <Card className="bg-white/10 border-white/20 mb-6">
              <CardContent className="p-6">
                <label className="text-sm font-medium text-white mb-2 block">
                  {getText('Your Reflection', 'تأمّلك')}
                </label>
                <Textarea
                  placeholder={getText('Write your thoughts here... Be honest with yourself. This is for your growth.', 'اكتب أفكارك هنا... كن صادقًا مع نفسك. هذا من أجل نموّك.')}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="min-h-[200px] bg-white border-white/20 text-[#0F1C2E] placeholder:text-[#8A94A6]"
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-slate-400">{reflection.length} {getText('characters', 'حرف')}</span>
                  <Button
                    onClick={handleSaveReflection}
                    disabled={!reflection.trim()}
                    className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
                  >
                    {getText('Save Reflection', 'حفظ التأمّل')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-[#0F1C2E] border-[#1F6F78]/30">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">{getText('Your Reflection Stats', 'إحصائيات تأمّلاتك')}</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-[#3DD4B0]">{pastReflections.length}</div>
                    <div className="text-xs text-slate-400">{getText('Total Reflections', 'إجمالي التأمّلات')}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#3DD4B0]">
                      {pastReflections.filter(r => 
                        new Date(r.date).toDateString() === new Date().toDateString()
                      ).length}
                    </div>
                    <div className="text-xs text-slate-400">{getText('Today', 'اليوم')}</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#3DD4B0]">
                      {new Set(pastReflections.map(r => r.theme)).size}
                    </div>
                    <div className="text-xs text-slate-400">{getText('Themes Explored', 'المواضيع المستكشفة')}</div>
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
