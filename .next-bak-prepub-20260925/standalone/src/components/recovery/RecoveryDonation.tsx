// RecoveryDonation — R1-G
// Visual-only donation prompt. NO actual payment.
// CRITICAL: Only appears on completion screens + Recovery hub page
// NEVER inside therapeutic tools or during exercises

'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Gift, Heart } from 'lucide-react';

interface RecoveryDonationProps {
  context: 'completion' | 'recovery-hub';
}

export default function RecoveryDonation({ context }: RecoveryDonationProps) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';

  const isCompletion = context === 'completion';

  return (
    <div className="rounded-xl p-6 border" dir={direction} style={{ borderColor: '#E5E7EB', backgroundColor: '#fff' }}>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#F0F7F7' }}>
          <Gift className="w-5 h-5" style={{ color: '#1F6F78' }} />
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-2" style={{ color: '#0F1C2E' }}>
            {isAr ? 'ادعم استمرار الموارد المجانية' : 'Support Free Resources'}
          </h3>
          <p className="text-sm mb-4" style={{ color: '#374151' }}>
            {isAr
              ? 'إذا وجدت فائدة في هذه الموارد، وساعدتك فكرة أو أداة أو ورقة عمل، يمكنك المساهمة في دعم تطوير موارد تعافٍ مجانية لمستخدمين آخرين.'
              : 'If you found value in these resources, and an idea, tool, or worksheet helped you, you can contribute to supporting the development of free recovery resources for others.'}
          </p>

          {/* Amount buttons */}
          <div className="flex gap-2 mb-3">
            {['$5', '$10', '$25'].map(amount => (
              <button
                key={amount}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                style={{ backgroundColor: '#F0F7F7', color: '#1F6F78', border: '1px solid #1F6F78' }}
              >
                {amount}
              </button>
            ))}
          </div>

          <button className="text-xs underline" style={{ color: '#6B7280' }}>
            {isAr ? 'مبلغ آخر' : 'Custom amount'}
          </button>

          {/* Disclaimer */}
          <p className="text-xs mt-3" style={{ color: '#9CA3AF' }}>
            {isAr
              ? 'التبرع طوعي تماماً. التعافي مجاني وسيبقى مجانياً.'
              : 'Donation is entirely voluntary. Recovery is free and will remain free.'}
          </p>
        </div>
      </div>
    </div>
  );
}
