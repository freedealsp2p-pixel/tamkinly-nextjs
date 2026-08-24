'use client';

import { RefreshCw, Map, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SuggestedNextStep } from '@/components/recovery/system';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface CompletionScreenProps {
  onRepeat: () => void;
}

export default function CompletionScreen({ onRepeat }: CompletionScreenProps) {
  const router = useRouter();
  const { direction } = useLocale();
  const t = useTranslations('recoveryAssets.body-scan');

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-md w-full space-y-6">
        {/* Acknowledgment */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#1F6F78]/10">
            <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1F6F78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-[#0F1C2E] mb-3">
            {t('completion.title')}
          </h2>

          <p className="text-base leading-relaxed max-w-md text-[#0F1C2E]/60 mb-4">
            {t('completion.description')}
          </p>

          <p className="text-sm text-[#0F1C2E]/40 mb-8">
            {t('completion.returnNote')}
          </p>
        </div>

        {/* Next Step Suggestions — Safety Path: Body Scan → Trigger Mapping (Wave 2) */}
        <div className="space-y-3">
          {/* Repeat */}
          <button
            onClick={onRepeat}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1F6F78] text-white font-semibold hover:bg-[#1a5e66] transition-colors duration-200"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{t('completion.repeat')}</span>
          </button>

          {/* Safety Path: Next Step → Trigger Mapping (Wave 2 — coming soon) */}
          <SuggestedNextStep
            title={t('completion.nextStep.title')}
            description={t('completion.nextStep.description')}
            href="/recovery/trc"
            icon={<Map className="w-5 h-5" />}
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
