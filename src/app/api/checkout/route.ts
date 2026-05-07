import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import EmailService, { addContactToList } from '@/lib/email-service';

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

// Map product IDs to access tiers
const productTierMap: Record<string, 'TRIAL' | 'BASIC' | 'PREMIUM' | 'BUNDLE'> = {
  'trial': 'TRIAL',
  'planner': 'BASIC',
  'premium': 'PREMIUM',
  'bundle': 'BUNDLE',
};

// Product names map
const productNames: Record<string, string> = {
  'trial': '7-Day Trial',
  'planner': 'Identity Recode Planner',
  'premium': 'Premium Transformation',
  'bundle': 'Complete Bundle',
};

// POST - Process checkout (supports direct product, localStorage cart, and server cart)
export async function POST(request: NextRequest) {
  try {
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
    let accessTier: 'TRIAL' | 'BASIC' | 'PREMIUM' | 'BUNDLE' | null = null;
    let bestProductId: string | null = null;

    // Priority 1: Direct product purchase from query params
    if (productId && price !== undefined) {
      orderItems = [{
        productId,
        name: productName || productNames[productId] || 'Transformation Package',
        price,
        quantity: 1,
      }];
      total = price;
      accessTier = productTierMap[productId] || null;
      bestProductId = productId;
    }
    // Priority 2: Cart items from localStorage (sent from client)
    else if (clientCartItems && Array.isArray(clientCartItems) && clientCartItems.length > 0) {
      orderItems = clientCartItems.map((item: { productId: string; name: string; price: number; quantity?: number }) => ({
        productId: item.productId,
        name: item.name || productNames[item.productId] || 'Transformation Package',
        price: item.price,
        quantity: item.quantity || 1,
      }));
      total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // Find the highest tier product in cart for access
      const tierOrder: Record<string, number> = { 'trial': 1, 'planner': 2, 'premium': 3, 'bundle': 4 };
      let bestTier = 0;
      for (const item of orderItems) {
        const tierLevel = tierOrder[item.productId] || 0;
        if (tierLevel > bestTier) {
          bestTier = tierLevel;
          bestProductId = item.productId;
        }
      }
      if (bestProductId) {
        accessTier = productTierMap[bestProductId] || null;
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

      // Get cart items from database
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

        // Find access tier
        const bundleItem = dbCartItems.find(item => 
          ['trial', 'planner', 'premium', 'bundle'].includes(item.productId)
        );
        if (bundleItem) {
          accessTier = productTierMap[bundleItem.productId] || null;
          bestProductId = bundleItem.productId;
        }

        // Clear cart items
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

    // Create order
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

    // Generate access code for products that grant app access
    let accessCode: string | null = null;

    if (accessTier) {
      accessCode = generateAccessCode();
      
      await db.appAccess.create({
        data: {
          code: accessCode,
          email: email.toLowerCase(),
          customerName: name || null,
          productId: bestProductId || 'bundle',
          productName: productNames[bestProductId || 'bundle'] || 'Transformation Package',
          tier: accessTier,
          isUsed: false,
          isActive: true,
        },
      });
    }

    // Send purchase confirmation email
    if (accessTier && accessCode) {
      try {
        const productTypeMap: Record<string, 'trial' | 'planner' | 'premium' | 'bundle'> = {
          'trial': 'trial',
          'planner': 'planner',
          'premium': 'premium',
          'bundle': 'bundle',
        };
        const productType = productTypeMap[bestProductId || 'bundle'] || 'bundle';
        
        const emailResult = await EmailService.sendPurchaseConfirmationEmail({
          to: email,
          name: name || 'Friend',
          productName: productNames[bestProductId || 'bundle'] || 'Transformation Package',
          productType,
          accessKey: accessCode,
        });
        
        console.log(`Purchase email sent: ${emailResult.success ? 'YES' : 'NO'}`);
      } catch (emailError) {
        console.error('Failed to send purchase email:', emailError);
      }
      
      // Add to Brevo for email sequences
      try {
        await addContactToList(email, name || 'Friend', {
          type: (bestProductId || 'bundle') as 'trial' | 'planner' | 'premium' | 'bundle',
          accessKey: accessCode,
        });
      } catch (brevoError) {
        console.error('Failed to add contact to Brevo:', brevoError);
      }
    }

    // Response
    const response = NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      accessCode: accessCode,
      message: 'Order completed successfully',
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
