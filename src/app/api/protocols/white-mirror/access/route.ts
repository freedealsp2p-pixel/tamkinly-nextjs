import { NextResponse } from 'next/server';
import { checkProtocolAccess } from '@/lib/protocol-access';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accessCode = searchParams.get('code') || undefined;

    const result = await checkProtocolAccess('white-mirror', {
      accessCode,
    });

    return NextResponse.json({
      hasAccess: result.hasAccess,
      protocolSlug: result.protocolSlug,
    });
  } catch (error) {
    console.error('Protocol access check error:', error);
    return NextResponse.json(
      { hasAccess: false, protocolSlug: 'white-mirror' },
      { status: 500 }
    );
  }
}
