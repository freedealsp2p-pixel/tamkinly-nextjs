import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getLocale } from '@/lib/get-locale';
import { generatePageMetadataFromConfig } from '@/lib/seo-pages';
import { FAQPageJsonLd } from '@/components/seo/JsonLd';
import { QuizFaqSection } from './quiz-faq-section';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const locale = await getLocale();
  return generatePageMetadataFromConfig('quiz', locale);
}

const quizFAQEn = [
  {
    question: 'What is the Identity Gap Quiz?',
    answer:
      'A free 3-minute assessment that measures your identity clarity across 6 dimensions: identity, environment, emotion, decision-making, progress momentum, and life alignment.',
  },
  {
    question: 'How long does the quiz take?',
    answer:
      'The quiz takes approximately 3 minutes to complete with 12 carefully designed questions.',
  },
  {
    question: 'Is the quiz free?',
    answer:
      'Yes, the Identity Gap Quiz is completely free with no email required. You get instant results.',
  },
  {
    question: 'What do I get from the results?',
    answer:
      'A personalized Identity Gap Score across 6 dimensions, specific areas for improvement, and a recommended next step.',
  },
];

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <QuizFaqSection />
      <FAQPageJsonLd questions={quizFAQEn} />
    </>
  );
}
