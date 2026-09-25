'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, Shield, ArrowRight, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';

const PROTOCOLS = [
  {
    id: 'temporal-decoupling',
    color: '#1F6F78',
    free: false,
    stepCount: 7,
    durationLabel: { ar: '\u0661\u0662 \u062f\u0642\u064a\u0642\u0629', en: '12 minutes' },
    titleKey: 'title',
    subtitleKey: 'subtitle',
    descriptionKey: 'description',
    href: '/apps/therapeutic-protocols/temporal-decoupling',
    requiresSafety: false,
    image: '/uploads/protocols/temporal-decoupling-protocol.webp',
    imageAlt: {
      ar: 'بروتوكول التفكيك الزمني: تجربة موجّهة من 7 خطوات في نحو 12 دقيقة',
      en: 'The Temporal Decoupling Protocol: a 7-step guided experience, about 12 minutes',
    },
    recommended: true,
    forLine: {
      ar: 'لمن: ذكرى واحدة محددة لا تزال تنبثق رغم مرور السنون',
      en: 'For: one specific memory that still surfaces years later',
    },
    chip: {
      ar: 'ذكرى واحدة تعيد تشغيل نفسها',
      en: 'One memory that keeps replaying',
    },
  },
  {
    id: 'alternative-code',
    color: '#2A8A94',
    free: false,
    stepCount: 5,
    durationLabel: { ar: '\u0661\u0665 \u062f\u0642\u064a\u0642\u0629', en: '15 minutes' },
    titleKey: 'title',
    subtitleKey: 'subtitle',
    descriptionKey: 'description',
    href: '/apps/therapeutic-protocols/alternative-code',
    requiresSafety: false,
    image: '/uploads/protocols/alternative-code-protocol.webp',
    imageAlt: {
      ar: 'بروتوكول الشفرة البديلة: تجربة تفاعلية من 5 خطوات في نحو 15 دقيقة',
      en: 'The Alternative Code Protocol: an interactive 5-step experience, about 15 minutes',
    },
    recommended: false,
    forLine: {
      ar: 'لمن: محفّز معيّن — اسم أو مكان أو أغنية — يستدعي الشعور القديم تلقائياً',
      en: 'For: a specific trigger — a name, a place, a song — that summons the old feeling automatically',
    },
    chip: {
      ar: 'محفّزات تُشعل استجابة قديمة تلقائياً',
      en: 'Triggers that fire an old response automatically',
    },
  },
  {
    id: 'white-mirror',
    color: '#0F1C2E',
    free: false,
    stepCount: 4,
    durationLabel: { ar: '\u0669 \u062f\u0642\u0627\u0626\u0642', en: '9 minutes' },
    titleKey: 'title',
    subtitleKey: 'subtitle',
    descriptionKey: 'description',
    href: '/apps/therapeutic-protocols/white-mirror',
    requiresSafety: true,
    image: '/uploads/protocols/white-mirror-protocol.webp',
    imageAlt: {
      ar: 'بروتوكول المرآة البيضاء: تجربة من 4 خطوات في نحو 9 دقائق مع بوابة أمان',
      en: 'The White Mirror Protocol: a 4-step experience, about 9 minutes, with a safety gate',
    },
    recommended: false,
    forLine: {
      ar: 'لمن: حلقة أفكار سلبية متكررة تريد كسرها بحسم — للمتمرسين فقط (بوابة أمان)',
      en: 'For: a repeating negative thought loop you want to break decisively — advanced users only (safety gate)',
    },
    chip: {
      ar: 'ناقد داخلي صاخب لا يصمت',
      en: 'A loud inner critic that never quiets',
    },
  },
  {
    id: 'truncated-sentence',
    color: '#3DD4B0',
    stepCount: 5,
    durationLabel: { ar: '\u0661\u0665 \u062f\u0642\u064a\u0642\u0629 + \u0669 \u0623\u064a\u0627\u0645', en: '15 min + 9 days' },
    titleKey: 'title',
    subtitleKey: 'subtitle',
    descriptionKey: 'description',
    href: '/apps/therapeutic-protocols/truncated-sentence',
    requiresSafety: false,
    image: '/uploads/protocols/truncated-sentence-protocol.webp',
    imageAlt: {
      ar: 'تقنية الجملة المبتورة: تمرين تفاعلي مجاني من 5 شاشات مع مؤقت ثلاث ليالٍ ومفكرة تحول من 9 أيام',
      en: 'The Truncated Sentence Technique: a free 5-screen interactive exercise with a three-night timer and a 9-day transformation journal',
    },
    recommended: false,
    free: true,
    forLine: {
      ar: 'لمن: جملة سلبية عن نفسك تكررها حتى صارت تشبه الحقيقة',
      en: 'For: a negative sentence about yourself you repeat until it feels like fact',
    },
    chip: {
      ar: 'فكرة سلبية تريد عكسها',
      en: 'A negative thought you want to reverse',
    },
  },
];

