"use client";

import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';
import GroundingPrintableCompanion from '@/components/trc/grounding/GroundingPrintableCompanion';
import Link from 'next/link';
import { Printer, ArrowLeft } from 'lucide-react';

export default function PrintableGroundingPage() {
  const t = useTranslations('recoveryAssets.trcGroundingPrintable');
  const { locale, direction } = useLocale();
  const tNav = useTranslations('recoveryNav');
  const tTrc = useTranslations('recoveryHub.trc');

  return (
    <>
      {/* Print-specific CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Hide non-print elements */
          .no-print {
            display: none !important;
          }

          /* Reset page margins */
          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          /* A4 page sizing */
          .print-page {
            width: 210mm;
            min-height: 297mm;
            padding: 15mm;
            margin: 0 auto;
            box-shadow: none !important;
            page-break-after: always;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print-page:last-child {
            page-break-after: avoid;
          }

          /* Ensure colors print */
          * {
            print-color-adjust: exact !important;
            -webkit-print-color-adjust: exact !important;
          }

          /* Remove shadows and borders from outer wrappers */
          .grounding-printable-wrapper {
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }

        /* Screen-only: show pages with shadow for preview */
        @media screen {
          .print-page {
            max-width: 210mm;
            margin: 0 auto 24px auto;
            padding: 15mm;
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.06);
            border-radius: 4px;
          }

          .print-page:last-child {
            margin-bottom: 0;
          }
        }
      ` }} />

      <div
        className="min-h-screen bg-slate-50"
        dir={direction}
      >
        {/* Top bar: breadcrumb + actions — hidden when printing */}
        <div className="no-print container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <RecoveryBreadcrumb
            items={[
              { label: tNav('title'), href: '/recovery' },
              { label: tNav('trc'), href: '/recovery/trc' },
              { label: tTrc('grounding.title'), href: '/recovery/trc/grounding' },
              { label: t('breadcrumb') },
            ]}
          />

          <div className="flex items-center justify-between mb-4">
            <Link
              href="/recovery/trc/grounding"
              className="inline-flex items-center gap-2 text-[#1F6F78] hover:text-[#1a5e66] text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" style={{ transform: direction === 'rtl' ? 'scaleX(-1)' : 'none' }} />
              {t('backLink')}
            </Link>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F6F78] text-white text-sm font-medium rounded-lg hover:bg-[#1a5e66] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1F6F78] focus:ring-offset-2"
              aria-label={t('printButton')}
            >
              <Printer className="w-4 h-4" />
              {t('printButton')}
            </button>
          </div>
        </div>

        {/* Printable content wrapper */}
        <div className="grounding-printable-wrapper px-4 pb-8">
          <GroundingPrintableCompanion />
        </div>
      </div>
    </>
  );
}
