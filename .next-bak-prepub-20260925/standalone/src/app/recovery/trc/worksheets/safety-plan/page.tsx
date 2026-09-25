"use client";

import { useReducer, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { safetyPlanReducer, initialState } from '@/lib/trc/safety-plan/reducer';
import { savePlan, loadOrInit } from '@/lib/trc/safety-plan/storage';
import { getText } from '@/lib/trc/safety-plan/translations';
import type { PlanPhase, Locale, SupportPerson, SafePlace, ProfessionalCriterion } from '@/lib/trc/safety-plan/types';
import { RecoveryBreadcrumb, DistressCheckIn } from '@/components/recovery/system';
import { MedicalDisclaimer } from '@/components/recovery/system';
import { SafetyResponse } from '@/components/recovery/system';
import { TherapeuticExit } from '@/components/recovery/system';
import { useTrcState } from '@/hooks/useRecoveryState';
import EnhancedSuggestedNextStep from '@/components/recovery/system/EnhancedSuggestedNextStep';
import { Shield, AlertTriangle, Heart, MapPin, Phone, ArrowRight, ArrowLeft, Plus, X, CheckCircle2, BookOpen } from 'lucide-react';

const phaseOrder: PlanPhase[] = ['intro','warning-signs','stabilize','support-people','safe-places','distress-steps','professional-help','exit-plan','review','completion'];

function phaseIndex(p: PlanPhase) { return phaseOrder.indexOf(p); }

export default function SafetyPlanPage() {
  const { locale: appLocale, direction } = useLocale();
  const tNav = useTranslations('recoveryNav');
  const tTrc = useTranslations('recoveryHub.trc');
  const [state, dispatch] = useReducer(safetyPlanReducer, initialState);
  const [loaded, setLoaded] = useState(false);
  const { markStepStarted, markStepCompleted } = useTrcState();

  // Safety reminder: gentle prompt that they don't need to complete everything now
  const [showSafetyReminder, setShowSafetyReminder] = useState(true);
  const locale: Locale = state.locale;
  const isAr = locale === 'ar';
  const accent = '#1F6F78';
  const lightBg = '#F0F7F7';

  useEffect(() => {
    const saved = loadOrInit();
    dispatch({ type: 'LOAD_PLAN', plan: saved });
    dispatch({ type: 'SET_LOCALE', locale: (appLocale || 'ar') as Locale });
    setLoaded(true);
  }, [appLocale]);

  useEffect(() => {
    if (loaded) savePlan(state.plan);
  }, [state.plan, loaded]);

  // Track journey state on mount
  useEffect(() => {
    markStepStarted('safety-plan');
  }, [markStepStarted]);

  // Track completion when reaching completion phase
  useEffect(() => {
    if (state.phase === 'completion') {
      markStepCompleted('safety-plan');
    }
  }, [state.phase, markStepCompleted]);

  const goNext = () => {
    const idx = phaseIndex(state.phase);
    if (idx < phaseOrder.length - 1) dispatch({ type: 'SET_PHASE', phase: phaseOrder[idx + 1] });
  };
  const goBack = () => {
    const idx = phaseIndex(state.phase);
    if (idx > 0) dispatch({ type: 'SET_PHASE', phase: phaseOrder[idx - 1] });
  };

  const toggleArrayItem = (arr: string[], item: string): string[] =>
    arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

  const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

  // ===== Warning Signs =====
  const physicalOpts = getText('warnings.physicalOptions', locale).split('|');
  const emotionalOpts = getText('warnings.emotionalOptions', locale).split('|');
  const behavioralOpts = getText('warnings.behavioralOptions', locale).split('|');

  const physicalKeys = ['racing-heart','muscle-tension','shallow-breathing','chest-tightness','nausea','trembling','numbness','headache'];
  const emotionalKeys = ['overwhelm','emotional-numbness','irritability','fear','shame','disconnected','anger'];
  const behavioralKeys = ['isolation','avoidance','hypervigilance','cant-focus','sleep-problems'];

  const profCriteria: { key: ProfessionalCriterion; labelKey: string }[] = [
    { key: 'suicidal-thoughts', labelKey: 'professional.suicidal' },
    { key: 'self-harm', labelKey: 'professional.selfHarm' },
    { key: 'panic-attacks', labelKey: 'professional.panic' },
    { key: 'cant-function', labelKey: 'professional.cantFunction' },
    { key: 'dissociation', labelKey: 'professional.dissociation' },
    { key: 'flashbacks', labelKey: 'professional.flashbacks' },
    { key: 'cant-sleep', labelKey: 'professional.cantSleep' },
  ];

  const NavButtons = ({ showSkip = false }: { showSkip?: boolean }) => (
    <div className="flex gap-3 mt-8 justify-center">
      {state.phase !== 'intro' && (
        <button onClick={goBack} className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1F6F78] text-[#1F6F78] hover:bg-[#F0F7F7] transition-colors font-medium">
          {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          {getText('nav.back', locale)}
        </button>
      )}
      {showSkip && (
        <button onClick={goNext} className="px-6 py-3 rounded-xl border border-slate-300 text-slate-500 hover:bg-slate-50 transition-colors text-sm">
          {getText('nav.skip', locale)}
        </button>
      )}
      <button onClick={goNext} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F6F78] text-white hover:bg-[#1a5e66] transition-colors font-medium">
        {getText('nav.next', locale)}
        {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
      </button>
    </div>
  );

  const ChipToggle = ({ items, selected, onToggle }: { items: string[]; selected: string[]; onToggle: (item: string) => void }) => (
    <div className="flex flex-wrap gap-2">
      {items.map((item, i) => (
        <button key={i} onClick={() => onToggle(item)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selected.includes(item) ? 'bg-[#1F6F78] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <RecoveryBreadcrumb items={[
          { label: tNav('title'), href: '/recovery' },
          { label: tNav('trc'), href: '/recovery/trc' },
          { label: getText('intro.title', locale) },
        ]} />
      </div>

      {/* Gentle safety reminder */}
      <DistressCheckIn
        type="reminder"
        visible={showSafetyReminder}
        questionAr="\u062e\u0630 \u0648\u0642\u062a\u0643. \u0644\u0627 \u062a\u062d\u062a\u0627\u062c \u0625\u0643\u0645\u0627\u0644 \u0643\u0644 \u0634\u064a\u0621 \u0627\u0644\u0622\u0646."
        questionEn="Take your time. You don't need to complete everything now."
        onDismiss={() => setShowSafetyReminder(false)}
      />

      <SafetyResponse assetId="trc-safety-plan" program="trc" />
      <TherapeuticExit fallbackHref="/recovery/trc" />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {state.phase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <MedicalDisclaimer />
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: accent }}>
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-[#0F1C2E]">{getText('intro.title', locale)}</h1>
                <p className="text-[#0F1C2E]/70 mt-2">{getText('intro.subtitle', locale)}</p>
              </div>
              <div className="rounded-xl p-6" style={{ backgroundColor: lightBg }}>
                <p className="text-[#0F1C2E] leading-relaxed">{getText('intro.whatIs', locale)}</p>
                <p className="text-[#1F6F78] font-medium mt-3">{getText('intro.yourPlan', locale)}</p>
                <p className="text-[#0F1C2E]/70 mt-2">{getText('intro.saveReminder', locale)}</p>
              </div>
              <div className="text-center">
                <button onClick={() => dispatch({ type: 'CONSENT' })} className="px-8 py-4 rounded-xl bg-[#1F6F78] text-white text-lg font-semibold hover:bg-[#1a5e66] transition-colors">
                  {getText('intro.begin', locale)}
                </button>
              </div>
            </motion.div>
          )}

          {/* WARNING SIGNS */}
          {state.phase === 'warning-signs' && (
            <motion.div key="warnings" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F1C2E]">{getText('warnings.title', locale)}</h2>
              <p className="text-[#0F1C2E]/70">{getText('warnings.description', locale)}</p>

              <div>
                <h3 className="text-sm font-semibold text-[#1F6F78] mb-2">{getText('warnings.physical', locale)}</h3>
                <ChipToggle items={physicalOpts} selected={state.plan.warningSigns.physical} onToggle={item => dispatch({ type: 'UPDATE_WARNING_SIGNS', payload: { physical: toggleArrayItem(state.plan.warningSigns.physical, item) } })} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#1F6F78] mb-2">{getText('warnings.emotional', locale)}</h3>
                <ChipToggle items={emotionalOpts} selected={state.plan.warningSigns.emotional} onToggle={item => dispatch({ type: 'UPDATE_WARNING_SIGNS', payload: { emotional: toggleArrayItem(state.plan.warningSigns.emotional, item) } })} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#1F6F78] mb-2">{getText('warnings.behavioral', locale)}</h3>
                <ChipToggle items={behavioralOpts} selected={state.plan.warningSigns.behavioral} onToggle={item => dispatch({ type: 'UPDATE_WARNING_SIGNS', payload: { behavioral: toggleArrayItem(state.plan.warningSigns.behavioral, item) } })} />
              </div>

              <div>
                <label className="text-sm font-medium text-[#0F1C2E]">{getText('warnings.custom', locale)}</label>
                <textarea value={state.plan.warningSigns.custom} onChange={e => dispatch({ type: 'UPDATE_WARNING_SIGNS', payload: { custom: e.target.value } })} className="w-full mt-1 p-3 rounded-lg border border-slate-200 text-[#0F1C2E] min-h-[80px]" />
              </div>
              <NavButtons showSkip />
            </motion.div>
          )}

          {/* STABILIZE TOOLS */}
          {state.phase === 'stabilize' && (
            <motion.div key="stabilize" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F1C2E]">{getText('stabilize.title', locale)}</h2>
              <p className="text-[#0F1C2E]/70">{getText('stabilize.description', locale)}</p>
              {([
                { key: 'breathing' as const, label: getText('stabilize.a52', locale), route: '/recovery/trc/a52' },
                { key: 'grounding' as const, label: getText('stabilize.grounding', locale), route: '/recovery/trc/grounding' },
                { key: 'safePlace' as const, label: getText('stabilize.safePlace', locale), route: '/recovery/trc/safe-place' },
                { key: 'bodyScan' as const, label: getText('stabilize.bodyScan', locale), route: '/recovery/trc/body-scan' },
              ]).map(tool => (
                <button key={tool.key} onClick={() => dispatch({ type: 'UPDATE_STABILIZE_TOOLS', payload: { [tool.key]: !state.plan.stabilizeTools[tool.key] } })}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${state.plan.stabilizeTools[tool.key] ? 'border-[#1F6F78] bg-[#F0F7F7]' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${state.plan.stabilizeTools[tool.key] ? 'border-[#1F6F78] bg-[#1F6F78]' : 'border-slate-300'}`}>
                    {state.plan.stabilizeTools[tool.key] && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <BookOpen className="w-5 h-5 text-[#1F6F78]" />
                  <span className="text-[#0F1C2E] font-medium">{tool.label}</span>
                </button>
              ))}
              <NavButtons showSkip />
            </motion.div>
          )}

          {/* SUPPORT PEOPLE */}
          {state.phase === 'support-people' && (
            <motion.div key="support" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F1C2E]">{getText('support.title', locale)}</h2>
              <p className="text-[#0F1C2E]/70">{getText('support.description', locale)}</p>
              <p className="text-sm text-[#1F6F78] italic">{getText('support.okIfFew', locale)}</p>

              {state.plan.supportPeople.map(person => (
                <div key={person.id} className="rounded-xl border border-slate-200 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#0F1C2E]">{person.name || (isAr ? 'بدون اسم' : 'Unnamed')}</span>
                    <button onClick={() => dispatch({ type: 'REMOVE_SUPPORT_PERSON', id: person.id })} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                  </div>
                  <p className="text-sm text-[#0F1C2E]/70">{person.relation} — {person.contactMethod}</p>
                </div>
              ))}

              <SupportPersonForm onAdd={(p) => dispatch({ type: 'ADD_SUPPORT_PERSON', person: p })} locale={locale} genId={genId} />
              <NavButtons showSkip />
            </motion.div>
          )}

          {/* SAFE PLACES */}
          {state.phase === 'safe-places' && (
            <motion.div key="places" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F1C2E]">{getText('places.title', locale)}</h2>
              <p className="text-[#0F1C2E]/70">{getText('places.description', locale)}</p>

              {state.plan.safePlaces.map(place => (
                <div key={place.id} className="rounded-xl border border-slate-200 p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#0F1C2E] flex items-center gap-2"><MapPin className="w-4 h-4 text-[#1F6F78]" />{place.name || (isAr ? 'بدون اسم' : 'Unnamed')}</span>
                    <button onClick={() => dispatch({ type: 'REMOVE_SAFE_PLACE', id: place.id })} className="text-red-400 hover:text-red-600"><X className="w-4 h-4" /></button>
                  </div>
                  <p className="text-sm text-[#0F1C2E]/70">{place.location}</p>
                  {place.whySafe && <p className="text-sm text-[#1F6F78]">{place.whySafe}</p>}
                </div>
              ))}

              <SafePlaceForm onAdd={(p) => dispatch({ type: 'ADD_SAFE_PLACE', place: p })} locale={locale} genId={genId} />
              <NavButtons showSkip />
            </motion.div>
          )}

          {/* DISTRESS STEPS */}
          {state.phase === 'distress-steps' && (
            <motion.div key="distress" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F1C2E]">{getText('distress.title', locale)}</h2>
              <p className="text-[#0F1C2E]/70">{getText('distress.description', locale)}</p>
              {state.plan.distressSteps.map((step, idx) => {
                const levelKey = step.level === 'mild' ? 'distress.mild' : step.level === 'moderate' ? 'distress.moderate' : step.level === 'high' ? 'distress.high' : 'distress.crisis';
                const levelColor = step.level === 'mild' ? '#3DD4B0' : step.level === 'moderate' ? '#F59E0B' : step.level === 'high' ? '#E8685A' : '#991B1B';
                return (
                  <div key={idx} className="rounded-xl border p-4" style={{ borderColor: levelColor }}>
                    <h3 className="font-semibold mb-2" style={{ color: levelColor }}>{getText(levelKey, locale)}</h3>
                    <textarea value={isAr ? step.actionAr : step.actionEn}
                      onChange={e => {
                        const newSteps = [...state.plan.distressSteps];
                        newSteps[idx] = { ...step, [isAr ? 'actionAr' : 'actionEn']: e.target.value };
                        dispatch({ type: 'UPDATE_DISTRESS_STEPS', steps: newSteps });
                      }}
                      className="w-full p-3 rounded-lg border border-slate-200 text-[#0F1C2E] min-h-[60px]" />
                  </div>
                );
              })}
              <NavButtons />
            </motion.div>
          )}

          {/* PROFESSIONAL HELP */}
          {state.phase === 'professional-help' && (
            <motion.div key="professional" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F1C2E]">{getText('professional.title', locale)}</h2>
              <p className="text-[#0F1C2E]/70">{getText('professional.description', locale)}</p>
              {profCriteria.map(c => (
                <button key={c.key} onClick={() => dispatch({ type: 'TOGGLE_PROFESSIONAL_CRITERION', criterion: c.key })}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${state.plan.professionalCriteria.includes(c.key) ? 'border-[#E8685A] bg-red-50' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${state.plan.professionalCriteria.includes(c.key) ? 'border-[#E8685A] bg-[#E8685A]' : 'border-slate-300'}`}>
                    {state.plan.professionalCriteria.includes(c.key) && <AlertTriangle className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`text-sm ${state.plan.professionalCriteria.includes(c.key) ? 'text-[#991B1B] font-medium' : 'text-[#0F1C2E]'}`}>{getText(c.labelKey, locale)}</span>
                </button>
              ))}
              <div>
                <label className="text-sm font-medium text-[#0F1C2E]">{getText('professional.custom', locale)}</label>
                <input type="text" value={state.plan.customCriterion} onChange={e => dispatch({ type: 'SET_CUSTOM_CRITERION', text: e.target.value })} className="w-full mt-1 p-3 rounded-lg border border-slate-200 text-[#0F1C2E]" />
              </div>
              <NavButtons showSkip />
            </motion.div>
          )}

          {/* EXIT PLAN */}
          {state.phase === 'exit-plan' && (
            <motion.div key="exit" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F1C2E]">{getText('exit.title', locale)}</h2>
              <p className="text-[#0F1C2E]/70">{getText('exit.description', locale)}</p>
              {(['stopSignal','firstAction','groundingChoice','contactPerson','safeDestination'] as const).map(field => (
                <div key={field}>
                  <label className="text-sm font-medium text-[#0F1C2E]">{getText(`exit.${field === 'stopSignal' ? 'stopSignal' : field === 'firstAction' ? 'firstAction' : field === 'groundingChoice' ? 'grounding' : field === 'contactPerson' ? 'contact' : 'destination'}`, locale)}</label>
                  <input type="text" value={state.plan.exitPlan[field]} onChange={e => dispatch({ type: 'UPDATE_EXIT_PLAN', payload: { [field]: e.target.value } })} className="w-full mt-1 p-3 rounded-lg border border-slate-200 text-[#0F1C2E]" />
                </div>
              ))}
              <NavButtons />
            </motion.div>
          )}

          {/* REVIEW */}
          {state.phase === 'review' && (
            <motion.div key="review" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-[#0F1C2E]">{getText('review.title', locale)}</h2>
              <div className="rounded-xl p-6 space-y-4" style={{ backgroundColor: lightBg, border: `2px solid ${accent}` }}>
                {state.plan.warningSigns.physical.length > 0 && (
                  <div><h3 className="text-sm font-semibold text-[#1F6F78] mb-1">{getText('warnings.title', locale)}</h3>
                  <p className="text-sm text-[#0F1C2E]">{[...state.plan.warningSigns.physical, ...state.plan.warningSigns.emotional, ...state.plan.warningSigns.behavioral].join(' • ')}</p></div>
                )}
                {state.plan.supportPeople.length > 0 && (
                  <div><h3 className="text-sm font-semibold text-[#1F6F78] mb-1">{getText('support.title', locale)}</h3>
                  <p className="text-sm text-[#0F1C2E]">{state.plan.supportPeople.map(p => p.name).join(' • ')}</p></div>
                )}
                {state.plan.safePlaces.length > 0 && (
                  <div><h3 className="text-sm font-semibold text-[#1F6F78] mb-1">{getText('places.title', locale)}</h3>
                  <p className="text-sm text-[#0F1C2E]">{state.plan.safePlaces.map(p => p.name).join(' • ')}</p></div>
                )}
                <div><h3 className="text-sm font-semibold text-[#1F6F78] mb-1">{getText('distress.title', locale)}</h3>
                {state.plan.distressSteps.map((s, i) => (
                  <p key={i} className="text-sm text-[#0F1C2E] mb-1"><strong>{s.level}:</strong> {isAr ? s.actionAr : s.actionEn}</p>
                ))}</div>
              </div>
              <p className="text-sm text-center text-[#1F6F78]">{getText('review.bookmark', locale)}</p>
              <div className="text-center">
                <button onClick={goNext} className="px-8 py-4 rounded-xl bg-[#1F6F78] text-white text-lg font-semibold hover:bg-[#1a5e66] transition-colors">
                  {getText('review.save', locale)}
                </button>
              </div>
            </motion.div>
          )}

          {/* COMPLETION */}
          {state.phase === 'completion' && (
            <motion.div key="completion" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: accent }}>
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0F1C2E]">{getText('completion.title', locale)}</h2>
              <p className="text-[#0F1C2E]/70">{getText('completion.message', locale)}</p>
              <p className="text-sm text-[#1F6F78]">{getText('completion.reminder', locale)}</p>
              <div className="mt-8">
                <EnhancedSuggestedNextStep program="trc" currentStepId="safety-plan" />
              </div>
              {/* Link to Secondary Trauma guide — especially relevant for caregivers/parents */}
              <div className="mt-4">
                <a
                  href="/recovery/trc/secondary-trauma"
                  className="inline-flex items-center gap-2 text-[#1F6F78] hover:text-[#1a5e66] text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.04.255-2.916.714A8.97 8.97 0 003 8.25c0 1.855.637 3.568 1.706 4.923L12 21.75l7.294-8.577A8.97 8.97 0 0021 8.25a8.97 8.97 0 00-3-4.786A8.967 8.967 0 0018 3.75c-1.052 0-2.04.255-2.916.714A8.967 8.967 0 0012 6.042z" />
                  </svg>
                  {isAr ? 'إذا كنت والداً أو مقدم رعاية: تعرف على الصدمة الثانوية' : 'If you are a parent or caregiver: Learn about Secondary Trauma'}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ===== Sub-components =====

function SupportPersonForm({ onAdd, locale, genId }: { onAdd: (p: SupportPerson) => void; locale: Locale; genId: () => string }) {
  const isAr = locale === 'ar';
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [method, setMethod] = useState('');
  const [when, setWhen] = useState('');
  const t = getText;

  return (
    <div className="rounded-xl border-2 border-dashed border-slate-200 p-4 space-y-3">
      <input placeholder={t('support.name', locale)} value={name} onChange={e => setName(e.target.value)} className="w-full p-2 rounded-lg border border-slate-200 text-[#0F1C2E] text-sm" />
      <input placeholder={t('support.relation', locale)} value={relation} onChange={e => setRelation(e.target.value)} className="w-full p-2 rounded-lg border border-slate-200 text-[#0F1C2E] text-sm" />
      <input placeholder={t('support.method', locale)} value={method} onChange={e => setMethod(e.target.value)} className="w-full p-2 rounded-lg border border-slate-200 text-[#0F1C2E] text-sm" />
      <input placeholder={t('support.when', locale)} value={when} onChange={e => setWhen(e.target.value)} className="w-full p-2 rounded-lg border border-slate-200 text-[#0F1C2E] text-sm" />
      <button onClick={() => { if (name || relation) { onAdd({ id: genId(), name, relation, contactMethod: method, whenToContact: when }); setName(''); setRelation(''); setMethod(''); setWhen(''); }}}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1F6F78] text-white text-sm hover:bg-[#1a5e66]">
        <Plus className="w-4 h-4" /> {t('support.add', locale)}
      </button>
    </div>
  );
}

function SafePlaceForm({ onAdd, locale, genId }: { onAdd: (p: SafePlace) => void; locale: Locale; genId: () => string }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [why, setWhy] = useState('');
  const t = getText;

  return (
    <div className="rounded-xl border-2 border-dashed border-slate-200 p-4 space-y-3">
      <input placeholder={t('places.name', locale)} value={name} onChange={e => setName(e.target.value)} className="w-full p-2 rounded-lg border border-slate-200 text-[#0F1C2E] text-sm" />
      <input placeholder={t('places.location', locale)} value={location} onChange={e => setLocation(e.target.value)} className="w-full p-2 rounded-lg border border-slate-200 text-[#0F1C2E] text-sm" />
      <input placeholder={t('places.why', locale)} value={why} onChange={e => setWhy(e.target.value)} className="w-full p-2 rounded-lg border border-slate-200 text-[#0F1C2E] text-sm" />
      <button onClick={() => { if (name) { onAdd({ id: genId(), name, location, whySafe: why }); setName(''); setLocation(''); setWhy(''); }}}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1F6F78] text-white text-sm hover:bg-[#1a5e66]">
        <Plus className="w-4 h-4" /> {t('places.add', locale)}
      </button>
    </div>
  );
}
