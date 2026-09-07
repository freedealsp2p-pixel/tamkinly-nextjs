'use client';

import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface PreparationScreenProps {
  /** Primary color for the protocol */
  accentColor?: string;
  /** Called when the user starts the guided session */
  onStart: () => void;
  /** Called when the user goes back to the welcome state */
  onBack: () => void;
}

/**
 * PreparationScreen — a calm readiness state between welcome and the first
 * active step. Tells the user: this is guided, pausing is allowed, leaving
 * is safe, audio is optional, reflection is optional, and they should never
 * force themselves through discomfort.
 *
 * This is intentionally NOT a medical disclaimer — it is orientation.
 */
export function PreparationScreen({
  accentColor = '#1F6F78',
  onStart,
  onBack,
}: PreparationScreenProps) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const ts = useTranslations('therapeuticProtocols.shared');

  const items = [
    ts('preparation.itemGuided'),
    ts('preparation.itemPause'),
    ts('preparation.itemExit'),
    ts('preparation.itemAudio'),
    ts('preparation.itemReflection'),
    ts('preparation.itemComfort'),
  ];

  const BackIcon = isAr ? ChevronRight : ChevronLeft;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-lg w-full space-y-8">
        {/* Calm icon */}
        <div className="flex justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}12` }}
          >
            <Leaf className="w-8 h-8" style={{ color: accentColor }} />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
            {ts('preparation.title')}
          </h1>
          <p className="text-[#0F1C2E]/55">{ts('preparation.subtitle')}</p>
        </div>

        {/* Gentle reminders */}
        <ul className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4" role="list">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accentColor }}
                aria-hidden="true"
              />
              <span className="text-[#0F1C2E]/75 leading-[1.8] text-sm sm:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onStart}
            className="w-full max-w-xs mx-auto block px-6 py-3.5 rounded-xl text-white font-semibold text-lg transition-all duration-200 active:scale-[0.98] hover:shadow-lg"
            style={{ backgroundColor: accentColor }}
          >
            {ts('preparation.startCta')}
          </button>
          <button
            onClick={onBack}
            className="mx-auto flex items-center gap-1.5 text-sm font-medium text-[#0F1C2E]/50 hover:text-[#0F1C2E] transition-colors"
          >
            <BackIcon className="w-4 h-4" />
            {ts('preparation.back')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreparationScreen;
