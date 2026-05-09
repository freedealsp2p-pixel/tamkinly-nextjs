'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  ArrowRight, 
  RotateCcw,
  Download,
  Sparkles,
  Target,
  TrendingUp,
  CheckCircle2,
  Shield
} from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

interface Question {
  id: number;
  textEn: string;
  textAr: string;
  dimension: string;
  dimensionLabelEn: string;
  dimensionLabelAr: string;
}

const questions: Question[] = [
  // Self-Trust Dimension
  { id: 1, textEn: 'I trust my own judgment when making important decisions', textAr: 'أثق في حكمتي عند اتخاذ قرارات مهمة', dimension: 'selfTrust', dimensionLabelEn: 'Self-Trust', dimensionLabelAr: 'الثقة بالنفس' },
  { id: 2, textEn: 'I keep the promises I make to myself', textAr: 'ألتزم بالوعود التي أقطعها على نفسي', dimension: 'selfTrust', dimensionLabelEn: 'Self-Trust', dimensionLabelAr: 'الثقة بالنفس' },
  { id: 3, textEn: 'I believe in my ability to figure things out', textAr: 'أؤمن بقدرتي على اكتشاف الحلول', dimension: 'selfTrust', dimensionLabelEn: 'Self-Trust', dimensionLabelAr: 'الثقة بالنفس' },
  
  // Clarity Dimension
  { id: 4, textEn: 'I have a clear vision of who I want to become', textAr: 'لدي رؤية واضحة للشخص الذي أريد أن أصبحه', dimension: 'clarity', dimensionLabelEn: 'Clarity', dimensionLabelAr: 'الوضوح' },
  { id: 5, textEn: 'I know my top 5 core values', textAr: 'أعرف أهم 5 قيم أساسية لدي', dimension: 'clarity', dimensionLabelEn: 'Clarity', dimensionLabelAr: 'الوضوح' },
  { id: 6, textEn: 'I can describe my ideal future self in detail', textAr: 'أستطيع وصف ذاتي المستقبلية المثالية بالتفصيل', dimension: 'clarity', dimensionLabelEn: 'Clarity', dimensionLabelAr: 'الوضوح' },
  
  // Alignment Dimension
  { id: 7, textEn: 'My daily actions reflect my stated values', textAr: 'أفعالي اليومية تعكس قيمي المعلنة', dimension: 'alignment', dimensionLabelEn: 'Alignment', dimensionLabelAr: 'المحاذاة' },
  { id: 8, textEn: 'I spend most of my time on what truly matters to me', textAr: 'أقضي معظم وقتي فيما يهمّني حقًا', dimension: 'alignment', dimensionLabelEn: 'Alignment', dimensionLabelAr: 'المحاذاة' },
  { id: 9, textEn: 'My environment supports my growth goals', textAr: 'بيئتي تدعم أهداف نموّي', dimension: 'alignment', dimensionLabelEn: 'Alignment', dimensionLabelAr: 'المحاذاة' },
  
  // Consistency Dimension
  { id: 10, textEn: 'I follow through on commitments to myself', textAr: 'أتابع التزاماتي تجاه نفسي', dimension: 'consistency', dimensionLabelEn: 'Consistency', dimensionLabelAr: 'الاتساق' },
  { id: 11, textEn: 'I maintain habits even when motivation is low', textAr: 'أحافظ على العادات حتى عندما تضعف الدافعية', dimension: 'consistency', dimensionLabelEn: 'Consistency', dimensionLabelAr: 'الاتساق' },
  { id: 12, textEn: 'I have systems that help me stay on track', textAr: 'لدي أنظمة تساعدني على البقاء على المسار', dimension: 'consistency', dimensionLabelEn: 'Consistency', dimensionLabelAr: 'الاتساق' },
];

const scaleLabelsEn = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
];

const scaleLabelsAr = [
  { value: 1, label: 'أختلف بشدة' },
  { value: 2, label: 'أختلف' },
  { value: 3, label: 'محايد' },
  { value: 4, label: 'أوافق' },
  { value: 5, label: 'أوافق بشدة' },
];

