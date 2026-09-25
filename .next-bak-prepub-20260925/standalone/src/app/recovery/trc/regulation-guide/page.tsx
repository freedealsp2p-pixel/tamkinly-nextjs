"use client";

import { useLocale } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';
import { MedicalDisclaimer } from '@/components/recovery/system';
import { SafetyResponse } from '@/components/recovery/system';
import { TherapeuticExit } from '@/components/recovery/system';
import { Gauge, Wind, Shield, ArrowRight, ArrowLeft, Brain, Activity } from 'lucide-react';

const sections = [
  {
    icon: Gauge,
    titleAr: 'ما هو التنظيم العاطفي؟',
    titleEn: 'What Is Emotion Regulation?',
    bodyAr: 'التنظيم العاطفي هو قدرتك على البقاء داخل "نافذة التحمل" — النطاق الذي تستطيع فيه معالجة المشاعر دون أن تغمرك أو تنفصل عنها. بعد الصدمة، تنكمش هذه النافذة: مشاعر عادية تصبح ساحقة، وأشياء بسيطة تفعّل استجابات قوية. التنظيم لا يعني "إخفاء مشاعرك" — يعني أن تبقى حاضراً معها دون أن تغرق.',
    bodyEn: 'Emotion regulation is your ability to stay within the "window of tolerance" — the range where you can process emotions without being overwhelmed or disconnected. After trauma, this window shrinks: normal emotions become overwhelming, and simple things trigger intense responses. Regulation does not mean "hiding your emotions" — it means staying present with them without drowning.',
  },
  {
    icon: Activity,
    titleAr: 'نافذة التحمل',
    titleEn: 'The Window of Tolerance',
    bodyAr: 'تخيل نافذة: داخلها تشعر بالهدوء والقدرة. فوقها — فرط تنشيط (قلق، غضب، هلع). تحتها — نقص تنشيط (تنميل، تجمد، تفارق). الهدف ليس توسيع النافذة فوراً، بل تعلم العودة إليها عندما تخرج. أدوات التنفس والارتكاز هي الجسر الذي يعيدك. مع الممارسة، تتسع النافذة تدريجياً — البحوث تظهر تحسناً ملحوظاً في التنظيم بعد تدريب منتظم.',
    bodyEn: 'Imagine a window: inside it, you feel calm and capable. Above it — hyperarousal (anxiety, anger, panic). Below it — hypoarousal (numbness, freeze, dissociation). The goal is not to expand the window immediately, but to learn to return to it when you leave. Breathing and grounding tools are the bridge that brings you back. With practice, the window gradually expands — research shows significant regulation improvement after consistent training.',
  },
  {
    icon: Brain,
    titleAr: 'كيف تغيّر الصدمة نظام التنظيم؟',
    titleEn: 'How Does Trauma Change the Regulation System?',
    bodyAr: 'بعد الصدمة: اللوزة الدماغية (رادار الخطر) تصبح مفرطة النشاط — كل شيء يبدو مهدداً. القشرة الجبهية (المهدئة المنطقية) تصبح ضعيفة — صعوبة في تهدئة نفسك. محور HPA (نظام التوتر) يختل — الكورتيزول يقفز عند أي محفز. النتيجة: جهازك العصبي عالق في وضعية "نجاة لم تكتمل". التنظيم يعلم الدماغ أن الخطر انتهى.',
    bodyEn: 'After trauma: the Amygdala (danger radar) becomes hyperactive — everything seems threatening. The prefrontal cortex (logical calmer) becomes weak — difficulty self-soothing. The HPA axis (stress system) dysregulates — cortisol jumps at any trigger. The result: your nervous system is stuck in "unfinished survival." Regulation teaches the brain that the danger has ended.',
  },
  {
    icon: Shield,
    titleAr: 'ماذا تفعل الآن؟',
    titleEn: 'What Do You Do Now?',
    bodyAr: 'صندوق أدوات التنظيم يساعدك اختيار الأداة الأنسب بناءً على حالتك الآن. جربه — هو يسألك كيف تشعر ثم يقترح الأداة المناسبة.',
    bodyEn: 'The Regulation Toolkit helps you choose the most suitable tool based on your current state. Try it — it asks how you feel and suggests the right tool.',
    isCta: true,
  },
];

export default function RegulationGuidePage() {
  const { locale, direction } = useLocale();
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen bg-white" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <RecoveryBreadcrumb items={[
          { label: isAr ? 'التعافي' : 'Recovery', href: '/recovery' },
          { label: isAr ? 'التعافي من الصدمات' : 'TRC', href: '/recovery/trc' },
          { label: isAr ? 'دليل التنظيم' : 'Regulation Guide' },
        ]} />
      </div>
      <SafetyResponse assetId="trc-regulation-guide" program="trc" />
      <TherapeuticExit fallbackHref="/recovery/trc" />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <MedicalDisclaimer />
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-[#1F6F78]">
            <Gauge className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F1C2E]">{isAr ? 'دليل التنظيم: فهم نافذة التحمل وكيفية توسيعها' : 'Regulation Guide: Understanding the Window of Tolerance'}</h1>
        </div>

        {sections.map((s, i) => (
          <div key={i} className="mb-8 rounded-xl p-6 border border-slate-100" style={{ backgroundColor: i % 2 === 0 ? '#F0F7F7' : 'white' }}>
            <div className="flex items-center gap-3 mb-3">
              <s.icon className="w-6 h-6 text-[#1F6F78]" />
              <h2 className="text-lg font-bold text-[#0F1C2E]">{isAr ? s.titleAr : s.titleEn}</h2>
            </div>
            <p className="text-[#0F1C2E]/80 leading-relaxed">{isAr ? s.bodyAr : s.bodyEn}</p>
            {s.isCta && (
              <div className="mt-4">
                <a href="/recovery/trc/regulation-toolkit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F6F78] text-white font-medium hover:bg-[#1a5e66] transition-colors">
                  {isAr ? 'افتح صندوق أدوات التنظيم' : 'Open Regulation Toolkit'}
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
