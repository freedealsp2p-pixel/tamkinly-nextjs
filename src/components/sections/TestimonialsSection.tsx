'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const t = useTranslations('home.testimonials');

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Life Coach',
      avatar: 'S',
      content:
        "This isn't just another planner—it's a journey back to yourself. The prompts are thoughtfully designed to peel back layers you didn't even know existed.",
      rating: 5,
    },
    {
      name: 'James K.',
      role: 'Entrepreneur',
      avatar: 'J',
      content:
        "I've tried countless self-improvement products. This is the first one that felt like it understood that I don't need fixing—I need remembering.",
      rating: 5,
    },
    {
      name: 'Amira H.',
      role: 'Therapist',
      avatar: 'A',
      content:
        "The methodology behind Tamkinly aligns beautifully with therapeutic principles. I recommend it to clients who want to continue their work between sessions.",
      rating: 5,
    },
    {
      name: 'Michael T.',
      role: 'Software Engineer',
      avatar: 'M',
      content:
        "Day 15 and something shifted. I can't explain it, but the exercises are rewiring how I see myself. This is different from anything I've tried.",
      rating: 5,
    },
    {
      name: 'Layla A.',
      role: 'Designer',
      avatar: 'L',
      content:
        "Finally, a personal development tool that doesn't feel like homework. The prompts feel like conversations with a wise friend who truly understands.",
      rating: 5,
    },
    {
      name: 'David R.',
      role: 'Executive',
      avatar: 'D',
      content:
        "The science-backed approach sold me. No fluff, no hype—just structured exercises that create real, measurable identity shifts.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-6 lg:p-8">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-600 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
