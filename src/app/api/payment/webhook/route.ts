import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST - Handle webhook from payment gateways (Skrill, Tahweel, etc.)
export async function POST(request: NextRequest) {
  try {
    // Get raw body
    const rawBody = await request.text();
    
    // Parse webhook payload
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      // Try form data
      const formData = new URLSearchParams(rawBody);
      payload = Object.fromEntries(formData);
    }

    const { 
      paymentId, 
      orderId, 
      orderNumber,
      status, 
      amount, 
      currency, 
      customerEmail,
      customer_id,
      transaction_id,
      metadata,
    } = payload;

    console.log('Webhook received:', { paymentId, orderId, orderNumber, status, customerEmail, customer_id });

    // Determine customer email
    const email = customerEmail || customer_id || metadata?.customerEmail;
    
    if (!email) {
      console.error('No customer email in webhook payload');
      return NextResponse.json({ error: 'Missing customer email' }, { status: 400 });
    }

    // Handle different payment statuses
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'processed':
      case 'success':
        await handlePaymentSuccess({
          paymentId: paymentId || transaction_id,
          orderId: orderId || orderNumber,
          amount: parseFloat(amount) || 0,
          currency: currency || 'USD',
          customerEmail: email,
          metadata,
        });
        break;

      case 'failed':
      case 'error':
        await handlePaymentFailed({ orderId: orderId || orderNumber, paymentId });
        break;

      case 'cancelled':
      case 'canceled':
        await handlePaymentCancelled({ orderId: orderId || orderNumber, paymentId });
        break;

      default:
        console.log('Unknown payment status:', status);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(data: {
  paymentId?: string;
  orderId?: string;
  amount: number;
  currency: string;
  customerEmail: string;
  metadata?: Record<string, string>;
}) {
  const { paymentId, orderId, amount, customerEmail, metadata } = data;

  // Check if order already exists
  const existingOrder = orderId ? await db.order.findFirst({
    where: { orderNumber: orderId },
  }) : null;

  if (existingOrder && existingOrder.status === 'COMPLETED') {
    console.log('Order already processed:', orderId);
    return;
  }

  // Generate access code
  const accessCode = generateAccessCode();

  // Determine tier based on amount
  const tier = getTierFromAmount(amount);

  // Determine product ID
  const productId = metadata?.productId || getProductIdFromAmount(amount);

  if (existingOrder) {
    // Update existing order
    await db.order.update({
      where: { id: existingOrder.id },
      data: {
        status: 'COMPLETED',
        paymentId: paymentId || existingOrder.paymentId,
        paidAt: new Date(),
        fulfilledAt: new Date(),
      },
    });
  } else {
    // Create new order
    const newOrderNumber = orderId || `TMLY-${Date.now().toString(36).toUpperCase()}`;
    
    await db.order.create({
      data: {
        orderNumber: newOrderNumber,
        customerEmail: customerEmail.toLowerCase(),
        status: 'COMPLETED',
        subtotal: amount,
        total: amount,
        paymentId: paymentId,
        paymentMethod: 'skrill',
        paidAt: new Date(),
        fulfilledAt: new Date(),
        items: {
          create: {
            productId: productId,
            productName: getProductName(productId),
            price: amount,
            quantity: 1,
          },
        },
      },
    });
  }

  // Create access code
  await db.appAccess.create({
    data: {
      code: accessCode,
      email: customerEmail.toLowerCase(),
      productId,
      tier,
      isUsed: false,
      isActive: true,
    },
  });

  console.log('Payment success processed:', { orderId, accessCode, customerEmail });

  // TODO: Send email with access code
}

async function handlePaymentFailed(data: { orderId?: string; paymentId?: string }) {
  if (!data.orderId) return;

  const existingOrder = await db.order.findFirst({
    where: { orderNumber: data.orderId },
  });

  if (existingOrder) {
    await db.order.update({
      where: { id: existingOrder.id },
      data: { status: 'CANCELLED' },
    });
  }

  console.log('Payment failed:', data.orderId);
}

async function handlePaymentCancelled(data: { orderId?: string; paymentId?: string }) {
  if (!data.orderId) return;

  const existingOrder = await db.order.findFirst({
    where: { orderNumber: data.orderId },
  });

  if (existingOrder) {
    await db.order.update({
      where: { id: existingOrder.id },
      data: { status: 'CANCELLED' },
    });
  }

  console.log('Payment cancelled:', data.orderId);
}

function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `TMLY-${segment()}-${segment()}`;
}

function getTierFromAmount(amount: number): 'TRIAL' | 'BASIC' | 'PREMIUM' | 'BUNDLE' {
  if (amount <= 7) return 'TRIAL';
  if (amount <= 17) return 'BASIC';
  if (amount <= 27) return 'PREMIUM';
  return 'BUNDLE';
}

function getProductIdFromAmount(amount: number): string {
  if (amount <= 7) return 'trial';
  if (amount <= 17) return 'planner';
  if (amount <= 27) return 'premium';
  return 'bundle';
}

function getProductName(productId: string): string {
  const names: Record<string, string> = {
    'trial': '7-Day Trial',
    'planner': 'Identity Recode Planner',
    'premium': 'Premium Transformation',
    'bundle': 'Complete Bundle',
  };
  return names[productId] || 'Tamkinly Product';
}
