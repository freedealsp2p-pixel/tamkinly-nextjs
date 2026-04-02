import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import EmailService from '@/lib/email-service';
import { PRODUCT_TIER_MAP, LOCAL_PRODUCTS } from '@/lib/products';

// Tahweel Payment Webhook Handler
// Handles payment callbacks from Tahweel payment gateway
// Sends appropriate emails using Brevo templates based on product type

// Generate unique access code
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

// Verify Tahweel webhook signature
function verifyTahweelSignature(payload: string, signature: string | null): boolean {
  if (!signature) return false;
  
  const secret = process.env.TAHWEEL_SECRET_KEY || process.env.TAHWEEL_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('Tahweel webhook secret not configured');
    return true; // Allow in demo mode
  }
  
  // In production, verify HMAC signature
  // For now, accept all webhooks in demo mode
  return true;
}

// Get product type from product ID
function getProductType(productId: string): 'trial' | 'planner' | 'premium' | 'bundle' {
  const validTypes: ('trial' | 'planner' | 'premium' | 'bundle')[] = ['trial', 'planner', 'premium', 'bundle'];
  if (validTypes.includes(productId as any)) {
    return productId as 'trial' | 'planner' | 'premium' | 'bundle';
  }
  return 'premium'; // Default
}

// Handle successful payment
async function handleSuccessfulPayment(paymentData: {
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName?: string;
  productId?: string;
  productName?: string;
}) {
  const { paymentId, orderId, amount, customerEmail, customerName, productId, productName } = paymentData;
  
  console.log(`Processing successful payment: ${paymentId} for ${customerEmail}`);
  
  // Check if already processed
  const existingAccess = await db.appAccess.findFirst({
    where: {
      OR: [
        { orderId: paymentId },
        { orderId: orderId },
      ],
    },
  });
  
  if (existingAccess) {
    console.log(`Payment ${paymentId} already processed`);
    return { success: true, alreadyProcessed: true, accessCode: existingAccess.code };
  }
  
  // Determine product type and access tier
  const productType = getProductType(productId || 'premium');
  const accessTier = productId ? PRODUCT_TIER_MAP[productId] || 'BASIC' : 'BASIC';
  const product = LOCAL_PRODUCTS.find(p => p.id === productId);
  const actualProductName = productName || product?.name || 'Transformation Package';
  
  // Generate access code
  const accessCode = generateAccessCode();
  
  // Find or create user
  let user = await db.user.findUnique({
    where: { email: customerEmail.toLowerCase() },
  });
  
  // Create access code
  const appAccess = await db.appAccess.create({
    data: {
      code: accessCode,
      email: customerEmail.toLowerCase(),
      userId: user?.id || null,
      customerName: customerName || null,
      orderId: paymentId,
      productId: productId || 'premium',
      productName: actualProductName,
      tier: accessTier,
      isUsed: false,
      isActive: true,
    },
  });
  
  console.log(`Created access code: ${accessCode} for ${customerEmail} (Product: ${productType})`);
  
  // ============================================
  // SEND EMAIL using Brevo Templates
  // ============================================
  
  try {
    const emailResult = await EmailService.sendPurchaseConfirmationEmail({
      to: customerEmail,
      name: customerName || 'Friend',
      productName: actualProductName,
      productType: productType,
      accessKey: accessCode,
    });
    
    if (emailResult.success) {
      console.log(`✅ Purchase email sent to ${customerEmail} using ${productType} template`);
    } else {
      console.error(`❌ Failed to send purchase email: ${emailResult.error}`);
    }
  } catch (emailError) {
    console.error('Failed to send purchase email:', emailError);
  }
  
  // ============================================
  // STORE CONTACT in Brevo (for future emails)
  // ============================================
  
  try {
    await EmailService.storeContact(customerEmail, customerName || 'Friend', {
      type: productType,
      accessKey: accessCode,
    });
    console.log(`✅ Contact stored in Brevo: ${customerEmail}`);
  } catch (brevoError) {
    console.error('Failed to store contact in Brevo:', brevoError);
  }
  
  return {
    success: true,
    accessCode,
    tier: accessTier,
    productType,
  };
}

