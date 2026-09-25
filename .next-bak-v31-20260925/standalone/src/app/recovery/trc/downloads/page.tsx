'use client';

import { FileText, Download, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';
import Link from 'next/link';
import { TRC_ASSETS } from '@/registry/trc-assets';

export default function TrcDownloadsPage() {
  const t = useTranslations('recoveryDownloads');
  const tNav = useTranslations('recoveryNav');
  const { locale, direction } = useLocale();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;
  const isAr = locale === 'ar';

  const allDownloadables = TRC_ASSETS.flatMap(asset =>
    (asset.downloadables || []).map(dl => ({
      ...dl,
      assetLabelAr: asset.labelAr,
      assetLabelEn: asset.labelEn,
      stage: asset.stage,
    }))
  );

  return (
    <div className="py-10 lg:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <RecoveryBreadcrumb
            items={[
              { label: tNav('title'), href: '/recovery' },
              { label: tNav('trc'), href: '/recovery/trc' },
              { label: t('pageTitle') },
            ]}
          />

          <div className="mb-10">
            <Badge className="mb-4 bg-[#1F6F78]/10 text-[#1F6F78] border-[#1F6F78]/20">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              {t('trcBadge')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-3">
              {t('trcTitle')}
            </h1>
            <p className="text-slate-600 leading-relaxed">
              {t('trcDescription')}
            </p>
          </div>

          <div className="space-y-4">
            {allDownloadables.map((dl) => (
              <Card key={dl.id} className="border border-slate-200 hover:border-[#1F6F78]/30 transition-all duration-200">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#1F6F78]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-[#1F6F78]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          {t(`stages.${dl.stage}`)}
                        </Badge>
                        {dl.status === 'built' ? (
                          <Badge className="text-xs px-2 py-0 bg-emerald-50 text-emerald-700 border-emerald-200">
                            {t('available')}
                          </Badge>
                        ) : (
                          <Badge className="text-xs px-2 py-0 bg-amber-50 text-amber-700 border-amber-200">
                            {t('planned')}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-1">
                        {isAr ? dl.labelAr : dl.labelEn}
                      </h3>
                      {dl.status === 'built' && dl.path && (
                        <a
                          href={`/downloads/trc/${dl.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#1F6F78] hover:underline inline-flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          {isAr ? 'تنزيل' : 'Download'}
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/recovery/trc"
              className="inline-flex items-center gap-2 text-[#1F6F78] font-medium hover:underline"
            >
              {t('backToTrc')}
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
