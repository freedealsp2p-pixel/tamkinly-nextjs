import { checkProtocolAccess } from '@/lib/protocol-access';
import WhiteMirrorClient from './WhiteMirrorClient';
import WhiteMirrorLanding from './WhiteMirrorLanding';

export const dynamic = 'force-dynamic';

export default async function WhiteMirrorPage() {
  const access = await checkProtocolAccess('white-mirror');

  return access.hasAccess ? (
    <WhiteMirrorClient />
  ) : (
    <WhiteMirrorLanding />
  );
}
