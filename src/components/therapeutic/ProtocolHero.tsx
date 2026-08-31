'use client';

import { Shield, Clock, ListOrdered } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { MedicalDisclaimer } from '@/components/recovery/system';
import { RecoveryBreadcrumb } from '@/components/recovery/system';

interface ProtocolHeroProps {
  /** Protocol slug for translations */
  translationKey: string;
  /** Total number of steps */
  stepCount: number;
  /** Total duration label (e.g., '12 min') */
  durationLabel: string;
  /** Breadcrumb items */
  breadcrumbs: { label: string; href?: string }[];
  /** Primary color for the protocol */
  accentColor?: string;
  /** Callback when user clicks Start */
  onStart: () => void;
  /** Optional learn-more scroll target ID */
  learnMoreTargetId?: string;
}

/**
 * ProtocolHero — Entry screen for a therapeutic protocol.
 * Reuses MedicalDisclaimer and RecoveryBreadcrumb from recovery system.
 * Shows orientation info, step count, duration, and start button.
 */
export function ProtocolHero({
  translationKey,
  stepCount,
  durationLabel,
  breadcrumbs,
  accentColor = '#1F6F78',
  onStart,
  learnMoreTargetId,
}: ProtocolHeroProps) {
   const { direction, locale } = useLocale();
  const t = useTranslations(translationKey);
  const isAr = locale === 'ar';

  const handleLearnMore = () => {
    if (learnMoreTargetId) {
      document
        .getElementById(learnMoreTargetId)
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-lg w-full space-y-6">
        <RecoveryBreadcrumb items={breadcrumbs} />
        <MedicalDisclaimer />

        {/* Icon */}
        <div className="flex justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <Shield className="w-8 h-8" style={{ color: accentColor }} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1C2E]">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-[#0F1C2E]/60">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Intro text — from source specification */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
          <p className="text-[#0F1C2E]/80 leading-[1.9] text-base">
            {t('intro')}
          </p>
          {t('intro2') && t('intro2') !== 'intro2' && (
            <p className="text-[#0F1C2E]/80 leading-[1.9] text-base">
              {t('intro2')}
            </p>
          )}
          <p className="text-[#0F1C2E]/70 leading-[1.9] font-medium">
            {t('claim')}
          </p>
        </div>

        {/* Meta: steps, duration */}
        <div className="flex justify-center gap-6 text-sm text-[#0F1C2E]/50">
          <span className="flex items-center gap-1.5">
            <ListOrdered className="w-4 h-4" />
            {isAr
              ? `${stepCount} خطوات`
              : `${stepCount} steps`}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {durationLabel}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onStart}
            className="w-full max-w-xs mx-auto block px-6 py-3.5 rounded-xl text-white font-semibold text-lg transition-all duration-200 active:scale-[0.98] hover:shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            {t('hero.startBtn')}
          </button>
          {learnMoreTargetId && (
            <button
              onClick={handleLearnMore}
              className="mx-auto block text-sm font-medium hover:underline"
              style={{ color: accentColor }}
            >
              {t('hero.learnBtn')}
            </button>
          )}
        </div>

        {/* Safety Notice */}
        <p className="text-center text-xs text-[#0F1C2E]/40 leading-relaxed max-w-sm mx-auto">
          {t('outro.disclaimer')}
        </p>
      </div>
    </div>
  );
}

export default ProtocolHero;
