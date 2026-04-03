'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, ArrowRight, Activity, Network, User, Compass } from 'lucide-react';

interface ScienceSectionProps {
  locale?: string;
}

export function ScienceSection({ locale = 'en' }: ScienceSectionProps) {
  const t = useTranslations('home.science');

  const concepts = [
    {
      icon: Activity,
      title: t('concepts.maintainIT.title'),
      description: t('concepts.maintainIT.description'),
    },
    {
      icon: Network,
      title: t('concepts.neuroplasticity.title'),
      description: t('concepts.neuroplasticity.description'),
    },
    {
      icon: User,
      title: t('concepts.selfAuthorship.title'),
      description: t('concepts.selfAuthorship.description'),
    },
    {
      icon: Compass,
      title: t('concepts.locusOfControl.title'),
      description: t('concepts.locusOfControl.description'),
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(61, 212, 176, 0.2) 2px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-6 px-4 py-2 bg-accent/10 text-accent border border-accent/30">
            <Brain className="w-3.5 h-3.5 mr-2" />
            {t('badge')}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
            {t('subtitle')}
          </p>
          <p className="text-accent font-semibold">
            {t('evidence')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {concepts.map((concept, index) => (
            <Card
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 text-accent mb-4">
                  <concept.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">
                  {concept.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {concept.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${locale}/methodology`}>
            <Button
              size="lg"
              className="bg-accent text-primary hover:bg-accent/90 px-8 h-14 text-lg font-semibold"
            >
              Explore the Research
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
