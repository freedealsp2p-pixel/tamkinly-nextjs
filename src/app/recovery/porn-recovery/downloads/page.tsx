'use client';

import { FileText, Download, ArrowRight, ArrowLeft, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';
import { BilingualDownloadButton } from '@/components/ui/bilingual-download-button';
import { RecoveryBreadcrumb } from '@/components/recovery/system';
import Link from 'next/link';

const worksheets = [
  { id: 'REC-01', bilingualKey: 'REC-01-HALT', stage: 'recovery', section: 'toolkit', sectionPath: '/recovery/porn-recovery#toolkit' },
  { id: 'REC-02', bilingualKey: 'REC-02-TRIGGER-JOURNAL', stage: 'recovery', section: 'toolkit', sectionPath: '/recovery/porn-recovery#toolkit' },
  { id: 'REC-03', bilingualKey: 'REC-03-EMERGENCY-PLAN', stage: 'recovery', section: 'toolkit', sectionPath: '/recovery/porn-recovery#toolkit' },
  { id: 'REC-04', bilingualKey: 'REC-04-RECOVERY-REVIEW', stage: 'reconstruct', section: 'framework', sectionPath: '/recovery/porn-recovery#framework' },
  { id: 'REC-05', bilingualKey: 'REC-05-PATTERN-RECOGNITION', stage: 'learn', section: 'brain', sectionPath: '/recovery/porn-recovery#brain' },
  { id: 'REC-06', bilingualKey: 'REC-06-RECOVERY-LOOP-MAP', stage: 'learn', section: 'attempts', sectionPath: '/recovery/porn-recovery#attempts' },
  { id: 'REC-07', bilingualKey: 'REC-07-REFRAME', stage: 'learn', section: 'attempts', sectionPath: '/recovery/porn-recovery#attempts' },
  { id: 'REC-08', bilingualKey: 'REC-08-STAGE-ASSESSMENT', stage: 'recovery', section: 'framework', sectionPath: '/recovery/porn-recovery#framework' },
  { id: 'REC-09', bilingualKey: 'REC-09-RELAPSE-SCENARIO-REVIEW', stage: 'reconstruct', section: 'relapse', sectionPath: '/recovery/porn-recovery#relapse' },
  { id: 'REC-10', bilingualKey: 'REC-10-IDENTITY-CARDS', stage: 'reconstruct', section: 'identity', sectionPath: '/recovery/porn-recovery#identity' },
  { id: 'REC-11', bilingualKey: 'REC-11-FUTURE-SELF-LETTER', stage: 'maintain', section: 'futureSelf', sectionPath: '/recovery/porn-recovery#future-self' },
];

export default function PornRecoveryDownloadsPage() {
  const t = useTranslations('recoveryDownloads');
  const tPage = useTranslations('recoveryPage');
  const tNav = useTranslations('recoveryNav');
  const { direction } = useLocale();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="py-10 lg:py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <RecoveryBreadcrumb
            items={[
              { label: tNav('title'), href: '/recovery' },
              { label: tNav('pornRecovery'), href: '/recovery/porn-recovery' },
              { label: t('pageTitle') },
            ]}
          />

          <div className="mb-10">
            <Badge className="mb-4 bg-[#3DD4B0]/10 text-[#1F6F78] border-[#3DD4B0]/20">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              {t('badge')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-3">
              {t('title')}
            </h1>
            <p className="text-slate-600 leading-relaxed">
              {t('description')}
            </p>
          </div>

          <div className="space-y-4">
            {worksheets.map((ws) => (
              <Card key={ws.id} className="border border-slate-200 hover:border-[#3DD4B0]/30 transition-all duration-200">
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#3DD4B0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-[#1F6F78]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-slate-400">{ws.id}</span>
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          {t('stages.' + ws.stage)}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-1">
                        {t('worksheets.' + ws.id + '.title')}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {t('worksheets.' + ws.id + '.description')}
                      </p>
                      <Link
                        href={ws.sectionPath}
                        className="inline-flex items-center gap-1.5 mt-2 text-xs text-[#1F6F78] hover:underline"
                      >
                        <LinkIcon className="w-3 h-3" />
                        {tPage('downloads.' + ws.section + '.subtitle')}
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <BilingualDownloadButton
                      fileKey={ws.bilingualKey}
                      variant="outline"
                      showSize={true}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/recovery/porn-recovery"
              className="inline-flex items-center gap-2 text-[#1F6F78] font-medium hover:underline"
            >
              {t('backToProgram')}
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
