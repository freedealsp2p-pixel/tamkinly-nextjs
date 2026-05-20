'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Compass, Heart, TrendingUp, User, Target } from 'lucide-react';

const quizDimensionsEn = [
  {
    icon: User,
    title: 'Identity Clarity',
    description: 'How clearly you understand who you are, your core values, and the gap between your current and desired self.',
    color: '#3DD4B0',
    questions: 3,
  },
  {
    icon: Compass,
    title: 'Environmental Alignment',
    description: 'How well your physical, social, and digital environments support the person you want to become.',
    color: '#1F6F78',
    questions: 1,
  },
  {
    icon: Heart,
    title: 'Emotional Regulation',
    description: 'Your ability to process and manage emotions effectively without suppression or avoidance.',
    color: '#E57373',
    questions: 1,
  },
  {
    icon: Brain,
    title: 'Decision Quality',
    description: 'How confidently and consistently you make decisions aligned with your core values.',
    color: '#64B5F6',
    questions: 1,
  },
  {
    icon: TrendingUp,
    title: 'Progress Momentum',
    description: 'Your ability to set goals, follow through, and build resilience through setbacks.',
    color: '#FFB74D',
    questions: 3,
  },
  {
    icon: Target,
    title: 'Life Alignment',
    description: 'How well your daily actions and routines reflect the person you want to become.',
    color: '#9333EA',
    questions: 1,
  },
];

const quizDimensionsAr = [
  {
    icon: User,
    title: 'وضوح الهوية',
    description: 'مدى وضوح فهمك لمن أنت، قيمك الجوهرية، والفجوة بين ذاتك الحالية والمستهدفة.',
    color: '#3DD4B0',
    questions: 3,
  },
  {
    icon: Compass,
    title: 'التوافق البيئي',
    description: 'مدى دعم بيئتك المادية والاجتماعية والرقمية للشخص الذي تريد أن تصبحه.',
    color: '#1F6F78',
    questions: 1,
  },
  {
    icon: Heart,
    title: 'التنظيم العاطفي',
    description: 'قدرتك على معالجة وإدارة المشاعر بفعالية دون كبت أو تجنب.',
    color: '#E57373',
    questions: 1,
  },
  {
    icon: Brain,
    title: 'جودة القرارات',
    description: 'مدى ثقتك واتساقك في اتخاذ قرارات متوافقة مع قيمك الجوهرية.',
    color: '#64B5F6',
    questions: 1,
  },
  {
    icon: TrendingUp,
    title: 'زخم التقدم',
    description: 'قدرتك على تحديد الأهداف والمتابعة وبناء المثابرة عبر النكسات.',
    color: '#FFB74D',
    questions: 3,
  },
  {
    icon: Target,
    title: 'التوافق الحياتي',
    description: 'مدى توافق أفعالك اليومية وروتينك مع الشخص الذي تريد أن تصبحه.',
    color: '#9333EA',
    questions: 1,
  },
];

export function QuizFaqSection({ locale = 'en' }: { locale?: string }) {
  const isAr = locale === 'ar';
  const dimensions = isAr ? quizDimensionsAr : quizDimensionsEn;

  return (
    <section className="py-16 lg:py-20 bg-[#F6F8FA]" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            <Brain className="w-3.5 h-3.5 mr-1" />
            {isAr ? 'ما يقيسه التقييم' : 'What the Quiz Measures'}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-4">
            {isAr ? '6 أبعاد لـ' : '6 Dimensions of Your'} <span className="text-[#3DD4B0]">{isAr ? 'هويتك' : 'Identity'}</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {isAr
              ? 'يقيس تقييمنا من 12 سؤالاً وضوح هويتك عبر ستة أبعاد رئيسية بناءً على أبحاث علم النفس والعلوم السلوكية.'
              : 'Our 12-question assessment measures your identity clarity across six key dimensions based on research from identity psychology and behavioral science.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {dimensions.map((dimension, index) => (
            <Card key={index} className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${dimension.color}15` }}
                >
                  <dimension.icon className="h-6 w-6" style={{ color: dimension.color }} />
                </div>
                <h3 className="font-semibold text-lg text-[#0F1C2E] mb-2">{dimension.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">{dimension.description}</p>
                <Badge variant="outline" className="text-xs" style={{ borderColor: `${dimension.color}40`, color: dimension.color }}>
                  {dimension.questions} {isAr ? 'سؤال' : dimension.questions > 1 ? 'questions' : 'question'}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 mb-6">
            {isAr
              ? 'مبني على أبحاث جيمس كلير (العادات الذرية)، روبرت كيجان (نظرية تأليف الذات)، وجيمس غروس (أبحاث التنظيم العاطفي).'
              : 'Based on research from James Clear (Atomic Habits), Robert Kegan (Self-Authorship Theory), and James Gross (Emotion Regulation Research).'}
          </p>
        </div>
      </div>
    </section>
  );
}
