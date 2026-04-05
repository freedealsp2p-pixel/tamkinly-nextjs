'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Shield,
  Lock,
  Eye,
  Database,
  Users,
  Mail,
  ArrowRight
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
              <Shield className="w-3.5 h-3.5 mr-2" />
              Privacy Policy
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              Your Privacy Matters
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
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-1">Data Encryption</h3>
                  <p className="text-sm text-[#8A94A6]">All data is encrypted in transit and at rest</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-6 h-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-1">Transparency</h3>
                  <p className="text-sm text-[#8A94A6]">Clear about what we collect and why</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0F1C2E]/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-[#0F1C2E]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-1">Your Rights</h3>
                  <p className="text-sm text-[#8A94A6]">Control over your personal data</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 lg:p-10 space-y-8">
                {/* Introduction */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Introduction</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    Tamkinly (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website tamkinly.com or use our products and services.
                  </p>
                </div>

                <Separator />

                {/* Information We Collect */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#3DD4B0]" />
                    Information We Collect
                  </h2>
                  <div className="space-y-4 text-[#2B2E34] leading-relaxed">
                    <div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-2">Personal Information</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Name and email address (when you create an account or make a purchase)</li>
                        <li>Payment information (processed securely through our payment processor)</li>
                        <li>Access codes and purchase history</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-2">Usage Data</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Pages visited and features used within our products</li>
                        <li>Device type, browser type, and operating system</li>
                        <li>Referring website and visit timestamps</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-2">Progress Data</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Your responses and progress in our interactive worksheets</li>
                        <li>Saved data in planners and journals</li>
                        <li>Quiz results and assessments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* How We Use Information */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">How We Use Your Information</h2>
                  <ul className="space-y-3 text-[#2B2E34]">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-[#3DD4B0]">1</span>
                      </div>
                      <span><strong>Provide Services:</strong> Deliver products you purchased and maintain your account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-[#3DD4B0]">2</span>
                      </div>
                      <span><strong>Save Progress:</strong> Store your work and sync across devices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-[#3DD4B0]">3</span>
                      </div>
                      <span><strong>Communicate:</strong> Send purchase confirmations and support responses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-[#3DD4B0]">4</span>
                      </div>
                      <span><strong>Improve:</strong> Analyze usage to enhance our products</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                {/* Data Security */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Data Security</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    We implement industry-standard security measures including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-[#2B2E34] mt-3">
                    <li>SSL/TLS encryption for all data transmission</li>
                    <li>Encrypted storage of sensitive information</li>
                    <li>Secure payment processing through trusted providers</li>
                    <li>Regular security audits and updates</li>
                  </ul>
                </div>

                <Separator />

                {/* Your Rights */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Your Rights</h2>
                  <p className="text-[#2B2E34] leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-[#F6F8FA] rounded-lg">
                      <h4 className="font-semibold text-[#0F1C2E] text-sm">Access</h4>
                      <p className="text-xs text-[#8A94A6]">Request a copy of your personal data</p>
                    </div>
                    <div className="p-4 bg-[#F6F8FA] rounded-lg">
                      <h4 className="font-semibold text-[#0F1C2E] text-sm">Correction</h4>
                      <p className="text-xs text-[#8A94A6]">Update or correct your information</p>
                    </div>
                    <div className="p-4 bg-[#F6F8FA] rounded-lg">
                      <h4 className="font-semibold text-[#0F1C2E] text-sm">Deletion</h4>
                      <p className="text-xs text-[#8A94A6]">Request deletion of your data</p>
                    </div>
                    <div className="p-4 bg-[#F6F8FA] rounded-lg">
                      <h4 className="font-semibold text-[#0F1C2E] text-sm">Portability</h4>
                      <p className="text-xs text-[#8A94A6]">Export your data in a readable format</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Cookies */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Cookies & Tracking</h2>
                  <p className="text-[#2B2E34] leading-relaxed mb-4">
                    We use cookies and similar tracking technologies to improve your experience on our website. Here&apos;s what we use:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-[#2B2E34] mt-3">
                    <li><strong>Essential Cookies:</strong> Required for the website to function properly (session management, authentication)</li>
                    <li><strong>Analytics Cookies:</strong> We use Google Analytics to understand how visitors interact with our website. This includes page views, time spent, and navigation patterns. This data helps us improve our services.</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences (like language and theme)</li>
                  </ul>
                  <div className="mt-4 p-4 bg-[#F6F8FA] rounded-lg">
                    <h4 className="font-semibold text-[#0F1C2E] text-sm mb-2">Google Analytics</h4>
                    <p className="text-xs text-[#8A94A6]">
                      We use Google Analytics 4 to collect anonymous usage data. Google Analytics may collect your IP address, browser type, device information, and browsing behavior. You can opt out of Google Analytics by installing the{' '}
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#3DD4B0] hover:underline">
                        Google Analytics Opt-out Browser Add-on
                      </a>.
                    </p>
                  </div>
                  <p className="text-[#2B2E34] leading-relaxed mt-4">
                    We do not use third-party tracking cookies for advertising purposes or sell your data to advertisers. You can manage cookie preferences through our cookie consent banner or your browser settings.
                  </p>
                </div>

                <Separator />

                {/* Children */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">Children&apos;s Privacy</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child, please contact us.
                  </p>
                </div>

                <Separator />

                {/* Contact */}
                <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] -mx-8 lg:-mx-10 px-8 lg:px-10 py-8 rounded-b-lg">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl font-bold text-white mb-3">Questions About Privacy?</h2>
                    <p className="text-slate-300 mb-6">
                      Contact us at any time for privacy-related inquiries
                    </p>
                    <Link href="/contact">
                      <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Privacy Team
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
