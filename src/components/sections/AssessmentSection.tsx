'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Lock, CheckCircle, Clock } from 'lucide-react';

interface AssessmentSectionProps {
  locale?: string;
}

export function AssessmentSection({ locale = 'en' }: AssessmentSectionProps) {
  const t = useTranslations('home.assessment');

  const stats = [
    { value: '2,847+', label: t('stats.people') },
    { value: '94%', label: t('stats.accuracy') },
    { value: '3 min', label: t('stats.time') },
  ];

  const trustItems = [
    { icon: Lock, text: t('trust.private') },
    { icon: CheckCircle, text: t('trust.noEmail') },
    { icon: Clock, text: t('trust.instant') },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border border-accent/30">
              {t('badge')}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
              {t('title')}
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
              {t('description')}
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center px-6 py-4 bg-slate-50 rounded-xl"
              >
                <div className="text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href={`/${locale}/quiz`}>
              <Button
                size="lg"
                className="bg-accent text-primary hover:bg-accent/90 px-12 h-16 text-xl font-semibold shadow-xl transition-all hover:scale-105"
              >
                Take Free Assessment
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>

            {/* Trust Items */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-slate-500">
              {trustItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-accent" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
