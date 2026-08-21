import type { Metadata } from 'next';
import { RecoveryShell } from '@/components/recovery/system';

export const metadata: Metadata = {
  title: 'Recovery Center | Tamkinly',
  description:
    'Specialized recovery paths for building a more stable foundation for change. Trauma-informed tools and evidence-based recovery frameworks.',
  robots: { index: true, follow: true },
};

export default function RecoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RecoveryShell>{children}</RecoveryShell>;
}
