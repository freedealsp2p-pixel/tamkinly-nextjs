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

// POST - Process checkout (supports both cart and direct product purchase)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, productId, productName, price } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    let orderItems: { productId: string; name: string; price: number; quantity: number }[] = [];
    let total = 0;
    let accessTier: 'TRIAL' | 'BASIC' | 'PREMIUM' | 'BUNDLE' | null = null;

    // Check if this is a direct product purchase
    if (productId && productName && price !== undefined) {
      // Direct product purchase
      orderItems = [{
        productId,
        name: productName,
        price,
        quantity: 1,
      }];
      total = price;
      accessTier = productTierMap[productId] || null;
    } else {
      // Cart-based checkout
      const cartCookie = request.cookies.get('tamkinly_cart');
      const cartId = cartCookie?.value;

      if (!cartId) {
        return NextResponse.json(
          { error: 'No product or cart found' },
          { status: 400 }
        );
      }

      // Get cart items
      const cartItems = await db.cartItem.findMany({
        where: { cartId },
        include: { product: true },
      });

      if (cartItems.length === 0) {
        return NextResponse.json(
          { error: 'Cart is empty' },
          { status: 400 }
        );
      }

      // Calculate total and prepare items
      orderItems = cartItems.map(item => ({
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      total = cartItems.reduce((sum, item) => {
        const itemPrice = item.product.price;
        return sum + itemPrice * item.quantity;
      }, 0);

      // Find access tier from cart items
      const bundleItem = cartItems.find(item => 
        ['trial', 'planner', 'premium', 'bundle'].includes(item.productId)
      );
      if (bundleItem) {
        accessTier = productTierMap[bundleItem.productId] || null;
      }

      // Clear cart
      await db.cartItem.deleteMany({
        where: { cartId },
      });
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
    const accessCode = generateAccessCode();

    if (accessTier) {
      await db.appAccess.create({
        data: {
          code: accessCode,
          email: email.toLowerCase(),
          customerName: name || null,
          productId: productId || 'bundle',
          productName: productName || 'Transformation Package',
          tier: accessTier,
          isUsed: false,
          isActive: true,
        },
      });
    }

    // Send purchase confirmation email
    if (accessTier) {
      try {
        // Map productId to productType for email
        const productTypeMap: Record<string, 'trial' | 'planner' | 'premium' | 'bundle'> = {
          'trial': 'trial',
          'planner': 'planner',
          'premium': 'premium',
          'bundle': 'bundle',
        };
        const productType = productTypeMap[productId || 'bundle'] || 'bundle';
        
        const emailResult = await EmailService.sendPurchaseConfirmationEmail({
          to: email,
          name: name || 'Friend',
          productName: productName || 'Transformation Package',
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
          type: (productId || 'bundle') as 'trial' | 'planner' | 'premium' | 'bundle',
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
      accessCode: accessTier ? accessCode : null,
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
