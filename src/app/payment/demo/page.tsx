'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';
import {
  CreditCard,
  Shield,
  Lock,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Building2,
  Wallet,
} from 'lucide-react';

function DemoPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('payment.demo');
  const { locale } = useLocale();
  
  const paymentId = searchParams.get('paymentId');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');
  const email = searchParams.get('email');

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'bank'>('card');

  // Card form state
  const [cardForm, setCardForm] = useState({
    number: '4242 4242 4242 4242',
    expiry: '12/28',
    cvv: '123',
    name: 'Test User',
  });

  const handlePayment = async () => {
    setProcessing(true);
    setError(null);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Call webhook directly for demo
      const response = await fetch('/api/payment/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId,
          orderId,
          status: 'completed',
          amount: parseFloat(amount || '0'),
          currency: 'USD',
          customerEmail: email,
          timestamp: new Date().toISOString(),
          metadata: {
            productId: 'planner',
          },
        }),
      });

      if (response.ok) {
        setSuccess(true);
        // Redirect to success page after 2 seconds
        setTimeout(() => {
          router.push(`/payment/success?orderId=${orderId}&paymentId=${paymentId}`);
        }, 2000);
      } else {
        setError(t('paymentFailed'));
      }
    } catch (err) {
      setError(t('paymentError'));
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] flex items-center justify-center p-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Card className="max-w-md w-full border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-[#0F1C2E] mb-2">{t('paymentSuccessful')}</h1>
            <p className="text-slate-600 mb-4">{t('redirecting')}</p>
            <Loader2 className="w-6 h-6 animate-spin text-[#3DD4B0] mx-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] py-8 px-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Building2 className="w-8 h-8 text-[#3DD4B0]" />
            <span className="text-2xl font-bold text-white">Tahweel</span>
          </div>
          <p className="text-slate-300">{t('securePaymentGateway')}</p>
        </div>

        {/* Order Summary */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600">{t('orderId')}</span>
              <span className="font-mono text-sm">{orderId}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600">{t('emailLabel')}</span>
              <span className="text-sm">{email}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{t('total')}</span>
              <span className="text-2xl font-bold text-[#0F1C2E]">${amount}</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-[#0F1C2E] mb-4">{t('paymentMethod')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedMethod('card')}
                className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  selectedMethod === 'card' 
                    ? 'border-[#3DD4B0] bg-[#3DD4B0]/10' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <CreditCard className={`w-6 h-6 ${selectedMethod === 'card' ? 'text-[#3DD4B0]' : 'text-slate-400'}`} />
                <span className="text-sm font-medium">{t('card')}</span>
              </button>
              <button
                onClick={() => setSelectedMethod('bank')}
                className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                  selectedMethod === 'bank' 
                    ? 'border-[#3DD4B0] bg-[#3DD4B0]/10' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Wallet className={`w-6 h-6 ${selectedMethod === 'bank' ? 'text-[#3DD4B0]' : 'text-slate-400'}`} />
                <span className="text-sm font-medium">{t('bankTransfer')}</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Card Form */}
        {selectedMethod === 'card' && (
          <Card className="border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-xs text-slate-500">{t('securePaymentBy')}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">{t('cardNumber')}</label>
                  <Input
                    value={cardForm.number}
                    onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">{t('expiry')}</label>
                    <Input
                      value={cardForm.expiry}
                      onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">{t('cvv')}</label>
                    <Input
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                      placeholder="123"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">{t('nameOnCard')}</label>
                  <Input
                    value={cardForm.name}
                    onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Demo Notice */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700">
                  {t('demoNotice')}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bank Transfer */}
        {selectedMethod === 'bank' && (
          <Card className="border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="text-center">
                <Building2 className="w-12 h-12 text-[#3DD4B0] mx-auto mb-4" />
                <h3 className="font-semibold text-[#0F1C2E] mb-2">{t('bankTransferDetails')}</h3>
                <p className="text-sm text-slate-600 mb-4">
                  {t('transferAmount')}
                </p>
                <div className="bg-slate-50 p-4 rounded-lg text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('bankName')}</span>
                    <span className="font-medium">{t('demoBank')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('accountNumber')}</span>
                    <span className="font-medium">1234567890</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('iban')}</span>
                    <span className="font-medium">DE89370400440532013000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('reference')}</span>
                    <span className="font-medium">{orderId}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-[#FC6D26] bg-[#FFF3E8] p-4 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Pay Button */}
        <Button
          onClick={handlePayment}
          disabled={processing}
          className="w-full h-14 text-lg font-semibold bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
        >
          {processing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {t('processing')}
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              {t('pay')} ${amount}
            </>
          )}
        </Button>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#3DD4B0]" />
            <span>{t('sslSecured')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#3DD4B0]" />
            <span>{t('encrypted')}</span>
          </div>
        </div>

        {/* Cancel Link */}
        <div className="text-center mt-6">
          <Link href={`/payment/cancel?orderId=${orderId}`} className="text-sm text-slate-400 hover:text-white">
            {t('cancelPayment')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DemoPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#3DD4B0]" />
      </div>
    }>
      <DemoPaymentContent />
    </Suspense>
  );
}
