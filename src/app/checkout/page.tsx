'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Shield,
  CheckCircle2,
  Lock,
  Loader2,
  ArrowLeft,
  Package,
  Mail,
  User,
  AlertCircle,
  Sparkles,
  Calendar,
  Award,
  Monitor,
  Clock,
  Copy,
  Check,
  ExternalLink,
  CreditCard
} from 'lucide-react';

// Skrill Account Configuration
const SKRILL_CONFIG = {
  email: 'abdallahchouaf1@gmail.com',
  customerId: '375652661',
  accountName: 'Abdallah Chouaf'
};

// Product data
const productsData: Record<string, {
  id: string;
  name: string;
  price: number;
  comparePrice: number;
  icon: React.ElementType;
  tier: string;
  features: string[];
}> = {
  'trial': {
    id: "trial",
    name: "7-Day Trial",
    price: 7,
    comparePrice: 15,
    icon: Clock,
    tier: "TRIAL",
    features: ["7-Day Guided Journey", "Daily identity prompts", "Evidence tracking", "Progress dashboard"]
  },
  'planner': {
    id: "planner",
    name: "Identity Recode Planner",
    price: 17,
    comparePrice: 29,
    icon: Calendar,
    tier: "BASIC",
    features: ["30-Day Identity Planner", "Executive Manual", "Identity Baseline Worksheet", "Digital + Print PDFs"]
  },
  'premium': {
    id: "premium",
    name: "Premium Transformation",
    price: 27,
    comparePrice: 44,
    icon: Award,
    tier: "PREMIUM",
    features: ["Everything in Planner", "Decision Pattern Analysis", "Evidence Tracking System", "Progress Dashboard"]
  },
  'bundle': {
    id: "bundle",
    name: "Complete Bundle",
    price: 47,
    comparePrice: 91,
    icon: Monitor,
    tier: "BUNDLE",
    features: ["All PDF products", "All Interactive Apps", "AI Identity Coach", "Transformation Community", "Priority Support"]
  }
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');

  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');
  const [paymentStep, setPaymentStep] = useState<'info' | 'payment' | 'confirm'>('info');

  // Get product directly from productId (no state needed)
  const product = productId && productsData[productId] ? productsData[productId] : null;

  // Form state
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const userStored = localStorage.getItem('tamkinly_user');
      if (userStored) {
        try {
          const user = JSON.parse(userStored);
          return {
            name: user.name || '',
            email: user.email || '',
            transactionId: '',
            notes: ''
          };
        } catch {
          // Ignore JSON parse errors
        }
      }
    }
    return { name: '', email: '', transactionId: '', notes: '' };
  });

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate Skrill payment URL
  const getSkrillPaymentUrl = () => {
    if (!product) return '';
    const params = new URLSearchParams({
      pay_to_email: SKRILL_CONFIG.email,
      amount: product.price.toString(),
      currency: 'USD',
      language: 'EN',
      detail1_description: 'Tamkinly Product',
      detail1_text: product.name,
      merchant_fields: 'customer_id',
      customer_id: formData.email,
      return_url: `${window.location.origin}/payment/success`,
      cancel_url: `${window.location.origin}/payment/cancel`,
      status_url: `${window.location.origin}/api/payment/webhook`
    });
    return `https://pay.skrill.com/?${params.toString()}`;
  };

  // Handle payment confirmation - Save to database
  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    try {
      // Process checkout via API - this creates order AND generates access code
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          productId: product?.id,
          productName: product?.name,
          price: product?.price,
          transactionId: formData.transactionId || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Store user info locally for convenience
      localStorage.setItem('tamkinly_user', JSON.stringify({
        name: formData.name,
        email: formData.email
      }));

      setOrderNumber(data.orderNumber);
      if (data.accessCode) {
        setAccessCode(data.accessCode);
      }
      setSuccess(true);
    } catch (err) {
      console.error('Confirmation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  // No product selected
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F6F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-[#1F6F78]" />
            </div>
            <h1 className="text-3xl font-bold text-[#0F1C2E] mb-4">Select a Product</h1>
            <p className="text-[#8A94A6] mb-8">
              Please select a product from our products page to continue with checkout.
            </p>
            <Link href="/products">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 px-8">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-[#F6F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#0F1C2E] mb-4">Order Completed!</h1>
            <p className="text-[#8A94A6] mb-8">
              Thank you for your purchase! Your order has been processed successfully.
            </p>

            {/* Access Code Section */}
            {accessCode && (
              <Card className="border-2 border-[#3DD4B0] shadow-sm mb-6">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-[#1F6F78] mb-2">Your Access Code</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-2xl font-mono font-bold text-[#0F1C2E]">{accessCode}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(accessCode)}
                      className="h-8 w-8 p-0"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-[#8A94A6] mt-2">Save this code to access your products</p>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-sm mb-8">
              <CardContent className="p-6">
                <p className="text-sm text-[#8A94A6] mb-2">Order Reference</p>
                <p className="text-xl font-mono font-bold text-[#0F1C2E]">{orderNumber}</p>
                <p className="text-xs text-[#8A94A6] mt-2">Save this reference for support</p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apps">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 px-8">
                  Access Your Apps
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="h-12 px-8">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Icon = product.icon;

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/products/${product.id}`} className="inline-flex items-center text-[#1F6F78] hover:text-[#3DD4B0] mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Product
          </Link>
          <h1 className="text-3xl font-bold text-[#0F1C2E]">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Customer Info */}
            {paymentStep === 'info' && (
              <Card className="border-0 shadow-sm mb-6">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3DD4B0] text-[#0F1C2E] flex items-center justify-center font-bold">1</div>
                    <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                      <User className="w-5 h-5 text-[#3DD4B0]" />
                      Customer Information
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2B2E34]">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2B2E34]">Email Address</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                    />
                    <p className="text-xs text-[#8A94A6]">
                      Your access code will be sent to this email.
                    </p>
                  </div>

                  <Button
                    onClick={() => setPaymentStep('payment')}
                    disabled={!formData.name || !formData.email}
                    className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12"
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment */}
            {paymentStep === 'payment' && (
              <form onSubmit={handleConfirmPayment}>
                <Card className="border-0 shadow-sm mb-6">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#3DD4B0] text-[#0F1C2E] flex items-center justify-center font-bold">2</div>
                      <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#3DD4B0]" />
                        Payment via Skrill
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Skrill Payment Info */}
                    <div className="bg-gradient-to-br from-[#862165] to-[#5a1a45] rounded-xl p-6 text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                          <span className="text-2xl font-bold">S</span>
                        </div>
                        <div>
                          <p className="font-bold text-lg">Skrill Payment</p>
                          <p className="text-white/70 text-sm">Fast & Secure</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-white/60 mb-1">Send payment to:</p>
                          <div className="flex items-center justify-between">
                            <p className="font-mono font-semibold">{SKRILL_CONFIG.email}</p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(SKRILL_CONFIG.email)}
                              className="text-white hover:bg-white/20 h-8 px-2"
                            >
                              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-white/60 mb-1">Amount to send:</p>
                          <p className="text-2xl font-bold">${product.price} USD</p>
                        </div>

                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-xs text-white/60 mb-1">Account Holder:</p>
                          <p className="font-semibold">{SKRILL_CONFIG.accountName}</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Button */}
                    <div className="space-y-4">
                      <a
                        href={getSkrillPaymentUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          type="button"
                          className="w-full bg-[#862165] hover:bg-[#6b1a50] text-white h-14 text-lg font-semibold"
                        >
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Pay ${product.price} with Skrill
                        </Button>
                      </a>

                      <p className="text-center text-sm text-[#8A94A6]">
                        Click to open Skrill payment page in a new tab
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                      <Separator />
                      <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-[#8A94A6]">
                        Already paid?
                      </span>
                    </div>

                    {/* Confirmation Section */}
                    <div className="space-y-4">
                      <p className="font-medium text-[#0F1C2E]">Confirm Your Payment</p>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#2B2E34]">Skrill Transaction ID (Optional)</label>
                        <Input
                          type="text"
                          placeholder="e.g., 1234567890"
                          value={formData.transactionId}
                          onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                          className="border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                        />
                        <p className="text-xs text-[#8A94A6]">
                          Found in your Skrill transaction history or email confirmation
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#2B2E34]">Additional Notes (Optional)</label>
                        <Textarea
                          placeholder="Any notes about your order..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="border-[#1F6F78]/20 focus:border-[#3DD4B0] min-h-[80px]"
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-4 rounded-lg">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={processing}
                      className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-14 text-lg font-semibold"
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Confirm Order
                        </>
                      )}
                    </Button>

                    {/* Back Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setPaymentStep('info')}
                      className="w-full"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Customer Info
                    </Button>
                  </CardContent>
                </Card>
              </form>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-[#8A94A6]">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#3DD4B0]" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
                <span>30-day money-back</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#3DD4B0]" />
                <span>Verified by Skrill</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-[#0F1C2E]">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Product */}
                <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <div className="flex-1">
                    <Badge variant="outline" className="text-xs mb-1">{product.tier}</Badge>
                    <p className="font-semibold text-[#0F1C2E]">{product.name}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-bold text-[#3DD4B0]">${product.price}</span>
                      {product.comparePrice > product.price && (
                        <span className="text-sm text-slate-400 line-through">${product.comparePrice}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-[#2B2E34]">Includes:</p>
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-[#3DD4B0]" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between text-[#8A94A6]">
                  <span>Subtotal</span>
                  <span>${product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#8A94A6]">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                {product.comparePrice > product.price && (
                  <div className="flex justify-between text-green-600">
                    <span>You Save</span>
                    <span>-${(product.comparePrice - product.price).toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold text-[#0F1C2E]">
                  <span>Total</span>
                  <span>${product.price.toFixed(2)} USD</span>
                </div>

                {/* Trust */}
                <div className="pt-4 space-y-3 border-t">
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]">
                    <CheckCircle2 className="w-4 w-4 text-[#3DD4B0]" />
                    <span>Instant access after payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]">
                    <Shield className="w-4 w-4 text-[#3DD4B0]" />
                    <span>Access code sent via email</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]">
                    <Sparkles className="w-4 w-4 text-[#3DD4B0]" />
                    <span>Lifetime access</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#1F6F78] mx-auto mb-4" />
          <p className="text-[#8A94A6]">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
