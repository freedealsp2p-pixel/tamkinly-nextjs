// Porn Recovery Journey Page — R1-E
// Shows current stage, progress, completed tools, next step, available downloads
// NOT gamification — clinical tracking

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Eye, Brain, RefreshCw, Shield, Zap, RotateCcw, User, ArrowLeft, CheckCircle2, Circle, Download, ChevronLeft } from 'lucide-react';
import {
  PORN_RECOVERY_STEPS,
  PORN_RECOVERY_STAGES,
  PornRecoveryStepId,
  PornRecoveryStageId
} from '@/lib/recovery-journey';
import { usePornRecoveryState } from '@/hooks/useRecoveryState';
import { getPornRecoveryNextStep, NextStepResult } from '@/lib/next-step-engine';

const STAGE_ICONS: Record<string, React.ReactNode> = {
  'Eye': <Eye className="w-5 h-5" />,
  'Shield': <Shield className="w-5 h-5" />,
  'Zap': <Zap className="w-5 h-5" />,
  'RotateCcw': <RotateCcw className="w-5 h-5" />,
  'Sprout': <User className="w-5 h-5" />,
};

export default function PornRecoveryJourneyPage() {
  const { direction, locale } = useLocale();
  const router = useRouter();
  const isAr = locale === 'ar';
  const { state, summary, init, markStepStarted, markStepCompleted } = usePornRecoveryState();
  const [nextStep, setNextStep] = useState<NextStepResult | null>(null);

  useEffect(() => {
    if (!state) init();
    setNextStep(getPornRecoveryNextStep());
  }, [state]);

  const isStepCompleted = (stepId: string) => state?.completedSteps?.includes(stepId) ?? false;
  const isCurrentStep = (stepId: string) => state?.currentStepId === stepId;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4" dir={direction}>
      {/* Journey Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2" style={{ color: '#0F1C2E' }}>
          {isAr ? 'رحلة التعافي من الأنماط القهرية' : 'Recovery Journey from Compulsive Patterns'}
        </h1>
        {summary && summary.isStarted && (
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#E5E7EB' }}>
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${summary.progress}%`, backgroundColor: '#3DD4B0' }}
              />
            </div>
            <span className="text-sm font-medium" style={{ color: '#1F6F78' }}>
              {summary.progress}%
            </span>
          </div>
        )}
      </div>

      {/* Journey Stages */}
      {PORN_RECOVERY_STAGES.map((stage, stageIdx) => {
        const stageSteps = PORN_RECOVERY_STEPS.filter(s => s.stage === stage.id);
        const completedInStage = stageSteps.filter(s => isStepCompleted(s.id)).length;
        const isStageComplete = completedInStage === stageSteps.length;

        return (
          <div key={stage.id} className="mb-8">
            {/* Stage Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: isStageComplete ? '#F0FDF9' : '#F6F8FA', color: isStageComplete ? '#3DD4B0' : '#6B7280' }}
              >
                {isStageComplete ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-bold">{stageIdx + 1}</span>}
              </div>
              <div>
                <h2 className="font-bold" style={{ color: '#0F1C2E' }}>
                  {isAr ? stage.labelAr : stage.labelEn}
                </h2>
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  {completedInStage}/{stageSteps.length} {isAr ? 'مكتمل' : 'completed'}
                </p>
              </div>
            </div>

            {/* Stage Description */}
            <p className="text-sm mb-4 ms-13" style={{ color: '#374151' }}>
              {isAr ? stage.descriptionAr : stage.descriptionEn}
            </p>

            {/* Steps in Stage */}
            <div className="space-y-3 ms-6">
              {stageSteps.map((step) => {
                const completed = isStepCompleted(step.id);
                const current = isCurrentStep(step.id);

                return (
                  <div
                    key={step.id}
                    className={`rounded-xl p-4 border transition-all cursor-pointer ${
                      current ? 'border-2' : ''
                    }`}
                    style={{
                      borderColor: current ? '#3DD4B0' : completed ? '#E5E7EB' : '#E5E7EB',
                      backgroundColor: completed ? '#F0FDF9' : current ? '#F0FDF9' : '#fff'
                    }}
                    onClick={() => {
                      markStepStarted(step.id);
                      router.push(`${step.route}#${step.anchorId}`);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Step Status Icon */}
                      <div className="mt-0.5">
                        {completed ? (
                          <CheckCircle2 className="w-5 h-5" style={{ color: '#3DD4B0' }} />
                        ) : (
                          <Circle className="w-5 h-5" style={{ color: current ? '#3DD4B0' : '#9CA3AF' }} />
                        )}
                      </div>
                      {/* Step Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${completed ? 'line-through opacity-60' : ''}`} style={{ color: '#0F1C2E' }}>
                            {isAr ? step.labelAr : step.labelEn}
                          </span>
                          {step.isInteractive && !completed && (
                            <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F0F7F7', color: '#1F6F78' }}>
                              {isAr ? 'تفاعلي' : 'Interactive'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                          {isAr ? step.descriptionAr : step.descriptionEn}
                        </p>
                        {/* Download indicators */}
                        {step.downloadables.length > 0 && (
                          <div className="flex items-center gap-1 mt-2">
                            <Download className="w-3 h-3" style={{ color: '#9CA3AF' }} />
                            <span className="text-xs" style={{ color: '#9CA3AF' }}>
                              {step.downloadables.length} {isAr ? 'أداة قابلة للتحميل' : 'downloadable tool(s)'}
                            </span>
                          </div>
                        )}
                        {/* Estimated time */}
                        <span className="text-xs mt-1 inline-block" style={{ color: '#9CA3AF' }}>
                          ~{step.estimatedMinutes} {isAr ? 'دقيقة' : 'min'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Next Recommended Step */}
      {nextStep && nextStep.stepId !== 'identity-transformation' && (
        <div className="mt-8 rounded-xl p-6 border-2" style={{ borderColor: '#3DD4B0', backgroundColor: '#F0FDF9' }}>
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
            style={{ backgroundColor: '#3DD4B0' }}
          >
            {isAr ? 'متابعة' : 'Continue'} →
          </button>
        </div>
      )}

      {/* Journey Complete → Identity Transformation */}
      {summary?.completionState === 'completed' && (
        <div className="mt-8 rounded-xl p-6 text-center" style={{ backgroundColor: '#F0FDF9', border: '2px solid #3DD4B0' }}>
          <CheckCircle2 className="w-10 h-10 mx-auto mb-3" style={{ color: '#3DD4B0' }} />
          <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
            {isAr ? 'لقد أكملت رحلة التعافي' : 'You\'ve completed the Recovery Journey'}
          </h3>
          <p className="text-sm mb-4" style={{ color: '#374151' }}>
            {isAr
              ? 'لقد أكملت هذا الجزء من رحلة التعافي. يمكنك الآن متابعة بناء هويتك وأهدافك وعاداتك داخل Tamkinly.'
              : 'You\'ve completed this part of your recovery journey. You can now continue building your identity, goals, and habits within Tamkinly.'}
          </p>
          <button
            onClick={() => router.push('/quiz')}
            className="px-6 py-2.5 rounded-lg text-white font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#3DD4B0' }}
          >
            {isAr ? 'ابدأ برنامج إعادة برمجة الهوية' : 'Start Identity Transformation Program'} →
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