export default function IdentityGapQuiz() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const scaleLabels = locale === 'ar' ? scaleLabelsAr : scaleLabelsEn;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  // Calculate dimension scores
  const calculateDimensionScores = () => {
    const dimensions = ['selfTrust', 'clarity', 'alignment', 'consistency'];
    const scores: Record<string, { current: number; target: number; gap: number }> = {};
    
    dimensions.forEach(dim => {
      const dimQuestions = questions.filter(q => q.dimension === dim);
      const total = dimQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
      const maxPossible = dimQuestions.length * 5;
      const current = Math.round((total / maxPossible) * 100);
      const target = 100;
      scores[dim] = {
        current,
        target,
        gap: target - current
      };
    });
    
    return scores;
  };

  const getOverallGap = () => {
    const scores = calculateDimensionScores();
    const avgCurrent = Object.values(scores).reduce((sum, s) => sum + s.current, 0) / 4;
    return Math.round(100 - avgCurrent);
  };

  const getDominantGrowthArea = () => {
    const scores = calculateDimensionScores();
    const sorted = Object.entries(scores).sort((a, b) => b[1].gap - a[1].gap);
    return sorted[0];
  };

  // Tamkinly brand colors only
  const dimensionInfo: Record<string, { nameEn: string; nameAr: string; descriptionEn: string; descriptionAr: string; color: string; icon: React.ReactNode }> = {
    selfTrust: {
      nameEn: 'Self-Trust',
      nameAr: 'الثقة بالنفس',
      descriptionEn: 'Your ability to trust your own judgment and keep promises to yourself',
      descriptionAr: 'قدرتك على الثقة بحكمتك والالتزام بالوعود التي تقطعها على نفسك',
      color: '#3DD4B0', // Mint - primary accent
      icon: <Brain className="w-5 h-5" />
    },
    clarity: {
      nameEn: 'Clarity',
      nameAr: 'الوضوح',
      descriptionEn: 'How clear you are about who you want to become and what you value',
      descriptionAr: 'مدى وضوحك حول الشخص الذي تريد أن تصبحه وما تقدّره',
      color: '#1F6F78', // Teal - secondary
      icon: <Target className="w-5 h-5" />
    },
    alignment: {
      nameEn: 'Alignment',
      nameAr: 'المحاذاة',
      descriptionEn: 'The match between your daily actions and your stated values',
      descriptionAr: 'مدى التوافق بين أفعالك اليومية وقيمك المعلنة',
      color: '#FFB74D', // Amber - warm accent
      icon: <Sparkles className="w-5 h-5" />
    },
    consistency: {
      nameEn: 'Consistency',
      nameAr: 'الاتساق',
      descriptionEn: 'Your ability to follow through on commitments regardless of motivation',
      descriptionAr: 'قدرتك على الالتزام بالتزاماتك بغض النظر عن مستوى الدافعية',
      color: '#0F1C2E', // Navy - primary
      icon: <TrendingUp className="w-5 h-5" />
    }
  };

  const getDimensionName = (dim: string) => locale === 'ar' ? dimensionInfo[dim].nameAr : dimensionInfo[dim].nameEn;
  const getDimensionDescription = (dim: string) => locale === 'ar' ? dimensionInfo[dim].descriptionAr : dimensionInfo[dim].descriptionEn;

  if (showResults) {
    const scores = calculateDimensionScores();
    const overallGap = getOverallGap();
    const [dominantArea, dominantScore] = getDominantGrowthArea();

    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
              {locale === 'ar' ? '→ العودة للتطبيقات' : '← Back to Apps'}
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{getText('Identity Gap Assessment', 'تقييم فجوة الهوية')}</h1>
                <p className="text-slate-400 text-sm">{getText('FREE • 3 min', 'مجاني • 3 دقائق')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{getText('Your Identity Gap Results', 'نتائج فجوة هويتك')}</h2>
            <p className="text-slate-400">{getText('Discover where you are versus where you want to be', 'اكتشف أين أنت مقابل أين تريد أن تكون')}</p>
          </div>

          {/* Overall Gap Score */}
          <Card className="bg-white mb-8">
            <CardContent className="p-8 text-center">
              <h3 className="text-[#8A94A6] text-sm uppercase tracking-wide mb-4">{getText('Your Identity Gap Score', 'درجة فجوة هويتك')}</h3>
              <div className="text-6xl font-bold text-[#0F1C2E] mb-2">{overallGap}%</div>
              <p className="text-[#8A94A6] mb-6">
                {overallGap <= 20 ? getText('Excellent alignment! Minor refinements needed.', 'محاذاة ممتازة! تحسينات طفيفة مطلوبة.') :
                 overallGap <= 40 ? getText('Good foundation with room for growth.', 'أساس جيد مع مساحة للنمو.') :
                 overallGap <= 60 ? getText('Significant opportunity for transformation.', 'فرصة كبيرة للتحوّل.') :
                 getText('Major gap - you\'re at a powerful turning point.', 'فجوة كبيرة - أنت عند نقطة تحوّل قوية.')}
              </p>
              <Progress value={100 - overallGap} className="h-3" />
              <p className="text-xs text-[#8A94A6] mt-2">{getText('Current alignment:', 'المحاذاة الحالية:')} {100 - overallGap}%</p>
            </CardContent>
          </Card>

          {/* Dominant Growth Area */}
          <Card className="bg-[#3DD4B0] mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                  {dimensionInfo[dominantArea].icon}
                </div>
                <div className="flex-1">
                  <Badge className="bg-white/20 text-white mb-2">{getText('Your #1 Growth Area', 'مجال نموّك الأول')}</Badge>
                  <h3 className="text-xl font-bold text-white">{getDimensionName(dominantArea)}</h3>
                  <p className="text-white/80 text-sm">{getDimensionDescription(dominantArea)}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">{dominantScore.gap}%</div>
                  <div className="text-white/80 text-xs">{getText('Gap to close', 'الفجوة للإغلاق')}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dimension Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {Object.entries(scores).map(([dim, score]) => (
              <Card key={dim} className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div style={{ color: dimensionInfo[dim].color }}>
                        {dimensionInfo[dim].icon}
                      </div>
                      <span className="font-semibold text-[#0F1C2E]">{getDimensionName(dim)}</span>
                    </div>
                    <Badge variant="outline" className="font-mono">{score.current}%</Badge>
                  </div>
                  <Progress value={score.current} className="h-2 mb-2" />
                  <p className="text-xs text-[#8A94A6]">{score.gap}% {getText('gap to target', 'فجوة للهدف')}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <Card className="bg-[#0F1C2E]">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-xl font-bold mb-2">{getText('Ready to Close the Gap?', 'مستعد لإغلاق الفجوة؟')}</h3>
              <p className="text-slate-400 mb-4">
                {getText(
                  'The Identity Recode System provides the exact framework to transform your dominant growth area.',
                  'يوفر نظام إعادة برمجة الهوية الإطار الدقيق لتحويل مجال نموّك الرئيسي.'
                )}
              </p>
              <Link href="/products">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-8">
                  {getText('View Transformation Packages', 'عرض حزم التحوّل')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={handleReset} variant="secondary" className="shadow-md">
              <RotateCcw className="w-4 h-4 mr-2" />
              {getText('Retake Quiz', 'إعادة الاختبار')}
            </Button>
            <Button 
              onClick={() => {
                const data = {
                  date: new Date().toISOString(),
                  overallGap,
                  dominantGrowthArea: dominantArea,
                  dimensionScores: scores
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `identity-gap-results-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
              }}
              className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]"
            >
              <Download className="w-4 h-4 mr-2" />
              {getText('Export Results', 'تصدير النتائج')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const dimensionColor = dimensionInfo[question.dimension].color;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            {locale === 'ar' ? '→ العودة للتطبيقات' : '← Back to Apps'}
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-[#3DD4B0]" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{getText('Identity Gap Assessment', 'تقييم فجوة الهوية')}</h1>
              <p className="text-slate-400 text-sm">{getText('FREE • 3 min', 'مجاني • 3 دقائق')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0">
            {getText('Question', 'السؤال')} {currentQuestion + 1} {getText('of', 'من')} {questions.length}
          </Badge>
          <Progress 
            value={((currentQuestion + 1) / questions.length) * 100} 
            className="h-2 w-32 bg-white/10 [&>div]:bg-[#3DD4B0]" 
          />
        </div>

        {/* Question Card */}
        <Card className="bg-white mb-6">
          <CardContent className="p-8">
            <Badge 
              className="mb-4" 
              style={{ backgroundColor: `${dimensionColor}20`, color: dimensionColor }}
            >
              {locale === 'ar' ? question.dimensionLabelAr : question.dimensionLabelEn}
            </Badge>
            
            <h2 className="text-2xl font-bold text-[#0F1C2E] mb-6 leading-relaxed">
              {locale === 'ar' ? question.textAr : question.textEn}
            </h2>

            {/* Rating Scale */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-[#8A94A6] px-1">
                <span>{getText('Strongly Disagree', 'أختلف بشدة')}</span>
                <span>{getText('Strongly Agree', 'أوافق بشدة')}</span>
              </div>
              <div className="flex gap-3">
                {scaleLabels.map((label) => (
                  <button
                    key={label.value}
                    onClick={() => handleAnswer(label.value)}
                    className={`flex-1 py-4 rounded-xl font-semibold transition-all ${
                      answers[question.id] === label.value
                        ? 'text-white'
                        : 'bg-[#F6F8FA] text-[#8A94A6] hover:bg-gray-200'
                    }`}
                    style={{
                      backgroundColor: answers[question.id] === label.value ? dimensionColor : undefined
                    }}
                  >
                    {label.value}
                  </button>
                ))}
              </div>
              {answers[question.id] && (
                <p className="text-center text-sm text-[#8A94A6]">
                  {scaleLabels.find(l => l.value === answers[question.id])?.label}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="white" className="disabled:opacity-50"
          >
            {locale === 'ar' ? '→ السابق' : '← Previous'}
          </Button>
          
          <div className="flex items-center gap-1">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentQuestion === index ? 'bg-[#3DD4B0] w-4' : 
                  answers[questions[index].id] ? 'bg-white/60' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!answers[question.id]}
            className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 transition-all duration-300"
          >
            {currentQuestion === questions.length - 1 ? getText('See Results', 'عرض النتائج') : getText('Next →', 'التالي →')}
          </Button>
        </div>
      </div>
    </div>
  );
}
