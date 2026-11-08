'use client';

import { VISUAL } from '@/lib/recovery/a52/constants';

interface SessionProgressBarProps {
  progress: number; // 0-100
}

export function SessionProgressBar({ progress }: SessionProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  return (
    <div
      className="w-full h-1 bg-[#E5E7EB] overflow-hidden"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      aria-label="Session progress"
    >
      <div
        className="h-full bg-[#1F6F78] transition-all duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export default SessionProgressBar;
