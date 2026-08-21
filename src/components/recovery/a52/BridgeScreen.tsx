'use client';

import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface BridgeScreenProps {
  onProceed: () => void;
  onGoBack: () => void;
}

export function BridgeScreen({ onProceed, onGoBack }: BridgeScreenProps) {
  const { direction } = useLocale();
  const t = useTranslations('recoveryAssets.a52');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-md w-full space-y-6">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[#0F1C2E] text-center">
          {t('bridge.title')}
        </h2>

        {/* What Will Happen */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium text-[#1F6F78] mb-2">{t('bridge.whatWillHappen.title')}</h3>
            <p className="text-[#0F1C2E]/70 leading-relaxed text-sm">
              {t('bridge.whatWillHappen.description')}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium text-[#1F6F78] mb-2">{t('bridge.whyUseful.title')}</h3>
            <p className="text-[#0F1C2E]/70 leading-relaxed text-sm">
              {t('bridge.whyUseful.description')}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium text-[#1F6F78] mb-2">{t('bridge.whatYouNeed.title')}</h3>
            <p className="text-[#0F1C2E]/70 leading-relaxed text-sm">
              {t('bridge.whatYouNeed.description')}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium text-[#1F6F78] mb-2">{t('bridge.youControl.title')}</h3>
            <p className="text-[#0F1C2E]/70 leading-relaxed text-sm">
              {t('bridge.youControl.description')}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onProceed}
            className="w-full px-6 py-3 rounded-xl bg-[#1F6F78] text-white font-semibold text-lg hover:bg-[#1a5e66] transition-colors duration-200 active:scale-[0.98]"
          >
            {t('bridge.proceed')}
          </button>
          <button
            onClick={onGoBack}
            className="w-full px-6 py-3 rounded-xl bg-transparent text-[#0F1C2E]/50 font-medium text-base hover:text-[#0F1C2E]/70 transition-colors duration-200"
          >
            {t('bridge.goBack')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BridgeScreen;
