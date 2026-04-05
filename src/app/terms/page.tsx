'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scale,
  Mail,
  ArrowRight
} from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
              <FileText className="w-3.5 h-3.5 mr-2" />
              Terms of Service
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-slate-300">
              Last updated: April 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Quick Summary */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="w-10 h-10 text-[#3DD4B0] mx-auto mb-3" />
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">You May</h3>
                  <ul className="text-sm text-[#8A94A6] space-y-1 text-left">
                    <li>• Use products for personal use</li>
                    <li>• Print for personal use</li>
                    <li>• Access updates forever</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">You May Not</h3>
                  <ul className="text-sm text-[#8A94A6] space-y-1 text-left">
                    <li>• Share access codes</li>
                    <li>• Resell or redistribute</li>
                    <li>• Remove copyright notices</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">Important</h3>
                  <ul className="text-sm text-[#8A94A6] space-y-1 text-left">
                    <li>• Products are &quot;as is&quot;</li>
                    <li>• Not professional advice</li>
                    <li>• We may update terms</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 lg:p-10 space-y-8">
                {/* Introduction */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Agreement to Terms</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    By accessing or using Tamkinly&apos;s website and products, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </div>

                <Separator />

                {/* Use License */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[#3DD4B0]" />
                    License to Use
                  </h2>
                  <p className="text-[#2B2E34] leading-relaxed mb-4">
                    When you purchase a product from Tamkinly, you receive a personal, non-exclusive, non-transferable license to:
                  </p>
                  <ul className="space-y-3 text-[#2B2E34]">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <span>Access and use the digital product for your personal, non-commercial purposes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <span>Print copies for your own personal use</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <span>Receive all future updates to the purchased product at no additional cost</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                {/* Restrictions */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Restrictions</h2>
                  <p className="text-[#2B2E34] leading-relaxed mb-4">
                    You may not:
                  </p>
                  <ul className="space-y-3 text-[#2B2E34]">
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Share, sell, rent, lease, or distribute access codes to others</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Copy, reproduce, or redistribute the content for commercial purposes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Modify, create derivative works, or remove copyright notices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Use the products in a way that violates applicable laws</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                {/* Intellectual Property */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Intellectual Property</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    All content on this website, including text, graphics, logos, images, and software, is the property of Tamkinly and is protected by international copyright laws. The Tamkinly name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Tamkinly.
                  </p>
                </div>

                <Separator />

                {/* Disclaimer */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Disclaimer</h2>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        <strong>Important:</strong> Our products are for personal development purposes only and are not a substitute for professional mental health advice, diagnosis, or treatment.
                      </p>
                    </div>
                  </div>
                  <p className="text-[#2B2E34] leading-relaxed">
                    The products and services provided by Tamkinly are on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied. We do not guarantee specific results from using our products.
                  </p>
                </div>

                <Separator />

                {/* Limitation of Liability */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Limitation of Liability</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    To the maximum extent permitted by law, Tamkinly shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses. Our total liability shall not exceed the amount you paid for the product.
                  </p>
                </div>

                <Separator />

                {/* Account */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Account Security</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You agree to notify us immediately of any unauthorized use of your account.
                  </p>
                </div>

                <Separator />

                {/* Termination */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Termination</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    We reserve the right to terminate or suspend your access to our services at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
                  </p>
                </div>

                <Separator />

                {/* Changes */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Changes to Terms</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    We may modify these terms at any time. We will notify users of significant changes via email or through our website. Your continued use of our services after changes constitutes acceptance of the updated terms.
                  </p>
                </div>

                <Separator />

                {/* Governing Law */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Governing Law</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
                  </p>
                </div>

                <Separator />

                {/* Contact */}
                <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] -mx-8 lg:-mx-10 px-8 lg:px-10 py-8 rounded-b-lg">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl font-bold text-white mb-3">Questions About Terms?</h2>
                    <p className="text-slate-300 mb-6">
                      Contact us for any questions regarding these terms
                    </p>
                    <Link href="/contact">
                      <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Us
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
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
