/**
 * Server-rendered Quiz FAQ Section
 * Makes quiz topics visible to search engine crawlers
 */
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Compass, Heart, TrendingUp, User, Target } from 'lucide-react';

const quizDimensions = [
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

export function QuizFaqSection() {
  return (
    <section className="py-16 lg:py-20 bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            <Brain className="w-3.5 h-3.5 mr-1" />
            What the Quiz Measures
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-4">
            6 Dimensions of Your <span className="text-[#3DD4B0]">Identity</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our 12-question assessment measures your identity clarity across six key dimensions
            based on research from identity psychology and behavioral science.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {quizDimensions.map((dimension, index) => (
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
                  {dimension.questions} question{dimension.questions > 1 ? 's' : ''}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 mb-6">
            Based on research from James Clear (Atomic Habits), Robert Kegan (Self-Authorship Theory),
            and James Gross (Emotion Regulation Research).
          </p>
        </div>
      </div>
    </section>
  );
}
