// TRC Journey Page — R1-E
// Shows current stage, progress, completed tools, next step
// Uses TRC-specific terminology and clinical progression
// CRITICAL: No Porn Recovery language

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Shield, Gauge, Sprout, CheckCircle2, Circle, Download, ArrowLeft, Clock, AlertTriangle } from 'lucide-react';
import {
  TRC_STEPS,
  TRC_STAGES,
  TrcStepId,
  TrcStageId
} from '@/lib/recovery-journey';
import { useTrcState } from '@/hooks/useRecoveryState';
import { getTrcNextStep, NextStepResult } from '@/lib/next-step-engine';

export default function TrcJourneyPage() {
  const { direction, locale } = useLocale();
  const router = useRouter();
  const isAr = locale === 'ar';
  const { state, summary, init, markStepStarted, markStepCompleted } = useTrcState();
  const [nextStep, setNextStep] = useState<NextStepResult | null>(null);

  useEffect(() => {
    if (!state) init();
    setNextStep(getTrcNextStep());
  }, [state]);

  const isStepCompleted = (stepId: string) => state?.completedSteps?.includes(stepId) ?? false;
  const isCurrentStep = (stepId: string) => state?.currentStepId === stepId;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4" dir={direction}>
      {/* Journey Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#0F1C2E' }}>
          {isAr ? 'رحلة التعافي من الصدمات' : 'Trauma Recovery Journey'}
        </h1>
        <p className="text-sm" style={{ color: '#6B7280' }}>
          {isAr
            ? 'رحلة سريرية بوتيرتك أنت. لا تتخطى مرحلة الأمان.'
            : 'A clinical journey at your own pace. Do not skip the Safety stage.'}
        </p>
        {summary && summary.isStarted && (
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#E5E7EB' }}>
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${summary.progress}%`, backgroundColor: '#1F6F78' }}
              />
            </div>
            <span className="text-sm font-medium" style={{ color: '#1F6F78' }}>
              {summary.progress}%
            </span>
          </div>
        )}
      </div>

      {/* Journey Stages */}
      {TRC_STAGES.map((stage, stageIdx) => {
        const stageSteps = TRC_STEPS.filter(s => s.stage === stage.id && s.isAvailable);
        const plannedSteps = TRC_STEPS.filter(s => s.stage === stage.id && !s.isAvailable);
        const completedInStage = stageSteps.filter(s => isStepCompleted(s.id)).length;
        const isStageComplete = completedInStage === stageSteps.length && stageSteps.length > 0;

        return (
          <div key={stage.id} className="mb-8">
            {/* Stage Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: isStageComplete ? '#F0F7F7' : '#F6F8FA', color: isStageComplete ? '#1F6F78' : '#6B7280' }}
              >
                {isStageComplete ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-bold">{stageIdx + 1}</span>}
              </div>
              <div>
                <h2 className="font-bold" style={{ color: '#0F1C2E' }}>
                  {isAr ? stage.labelAr : stage.labelEn}
                </h2>
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  {completedInStage}/{stageSteps.length} {isAr ? 'مكتمل' : 'completed'}
                  {plannedSteps.length > 0 && ` · ${plannedSteps.length} ${isAr ? 'قادمة' : 'upcoming'}`}
                </p>
              </div>
            </div>

            {/* Stage Description */}
            <p className="text-sm mb-3 ms-13" style={{ color: '#374151' }}>
              {isAr ? stage.descriptionAr : stage.descriptionEn}
            </p>

            {/* Clinical note */}
            {stage.clinicalNoteAr && (
              <div className="mb-4 ms-6 text-xs rounded-lg p-2 flex items-start gap-2" style={{ backgroundColor: '#FFF8F0', color: '#92400E' }}>
                <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <span>{isAr ? stage.clinicalNoteAr : stage.clinicalNoteEn}</span>
              </div>
            )}

            {/* Available Steps */}
            <div className="space-y-3 ms-6">
              {stageSteps.map((step) => {
                const completed = isStepCompleted(step.id);
                const current = isCurrentStep(step.id);

                return (
                  <div
                    key={step.id}
                    className={`rounded-xl p-4 border transition-all cursor-pointer ${current ? 'border-2' : ''}`}
                    style={{
                      borderColor: current ? '#1F6F78' : completed ? '#E5E7EB' : '#E5E7EB',
                      backgroundColor: completed ? '#F0F7F7' : current ? '#F0F7F7' : '#fff'
                    }}
                    onClick={() => {
                      markStepStarted(step.id);
                      router.push(step.route);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {completed ? (
                          <CheckCircle2 className="w-5 h-5" style={{ color: '#1F6F78' }} />
                        ) : (
                          <Circle className="w-5 h-5" style={{ color: current ? '#1F6F78' : '#9CA3AF' }} />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className={`font-medium ${completed ? 'line-through opacity-60' : ''}`} style={{ color: '#0F1C2E' }}>
                          {isAr ? step.labelAr : step.labelEn}
                        </span>
                        <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                          {isAr ? step.descriptionAr : step.descriptionEn}
                        </p>
                        {/* Safety level indicator */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs" style={{ color: '#9CA3AF' }}>
                            ~{step.estimatedMinutes} {isAr ? 'دقيقة' : 'min'}
                          </span>
                          {step.sectionType === 'therapeutic' && (
                            <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: '#FEF2F2', color: '#991B1B' }}>
                              {isAr ? 'علاجي' : 'Therapeutic'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Planned Steps (Wave 2+) */}
              {plannedSteps.length > 0 && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                  <span className="text-xs font-medium" style={{ color: '#9CA3AF' }}>
                    {isAr ? 'أدوات قادمة:' : 'Upcoming tools:'}
                  </span>
                  {plannedSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-2 mt-2 opacity-50">
                      <Circle className="w-4 h-4" style={{ color: '#D1D5DB' }} />
                      <span className="text-sm" style={{ color: '#9CA3AF' }}>
                        {isAr ? step.labelAr : step.labelEn}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F6F8FA', color: '#9CA3AF' }}>
                        {isAr ? 'قريباً' : 'Coming soon'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Next Recommended Step */}
      {nextStep && nextStep.isAvailable && nextStep.stepId !== 'identity-transformation' && (
        <div className="mt-8 rounded-xl p-6 border-2" style={{ borderColor: '#1F6F78', backgroundColor: '#F0F7F7' }}>
          <span className="text-xs font-medium" style={{ color: '#1F6F78' }}>
            {isAr ? 'الخطوة التالية المقترحة' : 'Recommended Next Step'}
          </span>
          <h3 className="font-bold mt-1" style={{ color: '#0F1C2E' }}>
            {isAr ? nextStep.labelAr : nextStep.labelEn}
          </h3>
          <p className="text-sm mt-1" style={{ color: '#374151' }}>
            {isAr ? nextStep.reasonAr : nextStep.reasonEn}
          </p>
          <button
            onClick={() => router.push(nextStep.route)}
            className="mt-3 px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#1F6F78' }}
          >
            {isAr ? 'متابعة' : 'Continue'} →
          </button>
        </div>
      )}

      {/* Journey Complete → Identity Transformation */}
      {summary?.completionState === 'completed' && (
        <div className="mt-8 rounded-xl p-6 text-center" style={{ backgroundColor: '#F0F7F7', border: '2px solid #1F6F78' }}>
          <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: '#1F6F78' }} />
          <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
            {isAr ? 'لقد أكملت مرحلة الأمان والاستقرار' : 'You\'ve completed the Safety & Stabilization stage'}
          </h3>
          <p className="text-sm mb-4" style={{ color: '#374151' }}>
            {isAr
              ? 'لقد أكملت هذه المرحلة من أدوات التنظيم والاستقرار. يمكنك الآن متابعة رحلتك داخل Tamkinly بالوتيرة المناسبة لك.'
              : 'You\'ve completed this phase of regulation and stabilization tools. You can now continue your journey within Tamkinly at your own pace.'}
          </p>
          <button
            onClick={() => router.push('/quiz')}
            className="px-6 py-2.5 rounded-lg text-white font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#1F6F78' }}
          >
            {isAr ? 'متابعة رحلة إعادة برمجة الهوية' : 'Continue to Identity Transformation'} →
          </button>
        </div>
      )}

      {/* Back to Recovery Hub */}
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push('/recovery')}
          className="text-sm underline"
          style={{ color: '#6B7280' }}
        >
          {isAr ? '← العودة إلى مسارات التعافي' : '← Back to Recovery Paths'}
        </button>
      </div>
    </div>
  );
}
