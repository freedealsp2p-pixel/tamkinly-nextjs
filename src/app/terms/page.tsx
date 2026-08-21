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
import { useTranslations } from '@/components/providers/LocaleProvider';

export default function TermsOfServicePage() {
  const t = useTranslations('termsPage');

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
              <FileText className="w-3.5 h-3.5 mr-2" />
              {t('badge')}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-slate-300">
              {t('lastUpdated')}
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
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">{t('youMay')}</h3>
                  <ul className="text-sm text-[#8A94A6] space-y-1 text-left">
                    <li>• {t('youMay1')}</li>
                    <li>• {t('youMay2')}</li>
                    <li>• {t('youMay3')}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <XCircle className="w-10 h-10 text-[#C97B7B] mx-auto mb-3" />
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">{t('youMayNot')}</h3>
                  <ul className="text-sm text-[#8A94A6] space-y-1 text-left">
                    <li>• {t('youMayNot1')}</li>
                    <li>• {t('youMayNot2')}</li>
                    <li>• {t('youMayNot3')}</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-10 h-10 text-[#C97B7B] mx-auto mb-3" />
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">{t('important')}</h3>
                  <ul className="text-sm text-[#8A94A6] space-y-1 text-left">
                    <li>• {t('important1')}</li>
                    <li>• {t('important2')}</li>
                    <li>• {t('important3')}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 lg:p-10 space-y-8">
                {/* Introduction */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('agreementToTerms')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    {t('agreementDesc')}
                  </p>
                </div>

                <Separator />

                {/* Use License */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-[#3DD4B0]" />
                    {t('licenseToUse')}
                  </h2>
                  <p className="text-[#2B2E34] leading-relaxed mb-4">
                    {t('licenseDesc')}
                  </p>
                  <ul className="space-y-3 text-[#2B2E34]">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <span>{t('license1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <span>{t('license2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                      <span>{t('license3')}</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                {/* Restrictions */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('restrictions')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed mb-4">
                    {t('restrictionsDesc')}
                  </p>
                  <ul className="space-y-3 text-[#2B2E34]">
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-[#C97B7B] flex-shrink-0 mt-0.5" />
                      <span>{t('restriction1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-[#C97B7B] flex-shrink-0 mt-0.5" />
                      <span>{t('restriction2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-[#C97B7B] flex-shrink-0 mt-0.5" />
                      <span>{t('restriction3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-[#C97B7B] flex-shrink-0 mt-0.5" />
                      <span>{t('restriction4')}</span>
                    </li>
                  </ul>
                </div>

                <Separator />

                {/* Intellectual Property */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('intellectualProperty')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    {t('intellectualPropertyDesc')}
                  </p>
                </div>

                <Separator />

                {/* Disclaimer */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('disclaimer')}</h2>
                  <div className="bg-[#f8eded] border border-[#e4c0c0] rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-[#C97B7B] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[#a86060]">
                        <strong>{t('disclaimerImportant')}</strong>
                      </p>
                    </div>
                  </div>
                  <p className="text-[#2B2E34] leading-relaxed">
                    {t('disclaimerDesc')}
                  </p>
                </div>

                <Separator />

                {/* Limitation of Liability */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('limitationOfLiability')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    {t('limitationDesc')}
                  </p>
                </div>

                <Separator />

                {/* Account */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('accountSecurity')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    {t('accountSecurityDesc')}
                  </p>
                </div>

                <Separator />

                {/* Termination */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('termination')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    {t('terminationDesc')}
                  </p>
                </div>

                <Separator />

                {/* Changes */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('changesToTerms')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    {t('changesDesc')}
                  </p>
                </div>

                <Separator />

                {/* Governing Law */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('governingLaw')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    {t('governingLawDesc')}
                  </p>
                </div>

                <Separator />

                {/* Contact */}
                <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] -mx-8 lg:-mx-10 px-8 lg:px-10 py-8 rounded-b-lg">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl font-bold text-white mb-3">{t('questionsTerms')}</h2>
                    <p className="text-slate-300 mb-6">
                      {t('questionsTermsDesc')}
                    </p>
                    <Link href="/contact">
                      <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                        <Mail className="w-4 h-4 mr-2" />
                        {t('contactUs')}
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
