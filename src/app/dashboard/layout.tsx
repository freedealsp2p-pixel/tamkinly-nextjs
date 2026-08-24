import type { Metadata } from 'next';
import { DASHBOARD_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = DASHBOARD_METADATA;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
