'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  HelpCircle,
  MessageCircle,
  Mail,
  ArrowRight,
  Package,
  CreditCard,
  Download,
  RefreshCw,
  Shield,
  Clock
} from 'lucide-react';

const faqCategories = [
  {
    title: 'Products & Purchases',
    icon: Package,
    questions: [
      {
        q: 'What products does Tamkinly offer?',
        a: 'Tamkinly offers digital products focused on identity transformation and personal development. Our flagship product is the Identity Recode Planner, a 30-day guided journey to help you rediscover and reconstruct your authentic self. We also offer worksheets, daily planners, and bundle packages.'
      },
      {
        q: 'How do I access my purchased products?',
        a: 'After purchase, you will receive an access code via email. Enter this code on our Apps page along with your email to unlock full access. You can also create an account with the same email to automatically link all your purchases.'
      },
      {
        q: 'What format are the products in?',
        a: 'All our products are digital and can be accessed directly through our web application. The planners and worksheets are interactive and can be used on any device with a web browser. You can also print them for personal use.'
      }
    ]
  },
  {
    title: 'Payments & Pricing',
    icon: CreditCard,
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and other secure payment methods through our payment processor. All transactions are encrypted and secure.'
      },
      {
        q: 'Is there a subscription fee?',
        a: 'No! All our products are one-time purchases. You pay once and get lifetime access, including any future updates to the product. No hidden fees, no recurring charges.'
      },
      {
        q: 'Do you offer discounts?',
        a: 'We occasionally run promotions and offer bundle discounts. Sign up for our newsletter to stay informed about special offers. We also offer special pricing for educational institutions and therapists.'
      }
    ]
  },
  {
    title: 'Access & Downloads',
    icon: Download,
    questions: [
      {
        q: 'How long does my access last?',
        a: 'Your access is lifetime! Once you purchase a product, you can access it forever through our web application. This includes any updates or improvements we make to the product.'
      },
      {
        q: 'Can I access my products on multiple devices?',
        a: 'Yes! Our web application works on any device with a browser - desktop, tablet, or mobile. Your progress is synced across devices when you log in to your account.'
      },
      {
        q: 'Can I download the products for offline use?',
        a: 'Our interactive web tools require an internet connection. However, many worksheets and templates can be printed or exported for offline use. We are working on offline-capable versions for future releases.'
      }
    ]
  },
  {
    title: 'Returns & Refunds',
    icon: RefreshCw,
    questions: [
      {
        q: 'What is your refund policy?',
        a: 'We offer a 30-day money-back guarantee on all products. If you are not satisfied with your purchase for any reason, contact us within 30 days for a full refund, no questions asked.'
      },
      {
        q: 'How do I request a refund?',
        a: 'Simply contact our support team at hello@tamkinly.com with your order details and reason for refund. We process refunds within 3-5 business days.'
      }
    ]
  }
];

const quickAnswers = [
  {
    icon: Clock,
    title: 'Instant Access',
    description: 'Get immediate access to your products after purchase'
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'All transactions are encrypted and secure'
  },
  {
    icon: RefreshCw,
    title: '30-Day Guarantee',
    description: 'Full refund within 30 days, no questions asked'
  },
  {
    icon: Download,
    title: 'Lifetime Updates',
    description: 'Get all future product updates for free'
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
              <HelpCircle className="w-3.5 h-3.5 mr-2" />
              Frequently Asked Questions
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
              How Can We Help You?
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Find answers to common questions about our products, purchases, and services.
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answers */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickAnswers.map((item, index) => (
              <Card key={index} className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#8A94A6]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            {faqCategories.map((category, catIndex) => (
              <Card key={catIndex} className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#0F1C2E] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1F6F78]/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-[#1F6F78]" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`${catIndex}-${index}`} className="border-b border-slate-200 last:border-0">
                        <AccordionTrigger className="text-left text-[#0F1C2E] hover:text-[#1F6F78] py-4">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-[#2B2E34] leading-relaxed pb-4">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-[#3DD4B0]" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#0F1C2E] mb-4">
              Still Have Questions?
            </h2>
            <p className="text-[#8A94A6] mb-8">
              Our support team is here to help. We typically respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 px-8">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
              <a href="mailto:hello@tamkinly.com">
                <Button variant="outline" className="h-12 px-8">
                  hello@tamkinly.com
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
