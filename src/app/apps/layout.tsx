'use client';

import { AppAccessGuard } from '@/components/AppAccessGuard';

export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppAccessGuard>
      {children}
    </AppAccessGuard>
  );
}
