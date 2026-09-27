'use client';

import { useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

export default function NewsletterForm({
  variant = 'bar',
  source = 'footer',
}: {
  variant?: 'bar' | 'section';
  source?: string;
}) {
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const t = {
    placeholder: isAr ? 'بريدك الإلكتروني' : 'Your email address',
    button: isAr ? 'اشترك' : 'Subscribe',
    success: isAr
      ? 'تم الاشتراك بنجاح! سيصلك بريد ترحيبي خلال دقائق.'
      : "You're in! A welcome email will arrive within minutes.",
    error: isAr
      ? 'تعذر الاشتراك، حاول مرة أخرى.'
      : 'Subscription failed, please try again.',
    privacy: isAr
      ? 'بريد واحد مدروس أسبوعياً · بلا إزعاج · إلغاء الاشتراك بنقرة'
      : 'One thoughtful email a week · No spam · Unsubscribe anytime',
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === 'loading') return;
    setState('loading');
    try {
      const res = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error('failed');
      setState('success');
      setEmail('');
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div
        className={`flex items-center justify-center gap-2 text-[#3DD4B0] ${variant === 'section' ? 'py-4 text-lg' : 'py-2 text-sm'}`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <CheckCircle2 className="w-5 h-5 shrink-0" />
        <span>{t.success}</span>
      </div>
    );
  }

  const inputCls =
    'flex-1 min-w-0 rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/60';

  return (
    <form
      onSubmit={submit}
      dir={isAr ? 'rtl' : 'ltr'}
      className={variant === 'section' ? 'w-full max-w-xl mx-auto' : 'w-full mt-6'}
    >
      {variant === 'section' && (
        <p className="text-center text-sm text-slate-500 mb-4">{t.privacy}</p>
      )}
      <div className={`flex gap-2 ${variant === 'section' ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'}`}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
          className={inputCls}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3DD4B0] px-6 py-3 text-sm font-semibold text-[#0F1C2E] hover:bg-[#2BC49E] transition-colors disabled:opacity-60 shrink-0"
        >
          {state === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className={`w-4 h-4 ${isAr ? '-scale-x-100' : ''}`} />
          )}
          {t.button}
        </button>
      </div>
      {state === 'error' && (
        <p className="text-[#C97B7B] text-sm mt-2">{t.error}</p>
      )}
      {variant === 'bar' && (
        <p className="text-slate-400 text-xs mt-2">{t.privacy}</p>
      )}
    </form>
  );
}
