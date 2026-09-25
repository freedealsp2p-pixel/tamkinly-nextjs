'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { Phone } from 'lucide-react';
import Link from 'next/link';

/**
 * Crisis Resource Bar — persistent, subtle, non-intrusive
 * Fixed bottom bar on all TRC pages with emergency contact info.
 * Design: Muted colors, small text, not alarming.
 * Links to TRC landing (safety) when clicked.
 */
export default function CrisisBar() {
  const { locale, direction } = useLocale();
  const isAr = locale === 'ar';

  return (
    <Link
      href="/recovery/trc"
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-2 py-1.5 text-xs bg-[#0F1C2E]/[0.03] border-t border-[#0F1C2E]/[0.06] text-[#0F1C2E]/40 hover:text-[#0F1C2E]/60 hover:bg-[#0F1C2E]/[0.05] transition-colors"
      dir={direction}
      aria-label={isAr ? 'العودة إلى مركز التعافي من الصدمات' : 'Return to Trauma Recovery Center'}
    >
      <Phone className="w-3 h-3" />
      <span>
        {isAr
          ? 'إذا كنت في أزمة: اتصل 911 أو الخط المحلي'
          : "If you're in crisis: Call 911 or your local hotline"}
      </span>
    </Link>
  );
}
