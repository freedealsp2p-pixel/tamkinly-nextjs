'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

/**
 * TherapeuticExit
 *
 * A floating exit-arrow button for therapeutic (immersive) recovery exercises.
 * - Click the button (or press Escape) to open a confirmation dialog.
 * - Confirming navigates back (router.back), with a safe fallback if there is
 *   no browser history.
 * - Uses shadcn/ui AlertDialog.
 * - Color scheme: primary #1F6F78 (trigger) / accent #3DD4B0 (confirm action).
 * - Mirrors to bottom-left in RTL locales.
 */
export interface TherapeuticExitProps {
  /** Optional override for the trigger label (defaults to translated "Exit"). */
  label?: string;
  /** Optional custom confirm handler (defaults to router.back() with fallback). */
  onConfirm?: () => void;
  /** Destination used when there is no browser history. Defaults to '/recovery/trc'. */
  fallbackHref?: string;
  /** Extra classes applied to the floating trigger button. */
  className?: string;
}

export function TherapeuticExit({
  label,
  onConfirm,
  fallbackHref = '/recovery/trc',
  className,
}: TherapeuticExitProps) {
  const router = useRouter();
  const { direction } = useLocale();
  const t = useTranslations('recoveryNav.exit');
  const [open, setOpen] = useState(false);

  const handleConfirm = useCallback(() => {
    setOpen(false);
    if (onConfirm) {
      onConfirm();
      return;
    }
    // Prefer browser back; fall back to a safe destination when there's no history.
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }, [onConfirm, router, fallbackHref]);

  // Escape key opens the exit confirmation dialog (Radix handles closing on Escape when open).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const isRtl = direction === 'rtl';
  const ExitArrow = isRtl ? ArrowRight : ArrowLeft;
  // bottom-right in LTR; mirror to bottom-left in RTL.
  const positionClass = isRtl ? 'left-6' : 'right-6';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t('label')}
        className={[
          'fixed bottom-6 z-50',
          'flex items-center gap-2 rounded-full px-5 py-3',
          'text-sm font-semibold text-white shadow-lg',
          'bg-[#1F6F78] hover:bg-[#1a5e66]',
          'transition-all duration-200 hover:shadow-xl active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1F6F78]',
          positionClass,
          className ?? '',
        ].join(' ')}
      >
        <ExitArrow className="w-4 h-4" />
        <span>{label ?? t('label')}</span>
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('confirm')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-0 bg-slate-100 text-slate-700 hover:bg-slate-200">
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
            >
              {t('leave')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default TherapeuticExit;
