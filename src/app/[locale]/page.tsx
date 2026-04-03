import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  PhilosophySection,
  ScienceSection,
  AssessmentSection,
  ProductsSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from '@/components/sections';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      <main className="flex-1">
        <HeroSection locale={locale} />
        <PhilosophySection />
        <ScienceSection locale={locale} />
        <AssessmentSection locale={locale} />
        <ProductsSection locale={locale} />
        <TestimonialsSection />
        <FAQSection />
        <CTASection locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
