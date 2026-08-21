'use client';

import { useState } from 'react';
import { Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

/**
 * MedicalDisclaimer
 *
 * A medical disclaimer component that must appear BEFORE any interactive
 * therapeutic exercise starts. It is a collapsible banner at the top of
 * the Entry Screen.
 *
 * - Shows a brief summary by default, expandable for full text.
 * - Warm and supportive tone — NOT scary legal language.
 * - Color scheme: #F5F9F8 background, #1F6F78 accent, #0F1C2E text.
 * - Icon: Shield from lucide-react.
 */

export interface MedicalDisclaimerProps {
  /** Extra classes applied to the outer container. */
  className?: string;
}

export function MedicalDisclaimer({ className }: MedicalDisclaimerProps) {
  const { direction } = useLocale();
  const t = useTranslations('recovery.medicalDisclaimer');
  const [expanded, setExpanded] = useState(false);

  const isRtl = direction === 'rtl';

  // Fallback text in case translations are not loaded
  const summary = t('summary') || 'هذه الأداة مساندة وليست بديلاً عن الرعاية الطبية أو النفسية.';
  const point1 = t('point1') || 'هذه الأداة مصممة كمساندة فقط وليست بديلاً عن العلاج المهني.';
  const point2 = t('point2') || 'أوقف التمرين إذا شعرت بزيادة في الانزعاج.';
  const point3 = t('point3') || 'اطلب مساعدة متخصصة عند الحاجة.';
  const fullText = t('fullText') || 'هذه الأداة مصممة كمساندة فقط وليست بديلاً عن العلاج المهني. أوقف التمرين إذا شعرت بزيادة في الانزعاج. اطلب مساعدة متخصصة عند الحاجة. إذا كنت في أزمة، تواصل مع متخصص مؤهل فوراً.';
  const expandLabel = t('expand') || 'اقرأ المزيد';
  const collapseLabel = t('collapse') || 'إخفاء';

  const points = [
    point1,
    point2,
    point3,
    t('point4') || 'إذا كنت في أزمة، تواصل مع متخصص مؤهل فوراً.',
  ];

  return (
    <div
      dir={direction}
      className={[
        'rounded-xl border border-[#1F6F78]/20',
        'bg-[#F5F9F8] px-5 py-4',
        'transition-all duration-300',
        className ?? '',
      ].join(' ')}
    >
      {/* Summary row — always visible */}
      <div className="flex items-start gap-3">
        <Shield
          className="w-5 h-5 mt-0.5 shrink-0 text-[#1F6F78]"
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed text-[#0F1C2E]">
            {summary}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className={[
            'flex items-center gap-1 shrink-0',
            'text-xs font-medium text-[#1F6F78] hover:text-[#1a5e66]',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1F6F78] focus-visible:ring-offset-1 rounded',
          ].join(' ')}
        >
          <span>{expanded ? collapseLabel : expandLabel}</span>
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Expanded content — full disclaimer details */}
      {expanded && (
        <div className="mt-3 pt-3 border-t border-[#1F6F78]/10">
          <ul className="space-y-2">
            {points.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-[#0F1C2E]/80 leading-relaxed"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1F6F78] shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MedicalDisclaimer;
