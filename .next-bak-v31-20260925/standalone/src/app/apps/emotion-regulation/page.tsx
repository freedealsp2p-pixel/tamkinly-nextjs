'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/providers/LocaleProvider';
import { 
  Heart, 
  ArrowRight, 
  RotateCcw,
  Download,
  Brain,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Scale
} from 'lucide-react';

interface ERQQuestion {
  id: number;
  textEn: string;
  textAr: string;
  dimension: 'reappraisal' | 'suppression';
  reverse?: boolean;
}

const erqQuestions: ERQQuestion[] = [
  { id: 1, textEn: 'I control my emotions by changing the way I think about the situation I\'m in.', textAr: 'أتحكم في مشاعري بتغيير طريقة تفكيري في الموقف الذي أمر به.', dimension: 'reappraisal' },
  { id: 2, textEn: 'I keep my emotions to myself.', textAr: 'أحتفظ بمشاعري لنفسي.', dimension: 'suppression' },
  { id: 3, textEn: 'When I want to feel more positive emotion, I change the way I\'m thinking about the situation.', textAr: 'عندما أريد الشعور بمشاعر أكثر إيجابية، أغيّر طريقة تفكيري في الموقف.', dimension: 'reappraisal' },
  { id: 4, textEn: 'When I am feeling negative emotions, I make sure not to express them.', textAr: 'عندما أشعر بمشاعر سلبية، أتأكد من عدم التعبير عنها.', dimension: 'suppression' },
  { id: 5, textEn: 'When I\'m faced with a stressful situation, I make myself think about it in a way that helps me stay calm.', textAr: 'عندما أواجه موقفًا مرهقًا، أجعل نفسي أفكر فيه بطريقة تساعدني على البقاء هادئًا.', dimension: 'reappraisal' },
  { id: 6, textEn: 'I control my emotions by not expressing them.', textAr: 'أتحكم في مشاعري بعدم التعبير عنها.', dimension: 'suppression' },
  { id: 7, textEn: 'When I want to feel less negative emotion, I change the way I\'m thinking about the situation.', textAr: 'عندما أريد الشعور بمشاعر سلبية أقل، أغيّر طريقة تفكيري في الموقف.', dimension: 'reappraisal' },
  { id: 8, textEn: 'When I want to feel more positive emotion, I change what I\'m thinking about.', textAr: 'عندما أريد الشعور بمشاعر أكثر إيجابية، أغيّر ما أفكر فيه.', dimension: 'reappraisal' },
  { id: 9, textEn: 'I control my emotions by changing how I think about a situation.', textAr: 'أتحكم في مشاعري بتغيير كيف أفكر في الموقف.', dimension: 'reappraisal' },
  { id: 10, textEn: 'When I am feeling positive emotions, I am careful not to express them.', textAr: 'عندما أشعر بمشاعر إيجابية، أكون حريصًا على عدم التعبير عنها.', dimension: 'suppression' },
];

