import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminPassword } from '@/lib/admin-auth';

// Extract password from Authorization header or query param (deprecated)
function extractCredentials(request: NextRequest): string | null {
  // Primary: check Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    // Support both "Bearer <password>" and raw password
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.slice(7);
    }
    return authHeader;
  }

  // Deprecated: check query param with warning
  const queryPassword = request.nextUrl.searchParams.get('password');
  if (queryPassword) {
    console.warn('[Security] Password in query string is deprecated. Use Authorization header instead.');
    return queryPassword;
  }

  return null;
}

// Get all access codes (admin only - simple password protection)
export async function GET(request: NextRequest) {
  try {
    const password = extractCredentials(request);

    // Use unified admin password verification
    if (!verifyAdminPassword(password || '')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
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
      // Return empty codes array if database error
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

// Delete an access code
export async function DELETE(request: NextRequest) {
  try {
    const { id, password } = await request.json();

    if (!verifyAdminPassword(password || '')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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
