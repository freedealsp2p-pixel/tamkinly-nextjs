'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Key } from 'lucide-react';
import { useTranslations } from '@/components/providers/LocaleProvider';

export function AccessCodeInput() {
  const [accessCode, setAccessCode] = useState('');
  const [accessCodeLoading, setAccessCodeLoading] = useState(false);
  const [accessCodeError, setAccessCodeError] = useState<string | null>(null);
  const [accessCodeSuccess, setAccessCodeSuccess] = useState<string | null>(null);
  const t = useTranslations('appsPage');

  const handleActivateCode = async () => {
    if (!accessCode.trim()) return;
    setAccessCodeLoading(true);
    setAccessCodeError(null);
    setAccessCodeSuccess(null);
    try {
      const response = await fetch('/api/access/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode.trim(), email: '' }),
      });
      const result = await response.json();
      if (!response.ok) {
        setAccessCodeError(result.error || 'Invalid code');
        return;
      }
      setAccessCodeSuccess(t('codeActivated'));
      const accessInfo = JSON.parse(localStorage.getItem('tamkinly_access') || '{}');
      accessInfo[accessCode.trim()] = { tier: result.tier, productId: result.productId, activatedAt: new Date().toISOString() };
      localStorage.setItem('tamkinly_access', JSON.stringify(accessInfo));
      setAccessCode('');
      setTimeout(() => window.location.reload(), 1500);
    } catch {
      setAccessCodeError('Network error');
    } finally {
      setAccessCodeLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="p-4 bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] rounded-xl border border-[#3DD4B0]/20">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center">
              <Key className="w-5 h-5 text-[#3DD4B0]" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{t('haveAccessCode')}</h3>
              <p className="text-slate-400 text-xs">{t('enterCodeDesc')}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-1 max-w-md">
            <Input
              type="text"
              placeholder="TMLY-XXXX-XXXX"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              className="flex-1 h-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 font-mono text-center tracking-wider"
              maxLength={18}
            />
            <Button
              onClick={handleActivateCode}
              disabled={accessCodeLoading || !accessCode.trim()}
              className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-10 px-6"
            >
              {accessCodeLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('activateCode')}
            </Button>
          </div>
        </div>
        {accessCodeError && <p className="text-red-400 text-xs mt-2 text-center">{accessCodeError}</p>}
        {accessCodeSuccess && <p className="text-green-400 text-xs mt-2 text-center">{accessCodeSuccess}</p>}
      </div>
    </div>
  );
}
