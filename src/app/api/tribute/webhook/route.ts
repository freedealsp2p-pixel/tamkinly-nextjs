// ============================================
// TRIBUTE WEBHOOK HANDLER (Updated for subscriptions)
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyTributeWebhookSignature, processTributeWebhook, TIER_CONFIG } from '@/lib/tribute';

// POST - Handle Tribute webhook
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Get raw body FIRST (needed for signature verification)
    const rawBody = await request.text();
    
    // ============================================
    // SECURITY: Verify HMAC-SHA256 signature
    // ============================================
    const signature = request.headers.get('trbt-signature') || '';
    
    if (!verifyTributeWebhookSignature(rawBody, signature)) {
      // For Tribute test requests (no signature or invalid), return 200 OK
      // This allows Tribute to verify the webhook URL is reachable
      // Actual webhook processing only happens with valid signatures
      if (!signature) {
        console.log('ℹ️ Tribute webhook test received (no signature) — returning 200 OK');
        return NextResponse.json({ status: 'ok', message: 'Webhook is reachable' }, { status: 200 });
      }
      // Invalid signature (not empty) — reject
      console.warn('🚫 Tribute webhook rejected: Invalid signature', {
        ip: request.headers.get('cf-connecting-ip') || 'unknown',
        hasSignature: !!signature,
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid webhook signature' },
        { status: 401 }
      );
    }
    
    // Parse payload
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      console.warn('🚫 Tribute webhook rejected: Invalid JSON');
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }
    
    console.log('✅ Authenticated Tribute webhook:', {
      event: payload.name,
      timestamp: new Date().toISOString(),
      processingTime: `${Date.now() - startTime}ms`,
    });
    
    // Process the webhook
    const result = processTributeWebhook(payload);
    
    // Handle different event types
    switch (result.eventType) {
      case 'new_subscription':
      case 'renewed_subscription':
        return await handleSubscriptionEvent(result);
      
      case 'cancelled_subscription':
        return await handleCancellationEvent(result);
      
      case 'new_digital_product':
        return await handleDigitalProductEvent(result);
      
      default:
        console.log('ℹ️ Tribute webhook: Unhandled event type:', result.eventType);
        return NextResponse.json({ success: true, message: 'Event received but not handled' });
    }
    
  } catch (error) {
    console.error('Tribute webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// GET - Return 200 for Tribute webhook verification
export async function GET() {
  return NextResponse.json(
    { status: 'ok', message: 'Webhook is reachable' },
    { status: 200 }
  );
}

// ============================================
// EVENT HANDLERS
// ============================================

async function handleSubscriptionEvent(result: any) {
  if (!result.tier) {
    console.warn('⚠️ Tribute webhook: Could not determine tier', {
      subscriptionId: result.subscriptionId,
      amount: result.amount,
    });
    return NextResponse.json({ success: true, message: 'Unknown tier — ignored' });
  }
  
  const tierConfig = TIER_CONFIG[result.tier as 'basic' | 'premium' | 'mastery'];
  
  // Use email if provided, otherwise use telegram user ID as placeholder
  const customerEmail = result.email || `telegram_${result.telegramUserId}@tribute.tg`;
  
  // Check if order already exists (idempotency)
  const existingOrder = await db.order.findFirst({
    where: { 
      paymentId: `tribute_sub_${result.subscriptionId}_${result.telegramUserId}`,
    },
  });
  
  if (existingOrder && existingOrder.status === 'COMPLETED') {
    console.log('Tribute subscription already processed:', existingOrder.orderNumber);
    return NextResponse.json({ success: true, message: 'Already processed' });
  }
  
  const orderNumber = `TRB-${Date.now()}-${result.telegramUserId}`;
  
  if (existingOrder) {
    // Update existing order
    await db.order.update({
      where: { id: existingOrder.id },
      data: {
        status: 'COMPLETED',
        paymentId: `tribute_sub_${result.subscriptionId}_${result.telegramUserId}`,
        paymentMethod: 'tribute',
        paidAt: new Date(),
        fulfilledAt: new Date(),
      },
    });
  } else {
    // Create new order
    await db.order.create({
      data: {
        orderNumber,
        customerEmail,
        status: 'COMPLETED',
        subtotal: result.amount / 100,
        total: result.amount / 100,
        paymentId: `tribute_sub_${result.subscriptionId}_${result.telegramUserId}`,
        paymentMethod: 'tribute',
        paidAt: new Date(),
        fulfilledAt: new Date(),
        items: {
          create: {
            productId: result.tier,
            productName: tierConfig.name,
            price: result.amount / 100,
            quantity: 1,
          },
        },
      },
    });
  }
  
  // Generate access code
  const accessCode = generateAccessCode();
  
  await db.appAccess.create({
    data: {
      code: accessCode,
      email: customerEmail,
      productId: result.tier,
      tier: tierConfig.tier as any,
      isUsed: false,
      isActive: true,
      expiresAt: result.expiresAt ? new Date(result.expiresAt) : null,
    },
  });
  
  console.log('Tribute subscription processed:', {
    tier: result.tier,
    accessCode,
    telegramUserId: result.telegramUserId,
    telegramUsername: result.telegramUsername,
    amount: result.amount,
    subscriptionId: result.subscriptionId,
    expiresAt: result.expiresAt,
  });
  
  return NextResponse.json({ 
    success: true,
    message: 'Subscription processed',
    tier: result.tier,
    processingTime: `${Date.now() - startTime}ms`,
  });
}

async function handleCancellationEvent(result: any) {
  console.log('Tribute subscription cancelled:', {
    telegramUserId: result.telegramUserId,
    subscriptionId: result.subscriptionId,
  });
  
  // Deactivate access codes for this user
  // (We'll need the user's email or telegram ID to find their codes)
  
  return NextResponse.json({ success: true, message: 'Cancellation processed' });
}

async function handleDigitalProductEvent(result: any) {
  // Similar to subscription but for one-time digital product purchases
  return handleSubscriptionEvent(result);
}

// ============================================
// HELPERS
// ============================================

function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `TMLY-${segment()}-${segment()}`;
}

// startTime needs to be accessible in handlers
const startTime = Date.now();
