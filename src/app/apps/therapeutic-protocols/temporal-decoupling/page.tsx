import { checkProtocolAccess } from '@/lib/protocol-access';
import TemporalDecouplingClient from './TemporalDecouplingClient';
import TemporalDecouplingLanding from './TemporalDecouplingLanding';

/**
 * Server Component — checks entitlement before rendering.
 * Unauthorized users see the premium product landing page.
 * Authorized users see the therapeutic session.
 */
export const dynamic = 'force-dynamic';

export default async function TemporalDecouplingPage() {
  const access = await checkProtocolAccess('temporal-decoupling');

  return access.hasAccess ? (
    <TemporalDecouplingClient />
  ) : (
    <TemporalDecouplingLanding />
  );
}
