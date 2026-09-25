'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/providers/LocaleProvider';
import { 
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Target,
  Heart,
  Brain,
  Home,
  TrendingUp,
  Shield,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  Lightbulb,
  Zap,
  Lock
} from 'lucide-react';

export default function ExecutiveManualPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const [activeSection, setActiveSection] = useState(0);

  const phases = [
    {
      name: getText('Phase 1: Observe', 'المرحلة ١: المراقبة'),
      days: getText('Days 1-7', 'الأيام ١-٧'),
      description: getText('Capture baseline, values, habits, triggers, and environment.', 'تسجيل خط الأساس والقيم والعادات والمحفزات والبيئة.'),
      color: '#3DD4B0'
    },
    {
      name: getText('Phase 2: Intervene', 'المرحلة ٢: التدخل'),
      days: getText('Days 8-14', 'الأيام ٨-١٤'),
      description: getText('Adjust cues, reduce friction, and improve decision structure.', 'تعديل المحفزات وتقليل العوائق وتحسين بنية القرار.'),
      color: '#1F6F78'
    },
    {
      name: getText('Phase 3: Evidence', 'المرحلة ٣: الأدلة'),
      days: getText('Days 15-21', 'الأيام ١٥-٢١'),
      description: getText('Track repeated actions and emerging identity proof.', 'تتبع الإجراءات المتكررة وأدلة الهوية الناشئة.'),
      color: '#2A8A94'
    },
    {
      name: getText('Phase 4: Stabilize', 'المرحلة ٤: الاستقرار'),
      days: getText('Days 22-30', 'الأيام ٢٢-٣٠'),
      description: getText('Review results, reinforce wins, and refine the next cycle.', 'مراجعة النتائج وتعزيز الإنجازات وتحسين الدورة التالية.'),
      color: '#2A8A94'
    }
  ];

  const corePrinciples = [
    { principle: getText('Repeated behavior creates evidence.', 'السلوك المتكرر يخلق الأدلة.'), icon: Target },
    { principle: getText('Evidence shapes self-concept.', 'الأدلة تشكل مفهوم الذات.'), icon: Brain },
    { principle: getText('Environment shapes repetition.', 'البيئة تشكل التكرار.'), icon: Home },
    { principle: getText('Decisions reveal identity.', 'القرارات تكشف الهوية.'), icon: Heart },
    { principle: getText('Emotional regulation protects consistency.', 'التنظيم العاطفي يحمي الاتساق.'), icon: Shield },
    { principle: getText('Progress becomes visible when it is recorded.', 'التقدم يصبح مرئيًا عندما يُسجل.'), icon: TrendingUp }
  ];

  const systems = [
    { name: getText('Baseline', 'خط الأساس'), question: getText('Where am I now?', 'أين أنا الآن؟'), icon: Target, color: '#3DD4B0' },
    { name: getText('Environment', 'البيئة'), question: getText('What supports or blocks the new identity?', 'ما الذي يدعم أو يعيق الهوية الجديدة؟'), icon: Home, color: '#1F6F78' },
    { name: getText('Decisions', 'القرارات'), question: getText('What patterns drive my choices?', 'ما الأنماط التي تحرك اختياراتي؟'), icon: Brain, color: '#2A8A94' },
    { name: getText('Evidence', 'الأدلة'), question: getText('What proof shows that change is happening?', 'ما الدليل على أن التغيير يحدث؟'), icon: Eye, color: '#2A8A94' },
    { name: getText('Progress', 'التقدم'), question: getText('How do I measure growth over time?', 'كيف أقيس النمو بمرور الوقت؟'), icon: TrendingUp, color: '#C97B7B' },
    { name: getText('Integration', 'الدمج'), question: getText('What must become stable, repeatable, and automatic?', 'ما الذي يجب أن يصبح مستقرًا وقابلًا للتكرار وتلقائيًا؟'), icon: CheckCircle2, color: '#2A8A94' }
  ];

  const rules = [
    getText('Write honestly, not ideally.', 'اكتب بصدق، لا بمثالية.'),
    getText('Measure what happened, not what you hoped would happen.', 'قِس ما حدث، لا ما تمنيت أن يحدث.'),
    getText('Use evidence before interpretation.', 'استخدم الأدلة قبل التفسير.'),
    getText('Treat repeated resistance as information, not failure.', 'عامل المقاومة المتكررة كمعلومة، لا كفشل.'),
    getText('Focus on consistency over intensity.', 'ركز على الاتساق بدلاً من الشدة.'),
    getText('Review the system weekly.', 'راجع النظام أسبوعيًا.'),
    getText('Update the plan based on data.', 'حدّث الخطة بناءً على البيانات.')
  ];

  const worksheets = [
    { name: getText('Executive Manual', 'الدليل التنفيذي'), purpose: getText('Defines the logic and structure.', 'يحدد المنطق والبنية.'), tier: 'BASIC' },
    { name: getText('Identity Baseline Worksheet', 'ورقة عمل خط الأساس للهوية'), purpose: getText('Measures current identity status.', 'تقيس حالة الهوية الحالية.'), tier: 'BASIC' },
    { name: getText('Environmental Audit', 'التدقيق البيئي'), purpose: getText('Finds support and resistance in context.', 'يجد الدعم والمقاومة في السياق.'), tier: 'BASIC' },
    { name: getText('Decision Pattern Analysis', 'تحليل أنماط القرار'), purpose: getText('Tracks how choices are actually made.', 'يتتبع كيف تُتخذ القرارات فعليًا.'), tier: 'PREMIUM' },
    { name: getText('Evidence Tracking System', 'نظام تتبع الأدلة'), purpose: getText('Records proof of behavioral change.', 'يسجل دليل التغيير السلوكي.'), tier: 'PREMIUM' },
    { name: getText('Progress Dashboard Guide', 'دليل لوحة التقدم'), purpose: getText('Displays change over time in a simple visual form.', 'يعرض التغيير بمرور الوقت بشكل بصري بسيط.'), tier: 'PREMIUM' }
  ];

  const sections = [
    {
      id: 'purpose',
      title: getText('Purpose of the System', 'غرض النظام'),
      content: getText(
        'This planner is designed to help a person move from passive reaction to intentional self-direction. The core assumption is simple: lasting change becomes more stable when it is rooted in identity, supported by environment, and reinforced through repeated evidence.',
        'صُمم هذا المخطط لمساعدة الشخص على الانتقال من رد الفعل السلبي إلى التوجيه الذاتي الواعي. الفرضية الأساسية بسيطة: التغيير الدائم يصبح أكثر استقرارًا عندما يكون متجذرًا في الهوية، مدعومًا بالبيئة، ومعززًا بالأدلة المتكررة.'
      )
    },
    {
      id: 'what-it-does',
      title: getText('What This System Does', 'ما يفعله هذا النظام'),
      list: [
        getText('Clarifies the current identity baseline.', 'يوضح خط الأساس الحالي للهوية.'),
        getText('Identifies the gap between present behavior and desired identity.', 'يحدد الفجوة بين السلوك الحالي والهوية المرغوبة.'),
        getText('Audits the environment for support and friction.', 'يدقق البيئة بحثًا عن الدعم والعوائق.'),
        getText('Analyzes decision patterns.', 'يحلل أنماط القرار.'),
        getText('Tracks evidence of change daily.', 'يتتبع أدلة التغيير يوميًا.'),
        getText('Measures progress over 30 days.', 'يقيس التقدم على مدار ٣٠ يومًا.')
      ]
    },
    {
      id: 'what-it-does-not',
      title: getText('What This System Does Not Do', 'ما لا يفعله هذا النظام'),
      list: [
        getText('It does not rely on motivation alone.', 'لا يعتمد على الدافعية وحدها.'),
        getText('It does not assume one insight will create transformation.', 'لا يفترض أن رؤية واحدة ستخلق التحول.'),
        getText('It does not measure progress only by emotion or intention.', 'لا يقيس التقدم بالعاطفة أو النية فقط.')
      ]
    },
    {
      id: 'how-to-use',
      title: getText('How to Use This Manual', 'كيف تستخدم هذا الدليل'),
      content: getText(
        'Use this manual as the operating logic behind the worksheets and dashboard. Each page in the planner should connect to one of six functions: assess, observe, design, decide, evidence, and review.',
        'استخدم هذا الدليل كمنطق تشغيلي خلف أوراق العمل ولوحة المعلومات. يجب أن ترتبط كل صفحة في المخطط بإحدى الوظائف الست: التقييم، المراقبة، التصميم، القرار، الأدلة، والمراجعة.'
      )
    },
    {
      id: 'rhythm',
      title: getText('Recommended Rhythm', 'الإيقاع الموصى به'),
      list: [
        getText('Day 1: Complete baseline assessments.', 'اليوم ١: إكمال تقييمات خط الأساس.'),
        getText('Days 2-7: Observe patterns and environment.', 'الأيام ٢-٧: مراقبة الأنماط والبيئة.'),
        getText('Days 8-14: Modify cues, routines, and decisions.', 'الأيام ٨-١٤: تعديل المحفزات والروتين والقرارات.'),
        getText('Days 15-21: Track evidence and consistency.', 'الأيام ١٥-٢١: تتبع الأدلة والاتساق.'),
        getText('Days 22-30: Review progress, refine identity, and lock in maintenance.', 'الأيام ٢٢-٣٠: مراجعة التقدم وتحسين الهوية وتثبيت الصيانة.')
      ]
    },
    {
      id: 'user-rule',
      title: getText('User Rule', 'قاعدة المستخدم'),
      highlight: getText('Do not aim for perfection. Aim for repeated observation and correction.', 'لا تسعَ للمثالية. اسعَ للمراقبة والتصحيح المتكرر.')
    },
    {
      id: 'identity-mechanism',
      title: getText('How Identity Change Works', 'كيف يعمل تغيير الهوية'),
      content: getText(
        'A person does not simply "become" a new identity by thinking positively. Identity is strengthened when behavior, self-description, and context begin to match.',
        'الشخص لا يصبح ببساطة هوية جديدة بالتفكير الإيجابي. الهوية تتعزز عندما يبدأ السلوك والوصف الذاتي والسياق في التطابق.'
      ),
      list: [
        getText('A new identity is chosen.', 'يتم اختيار هوية جديدة.'),
        getText('Small actions are repeated.', 'تُكرر الإجراءات الصغيرة.'),
        getText('The actions produce evidence.', 'الإجراءات تنتج أدلة.'),
        getText('The evidence reduces self-doubt.', 'الأدلة تقلل الشك الذاتي.'),
        getText('The self-concept updates.', 'مفهوم الذات يتحدث.'),
        getText('The behavior becomes more natural.', 'السلوك يصبح أكثر طبيعية.')
      ]
    },
    {
      id: 'progress-examples',
      title: getText('Examples of Valid Progress', 'أمثلة على التقدم الصالح'),
      list: [
        getText('Completing planned actions.', 'إكمال الإجراءات المخططة.'),
        getText('Making cleaner decisions.', 'اتخاذ قرارات أنظف.'),
        getText('Recovering faster after lapses.', 'التعافي أسرع بعد الانتكاسات.'),
        getText('Reducing friction in the environment.', 'تقليل العوائق في البيئة.'),
        getText('Keeping a consistent log.', 'الحفاظ على سجل منتظم.'),
        getText('Acting according to values under stress.', 'التصرف وفقًا للقيم تحت الضغط.'),
        getText('Seeing fewer identity conflicts.', 'رؤية صراعات هوية أقل.')
      ]
    },
    {
      id: 'setbacks',
      title: getText('How to Interpret Setbacks', 'كيف تفسر الانتكاسات'),
      content: getText('Setbacks do not mean the identity failed. They indicate one of four things:', 'الانتكاسات لا تعني أن الهوية فشلت. إنها تشير إلى أحد أربعة أشياء:'),
      list: [
        getText('The environment is too resistant.', 'البيئة شديدة المقاومة.'),
        getText('The cue is too weak.', 'المحفز ضعيف جدًا.'),
        getText('The decision rule is unclear.', 'قاعدة القرار غير واضحة.'),
        getText('The evidence system is too passive.', 'نظام الأدلة سلبي جدًا.')
      ],
      note: getText('This interpretation keeps the user in problem-solving mode instead of self-judgment mode.', 'هذا التفسير يبقي المستخدم في وضع حل المشكلات بدلاً من وضع الحكم على الذات.')
    },
    {
      id: 'maintenance',
      title: getText('Maintenance Principle', 'مبدأ الصيانة'),
      content: getText(
        'The final goal is not to "finish" change, but to create a repeatable identity system. When change is maintained through evidence, environment, and self-monitoring, it becomes less dependent on temporary motivation.',
        'الهدف النهائي ليس "إنهاء" التغيير، بل إنشاء نظام هوية قابل للتكرار. عندما يُحافظ على التغيير من خلال الأدلة والبيئة والمراقبة الذاتية، يصبح أقل اعتمادًا على الدافعية المؤقتة.'
      ),
      list: [
        getText('Actions are easier to repeat.', 'الإجراءات أسهل في التكرار.'),
        getText('Identity feels more coherent.', 'الهوية تبدو أكثر تماسكًا.'),
        getText('Decisions require less effort.', 'القرارات تتطلب جهدًا أقل.'),
        getText('Recovery from misses becomes faster.', 'التعافي من الأخطاء يصبح أسرع.')
      ]
    },
    {
      id: 'implementation',
      title: getText('Implementation Logic', 'منطق التطبيق'),
      content: getText('For each target identity, ask four questions:', 'لكل هوية مستهدفة، اطرح أربعة أسئلة:'),
      list: [
        getText('What does this identity do repeatedly?', 'ما الذي تفعله هذه الهوية بشكل متكرر؟'),
        getText('What makes that behavior easier or harder?', 'ما الذي يجعل هذا السلوك أسهل أو أصعب؟'),
        getText('What decisions support or block it?', 'ما القرارات التي تدعمه أو تعيقه؟'),
        getText('What evidence would prove it is becoming real?', 'ما الأدلة التي تثبت أنها أصبحت حقيقية؟')
      ],
      note: getText('This keeps the system grounded in measurable behavior rather than vague aspiration.', 'هذا يبقي النظام متجذرًا في السلوك القابل للقياس بدلاً من التطلع الغامض.')
    },
    {
      id: 'dashboard',
      title: getText('Reading the Dashboard', 'قراءة لوحة المعلومات'),
      content: getText(
        'A good dashboard should be simple, visible, and repeated often. Monitoring progress works best when the outcome is physically recorded and reviewed frequently.',
        'يجب أن تكون لوحة المعلومات الجيدة بسيطة ومرئية ومكررة بشكل متكرر. تعمل مراقبة التقدم بشكل أفضل عندما تكون النتيجة مسجلة فعليًا ومراجعة بشكل متكرر.'
      ),
      list: [
        getText('Daily completion.', 'الإكمال اليومي.'),
        getText('Weekly consistency.', 'الاتساق الأسبوعي.'),
        getText('Identity alignment score.', 'درجة محاذاة الهوية.'),
        getText('Decision quality score.', 'درجة جودة القرار.'),
        getText('Environmental support score.', 'درجة الدعم البيئي.'),
        getText('Evidence count.', 'عدد الأدلة.'),
        getText('Milestones reached.', 'المعالم المحققة.')
      ]
    },
    {
      id: 'final',
      title: getText('Final Instruction', 'التعليمات النهائية'),
      highlight: getText(
        'Use this manual as the standard for every worksheet inside the planner. Each page should help the user answer one question: "What am I repeatedly proving to myself about who I am becoming?"',
        'استخدم هذا الدليل كمعيار لكل ورقة عمل داخل المخطط. يجب أن تساعد كل صفحة المستخدم في الإجابة عن سؤال واحد: "ما الذي أثبته لنفسي بشكل متكرر حول من أصبحت عليه؟"'
      )
    }
  ];

  return (
<div className="min-h-screen bg-[#F6F8FA]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-8 px-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            {getText('← Back to Apps', '→ العودة للتطبيقات')}
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-14 h-14 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-[#3DD4B0]" />
            </div>
            <div>
              <Badge className="bg-[#1F6F78]/20 text-[#1F6F78] border border-[#1F6F78]/50 mb-2">{getText('BASIC', 'أساسي')}</Badge>
              <h1 className="text-2xl font-bold">{getText('Executive Manual', 'الدليل التنفيذي')}</h1>
              <p className="text-slate-400">{getText('Identity Recode Planner - 30-Day Guided Journey', 'مخطط إعادة برمجة الهوية - رحلة موجهة لمدة ٣٠ يومًا')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <Card className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] border-0 mb-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {getText('A 30-Day Guided Journey for Identity Alignment', 'رحلة موجهة لمدة ٣٠ يومًا لمحاذاة الهوية')}
              </h2>
              <p className="text-[#8A94A6] text-lg mb-6">
                {getText('Behavioral Recalibration, and Self-Authored Change', 'إعادة المعايرة السلوكية والتغيير الذاتي')}
              </p>
              <p className="text-slate-300 max-w-2xl mx-auto">
                {getText(
                  'A practical system for assessing your current identity, identifying misalignment, redesigning your environment, tracking evidence, and installing a more coherent self-concept through daily action.',
                  'نظام عملي لتقييم هويتك الحالية، وتحديد عدم المحاذاة، وإعادة تصميم بيئتك، وتتبع الأدلة، وتركيب مفهوم ذات أكثر تماسكًا من خلال العمل اليومي.'
                )}
              </p>
            </CardContent>
          </Card>

          {/* Core Principles */}
          <Card className="mb-8 border-l-4 border-l-[#3DD4B0]">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#3DD4B0]" />
                {getText('Core Principles', 'المبادئ الأساسية')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {corePrinciples.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-[#F6F8FA] rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#3DD4B0]" />
                    </div>
                    <span className="text-[#2B2E34] font-medium">{item.principle}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* The 6-System Model */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E]">{getText('The 6-System Model', 'نموذج الأنظمة الستة')}</CardTitle>
              <p className="text-[#8A94A6]">{getText('This planner works through six linked systems:', 'يعمل هذا المخطط من خلال ستة أنظمة مترابطة:')}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systems.map((system, index) => (
                  <Card key={index} className="border-l-4" style={{ borderLeftColor: system.color }}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${system.color}20` }}>
                          <system.icon className="w-4 h-4" style={{ color: system.color }} />
                        </div>
                        <span className="font-semibold text-[#0F1C2E]">{index + 1}. {system.name}</span>
                      </div>
                      <p className="text-sm text-[#8A94A6] italic">{system.question}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 30-Day Path */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#3DD4B0]" />
                {getText('The 30-Day Path', 'مسار الـ ٣٠ يومًا')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {phases.map((phase, index) => (
                  <div key={index} className="p-4 rounded-lg border-2" style={{ borderColor: phase.color }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: phase.color }}>
                        {index + 1}
                      </div>
                      <span className="font-semibold text-[#0F1C2E]">{phase.name}</span>
                    </div>
                    <Badge variant="outline" className="mb-2 text-xs">{phase.days}</Badge>
                    <p className="text-sm text-[#8A94A6]">{phase.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rules */}
          <Card className="mb-8 bg-[#1F6F78]/5 border-[#1F6F78]/20">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#1F6F78]" />
                {getText('Rules of the Planner', 'قواعد المخطط')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#1F6F78] text-white flex items-center justify-center text-xs flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-[#2B2E34]">{rule}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card key={section.id} className={section.highlight ? 'bg-[#3DD4B0]/10 border-[#3DD4B0]' : ''}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#0F1C2E] mb-4">{section.title}</h3>
                  {section.content && (
                    <p className="text-[#2B2E34] leading-relaxed mb-4">{section.content}</p>
                  )}
                  {section.highlight && (
                    <p className="text-[#1F6F78] font-semibold text-lg italic">{section.highlight}</p>
                  )}
                  {section.list && (
                    <ul className="space-y-2">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                          <span className="text-[#2B2E34]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.note && (
                    <p className="text-sm text-[#8A94A6] italic mt-4 p-3 bg-white/50 rounded-lg">
                      {section.note}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Worksheets Overview */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E]">{getText('Using the Worksheets Together', 'استخدام أوراق العمل معًا')}</CardTitle>
              <p className="text-[#8A94A6]">{getText('Each worksheet has a role in the system:', 'لكل ورقة عمل دور في النظام:')}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {worksheets.map((ws, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#F6F8FA] rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileTextIcon className="w-5 h-5 text-[#1F6F78]" />
                      <div>
                        <span className="font-medium text-[#0F1C2E]">{ws.name}</span>
                        <p className="text-sm text-[#8A94A6]">{ws.purpose}</p>
                      </div>
                    </div>
                    <Badge className={ws.tier === 'BASIC' ? 'bg-[#1F6F78]/10 text-[#1F6F78]' : 'bg-purple-100 text-purple-800'}>
                      {ws.tier === 'BASIC' ? getText('BASIC', 'أساسي') : getText('PREMIUM', 'متميز')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link href="/apps/identity-recode-system">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 py-6 text-lg font-semibold">
                {getText('Start the 30-Day Journey', 'ابدأ رحلة الـ ٣٠ يومًا')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
);
}

function FileTextIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}
