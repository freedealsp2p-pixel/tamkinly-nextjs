"use client";

import { motion } from 'framer-motion';
import { ClipboardCheck, Edit3, Bookmark } from 'lucide-react';
import type { Locale, SafetyPlanData, PlanPhase } from '@/lib/trc/safety-plan/types';
import { getTranslations } from '@/lib/trc/safety-plan/translations';

interface SafetyPlanReviewProps {
  locale: Locale;
  plan: SafetyPlanData;
  onEdit: (phase: PlanPhase) => void;
  onSave: () => void;
}

export default function SafetyPlanReview({ locale, plan, onEdit, onSave }: SafetyPlanReviewProps) {
  const t = getTranslations(locale);
  const isRtl = locale === 'ar';

  const hasWarningSigns = plan.warningSigns.physical.length > 0 || plan.warningSigns.emotional.length > 0 || plan.warningSigns.behavioral.length > 0 || !!plan.warningSigns.custom;
  const hasStabilize = !!(plan.stabilizeTools.breathing || plan.stabilizeTools.grounding || plan.stabilizeTools.safePlace || plan.stabilizeTools.bodyScan) || plan.stabilizeTools.otherTools.length > 0;
  const hasSupport = plan.supportSources.length > 0;
  const hasSafePlaces = plan.safePlaces.length > 0;
  const hasDistress = plan.distressSteps.some(s => s.action);
  const hasProfessional = plan.professionalHelpCriteria.length > 0;
  const hasExit = !!(plan.exitPlan.stopSignal || plan.exitPlan.firstAction);

  const Section = ({ title, phase, hasContent, children }: { title: string; phase: PlanPhase; hasContent: boolean; children: React.ReactNode }) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm text-[#0F1C2E]">{title}</h3>
        <button onClick={() => onEdit(phase)} className="flex items-center gap-1 text-xs text-[#1F6F78] hover:text-[#1a5e66] font-medium transition-colors">
          <Edit3 className="w-3 h-3" /> {t.reviewEditButton}
        </button>
      </div>
      <div className="bg-[#F0F7F7] border border-[#1F6F78]/10 rounded-xl p-3">
        {hasContent ? children : <p className="text-slate-400 text-sm italic">{t.reviewEmpty}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6" dir={isRtl ? 'rtl' : 'ltr'}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5 text-[#3DD4B0]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1C2E]">{t.reviewTitle}</h2>
        </div>
        <p className="text-slate-600 mb-8">{t.reviewSubtitle}</p>

        {/* Warning Signs */}
        <Section title={t.reviewWarningSection} phase="warning-signs" hasContent={hasWarningSigns}>
          <div className="space-y-1">
            {plan.warningSigns.physical.length > 0 && <p className="text-xs text-slate-600"><span className="font-semibold">{t.warningPhysicalLabel}:</span> {plan.warningSigns.physical.join(', ')}</p>}
            {plan.warningSigns.emotional.length > 0 && <p className="text-xs text-slate-600"><span className="font-semibold">{t.warningEmotionalLabel}:</span> {plan.warningSigns.emotional.join(', ')}</p>}
            {plan.warningSigns.behavioral.length > 0 && <p className="text-xs text-slate-600"><span className="font-semibold">{t.warningBehavioralLabel}:</span> {plan.warningSigns.behavioral.join(', ')}</p>}
            {plan.warningSigns.custom && <p className="text-xs text-slate-600">{plan.warningSigns.custom}</p>}
          </div>
        </Section>

        {/* Stabilize */}
        <Section title={t.reviewStabilizeSection} phase="stabilize" hasContent={hasStabilize}>
          <div className="flex flex-wrap gap-1">
            {plan.stabilizeTools.breathing && <span className="px-2 py-0.5 rounded bg-[#1F6F78]/10 text-[#1F6F78] text-xs">{t.stabilizeBreathing}</span>}
            {plan.stabilizeTools.grounding && <span className="px-2 py-0.5 rounded bg-[#1F6F78]/10 text-[#1F6F78] text-xs">{t.stabilizeGrounding}</span>}
            {plan.stabilizeTools.safePlace && <span className="px-2 py-0.5 rounded bg-[#1F6F78]/10 text-[#1F6F78] text-xs">{t.stabilizeSafePlace}</span>}
            {plan.stabilizeTools.bodyScan && <span className="px-2 py-0.5 rounded bg-[#1F6F78]/10 text-[#1F6F78] text-xs">{t.stabilizeBodyScan}</span>}
            {plan.stabilizeTools.otherTools.map(tool => <span key={tool} className="px-2 py-0.5 rounded bg-[#1F6F78]/10 text-[#1F6F78] text-xs">{tool}</span>)}
          </div>
        </Section>

        {/* Support People */}
        <Section title={t.reviewSupportSection} phase="support-people" hasContent={hasSupport}>
          <div className="space-y-1">
            {plan.supportSources.map((person, idx) => (
              <p key={idx} className="text-xs text-slate-600">{person.name}{person.relation ? ` (${person.relation})` : ''} — {person.contactMethod}</p>
            ))}
          </div>
        </Section>

        {/* Safe Places */}
        <Section title={t.reviewSafePlacesSection} phase="safe-places" hasContent={hasSafePlaces}>
          <div className="space-y-1">
            {plan.safePlaces.map((place, idx) => (
              <p key={idx} className="text-xs text-slate-600">{place.name}{place.location ? ` — ${place.location}` : ''}</p>
            ))}
          </div>
        </Section>

        {/* Distress Steps */}
        <Section title={t.reviewDistressSection} phase="distress-steps" hasContent={hasDistress}>
          <div className="space-y-1">
            {plan.distressSteps.map(step => step.action && (
              <p key={step.level} className="text-xs text-slate-600"><span className="font-semibold capitalize">{step.level}:</span> {step.action}</p>
            ))}
          </div>
        </Section>

        {/* Professional Help */}
        <Section title={t.reviewProfessionalSection} phase="professional-help" hasContent={hasProfessional}>
          <div className="flex flex-wrap gap-1">
            {plan.professionalHelpCriteria.map(c => (
              <span key={c} className={`px-2 py-0.5 rounded text-xs ${c === 'suicidal-thoughts' || c === 'self-harm' ? 'bg-[#E8685A]/10 text-[#E8685A]' : 'bg-[#1F6F78]/10 text-[#1F6F78]'}`}>
                {t.professionalCriteria[c]}
              </span>
            ))}
          </div>
        </Section>

        {/* Exit Plan */}
        <Section title={t.reviewExitSection} phase="exit-plan" hasContent={hasExit}>
          <div className="space-y-1">
            {plan.exitPlan.stopSignal && <p className="text-xs text-slate-600"><span className="font-semibold">{t.exitStopSignalLabel}:</span> {plan.exitPlan.stopSignal}</p>}
            {plan.exitPlan.firstAction && <p className="text-xs text-slate-600"><span className="font-semibold">{t.exitFirstActionLabel}:</span> {plan.exitPlan.firstAction}</p>}
            {plan.exitPlan.groundingChoice && <p className="text-xs text-slate-600"><span className="font-semibold">{t.exitGroundingLabel}:</span> {plan.exitPlan.groundingChoice}</p>}
            {plan.exitPlan.contactPerson && <p className="text-xs text-slate-600"><span className="font-semibold">{t.exitContactLabel}:</span> {plan.exitPlan.contactPerson}</p>}
            {plan.exitPlan.safeDestination && <p className="text-xs text-slate-600"><span className="font-semibold">{t.exitDestinationLabel}:</span> {plan.exitPlan.safeDestination}</p>}
          </div>
        </Section>

        {/* Bookmark suggestion */}
        <div className="flex items-start gap-2 bg-[#3DD4B0]/5 border border-[#3DD4B0]/15 rounded-xl p-3 mb-6">
          <Bookmark className="w-4 h-4 text-[#3DD4B0] shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 leading-relaxed">{t.reviewBookmarkSuggestion}</p>
        </div>

        {/* Save button */}
        <button
          onClick={onSave}
          className="w-full px-6 py-4 bg-[#1F6F78] text-white font-semibold rounded-2xl hover:bg-[#1a5e66] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#1F6F78]/20 text-lg"
        >
          {t.reviewSaveButton}
        </button>
      </motion.div>
    </div>
  );
}
