'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  HeartHandshake,
  Share2,
  Check,
  Printer,
} from 'lucide-react';
import Link from 'next/link';

import {
  useTranslations,
  useLocale,
} from '@/components/providers/LocaleProvider';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Analytics helper (graceful no-op if GA not loaded)
function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', name, params);
  }
}

export default function RecoveryCTA() {
  const t = useTranslations('recoveryPage');
  const { direction, locale } = useLocale();
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    trackEvent('recovery_share_click', { locale });
    const shareUrl = 'https://tamkinly.com/recovery';
    const shareText = locale === 'ar'
      ? 'وجدت هذه الصفحة مفيدة لرحلة التعافي:'
      : 'Found this recovery journey helpful:';

    // Try native share first (mobile)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Tamkinly Recovery', text: shareText, url: shareUrl });
        setShared(true);
        return;
      } catch {
        // user cancelled — fall through to clipboard
      }
    }
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch {
      // Final fallback — do nothing
    }
  };

  const handleDonate = () => {
    trackEvent('recovery_donate_click', { locale });
  };

  const handleBeginRecovery = () => {
    trackEvent('recovery_begin_click', { locale, target: '/quiz' });
  };

  const handleExploreMethodology = () => {
    trackEvent('recovery_methodology_click', { locale, target: '/methodology' });
  };

  const handlePrint = () => {
    trackEvent('recovery_print_plan', { locale });
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <section
      id="start"
      dir={direction}
      className="bg-[#0F1C2E] py-24"
    >
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-6 bg-[#3DD4B0]/15 text-[#3DD4B0]">
            {t('cta.badge')}
          </Badge>

          <h2 className="mb-6 text-4xl font-bold text-white md:text-6xl">
            {t('cta.title')}
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
            {t('cta.description')}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap">
            <Link href="/quiz" onClick={handleBeginRecovery}>
              <Button
                size="lg"
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#34c3a2]"
              >
                {t('cta.primaryButton')}
                <ArrowRight className="ms-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/methodology" onClick={handleExploreMethodology}>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                {t('cta.secondaryButton')}
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={handlePrint}
            >
              <Printer className="me-2 h-4 w-4" />
              {locale === 'ar' ? 'اطبع خطة التعافي' : 'Print Recovery Plan'}
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            {t('cta.note')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
        >
          <div className="mb-4 flex justify-center">
            <HeartHandshake className="h-10 w-10 text-[#3DD4B0]" />
          </div>

          <h3 className="mb-4 text-2xl font-bold text-white">
            {t('cta.giveBackTitle')}
          </h3>

          <p className="mx-auto mb-8 max-w-2xl text-slate-300">
            {t('cta.giveBackDescription')}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link href="/products" onClick={handleDonate}>
              <Button
                size="lg"
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#34c3a2]"
              >
                {t('cta.donateButton')}
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={handleShare}
            >
              {shared ? (
                <>
                  <Check className="me-2 h-4 w-4" />
                  {locale === 'ar' ? 'تم النسخ' : 'Copied'}
                </>
              ) : (
                <>
                  <Share2 className="me-2 h-4 w-4" />
                  {t('cta.shareButton')}
                </>
              )}
            </Button>
          </div>

          <p className="mt-6 text-sm text-slate-400">
            {t('cta.giveBackNote')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
