'use client';

import { RefreshCw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface ProtocolCompletionProps {
  /** Translation key for this protocol */
  translationKey: string;
  /** Accent color */
  accentColor?: string;
  /** Suggested next protocols (links) */
  suggestedNext?: { label: string; href: string }[];
  /** Repeat handler */
  onRepeat: () => void;
}

/**
 * ProtocolCompletion — Shown after completing a therapeutic protocol.
 * Reuses SuggestedNextStep pattern from recovery system.
 * Shows completion message, repeat option, and next steps.
 */
export function ProtocolCompletion({
  translationKey,
  accentColor = '#1F6F78',
  suggestedNext,
  onRepeat,
}: ProtocolCompletionProps) {
  const router = useRouter();
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations(translationKey);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-lg w-full space-y-6">
        {/* Completion Icon */}
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <CheckCircle2 className="w-8 h-8" style={{ color: accentColor }} />
          </div>
          <h2 className="text-2xl font-bold text-[#0F1C2E] mb-2">
            {t('outro.title')}
          </h2>
          <p className="text-[#0F1C2E]/50 leading-relaxed max-w-md mx-auto">
            {t('outro.body')}
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-[#0F1C2E]/40 leading-relaxed max-w-sm mx-auto">
          {t('outro.disclaimer')}
        </p>

        {/* Actions */}
        <div className="space-y-3">
          {/* Repeat */}
          <button
            onClick={onRepeat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            style={{ backgroundColor: accentColor }}
          >
            <RefreshCw className="w-5 h-5" />
            <span>{t('outro.ctaRetry')}</span>
          </button>

          {/* Suggested Next Steps */}
          {suggestedNext?.map((item, idx) => (
            <button
              key={idx}
              onClick={() => router.push(item.href)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#0F1C2E]/10 text-[#0F1C2E] font-medium hover:bg-[#F5F9F8] transition-colors duration-200"
            >
              <span className="flex-1 text-right">{item.label}</span>
              <ArrowRight className="w-4 h-4 text-[#1F6F78]" />
            </button>
          ))}

          {/* Back to Hub */}
          <button
            onClick={() => router.push('/apps/therapeutic-protocols')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#0F1C2E]/10 text-[#0F1C2E]/60 font-medium hover:bg-slate-50 transition-colors duration-200"
          >
            <span className="flex-1 text-right">
              {t('shared.backToProtocols')}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProtocolCompletion;
