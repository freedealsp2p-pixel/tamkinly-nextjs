"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';
import { MedicalDisclaimer } from '@/components/recovery/system';
import { SafetyResponse } from '@/components/recovery/system';
import { TherapeuticExit } from '@/components/recovery/system';
import { DistressCheckIn } from '@/components/recovery/system/DistressCheckIn';
import EnhancedSuggestedNextStep from '@/components/recovery/system/EnhancedSuggestedNextStep';
import { useTrcState } from '@/hooks/useRecoveryState';
import { Gauge, Wind, Eye, Shield, Heart, Brain, AlertTriangle, Clock, CheckCircle2, ArrowRight, ArrowLeft, Zap, CloudRain, Snowflake, Compass, BookOpen } from 'lucide-react';

type UserState = 'overwhelmed' | 'activated' | 'disconnected' | 'intrusive' | 'uncertain' | null;
type Phase = 'question' | 'results' | 'detail';

interface ToolInfo {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  useWhenAr: string;
  useWhenEn: string;
  dontUseWhenAr: string;
  dontUseWhenEn: string;
  safetyLevel: 'low' | 'moderate' | 'higher';
  estimatedMinutes: number;
  route: string;
  nextStepAr: string;
  nextStepEn: string;
}

const tools: ToolInfo[] = [
  {
    id: 'grounding-54321',
    nameAr: 'تنظيم الحواس 5-4-3-2-1',
    nameEn: '5-4-3-2-1 Sensory Grounding',
    descAr: 'أعد تواصلك مع اللحظة الحالية عبر حواسك الخمس. تقنية ارتكاز فورية تعيد الدماغ للحاضر.',
    descEn: 'Reconnect with the present moment through your five senses. An immediate grounding technique that brings the brain back to the present.',
    useWhenAr: 'عندما تشعر بالإرهاق الشديد أو النوبة أو أنك بعيد عن الواقع',
    useWhenEn: 'When you feel overwhelmed, panicking, or disconnected from reality',
    dontUseWhenAr: 'إذا كانت الحواس نفسها محفزة جداً (أصوات عالية مفرطة)',
    dontUseWhenEn: 'If the senses themselves are too triggering (extreme loud sounds)',
    safetyLevel: 'low',
    estimatedMinutes: 5,
    route: '/recovery/trc/grounding',
    nextStepAr: 'تنفس A52 بعد الارتكاز',
    nextStepEn: 'A52 breathing after grounding',
  },
  {
    id: 'a52-breathing',
    nameAr: 'تنفس A52 (5-5-2)',
    nameEn: 'A52 Breathing (5-5-2)',
    descAr: 'تنفس بطيء ومنظم: شهيق 5 ثوانٍ − احباس 2 ثانية. يفعّل العصب الحائر لتهدئة الجهاز العصبي.',
    descEn: 'Slow regulated breathing: inhale 5s − hold 2s. Activates the vagus nerve to calm the nervous system.',
    useWhenAr: 'عندما تكون منشطاً لكن يمكنك التركيز على التنفس',
    useWhenEn: 'When you are activated but can focus on breathing',
    dontUseWhenAr: 'نوبة هلع شديدة تمنع التنفس — استخدم Box Breathing بدلاً منه',
    dontUseWhenEn: 'Severe panic preventing breathing — use Box Breathing instead',
    safetyLevel: 'low',
    estimatedMinutes: 8,
    route: '/recovery/trc/a52',
    nextStepAr: 'المكان الآمن بعد التنفس',
    nextStepEn: 'Safe place after breathing',
  },
  {
    id: 'safe-place',
    nameAr: 'المكان الآمن الداخلي',
    nameEn: 'Safe Place Visualization',
    descAr: 'بصر مكاناً تشعر فيه بالأمان التام. أداة تنظيم عميقة تعيد بناء الإحساس بالأمان الداخلي.',
    descEn: 'Visualize a place where you feel completely safe. A deep regulation tool that rebuilds the internal sense of safety.',
    useWhenAr: 'عندما تحتاج مكاناً آمناً نفسياً — ليس جسدياً فقط',
    useWhenEn: 'When you need a psychologically safe place — not just physically',
    dontUseWhenAr: 'تفارق نشط يمنع التخيل — ابدأ بالارتكاز 5-4-3-2-1 أولاً',
    dontUseWhenEn: 'Active dissociation preventing visualization — start with 5-4-3-2-1 grounding first',
    safetyLevel: 'moderate',
    estimatedMinutes: 10,
    route: '/recovery/trc/safe-place',
    nextStepAr: 'مسح الجسد بعد المكان الآمن',
    nextStepEn: 'Body scan after safe place',
  },
  {
    id: 'body-scan',
    nameAr: 'مسح الجسد الموجه',
    nameEn: 'Guided Body Scan',
    descAr: 'انتبه لجسدك من الرأس إلى القدمين مع التنفس العميق. تعلم أين يخزن الصدمة وأين يمكن إرخاء التوتر.',
    descEn: 'Attend to your body from head to feet with deep breathing. Learn where trauma is stored and where you can release tension.',
    useWhenAr: 'عندما تستطيع البقاء في الحاضر وتريد فهم استجابات جسدك',
    useWhenEn: 'When you can stay present and want to understand your body responses',
    dontUseWhenAr: 'تفارق شديد أو ذكريات اقتحامية حية — ابدأ بالارتكاز والتنفس أولاً',
    dontUseWhenEn: 'Severe dissociation or vivid intrusive memories — start with grounding and breathing first',
    safetyLevel: 'higher',
    estimatedMinutes: 12,
    route: '/recovery/trc/body-scan',
    nextStepAr: 'خريطة المحفزات لفهم الأنماط',
    nextStepEn: 'Trigger mapping to understand patterns',
  },
  {
    id: 'trigger-mapping',
    nameAr: 'خريطة المحفزات',
    nameEn: 'Trigger Mapping',
    descAr: 'حدد محفزاتك الشخصية واستجابات جسدك وعواطفك. أداة فهم الأنماط — ليست علاجاً بالتعرض.',
    descEn: 'Identify your personal triggers and body/emotional responses. A pattern understanding tool — not exposure therapy.',
    useWhenAr: 'عندما تشعر بالاستقرار الكافي لفهم أنماط محفزاتك',
    useWhenEn: 'When you feel stable enough to understand your trigger patterns',
    dontUseWhenAr: 'حدث الصدمة أقل من أسبوعين — تحتاج استقرار أولاً',
    dontUseWhenEn: 'Trauma event less than 2 weeks ago — need stabilization first',
    safetyLevel: 'moderate',
    estimatedMinutes: 15,
    route: '/recovery/trc/worksheets/trigger-mapping',
    nextStepAr: 'خطة الأمان بعد فهم المحفزات',
    nextStepEn: 'Safety plan after understanding triggers',
  },
  {
    id: 'safety-plan',
    nameAr: 'خطة الأمان الشخصية',
    nameEn: 'Personal Safety Plan',
    descAr: 'خطتك العملية عند ارتفاع الضيق. علامات إنذار، خطوات، أشخاص دعم، وخروج آمن.',
    descEn: 'Your practical plan when distress rises. Warning signs, steps, support people, and safe exit.',
    useWhenAr: 'دائماً — خاصة قبل دخول مواقف قد تكون محفزة',
    useWhenEn: 'Always — especially before entering potentially triggering situations',
    dontUseWhenAr: 'لا توجد موانع — هذه أداة تخطيط وليست تمريناً علاجياً',
    dontUseWhenEn: 'No contraindications — this is a planning tool, not a therapeutic exercise',
    safetyLevel: 'low',
    estimatedMinutes: 20,
    route: '/recovery/trc/worksheets/safety-plan',
    nextStepAr: 'أدوات التنظيم لاستخدام الخطة',
    nextStepEn: 'Regulation tools to use the plan',
  },
];

