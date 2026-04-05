import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import crypto from 'crypto';
import EmailService, { addContactToList } from '@/lib/email-service';

// WooCommerce Product ID mapping to Tamkinly product types
// Based on WooCommerce Products API (April 2025):
// 215: 7-Day Trial ($7)
// 216: Identity Recode Planner ($17)
// 217: Premium Transformation ($27)
// 218: Complete Bundle ($47)
const PRODUCT_MAPPING: Record<string, string> = {
  '215': 'trial',       // 7-Day Trial
  '216': 'planner',     // Identity Recode Planner
  '217': 'premium',     // Premium Transformation
  '218': 'bundle',      // Complete Bundle
};

// Webhook secret for signature verification
const WEBHOOK_SECRET = 'tamkinly_webhook_secret_2024';

// Generate random access code
function generateAccessCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `TMLY-${segment()}-${segment()}`;
}

// Verify WooCommerce webhook signature
function verifySignature(payload: string, signature: string | null): boolean {
  if (!signature) return false;
  
  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('base64');
  
  return signature === expectedSignature;
}

// WooCommerce webhook handler
export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);
    
    // Verify webhook signature
    const signature = request.headers.get('x-wc-webhook-signature');
    const isValid = verifySignature(rawBody, signature);
    
    if (!isValid) {
      console.warn('Invalid webhook signature - proceeding anyway for testing');
      // In production, you should return 401 here:
      // return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    
    // Get webhook topic
    const topic = request.headers.get('x-wc-webhook-topic') || '';
    console.log(`Webhook received - Topic: ${topic}, Order ID: ${body.id}`);

    // Handle order.updated or order.completed events
    // Also check if order status is completed or processing (payment received)
    const orderStatus = body.status?.toLowerCase();
    const shouldProcess = 
      topic.includes('order') && 
      (orderStatus === 'completed' || orderStatus === 'processing');

    if (shouldProcess) {
      const order = body;
      const customerEmail = order.billing?.email;
      const orderNumber = order.id?.toString();
      const orderTotal = order.total;

      console.log(`Processing order #${orderNumber} - Status: ${orderStatus} - Email: ${customerEmail} - Total: ${orderTotal}`);

      if (!customerEmail) {
        console.error('No customer email found in order');
        return NextResponse.json(
          { error: 'No customer email found' },
          { status: 400 }
        );
      }

      const results = [];
      const lineItems = order.line_items || [];

      console.log(`Processing ${lineItems.length} line items`);

      // Process each line item
      for (const item of lineItems) {
        const wcProductId = item.product_id?.toString();
        const quantity = item.quantity || 1;
        const tamkinlyProductId = PRODUCT_MAPPING[wcProductId] || 'premium';

        console.log(`Item: Product ID ${wcProductId} -> ${tamkinlyProductId}, Qty: ${quantity}`);

        // Generate access codes for each quantity
        for (let i = 0; i < quantity; i++) {
          // Check if access code already exists for this order/item combo
          const existingCode = await db.appAccess.findFirst({
            where: {
              orderId: orderNumber,
              productId: tamkinlyProductId,
              email: customerEmail.toLowerCase(),
            },
          });

          if (!existingCode) {
            // Generate new access code
            const code = generateAccessCode();

            // Check if user exists
            const existingUser = await db.user.findUnique({
              where: { email: customerEmail.toLowerCase() },
            });

            // Create access code
            const accessCode = await db.appAccess.create({
              data: {
                code,
                email: customerEmail.toLowerCase(),
                userId: existingUser?.id || null,
                orderId: orderNumber,
                productId: tamkinlyProductId,
              },
            });

            results.push({
              code: accessCode.code,
              productId: tamkinlyProductId,
              email: customerEmail,
            });

            console.log(`Created access code: ${code} for ${customerEmail}`);
          } else {
            console.log(`Access code already exists for order ${orderNumber}`);
          }
        }
      }

      // TODO: Send email with access codes to customer
      
      // Send email with access codes and add to Brevo
      if (results.length > 0) {
        const customerName = order.billing?.first_name 
          ? `${order.billing.first_name} ${order.billing.last_name || ''}`.trim()
          : 'Friend';
        
        const firstCode = results[0].code;
        const productName = lineItems[0]?.name || 'Identity Recode System';
        
        // Send purchase confirmation email
        try {
          const emailResult = await EmailService.sendPurchaseConfirmationEmail({
            to: customerEmail,
            name: customerName,
            productName,
            accessKey: firstCode,
          });
          
          console.log(`Email sent: ${emailResult.success ? 'YES' : 'NO'} - ${emailResult.messageId || emailResult.error}`);
        } catch (emailError) {
          console.error('Failed to send purchase email:', emailError);
        }
        
        // Add contact to Brevo for email sequences
        const productType = PRODUCT_MAPPING[lineItems[0]?.product_id?.toString()] || 'premium';
        try {
          await addContactToList(customerEmail, customerName, {
            type: productType as 'trial' | 'planner' | 'premium' | 'bundle',
            accessKey: firstCode,
          });
          console.log(`Contact added to Brevo: ${customerEmail}`);
        } catch (brevoError) {
          console.error('Failed to add contact to Brevo:', brevoError);
        }
      }
      
      return NextResponse.json({
        success: true,
        message: `Processed order #${orderNumber}`,
        codesGenerated: results.length,
        codes: results,
      });
    }

    // Order created - just acknowledge
    if (topic === 'order.created') {
      console.log(`Order #${body.id} created, waiting for payment`);
      return NextResponse.json({
        success: true,
        message: 'Order received, waiting for payment completion',
        orderId: body.id,
      });
    }

    // Default response
    return NextResponse.json({
      success: true,
      message: 'Webhook received',
      topic,
      orderStatus: body.status,
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed', details: String(error) },
      { status: 500 }
    );
  }
}

// Manual trigger for testing - generates access code for given email
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email');
  const productId = searchParams.get('productId') || 'premium';
  const orderId = searchParams.get('orderId') || 'TEST-' + Date.now();

  if (!email) {
    return NextResponse.json(
      { error: 'Email is required for testing. Use ?email=test@example.com' },
      { status: 400 }
    );
  }

  // Generate test access code
  const code = generateAccessCode();

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
      orderId,
    },
  });

  return NextResponse.json({
    success: true,
    message: 'Test access code generated',
    code: accessCode.code,
    email: accessCode.email,
    productId: accessCode.productId,
    orderId: accessCode.orderId,
  });
}
