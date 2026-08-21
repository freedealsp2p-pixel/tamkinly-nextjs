'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  RefreshCw,
  CheckCircle2,
  Clock,
  Mail,
  CreditCard,
  Shield,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useTranslations } from '@/components/providers/LocaleProvider';

export default function RefundPolicyPage() {
  const t = useTranslations('refundPage');

  const refundSteps = [
    {
      step: 1,
      title: t('step1Title'),
      description: t('step1Desc')
    },
    {
      step: 2,
      title: t('step2Title'),
      description: t('step2Desc')
    },
    {
      step: 3,
      title: t('step3Title'),
      description: t('step3Desc')
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
              <RefreshCw className="w-3.5 h-3.5 mr-2" />
              {t('badge')}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-slate-300">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Guarantee Badge */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#3DD4B0]" />
              <span className="text-sm font-medium text-[#0F1C2E]">{t('satisfactionGuaranteed')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1F6F78]" />
              <span className="text-sm font-medium text-[#0F1C2E]">{t('thirtyDayRefund')}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#0F1C2E]" />
              <span className="text-sm font-medium text-[#0F1C2E]">{t('fullRefundOriginal')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* How to Request Refund */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-8 text-center">
                {t('howToRequest')}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {refundSteps.map((item) => (
                  <Card key={item.step} className="border-0 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3DD4B0] to-[#1F6F78]" />
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-[#3DD4B0]">{item.step}</span>
                      </div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#8A94A6]">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 lg:p-10 space-y-8">
                {/* Summary */}
                <div className="bg-[#3DD4B0]/5 border border-[#3DD4B0]/20 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-[#3DD4B0]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-2">{t('ourPromise')}</h3>
                      <p className="text-[#2B2E34] leading-relaxed">
                        {t('ourPromiseDesc')}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Eligibility */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('refundEligibility')}</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[#0F1C2E]">{t('allProductsEligible')}</h4>
                        <p className="text-sm text-[#8A94A6]">{t('allProductsEligibleDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[#0F1C2E]">{t('noReasonRequired')}</h4>
                        <p className="text-sm text-[#8A94A6]">{t('noReasonRequiredDesc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[#0F1C2E]">{t('keepYourProgress')}</h4>
                        <p className="text-sm text-[#8A94A6]">{t('keepYourProgressDesc')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Timeline */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('refundTimeline')}</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-[#F6F8FA] rounded-lg">
                      <div className="w-20 text-center">
                        <span className="text-2xl font-bold text-[#3DD4B0]">1-2</span>
                        <p className="text-xs text-[#8A94A6]">{t('days')}</p>
                      </div>
                      <p className="text-[#2B2E34]">{t('reviewApproved')}</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#F6F8FA] rounded-lg">
                      <div className="w-20 text-center">
                        <span className="text-2xl font-bold text-[#1F6F78]">3-5</span>
                        <p className="text-xs text-[#8A94A6]">{t('days')}</p>
                      </div>
                      <p className="text-[#2B2E34]">{t('refundProcessed')}</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#F6F8FA] rounded-lg">
                      <div className="w-20 text-center">
                        <span className="text-2xl font-bold text-[#0F1C2E]">5-10</span>
                        <p className="text-xs text-[#8A94A6]">{t('days')}</p>
                      </div>
                      <p className="text-[#2B2E34]">{t('fundsAppear')}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Non-Refundable */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('exceptions')}</h2>
                  <div className="bg-[#f8eded] border border-[#e4c0c0] rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#C97B7B] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[#a86060] mb-1">{t('afterThirtyDays')}</h4>
                        <p className="text-sm text-[#C97B7B]">
                          {t('afterThirtyDaysDesc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* How Refunds Work */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('howRefundsProcessed')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed mb-4">
                    {t('howRefundsDesc')}
                  </p>
                  <ul className="space-y-2 text-sm text-[#2B2E34]">
                    <li className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#1F6F78]" />
                      <span><strong>{t('creditDebitCards')}</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#1F6F78]" />
                      <span><strong>{t('paypal')}</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#1F6F78]" />
                      <span><strong>{t('otherMethods')}</strong></span>
                    </li>
                  </ul>
                </div>

                <Separator />

                {/* Contact */}
                <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] -mx-8 lg:-mx-10 px-8 lg:px-10 py-8 rounded-b-lg">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl font-bold text-white mb-3">{t('needRefund')}</h2>
                    <p className="text-slate-300 mb-6">
                      {t('needRefundDesc')}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link href="/contact">
                        <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                          <Mail className="w-4 h-4 mr-2" />
                          {t('requestRefund')}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <a href="mailto:hello@tamkinly.com">
                        <Button variant="white">
                          hello@tamkinly.com
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
