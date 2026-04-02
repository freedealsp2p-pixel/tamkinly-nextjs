'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
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
  Clock
} from 'lucide-react';

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
  
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get product directly from productId (no state needed)
  const product = productId && productsData[productId] ? productsData[productId] : null;

  // Form state - initialize with saved user data if available
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const userStored = localStorage.getItem('tamkinly_user');
      if (userStored) {
        try {
          const user = JSON.parse(userStored);
          return {
            name: user.name || '',
            email: user.email || '',
          };
        } catch {
          // Ignore JSON parse errors
        }
      }
    }
    return { name: '', email: '' };
  });

  // Handle checkout - Redirect to Tahweel Payment Gateway
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    try {
      // Create payment session with Tahweel
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: product?.price,
          currency: 'USD',
          customerEmail: formData.email,
          customerName: formData.name,
          productId: product?.id,
          productName: product?.name,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.paymentUrl) {
        // Redirect to Tahweel payment page
        window.location.href = data.paymentUrl;
      } else {
        setError(data.error || 'Failed to create payment session. Please try again.');
        setProcessing(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Network error. Please try again.');
      setProcessing(false);
    }
  };

  // No product selected - show product selection
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
            <h1 className="text-3xl font-bold text-[#0F1C2E] mb-4">Order Complete!</h1>
            <p className="text-[#8A94A6] mb-8">
              Thank you for your purchase. Your access code has been sent to your email.
            </p>
            
            {accessCode && (
              <Card className="border-0 shadow-sm mb-8">
                <CardContent className="p-6">
                  <p className="text-sm text-[#8A94A6] mb-2">Your Access Code</p>
                  <p className="text-3xl font-mono font-bold text-[#0F1C2E]">{accessCode}</p>
                  <p className="text-xs text-[#8A94A6] mt-2">Save this code to access your products</p>
                </CardContent>
              </Card>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apps">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 px-8">
                  Access Your Products
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/account">
                <Button variant="outline" className="h-12 px-8">
                  View Account
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
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleCheckout}>
              {/* Customer Info */}
              <Card className="border-0 shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                    <User className="w-5 h-5 text-[#3DD4B0]" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name
                    </label>
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
                    <label className="text-sm font-medium text-[#2B2E34] flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
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
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Card className="border-0 shadow-sm mb-6">
                <CardHeader>
                  <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#3DD4B0]" />
                    Payment via Tahweel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[#3DD4B0]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F1C2E]">Secure Payment</p>
                      <p className="text-xs text-slate-500">Powered by Tahweel</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4">
                    You will be redirected to Tahweel&apos;s secure payment gateway to complete your purchase.
                  </p>
                  
                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-[#2B2E34]">Accepted Payment Methods:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-sm">Credit Card</Badge>
                      <Badge variant="outline" className="text-sm">Debit Card</Badge>
                      <Badge variant="outline" className="text-sm">Bank Transfer</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-4 rounded-lg mb-6">
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
                    Creating Payment...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Proceed to Payment — ${product.price}
                  </>
                )}
              </Button>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-[#8A94A6]">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#3DD4B0]" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
                  <span>30-day money-back</span>
                </div>
              </div>
            </form>
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
                  <span>${product.price.toFixed(2)}</span>
                </div>

                {/* Trust */}
                <div className="pt-4 space-y-3 border-t">
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]">
                    <CheckCircle2 className="w-4 h-4 text-[#3DD4B0]" />
                    <span>Instant access after purchase</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]">
                    <Shield className="w-4 h-4 text-[#3DD4B0]" />
                    <span>Access code sent via email</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]">
                    <Sparkles className="w-4 h-4 text-[#3DD4B0]" />
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
