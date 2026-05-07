'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Sparkles, ArrowRight, Loader2, Mail } from 'lucide-react';
import { useTranslations } from "@/components/providers/LocaleProvider";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentId = searchParams.get('paymentId');
  const t = useTranslations("payment.success");

  return (
    <div className="min-h-screen bg-[#F6F8FA] py-16 px-4">
      <div className="max-w-lg mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-[#0F1C2E] mb-2">{t('title')}</h1>
          <p className="text-slate-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Order Details */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">{t('orderId')}</span>
                <span className="font-mono text-sm">{orderId}</span>
              </div>
              {paymentId && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">{t('paymentId')}</span>
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
            <p className="text-sm font-medium text-[#0F1C2E] mb-1">{t('accessCodeSent')}</p>
            <p className="text-xs text-slate-500">
              {t('accessCodeDesc')}
            </p>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-[#0F1C2E] mb-4">{t('whatsNext')}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[#3DD4B0]">1</span>
                </div>
                <p className="text-slate-600">{t('step1')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[#3DD4B0]">2</span>
                </div>
                <p className="text-slate-600">{t('step2')}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-[#3DD4B0]">3</span>
                </div>
                <p className="text-slate-600">{t('step3')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/apps" className="flex-1">
            <Button className="w-full h-12 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('enterAccessCode')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/account" className="flex-1">
            <Button variant="outline" className="w-full h-12 font-semibold">
              {t('viewAccount')}
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
