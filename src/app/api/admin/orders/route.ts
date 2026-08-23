import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/admin-auth-jwt';

// Get all orders
export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const status = request.nextUrl.searchParams.get('status') || '';
    const search = request.nextUrl.searchParams.get('search') || '';

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (status) {
      where.status = status.toUpperCase();
    }

    if (search) {
      where.OR = [
        { customerEmail: { contains: search.toLowerCase() } },
        { customerName: { contains: search } },
        { orderNumber: { contains: search.toUpperCase() } },
      ];
    }

    const orders = await db.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });

    const ordersWithCodes = await Promise.all(
      orders.map(async (order) => {
        const accessCodes = await db.appAccess.findMany({
          where: { email: order.customerEmail },
          select: { code: true, tier: true, isUsed: true, productId: true },
        });
        return {
          id: order.id, orderNumber: order.orderNumber, email: order.customerEmail,
          customerName: order.customerName, status: order.status, total: order.total,
          currency: order.currency, paymentMethod: order.paymentMethod, paymentId: order.paymentId,
          transactionId: order.transactionId, notes: order.notes, items: order.items,
          createdAt: order.createdAt, accessCodes,
        };
      })
    );

    return NextResponse.json({ success: true, orders: ordersWithCodes });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// Create new order
export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { customerEmail, customerName, items, total, paymentMethod, transactionId, notes } = body;

    if (!customerEmail || !items || items.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orderNumber = `TMLY-${Date.now().toString(36).toUpperCase()}`;

    const order = await db.order.create({
      data: {
        orderNumber, customerEmail: customerEmail.toLowerCase(), customerName,
        subtotal: total, total, paymentMethod: paymentMethod || 'skrill',
        transactionId, notes, status: 'PENDING',
        items: {
          create: items.map((item: { productId: string; productName: string; price: number; quantity?: number }) => ({
            productId: item.productId, productName: item.productName, price: item.price, quantity: item.quantity || 1,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ success: true, order: { id: order.id, orderNumber: order.orderNumber, status: order.status } });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

// Update order status
export async function PUT(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { orderId, status, generateCode } = body;

    const updateData: { status: "PENDING"|"PROCESSING"|"COMPLETED"|"CANCELLED"|"REFUNDED"; fulfilledAt?: Date; paidAt?: Date } = { status: status as "PENDING"|"PROCESSING"|"COMPLETED"|"CANCELLED"|"REFUNDED" };
    if (status === 'COMPLETED') {
      updateData.fulfilledAt = new Date();
      updateData.paidAt = new Date();
    }

    const order = await db.order.update({ where: { id: orderId }, data: updateData });

    if (generateCode && status === 'COMPLETED') {
      const orderWithItems = await db.order.findUnique({ where: { id: orderId }, include: { items: true } });
      if (orderWithItems && orderWithItems.items.length > 0) {
        for (const item of orderWithItems.items) {
          const code = generateAccessCode();
          const tier = getTierFromProductId(item.productId);
          await db.appAccess.create({
            data: {
              code, email: orderWithItems.customerEmail.toLowerCase(),
              customerName: orderWithItems.customerName || '', productId: item.productId,
              tier, orderId: orderWithItems.orderNumber, isUsed: false, isActive: true,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `TMLY-${segment()}-${segment()}`;
}

function getTierFromProductId(productId: string): 'BASIC' | 'PREMIUM' | 'MASTERY' {
  const tierMap: Record<string, 'BASIC' | 'PREMIUM' | 'MASTERY'> = {
    'trial': 'BASIC', 'planner': 'BASIC', 'basic': 'BASIC',
    'premium': 'PREMIUM',
    'bundle': 'MASTERY', 'mastery': 'MASTERY',
  };
  return tierMap[productId.toLowerCase()] || 'BASIC';
}
