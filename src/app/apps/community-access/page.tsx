'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function CommunityAccessPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Badge className="bg-[#0F1C2E] text-[#3DD4B0] border border-[#3DD4B0] mb-4">{getText('BUNDLE - $47', 'الباقة الشاملة - $47')}</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{getText('Transformation Community', 'مجتمع التحول')}</h1>
          <p className="text-lg text-slate-300">{getText('Connect with others on the same journey. Share wins, get support, and stay accountable.', 'تواصل مع آخرين في نفس الرحلة. شارك إنجازاتك، احصل على الدعم، وابقَ ملتزماً.')}</p>
        </div>
      </div>
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <Card className="border-2 border-[#3DD4B0]/30 shadow-lg mb-8">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#3DD4B0]" />
            </div>
            <CardTitle className="text-2xl">{getText('Access Required', 'الوصول مطلوب')}</CardTitle>
            <CardDescription>{getText('This app is included in the Complete Bundle ($47)', 'هذا التطبيق مضمّن في الباقة الشاملة ($47)')}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4 mb-6">
              {[
                getText('Private Discord community', 'مجتمع ديسكورد الخاص'),
                getText('Weekly challenges', 'تحديات أسبوعية'),
                getText('Accountability partners', 'شركاء المساءلة'),
                getText('Live Q&A sessions', 'جلسات أسئلة وأجوبة مباشرة'),
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
                  <span className="text-slate-700">{f}</span>
                </div>
              ))}
            </div>
            <Link href="/products/bundle">
              <Button className="w-full h-12 bg-[#0F1C2E] text-white hover:bg-[#1a2d47] font-semibold">
                {getText('Get Complete Bundle - $47', 'احصل على الباقة الشاملة - $47')} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
