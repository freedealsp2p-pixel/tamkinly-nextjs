'use client';

import { RefreshCw, Shield, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CYCLES } from '@/lib/recovery/a52/constants';
import { STORAGE_KEYS } from '@/lib/recovery/a52/constants';
import { SuggestedNextStep } from '@/components/recovery/system';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface CompletionScreenProps {
  completedCycles: number | null;
  reflectionText: string;
  onReflectionChange: (text: string) => void;
  onRepeat: () => void;
}

export function CompletionScreen({
  completedCycles,
  reflectionText,
  onReflectionChange,
  onRepeat,
}: CompletionScreenProps) {
  const router = useRouter();
  const { direction } = useLocale();
  const t = useTranslations('recoveryAssets.a52');
  const isFullCompletion = completedCycles === null || completedCycles >= CYCLES.TOTAL;

  const saveReflection = () => {
    if (reflectionText.trim()) {
      const key = `${STORAGE_KEYS.REFLECTION_PREFIX}${Date.now()}`;
      localStorage.setItem(key, reflectionText);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-md w-full space-y-6">
        {/* Confirmation Message */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#0F1C2E]">
            {isFullCompletion
              ? t('completion.fullTitle')
              : t('completion.partialTitle', { completed: completedCycles, total: CYCLES.TOTAL })
            }
          </h2>
        </div>

        {/* Reflection Prompt */}
        <div className="space-y-2">
          <label className="text-sm text-[#0F1C2E]/60">
            {t('completion.reflectionLabel')}
          </label>
          <textarea
            value={reflectionText}
            onChange={(e) => onReflectionChange(e.target.value)}
            placeholder={t('completion.reflectionPlaceholder')}
            maxLength={500}
            className="w-full h-24 rounded-xl border border-[#0F1C2E]/10 p-3 text-[#0F1C2E] bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30"
            dir={direction}
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#0F1C2E]/40">{t('completion.savedLocally')}</p>
            {reflectionText.trim() && (
              <button
                onClick={saveReflection}
                className="text-xs text-[#1F6F78] font-medium hover:text-[#1a5e66]"
              >
                {t('completion.saveReflection')}
              </button>
            )}
          </div>
        </div>

        {/* Next Step Suggestions — Safety Path: A52 → Safe Place */}
        <div className="space-y-3">
          {/* Primary: Repeat */}
          <button
            onClick={onRepeat}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1F6F78] text-white font-semibold hover:bg-[#1a5e66] transition-colors duration-200"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{t('completion.repeat')}</span>
          </button>

          {/* Safety Path: Next Step → Safe Place */}
          <SuggestedNextStep
            title={t('completion.nextStep.title')}
            description={t('completion.nextStep.description')}
            href="/recovery/trc/safe-place"
            icon={<Shield className="w-5 h-5" />}
            isPrimary={true}
          />

          {/* Back to Hub */}
          <button
            onClick={() => router.push('/recovery/trc')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#0F1C2E]/10 text-[#0F1C2E] font-medium hover:bg-[#F5F9F8] transition-colors duration-200"
          >
            <ArrowRight className="w-5 h-5 text-[#1F6F78]" />
            <span>{t('completion.backToHub')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompletionScreen;
