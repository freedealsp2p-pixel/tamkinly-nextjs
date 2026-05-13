'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslations } from "@/components/providers/LocaleProvider";

function CancelContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const t = useTranslations("payment.cancel");

  return (
    <div className="min-h-screen bg-[#F6F8FA] py-16 px-4">
      <div className="max-w-lg mx-auto">
        {/* Cancel Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-[#FFE4CC] flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-[#FC6D26]" />
          </div>
          <h1 className="text-3xl font-bold text-[#0F1C2E] mb-2">{t('title')}</h1>
          <p className="text-slate-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Order Info */}
        {orderId && (
          <Card className="border-0 shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">{t('orderId')}</span>
                <span className="font-mono text-sm">{orderId}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Text */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-[#0F1C2E] mb-3">{t('needHelp')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {t('helpDesc')}
            </p>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/products" className="flex-1">
            <Button className="w-full h-12 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('backToProducts')}
            </Button>
          </Link>
          <Link href="/contact" className="flex-1">
            <Button variant="outline" className="w-full h-12 font-semibold">
              {t('contactSupport')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#3DD4B0]" />
      </div>
    }>
      <CancelContent />
    </Suspense>
  );
}
