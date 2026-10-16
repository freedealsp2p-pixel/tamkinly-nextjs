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
  const startTime = Date.now();

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
    // RENEWAL (2026-09-28): the subscription renewed — extend the customer's
    // active access code by one more 30-day cycle instead of ignoring the event.
    if (result.eventType === 'renewed_subscription') {
      const access = await db.appAccess.findFirst({
        where: { email: customerEmail.toLowerCase(), tier: tierConfig.tier as any, isActive: true },
        orderBy: { createdAt: 'desc' },
      });
      if (access) {
        const base = access.expiresAt && access.expiresAt > new Date() ? access.expiresAt : new Date();
        const extended = result.expiresAt ? new Date(result.expiresAt) : new Date(base);
        if (!result.expiresAt) extended.setDate(extended.getDate() + 30);
        await db.appAccess.update({
          where: { id: access.id },
          data: { expiresAt: extended, isActive: true },
        });
        // Bookkeeping: record the renewal as its own COMPLETED order
        const renStamp = Date.now();
        await db.order.create({
          data: {
            orderNumber: `TRB-REN-${result.subscriptionId}-${renStamp}`,
            customerEmail,
            status: 'COMPLETED',
            subtotal: result.amount / 100,
            total: result.amount / 100,
            paymentId: `tribute_sub_${result.subscriptionId}_${result.telegramUserId}_ren_${renStamp}`,
            paymentMethod: 'tribute',
            paidAt: new Date(),
            fulfilledAt: new Date(),
            items: {
              create: {
                productId: result.tier,
                productName: `${tierConfig.name} — Renewal`,
                price: result.amount / 100,
                quantity: 1,
              },
            },
          },
        });
        // Renewal confirmation email — same code keeps working
        try {
          const { queueEmail } = await import('@/lib/email/service');
          const tag = `access-renewal-${result.subscriptionId}-${renStamp}`;
          const dup = await db.emailQueue.findFirst({
            where: { email: customerEmail.toLowerCase(), sequenceId: tag, status: 'PENDING' },
          });
          if (!dup) {
            await queueEmail({
              email: customerEmail,
              name: result.telegramUsername || undefined,
              subject: 'تم تجديد اشتراكك في تمكينلي · Subscription renewed',
              content: renewalEmailHtml(result.telegramUsername || 'صديقنا', access.code, extended),
              sequenceId: tag,
              scheduledAt: new Date(),
            });
          }
        } catch (emailErr) {
          console.error('Tribute renewal email failed:', emailErr);
        }
        console.log('Tribute subscription RENEWED — access extended:', {
          customerEmail,
          tier: result.tier,
          newExpiresAt: extended.toISOString(),
        });
        return NextResponse.json({
          success: true,
          message: 'Renewal processed — access extended',
          expiresAt: extended,
          processingTime: `${Date.now() - startTime}ms`,
        });
      }
      // No active code found for this customer — fall through and issue a new one
      console.warn('Renewal event but no active access code — issuing a new one', {
        customerEmail,
        tier: result.tier,
      });
    } else {
      console.log('Tribute subscription already processed:', existingOrder.orderNumber);
      return NextResponse.json({ success: true, message: 'Already processed' });
    }
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
  
  // Monthly validity (2026-09-28): when Tribute does not send expires_at,
  // fall back to a 30-day cycle — subscription codes must never be open-ended.
  let accessExpiresAt: Date;
  if (result.expiresAt) {
    accessExpiresAt = new Date(result.expiresAt);
  } else {
    accessExpiresAt = new Date();
    accessExpiresAt.setDate(accessExpiresAt.getDate() + 30);
  }
  
  await db.appAccess.create({
    data: {
      code: accessCode,
      email: customerEmail,
      productId: result.tier,
      tier: tierConfig.tier as any,
      isUsed: false,
      isActive: true,
      expiresAt: accessExpiresAt,
    },
  });
  
  // Unified code delivery (2026-09-28): auto-email the access code right after
  // payment confirmation — single delivery channel, no manual step.
  try {
    const { queueEmail, accessCodeDeliveryHtml } = await import('@/lib/email/service');
    const tag = `access-code-tribute-${result.subscriptionId}_${result.telegramUserId}`;
    const dup = await db.emailQueue.findFirst({
      where: { email: customerEmail.toLowerCase(), sequenceId: tag, status: 'PENDING' },
    });
    if (!dup) {
      await queueEmail({
        email: customerEmail,
        name: result.telegramUsername || undefined,
        subject: 'Your Tamkinly access code · رمز الوصول الخاص بك من تمكينلي',
        content: accessCodeDeliveryHtml(result.telegramUsername || 'صديقنا', [accessCode], orderNumber, true),
        sequenceId: tag,
        scheduledAt: new Date(),
      });
    }
  } catch (emailErr) {
    console.error('Tribute access code email failed:', emailErr);
  }
  
  console.log('Tribute subscription processed:', {
    tier: result.tier,
    accessCode,
    telegramUserId: result.telegramUserId,
    telegramUsername: result.telegramUsername,
    amount: result.amount,
    subscriptionId: result.subscriptionId,
    expiresAt: accessExpiresAt.toISOString(),
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
  const startTime = Date.now();
  const purchaseId = result.purchaseId;
  const productId = result.productId;

  if (!purchaseId) {
    console.warn('⚠️ Tribute digital product event missing purchase_id — ignored', {
      productId,
      telegramUserId: result.telegramUserId,
    });
    return NextResponse.json({ success: true, message: 'Event received but missing purchase_id' });
  }

  // Idempotency: one order per Tribute purchase_id
  const paymentKey = `tribute_prod_${purchaseId}`;
  const existingOrder = await db.order.findFirst({
    where: { paymentId: paymentKey },
  });

  if (existingOrder && existingOrder.status === 'COMPLETED') {
    console.log('Tribute digital product already processed:', existingOrder.orderNumber);
    return NextResponse.json({ success: true, message: 'Already processed' });
  }

  const customerEmail = result.email || `telegram_${result.telegramUserId || 0}@tribute.local`;
  const orderNumber = `TRB-P${purchaseId}-${Date.now()}`;
  const protocolSlug = result.protocolSlug || null;

  const notesData = {
    source: 'tribute_digital_product',
    purchaseId,
    productId: productId ?? null,
    productName: result.productName || null,
    transactionId: result.transactionId ?? null,
    telegramUserId: result.telegramUserId || null,
    telegramUsername: result.telegramUsername || null,
    trbUserId: result.trbUserId || null,
    protocolSlug,
    grant: protocolSlug ? 'PENDING_EMAIL' : 'NO_PROTOCOL_MAPPING',
  };

  if (existingOrder) {
    await db.order.update({
      where: { id: existingOrder.id },
      data: {
        status: 'COMPLETED',
        paymentMethod: 'tribute',
        paidAt: new Date(),
        fulfilledAt: new Date(),
        notes: JSON.stringify(notesData),
      },
    });
  } else {
    await db.order.create({
      data: {
        orderNumber,
        customerEmail,
        status: 'COMPLETED',
        subtotal: result.amount / 100,
        total: result.amount / 100,
        currency: (result.currency || 'usd').toUpperCase(),
        paymentId: paymentKey,
        transactionId: result.transactionId ? String(result.transactionId) : undefined,
        paymentMethod: 'tribute',
        paymentStatus: 'COMPLETED',
        paidAt: new Date(),
        fulfilledAt: new Date(),
        notes: JSON.stringify(notesData),
        items: {
          create: {
            productId: protocolSlug || String(productId ?? 'unknown'),
            productName: result.productName || `Tribute product ${productId ?? ''}`.trim(),
            price: result.amount / 100,
            quantity: 1,
          },
        },
      },
    });
  }

  console.log('Tribute digital product purchase recorded:', {
    purchaseId,
    productId,
    productName: result.productName,
    protocolSlug: protocolSlug || '(unmapped product)',
    grant: notesData.grant,
    telegramUserId: result.telegramUserId,
    telegramUsername: result.telegramUsername,
    amount: result.amount,
    currency: result.currency,
  });

  if (!protocolSlug) {
    console.warn('⚠️ Tribute product is NOT mapped to a protocol — set TRIBUTE_PRODUCT_* env var', {
      productId,
    });
  }

  return NextResponse.json({
    success: true,
    message: 'Digital product purchase recorded',
    protocolSlug,
    processingTime: `${Date.now() - startTime}ms`,
  });
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

// Renewal confirmation email (bilingual, brand colors) — same code keeps working
function renewalEmailHtml(name: string, code: string, until: Date): string {
  const untilStr = until.toISOString().slice(0, 10);
  return `<!DOCTYPE html><html dir="rtl" lang="ar"><body style="margin:0;padding:0;background:#F6F8FA;font-family:Tahoma,Arial,sans-serif;">`
    + `<div style="max-width:560px;margin:0 auto;background:#ffffff;">`
    + `<div style="background:#0F1C2E;padding:24px 32px;text-align:center;"><span style="color:#3DD4B0;font-size:22px;font-weight:bold;">تمكينلي</span></div>`
    + `<div style="padding:32px;">`
    + `<h1 style="color:#0F1C2E;font-size:20px;margin:0 0 16px;">تم تجديد اشتراكك بنجاح</h1>`
    + `<p style="color:#475569;line-height:1.8;margin:0 0 12px;">مرحباً ${name}،</p>`
    + `<p style="color:#475569;line-height:1.8;margin:0 0 12px;">شكراً لثقتك المستمرة. جدّدنا اشتراكك الشهري ومددنا رمز وصولك حتى <strong>${untilStr}</strong>. رمزك الحالي يعمل كما هو — لا حاجة لأي إجراء.</p>`
    + `<div style="font-size:24px;font-weight:bold;letter-spacing:3px;background:#F5F9F8;border:1px solid #D8E6E4;border-radius:12px;padding:14px;text-align:center;margin:16px 0;font-family:Courier New,monospace;color:#0F1C2E;">${code}</div>`
    + `<p style="color:#475569;line-height:1.8;margin:0 0 6px;"><a href="https://tamkinly.com/apps" style="color:#1F6F78;">الدخول إلى التطبيقات ←</a></p>`
    + `<p style="color:#94A3B8;font-size:12px;margin:0;">Subscription renewed — your access code is now valid until ${untilStr}.</p>`
    + `</div>`
    + `<div style="background:#F6F8FA;padding:16px 32px;text-align:center;color:#94A3B8;font-size:12px;">تمكينلي — عِد إلى مركزك</div>`
    + `</div></body></html>`;
}

