'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';
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

export type RecoveryProgram = 'trc' | 'porn-recovery';

export interface SafetyResponseProps {
  assetId: string;
  program: RecoveryProgram;
  fallbackHref?: string;
  className?: string;
}

function getDefaultFallback(program: RecoveryProgram): string {
  return program === 'trc' ? '/recovery/trc' : '/recovery/porn-recovery';
}

function getSimplerExerciseRoute(program: RecoveryProgram): string {
  return program === 'trc' ? '/recovery/trc/grounding' : '/recovery/porn-recovery#toolkit';
}

function getReadingRoute(program: RecoveryProgram): string {
  return program === 'trc' ? '/recovery/trc/what-trauma-does-to-the-body' : '/recovery/porn-recovery#brain';
}

export function SafetyResponse({
  assetId,
  program,
  fallbackHref,
  className,
}: SafetyResponseProps) {
  const router = useRouter();
  const { direction } = useLocale();
  const t = useTranslations('recoveryAssets.' + (assetId || 'default') + '.safety');
  const [open, setOpen] = useState(false);

  const resolvedFallback = fallbackHref || getDefaultFallback(program);

  const isRtl = direction === 'rtl';
  const positionClass = isRtl ? 'left-6' : 'right-6';

  const handleOption1 = useCallback(() => {
    setOpen(false);
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(resolvedFallback);
    }
  }, [router, resolvedFallback]);

  const handleOption2 = useCallback(() => {
    setOpen(false);
    router.push(getSimplerExerciseRoute(program));
  }, [router, program]);

  const handleOption3 = useCallback(() => {
    setOpen(false);
    router.push(getReadingRoute(program));
  }, [router, program]);

  const buttonText = t('notFeelingSafe') || '\u0644\u0627 \u0623\u0634\u0639\u0631 \u0628\u0627\u0644\u0631\u0627\u062d\u0629';
  const stopMessage = t('stopMessage') || '\u0644\u0627 \u0628\u0623\u0633\u060c \u062a\u0648\u0642\u0641\u0651. \u062e\u0630 \u0646\u0641\u0633\u064b\u0627 \u0637\u0628\u064a\u0639\u064a\u064b\u0627.';
  const option1Text = t('option1') || '\u0623\u0631\u064a\u062f \u0627\u0644\u062a\u0648\u0642\u0641 \u0627\u0644\u0622\u0646';
  const option2Text = t('option2') || '\u0623\u0631\u064a\u062f \u0627\u0644\u0639\u0648\u062f\u0629 \u0625\u0644\u0649 \u062a\u0645\u0631\u064a\u0646 \u0623\u0628\u0633\u0637';
  const option3Text = t('option3') || '\u0623\u0631\u064a\u062f \u0642\u0631\u0627\u0621\u0629 \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0628\u062f\u0644\u0627\u064b \u0645\u0646 \u0627\u0644\u0645\u062a\u0627\u0628\u0639\u0629';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={buttonText}
        className={[
          'fixed bottom-6 z-50',
          'flex items-center gap-2 rounded-full px-5 py-3',
          'text-sm font-semibold text-white shadow-lg',
          'bg-[#E8685A] hover:bg-[#d4574a]',
          'transition-all duration-200 hover:shadow-xl active:scale-[0.98]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#E8685A]',
          'animate-safety-pulse',
          positionClass,
          className ?? '',
        ].join(' ')}
      >
        <ShieldAlert className="w-4 h-4" />
        <span>{buttonText}</span>
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#0F1C2E]">
              {buttonText}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#0F1C2E]/70 text-base">
              {stopMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction
              onClick={handleOption1}
              className="w-full justify-center bg-[#1F6F78] text-white hover:bg-[#1a5e66]"
            >
              {option1Text}
            </AlertDialogAction>
            <AlertDialogAction
              onClick={handleOption2}
              className="w-full justify-center bg-[#1F6F78] text-white hover:bg-[#1a5e66]"
            >
              {option2Text}
            </AlertDialogAction>
            <AlertDialogAction
              onClick={handleOption3}
              className="w-full justify-center bg-[#1F6F78] text-white hover:bg-[#1a5e66]"
            >
              {option3Text}
            </AlertDialogAction>
            <AlertDialogCancel className="w-full border-0 bg-slate-100 text-slate-700 hover:bg-slate-200">
              {t('stay') || '\u0623\u0628\u0642\u0649 \u0647\u0646\u0627'}
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SafetyResponse;
