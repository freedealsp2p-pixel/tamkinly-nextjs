"use client";

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { Locale, ProfessionalCriterion } from '@/lib/trc/safety-plan/types';
import { PROFESSIONAL_CRITERIA_OPTIONS } from '@/lib/trc/safety-plan/types';
import { getTranslations } from '@/lib/trc/safety-plan/translations';

interface ProfessionalHelpStepProps {
  locale: Locale;
  selected: ProfessionalCriterion[];
  onUpdate: (criteria: ProfessionalCriterion[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ProfessionalHelpStep({ locale, selected, onUpdate, onNext, onBack }: ProfessionalHelpStepProps) {
  const t = getTranslations(locale);
  const isRtl = locale === 'ar';

  const toggleCriteria = (criteria: ProfessionalCriterion) => {
    if (selected.includes(criteria)) {
      onUpdate(selected.filter(c => c !== criteria));
    } else {
      onUpdate([...selected, criteria]);
    }
  };

  const hasSuicidalThoughts = selected.includes('suicidal-thoughts');

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' as any }}
        className="max-w-2xl w-full"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-[#1F6F78]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E]">{t.professionalTitle}</h2>
        </div>
        <p className="text-slate-600 mb-8">{t.professionalSubtitle}</p>

        {/* Criteria chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {PROFESSIONAL_CRITERIA_OPTIONS.map(opt => {
            const isSelected = selected.includes(opt.id);
            const isHigh = opt.id === 'suicidal-thoughts' || opt.id === 'self-harm';
            return (
              <button
                key={opt.id}
                onClick={() => toggleCriteria(opt.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? isHigh
                      ? 'bg-[#E8685A] text-white shadow-sm'
                      : 'bg-[#1F6F78] text-white shadow-sm'
                    : 'bg-[#F0F7F7] text-slate-600 hover:bg-[#1F6F78]/10 border border-[#1F6F78]/10'
                }`}
              >
                {locale === 'ar' ? opt.labelAr : opt.labelEn}
              </button>
            );
          })}
        </div>

        {/* Immediate help notice */}
        {hasSuicidalThoughts && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#E8685A]/5 border border-[#E8685A]/20 rounded-2xl p-4 mb-6"
          >
            <p className="text-[#C53030] font-semibold text-sm leading-relaxed">
              {t.professionalImmediateHelp}
            </p>
          </motion.div>
        )}

        {/* Important note */}
        <div className="bg-[#1F6F78]/5 border border-[#1F6F78]/10 rounded-xl p-4 mb-8">
          <p className="text-slate-600 text-sm leading-relaxed">
            {t.professionalImportantNote}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button onClick={onBack} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
            {t.backLabel}
          </button>
          <button onClick={onNext} className="flex-1 px-6 py-3 bg-[#1F6F78] text-white font-medium rounded-xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200">
            {t.professionalNextButton}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
