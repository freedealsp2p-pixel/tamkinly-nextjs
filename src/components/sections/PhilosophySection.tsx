'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Heart, BookOpen, Zap } from 'lucide-react';

export function PhilosophySection() {
  const t = useTranslations('home.philosophy');

  const features = [
    {
      icon: Target,
      title: t('features.identity.title'),
      description: t('features.identity.description'),
    },
    {
      icon: Heart,
      title: t('features.noJudgment.title'),
      description: t('features.noJudgment.description'),
    },
    {
      icon: BookOpen,
      title: t('features.guided.title'),
      description: t('features.guided.description'),
    },
    {
      icon: Zap,
      title: t('features.immediate.title'),
      description: t('features.immediate.description'),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            {t('badge')}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-4">
            {t('opening')}
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('body')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-card-foreground border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <CardContent className="p-6 lg:p-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-5">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold text-xl text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
