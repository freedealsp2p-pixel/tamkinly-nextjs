import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Get all access codes (admin only - simple password protection)
export async function GET(request: NextRequest) {
  try {
    const password = request.nextUrl.searchParams.get('password');

    // Simple password protection (in production, use proper auth)
    if (password !== 'tamkinly2024') {
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

    if (password !== 'tamkinly2024') {
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
