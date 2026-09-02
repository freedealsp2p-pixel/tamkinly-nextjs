import { NextRequest, NextResponse } from 'next/server';
import { grantProtocolAccess, listProtocolAccess, revokeProtocolAccess, VALID_PROTOCOL_SLUGS, type ProtocolSlug } from '@/lib/protocol-access';
import { requireAdmin } from '@/lib/auth-helpers';

/**
 * Admin API for managing protocol entitlements.
 * Auth: JWT admin session (same as other admin endpoints).
 */

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const protocolSlug = searchParams.get('protocolSlug') || undefined;
  const email = searchParams.get('email') || undefined;

  try {
    const records = await listProtocolAccess({
      protocolSlug: protocolSlug || undefined,
      email: email || undefined,
    });
    return NextResponse.json({ records });
  } catch (error) {
    console.error('List protocol access error:', error);
    return NextResponse.json({ error: 'Failed to list records' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { email, protocolSlug, customerName } = body;

    if (!email || !protocolSlug) {
      return NextResponse.json(
        { error: 'email and protocolSlug are required' },
        { status: 400 }
      );
    }

    if (!VALID_PROTOCOL_SLUGS.includes(protocolSlug)) {
      return NextResponse.json(
        { error: `Invalid protocol. Must be one of: ${VALID_PROTOCOL_SLUGS.join(', ')}` },
        { status: 400 }
      );
    }

    const result = await grantProtocolAccess({
      email,
      protocolSlug: protocolSlug as ProtocolSlug,
      customerName: customerName || undefined,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    return NextResponse.json({
      success: true,
      code: result.code,
      email,
      protocolSlug,
    });
  } catch (error) {
    console.error('Grant protocol access error:', error);
    return NextResponse.json({ error: 'Failed to grant access' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  try {
    await revokeProtocolAccess(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Revoke protocol access error:', error);
    return NextResponse.json({ error: 'Failed to revoke access' }, { status: 500 });
  }
}
