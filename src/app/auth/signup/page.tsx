'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AlertCircle, Mail, Lock, User, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslations } from "@/components/providers/LocaleProvider";

export default function SignUpPage() {
  const router = useRouter();
  const t = useTranslations("auth.signup");
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError(t('nameRequired') || 'Name is required');
      return;
    }

    if (password.length < 6) {
      setError(t('passwordTooShort') || 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError(t('passwordsNoMatch') || 'Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t('registrationFailed') || 'Registration failed. Please try again.');
        return;
      }

      // Success - redirect to sign in with success message
      router.push('/auth/signin?registered=true');
    } catch (err) {
      console.error('Registration error:', err);
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(t('errorOccurred') || 'An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="text-2xl font-bold text-[#3DD4B0]">
              Tamkinly
            </Link>
            <h1 className="text-2xl font-bold text-[#0F1C2E] mt-4">{t('createAccount')}</h1>
            <p className="text-slate-600 mt-2">{t('subtitle')}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-[#FFF3E8] border border-[#FFB088] text-[#E55A10] px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                {t('name')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('namePlaceholder')}
                  required
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>

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
                  placeholder={t('emailPlaceholder')}
                  required
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                {t('password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder')}
                  required
                  minLength={6}
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                {t('confirmPassword')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t('confirmPasswordPlaceholder')}
                  required
                  minLength={6}
                  disabled={isLoading}
                  className="pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email || !password || !name || !confirmPassword}
              className="w-full h-12 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('creatingAccount')}
                </>
              ) : (
                <>
                  {t('createAccountBtn')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Benefits */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h3 className="text-sm font-semibold text-[#0F1C2E] mb-2">{t('freeAccountBenefits')}</h3>
            <ul className="space-y-1">
              {[t('benefit1'), t('benefit2'), t('benefit3'), t('benefit4')].map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-slate-600 mt-6">
            {t('hasAccount')}{' '}
            <Link href="/auth/signin" className="text-[#3DD4B0] hover:underline font-medium">
              {t('signIn')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

