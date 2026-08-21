"use client";

import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';

/**
 * GroundingPrintableCompanion — TRC 5-4-3-2-1 Printable Card
 *
 * A two-page printable companion for the grounding exercise.
 * Page 1: The 5 steps with writing fields + anchoring phrase
 * Page 2: Safety guidance + emergency contacts
 *
 * Design spec from approved HTML:
 * - Step number: 32px circle, bold 20px, teal bg #E6F4F5, teal text #1F6F78
 * - Step cards: light bg #F8FAFC, border #CBD5E1, rounded 8px
 * - Writing fields: dotted bottom border #9CA3AF, transparent bg
 * - Safety alert: bg #FFFBEB, border #D97706 (right 4px), text #92400E
 * - Anchoring box: bg #E6F4F5, dashed border #1F6F78
 * - Alert box: bg #FEF3C7, border #B45309, text #78350F
 * - Contacts box: 1.5px solid teal border, white bg
 * - Footer: border-top, text #475569, 9px
 * - Fold guide: dashed border, centered text
 */

export default function GroundingPrintableCompanion() {
  const t = useTranslations('recoveryAssets.trcGroundingPrintable');
  const { locale, direction } = useLocale();
  const isRTL = direction === 'rtl';

  const steps = [
    { number: 5, icon: '\u{1F441}', key: 'step5' },
    { number: 4, icon: '\u{270B}', key: 'step4' },
    { number: 3, icon: '\u{1F442}', key: 'step3' },
    { number: 2, icon: '\u{1F443}', key: 'step2' },
    { number: 1, icon: '\u{1F485}', key: 'step1' },
  ];

  return (
    <div dir={direction} className="grounding-printable">
      {/* ============ PAGE 1 (Front) ============ */}
      <div className="print-page print-page-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-[#0F1C2E]" style={{ fontFamily: 'var(--font-inter)' }}>
            {t('page1.title')}
          </h1>
          <span
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F4F5] text-[#1F6F78]"
          >
            TRC
          </span>
        </div>

        {/* Purpose Box */}
        <div className="mb-4 p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg">
          <p className="text-sm text-[#0F1C2E] leading-relaxed">
            {t('page1.purpose')}
          </p>
        </div>

        {/* Safety Alert */}
        <div
          className="mb-5 p-3 bg-[#FFFBEB] rounded-lg text-sm text-[#92400E] leading-relaxed"
          style={{
            borderRight: isRTL ? 'none' : '4px solid #D97706',
            borderLeft: isRTL ? '4px solid #D97706' : 'none',
            borderTop: '1px solid #D97706',
            borderBottom: '1px solid #D97706',
          }}
        >
          <p>{t('page1.safetyAlert')}</p>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-5">
          {steps.map((step) => (
            <div
              key={step.key}
              className="flex gap-3 p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg"
            >
              {/* Step number circle */}
              <div className="flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full bg-[#E6F4F5] flex items-center justify-center text-[#1F6F78] font-bold text-xl"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {step.number}
                </div>
              </div>

              {/* Step content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">{step.icon}</span>
                  <span className="text-sm font-semibold text-[#0F1C2E]">
                    {t(`page1.${step.key}.label`)}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {Array.from({ length: step.number }, (_, i) => (
                    <div key={i} className="relative">
                      <input
                        type="text"
                        aria-label={t(`page1.${step.key}.fieldLabel`, { number: String(i + 1) })}
                        className="w-full bg-transparent border-b border-dotted border-[#9CA3AF] py-1 text-sm text-[#0F1C2E] focus:outline-none focus:border-[#1F6F78] placeholder:text-transparent"
                        placeholder=" "
                        style={{ fontSize: '11px' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Anchoring Box */}
        <div className="mb-4 p-3 bg-[#E6F4F5] border-2 border-dashed border-[#1F6F78] rounded-lg">
          <p className="text-sm font-semibold text-[#1F6F78] mb-1">
            {t('page1.anchoring.label')}
          </p>
          <p className="text-sm text-[#0F1C2E] leading-relaxed mb-2">
            {t('page1.anchoring.subtext')}
          </p>
          <div>
            <label className="text-sm text-[#0F1C2E] font-medium block mb-1">
              {t('page1.anchoring.customLabel')}
            </label>
            <input
              type="text"
              aria-label={t('page1.anchoring.customLabel')}
              className="w-full bg-transparent border-b border-dotted border-[#9CA3AF] py-1 text-sm text-[#0F1C2E] focus:outline-none focus:border-[#1F6F78]"
              placeholder=" "
            />
          </div>
        </div>

        {/* Fold Guide */}
        <div className="border-t-2 border-dashed border-[#CBD5E1] pt-2 mb-4 text-center">
          <span className="text-xs text-[#94A3B8]">{t('page1.foldGuide')}</span>
        </div>

        {/* Footer */}
        <div className="border-t border-[#CBD5E1] pt-2 flex items-center justify-between text-[9px] text-[#475569]">
          <span>{t('page1.footerBrand')}</span>
          <span>{t('page1.footerId')}</span>
          <span>{t('page1.pageNumber')}</span>
        </div>
      </div>

      {/* ============ PAGE 2 (Back) ============ */}
      <div className="print-page print-page-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0F1C2E]" style={{ fontFamily: 'var(--font-inter)' }}>
            {t('page2.title')}
          </h2>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#E6F4F5] text-[#1F6F78]">
            TRC
          </span>
        </div>

        {/* Two-column guidance grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Left: When needing more stabilization */}
          <div className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg">
            <p className="text-sm font-semibold text-[#0F1C2E] mb-2">
              {t('page2.escalation.title')}
            </p>
            <ul className="space-y-1.5 text-sm text-[#0F1C2E] leading-relaxed">
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>{t('page2.escalation.bullet1')}</span></li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>{t('page2.escalation.bullet2')}</span></li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>{t('page2.escalation.bullet3')}</span></li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>{t('page2.escalation.bullet4')}</span></li>
            </ul>
          </div>

          {/* Right: General guidance */}
          <div className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg">
            <p className="text-sm font-semibold text-[#0F1C2E] mb-2">
              {t('page2.generalGuidance.title')}
            </p>
            <ul className="space-y-1.5 text-sm text-[#0F1C2E] leading-relaxed">
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>{t('page2.generalGuidance.bullet1')}</span></li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>{t('page2.generalGuidance.bullet2')}</span></li>
            </ul>
          </div>
        </div>

        {/* Safety Alert Box */}
        <div className="mb-4 p-3 bg-[#FEF3C7] border border-[#B45309] rounded-lg text-sm text-[#78350F]">
          <p className="font-semibold mb-2">{t('page2.safetyStop.title')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <ul className="space-y-1.5 leading-relaxed">
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>{t('page2.safetyStop.leftBullet1')}</span></li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>{t('page2.safetyStop.leftBullet2')}</span></li>
            </ul>
            <ul className="space-y-1.5 leading-relaxed">
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>{t('page2.safetyStop.rightBullet1')}</span></li>
              <li className="flex gap-2"><span className="flex-shrink-0">•</span><span>{t('page2.safetyStop.rightBullet2')}</span></li>
            </ul>
          </div>
        </div>

        {/* Next Steps Box */}
        <div className="mb-4 p-3 bg-[#E6F4F5] rounded-lg">
          <p className="text-sm font-semibold text-[#1F6F78] mb-1">
            {t('page2.nextSteps.title')}
          </p>
          <a
            href="/recovery/trc"
            className="text-sm text-[#1F6F78] underline hover:no-underline"
          >
            tamkinly.com/recovery/trc
          </a>
        </div>

        {/* Emergency Contacts Box */}
        <div className="mb-4 p-3 bg-white border-[1.5px] border-[#1F6F78] rounded-lg">
          <p className="text-sm font-semibold text-[#1F6F78] mb-3">
            {t('page2.contacts.title')}
          </p>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-[#0F1C2E] font-medium block mb-1">
                {t('page2.contacts.therapist')}
              </label>
              <input
                type="text"
                aria-label={t('page2.contacts.therapist')}
                className="w-full bg-transparent border-b border-dotted border-[#9CA3AF] py-1 text-sm text-[#0F1C2E] focus:outline-none focus:border-[#1F6F78]"
                placeholder=" "
              />
            </div>
            <div>
              <label className="text-sm text-[#0F1C2E] font-medium block mb-1">
                {t('page2.contacts.helpline')}
              </label>
              <input
                type="text"
                aria-label={t('page2.contacts.helpline')}
                className="w-full bg-transparent border-b border-dotted border-[#9CA3AF] py-1 text-sm text-[#0F1C2E] focus:outline-none focus:border-[#1F6F78]"
                placeholder=" "
              />
            </div>
            <div>
              <label className="text-sm text-[#0F1C2E] font-medium block mb-1">
                {t('page2.contacts.other')}
              </label>
              <input
                type="text"
                aria-label={t('page2.contacts.other')}
                className="w-full bg-transparent border-b border-dotted border-[#9CA3AF] py-1 text-sm text-[#0F1C2E] focus:outline-none focus:border-[#1F6F78]"
                placeholder=" "
              />
            </div>
          </div>
        </div>

        {/* Fold Guide */}
        <div className="border-t-2 border-dashed border-[#CBD5E1] pt-2 mb-4 text-center">
          <span className="text-xs text-[#94A3B8]">{t('page2.foldGuide')}</span>
        </div>

        {/* Footer */}
        <div className="border-t border-[#CBD5E1] pt-2 flex items-center justify-between text-[9px] text-[#475569]">
          <span>{t('page2.footerBrand')}</span>
          <span>{t('page2.footerId')}</span>
          <span>{t('page2.pageNumber')}</span>
        </div>
      </div>
    </div>
  );
}
