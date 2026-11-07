import { checkProtocolAccess } from '@/lib/protocol-access';
import AlternativeCodeClient from './AlternativeCodeClient';
import AlternativeCodeLanding from './AlternativeCodeLanding';

export const dynamic = 'force-dynamic';

export default async function AlternativeCodePage() {
  const access = await checkProtocolAccess('alternative-code');

  return access.hasAccess ? (
    <AlternativeCodeClient />
  ) : (
    <AlternativeCodeLanding />
  );
}
