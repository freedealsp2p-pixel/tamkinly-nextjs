import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Helper to get cart from cookie
function getCartId(request: NextRequest): string | null {
  const cartCookie = request.cookies.get('tamkinly_cart');
  return cartCookie?.value || null;
}

// Get cart with items
export async function GET(request: NextRequest) {
  try {
    const cartId = getCartId(request);

    if (!cartId) {
      return NextResponse.json({
        success: true,
        cart: null,
        items: [],
        total: 0,
        itemCount: 0,
      });
    }

    // Get cart items with product details
    const cartItems = await db.cartItem.findMany({
      where: { cartId },
      include: {
        product: true,
      },
    });

    const total = cartItems.reduce((sum, item) => {
      const price = item.product.comparePrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);

    return NextResponse.json({
      success: true,
      cart: { id: cartId },
      items: cartItems.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        comparePrice: item.product.comparePrice,
        image: item.product.image,
        quantity: item.quantity,
        subtotal: (item.product.comparePrice || item.product.price) * item.quantity,
      })),
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// Add item to cart
export async function POST(request: NextRequest) {
  try {
    const { productId, quantity = 1 } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Check product exists
    const product = await db.product.findUnique({
      where: { id: productId, isActive: true },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    let cartId = getCartId(request);

    // Create cart if doesn't exist
    if (!cartId) {
      const cart = await db.cart.create({
        data: {},
      });
      cartId = cart.id;
    }

    // Check if item already in cart
    const existingItem = await db.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId,
          productId,
        },
      },
    });

    if (existingItem) {
      // Update quantity
      await db.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Add new item
      await db.cartItem.create({
        data: {
          cartId,
          productId,
          quantity,
        },
      });
    }

    // Get updated cart
    const cartItems = await db.cartItem.findMany({
      where: { cartId },
      include: { product: true },
    });

    const total = cartItems.reduce((sum, item) => {
      const price = item.product.comparePrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);

    const response = NextResponse.json({
      success: true,
      message: 'Item added to cart',
      cart: { id: cartId },
      items: cartItems.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        comparePrice: item.product.comparePrice,
        image: item.product.image,
        quantity: item.quantity,
        subtotal: (item.product.comparePrice || item.product.price) * item.quantity,
      })),
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    });

    // Set cart cookie if new cart
    if (!getCartId(request)) {
      response.cookies.set('tamkinly_cart', cartId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    );
  }
}

// Update cart item quantity
export async function PUT(request: NextRequest) {
  try {
    const { itemId, quantity } = await request.json();

    if (!itemId || quantity === undefined) {
      return NextResponse.json(
        { error: 'Item ID and quantity are required' },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await db.cartItem.delete({
        where: { id: itemId },
      });
    } else {
      await db.cartItem.update({
        where: { id: itemId },
        data: { quantity },
      });
    }

    const cartId = getCartId(request);
    const cartItems = cartId ? await db.cartItem.findMany({
      where: { cartId },
      include: { product: true },
    }) : [];

    const total = cartItems.reduce((sum, item) => {
      const price = item.product.comparePrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);

    return NextResponse.json({
      success: true,
      items: cartItems.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        comparePrice: item.product.comparePrice,
        image: item.product.image,
        quantity: item.quantity,
        subtotal: (item.product.comparePrice || item.product.price) * item.quantity,
      })),
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    console.error('Update cart error:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

// Remove item from cart
export async function DELETE(request: NextRequest) {
  try {
    const { itemId } = await request.json();

    if (!itemId) {
      return NextResponse.json(
        { error: 'Item ID is required' },
        { status: 400 }
      );
    }

    await db.cartItem.delete({
      where: { id: itemId },
    });

    const cartId = getCartId(request);
    const cartItems = cartId ? await db.cartItem.findMany({
      where: { cartId },
      include: { product: true },
    }) : [];

    const total = cartItems.reduce((sum, item) => {
      const price = item.product.comparePrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);

    return NextResponse.json({
      success: true,
      message: 'Item removed from cart',
      items: cartItems.map(item => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        comparePrice: item.product.comparePrice,
        image: item.product.image,
        quantity: item.quantity,
        subtotal: (item.product.comparePrice || item.product.price) * item.quantity,
      })),
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    );
  }
}
