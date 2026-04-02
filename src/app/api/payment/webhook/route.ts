import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tahweelPayment } from '@/lib/tahweel-payment';

// POST - Handle webhook from Tahweel payment gateway
export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('x-tahweel-signature') || '';

    // Verify webhook signature
    if (!tahweelPayment.verifyWebhookSignature(rawBody, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const payload = JSON.parse(rawBody);
    const { 
      paymentId, 
      orderId, 
      status, 
      amount, 
      currency, 
      customerEmail,
      metadata,
    } = payload;

    console.log('Webhook received:', { paymentId, orderId, status });

    // Handle different payment statuses
    switch (status) {
      case 'completed':
        await handlePaymentSuccess({
          paymentId,
          orderId,
          amount,
          currency,
          customerEmail,
          metadata,
        });
        break;

      case 'failed':
        await handlePaymentFailed({ orderId, paymentId });
        break;

      case 'cancelled':
        await handlePaymentCancelled({ orderId, paymentId });
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
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  metadata?: Record<string, string>;
}) {
  const { paymentId, orderId, amount, customerEmail, metadata } = data;

  // Check if order already processed
  const existingOrder = await db.order.findFirst({
    where: { orderNumber: orderId },
  });

  if (existingOrder && existingOrder.status === 'completed') {
    console.log('Order already processed:', orderId);
    return;
  }

  // Generate access code
  const accessCode = generateAccessCode();

  // Determine tier based on amount or metadata
  const tier = getTierFromAmount(amount);

  // Create or update order
  if (existingOrder) {
    await db.order.update({
      where: { id: existingOrder.id },
      data: {
        status: 'completed',
        paymentId,
      },
    });
  } else {
    await db.order.create({
      data: {
        orderNumber: orderId,
        customerEmail: customerEmail.toLowerCase(),
        status: 'completed',
        subtotal: amount,
        total: amount,
        paymentId,
        items: {
          create: {
            productId: metadata?.productId || 'unknown',
            name: metadata?.productName || 'Product',
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
      productId: metadata?.productId || 'bundle',
      tier,
      isUsed: false,
      isActive: true,
    },
  });

  console.log('Payment success processed:', { orderId, accessCode });
}

async function handlePaymentFailed(data: { orderId: string; paymentId: string }) {
  const existingOrder = await db.order.findFirst({
    where: { orderNumber: data.orderId },
  });

  if (existingOrder) {
    await db.order.update({
      where: { id: existingOrder.id },
      data: { status: 'failed' },
    });
  }

  console.log('Payment failed:', data.orderId);
}

async function handlePaymentCancelled(data: { orderId: string; paymentId: string }) {
  const existingOrder = await db.order.findFirst({
    where: { orderNumber: data.orderId },
  });

  if (existingOrder) {
    await db.order.update({
      where: { id: existingOrder.id },
      data: { status: 'cancelled' },
    });
  }

  console.log('Payment cancelled:', data.orderId);
}

function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = 3;
  const segmentLength = 4;
  
  const codeSegments = [];
  for (let i = 0; i < segments; i++) {
    let segment = '';
    for (let j = 0; j < segmentLength; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    codeSegments.push(segment);
  }
  
  return `TMLY-${codeSegments.join('-')}`;
}

function getTierFromAmount(amount: number): 'TRIAL' | 'BASIC' | 'PREMIUM' | 'BUNDLE' {
  if (amount <= 7) return 'TRIAL';
  if (amount <= 17) return 'BASIC';
  if (amount <= 27) return 'PREMIUM';
  return 'BUNDLE';
}
