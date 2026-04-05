import type { Metadata } from 'next';
import { QUIZ_METADATA } from '@/lib/seo-pages';
import { FAQPageJsonLd } from '@/components/seo/JsonLd';
import { QuizFaqSection } from './quiz-faq-section';

export const metadata: Metadata = QUIZ_METADATA;

const quizFAQ = [
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
    question: 'Is the quiz really free?',
    answer:
      'Yes, the Identity Gap Quiz is 100% free. No email required, no credit card needed, and results are instant.',
  },
  {
    question: 'How accurate are the results?',
    answer:
      'The quiz is based on research from identity psychology, self-authorship theory, and behavioral science with a 94% accuracy rate validated by over 2,847 users.',
  },
  {
    question: 'What do I get after completing the quiz?',
    answer:
      'You receive a personalized identity transformation roadmap with scores across all dimensions, identification of your dominant challenge, and specific product recommendations.',
  },
  {
    question: 'Can I retake the quiz?',
    answer:
      'Yes, you can retake the quiz anytime. Your identity evolves, so periodic reassessment is recommended.',
  },
];

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FAQPageJsonLd questions={quizFAQ} />
      {children}
      <QuizFaqSection />
    </>
  );
}
