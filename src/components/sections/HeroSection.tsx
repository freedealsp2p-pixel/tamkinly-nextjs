'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, CheckCircle, Star, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  locale?: string;
}

export function HeroSection({ locale = 'en' }: HeroSectionProps) {
  const t = useTranslations('home.hero');

  const trustBadges = [
    { icon: Shield, text: t('trust.guarantee') },
    { icon: CheckCircle, text: t('trust.access') },
    { icon: Star, text: t('trust.reviews') },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary via-primary to-slate-900 overflow-hidden">
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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/10 hover:bg-accent/20">
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            {t('badge')}
          </Badge>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
            {t('title')}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          {/* Hook Line */}
          <p className="text-lg text-white font-medium mb-8">
            {t('hook')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href={`/${locale}/products`}>
              <Button
                size="lg"
                className="bg-accent text-primary hover:bg-accent/90 px-8 h-14 text-lg font-semibold shadow-lg group"
              >
                {t('discoverMore')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={`/${locale}/methodology`}>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-primary px-8 h-14 text-lg font-semibold"
              >
                Learn the Methodology
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <badge.icon className="h-4 w-4 text-accent" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F6F8FA"
          />
        </svg>
      </div>
    </section>
  );
}
