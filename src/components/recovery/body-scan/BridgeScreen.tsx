'use client';

import { COLORS } from '@/lib/recovery/body-scan/constants';
import { useTranslations } from '@/components/providers/LocaleProvider';

interface BridgeScreenProps {
  onProceed: () => void;
  onGoBack: () => void;
}

export default function BridgeScreen({ onProceed, onGoBack }: BridgeScreenProps) {
  const t = useTranslations('recoveryAssets.body-scan');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ backgroundColor: COLORS.bgDark }}>
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.textPrimary }}>
        {t('bridge.title')}
      </h2>

      {/* Explanation */}
      <div className="max-w-md space-y-4 mb-8">
        <p className="text-base leading-relaxed" style={{ color: COLORS.textSecondary }}>
          {t('bridge.description')}
        </p>

        <div
          className="rounded-xl p-4 text-right"
          style={{ backgroundColor: COLORS.bgCard, border: `1px solid ${COLORS.border}` }}
        >
          <ul className="space-y-3 text-sm" style={{ color: COLORS.textSecondary }}>
            <li className="flex items-start gap-2">
              <span style={{ color: COLORS.primary }}>●</span>
              <span>{t('bridge.item1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: COLORS.primary }}>●</span>
              <span>{t('bridge.item2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: COLORS.primary }}>●</span>
              <span>{t('bridge.item3')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: COLORS.primary }}>●</span>
              <span>{t('bridge.item4')}</span>
            </li>
          </ul>
        </div>

        <p className="text-sm" style={{ color: COLORS.textMuted }}>
          {t('bridge.goalNote')}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onGoBack}
          className="px-6 py-3 rounded-xl text-sm transition-all duration-200"
          style={{ backgroundColor: COLORS.bgCard, color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }}
        >
          {t('bridge.goBack')}
        </button>
        <button
          onClick={onProceed}
          className="px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-105"
          style={{ backgroundColor: COLORS.primary, color: '#fff' }}
        >
          {t('bridge.proceed')}
        </button>
      </div>
    </div>
  );
}
