'use client';

import { RecoveryHeader } from './RecoveryHeader';
import { TherapeuticExit } from './TherapeuticExit';

interface RecoveryShellProps {
  children: React.ReactNode;
  /**
   * 'standard'  -> plain shell (header + content).
   * 'therapeutic' -> immersive exercise shell; auto-renders a floating
   *   TherapeuticExit (exit arrow with confirmation dialog) at bottom-right.
   */
  sectionType?: 'standard' | 'therapeutic';
}

export function RecoveryShell({
  children,
  sectionType = 'standard',
}: RecoveryShellProps) {
  return (
    <div className="min-h-screen bg-white">
      <RecoveryHeader />
      <main>{children}</main>
      {sectionType === 'therapeutic' && <TherapeuticExit />}
    </div>
  );
}
