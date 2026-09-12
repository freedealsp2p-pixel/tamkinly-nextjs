import { NextRequest, NextResponse } from 'next/server';
import { checkProtocolAccess } from '@/lib/protocol-access';
import { applySecurity, API_RATE_LIMIT } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    // PRIVACY/SECURITY: throttle code probing on this endpoint
    const securityBlocked = await applySecurity(request, API_RATE_LIMIT);
    if (securityBlocked) return securityBlocked;

    const { searchParams } = new URL(request.url);
    const accessCode = searchParams.get('code') || undefined;

    const result = await checkProtocolAccess('temporal-decoupling', {
      accessCode,
    });

    // Never expose internal reasons to the client
    return NextResponse.json({
      hasAccess: result.hasAccess,
      protocolSlug: result.protocolSlug,
    });
  } catch (error) {
    console.error('Protocol access check error:', error);
    return NextResponse.json(
      { hasAccess: false, protocolSlug: 'temporal-decoupling' },
      { status: 500 }
    );
  }
}