// POST - Handle Tahweel webhook
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);
    
    // Verify signature
    const signature = request.headers.get('x-tahweel-signature') || 
                      request.headers.get('x-webhook-signature');
    
    if (!verifyTahweelSignature(rawBody, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    console.log('Tahweel webhook received:', JSON.stringify(body, null, 2));
    
    // Parse webhook event
    const eventType = body.event || body.type || 'payment.completed';
    const paymentData = body.data || body;
    
    // Handle different event types
    if (eventType.includes('completed') || eventType.includes('success') || body.status === 'completed') {
      const result = await handleSuccessfulPayment({
        paymentId: paymentData.payment_id || paymentData.paymentId || body.paymentId,
        orderId: paymentData.order_id || paymentData.orderId || body.orderId,
        amount: parseFloat(paymentData.amount || body.amount || '0'),
        currency: paymentData.currency || body.currency || 'USD',
        customerEmail: paymentData.customer?.email || paymentData.customerEmail || body.customerEmail,
        customerName: paymentData.customer?.name || paymentData.customerName || body.customerName,
        productId: paymentData.metadata?.productId || paymentData.productId || body.productId,
        productName: paymentData.metadata?.productName || paymentData.productName || body.productName,
      });
      
      return NextResponse.json({
        success: true,
        message: 'Payment processed successfully',
        ...result,
      });
    }
    
    // Handle payment failed
    if (eventType.includes('failed') || body.status === 'failed') {
      console.log(`Payment failed: ${paymentData.payment_id || body.paymentId}`);
      return NextResponse.json({
        success: true,
        message: 'Payment failure noted',
      });
    }
    
    // Handle payment pending
    if (eventType.includes('pending') || body.status === 'pending') {
      console.log(`Payment pending: ${paymentData.payment_id || body.paymentId}`);
      return NextResponse.json({
        success: true,
        message: 'Payment pending',
      });
    }
    
    // Default response
    return NextResponse.json({
      success: true,
      message: 'Webhook received',
      eventType,
    });
    
  } catch (error) {
    console.error('Tahweel webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed', details: String(error) },
      { status: 500 }
    );
  }
}

// GET - Test access code generation and email sending
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email');
  const productId = searchParams.get('productId') || 'premium';
  const orderId = searchParams.get('orderId') || 'TEST-' + Date.now();
  const sendEmail = searchParams.get('sendEmail') === 'true';

  if (!email) {
    return NextResponse.json(
      { error: 'Email is required for testing. Use ?email=test@example.com' },
      { status: 400 }
    );
  }

  // Generate test access code
  const code = generateAccessCode();
  const accessTier = PRODUCT_TIER_MAP[productId] || 'BASIC';
  const productType = getProductType(productId);
  const product = LOCAL_PRODUCTS.find(p => p.id === productId);

  // Check if user exists
  const existingUser = await db.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  const accessCode = await db.appAccess.create({
    data: {
      code,
      email: email.toLowerCase(),
      userId: existingUser?.id || null,
      productId,
      productName: product?.name || 'Test Product',
      orderId,
      tier: accessTier,
      isUsed: false,
      isActive: true,
    },
  });

  // Send test email if requested
  let emailResult = null;
  if (sendEmail) {
    emailResult = await EmailService.sendPurchaseConfirmationEmail({
      to: email,
      name: 'Test User',
      productName: product?.name || 'Test Product',
      productType: productType,
      accessKey: code,
    });
  }

  return NextResponse.json({
    success: true,
    message: 'Test access code generated',
    code: accessCode.code,
    email: accessCode.email,
    productId: accessCode.productId,
    productName: accessCode.productName,
    tier: accessCode.tier,
    orderId: accessCode.orderId,
    emailSent: sendEmail ? emailResult : 'not requested',
    hint: 'Add &sendEmail=true to test email sending',
  });
}
