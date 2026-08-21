// Recovery Hub — Journey Center
// Enhanced entry point: User immediately understands "Which Recovery Path applies to me?"
// Shows current position, available tools, and guidance for undecided users

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  Shield, Heart, ArrowLeft, Eye, Gauge, Sprout, BookOpen, Sparkles,
  Compass, Clock, CheckCircle2, Circle, ArrowRight, HelpCircle,
  MapPin, Wrench, ExternalLink, Lock
} from 'lucide-react';
import { RECOVERY_JOURNEYS, PORN_RECOVERY_STAGES, TRC_STAGES, PORN_RECOVERY_STEPS, TRC_STEPS } from '@/lib/recovery-journey';
import { getPornRecoverySummary, getTrcSummary, RecoveryProgramSummary, getPornRecoveryState, getTrcState } from '@/lib/recovery-state';
import MedicalDisclaimer from '@/components/recovery/MedicalDisclaimer';
import RecoveryDonation from '@/components/recovery/RecoveryDonation';
import RecoveryEligibilityNotice from '@/components/recovery/RecoveryEligibilityNotice';

// Helper: find step label by ID
function getPrStepLabel(stepId: string | null, isAr: boolean): string {
  if (!stepId) return '';
  const step = PORN_RECOVERY_STEPS.find(s => s.id === stepId);
  return step ? (isAr ? step.labelAr : step.labelEn) : stepId;
}

function getTrcStepLabel(stepId: string | null, isAr: boolean): string {
  if (!stepId) return '';
  const step = TRC_STEPS.find(s => s.id === stepId);
  return step ? (isAr ? step.labelAr : step.labelEn) : stepId;
}

function getPrStageLabel(stageId: string | null, isAr: boolean): string {
  if (!stageId) return '';
  const stage = PORN_RECOVERY_STAGES.find(s => s.id === stageId);
  return stage ? (isAr ? stage.labelAr : stage.labelEn) : stageId;
}

function getTrcStageLabel(stageId: string | null, isAr: boolean): string {
  if (!stageId) return '';
  const stage = TRC_STAGES.find(s => s.id === stageId);
  return stage ? (isAr ? stage.labelAr : stage.labelEn) : stageId;
}

function getPrStepIndex(stepId: string | null): number {
  if (!stepId) return 0;
  const idx = PORN_RECOVERY_STEPS.findIndex(s => s.id === stepId);
  return idx >= 0 ? idx + 1 : 0;
}

function getTrcStepIndex(stepId: string | null): number {
  if (!stepId) return 0;
  const available = TRC_STEPS.filter(s => s.isAvailable);
  const idx = available.findIndex(s => s.id === stepId);
  return idx >= 0 ? idx + 1 : 0;
}

