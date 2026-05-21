import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata('aiCoach');

export default function AppPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
