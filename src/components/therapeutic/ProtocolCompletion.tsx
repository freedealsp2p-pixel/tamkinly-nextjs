'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface ProtocolCompletionProps {
  /** Translation key for this protocol (outro.* labels) */
  translationKey: string;
  /** Accent color */
  accentColor?: string;
  /** Related protocols — offered quietly, never as an aggressive upsell */
  suggestedNext?: { label: string; href: string }[];
  /** Repeat handler — starts a new experience only when explicitly chosen */
  onRepeat: () => void;
}

/**
 * ProtocolCompletion — therapeutic closure, not a gamification or marketing
 * state. Communicates that the guided experience has ended, returns
 * attention to the present, offers optional (local-only) reflection, and
 * provides calm next navigation. No outcome claims, no aggressive cross-sell.
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
  const ts = useTranslations('therapeuticProtocols.shared');

  // Optional reflection lives in memory only — never transmitted, never
  // stored server-side, never persisted, never pre-filled.
  const [reflection, setReflection] = useState('');

  // Forward chevron follows reading direction: right in LTR, left in RTL.
  const ForwardIcon = isAr ? ChevronLeft : ChevronRight;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-lg w-full space-y-6">
        {/* Closure */}
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <CheckCircle2 className="w-8 h-8" style={{ color: accentColor }} />
          </div>
          <h1 className="text-2xl font-bold text-[#0F1C2E] mb-2">
            {t('outro.title')}
          </h1>
          <p className="text-[#0F1C2E]/55 leading-relaxed max-w-md mx-auto">
            {t('outro.body')}
          </p>
        </div>

        {/* Return attention to the present */}
        <div className="bg-white rounded-2xl border border-slate-100 px-5 py-4 text-center">
          <p className="text-[#0F1C2E]/70 leading-[1.9] text-sm sm:text-base">
            {ts('completion.returnPresent')}
          </p>
        </div>

        {/* Optional reflection — local only */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-[#1F6F78]">
            {ts('completion.reflectionTitle')}
          </p>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder={ts('completion.reflectionPlaceholder')}
            aria-label={ts('completion.reflectionTitle')}
            className="w-full h-20 px-4 py-3 rounded-xl border border-slate-200 text-[#0F1C2E] text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#1F6F78]/30 transition-all resize-none"
            maxLength={500}
          />
          <p className="text-[11px] text-[#0F1C2E]/35 leading-relaxed">
            {ts('completion.privacyNote')}
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-[#0F1C2E]/40 leading-relaxed max-w-sm mx-auto">
          {t('outro.disclaimer')}
        </p>

        {/* Calm next navigation — clearly secondary to the closure */}
        <div className="space-y-3 pt-2">
          <p className="text-center text-xs font-medium text-[#0F1C2E]/40 uppercase tracking-wider">
            {ts('completion.whenReady')}
          </p>

          <button
            onClick={onRepeat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F1C2E] font-medium hover:bg-slate-50 transition-colors duration-200 text-sm"
          >
            {t('outro.ctaRetry')}
          </button>

          {suggestedNext?.map((item, idx) => (
            <button
              key={idx}
              onClick={() => router.push(item.href)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/60 border border-slate-100 text-[#0F1C2E]/65 text-sm hover:bg-white transition-colors duration-200"
            >
              <span className="flex-1 text-start">{item.label}</span>
              <ForwardIcon className="w-4 h-4 text-[#0F1C2E]/35" />
            </button>
          ))}

          <button
            onClick={() => router.push('/apps/therapeutic-protocols')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[#0F1C2E]/45 hover:text-[#0F1C2E]/70 text-sm transition-colors"
          >
            {ts('completion.backToProtocols')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProtocolCompletion;
