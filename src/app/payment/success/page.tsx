'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Sparkles, ArrowRight, Loader2, Mail } from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId');

  return (
    <div className="min-h-screen bg-[#F6F8FA] py-16 px-4">
      <div className="max-w-lg mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-[#0F1C2E] mb-2">Payment Successful!</h1>
          <p className="text-slate-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Order ID</span>
                <span className="font-mono text-sm">{orderId}</span>
              </div>
              {paymentId && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Payment ID</span>
                  <span className="font-mono text-sm">{paymentId}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Access Code Email Notice */}
        <Card className="border-2 border-[#3DD4B0] shadow-lg mb-6">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-[#3DD4B0]" />
            </div>
            <p className="text-sm font-medium text-[#0F1C2E] mb-1">Access Code Sent to Your Email</p>
            <p className="text-xs text-slate-500">
              Your access code has been sent to the email address used during checkout. Please check your inbox (and spam folder) to find it.
            </p>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-[#0F1C2E] mb-4">What's Next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[#3DD4B0]">1</span>
                </div>
                <p className="text-slate-600">Check your email for confirmation and access code</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[#3DD4B0]">2</span>
                </div>
                <p className="text-slate-600">Go to the Apps page and enter your access code</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[#3DD4B0]">3</span>
                </div>
                <p className="text-slate-600">Start your transformation journey!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apps" className="flex-1">
            <Button className="w-full h-12 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              Enter Access Code
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/account" className="flex-1">
            <Button variant="outline" className="w-full h-12 font-semibold">
              View Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#3DD4B0]" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
