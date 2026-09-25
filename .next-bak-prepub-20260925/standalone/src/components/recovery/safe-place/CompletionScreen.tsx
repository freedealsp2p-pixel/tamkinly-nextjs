'use client';

import { RefreshCw, Scan, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SuggestedNextStep } from '@/components/recovery/system';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface CompletionScreenProps {
  onRepeat: () => void;
}

export function CompletionScreen({ onRepeat }: CompletionScreenProps) {
  const router = useRouter();
  const { direction } = useLocale();
  const t = useTranslations('recoveryAssets.safe-place');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-md w-full space-y-6">
        {/* Acknowledgment Message */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#0F1C2E]">
            {t('completion.title')}
          </h2>
          <p className="text-[#0F1C2E]/50 mt-2 leading-relaxed">
            {t('completion.description')}
          </p>
        </div>

        {/* Next Step Suggestions — Safety Path: Safe Place → Body Scan */}
        <div className="space-y-3">
          {/* Repeat */}
          <button
            onClick={onRepeat}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1F6F78] text-white font-semibold hover:bg-[#1a5e66] transition-colors duration-200"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{t('completion.repeat')}</span>
          </button>

          {/* Safety Path: Next Step → Body Scan */}
          <SuggestedNextStep
            title={t('completion.nextStep.title')}
            description={t('completion.nextStep.description')}
            href="/recovery/trc/body-scan"
            icon={<Scan className="w-5 h-5" />}
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
