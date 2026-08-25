'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useLocale();
  const isAr = locale === 'ar';

  const title = isAr ? 'حدث خطأ ما' : 'Something Went Wrong';
  const message = isAr
    ? 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.'
    : 'An unexpected error occurred. Please try again or return to the homepage.';
  const tryAgain = isAr ? 'حاول مرة أخرى' : 'Try Again';
  const goHome = isAr ? 'الرئيسية' : 'Go Home';

  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-[#F8EEEF] flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-[#C97B7B]" />
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1C2E] mb-3">
          {title}
        </h1>
        <p className="text-slate-600 mb-8">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={reset}
            className="bg-[#0F1C2E] hover:bg-[#1a2d42] text-white font-semibold px-6"
          >
            <RefreshCw className={`w-4 h-4 ${isAr ? 'ml-2' : 'mr-2'}`} />
            {tryAgain}
          </Button>
          <Link href={isAr ? '/ar' : '/'}>
            <Button variant="outline" className="border-[#0F1C2E] text-[#0F1C2E] px-6">
              <Home className={`w-4 h-4 ${isAr ? 'ml-2' : 'mr-2'}`} />
              {goHome}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
