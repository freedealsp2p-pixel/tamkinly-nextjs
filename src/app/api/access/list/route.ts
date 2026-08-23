import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/admin-auth-jwt';

// Extract credentials from Authorization header ONLY (no query string)
function extractCredentials(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return null;
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  return authHeader;
}

// Get all access codes (admin only)
export async function GET(request: NextRequest) {
  try {
    // Prefer JWT session, fall back to Authorization header password
    const session = await getAdminSession();
    if (!session) {
      const creds = extractCredentials(request);
      if (!creds) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }
      const { verifyAdminPassword } = await import('@/lib/admin-auth');
      if (!verifyAdminPassword(creds)) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    try {
      const codes = await db.appAccess.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({
        success: true,
        codes: codes.map(code => ({
          id: code.id,
          code: code.code,
          email: code.email,
          customerName: code.customerName,
          productId: code.productId,
          tier: code.tier,
          orderId: code.orderId,
          isUsed: code.isUsed,
          usedAt: code.usedAt,
          expiresAt: code.expiresAt,
          createdAt: code.createdAt,
        })),
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({
        success: true,
        codes: [],
        warning: 'Database connection issue - showing empty list'
      });
    }
  } catch (error) {
    console.error('List codes error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch codes' },
      { status: 500 }
    );
  }
}

// Delete an access code (admin only - JWT required)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Access code ID is required' },
        { status: 400 }
      );
    }

    await db.appAccess.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Code deleted successfully',
    });
  } catch (error) {
    console.error('Delete code error:', error);
    return NextResponse.json(
      { error: 'Failed to delete code' },
      { status: 500 }
    );
  }
}
