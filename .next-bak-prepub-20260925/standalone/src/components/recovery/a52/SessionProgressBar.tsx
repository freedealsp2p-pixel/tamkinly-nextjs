'use client';

import { VISUAL } from '@/lib/recovery/a52/constants';

interface SessionProgressBarProps {
  progress: number; // 0-100
}

export function SessionProgressBar({ progress }: SessionProgressBarProps) {
  return (
    <div className="w-full h-1 bg-[#E5E7EB] overflow-hidden">
      <div
        className="h-full bg-[#1F6F78] transition-all duration-500 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}

export default SessionProgressBar;
