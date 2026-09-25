'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle, Mail, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useTranslations } from '@/components/providers/LocaleProvider';

function ForgotPasswordForm() {
  const t = useTranslations('auth.forgotPassword');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-[#0F1C2E] mb-4">{t('checkYourEmail')}</h2>
            <p className="text-slate-600 mb-6">{t('resetLinkSent')}</p>
            <p className="text-sm text-slate-500 mb-6">{t('resetLinkNote')}</p>
            <Link href="/auth/signin">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] w-full h-12">
                {t('backToSignIn')}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-0 shadow-2xl">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-[#3DD4B0]">
            Tamkinly
          </Link>
          <h1 className="text-2xl font-bold text-[#0F1C2E] mt-4">{t('title')}</h1>
          <p className="text-slate-600 mt-2">{t('subtitle')}</p>
        </div>

        {error && (
          <div className="bg-[#F8EEEF] border border-[#D4A8AE] text-[#A86565] px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              {t('email')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="pl-10 h-12"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t('sending')}
              </>
            ) : (
              t('sendResetLink')
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/auth/signin"
            className="text-sm text-[#1F6F78] hover:text-[#0F1C2E] inline-flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToSignIn')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center px-4">
      <Suspense fallback={<div className="text-center"><Loader2 className="h-8 w-8 animate-spin text-[#1F6F78] mx-auto" /></div>}>
        <ForgotPasswordForm />
      </Suspense>
    </div>
  );
}