export default function TherapeuticProtocolsHub() {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('therapeuticProtocols');
  // Forward arrow follows the reading direction.
  const ForwardIcon = isAr ? ArrowLeft : ArrowRight;

  // Two-step decision: user picks the sentence that matches them,
  // and the matching protocol is highlighted (default recommendation: temporal-decoupling).
  const [answer, setAnswer] = useState<string | null>(null);

  const handlePick = (id: string) => {
    setAnswer(id);
    if (typeof document !== 'undefined') {
      const el = document.getElementById(`protocol-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const breadcrumbs = [
    { label: t('shared.breadcrumbs.home'), href: '/' },
    { label: t('shared.breadcrumbs.apps'), href: '/apps' },
    { label: t('shared.breadcrumbs.protocols') },
  ];

  return (
    <div className="min-h-screen bg-[#F5F9F8]" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        <RecoveryBreadcrumb items={breadcrumbs} />

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F6F78]/10 text-[#1F6F78] text-xs font-medium mb-4">
            <Shield className="w-3.5 h-3.5" />
            {isAr ? '\u062a\u0645\u0643\u064a\u0646\u0644\u064a' : 'Tamkinly'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-3">
            {t('hub.title')}
          </h1>
          <p className="text-[#0F1C2E]/60 max-w-lg mx-auto leading-relaxed">
            {t('hub.subtitle')}
          </p>
        </div>

        {/* Premium Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Lock className="w-4 h-4 text-[#0F1C2E]/40" />
          <span className="text-sm text-[#0F1C2E]/50">
            {t('hub.premiumBadge')}
          </span>
        </div>

        {/* Two-step decision: identity-based selector */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 mb-8 shadow-sm">
          <h2 className="text-base sm:text-lg font-semibold text-[#0F1C2E] mb-1">
            {isAr ? '\u0623\u064a\u064f\u0651 \u0647\u0630\u0647 \u062a\u0634\u0628\u0647 \u062d\u0627\u0644\u062a\u0643 \u0627\u0644\u064a\u0648\u0645\u061f' : 'Which of these sounds like you today?'}
          </h2>
          <p className="text-sm text-[#0F1C2E]/50 mb-4">
            {isAr
              ? '\u0627\u062e\u062a\u0631 \u062c\u0645\u0644\u0629 \u0648\u0627\u062d\u062f\u0629 \u0641\u0642\u0637 \u2014 \u0633\u0646\u064f\u0628\u0631\u0632 \u0627\u0644\u0628\u0631\u0648\u062a\u0648\u0643\u0648\u0644 \u0627\u0644\u0623\u0646\u0633\u0628 \u0644\u0643. \u0648\u062a\u0628\u0642\u0649 \u062d\u0631\u064b\u0627 \u062f\u0627\u0626\u0645\u064b\u0627 \u0641\u064a \u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062c\u0645\u064a\u0639.'
              : 'Pick one sentence — we will highlight the protocol that fits. You can still read all four.'}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {PROTOCOLS.map((protocol) => {
              const selected = answer === protocol.id;
              return (
                <button
                  key={protocol.id}
                  type="button"
                  onClick={() => handlePick(protocol.id)}
                  className={`text-sm rounded-xl border px-3 py-3 text-start transition-all duration-200 ${
                    selected
                      ? 'border-[#1F6F78] ring-1 ring-[#1F6F78] bg-[#1F6F78]/5 text-[#0F1C2E] font-medium'
                      : 'border-slate-200 text-[#0F1C2E]/70 hover:border-[#1F6F78]/40 hover:bg-[#1F6F78]/[0.03]'
                  }`}
                >
                  {isAr ? protocol.chip.ar : protocol.chip.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Protocol Cards */}
        <div className="space-y-4">
          {PROTOCOLS.map((protocol) => {
            const matched = answer === protocol.id;
            return (
              <div key={protocol.id} id={`protocol-${protocol.id}`} className="scroll-mt-24">
                <Link
                  href={protocol.href}
                  className="block group"
                >
                  <div className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                    matched
                      ? 'border-transparent ring-2 ring-[#3DD4B0] shadow-md'
                      : protocol.recommended
                        ? 'border-transparent ring-2 ring-[#1F6F78] shadow-md'
                        : 'border-slate-100 shadow-sm'
                  }`}>
                    <div className="flex items-start gap-4">
                      {/* Product thumbnail */}
                      <div className="flex-shrink-0 w-20 sm:w-24 rounded-xl overflow-hidden border border-slate-200 bg-white">
                        <Image
                          src={protocol.image}
                          alt={isAr ? protocol.imageAlt.ar : protocol.imageAlt.en}
                          width={1408}
                          height={768}
                          sizes="96px"
                          className="w-full h-auto"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h2 className="text-lg font-semibold text-[#0F1C2E]">
                            {t(`protocols.${protocol.id}.${protocol.titleKey}`)}
                          </h2>
                          {protocol.recommended && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1F6F78] text-white font-medium">
                              {isAr ? '\u0627\u0628\u062f\u0623 \u0645\u0646 \u0647\u0646\u0627' : 'Start here'}
                            </span>
                          )}
                          {matched && (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#3DD4B0] text-[#0F1C2E] font-medium">
                              <CheckCircle2 className="w-3 h-3" />
                              {isAr ? '\u064a\u0637\u0627\u0628\u0642 \u0625\u062c\u0627\u0628\u062a\u0643' : 'Matches your answer'}
                            </span>
                          )}
                          {protocol.requiresSafety && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8685A]/10 text-[#E8685A] font-medium">
                              {isAr ? '\u064a\u062a\u0637\u0644\u0628 \u062a\u062d\u0630\u064a\u0631\u0627\u064b' : 'Safety warning'}
                            </span>
                          )}
                          {protocol.free ? (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#3DD4B0]/25 text-[#0F1C2E] font-semibold">
                              {isAr ? 'مجاني' : 'Free'}
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#0F1C2E]/5 text-[#0F1C2E]/50 font-medium">
                              ${isAr ? '\u0669\u0669' : '99'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#0F1C2E]/50 mb-2">
                          {t(`protocols.${protocol.id}.${protocol.subtitleKey}`)}
                        </p>
                        <p className="text-sm text-[#0F1C2E]/70 leading-relaxed line-clamp-2">
                          {t(`protocols.${protocol.id}.${protocol.descriptionKey}`)}
                        </p>
                        <p className="text-xs text-[#1F6F78] font-medium mt-2 leading-relaxed">
                          {isAr ? protocol.forLine.ar : protocol.forLine.en}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 mt-3 text-xs text-[#0F1C2E]/40">
                          <span className="flex items-center gap-1">
                            {isAr
                              ? `${protocol.stepCount} \u062e\u0637\u0648\u0627\u062a`
                              : `${protocol.stepCount} steps`}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {isAr ? protocol.durationLabel.ar : protocol.durationLabel.en}
                          </span>
                          <span className="flex items-center gap-1">
                            {!protocol.free && <Lock className="w-3 h-3" />}
                            {protocol.free
                              ? (isAr ? 'بدون تسجيل' : 'No sign-up')
                              : (isAr ? '\u062f\u0641\u0639\u0629 \u0648\u0627\u062d\u062f\u0629' : 'One-time')}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ForwardIcon className="w-5 h-5 text-[#0F1C2E]/20 group-hover:text-[#1F6F78] transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Default CTA: push toward the recommended protocol */}
        <div className="rounded-2xl bg-[#0F1C2E] text-white p-5 sm:p-6 mt-8 text-center">
          <h2 className="text-lg font-semibold mb-1">
            {isAr ? '\u063a\u064a\u0631 \u0645\u062a\u0623\u0643\u062f \u0645\u0646 \u0623\u064a\u0646 \u062a\u0628\u062f\u0623\u061f' : 'Not sure where to start?'}
          </h2>
          <p className="text-sm text-white/60 mb-4">
            {isAr
              ? '\u0627\u0628\u062f\u0623 \u0628\u0627\u0644\u0628\u0631\u0648\u062a\u0648\u0643\u0648\u0644 \u0627\u0644\u0630\u064a \u064a\u0628\u062f\u0623 \u0645\u0646\u0647 \u0645\u0639\u0638\u0645 \u0627\u0644\u0623\u0639\u0636\u0627\u0621: \u0627\u0644\u062a\u0641\u0643\u064a\u0643 \u0627\u0644\u0632\u0645\u0646\u064a.'
              : 'Begin with the protocol most members start with: Temporal Decoupling.'}
          </p>
          <Link
            href="/apps/therapeutic-protocols/temporal-decoupling"
            className="inline-flex items-center gap-2 bg-[#3DD4B0] text-[#0F1C2E] rounded-xl px-5 py-2.5 font-semibold hover:bg-[#2BC49E] transition-colors"
          >
            {isAr ? '\u0627\u0628\u062f\u0623 \u0645\u0646 \u0647\u0646\u0627' : 'Start here'}
            <ForwardIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-[#0F1C2E]/30 mt-8 leading-relaxed max-w-md mx-auto">
          {t('hub.disclaimer')}
        </p>
      </div>
    </div>
  );
}
