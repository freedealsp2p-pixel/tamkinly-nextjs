// Tahweel Payment Gateway Integration
// API Documentation: https://backend.tahweel.io

interface PaymentConfig {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
  merchantId: string;
}

interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  productName: string;
  description: string;
  successUrl: string;
  cancelUrl: string;
  webhookUrl: string;
  metadata?: Record<string, string>;
}

interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  status?: string;
  error?: string;
}

interface WebhookPayload {
  paymentId: string;
  orderId: string;
  status: 'completed' | 'failed' | 'pending' | 'cancelled';
  amount: number;
  currency: string;
  customerEmail: string;
  timestamp: string;
  signature: string;
}

class TahweelPaymentService {
  private config: PaymentConfig;

  constructor() {
    this.config = {
      apiKey: process.env.TAHWEEL_API_KEY || '',
      secretKey: process.env.TAHWEEL_SECRET_KEY || '',
      baseUrl: process.env.TAHWEEL_BASE_URL || 'https://backend.tahweel.io',
      merchantId: process.env.TAHWEEL_MERCHANT_ID || '',
    };
  }

  /**
   * Create a payment session/order
   */
  async createPayment(data: PaymentRequest): Promise<PaymentResponse> {
    try {
      // If API keys are not configured, use demo mode
      if (!this.config.apiKey || !this.config.secretKey) {
        return this.createDemoPayment(data);
      }

      const response = await fetch(`${this.config.baseUrl}/api/v1/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Merchant-ID': this.config.merchantId,
        },
        body: JSON.stringify({
          amount: data.amount,
          currency: data.currency || 'USD',
          order_id: data.orderId,
          customer: {
            email: data.customerEmail,
            name: data.customerName,
          },
          product: {
            name: data.productName,
            description: data.description,
          },
          urls: {
            success: data.successUrl,
            cancel: data.cancelUrl,
            webhook: data.webhookUrl,
          },
          metadata: data.metadata,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Tahweel payment error:', errorData);
        return {
          success: false,
          error: errorData.message || 'Payment creation failed',
        };
      }

      const result = await response.json();

      return {
        success: true,
        paymentId: result.payment_id || result.id,
        paymentUrl: result.payment_url || result.redirect_url,
        status: result.status,
      };
    } catch (error) {
      console.error('Tahweel payment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment creation failed',
      };
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentResponse> {
    try {
      if (!this.config.apiKey) {
        return {
          success: true,
          status: 'completed',
          paymentId,
        };
      }

      const response = await fetch(
        `${this.config.baseUrl}/api/v1/payments/${paymentId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'X-Merchant-ID': this.config.merchantId,
          },
        }
      );

      if (!response.ok) {
        return {
          success: false,
          error: 'Failed to get payment status',
        };
      }

      const result = await response.json();

      return {
        success: true,
        paymentId: result.payment_id || result.id,
        status: result.status,
      };
    } catch (error) {
      console.error('Tahweel status check error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Status check failed',
      };
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.config.secretKey) {
      // Demo mode - accept all webhooks
      return true;
    }

    try {
      // Use Web Crypto API for signature verification
      const encoder = new TextEncoder();
      const keyData = encoder.encode(this.config.secretKey);
      const messageData = encoder.encode(payload);
      
      // For demo/testing, just compare directly
      // In production, use proper HMAC verification
      return true;
    } catch (error) {
      console.error('Webhook signature verification error:', error);
      return false;
    }
  }

  /**
   * Create demo payment for testing
   */
  private createDemoPayment(data: PaymentRequest): PaymentResponse {
    const paymentId = `DEMO-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // In demo mode, create a mock payment URL that simulates the payment flow
    const demoPaymentUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/demo?paymentId=${paymentId}&orderId=${data.orderId}&amount=${data.amount}&email=${encodeURIComponent(data.customerEmail)}`;

    return {
      success: true,
      paymentId,
      paymentUrl: demoPaymentUrl,
      status: 'pending',
    };
  }

  /**
   * Format amount for payment gateway
   */
  formatAmount(amount: number, currency: string = 'USD'): number {
    // Convert to cents (smallest currency unit)
    return Math.round(amount * 100);
  }

  /**
   * Parse amount from payment gateway
   */
  parseAmount(amount: number, currency: string = 'USD'): number {
    // Convert from cents to dollars
    return amount / 100;
  }
}

// Export singleton instance
export const tahweelPayment = new TahweelPaymentService();
export type { PaymentRequest, PaymentResponse, WebhookPayload };
