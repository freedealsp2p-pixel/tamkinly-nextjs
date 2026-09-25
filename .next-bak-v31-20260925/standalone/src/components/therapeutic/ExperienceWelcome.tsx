'use client';

import { Clock, ListOrdered, Wind } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';
import type { ProtocolMeta, ProtocolStep } from './types';

interface ExperienceWelcomeProps {
  /** Protocol translation namespace (used for the per-protocol disclaimer) */
  translationKey: string;
  /** Source protocol metadata — the authority for names, purpose, duration */
  meta: ProtocolMeta;
  /** Source steps — titles only, shown as "what you will do" */
  steps: ProtocolStep[];
  /** Breadcrumb items */
  breadcrumbs: { label: string; href?: string }[];
  /** Primary color for the protocol */
  accentColor?: string;
  /** Called when the user chooses to continue toward preparation / gate */
  onBegin: () => void;
}

/**
 * ExperienceWelcome — first state of the paid experience, shown right after
 * access is verified. Contains only what is necessary before beginning:
 * protocol name, short purpose, expected duration, what the user will
 * actually do (source step titles), a preparation instruction, the safety
 * note, and one primary "Begin" action.
 *
 * No purchase UI. No unrelated platform content. No long marketing copy —
 * narrative framing stays on the public landing page the user already saw.
 */
export function ExperienceWelcome({
  translationKey,
  meta,
  steps,
  breadcrumbs,
  accentColor = '#1F6F78',
  onBegin,
}: ExperienceWelcomeProps) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations(translationKey);
  const ts = useTranslations('therapeuticProtocols.shared');

  const title = isAr ? meta.title.ar : meta.title.en;
  const subtitle = isAr ? meta.subtitle.ar : meta.subtitle.en;
  // Expected duration = sum of the source step durations (authoritative),
  // consistent with the protocol's marketed length in all locales.
  const totalSeconds = steps.reduce((acc, s) => acc + (s.duration || 0), 0);
  const minutes = Math.max(1, Math.round(totalSeconds / 60));

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center p-4 pt-10 sm:pt-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-lg w-full space-y-6">
        <RecoveryBreadcrumb items={breadcrumbs} />

        {/* Experience badge */}
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
          >
            <Wind className="w-3.5 h-3.5" />
            {ts('welcome.eyebrow')}
          </span>
        </div>

        {/* Title — protocol name + purpose */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1C2E]">
            {title}
          </h1>
          <p className="text-lg text-[#0F1C2E]/60">{subtitle}</p>
        </div>

        {/* Meta: expected duration + steps */}
        <div className="flex justify-center gap-6 text-sm text-[#0F1C2E]/50">
          <span className="flex items-center gap-1.5">
            <ListOrdered className="w-4 h-4" />
            {isAr
              ? `${meta.totalSteps} ${ts('welcome.stepsUnit')}`
              : `${meta.totalSteps} ${ts('welcome.stepsUnit')}`}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {isAr
              ? ts('welcome.approx') + ' ' + minutes + ' ' + ts('welcome.durationUnit')
              : '~' + minutes + ' ' + ts('welcome.durationUnit')}
          </span>
        </div>

        {/* What the user will actually do — source step titles */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold text-[#0F1C2E] mb-4">
            {ts('welcome.whatYoullDo')}
          </h2>
          <ol className="space-y-2.5" role="list">
            {steps.map((step, idx) => (
              <li key={step.id} className="flex items-center gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                  style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
                  aria-hidden="true"
                >
                  {idx + 1}
                </span>
                <span className="text-sm text-[#0F1C2E]/75 leading-relaxed">
                  {isAr ? step.title.ar : step.title.en}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Preparation instruction */}
        <p className="text-center text-sm text-[#0F1C2E]/60 leading-relaxed px-2">
          {ts('welcome.prepNote')}
        </p>

        {/* Safety note — per-protocol disclaimer from source translations */}
        <p className="text-center text-xs text-[#0F1C2E]/40 leading-relaxed max-w-sm mx-auto">
          {t('outro.disclaimer')}
        </p>

        {/* Primary action */}
        <button
          onClick={onBegin}
          className="w-full max-w-xs mx-auto block px-6 py-3.5 rounded-xl text-white font-semibold text-lg transition-all duration-200 active:scale-[0.98] hover:shadow-lg"
          style={{ backgroundColor: accentColor }}
        >
          {ts('welcome.beginCta')}
        </button>
      </div>
    </div>
  );
}

export default ExperienceWelcome;
