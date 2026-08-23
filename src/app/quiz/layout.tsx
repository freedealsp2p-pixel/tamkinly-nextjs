import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cookies, headers } from 'next/headers';
import { QUIZ_METADATA } from '@/lib/seo-pages';
import { FAQPageJsonLd } from '@/components/seo/JsonLd';
import { QuizFaqSection } from './quiz-faq-section';

export const dynamic = "force-dynamic";

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

const quizFAQAr = [
  {
    question: 'ما هو تقييم فجوة الهوية؟',
    answer:
      'تقييم مجاني لدقائق يقيس وضوح هويتك عبر 6 أبعاد: الهوية، البيئة، المشاعر، اتخاذ القرارات، زخم التقدم، والتوافق الحياتي.',
  },
  {
    question: 'كم يستغرق التقييم؟',
    answer:
      'يستغرق التقييم حوالي 3 دقائق مع 12 سؤالاً مصمماً بعناية.',
  },
  {
    question: 'هل التقييم مجاني فعلاً؟',
    answer:
      'نعم، تقييم فجوة الهوية مجاني 100%. لا يتطلب بريداً إلكترونياً، ولا بطاقة ائتمان، والنتائج فورية.',
  },
  {
    question: 'ما مدى دقة النتائج؟',
    answer:
      'يستند التقييم إلى بحوث علم النفس ونظرية تأليف الذات والعلوم السلوكية بنسبة دقة 94% معتمدة من أكثر من 2847 مستخدم.',
  },
  {
    question: 'ما الذي أحصل عليه بعد إكمال التقييم؟',
    answer:
      'تحصل على خارطة طريق شخصية لتحول الهوية مع درجات عبر جميع الأبعاد، وتحديد التحدي الرئيسي لديك، وتوصيات منتجات محددة.',
  },
  {
    question: 'هل يمكنني إعادة التقييم؟',
    answer:
      'نعم، يمكنك إعادة التقييم في أي وقت. هويتك تتطور، لذلك يُنصح بإعادة التقييم بشكل دوري.',
  },
];

async function getLocale(): Promise<'en' | 'ar'> {
  try {
    const headersList = await headers();
    const urlLocale = headersList.get('x-locale');
    if (urlLocale === 'ar' || urlLocale === 'en') return urlLocale;
  } catch {}
  try {
    const cookieStore = await cookies();
    const locale = cookieStore.get('NEXT_LOCALE')?.value;
    return locale === 'ar' ? 'ar' : 'en';
  } catch {}
  return 'en';
}

export default async function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const quizFAQ = locale === 'ar' ? quizFAQAr : quizFAQEn;
  return (
    <>
      <FAQPageJsonLd questions={quizFAQ} />
      <div className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </Link>
        </div>
      </div>
      {children}

      <noscript>
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {locale === 'ar' ? 'تقييم فجوة الهوية - الأسئلة الشائعة' : 'Tamkinly Identity Gap Assessment - FAQ'}
          </h2>
          {quizFAQ.map((q, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Q: {q.question}</h3>
              <p>A: {q.answer}</p>
            </div>
          ))}
        </div>
      </noscript>

      <QuizFaqSection locale={locale} />
    </>
  );
}
