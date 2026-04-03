import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdminPassword } from '@/lib/admin-auth';

// Get all orders
export async function GET(request: NextRequest) {
  try {
    const password = request.nextUrl.searchParams.get('password');
    
    if (!verifyAdminPassword(password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const status = request.nextUrl.searchParams.get('status') || '';
    const search = request.nextUrl.searchParams.get('search') || '';

    const where: {
      status?: string;
      OR?: Array<{ email: { contains: string; mode: 'insensitive' } } | { wooOrderId: { contains: string; mode: 'insensitive' } }>;
    } = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { wooOrderId: { contains: search, mode: 'insensitive' } },
      ];
    }

    const orders = await db.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { id: true },
        },
      },
    });

    // Get access codes for each order
    const ordersWithCodes = await Promise.all(
      orders.map(async (order) => {
        const accessCodes = await db.appAccess.findMany({
          where: { orderId: order.wooOrderId || undefined },
          select: {
            code: true,
            tier: true,
            isUsed: true,
          },
        });

        return {
          id: order.id,
          email: order.email,
          status: order.status,
          total: order.total,
          currency: order.currency,
          paymentMethod: order.paymentMethod,
          paymentId: order.paymentId,
          wooOrderId: order.wooOrderId,
          createdAt: order.createdAt,
          accessCodes,
        };
      })
    );

    return NextResponse.json({
      success: true,
      orders: ordersWithCodes,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
