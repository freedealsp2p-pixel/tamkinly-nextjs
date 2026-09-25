/* v2 - production closure build */
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Shield, Clock, ListOrdered, Lock, MessageCircle,
  CheckCircle2, X, ExternalLink, ArrowRight, ArrowLeft,
} from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';
import { MedicalDisclaimer } from '@/components/recovery/system';
import type { ProtocolSlug } from '@/lib/protocol-access';
import { PROTOCOL_PRODUCTS } from '@/lib/protocol-access';

/**
 * Anti-choice-paralysis: one guided path across the three paid protocols.
 * Rule 1: single visual recommendation (step 1 = start). 
 * Rule 2: two-stage decision (does this feeling match? -> then buy).
 * Rule 3: buyer-identity framing (forLine per protocol).
 * Rule 4: sharp separation (start / next / advanced+safety stage labels).
 * Rule 5: default CTA (non-start pages nudge to the recommended start;
 *         each page points to the next step after completion).
 */
const PROTOCOL_PATH: Record<
  ProtocolSlug,
  {
    step: number;
    shortLabel: { ar: string; en: string };
    stageLabel: { ar: string; en: string };
    forLine: { ar: string; en: string };
    chip: { ar: string; en: string };
    isStart: boolean;
    nextSlug?: ProtocolSlug;
  }
> = {
  'temporal-decoupling': {
    step: 1,
    shortLabel: { ar: 'التفكيك الزمني', en: 'Temporal Decoupling' },
    stageLabel: { ar: 'البداية الموصى بها', en: 'Recommended start' },
    forLine: {
      ar: 'لمن: ذكرى واحدة محددة لا تزال تنبثق رغم مرور السنون',
      en: 'For: one specific memory that still surfaces years later',
    },
    chip: { ar: 'ذكرى واحدة تعيد تشغيل نفسها', en: 'One memory that keeps replaying' },
    isStart: true,
    nextSlug: 'alternative-code',
  },
  'alternative-code': {
    step: 2,
    shortLabel: { ar: 'الشفرة البديلة', en: 'Alternative Code' },
    stageLabel: { ar: 'الخطوة التالية في المسار', en: 'Next step in the path' },
    forLine: {
      ar: 'لمن: محفّز معيّن — اسم أو مكان أو أغنية — يستدعي الشعور القديم تلقائياً',
      en: 'For: a specific trigger — a name, a place, a song — that summons the old feeling automatically',
    },
    chip: { ar: 'محفّزات تُشعل استجابة قديمة تلقائياً', en: 'Triggers that fire an old response automatically' },
    isStart: false,
    nextSlug: 'white-mirror',
  },
  'white-mirror': {
    step: 3,
    shortLabel: { ar: 'المرآة البيضاء', en: 'White Mirror' },
    stageLabel: { ar: 'للمتمرسين — بوابة أمان', en: 'Advanced — safety gate' },
    forLine: {
      ar: 'لمن: حلقة أفكار سلبية متكررة تريد كسرها بحسم — للمتمرسين فقط (بوابة أمان)',
      en: 'For: a repeating negative thought loop you want to break decisively — advanced users only (safety gate)',
    },
    chip: { ar: 'ناقد داخلي صاخب لا يصمت', en: 'A loud inner critic that never quiets' },
    isStart: false,
  },
};

const PATH_ORDER: ProtocolSlug[] = ['temporal-decoupling', 'alternative-code', 'white-mirror'];

interface ProtocolLandingProps {
  protocolSlug: ProtocolSlug;
  breadcrumbs: { label: string; href?: string }[];
  /** Intro text from the protocol source (bilingual) */
  intro: { ar: string; en: string };
  intro2?: { ar: string; en: string };
  claim: { ar: string; en: string };
  /** What this experience includes */
  includes: { ar: string; en: string }[];
  /** Safety warning (White Mirror only) */
  safety?: {
    badge: { ar: string; en: string };
    title: { ar: string; en: string };
    body: { ar: string; en: string };
    conditions: { ar: string; en: string }[];
    alternative: { ar: string; en: string };
  };
}

/**
 * ProtocolLanding — Premium product info + purchase CTA.
 * Shown to unauthorized users.
 * Shows: what the protocol is, price, purchase method, safety info.
 * Does NOT expose therapeutic content.
 */
