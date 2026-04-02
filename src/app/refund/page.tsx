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

const refundSteps = [
  {
    step: 1,
    title: 'Contact Us',
    description: 'Email us at hello@tamkinly.com within 30 days of purchase'
  },
  {
    step: 2,
    title: 'Provide Details',
    description: 'Include your order number and reason for refund request'
  },
  {
    step: 3,
    title: 'Receive Refund',
    description: 'We process refunds within 3-5 business days'
  }
];

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
              <RefreshCw className="w-3.5 h-3.5 mr-2" />
              Refund Policy
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              30-Day Money Back Guarantee
            </h1>
            <p className="text-slate-300">
              Not satisfied? Get a full refund within 30 days, no questions asked.
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
              <span className="text-sm font-medium text-[#0F1C2E]">100% Satisfaction Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1F6F78]" />
              <span className="text-sm font-medium text-[#0F1C2E]">30-Day Refund Window</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#0F1C2E]" />
              <span className="text-sm font-medium text-[#0F1C2E]">Full Refund to Original Payment</span>
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
                How to Request a Refund
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
                      <h3 className="font-semibold text-[#0F1C2E] mb-2">Our Promise</h3>
                      <p className="text-[#2B2E34] leading-relaxed">
                        We stand behind our products 100%. If you&apos;re not completely satisfied with your purchase, we&apos;ll refund your money in full. No questions asked, no hard feelings.
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Eligibility */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Refund Eligibility</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[#0F1C2E]">All Products Eligible</h4>
                        <p className="text-sm text-[#8A94A6]">Every product we sell is covered by our 30-day guarantee</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[#0F1C2E]">No Reason Required</h4>
                        <p className="text-sm text-[#8A94A6]">You don&apos;t need to explain why - just let us know you want a refund</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[#0F1C2E]">Keep Your Progress</h4>
                        <p className="text-sm text-[#8A94A6]">Any work you&apos;ve completed is yours to keep</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Timeline */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Refund Timeline</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-[#F6F8FA] rounded-lg">
                      <div className="w-20 text-center">
                        <span className="text-2xl font-bold text-[#3DD4B0]">1-2</span>
                        <p className="text-xs text-[#8A94A6]">days</p>
                      </div>
                      <p className="text-[#2B2E34]">Request reviewed and approved</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#F6F8FA] rounded-lg">
                      <div className="w-20 text-center">
                        <span className="text-2xl font-bold text-[#1F6F78]">3-5</span>
                        <p className="text-xs text-[#8A94A6]">days</p>
                      </div>
                      <p className="text-[#2B2E34]">Refund processed to original payment method</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-[#F6F8FA] rounded-lg">
                      <div className="w-20 text-center">
                        <span className="text-2xl font-bold text-[#0F1C2E]">5-10</span>
                        <p className="text-xs text-[#8A94A6]">days</p>
                      </div>
                      <p className="text-[#2B2E34]">Funds appear in your account (varies by bank)</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Non-Refundable */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Exceptions</h2>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800 mb-1">After 30 Days</h4>
                        <p className="text-sm text-amber-700">
                          Refund requests made after the 30-day window may be considered on a case-by-case basis but are not guaranteed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* How Refunds Work */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">How Refunds Are Processed</h2>
                  <p className="text-[#2B2E34] leading-relaxed mb-4">
                    Refunds are processed back to the original payment method used for the purchase:
                  </p>
                  <ul className="space-y-2 text-sm text-[#2B2E34]">
                    <li className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#1F6F78]" />
                      <span><strong>Credit/Debit Cards:</strong> Refunded to the same card (5-10 business days)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#1F6F78]" />
                      <span><strong>PayPal:</strong> Refunded to your PayPal account (3-5 business days)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#1F6F78]" />
                      <span><strong>Other Methods:</strong> Refunded to the original payment source</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                {/* Contact */}
                <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] -mx-8 lg:-mx-10 px-8 lg:px-10 py-8 rounded-b-lg">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl font-bold text-white mb-3">Need a Refund?</h2>
                    <p className="text-slate-300 mb-6">
                      Contact our support team and we&apos;ll process your refund promptly
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <Link href="/contact">
                        <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                          <Mail className="w-4 h-4 mr-2" />
                          Request Refund
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
