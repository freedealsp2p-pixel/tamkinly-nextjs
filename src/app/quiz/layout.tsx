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

const quizFAQAr = [
  {
    question: 'ما هو اختبار فجوة الهوية؟',
    answer: 'تقييم مجاني في 3 دقائق يقيس وضوح هويتك عبر 6 أبعاد: الهوية، البيئة، الانفعالات، القرارات، زخم التقدم، والتوافق الحياتي.',
  },
  {
    question: 'كم يستغرق الاختبار؟',
    answer: 'يستغرق الاختبار حوالي 3 دقائق ويتضمن 12 سؤالاً مصمماً بعناية.',
  },
  {
    question: 'هل الاختبار مجاني؟',
    answer: 'نعم، اختبار فجوة الهوية مجاني تماماً وبدون بريد إلكتروني، وتظهر النتائج فوراً.',
  },
  {
    question: 'ماذا أحصل عليه من النتائج؟',
    answer: 'درجة شخصية لفجوة الهوية عبر 6 أبعاد، ومجالات تحسين محددة، وخطوة تالية موصى بها.',
  },
];

export default async function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const faq = locale === 'ar' ? quizFAQAr : quizFAQEn;
  return (
    <>
      {children}
      <QuizFaqSection locale={locale} />
      <FAQPageJsonLd questions={faq} />
    </>
  );
}