export function ProtocolLanding({
  protocolSlug,
  breadcrumbs,
  intro,
  intro2,
  claim,
  includes,
  safety,
}: ProtocolLandingProps) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const config = PROTOCOL_PRODUCTS[protocolSlug];
  const [showPurchase, setShowPurchase] = useState(false);

  const t = useTranslations('therapeuticProtocols');
  const path = PROTOCOL_PATH[protocolSlug];
  const nextProto = path.nextSlug ? PROTOCOL_PRODUCTS[path.nextSlug] : null;

  return (
    <div className="min-h-screen bg-[#F5F9F8]" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-2xl">
        <RecoveryBreadcrumb items={breadcrumbs} />

        {/* Badge */}
        <div className="flex justify-center mt-4 mb-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: `${config.accentColor}12`,
              color: config.accentColor,
            }}
          >
            <Lock className="w-3.5 h-3.5" />
            {isAr ? 'تجربة علاجية مميزة' : 'Premium Therapeutic Experience'}
          </div>
        </div>

        {/* Rule 1 + 4 — Guided path strip: 1 -> 2 -> 3, "you are here".
            Cancels visual parity: one start, one next, one advanced. */}
        <div className="mb-6" aria-label={isAr ? 'مسار البروتوكولات' : 'Protocol path'}>
          <div className="flex items-center justify-between gap-1 rounded-2xl bg-white border border-slate-100 shadow-sm px-3 py-3">
            {PATH_ORDER.map((slug, idx) => {
              const node = PROTOCOL_PATH[slug];
              const isCurrent = slug === protocolSlug;
              const nodeAccent = PROTOCOL_PRODUCTS[slug].accentColor;
              return (
                <div key={slug} className="flex items-center flex-1 min-w-0">
                  <div className="flex flex-col items-center min-w-0">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold flex-shrink-0 ${
                        isCurrent
                          ? 'text-white ring-4 ring-offset-0'
                          : path.step > node.step
                            ? 'text-white/90'
                            : 'text-[#0F1C2E]/40 bg-slate-100'
                      }`}
                      style={
                        isCurrent
                          ? { backgroundColor: nodeAccent, boxShadow: `0 0 0 3px ${nodeAccent}30` }
                          : path.step > node.step
                            ? { backgroundColor: nodeAccent, opacity: 0.45 }
                            : undefined
                      }
                    >
                      {node.step}
                    </div>
                    <span
                      className={`mt-1 text-[10px] leading-tight text-center max-w-[72px] truncate ${
                        isCurrent ? 'font-bold text-[#0F1C2E]' : 'text-[#0F1C2E]/40'
                      }`}
                    >
                      {isAr ? node.shortLabel.ar : node.shortLabel.en}
                    </span>
                    {isCurrent && (
                      <span
                        className="text-[9px] font-semibold mt-0.5"
                        style={{ color: nodeAccent }}
                      >
                        {isAr ? 'أنت هنا' : 'You are here'}
                      </span>
                    )}
                  </div>
                  {idx < PATH_ORDER.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-1 rounded-full mb-0 ${
                        path.step > node.step ? 'opacity-100' : 'opacity-30'
                      }`}
                      style={{ backgroundColor: config.accentColor }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center text-[11px] text-[#0F1C2E]/50 mt-2">
            {isAr
              ? 'المسار الموصى به: التفكيك الزمني ← الشفرة البديلة ← المرآة البيضاء'
              : 'Recommended path: Temporal Decoupling → Alternative Code → White Mirror'}
          </p>
        </div>

        {/* Rule 5 — Default CTA: non-start pages nudge first-timers to the
            recommended start, without blocking this page's own purchase. */}
        {!path.isStart && (
          <div className="rounded-2xl border border-[#1F6F78]/25 bg-[#1F6F78]/5 px-4 py-3 mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <p className="text-xs sm:text-sm text-[#0F1C2E]/70 leading-relaxed flex-1">
              {isAr
                ? 'إن كانت هذه أول تجربة علاجية لك، ننصح بالبدء من التفكيك الزمني — المسار مصمم ليُمارَس بالتدريج.'
                : 'If this is your first therapeutic experience, we recommend starting with Temporal Decoupling — the path is designed to be practiced progressively.'}
            </p>
            <Link
              href="/apps/therapeutic-protocols/temporal-decoupling"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1F6F78] border border-[#1F6F78]/40 bg-white hover:bg-[#1F6F78]/10 transition-colors flex-shrink-0 whitespace-nowrap"
            >
              {isAr ? 'البداية الموصى بها' : 'Recommended start'}
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </Link>
          </div>
        )}

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-3">
            {isAr ? config.title.ar : config.title.en}
          </h1>
          <p className="text-lg text-[#0F1C2E]/60">
            {isAr ? config.subtitle.ar : config.subtitle.en}
          </p>
        </div>

        {/* Product visual */}
        {config.image && (
          <figure className="mb-8">
            <div className="rounded-2xl overflow-hidden border border-slate-200/70 bg-white shadow-md">
              <Image
                src={config.image}
                alt={isAr ? (config.imageAlt?.ar ?? '') : (config.imageAlt?.en ?? '')}
                width={1408}
                height={768}
                priority
                sizes="(min-width: 640px) 640px, 100vw"
                className="w-full h-auto"
              />
            </div>
          </figure>
        )}

        {/* Protocol Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          {/* Meta: steps, duration */}
          <div className="flex justify-center gap-6 text-sm text-[#0F1C2E]/50 mb-5">
            <span className="flex items-center gap-1.5">
              <ListOrdered className="w-4 h-4" />
              {isAr
                ? `${config.stepCount} ${t('landing.stepsLabel')}`
                : `${config.stepCount} ${t('landing.stepsLabel')}`}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {isAr ? config.durationLabel.ar : config.durationLabel.en}
            </span>
          </div>

          {/* Rule 2 + 3 — Two-stage decision, buyer-identity framing.
              Stage 1: "is this my feeling?" — before any purchase decision. */}
          <div
            className="rounded-xl px-4 py-3 mb-5"
            style={{ backgroundColor: `${config.accentColor}0D` }}
          >
            <p className="text-sm font-semibold text-[#0F1C2E] mb-1">
              {isAr ? 'هل هذا شعورك؟' : 'Does this sound like you?'}
            </p>
            <p className="text-sm text-[#0F1C2E]/80 mb-1">
              {isAr ? path.chip.ar : path.chip.en}
            </p>
            <p className="text-xs text-[#0F1C2E]/60 leading-relaxed">
              {isAr ? path.forLine.ar : path.forLine.en}
            </p>
            <Link
              href="/apps/therapeutic-protocols"
              className="inline-flex items-center gap-1 text-xs font-medium mt-2 hover:underline"
              style={{ color: config.accentColor }}
            >
              {isAr ? 'ليس شعورك؟ طابِق شعورك مع التمرين المناسب' : 'Not your feeling? Match it with the right protocol'}
              {isAr ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
            </Link>
          </div>

          {/* Intro */}
          <div className="space-y-3">
            <p className="text-[#0F1C2E]/80 leading-[1.9] text-base">
              {isAr ? intro.ar : intro.en}
            </p>
            {intro2 && (
              <p className="text-[#0F1C2E]/80 leading-[1.9] text-base">
                {isAr ? intro2.ar : intro2.en}
              </p>
            )}
            <p className="text-[#0F1C2E]/70 leading-[1.9] font-medium">
              {isAr ? claim.ar : claim.en}
            </p>
          </div>

          {/* What's included */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-[#0F1C2E] mb-3">
              {t('landing.includes')}
            </h3>
            <ul className="space-y-2">
              {includes.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[#0F1C2E]/70">
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: config.accentColor }}
                  />
                  <span>{isAr ? item.ar : item.en}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Safety Warning (White Mirror) */}
        {safety && (
          <div className="bg-[#E8685A]/5 rounded-2xl p-5 mb-6 border border-[#E8685A]/15">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-[#E8685A]" />
              <span className="text-sm font-semibold text-[#E8685A]">
                {isAr ? safety.badge.ar : safety.badge.en}
              </span>
            </div>
            <p className="text-sm text-[#0F1C2E]/70 mb-3 leading-relaxed">
              {isAr ? safety.body.ar : safety.body.en}
            </p>
            <p className="text-xs font-medium text-[#0F1C2E]/60 mb-2">
              {isAr ? 'لا تمارس هذا التمرين إذا كنت تعاني من:' : 'Do not practice if you experience:'}
            </p>
            <ul className="space-y-1">
              {safety.conditions.map((c, idx) => (
                <li key={idx} className="text-xs text-[#0F1C2E]/60 flex items-start gap-1.5">
                  <X className="w-3 h-3 mt-0.5 text-[#E8685A] flex-shrink-0" />
                  {isAr ? c.ar : c.en}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Price Card */}
        <div className="bg-[#0F1C2E] rounded-2xl p-6 text-white mb-6">
          <div className="text-center mb-5">
            <div className="text-4xl font-bold mb-1">$99</div>
            <div className="text-sm text-white/60">
              {t('landing.oneTime')} · {t('landing.nonRefundable')}
            </div>
          </div>

          <div className="space-y-2 mb-5">
            {[
              t('landing.perk1'),
              t('landing.perk2'),
              t('landing.perk3'),
            ].map((perk, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 className="w-4 h-4 text-[#3DD4B0] flex-shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowPurchase(true)}
            className="w-full px-6 py-3.5 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            style={{ backgroundColor: config.accentColor }}
          >
            {t('landing.purchaseCta')}
          </button>

          <p className="text-center text-xs text-white/40 mt-3">
            {t('landing.paymentMethod')}
          </p>
        </div>

        {/* Rule 5 — Guided journey: the path continues after this protocol */}
        {nextProto && (
          <Link
            href={`/apps/therapeutic-protocols/${nextProto.slug}`}
            className="block rounded-2xl bg-white border border-slate-100 shadow-sm px-4 py-3 mb-6 hover:border-[#3DD4B0]/50 transition-colors"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] text-[#0F1C2E]/50 mb-0.5">
                  {isAr ? 'بعد إتمام هذا التمرين' : 'After completing this protocol'}
                </p>
                <p className="text-sm font-semibold text-[#0F1C2E] truncate">
                  {isAr
                    ? `الخطوة التالية: ${nextProto.title.ar}`
                    : `Next step: ${nextProto.title.en}`}
                </p>
              </div>
              <span
                className="flex items-center gap-1 text-xs font-semibold flex-shrink-0"
                style={{ color: config.accentColor }}
              >
                {isAr ? 'استعرض' : 'View'}
                {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </span>
            </div>
          </Link>
        )}

        {/* Medical Disclaimer */}
        <MedicalDisclaimer />

        {/* Footer note */}
        <p className="text-center text-xs text-[#0F1C2E]/30 mt-6 leading-relaxed">
          {t('landing.footerDisclaimer')}
        </p>
      </div>

      {/* Purchase Modal */}
      {showPurchase && (
        <TributePurchaseModal
          protocolSlug={protocolSlug}
          accentColor={config.accentColor}
          onClose={() => setShowPurchase(false)}
        />
      )}
    </div>
  );
}

/**
 * TributePurchaseModal — Full-screen modal with Tribute via Telegram instructions.
 * Does NOT pretend payment is completed.
 * Explains the manual verification workflow.
 */
function TributePurchaseModal({
  protocolSlug,
  accentColor,
  onClose,
}: {
  protocolSlug: ProtocolSlug;
  accentColor: string;
  onClose: () => void;
}) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const config = PROTOCOL_PRODUCTS[protocolSlug];
  const t = useTranslations('therapeuticProtocols');

  // Accessibility: Escape closes the dialog; focus moves into the dialog on
  // open and is restored to the previously focused element on close.
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      dir={direction}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('purchase.title')}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="bg-white rounded-2xl w-full max-w-md p-6 space-y-5 max-h-[90vh] overflow-y-auto outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label={isAr ? 'إغلاق' : 'Close'}
          >
            <X className="w-5 h-5 text-[#0F1C2E]/60" />
          </button>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#0F1C2E] mb-1">
            {t('purchase.title')}
          </h2>
          <p className="text-sm text-[#0F1C2E]/60">
            {isAr ? config.title.ar : config.title.en}
          </p>
        </div>

        {/* Price confirmation */}
        <div className="bg-[#0F1C2E] rounded-xl p-4 text-center text-white">
          <div className="text-3xl font-bold">$99</div>
          <div className="text-xs text-white/50 mt-1">
            {t('landing.oneTime')} · {t('landing.nonRefundable')}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-[#0F1C2E]">
            {t('purchase.howToTitle')}
          </h3>

          {[
            t('purchase.step1'),
            t('purchase.step2'),
            t('purchase.step3'),
            t('purchase.step4'),
          ].map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: accentColor }}
              >
                {idx + 1}
              </span>
              <p className="text-sm text-[#0F1C2E]/70 leading-relaxed pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Tribute checkout CTA — direct product link when configured */}
        <a
          href={config.tributeTelegramLink || 'https://t.me/tamkinly'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
          style={{ backgroundColor: accentColor }}
        >
          <MessageCircle className="w-5 h-5" />
          {t('purchase.telegramCta')}
          <ExternalLink className="w-4 h-4" />
        </a>

        {config.tributeWebLink && (
          <a
            href={config.tributeWebLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl text-[#0F1C2E]/70 font-medium text-sm hover:bg-slate-100 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            {t('purchase.webCta')}
          </a>
        )}

        {/* Important notes */}
        <div className="bg-[#F5F9F8] rounded-xl p-4 space-y-2">
          <h4 className="text-xs font-semibold text-[#0F1C2E]">
            {t('purchase.notesTitle')}
          </h4>
          <ul className="space-y-1">
            {[
              t('purchase.note1'),
              t('purchase.note2'),
              t('purchase.note3'),
              t('purchase.note4'),
            ].map((note, idx) => {
              const NoteArrow = isAr ? ArrowLeft : ArrowRight;
              return (
                <li key={idx} className="text-xs text-[#0F1C2E]/60 flex items-start gap-1.5">
                  <NoteArrow className="w-3 h-3 mt-0.5 flex-shrink-0 text-[#1F6F78]" />
                  {note}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-3 rounded-xl bg-slate-100 text-[#0F1C2E]/70 font-medium hover:bg-slate-200 transition-colors text-sm"
        >
          {isAr ? 'العودة لصفحة البروتوكول' : 'Back to protocol page'}
        </button>
      </div>
    </div>
  );
}

export default ProtocolLanding;
