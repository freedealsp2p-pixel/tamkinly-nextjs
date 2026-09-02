'use client';

import { useState, useEffect } from 'react';
import type { ProtocolSlug } from '@/lib/protocol-access';

interface ProtocolGateProps {
  protocolSlug: ProtocolSlug;
  /** Server-provided access status — avoids client-only checks */
  serverHasAccess: boolean;
  children: React.ReactNode;
  /** The landing page component to show if no access */
  landingContent: React.ReactNode;
}

/**
 * ProtocolGate — Renders children only if user has protocol access.
 * serverHasAccess comes from the server component (not client-side state).
 * This is the single gate point for each protocol page.
 */
export function ProtocolGate({
  serverHasAccess,
  children,
  landingContent,
}: ProtocolGateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent flash of unauthorized content during hydration
  if (!mounted) {
    return null;
  }

  if (serverHasAccess) {
    return <>{children}</>;
  }

  return <>{landingContent}</>;
}

export default ProtocolGate;
