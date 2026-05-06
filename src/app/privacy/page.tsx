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
import { useTranslations } from '@/components/providers/LocaleProvider';

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacyPage');

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
              <Shield className="w-3.5 h-3.5 mr-2" />
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
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-3">
                    <Lock className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-1">{t('dataEncryption')}</h3>
                  <p className="text-sm text-[#8A94A6]">{t('dataEncryptionDesc')}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-3">
                    <Eye className="w-6 h-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-1">{t('transparency')}</h3>
                  <p className="text-sm text-[#8A94A6]">{t('transparencyDesc')}</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0F1C2E]/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-[#0F1C2E]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-1">{t('yourRights')}</h3>
                  <p className="text-sm text-[#8A94A6]">{t('yourRightsDesc')}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8 lg:p-10 space-y-8">
                {/* Introduction */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('introduction')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    {t('introductionDesc')}
                  </p>
                </div>

                <Separator />

                {/* Information We Collect */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#3DD4B0]" />
                    {t('informationWeCollect')}
                  </h2>
                  <div className="space-y-4 text-[#2B2E34] leading-relaxed">
                    <div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-2">{t('personalInfo')}</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>{t('personalInfo1')}</li>
                        <li>{t('personalInfo2')}</li>
                        <li>{t('personalInfo3')}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-2">{t('usageData')}</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>{t('usageData1')}</li>
                        <li>{t('usageData2')}</li>
                        <li>{t('usageData3')}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0F1C2E] mb-2">{t('progressData')}</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>{t('progressData1')}</li>
                        <li>{t('progressData2')}</li>
                        <li>{t('progressData3')}</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* How We Use Information */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('howWeUse')}</h2>
                  <ul className="space-y-3 text-[#2B2E34]">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-[#3DD4B0]">1</span>
                      </div>
                      <span><strong>{t('useProvide')}</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-[#3DD4B0]">2</span>
                      </div>
                      <span><strong>{t('useSave')}</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-[#3DD4B0]">3</span>
                      </div>
                      <span><strong>{t('useCommunicate')}</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-[#3DD4B0]">4</span>
                      </div>
                      <span><strong>{t('useImprove')}</strong></span>
                    </li>
                  </ul>
                </div>

                <Separator />

                {/* Data Security */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('dataSecurity')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    {t('dataSecurityDesc')}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-[#2B2E34] mt-3">
                    <li>{t('security1')}</li>
                    <li>{t('security2')}</li>
                    <li>{t('security3')}</li>
                    <li>{t('security4')}</li>
                  </ul>
                </div>

                <Separator />

                {/* Your Rights */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('yourRightsTitle')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed mb-4">
                    {t('yourRightsIntro')}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-[#F6F8FA] rounded-lg">
                      <h4 className="font-semibold text-[#0F1C2E] text-sm">{t('rightAccess')}</h4>
                      <p className="text-xs text-[#8A94A6]">{t('rightAccessDesc')}</p>
                    </div>
                    <div className="p-4 bg-[#F6F8FA] rounded-lg">
                      <h4 className="font-semibold text-[#0F1C2E] text-sm">{t('rightCorrection')}</h4>
                      <p className="text-xs text-[#8A94A6]">{t('rightCorrectionDesc')}</p>
                    </div>
                    <div className="p-4 bg-[#F6F8FA] rounded-lg">
                      <h4 className="font-semibold text-[#0F1C2E] text-sm">{t('rightDeletion')}</h4>
                      <p className="text-xs text-[#8A94A6]">{t('rightDeletionDesc')}</p>
                    </div>
                    <div className="p-4 bg-[#F6F8FA] rounded-lg">
                      <h4 className="font-semibold text-[#0F1C2E] text-sm">{t('rightPortability')}</h4>
                      <p className="text-xs text-[#8A94A6]">{t('rightPortabilityDesc')}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Cookies */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('cookiesTracking')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed mb-4">
                    {t('cookiesDesc')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-sm text-[#2B2E34] mt-3">
                    <li>{t('essentialCookies')}</li>
                    <li>{t('analyticsCookies')}</li>
                    <li>{t('preferenceCookies')}</li>
                  </ul>
                  <div className="mt-4 p-4 bg-[#F6F8FA] rounded-lg">
                    <h4 className="font-semibold text-[#0F1C2E] text-sm mb-2">{t('googleAnalytics')}</h4>
                    <p className="text-xs text-[#8A94A6]">
                      {t('googleAnalyticsDesc')}{' '}
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#3DD4B0] hover:underline">
                        {t('googleAnalyticsOptOut')}
                      </a>.
                    </p>
                  </div>
                  <p className="text-[#2B2E34] leading-relaxed mt-4">
                    {t('noThirdParty')}
                  </p>
                </div>

                <Separator />

                {/* Children */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">{t('childrenPrivacy')}</h2>
                  <p className="text-[#2B2E34] leading-relaxed">
                    {t('childrenDesc')}
                  </p>
                </div>

                <Separator />

                {/* Contact */}
                <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] -mx-8 lg:-mx-10 px-8 lg:px-10 py-8 rounded-b-lg">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl font-bold text-white mb-3">{t('questionsPrivacy')}</h2>
                    <p className="text-slate-300 mb-6">
                      {t('questionsDesc')}
                    </p>
                    <Link href="/contact">
                      <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                        <Mail className="w-4 h-4 mr-2" />
                        {t('contactPrivacyTeam')}
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
