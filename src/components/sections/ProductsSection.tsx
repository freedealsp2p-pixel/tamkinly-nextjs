'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowRight, Check, Sparkles, BookOpen, Award, Package } from 'lucide-react';

interface ProductsSectionProps {
  locale?: string;
}

export function ProductsSection({ locale = 'en' }: ProductsSectionProps) {
  const t = useTranslations('home.products');
  const tProducts = useTranslations('products');

  const products = [
    {
      id: 'trial',
      icon: Sparkles,
      name: tProducts('types.trial.name'),
      description: tProducts('types.trial.description'),
      price: 7,
      originalPrice: null,
      features: [
        '7-Day Identity Reset Guide',
        'Interactive App Access',
        'Daily Prompts',
        'Progress Tracking',
      ],
      cta: 'Start Trial',
      popular: false,
    },
    {
      id: 'planner',
      icon: BookOpen,
      name: tProducts('types.planner.name'),
      description: tProducts('types.planner.description'),
      price: 17,
      originalPrice: 29,
      features: [
        '30-Day Digital Planner (PDF)',
        'Print Version Included',
        'Daily Guided Prompts',
        'Identity Mapping Exercises',
        'Progress Tracking',
        'Lifetime Access',
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      id: 'premium',
      icon: Award,
      name: tProducts('types.premium.name'),
      description: tProducts('types.premium.description'),
      price: 27,
      originalPrice: 49,
      features: [
        'Everything in 30-Day Planner',
        'Identity Reset Checklist (PDF)',
        'Interactive Checklist App',
        'Advanced Exercises',
        'Priority Email Support',
        'Lifetime Updates',
      ],
      cta: 'Go Premium',
      popular: false,
    },
    {
      id: 'bundle',
      icon: Package,
      name: tProducts('types.bundle.name'),
      description: tProducts('types.bundle.description'),
      price: 47,
      originalPrice: 97,
      features: [
        'All Digital PDFs Included',
        'Identity Recode System App',
        'Identity Mastery Guide',
        'Advanced Implementation Framework',
        'Practical Companion Guide',
        '1-on-1 Support Session',
        'Community Access',
        'Future Products Free',
      ],
      cta: 'Get Complete Access',
      popular: false,
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
          <p className="text-lg text-slate-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`relative flex flex-col ${
                product.popular
                  ? 'border-2 border-accent shadow-lg'
                  : 'border border-slate-200'
              } bg-white hover:shadow-xl transition-all duration-300`}
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-primary font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pt-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mx-auto mb-4">
                  <product.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-xl text-primary">
                  {product.name}
                </h3>
                <p className="text-slate-500 text-sm mt-2">
                  {product.description}
                </p>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-primary">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-slate-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4">
                <Link href={`/${locale}/products#${product.id}`} className="w-full">
                  <Button
                    className={`w-full ${
                      product.popular
                        ? 'bg-accent text-primary hover:bg-accent/90'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                  >
                    {product.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm flex items-center justify-center gap-2">
          <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          {tProducts('guarantee')}
        </p>
      </div>
    </section>
  );
}
