"use client";

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';

interface SuggestedNextStepProps {
  /** Title of the suggested next asset */
  title: string;
  /** Brief description of why this is the next step */
  description: string;
  /** Route to navigate to */
  href: string;
  /** Icon element (optional) */
  icon?: React.ReactNode;
  /** Whether this is the primary suggestion (highlighted) */
  isPrimary?: boolean;
}

/**
 * SuggestedNextStep — Reusable component for suggesting the next therapeutic asset.
 * 
 * Usage: After completing an exercise, show the suggested next step.
 * Clinical flow (Safety Path): Grounding → A52 → Safe Place → Body Scan → Trigger Mapping
 * 
 * CRITICAL: No gamification. No points, badges, levels, or streaks.
 * This is a clinical suggestion, not a reward.
 */
export function SuggestedNextStep({
  title,
  description,
  href,
  icon,
  isPrimary = false,
}: SuggestedNextStepProps) {
  const router = useRouter();
  const { direction } = useLocale();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowLeft;

  return (
    <button
      onClick={() => router.push(href)}
      className={[
        'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200',
        isPrimary
          ? 'bg-[#1F6F78] text-white font-semibold hover:bg-[#1a5e66]'
          : 'bg-white border border-[#0F1C2E]/10 text-[#0F1C2E] font-medium hover:bg-[#F5F9F8]',
      ].join(' ')}
      dir={direction}
      title={description}
    >
      {icon && (
        <span className={isPrimary ? 'text-white' : 'text-[#1F6F78]'}>
          {icon}
        </span>
      )}
      <span className="flex-1 text-right">{title}</span>
      <ArrowLeft className="w-4 h-4 opacity-50" />
    </button>
  );
}

export default SuggestedNextStep;