const getFromStorage = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export default function EmotionRegulationPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const scaleLabels = [
    { value: 1, labelEn: 'Strongly Disagree', labelAr: 'أرفض بشدة' },
    { value: 2, labelEn: 'Disagree', labelAr: 'أرفض' },
    { value: 3, labelEn: 'Neutral', labelAr: 'محايد' },
    { value: 4, labelEn: 'Agree', labelAr: 'أوافق' },
    { value: 5, labelEn: 'Strongly Agree', labelAr: 'أوافق بشدة' },
    { value: 6, labelEn: 'Very Strongly Agree', labelAr: 'أوافق بقوة شديدة' },
    { value: 7, labelEn: 'Completely Agree', labelAr: 'أوافق تمامًا' },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [previousResults, setPreviousResults] = useState(() => 
    getFromStorage('tamkinly-erq-results', [] as Array<{ date: string; reappraisal: number; suppression: number }>)
  );

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [erqQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < erqQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateAndShowResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateAndShowResults = () => {
    const results = calculateScores();
    const newResult = {
      date: new Date().toISOString(),
      reappraisal: results.reappraisal,
      suppression: results.suppression
    };
    const updated = [newResult, ...previousResults].slice(0, 10);
    setPreviousResults(updated);
    localStorage.setItem('tamkinly-erq-results', JSON.stringify(updated));
    setShowResults(true);
  };

  const calculateScores = () => {
    const reappraisalItems = erqQuestions.filter(q => q.dimension === 'reappraisal');
    const reappraisalScore = reappraisalItems.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    
    const suppressionItems = erqQuestions.filter(q => q.dimension === 'suppression');
    const suppressionScore = suppressionItems.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    
    return {
      reappraisal: reappraisalScore,
      suppression: suppressionScore,
      reappraisalAvg: Math.round((reappraisalScore / (reappraisalItems.length * 7)) * 100),
      suppressionAvg: Math.round((suppressionScore / (suppressionItems.length * 7)) * 100)
    };
  };

  const getInterpretation = (scores: { reappraisal: number; suppression: number }) => {
    const reappraisalLevel = scores.reappraisal > 30 ? 'high' : scores.reappraisal > 18 ? 'moderate' : 'low';
    const suppressionLevel = scores.suppression > 20 ? 'high' : scores.suppression > 12 ? 'moderate' : 'low';
    
    if (reappraisalLevel === 'high' && suppressionLevel === 'low') {
      return getText(
        'You tend to reframe situations positively and express emotions authentically. This is associated with better emotional well-being.',
        'تميل إلى إعادة صياغة المواقف بإيجابية والتعبير عن المشاعر بأصالة. يرتبط هذا برفاهية عاطفية أفضل.'
      );
    } else if (reappraisalLevel === 'high' && suppressionLevel === 'high') {
      return getText(
        'You use both reappraisal and suppression. While reappraisal is adaptive, consider expressing emotions more freely.',
        'تستخدم كل من إعادة التقييم والكبت. بينما إعادة التقييم تكيفية، فكر في التعبير عن المشاعر بحرية أكبر.'
      );
    } else if (reappraisalLevel === 'low' && suppressionLevel === 'high') {
      return getText(
        'You tend to suppress emotions rather than reframe them. This pattern may increase stress. Consider developing reappraisal skills.',
        'تميل إلى كبت المشاعر بدلاً من إعادة صياغتها. قد يزيد هذا النمط من التوتر. فكر في تطوير مهارات إعادة التقييم.'
      );
    } else {
      return getText(
        'You use a balanced approach to emotion regulation. Developing more reappraisal strategies could enhance emotional resilience.',
        'تستخدم نهجًا متوازنًا في تنظيم المشاعر. يمكن لتطوير المزيد من استراتيجيات إعادة التقييم أن يعزز المرونة العاطفية.'
      );
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleExport = () => {
    const scores = calculateScores();
    const exportData = {
      date: new Date().toISOString(),
      assessment: 'Emotion Regulation Questionnaire (ERQ)',
      scores: {
        reappraisal: scores.reappraisal,
        suppression: scores.suppression,
        reappraisalPercent: scores.reappraisalAvg,
        suppressionPercent: scores.suppressionAvg
      },
      interpretation: getInterpretation(scores),
      answers: answers,
      history: previousResults
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `erq-results-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  if (showResults) {
    const scores = calculateScores();
    const interpretation = getInterpretation(scores);

    return (
<div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
              {getText('← Back to Apps', '→ العودة للتطبيقات')}
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <Badge className="bg-[#0F1C2E] text-[#3DD4B0] border border-[#3DD4B0]">{getText('MASTERY', 'حزمة')}</Badge>
                <h1 className="text-xl font-bold">{getText('ERQ Results', 'نتائج ERQ')}</h1>
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
            <h2 className="text-3xl font-bold text-white mb-2">{getText('Your Emotion Regulation Profile', 'ملفك الشخصي في تنظيم المشاعر')}</h2>
            <p className="text-slate-400">{getText('Based on the ERQ by Gross & John (2003)', 'بناءً على استبيان ERQ لغروس وجون (2003)')}</p>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F1C2E]">{getText('Reappraisal', 'إعادة التقييم')}</h3>
                    <p className="text-xs text-[#8A94A6]">{getText('Cognitive Reframing', 'إعادة الصياغة المعرفية')}</p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-[#0F1C2E] mb-2">{scores.reappraisal}</div>
                <Progress value={scores.reappraisalAvg} className="h-2 mb-2" />
                <p className="text-xs text-[#8A94A6]">
                  {scores.reappraisalAvg}% {getText('of maximum score', 'من الدرجة القصوى')}
                </p>
                <p className="text-sm text-[#2B2E34] mt-3">
                  {getText('How often you reframe situations to change emotional impact', 'مدى تكرار إعادة صياغة المواقف لتغيير التأثير العاطفي')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2A8A94]/10 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-[#2A8A94]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F1C2E]">{getText('Suppression', 'الكبت')}</h3>
                    <p className="text-xs text-[#8A94A6]">{getText('Expressive Inhibition', 'كبح التعبير')}</p>
                  </div>
                </div>
                <div className="text-4xl font-bold text-[#0F1C2E] mb-2">{scores.suppression}</div>
                <Progress value={scores.suppressionAvg} className="h-2 mb-2" />
                <p className="text-xs text-[#8A94A6]">
                  {scores.suppressionAvg}% {getText('of maximum score', 'من الدرجة القصوى')}
                </p>
                <p className="text-sm text-[#2B2E34] mt-3">
                  {getText('How often you inhibit emotional expression', 'مدى تكرار كبح التعبير العاطفي')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Interpretation */}
          <Card className="bg-[#0F1C2E] mb-8">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#2A8A94]" />
                {getText('Interpretation', 'التفسير')}
              </h3>
              <p className="text-slate-300 mb-4">{interpretation}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-[#3DD4B0]/10 rounded-lg">
                  <h4 className="text-[#3DD4B0] font-medium mb-2">{getText('Reappraisal (Adaptive)', 'إعادة التقييم (تكيفي)')}</h4>
                  <p className="text-sm text-slate-400">
                    {getText(
                      'Changing how you think about a situation to alter its emotional impact. Associated with better mental health and relationship satisfaction.',
                      'تغيير طريقة تفكيرك في الموقف لتغيير تأثيره العاطفي. يرتبط بصحة نفسية أفضل ورضا أكبر عن العلاقات.'
                    )}
                  </p>
                </div>
                <div className="p-4 bg-[#2A8A94]/10 rounded-lg">
                  <h4 className="text-[#2A8A94] font-medium mb-2">{getText('Suppression (Caution)', 'الكبت (تحذير)')}</h4>
                  <p className="text-sm text-slate-400">
                    {getText(
                      'Inhibiting emotional expression. While sometimes useful, chronic suppression may increase stress and reduce authenticity.',
                      'كبح التعبير العاطفي. بينما قد يكون مفيدًا أحيانًا، قد يزيد الكبت المزمن من التوتر ويقلل الأصالة.'
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison with previous */}
          {previousResults.length > 1 && (
            <Card className="bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                  <Scale className="w-5 h-5 text-[#1F6F78]" />
                  {getText('Progress Over Time', 'التقدم بمرور الوقت')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {previousResults.slice(0, 5).map((result, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#F6F8FA] rounded-lg">
                      <span className="text-sm text-[#8A94A6]">
                        {new Date(result.date).toLocaleDateString()}
                      </span>
                      <div className="flex gap-4">
                        <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0]">
                          {getText('R', 'إ')}: {result.reappraisal}
                        </Badge>
                        <Badge className="bg-[#2A8A94]/10 text-[#2A8A94]">
                          {getText('S', 'ك')}: {result.suppression}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={handleReset} variant="secondary" className="shadow-md">
              <RotateCcw className="w-4 h-4 mr-2" />
              {getText('Retake Questionnaire', 'إعادة الاستبيان')}
            </Button>
            <Button onClick={handleExport} className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]">
              <Download className="w-4 h-4 mr-2" />
              {getText('Export Results', 'تصدير النتائج')}
            </Button>
          </div>
        </div>
      </div>
);
  }

  const question = erqQuestions[currentQuestion];
  const dimensionColor = question.dimension === 'reappraisal' ? '#3DD4B0' : '#2A8A94';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            {getText('← Back to Apps', '→ العودة للتطبيقات')}
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#3DD4B0]" />
            </div>
            <div>
              <Badge className="bg-[#0F1C2E] text-[#3DD4B0] border border-[#3DD4B0]">{getText('MASTERY', 'حزمة')}</Badge>
              <h1 className="text-xl font-bold">{getText('Emotion Regulation Questionnaire', 'استبيان تنظيم المشاعر')}</h1>
              <p className="text-slate-400 text-sm">{getText('ERQ - Gross & John (2003)', 'ERQ - غروس وجون (2003)')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Questionnaire Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0] border-0">
            {getText('Question', 'سؤال')} {currentQuestion + 1} {getText('of', 'من')} {erqQuestions.length}
          </Badge>
          <Progress 
            value={((currentQuestion + 1) / erqQuestions.length) * 100} 
            className="h-2 w-32 bg-white/10 [&>div]:bg-[#3DD4B0]" 
          />
        </div>

        {/* Question Card */}
        <Card className="bg-white mb-6">
          <CardContent className="p-8">
            <Badge 
              className="mb-4" 
              style={{ 
                backgroundColor: `${dimensionColor}20`, 
                color: dimensionColor 
              }}
            >
              {question.dimension === 'reappraisal' ? getText('Reappraisal', 'إعادة التقييم') : getText('Suppression', 'الكبت')}
            </Badge>
            
            <h2 className="text-xl font-bold text-[#0F1C2E] mb-6 leading-relaxed">
              {locale === 'ar' ? question.textAr : question.textEn}
            </h2>

            {/* Rating Scale */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs text-[#8A94A6] px-1">
                <span>{getText('Strongly Disagree', 'أرفض بشدة')}</span>
                <span>{getText('Completely Agree', 'أوافق تمامًا')}</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {scaleLabels.map((label) => (
                  <button
                    key={label.value}
                    onClick={() => handleAnswer(label.value)}
                    className={`py-3 rounded-xl font-semibold transition-all text-sm ${
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
                  {locale === 'ar' ? scaleLabels.find(l => l.value === answers[question.id])?.labelAr : scaleLabels.find(l => l.value === answers[question.id])?.labelEn}
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
            {getText('← Previous', '→ السابق')}
          </Button>
          
          <div className="flex items-center gap-1">
            {erqQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentQuestion === index ? 'bg-[#3DD4B0] w-4' : 
                  answers[erqQuestions[index].id] ? 'bg-white/60' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!answers[question.id]}
            className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
          >
            {currentQuestion === erqQuestions.length - 1 ? getText('See Results', 'عرض النتائج') : getText('Next →', 'التالي ←')}
          </Button>
        </div>

        {/* Info Card */}
        <Card className="bg-[#0F1C2E] mt-8">
          <CardContent className="p-6">
            <h4 className="text-white font-medium mb-2 flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#3DD4B0]" />
              {getText('About the ERQ', 'عن استبيان ERQ')}
            </h4>
            <p className="text-slate-400 text-sm mb-3">
              {getText(
                'The Emotion Regulation Questionnaire measures two strategies:',
                'يقيس استبيان تنظيم المشاعر استراتيجيتين:'
              )}
              <strong className="text-[#3DD4B0]"> {getText('Reappraisal', 'إعادة التقييم')}</strong> {getText('(changing how you think)', '(تغيير طريقة تفكيرك)')} {getText('and', 'و')}
              <strong className="text-[#2A8A94]"> {getText('Suppression', 'الكبت')}</strong> {getText('(hiding emotions).', '(إخفاء المشاعر).')}
            </p>
            <p className="text-xs text-[#8A94A6]">
              {getText('Reference: Gross, J.J., & John, O.P. (2003). Individual differences in two emotion regulation processes.', 'المرجع: غروس، ج.ج.، وجون، أ.ب. (2003). الاختلافات الفردية في عمليتي تنظيم المشاعر.')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
