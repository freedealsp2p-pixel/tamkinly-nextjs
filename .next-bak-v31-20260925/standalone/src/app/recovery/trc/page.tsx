// TRC Entry Page — R1-D Enhanced
// Shows tools with journey state, eligibility context, and next step

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Shield, TreePine, Wind, Scan, BookOpen, ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { TRC_STEPS } from '@/lib/recovery-journey';
import { useTrcState } from '@/hooks/useRecoveryState';
import { getTrcNextStep, NextStepResult } from '@/lib/next-step-engine';
import MedicalDisclaimer from '@/components/recovery/MedicalDisclaimer';
import RecoveryCompletion from '@/components/recovery/RecoveryCompletion';

const TOOL_ICONS: Record<string, React.ReactNode> = {
  'grounding': <TreePine className="w-6 h-6" />,
  'a52-breathing': <Wind className="w-6 h-6" />,
  'safe-place': <Shield className="w-6 h-6" />,
  'body-scan': <Scan className="w-6 h-6" />,
  'what-trauma-does-to-the-body': <BookOpen className="w-6 h-6" />,
};

export default function TrcEntryPage() {
  const { direction, locale } = useLocale();
  const router = useRouter();
  const isAr = locale === 'ar';
  const { state, summary, init, markStepStarted } = useTrcState();
  const [nextStep, setNextStep] = useState<NextStepResult | null>(null);

  useEffect(() => {
    try { localStorage.setItem('tamkinly_recovery_discovered', 'true'); } catch {}
    if (!state) init();
    setNextStep(getTrcNextStep());
  }, [state]);

  const availableSteps = TRC_STEPS.filter(s => s.isAvailable && s.id !== 'trauma-psychoeducation');
  const psychoeducation = TRC_STEPS.find(s => s.id === 'trauma-psychoeducation');

  const isStepCompleted = (stepId: string) => state?.completedSteps?.includes(stepId) ?? false;

  return (
    <main className="min-h-screen" dir={direction}>
      {/* Hero */}
      <section className="py-12 px-4" style={{ background: 'linear-gradient(135deg, #0F1C2E 0%, #1a3340 50%, #0F1C2E 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-6">
            <Shield className="w-4 h-4" style={{ color: '#1F6F78' }} />
            <span className="text-teal-300 text-sm font-medium">
              {isAr ? 'التعافي من الصدمات' : 'Trauma Recovery'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {isAr ? 'رحلة التعافي من الصدمات الجنسية' : 'Trauma Recovery Journey'}
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            {isAr
              ? 'رحلة سريرية بثلاث مراحل: الأمان → التنظيم → التكامل. ابدأ من هنا.'
              : 'A clinical journey in three stages: Safety → Regulation → Integration. Start here.'}
          </p>

          {/* Progress indicator */}
          {summary?.isStarted && (
            <div className="mt-6 max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-white/20">
                  <div className="h-2 rounded-full transition-all" style={{ width: `${summary.progress}%`, backgroundColor: '#1F6F78' }} />
                </div>
                <span className="text-sm text-teal-300">{summary.progress}%</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <MedicalDisclaimer />

      {/* Clinical Safety Note */}
      <section className="py-4 px-4">
        <div className="max-w-3xl mx-auto rounded-xl p-4" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A' }}>
          <p className="text-sm" style={{ color: '#92400E' }}>
            {isAr
              ? '⚠️ إذا شعرت بانفصال أو نوبة هلع أو ضيق شديد أثناء أي تمرين، توقف فوراً. يمكنك العودة لاحقاً. لا شيء إلزامي.'
              : '⚠️ If you experience dissociation, panic, or intense distress during any exercise, stop immediately. You can return later. Nothing is mandatory.'}
          </p>
        </div>
      </section>

      {/* Safety Stage Tools */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-bold mb-2" style={{ color: '#0F1C2E' }}>
            {isAr ? 'مرحلة الأمان والاستقرار' : 'Safety & Stabilization Stage'}
          </h2>
          <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
            {isAr
              ? 'أدوات تنظيم الجهاز العصبي. ابدأ بالتنظيم الحسي ثم تقدم بالترتيب.'
              : 'Nervous system regulation tools. Start with Grounding then proceed in order.'}
          </p>

          <div className="space-y-4">
            {availableSteps.map((step, idx) => {
              const completed = isStepCompleted(step.id);
              const Icon = TOOL_ICONS[step.id] || <Shield className="w-6 h-6" />;

              return (
                <div
                  key={step.id}
                  className="rounded-xl p-5 border cursor-pointer transition-all hover:shadow-md"
                  style={{
                    borderColor: completed ? '#1F6F78' : '#E5E7EB',
                    backgroundColor: completed ? '#F0F7F7' : '#fff'
                  }}
                  onClick={() => {
                    markStepStarted(step.id);
                    router.push(step.route);
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#F0F7F7', color: '#1F6F78' }}>
                      {Icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {completed && <CheckCircle2 className="w-4 h-4" style={{ color: '#1F6F78' }} />}
                        <h3 className="font-semibold" style={{ color: '#0F1C2E' }}>
                          {isAr ? step.labelAr : step.labelEn}
                        </h3>
                      </div>
                      <p className="text-sm mt-1" style={{ color: '#374151' }}>
                        {isAr ? step.descriptionAr : step.descriptionEn}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs" style={{ color: '#9CA3AF' }}>
                          ~{step.estimatedMinutes} {isAr ? 'دقيقة' : 'min'}
                        </span>
                        {step.sectionType === 'therapeutic' && (
                          <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#FEF2F2', color: '#991B1B' }}>
                            {isAr ? 'علاجي' : 'Therapeutic'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Psychoeducation (not sequential) */}
          {psychoeducation && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3" style={{ color: '#6B7280' }}>
                {isAr ? 'قراءة إضافية:' : 'Additional reading:'}
              </h3>
              <div
                className="rounded-xl p-4 border cursor-pointer transition-all hover:shadow-md"
                style={{ borderColor: '#E5E7EB', backgroundColor: '#fff' }}
                onClick={() => router.push(psychoeducation.route)}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" style={{ color: '#1F6F78' }} />
                  <span className="font-medium text-sm" style={{ color: '#0F1C2E' }}>
                    {isAr ? psychoeducation.labelAr : psychoeducation.labelEn}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Next Step */}
      {nextStep && nextStep.isAvailable && nextStep.stepId !== 'identity-transformation' && (
        <section className="py-4 px-4">
          <div className="max-w-3xl mx-auto rounded-xl p-5" style={{ backgroundColor: '#F0F7F7', border: '2px solid #1F6F78' }}>
            <span className="text-xs font-medium" style={{ color: '#1F6F78' }}>
              {isAr ? 'الخطوة التالية' : 'Next Step'}
            </span>
            <h3 className="font-bold mt-1" style={{ color: '#0F1C2E' }}>
              {isAr ? nextStep.labelAr : nextStep.labelEn}
            </h3>
            <button
              onClick={() => router.push(nextStep.route)}
              className="mt-3 px-5 py-2 rounded-lg text-white text-sm font-medium"
              style={{ backgroundColor: '#1F6F78' }}
            >
              {isAr ? 'متابعة' : 'Continue'} →
            </button>
          </div>
        </section>
      )}

      {/* Journey page link */}
      <section className="py-4 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <button
            onClick={() => router.push('/recovery/trc/journey')}
            className="text-sm font-medium"
            style={{ color: '#1F6F78' }}
          >
            {isAr ? 'عرض رحلة التعافي الكاملة →' : 'View full Recovery Journey →'}
          </button>
        </div>
      </section>

      {/* Completion (only if all done) */}
      {summary?.completionState === 'completed' && (
        <RecoveryCompletion program="trc" />
      )}

      {/* Back to Hub */}
      <section className="py-6 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <button onClick={() => router.push('/recovery')} className="text-sm underline" style={{ color: '#6B7280' }}>
            {isAr ? '← العودة إلى مسارات التعافي' : '← Back to Recovery Paths'}
          </button>
        </div>
      </section>
    </main>
  );
}
