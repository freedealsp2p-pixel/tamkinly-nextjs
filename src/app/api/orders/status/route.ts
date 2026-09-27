import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { applySecurity, API_RATE_LIMIT } from '@/lib/security';

// POST /api/orders/status — self-service order status lookup
// Privacy: requires BOTH exact order number AND the email used on the order.
export async function POST(request: NextRequest) {
  try {
    const securityBlocked = await applySecurity(request, API_RATE_LIMIT);
    if (securityBlocked) return securityBlocked;

    const body = await request.json();
    const orderNumber = typeof body.orderNumber === 'string' ? body.orderNumber.trim().toUpperCase() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!orderNumber || !email) {
      return NextResponse.json({ error: 'Order number and email are required' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const order = await db.order.findFirst({
      where: { orderNumber, customerEmail: email },
      include: { items: { select: { productName: true, price: true, quantity: true } } },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const accessCodesCount = await db.appAccess.count({
      where: {
        isActive: true,
        OR: [{ orderId: order.orderNumber }, { orderId: order.id }, { email: order.customerEmail }],
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        orderNumber: order.orderNumber,
        status: order.status,
        createdAt: order.createdAt,
        paidAt: order.paidAt,
        total: order.total,
        currency: order.currency,
        items: order.items,
        accessCodesCount,
      },
    });
  } catch (error) {
    console.error('Order status lookup error:', error);
    return NextResponse.json({ error: 'Failed to look up order' }, { status: 500 });
  }
}