export default function RecoveryHubPage() {
  const { direction, locale } = useLocale();
  const router = useRouter();
  const isAr = locale === 'ar';
  const [prSummary, setPrSummary] = useState<RecoveryProgramSummary | null>(null);
  const [trcSummary, setTrcSummary] = useState<RecoveryProgramSummary | null>(null);
  const [prCurrentStageId, setPrCurrentStageId] = useState<string | null>(null);
  const [trcCurrentStageId, setTrcCurrentStageId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('tamkinly_recovery_discovered', 'true');
      setPrSummary(getPornRecoverySummary());
      setTrcSummary(getTrcSummary());
      const prState = getPornRecoveryState();
      if (prState) setPrCurrentStageId(prState.currentStageId);
      const trcState = getTrcState();
      if (trcState) setTrcCurrentStageId(trcState.currentStageId);
    } catch {}
  }, []);

  const prJourney = RECOVERY_JOURNEYS['porn-recovery'];
  const trcJourney = RECOVERY_JOURNEYS['trc'];

  const hasPrProgress = prSummary?.isStarted && prSummary.completionState === 'in-progress';
  const hasTrcProgress = trcSummary?.isStarted && trcSummary.completionState === 'in-progress';
  const anyProgress = hasPrProgress || hasTrcProgress;

  // TRC available tools for quick access
  const trcAvailableTools = TRC_STEPS.filter(s => s.isAvailable);
  // PR all steps for quick access
  const prAllSteps = PORN_RECOVERY_STEPS;

  // Check which steps are completed
  const isPrStepCompleted = (stepId: string): boolean => {
    try {
      return localStorage.getItem(`tamkinly_pr_${stepId}_done`) === 'true' ||
             (prSummary?.isStarted && getPornRecoveryState()?.completedSteps?.includes(stepId));
    } catch { return false; }
  };

  const isTrcStepCompleted = (stepId: string): boolean => {
    try {
      return localStorage.getItem(`tamkinly_trc_${stepId}_done`) === 'true' ||
             (trcSummary?.isStarted && getTrcState()?.completedSteps?.includes(stepId));
    } catch { return false; }
  };

  return (
    <main className="min-h-screen" dir={direction}>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative py-16 px-4" style={{ background: 'linear-gradient(135deg, #0F1C2E 0%, #1a2d42 50%, #0F1C2E 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 mb-6">
            <Compass className="w-4 h-4 text-teal-300" />
            <span className="text-teal-300 text-sm font-medium">
              {isAr ? 'مركز الرحلة' : 'Journey Center'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isAr ? 'من أين أبدأ؟' : 'Where do I start?'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-3">
            {isAr
              ? 'التعافي ليس مساراً واحداً. حدد المسار الذي يناسب حالتك، وابدأ الخطوة الأولى.'
              : 'Recovery isn\'t one path. Identify the path that fits your situation, and take the first step.'}
          </p>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            {isAr
              ? 'كل المسارات مجانية. لا اشتراك ولا دفع. التعافي حق للجميع.'
              : 'All paths are free. No subscription, no payment. Recovery is a right for everyone.'}
          </p>
        </div>
      </section>

      <MedicalDisclaimer />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: YOUR CURRENT POSITION (returning user)
          ═══════════════════════════════════════════════════════════ */}
      {anyProgress && (
        <section className="py-10 px-4" style={{ backgroundColor: '#F0F7F7' }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-5 h-5" style={{ color: '#1F6F78' }} />
              <h2 className="text-lg font-bold" style={{ color: '#0F1C2E' }}>
                {isAr ? 'موقعك في رحلة التعافي' : 'Your Position in Recovery'}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* PR Progress */}
              {hasPrProgress && (
                <div className="rounded-xl p-5 border" style={{ borderColor: '#3DD4B0', backgroundColor: '#fff' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4" style={{ color: '#3DD4B0' }} />
                    <span className="font-semibold text-sm" style={{ color: '#0F1C2E' }}>
                      {isAr ? 'التعافي من الأنماط القهرية' : 'Porn Recovery'}
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: '#374151' }}>
                    {isAr
                      ? `الخطوة ${getPrStepIndex(prSummary?.currentStep)} من 8`
                      : `Step ${getPrStepIndex(prSummary?.currentStep)} of 8`}
                    {' — '}
                    {getPrStepLabel(prSummary?.currentStep ?? null, isAr)}
                  </p>
                  <p className="text-xs mb-3" style={{ color: '#6B7280' }}>
                    {isAr ? 'المرحلة:' : 'Stage:'} {getPrStageLabel(prCurrentStageId, isAr)}
                  </p>
                  {prSummary?.nextRecommendedStep && (
                    <p className="text-xs mb-3" style={{ color: '#1F6F78' }}>
                      {isAr ? 'التالية المقترحة:' : 'Recommended next:'} {getPrStepLabel(prSummary.nextRecommendedStep, isAr)}
                    </p>
                  )}
                  <button
                    onClick={() => router.push('/recovery/porn-recovery')}
                    className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#3DD4B0' }}
                  >
                    {isAr ? 'واصل رحلتك' : 'Continue your journey'} →
                  </button>
                </div>
              )}

              {/* TRC Progress */}
              {hasTrcProgress && (
                <div className="rounded-xl p-5 border" style={{ borderColor: '#1F6F78', backgroundColor: '#fff' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4" style={{ color: '#1F6F78' }} />
                    <span className="font-semibold text-sm" style={{ color: '#0F1C2E' }}>
                      {isAr ? 'التعافي من الصدمات' : 'Trauma Recovery'}
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: '#374151' }}>
                    {isAr
                      ? `الخطوة ${getTrcStepIndex(trcSummary?.currentStep)} من ${trcAvailableTools.length}`
                      : `Step ${getTrcStepIndex(trcSummary?.currentStep)} of ${trcAvailableTools.length}`}
                    {' — '}
                    {getTrcStepLabel(trcSummary?.currentStep ?? null, isAr)}
                  </p>
                  <p className="text-xs mb-3" style={{ color: '#6B7280' }}>
                    {isAr ? 'المرحلة:' : 'Stage:'} {getTrcStageLabel(trcCurrentStageId, isAr)}
                  </p>
                  {trcSummary?.nextRecommendedStep && (
                    <p className="text-xs mb-3" style={{ color: '#1F6F78' }}>
                      {isAr ? 'التالية المقترحة:' : 'Recommended next:'} {getTrcStepLabel(trcSummary.nextRecommendedStep, isAr)}
                    </p>
                  )}
                  <button
                    onClick={() => router.push('/recovery/trc')}
                    className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition-all hover:opacity-90"
                    style={{ backgroundColor: '#1F6F78' }}
                  >
                    {isAr ? 'واصل رحلتك' : 'Continue your journey'} →
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: TWO RECOVERY PATHS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-2 text-center" style={{ color: '#0F1C2E' }}>
            {isAr ? 'مساران مستقلان' : 'Two Independent Paths'}
          </h2>
          <p className="text-sm text-center mb-8" style={{ color: '#6B7280' }}>
            {isAr ? 'كل مسار له منهجيته وأدواته وبروتوكولاته الخاصة' : 'Each path has its own methodology, tools, and protocols'}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* ─── Porn Recovery Path ─── */}
            <div
              className="rounded-2xl p-6 border cursor-pointer transition-all hover:shadow-lg group"
              style={{ borderColor: '#3DD4B0', backgroundColor: '#fff' }}
              onClick={() => router.push('/recovery/porn-recovery')}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#F0FDF9' }}>
                  <Heart className="w-6 h-6" style={{ color: '#3DD4B0' }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#0F1C2E' }}>
                    {isAr ? prJourney.labelAr : prJourney.labelEn}
                  </h3>
                  {prSummary?.isStarted && (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-1" style={{ backgroundColor: '#F0FDF9', color: '#1F6F78' }}>
                      {isAr
                        ? `الخطوة ${getPrStepIndex(prSummary?.currentStep)} من 8 في مرحلة ${getPrStageLabel(prCurrentStageId, isAr)}`
                        : `Step ${getPrStepIndex(prSummary?.currentStep)} of 8 in ${getPrStageLabel(prCurrentStageId, isAr)}`}
                    </span>
                  )}
                </div>
              </div>

              {/* For whom? */}
              <div className="mb-3">
                <span className="text-xs font-medium" style={{ color: '#1F6F78' }}>
                  {isAr ? 'لمن هذا المسار؟' : 'Who is this for?'}
                </span>
                <p className="text-sm mt-1" style={{ color: '#374151' }}>
                  {isAr
                    ? 'من يعاني من الاستخدام القهري للإباحية والأنماط المرتبطة به'
                    : 'Those struggling with compulsive porn use and related patterns'}
                </p>
              </div>

              {/* Structure */}
              <div className="mb-3">
                <span className="text-xs font-medium" style={{ color: '#1F6F78' }}>
                  {isAr ? 'البنية:' : 'Structure:'}
                </span>
                <p className="text-sm mt-1" style={{ color: '#374151' }}>
                  {isAr ? '5 مراحل × 8 خطوات تفاعلية' : '5 stages × 8 interactive steps'}
                </p>
              </div>

              {/* Why start here? */}
              <div className="mb-3">
                <span className="text-xs font-medium" style={{ color: '#1F6F78' }}>
                  {isAr ? 'لماذا أبدأ هنا؟' : 'Why start here?'}
                </span>
                <p className="text-sm mt-1" style={{ color: '#374151' }}>
                  {isAr ? prJourney.whyStartHereAr : prJourney.whyStartHereEn}
                </p>
              </div>

              {/* Journey stages preview */}
              <div className="mb-4">
                <span className="text-xs font-medium" style={{ color: '#1F6F78' }}>
                  {isAr ? 'مراحل الرحلة:' : 'Journey stages:'}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {PORN_RECOVERY_STAGES.map((stage, i) => (
                    <span key={stage.id} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#F0FDF9', color: '#1F6F78' }}>
                      {i + 1}. {isAr ? stage.labelAr : stage.labelEn}
                    </span>
                  ))}
                </div>
              </div>

              {/* What you find */}
              <p className="text-xs mb-4" style={{ color: '#6B7280' }}>
                {isAr ? prJourney.whatYouFindAr : prJourney.whatYouFindEn}
              </p>

              {/* CTA */}
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                <span className="text-sm font-medium" style={{ color: '#3DD4B0' }}>
                  {prSummary?.isStarted
                    ? (isAr ? 'متابعة الرحلة' : 'Continue Journey')
                    : (isAr ? 'ابدأ الرحلة' : 'Start Journey')}
                </span>
                <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${isAr ? 'rotate-0' : 'rotate-180'}`} style={{ color: '#3DD4B0' }} />
              </div>
            </div>

            {/* ─── TRC Path ─── */}
            <div
              className="rounded-2xl p-6 border cursor-pointer transition-all hover:shadow-lg group"
              style={{ borderColor: '#1F6F78', backgroundColor: '#fff' }}
              onClick={() => router.push('/recovery/trc')}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#F0F7F7' }}>
                  <Shield className="w-6 h-6" style={{ color: '#1F6F78' }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#0F1C2E' }}>
                    {isAr ? trcJourney.labelAr : trcJourney.labelEn}
                  </h3>
                  {trcSummary?.isStarted && (
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-1" style={{ backgroundColor: '#F0F7F7', color: '#1F6F78' }}>
                      {isAr
                        ? `الخطوة ${getTrcStepIndex(trcSummary?.currentStep)} من ${trcAvailableTools.length} في مرحلة ${getTrcStageLabel(trcCurrentStageId, isAr)}`
                        : `Step ${getTrcStepIndex(trcSummary?.currentStep)} of ${trcAvailableTools.length} in ${getTrcStageLabel(trcCurrentStageId, isAr)}`}
                    </span>
                  )}
                </div>
              </div>

              {/* For whom? */}
              <div className="mb-3">
                <span className="text-xs font-medium" style={{ color: '#1F6F78' }}>
                  {isAr ? 'لمن هذا المسار؟' : 'Who is this for?'}
                </span>
                <p className="text-sm mt-1" style={{ color: '#374151' }}>
                  {isAr
                    ? 'لمن مرّ بتجربة تحرش/اعتداء أو آثار صدمية مرتبطة بها'
                    : 'Those who have experienced harassment/assault or related trauma effects'}
                </p>
              </div>

              {/* Structure */}
              <div className="mb-3">
                <span className="text-xs font-medium" style={{ color: '#1F6F78' }}>
                  {isAr ? 'البنية:' : 'Structure:'}
                </span>
                <p className="text-sm mt-1" style={{ color: '#374151' }}>
                  {isAr ? '3 مراحل × 12 خطوة سريرية' : '3 stages × 12 clinical steps'}
                </p>
              </div>

              {/* Why start here? */}
              <div className="mb-3">
                <span className="text-xs font-medium" style={{ color: '#1F6F78' }}>
                  {isAr ? 'لماذا أبدأ هنا؟' : 'Why start here?'}
                </span>
                <p className="text-sm mt-1" style={{ color: '#374151' }}>
                  {isAr ? trcJourney.whyStartHereAr : trcJourney.whyStartHereEn}
                </p>
              </div>

              {/* Journey stages preview */}
              <div className="mb-4">
                <span className="text-xs font-medium" style={{ color: '#1F6F78' }}>
                  {isAr ? 'مراحل الرحلة:' : 'Journey stages:'}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {TRC_STAGES.map((stage, i) => (
                    <span key={stage.id} className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#F0F7F7', color: '#1F6F78' }}>
                      {i + 1}. {isAr ? stage.labelAr : stage.labelEn}
                    </span>
                  ))}
                </div>
              </div>

              {/* What you find */}
              <p className="text-xs mb-4" style={{ color: '#6B7280' }}>
                {isAr ? trcJourney.whatYouFindAr : trcJourney.whatYouFindEn}
              </p>

              {/* Clinical note */}
              <div className="mb-4 text-xs rounded-lg p-2" style={{ backgroundColor: '#FFF8F0', color: '#92400E' }}>
                {isAr
                  ? '⚠️ هذا المسار يتضمن بروتوكولات أمان إلزامية ومراحل سريرية. لا تتخطى مرحلة الأمان.'
                  : '⚠️ This path includes mandatory safety protocols and clinical stages. Do not skip the Safety stage.'}
              </div>

              {/* CTA */}
              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: '#E5E7EB' }}>
                <span className="text-sm font-medium" style={{ color: '#1F6F78' }}>
                  {trcSummary?.isStarted
                    ? (isAr ? 'متابعة الرحلة' : 'Continue Journey')
                    : (isAr ? 'ابدأ الرحلة' : 'Start Journey')}
                </span>
                <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${isAr ? 'rotate-0' : 'rotate-180'}`} style={{ color: '#1F6F78' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: "DON'T KNOW WHERE TO START?"
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4" style={{ backgroundColor: '#F6F8FA' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5" style={{ color: '#1F6F78' }} />
            <h2 className="text-xl font-bold" style={{ color: '#0F1C2E' }}>
              {isAr ? 'لا تعرف من أين تبدأ؟' : 'Not sure where to start?'}
            </h2>
          </div>
          <p className="text-sm mb-6" style={{ color: '#374151' }}>
            {isAr
              ? 'هذا طبيعي تماماً. التعافي ليس خطاً مستقيماً. إليك بعض التوجيهات:'
              : 'That\'s completely normal. Recovery isn\'t a straight line. Here\'s some guidance:'}
          </p>

          {/* Guidance cards */}
          <div className="space-y-3 mb-8">
            <div className="rounded-lg p-4 flex items-start gap-3" style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }}>
              <Heart className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#3DD4B0' }} />
              <div>
                <span className="text-sm font-medium" style={{ color: '#0F1C2E' }}>
                  {isAr ? 'إذا كنت تعاني من الاستخدام القهري للإباحية' : 'If you struggle with compulsive porn use'}
                </span>
                <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  {isAr ? '→ ابدأ بمسار التعافي من الأنماط القهرية' : '→ Start with Porn Recovery'}
                </p>
              </div>
            </div>

            <div className="rounded-lg p-4 flex items-start gap-3" style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }}>
              <Shield className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#1F6F78' }} />
              <div>
                <span className="text-sm font-medium" style={{ color: '#0F1C2E' }}>
                  {isAr ? 'إذا مررت بتجربة تحرش/اعتداء أو تعاني من أعراض صدمية' : 'If you have experienced harassment/assault or trauma symptoms'}
                </span>
                <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  {isAr ? '→ ابدأ بمسار التعافي من الصدمات (TRC)' : '→ Start with Trauma Recovery (TRC)'}
                </p>
              </div>
            </div>

            <div className="rounded-lg p-4 flex items-start gap-3" style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }}>
              <Compass className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#1F6F78' }} />
              <div>
                <span className="text-sm font-medium" style={{ color: '#0F1C2E' }}>
                  {isAr ? 'إذا كان لديك كلاهما' : 'If both apply to you'}
                </span>
                <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  {isAr
                    ? '→ ابدأ بالمسار الذي يسبب لك أكبر ضيق الآن. لا تحاول علاجهما معاً.'
                    : '→ Start with the one causing most distress right now. Don\'t try to address both at once.'}
                </p>
              </div>
            </div>

            <div className="rounded-lg p-4 flex items-start gap-3" style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }}>
              <BookOpen className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#6B7280' }} />
              <div>
                <span className="text-sm font-medium" style={{ color: '#0F1C2E' }}>
                  {isAr ? 'إذا لم تكن متأكداً' : 'If you\'re unsure'}
                </span>
                <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                  {isAr
                    ? '→ ابدأ بقراءة "ماذا تفعل الصدمة بالجسد" (TRC) أو "فهم نمطك" (التعافي من الأنماط القهرية). القراءة خطوة آمنة.'
                    : '→ Start with reading "What Trauma Does to the Body" (TRC) or "Understanding Your Pattern" (PR). Reading is a safe first step.'}
                </p>
              </div>
            </div>
          </div>

          {/* Eligibility Notice Component */}
          <RecoveryEligibilityNotice context="recovery-hub" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: AVAILABLE TOOLS QUICK ACCESS
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="w-5 h-5" style={{ color: '#1F6F78' }} />
            <h2 className="text-xl font-bold" style={{ color: '#0F1C2E' }}>
              {isAr ? 'أدوات متاحة الآن' : 'Available Now'}
            </h2>
          </div>
          <p className="text-sm mb-8" style={{ color: '#6B7280' }}>
            {isAr
              ? 'هذه الأدوات يمكنك استخدامها مباشرة. لا تحتاج إكمال خطوات سابقة.'
              : 'These tools are ready to use right now. No prior steps required.'}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* TRC Tools */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4" style={{ color: '#1F6F78' }} />
                <h3 className="font-semibold text-sm" style={{ color: '#0F1C2E' }}>
                  {isAr ? 'أدوات التعافي من الصدمات' : 'Trauma Recovery Tools'}
                </h3>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {trcAvailableTools.map((step) => {
                  const completed = isTrcStepCompleted(step.id);
                  const stageLabel = isAr
                    ? (TRC_STAGES.find(s => s.id === step.stage)?.labelAr ?? '')
                    : (TRC_STAGES.find(s => s.id === step.stage)?.labelEn ?? '');
                  return (
                    <button
                      key={step.id}
                      onClick={() => router.push(step.route)}
                      className="w-full text-left rounded-lg p-3 flex items-start gap-3 transition-all hover:shadow-sm group"
                      style={{ backgroundColor: completed ? '#F0F7F7' : '#fff', border: `1px solid ${completed ? '#1F6F78' : '#E5E7EB'}` }}
                    >
                      {completed ? (
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#1F6F78' }} />
                      ) : (
                        <Circle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#D1D5DB' }} />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium block" style={{ color: '#0F1C2E' }}>
                          {isAr ? step.labelAr : step.labelEn}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs" style={{ color: '#6B7280' }}>{stageLabel}</span>
                          <span className="text-xs" style={{ color: '#9CA3AF' }}>•</span>
                          <span className="text-xs" style={{ color: '#6B7280' }}>{step.estimatedMinutes} {isAr ? 'د' : 'min'}</span>
                          {completed && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#F0F7F7', color: '#1F6F78' }}>
                              {isAr ? 'مكتمل' : 'done'}
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#1F6F78' }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PR Tools */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-4 h-4" style={{ color: '#3DD4B0' }} />
                <h3 className="font-semibold text-sm" style={{ color: '#0F1C2E' }}>
                  {isAr ? 'خطوات التعافي من الأنماط القهرية' : 'Porn Recovery Steps'}
                </h3>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {prAllSteps.map((step) => {
                  const completed = isPrStepCompleted(step.id);
                  const stageLabel = isAr
                    ? (PORN_RECOVERY_STAGES.find(s => s.id === step.stage)?.labelAr ?? '')
                    : (PORN_RECOVERY_STAGES.find(s => s.id === step.stage)?.labelEn ?? '');
                  return (
                    <button
                      key={step.id}
                      onClick={() => router.push(`${step.route}#${step.anchorId}`)}
                      className="w-full text-left rounded-lg p-3 flex items-start gap-3 transition-all hover:shadow-sm group"
                      style={{ backgroundColor: completed ? '#F0FDF9' : '#fff', border: `1px solid ${completed ? '#3DD4B0' : '#E5E7EB'}` }}
                    >
                      {completed ? (
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#3DD4B0' }} />
                      ) : (
                        <Circle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#D1D5DB' }} />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium block" style={{ color: '#0F1C2E' }}>
                          {isAr ? step.labelAr : step.labelEn}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs" style={{ color: '#6B7280' }}>{stageLabel}</span>
                          <span className="text-xs" style={{ color: '#9CA3AF' }}>•</span>
                          <span className="text-xs" style={{ color: '#6B7280' }}>{step.estimatedMinutes} {isAr ? 'د' : 'min'}</span>
                          {completed && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#F0FDF9', color: '#1F6F78' }}>
                              {isAr ? 'مكتمل' : 'done'}
                            </span>
                          )}
                          {step.isInteractive && !completed && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#F0FDF9', color: '#3DD4B0' }}>
                              {isAr ? 'تفاعلي' : 'interactive'}
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#3DD4B0' }} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: RECOVERY → IDENTITY RELATIONSHIP
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 px-4" style={{ backgroundColor: '#F6F8FA' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold mb-3" style={{ color: '#0F1C2E' }}>
              {isAr ? 'التعافي أساس الرحلة، ليس نهايتها' : 'Recovery is the foundation, not the destination'}
            </h2>
            <p className="text-base italic mb-4" style={{ color: '#1F6F78' }}>
              {isAr
                ? 'التعافي ليس نهاية رحلتك، لكنه الأساس'
                : 'Recovery is not the end of your journey, but the foundation'}
            </p>
            <p className="text-sm mb-6" style={{ color: '#374151' }}>
              {isAr
                ? 'بعد إكمال مسار التعافي، تنتقل طبيعياً إلى برنامج إعادة برمجة الهوية — حيث تبني أهدافك وعاداتك وهويتك الجديدة. التعافي يمهد الطريق، لكن البناء يبدأ بعده.'
                : 'After completing a Recovery path, you naturally transition to the Identity Transformation program — where you build your goals, habits, and new identity. Recovery paves the way, but the building starts after.'}
            </p>
          </div>

          {/* Visual flow */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-6 flex-wrap">
            <div className="px-4 py-2 rounded-lg flex items-center gap-2" style={{ backgroundColor: '#F0F7F7', border: '1px solid #1F6F78' }}>
              <Shield className="w-4 h-4" style={{ color: '#1F6F78' }} />
              <span className="text-sm font-medium" style={{ color: '#1F6F78' }}>
                {isAr ? 'التعافي' : 'Recovery'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-6 h-0.5" style={{ backgroundColor: '#9CA3AF' }} />
              <ArrowRight className="w-4 h-4" style={{ color: '#9CA3AF' }} />
            </div>
            <div className="px-4 py-2 rounded-lg flex items-center gap-2" style={{ backgroundColor: '#F0FDF9', border: '1px solid #3DD4B0' }}>
              <Sprout className="w-4 h-4" style={{ color: '#3DD4B0' }} />
              <span className="text-sm font-medium" style={{ color: '#3DD4B0' }}>
                {isAr ? 'إعادة برمجة الهوية' : 'Identity Transformation'}
              </span>
            </div>
          </div>

          {/* Important note: NOT automatic */}
          <div className="rounded-lg p-4 text-center" style={{ backgroundColor: '#fff', border: '1px solid #E5E7EB' }}>
            <p className="text-xs" style={{ color: '#6B7280' }}>
              {isAr
                ? ' الانتقال إلى برنامج الهوية ليس تلقائياً. بعد إكمال التعافي، ستقرر أنت متى تكون جاهزاً للخطوة التالية.'
                : 'Transitioning to the Identity program is NOT automatic. After completing Recovery, you decide when you\'re ready for the next step.'}
            </p>
            <button
              onClick={() => router.push('/quiz')}
              className="mt-3 px-6 py-2 rounded-lg text-white text-sm font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#3DD4B0' }}
            >
              {isAr ? 'استكشف برنامج الهوية' : 'Explore Identity Program'} →
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: DONATION
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <RecoveryDonation context="recovery-hub" />
        </div>
      </section>
    </main>
  );
}
