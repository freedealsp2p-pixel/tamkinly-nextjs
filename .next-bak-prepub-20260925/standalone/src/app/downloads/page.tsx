'use client';

import { FileText, HardDrive } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations, useLocale } from "@/components/providers/LocaleProvider";
import { BilingualDownloadButton } from "@/components/ui/bilingual-download-button";

// Map each product to its BILINGUAL_FILES key
const productKeys = [
  // BASIC tier
  { key: "sevenDaysSystem", bilingualKey: "7-DAYS-SYSTEM", pages: 30, size: "5.0 MB" },
  // PREMIUM tier
  { key: "executiveManual", bilingualKey: "EXECUTIVE-MANUAL", pages: 6, size: "74 KB" },
  { key: "identityBaseline", bilingualKey: "IDENTITY-BASELINE", pages: 12, size: "75 KB" },
  { key: "environmentalAudit", bilingualKey: "ENVIRONMENTAL-AUDIT", pages: 8, size: "62 KB" },
  { key: "decisionPattern", bilingualKey: "DECISION-PATTERN", pages: 7, size: "58 KB" },
  { key: "evidenceTracking", bilingualKey: "EVIDENCE-TRACKING", pages: 8, size: "60 KB" },
  { key: "progressDashboard", bilingualKey: "PROGRESS-DASHBOARD", pages: 7, size: "58 KB" },
];

export default function DownloadsPage() {
  const t = useTranslations('downloadsPage');
  const { locale } = useLocale();
  const totalSize = "5.0 MB";
  const totalPages = 66;
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
          
          {/* Stats */}
          <div className="flex justify-center gap-6 mt-6">
            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <span className="text-[#3DD4B0] font-bold">{productKeys.length}</span>
              <span className="text-slate-400 text-sm ml-2">{t('files')}</span>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <span className="text-[#3DD4B0] font-bold">{totalPages}</span>
              <span className="text-slate-400 text-sm ml-2">{t('pages')}</span>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <span className="text-[#3DD4B0] font-bold">{totalSize}</span>
              <span className="text-slate-400 text-sm ml-2">{t('totalSize')}</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {productKeys.map((product, index) => (
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
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{product.pages} {t('pagesLabel')}</span>
                      <span>•</span>
                      <span>{product.size}</span>
                    </div>
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
        </div>

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
