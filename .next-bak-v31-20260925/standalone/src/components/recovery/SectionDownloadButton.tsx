// Enhanced SectionDownloadButton — R1-F
// Each PDF is part of the journey, not just a library file
// Section → Why this tool → Use/Download → Completion → Next Step

'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Download, CheckCircle2, BookOpen, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { BilingualDownloadButton } from '@/components/ui/bilingual-download-button';
import { addDownloadedTool } from '@/lib/recovery-state';
import { RecoveryProgram } from '@/lib/recovery-journey';

interface SectionDownloadButtonProps {
  fileKey: string;
  program: RecoveryProgram;
  sectionTitleAr?: string;
  sectionTitleEn?: string;
  whyThisToolAr?: string;
  whyThisToolEn?: string;
  onComplete?: () => void;
}

export default function SectionDownloadButton({
  fileKey,
  program,
  sectionTitleAr,
  sectionTitleEn,
  whyThisToolAr,
  whyThisToolEn,
  onComplete
}: SectionDownloadButtonProps) {
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const [expanded, setExpanded] = useState(false);
  const [markedDone, setMarkedDone] = useState(false);

  const accentColor = program === 'trc' ? '#1F6F78' : '#3DD4B0';
  const lightBg = program === 'trc' ? '#F0F7F7' : '#F0FDF9';

  const handleDownload = () => {
    addDownloadedTool(program, fileKey);
  };

  const handleMarkDone = () => {
    setMarkedDone(true);
    onComplete?.();
  };

  return (
    <div className="rounded-xl p-4 border" style={{ borderColor: '#E5E7EB', backgroundColor: '#fff' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          {markedDone ? (
            <CheckCircle2 className="w-4 h-4" style={{ color: accentColor }} />
          ) : (
            <Download className="w-4 h-4" style={{ color: '#9CA3AF' }} />
          )}
          <span className="text-sm font-medium" style={{ color: '#0F1C2E' }}>
            {isAr ? 'ورقة عمل مرتبطة بهذا القسم' : 'Worksheet for this section'}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} style={{ color: '#9CA3AF' }} />
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="mt-4 space-y-3">
          {/* Why this tool exists */}
          {(whyThisToolAr || whyThisToolEn) && (
            <div className="rounded-lg p-3" style={{ backgroundColor: lightBg }}>
              <div className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accentColor }} />
                <div>
                  <span className="text-xs font-medium" style={{ color: accentColor }}>
                    {isAr ? 'لماذا هذه الأداة؟' : 'Why this tool?'}
                  </span>
                  <p className="text-xs mt-1" style={{ color: '#374151' }}>
                    {isAr ? whyThisToolAr : whyThisToolEn}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Download button */}
          <div onClick={handleDownload}>
            <BilingualDownloadButton fileKey={fileKey} />
          </div>

          {/* Mark as completed */}
          {!markedDone && (
            <button
              onClick={handleMarkDone}
              className="w-full py-2 rounded-lg text-xs font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: lightBg, color: accentColor }}
            >
              {isAr ? '✓ تم استخدام هذه الأداة' : '✓ I\'ve used this tool'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
