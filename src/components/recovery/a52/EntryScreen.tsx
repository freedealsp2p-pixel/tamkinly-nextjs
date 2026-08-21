'use client';

import { Wind } from 'lucide-react';
import { MedicalDisclaimer } from '@/components/recovery/system';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface EntryScreenProps {
  onStart: () => void;
}

export function EntryScreen({ onStart }: EntryScreenProps) {
  const { direction } = useLocale();
  const t = useTranslations('recoveryAssets.a52');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-md w-full text-center space-y-6">
        <MedicalDisclaimer />

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-[#1F6F78]/10 flex items-center justify-center">
            <Wind className="w-8 h-8 text-[#1F6F78]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-semibold text-[#0F1C2E]">
          {t('entry.title')}
        </h1>

        {/* Description */}
        <p className="text-lg text-[#0F1C2E]/70 leading-relaxed">
          {t('entry.description')}
        </p>

        {/* Duration & Difficulty */}
        <div className="flex justify-center gap-6 text-sm text-[#0F1C2E]/60">
          <span>{t('entry.duration')}</span>
          <span>{t('entry.level')}</span>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full max-w-xs mx-auto block px-6 py-3 rounded-xl bg-[#1F6F78] text-white font-semibold text-lg hover:bg-[#1a5e66] transition-colors duration-200 active:scale-[0.98]"
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
              ? 'إذا كنت تعاني من نوبة هلع شديدة أو تفارق حاد، قد لا يكون هذا التمرين مناسباً الآن. يمكنك تجربة تنظم الحواس 5-4-3-2-1 بدلاً.'
              : 'If you experience severe panic or dissociation, this exercise may not be suitable right now. You can try 5-4-3-2-1 Sensory Grounding instead.'}
          </p>
          {direction === 'rtl' ? (
            <a href="/recovery/trc/grounding" className="inline-block mt-2 text-[#1F6F78] font-medium hover:underline">→ تنظم الحواس 5-4-3-2-1</a>
          ) : (
            <a href="/recovery/trc/grounding" className="inline-block mt-2 text-[#1F6F78] font-medium hover:underline">→ 5-4-3-2-1 Sensory Grounding</a>
          )}
        </div>

        {/* Safety Notice */}
        <p className="text-sm text-[#0F1C2E]/40 leading-relaxed max-w-sm mx-auto">
          {t('entry.safetyNotice')}
        </p>
      </div>
    </div>
  );
}

export default EntryScreen;
