// Enhanced SuggestedNextStep — R1-C
// Uses Next Best Step Engine for dynamic recommendations
// CRITICAL: No gamification. No points, badges, levels, or streaks.

'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import { getNextBestStep, NextStepResult } from '@/lib/next-step-engine';
import { RecoveryProgram } from '@/lib/recovery-journey';

interface EnhancedSuggestedNextStepProps {
  program: RecoveryProgram;
  currentStepId?: string;
  // Override for manual specification
  override?: NextStepResult;
}

export default function EnhancedSuggestedNextStep({ program, currentStepId, override }: EnhancedSuggestedNextStepProps) {
  const router = useRouter();
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';

  const step = override || getNextBestStep(program, currentStepId);

  if (!step) return null;

  const isPrimary = step.isPrimary;
  const bgColor = isPrimary ? (program === 'trc' ? '#1F6F78' : '#3DD4B0') : '#fff';
  const textColor = isPrimary ? '#fff' : (program === 'trc' ? '#1F6F78' : '#3DD4B0');
  const borderColor = program === 'trc' ? '#1F6F78' : '#3DD4B0';

  return (
    <div
      className="rounded-xl p-4 border transition-all hover:shadow-md cursor-pointer"
      style={{
        backgroundColor: isPrimary ? bgColor : '#fff',
        borderColor: borderColor,
        direction
      }}
      onClick={() => step.isAvailable && router.push(step.route)}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: isPrimary ? 'rgba(255,255,255,0.2)' : `${borderColor}15` }}
        >
          <BookOpen className="w-5 h-5" style={{ color: textColor }} />
        </div>
        <div className="flex-1">
          <span className="text-xs font-medium" style={{ color: isPrimary ? 'rgba(255,255,255,0.8)' : '#6B7280' }}>
            {isAr ? 'الخطوة التالية' : 'Next Step'}
          </span>
          <h4 className="font-semibold text-sm mt-0.5" style={{ color: textColor }}>
            {isAr ? step.labelAr : step.labelEn}
          </h4>
          <p className="text-xs mt-0.5" style={{ color: isPrimary ? 'rgba(255,255,255,0.7)' : '#6B7280' }}>
            {isAr ? step.reasonAr : step.reasonEn}
          </p>
          {!step.isAvailable && (
            <span className="text-xs mt-1 inline-block px-2 py-0.5 rounded" style={{ backgroundColor: '#FEF2F2', color: '#991B1B' }}>
              {isAr ? 'قيد التطوير' : 'Under development'}
            </span>
          )}
        </div>
        {step.isAvailable && (
          isAr
            ? <ArrowLeft className="w-5 h-5" style={{ color: textColor }} />
            : <ArrowRight className="w-5 h-5" style={{ color: textColor }} />
        )}
      </div>
    </div>
  );
}
