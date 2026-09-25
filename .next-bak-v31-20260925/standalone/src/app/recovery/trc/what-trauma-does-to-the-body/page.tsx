'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Brain, Shield, Wind, TreePine, Activity, ArrowLeft, BookOpen, Heart, Zap, Eye, FileText } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb, MedicalDisclaimer, SafetyResponse, TherapeuticExit } from '@/components/recovery/system';

export default function WhatTraumaDoesPage() {
  const { direction } = useLocale();
  const tNav = useTranslations('recoveryNav');
  const t = useTranslations('trcWhatTraumaDoes');

  return (
    <div className="min-h-screen bg-[#F5F9F8]" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <RecoveryBreadcrumb
            items={[
              { label: tNav('title'), href: '/recovery' },
              { label: tNav('trc'), href: '/recovery/trc' },
              { label: t('breadcrumbTitle') },
            ]}
          />

          {/* Medical Disclaimer */}
          <MedicalDisclaimer />

          {/* Hero Section */}
          <header className="mb-12 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1F6F78]/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-[#1F6F78]" />
              </div>
              <span className="text-sm font-medium text-[#1F6F78] bg-[#1F6F78]/8 px-3 py-1 rounded-full">{t('badge')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] leading-tight mb-5">
              {t('heroTitle')}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t('heroSubtitle')}
            </p>
          </header>

          {/* Section 1: Introduction */}
          <section className="mb-14">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#1F6F78]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                  {t('section1Title')}
                </h2>
              </div>

              <div className="space-y-5 text-slate-700 leading-[1.9]">
                <p>{t('section1P1')}</p>
                <p>{t('section1P2')}</p>

                <div className="bg-[#1F6F78]/5 border border-[#1F6F78]/20 rounded-xl p-5 my-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#1F6F78] mt-1 flex-shrink-0" />
                    <p className="text-[#0F1C2E] font-medium">{t('section1P3')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Three Brain Regions */}
          <section className="mb-14">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[#1F6F78]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                  {t('section2Title')}
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed mb-8">{t('section2Subtitle')}</p>

              {/* Brain Diagram */}
              <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <div className="bg-[#1F6F78]/5 px-6 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-[#1F6F78]">
                    {t('brainDiagramCaption', { defaultValue: 'كيف يؤثر الصدمة على عمل الدماغ' })}
                  </p>
                </div>
                <div className="p-4 flex justify-center">
                  <Image
                    src="/images/trc/trauma-brain-effects.jpg"
                    alt={t('brainDiagramAlt', { defaultValue: 'رسم توضيحي يوضح تأثير الصدمة على اللوزة الدماغية والحصين والقشرة الأمامية' })}
                    width={600}
                    height={400}
                    className="rounded-xl max-w-full h-auto"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Amygdala */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-[#0F1C2E] mb-4">{t('amygdalaTitle')}</h3>
                <p className="text-slate-700 leading-relaxed mb-4">{t('amygdalaDesc')}</p>
                <div className="bg-red-50 border border-red-200/60 rounded-xl p-5 mb-4">
                  <p className="text-red-800/80 font-medium">{t('amygdalaEffect')}</p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700">
                    <span className="text-[#1F6F78] mt-1">•</span>
                    <span>{t('amygdalaItem1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <span className="text-[#1F6F78] mt-1">•</span>
                    <span>{t('amygdalaItem2')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <span className="text-[#1F6F78] mt-1">•</span>
                    <span>{t('amygdalaItem3')}</span>
                  </li>
                </ul>
              </div>

              {/* Hippocampus */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-[#0F1C2E] mb-4">{t('hippocampusTitle')}</h3>
                <p className="text-slate-700 leading-relaxed mb-4">{t('hippocampusDesc')}</p>
                <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-5 mb-4">
                  <p className="text-amber-800/80 font-medium">{t('hippocampusEffect')}</p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700">
                    <span className="text-[#1F6F78] mt-1">•</span>
                    <span>{t('hippocampusItem1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <span className="text-[#1F6F78] mt-1">•</span>
                    <span>{t('hippocampusItem2')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <span className="text-[#1F6F78] mt-1">•</span>
                    <span>{t('hippocampusItem3')}</span>
                  </li>
                </ul>
              </div>

              {/* Prefrontal Cortex */}
              <div>
                <h3 className="text-xl font-bold text-[#0F1C2E] mb-4">{t('prefrontalTitle')}</h3>
                <p className="text-slate-700 leading-relaxed mb-4">{t('prefrontalDesc')}</p>
                <div className="bg-blue-50 border border-blue-200/60 rounded-xl p-5 mb-4">
                  <p className="text-blue-800/80 font-medium">{t('prefrontalEffect')}</p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700">
                    <span className="text-[#1F6F78] mt-1">•</span>
                    <span>{t('prefrontalItem1')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <span className="text-[#1F6F78] mt-1">•</span>
                    <span>{t('prefrontalItem2')}</span>
                  </li>
                  <li className="flex items-start gap-2 text-slate-700">
                    <span className="text-[#1F6F78] mt-1">•</span>
                    <span>{t('prefrontalItem3')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Trauma Loop */}
          <section className="mb-14">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#1F6F78]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                  {t('section3Title')}
                </h2>
              </div>

              <p className="text-slate-700 leading-relaxed mb-6">{t('section3P1')}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 bg-[#1F6F78]/5 rounded-lg p-4">
                  <span className="bg-[#1F6F78] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-slate-700">{t('loopStep1')}</p>
                </div>
                <div className="flex items-start gap-3 bg-[#1F6F78]/5 rounded-lg p-4">
                  <span className="bg-[#1F6F78] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-slate-700">{t('loopStep2')}</p>
                </div>
                <div className="flex items-start gap-3 bg-[#1F6F78]/5 rounded-lg p-4">
                  <span className="bg-[#1F6F78] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-slate-700">{t('loopStep3')}</p>
                </div>
                <div className="flex items-start gap-3 bg-red-50 border border-red-200/40 rounded-lg p-4">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">→</span>
                  <p className="text-red-800/80 font-medium">{t('loopStep4')}</p>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed">{t('section3P2')}</p>
            </div>
          </section>

          {/* Section 4: Body Manifestations */}
          <section className="mb-14">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-[#1F6F78]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                  {t('section4Title')}
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed mb-8">{t('section4Subtitle')}</p>

              {/* Body Category 1 */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#0F1C2E] mb-4">{t('bodyCategory1Title')}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory1Item1')}</span></li>
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory1Item2')}</span></li>
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory1Item3')}</span></li>
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory1Item4')}</span></li>
                </ul>
              </div>

              {/* Body Category 2 */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#0F1C2E] mb-4">{t('bodyCategory2Title')}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory2Item1')}</span></li>
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory2Item2')}</span></li>
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory2Item3')}</span></li>
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory2Item4')}</span></li>
                </ul>
              </div>

              {/* Body Category 3 */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#0F1C2E] mb-4">{t('bodyCategory3Title')}</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory3Item1')}</span></li>
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory3Item2')}</span></li>
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory3Item3')}</span></li>
                  <li className="flex items-start gap-2 text-slate-700"><span className="text-[#1F6F78] mt-1">•</span><span>{t('bodyCategory3Item4')}</span></li>
                </ul>
              </div>

              <div className="bg-[#3DD4B0]/10 border border-[#3DD4B0]/20 rounded-xl p-5">
                <p className="text-slate-700 leading-relaxed">
                  {t('section4Conclusion')} <Link href="/recovery/trc/grounding" className="text-[#1F6F78] font-semibold underline underline-offset-4 hover:text-[#1F6F78]/80 transition-colors">{t('groundingLink')}</Link> {t('section4ConclusionEnd')} <Link href="/recovery/trc/a52" className="text-[#1F6F78] font-semibold underline underline-offset-4 hover:text-[#1F6F78]/80 transition-colors">{t('breathingLink')}</Link> {t('section4ConclusionEnd2')}
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Window of Tolerance */}
          <section className="mb-14">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#1F6F78]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                  {t('section5Title')}
                </h2>
              </div>

              <p className="text-slate-700 leading-relaxed mb-8">{t('section5P1')}</p>

              {/* Window visualization */}
              <div className="space-y-0 mb-8">
                <div className="bg-red-50 border border-red-200/40 rounded-t-xl p-4">
                  <h4 className="font-bold text-red-800 mb-1">{t('windowZone1')}</h4>
                  <p className="text-red-700/70 text-sm">{t('windowZone1Desc')}</p>
                </div>
                <div className="bg-[#3DD4B0]/15 border-x-2 border-[#3DD4B0]/30 py-6 px-4 text-center">
                  <h4 className="font-bold text-[#1F6F78] mb-1">{t('windowZone2')}</h4>
                  <p className="text-[#1F6F78]/70 text-sm">{t('windowZone2Desc')}</p>
                </div>
                <div className="bg-slate-100 border border-slate-200/40 rounded-b-xl p-4">
                  <h4 className="font-bold text-slate-600 mb-1">{t('windowZone3')}</h4>
                  <p className="text-slate-500 text-sm">{t('windowZone3Desc')}</p>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed">{t('section5P2')}</p>
            </div>
          </section>

          {/* Section 6: Three Practical Steps */}
          <section className="mb-14">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#1F6F78]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                  {t('section6Title')}
                </h2>
              </div>

              {/* Step 1 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-[#0F1C2E] mb-3">{t('step1Title')}</h3>
                <p className="text-slate-700 leading-relaxed mb-4">{t('step1Desc')}</p>
                <div className="bg-[#3DD4B0]/10 border border-[#3DD4B0]/20 rounded-xl p-5">
                  <p className="font-semibold text-[#1F6F78] mb-2">{t('step1Technique')}</p>
                  <p className="text-slate-700">{t('step1How')}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-[#0F1C2E] mb-3">{t('step2Title')}</h3>
                <p className="text-slate-700 leading-relaxed mb-4">{t('step2Desc')}</p>
                <div className="bg-[#3DD4B0]/10 border border-[#3DD4B0]/20 rounded-xl p-5">
                  <p className="font-semibold text-[#1F6F78] mb-2">{t('step2Technique')}</p>
                  <p className="text-slate-700">{t('step2How')}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-xl font-bold text-[#0F1C2E] mb-3">{t('step3Title')}</h3>
                <p className="text-slate-700 leading-relaxed mb-4">{t('step3Desc')}</p>
                <div className="bg-[#3DD4B0]/10 border border-[#3DD4B0]/20 rounded-xl p-5">
                  <p className="font-semibold text-[#1F6F78] mb-2">{t('step3Technique')}</p>
                  <p className="text-slate-700">{t('step3How')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-14">
            <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] rounded-2xl p-6 sm:p-8 lg:p-10 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">{t('conclusionTitle')}</h2>
              <div className="space-y-5 text-slate-200 leading-[1.9]">
                <p>{t('conclusionP1')}</p>
                <p>
                  {t('conclusionP2')} <Link href="/recovery/trc/grounding" className="text-[#3DD4B0] font-semibold underline underline-offset-4 hover:text-[#3DD4B0]/80 transition-colors">{t('tryGrounding')}</Link> {t('toReactivate')} <Link href="/recovery/trc/a52" className="text-[#3DD4B0] font-semibold underline underline-offset-4 hover:text-[#3DD4B0]/80 transition-colors">{t('tryBreathing')}</Link> {t('toRelax')}
                </p>
              </div>
            </div>
          </section>

          {/* Safety Response */}
          <SafetyResponse />

          {/* Therapeutic Exit */}
          <TherapeuticExit />

        </div>
      </div>
    </div>
  );
}
