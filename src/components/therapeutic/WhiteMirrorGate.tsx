'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { WHITE_MIRROR_SAFETY } from '@/lib/therapeutic-protocols/white-mirror';

interface WhiteMirrorGateProps {
  /** Called when the user accepts — moves directly into the first step */
  onAccept: () => void;
  /** Called when the user declines — the protocol must not start */
  onDecline: () => void;
}

/**
 * WhiteMirrorGate — the explicit safety gate for the White Mirror protocol.
 *
 * Occurs BEFORE any active participation. Built directly from the
 * WHITE_MIRROR_SAFETY source data (authoritative content — nothing rewritten).
 *
 *  - Acceptance moves directly into the first step.
 *  - Declining prevents the protocol from starting and offers the gentler
 *    alternatives named by the source, with neutral, respectful language.
 *  - Visually restrained and spacious — no dark or sensational styling.
 */
export function WhiteMirrorGate({ onAccept, onDecline }: WhiteMirrorGateProps) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const ts = useTranslations('therapeuticProtocols.shared');
  const [expanded, setExpanded] = useState(false);
  const [declined, setDeclined] = useState(false);
  const safety = WHITE_MIRROR_SAFETY;

  const text = (obj: { ar: string; en: string }) => (isAr ? obj.ar : obj.en);

  if (declined) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-full bg-[#1F6F78]/10 flex items-center justify-center">
              <ShieldAlert className="w-7 h-7 text-[#1F6F78]" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#0F1C2E]">
            {ts('gate.declinedTitle')}
          </h1>
          <p className="text-[#0F1C2E]/60 leading-relaxed">
            {ts('gate.declinedBody')}
          </p>

          <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3">
            <p className="text-sm font-semibold text-[#0F1C2E]">
              {ts('gate.gentlerLabel')}
            </p>
            <div className="space-y-2">
              <Link
                href="/apps/therapeutic-protocols/temporal-decoupling"
                className="block px-4 py-3 rounded-xl bg-[#F5F9F8] text-sm font-medium text-[#0F1C2E] hover:bg-[#e8f1f0] transition-colors"
              >
                {isAr ? 'بروتوكول التفكيك الزمني' : 'The Temporal Decoupling Protocol'}
              </Link>
              <Link
                href="/apps/therapeutic-protocols/alternative-code"
                className="block px-4 py-3 rounded-xl bg-[#F5F9F8] text-sm font-medium text-[#0F1C2E] hover:bg-[#e8f1f0] transition-colors"
              >
                {isAr ? 'بروتوكول الشفرة البديلة' : 'The Alternative Code Protocol'}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setDeclined(false)}
              className="text-sm font-medium text-[#1F6F78] hover:underline"
            >
              {ts('gate.backToSafety')}
            </button>
            <button
              type="button"
              onClick={onDecline}
              className="mx-auto text-sm text-[#0F1C2E]/45 hover:text-[#0F1C2E]/70 transition-colors"
            >
              {ts('gate.backToWelcome')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F9F8]" dir={direction}>
      <div className="max-w-lg w-full space-y-6">
        {/* Badge + title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-14 h-14 rounded-full bg-[#E8685A]/10 flex items-center justify-center">
              <ShieldAlert className="w-7 h-7 text-[#E8685A]" />
            </div>
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#E8685A]/10 text-[#E8685A]">
            {text(safety.badge)}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
            {text(safety.title)}
          </h1>
        </div>

        {/* Body */}
        <p className="text-[#0F1C2E]/70 leading-[1.9] text-center px-2">
          {text(safety.body)}
        </p>

        {/* Contraindications — collapsible, from source */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-[#0F1C2E] hover:bg-slate-50 transition-colors"
            aria-expanded={expanded}
          >
            <span>{text(safety.doNotUse)}</span>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-[#0F1C2E]/40" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#0F1C2E]/40" />
            )}
          </button>
          {expanded && (
            <ul className="px-5 pb-4 space-y-2" role="list">
              {safety.conditions.map((c, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-[#0F1C2E]/65 leading-relaxed"
                >
                  <X className="w-3.5 h-3.5 mt-1 text-[#E8685A] flex-shrink-0" aria-hidden="true" />
                  <span>{text(c)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Alternative recommendation — verbatim from source */}
        <p className="text-xs text-[#0F1C2E]/50 leading-relaxed text-center px-4">
          {text(safety.alternative)}
        </p>

        {/* Actions — acceptance moves directly into the first step */}
        <div className="flex flex-col gap-3 pt-2">
          <button
            type="button"
            onClick={onAccept}
            className="w-full px-4 py-3.5 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            style={{ backgroundColor: '#0F1C2E' }}
          >
            {text(safety.accept)}
          </button>
          <button
            type="button"
            onClick={() => setDeclined(true)}
            className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-[#0F1C2E]/60 font-medium hover:bg-slate-50 transition-colors duration-200 text-sm"
          >
            {ts('gate.decline')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WhiteMirrorGate;
