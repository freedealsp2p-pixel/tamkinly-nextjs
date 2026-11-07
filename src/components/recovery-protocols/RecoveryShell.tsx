'use client';

import { TherapeuticExit } from '@/components/recovery/system';
import type { TherapeuticExitProps } from '@/components/recovery/system';

interface RecoveryShellProps {
  children: React.ReactNode;
  /**
   * 'standard'     -> plain shell (content only, no header).
   * 'recovery'  -> immersive exercise shell; auto-renders a floating
   *                    TherapeuticExit (exit arrow with confirmation dialog).
   *
   * Unlike RecoveryShell, this does NOT render RecoveryHeader because
   * recovery protocols live under /apps/, not /recovery/.
   * The apps layout provides its own navigation.
   */
  sectionType?: 'standard' | 'recovery';
  /** Props forwarded to TherapeuticExit when sectionType is 'recovery' */
  exitProps?: Omit<TherapeuticExitProps, 'className'>;
}

/**
 * RecoveryShell
 *
 * A generalized recovery experience shell shared by both:
 *   1. Free recovery exercises (under /recovery/)
 *   2. Paid recovery protocols (under /apps/recovery-protocols/)
 *
 * Reuses the proven TherapeuticExit component from the recovery system
 * without duplicating its logic.
 *
 * Color scheme uses Tamkinly official identity:
 *   Navy  #0F1C2E, Teal #1F6F78, Mint #3DD4B0, Danger #E8685A
 */
export function RecoveryShell({
  children,
  sectionType = 'standard',
  exitProps,
}: RecoveryShellProps) {
  return (
    <div className="min-h-screen bg-white">
      <main>{children}</main>
      {sectionType === 'recovery' && (
        <TherapeuticExit
          fallbackHref="/apps/recovery-protocols"
          {...exitProps}
        />
      )}
    </div>
  );
}

export default RecoveryShell;
