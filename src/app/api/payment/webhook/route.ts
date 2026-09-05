import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { createHmac, timingSafeEqual } from 'crypto';

// ============================================
// SECURITY: Webhook Authentication
// ============================================
// All webhooks MUST be authenticated via one of:
//   1. HMAC-SHA256 signature (header: x-tahweel-signature) computed with WEBHOOK_SECRET
//   2. Static webhook secret (header: x-webhook-secret) matching WEBHOOK_SECRET
// Requests without valid authentication are rejected with 401.

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';
const ENABLE_WEBHOOK_SECURITY = process.env.WEBHOOK_SECURITY_DISABLED !== 'true'; // default: enabled

// Allowed customer email regex (basic validation)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Allowed payment statuses (case-insensitive)
const SUCCESS_STATUSES = new Set(['completed', 'processed', 'success', 'paid']);
const FAILED_STATUSES = new Set(['failed', 'error', 'declined', 'denied']);
const CANCELLED_STATUSES = new Set(['cancelled', 'canceled']);

// Allowed currencies (basic whitelist)
const ALLOWED_CURRENCIES = new Set(['USD', 'EUR', 'GBP', 'SAR', 'AED', 'EGP', 'KWD', 'QAR', 'BHD', 'OMR', 'JOD']);

/**
 * Verify HMAC-SHA256 signature.
 * Format expected in header x-tahweel-signature: "sha256=<hex>"
 */
function verifyHmacSignature(rawBody: string, signatureHeader: string | null): boolean {
  if (!WEBHOOK_SECRET) return false;
  if (!signatureHeader) return false;

  const expected = signatureHeader.startsWith('sha256=')
    ? signatureHeader.slice(7)
    : signatureHeader;

  const computed = createHmac('sha256', WEBHOOK_SECRET).update(rawBody).digest('hex');

  if (expected.length !== computed.length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(computed));
  } catch {
    return false;
  }
}

/**
 * Verify static webhook secret header.
 */
function verifyWebhookSecret(secretHeader: string | null): boolean {
  if (!WEBHOOK_SECRET || !secretHeader) return false;
  const a = Buffer.from(secretHeader);
  const b = Buffer.from(WEBHOOK_SECRET);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Authenticate the incoming webhook request.
 * Returns { ok: true } on success, { ok: false, reason } on failure.
 */
function authenticateWebhook(request: NextRequest, rawBody: string): { ok: boolean; reason?: string } {
  // Allow bypass ONLY when explicitly disabled via env (for local dev/testing only)
  if (!ENABLE_WEBHOOK_SECURITY) {
    console.warn('⚠️  WEBHOOK SECURITY DISABLED — accepting all webhooks (DEV ONLY)');
    return { ok: true };
  }

  if (!WEBHOOK_SECRET) {
    console.error('🚨 WEBHOOK_SECRET is not configured. Rejecting all webhooks.');
    return { ok: false, reason: 'Webhook secret not configured' };
  }

  // Try HMAC signature first
  const signature = request.headers.get('x-tahweel-signature')
    || request.headers.get('x-signature')
    || request.headers.get('stripe-signature');

  if (signature && verifyHmacSignature(rawBody, signature)) {
    return { ok: true };
  }

  // Try static secret header
  const staticSecret = request.headers.get('x-webhook-secret')
    || request.headers.get('x-tahweel-secret');

  if (verifyWebhookSecret(staticSecret)) {
    return { ok: true };
  }

  return { ok: false, reason: 'Invalid or missing webhook authentication' };
}

/**
 * Validate webhook payload structure.
 */
function validatePayload(payload: any): { ok: boolean; reason?: string } {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, reason: 'Invalid payload: not an object' };
  }

  // Require either orderId or orderNumber
  const orderId = payload.orderId || payload.orderNumber;
  if (!orderId || typeof orderId !== 'string' || orderId.length > 100) {
    return { ok: false, reason: 'Invalid or missing orderId' };
  }

  // Validate customer email
  const email = payload.customerEmail || payload.customer_id || payload.metadata?.customerEmail;
  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return { ok: false, reason: 'Invalid or missing customerEmail' };
  }

  // Validate amount if present
  if (payload.amount !== undefined) {
    const amount = typeof payload.amount === 'string' ? parseFloat(payload.amount) : payload.amount;
    if (isNaN(amount) || amount < 0 || amount > 10000) {
      return { ok: false, reason: 'Invalid amount' };
    }
  }

  // Validate currency if present
  if (payload.currency && !ALLOWED_CURRENCIES.has(payload.currency.toUpperCase())) {
    return { ok: false, reason: 'Unsupported currency' };
  }

  // Validate status if present
  const status = (payload.status || '').toString().toLowerCase();
  if (status && !SUCCESS_STATUSES.has(status) && !FAILED_STATUSES.has(status) && !CANCELLED_STATUSES.has(status)) {
    return { ok: false, reason: `Unknown status: ${status}` };
  }

  return { ok: true };
}

