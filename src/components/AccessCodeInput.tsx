'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Key, Mail, Shield } from 'lucide-react';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';

export function AccessCodeInput() {
  const [accessCode, setAccessCode] = useState('');
  const [email, setEmail] = useState('');
  const [accessCodeLoading, setAccessCodeLoading] = useState(false);
  const [accessCodeError, setAccessCodeError] = useState<string | null>(null);
  const [accessCodeSuccess, setAccessCodeSuccess] = useState<string | null>(null);
  const t = useTranslations('appsPage');
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const handleActivateCode = async () => {
    if (!accessCode.trim() || !email.trim()) return;
    setAccessCodeLoading(true);
    setAccessCodeError(null);
    setAccessCodeSuccess(null);
    try {
      const response = await fetch('/api/access/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode.trim(), email: email.trim().toLowerCase() }),
      });
      const result = await response.json();
      if (!response.ok) {
        // Show specific error messages
        if (result.error?.includes('not yet active') || result.error?.includes('pending')) {
          setAccessCodeError(getText(
            'Payment confirmation is pending. Your token will be activated after payment is confirmed.',
            'تأكيد الدفع قيد الانتظار. سيتم تفعيل رمزك بعد تأكيد الدفع.'
          ));
        } else if (result.error?.includes('different email') || result.error?.includes('does not match')) {
          setAccessCodeError(getText(
            'This token is linked to a different email. Use the email you purchased with.',
            'هذا الرمز مرتبط ببريد مختلف. استخدم البريد الذي اشتريت به.'
          ));
        } else {
          setAccessCodeError(result.error || getText('Invalid access code', 'رمز وصول غير صالح'));
        }
        return;
      }
      setAccessCodeSuccess(getText('Access granted! Loading your apps...', 'تم منح الوصول! جارٍ تحميل تطبيقاتك...'));
      // Store access info with email binding
      localStorage.setItem('tamkinly_access', JSON.stringify({
        tier: result.tier,
        code: accessCode.trim(),
        email: email.trim().toLowerCase(),
        productId: result.productId,
        verifiedAt: new Date().toISOString(),
      }));
      setAccessCode('');
      setEmail('');
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      setAccessCodeError(getText('Network error. Please try again.', 'خطأ في الاتصال. يرجى المحاولة مرة أخرى.'));
    } finally {
      setAccessCodeLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="p-4 bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] rounded-xl border border-[#3DD4B0]/20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center">
              <Key className="w-5 h-5 text-[#3DD4B0]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{getText('Enter Your Access Token & Email', 'أدخل رمز الوصول والبريد الإلكتروني')}</h3>
              <p className="text-slate-400 text-xs flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {getText('Your token is linked to your purchase email', 'رمزك مرتبط ببريد الشراء الخاص بك')}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center gap-2 flex-1">
              <Mail className="w-4 h-4 text-[#3DD4B0] flex-shrink-0" />
              <Input
                type="email"
                placeholder={getText('your@email.com', 'بريدك@مثال.com')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm"
              />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Key className="w-4 h-4 text-[#3DD4B0] flex-shrink-0" />
              <Input
                type="text"
                placeholder="TMLY-XXXX-XXXX"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                className="flex-1 h-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 font-mono text-center tracking-wider"
                maxLength={24}
              />
            </div>
            <Button
              onClick={handleActivateCode}
              disabled={accessCodeLoading || !accessCode.trim() || !email.trim()}
              className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-10 px-6 whitespace-nowrap"
            >
              {accessCodeLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : getText('Verify', 'تحقق')}
            </Button>
          </div>
        </div>
        {accessCodeError && <p className="text-[#B88A8E] text-xs mt-2 text-center">{accessCodeError}</p>}
        {accessCodeSuccess && <p className="text-green-400 text-xs mt-2 text-center">{accessCodeSuccess}</p>}
      </div>
    </div>
  );
}
