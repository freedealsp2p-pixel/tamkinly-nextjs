'use client';

import { useState } from 'react';
import { ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface ProtocolSafetyWarningProps {
  /** Translation key for this protocol's safety warning */
  translationKey: string;
  /** Called when user accepts and wants to proceed */
  onAccept: () => void;
  /** Called when user wants to go back */
  onDecline?: () => void;
  /** Danger color — defaults to Tamkinly danger red */
  dangerColor?: string;
}

/**
 * ProtocolSafetyWarning — Full-screen safety warning for protocols
 * that require explicit user consent (e.g., White Mirror).
 *
 * Shows contraindications list, alternative suggestions, and
 * requires explicit acceptance before proceeding.
 */
export function ProtocolSafetyWarning({
  translationKey,
  onAccept,
  onDecline,
  dangerColor = '#E8685A',
}: ProtocolSafetyWarningProps) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations(translationKey);
  const [expanded, setExpanded] = useState(false);

  // Read conditions from translations — fallback to generic list
  const conditions: string[] = [];
  for (let i = 0; i < 6; i++) {
    const val = t(`safety.condition${i}`);
    if (val && val !== `safety.condition${i}`) {
      conditions.push(val);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white" dir={direction}>
      <div className="max-w-lg w-full space-y-6">
        {/* Warning Icon */}
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: `${dangerColor}12` }}
          >
            <ShieldAlert className="w-8 h-8" style={{ color: dangerColor }} />
          </div>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{
              backgroundColor: `${dangerColor}12`,
              color: dangerColor,
            }}
          >
            {t('safety.badge')}
          </span>
          <h1 className="text-2xl font-bold text-[#0F1C2E]">
            {t('safety.title')}
          </h1>
        </div>

        {/* Body */}
        <p className="text-[#0F1C2E]/70 leading-relaxed text-center">
          {t('safety.body')}
        </p>

        {/* Contraindications — collapsible */}
        {conditions.length > 0 && (
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <button
              type="button"
              onClick={() => setExpanded(prev => !prev)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              aria-expanded={expanded}
            >
              <span className="font-medium text-[#0F1C2E]">
                {t('safety.doNotUse')}
              </span>
              {expanded ? (
                <ChevronUp className="w-4 h-4 text-[#0F1C2E]/40" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#0F1C2E]/40" />
              )}
            </button>
            {expanded && (
              <ul className="px-5 pb-4 space-y-2">
                {conditions.map((condition, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-[#0F1C2E]/70 leading-relaxed"
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: dangerColor }}
                    />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Alternative suggestion */}
        <p className="text-sm text-[#0F1C2E]/50 leading-relaxed text-center">
          {t('safety.alternative')}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onAccept}
            className="w-full px-4 py-3.5 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-[0.98] text-sm"
            style={{ backgroundColor: '#1F6F78' }}
          >
            {t('safety.accept')}
          </button>
          {onDecline && (
            <button
              onClick={onDecline}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F1C2E]/60 font-medium hover:bg-slate-50 transition-colors duration-200 text-sm"
            >
              {t('shared.goBack')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProtocolSafetyWarning;
