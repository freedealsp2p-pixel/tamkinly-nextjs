import { NextResponse } from 'next/server';
import { checkProtocolAccess } from '@/lib/protocol-access';

export async function GET(request: Request) {
  try {
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