// POST - Handle webhook from payment gateways (Tahweel, etc.)
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // Get raw body FIRST (needed for HMAC signature verification)
    const rawBody = await request.text();

    // ============================================
    // SECURITY CHECK: Authenticate the webhook
    // ============================================
    const auth = authenticateWebhook(request, rawBody);
    if (!auth.ok) {
      console.warn(`🚫 Webhook rejected: ${auth.reason}`, {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        timestamp: new Date().toISOString(),
      });
      return NextResponse.json(
        { error: 'Unauthorized', message: auth.reason },
        { status: 401 }
      );
    }

    // Parse webhook payload
    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      // Try form data
      try {
        const formData = new URLSearchParams(rawBody);
        payload = Object.fromEntries(formData);
      } catch {
        console.warn('🚫 Webhook rejected: invalid JSON/form payload');
        return NextResponse.json(
          { error: 'Invalid payload format' },
          { status: 400 }
        );
      }
    }

    // ============================================
    // SECURITY CHECK: Validate payload structure
    // ============================================
    const validation = validatePayload(payload);
    if (!validation.ok) {
      console.warn(`🚫 Webhook rejected: ${validation.reason}`, {
        payloadPreview: JSON.stringify(payload).slice(0, 200),
      });
      return NextResponse.json(
        { error: 'Invalid payload', message: validation.reason },
        { status: 400 }
      );
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

    console.log('✅ Authenticated webhook received:', {
      paymentId: paymentId || transaction_id,
      orderId: orderId || orderNumber,
      status,
      customerEmail: customerEmail || customer_id,
      processingTime: `${Date.now() - startTime}ms`,
    });

    // Determine customer email
    const email = customerEmail || customer_id || metadata?.customerEmail;

    if (!email) {
      console.error('No customer email in webhook payload');
      return NextResponse.json({ error: 'Missing customer email' }, { status: 400 });
    }

    // Handle different payment statuses
    const normalizedStatus = (status || '').toString().toLowerCase();
    if (SUCCESS_STATUSES.has(normalizedStatus)) {
      await handlePaymentSuccess({
        paymentId: paymentId || transaction_id,
        orderId: orderId || orderNumber,
        amount: parseFloat(amount) || 0,
        currency: currency || 'USD',
        customerEmail: email,
        metadata,
      });
    } else if (FAILED_STATUSES.has(normalizedStatus)) {
      await handlePaymentFailed({ orderId: orderId || orderNumber, paymentId });
    } else if (CANCELLED_STATUSES.has(normalizedStatus)) {
      await handlePaymentCancelled({ orderId: orderId || orderNumber, paymentId });
    } else {
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

// GET - Reject GET requests (security: only POST is allowed for webhooks)
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
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
        paymentMethod: 'tahweel',
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
      isActive: true,  // Active because payment is confirmed
    },
  });

  console.log('Payment success processed:', { orderId, accessCode, customerEmail });

  // Send access code via email
  try {
    const EmailService = (await import('@/lib/email-service')).default;
    const addContactToList = (await import('@/lib/email-service')).addContactToList;

    const productTypeMap: Record<string, 'basic' | 'premium' | 'mastery'> = {
      'basic': 'basic',
      'premium': 'premium',
      'mastery': 'mastery',
      // Legacy aliases
      'trial': 'basic',
      'planner': 'premium',
      'bundle': 'mastery',
    };

    const productType = productTypeMap[productId || 'mastery'] || 'mastery';

    await EmailService.sendPurchaseConfirmationEmail({
      to: customerEmail,
      name: customerEmail.split('@')[0],
      productName: getProductName(productId || 'mastery'),
      productType,
      accessKey: accessCode,
    });

    console.log('Access code email sent to:', customerEmail);

    // Add to Brevo for email sequences
    try {
      await addContactToList(customerEmail, customerEmail.split('@')[0], {
        type: productType,
        accessKey: accessCode,
      });
    } catch (brevoError) {
      console.error('Failed to add contact to Brevo:', brevoError);
    }

    // Trigger onboarding email sequence based on product tier
    try {
      const { triggerEmailSequence } = await import('@/lib/email/service');
      const sequenceMap: Record<string, string> = {
        'basic': 'BASIC_ONBOARDING',
        'premium': 'PREMIUM_ONBOARDING',
        'mastery': 'MASTERY_ONBOARDING',
        // Legacy aliases
        'trial': 'BASIC_ONBOARDING',
        'planner': 'PREMIUM_ONBOARDING',
        'bundle': 'MASTERY_ONBOARDING',
      };
      const sequence = sequenceMap[productType] || 'BASIC_SEQUENCE';
      await triggerEmailSequence(sequence, {
        email: customerEmail,
        name: customerEmail.split('@')[0],
        access_code: accessCode,
        product_name: getProductName(productId || 'mastery'),
        product_tier: productType,
      });
      console.log('Onboarding sequence triggered:', sequence, 'for', customerEmail);
    } catch (sequenceError) {
      console.error('Failed to trigger onboarding sequence:', sequenceError);
    }
  } catch (emailError) {
    console.error('Failed to send access code email:', emailError);
  }
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

function getTierFromAmount(amount: number): 'BASIC' | 'PREMIUM' | 'MASTERY' {
  // NEW MODEL: monthly subscription tiers
  if (amount <= 7) return 'BASIC';
  if (amount <= 17) return 'PREMIUM';
  return 'MASTERY';
}

function getProductIdFromAmount(amount: number): string {
  // NEW MODEL: monthly subscription product IDs
  if (amount <= 7) return 'basic';
  if (amount <= 17) return 'premium';
  return 'mastery';
}

function getProductName(productId: string): string {
  const names: Record<string, string> = {
    'basic': 'Basic (Monthly)',
    'premium': 'Premium (Monthly)',
    'mastery': 'Mastery (Monthly)',
    // Legacy aliases for backward compat
    'trial': 'Basic (Monthly)',
    'planner': 'Premium (Monthly)',
    'bundle': 'Mastery (Monthly)',
  };
  return names[productId] || 'Tamkinly Subscription';
}