// State-to-tool mapping (from TRC Framework — not invented)
const stateToolMap: Record<string, string[]> = {
  overwhelmed: ['grounding-54321', 'a52-breathing', 'safety-plan'],
  activated: ['a52-breathing', 'safe-place', 'grounding-54321'],
  disconnected: ['grounding-54321', 'body-scan', 'a52-breathing'],
  intrusive: ['grounding-54321', 'a52-breathing', 'safe-place', 'safety-plan'],
  uncertain: ['a52-breathing', 'grounding-54321', 'safety-plan'],
};

export default function RegulationToolkitPage() {
  const { locale, direction } = useLocale();
  const tNav = useTranslations('recoveryNav');
  const isAr = locale === 'ar';
  const accent = '#1F6F78';
  const lightBg = '#F0F7F7';

  const [phase, setPhase] = useState<Phase>('question');
  const [showDistressCheck, setShowDistressCheck] = useState(false);
  const [userState, setUserState] = useState<UserState>(null);
  const [selectedTool, setSelectedTool] = useState<ToolInfo | null>(null);
  const router = useRouter();
  const { markStepStarted, markStepCompleted } = useTrcState();

  // Track journey state on mount
  useEffect(() => {
    markStepStarted('regulation-toolkit');
  }, [markStepStarted]);

  // Show comfort check-in after 15 seconds of engagement
  useEffect(() => {
    const timer = setTimeout(() => setShowDistressCheck(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  // Track completion when user selects a tool (they've engaged with the toolkit)
  // Completion is tracked when user reaches results phase — they've identified their state and received recommendations
  useEffect(() => {
    if (phase === 'results' && userState) {
      markStepCompleted('regulation-toolkit');
    }
  }, [phase, userState, markStepCompleted]);

  const handleToolSelect = (tool: ToolInfo) => router.push(tool.route);

  const recommendedTools = userState ? stateToolMap[userState].map(id => tools.find(t => t.id === id)!).filter(Boolean) : [];

  const stateOptions = [
    { key: 'overwhelmed' as const, icon: Zap, labelAr: 'إرهاق شديد', labelEn: 'Overwhelmed', descAr: 'أشعر أن كل شيء كثير جداً ولا أستطيع التعامل', descEn: 'I feel everything is too much and can\'t cope', color: '#E8685A' },
    { key: 'activated' as const, icon: Gauge, labelAr: 'نشاط عالٍ', labelEn: 'Highly activated', descAr: 'جسدي وعقلي يعملان بسرعة — قلق أو غضب أو هلع', descEn: 'My body and mind are racing — anxiety, anger, or panic', color: '#F59E0B' },
    { key: 'disconnected' as const, icon: Snowflake, labelAr: 'انفصال أو تنميل', labelEn: 'Disconnected or numb', descAr: 'أشعر أنني بعيد عن جسدي أو أن مشاعري لا وجود لها', descEn: 'I feel distant from my body or my emotions feel absent', color: '#6B7280' },
    { key: 'intrusive' as const, icon: Brain, labelAr: 'ذكريات اقتحامية', labelEn: 'Intrusive memories', descAr: 'صور أو مشاعر من الماضي تتطفل على اللحظة الحالية', descEn: 'Images or feelings from the past intruding into the present', color: '#7C3AED' },
    { key: 'uncertain' as const, icon: Compass, labelAr: 'غير متأكد', labelEn: 'Uncertain', descAr: 'لا أعرف بالضبط ما أشعر به — أريد الخيار الأأمن', descEn: 'I\'m not sure exactly what I feel — I want the safest option', color: accent },
  ];

  const safetyColors = { low: '#3DD4B0', moderate: '#F59E0B', higher: '#E8685A' };
  const safetyLabels = { low: isAr ? 'سلامة عالية' : 'High safety', moderate: isAr ? 'سلامة متوسطة' : 'Moderate safety', higher: isAr ? 'يحتاج حذر' : 'Use with caution' };

  return (
    <div className="min-h-screen bg-white" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <RecoveryBreadcrumb items={[
          { label: tNav('title'), href: '/recovery' },
          { label: tNav('trc'), href: '/recovery/trc' },
          { label: isAr ? 'أدوات التنظيم' : 'Regulation Toolkit' },
        ]} />
      </div>

      <SafetyResponse assetId="trc-regulation-toolkit" program="trc" />
      <DistressCheckIn
        type="comfort"
        visible={showDistressCheck}
        onContinue={() => setShowDistressCheck(false)}
        onPause={() => setShowDistressCheck(false)}
        onStop={() => router.push('/recovery/trc')}
        onGrounding={() => router.push('/recovery/trc/grounding')}
        questionAr="هل تشعر بالراحة الكافية لاستكمال اختيار الأداة؟"
        questionEn="Are you comfortable enough to continue choosing a tool?"
      />
      <TherapeuticExit fallbackHref="/recovery/trc" />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* QUESTION PHASE — How are you feeling right now? */}
          {phase === 'question' && (
            <motion.div key="question" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <MedicalDisclaimer />
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: accent }}>
                  <Gauge className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-[#0F1C2E]">
                  {isAr ? 'أدوات التنظيم' : 'Regulation Toolkit'}
                </h1>
                <p className="text-[#0F1C2E]/70 mt-2">
                  {isAr ? 'كيف تشعر الآن؟ اختر ما يصف حالتك — وسنقترح الأداة الأنسب.' : 'How are you feeling right now? Choose what describes your state — and we will suggest the most suitable tool.'}
                </p>
              </div>

              <div className="space-y-3">
                {stateOptions.map(opt => (
                  <button key={opt.key} onClick={() => { setUserState(opt.key); setPhase('results'); }}
                    className="w-full flex items-center gap-4 p-5 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all text-left group">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${opt.color}20` }}>
                      <opt.icon className="w-6 h-6" style={{ color: opt.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#0F1C2E]">{isAr ? opt.labelAr : opt.labelEn}</h3>
                      <p className="text-sm text-[#0F1C2E]/60 mt-0.5">{isAr ? opt.descAr : opt.descEn}</p>
                    </div>
                    {isAr ? <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-[#1F6F78]" /> : <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#1F6F78]" />}
                  </button>
                ))}
              </div>

              <p className="text-center text-sm text-[#0F1C2E]/50 mt-6">
                {isAr ? 'هذا ليس تشخيصاً. مجرد اقتراح بناءً على حالتك الآن.' : 'This is not a diagnosis. Just a suggestion based on your current state.'}
              </p>

              {/* Link to Regulation Guide — supporting content */}
              <div className="text-center mt-4">
                <a
                  href="/recovery/trc/regulation-guide"
                  className="inline-flex items-center gap-2 text-[#1F6F78] hover:text-[#1a5e66] text-sm font-medium transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  {isAr ? 'اقرأ دليل التنظيم: فهم نافذة التحمل وكيفية توسيعها' : 'Read the Regulation Guide: Understanding the Window of Tolerance'}
                </a>
              </div>
            </motion.div>
          )}

          {/* RESULTS PHASE — Recommended tools */}
          {phase === 'results' && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-[#0F1C2E]">
                  {isAr ? 'بناءً على حالتك، نقترح:' : 'Based on your state, we suggest:'}
                </h2>
              </div>

              {/* Primary tool */}
              {recommendedTools.length > 0 && (
                <div className="rounded-xl p-6" style={{ backgroundColor: lightBg, border: `2px solid ${accent}` }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#1F6F78] text-white">
                      {isAr ? 'الأداة الأولى' : 'First tool'}
                    </span>
                  </div>
                  <ToolCard tool={recommendedTools[0]} isPrimary locale={isAr ? 'ar' : 'en'} onSelect={handleToolSelect} onDetail={() => setSelectedTool(recommendedTools[0])} />
                </div>
              )}

              {/* Secondary tools */}
              {recommendedTools.slice(1).map(tool => (
                <div key={tool.id} className="rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-all">
                  <ToolCard tool={tool} isPrimary={false} locale={isAr ? 'ar' : 'en'} onSelect={handleToolSelect} onDetail={() => setSelectedTool(tool)} />
                </div>
              ))}

              <button onClick={() => { setPhase('question'); setUserState(null); }}
                className="w-full py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm">
                {isAr ? 'اختر حالة مختلفة' : 'Choose a different state'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ToolCard({ tool, isPrimary, locale, onSelect, onDetail }: { tool: ToolInfo; isPrimary: boolean; locale: 'ar' | 'en'; onSelect: (t: ToolInfo) => void; onDetail: () => void }) {
  const isAr = locale === 'ar';
  const accent = '#1F6F78';
  const safetyColors = { low: '#3DD4B0', moderate: '#F59E0B', higher: '#E8685A' };
  const safetyLabels = { low: isAr ? 'سلامة عالية' : 'High safety', moderate: isAr ? 'سلامة متوسطة' : 'Moderate safety', higher: isAr ? 'يحتاج حذر' : 'Use with caution' };
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-[#0F1C2E]">{isAr ? tool.nameAr : tool.nameEn}</h3>
      <p className="text-sm text-[#0F1C2E]/70 leading-relaxed">{isAr ? tool.descAr : tool.descEn}</p>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full" style={{ backgroundColor: `${safetyColors[tool.safetyLevel]}20`, color: safetyColors[tool.safetyLevel] }}>
          <Shield className="w-3 h-3" /> {safetyLabels[tool.safetyLevel]}
        </span>
        <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
          <Clock className="w-3 h-3" /> {tool.estimatedMinutes} {isAr ? 'دقائق' : 'min'}
        </span>
      </div>

      <div className="text-xs text-[#0F1C2E]/60">
        <p><strong>{isAr ? 'متى تستخدم:' : 'Use when:'}</strong> {isAr ? tool.useWhenAr : tool.useWhenEn}</p>
        <p className="mt-1"><strong>{isAr ? 'لا تستخدم عندما:' : 'Don\'t use when:'}</strong> {isAr ? tool.dontUseWhenAr : tool.dontUseWhenEn}</p>
      </div>

      <div className="flex gap-2 mt-2">
        <button onClick={() => onSelect(tool)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          style={{ backgroundColor: isPrimary ? accent : 'white', color: isPrimary ? 'white' : accent, border: isPrimary ? 'none' : `2px solid ${accent}` }}>
          {isAr ? 'ابدأ الأداة' : 'Start tool'}
          {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
        <button onClick={onDetail}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50">
          {isAr ? 'تفاصيل' : 'Details'}
        </button>
      </div>
    </div>
  );
}
