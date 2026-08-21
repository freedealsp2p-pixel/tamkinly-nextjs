import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { addContactToList, sendOrderReceivedEmail } from '@/lib/email-service';
import { applySecurity, CHECKOUT_RATE_LIMIT } from '@/lib/security';

// Map product IDs to access tiers (NEW MODEL: 3 paid tiers)
// Legacy IDs are aliased for backward compatibility with existing orders/links
const productTierMap: Record<string, 'BASIC' | 'PREMIUM' | 'MASTERY'> = {
  'basic': 'BASIC',
  'premium': 'PREMIUM',
  'mastery': 'MASTERY',
  // Legacy aliases
  'trial': 'BASIC',
  'planner': 'PREMIUM',
  'bundle': 'MASTERY',
};

// Product names map (NEW MODEL)
const productNames: Record<string, string> = {
  'basic': 'Basic (Monthly)',
  'premium': 'Premium (Monthly)',
  'mastery': 'Mastery (Monthly)',
  // Legacy aliases (for backward compat with old orders)
  'trial': 'Basic (Monthly)',
  'planner': 'Premium (Monthly)',
  'bundle': 'Mastery (Monthly)',
};

// POST - Process checkout (ONLY creates a PENDING order)
// Access codes are generated ONLY when payment is confirmed via webhook
export async function POST(request: NextRequest) {
  try {
  // Security: CSRF + rate limit
  const securityBlocked = await applySecurity(request, CHECKOUT_RATE_LIMIT);
  if (securityBlocked) return securityBlocked;


    const body = await request.json();
    const { name, email, productId, productName, price, cartItems: clientCartItems } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    let orderItems: { productId: string; name: string; price: number; quantity: number }[] = [];
    let total = 0;
    let bestProductId: string | null = null;

    // Priority 1: Direct product purchase
    if (productId && price !== undefined) {
      orderItems = [{
        productId,
        name: productName || productNames[productId] || 'Transformation Package',
        price,
        quantity: 1,
      }];
      total = price;
      bestProductId = productId;
    }
    // Priority 2: Cart items from localStorage
    else if (clientCartItems && Array.isArray(clientCartItems) && clientCartItems.length > 0) {
      orderItems = clientCartItems.map((item: { productId: string; name: string; price: number; quantity?: number }) => ({
        productId: item.productId,
        name: item.name || productNames[item.productId] || 'Transformation Package',
        price: item.price,
        quantity: item.quantity || 1,
      }));
      total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const tierOrder: Record<string, number> = { 'basic': 1, 'premium': 2, 'mastery': 3, 'trial': 1, 'planner': 2, 'bundle': 3 };
      let bestTier = 0;
      for (const item of orderItems) {
        const tierLevel = tierOrder[item.productId] || 0;
        if (tierLevel > bestTier) {
          bestTier = tierLevel;
          bestProductId = item.productId;
        }
      }
    }
    // Priority 3: Server-side cart via cookie
    else {
      const cartCookie = request.cookies.get('tamkinly_cart');
      const cartId = cartCookie?.value;

      if (!cartId) {
        return NextResponse.json(
          { error: 'No product or cart found. Please add a product to your cart first.' },
          { status: 400 }
        );
      }

      try {
        const dbCartItems = await db.cartItem.findMany({
          where: { cartId },
          include: { product: true },
        });

        if (dbCartItems.length === 0) {
          return NextResponse.json(
            { error: 'Cart is empty' },
            { status: 400 }
          );
        }

        orderItems = dbCartItems.map(item => ({
          productId: item.productId,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        }));

        total = dbCartItems.reduce((sum, item) => {
          return sum + item.product.price * item.quantity;
        }, 0);

        const bundleItem = dbCartItems.find(item => 
          ['trial', 'planner', 'premium', 'bundle'].includes(item.productId)
        );
        if (bundleItem) {
          bestProductId = bundleItem.productId;
        }

        await db.cartItem.deleteMany({
          where: { cartId },
        });
      } catch (dbError) {
        console.error('Database cart error:', dbError);
        return NextResponse.json(
          { error: 'Could not load cart. Please try adding the product directly.' },
          { status: 400 }
        );
      }
    }

    if (orderItems.length === 0) {
      return NextResponse.json(
        { error: 'No items to checkout' },
        { status: 400 }
      );
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Create PENDING order - NO access code generated yet
    const order = await db.order.create({
      data: {
        orderNumber,
        customerEmail: email.toLowerCase(),
        customerName: name || null,
        status: 'PENDING',
        subtotal: total,
        total,
        items: {
          create: orderItems.map(item => ({
            productId: item.productId,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    // SECURITY FIX: Do NOT generate access code here
    // Access codes are ONLY generated when payment is confirmed via webhook
    // The webhook at /api/payment/webhook handles this after real payment verification

    // Add to Brevo marketing list (not sensitive - just for newsletters)
    try {
      await addContactToList(email, name || 'Friend', {
        type: (bestProductId || 'bundle') as 'trial' | 'planner' | 'premium' | 'bundle',
      });
    } catch (brevoError) {
      console.error('Failed to add contact to Brevo:', brevoError);
    }
    // Send order received email to customer
    try {
      const productName = orderItems.map(i => i.name).join(', ');
      await sendOrderReceivedEmail({
        to: email.toLowerCase(),
        name: name || email.split('@')[0],
        orderNumber: order.orderNumber,
        productName,
        amount: total,
      });
      console.log('Order received email sent to:', email);
    } catch (emailError) {
      console.error('Failed to send order received email:', emailError);
    }


    // Response - clearly indicates order is PENDING
    const response = NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      accessCode: null,
      message: 'Order created. Awaiting payment confirmation. Your access token will be sent to your email once payment is verified.',
      pendingVerification: true,
    });

    // Clear cart cookie if exists
    response.cookies.set('tamkinly_cart', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Checkout failed. Please try again.' },
      { status: 500 }
    );
  }
}

