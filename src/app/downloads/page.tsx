'use client';

import { FileText, HardDrive, Lock, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations, useLocale } from "@/components/providers/LocaleProvider";
import { BilingualDownloadButton } from "@/components/ui/bilingual-download-button";

// ============================================
// TASK 71 (2026-10-25) — founder directive: pay FIRST (Tribute), then access.
// The public downloads page now exposes ONLY the free files.
// Every Planner-package file moved behind the server-side gate at
// /downloads/planner (access code + email, tier >= PREMIUM).
// D1 untouched: no old path removed — legacy root PDFs stay reachable by
// direct URL until the Cutover migration completes (6/6 subscribers).
// ============================================

// Free files — public, no access code needed
const freeFiles = [
  { key: "actionList", bilingualKey: "ACTION-LIST" },
  { key: "recoveryToolkit", bilingualKey: "RECOVERY-TOOLKIT-EN" },
];

// Planner-package files — gated behind /downloads/planner (server-side check)
const plannerFileKeys = [
  "plannerDigital",
  "plannerPrint",
  "sevenDaysSystem",
  "identityResetChecklist",
  "executiveManual",
  "identityBaseline",
  "environmentalAudit",
  "decisionPattern",
  "evidenceTracking",
  "progressDashboard",
];

export default function DownloadsPage() {
  const t = useTranslations('downloadsPage');
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 py-12 px-4" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border-[#3DD4B0]/30">
            <HardDrive className="w-4 h-4 mr-2" />
            {t('badge')}
          </Badge>
          <h1 className="text-4xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-[#3DD4B0]/90 text-sm mt-3 max-w-2xl mx-auto">
            {t('includedNote')}
          </p>
        </div>

        {/* ============ FREE FILES — public ============ */}
        <h2 className="text-xl font-bold text-white mb-1">{t('freeTitle')}</h2>
        <p className="text-slate-400 text-sm mb-5">{t('freeSubtitle')}</p>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {freeFiles.map((product, index) => (
            <Card key={index} className="bg-white/5 border-white/10 hover:border-[#3DD4B0]/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#3DD4B0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {t(`products.${product.key}.name`)}
                    </h3>
                    <p className="text-slate-400 text-sm mb-3">
                      {t(`products.${product.key}.description`)}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <BilingualDownloadButton
                    fileKey={product.bilingualKey}
                    variant="primary"
                    showSize={false}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Recovery worksheets pointer — 11 free worksheets live on /recovery */}
          <Card className="bg-white/5 border-white/10 md:col-span-2">
            <CardContent className="p-6 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{t('recoveryPointerTitle')}</h3>
                <p className="text-slate-400 text-sm">{t('recoveryPointerDesc')}</p>
              </div>
              <Link href="/recovery">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold">
                  {t('recoveryPointerCta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* ============ PLANNER FILES — locked (pay first, then access) ============ */}
        <Card className="bg-white/5 border-[#3DD4B0]/30">
          <CardContent className="p-6 sm:p-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 bg-[#3DD4B0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-[#3DD4B0]" />
              </div>
              <div className="flex-1">
                <h2 className="text-white font-semibold text-xl mb-1">{t('lockedTitle')}</h2>
                <p className="text-slate-400 text-sm">{t('lockedDesc')}</p>
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              {plannerFileKeys.map((key) => (
                <li key={key} className="flex items-center gap-2 text-sm text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                  {t(`products.${key}.name`)}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link href="/downloads/planner" className="w-full sm:w-auto">
                <Button className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold h-12 px-6">
                  <Download className="mr-2 h-4 w-4" />
                  {t('lockedCta')}
                </Button>
              </Link>
              <Link href="/products/premium" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 h-12 px-6">
                  {t('lockedBuyCta')}
                </Button>
              </Link>
            </div>
            <p className="text-slate-500 text-xs mt-4">{t('lockedNote')}</p>
          </CardContent>
        </Card>

        {/* Download All Note */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm mb-4">
            {t('downloadAllNote')}
          </p>
        </div>
      </div>
    </div>
  );
}
