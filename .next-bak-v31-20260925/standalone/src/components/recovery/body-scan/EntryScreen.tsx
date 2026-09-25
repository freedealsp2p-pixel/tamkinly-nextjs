'use client';

import { Activity } from 'lucide-react';
import { COLORS } from '@/lib/recovery/body-scan/constants';
import { MedicalDisclaimer } from '@/components/recovery/system';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface EntryScreenProps {
  onStart: () => void;
}

export default function EntryScreen({ onStart }: EntryScreenProps) {
  const { direction } = useLocale();
  const t = useTranslations('recoveryAssets.body-scan');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ backgroundColor: COLORS.bgDark }}>
      <div className="max-w-md w-full space-y-6">
        <MedicalDisclaimer />

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
          style={{ backgroundColor: COLORS.primary + '20' }}
        >
          <Activity size={40} color={COLORS.primary} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold" style={{ color: COLORS.textPrimary }}>
          {t('entry.title')}
        </h1>

        {/* Subtitle */}
        <p className="text-base max-w-md leading-relaxed mx-auto" style={{ color: COLORS.textSecondary }}>
          {t('entry.description')}
        </p>

        {/* Meta badges */}
        <div className="flex justify-center gap-4">
          <span
            className="px-4 py-2 rounded-full text-sm"
            style={{ backgroundColor: COLORS.bgCard, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }}
          >
            ⏱ {t('entry.duration')}
          </span>
          <span
            className="px-4 py-2 rounded-full text-sm"
            style={{ backgroundColor: COLORS.bgCard, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }}
          >
            🌱 {t('entry.level')}
          </span>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: COLORS.primary, color: '#fff' }}
        >
          {t('entry.startButton')}
        </button>

        {/* Contraindication Warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 leading-relaxed max-w-sm mx-auto">
          <p className="font-medium mb-1">
            {direction === 'rtl' ? '⚠️ تنبيه' : '⚠️ Please note'}
          </p>
          <p>
            {direction === 'rtl'
              ? 'إذا كنت تعاني من تفارق حاد، صدمة حديثة، أو ذكريات اقتحامية حية، قد لا يكون هذا التمرين مناسباً الآن. يمكنك تجربة تنظم الحواس أو أداة HALT بدلاً.'
              : 'If you experience severe dissociation, recent trauma, or active flashbacks, this exercise may not be suitable right now. You can try Sensory Grounding or HALT instead.'}
          </p>
          {direction === 'rtl' ? (
            <a href="/recovery/trc/grounding" className="inline-block mt-2 text-[#1F6F78] font-medium hover:underline">→ تنظم الحواس 5-4-3-2-1</a>
          ) : (
            <a href="/recovery/trc/grounding" className="inline-block mt-2 text-[#1F6F78] font-medium hover:underline">→ 5-4-3-2-1 Sensory Grounding</a>
          )}
        </div>

        {/* Safety note */}
        <p className="text-xs max-w-sm mx-auto" style={{ color: COLORS.textMuted }}>
          {t('entry.safetyNotice')}
        </p>
      </div>
    </div>
  );
}
