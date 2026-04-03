'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  locale?: string;
}

export function CTASection({ locale = 'en' }: CTASectionProps) {
  const t = useTranslations('home.cta');

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-primary to-slate-900 relative overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(61, 212, 176, 0.15) 2px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            {t('description')}
          </p>
          <Link href={`/${locale}/products`}>
            <Button
              size="lg"
              className="bg-accent text-primary hover:bg-accent/90 px-10 h-14 text-lg font-semibold shadow-lg"
            >
              Begin Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
