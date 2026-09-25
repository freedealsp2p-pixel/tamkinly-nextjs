'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/providers/LocaleProvider';
import { WifiOff, ArrowRight, Home } from 'lucide-react';

export default function OfflinePage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center px-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-10 h-10 text-[#1F6F78]" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F1C2E] mb-3">{getText('You are Offline', 'أنت غير متصل')}</h1>
        <p className="text-slate-600 mb-8">{getText('It seems you lost your internet connection. Check your connection and try again.', 'يبدو أنك فقدت اتصالك بالإنترنت. تحقق من اتصالك وحاول مرة أخرى.')}</p>
        <div className="space-y-3">
          <Button onClick={() => window.location.reload()} className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold h-12">
            {getText('Try Again', 'حاول مرة أخرى')}
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full border-[#1F6F78] text-[#1F6F78] h-12">
              <Home className="w-4 h-4 mr-2" />
              {getText('Go Home', 'الصفحة الرئيسية')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
