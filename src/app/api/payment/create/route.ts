import { NextRequest, NextResponse } from 'next/server';
import { tahweelPayment } from '@/lib/tahweel-payment';

// POST - Create a payment session with Tahweel
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      amount, 
      currency, 
      orderId, 
      customerEmail, 
      customerName,
      productName,
      productId,
    } = body;

    // Validate required fields
    if (!amount || !customerEmail) {
      return NextResponse.json(
        { error: 'Amount and customer email are required' },
        { status: 400 }
      );
    }

    // Generate order ID if not provided
    const finalOrderId = orderId || `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // Get base URL for callbacks
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // Create payment with Tahweel
    const paymentResult = await tahweelPayment.createPayment({
      amount,
      currency: currency || 'USD',
      orderId: finalOrderId,
      customerEmail,
      customerName: customerName || 'Customer',
      productName: productName || 'Tamkinly Product',
      description: `Purchase of ${productName || 'Tamkinly Product'}`,
      successUrl: `${baseUrl}/payment/success?orderId=${finalOrderId}`,
      cancelUrl: `${baseUrl}/payment/cancel?orderId=${finalOrderId}`,
      metadata: {
        productId: productId || '',
        customerEmail,
      },
    });

    if (!paymentResult.success) {
      return NextResponse.json(
        { error: paymentResult.error || 'Payment creation failed' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      paymentId: paymentResult.paymentId,
      paymentUrl: paymentResult.paymentUrl,
      orderId: finalOrderId,
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Payment creation failed' },
      { status: 500 }
    );
  }
}
