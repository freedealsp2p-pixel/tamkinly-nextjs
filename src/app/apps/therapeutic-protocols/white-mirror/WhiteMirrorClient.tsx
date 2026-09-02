'use client';

import { useReducer, useCallback, useState } from 'react';
import { ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import {
  TherapeuticShell, ProtocolHero, ProtocolStepCard, ProtocolCompletion,
} from '@/components/therapeutic';
import { createProtocolReducer } from '@/components/therapeutic/types';
import { WHITE_MIRROR_META, WHITE_MIRROR_STEPS, WHITE_MIRROR_SAFETY } from '@/lib/therapeutic-protocols/white-mirror';
import { useLocale } from '@/components/providers/LocaleProvider';

const TK = 'therapeuticProtocols.whiteMirror';
const { initialState, reducer } = createProtocolReducer(WHITE_MIRROR_STEPS.length);

export default function WhiteMirrorClient() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [safetyAccepted, setSafetyAccepted] = useState(false);
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';

  const step = WHITE_MIRROR_STEPS[state.currentStep];
  const progress = state.phase === 'active'
    ? ((state.currentStep + 1) / WHITE_MIRROR_STEPS.length) * 100
    : 0;

  const handleStart = useCallback(() => {
    if (!safetyAccepted) return;
    dispatch({ type: 'START' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [safetyAccepted]);

  const handleNext = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handlePrev = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRestart = useCallback(() => {
    dispatch({ type: 'RESTART' });
    setSafetyAccepted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const breadcrumbs = [
    { label: 'Tamkinly', href: '/' },
    { label: '/apps', href: '/apps' },
    { label: 'Therapeutic Protocols', href: '/apps/therapeutic-protocols' },
    { label: 'White Mirror' },
  ];

  const safetySection = !safetyAccepted ? (
    <WhiteMirrorSafetyInline onAccept={() => setSafetyAccepted(true)} />
  ) : null;

  return (
    <TherapeuticShell sectionType={state.phase === 'active' ? 'therapeutic' : 'standard'}>
      {state.phase === 'entry' && (
        <div>
          <ProtocolHero
            translationKey={TK}
            stepCount={WHITE_MIRROR_META.totalSteps}
            durationLabel="9 min"
            breadcrumbs={breadcrumbs}
            accentColor={WHITE_MIRROR_META.accentColor}
            onStart={handleStart}
          />
          {safetySection}
        </div>
      )}

      {state.phase === 'active' && (
        <ProtocolStepCard
          translationKey={TK}
          step={step}
          stepIndex={state.currentStep}
          totalSteps={WHITE_MIRROR_STEPS.length}
          progress={progress}
          accentColor={WHITE_MIRROR_META.accentColor}
          onNext={handleNext}
          onPrev={handlePrev}
          onRestart={handleRestart}
        />
      )}

      {state.phase === 'completion' && (
        <ProtocolCompletion
          translationKey={TK}
          accentColor={WHITE_MIRROR_META.accentColor}
          suggestedNext={[
            { label: 'The Temporal Decoupling', href: '/apps/therapeutic-protocols/temporal-decoupling' },
            { label: 'The Alternative Code', href: '/apps/therapeutic-protocols/alternative-code' },
          ]}
          onRepeat={handleRestart}
        />
      )}
    </TherapeuticShell>
  );
}

/** Inline safety check using WHITE_MIRROR_SAFETY source data directly */
function WhiteMirrorSafetyInline({ onAccept }: { onAccept: () => void }) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const [expanded, setExpanded] = useState(false);
  const safety = WHITE_MIRROR_SAFETY;

  return (
    <div className="container mx-auto px-4 sm:px-6 max-w-2xl -mt-4 mb-8" dir={direction}>
      <div className="rounded-2xl border border-[#E8685A]/20 bg-white p-5 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#E8685A]" />
          <span className="text-sm font-semibold text-[#E8685A]">
            {isAr ? safety.badge.ar : safety.badge.en}
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#0F1C2E]">
          {isAr ? safety.title.ar : safety.title.en}
        </h3>

        <p className="text-sm text-[#0F1C2E]/70 leading-relaxed">
          {isAr ? safety.body.ar : safety.body.en}
        </p>

        <div className="rounded-xl border border-slate-100 overflow-hidden">
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#0F1C2E] hover:bg-slate-50 transition-colors"
            aria-expanded={expanded}
          >
            <span>{isAr ? safety.doNotUse.ar : safety.doNotUse.en}</span>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-[#0F1C2E]/40" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#0F1C2E]/40" />
            )}
          </button>
          {expanded && (
            <ul className="px-4 pb-3 space-y-1.5">
              {safety.conditions.map((c, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#0F1C2E]/60 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E8685A] shrink-0" />
                  <span>{isAr ? c.ar : c.en}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-xs text-[#0F1C2E]/50 leading-relaxed">
          {isAr ? safety.alternative.ar : safety.alternative.en}
        </p>

        <button
          onClick={onAccept}
          className="w-full px-4 py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-[0.98] text-sm"
          style={{ backgroundColor: '#0F1C2E' }}
        >
          {isAr ? safety.accept.ar : safety.accept.en}
        </button>
      </div>
    </div>
  );
}
