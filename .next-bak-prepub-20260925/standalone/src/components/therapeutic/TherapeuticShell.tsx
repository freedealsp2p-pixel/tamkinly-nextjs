'use client';

import { TherapeuticExit } from '@/components/recovery/system';
import type { TherapeuticExitProps } from '@/components/recovery/system';

interface TherapeuticShellProps {
  children: React.ReactNode;
  /**
   * 'standard'     -> plain shell (content only, no header).
   * 'therapeutic'  -> immersive exercise shell; auto-renders a floating
   *                    TherapeuticExit (exit arrow with confirmation dialog).
   *
   * Unlike RecoveryShell, this does NOT render RecoveryHeader because
   * therapeutic protocols live under /apps/, not /recovery/.
   * The apps layout provides its own navigation.
   */
  sectionType?: 'standard' | 'therapeutic';
  /** Props forwarded to TherapeuticExit when sectionType is 'therapeutic' */
  exitProps?: Omit<TherapeuticExitProps, 'className'>;
}

/**
 * TherapeuticShell
 *
 * A generalized therapeutic experience shell shared by both:
 *   1. Free recovery exercises (under /recovery/)
 *   2. Paid therapeutic protocols (under /apps/therapeutic-protocols/)
 *
 * Reuses the proven TherapeuticExit component from the recovery system
 * without duplicating its logic.
 *
 * Color scheme uses Tamkinly official identity:
 *   Navy  #0F1C2E, Teal #1F6F78, Mint #3DD4B0, Danger #E8685A
 */
export function TherapeuticShell({
  children,
  sectionType = 'standard',
  exitProps,
}: TherapeuticShellProps) {
  return (
    <div className="min-h-screen bg-white">
      <main>{children}</main>
      {sectionType === 'therapeutic' && (
        <TherapeuticExit
          fallbackHref="/apps/therapeutic-protocols"
          {...exitProps}
        />
      )}
    </div>
  );
}

export default TherapeuticShell;
